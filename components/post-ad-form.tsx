"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

export default function PostAdForm() {
  const [images, setImages] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages].slice(0, 10))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Vehicle Type */}
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-2 block">Vehicle Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select vehicle type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="car">Car</SelectItem>
            <SelectItem value="bike">Bike</SelectItem>
            <SelectItem value="parts">Lo Parts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Basic Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">
            Title
          </Label>
          <Input id="title" placeholder="e.g., Toyota Corolla GLi 2020" />
        </div>
        <div>
          <Label htmlFor="price" className="text-sm font-medium text-slate-700 mb-2 block">
            Price (PKR)
          </Label>
          <Input id="price" placeholder="e.g., 3250000" type="number" />
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">Make</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="suzuki">Suzuki</SelectItem>
              <SelectItem value="hyundai">Hyundai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">Model</Label>
          <Input placeholder="e.g., Corolla" />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">Year</Label>
          <Input placeholder="e.g., 2020" type="number" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">Mileage (km)</Label>
          <Input placeholder="e.g., 45000" type="number" />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-2 block">City</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium text-slate-700 mb-2 block">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe your vehicle's condition, features, and any additional details..."
          rows={4}
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label className="text-sm font-medium text-slate-700 mb-2 block">Images (Max 10)</Label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Click to upload images or drag and drop</p>
            <p className="text-sm text-slate-400">PNG, JPG up to 5MB each</p>
          </label>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image || "/car.png"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2 block">
            Your Name
          </Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2 block">
            Phone Number
          </Label>
          <Input id="phone" placeholder="Enter your phone number" />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Post Your Ad
      </Button>
    </form>
  )
}
