"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { AdminProfileResponse } from "@/types/profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddressFields } from "@/components/profile/address-fields"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function AdminProfile() {
  const [userData, setUserData] = useState<AdminProfileResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address: ""
  })

  const fetchProfile = async () => {
    try {
      const token = Cookies.get('auth_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      setUserData(result.data)
      setFormData({
        fullName: result.data.fullName,
        email: result.data.email,
        province: result.data.province || "",
        district: result.data.district || "",
        ward: result.data.ward || "",
        address: result.data.address || ""
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('profileImage', file)

      const token = Cookies.get('auth_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/admin`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message)
      }

      // Cập nhật localStorage
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        user.profileImage = result.data.profileImage
        localStorage.setItem('user', JSON.stringify(user))
        window.dispatchEvent(new Event('storage'))
      }

      toast.success("Cập nhật ảnh đại diện thành công")
      setUserData(result.data)
    } catch (error) {
      toast.error("Không thể cập nhật ảnh đại diện")
      console.error('Upload error:', error)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const token = Cookies.get('auth_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/admin`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message)
      }

      toast.success("Cập nhật thông tin thành công")
      setUserData(result.data)
    } catch (error) {
      toast.error("Không thể cập nhật thông tin")
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (isLoading) return <div>Đang tải...</div>
  if (error) return <div>Lỗi: {error}</div>
  if (!userData) return <div>Không có dữ liệu</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.profileImage || ""} alt={userData.fullName} />
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
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
                <Badge variant={userData.admin.isSystemAdmin ? "default" : "secondary"}>
                  {userData.admin.isSystemAdmin ? "Quản trị hệ thống" : "Quản trị viên"}
                </Badge>
              </div>
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
                  <Input 
                    value={formData.fullName} 
                    onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                  <Input disabled value={userData.phone} className="bg-muted cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vai trò</label>
                  <Input disabled value="Quản trị viên" className="bg-muted cursor-not-allowed" />
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
                  setFormData(prev => ({...prev, ...values}))
                }}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>Ngày tạo: {new Date(userData.createdAt).toLocaleDateString('vi-VN')}</div>
            <div>Cập nhật lần cuối: {new Date(userData.updatedAt).toLocaleDateString('vi-VN')}</div>
          </div>

          <Button 
            className="w-full mt-8" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
