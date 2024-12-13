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

// Mock data - sẽ được thay thế bằng API call
const mockCampaign = {
  id: "1",
  title: "Hỗ trợ đồng bào miền Trung",
  status: "ONGOING",
  startDate: "2024-03-01",
  endDate: "2024-04-01",
  targetAmount: 100000000,
  description: "Chiến dịch hỗ trợ đồng bào miền Trung bị ảnh hưởng bởi thiên tai, lũ lụt. Tập trung vào các địa phương chịu thiệt hại nặng nề nhất, ưu tiên hỗ trợ các hộ gia đình có hoàn cảnh khó khăn, người già, trẻ em...",
  detail_goal: "1. Giai đoạn 1 (01/03 - 15/03):\n- Khảo sát thiệt hại tại các địa phương\n- Lập danh sách các hộ cần hỗ trợ\n\n2. Giai đoạn 2 (16/03 - 31/03):\n- Phân bổ nguồn lực\n- Tổ chức các đợt cứu trợ\n\n3. Giai đoạn 3 (01/04):\n- Tổng kết, báo cáo kết quả",
  images: ["image1.jpg", "image2.jpg"],
  location: {
    address: "123 Đường ABC",
    ward: "Phường XYZ",
    district: "Quận 1",
    province: "TP.HCM"
  }
}

export default function EditCampaignPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Chỉnh sửa chiến dịch
          </h2>

          <form className="space-y-6">
            {/* Tên chiến dịch - Disabled */}
            <div className="space-y-2">
              <Label htmlFor="title">Tên chiến dịch</Label>
              <Input
                id="title"
                defaultValue={mockCampaign.title}
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
              <Select defaultValue={mockCampaign.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
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
                  type="date"
                  defaultValue={mockCampaign.startDate}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={mockCampaign.endDate}
                />
              </div>
            </div>

            {/* Ngân sách */}
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Ngân sách dự kiến (VNĐ)</Label>
              <Input
                id="targetAmount"
                type="number"
                defaultValue={mockCampaign.targetAmount}
              />
            </div>

            {/* Mô tả */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chiến dịch</Label>
              <Textarea
                id="description"
                rows={5}
                defaultValue={mockCampaign.description}
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
                defaultValue={mockCampaign.detail_goal}
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
                  <p>Địa chỉ: {mockCampaign.location.address}</p>
                  <p>Phường/Xã: {mockCampaign.location.ward}</p>
                  <p>Quận/Huyện: {mockCampaign.location.district}</p>
                  <p>Tỉnh/Thành phố: {mockCampaign.location.province}</p>
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
