"use client"
import { useState } from "react"
import { Suspense } from "react"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminHeader from "@/components/admin/admin-header"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("/api/admin/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      })
      if (res.ok) {
        setAuthenticated(true)
      } else {
        const data = await res.json()
        setError(data.error || "Authentication failed")
      }
    } catch (err) {
      setError("Network error")
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            className="border p-2 w-full mb-4"
            placeholder="Enter admin password"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

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
