"use client"

import { useState } from "react"

import { Pagination } from "@/components/ui/pagination"

import { CampaignCard } from "./campaign-card"

interface CampaignListProps {
  data?: {
    campaigns: Array<{
      id: string
      title: string
      description: string
      campaign_image: string | null
      target_amount: number
      current_amount: number
      start_date: string | null
      end_date: string | null
      status: "STARTING" | "ONGOING" | "CLOSED" | "COMPLETED"
      rating: number
      created_at: string | null
      charity: {
        name: string
        logo: string | null
      } | null
    }>
    pagination: {
      total: number
      page: number
      total_pages: number
    }
  }
}

export function CampaignList({ data }: CampaignListProps) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 9

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Danh sách chiến dịch</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      <Pagination
        total={data?.pagination.total || 0}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}
