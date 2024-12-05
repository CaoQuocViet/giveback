"use client"

import { useSession } from "next-auth/react"
import { AdminProfile } from "@/components/profile/admin-profile"
import { CharityProfile } from "@/components/profile/charity-profile"
import { DonorProfile } from "@/components/profile/donor-profile"
import { BeneficiaryProfile } from "@/components/profile/beneficiary-profile"

export default function ProfilePage() {
  const { data: session } = useSession()
  const role = session?.user?.role || 'DONOR'

  const renderProfile = () => {
    switch (role) {
      case 'ADMIN':
        return <AdminProfile />
      case 'CHARITY':
        return <CharityProfile />
      case 'DONOR':
        return <DonorProfile />
      case 'BENEFICIARY':
        return <BeneficiaryProfile />
      default:
        return <DonorProfile />
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {renderProfile()}
    </div>
  )
} 