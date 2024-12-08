"use client"

import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface DonationListProps {
  donations: Array<{
    id: string
    amount: number
    transaction_code: string
    campaign: {
      id: string
      name: string
      charity: {
        name: string
      }
    }
    status: "pending" | "completed" | "failed"
    createdAt: string
    paymentMethod: {
      name: string
    }
  }>
  filter: {
    status: string
    dateRange: string
    campaign: string
  }
}

export function DonationList({ donations, filter }: DonationListProps) {
  // Thêm logic filter sau
  const filteredDonations = donations

  if (filteredDonations.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Chưa có khoản đóng góp nào
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredDonations.map((donation) => (
        <div key={donation.id} className="rounded-lg border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <Link
              href={`/dashboard/campaigns/${donation.campaign.id}`}
              className="text-lg font-semibold hover:underline"
            >
              {donation.campaign.name}
            </Link>
            <Badge variant={getStatusVariant(donation.status)}>
              {getStatusLabel(donation.status)}
            </Badge>
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            <p>Tổ chức: {donation.campaign.charity.name}</p>
            <p>Mã giao dịch: {donation.transaction_code}</p>
            <p>Thời gian: {formatDate(donation.createdAt)}</p>
            <p>Phương thức: {donation.paymentMethod.name}</p>
          </div>

          <div className="text-xl font-bold">
            {formatAmount(donation.amount)} VNĐ
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "completed":
      return "success"
    case "pending":
      return "warning"
    case "failed":
      return "destructive"
    default:
      return "default"
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "completed":
      return "Đã hoàn thành"
    case "pending":
      return "Đang xử lý"
    case "failed":
      return "Thất bại"
    default:
      return status
  }
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount)
}
