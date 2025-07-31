import { chatContexts, fallbackResponses, suggestedQuestions, type ChatContext } from './chat-knowledge'

export class ChatService {
  private contexts: ChatContext[]
  private fallbacks: string[]

  constructor() {
    this.contexts = chatContexts
    this.fallbacks = fallbackResponses
  }

  // Main method to get response for a user message
  public getResponse(userMessage: string): string {
    const normalizedMessage = this.normalizeMessage(userMessage)
    
    // Try to find matching context
    const matchedContext = this.findBestMatch(normalizedMessage)
    
    if (matchedContext) {
      return matchedContext.response
    }

    // Special handling for greetings
    if (this.isGreeting(normalizedMessage)) {
      return this.getGreetingResponse()
    }

    // Special handling for thanks
    if (this.isThanks(normalizedMessage)) {
      return this.getThanksResponse()
    }

    // Return a fallback response with suggestions
    return this.getFallbackResponse()
  }

  // Normalize user message for better matching
  private normalizeMessage(message: string): string {
    return message.toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .trim()
  }

  // Find the best matching context based on keywords
  private findBestMatch(normalizedMessage: string): ChatContext | null {
    let bestMatch: ChatContext | null = null
    let bestScore = 0

    for (const context of this.contexts) {
      const score = this.calculateMatchScore(normalizedMessage, context.keywords)
      if (score > bestScore && score > 0) {
        bestScore = score
        bestMatch = context
      }
    }

    return bestMatch
  }

  // Calculate match score based on keyword presence
  private calculateMatchScore(message: string, keywords: string[]): number {
    let score = 0
    const messageWords = message.split(' ')

    for (const keyword of keywords) {
      // Exact keyword match
      if (message.includes(keyword)) {
        score += 3
      }
      
      // Partial word match
      for (const word of messageWords) {
        if (word.includes(keyword) || keyword.includes(word)) {
          score += 1
        }
      }
    }

    return score
  }

  // Check if message is a greeting
  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings']
    return greetings.some(greeting => message.includes(greeting))
  }

  // Check if message is thanks
  private isThanks(message: string): boolean {
    const thanks = ['thank', 'thanks', 'appreciate', 'grateful']
    return thanks.some(thank => message.includes(thank))
  }

  // Get greeting response
  private getGreetingResponse(): string {
    const greetings = [
      "Hello! 👋 I'm Jérémie's virtual assistant. I can tell you about his research, background, projects, or anything else you'd like to know!",
      "Hi there! 😊 Feel free to ask me anything about Jérémie's work in AI, his academic journey, or current projects at AMMI!",
      "Hey! 🤖 I'm here to help you learn more about Jérémie N. Mabiala - his research, expertise, or how to get in touch with him!"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // Get thanks response
  private getThanksResponse(): string {
    const responses = [
      "You're very welcome! 😊 Feel free to ask if you have any other questions about Jérémie!",
      "Happy to help! 🙌 Is there anything else you'd like to know about his research or background?",
      "My pleasure! 🤖 Don't hesitate to ask if you need more information!"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Get fallback response with suggestions
  private getFallbackResponse(): string {
    const baseResponse = this.fallbacks[Math.floor(Math.random() * this.fallbacks.length)]
    
    // Add some suggested questions
    const suggestions = this.getRandomSuggestions(3)
    const suggestionText = suggestions.map(q => `• ${q}`).join('\n')
    
    return `${baseResponse}\n\nHere are some questions you might ask:\n${suggestionText}`
  }

  // Get random suggested questions
  private getRandomSuggestions(count: number): string[] {
    const shuffled = [...suggestedQuestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Get all suggested questions (for UI)
  public getSuggestedQuestions(): string[] {
    return suggestedQuestions
  }

  // Get context categories for filtering (if needed)
  public getCategories(): string[] {
    return [...new Set(this.contexts.map(ctx => ctx.category))]
  }
}

// Export singleton instance
export const chatService = new ChatService()
