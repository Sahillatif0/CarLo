import HeroSection from "@/components/hero-section"
import SearchSection from "@/components/search-section"
import FeaturedCars from "@/components/featured-cars"
import LatestListings from "@/components/latest-listings"
import CallToAction from "@/components/call-to-action"
import HowItWorks from "@/components/how-it-works"
import TrustIndicators from "@/components/trust-indicator"

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <SearchSection />
      <FeaturedCars />
      <LatestListings />
      <HowItWorks />
      <TrustIndicators/>
      <CallToAction />
    </div>
  )
}
