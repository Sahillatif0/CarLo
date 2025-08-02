"use client"

import HeroSection from "@/components/hero-section"
import SearchSection from "@/components/search-section"
import FeaturedCars from "@/components/featured-cars"
import LatestListings from "@/components/latest-listings"
import CallToAction from "@/components/call-to-action"
import HowItWorks from "@/components/how-it-works"
import TrustIndicators from "@/components/trust-indicator"
import AnimatedSection from "@/components/animated-section"

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      <AnimatedSection>
        <SearchSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FeaturedCars />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <LatestListings />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <TrustIndicators />
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <CallToAction />
      </AnimatedSection>
    </div>
  )
}