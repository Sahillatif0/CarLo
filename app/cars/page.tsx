"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import FilterPanel from "@/components/filter-panel"
import CarGrid from "@/components/car-grid"
import SearchHeader from "@/components/search/search-header"
import { SearchInput } from "@/components/search/search-input"

function SearchContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    city: searchParams.get("city") || "",
    yearfrom: searchParams.get("yearfrom") || "2000",
    yearto: searchParams.get("yearto") || "2025",
    priceRange: searchParams.get("minPrice") && searchParams.get("maxPrice")
      ? [Number(searchParams.get("minPrice")), Number(searchParams.get("maxPrice"))]
      : [100000, 20000000],
    bodyType: searchParams.get("bodyType") || "",
    fuelType: searchParams.get("fuelType") || "",
    query: searchParams.get("q") || "",
    featured: searchParams.get("featured") === "true",
    type: searchParams.get("type") || "",
  })

  const [sortBy, setSortBy] = useState("latest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchHeader
          filters={filters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <SearchInput filters={filters} setFilters={setFilters} />
        {/* <SearchFilters filters={filters} setFilters={setFilters} /> */}


        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters}/>
          </div>
          <div className="lg:col-span-3">
            <CarGrid viewMode={viewMode} sortBy={sortBy} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  )
}
