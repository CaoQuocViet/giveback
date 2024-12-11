"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Cookies from 'js-cookie'

import { AdminProfile } from "@/components/profile/admin-profile"
import { BeneficiaryProfile } from "@/components/profile/beneficiary-profile"
import { CharityProfile } from "@/components/profile/charity-profile"
import { DonorProfile } from "@/components/profile/donor-profile"

export default function ProfilePage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string>("")
  
  useEffect(() => {
    // Kiểm tra token
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    // Lấy user info từ localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      setUserRole(user.role)
    } else {
      router.push('/auth/login')
    }
  }, [router])

  const renderProfile = () => {
    switch (userRole) {
      case "ADMIN":
        return <AdminProfile />
      case "CHARITY":
        return <CharityProfile />
      case "DONOR":
        return <DonorProfile />
      case "BENEFICIARY":
        return <BeneficiaryProfile />
      default:
        return null
    }
  }

  // Hiển thị loading khi chưa có role
  if (!userRole) {
    return <div>Loading...</div>
  }

  return <div className="mx-auto max-w-4xl py-8">{renderProfile()}</div>
}
