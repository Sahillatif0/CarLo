"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactForm() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-poppins">Get In Touch</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 animate-slide-up">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Send us a Message</h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="mt-1 border-slate-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="mt-1 border-slate-300 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="mt-1 border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-slate-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  className="mt-1 border-slate-300 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="mt-1 border-slate-300 focus:border-blue-500"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up animation-delay-200">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
                    <p className="text-slate-600">
                      123 Main Street, Gulshan-e-Iqbal
                      <br />
                      Karachi, Sindh 75300
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                    <p className="text-slate-600">
                      +92 300 1234567
                      <br />
                      +92 21 1234567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">
                      info@AhmedSeCarLo.pk
                      <br />
                      support@AhmedSeCarLo.pk
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Business Hours</h4>
                    <p className="text-slate-600">
                      Monday - Friday: 9:00 AM - 8:00 PM
                      <br />
                      Saturday - Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
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
        </div>
      </div>
    </section>
  )
}
