"use client"
import ImageCarousel from "@/components/image-carousel"
import CarSpecs from "@/components/car-specs"
import ContactSection from "@/components/contact-section"
import RelatedCars from "@/components/related-cars"
import { useEffect, useState } from "react"
import { SkeletonCard, SkeletonGrid } from "@/components/skeleton-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [carDetails, setCarDetails] = useState<any>({})
  const [seller, setSeller] = useState<any>({})
  const [relatedCars, setRelatedCars] = useState<any[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  
  useEffect(() => {
      const fetchData = async () => {
        setIsDataLoading(true)
      fetch("/api/car/"+params.id)
        .then(res => res.json())
        .then(data => {
          console.log("Fetched Car details:", data)
          setCarDetails(data.car)
          setSeller(data.seller)
          setRelatedCars(data.relatedCars)
          setIsDataLoading(false)
        })
        .catch(err => {
          console.error("Error fetching cars:", err)
          fetchData()
        })
    }
    fetchData()
  }, [])
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
              <ImageCarousel images={carDetails.images} />
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
