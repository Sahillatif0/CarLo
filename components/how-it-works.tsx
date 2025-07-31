"use client"

import { Search, Eye, MessageCircle, Car } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Explore our curated collection of premium vehicles using advanced filters",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    step: "01",
  },
  {
    icon: Eye,
    title: "View Details",
    description: "Check detailed specifications, photos, and condition reports",
    color: "text-green-600",
    bgColor: "bg-green-100",
    step: "02",
  },
  {
    icon: MessageCircle,
    title: "Connect Us",
    description: "Call or message us to schedule a viewing or ask questions",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    step: "03",
  },
  {
    icon: Car,
    title: "Drive Away Happy",
    description: "Complete the paperwork and drive away in your new car",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    step: "04",
  },
]


export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">How It Works</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Finding your perfect car has never been easier. Follow these simple steps to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 animate-slide-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.step}
              </div>

              <div
                className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 font-poppins">{step.title}</h3>

              <p className="text-slate-600 leading-relaxed">{step.description}</p>

              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
