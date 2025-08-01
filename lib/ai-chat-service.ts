import { chatContexts, personalInfo } from './chat-knowledge'

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
- Remember you are currently a Resident Tutor at AMMI (African Masters in Machine Intelligence) at AIMS Senegal`
  }

  // Check if the service is available
  async checkAvailability(): Promise<boolean> {
    return !!this.apiKey
  }

  // Main method to get AI response
  async getAIResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Hugging Face API key not configured')
    }

    try {
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: this.systemPrompt
        },
        {
          role: "user", 
          content: userMessage
        }
      ]

      const response = await this.query({
        messages,
        model: this.model,
        max_tokens: 300,
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
    return [
      "What's your current research focus?",
      "Tell me about your work at AMMI",
      "What programming languages do you use?",
      "What's your educational background?",
      "How can I contact you?",
      "What projects are you working on?",
      "What is AMMI and what do you do there?",
      "What are your main areas of expertise?"
    ]
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
