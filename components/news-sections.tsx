import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllNewsItems, getFeaturedNews, getRecentNews } from "@/lib/news"
import { NewsClient } from "./news-client"

export async function NewsSection() {
  // Get news items from markdown files
  const allNewsItems = getAllNewsItems()
  const featuredNews = getFeaturedNews()
  const recentNews = getRecentNews()

  return (
    <section id="news" className="py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Latest Updates
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">News & Announcements</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            Stay updated with my latest activities, achievements, and upcoming events
          </p>
        </div>

        <NewsClient 
          allNewsItems={allNewsItems}
          featuredNews={featuredNews}
          recentNews={recentNews}
        />

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/news">
              <span>View All News</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

