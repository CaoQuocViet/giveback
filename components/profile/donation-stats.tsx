"use client"

import { formatAmount } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

// Mock data - sẽ được thay thế bằng dữ liệu thật từ API
const mockStats = {
  totalDonations: 5000000,
  campaignCount: 3,
  lastDonation: {
    amount: 1000000,
    campaignName: "Hỗ trợ đồng bào miền Trung",
    date: "2024-03-15",
  },
}

export function DonationStats() {
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
              {formatAmount(mockStats.totalDonations)} VNĐ
            </div>
          </div>

          <div>
            <div className="mb-1 text-sm font-medium text-muted-foreground">
              Số chiến dịch đã tham gia
            </div>
            <div className="text-2xl font-bold">{mockStats.campaignCount}</div>
          </div>

          <div>
            <div className="mb-1 text-sm font-medium text-muted-foreground">
              Đóng góp gần nhất
            </div>
            <div className="text-2xl font-bold">
              {formatAmount(mockStats.lastDonation.amount)} VNĐ
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {mockStats.lastDonation.campaignName}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
