"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, DollarSign, Car } from "lucide-react"

export default function SearchSection() {
  const router = useRouter()
  const [searchFilters, setSearchFilters] = useState({
    make: "",
    model: "",
    city: "",
    year: "",
    priceRange: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()

    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })

    router.push(`/cars?${params.toString()}`)
  }

  const updateFilter = (key: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section className="relative -mt-20 z-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/50 backdrop-blur-sm animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-poppins">Find Your Perfect Match</h2>
            <p className="text-slate-600">Use our advanced filters to discover your ideal vehicle</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Car className="w-4 h-4 mr-2 text-blue-600" />
                Make
              </label>
              <Select onValueChange={(value) => updateFilter("make", value)}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Car className="w-4 h-4 mr-2 text-blue-600" />
                Model
              </label>
              <Select onValueChange={(value) => updateFilter("model", value)}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corolla">Corolla</SelectItem>
                  <SelectItem value="civic">Civic</SelectItem>
                  <SelectItem value="camry">Camry</SelectItem>
                  <SelectItem value="accord">Accord</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                City
              </label>
              <Select onValueChange={(value) => updateFilter("city", value)}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karachi">Karachi</SelectItem>
                  <SelectItem value="lahore">Lahore</SelectItem>
                  <SelectItem value="islamabad">Islamabad</SelectItem>
                  <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Year
              </label>
              <Select onValueChange={(value) => updateFilter("year", value)}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                Price Range
              </label>
              <Select onValueChange={(value) => updateFilter("priceRange", value)}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1000000">Under 10 Lakh</SelectItem>
                  <SelectItem value="1000000-2000000">10-20 Lakh</SelectItem>
                  <SelectItem value="2000000-5000000">20-50 Lakh</SelectItem>
                  <SelectItem value="5000000+">Above 50 Lakh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg group"
          >
            <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Search Cars
          </Button>
        </div>
      </div>
    </section>
  )
}
