"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"
import { AdminHeader } from "@/components/admin/admin-header"
import { StatsCards } from "@/components/admin/stats-cards"
import { DocumentsTable } from "@/components/admin/documents-table"

export default function AdminPage() {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (role !== "admin") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, role, router])

  if (!isAuthenticated || role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-6 py-8 space-y-8">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Monitor system statistics and manage documents.</p>
        </div>

        <StatsCards />

        <DocumentsTable />
      </main>
    </div>
  )
}
