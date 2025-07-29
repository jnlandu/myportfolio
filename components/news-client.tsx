"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { type NewsItem } from "@/lib/news"

interface NewsClientProps {
  allNewsItems: NewsItem[]
  featuredNews: NewsItem | null
  recentNews: NewsItem[]
}

export function NewsClient({ allNewsItems, featuredNews, recentNews }: NewsClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const totalPages = Math.ceil(recentNews.length / itemsPerPage)
  const currentItems = recentNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const getCategoryColor = (category: NewsItem["category"]) => {
    switch (category) {
      case "research":
        return "bg-blue-500"
      case "academic":
        return "bg-green-500"
      case "event":
        return "bg-purple-500"
      case "award":
        return "bg-yellow-500"
      case "publication":
        return "bg-red-500"
      case "media":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryLabel = (category: NewsItem["category"]) => {
    switch (category) {
      case "research":
        return "Research"
      case "academic":
        return "Academic"
      case "event":
        return "Event"
      case "award":
        return "Award"
      case "publication":
        return "Publication"
      case "media":
        return "Media"
      default:
        return category
    }
  }

  return (
    <>
      {/* Featured News */}
      {featuredNews && (
        <div className="mb-12">
          <Card className="bg-black/50 border-primary/20 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {featuredNews.image && (
                <div className="relative min-h-[300px]">
                  <Image
                    src={featuredNews.image || "/placeholder.svg"}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary text-white">Featured</Badge>
                    {featuredNews.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getCategoryColor(featuredNews.category)} text-white`}>
                      {getCategoryLabel(featuredNews.category)}
                    </Badge>
                  </div>
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{featuredNews.date}</span>
                    {!featuredNews.image && (
                      <>
                        <div className="flex gap-2 ml-auto">
                          <Badge className="bg-primary text-white">Featured</Badge>
                          {featuredNews.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                        </div>
                        <Badge className={`${getCategoryColor(featuredNews.category)} text-white`}>
                          {getCategoryLabel(featuredNews.category)}
                        </Badge>
                      </>
                    )}
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-primary mb-4">{featuredNews.title}</CardTitle>
                  <CardDescription className="text-gray-400 mb-6 text-base">{featuredNews.summary}</CardDescription>
                </div>
                <div>
                  <Button className="gap-2" asChild>
                    <Link href={`/news/${featuredNews.id}`}>
                      <span>Read Full Story</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* News Categories */}
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid md:grid-cols-2 gap-6">
            {currentItems.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                getCategoryColor={getCategoryColor}
                getCategoryLabel={getCategoryLabel}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="research">
          <div className="grid md:grid-cols-2 gap-6">
            {allNewsItems
              .filter((item) => item.category === "research" && !item.featured)
              .slice(0, 4)
              .map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  getCategoryColor={getCategoryColor}
                  getCategoryLabel={getCategoryLabel}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="grid md:grid-cols-2 gap-6">
            {allNewsItems
              .filter((item) => item.category === "academic" && !item.featured)
              .slice(0, 4)
              .map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  getCategoryColor={getCategoryColor}
                  getCategoryLabel={getCategoryLabel}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid md:grid-cols-2 gap-6">
            {allNewsItems
              .filter((item) => item.category === "event" && !item.featured)
              .slice(0, 4)
              .map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  getCategoryColor={getCategoryColor}
                  getCategoryLabel={getCategoryLabel}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 1} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      )}
    </>
  )
}

function NewsCard({
  item,
  getCategoryColor,
  getCategoryLabel,
}: {
  item: NewsItem
  getCategoryColor: (category: NewsItem["category"]) => string
  getCategoryLabel: (category: NewsItem["category"]) => string
}) {
  return (
    <Card className="bg-black/50 border-primary/20 h-full flex flex-col">
      {item.image ? (
        <div className="grid md:grid-cols-3 h-full">
          <div className="relative md:col-span-1">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            {item.isNew && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-500 text-white">New</Badge>
              </div>
            )}
          </div>
          <div className="p-4 md:col-span-2 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <Badge className={`${getCategoryColor(item.category)} text-white text-xs`}>
                {getCategoryLabel(item.category)}
              </Badge>
            </div>
            <CardTitle className="text-lg text-primary mb-2 line-clamp-2">{item.title}</CardTitle>
            <CardDescription className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
              {item.summary}
            </CardDescription>
            <Button variant="ghost" size="sm" className="text-primary mt-auto self-start" asChild>
              <Link href={`/news/${item.id}`}>
                <span>Read More</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
            <div className="flex gap-2">
              {item.isNew && <Badge className="bg-green-500 text-white text-xs">New</Badge>}
              <Badge className={`${getCategoryColor(item.category)} text-white text-xs`}>
                {getCategoryLabel(item.category)}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg text-primary mb-2">{item.title}</CardTitle>
          <CardDescription className="text-gray-400 text-sm mb-4 flex-grow">{item.summary}</CardDescription>
          <Button variant="ghost" size="sm" className="text-primary mt-auto self-start" asChild>
            <Link href={`/news/${item.id}`}>
              <span>Read More</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      )}
    </Card>
  )
}
