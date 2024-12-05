"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface DonationFilterProps {
  filter: {
    status: string
    dateRange: string
    campaign: string
  }
  onChange: (filter: any) => void
}

export function DonationFilter({ filter, onChange }: DonationFilterProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={filter.status}
        onValueChange={(value) => onChange({ ...filter, status: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="completed">Đã hoàn thành</SelectItem>
          <SelectItem value="pending">Đang xử lý</SelectItem>
          <SelectItem value="failed">Thất bại</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.dateRange}
        onValueChange={(value) => onChange({ ...filter, dateRange: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Thời gian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="7days">7 ngày qua</SelectItem>
          <SelectItem value="30days">30 ngày qua</SelectItem>
          <SelectItem value="90days">90 ngày qua</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        variant="outline"
        onClick={() => onChange({
          status: 'all',
          dateRange: 'all',
          campaign: ''
        })}
      >
        Đặt lại
      </Button>
    </div>
  )
} 