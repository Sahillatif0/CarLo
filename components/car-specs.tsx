import { formatPrice } from "@/lib/common-functions"
import { 
  Calendar, MapPin, Gauge, Fuel, Settings, Users, Shield, 
  Car, Cog, Wrench, Zap, Factory, PaintBucket 
} from "lucide-react"


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

export default function CarSpecs({ carDetails }: { carDetails: any }) {
  const specifications = [
    { icon: Factory, label: "Make", value: carDetails?.make || "Toyota" },           // Factory for manufacturer
    { icon: Car, label: "Model", value: carDetails?.model || "Corolla" },           // Car for model
    { icon: Zap, label: "Variant", value: carDetails?.variant || "GLi" },           // Zap for variant/trim
    { icon: Calendar, label: "Year", value: carDetails?.year || "2023" },           // Calendar for year
    { icon: Gauge, label: "Mileage", value: carDetails?.mileage ? `${carDetails.mileage} km` : "15,000 km" }, // Speedometer for mileage
    { icon: Fuel, label: "Fuel Type", value: carDetails?.fuelType || "Petrol" },    // Fuel for fuel type
    { icon: Cog, label: "Transmission", value: carDetails?.transmission || "Automatic" }, // Cog for transmission
    { icon: Settings, label: "Engine Size", value: carDetails?.engineSize || "1800 cc" }, // Settings for engine
    { icon: Shield, label: "Condition", value: carDetails?.condition || "Excellent" }, // Shield for condition
    { icon: PaintBucket, label: "Color", value: carDetails?.color || "Midnight Black" }, // PaintBucket for color
    { icon: Users, label: "Seating", value: carDetails?.seating || "5 Persons" },   // Users for seating
    { icon: Car, label: "Body Type", value: carDetails?.bodyType || "Sedan" },      // Car for body type
    { icon: Wrench, label: "Assembly", value: carDetails?.assembly || "Local" },    // Wrench for assembly
    { icon: MapPin, label: "Registered City", value: carDetails?.registeredCity || "Karachi" }, // MapPin for location
  ]
  return (
    <div className=" bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3 font-poppins">{carDetails?.title || "Car Name"}</h1>
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4 mb-4">
          <div className="text-2xl sm:text-4xl font-bold text-blue-600">
            PKR {formatPrice(carDetails?.price || 8500000)}
          </div>
          <div className="flex align-start gap-2 sm:gap-4 sm:items-center">
            <div className="text-l sm:text-xl text-slate-500 line-through">
              PKR {formatPrice(carDetails?.originalPrice || 9000000)}
            </div>
            <div className="text-md sm:text-l bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Save PKR {formatPrice((carDetails?.originalPrice || 9000000) - (carDetails?.price || 8500000))}
            </div>
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
        {carDetails.features.map((feature: string, index: number) => (
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
        <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
        {carDetails.description || "This is a placeholder description for the car. It provides details about the car's features, performance, and other relevant information that potential buyers would find useful."}
        </p>
      </div>
      </div>
    </div>
  )
}
