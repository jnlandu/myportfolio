import { chatContexts, personalInfo } from './chat-knowledge'
import { getRagService, isRAGEnabled } from './rag-service'

interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface HuggingFaceResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class AIChatService {
  private apiKey: string
  private model: string
  private systemPrompt: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || ''
    this.model = "meta-llama/Llama-3.3-70B-Instruct:cerebras" // Fast and high-quality model
    this.systemPrompt = this.buildSystemPrompt()
  }

  // Build comprehensive system prompt with your personal information
  private buildSystemPrompt(): string {
    const personalData = chatContexts.map((context : any) => 
      `${context.category.toUpperCase()}:\n${context.response}\n`
    ).join('\n')

    return `You are Jérémie N. Mabiala's personal AI assistant. You should respond as if you are Jérémie himself, using first person ("I am", "My research", etc.). Be conversational, helpful, and accurate.

ABOUT JÉRÉMIE:
${personalData}

CONTACT INFORMATION:
- Email: ${personalInfo.emails.join(', ')}
- LinkedIn: ${personalInfo.socialLinks.linkedin}
- GitHub: ${personalInfo.socialLinks.github}
- Current Position: ${personalInfo.currentPosition}
- Location: ${personalInfo.location}

INSTRUCTIONS:
- Always respond in first person as Jérémie
- Be professional but friendly and approachable
- If asked about something you don't know, be honest and suggest they contact you directly
- Keep responses concise but informative (2-3 sentences unless more detail is needed)
- Use emojis sparingly and appropriately
- If someone asks about contact information, provide the relevant email or social links
- When discussing technical topics, feel free to go into appropriate depth
- Remember you are currently a Resident Tutor at AMMI (African Masters in Machine Intelligence) at AIMS Senegal
- If provided with CONTEXT from documents, use that information to give more detailed and accurate answers
- When referencing information from documents, you can mention where it comes from (e.g., "In my blog post about...", "In my research paper...")

IMPORTANT: If CONTEXT is provided below, use it to enhance your response with specific details, but still maintain your personal voice as Jérémie.`
  }

  // Enhanced method to build context-aware system prompt
  private async buildContextAwareSystemPrompt(userMessage: string): Promise<string> {
    let basePrompt = this.buildSystemPrompt()
    
    // Check if RAG is enabled and try to get relevant context
    if (isRAGEnabled()) {
      try {
        const ragService = getRagService()
        const relevantContext = await ragService.buildRAGContext(userMessage)
        
        if (relevantContext.trim()) {
          basePrompt += `\n\nCONTEXT FROM YOUR DOCUMENTS:\n${relevantContext}\n\nUse this context to provide more detailed and specific answers when relevant.`
        }
      } catch (error) {
        console.warn('RAG context retrieval failed, continuing without context:', error)
      }
    }
    
    return basePrompt
  }

  // Check if the service is available
  async checkAvailability(): Promise<boolean> {
    return !!this.apiKey
  }

  // Main method to get AI response with RAG enhancement
  async getAIResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Hugging Face API key not configured')
    }

    try {
      // Get context-aware system prompt (includes RAG if enabled)
      const enhancedSystemPrompt = await this.buildContextAwareSystemPrompt(userMessage)
      
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: enhancedSystemPrompt
        },
        {
          role: "user", 
          content: userMessage
        }
      ]

      const response = await this.query({
        messages,
        model: this.model,
        max_tokens: 400, // Increased for potentially longer context-aware responses
        temperature: 0.7,
        top_p: 0.9
      })

      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content.trim()
      } else {
        throw new Error('No response from AI model')
      }

    } catch (error) {
      console.error('AI response failed:', error)
      throw error
    }
  }

  // Streaming method to get AI response with real-time updates and RAG enhancement
  async getAIResponseStream(
    userMessage: string, 
    onChunk: (chunk: string) => void,
    onComplete: (fullResponse: string) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    if (!this.apiKey) {
      onError(new Error('Hugging Face API key not configured'))
      return
    }

    try {
      // Get context-aware system prompt (includes RAG if enabled)
      const enhancedSystemPrompt = await this.buildContextAwareSystemPrompt(userMessage)
      
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: enhancedSystemPrompt
        },
        {
          role: "user", 
          content: userMessage
        }
      ]

      const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            messages,
            model: this.model,
            max_tokens: 400, // Increased for potentially longer context-aware responses
            temperature: 0.7,
            top_p: 0.9,
            stream: true
          }),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        onError(new Error(`Hugging Face API error (${response.status}): ${errorText}`))
        return
      }

      const reader = response.body?.getReader()
      if (!reader) {
        onError(new Error('Failed to get response stream'))
        return
      }

      let fullResponse = ''
      const decoder = new TextDecoder()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                onComplete(fullResponse.trim())
                return
              }

              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  fullResponse += content
                  onChunk(content)
                }
              } catch (parseError) {
                // Ignore parsing errors for individual chunks
                continue
              }
            }
          }
        }

        onComplete(fullResponse.trim())
      } finally {
        reader.releaseLock()
      }

    } catch (error) {
      console.error('AI streaming failed:', error)
      onError(error as Error)
    }
  }

  // Query the Hugging Face chat completions API
  private async query(data: {
    messages: ChatMessage[]
    model: string
    max_tokens?: number
    temperature?: number
    top_p?: number
  }): Promise<HuggingFaceResponse> {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Hugging Face API error (${response.status}): ${errorText}`)
    }

    return await response.json()
  }

  // Get suggested questions for the UI
  getSuggestedQuestions(): string[] {
    const baseQuestions = [
      "What's your current research focus?",
      "Tell me about your work at AMMI",
      "What programming languages do you use?",
      "What's your educational background?",
      "How can I contact you?",
      "What projects are you working on?",
      "What is AMMI and what do you do there?",
      "What are your main areas of expertise?"
    ]

    // Add RAG-enhanced questions if RAG is enabled
    if (isRAGEnabled()) {
      baseQuestions.push(
        "Tell me about your latest blog posts",
        "What research papers have you written?",
        "Can you explain your work on Bayesian methods?",
        "What's your take on functional data analysis?"
      )
    }

    return baseQuestions
  }

  // Check if RAG is enabled and working
  async isRAGAvailable(): Promise<boolean> {
    if (!isRAGEnabled()) {
      return false
    }

    try {
      const ragService = getRagService()
      return await ragService.isHealthy()
    } catch (error) {
      console.warn('RAG availability check failed:', error)
      return false
    }
  }

  // Get RAG statistics
  async getRAGStats(): Promise<any> {
    if (!isRAGEnabled()) {
      return { enabled: false }
    }

    try {
      const ragService = getRagService()
      const stats = await ragService.getStats()
      return { enabled: true, ...stats }
    } catch (error) {
      console.warn('Failed to get RAG stats:', error)
      return { enabled: true, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // Switch to a different model
  setModel(modelName: string): void {
    this.model = modelName
  }

  // Get current model
  getCurrentModel(): string {
    return this.model
  }

  // Test the connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.getAIResponse("Hello, can you introduce yourself briefly?")
      return !!response
    } catch (error) {
      console.error('Connection test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const aiChatService = new AIChatService()
