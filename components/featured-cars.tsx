"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Gauge, Heart, Star, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { formatPrice } from "@/lib/common-functions"
import { SkeletonGrid } from "./skeleton-card"

export default function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<any>()
  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const fetchCars = () =>{
    fetch("/api/cars/featured")
    .then(res => res.json())
    .then(data => {
      console.log(data.cars)
      if(data.cars && data.cars.length>0)
        setFeaturedCars(data.cars)
      else
        console.log("Error fetching cars")
      setIsDataUpdated(true)
    })
  }

  useEffect(()=>{
    fetchCars()
  },[])

  if (isDataUpdated && featuredCars?.length === 0) {
    return (
      <></>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Featured Premium Cars</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Handpicked luxury vehicles from our premium collection
          </p>
        </div>

        {(!isDataUpdated)? (
          <div className="max-w-7xl block mx-auto px-4">
            <SkeletonGrid numbers={3} />
          </div>
        ) : 
        (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car:any, index:number) => (
            <div
              key={car.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={car.images[0] || "/car.png"}
                  alt={car.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  className="w-full h-54 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 ${car.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {car.badge}
                </div>

                {/* Heart Icon */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 text-slate-600 hover:text-red-500" />
                </Button>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <Eye className="w-3 h-3 text-white mr-1" />
                  <span className="text-xs text-white">{car.views}</span>
                </div>
              </div>

              <div className="p-6">
                <Link href={`/cars/${car.id}`}>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-poppins">
                    {car.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{formatPrice(car.price)} PKR</div>
                    {car.originalPrice && (
                      <div className="text-sm text-slate-500 line-through">{formatPrice(car.originalPrice)} PKR</div>
                    )}
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

                <div className="flex gap-2 w-full h-[45px] md:h-[40px]">
                  <Button
                    asChild
                    className="flex-1 text-md h-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Link href={`/cars/${car.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="px-4 bg-transparent h-full">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
        <div className="text-center mt-12 animate-fade-in animation-delay-600">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 bg-transparent"
            asChild
          >
            <Link href="/cars">View All Featured Cars</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
