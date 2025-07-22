import FilterPanel from "@/components/filter-panel"
import CarGrid from "@/components/car-grid"
import { Suspense } from "react"

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-poppins">Discover Your Perfect Car</h1>
          <p className="text-slate-600 text-lg">Browse through our curated collection of premium vehicles</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading cars...</div>}>
              <CarGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
