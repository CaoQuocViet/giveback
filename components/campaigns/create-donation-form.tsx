"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
      alert("Số tiền không hợp lệ")
      return
    }

    // TODO: Call API với system donor
    const donationData = {
      campaign_id: formData.campaignId,
      donor_id: "system_donor", // System donor ID
      amount: amount,
      note: formData.note || null,
      is_anonymous: false, // Luôn false vì dùng tên mặc định
      status: "SUCCESS" // Vì là đóng góp trực tiếp nên set luôn SUCCESS
    }

    // TODO: Implement API call
    console.log("Submitting donation:", donationData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Chọn chiến dịch</Label>
        <Select
          required
          value={formData.campaignId}
          onValueChange={(value) => setFormData({...formData, campaignId: value})}
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