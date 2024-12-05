"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminProfile() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin admin</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button>Thay đổi ảnh</Button>
            </div>
            
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Họ và tên</label>
                <Input defaultValue="Admin Name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="admin@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Số điện thoại</label>
                <Input defaultValue="0123456789" disabled />
              </div>
              <div>
                <label className="text-sm font-medium">Mật khẩu mới</label>
                <Input type="password" />
              </div>
            </div>

            <Button className="w-full">Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 