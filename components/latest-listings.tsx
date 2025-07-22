"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Gauge, ChevronLeft, ChevronRight } from "lucide-react"

const latestCars = [
  {
    id: 4,
    title: "Toyota Camry Hybrid 2023",
    price: "PKR 65,00,000",
    location: "Karachi, Sindh",
    year: "2023",
    mileage: "8,000 km",
    image: "/car.png?height=200&width=300",
    isNew: true,
  },
  {
    id: 5,
    title: "Honda Accord 2022",
    price: "PKR 58,00,000",
    location: "Lahore, Punjab",
    year: "2022",
    mileage: "18,000 km",
    image: "/car.png?height=200&width=300",
    isNew: false,
  },
  {
    id: 6,
    title: "Lexus ES 300h 2023",
    price: "PKR 1,20,00,000",
    location: "Islamabad, ICT",
    year: "2023",
    mileage: "5,000 km",
    image: "/car.png?height=200&width=300",
    isNew: true,
  },
  {
    id: 7,
    title: "Infiniti Q50 2022",
    price: "PKR 75,00,000",
    location: "Rawalpindi, Punjab",
    year: "2022",
    mileage: "22,000 km",
    image: "/car.png?height=200&width=300",
    isNew: false,
  },
  {
    id: 8,
    title: "Genesis G90 2023",
    price: "PKR 1,50,00,000",
    location: "Karachi, Sindh",
    year: "2023",
    mileage: "3,000 km",
    image: "/car.png?height=200&width=300",
    isNew: true,
  },
]

export default function LatestListings() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= latestCars.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, latestCars.length - itemsPerView) : prev - 1))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-16 animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Latest Arrivals</h2>
            <p className="text-xl text-slate-600">Fresh additions to our premium collection</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full p-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full p-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {latestCars.map((car, index) => (
              <div key={car.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                <div
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={car.image || "/car.png"}
                      alt={car.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {car.isNew && (
                      <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">New Arrival</Badge>
                    )}
                  </div>

                  <div className="p-5">
                    <Link href={`/cars/${car.id}`}>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {car.title}
                      </h3>
                    </Link>

                    <div className="text-xl font-bold text-blue-600 mb-3">{car.price}</div>

                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {car.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          {car.year}
                        </div>
                        <div className="flex items-center">
                          <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                          {car.mileage}
                        </div>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Link href={`/cars/${car.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 animate-fade-in animation-delay-400">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 bg-transparent"
            asChild
          >
            <Link href="/cars">Explore All Cars</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
