"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {Car as CarType, User as UserType} from "@/types/types"

import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { Separator } from "@/components/ui/separator"
import {
  X,
  Upload,
  Save,
  Car,
  User,
  ImageIcon,
  Settings,
  MapPin,
  Gauge,
  DollarSign,
  Phone,
  Mail,
  Star,
  Shield,
  Fuel,
  Cog,
  Palette,
} from "lucide-react"

const bodyTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Crossover",
  "Coupe",
  "Convertible",
  "Wagon",
  "Pickup",
  "Van",
  "Minivan",
]

const transmissions = ["Manual", "Automatic", "CVT", "Semi-Automatic"]
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG", "LPG"]
const conditions = ["Excellent", "Good", "Fair", "Poor"]

const statusOptions = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "pending", label: "Pending Review", color: "bg-yellow-100 text-yellow-800" },
  { value: "sold", label: "Sold", color: "bg-blue-100 text-blue-800" },
  { value: "inactive", label: "Inactive", color: "bg-gray-100 text-gray-800" },
  { value: "featured", label: "Featured", color: "bg-purple-100 text-purple-800" },
]

const availableFeatures = [
  "Air Conditioning",
  "Power Steering",
  "Electric Windows",
  "Central Locking",
  "ABS Brakes",
  "Airbags",
  "Alloy Wheels",
  "CD Player",
  "Navigation System",
  "Bluetooth",
  "Backup Camera",
  "Sunroof",
  "Leather Seats",
  "Heated Seats",
  "Cruise Control",
  "Keyless Entry",
  "Push Start",
  "Parking Sensors",
]

