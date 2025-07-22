import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    title: "Toyota Corolla 2023 Review",
    rating: 4.5,
    excerpt: "Comprehensive review of the latest Corolla model with updated features...",
    image: "/car.png?height=150&width=200",
  },
  {
    id: 2,
    title: "Honda City vs Suzuki Ciaz Comparison",
    rating: 4.2,
    excerpt: "Detailed comparison between two popular sedan models in Pakistan...",
    image: "/car.png?height=150&width=200",
  },
  {
    id: 3,
    title: "Best Bikes Under 2 Lakh PKR",
    rating: 4.7,
    excerpt: "Top motorcycle recommendations for budget-conscious buyers...",
    image: "/car.png?height=150&width=200",
  },
]

export default function ReviewsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Link key={review.id} href={`/reviews/${review.id}`} className="group block">
            <div className="flex space-x-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <Image
                src={review.image || "/car.png"}
                alt={review.title}
                width={80}
                height={60}
                className="w-20 h-15 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {review.title}
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(review.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-600 ml-2">{review.rating}</span>
                </div>
                <p className="text-sm text-slate-600">{review.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
