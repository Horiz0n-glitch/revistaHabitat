"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ArticleGalleryProps {
  images: string[]
  title: string
}

export function ArticleGallery({ images, title }: ArticleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    if (selectedImage === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null)
      } else if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))
      } else if (e.key === "ArrowRight") {
        setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, images.length])

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  if (!images || images.length === 0) return null

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground">Galería</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative aspect-[4/3] overflow-hidden bg-muted group cursor-pointer rounded-sm"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} - Imagen ${index + 1}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {index + 1}/{images.length}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/97 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
            aria-label="Cerrar galería"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Image Container */}
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={`${title} - Imagen ${selectedImage + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
