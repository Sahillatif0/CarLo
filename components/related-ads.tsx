import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Gauge } from "lucide-react"

const relatedAds = [
  {
    id: 2,
    title: "Honda Civic Turbo 2019",
    price: "PKR 42,00,000",
    location: "Lahore, Punjab",
    year: "2019",
    mileage: "38,000 km",
    image: "/car.png?height=150&width=200",
  },
  {
    id: 3,
    title: "Suzuki Alto VXR 2021",
    price: "PKR 18,50,000",
    location: "Islamabad, ICT",
    year: "2021",
    mileage: "25,000 km",
    image: "/car.png?height=150&width=200",
  },
  {
    id: 5,
    title: "Hyundai Elantra 2018",
    price: "PKR 35,00,000",
    location: "Faisalabad, Punjab",
    year: "2018",
    mileage: "55,000 km",
    image: "/car.png?height=150&width=200",
  },
]

export default function RelatedAds() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Ads</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedAds.map((ad) => (
          <Link key={ad.id} href={`/ad/${ad.id}`} className="group">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={ad.image || "/car.png"}
                alt={ad.title}
                width={200}
                height={150}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {ad.title}
                </h3>
                <div className="text-lg font-bold text-blue-600 mb-3">{ad.price}</div>

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
    </div>
  )
}
