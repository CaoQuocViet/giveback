"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { formatAmount } from "@/lib/utils"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

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

    // Sửa lại URL redirect để bỏ /payment
    setTimeout(() => {
      router.push(`/dashboard/campaigns/${campaignId}`)
    }, 2000)
  }, [router, searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Đang xử lý kết quả thanh toán...</h2>
        <p>Bạn sẽ được chuyển về trang chiến dịch sau 2 giây</p>
      </div>
    </div>
  )
} 