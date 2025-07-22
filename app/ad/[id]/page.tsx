import ImageCarousel from "@/components/image-carousel"
import AdDetails from "@/components/ad-details"
import SellerInfo from "@/components/seller-info"
import RelatedAds from "@/components/related-ads"

export default function AdDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ImageCarousel />
          <AdDetails />
        </div>
        <div className="lg:col-span-1">
          <SellerInfo />
        </div>
      </div>
      <div className="mt-16">
        <RelatedAds />
      </div>
    </div>
  )
}
