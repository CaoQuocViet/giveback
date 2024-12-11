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
import { Textarea } from "@/components/ui/textarea"

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
    updatedAt: "2023-11-20T14:00:00Z",
    representative_name: "Nguyễn Văn A",
    organization_name: "Quỹ Hy Vọng",
    description: "Tổ chức từ thiện hoạt động trong lĩnh vực...",
    website: "https://hopefoundation.org",
    founding_date: "2020-01-01",
    social_links: {
      facebook: "https://facebook.com/hopefoundation",
      twitter: "https://twitter.com/hopefoundation",
      youtube: "https://youtube.com/hopefoundation"
    },
    bank_name: "Vietcombank",
    bank_branch: "Hà Nội",
    bank_owner: "QUỸ HY VỌNG",
    bank_account: "1234567890",
    merchant_id: "MERCHANT123",
    merchant_name: "Quỹ Hy Vọng",
    payment_gateway: "VNPay",
    api_key: "xxxxx-xxxxx-xxxxx"
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
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
                <h2 className="text-2xl font-semibold dark:text-gray-100">{userData.fullName}</h2>
                <Badge variant={userData.verification_status === "VERIFIED" ? "default" : "secondary"}
                  className="dark:bg-gray-700 dark:text-gray-300">
                  {userData.verification_status === "VERIFIED" ? "Đã xác minh" : "Chưa xác minh"}
                </Badge>
              </div>
              <p className="text-muted-foreground dark:text-gray-400">{userData.email}</p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Số điện thoại: {userData.phone}</p>
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

          {/* Chia layout thành 2 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái */}
            <div className="space-y-6">
              {/* Thông tin người đại diện */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Thông tin người đại diện</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Họ và tên</label>
                    <Input 
                      value={userData.representative_name}
                      onChange={(e) => setUserData(prev => ({...prev, representative_name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Email</label>
                    <Input value={userData.email} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                    <Input disabled value={userData.phone} />
                  </div>
                </div>
              </div>

              {/* Thông tin tổ chức */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Thông tin tổ chức</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Tên tổ chức</label>
                    <Input 
                      value={userData.organization_name}
                      onChange={(e) => setUserData(prev => ({...prev, organization_name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Mô tả</label>
                    <Textarea 
                      value={userData.description}
                      onChange={(e) => setUserData(prev => ({...prev, description: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Website</label>
                    <Input 
                      value={userData.website}
                      onChange={(e) => setUserData(prev => ({...prev, website: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Ngày thành lập</label>
                    <Input 
                      type="date"
                      value={userData.founding_date}
                      onChange={(e) => setUserData(prev => ({...prev, founding_date: e.target.value}))}
                    />
                  </div>
                </div>
              </div>

              {/* Địa chỉ */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Địa chỉ</h3>
                <AddressFields 
                  defaultValues={{
                    province: userData.province,
                    district: userData.district,
                    ward: userData.ward,
                    address: userData.address
                  }}
                  onChange={(values) => setUserData(prev => ({...prev, ...values}))}
                />
              </div>
            </div>

            {/* Cột phải */}
            <div className="space-y-6">
              {/* Thông tin mạng xã hội */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Mạng xã hội</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Facebook</label>
                    <Input 
                      value={userData.social_links.facebook}
                      onChange={(e) => setUserData(prev => ({
                        ...prev, 
                        social_links: {...prev.social_links, facebook: e.target.value}
                      }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Twitter</label>
                    <Input 
                      value={userData.social_links.twitter}
                      onChange={(e) => setUserData(prev => ({
                        ...prev, 
                        social_links: {...prev.social_links, twitter: e.target.value}
                      }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Youtube</label>
                    <Input 
                      value={userData.social_links.youtube}
                      onChange={(e) => setUserData(prev => ({
                        ...prev, 
                        social_links: {...prev.social_links, youtube: e.target.value}
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin ngân hàng */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Thông tin ngân hàng</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Tên ngân hàng</label>
                    <Input 
                      value={userData.bank_name}
                      onChange={(e) => setUserData(prev => ({...prev, bank_name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Chi nhánh</label>
                    <Input 
                      value={userData.bank_branch}
                      onChange={(e) => setUserData(prev => ({...prev, bank_branch: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Chủ tài khoản</label>
                    <Input 
                      value={userData.bank_owner}
                      onChange={(e) => setUserData(prev => ({...prev, bank_owner: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Số tài khoản</label>
                    <Input 
                      value={userData.bank_account}
                      onChange={(e) => setUserData(prev => ({...prev, bank_account: e.target.value}))}
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin merchant */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Thông tin merchant</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Merchant ID</label>
                    <Input 
                      value={userData.merchant_id}
                      onChange={(e) => setUserData(prev => ({...prev, merchant_id: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Tên merchant</label>
                    <Input 
                      value={userData.merchant_name}
                      onChange={(e) => setUserData(prev => ({...prev, merchant_name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Cổng thanh toán</label>
                    <Input 
                      value={userData.payment_gateway}
                      onChange={(e) => setUserData(prev => ({...prev, payment_gateway: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">API Key</label>
                    <Input 
                      type="password"
                      value={userData.api_key}
                      onChange={(e) => setUserData(prev => ({...prev, api_key: e.target.value}))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thống kê hoạt động */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Thống kê hoạt động</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg dark:bg-gray-700">
                <div className="text-sm text-muted-foreground mb-1">Số chiến dịch đã tạo</div>
                <div className="text-2xl font-bold dark:text-gray-100">{userData.campaign_count}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg dark:bg-gray-700">
                <div className="text-sm text-muted-foreground mb-1">Tổng tiền gây quỹ</div>
                <div className="text-2xl font-bold dark:text-gray-100">
                  {new Intl.NumberFormat('vi-VN').format(userData.total_raised)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground dark:text-gray-400 mb-8">
              <div>Ngày tạo: {new Date(userData.createdAt).toLocaleDateString('vi-VN')}</div>
              <div>Cập nhật lần cuối: {new Date(userData.updatedAt).toLocaleDateString('vi-VN')}</div>
            </div>
            <Button className="w-full">Lưu thay đổi</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
