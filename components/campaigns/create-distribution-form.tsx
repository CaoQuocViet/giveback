"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AddressFields } from "@/components/profile/address-fields"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface CreateDistributionFormProps {
  campaigns: Array<{id: string, title: string, status: string}>
}

export function CreateDistributionForm({ campaigns }: CreateDistributionFormProps) {
  const [formData, setFormData] = useState({
    campaignId: "",
    title: "",
    representative_name: "",
    description: "",
    amount: "",
    beneficiary_count: "",
    relief_date: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    proof_images: [] as File[]
  })

  // Chỉ hiển thị các chiến dịch đang ONGOING
  const availableCampaigns = campaigns.filter(c => c.status === "ONGOING")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Implement API call
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div className="space-y-2">
          <Label>Chọn chiến dịch</Label>
          <Select
            required
            value={formData.campaignId}
            onValueChange={(value) => setFormData({...formData, campaignId: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn chiến dịch cứu trợ" />
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
          <Label>Tên khoản cứu trợ</Label>
          <Input 
            required
            placeholder="Nhập tên khoản cứu trợ"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label>Người đại diện</Label>
          <Input 
            required
            placeholder="Nhập tên người đại diện"
            value={formData.representative_name}
            onChange={e => setFormData({...formData, representative_name: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả</Label>
          <Textarea 
            placeholder="Mô tả chi tiết về khoản cứu trợ"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ngân sách (VNĐ)</Label>
            <Input 
              required
              type="number"
              placeholder="Nhập số tiền"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Số lượng người nhận</Label>
            <Input 
              required
              type="number"
              placeholder="Nhập số lượng"
              value={formData.beneficiary_count}
              onChange={e => setFormData({...formData, beneficiary_count: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ngày cứu trợ</Label>
          <Input 
            required
            type="date"
            value={formData.relief_date}
            onChange={e => setFormData({...formData, relief_date: e.target.value})}
          />
        </div>

        <AddressFields 
          onChange={values => setFormData({...formData, ...values})}
        />

        <div className="space-y-2">
          <Label>Hình ảnh chứng minh</Label>
          <Input 
            required
            type="file"
            multiple
            accept="image/*"
            onChange={e => {
              const files = Array.from(e.target.files || [])
              setFormData({...formData, proof_images: files})
            }}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-medium file:bg-primary/10 file:text-primary
              hover:file:bg-primary/20"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit">Tạo khoản cứu trợ</Button>
        </div>
      </form>
    </div>
  )
} 