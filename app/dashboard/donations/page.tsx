"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { DonationHistory } from "@/components/donations/donation-history"

export default function DonationsPage() {
  const router = useRouter()

  useEffect(() => {
    // Kiểm tra token và role
    const token = Cookies.get("auth_token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) {
      router.push("/auth/login")
      return
    }

    const user = JSON.parse(userStr)
    if (user.role !== "DONOR") {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="container py-8">
      <DonationHistory />
    </div>
  )
}
