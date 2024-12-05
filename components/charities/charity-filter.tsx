"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CharityFilterProps {
  filter: {
    verified: string
    rating: string
    search: string
  }
  onChange: (filter: any) => void
}

export function CharityFilter({ filter, onChange }: CharityFilterProps) {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm tổ chức..."
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
          className="pl-8 w-[300px]"
        />
      </div>

      <Select
        value={filter.verified}
        onValueChange={(value) => onChange({ ...filter, verified: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trạng thái xác minh" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="verified">Đã xác minh</SelectItem>
          <SelectItem value="unverified">Chưa xác minh</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.rating}
        onValueChange={(value) => onChange({ ...filter, rating: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Đánh giá" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="4">4 sao trở lên</SelectItem>
          <SelectItem value="3">3 sao trở lên</SelectItem>
          <SelectItem value="2">2 sao trở lên</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 