import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Gauge, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/common-functions"

const relatedCars = [
  {
    id: 2,
    title: "Mercedes C-Class 2022",
    price: "PKR 95,00,000",
    location: "Lahore, Punjab",
    year: "2022",
    mileage: "25,000 km",
    rating: 4.9,
    images: ["/car.png?height=200&width=300"],
  },
  {
    id: 3,
    title: "Audi A4 2023",
    price: "PKR 78,00,000",
    location: "Islamabad, ICT",
    year: "2023",
    mileage: "12,000 km",
    rating: 4.7,
    images: ["/car.png?height=200&width=300"],
  },
  {
    id: 6,
    title: "Lexus ES 300h 2023",
    price: "PKR 1,20,00,000",
    location: "Islamabad, ICT",
    year: "2023",
    mileage: "5,000 km",
    rating: 4.9,
    images: ["/car.png?height=200&width=300"],
  },
]

export default function RelatedCars({relatedCars}:{relatedCars: any[]}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-poppins">Similar Cars You Might Like</h2>
        <Button variant="outline" asChild>
          <Link href="/cars">View All</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCars.map((car, index) => (
          <div
            key={car.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200/50 animate-slide-up hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={car.images[0] || "/car.png"}
                alt={car.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                className="w-full h-54 object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-slate-700">{car.rating}</span>
              </div>
            </div>

            <div className="p-5">
              <Link href={`/cars/${car.id}`}>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-poppins">
                  {car.title}
                </h3>
              </Link>

              <div className="text-xl font-bold text-blue-600 mb-4">{formatPrice(parseFloat(car.price))}</div>

              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  {car.city}
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

              <Button
                asChild
                className="w-full h-[45px] md:h-[40px] text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Link href={`/cars/${car.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
