"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
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
import PhoneAuth from "@/components/auth/PhoneAuth"
import { AddressFields } from "@/components/profile/address-fields"
import { RegisterFormData, RegisterAddressData, Role } from "@/types/register"

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    role: "DONOR",
    province: "",
    district: "",
    ward: "",
    address: "",
    title: "",
    description: "",
    licenseNumber: "",
    licenseDate: "",
    licenseIssuer: "",
    licenseImageUrl: ""
  })
  const [confirmation, setConfirmation] = useState("")
  const [error, setError] = useState("")
  const [isOTPSent, setIsOTPSent] = useState(false)
  const [isOTPVerified, setIsOTPVerified] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  const handleAddressChange = (values: RegisterAddressData) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }))
  }

  const handleCharityFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // Kiểm tra form hợp lệ trước khi cho phép gửi OTP
  const canSendOTP = () => {
    // Chỉ cần kiểm tra số điện thoại
    return Boolean(formData.phone)
  }

  // Xử lý gửi OTP
  const handleSendOTP = async () => {
    try {
      console.log("Sending OTP request for phone:", formData.phone);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formData.phone })
        }
      )

      const data = await response.json()
      console.log("OTP response:", data);

      if (!response.ok) {
        throw new Error(data.message)
      }

      setIsOTPSent(true)
      setError("")
    } catch (e) {
      console.error("OTP error:", e);
      setError((e as Error).message)
    }
  }

  // Xử lý khi OTP được xác thực thành công
  const handleOTPVerificationSuccess = async (code: string) => {
    try {
      setIsOTPVerified(true)
      setError("")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  // Xử lý submit form đăng ký
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!isOTPVerified) {
      setError("Vui lòng xác thực số điện thoại trước")
      return
    }
    
    try {
      if (formData.role === "CHARITY" && selectedFile) {
        const uploadFormData = new FormData()
        uploadFormData.append("licenseImage", selectedFile)

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/charity/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        )

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.message || "Lỗi khi tải lên gi���y phép")
        }

        const uploadData = await uploadResponse.json()
        setFormData(prev => ({
          ...prev,
          licenseImageUrl: uploadData.licenseImage
        }))
      }

      // Tiếp tục với đăng ký
      const registerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      )

      if (!registerResponse.ok) {
        const data = await registerResponse.json()
        throw new Error(data.message || "Đăng ký thất bại")
      }

      router.push("/auth/login")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div
        className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-${
          formData.role === "CHARITY" ? "3" : "2"
        } gap-8`}
      >
        {/* Cột 1 - Form cơ bản */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold dark:text-white bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Đăng kí tài khoản để bắt đầu
            </h1>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Điền thông tin của bạn để đăng ký
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-300">
                Nhập email của bạn
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>

            {/* Password fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-300">
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="dark:text-gray-300"
                >
                  Xác nhận lại mật khẩu
                </Label>
                <Input
                  type="password"
                  id="confirm-password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* Phone field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-gray-300">
                Số điện thoại
              </Label>
              <div className="flex gap-2">
                <Input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="flex-1"
                  required
                />
                <Button
                  type="button"
                  onClick={handleSendOTP}
                  // disabled={!canSendOTP() || isOTPSent}
                >
                  Gửi mã OTP
                </Button>
              </div>
            </div>

            {/* OTP Verification */}
            {isOTPSent && !isOTPVerified && (
              <PhoneAuth 
                phone={formData.phone}
                onVerificationSuccess={handleOTPVerificationSuccess}
              />
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-red-600 dark:text-red-400">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Login link */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Bạn đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium dark:text-primary-400"
              >
                Đăng nhập ở đây
              </Link>
            </p>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 dark:bg-primary/90 dark:hover:bg-primary/80"
              disabled={!isOTPVerified}
            >
              Tạo tài khoản
            </Button>
          </form>
        </div>

        {/* Cột 2 - Role và thông tin cơ bản */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
          {/* Role selection */}
          <div className="space-y-2">
            <Label className="text-lg font-medium dark:text-white">
              Vai trò của bạn
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value: Role) => 
                setFormData(prev => ({ ...prev, role: value }))}
            >
              <SelectTrigger className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                <SelectValue
                  placeholder="Chọn vai trò"
                  className="dark:text-gray-300"
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem
                  value="DONOR"
                  className="dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  👤 Người đóng góp
                </SelectItem>
                <SelectItem
                  value="CHARITY"
                  className="dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  🏢 Tổ chức từ thiện
                </SelectItem>
                <SelectItem
                  value="BENEFICIARY"
                  className="dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  🤲 Người nhận hỗ trợ
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Full Name field - NEW */}
          <div className="space-y-2">
            <Label className="dark:text-gray-300">
              {formData.role === "CHARITY" 
                ? "Tên người đại diện" 
                : "Họ và tên"}
            </Label>
            <Input
              placeholder={formData.role === "CHARITY" 
                ? "Nhập tên người đại diện" 
                : "Nhập họ và tên của bạn"}
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>

          {/* Address fields */}
          <div className="space-y-2">
            <Label className="text-lg font-medium dark:text-white">
              Địa chỉ
            </Label>
            <AddressFields
              onChange={handleAddressChange}
            />
          </div>
        </div>

        {/* Cột 3 - Thông tin bổ sung cho CHARITY */}
        {formData.role === "CHARITY" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
            <h3 className="text-lg font-medium dark:text-white bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Thông tin tổ chức
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="dark:text-gray-300">Tên tổ chức</Label>
                <Input
                  placeholder="Nhập tên tổ chức"
                  value={formData.title}
                  onChange={(e) => handleCharityFieldChange("title", e.target.value)}
                  className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="dark:text-gray-300">Mô tả</Label>
                <Textarea
                  placeholder="Mô tả về tổ chức của bạn"
                  value={formData.description}
                  onChange={(e) => handleCharityFieldChange("description", e.target.value)}
                  className="min-h-[100px] transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label className="dark:text-gray-300">
                  Số giấy phép hoạt động
                </Label>
                <Input
                  placeholder="Nhập số giấy phép"
                  value={formData.licenseNumber}
                  onChange={(e) => handleCharityFieldChange("licenseNumber", e.target.value)}
                  className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="dark:text-gray-300">
                    Ngày cấp giấy phép
                  </Label>
                  <Input
                    type="date"
                    value={formData.licenseDate}
                    onChange={(e) => handleCharityFieldChange("licenseDate", e.target.value)}
                    className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-300">Cơ quan cấp phép</Label>
                  <Input
                    placeholder="Tên cơ quan cấp"
                    value={formData.licenseIssuer}
                    onChange={(e) => handleCharityFieldChange("licenseIssuer", e.target.value)}
                    className="transition-colors focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="dark:text-gray-300">
                  Giấy phép hoạt động
                </Label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium
                    file:bg-primary/10 file:text-primary hover:file:bg-primary/20 dark:file:bg-gray-700 dark:file:text-gray-300 dark:text-gray-400"
                  />
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
                    Hình ảnh giấy phép hoạt động (JPG, PNG)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}