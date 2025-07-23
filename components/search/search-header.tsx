"use client"

import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

interface SearchHeaderProps {
  filters: any
  sortBy: string
  setSortBy: (sort: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
}

export default function SearchHeader({ filters, sortBy, setSortBy, viewMode, setViewMode }: SearchHeaderProps) {
  const getSearchTitle = () => {
    if (filters.query) {
      return `Search results for "${filters.query}"`
    }

    const parts = []
    if (filters.make) parts.push(filters.make)
    if (filters.model) parts.push(filters.model)
    if (filters.city) parts.push(`in ${filters.city}`)

    return parts.length > 0 ? parts.join(" ") : "Discover Your Perfect Car"
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-poppins">{getSearchTitle()}</h1>
          <p className="text-slate-600 text-lg">Discover your perfect car from our premium collection</p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-md"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-md"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white"
          >
            <option value="latest">Latest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year-new">Year: Newest First</option>
            <option value="year-old">Year: Oldest First</option>
            <option value="mileage-low">Mileage: Low to High</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  )
}
