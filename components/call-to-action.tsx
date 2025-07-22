import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins">
            Ready to Find Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {" "}
              Dream Car?
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their perfect vehicle through our premium marketplace. Start
            your journey today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 group"
              asChild
            >
              <Link href="/cars">
                Explore Cars Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:text-white hover:bg-white/10 text-lg px-8 py-6 group bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Call Us Now
            </Button>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Call Us</h3>
              <p className="text-slate-300 text-sm">+92 300 1234567</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
              <p className="text-slate-300 text-sm">Quick Support</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Visit Showroom</h3>
              <p className="text-slate-300 text-sm">Book Appointment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
