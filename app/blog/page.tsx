import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Calendar, Eye, BookOpen, ArrowLeft } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { BlogPost, getAllBlogPosts } from "@/lib/blog"
import { JsonLd } from "@/components/json-ld"
import { generateSEO, generateJSONLD, siteConfig } from "@/lib/seo"

// Generate SEO metadata for blog listing page
export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: "Latest insights on Machine Learning, AI Research, Functional Data Analysis, and Mathematical Modeling by Jérémie N. Mabiala. Explore tutorials, research papers, and technical guides.",
  url: `${siteConfig.url}/blog`,
  keywords: ["machine learning blog", "AI research", "data science tutorials", "mathematical modeling", "deep learning guides", "statistics", "research papers"]
})

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

export default async function BlogIndexPage() {
  // Fetch blog posts server-side
  const blogPosts = getAllBlogPosts()

  // Generate structured data for blog listing
  const blogJsonLd = generateJSONLD({
    type: 'BlogPosting',
    name: "Jérémie N. Mabiala's Blog",
    description: "Latest insights on Machine Learning, AI Research, and Mathematical Modeling",
    url: `${siteConfig.url}/blog`,
    additionalData: {
      '@type': 'Blog',
      author: {
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.url
      },
      publisher: {
        '@type': 'Person',
        name: siteConfig.author.name
      },
      blogPost: blogPosts.slice(0, 10).map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${siteConfig.url}/blog/${post.id}`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: siteConfig.author.name
        }
      }))
    }
  })

  return (
    <>
      <JsonLd data={blogJsonLd} />
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Tutorials</h1>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            You will find below  text and video tutorials, and  insights on math, AI, ML and data science.
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
            {blogPosts.map((post: BlogPost) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="video" className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((post: BlogPost) => post.type === "video")
              .map((post: BlogPost) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </TabsContent>

          <TabsContent value="text" className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((post: BlogPost) => post.type === "text")
              .map((post: BlogPost) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
    </>
  )
}