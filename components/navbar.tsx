"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Car, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className={`text-2xl font-bold text-slate-900 font-poppins ${isScrolled ? "group-hover:text-blue-600" : "text-white"}`}>
              Car<span className="text-blue-600">Lo</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-slate-700 hover:text-blue-600 ${!isScrolled ? "text-white" : ""} font-medium transition-colors relative group`}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>

            <div className="relative group">
              <button className={`flex items-center text-slate-700 hover:text-blue-600 font-medium transition-colors ${!isScrolled ? "text-white" : ""}`}>
                Cars
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/cars"
                  className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-t-xl transition-colors" 
                >
                  All Cars
                </Link>
                <Link
                  href="/cars?featured=true"
                  className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Featured Cars
                </Link>
                <Link
                  href="/cars?type=luxury"
                  className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-b-xl transition-colors"
                >
                  Luxury Cars
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${!isScrolled ? "text-white" : ""}`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-blue-600 hover:text-blue-600 bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Book Test Drive
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4 animate-slide-down">
            <div className="space-y-4">
              <Link href="/" className="block py-2 text-slate-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/cars" className="block py-2 text-slate-700 hover:text-blue-600 font-medium">
                Cars
              </Link>
              <Link href="/about" className="block py-2 text-slate-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Contact
                </Button>
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  Book Test Drive
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
