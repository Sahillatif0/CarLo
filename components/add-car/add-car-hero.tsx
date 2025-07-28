import { Car, Shield, Star } from "lucide-react"

export default function AddCarHero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="animate-slide-up">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins">
            List Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Car</span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Join Pakistan's premier car marketplace. List your vehicle and reach thousands of potential buyers with our
            trusted platform.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Car className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Wide Reach</h3>
              <p className="text-slate-300 text-sm">Connect with thousands of verified buyers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Secure Platform</h3>
              <p className="text-slate-300 text-sm">Safe and secure transactions guaranteed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Premium Listing</h3>
              <p className="text-slate-300 text-sm">Professional presentation of your vehicle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
