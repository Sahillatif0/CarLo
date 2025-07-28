"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit, Trash2, Eye, Filter, Car, Users, TrendingUp, AlertCircle, Plus } from "lucide-react"
import CarEditModal from "./car-edit-modal"
import DeleteConfirmModal from "./delete-confirm-modal"
import { Car as CarType} from "@/types/types"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [cars, setCars] = useState<CarType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingCar, setEditingCar] = useState<CarType | null>(null)
  const [deletingCar, setDeletingCar] = useState<CarType | null>(null)
  const router = useRouter()


  useEffect(()=>{
    // Fetch cars from API or database
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars")
        if (!response.ok) throw new Error("Failed to fetch cars")
        const data = await response.json()
        setCars(data.cars || []) // Fallback to empty array if API fails
      } catch (error) {
        console.error("Error fetching cars:", error)
        setCars([]) // Use empty array on error
      }
    }

    fetchCars()
  },[])

  // Filter cars based on search and status
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || car.sold === (statusFilter === "sold")
    return matchesSearch && matchesStatus
  })

  const handleDeleteCar = (carId: string) => {
    // Call API to delete car
    fetch(`/api/car/${carId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete car")
        return res.json()
      })
      .then(() => {
        // Update state to remove deleted car
        setCars(cars.filter((car) => car.id !== carId))
      })
      .catch((error) => {
        console.error("Error deleting car:", error)
      })
    setDeletingCar(null)
  }

  const handleUpdateCar = (updatedCar: CarType) => {
    // Call API to update car
    fetch(`/api/car/${updatedCar.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({carDetails: updatedCar, password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD}),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update car")
        return res.json()
      })
      .then((data) => {
        // Update state with edited car
        setCars(cars.map((car) => (car.id === data.updatedCar.id ? data.updatedCar : car)))
      })
      .catch((error) => {
        console.error("Error updating car:", error)
      })
    // setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)))
    setEditingCar(null)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      sold: { color: "bg-blue-100 text-blue-800", label: "Sold" },
      inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Stats calculation
  const stats = {
    total: cars.length,
    // active: cars.filter((car) => car.status === "active").length,
    // pending: cars.filter((car) => car.status === "pending").length,
    sold: cars.filter((car) => car.sold === true).length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{0}</div>
            <p className="text-xs text-muted-foreground">Currently live</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{0}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sold Cars</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.sold}</div>
            <p className="text-xs text-muted-foreground">Successfully sold</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle>Car Listings Management</CardTitle>
              <CardDescription>Manage all car listings, edit details, and moderate content</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={()=>{router.push("/add-car")}}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Car
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, make, or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cars Table */}
          <div className="rounded-md border">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Car Details</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <img
                          src={car.images?.[0] || "/white-car.png"}
                          alt={car.title}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{car.title}</p>
                          <p className="text-xs text-gray-500">
                            {car.year} • {car.mileage?.toLocaleString()} km • {car.city}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatPrice(car.price ?? 0)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">CarLo</p>
                          <p className="text-xs text-gray-500">{process.env.NEXT_PUBLIC_PHONE}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(car.sold ? "sold" : "active")}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(car.createdAt ?? "").toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => window.open(`/cars/${car.id}`, "_blank")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setEditingCar(car)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingCar(car)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
              {filteredCars.map((car) => (
                <Card key={car.id} className="p-4">
                  <div className="flex gap-4">
                    {/* Car Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={car.images?.[0] || "/white-car.png"}
                        alt={car.title}
                        className="w-20 h-16 object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Car Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 truncate">{car.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {car.year} • {car.mileage?.toLocaleString()} km
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          {getStatusBadge(car.sold ? "sold" : "active")}
                        </div>  
                      </div>
                      
                      {/* Price and Location */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-lg text-blue-600">
                          {formatPrice(car.price ?? 0)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {car.city}
                        </div>
                      </div>
                      
                      {/* Seller Info */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900">CarLo</p>
                        <p className="text-xs text-gray-500">{process.env.NEXT_PUBLIC_PHONE}</p>
                      </div>
                      
                      {/* Date and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {new Date(car.createdAt ?? "").toLocaleDateString()}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => window.open(`/cars/${car.id}`, "_blank")}
                            className="p-2"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setEditingCar(car)}
                            className="p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingCar(car)}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <Car className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No cars found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding a new car listing."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {editingCar && <CarEditModal car={editingCar} onClose={() => setEditingCar(null)} onSave={handleUpdateCar} />}

      {deletingCar && (
        <DeleteConfirmModal
          car={deletingCar}
          onClose={() => setDeletingCar(null)}
          onConfirm={() => handleDeleteCar(deletingCar.id)}
        />
      )}
    </div>
  )
}
