"use client"

import { useState } from "react"

import { Pagination } from "@/components/ui/pagination"

import { CampaignCard } from "./campaign-card"

interface CampaignListProps {
  data?: {
    campaigns: Array<{
      id: string
      name: string
      image: string
      description: string
      charity: {
        id: string
        name: string
      }
      target: number
      raised: number
      startDate: string
      endDate: string
      status: "KHOIDONG" | "DANGKEUGOI" | "DADONG" | "DAKETTHUC"
      comments: Array<{
        id: string
        content: string
        user: {
          name: string
          role: string
        }
        createdAt: string
      }>
    }>
    total: number
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
        total={data?.total || 0}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}
