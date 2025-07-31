"use client"
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+92 302 3136195", "+92 304 8105667"],
    action: "Call Now",
    color: "text-green-600",
    bgColor: "bg-green-100",
    function: () => window.location.href = `tel:${process.env.NEXT_PUBLIC_TEL}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["+92 302 3136195"],
    action: "Chat Now",
    color: "text-green-600",
    bgColor: "bg-green-100",
    function: () => window.location.href = `https://wa.me/${process.env.NEXT_PUBLIC_TEL}`,
  },
  {
    icon: Mail,
    title: "Email",
    details: [process.env.NEXT_PUBLIC_EMAIL, "support@ahmedsecarlo.pk"],
    action: "Send Email",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    function: () => window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
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
                  onClick={method.function}
                >
                  {method.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      {/* <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
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
      </div> */}
    </div>
  )
}
