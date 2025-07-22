import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Electric Vehicle Sales Surge in Pakistan",
    excerpt: "The adoption of electric vehicles is accelerating with new government incentives...",
    date: "2024-01-15",
    image: "/car.png?height=150&width=200",
  },
  {
    id: 2,
    title: "New Car Financing Options Available",
    excerpt: "Banks introduce flexible financing schemes for car buyers with competitive rates...",
    date: "2024-01-12",
    image: "/car.png?height=150&width=200",
  },
  {
    id: 3,
    title: "Motorcycle Safety Regulations Updated",
    excerpt: "New safety standards implemented for motorcycle manufacturers and riders...",
    date: "2024-01-10",
    image: "/car.png?height=150&width=200",
  },
]

export default function NewsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest News</h2>
      <div className="space-y-4">
        {newsArticles.map((article) => (
          <Link key={article.id} href={`/news/${article.id}`} className="group block">
            <div className="flex space-x-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <Image
                src={article.image || "/car.png"}
                alt={article.title}
                width={80}
                height={60}
                className="w-20 h-15 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 mb-2">{article.excerpt}</p>
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
