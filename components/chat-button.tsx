"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, ArrowUp, Loader2, Bot, User, AlertTriangle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { chatService } from "@/lib/chat-service"

type Message = {
  id: string
  role: "user" | "assistant" | "error" // Added error role
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
  const [showSuggestions, setShowSuggestions] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

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
    setMessage("")
    setIsLoading(true)
    setShowSuggestions(false) // Hide suggestions after first message

    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))

      // Get intelligent response from chat service
      const response = chatService.getResponse(userMessage.content)
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      
    } catch (error) {
      console.error("Failed to get response:", error)
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "error",
          content: "Sorry, I couldn't process your request. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    setShowSuggestions(false)
    // Auto-send the suggestion
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 transition-all duration-200 ${
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90 animate-pulse"
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
              </Avatar>
              <div>
                <h3 className="font-medium flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-primary" />
                  Ask Jérémie's Assistant
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-powered • Instant answers
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
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
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
                  <p className="text-xs text-gray-400 font-medium">💡 Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {chatService.getSuggestedQuestions().slice(0, 4).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-2 px-3 rounded-full bg-muted/50 hover:bg-muted border-gray-600"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start gap-2 items-start">
                   <Avatar className="h-6 w-6 mt-1 bg-muted">
                      <AvatarFallback className="text-xs bg-transparent">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted rounded-bl-none">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
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