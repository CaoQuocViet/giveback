"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ProfileFormProps {
  initialData?: {
    fullName: string
    email: string
    phone: string
  }
  onSubmit: (data: any) => void
}

export function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      // Handle form submission
    }}>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={initialData?.fullName}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={initialData?.phone}
            required
          />
        </div>

        <Button type="submit">Cập nhật thông tin</Button>
      </div>
    </form>
  )
} 