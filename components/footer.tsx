import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold font-poppins">
                Ahmed<span className="text-blue-600">Se</span>Car<span className="text-blue-600">Lo</span>
              </span>
            </div>

            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Pakistan's premier luxury car marketplace, connecting discerning buyers with premium vehicles from trusted
              dealers across the country.
            </p>

            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full p-2"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full p-2"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full p-2"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full p-2"
              >
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-poppins">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/cars" className="block text-slate-400 hover:text-white transition-colors">
                Browse Cars
              </Link>
              <Link href="/cars?featured=true" className="block text-slate-400 hover:text-white transition-colors">
                Featured Cars
              </Link>
              <Link href="/cars?type=luxury" className="block text-slate-400 hover:text-white transition-colors">
                Luxury Cars
              </Link>
              <Link href="/about" className="block text-slate-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-poppins">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center text-slate-400">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <span className="text-sm">+{process.env.NEXT_PUBLIC_TEL}</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <span className="text-sm">{process.env.NEXT_PUBLIC_EMAIL}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2 font-poppins">Stay Updated</h3>
              <p className="text-slate-400">Subscribe to get the latest car listings and exclusive deals.</p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; 2025 AhmedSeCarLo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