export default function CarEditModal({ car, onClose, onSave }: { car: CarType; onClose: () => void; onSave: (car: CarType) => void }) {
  const [progress, setProgress] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<CarType>>({
    // Basic Information
    title: car.title || "",
    make: car.make || "",
    model: car.model || "",
    variant: car.variant || "",
    year: car.year || 2020,
    bodyType: car.bodyType || "",
    seating: car.seating || 5,

    // Technical Specifications
    engineSize: car.engineSize || "",
    transmission: car.transmission || "",
    fuelType: car.fuelType || "",
    mileage: car.mileage || 0,
    condition: car.condition || "",
    color: car.color || "",

    // Pricing & Location
    price: car.price || 0,
    originalPrice: car.originalPrice || 0,
    city: car.city || "",
    registeredCity: car.registeredCity || "",

    // Additional Details
    description: car.description || "",
    features: car.features || [],
    featured: car.featured || false,
    sold: car.sold || false,

  })

  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState(car.images || [])
  const [activeTab, setActiveTab] = useState("basic")
  const [seller, setSeller] = useState<UserType | null>(null)


  useEffect(()=>{
    const fetchSellerDetails = async () => {
      try {
        const response = await fetch(`/api/seller/${car.sellerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch seller details");
        }
        const data = await response.json();
        setSeller(data.seller);
      } catch (error) {
        console.error("Error fetching seller details:", error);
      }
    }
    if (car.sellerId) {
      fetchSellerDetails();
    }

  },[])

  const handleInputChange = (field: keyof CarType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInputChangeSeller = (field: keyof UserType, value: any) => {
    setSeller((prev) => prev ? { ...prev, [field]: value } : prev)
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features ?? [], feature],
    }))
  }


  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      const [movedImage] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, movedImage)
      return newImages
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    fetch("/api/seller/" + car.sellerId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seller),
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const updatedCar = {
      ...car,
      ...formData,
      images,
      updatedAt: new Date().toISOString(),
    }

    onSave(updatedCar)
    setIsLoading(false)
  }

  const currentStatus = statusOptions.find((s) => s.value === (formData.sold ? "sold" : "active")) || statusOptions[0]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] flex flex-col">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">Edit Car Listing</DialogTitle>
                <DialogDescription className="text-gray-600 mt-1">
                  Update car information, specifications, and listing details
                </DialogDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`${currentStatus?.color} border-0 px-3 py-1`}>{currentStatus?.label}</Badge>
                {formData.featured && (
                  <Badge className="bg-purple-100 text-purple-800 border-0 px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                
                  <Badge className="bg-green-100 text-green-800 border-0 px-3 py-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-6 pt-4 flex-shrink-0">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic" className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4" title="Basic Info">
                    <Car className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">Basic Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4" title="Specifications">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">Specs</span>
                  </TabsTrigger>
                  <TabsTrigger value="seller" className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4" title="Seller Info">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">Seller</span>
                  </TabsTrigger>
                  <TabsTrigger value="images" className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4" title="Images">
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">Images</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4" title="Advanced">
                    <Cog className="w-4 h-4" />
                    <span className="hidden lg:inline text-sm">Advanced</span>
                  </TabsTrigger>
                </TabsList>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[calc(95vh-350px)] mt-6">
                <div className="p-4 sm:p-6">
                  {/* Basic Information Tab */}
                  <TabsContent value="basic" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Car className="w-5 h-5" />
                          Vehicle Information
                        </CardTitle>
                        <CardDescription>Basic details about the vehicle</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title" className="text-sm font-medium">
                              Car Title
                            </Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => handleInputChange("title", e.target.value)}
                              placeholder="e.g., Toyota Corolla GLi 2020"
                              className="mt-1"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="status" className="text-sm font-medium">
                              Listing Status *
                            </Label>
                            <Select
                              value={formData.sold ? "sold" : "active"}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="make" className="text-sm font-medium">
                              Make *
                            </Label>
                            <Input
                              id="make"
                              value={formData.make}
                              onChange={(e) => handleInputChange("make", e.target.value)}
                              placeholder="e.g., Toyota"
                              className="mt-1"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="model" className="text-sm font-medium">
                              Model *
                            </Label>
                            <Input
                              id="model"
                              value={formData.model}
                              onChange={(e) => handleInputChange("model", e.target.value)}
                              placeholder="e.g., Corolla"
                              className="mt-1"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="variant" className="text-sm font-medium">
                              Variant
                            </Label>
                            <Input
                              id="variant"
                              value={formData.variant}
                              onChange={(e) => handleInputChange("variant", e.target.value)}
                              placeholder="e.g., GLi, XLi, Altis"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="year" className="text-sm font-medium">
                              Year *
                            </Label>
                            <Select
                              value={formData.year?.toString()}
                              onValueChange={(value) => handleInputChange("year", Number.parseInt(value))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="bodyType" className="text-sm font-medium">
                              Body Type
                            </Label>
                            <Select
                              value={formData.bodyType}
                              onValueChange={(value) => handleInputChange("bodyType", value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                              <SelectContent>
                                {bodyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="color" className="text-sm font-medium">
                              Color
                            </Label>
                            <Input
                              id="color"
                              value={formData.color}
                              onChange={(e) => handleInputChange("color", e.target.value)}
                              placeholder="e.g., Red, Blue, Black"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Location & Pricing
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price" className="text-sm font-medium">
                              Price (PKR) *
                            </Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value))}
                                className="pl-10"
                                placeholder="0"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="original-price" className="text-sm font-medium">
                              Original Price (PKR)
                            </Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="original-price"
                                type="number"
                                value={formData.originalPrice}
                                onChange={(e) => handleInputChange("originalPrice", Number.parseInt(e.target.value))}
                                className="pl-10"
                                placeholder="0"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="city" className="text-sm font-medium">
                              City *
                            </Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              placeholder="e.g., Karachi, Lahore, Islamabad"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="registeredIn" className="text-sm font-medium">
                              Registered City
                            </Label>
                            <Input
                              id="registeredCity"
                              value={formData.registeredCity}
                              onChange={(e) => handleInputChange("registeredCity", e.target.value)}
                              placeholder="e.g., Karachi, Lahore, Islamabad"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Specifications Tab */}
                  <TabsContent value="specs" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="w-5 h-5" />
                          Technical Specifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="engineSize" className="text-sm font-medium">
                              Engine Size
                            </Label>
                            <Input
                              id="engineSize"
                              value={formData.engineSize}
                              onChange={(e) => handleInputChange("engineSize", e.target.value)}
                              placeholder="e.g., 1300cc, 1600cc, 2000cc"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="transmission" className="text-sm font-medium">
                              Transmission
                            </Label>
                            <Select
                              value={formData.transmission}
                              onValueChange={(value) => handleInputChange("transmission", value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select transmission" />
                              </SelectTrigger>
                              <SelectContent>
                                {transmissions.map((trans) => (
                                  <SelectItem key={trans} value={trans}>
                                    {trans}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="fuelType" className="text-sm font-medium">
                              Fuel Type
                            </Label>
                            <Select
                              value={formData.fuelType}
                              onValueChange={(value) => handleInputChange("fuelType", value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                              <SelectContent>
                                {fuelTypes.map((fuel) => (
                                  <SelectItem key={fuel} value={fuel}>
                                    <div className="flex items-center gap-2">
                                      <Fuel className="w-4 h-4" />
                                      {fuel}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="mileage" className="text-sm font-medium">
                              Mileage (km)
                            </Label>
                            <div className="relative mt-1">
                              <Gauge className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="mileage"
                                type="number"
                                value={formData.mileage}
                                onChange={(e) => handleInputChange("mileage", Number.parseInt(e.target.value))}
                                className="pl-10"
                                placeholder="0"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="condition" className="text-sm font-medium">
                              Condition
                            </Label>
                            <Select
                              value={formData.condition}
                              onValueChange={(value) => handleInputChange("condition", value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                {conditions.map((condition) => (
                                  <SelectItem key={condition} value={condition}>
                                    {condition}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="seating" className="text-sm font-medium">
                              Seating Capacity
                            </Label>
                            <Select
                              value={formData.seating?.toString()}
                              onValueChange={(value) => handleInputChange("seating", Number.parseInt(value))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select seating capacity" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 4, 5, 6, 7, 8].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} {num > 1 ? "Seats" : "Seat"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        </div>
                        </div>

                        <Separator />

                        <div>
                          <Label className="text-sm font-medium mb-3 block">Features & Accessories</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {availableFeatures.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox
                                  id={feature}
                                  checked={formData.features?.includes(feature)}
                                  onCheckedChange={() => handleFeatureToggle(feature)}
                                />
                                <Label htmlFor={feature} className="text-sm">
                                  {feature}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Seller Information Tab */}
                  <TabsContent value="seller" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Seller Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="seller" className="text-sm font-medium">
                              Seller Name *
                            </Label>
                            <Input
                              id="seller"
                              value={seller?.name}
                              onChange={(e) => handleInputChangeSeller("name", e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="location" className="text-sm font-medium">
                              Location <sup className="text-red-500">*</sup>
                            </Label>
                            <Input
                              id="location"
                              value={seller?.address}
                              onChange={(e) => handleInputChangeSeller("address", e.target.value)}
                              placeholder="e.g., Karachi, Lahore, Islamabad"
                              className="mt-1"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-sm font-medium">
                              Phone Number *
                            </Label>
                            <div className="relative mt-1">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="phone"
                                value={seller?.phone}
                                onChange={(e) => handleInputChangeSeller("phone", e.target.value)}
                                className="pl-10"
                                placeholder="+92 300 1234567"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="whatsapp" className="text-sm font-medium">
                              WhatsApp Number
                            </Label>
                            <div className="relative mt-1">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="whatsapp"
                                value={seller?.phone}
                                onChange={(e) => handleInputChangeSeller("phone", e.target.value)}
                                className="pl-10"
                                placeholder="+92 300 1234567"
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email Address
                            </Label>
                            <div className="relative mt-1">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="email"
                                type="email"
                                value={seller?.email}
                                onChange={(e) => handleInputChangeSeller("email", e.target.value)}
                                className="pl-10"
                                placeholder="seller@example.com"
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <Label htmlFor="description" className="text-sm font-medium">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={4}
                            className="mt-1"
                            placeholder="Describe the car's condition, maintenance history, and any additional details..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Images Tab */}
                  <TabsContent value="images" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ImageIcon className="w-5 h-5" />
                          Car Images
                        </CardTitle>
                        <CardDescription>
                          Upload high-quality images of the car. First image will be the main display image.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                            <UploadDropzone<OurFileRouter, "carImageUploader"  >
                              endpoint="carImageUploader" // match this with your router config
                              onClientUploadComplete={(res) => {
                                console.log("Uploaded images:", res);
                                if (!res) return;
                                const urls = res.map((f) => f.url);
                                setImages((prev) => [...prev, ...urls.slice(0, 10 - prev.length)]); // Limit to 10 images
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
                          </div>

                          {images.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3">Uploaded Images ({images.length}/15)</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={image || "/placeholder.svg?height=120&width=160"}
                                      alt={`Car image ${index + 1}`}
                                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                                    />
                                    {index === 0 && (
                                      <Badge className="absolute top-2 left-2 text-xs bg-blue-600 hover:bg-blue-700">
                                        Main
                                      </Badge>
                                    )}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => removeImage(index)}
                                        className="h-6 w-6 p-0"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      {index > 0 && (
                                        <Button
                                          type="button"
                                          size="sm"
                                          variant="secondary"
                                          onClick={() => moveImage(index, index - 1)}
                                          className="h-6 text-xs flex-1"
                                        >
                                          ←
                                        </Button>
                                      )}
                                      {index < images.length - 1 && (
                                        <Button
                                          type="button"
                                          size="sm"
                                          variant="secondary"
                                          onClick={() => moveImage(index, index + 1)}
                                          className="h-6 text-xs flex-1"
                                        >
                                          →
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Advanced Tab */}
                  <TabsContent value="advanced" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Cog className="w-5 h-5" />
                          Advanced Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Sold</h4>
                            <p className="text-sm text-gray-600">Show this car as sold</p>
                          </div>
                          <Checkbox
                            checked={formData.sold}
                            onCheckedChange={(checked) => handleInputChange("sold", checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Featured Listing</h4>
                            <p className="text-sm text-gray-600">Show this car in featured section</p>
                          </div>
                          <Checkbox
                            checked={formData.featured}
                            onCheckedChange={(checked) => handleInputChange("featured", checked)}
                          />
                        </div>

                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
                </div>
              </Tabs>
            </form>
          </div>

          {/* Footer */}
          <div className="border-t bg-gray-50 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Last updated: {new Date(car.updatedAt || Date.now()).toLocaleDateString()}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
