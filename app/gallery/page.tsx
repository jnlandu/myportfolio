"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "/images/travel/senegal-1.jpg",
    title: "AIMS Senegal Campus",
    location: "Mbour, Senegal",
    description: "Beautiful sunset view from the AIMS campus"
  },
  {
    src: "/images/travel/congo-1.jpg", 
    title: "University of Kinshasa",
    location: "Kinshasa, DR Congo",
    description: "My alma mater where I completed my Bachelor's degree"
  },
  {
    src: "/images/travel/southafrica-1.jpg",
    title: "Stellenbosch University",
    location: "Stellenbosch, South Africa", 
    description: "Campus where I completed my Master's degree"
  },
  {
    src: "/images/travel/conference-1.jpg",
    title: "AI Conference",
    location: "Various Locations",
    description: "Presenting research at international conferences"
  },
  // Add more images as needed
]

interface GalleryModalProps {
  children: React.ReactNode
}

const GalleryModal = ({ children }: GalleryModalProps) =>{
  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-black/95 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">Travel Photography Gallery</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
          {/* Main Image Display */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  const target = e.target as HTMLImageElement
                  target.src = "/images/placeholder-travel.jpg"
                }}
              />
              
              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-sm text-white">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
            
            {/* Image Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                {galleryImages[selectedImage].title}
              </h3>
              <Badge variant="outline" className="text-xs">
                {galleryImages[selectedImage].location}
              </Badge>
              <p className="text-sm text-gray-400">
                {galleryImages[selectedImage].description}
              </p>
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div>
            <h4 className="text-md font-medium mb-4 text-gray-300">All Photos</h4>
            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                    selectedImage === index 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/placeholder-travel.jpg"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                </button>
              ))}
            </div>
            
            {/* Gallery Description */}
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h4 className="font-medium mb-2 text-primary">About This Gallery</h4>
              <p className="text-sm text-gray-400">
                A visual journey through my academic travels across Africa and beyond. 
                These photos capture the inspiring places where I've studied, researched, 
                and collaborated with fellow academics and researchers.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default GalleryModal