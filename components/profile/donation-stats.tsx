"use client"

import { Card, CardContent } from "@/components/ui/card"
import { formatAmount } from "@/lib/utils"

// Mock data - sẽ được thay thế bằng dữ liệu thật từ API
const mockStats = {
  totalDonations: 5000000,
  campaignCount: 3,
  lastDonation: {
    amount: 1000000,
    campaignName: "Hỗ trợ đồng bào miền Trung",
    date: "2024-03-15"
  }
}

export function DonationStats() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Thống kê đóng góp</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Tổng số tiền đã đóng góp
            </div>
            <div className="text-2xl font-bold">
              {formatAmount(mockStats.totalDonations)} VNĐ
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Số chiến dịch đã tham gia
            </div>
            <div className="text-2xl font-bold">
              {mockStats.campaignCount}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Đóng góp gần nhất
            </div>
            <div className="text-2xl font-bold">
              {formatAmount(mockStats.lastDonation.amount)} VNĐ
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {mockStats.lastDonation.campaignName}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 