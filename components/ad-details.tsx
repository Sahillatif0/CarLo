import { Calendar, Gauge, Fuel, Settings, MapPin } from "lucide-react"

export default function AdDetails() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Toyota Corolla GLi 2020</h1>
        <div className="text-3xl font-bold text-blue-600 mb-4">PKR 32,50,000</div>
        <div className="flex items-center text-slate-600">
          <MapPin className="w-4 h-4 mr-2" />
          Karachi, Sindh
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
            <Calendar className="w-5 h-5 text-slate-600 mr-3" />
            <div>
              <div className="text-sm text-slate-600">Year</div>
              <div className="font-medium">2020</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
            <Gauge className="w-5 h-5 text-slate-600 mr-3" />
            <div>
              <div className="text-sm text-slate-600">Mileage</div>
              <div className="font-medium">45,000 km</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
            <Fuel className="w-5 h-5 text-slate-600 mr-3" />
            <div>
              <div className="text-sm text-slate-600">Fuel Type</div>
              <div className="font-medium">Petrol</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
            <Settings className="w-5 h-5 text-slate-600 mr-3" />
            <div>
              <div className="text-sm text-slate-600">Transmission</div>
              <div className="font-medium">Manual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Description</h2>
        <div className="prose text-slate-600">
          <p>
            Excellent condition Toyota Corolla GLi 2020 for sale. This vehicle has been well-maintained with regular
            servicing. All original documents available. First owner, accident-free, and ready for immediate sale.
          </p>
          <p className="mt-4">
            Features include air conditioning, power steering, electric windows, central locking, and much more. Serious
            buyers only. Price is slightly negotiable.
          </p>
        </div>
      </div>
    </div>
  )
}
