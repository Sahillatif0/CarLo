import {
  Phone,
  MessageCircle,
  Shield,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Calendar,
  Calculator,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ContactSection({sellerDetails}: {sellerDetails?: any}) {
  return (
    <div className="space-y-6">
      {/* Seller Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
        <div className="flex items-center mb-6">
          <Avatar className="w-16 h-16 mr-4">
            <AvatarImage src="/car.png?height=64&width=64" />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">{sellerDetails?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-poppins">{sellerDetails?.name}</h3>
            <div className="flex items-center text-sm text-slate-600 mb-2">
              <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
              4.9 (127 reviews)
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Verified Dealer
            </Badge>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            {sellerDetails?.address || "Karachi, Sindh"}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            Usually responds within {sellerDetails?.responseTime || "1 hour"}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Active {sellerDetails?.lastActive || "2 hours ago"}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="lg"
            onClick={() => window.location.href = `tel:${sellerDetails?.phone || "+923001234567"}`}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>

          <Button
            variant="outline"
            className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 bg-transparent"
            size="lg"
            onClick={() => window.location.href = `https://wa.me/${sellerDetails?.whatsapp || "+923001234567"}`}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>

          <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={() => window.location.href = `mailto:${sellerDetails?.email || "example@example.com"}`}>
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
        <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Quick Actions</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-white hover:bg-blue-50">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Test Drive
          </Button>
          <Button variant="outline" className="w-full justify-start bg-white hover:bg-blue-50">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate EMI
          </Button>
          <Button variant="outline" className="w-full justify-start bg-white hover:bg-blue-50">
            <FileText className="w-4 h-4 mr-2" />
            Get Inspection Report
          </Button>
        </div>
      </div>

      {/* Location Map Placeholder */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Location</h3>
        <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl h-48 flex items-center justify-center border border-slate-200">
          <div className="text-center text-slate-600">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <p className="font-medium">Dealer Location</p>
            <p className="text-sm">Karachi, Sindh</p>
            <Button variant="link" className="text-blue-600 mt-2">
              View on Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
