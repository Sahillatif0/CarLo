"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Star, Zap} from "lucide-react"
import Image from "next/image"

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  return (
    <section className="pt-40 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}
                AhmedSeCarLo
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              We're Pakistan's premier luxury car marketplace, connecting discerning buyers with premium vehicles from
              trusted dealers across the country.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group"
              >
                Explore Our Story
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:grid grid-cols-2 justify-center md:grid-cols-3 gap-6 max-w-4xl mx-auto ">
            {[
              { icon: Shield, title: "Quality Assured", desc: "Thoroughly inspected vehicles" },
              { icon: Star, title: "Professional Service", desc: "Expert guidance & support" },
              { icon: Zap, title: "Quick Response", desc: "Fast & efficient service" },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 text-center transition-all duration-300 ${
                  isVisible ? "animate-slide-up" : ""
                }`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.desc}</p>
              </div>
            ))}
            </div>
          </div>
          <div className="relative animate-slide-up animation-delay-400">
            <Image
              src="/white-car.png?height=600&width=500"
              alt="About CarLo"
              width={500}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
