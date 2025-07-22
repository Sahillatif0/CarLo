import { Calendar, Gauge, Fuel, Settings, Palette, Users, Shield, Award } from "lucide-react"

const specifications = [
  { icon: Calendar, label: "Year", value: "2023" },
  { icon: Gauge, label: "Mileage", value: "15,000 km" },
  { icon: Fuel, label: "Fuel Type", value: "Petrol" },
  { icon: Settings, label: "Transmission", value: "Automatic" },
  { icon: Palette, label: "Color", value: "Midnight Black" },
  { icon: Users, label: "Seating", value: "5 Persons" },
  { icon: Shield, label: "Condition", value: "Excellent" },
  { icon: Award, label: "Warranty", value: "2 Years" },
]

const features = [
  "Air Conditioning",
  "Power Steering",
  "Electric Windows",
  "Central Locking",
  "Alloy Wheels",
  "Leather Seats",
  "Sunroof",
  "Navigation System",
  "Bluetooth Connectivity",
  "Backup Camera",
  "Cruise Control",
  "ABS Brakes",
]

export default function CarSpecs() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-3 font-poppins">BMW 3 Series 2023</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl font-bold text-blue-600">PKR 85,00,000</div>
          <div className="text-xl text-slate-500 line-through">PKR 90,00,000</div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Save PKR 5,00,000
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Specifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-300"
            >
              <spec.icon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <div className="text-sm text-slate-600">{spec.label}</div>
                <div className="font-semibold text-slate-900">{spec.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Description</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed mb-4">
            This stunning BMW 3 Series 2023 represents the perfect blend of luxury, performance, and technology. With
            only 15,000 km on the odometer, this vehicle has been meticulously maintained and is in excellent condition
            throughout.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The car features a powerful yet efficient engine, premium leather interior, and cutting-edge technology
            including navigation system, Bluetooth connectivity, and advanced safety features. All service records are
            available and the vehicle comes with a comprehensive warranty.
          </p>
          <p className="text-slate-600 leading-relaxed">
            This is a rare opportunity to own a premium luxury sedan at an exceptional price. The vehicle has never been
            in an accident and comes from a smoke-free environment. Serious buyers only - viewing is highly recommended.
          </p>
        </div>
      </div>
    </div>
  )
}
