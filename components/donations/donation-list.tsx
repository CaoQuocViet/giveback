"use client"

import Link from "next/link"
import { Building2, CalendarIcon, CreditCard, User } from "lucide-react"

import { DonationHistory } from "@/types/donation"
import { formatAmount, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface DonationListProps {
  donations: DonationHistory[]
}

export function DonationList({ donations }: DonationListProps) {
  if (donations.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Chưa có khoản đóng góp nào
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <Card key={donation.id} className="p-6">
          <div className="flex flex-col space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Link
                  href={`/dashboard/campaigns/${donation.id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {donation.campaignTitle}
                </Link>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="mr-2 size-4" />
                  {donation.charityTitle}
                </div>
              </div>
              <Badge variant={getStatusVariant(donation.status)}>
                {getStatusLabel(donation.status)}
              </Badge>
            </div>

            <Separator />

            {/* Details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CreditCard className="mr-2 size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Phương thức:</span>
                  <span className="ml-2 font-medium">
                    {donation.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Thời gian:</span>
                  <span className="ml-2 font-medium">
                    {formatDate(donation.createdAt)}
                  </span>
                </div>
                {donation.note && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Ghi chú:</span>
                    <span className="ml-2">{donation.note}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">Mã giao dịch:</span>
                  <span className="ml-2 font-medium">
                    {donation.transactionId}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="mr-2 size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Hiển thị:</span>
                  <span className="ml-2 font-medium">
                    {donation.isAnonymous ? "Ẩn danh" : "Công khai"}
                  </span>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="flex justify-end">
              <div className="text-xl font-bold text-primary">
                {formatAmount(donation.amount)} VNĐ
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "SUCCESS":
      return "success"
    case "PENDING":
      return "warning"
    case "FAILED":
      return "destructive"
    default:
      return "default"
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "SUCCESS":
      return "Thành công"
    case "PENDING":
      return "Đang xử lý"
    case "FAILED":
      return "Thất bại"
    default:
      return status
  }
}
