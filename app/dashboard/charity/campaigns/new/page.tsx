"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AddressFields } from "@/components/profile/address-fields"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import Cookies from "js-cookie"

// Interface cho form data
interface CampaignFormData {
  title: string
  description: string
  detailGoal: string
  targetAmount: string
  startDate: string
  endDate: string
  province: string
  district: string
  ward: string
  address: string
  image?: File
}

export default function NewCampaignPage() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    detailGoal: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
    province: "",
    district: "",
    ward: "",
    address: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Kiểm tra authentication
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }

      if (user?.role !== "CHARITY") {
        router.push("/dashboard")
        return
      }
    }
  }, [loading, isAuthenticated, user, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!formData.title || !formData.targetAmount || !formData.startDate || !formData.endDate) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc")
        return
      }

      // Get token
      const token = Cookies.get("auth_token")
      if (!token) {
        toast.error("Vui lòng đăng nhập lại")
        router.push("/auth/login")
        return
      }

      // Create FormData object
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("detailGoal", formData.detailGoal)
      formDataToSend.append("targetAmount", formData.targetAmount)
      formDataToSend.append("startDate", formData.startDate)
      formDataToSend.append("endDate", formData.endDate)
      formDataToSend.append("province", formData.province)
      formDataToSend.append("district", formData.district)
      formDataToSend.append("ward", formData.ward)
      formDataToSend.append("address", formData.address)

      // Append image if exists
      if (formData.image) {
        formDataToSend.append("image", formData.image)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/charity/campaigns`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Đã có lỗi xảy ra")
      }

      toast.success("Tạo chiến dịch thành công")
      router.push("/dashboard/charity/campaigns")

    } catch (error) {
      console.error("Create campaign error:", error)
      toast.error(error instanceof Error ? error.message : "Đã có lỗi xảy ra")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading while checking auth
  if (loading) {
    return <div>Loading...</div>
  }

  // Rest of your JSX remains the same, just update the button states
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Tạo chiến dịch mới
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên chiến dịch */}
            <div className="space-y-2">
              <Label htmlFor="title">Tên chiến dịch</Label>
              <Input
                id="title"
                placeholder="Nhập tên chiến dịch"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Ngân sách */}
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Ngân sách dự kiến (VNĐ)</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="Nhập số tiền"
                value={formData.targetAmount}
                onChange={e => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
              />
            </div>

            {/* Mô tả */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chiến dịch</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Mô tả tổng quan về mục đích, đối tượng và phạm vi của chiến dịch..."
                className="resize-none"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Kế hoạch chi tiết */}
            <div className="space-y-2">
              <Label htmlFor="detail_goal">Kế hoạch chi tiết</Label>
              <Textarea
                id="detail_goal"
                rows={8}
                placeholder="Mô tả chi tiết các giai đoạn thực hiện, phân bổ nguồn lực và kết quả dự kiến..."
                className="resize-none"
                value={formData.detailGoal}
                onChange={e => setFormData(prev => ({ ...prev, detailGoal: e.target.value }))}
              />
            </div>

            {/* Địa điểm */}
            <div className="space-y-2">
              <Label>Địa điểm triển khai</Label>
              <AddressFields
                defaultValues={formData}
                onChange={(values) => {
                  setFormData(prev => ({
                    ...prev,
                    province: values.province,
                    district: values.district,
                    ward: values.ward,
                    address: values.address
                  }))
                }}
              />
            </div>

            {/* Upload ảnh */}
            <div className="space-y-2">
              <Label htmlFor="image">Hình ảnh chiến dịch</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={handleFileChange}
              />
              <p className="text-sm text-muted-foreground">
                Chỉ được chọn 1 hình ảnh
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang tạo..." : "Tạo mới"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
