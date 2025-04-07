"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Calendar, Eye, BookOpen, ArrowLeft } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { BlogPost, blogPosts } from "@/data/blog-posts"
// import { BlogPost, blogPosts } from "@/data/blog-posts"
// import { blogPosts } from "@/constants/posts"
// import { BlogPost } from "@/data/blog-posts"
// import { BlogPost } from "@/types/blog-post"

// type BlogPost = {
//   id: string
//   title: string
//   excerpt: string
//   coverImage: string
//   date: string
//   readTime?: string
//   watchTime?: string
//   category: string
//   tags: string[]
//   type: "video" | "text"
//   views: number
//   featured?: boolean
// }

// Reusing the same mock data structure from blog-section.tsx
// const blogPosts: BlogPost[] = [
//   {
//     id: "gaussian-processes-explained",
//     title: "Gaussian Processes Explained: A Visual Introduction",
//     excerpt:
//       "A comprehensive tutorial on understanding Gaussian Processes with interactive visualizations and practical examples.",
//     coverImage: "/placeholder.svg?height=600&width=1200",
//     date: "April 2, 2024",
//     readTime: "15 min read",
//     category: "Machine Learning",
//     tags: ["Gaussian Processes", "Statistics", "Tutorial", "Mathematics"],
//     type: "text",
//     views: 1245,
//     featured: true,
//   },
//   {
//     id: "deep-reinforcement-learning-tutorial",
//     title: "Deep Reinforcement Learning for Beginners: Video Tutorial Series",
//     excerpt:
//       "A step-by-step video tutorial series on implementing Deep Reinforcement Learning algorithms from scratch.",
//     coverImage: "/placeholder.svg?height=600&width=1200",
//     date: "March 15, 2024",
//     watchTime: "45 min watch",
//     category: "Reinforcement Learning",
//     tags: ["Deep Learning", "RL", "PyTorch", "Tutorial"],
//     type: "video",
//     views: 2389,
//     featured: true,
//   },
//   // Add more blog posts as needed
// ]

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="bg-black/50 border-primary/20 h-full flex flex-col">
      <div className="relative aspect-video">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        {post.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-black/70 backdrop-blur-sm">
            {post.type === "video" ? "Video" : "Text"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center text-xs text-gray-400">
            <Eye className="h-3 w-3 mr-1" />
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>
        <CardTitle className="text-lg text-primary line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{post.date}</span>
        </div>
        <Link href={`/blog/${post.id}`} passHref>
          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 transition-colors">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function BlogIndexPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-border">
        <div className="container">
          <MainNav />
        </div>
      </div>
      
      <div className="container">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Knowledge Sharing
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Tutorials</h1>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            Educational content, tutorials, and insights on mathematics, AI, and data science
          </p>
        </div>

        {/* Filter tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="all">All Tutorials</TabsTrigger>
            <TabsTrigger value="video">Video Tutorials</TabsTrigger>
            <TabsTrigger value="text">Text Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="video" className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => post.type === "video")
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </TabsContent>

          <TabsContent value="text" className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((post) => post.type === "text")
              .map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}