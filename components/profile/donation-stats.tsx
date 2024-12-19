"use client"

import { formatAmount } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface DonationStatsProps {
  totalDonated: number
  campaignCount: number
}

export function DonationStats({
  totalDonated,
  campaignCount,
}: DonationStatsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Thống kê đóng góp</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="mb-1 text-sm font-medium text-muted-foreground">
              Tổng số tiền đã đóng góp
            </div>
            <div className="text-2xl font-bold">
              {formatAmount(totalDonated)} VNĐ
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm font-medium text-muted-foreground">
              Số chiến dịch đã tham gia
            </div>
            <div className="text-2xl font-bold">{campaignCount}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
