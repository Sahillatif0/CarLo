import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const team = [
  {
    name: "Ahmed Hassan",
    role: "Founder & CEO",
    image: "/car.png?height=300&width=300",
    bio: "Automotive industry veteran with 15+ years of experience in luxury car sales and customer service.",
  },
  {
    name: "Sarah Khan",
    role: "Head of Operations",
    image: "/car.png?height=300&width=300",
    bio: "Operations expert ensuring smooth processes and exceptional customer experiences across all touchpoints.",
  },
  {
    name: "Muhammad Ali",
    role: "Technical Director",
    image: "/car.png?height=300&width=300",
    bio: "Technology leader driving innovation and digital transformation in the automotive marketplace.",
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Meet Our Team</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to providing you with the best car buying experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 animate-slide-up group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mb-6">
                <Image
                  src={member.image || "/car.png"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">{member.name}</h3>

              <div className="text-blue-600 font-medium mb-4">{member.role}</div>

              <p className="text-slate-600 mb-6 leading-relaxed">{member.bio}</p>

              <div className="flex justify-center space-x-3">
                <Button size="sm" variant="outline" className="rounded-full p-2 bg-transparent">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full p-2 bg-transparent">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full p-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
