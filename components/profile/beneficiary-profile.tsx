"use client"

import { ProfileForm } from "./profile-form"
import { ProfileAvatar } from "./profile-avatar"
import { ProfileAddress } from "./profile-address"
import { ProfileStats } from "./profile-stats"

interface BeneficiaryProfileProps {
  data?: {
    name: string
    email: string
    phone: string
    avatar: string
    address: {
      province: string
      district: string
      ward: string
      address: string
    }
    stats: {
      totalReceived: number
      campaignsReceived: number
    }
  }
}

export function BeneficiaryProfile({ data }: BeneficiaryProfileProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-8">
        <ProfileAvatar 
          imageUrl={data?.avatar}
          onUpload={(file) => console.log('Upload:', file)}
        />

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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Địa chỉ</h3>
        <ProfileAddress
          initialData={data?.address}
          onChange={(data) => console.log('Address:', data)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thống kê hỗ trợ</h3>
        <ProfileStats stats={[
          { label: 'Số lần nhận hỗ trợ', value: data?.stats.totalReceived || 0 },
          { label: 'Chiến dịch đã nhận', value: data?.stats.campaignsReceived || 0 }
        ]} />
      </div>
    </div>
  )
} 