"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, role, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-heading font-bold text-foreground">AI Chat Assistant</h1>
        <p className="text-lg text-muted-foreground">
          Advanced AI chat interface with document processing capabilities
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
