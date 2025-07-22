import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredAds = [
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
]

export default function FeaturedAds() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Listings</h2>
          <p className="text-slate-600">Hand-picked vehicles from verified sellers</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/listings">View All</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredAds.map((ad) => (
          <Link key={ad.id} href={`/ad/${ad.id}`} className="group">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={ad.image || "/car.png"}
                  alt={ad.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {ad.title}
                </h3>
                <div className="text-xl font-bold text-blue-600 mb-3">{ad.price}</div>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {ad.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {ad.year}
                    </div>
                    <div className="flex items-center">
                      <Gauge className="w-4 h-4 mr-2" />
                      {ad.mileage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
