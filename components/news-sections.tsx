"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"

type NewsItem = {
  id: string
  title: string
  summary: string
  content?: string
  image?: string
  date: string
  category: "research" | "academic" | "event" | "award" | "publication" | "media"
  url?: string
  isNew?: boolean
  featured?: boolean
}

export function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const newsItems: NewsItem[] = [
    {
      id: "ammi-admission",
      title: "Accepted into the African Masters in Machine Intelligence (AMMI) Program",
      summary:
        "Excited to announce my acceptance into the prestigious AMMI program at AIMS Senegal, founded by Google and Meta.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 15, 2024",
      category: "academic",
      isNew: true,
      featured: true,
    },
    {
      id: "research-grant",
      title: "Received Research Grant for Explainable AI Project",
      summary:
        "Our team has been awarded a significant grant to further our research on transparent decision-making in AI systems.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 10, 2024",
      category: "research",
      isNew: true,
    },
    {
      id: "conference-speaker",
      title: "Invited Speaker at the International Conference on Machine Learning Applications",
      summary:
        "I'll be presenting our latest research on Gaussian Processes for Multivariate Functional Data at ICMLA 2024.",
      date: "March 5, 2024",
      category: "event",
      isNew: true,
    },
    {
      id: "masters-graduation",
      title: "Graduated with Master's Degree from Stellenbosch University",
      summary: "Proud to announce my graduation from Stellenbosch University with a Master's in Mathematical Sciences.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 28, 2024",
      category: "academic",
    },
    {
      id: "paper-accepted",
      title: "Research Paper Accepted for Publication",
      summary:
        "Our paper on 'Transparent Decision-Making for Electric Vehicle Routing' has been accepted for publication in a leading journal.",
      date: "February 20, 2024",
      category: "publication",
    },
    {
      id: "workshop-facilitator",
      title: "Facilitating Workshop on Deep Learning Fundamentals",
      summary:
        "I'll be leading a three-day workshop on deep learning fundamentals for graduate students at the University of Kinshasa.",
      date: "February 15, 2024",
      category: "event",
    },
    {
      id: "media-interview",
      title: "Featured in 'African Innovators' Magazine",
      summary:
        "Honored to be profiled in this month's issue of 'African Innovators' magazine, discussing the future of AI research in Africa.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 10, 2024",
      category: "media",
    },
    {
      id: "research-collaboration",
      title: "New Research Collaboration with International Partners",
      summary:
        "Excited to announce a new research collaboration with partners from Tunisia, Senegal, and DR Congo on explainable AI applications.",
      date: "February 5, 2024",
      category: "research",
    },
    {
      id: "award-recognition",
      title: "Received Outstanding Young Researcher Award",
      summary:
        "Honored to receive the Outstanding Young Researcher Award from the African Mathematical Society for contributions to functional data analysis.",
      image: "/placeholder.svg?height=400&width=600",
      date: "January 25, 2024",
      category: "award",
    },
    {
      id: "teaching-appointment",
      title: "Appointed as Guest Lecturer at AIMS South Africa",
      summary:
        "I've been appointed as a guest lecturer for the upcoming term at AIMS South Africa, teaching advanced topics in statistical learning.",
      date: "January 15, 2024",
      category: "academic",
    },
  ]

  const featuredNews = newsItems.find((item) => item.featured)
  const recentNews = newsItems.filter((item) => !item.featured)

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
              {recentNews
                .filter((item) => item.category === "research")
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
              {recentNews
                .filter((item) => item.category === "academic")
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
              {recentNews
                .filter((item) => item.category === "event")
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

