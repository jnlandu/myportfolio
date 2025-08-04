// Client-side chat service that calls the API routes
export class ClientChatService {
  // Check if AI is available by checking environment
  async checkAvailability(): Promise<boolean> {
    try {
      const response = await fetch('/api/chat/status')
      if (response.ok) {
        const data = await response.json()
        return data.aiAvailable
      }
      return false
    } catch {
      return false
    }
  }

  // Get AI response via API
  async getAIResponse(message: string): Promise<string> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        useAI: true
      }),
    })

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.status}`)
    }

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return data.response
  }

  // Get streaming response (simulated streaming from API)
  async getAIResponseStream(
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: (fullResponse: string) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    try {
      const response = await this.getAIResponse(message)
      
      // Simulate streaming by typing out the response
      let currentContent = ""
      const words = response.split(' ')
      
      for (let i = 0; i < words.length; i++) {
        currentContent += (i > 0 ? ' ' : '') + words[i]
        onChunk(words[i] + (i < words.length - 1 ? ' ' : ''))
        
        // Small delay between words for typing effect
        await new Promise(resolve => setTimeout(resolve, 30))
      }
      
      onComplete(response)
    } catch (error) {
      onError(error as Error)
    }
  }

  // Get keyword-based response via API
  async getKeywordResponse(message: string): Promise<string> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        useAI: false
      }),
    })

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.status}`)
    }

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return data.response
  }

  // Get suggested questions
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

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.getKeywordResponse("Hello")
      return !!response
    } catch {
      return false
    }
  }
}

// Export singleton instance
export const clientChatService = new ClientChatService()
