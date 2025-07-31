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
        <NewsClient 
          allNewsItems={allNewsItems}
          featuredNews={featuredNews}
          recentNews={recentNews}
        />
      </div>
    </section>
  )
}

