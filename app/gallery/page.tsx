"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { ExternalLink, X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.jpg",
    title: "AIMS Senegal Campus",
    location: "Mbour, Senegal",
    description: "Beautiful sunset view from the AIMS campus - placeholder image"
  },
  {
    src: "/placeholder.jpg", 
    title: "University of Kinshasa",
    location: "Kinshasa, DR Congo",
    description: "My alma mater where I completed my Bachelor's degree - placeholder image"
  },
  {
    src: "/placeholder.jpg",
    title: "Stellenbosch University",
    location: "Stellenbosch, South Africa", 
    description: "Campus where I completed my Master's degree - placeholder image"
  },
  {
    src: "/placeholder.jpg",
    title: "AI Conference",
    location: "Various Locations",
    description: "Presenting research at international conferences - placeholder image"
  },
  {
    src: "/images/profile.jpg",
    title: "Academic Portrait",
    location: "Professional Setting",
    description: "Professional academic portrait for conferences and publications"
  },
  {
    src: "/placeholder.jpg",
    title: "Research Laboratory",
    location: "AMMI Program",
    description: "Working in the AI research laboratory - placeholder image"
  },
  {
    src: "/placeholder.jpg",
    title: "Conference Presentation",
    location: "International Venue",
    description: "Delivering a presentation at an academic conference - placeholder image"
  },
  {
    src: "/placeholder.jpg",
    title: "Study Group",
    location: "University Campus",
    description: "Collaborative learning session with fellow researchers - placeholder image"
  }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
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
        <div className="container max-w-6xl">
          <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">Travel & Academic Gallery</h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              A visual journey through my academic travels across Africa and beyond. 
              These photos capture the inspiring places where I've studied, researched, 
              and collaborated with fellow academics and researchers.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 transition-transform group-hover:scale-105">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="text-white h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-sm text-gray-400">{image.location}</p>
                    </div>
                  </div>
                </DialogTrigger>

                {/* Individual Image Modal */}
                <DialogContent className="max-w-4xl max-h-[90vh] bg-black/95 border-primary/20">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-primary">{image.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.jpg"
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {image.location}
                      </Badge>
                      <p className="text-sm text-gray-400">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{galleryImages.length}</div>
              <div className="text-sm text-gray-400 mt-1">Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-gray-400 mt-1">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-gray-400 mt-1">Institutions</div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}