import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Gauge, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const listings = [
  {
    id: 1,
    title: "Toyota Corolla GLi 2020",
    price: "PKR 32,50,000",
    location: "Karachi, Sindh",
    year: "2020",
    mileage: "45,000 km",
    image: "/car.png?height=200&width=300",
  },
  {
    id: 2,
    title: "Honda Civic Turbo 2019",
    price: "PKR 42,00,000",
    location: "Lahore, Punjab",
    year: "2019",
    mileage: "38,000 km",
    image: "/car.png?height=200&width=300",
  },
  {
    id: 3,
    title: "Suzuki Alto VXR 2021",
    price: "PKR 18,50,000",
    location: "Islamabad, ICT",
    year: "2021",
    mileage: "25,000 km",
    image: "/car.png?height=200&width=300",
  },
  {
    id: 4,
    title: "Honda CB 150F 2022",
    price: "PKR 2,85,000",
    location: "Rawalpindi, Punjab",
    year: "2022",
    mileage: "12,000 km",
    image: "/car.png?height=200&width=300",
  },
  {
    id: 5,
    title: "Hyundai Elantra 2018",
    price: "PKR 35,00,000",
    location: "Faisalabad, Punjab",
    year: "2018",
    mileage: "55,000 km",
    image: "/car.png?height=200&width=300",
  },
  {
    id: 6,
    title: "Yamaha YBR 125 2021",
    price: "PKR 2,45,000",
    location: "Multan, Punjab",
    year: "2021",
    mileage: "18,000 km",
    image: "/car.png?height=200&width=300",
  },
]

export default function ListingsGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-600">{listings.length} vehicles found</p>
        <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
          <option>Sort by: Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Year: Newest First</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative">
              <Image
                src={listing.image || "/car.png"}
                alt={listing.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button size="sm" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/ad/${listing.id}`}>
                <h3 className="font-semibold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                  {listing.title}
                </h3>
              </Link>
              <div className="text-xl font-bold text-blue-600 mb-3">{listing.price}</div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {listing.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {listing.year}
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    {listing.mileage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
