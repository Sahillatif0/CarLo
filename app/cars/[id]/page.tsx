import ImageCarousel from "@/components/image-carousel"
import CarSpecs from "@/components/car-specs"
import ContactSection from "@/components/contact-section"
import RelatedCars from "@/components/related-cars"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-slide-up">
              <ImageCarousel />
            </div>
            <div className="animate-slide-up animation-delay-200">
              <CarSpecs />
            </div>
          </div>
          <div className="lg:col-span-1 animate-slide-up animation-delay-400">
            <ContactSection />
          </div>
        </div>
        <div className="animate-fade-in animation-delay-600">
          <RelatedCars />
        </div>
      </div>
    </div>
  )
}
