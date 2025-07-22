import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Gauge, Heart, Star, Eye } from "lucide-react"

const cars = [
  {
    id: 1,
    title: "BMW 3 Series 2023",
    price: "PKR 85,00,000",
    originalPrice: "PKR 90,00,000",
    location: "Karachi, Sindh",
    year: "2023",
    mileage: "15,000 km",
    rating: 4.8,
    views: 245,
    image: "/car.png?height=250&width=400",
    badge: "Featured",
    badgeColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Mercedes C-Class 2022",
    price: "PKR 95,00,000",
    location: "Lahore, Punjab",
    year: "2022",
    mileage: "25,000 km",
    rating: 4.9,
    views: 189,
    image: "/car.png?height=250&width=400",
    badge: "Premium",
    badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Audi A4 2023",
    price: "PKR 78,00,000",
    location: "Islamabad, ICT",
    year: "2023",
    mileage: "12,000 km",
    rating: 4.7,
    views: 156,
    image: "/car.png?height=250&width=400",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    isFeatured: false,
  },
  {
    id: 4,
    title: "Toyota Camry Hybrid 2023",
    price: "PKR 65,00,000",
    location: "Karachi, Sindh",
    year: "2023",
    mileage: "8,000 km",
    rating: 4.6,
    views: 203,
    image: "/car.png?height=250&width=400",
    badge: "Eco-Friendly",
    badgeColor: "bg-gradient-to-r from-green-400 to-blue-500",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Honda Accord 2022",
    price: "PKR 58,00,000",
    location: "Lahore, Punjab",
    year: "2022",
    mileage: "18,000 km",
    rating: 4.5,
    views: 134,
    image: "/car.png?height=250&width=400",
    isFeatured: false,
  },
  {
    id: 6,
    title: "Lexus ES 300h 2023",
    price: "PKR 1,20,00,000",
    location: "Islamabad, ICT",
    year: "2023",
    mileage: "5,000 km",
    rating: 4.9,
    views: 298,
    image: "/car.png?height=250&width=400",
    badge: "Luxury",
    badgeColor: "bg-gradient-to-r from-gold-400 to-yellow-600",
    isFeatured: true,
  },
]

export default function CarGrid() {
  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <p className="text-slate-600">
            Showing <span className="font-semibold">{cars.length}</span> results
          </p>
        </div>
        <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
          <option>Sort by: Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Year: Newest First</option>
          <option>Most Popular</option>
        </select>
      </div>

      {/* Car Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div
            key={car.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 animate-slide-up hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden">
              <Image
                src={car.image || "/car.png"}
                alt={car.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Badges */}
              {car.badge && (
                <div
                  className={`absolute top-4 left-4 ${car.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                >
                  {car.badge}
                </div>
              )}

              {/* Heart Icon */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              >
                <Heart className="w-4 h-4 text-slate-600 hover:text-red-500" />
              </Button>

              {/* Views Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Eye className="w-3 h-3 text-white mr-1" />
                <span className="text-xs text-white">{car.views}</span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-slate-700">{car.rating}</span>
              </div>
            </div>

            <div className="p-6">
              <Link href={`/cars/${car.id}`}>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-poppins line-clamp-1">
                  {car.title}
                </h3>
              </Link>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{car.price}</div>
                  {car.originalPrice && <div className="text-sm text-slate-500 line-through">{car.originalPrice}</div>}
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  {car.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    {car.year}
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                    {car.mileage}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Link href={`/cars/${car.id}`}>View Details</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-4 hover:bg-red-50 hover:border-red-300 bg-transparent"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8 animate-fade-in animation-delay-600">
        <Button
          size="lg"
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 bg-transparent"
        >
          Load More Cars
        </Button>
      </div>
    </div>
  )
}
