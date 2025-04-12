"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, ArrowUp, Loader2, Bot, User, AlertTriangle } from "lucide-react" // Added Bot, User, AlertTriangle
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

type Message = {
  id: string
  role: "user" | "assistant" | "error" // Added error role
  content: string
  timestamp: Date
}

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isGreetingVisible, setIsGreetingVisible] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi there! I'm Jérémie's virtual assistant. Feel free to ask me anything about his research, publications, or background!",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Show greeting on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGreetingVisible(true)
    }, 200000)

    return () => clearTimeout(timer)
  }, [])

  const closeGreeting = () => {
    setIsGreetingVisible(false)
  }
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

    try {
      // In a real implementation, you would call your AI service here
      // For demo purposes, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      const responses = [
        "I'm a mathematical scientist and AI researcher specializing in Machine Learning and Functional Data Analysis.",
        "My research focuses on developing novel mathematical approaches to AI problems.",
        "I've published several papers on machine learning applications in various domains.",
        "I completed my education at prestigious institutions focusing on mathematics and computer science.",
        "I have expertise in Python, TensorFlow, PyTorch, and other data science tools.",
        "I'm passionate about combining theoretical mathematical insights with practical AI applications.",
        "You can check out my projects section to see some of my recent work.",
      ]
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
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
          role: "error", // Use error role
          content: "Sorry, I couldn't process your request. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    {isGreetingVisible && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 max-w-xs md:max-w-sm animate-fade-in">
          <div className="relative">
            <div className="absolute -top-6 left-4 flex -space-x-3">
              <Avatar className="h-12 w-12 border-2 border-white">
                <div className="bg-gray-500 w-full h-full flex items-center justify-center text-white font-bold">J</div>
                {/* <Image
                  src="/images/profile.png"
                  alt="Jérémie N. Mabiala"
                  width={48}
                  height={48}
                  className="object-cover"
                /> */}
              </Avatar>
              <Avatar className="h-12 w-12 border-2 border-white">
                <div className="bg-blue-500 w-full h-full flex items-center justify-center text-white font-bold">M</div>
              </Avatar>
              <Avatar className="h-12 w-12 border-2 border-white">
                <div className="bg-green-500 w-full h-full flex items-center justify-center text-white font-bold">
                  N
                </div>
              </Avatar>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-6 right-2 h-8 w-8 rounded-full bg-gray-400 text-white hover:bg-gray-500"
              onClick={closeGreeting}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="bg-white text-gray-800 rounded-3xl p-6 pt-8 shadow-lg border border-gray-200">
                <p className="text-lg">Hi 👋 I'm Jérémie's virtual assistant</p>
                <p className="mt-2">I can answer questions about:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Research & publications</li>
                  <li>Skills & expertise</li>
                  <li>Professional background</li>
                  <li>Projects & interests</li>
                </ul>
              <div className="mt-4">
                <Button 
                  onClick={() => setIsOpen(true)} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Ask me anything
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                <AvatarImage src="/images/profile.png" alt="Jérémie N. Mabiala" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-primary" /> {/* Bot icon */}
                  Ask Jérémie's Assistant
                </h3>
                <p className="text-xs text-gray-400">Ready to answer your questions</p>
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
                        : "bg-destructive/20 text-destructive-foreground border border-destructive rounded-bl-none" // Error style
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