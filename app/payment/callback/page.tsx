"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { formatAmount } from "@/lib/utils"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State lưu giá trị đếm ngược
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const status = searchParams.get("returncode")
    const transactionId = searchParams.get("zptransid")
    const campaignId = searchParams.get("campaignId")

    if (status === "1") {
      toast.success("Thanh toán thành công!", {
        description: "Cảm ơn bạn đã đóng góp",
        action: {
          label: "Tải hóa đơn",
          onClick: () => window.open(`/api/donations/${transactionId}/invoice`, "_blank"),
        },
      })
    } else {
      toast.error("Thanh toán thất bại!", {
        description: searchParams.get("returnmessage") || "Vui lòng thử lại sau",
      })
    }

    // Đếm ngược từ 3 xuống 0
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(timer)
          router.push(`/dashboard/campaigns/${campaignId}`)
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup function để dừng timer khi component unmount
    return () => clearInterval(timer)
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Đang xử lý kết quả thanh toán...</h2>
        <p>Bạn sẽ được chuyển về trang chiến dịch sau
        </p>
        <p className="text-3xl font-bold">{countdown}s</p>
      </div>
    </div>
  )
}
