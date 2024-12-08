"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddressFields } from "./address-fields"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StarIcon } from "lucide-react"

export function CharityProfile() {
  const [userData, setUserData] = useState({
    fullName: "No Hope Foundation",
    email: "contact@hopefoundation.org",
    phone: "+1234567890",
    role: "CHARITY",
    avatarUrl: "https://example.com/charity-avatar.jpg",
    province: "Hanoi",
    district: "Ba Dinh",
    ward: "Cong Vi",
    address: "123 Hope Street",
    license_description: "License to operate as a charity organization",
    license_image_url: "https://example.com/license-image.jpg",
    license_number: "12345-HOPE",
    license_date: "2022-01-15",
    verification_status: "VERIFIED",
    campaign_count: 25,
    total_raised: 1000000000,
    rating: 4.8,
    createdAt: "2021-12-01T10:00:00Z",
    updatedAt: "2023-11-20T14:00:00Z"
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          {/* Header với ảnh đại diện và thông tin cơ bản */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.avatarUrl} alt={userData.fullName} />
                <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <input id="avatar-upload" type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
                <Badge variant={userData.verification_status === "VERIFIED" ? "default" : "secondary"}>
                  {userData.verification_status === "VERIFIED" ? "Đã xác minh" : "Chưa xác minh"}
                </Badge>
              </div>
              <p className="text-muted-foreground">{userData.email}</p>
              <p className="text-sm text-muted-foreground">Số điện thoại: {userData.phone}</p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    className={`w-4 h-4 ${star <= userData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">{userData.rating}/5</span>
              </div>
            </div>
          </div>

          {/* Thông tin chính */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Thông tin cơ bản</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Tên tổ chức</label>
                    <Input defaultValue={userData.fullName} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue={userData.email} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                    <Input disabled value={userData.phone} className="bg-muted cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Thông tin pháp lý</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Số giấy phép</label>
                    <Input disabled value={userData.license_number} className="bg-muted cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ngày cấp</label>
                    <Input disabled value={new Date(userData.license_date).toLocaleDateString('vi-VN')} className="bg-muted cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mô tả giấy phép</label>
                    <Input disabled value={userData.license_description} className="bg-muted cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Địa chỉ</h3>
                <AddressFields 
                  defaultValues={{
                    province: userData.province,
                    district: userData.district,
                    ward: userData.ward,
                    address: userData.address
                  }}
                  onChange={(values) => {
                    setUserData(prev => ({...prev, ...values}))
                  }}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Thống kê hoạt động</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Số chiến dịch đã tạo</span>
                      <span className="font-medium">{userData.campaign_count}</span>
                    </div>
                    <Progress value={Math.min((userData.campaign_count / 50) * 100, 100)} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tổng tiền gây quỹ</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(userData.total_raised)}
                      </span>
                    </div>
                    <Progress value={Math.min((userData.total_raised / 2000000000) * 100, 100)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer với thông tin bổ sung */}
          <div className="mt-8 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>Ngày tạo: {new Date(userData.createdAt).toLocaleDateString('vi-VN')}</div>
            <div>Cập nhật lần cuối: {new Date(userData.updatedAt).toLocaleDateString('vi-VN')}</div>
          </div>

          <Button className="w-full mt-8">Lưu thay đổi</Button>
        </CardContent>
      </Card>
    </div>
  )
}
