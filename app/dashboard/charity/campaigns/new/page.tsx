"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { AddressFields } from "@/components/profile/address-fields"
import { useState } from "react"

export default function NewCampaignPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [addressData, setAddressData] = useState({
    province: "",
    district: "",
    ward: "",
    address: ""
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Tạo chiến dịch mới
          </h2>

          <form className="space-y-6">
            {/* Tên chiến dịch */}
            <div className="space-y-2">
              <Label htmlFor="title">Tên chiến dịch</Label>
              <Input
                id="title"
                placeholder="Nhập tên chiến dịch"
              />
            </div>

            {/* Thời gian */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <Input
                  id="startDate"
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  type="date"
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
              />
            </div>

            {/* Địa điểm */}
            <div className="space-y-2">
              <Label>Địa điểm triển khai</Label>
              <AddressFields
                defaultValues={addressData}
                onChange={(values) => {
                  setAddressData(values)
                }}
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
                Có thể chọn nhiều ảnh
              </p>
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
              <Button type="submit">Tạo mới</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
