"use client"

import { motion } from "framer-motion"
import HeroSection from "@/components/hero-section"
import SearchSection from "@/components/search-section"
import FeaturedCars from "@/components/featured-cars"
import LatestListings from "@/components/latest-listings"
import CallToAction from "@/components/call-to-action"
import HowItWorks from "@/components/how-it-works"
import TrustIndicators from "@/components/trust-indicator"
import { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
}

export function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}

// Animation variants
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

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