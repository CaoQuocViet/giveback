"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddressFields } from "./address-fields"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { CharityProfileResponse } from "@/types/profile"
import { API_ENDPOINTS } from "@/lib/api-config"
import apiClient from "@/lib/api-client"
import { toast } from "react-hot-toast"

export function CharityProfile() {
  const router = useRouter()
  const [userData, setUserData] = useState<CharityProfileResponse["data"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('auth_token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const userStr = localStorage.getItem('user')
        if (!userStr) {
          router.push('/auth/login')
          return
        }

        const user = JSON.parse(userStr)
        if (user.role !== 'CHARITY') {
          router.push('/dashboard')
          return
        }

        const response = await apiClient.get<CharityProfileResponse>(API_ENDPOINTS.PROFILE.CHARITY)
        if (response.success) {
          setUserData(response.data)
        } else {
          setError("Không thể tải thông tin tổ chức")
        }
      } catch (error: any) {
        console.error("Error fetching charity profile:", error)
        setError(error.response?.data?.message || "Có lỗi xảy ra khi tải thông tin")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('profileImage', file)

      const response = await apiClient.put(API_ENDPOINTS.PROFILE.CHARITY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.success) {
        // Cập nhật localStorage
        const userStr = localStorage.getItem('user')
        if (userStr) {
          const user = JSON.parse(userStr)
          user.profileImage = response.data.profileImage
          localStorage.setItem('user', JSON.stringify(user))
          window.dispatchEvent(new Event('storage'))
        }

        toast.success("Cập nhật ảnh đại diện thành công")
        setUserData(response.data)
      }
    } catch (error) {
      toast.error("Không thể cập nhật ảnh đại diện")
      console.error('Upload error:', error)
    }
  }

  const handleSave = async () => {
    if (!userData) return

    try {
      setIsSaving(true)
      const updateData = {
        userInfo: {
          fullName: userData.fullName,
          province: userData.province,
          district: userData.district,
          ward: userData.ward,
          address: userData.address
        },
        charityInfo: {
          representativeName: userData.charity.representativeName,
          organizationName: userData.charity.organizationName,
          description: userData.charity.description,
          website: userData.charity.website,
          socialLinks: userData.charity.socialLinks,
          bankAccount: userData.charity.bankAccount,
          bankName: userData.charity.bankName,
          bankBranch: userData.charity.bankBranch,
          bankOwner: userData.charity.bankOwner
        }
      }

      const response = await apiClient.put(API_ENDPOINTS.PROFILE.CHARITY, updateData)
      
      if (response.success) {
        toast.success("Cập nhật thông tin thành công")
        setUserData(response.data)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể cập nhật thông tin")
      console.error('Update error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  if (!userData) {
    return <div className="text-center">Không tìm thấy thông tin</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6">
          {/* Header với ảnh đại diện và thông tin cơ bản */}
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
                <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-semibold dark:text-gray-100">{userData.fullName}</h2>
                <Badge variant={userData.charity.verificationStatus === "VERIFIED" ? "default" : "secondary"}
                  className="dark:bg-gray-700 dark:text-gray-300">
                  {userData.charity.verificationStatus === "VERIFIED" ? "Đã xác minh" : "Chưa xác minh"}
                </Badge>
              </div>
              <p className="text-muted-foreground dark:text-gray-400">{userData.email}</p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Số điện thoại: {userData.phone}</p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    className={`w-4 h-4 ${star <= userData.charity.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">{userData.charity.rating}/5</span>
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
                      value={userData.charity.representativeName}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          representativeName: e.target.value
                        }
                      } : null)}
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
                      value={userData.charity.organizationName}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          organizationName: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Mô tả</label>
                    <Textarea 
                      value={userData.charity.description}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          description: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Website</label>
                    <Input 
                      value={userData.charity.website || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          website: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Ngày thành lập</label>
                    <Input 
                      type="date"
                      value={userData.charity.foundingDate}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          foundingDate: e.target.value
                        }
                      } : null)}
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
                  onChange={(values) => setUserData(prev => prev ? {...prev, ...values} : null)}
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
                      value={userData.charity.socialLinks.facebook || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          socialLinks: {
                            ...prev.charity.socialLinks,
                            facebook: e.target.value
                          }
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Twitter</label>
                    <Input 
                      value={userData.charity.socialLinks.twitter || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          socialLinks: {
                            ...prev.charity.socialLinks,
                            twitter: e.target.value
                          }
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Youtube</label>
                    <Input 
                      value={userData.charity.socialLinks.youtube || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          socialLinks: {
                            ...prev.charity.socialLinks,
                            youtube: e.target.value
                          }
                        }
                      } : null)}
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
                      value={userData.charity.bankName}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          bankName: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Chi nhánh</label>
                    <Input 
                      value={userData.charity.bankBranch}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          bankBranch: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Chủ tài khoản</label>
                    <Input 
                      value={userData.charity.bankOwner}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          bankOwner: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Số tài khoản</label>
                    <Input 
                      value={userData.charity.bankAccount}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          bankAccount: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin thanh toán */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-gray-100">Thông tin thanh toán</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Merchant ID</label>
                    <Input 
                      value={userData.charity.merchantId || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          merchantId: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Tên merchant</label>
                    <Input 
                      value={userData.charity.merchantName || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          merchantName: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">Cổng thanh toán</label>
                    <Input 
                      value={userData.charity.paymentGateway || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          paymentGateway: e.target.value
                        }
                      } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dark:text-gray-300">API Key</label>
                    <Input 
                      type="password"
                      value={userData.charity.apiKey || ""}
                      onChange={(e) => setUserData(prev => prev ? {
                        ...prev,
                        charity: {
                          ...prev.charity,
                          apiKey: e.target.value
                        }
                      } : null)}
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
                <div className="text-2xl font-bold dark:text-gray-100">{userData.charity.campaignCount}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg dark:bg-gray-700">
                <div className="text-sm text-muted-foreground mb-1">Tổng tiền gây quỹ</div>
                <div className="text-2xl font-bold dark:text-gray-100">
                  {new Intl.NumberFormat('vi-VN').format(userData.charity.totalRaised)}
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
            <Button 
              className="w-full" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
