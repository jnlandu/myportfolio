import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import { getNewsItemBySlug, generateNewsStaticParams, type NewsItem } from "@/lib/news"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import "katex/dist/katex.min.css"
import "@/styles/katex-dark.css"

interface NewsPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return generateNewsStaticParams()
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params
  const newsItem = getNewsItemBySlug(id)

  if (!newsItem) {
    return {
      title: 'News Item Not Found',
    }
  }

  return {
    title: `${newsItem.title} - Jérémie N. Mabiala`,
    description: newsItem.summary,
    keywords: ['news', newsItem.category, 'research', 'academic', 'AI', 'machine learning'],
  }
}

export default async function NewsItemPage({ params }: NewsPageProps) {
  const { id } = await params
  const newsItem = getNewsItemBySlug(id)

  if (!newsItem) {
    notFound()
  }

  const getCategoryColor = (category: NewsItem["category"]) => {
    switch (category) {
      case "research": return "bg-blue-500"
      case "academic": return "bg-green-500"
      case "event": return "bg-purple-500"
      case "award": return "bg-yellow-500"
      case "publication": return "bg-red-500"
      case "media": return "bg-orange-500"
      default: return "bg-gray-500"
    }
  }

  const getCategoryLabel = (category: NewsItem["category"]) => {
    switch (category) {
      case "research": return "Research"
      case "academic": return "Academic"
      case "event": return "Event"
      case "award": return "Award"
      case "publication": return "Publication"
      case "media": return "Media"
      default: return category
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container max-w-7xl">
          <MainNav />
        </div>
      </header>

      <main className="bg-black text-white min-h-screen pt-8 pb-20">
        <div className="container max-w-4xl">
          <Link href="/news" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to news
          </Link>

          {/* Hero Image */}
          {newsItem.image && (
            <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
              <Image 
                src={newsItem.image} 
                alt={newsItem.title} 
                fill 
                className="object-cover" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={`${getCategoryColor(newsItem.category)} text-white`}>
                  {getCategoryLabel(newsItem.category)}
                </Badge>
                {newsItem.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                {newsItem.featured && <Badge className="bg-primary text-white">Featured</Badge>}
              </div>
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex gap-2">
                <Badge className={`${getCategoryColor(newsItem.category)} text-white`}>
                  {getCategoryLabel(newsItem.category)}
                </Badge>
                {newsItem.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{newsItem.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{newsItem.summary}</p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert prose-headings:text-primary prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-blue-400 prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:text-gray-100 prose-img:rounded-lg prose-blockquote:border-l-primary prose-blockquote:bg-gray-800/50 prose-strong:text-white prose-em:text-gray-300 max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
              components={{
                h1: ({node, ...props}) => {
                  const text = String(props.children)
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
                  return <h1 id={id} className="text-4xl font-bold mb-6 mt-8 text-primary border-b border-gray-700 pb-2" {...props} />
                },
                h2: ({node, ...props}) => {
                  const text = String(props.children)
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
                  return <h2 id={id} className="text-3xl font-bold mb-4 mt-8 text-primary" {...props} />
                },
                h3: ({node, ...props}) => {
                  const text = String(props.children)
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
                  return <h3 id={id} className="text-2xl font-semibold mb-3 mt-6 text-primary" {...props} />
                },
                h4: ({node, ...props}) => {
                  const text = String(props.children)
                  const id = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
                  return <h4 id={id} className="text-xl font-semibold mb-2 mt-4 text-primary" {...props} />
                },
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-200" {...props} />,
                code: ({node, inline, className, children, ...props}: any) => {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline ? (
                    <div className="relative mb-4">
                      <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                        <code className={`${className} text-sm text-gray-100`} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm" {...props}>
                      {children}
                    </code>
                  )
                },
                ul: ({node, ...props}) => <ul className="mb-4 space-y-2 list-disc list-inside text-gray-200" {...props} />,
                ol: ({node, ...props}) => <ol className="mb-4 space-y-2 list-decimal list-inside text-gray-200" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-200" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary bg-gray-800/50 pl-4 py-2 mb-4 italic text-gray-300" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline" {...props} />,
                // Ensure math blocks are properly styled
                div: ({node, className, ...props}) => {
                  if (className === 'math math-display') {
                    return <div className="katex-display my-6 text-center overflow-x-auto" {...props} />
                  }
                  return <div className={className} {...props} />
                },
                span: ({node, className, ...props}) => {
                  if (className === 'math math-inline') {
                    return <span className="katex-inline" {...props} />
                  }
                  return <span className={className} {...props} />
                },
                pre: ({children}) => <div className="my-6">{children}</div>
              }}
            >
              {newsItem.content}
            </ReactMarkdown>
          </div>

          {/* Share and Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="font-medium mb-2">Share this news</h3>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Link href="/news">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                All News
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
