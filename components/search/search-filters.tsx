"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SearchFiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([key, value]) => value && value !== "" && key !== "query")

  const removeFilter = (key: string) => {
    setFilters({ ...filters, [key]: "" })
  }

  const clearAllFilters = () => {
    setFilters({
      make: "",
      model: "",
      city: "",
      year: "",
      priceRange: "",
      query: filters.query,
    })
  }

  if (activeFilters.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">Active Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-slate-600 hover:text-slate-900">
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map(([key, value]) => (
          <Badge
            key={key}
            variant="secondary"
            className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            <span className="capitalize">{key}:</span>
            <span>{Array.isArray(value) ? value.join(", ") : String(value)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFilter(key)}
              className="h-auto p-0 ml-1 hover:bg-transparent"
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
