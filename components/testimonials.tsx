"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Business Owner",
    location: "Karachi",
    rating: 5,
    comment:
      "Exceptional service! Found my dream BMW through CarLo. The process was smooth and transparent. Highly recommended for luxury car buyers.",
    image: "/car.png?height=80&width=80",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Doctor",
    location: "Lahore",
    rating: 5,
    comment:
      "Outstanding experience from start to finish. The team was professional, knowledgeable, and helped me find the perfect Mercedes. Will definitely use again!",
    image: "/car.png?height=80&width=80",
  },
  {
    id: 3,
    name: "Muhammad Ali",
    role: "Engineer",
    location: "Islamabad",
    rating: 5,
    comment:
      "Best car marketplace in Pakistan! Great selection of premium vehicles and excellent customer service. Bought my Audi here and couldn't be happier.",
    image: "/car.png?height=80&width=80",
  },
  {
    id: 4,
    name: "Fatima Sheikh",
    role: "Entrepreneur",
    location: "Rawalpindi",
    rating: 5,
    comment:
      "Incredible platform with verified dealers and quality cars. The buying process was hassle-free and the support team was always available to help.",
    image: "/car.png?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">What Our Customers Say</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real experiences from satisfied customers who found their dream cars with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/50 animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <Quote className="w-12 h-12 text-blue-600/30" />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full p-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full p-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed font-medium">
                "{testimonials[currentIndex].comment}"
              </blockquote>

              <div className="flex items-center justify-center">
                <Image
                  src={testimonials[currentIndex].image || "/car.png"}
                  alt={testimonials[currentIndex].name}
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-slate-600">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 w-8" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
