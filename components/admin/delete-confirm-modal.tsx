"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Trash2, X } from "lucide-react"

export default function DeleteConfirmModal({ car, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onConfirm()
    setIsDeleting(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Car Listing
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The car listing will be permanently removed from the system.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <img
                src={car.images?.[0] || "/placeholder.svg?height=80&width=120"}
                alt={car.title}
                className="w-20 h-16 object-cover rounded-md border"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 line-clamp-1">{car.title}</h4>
                <p className="text-sm text-gray-600">
                  {car.year} • {car.location}
                </p>
                <p className="text-lg font-semibold text-blue-600">PKR {car.price?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline">{car.status}</Badge>
              {car.featured && <Badge className="bg-purple-100 text-purple-800">Featured</Badge>}
              {car.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium">Warning: This will permanently:</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>Remove the car listing from the website</li>
                  <li>Delete all associated images and data</li>
                  <li>Remove from search results and featured sections</li>
                  <li>Cancel any pending inquiries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="min-w-[120px]">
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Car
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
