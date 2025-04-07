"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

type Citation = {
  quote: string
  author: string
  source: string
  category: string
  reflection?: string
}

export function CitationsSection() {
  const citations: Citation[] = [
    {
      quote:
        "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
      author: "Albert Einstein",
      source: "Living Philosophies",
      category: "Science",
      reflection:
        "This quote reminds me that curiosity and wonder are at the heart of scientific discovery. The unknown isn't something to fear but to embrace.",
    },
    {
      quote:
        "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.",
      author: "Martin Luther King Jr.",
      source: "The Purpose of Education",
      category: "Education",
      reflection:
        "This philosophy guides my approach to both learning and teaching. Education should develop not just knowledge but wisdom and ethical thinking.",
    },
    {
      quote: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
      author: "William Paul Thurston",
      source: "Mathematical Education",
      category: "Mathematics",
      reflection:
        "This perspective transformed how I approach mathematics - focusing on deep conceptual understanding rather than mere calculation.",
    },
    {
      quote: "In God we trust. All others must bring data.",
      author: "W. Edwards Deming",
      source: "The New Economics",
      category: "Data Science",
      reflection: "A humorous reminder of the importance of evidence-based thinking in research and decision-making.",
    },
    {
      quote: "The goal is to turn data into information, and information into insight.",
      author: "Carly Fiorina",
      source: "Former CEO of Hewlett-Packard",
      category: "Data Science",
      reflection:
        "This captures the essence of my work in data analysis - finding meaningful patterns that lead to actionable insights.",
    },
    {
      quote: "If I have seen further, it is by standing on the shoulders of giants.",
      author: "Isaac Newton",
      source: "Letter to Robert Hooke",
      category: "Science",
      reflection:
        "A humbling reminder that scientific progress is collaborative and builds upon the work of those who came before us.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)

  const nextCitation = () => {
    setDirection("right")
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % citations.length)
      setDirection(null)
    }, 300)
  }

  const prevCitation = () => {
    setDirection("left")
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + citations.length) % citations.length)
      setDirection(null)
    }, 300)
  }

  return (
    <section id="citations" className="py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Words of Wisdom
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Favorite Citations</h2>
          <div className="w-20 h-1 bg-primary rounded mb-6"></div>
          <p className="max-w-2xl text-gray-400">
            Quotes that inspire my thinking and approach to research, education, and life
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevCitation}
              className="rounded-full bg-background/50 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous quote</span>
            </Button>
          </div>

          <div className="overflow-hidden py-8">
            <div
              className={`transition-transform duration-300 ease-in-out ${
                direction === "left"
                  ? "transform -translate-x-10 opacity-0"
                  : direction === "right"
                    ? "transform translate-x-10 opacity-0"
                    : ""
              }`}
            >
              <Card className="bg-black/50 border-primary/20">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>

                    <blockquote className="text-xl md:text-2xl font-medium text-center mb-6 italic">
                      "{citations[currentIndex].quote}"
                    </blockquote>

                    <div className="mb-6">
                      <p className="text-primary font-semibold">{citations[currentIndex].author}</p>
                      <p className="text-sm text-gray-400">{citations[currentIndex].source}</p>
                    </div>

                    <Badge variant="secondary" className="mb-6">
                      {citations[currentIndex].category}
                    </Badge>

                    {citations[currentIndex].reflection && (
                      <div className="mt-6 border-t border-border pt-6">
                        <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Personal Reflection</h4>
                        <p className="text-gray-300">{citations[currentIndex].reflection}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextCitation}
              className="rounded-full bg-background/50 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next quote</span>
            </Button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {citations.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-primary" : "bg-gray-600"}`}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left")
                  setTimeout(() => {
                    setCurrentIndex(index)
                    setDirection(null)
                  }, 300)
                }}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

