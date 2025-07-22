import { Shield, Award, Users, Headphones, CheckCircle, Star } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Dealers",
    description: "All our partner dealers are thoroughly verified and trusted",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Every vehicle undergoes comprehensive quality checks",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our automotive experts guide you through every step",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Care",
    description: "Round-the-clock support for all your queries",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: CheckCircle,
    title: "Transparent Pricing",
    description: "No hidden costs, clear and upfront pricing",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Luxury car buying experience from start to finish",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Why Choose CarLo?</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're committed to providing you with the best car buying experience through our premium services and
            trusted network
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 animate-slide-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 font-poppins">{feature.title}</h3>

              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50 animate-fade-in animation-delay-600">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Premium Cars</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-slate-600">Verified Dealers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-slate-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
