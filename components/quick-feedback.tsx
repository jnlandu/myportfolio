"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ThumbsUp, 
  ThumbsDown, 
  Heart, 
  BookOpen,
  Eye,
  Share2
} from "lucide-react"

interface QuickFeedbackProps {
  slug: string
}

export function QuickFeedback({ slug }: QuickFeedbackProps) {
  const [reactions, setReactions] = useState({
    helpful: 0,
    love: 0,
    bookmark: 0
  })
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set())
  const [views, setViews] = useState(0)

  useEffect(() => {
    // Load existing reactions and views from localStorage or API
    const savedReactions = localStorage.getItem(`reactions-${slug}`)
    const savedUserReactions = localStorage.getItem(`user-reactions-${slug}`)
    const savedViews = localStorage.getItem(`views-${slug}`)

    if (savedReactions) {
      setReactions(JSON.parse(savedReactions))
    }
    if (savedUserReactions) {
      setUserReactions(new Set(JSON.parse(savedUserReactions)))
    }
    if (savedViews) {
      setViews(parseInt(savedViews))
    }

    // Increment view count
    const newViews = (parseInt(savedViews || "0")) + 1
    setViews(newViews)
    localStorage.setItem(`views-${slug}`, newViews.toString())
  }, [slug])

  const handleReaction = (type: keyof typeof reactions) => {
    const newUserReactions = new Set(userReactions)
    const newReactions = { ...reactions }

    if (userReactions.has(type)) {
      // Remove reaction
      newUserReactions.delete(type)
      newReactions[type] = Math.max(0, newReactions[type] - 1)
    } else {
      // Add reaction
      newUserReactions.add(type)
      newReactions[type] += 1
    }

    setUserReactions(newUserReactions)
    setReactions(newReactions)

    // Save to localStorage (in a real app, you'd send to your API)
    localStorage.setItem(`reactions-${slug}`, JSON.stringify(newReactions))
    localStorage.setItem(`user-reactions-${slug}`, JSON.stringify([...newUserReactions]))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast here
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-3">
            <Button
              variant={userReactions.has("helpful") ? "default" : "outline"}
              size="sm"
              onClick={() => handleReaction("helpful")}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              Helpful
              {reactions.helpful > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {reactions.helpful}
                </Badge>
              )}
            </Button>

            <Button
              variant={userReactions.has("love") ? "default" : "outline"}
              size="sm"
              onClick={() => handleReaction("love")}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Love it
              {reactions.love > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {reactions.love}
                </Badge>
              )}
            </Button>

            <Button
              variant={userReactions.has("bookmark") ? "default" : "outline"}
              size="sm"
              onClick={() => handleReaction("bookmark")}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Bookmark
              {reactions.bookmark > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {reactions.bookmark}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {views} views
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
