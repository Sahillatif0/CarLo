"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    msg: ""
  })

  const handleInputChange = (field: keyof typeof formData, value: any) => {
      setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        setIsLoading(false)
        alert(`Please fill in the ${key} field.`)
        return
      }
    }

    fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({msgDetails: formData})
    }).then(req => req.json())
    .then(data => {
      console.log(data);
      setIsLoading(false)
      setIsSubmitted(true)
    })

  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 text-center animate-slide-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-poppins">Message Sent!</h3>
        <p className="text-slate-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="bg-transparent">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 animate-slide-up">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 font-poppins">Send us a Message</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
              First Name *
            </Label>
            <Input
              id="firstName"
              required
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={(e) => handleInputChange("firstname", e.target.value)}
              className="mt-1 border-slate-300 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
              Last Name *
            </Label>
            <Input
              id="lastName"
              required
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={(e) => handleInputChange("lastname", e.target.value)}
              className="mt-1 border-slate-300 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1 border-slate-300 focus:border-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Phone Number *
          </Label>
          <Input
            id="phone"
            required
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-1 border-slate-300 focus:border-blue-500"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-700">Inquiry Type *</Label>
          <Select required value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
            <SelectTrigger className="mt-1 border-slate-300 focus:border-blue-500">
              <SelectValue placeholder="Select inquiry type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="car-inquiry">Car Inquiry</SelectItem>
              <SelectItem value="test-drive">Schedule Test Drive</SelectItem>
              <SelectItem value="financing">Financing Options</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject" className="text-sm font-medium text-slate-700">
            Subject *
          </Label>
          <Input
            id="subject"
            required
            placeholder="What is this regarding?"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className="mt-1 border-slate-300 focus:border-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium text-slate-700">
            Message *
          </Label>
          <Textarea
            id="message"
            required
            placeholder="Tell us more about your inquiry..."
            value={formData.msg}
            onChange={(e) => handleInputChange("msg", e.target.value)}
            rows={5}
            className="mt-1 border-slate-300 focus:border-blue-500"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
