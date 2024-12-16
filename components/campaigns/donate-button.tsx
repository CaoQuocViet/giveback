"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { useSession } from "next-auth/react"

import { formatAmount } from "@/lib/utils"
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

interface DonateButtonProps {
  campaignId: string
  campaignTitle: string
  minAmount?: number
}

// Mock data - sẽ được thay thế bằng dữ liệu từ API
const mockPaymentMethods = [
  { id: "1", name: "Ví điện tử MoMo" },
  { id: "2", name: "Ví điện tử Zalopay" },
  { id: "3", name: "Ví điện tử VNPay" },
]

export function DonateButton({
  campaignId,
  campaignTitle,
  minAmount = 10000,
}: DonateButtonProps) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement donation logic
    console.log({
      campaignId,
      amount: parseInt(amount),
      message,
      paymentMethod,
      isAnonymous,
    })
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
                {mockPaymentMethods.map((method) => (
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

          <Button type="submit" className="w-full">
            Tiếp tục
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
