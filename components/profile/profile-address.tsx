"use client"

import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfileAddressProps {
  initialData?: {
    province: string
    district: string
    ward: string
    address: string
  }
  onChange: (data: any) => void
}

export function ProfileAddress({ initialData, onChange }: ProfileAddressProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label>Tỉnh/Thành phố</Label>
        <Select defaultValue={initialData?.province}>
          {/* Render provinces options */}
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Quận/Huyện</Label>
        <Select defaultValue={initialData?.district}>
          {/* Render districts options */}
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Phường/Xã</Label>
        <Select defaultValue={initialData?.ward}>
          {/* Render wards options */}
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Địa chỉ chi tiết</Label>
        <Input defaultValue={initialData?.address} />
      </div>
    </div>
  )
} 