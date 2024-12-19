"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import {
  Building2,
  Coins,
  Flag,
  HandHelpingIcon,
  Heart,
  Users,
} from "lucide-react"

import { formatCurrency } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { useStatistics } from "@/hooks/useStatistics"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()
  const { stats, isLoading, error } = useStatistics()
  const { user } = useAuth()

  useEffect(() => {
    const token = Cookies.get("auth_token")
    if (!token) {
      router.push("/auth/login")
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  const statCards = [
    {
      title: "Tổ chức từ thiện",
      value: stats?.total_charities || 0,
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Chiến dịch",
      value: stats?.total_campaigns || 0,
      icon: Flag,
      color: "text-green-600",
    },
    {
      title: "Tổng tiền quyên góp",
      value: formatCurrency(stats?.total_donated || 0),
      icon: Coins,
      color: "text-yellow-600",
    },
    {
      title: "Tổng tiền cứu trợ",
      value: formatCurrency(stats?.total_relief || 0),
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Người đóng góp",
      value: stats?.total_donors || 0,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Người nhận hỗ trợ",
      value: stats?.total_beneficiaries || 0,
      icon: Users,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800 dark:shadow-gray-700/20">
        <h2 className="mb-2 text-xl font-semibold dark:text-gray-100">
          Xin chào, {user?.fullName || "Người dùng"}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Chọn chức năng từ menu bên trái để bắt đầu.
        </p>
      </div>

      <h1 className="mb-8 text-3xl font-bold">Tổng quan hệ thống</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`size-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* TODO: Thêm biểu đồ thống kê */}
    </div>
  )
}
