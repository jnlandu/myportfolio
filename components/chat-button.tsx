"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, ArrowUp, Loader2, Bot, User, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { aiChatService } from "@/lib/ai-chat-service"
import { chatService } from "@/lib/chat-service"

type Message = {
  id: string
  role: "user" | "assistant" | "error"
  content: string
  timestamp: Date
}

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi there! I'm Jérémie's AI assistant. I can answer questions about his research, education, current work at AMMI, technical skills, or personal background. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [useAI, setUseAI] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Check AI availability on component mount
  useEffect(() => {
    const checkAI = async () => {
      const isAvailable = await aiChatService.checkAvailability()
      setUseAI(isAvailable)
      if (isAvailable) {
        console.log('✅ AI service available - using Hugging Face LLM')
      } else {
        console.log('⚠️ AI service not available - using keyword-based chat')
      }
    }
    checkAI()
  }, [])

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]')
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    const currentMessage = message
    setMessage("")
    setIsLoading(true)
    setShowSuggestions(false)

    // Create assistant message placeholder for streaming
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      if (useAI) {
        // Use AI service with streaming
        try {
          setStreamingMessageId(assistantMessageId)
          await aiChatService.getAIResponseStream(
            currentMessage,
            // onChunk - update the message as we receive chunks
            (chunk: string) => {
              setMessages((prev) => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: msg.content + chunk }
                    : msg
                )
              )
            },
            // onComplete - streaming finished
            (fullResponse: string) => {
              setMessages((prev) => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: fullResponse }
                    : msg
                )
              )
              setStreamingMessageId(null)
            },
            // onError - streaming failed
            (error: Error) => {
              console.warn('AI streaming failed, falling back to keyword-based chat:', error)
              const fallbackResponse = chatService.getResponse(currentMessage)
              setMessages((prev) => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: fallbackResponse }
                    : msg
                )
              )
              setStreamingMessageId(null)
            }
          )
        } catch (aiError) {
          console.warn('AI service failed, falling back to keyword-based chat:', aiError)
          const fallbackResponse = chatService.getResponse(currentMessage)
          setMessages((prev) => 
            prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content: fallbackResponse }
                : msg
            )
          )
          setStreamingMessageId(null)
        }
      } else {
        // Use keyword-based chat service (simulate streaming for consistency)
        setStreamingMessageId(assistantMessageId)
        const responseContent = chatService.getResponse(currentMessage)
        
        // Simulate streaming by typing out the response
        let currentContent = ""
        const words = responseContent.split(' ')
        
        for (let i = 0; i < words.length; i++) {
          currentContent += (i > 0 ? ' ' : '') + words[i]
          setMessages((prev) => 
            prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content: currentContent }
                : msg
            )
          )
          // Small delay between words for typing effect
          await new Promise(resolve => setTimeout(resolve, 50))
        }
        setStreamingMessageId(null)
      }
      
    } catch (error) {
      console.error("Failed to get response:", error)
      
      // Update the assistant message to show error
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { 
                ...msg, 
                role: "error" as const,
                content: "Sorry, I'm having trouble responding right now. Please try again in a moment, or feel free to contact Jérémie directly at jeremie@aims.ac.za."
              }
            : msg
        )
      )
      setStreamingMessageId(null)
    } finally {
      setIsLoading(false)
      setStreamingMessageId(null)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question)
    setShowSuggestions(false)
    // Trigger send after setting message
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 transition-colors duration-200 ${
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        }`}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[70vh] bg-black border border-border rounded-lg shadow-xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Chat header */}
          <div className="p-4 border-b border-border bg-black/50 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-primary">
                <AvatarImage src="/images/profile.jpg" alt="Jérémie N. Mabiala" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-primary" />
                  Ask Jérémie's Assistant
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    useAI ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {useAI ? 'AI' : 'Smart'}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  {useAI ? 'Powered by Hugging Face LLM' : 'Keyword-based responses'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages area */}
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 items-start ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Icon for Assistant/Error messages */}
                  {msg.role !== "user" && (
                    <Avatar className={`h-6 w-6 mt-1 ${msg.role === 'error' ? 'bg-destructive' : 'bg-muted'}`}>
                      <AvatarFallback className="text-xs bg-transparent">
                        {msg.role === 'assistant' && <Bot className="h-4 w-4" />}
                        {msg.role === 'error' && <AlertTriangle className="h-4 w-4 text-destructive-foreground" />}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : msg.role === "assistant"
                        ? "bg-muted text-foreground rounded-bl-none"
                        : "bg-destructive/20 text-destructive-foreground border border-destructive rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {msg.content}
                      {/* Show blinking cursor for streaming messages */}
                      {streamingMessageId === msg.id && (
                        <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse">|</span>
                      )}
                    </p>
                    <span className="text-xs opacity-70 block mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {/* Icon for User messages */}
                  {msg.role === "user" && (
                    <Avatar className="h-6 w-6 mt-1 bg-primary">
                      <AvatarFallback className="text-xs bg-transparent text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {/* Suggested Questions */}
              {showSuggestions && messages.length <= 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-medium">Suggested questions:</p>
                  {aiChatService.getSuggestedQuestions().slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left p-2 text-xs bg-muted/50 hover:bg-muted rounded border border-border/50 hover:border-border transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Loading/Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start gap-2 items-start">
                   <Avatar className="h-6 w-6 mt-1 bg-muted">
                      <AvatarFallback className="text-xs bg-transparent">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted rounded-bl-none">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <p className="text-sm">{useAI ? 'AI is thinking...' : 'Processing...'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="p-3 border-t border-border bg-black/50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2 items-center"
            >
              <Textarea
                placeholder="Ask a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-10 max-h-24 resize-none flex-grow bg-background"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!message.trim() || isLoading}
                className="h-10 w-10 shrink-0"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
