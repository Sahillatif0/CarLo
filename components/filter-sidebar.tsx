"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilterSidebar() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Filters</h3>

      <div className="space-y-6">
        {/* Vehicle Type */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">Vehicle Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="cars" />
              <Label htmlFor="cars" className="text-sm">
                Cars
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="bikes" />
              <Label htmlFor="bikes" className="text-sm">
                Bikes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="parts" />
              <Label htmlFor="parts" className="text-sm">
                Auto Parts
              </Label>
            </div>
          </div>
        </div>

        {/* City */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">City</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Make */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">Make</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="suzuki">Suzuki</SelectItem>
              <SelectItem value="hyundai">Hyundai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">Price Range</Label>
          <div className="space-y-4">
            <Slider defaultValue={[500000, 3000000]} max={5000000} min={100000} step={100000} className="w-full" />
            <div className="flex items-center space-x-2">
              <Input placeholder="Min" className="text-sm" />
              <span className="text-slate-400">-</span>
              <Input placeholder="Max" className="text-sm" />
            </div>
          </div>
        </div>

        {/* Year */}
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">Year</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2018">2018</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full bg-transparent">
          Clear All
        </Button>
      </div>
    </div>
  )
}
