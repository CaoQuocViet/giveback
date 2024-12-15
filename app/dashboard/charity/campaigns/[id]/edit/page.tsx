"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { CampaignEditData } from "@/types/campaign-edit"
import apiClient from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-config"

// Helper function to format ISO date to YYYY-MM-DD
const formatDateForInput = (isoDate: string) => {
  try {
    return new Date(isoDate).toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

// Helper function to format YYYY-MM-DD to ISO
const formatDateForApi = (dateString: string) => {
  try {
    return new Date(dateString).toISOString();
  } catch (error) {
    console.error('Error formatting date for API:', error);
    return '';
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

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.CAMPAIGN_EDIT.GET(params.id))
        setCampaign(response.data)
      } catch (error) {
        console.error('Error fetching campaign:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!campaign) return

    const formData = new FormData(e.currentTarget)
    const updatedData = {
      status: formData.get('status'),
      endDate: formatDateForApi(formData.get('endDate') as string),
      targetAmount: Number(formData.get('targetAmount')),
      description: formData.get('description'),
      detailGoal: formData.get('detail_goal'),
      images: formData.getAll('image')
    }

    try {
      await apiClient.put(API_ENDPOINTS.CAMPAIGN_EDIT.UPDATE(params.id), updatedData)
      router.push('/dashboard/charity/campaigns')
    } catch (error) {
      console.error('Error updating campaign:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!campaign) return <div>Campaign not found</div>

  return (
    <div className="container mx-auto py-6 space-y-6">
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
              <Select defaultValue={campaign.status}>
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
                type="number"
                defaultValue={campaign.targetAmount}
              />
            </div>

            {/* Mô tả */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chiến dịch</Label>
              <Textarea
                id="description"
                rows={5}
                defaultValue={campaign.description}
                placeholder="Mô tả tổng quan về mục đích, đối tượng và phạm vi của chiến dịch..."
                className="resize-none"
              />
            </div>

            {/* Kế hoạch chi tiết */}
            <div className="space-y-2">
              <Label htmlFor="detail_goal">Kế hoạch chi tiết</Label>
              <Textarea
                id="detail_goal"
                rows={8}
                defaultValue={campaign.detailGoal}
                placeholder="Mô tả chi tiết các giai đoạn thực hiện, phân bổ nguồn lực và kết quả dự kiến..."
                className="resize-none"
              />
            </div>

            {/* Upload ảnh */}
            <div className="space-y-2">
              <Label htmlFor="image">Hình ảnh chiến dịch</Label>
              <Input
                id="image"
                type="file"
                multiple
                accept="image/*"
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                Chọn ảnh mới để thay thế ảnh cũ
              </p>
            </div>

            {/* Địa điểm - Read only */}
            <div className="space-y-2">
              <Label>Địa điểm triển khai</Label>
              <Card className="p-4 bg-muted">
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
