"use client"

import { useGetAdminStatsQuery } from "@/store/api/adminApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, FileText, MessageSquare, HardDrive } from "lucide-react"

export function StatsCards() {
  const { data: stats, isLoading } = useGetAdminStatsQuery()

  const statItems = [
    {
      title: "Total Users",
      value: stats?.totalUsers.toLocaleString() || "0",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Documents",
      value: stats?.totalDocuments.toLocaleString() || "0",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Chat Sessions",
      value: stats?.totalChats.toLocaleString() || "0",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Storage Used",
      value: stats?.storageUsed || "0 GB",
      icon: HardDrive,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-20" /> : <div className="text-2xl font-bold">{item.value}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
