"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, PhoneCall } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  const handleExploreCars = () => {
    router.push("/cars")
  }

  const handleWatchDemo = () => {
    router.push("/contact")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl my-10 sm:mx-auto px-9 sm:px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-poppins leading-tight">
              Find Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}
                Dream Car
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Discover premium vehicles from trusted dealers. Experience luxury, performance, and reliability in every
              drive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleExploreCars}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 group"
              >
                Explore Cars
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWatchDemo}
                className="border-white/30 text-white hover:text-white hover:bg-white/10 text-lg px-8 py-6 group bg-transparent"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Content - Car Illustration */}
          <div className="relative animate-slide-up animation-delay-400">
            <div className="relative">
              <Image
                src="/white-car.png?height=500&width=600"
                alt="Luxury Car"
                width={600}
                height={500}
                className="w-full h-auto animate-float"
              />

              {/* Floating Elements */}
              <div className="absolute top-2 right-2 sm:top-10 sm:right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 animate-bounce-slow">
                <div className="text-white text-sm font-medium">Premium Quality</div>
                <div className="text-blue-400 text-xs">Verified Dealers</div>
              </div>

              <div className="absolute bottom-2 left-2 sm:bottom-10 sm:left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 animate-bounce-slow animation-delay-1000">
                <div className="text-white text-sm font-medium">Best Prices</div>
                <div className="text-green-400 text-xs">Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
