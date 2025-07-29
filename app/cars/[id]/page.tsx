"use client"
import ImageCarousel from "@/components/image-carousel"
import CarSpecs from "@/components/car-specs"
import ContactSection from "@/components/contact-section"
import RelatedCars from "@/components/related-cars"
import { useEffect, useState } from "react"
import { SkeletonCard } from "@/components/skeleton-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Car, User } from "@/types/types"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [carDetails, setCarDetails] = useState<Car | null>(null)
  const [seller, setSeller] = useState<User | null>(null)
  const [relatedCars, setRelatedCars] = useState<Car[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/car/" + params.id)
        if (!res.ok) {
          throw new Error(`Failed to fetch car details: ${res.status}`)
        }
        const data = await res.json()
        console.log("Fetched Car details:", data)
        setCarDetails(data.car)
        setSeller(data.seller)
        setRelatedCars(data.relatedCars)
      } catch (err) {
        console.error("Error fetching cars:", err)
        setError(err instanceof Error ? err.message : "Failed to load car details")
      } finally {
        setIsDataLoading(false)
      }
    }
    fetchData()
  }, [params.id])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  if (isDataLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="min-h-screen flex flex-col md:flex-row justify-center pt-[130px] gap-8">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-[90vw] md:w-[60vw] lg:w-[45vw] h-[500px]" />
            <Skeleton className="w-[90vw] md:w-[60vw] lg:w-[45vw] h-[200px]" />
            <Skeleton className="w-[90vw] md:w-[60vw] lg:w-[45vw] h-[300px]" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="w-[90vw] md:w-[20vw] h-[400px]" />
              <Skeleton className="w-[90vw] md:w-[20vw] h-[300px]" />
              <Skeleton className="w-[90vw] md:w-[20vw] h-[250px]" />
            </div>
        </div>
        <div className="mt-10 flex w-full max-w-7xl mb-16">
          <div className="flex md:justify-start justify-center flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-slide-up">
              <ImageCarousel images={carDetails?.images ? carDetails.images : []} />
            </div>
            <div className="animate-slide-up animation-delay-200">
              <CarSpecs carDetails={carDetails} />
            </div>
          </div>
          <div className="lg:col-span-1 animate-slide-up animation-delay-400">
            <ContactSection sellerDetails={seller} />
          </div>
        </div>
        <div className="animate-fade-in animation-delay-600">
          <RelatedCars relatedCars={relatedCars}/>
        </div>
      </div>
    </div>
  )
}
