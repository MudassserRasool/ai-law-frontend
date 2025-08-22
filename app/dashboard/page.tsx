"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Footer } from "@/components/dashboard/footer"
import { ChatWindow } from "@/components/chat/chat-window"
import { ChatInput } from "@/components/chat/chat-input"

export default function DashboardPage() {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (role === "admin") {
      router.push("/admin")
    }
  }, [isAuthenticated, role, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <ChatWindow />
          <div className="p-4">
            <ChatInput />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
