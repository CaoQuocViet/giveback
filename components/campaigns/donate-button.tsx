"use client"

import { useState } from "react"
import { DollarSign, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Cookies from "js-cookie"

import { formatAmount } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PaymentMethod } from "@/types/donation"

// Thay thế mock data bằng API call thực tế
const paymentMethods: PaymentMethod[] = [
  { id: "payment_method_1", name: "Ví điện tử ZaloPay" },
]

interface DonateButtonProps {
  campaignId: string
  campaignTitle: string
  minAmount?: number
}

export function DonateButton({
  campaignId,
  campaignTitle,
  minAmount = 10000,
}: DonateButtonProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Lấy token từ cookie
      const token = Cookies.get("auth_token")
      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện đóng góp")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaignId,
          amount: parseInt(amount.replace(/\D/g, "")),
          message,
          paymentMethodId: paymentMethod,
          isAnonymous,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      // Redirect đến trang thanh toán ZaloPay
      if (data.data.order_url) {
        window.location.href = data.data.order_url
      }

    } catch (error: any) {
      toast.error("Đã có lỗi xảy ra", {
        description: error.message,
      })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <DollarSign className="mr-2 size-4" />
          Đóng góp
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đóng góp cho chiến dịch</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Chiến dịch: {campaignTitle}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Số tiền quyên góp</label>
            <Input
              type="number"
              min={minAmount}
              step={1000}
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số tiền..."
            />
            <p className="text-xs text-muted-foreground">
              Tối thiểu {formatAmount(minAmount)}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Lời nhắn</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập lời nhắn của bạn..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Phương thức thanh toán
            </label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phương thức thanh toán" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous" className="text-sm">
              Quyên góp ẩn danh
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang xử lý..." : "Tiếp tục"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
