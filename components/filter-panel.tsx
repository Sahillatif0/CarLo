"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, MapPin, Calendar, DollarSign, Filter, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FilterPanel({filters, setFilters}:{filters:any, setFilters:any}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const router = useRouter()

  const updateFilter = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, String(v)))
        } else if (typeof value === "object") {
          params.append(key, JSON.stringify(value))
        } else {
          params.append(key, String(value))
        }
      }
    })

    router.push(`/cars?${params.toString()}`)
  }


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6 sticky top-24 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center font-poppins">
          <Filter className="w-5 h-5 mr-2 text-blue-600" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="lg:hidden">
          {isExpanded ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
        </Button>
      </div>

      <div className={`space-y-6 ${!isExpanded ? "hidden lg:block" : ""}`}>
        {/* Make */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 flex items-center">
            <Car className="w-4 h-4 mr-2 text-blue-600" />
            Make
          </Label>
          <Select value={filters.make} onValueChange={(value) => updateFilter("make", value)}>
            <SelectTrigger className="border-slate-300 focus:border-blue-500">
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
              <SelectItem value="audi">Audi</SelectItem>
              <SelectItem value="lexus">Lexus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Model</Label>
          <Select value={filters.model} onValueChange={(value) => updateFilter("model", value)}>
            <SelectTrigger className="border-slate-300 focus:border-blue-500">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="corolla">Corolla</SelectItem>
              <SelectItem value="civic">Civic</SelectItem>
              <SelectItem value="camry">Camry</SelectItem>
              <SelectItem value="accord">Accord</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            City
          </Label>
          <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
            <SelectTrigger className="border-slate-300 focus:border-blue-500">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-slate-700 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
            Price Range
          </Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange || [100000, 20000000]}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={20000000}
              min={500000}
              step={100000}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Input
              value={`PKR ${(filters.priceRange[0] / 100000).toFixed(0)}L`}
              readOnly
              className="text-center border-slate-300"
            />
            <span className="text-slate-400">-</span>
            <Input
              value={`PKR ${(filters.priceRange[1] / 100000).toFixed(0)}L`}
              readOnly
              className="text-center border-slate-300"
            />
          </div>
        </div>

        {/* Year */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            Year
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" value={filters.yearfrom} onChange={(e) => updateFilter("yearfrom", e.target.value)} />
            <Input type="number" value={filters.yearto} onChange={(e) => updateFilter("yearto", e.target.value)} />
          </div>
        </div>

        {/* Body Type */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Body Type</Label>
          <div className="space-y-2">
            {["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type.toLowerCase()}
                checked={filters.bodyType?.split(",").includes(type) || false}
                onCheckedChange={(checked) => {
                let selected = filters.bodyType ? filters.bodyType.split(",") : [];
                if (checked) {
                  if (!selected.includes(type)) selected.push(type);
                } else {
                  selected = selected.filter((t: string) => t !== type);
                }
                updateFilter("bodyType", selected.join(","));
                }}
              />
              <Label htmlFor={type.toLowerCase()} className="text-sm text-slate-600">
                {type}
              </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Fuel Type</Label>
          <div className="space-y-2">
            {["Petrol", "Diesel", "Hybrid", "Electric"].map((fuel) => (
              <div key={fuel} className="flex items-center space-x-2">
              <Checkbox
                id={fuel.toLowerCase()}
                checked={filters.fuelType?.split(",").includes(fuel) || false}
                onCheckedChange={(checked) => {
                let selected = filters.fuelType ? filters.fuelType.split(",") : [];
                if (checked) {
                  if (!selected.includes(fuel)) selected.push(fuel);
                } else {
                  selected = selected.filter((f: string) => f !== fuel);
                }
                updateFilter("fuelType", selected.join(","));
                }}
              />
              <Label htmlFor={fuel.toLowerCase()} className="text-sm text-slate-600">
                {fuel}
              </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <Button className="w-full h-[50px] md:h-[40px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={handleSearch}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full h-[50px] md:h-[40px] border-slate-300 hover:bg-slate-50 bg-transparent">
            Clear All
          </Button>
        </div>
      </div>
    </div>
  )
}
