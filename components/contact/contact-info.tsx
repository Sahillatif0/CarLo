import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+92 300 1234567", "+92 21 1234567"],
    action: "Call Now",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["+92 300 1234567"],
    action: "Chat Now",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@eliteauto.pk", "support@eliteauto.pk"],
    action: "Send Email",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

const officeInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    details: ["123 Main Street, Gulshan-e-Iqbal", "Karachi, Sindh 75300"],
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday - Sunday: 10:00 AM - 6:00 PM"],
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: Globe,
    title: "Service Areas",
    details: ["Karachi, Lahore, Islamabad", "Rawalpindi, Faisalabad, Multan"],
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8 animate-slide-up animation-delay-200">
      {/* Contact Methods */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Get in Touch</h3>

        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex items-start">
              <div
                className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}
              >
                <method.icon className={`w-6 h-6 ${method.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-2">{method.title}</h4>
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-600 mb-1">
                    {detail}
                  </p>
                ))}
                <Button
                  size="sm"
                  className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {method.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office Information */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Office Information</h3>

        <div className="space-y-6">
          {officeInfo.map((info, index) => (
            <div key={index} className="flex items-start">
              <div
                className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}
              >
                <info.icon className={`w-6 h-6 ${info.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">{info.title}</h4>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-600">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">Find Us</h3>
        <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl h-64 flex items-center justify-center border border-slate-200">
          <div className="text-center text-slate-600">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <p className="font-medium">Interactive Map</p>
            <p className="text-sm">Karachi, Sindh</p>
            <Button variant="link" className="text-blue-600 mt-2">
              Open in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
