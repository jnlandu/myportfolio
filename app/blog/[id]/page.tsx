// Removed "use client" - This is now a Server Component

import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation" // Import notFound
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, Eye, ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import "katex/dist/katex.min.css" 
import { JsonLd } from "@/components/json-ld"
import { generateBlogSEO, siteConfig } from "@/lib/seo"

// Import the new blog data fetching functions
import { getBlogPostBySlug, getAllBlogPosts, BlogPost } from "@/lib/blog" 
// import { use } from "react"

// Function to generate static paths at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    id: post.id,
  }))
}

// Dynamic metadata generation for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = getBlogPostBySlug(id)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const { metadata } = generateBlogSEO({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.id,
    publishedDate: post.date,
    category: post.category || 'Blog',
    tags: post.tags || [],
    coverImage: post.coverImage
  })

  return metadata
}

// Define props type including params
type BlogPostPageProps = {
  params: Promise<{
    id: string
  }>
}

// The page component now accepts params directly
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  
  // Fetch post data using the new utility function
  const post = getBlogPostBySlug(id)
  
  if (!post) {
    notFound()
  }

  // Generate structured data for the blog post
  const { jsonLD } = generateBlogSEO({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.id,
    publishedDate: post.date,
    category: post.category || 'Blog',
    tags: post.tags || [],
    coverImage: post.coverImage
  })

  return (
    <>
      <JsonLd data={jsonLD} />
      <main className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all tutorials
        </Link>

        {/* Hero section */}
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          {/* Use post.coverImage */}
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary text-white">{post.category}</Badge>
            <Badge variant="outline" className="bg-black/70 backdrop-blur-sm">
              {post.type === "video" ? "Video Tutorial" : "Text Tutorial"}
            </Badge>
          </div>
        </div>

        {/* Post header */}
        <div className="mb-8">
          {/* Use post.title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {/* Use post.date */}
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
            {post.type === "video" ? (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {/* Use post.watchTime */}
                <span>{post.watchTime}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                {/* Use post.readTime */}
                <span>{post.readTime}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              {/* Use post.views */}
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Use post.tags */}
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Video embed for video content */}
        {post.type === "video" && post.videoUrl && (
          <div className="mb-8 rounded-lg overflow-hidden aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src={post.videoUrl} 
              title={post.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}

        {/* Post content with Markdown */}
        {/* Use post.content */}
        <div className="prose prose-invert prose-headings:text-primary prose-a:text-blue-400 prose-code:bg-gray-800 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-img:rounded-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
          >
            {post.content} 
          </ReactMarkdown>
        </div>
        
        {/* Share and navigation (remains the same) */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h3 className="font-medium mb-2">Share this post</h3>
            <div className="flex gap-2">
              {/* Add actual sharing links here */}
              <Button size="icon" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Button>
              <Button size="icon" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Button>
              <Button size="icon" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Button>
            </div>
          </div>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Tutorials
            </Button>
          </Link>
        </div>
      </div>
    </main>
    </>
  )
}