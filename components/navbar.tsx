"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Car, Phone, Plus, Home, Info, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBlueBg, setIsBlueBg] = useState(false)
  const pathname = usePathname()
  const router = useRouter()


  useEffect(() => {
    setIsBlueBg(pathname === "/" || pathname === "/about" || pathname === "/contact" || pathname === "/add-car")
  }, [pathname])

  useEffect(() => { 
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleContactClick = () => {
    router.push("/contact")
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? `${isMobileMenuOpen ? "" : "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"}` : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className={`flex items-center space-x-2 group ${isMobileMenuOpen ? "invisible" : "visible"}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className={`text-2xl font-bold text-slate-900 font-poppins ${(!isScrolled && isBlueBg) ? "text-white" : ""}`}>
              {/* <span className="text-blue-600">Ahmed</span>Se<span className="text-blue-600">Car</span>Lo */}
              Ahmed<span className="text-blue-600">Se</span>Car<span className="text-blue-600">Lo</span>
              {/* AhmedSe<span className="text-blue-600">CarLo</span> */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-slate-700 hover:text-blue-600 ${(!isScrolled && isBlueBg) ? "text-white" : ""} font-medium transition-colors relative group`}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>

            <div className="relative group">
              <button className={`flex items-center text-slate-700 hover:text-blue-600 font-medium transition-colors ${(!isScrolled && isBlueBg) ? "text-white" : ""}`}>
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
              className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${(!isScrolled && isBlueBg) ? "text-white" : ""}`}
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
              className={`border-slate-300 hover:border-blue-600 hover:text-blue-600 bg-transparent ${(!isScrolled && isBlueBg) ? "" : "text-black"}`}
              onClick={handleContactClick}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              asChild
            >
              <Link href="/cars">
                <Search className="w-4 h-4 mr-2" />
                Browse Cars
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden z-60 relative text-slate-700 hover:text-blue-600 transition-colors ${(!isScrolled && isBlueBg && !isMobileMenuOpen) ? "text-white" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-4 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 font-poppins">
                Ahmed<span className="text-blue-600">Se</span>Car<span className="text-blue-600">Lo</span>
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6">
              <div className="space-y-2 px-6">
                <Link
                  href="/"
                  className="flex items-center space-x-3 py-4 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                  onClick={closeMobileMenu}
                >
                  <Home className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  <span className="font-medium">Home</span>
                </Link>

                <Link
                  href="/cars"
                  className="flex items-center space-x-3 py-4 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                  onClick={closeMobileMenu}
                >
                  <Search className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  <span className="font-medium">Browse Cars</span>
                </Link>

                <Link
                  href="/about"
                  className="flex items-center space-x-3 py-4 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                  onClick={closeMobileMenu}
                >
                  <Info className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  <span className="font-medium">About Us</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center space-x-3 py-4 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                  onClick={closeMobileMenu}
                >
                  <MessageCircle className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  <span className="font-medium">Contact</span>
                </Link>

                {/* Divider */}
                <div className="border-t border-slate-200 my-4" />

                {/* <Link
                  href="/add-car"
                  className="flex items-center space-x-3 py-4 px-4 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all group"
                  onClick={closeMobileMenu}
                >
                  <Plus className="w-5 h-5 text-green-500 group-hover:text-green-700" />
                  <span className="font-medium">List Your Car</span>
                  <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Sell</span>
                </Link> */}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-slate-200 space-y-4 mb-20">
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start bg-transparent border-slate-300 hover:border-blue-600 hover:text-blue-600 h-12"
                onClick={() => {
                  handleContactClick()
                  closeMobileMenu()
                }}
              >
                <Phone className="w-4 h-4 mr-3" />
                Contact Us
              </Button>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12"
                onClick={() => {
                  router.push("/cars");
                  closeMobileMenu();
                }}
              >
                <Search className="w-4 h-4 mr-3" />
                Browse Cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
