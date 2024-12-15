"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { toast } from "sonner"

// Cập nhật interface để khớp với model
interface DonationData {
  campaignId: string;
  amount: number;
  note: string | null;
  isAnonymous: boolean;
  status: 'SUCCESS';
  isIntermediate: boolean;
}

interface CreateDonationFormProps {
  campaigns: Array<{id: string, title: string, status: string}>
}

export function CreateDonationForm({ campaigns }: CreateDonationFormProps) {
  const [formData, setFormData] = useState({
    campaignId: "",
    amount: "",
    note: ""
  })

  // Chỉ hiển thị các chiến dịch đang ONGOING
  const availableCampaigns = campaigns.filter(c => c.status === "ONGOING")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Validate amount
    const amount = Number(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      toast.error("Số tiền không hợp lệ")
      return
    }

    // Map form data to match API expectations
    const donationData: DonationData = {
      campaignId: formData.campaignId,
      amount: amount,
      note: formData.note || null,
      isAnonymous: false,
      status: 'SUCCESS',
      isIntermediate: true
    }

    try {
      console.log("Sending donation data:", donationData) // Debug log

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/system-donor/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create donation')
      }

      toast.success("Tạo khoản đóng góp thành công")
      // Reset form
      setFormData({
        campaignId: "",
        amount: "",
        note: ""
      })
    } catch (error) {
      console.error("Error creating donation:", error)
      toast.error(error instanceof Error ? error.message : "Đã có lỗi xảy ra khi tạo khoản đóng góp")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Chọn chiến dịch</Label>
        <Select
          required
          value={formData.campaignId}
          onValueChange={(value) => {
            console.log("Selected campaign ID:", value) // Debug log
            setFormData({...formData, campaignId: value})
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn chiến dịch đóng góp" />
          </SelectTrigger>
          <SelectContent>
            {availableCampaigns.map(campaign => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tên người đóng góp</Label>
        <Input 
          disabled
          value="Đóng góp trực tiếp qua tổ chức"
          className="bg-muted cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <Label>Số tiền đóng góp (VNĐ)</Label>
        <Input 
          required
          type="number"
          min="1000"
          step="1000"
          placeholder="Nhập số tiền"
          value={formData.amount}
          onChange={e => setFormData({...formData, amount: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label>Ghi chú (không bắt buộc)</Label>
        <Textarea 
          placeholder="Nhập ghi chú"
          value={formData.note}
          onChange={e => setFormData({...formData, note: e.target.value})}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit">Tạo khoản đóng góp</Button>
      </div>
    </form>
  )
} 