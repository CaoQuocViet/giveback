"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import PhoneAuth from "@/components/auth/PhoneAuth"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AddressFields } from "@/components/profile/address-fields"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [error, setError] = useState("")
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState("DONOR")

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")

    if (password !== confirmation) {
      setError("Mật khẩu không khớp")
      return
    }

    if (!phoneVerified) {
      setError("Vui lòng xác thực số điện thoại")
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
          role: selectedRole,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Đăng ký thất bại")
      }

      router.push("/auth/login")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-${selectedRole === "CHARITY" ? "3" : "2"} gap-8`}>
        {/* Cột 1 - Form cơ bản */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Đăng kí tài khoản để bắt đầu
            </h1>
            <p className="text-sm text-muted-foreground">
              Điền thông tin của bạn để đăng ký
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Nhập email của bạn</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-colors focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            {/* Password fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-colors focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận lại mật khẩu</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  className="transition-colors focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            {/* Phone verification */}
            <PhoneAuth onVerificationSuccess={() => setPhoneVerified(true)} />

            {/* Error message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-600">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Login link */}
            <p className="text-sm text-gray-500">
              Bạn đã có tài khoản?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Đăng nhập ở đây
              </Link>
            </p>

            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
              Tạo tài khoản
            </Button>
          </form>
        </div>

        {/* Cột 2 - Role và địa chỉ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          {/* Role selection */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">Vai trò của bạn</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="transition-colors focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DONOR">👤 Người đóng góp</SelectItem>
                <SelectItem value="CHARITY">🏢 Tổ chức từ thiện</SelectItem>
                <SelectItem value="BENEFICIARY">🤲 Người thụ hưởng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Thông tin địa chỉ */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">Địa chỉ</Label>
            <AddressFields 
              onChange={(values) => {
                console.log(values)
              }}
            />
          </div>
        </div>

        {/* Cột 3 - Thông tin bổ sung cho CHARITY */}
        {selectedRole === "CHARITY" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Thông tin tổ chức
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên tổ chức</Label>
                <Input 
                  placeholder="Nhập tên tổ chức" 
                  className="transition-colors focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Mô tả</Label>
                <Textarea 
                  placeholder="Mô tả về tổ chức của bạn"
                  className="min-h-[100px] transition-colors focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div className="space-y-2">
                <Label>Số giấy phép hoạt động</Label>
                <Input 
                  placeholder="Nhập số giấy phép"
                  className="transition-colors focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ngày cấp giấy phép</Label>
                  <Input 
                    type="date"
                    className="transition-colors focus:ring-2 focus:ring-primary/20" 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cơ quan cấp phép</Label>
                  <Input 
                    placeholder="Tên cơ quan cấp"
                    className="transition-colors focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Giấy phép hoạt động</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <Input 
                    type="file" 
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium
                    file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
                  />
                  <p className="text-sm text-muted-foreground mt-2">
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
