"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { CampaignEditData } from "@/types/campaign-edit"
import apiClient from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-config"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

// Helper function to format ISO date to YYYY-MM-DD
const formatDateForInput = (isoDate: string) => {
  try {
    return new Date(isoDate).toISOString().split("T")[0]
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}

// Helper function to format YYYY-MM-DD to ISO
const formatDateForApi = (dateString: string) => {
  try {
    return new Date(dateString).toISOString()
  } catch (error) {
    console.error("Error formatting date for API:", error)
    return ""
  }
}

export default function EditCampaignPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [campaign, setCampaign] = useState<CampaignEditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(campaign?.status || "STARTING")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await apiClient.get(
          API_ENDPOINTS.CAMPAIGN_EDIT.GET(params.id)
        )
        setCampaign(response.data)
      } catch (error) {
        console.error("Error fetching campaign:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!campaign) return

    const formData = new FormData()
    formData.append("status", status)
    formData.append("endDate", formatDateForApi(e.currentTarget.endDate.value))
    formData.append("targetAmount", e.currentTarget.targetAmount.value)
    formData.append("description", e.currentTarget.description.value)
    formData.append("detailGoal", e.currentTarget.detailGoal.value)

    if (selectedFile) {
      formData.append("images", selectedFile)
    } else {
      formData.append("images", campaign.images)
    }

    try {
      const response = await apiClient.put(
        API_ENDPOINTS.CAMPAIGN_EDIT.UPDATE(params.id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      router.push("/dashboard/charity/campaigns")
    } catch (error) {
      console.error("Error updating campaign:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  if (loading) return <div>Loading...</div>
  if (!campaign) return <div>Campaign not found</div>

  return (
    <div className="container mx-auto space-y-6 py-6">
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Chỉnh sửa chiến dịch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên chiến dịch - Disabled */}
            <div className="space-y-2">
              <Label htmlFor="title">Tên chiến dịch</Label>
              <Input
                id="title"
                name="title"
                defaultValue={campaign.title}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                Không thể thay đổi tên chiến dịch
              </p>
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                defaultValue={campaign.status}
                onValueChange={setStatus}
                value={status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STARTING">Mới tạo</SelectItem>
                  <SelectItem value="ONGOING">Đang kêu gọi</SelectItem>
                  <SelectItem value="CLOSED">Đã đóng</SelectItem>
                  <SelectItem value="COMPLETED">Đã kết thúc</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Chỉ có thể thay đổi trạng thái theo chiều tăng
              </p>
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  defaultValue={formatDateForInput(campaign.startDate)}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  defaultValue={formatDateForInput(campaign.endDate)}
                />
              </div>
            </div>

            {/* Ngân sách */}
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Ngân sách dự kiến (VNĐ)</Label>
              <Input
                id="targetAmount"
                name="targetAmount"
                type="number"
                defaultValue={campaign.targetAmount}
              />
            </div>

            {/* Mô tả */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chiến dịch</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={campaign.description}
                placeholder="Mô tả tổng quan về mục đích, đối tượng và phạm vi của chiến dịch..."
                className="resize-none"
              />
            </div>

            {/* Kế hoạch chi tiết */}
            <div className="space-y-2">
              <Label htmlFor="detailGoal">Kế hoạch chi tiết</Label>
              <Textarea
                id="detailGoal"
                name="detailGoal"
                rows={8}
                defaultValue={campaign.detailGoal}
                placeholder="Mô tả chi tiết các giai đoạn thực hiện, phân bổ nguồn lực và kết quả dự kiến..."
                className="resize-none"
              />
            </div>

            {/* Upload ảnh */}
            <div className="space-y-2">
              <Label htmlFor="images">Hình ảnh chiến dịch</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={handleFileChange}
              />
              <p className="text-sm text-muted-foreground">
                {campaign.images
                  ? "Ảnh hiện tại: " + campaign.images
                  : "Chưa có ảnh"}
              </p>
              <p className="text-sm text-muted-foreground">
                Chọn ảnh mới để thay thế ảnh cũ
              </p>
            </div>

            {/* Địa điểm - Read only */}
            <div className="space-y-2">
              <Label>Địa điểm triển khai</Label>
              <Card className="bg-muted p-4">
                <div className="space-y-2 text-sm">
                  <p>Địa chỉ: {campaign.location.address}</p>
                  <p>Phường/Xã: {campaign.location.ward}</p>
                  <p>Quận/Huyện: {campaign.location.district}</p>
                  <p>Tỉnh/Thành phố: {campaign.location.province}</p>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
