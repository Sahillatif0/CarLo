import { Target, Eye, Heart, Shield, Award, Users } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To revolutionize the car buying experience by providing a premium, transparent, and trustworthy marketplace for luxury vehicles.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become Pakistan's most trusted and preferred destination for premium car purchases, setting new standards in the automotive industry.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, excellence, and customer satisfaction drive everything we do. We believe in building lasting relationships through trust and quality service.",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]

const achievements = [
  {
    icon: Shield,
    title: "100% Verified Dealers",
    description: "Every dealer on our platform is thoroughly vetted and verified",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Comprehensive quality checks on every vehicle",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "24/7 support and personalized service",
  },
]

export default function OurMission() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mission, Vision, Values */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Our Story & Values</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Founded with a passion for excellence, we're committed to transforming how people buy luxury cars in
            Pakistan
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <value.icon className={`w-8 h-8 ${value.color}`} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">{value.title}</h3>

              <p className="text-slate-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Achievements
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200/50 animate-fade-in animation-delay-600">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4 font-poppins">What Sets Us Apart</h3>
            <p className="text-xl text-slate-600">Our commitment to excellence is reflected in everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="w-10 h-10 text-blue-600" />
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-3 font-poppins">{achievement.title}</h4>

                <p className="text-slate-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
