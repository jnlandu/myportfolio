// Simple blog analytics using localStorage
// Tracks views, reading time, and engagement metrics

export interface BlogAnalytics {
  slug: string
  views: number
  totalReadTime: number
  lastViewed: Date
  uniqueViews: number
  engagementScore: number
}

export interface ViewSession {
  timestamp: number
  userAgent: string
  readTime?: number
  completed?: boolean
}

export class BlogAnalyticsManager {
  private static instance: BlogAnalyticsManager | null = null
  private storageKey = 'blog_analytics'
  private sessionKey = 'blog_sessions'

  // Singleton pattern - get instance
  static getInstance(): BlogAnalyticsManager {
    if (!BlogAnalyticsManager.instance) {
      BlogAnalyticsManager.instance = new BlogAnalyticsManager()
    }
    return BlogAnalyticsManager.instance
  }

    // Helper to check if we're on the client side
  private isClient(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
  }

  // Track a blog view
  trackView(slug: string, metadata?: { title?: string; category?: string; tags?: string[] }): void {
    if (!this.isClient()) return
    
    const analytics = this.getAnalytics(slug)
    const sessions = this.getSessions(slug)
    
    // Create new session
    const session: ViewSession = {
      timestamp: Date.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    // Update analytics
    analytics.views += 1
    analytics.lastViewed = new Date()

    // Check if this is a unique view (different day or user agent)
    const lastSession = sessions[sessions.length - 1]
    const daysSinceLastView = lastSession 
      ? Math.floor((Date.now() - lastSession.timestamp) / (1000 * 60 * 60 * 24))
      : 1

    if (!lastSession || daysSinceLastView > 0) {
      analytics.uniqueViews += 1
    }

    // Store session and analytics
    sessions.push(session)
    this.saveAnalytics(slug, analytics)
    this.saveSessions(slug, sessions)
  }

  // Track reading time for a blog post
  trackReadingTime(slug: string, readTime: number): void {
    if (!this.isClient()) return
    
    const analytics = this.getAnalytics(slug)
    analytics.totalReadTime += readTime

    // Update engagement score
    analytics.engagementScore = this.calculateEngagementScore(analytics, this.getSessions(slug))
    
    this.saveAnalytics(slug, analytics)
  }

  // Track specific engagement actions
  trackEngagement(slug: string, action: string): void {
    if (!this.isClient()) return
    
    const analytics = this.getAnalytics(slug)
    analytics.engagementScore += this.getActionScore(action)
    this.saveAnalytics(slug, analytics)
  }

    // Calculate engagement score based on various factors
  private calculateEngagementScore(analytics: BlogAnalytics, sessions: ViewSession[]): number {
    const completedSessions = sessions.filter(s => s.completed).length
    const baseScore = analytics.views + (completedSessions * 2)
    const readTimeBonus = Math.floor(analytics.totalReadTime / 60) // 1 point per minute
    return baseScore + readTimeBonus
  }

  // Get score for specific actions
  private getActionScore(action: string): number {
    const scores: Record<string, number> = {
      'scroll_25': 1,
      'scroll_50': 2,
      'scroll_75': 3,
      'scroll_complete': 5,
      'feedback': 3,
      'share': 2,
      'bookmark': 1
    }
    return scores[action] || 0
  }

  // Get analytics for a specific blog post
  getAnalytics(slug: string): BlogAnalytics {
    if (!this.isClient()) {
      // Return default analytics for SSR
      return {
        slug,
        views: 0,
        totalReadTime: 0,
        lastViewed: new Date(),
        uniqueViews: 0,
        engagementScore: 0
      }
    }

    const stored = localStorage.getItem(`${this.storageKey}_${slug}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      parsed.lastViewed = new Date(parsed.lastViewed)
      return parsed
    }

    return {
      slug,
      views: 0,
      totalReadTime: 0,
      lastViewed: new Date(),
      uniqueViews: 0,
      engagementScore: 0
    }
  }

  // Get all blog analytics
  getAllAnalytics(): Record<string, BlogAnalytics> {
    if (!this.isClient()) return {}
    
    const allAnalytics: Record<string, BlogAnalytics> = {}
    
    // Get all keys that match our pattern
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(this.storageKey + '_')) {
        const slug = key.replace(this.storageKey + '_', '')
        allAnalytics[slug] = this.getAnalytics(slug)
      }
    }

    return allAnalytics
  }

  // Get popular posts
  getPopularPosts(limit: number = 10): BlogAnalytics[] {
    const allAnalytics = this.getAllAnalytics()
    return Object.values(allAnalytics)
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit)
  }

  // Export analytics data
  exportAnalytics(): string {
    const allData = {
      analytics: this.getAllAnalytics(),
      sessions: this.getAllSessions(),
      exportDate: new Date().toISOString()
    }
    return JSON.stringify(allData, null, 2)
  }

  // Clear all analytics data
  clearAnalytics(): void {
    if (!this.isClient()) return
    
    const keysToRemove: string[] = []
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.startsWith(this.storageKey) || key.startsWith(this.sessionKey))) {
        keysToRemove.push(key)
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  private getSessions(slug: string): ViewSession[] {
    if (!this.isClient()) return []
    
    try {
      const stored = localStorage.getItem(`${this.sessionKey}_${slug}`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private saveAnalytics(slug: string, analytics: BlogAnalytics): void {
    if (!this.isClient()) return
    
    try {
      localStorage.setItem(`${this.storageKey}_${slug}`, JSON.stringify(analytics))
    } catch (error) {
      console.warn('Error saving analytics:', error)
    }
  }

  private saveSessions(slug: string, sessions: ViewSession[]): void {
    if (!this.isClient()) return
    
    try {
      // Keep only last 50 sessions to prevent storage bloat
      const recentSessions = sessions.slice(-50)
      localStorage.setItem(`${this.sessionKey}_${slug}`, JSON.stringify(recentSessions))
    } catch (error) {
      console.warn('Error saving sessions:', error)
    }
  }

  private getAllSessions(): Record<string, ViewSession[]> {
    if (!this.isClient()) return {}
    
    const allSessions: Record<string, ViewSession[]> = {}
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(this.sessionKey + '_')) {
        const slug = key.replace(this.sessionKey + '_', '')
        allSessions[slug] = this.getSessions(slug)
      }
    }

    return allSessions
  }
}

// Export singleton instance
export const blogAnalytics = BlogAnalyticsManager.getInstance()

// React hook for using blog analytics
export function useBlogAnalytics(slug: string) {
  const trackView = (metadata?: { title?: string; category?: string; tags?: string[] }) => {
    blogAnalytics.trackView(slug, metadata)
  }

  const trackReadingTime = (readTime: number) => {
    blogAnalytics.trackReadingTime(slug, readTime)
  }

  const trackEngagement = (action: string) => {
    blogAnalytics.trackEngagement(slug, action)
  }

  const getStats = () => {
    return blogAnalytics.getAnalytics(slug)
  }

  return { trackView, trackReadingTime, trackEngagement, getStats }
}
