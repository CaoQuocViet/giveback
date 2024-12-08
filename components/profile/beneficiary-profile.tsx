"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddressFields } from "./address-fields"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BeneficiaryProfile() {
  const [userData, setUserData] = useState({
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+1230984567",
    role: "BENEFICIARY",
    avatarUrl: "https://example.com/avatar.jpg",
    province: "Da Nang",
    district: "Hai Chau",
    ward: "Thach Thang",
    address: "789 Hopeful Road",
    createdAt: "2023-01-20T08:00:00Z",
    updatedAt: "2023-12-05T12:00:00Z"
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
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
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    // TODO: Xử lý upload ảnh
                  }}
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
              <p className="text-muted-foreground">{userData.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Số điện thoại: {userData.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Họ và tên</label>
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
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vai trò</label>
                  <Input disabled value="Người thụ hưởng" className="bg-muted cursor-not-allowed" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Địa chỉ</h3>
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
          </div>

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
