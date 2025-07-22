"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "/car.png?height=500&width=800",
  "/car.png?height=500&width=800",
  "/car.png?height=500&width=800",
  "/car.png?height=500&width=800",
  "/car.png?height=500&width=800",
  "/car.png?height=500&width=800",
]

export default function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-slate-100 rounded-2xl overflow-hidden group">
        <Image
          src={images[currentImage] || "/car.png"}
          alt="Car Image"
          width={800}
          height={500}
          className="w-full h-96 lg:h-[500px] object-cover"
        />

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          onClick={prevImage}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          onClick={nextImage}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          <Maximize2 className="w-5 h-5" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              currentImage === index ? "border-blue-600 scale-105" : "border-transparent hover:border-slate-300"
            }`}
          >
            <Image
              src={image || "/car.png"}
              alt={`Thumbnail ${index + 1}`}
              width={120}
              height={80}
              className="w-24 h-16 lg:w-28 lg:h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
