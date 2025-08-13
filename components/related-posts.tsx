import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, BookOpen, Eye, Play, ArrowRight } from "lucide-react"
import { BlogPost, getAllBlogPosts } from "@/lib/blog"

interface RelatedPostsProps {
  currentPost: BlogPost
  maxPosts?: number
}

export function RelatedPosts({ currentPost, maxPosts = 3 }: RelatedPostsProps) {
  const allPosts = getAllBlogPosts()
  
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id)
  
  // Find related posts by category and tags
  const relatedPosts = otherPosts
    .map(post => {
      let score = 0
      
      // Same category gets high score
      if (post.category === currentPost.category) {
        score += 10
      }
      
      // Shared tags get points
      const sharedTags = (post.tags || []).filter(tag => 
        (currentPost.tags || []).includes(tag)
      )
      score += sharedTags.length * 3
      
      // Same type gets small bonus
      if (post.type === currentPost.type) {
        score += 2
      }
      
      return { ...post, relevanceScore: score }
    })
    .filter(post => post.relevanceScore > 0) // Only posts with some relevance
    .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
    .slice(0, maxPosts)

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < maxPosts) {
    const recentPosts = otherPosts
      .filter(post => !relatedPosts.find(rp => rp.id === post.id))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxPosts - relatedPosts.length)
    
    relatedPosts.push(...recentPosts.map(post => ({ ...post, relevanceScore: 0 })))
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Related Posts</h2>
          <p className="text-gray-400">
            More content from the <span className="text-primary">{currentPost.category}</span> category
            {currentPost.tags && currentPost.tags.length > 0 && (
              <span> and similar topics</span>
            )}
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/blog">
            View All Posts
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <RelatedPostCard key={post.id} post={post} currentPost={currentPost} />
        ))}
      </div>
    </section>
  )
}

function RelatedPostCard({ post, currentPost }: { post: BlogPost & { relevanceScore?: number }, currentPost: BlogPost }) {
  // Determine what makes this post related
  const isCategory = post.category === currentPost.category
  const sharedTags = (post.tags || []).filter(tag => 
    (currentPost.tags || []).includes(tag)
  )

  return (
    <Card className="bg-black/50 border-primary/20 h-full flex flex-col hover:bg-black/70 transition-all duration-300 hover:scale-105">
      <div className="relative aspect-video">
        <Image 
          src={post.coverImage || "/placeholder.svg"} 
          alt={post.title} 
          fill 
          className="object-cover rounded-t-lg" 
        />
        {post.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-black/70 backdrop-blur-sm">
            {post.type === "video" ? "Video" : "Article"}
          </Badge>
        </div>
        
        {/* Relevance indicator */}
        {isCategory && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-white text-xs">
              Same Category
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center text-xs text-gray-400">
            <Eye className="h-3 w-3 mr-1" />
            <span>{(post.views || 0).toLocaleString()}</span>
          </div>
        </div>
        <CardTitle className="text-lg text-primary line-clamp-2 hover:text-primary/80 transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-400 text-sm line-clamp-3 mb-3">{post.excerpt}</p>
        
        {/* Show shared tags */}
        {sharedTags.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Shared topics:</p>
            <div className="flex flex-wrap gap-1">
              {sharedTags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs bg-primary/10 border-primary/30 text-primary">
                  {tag}
                </Badge>
              ))}
              {sharedTags.length > 2 && (
                <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30 text-primary">
                  +{sharedTags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Other tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.filter(tag => !sharedTags.includes(tag)).slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs bg-gray-800/50 border-gray-700 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-400">
          {/* <Calendar className="h-3 w-3 mr-1" /> */}
        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          {post.type === "video" ? (
            <>
              <Clock className="h-3 w-3 ml-3 mr-1" />
              <span>{post.watchTime}</span>
            </>
          ) : (
            <>
              {/* <BookOpen className="h-3 w-3 ml-3 mr-1" /> */}
              <span>{post.readTime}</span>
            </>
          )}
        </div>
        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 transition-colors" asChild>
          <Link href={`/blog/${post.id}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
