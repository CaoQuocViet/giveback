"use client"

import { ProfileForm } from "./profile-form"
import { ProfileAvatar } from "./profile-avatar"
import { ProfileAddress } from "./profile-address"
import { ProfileStats } from "./profile-stats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CharityProfileProps {
  data?: {
    name: string
    email: string
    phone: string
    avatar: string
    license: string
    description: string
    address: {
      province: string
      district: string
      ward: string
      address: string
    }
    stats: {
      totalCampaigns: number
      totalRaised: number
      rating: number
    }
  }
}

export function CharityProfile({ data }: CharityProfileProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-8">
        {/* Avatar Section */}
        <ProfileAvatar 
          imageUrl={data?.avatar}
          onUpload={(file) => console.log('Upload:', file)}
        />

        {/* Basic Info Section */}
        <div className="flex-1">
          <ProfileForm
            initialData={{
              fullName: data?.name || '',
              email: data?.email || '',
              phone: data?.phone || ''
            }}
            onSubmit={(data) => console.log('Submit:', data)}
          />
        </div>
      </div>

      {/* License Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Giấy phép hoạt động</h3>
        <div className="grid gap-2">
          <Label>Số giấy phép</Label>
          <Input defaultValue={data?.license} />
        </div>
        <Button variant="outline">Tải lên giấy phép mới</Button>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mô tả tổ chức</h3>
        <textarea 
          className="w-full min-h-[100px] p-2 border rounded-md"
          defaultValue={data?.description}
        />
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Địa chỉ</h3>
        <ProfileAddress
          initialData={data?.address}
          onChange={(data) => console.log('Address:', data)}
        />
      </div>

      {/* Stats Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thống kê</h3>
        <ProfileStats stats={[
          { label: 'Tổng số chiến dịch', value: data?.stats.totalCampaigns || 0 },
          { label: 'Tổng số tiền gây quỹ', value: data?.stats.totalRaised || 0 },
          { label: 'Đánh giá', value: `${data?.stats.rating || 0}/5` }
        ]} />
      </div>
    </div>
  )
} 