import HeroSection from "@/components/hero-section"
import SearchSection from "@/components/search-section"
import FeaturedCars from "@/components/featured-cars"
import LatestListings from "@/components/latest-listings"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <SearchSection />
      <FeaturedCars />
      <LatestListings />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  )
}
