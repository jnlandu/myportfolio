'use client'

import { useEffect, useState } from 'react'
import { Eye, Clock, TrendingUp, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { blogAnalytics, BlogAnalytics, useBlogAnalytics } from '@/lib/blog-analytics'

interface BlogAnalyticsDisplayProps {
  slug: string
  category?: string
  tags?: string[]
  className?: string
  showDetailedStats?: boolean
  compact?: boolean
}

export function BlogAnalyticsDisplay({ 
  slug, 
  category, 
  tags = [], 
  className = "",
  showDetailedStats = false,
  compact = false 
}: BlogAnalyticsDisplayProps) {
  const { trackView, getStats } = useBlogAnalytics(slug)
  const [analytics, setAnalytics] = useState<BlogAnalytics | null>(null)
  const [readingTime, setReadingTime] = useState(0)
  const [hasTrackedView, setHasTrackedView] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    // Track view when component mounts
    if (!hasTrackedView) {
      trackView({ title: slug, category, tags })
      setHasTrackedView(true)
    }

    // Get current stats
    setAnalytics(getStats())

    // Track reading time
    const startTime = Date.now()
    
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        // Track reading time separately
        // trackView(timeSpent) // This was causing the issue
      }
    }

    // Track when user leaves the page
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Update reading time every 30 seconds
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      setReadingTime(timeSpent)
    }, 30000)

    return () => {
      handleBeforeUnload()
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearInterval(interval)
    }
  }, [slug, trackView, getStats, hasTrackedView, category, tags])

  if (!analytics) {
    return null
  }

  const avgReadTime = analytics.views > 0 
    ? Math.floor(analytics.totalReadTime / analytics.views) 
    : 0

  if (showDetailedStats) {
    return (
      <Card className={`bg-black/50 border-primary/20 ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Post Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.views}</div>
              <div className="text-sm text-gray-400">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.uniqueViews}</div>
              <div className="text-sm text-gray-400">Unique Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{avgReadTime}s</div>
              <div className="text-sm text-gray-400">Avg Read Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.engagementScore}</div>
              <div className="text-sm text-gray-400">Engagement</div>
            </div>
          </div>
          
          {/* Category and Tags */}
          {(category || tags.length > 0) && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {category && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {category}
                  </Badge>
                )}
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Compact view for blog cards
  return (
    <div className={`flex items-center gap-4 text-sm text-gray-400 ${className}`}>
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{analytics.views} views</span>
      </div>
      
      {analytics.uniqueViews > 0 && (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{analytics.uniqueViews} unique</span>
        </div>
      )}

      {avgReadTime > 0 && (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{Math.floor(avgReadTime / 60)}m read</span>
        </div>
      )}

      {/* Live reading time indicator */}
      {readingTime > 0 && (
        <Badge variant="outline" className="text-xs">
          Reading: {Math.floor(readingTime / 60)}m {readingTime % 60}s
        </Badge>
      )}
    </div>
  )
}

// Analytics dashboard component for viewing all blog stats
export function BlogAnalyticsDashboard() {
  const [allAnalytics, setAllAnalytics] = useState<Record<string, BlogAnalytics>>({})
  const [popularPosts, setPopularPosts] = useState<BlogAnalytics[]>([])

  useEffect(() => {
    setAllAnalytics(blogAnalytics.getAllAnalytics())
    setPopularPosts(blogAnalytics.getPopularPosts(5))
  }, [])

  const totalViews = Object.values(allAnalytics).reduce((sum, stats) => sum + stats.views, 0)
  const totalUniqueViews = Object.values(allAnalytics).reduce((sum, stats) => sum + stats.uniqueViews, 0)
  const avgEngagement = Object.values(allAnalytics).reduce((sum, stats) => sum + stats.engagementScore, 0) / Object.keys(allAnalytics).length || 0

  const exportData = () => {
    const data = blogAnalytics.exportAnalytics()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blog-analytics-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Analytics</h2>
        <button 
          onClick={exportData}
          className="px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/80 transition-colors"
        >
          Export Data
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/50 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalViews}</div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">Unique Readers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalUniqueViews}</div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">Avg Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{Math.round(avgEngagement)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <Card className="bg-black/50 border-primary/20">
          <CardHeader>
            <CardTitle>Most Popular Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <div key={post.slug} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{post.slug}</h4>
                    <p className="text-sm text-gray-400">
                      Last viewed: {post.lastViewed.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{post.views}</div>
                    <div className="text-sm text-gray-400">views</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
