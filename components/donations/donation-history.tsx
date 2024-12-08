"use client"

import { useState } from "react"

import { DonationFilter } from "./donation-filter"
import { DonationList } from "./donation-list"

interface DonationHistoryProps {
  data?: {
    donations: Array<{
      id: string
      amount: number
      campaign: {
        id: string
        name: string
        charity: {
          name: string
        }
      }
      status: "pending" | "completed" | "failed"
      createdAt: string
      paymentMethod: string
    }>
  }
}

export function DonationHistory({ data }: DonationHistoryProps) {
  const [filter, setFilter] = useState({
    status: "all",
    dateRange: "all",
    campaign: "",
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lịch sử đóng góp</h2>
        <DonationFilter filter={filter} onChange={setFilter} />
      </div>

      <DonationList donations={data?.donations || []} filter={filter} />
    </div>
  )
}
