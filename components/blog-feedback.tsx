"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Send, 
  Star,
  Heart,
  BookOpen,
  Lightbulb,
  Bug
} from "lucide-react"
import { toast } from "sonner"

interface BlogFeedbackProps {
  slug: string
  title: string
}

export function BlogFeedback({ slug, title }: BlogFeedbackProps) {
  const [feedbackType, setFeedbackType] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send feedback to API
      const feedbackData = {
        slug,
        title,
        feedbackType,
        rating,
        feedback,
        email,
        name,
        timestamp: new Date().toISOString()
      }

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }
      
      toast.success("Thank you for your feedback! 🎉")
      setHasSubmitted(true)
      
      // Reset form
      setFeedbackType("")
      setRating(0)
      setFeedback("")
      setEmail("")
      setName("")
      
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const feedbackTypes = [
    { id: "helpful", label: "Helpful Content", icon: ThumbsUp, color: "bg-green-500" },
    { id: "suggestion", label: "Suggestion", icon: Lightbulb, color: "bg-yellow-500" },
    { id: "question", label: "Question", icon: MessageSquare, color: "bg-blue-500" },
    { id: "error", label: "Found an Error", icon: Bug, color: "bg-red-500" },
    { id: "more", label: "Want More Like This", icon: Heart, color: "bg-pink-500" }
  ]

  if (hasSubmitted) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-green-500 mb-4">
              <Heart className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Thank you!</h3>
            <p className="text-gray-400">Your feedback helps me create better content.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Share Your Feedback
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Help me improve by sharing your thoughts on this post
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-white mb-3 block">How would you rate this post?</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= rating ? "text-yellow-500" : "text-gray-600 hover:text-yellow-400"
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Type */}
          <div>
            <Label className="text-white mb-3 block">What type of feedback do you have?</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFeedbackType(type.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    feedbackType === type.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white"
                  }`}
                >
                  <div className={`p-1 rounded ${type.color}/20`}>
                    <type.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <Label htmlFor="feedback" className="text-white mb-2 block">
              Your feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or questions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
              required
            />
          </div>

          {/* Optional Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white mb-2 block">
                Name (optional)
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={!feedback.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
