"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"

import {
  Campaign,
  CampaignsResponse,
  getStatusLabel,
  getStatusVariant,
} from "@/types/campaigns"
import { formatAmount } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import { CampaignFilter } from "@/components/campaigns/campaign-filter"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({
    status: "all",
    rating: "all",
    search: "",
  })
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    total_pages: 1,
  })
  const itemsPerPage = 9

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const token = Cookies.get("auth_token")
        if (!token) {
          setError("Vui lòng đăng nhập để xem danh sách chiến dịch")
          return
        }

        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: itemsPerPage.toString(),
          status: filter.status !== "all" ? filter.status : "",
          rating: filter.rating !== "all" ? filter.rating : "",
          search: filter.search,
        })

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns?${queryParams}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Network response was not ok")
        }

        const data: CampaignsResponse = await response.json()

        if (!data || !data.data || !Array.isArray(data.data.campaigns)) {
          throw new Error("Invalid response format")
        }

        if (data.success) {
          setCampaigns(data.data.campaigns)
          setPagination(data.data.pagination)
        } else {
          throw new Error(data.message || "Không thể tải danh sách chiến dịch")
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err)
        setError(
          err instanceof Error
            ? err.message
            : "Đã có lỗi xảy ra khi tải dữ liệu"
        )
      } finally {
        setIsLoading(false)
      }
    }
    fetchCampaigns()
  }, [page, filter])

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

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Danh sách chiến dịch</h2>
        <CampaignFilter filter={filter} onFilterChange={setFilter} />
      </div>

      {/* <CampaignFilter filter={filter} onFilterChange={setFilter} /> */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          total={pagination.total}
          page={page}
          onPageChange={setPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  )
}
