"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Gauge, Heart, Star, Eye, Phone, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { SkeletonGrid } from "./skeleton-card"
import { formatPrice } from "@/lib/common-functions"

interface CarGridProps {
  viewMode?: "grid" | "list"
  sortBy?: string
  filters?: any
}

export default function CarGrid({ viewMode = "grid", sortBy = "latest", filters }: CarGridProps) {
  const [filteredCars, setFilteredCars] = useState<any[]>([])
  const [unfilteredCars, setUnfilteredCars] = useState<any[]>([])
  const [isDataUpdated, setIsDataUpdated] = useState(false)
  const handleContactDealer = (carId: number) => {
    // Simulate contact functionality
    alert(`Contacting dealer for car ID: ${carId}`)
  }

  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Cars details:", data)
        if(data.cars && data.cars.length > 0) {
          setUnfilteredCars(data.cars)
          setFilteredCars(data.cars)
          setIsDataUpdated(true)
        }
        else {
          console.error("No cars found in the response")
          setIsDataUpdated(false)
        }
      })
      .catch(err => console.error("Error fetching cars:", err))
  }, [])
  const handleWhatsApp = (carId: number) => {
    // Simulate WhatsApp functionality
    const message = `Hi, I'm interested in the car with ID: ${carId}`
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }
  // Apply filters if provided
  // Enhanced filtering logic
  const filterCars = () => {
    let filtered = unfilteredCars
    if (filters) {
      filtered = unfilteredCars.filter(car => {
        let matches = true

        // Location filter (city or province)
        if (filters.city && !car.city.toLowerCase().includes(filters.city.toLowerCase()) && filters.city !== "all") {
          matches = false
        }

        if ((filters.make && !car.title.toLowerCase().includes(filters.make.toLowerCase())) && filters.make !== "" && filters.make !== "all") {
          matches = false
        }

        if ((filters.model && !car.title.toLowerCase().includes(filters.model.toLowerCase())) && filters.model !== "" && filters.model !== "all") {
          matches = false
        }

        // Year range filter
        if (filters.yearfrom && Number(car.year) < Number(filters.yearfrom)) {
          matches = false
        }
        if (filters.yearto && Number(car.year) > Number(filters.yearto)) {
          matches = false
        }

        // Price range filter
        if (filters.priceRange && Array.isArray(filters.priceRange)) {
          // const carPrice = parseInt(car.price.replace(/[^\d]/g, ""))
          if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
            matches = false
          }
        }

        // Query filter (search in title)
        if (filters.query && !car.title.toLowerCase().includes(filters.query.toLowerCase())) {
          matches = false
        }

        // Body type filter (if available)
        if (filters.bodyType && car.bodyType && car.bodyType !== filters.bodyType) {
          matches = false
        }

        // Fuel type filter (if available)
        if (filters.fuelType && car.fuelType && car.fuelType !== filters.fuelType) {
          matches = false
        }

        // Add more filter rules as needed

        return matches
      })
    }

    console.log("Filtered Cars:", filtered)

    // Sort the filtered cars based on sortBy
    if (sortBy === "latest") {
      filtered.sort((a, b) => b.year - a.year)
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) =>a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "year-new") {
      filtered.sort((a, b) => b.year - a.year)
    } else if (sortBy === "mileage-low") {
      filtered.sort((a, b) => a.mileage - b.mileage)
    } else if (sortBy === "mileage-high") {
      filtered.sort((a, b) => b.mileage - a.mileage)
    }


    setFilteredCars(filtered)
  }

  useEffect(() => {
    filterCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy])

  if (!isDataUpdated) {
    return (
      <SkeletonGrid />
    )
  }
  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <p className="text-slate-600">
              Showing <span className="font-semibold">{filteredCars.length}</span> results
            </p>
          </div>
        </div>

        {/* Car List */}
        <div className="space-y-4">
          {filteredCars.map((car, index) => (
            <div
              key={car.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200/50 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                  <Image
                    src={car.images[0] || "/car.png"}
                    alt={car.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  {car.badge && (
                    <div
                      className={`absolute top-4 left-4 ${car.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                    >
                      {car.badge}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-slate-700">{car.rating}</span>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link href={`/cars/${car.id}`}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-poppins">
                          {car.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold text-blue-600">{formatPrice(car.price)} PKR</div>
                        {car.originalPrice && (
                          <div className="text-lg text-slate-500 line-through">{formatPrice(car.originalPrice)} PKR</div>
                        )}
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-red-50">
                      <Heart className="w-5 h-5 text-slate-600 hover:text-red-500" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-slate-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {car.city}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {car.year}
                    </div>
                    <div className="flex items-center">
                      <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                      {car.mileage}
                    </div>
                  </div>

                  <div className="flex gap-3 w-full h-[50px] md:h-[40px]">
                    <Button
                      asChild
                      className="flex-1 text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-full"
                    >
                      <Link href={`/cars/${car.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" onClick={() => handleContactDealer(car.id)} className="bg-transparent h-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleWhatsApp(car.id)}
                      className="bg-transparent border-green-500 text-green-600 hover:bg-green-50 h-full"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <p className="text-slate-600">
            Showing <span className="font-semibold">{filteredCars.length}</span> results
          </p>
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCars.map((car, index) => (
          <div
            key={car.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 animate-slide-up hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden">
              <Image
                src={car.images[0] || "/car.png"}
                alt={car.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Badges */}
              {car.badge && (
                <div
                  className={`absolute top-4 left-4 ${car.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                >
                  {car.badge}
                </div>
              )}

              {/* Heart Icon */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              >
                <Heart className="w-4 h-4 text-slate-600 hover:text-red-500" />
              </Button>

              {/* Views Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Eye className="w-3 h-3 text-white mr-1" />
                <span className="text-xs text-white">{car.views}</span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-slate-700">{car.rating}</span>
              </div>
            </div>

            <div className="p-6">
              <Link href={`/cars/${car.id}`}>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-poppins line-clamp-1">
                  {car.title}
                </h3>
              </Link>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatPrice(car.price)} PKR</div>
                  {car.originalPrice && <div className="text-sm text-slate-500 line-through">{formatPrice(car.originalPrice)} PKR</div>}
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  {car.city}
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

              <div className="flex gap-2 w-full h-[50px] md:h-[40px]">
                <Button
                  asChild
                  className="flex-1 text-md h-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Link href={`/cars/${car.id}`}>View Details</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWhatsApp(car.id)}
                  className="px-4 hover:bg-green-50 hover:border-green-300 bg-transparent h-full"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8 animate-fade-in animation-delay-600">
        <Button
          size="lg"
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 bg-transparent"
        >
          Load More Cars
        </Button>
      </div>
    </div>
  )
}
