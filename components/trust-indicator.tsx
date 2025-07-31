"use client"

import { Shield, Award, Clock, Users, CheckCircle, Lock, Headphones } from "lucide-react"
import { useRouter } from "next/dist/client/components/navigation"

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Quality",
    description: "Every vehicle is thoroughly inspected and verified for quality",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Award,
    title: "Professional Service",
    description: "Expert automotive knowledge and professional customer service",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Fast response times and efficient service for all inquiries",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal attention and support throughout your buying journey",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]


const badges = [
  { text: "SSL Secured", icon: Lock },
  { text: "Verified Platform", icon: CheckCircle },
  { text: "Expert Team", icon: Users },
  { text: "24/7 Support", icon: Clock },
]

export default function TrustIndicators() {
    const router = useRouter()
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Why Trust Us?</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're committed to providing a safe, reliable, and transparent car buying experience
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 animate-slide-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 font-poppins">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 animate-fade-in animation-delay-600">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Trusted by Car Enthusiasts</h3>
            <p className="text-slate-600">Your security and satisfaction are our top priorities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300"
              >
                <badge.icon className="w-5 h-5 text-slate-600" />
                <span className="text-slate-700 font-medium text-sm">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 pt-8 border-t border-slate-200">
            <p className="text-slate-600 mb-4">Ready to experience the difference?</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => router.push("/cars")}>
              Get Your Car Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
