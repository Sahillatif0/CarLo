import {
  Phone,
  MessageCircle,
  Mail,
  Headphones,
  Search,
  MessageSquare,
  Car,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
  return (
    <div className="space-y-4">
      {/* Contact Options Card */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-blue-600" />
              Contact AhmedSeCarLo
            </h3>
            <p className="text-sm text-gray-600 mt-1">Get in touch with our team</p>
          </div>

          <div className="space-y-4">
            {/* Call Button */}
            <Button
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              onClick={() => window.location.href = "tel:+" + process.env.NEXT_PUBLIC_TEL}
            >
              <Phone className="w-5 h-5 mr-4" />
              <div className="flex flex-col items-start">
                <span className="text-base font-medium">Call Now</span>
                <span className="text-sm opacity-90">+{process.env.NEXT_PUBLIC_TEL}</span>
              </div>
            </Button>

            {/* WhatsApp Button */}
            <Button
              variant="outline"
              className="w-full h-14 border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 shadow-md hover:shadow-lg transition-all"
              onClick={() => window.location.href = `https://wa.me/${process.env.NEXT_PUBLIC_TEL}?text=Hello%20AhmedSeCarLo,%20I%20have%20a%20query%20about%20your%20cars.`}
            >
              <MessageCircle className="w-5 h-5 mr-4" />
              <div className="flex flex-col items-start">
                <span className="text-base font-medium">WhatsApp</span>
                <span className="text-sm opacity-70">Quick messaging</span>
              </div>
            </Button>

            {/* Email Button */}
            <Button 
              variant="outline" 
              className="w-full h-14 border-2 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-md hover:shadow-lg transition-all"
              onClick={() => window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=Car Inquiry`}
            >
              <Mail className="w-5 h-5 mr-4" />
              <div className="flex flex-col items-start">
                <span className="text-base font-medium">Send Email</span>
                <span className="text-sm opacity-70">{process.env.NEXT_PUBLIC_EMAIL}</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Card */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">How It Works</h3>
            <p className="text-sm text-gray-600 mt-1">Simple steps to get your dream car</p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-600" />
                  Browse & Select
                </p>
                <p className="text-sm text-gray-600">Find your perfect car from our collection</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  Contact Us
                </p>
                <p className="text-sm text-gray-600">Get in touch via call, WhatsApp or email</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Car className="w-4 h-4 text-purple-600" />
                  Inspect & Test
                </p>
                <p className="text-sm text-gray-600">Schedule inspection and test drive</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  Complete Deal
                </p>
                <p className="text-sm text-gray-600">Finalize paperwork and drive away</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
