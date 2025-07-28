// Export blog utilities and types from the new markdown-based system
export { getAllBlogPosts, getBlogPostBySlug, getBlogCategories, getBlogTags } from '@/lib/blog'
export type { BlogPost } from '@/lib/blog'

// For backward compatibility, provide a safe getter for blog posts
export const getBlogPosts = () => {
  try {
    const { getAllBlogPosts } = require('@/lib/blog')
    return getAllBlogPosts()
  } catch (error) {
    console.warn('Failed to load blog posts:', error)
    return []
  }
}

// Export the blog posts with fallback for compatibility
export const blogPosts = getBlogPosts()
