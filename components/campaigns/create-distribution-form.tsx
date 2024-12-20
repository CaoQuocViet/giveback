"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { CharityCampaign } from "@/types/charity-campaigns"
import { AvailableCampaign } from "@/types/distribution"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddressFields } from "@/components/profile/address-fields"

interface CreateDistributionFormProps {
  campaignList: CharityCampaign[]
  onSuccess?: () => void
}

export function CreateDistributionForm({
  campaignList,
  onSuccess,
}: CreateDistributionFormProps) {
  const [availableCampaigns, setAvailableCampaigns] = useState<
    AvailableCampaign[]
  >([])
  const [loading, setLoading] = useState(false)
  const [representativeName, setRepresentativeName] = useState("")
  const [formData, setFormData] = useState({
    campaignId: "",
    title: "",
    description: "",
    amount: "",
    beneficiary_count: "",
    relief_date: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    proof_images: [] as File[],
  })

  // Fetch available campaigns và thông tin người đại diện
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy token từ cookies
        const token = Cookies.get("auth_token")
        if (!token) {
          toast.error("Vui lòng đăng nhập lại")
          return
        }

        // Fetch campaigns
        const campaignsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/charity/distributions/available-campaigns`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        const campaignsData = await campaignsRes.json()
        console.log("Campaigns data:", campaignsData)

        if (campaignsData.success && Array.isArray(campaignsData.data)) {
          setAvailableCampaigns(campaignsData.data)
        }

        // Lấy thông tin user từ localStorage
        const userStr = localStorage.getItem("user")
        if (userStr) {
          const userData = JSON.parse(userStr)
          console.log("User data:", userData)
          setRepresentativeName(userData.fullName || "")
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("Không thể tải dữ liệu")
      }
    }

    fetchData()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // Lấy token từ cookies
      const token = Cookies.get("auth_token")
      if (!token) {
        toast.error("Vui lòng đăng nhập lại")
        return
      }

      // Validate số tiền không vượt quá số dư
      const selectedCampaign = availableCampaigns.find(
        (c) => c.id === formData.campaignId
      )
      if (
        selectedCampaign &&
        Number(formData.amount) > selectedCampaign.remainingAmount
      ) {
        toast.error("Số tiền vượt quá số dư của chiến dịch")
        return
      }

      // Create FormData object
      const formDataToSend = new FormData()
      formDataToSend.append("campaignId", formData.campaignId)
      formDataToSend.append("title", formData.title)
      formDataToSend.append("budget", formData.amount)
      formDataToSend.append("distributionDate", new Date().toISOString())
      formDataToSend.append("beneficiaryCount", formData.beneficiary_count)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("province", formData.province)
      formDataToSend.append("district", formData.district)
      formDataToSend.append("ward", formData.ward || "")
      formDataToSend.append("address", formData.address)
      formDataToSend.append("reliefDate", formData.relief_date)

      // Append the first image only as required by API
      if (formData.proof_images[0]) {
        formDataToSend.append("proofImage", formData.proof_images[0])
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/charity/distributions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create distribution")
      }

      const result = await response.json()

      toast.success("Tạo khoản cứu trợ thành công")
      onSuccess?.()

      // Reset form
      setFormData({
        campaignId: "",
        title: "",
        description: "",
        amount: "",
        beneficiary_count: "",
        relief_date: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        proof_images: [],
      })
    } catch (error) {
      console.error("Error creating distribution:", error)
      toast.error(error instanceof Error ? error.message : "Đã có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Chiến dịch</Label>
          <Select
            required
            value={formData.campaignId}
            onValueChange={(value) =>
              setFormData({ ...formData, campaignId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn chiến dịch" />
            </SelectTrigger>
            <SelectContent>
              {availableCampaigns.length > 0 ? (
                availableCampaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.title} - Còn{" "}
                    {new Intl.NumberFormat("vi-VN").format(
                      campaign.remainingAmount
                    )}{" "}
                    VNĐ
                  </SelectItem>
                ))
              ) : (
                <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Không có chiến dịch nào khả dụng
                </div>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Người đại diện</Label>
          <Input value={representativeName} disabled className="bg-muted" />
        </div>

        <div className="space-y-2">
          <Label>Tên khoản cứu trợ</Label>
          <Input
            required
            placeholder="Nhập tên khoản cứu trợ"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả</Label>
          <Textarea
            placeholder="Mô tả chi tiết về khoản cứu trợ"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Số lượng người nhận</Label>
            <Input
              required
              type="number"
              placeholder="Nhập số lượng"
              value={formData.beneficiary_count}
              onChange={(e) =>
                setFormData({ ...formData, beneficiary_count: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ngày cứu trợ</Label>
          <Input
            required
            type="date"
            value={formData.relief_date}
            onChange={(e) =>
              setFormData({ ...formData, relief_date: e.target.value })
            }
          />
        </div>

        <AddressFields
          onChange={(values) => setFormData({ ...formData, ...values })}
        />

        <div className="space-y-2">
          <Label>Hình ảnh chứng minh</Label>
          <Input
            required
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              setFormData({ ...formData, proof_images: files })
            }}
            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4
              file:py-2 file:text-sm file:font-medium file:text-primary
              hover:file:bg-primary/20"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Tạo khoản cứu trợ"}
          </Button>
        </div>
      </form>
    </div>
  )
}
