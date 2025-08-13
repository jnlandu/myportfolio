'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for client-side only components
const EnhancedBlogFeedback = dynamic(() => import("@/components/enhanced-blog-feedback").then(mod => ({ default: mod.EnhancedBlogFeedback })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-800 h-32 rounded-lg" />
})

const BlogAnalyticsDisplay = dynamic(() => import("@/components/blog-analytics").then(mod => ({ default: mod.BlogAnalyticsDisplay })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-800 h-16 rounded-lg" />
})

const BlogViewTracker = dynamic(() => import("@/components/blog-view-tracker").then(mod => ({ default: mod.BlogViewTracker })), {
  ssr: false
})

interface ClientBlogComponentsProps {
  postId: string
  postTitle: string
  postCategory?: string
  postTags?: string[]
}

export function ClientBlogComponents({ 
  postId, 
  postTitle, 
  postCategory, 
  postTags 
}: ClientBlogComponentsProps) {
  return (
    <>
      {/* Analytics tracking */}
      <BlogViewTracker 
        postId={postId}
        postTitle={postTitle}
        postCategory={postCategory}
        postTags={postTags}
      />
      
      {/* Blog Analytics (for admins/testing) */}
      <div className="mt-8">
        <BlogAnalyticsDisplay slug={postId} compact />
      </div>
      
      {/* Enhanced Feedback Form */}
      <div className="mt-8">
        <EnhancedBlogFeedback slug={postId} title={postTitle} />
      </div>
    </>
  )
}
