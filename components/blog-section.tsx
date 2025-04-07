import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Calendar, Eye, BookOpen } from "lucide-react"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  readTime?: string
  watchTime?: string
  category: string
  tags: string[]
  type: "video" | "text"
  views: number
  featured?: boolean
}

export function BlogSection() {
  const blogPosts: BlogPost[] = [
    {
      id: "gaussian-processes-explained",
      title: "Gaussian Processes Explained: A Visual Introduction",
      excerpt:
        "A comprehensive tutorial on understanding Gaussian Processes with interactive visualizations and practical examples.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "April 2, 2024",
      readTime: "15 min read",
      category: "Machine Learning",
      tags: ["Gaussian Processes", "Statistics", "Tutorial", "Mathematics"],
      type: "text",
      views: 1245,
      featured: true,
    },
    {
      id: "deep-reinforcement-learning-tutorial",
      title: "Deep Reinforcement Learning for Beginners: Video Tutorial Series",
      excerpt:
        "A step-by-step video tutorial series on implementing Deep Reinforcement Learning algorithms from scratch.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "March 15, 2024",
      watchTime: "45 min watch",
      category: "Reinforcement Learning",
      tags: ["Deep Learning", "RL", "PyTorch", "Tutorial"],
      type: "video",
      views: 2389,
      featured: true,
    },
    {
      id: "functional-data-analysis",
      title: "Introduction to Functional Data Analysis with R",
      excerpt: "Learn the fundamentals of Functional Data Analysis and how to implement key techniques using R.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "February 28, 2024",
      readTime: "12 min read",
      category: "Statistics",
      tags: ["FDA", "R", "Data Analysis", "Tutorial"],
      type: "text",
      views: 876,
    },
    {
      id: "pytorch-for-researchers",
      title: "PyTorch for Mathematical Researchers: Video Guide",
      excerpt: "A comprehensive video guide on using PyTorch for implementing mathematical models in research.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "February 10, 2024",
      watchTime: "35 min watch",
      category: "Deep Learning",
      tags: ["PyTorch", "Research", "Mathematics", "Tutorial"],
      type: "video",
      views: 1532,
    },
    {
      id: "explainable-ai-techniques",
      title: "Explainable AI Techniques: From Theory to Implementation",
      excerpt: "Explore various techniques for making AI models more interpretable and transparent.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "January 25, 2024",
      readTime: "18 min read",
      category: "Explainable AI",
      tags: ["XAI", "Ethics", "AI", "Tutorial"],
      type: "text",
      views: 1089,
    },
    {
      id: "graph-neural-networks",
      title: "Graph Neural Networks Explained: Video Tutorial",
      excerpt: "A visual explanation of Graph Neural Networks with code examples and applications.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "January 12, 2024",
      watchTime: "28 min watch",
      category: "Deep Learning",
      tags: ["GNN", "Graphs", "Neural Networks", "Tutorial"],
      type: "video",
      views: 1876,
    },
    {
      id: "mathematical-foundations-ml",
      title: "Mathematical Foundations of Machine Learning",
      excerpt: "A deep dive into the essential mathematical concepts behind modern machine learning algorithms.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "December 18, 2023",
      readTime: "20 min read",
      category: "Mathematics",
      tags: ["Linear Algebra", "Calculus", "Probability", "Tutorial"],
      type: "text",
      views: 2145,
    },
    {
      id: "bayesian-methods-tutorial",
      title: "Bayesian Methods in Machine Learning: Video Series",
      excerpt: "Learn how to apply Bayesian methods to machine learning problems with practical examples.",
      coverImage: "/placeholder.svg?height=600&width=1200",
      date: "December 5, 2023",
      watchTime: "50 min watch",
      category: "Bayesian Statistics",
      tags: ["Bayesian", "MCMC", "Probabilistic Models", "Tutorial"],
      type: "video",
      views: 1654,
    },
  ]

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <section id="blog" className="py-20 bg-black/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Knowledge Sharing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog & Tutorials</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            Educational content, tutorials, and insights on mathematics, AI, and data science
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6">Featured Tutorials</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="bg-black/50 border-primary/20 overflow-hidden">
                  <div className="relative aspect-video">
                    <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    {post.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" fill="white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-black/70 backdrop-blur-sm">
                        {post.type === "video" ? "Video Tutorial" : "Text Tutorial"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                      <span className="mx-1">•</span>
                      {post.type === "video" ? (
                        <>
                          <Clock className="h-4 w-4" />
                          <span>{post.watchTime}</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                    <Button size="sm">Read More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
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

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Tutorials
          </Button>
        </div>
      </div>
    </section>
  )
}

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
        <Button size="sm" variant="ghost" className="text-primary">
          Read More
        </Button>
      </CardFooter>
    </Card>
  )
}

