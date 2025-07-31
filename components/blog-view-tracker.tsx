'use client'

import { useEffect } from 'react'
import { BlogAnalyticsManager } from '@/lib/blog-analytics'

interface BlogViewTrackerProps {
  postId: string
  postTitle: string
  postCategory?: string
  postTags?: string[]
}

export function BlogViewTracker({ 
  postId, 
  postTitle, 
  postCategory, 
  postTags 
}: BlogViewTrackerProps) {
  useEffect(() => {
    // Track page view when component mounts
    const analytics = BlogAnalyticsManager.getInstance()
    
    analytics.trackView(postId, {
      title: postTitle,
      category: postCategory,
      tags: postTags
    })

    // Track reading time when user leaves or switches tabs
    let startTime = Date.now()
    let isVisible = true

    const handleVisibilityChange = () => {
      if (document.hidden && isVisible) {
        // User switched away from tab
        const readingTime = Math.floor((Date.now() - startTime) / 1000)
        if (readingTime > 5) { // Only track if user spent more than 5 seconds
          analytics.trackReadingTime(postId, readingTime)
        }
        isVisible = false
      } else if (!document.hidden && !isVisible) {
        // User came back to tab
        startTime = Date.now()
        isVisible = true
      }
    }

    const handleBeforeUnload = () => {
      if (isVisible) {
        const readingTime = Math.floor((Date.now() - startTime) / 1000)
        if (readingTime > 5) {
          analytics.trackReadingTime(postId, readingTime)
        }
      }
    }

    // Add scroll tracking for engagement
    let maxScrollPercentage = 0
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)
      
      if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage
        
        // Track scroll milestones
        if (scrollPercentage >= 25 && scrollPercentage < 50) {
          analytics.trackEngagement(postId, 'scroll_25')
        } else if (scrollPercentage >= 50 && scrollPercentage < 75) {
          analytics.trackEngagement(postId, 'scroll_50')
        } else if (scrollPercentage >= 75 && scrollPercentage < 90) {
          analytics.trackEngagement(postId, 'scroll_75')
        } else if (scrollPercentage >= 90) {
          analytics.trackEngagement(postId, 'scroll_complete')
        }
      }
    }

    // Throttle scroll events
    let scrollTimeout: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 100)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('scroll', throttledScroll)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', throttledScroll)
      
      // Final reading time tracking
      if (isVisible) {
        const finalReadingTime = Math.floor((Date.now() - startTime) / 1000)
        if (finalReadingTime > 5) {
          analytics.trackReadingTime(postId, finalReadingTime)
        }
      }
    }
  }, [postId, postTitle, postCategory, postTags])

  // This component doesn't render anything visible
  return null
}
