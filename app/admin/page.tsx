import { Suspense } from "react"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminHeader from "@/components/admin/admin-header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <AdminDashboard />
        </Suspense>
      </main>
    </div>
  )
}
