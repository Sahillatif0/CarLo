"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, CheckCircle, Car, ImageIcon, FileText, User } from "lucide-react"
import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { Car as CarType, User as UserType } from "@/types/types"



const features = [
  "Air Conditioning",
  "Power Steering",
  "Electric Windows",
  "Central Locking",
  "Alloy Wheels",
  "Leather Seats",
  "Sunroof",
  "Navigation System",
  "Bluetooth Connectivity",
  "Backup Camera",
  "Cruise Control",
  "ABS Brakes",
  "Airbags",
  "Heated Seats",
  "Keyless Entry",
  "Push Start Button",
]

export default function AddCarForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [carDetails, setCarDetails] = useState<Partial<CarType>>({
    title: "",
    make: "",
    model: "",
    year: 2010,
    price: 0,
    originalPrice: 0,
    variant: "",
    mileage: 0,
    transmission: "",
    fuelType: "",
    bodyType: "",
    engineSize: "",
    assembly: "",
    color: "",
    condition: "",
    features: [] as string[],
    seating: 0,
    description: "",
    images: [] as string[],
    city: "",
    registeredCity: "",
    address: "",
    badge: "",
    badgeColor: ""
  })
  const [sellerDetails, setSellerDetails] = useState<Partial<UserType>>({
    name: "",
    phone: "",
    email: "",
    address: ""
  })

  const updateCarDetails = (key: string, value: string | string[] | number) => {
    setCarDetails((prev) => ({ ...prev, [key]: value }))
    if (key === "address") {
      setSellerDetails((prev) => ({ ...prev, [key]: typeof value === "string" ? value : Array.isArray(value) ? value.join(", ") : String(value) }))
    }
  }

  const updateSellerDetails = (key: string, value: string) => {
    setSellerDetails((prev) => ({ ...prev, [key]: value }))
  }

  const removeImage = (index: number) => {
    setCarDetails((prev) => ({ ...prev, images: prev.images?.filter((_, i) => i !== index) }) )
  }

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
    setCarDetails((prev) => ({ ...prev, features: selectedFeatures }))
  }

  interface ParseToInt {
    (value: string | number | undefined): number
  }

  const parseToInt: ParseToInt = (value) => {
    if (typeof value === "number") return value
    const parsed = parseInt(value??"0")
    return isNaN(parsed) ? 0 : parsed
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 3000))
    fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carDetails:{...carDetails, year: parseToInt(carDetails.year), price: parseToInt(carDetails.price), mileage: parseToInt(carDetails.mileage), originalPrice: parseToInt(carDetails.originalPrice), seating: parseToInt(carDetails.seating) }, sellerDetails }),
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        console.error("Error submitting form");
      }
    })

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 p-12 text-center animate-slide-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-poppins">Car Listed Successfully!</h2>
        <p className="text-slate-600 mb-8 text-lg">
          Your car has been submitted for review. We'll notify you once it's approved and live on our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setCurrentStep(1)
              setSelectedFeatures([])
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            List Another Car
          </Button>
          <Button variant="outline" asChild className="bg-transparent">
            <a href="/cars">Browse Cars</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden animate-slide-up">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 font-poppins">List Your Car</h2>
          <span className="text-sm text-slate-600">Step {currentStep} of 4</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Car className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-900 font-poppins">Basic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="make" className="text-sm font-medium text-slate-700 mb-2 block">
                  Make *
                </Label>
                <Input
                  id="make"
                  required
                  placeholder="e.g., Toyota, Honda, Suzuki"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.make}
                  onChange={(e) => updateCarDetails("make", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="model" className="text-sm font-medium text-slate-700 mb-2 block">
                  Model *
                </Label>
                <Input
                  id="model"
                  required
                  placeholder="e.g., Corolla, Civic, City"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.model}
                  onChange={(e) => updateCarDetails("model", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="year" className="text-sm font-medium text-slate-700 mb-2 block">
                  Year *
                </Label>
                <Select required value={carDetails.year?.toString()} onValueChange={(value) => updateCarDetails("year", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="variant" className="text-sm font-medium text-slate-700 mb-2 block">
                  Variant
                </Label>
                <Input
                  id="variant"
                  placeholder="e.g., GLi, VTi, Turbo"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.variant}
                  onChange={(e) => updateCarDetails("variant", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="mileage" className="text-sm font-medium text-slate-700 mb-2 block">
                  Mileage (km) *
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  required
                  placeholder="e.g., 45000"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.mileage}
                  onChange={(e) => updateCarDetails("mileage", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="seating" className="text-sm font-medium text-slate-700 mb-2 block">
                  Seating Capacity *
                </Label>
                <Input
                  id="seating"
                  type="number"
                  required
                  placeholder="e.g., 4, 5, 7"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.seating}
                  onChange={(e) => updateCarDetails("seating", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-sm font-medium text-slate-700 mb-2 block">
                  Price (PKR) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  required
                  placeholder="e.g., 3250000"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.price}
                  onChange={(e) => updateCarDetails("price", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="original-price" className="text-sm font-medium text-slate-700 mb-2 block">
                  Original Price (PKR) *
                </Label>
                <Input
                  id="original-price"
                  type="number"
                  required
                  placeholder="e.g., 3350000"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.originalPrice}
                  onChange={(e) => updateCarDetails("originalPrice", e.target.value)}
                />
              </div>
              <div>
                  <Label htmlFor="condition" className="text-sm font-medium text-slate-700 mb-2 block">
                    Condition *
                  </Label>
                  <Input
                    id="condition"
                    type="text"
                    required
                    placeholder="e.g., Poor, Fair, Good, Excellent"
                    className="border-slate-300 focus:border-blue-500"
                    value={carDetails.condition}
                    onChange={(e) => updateCarDetails("condition", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="registeredCity" className="text-sm font-medium text-slate-700 mb-2 block">
                    Registered City *
                  </Label>
                  <Input
                    id="registeredCity"
                    type="text"
                    required
                    placeholder="e.g., Karachi"
                    className="border-slate-300 focus:border-blue-500"
                    value={carDetails.registeredCity}
                    onChange={(e) => updateCarDetails("registeredCity", e.target.value)}
                  />
                </div>
            </div>
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">
                Ad Title *
              </Label>
              <Input
                id="title"
                required
                placeholder="e.g., Toyota Corolla GLi 2020 - Excellent Condition"
                className="border-slate-300 focus:border-blue-500"
                value={carDetails.title}
                onChange={(e) => updateCarDetails("title", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 2: Technical Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-900 font-poppins">Technical Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Engine Capacity *</Label>
                <Select required value={carDetails.engineSize} onValueChange={(value) => updateCarDetails("engineSize", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select engine capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="660cc">660cc</SelectItem>
                    <SelectItem value="800cc">800cc</SelectItem>
                    <SelectItem value="1000cc">1000cc</SelectItem>
                    <SelectItem value="1300cc">1300cc</SelectItem>
                    <SelectItem value="1500cc">1500cc</SelectItem>
                    <SelectItem value="1600cc">1600cc</SelectItem>
                    <SelectItem value="1800cc">1800cc</SelectItem>
                    <SelectItem value="2000cc">2000cc</SelectItem>
                    <SelectItem value="2500cc+">2500cc+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Transmission *</Label>
                <Select required value={carDetails.transmission} onValueChange={(value) => updateCarDetails("transmission", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="CVT">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Fuel Type *</Label>
                <Select required value={carDetails.fuelType} onValueChange={(value) => updateCarDetails("fuelType", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="CNG">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Body Type *</Label>
                <Select required value={carDetails.bodyType} onValueChange={(value) => updateCarDetails("bodyType", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Crossover">Crossover</SelectItem>
                    <SelectItem value="Coupe">Coupe</SelectItem>
                    <SelectItem value="Convertible">Convertible</SelectItem>
                    <SelectItem value="Wagon">Wagon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Color *</Label>
                <Input
                  required
                  placeholder="e.g., White, Black, Silver"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.color}
                  onChange={(e) => updateCarDetails("color", e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Assembly *</Label>
                <Select required value={carDetails.assembly} onValueChange={(value) => updateCarDetails("assembly", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select assembly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Local">Local</SelectItem>
                    <SelectItem value="Imported">Imported</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Badge *</Label>
                <Input
                  required
                  placeholder="e.g., New, Featured, Luxury"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.badge}
                  onChange={(e) => updateCarDetails("badge", e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Badge Color *</Label>
                <Select required value={carDetails.badgeColor} onValueChange={(value) => updateCarDetails("badgeColor", value)}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select Badge Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-gradient-to-r from-yellow-400 to-orange-500">Yellow - Orange</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-purple-500 to-pink-500">Purple - Pink</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-green-500 to-emerald-500">Green - Emerald</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-green-400 to-blue-500">Green - Blue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Features */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-4 block">Features</Label>
              <div className="grid md:grid-cols-3 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={feature} className="text-sm text-slate-700">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Images & Description */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <ImageIcon className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-900 font-poppins">Images & Description</h3>
            </div>

            {/* Image Upload */}
            <div>
              <UploadDropzone<OurFileRouter, "carImageUploader"  >
                endpoint="carImageUploader" // match this with your router config
                onClientUploadComplete={(res) => {
                  console.log("Uploaded images:", res);
                  if (!res) return;
                  const urls = res.map((f) => f.url);
                  // setImages((prev) => [...prev, ...urls.slice(0, 10 - prev.length)]); // Limit to 10 images
                  setCarDetails((prev) => ({ ...prev, images: [...(prev.images || []), ...urls.slice(0, 10 - (prev.images?.length || 0))] }))
                }}
                onUploadError={(error) => {
                  console.error("Upload error:", error);
                  alert("Failed to upload images");
                }}
                onUploadProgress={(pr)=>{
                  setProgress(pr);
                }}
                appearance={{
                  container: "border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors",
                  uploadIcon: "text-slate-400 w-12 h-12 mx-auto mb-4",
                  label: "text-slate-600 mb-2",
                  allowedContent: "text-sm text-slate-400",
                }}
                config={{
                  mode: "auto"
                }}
              />  
              {progress !== null && (
                <div className="mt-2 text-sm text-slate-500">Uploading... {progress}%</div>
              )}

              {/* Image Preview */}
              {(carDetails.images?.length ?? 0) > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  {(carDetails.images ?? []).map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-slate-200"
                      />
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-slate-700 mb-2 block">
                Description *
              </Label>
              <Textarea
                id="description"
                required
                placeholder="Describe your car's condition, history, and any additional details that buyers should know..."
                rows={6}
                className="border-slate-300 focus:border-blue-500"
                value={carDetails.description}
                onChange={(e) => updateCarDetails("description", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-slate-900 font-poppins">Contact Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sellerName" className="text-sm font-medium text-slate-700 mb-2 block">
                  Your Name *
                </Label>
                <Input
                  id="sellerName"
                  required
                  placeholder="Enter your full name"
                  className="border-slate-300 focus:border-blue-500"
                  value={sellerDetails.name}
                  onChange={(e) => updateSellerDetails("name", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2 block">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  required
                  placeholder="03XX-XXXXXXX"
                  className="border-slate-300 focus:border-blue-500"
                  value={sellerDetails.phone}
                  onChange={(e) => updateSellerDetails("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="border-slate-300 focus:border-blue-500"
                  value={sellerDetails.email}
                  onChange={(e) => updateSellerDetails("email", e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">City *</Label>
                <Input
                  id="city"
                  required
                  placeholder="Enter your city"
                  className="border-slate-300 focus:border-blue-500"
                  value={carDetails.city}
                  onChange={(e) => updateCarDetails("city", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-sm font-medium text-slate-700 mb-2 block">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your complete address for potential buyers to visit"
                rows={3}
                className="border-slate-300 focus:border-blue-500"
                value={carDetails.address}
                onChange={(e) => updateCarDetails("address", e.target.value)}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" required className="mt-1" />
                <div>
                  <Label htmlFor="terms" className="text-sm font-medium text-slate-700 cursor-pointer">
                    I agree to the Terms and Conditions *
                  </Label>
                  <p className="text-xs text-slate-600 mt-1">
                    By listing your car, you agree to our terms of service and privacy policy. Your listing will be
                    reviewed before going live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-slate-200 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-transparent"
          >
            Previous
          </Button>

          <div className="flex gap-3">
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Listing"
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
