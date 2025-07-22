import { Phone, MessageCircle, Shield, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SellerInfo() {
  return (
    <div className="space-y-6">
      {/* Seller Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center mb-4">
          <Avatar className="w-12 h-12 mr-4">
            <AvatarImage src="/car.png?height=48&width=48" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-slate-900">Ahmed Shah</h3>
            <div className="flex items-center text-sm text-slate-600">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              4.8 (24 reviews)
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-green-600 mb-4">
          <Shield className="w-4 h-4 mr-2" />
          Verified Seller
        </div>

        <div className="space-y-3">
          <Button className="w-full" size="lg">
            <Phone className="w-4 h-4 mr-2" />
            Call Seller
          </Button>
          <Button variant="outline" className="w-full bg-transparent" size="lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Location Map Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Location</h3>
        <div className="bg-slate-100 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center text-slate-600">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p>Map View</p>
            <p className="text-sm">Karachi, Sindh</p>
          </div>
        </div>
      </div>
    </div>
  )
}
