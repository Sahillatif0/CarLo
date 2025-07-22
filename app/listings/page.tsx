import ListingsGrid from "@/components/listings-grid"
import FilterSidebar from "@/components/filter-sidebar"

export default function ListingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Vehicles</h1>
        <p className="text-slate-600">Find your perfect car or bike from thousands of listings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>
        <div className="lg:col-span-3">
          <ListingsGrid />
        </div>
      </div>
    </div>
  )
}
