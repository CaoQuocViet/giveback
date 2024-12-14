"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { DonationFilter } from "./donation-filter"
import { DonationList } from "./donation-list"
import { DonationHistoryResponse } from "@/types/donation"
import apiClient from "@/lib/api-client"

export function DonationHistory() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DonationHistoryResponse["data"] | null>(null)
  const [filter, setFilter] = useState({
    status: "all",
    dateRange: "all",
    campaign: "",
  })

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await apiClient.get<DonationHistoryResponse>(
          "/api/donor/donations"
        )
        setData(response.data)
      } catch (error) {
        console.error("Error fetching donations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  if (loading) {
    return <div>Đang tải...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lịch sử đóng góp</h2>
        <DonationFilter filter={filter} onChange={setFilter} />
      </div>

      <DonationList donations={data?.donations || []} />
    </div>
  )
}
