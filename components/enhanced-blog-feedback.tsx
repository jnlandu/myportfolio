'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  Heart, 
  ThumbsUp, 
  Star, 
  Share2, 
  BookmarkPlus, 
  MessageSquare,
  Send,
  CheckCircle 
} from 'lucide-react'
import { useBlogAnalytics } from '@/lib/blog-analytics'

interface BlogFeedbackProps {
  slug: string
  title: string
  className?: string
}

type FeedbackType = 'helpful' | 'unclear' | 'suggestion' | 'question' | 'appreciation'
type Rating = 1 | 2 | 3 | 4 | 5

export function EnhancedBlogFeedback({ slug, title, className }: BlogFeedbackProps) {
  const { trackView, trackEngagement } = useBlogAnalytics(slug)
  const [reactions, setReactions] = useState({
    helpful: false,
    loved: false,
    bookmarked: false,
    shared: false
  })
  const [showDetailedFeedback, setShowDetailedFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  
  // Detailed feedback form state
  const [rating, setRating] = useState<Rating | null>(null)
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('helpful')
  const [feedbackText, setFeedbackText] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuickReaction = (type: keyof typeof reactions) => {
    const newReactions = { ...reactions, [type]: !reactions[type] }
    setReactions(newReactions)
    
    // Track engagement
    if (newReactions[type]) {
      trackView(120) // Give bonus engagement time for reactions
    }
    
    // Store in localStorage for persistence
    localStorage.setItem(`blog_reactions_${slug}`, JSON.stringify(newReactions))
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${slug}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this article: ${title}`,
          url
        })
        handleQuickReaction('shared')
      } catch (err) {
        // Fallback to clipboard
        copyToClipboard(url)
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      handleQuickReaction('shared')
      // You could show a toast notification here
    })
  }

  const submitDetailedFeedback = async () => {
    if (!rating || !feedbackText.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call - you can replace this with actual API integration
    try {
      const feedback = {
        slug,
        title,
        rating,
        type: feedbackType,
        message: feedbackText,
        email: email || null,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }
      
      // Store feedback in localStorage (replace with API call)
      const existingFeedback = JSON.parse(localStorage.getItem('blog_feedback') || '[]')
      existingFeedback.push(feedback)
      localStorage.setItem('blog_feedback', JSON.stringify(existingFeedback))
      
      setFeedbackSubmitted(true)
      trackView(300) // Extra engagement for detailed feedback
      
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Load saved reactions on component mount
  useState(() => {
    const savedReactions = localStorage.getItem(`blog_reactions_${slug}`)
    if (savedReactions) {
      setReactions(JSON.parse(savedReactions))
    }
  })

  const feedbackTypes = [
    { value: 'helpful', label: 'This was helpful', icon: ThumbsUp },
    { value: 'unclear', label: 'Something was unclear', icon: MessageSquare },
    { value: 'suggestion', label: 'I have a suggestion', icon: Star },
    { value: 'question', label: 'I have a question', icon: MessageSquare },
    { value: 'appreciation', label: 'General appreciation', icon: Heart }
  ] as const

  return (
    <Card className={`bg-black/50 border-primary/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Was this helpful?</CardTitle>
        <CardDescription>
          Your feedback helps me create better content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Reactions */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant={reactions.helpful ? "default" : "outline"}
            size="sm"
            onClick={() => handleQuickReaction('helpful')}
            className="gap-2"
          >
            <ThumbsUp className="h-4 w-4" />
            Helpful
          </Button>
          
          <Button
            variant={reactions.loved ? "default" : "outline"}
            size="sm"
            onClick={() => handleQuickReaction('loved')}
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            Love it
          </Button>
          
          <Button
            variant={reactions.bookmarked ? "default" : "outline"}
            size="sm"
            onClick={() => handleQuickReaction('bookmarked')}
            className="gap-2"
          >
            <BookmarkPlus className="h-4 w-4" />
            Bookmark
          </Button>
          
          <Button
            variant={reactions.shared ? "default" : "outline"}
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Detailed Feedback Toggle */}
        {!showDetailedFeedback && !feedbackSubmitted && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDetailedFeedback(true)}
            className="text-primary hover:text-primary/80"
          >
            Leave detailed feedback →
          </Button>
        )}

        {/* Detailed Feedback Form */}
        {showDetailedFeedback && !feedbackSubmitted && (
          <div className="space-y-4 pt-4 border-t border-gray-700">
            {/* Rating */}
            <div>
              <Label className="text-sm font-medium">Rate this article</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star as Rating)}
                    className={`p-1 transition-colors ${
                      rating && star <= rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-600 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="h-5 w-5" fill={rating && star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Type */}
            <div>
              <Label className="text-sm font-medium">Type of feedback</Label>
              <RadioGroup 
                value={feedbackType} 
                onValueChange={(value) => setFeedbackType(value as FeedbackType)}
                className="mt-2"
              >
                {feedbackTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label htmlFor={type.value} className="text-sm cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Feedback Message */}
            <div>
              <Label htmlFor="feedback" className="text-sm font-medium">
                Your feedback
              </Label>
              <Textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell me what you think..."
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Optional Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2"
              />
              <p className="text-xs text-gray-400 mt-1">
                Only if you'd like a response
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={submitDetailedFeedback}
              disabled={!rating || !feedbackText.trim() || isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        )}

        {/* Thank You Message */}
        {feedbackSubmitted && (
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-medium">Thank you for your feedback!</p>
            <p className="text-sm text-gray-400 mt-1">
              Your input helps me improve my content.
            </p>
          </div>
        )}

        {/* Reaction Summary */}
        {Object.values(reactions).some(Boolean) && (
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Your reactions:</p>
            <div className="flex gap-2">
              {reactions.helpful && <Badge variant="secondary">Helpful</Badge>}
              {reactions.loved && <Badge variant="secondary">Loved</Badge>}
              {reactions.bookmarked && <Badge variant="secondary">Bookmarked</Badge>}
              {reactions.shared && <Badge variant="secondary">Shared</Badge>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
