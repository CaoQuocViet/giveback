"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CampaignFilterProps {
  filter: {
    status: string
    rating: string
    search: string
  }
  onFilterChange: (filter: { status: string; rating: string; search: string }) => void
}

export function CampaignFilter({ filter, onFilterChange }: CampaignFilterProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Input
          placeholder="Tên chiến dịch..."
          value={filter.search}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
        />
      </div>

      <div className="w-full md:w-48">
        <Select
          value={filter.status}
          onValueChange={(value) => onFilterChange({ ...filter, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="STARTING">Khởi động</SelectItem>
            <SelectItem value="ONGOING">Đang kêu gọi</SelectItem>
            <SelectItem value="CLOSED">Đã đóng</SelectItem>
            <SelectItem value="COMPLETED">Đã kết thúc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-48">
        <Select
          value={filter.rating}
          onValueChange={(value) => onFilterChange({ ...filter, rating: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn đánh giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="4">4+ sao</SelectItem>
            <SelectItem value="3">3+ sao</SelectItem>
            <SelectItem value="2">2+ sao</SelectItem>
            <SelectItem value="1">1+ sao</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
