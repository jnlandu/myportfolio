import Link from "next/link"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { NewsSection } from "@/components/news-sections"
import { ArrowLeft } from "lucide-react"

// Generate SEO metadata for news page
export const metadata: Metadata = {
  title: "News & Announcements - Jérémie N. Mabiala",
  description: "Stay updated with the latest news, achievements, and announcements from Jérémie N. Mabiala's academic and research journey.",
  keywords: ["news", "announcements", "research updates", "academic achievements", "AI research", "machine learning"],
}

export default function NewsPage() {
  return (
    <>
      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container max-w-7xl">
          <MainNav />
        </div>
      </header>

      <main className="bg-black text-white min-h-screen pt-8 pb-20">
        <div className="container max-w-6xl">
          <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          {/* Page Header */}
          <div className="mb-12">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-4">
                Latest Updates
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">News & Announcements</h1>
              <div className="w-20 h-1 bg-primary rounded mb-6"></div>
              <p className="max-w-3xl text-gray-400 text-lg">
                Stay updated with my latest activities, research breakthroughs, academic achievements, 
                and upcoming events in the world of AI and Machine Learning.
              </p>
            </div>
          </div>

          {/* News Section Component */}
          <div className="pt-0">
            <NewsSection />
          </div>
        </div>
      </main>
    </>
  )
}
