"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Users, Building2, Calendar, Settings, TrendingUp, Save, X } from "lucide-react"
import { toast } from "sonner"

interface StatsData {
  numberOfCars: number
  customers: number
  dealers: number
  yearsExperience: number
}

export default function UpdateStats() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<StatsData>({
    numberOfCars: 0,
    customers: 0,
    dealers: 0,
    yearsExperience: 0,
  })

  const statsConfig = [
    {
      key: "numberOfCars" as keyof StatsData,
      label: "Number of Cars",
      shortLabel: "Cars",
      icon: Car,
      placeholder: "e.g., 1,250",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Total cars in inventory"
    },
    {
      key: "customers" as keyof StatsData,
      label: "Happy Customers",
      shortLabel: "Customers",
      icon: Users,
      placeholder: "e.g., 5,000",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Satisfied customers served"
    },
    {
      key: "dealers" as keyof StatsData,
      label: "Partner Dealers",
      shortLabel: "Dealers",
      icon: Building2,
      placeholder: "e.g., 150",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Authorized dealer network"
    },
    {
      key: "yearsExperience" as keyof StatsData,
      label: "Years Experience",
      shortLabel: "Experience",
      icon: Calendar,
      placeholder: "e.g., 15",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Years in automotive industry"
    }
  ]

  const fetchCurrentStats = async () => {
    try {
      const response = await fetch("/api/stats")
      if (!response.ok) throw new Error("Failed to fetch stats")
      const data = await response.json()
      if (data.stats) {
        setStats({
          numberOfCars: data.stats.cars,
          customers: data.stats.customers,
          dealers: data.stats.dealers,
          yearsExperience: data.stats.experience,
      })
      }
      console.log("Fetched current stats:", data.stats)
    } catch (error) {
      console.error("Error fetching stats:", error)
      return null
    }
  }
  useEffect(() => {
    // Fetch current stats from API or context
    fetchCurrentStats()
  }, [])

  const handleInputChange = (key: keyof StatsData, value: string) => {
    const numericValue = parseInt(value.replace(/,/g, '')) || 0
    setStats(prev => ({
      ...prev,
      [key]: numericValue
    }))
  }

  const formatNumber = (value: number) => {
    return value.toLocaleString()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch("/api/stats", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ stats:{cars: stats.numberOfCars, customers: stats.customers, dealers: stats.dealers, experience: stats.yearsExperience} })
        })
        if (!response.ok) {
          throw new Error("Failed to update stats")
        }
        toast.success("Stats updated successfully")
        setIsOpen(false)
        } catch (error) {
            toast.error("Failed to update stats")
        } finally {
            setIsLoading(false)
}
  }

  const handleReset = () => {
    fetchCurrentStats()
    toast.info("Changes reset to current stats")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Update Stats</span>
          <span className="sm:hidden">Update Stats</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-[95vw] h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="p-4 sm:p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50/30 shrink-0">
          <DialogTitle className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 sm:p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <span className="hidden sm:inline">Update Company Statistics</span>
            <span className="sm:hidden">Update Stats</span>
          </DialogTitle>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            <span className="hidden sm:inline">Keep your company metrics up to date to showcase your growth and success</span>
            <span className="sm:hidden">Update your company metrics</span>
          </p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Stats Grid */}
            <div className="space-y-4 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-6 sm:space-y-0">
              {statsConfig.map((config) => {
                const IconComponent = config.icon
                return (
                  <Card key={config.key} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`${config.bgColor} p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                          <IconComponent className={`w-4 h-4 sm:w-6 sm:h-6 ${config.color}`} />
                        </div>
                        
                        <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                          <div>
                            <Label htmlFor={config.key} className="text-sm font-semibold text-gray-900">
                              <span className="sm:hidden">{config.shortLabel}</span>
                              <span className="hidden sm:inline">{config.label}</span>
                            </Label>
                            <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                              {config.description}
                            </p>
                          </div>
                          
                          <div className="relative">
                            <Input
                              id={config.key}
                              type="text"
                              value={formatNumber(stats[config.key])}
                              onChange={(e) => handleInputChange(config.key, e.target.value)}
                              placeholder={config.placeholder}
                              className="text-base sm:text-lg font-semibold pr-8 sm:pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                              <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} opacity-60`} />
                            </div>
                          </div>

                          {/* Mobile: Show description below input */}
                          <p className="text-xs text-gray-500 sm:hidden">
                            {config.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-slate-200">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Statistics Summary
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  {statsConfig.map((config) => (
                    <div key={config.key} className="space-y-1">
                      <div className={`text-lg sm:text-2xl font-bold ${config.color}`}>
                        {formatNumber(stats[config.key])}
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="sm:hidden">{config.shortLabel}</span>
                        <span className="hidden sm:inline">{config.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="border-t bg-gray-50/50 p-4 sm:p-6 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 order-2 sm:order-1"
            >
              <X className="w-4 h-4" />
              Reset Changes
            </Button>
            
            <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 min-w-[100px] sm:min-w-[120px] flex-1 sm:flex-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Updating...</span>
                    <span className="sm:hidden">...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Update Stats</span>
                    <span className="sm:hidden">Update</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}