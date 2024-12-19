export interface CharityDetail {
  id: string
  title: string
  description: string
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED"
  foundingDate: string
  website: string
  socialLinks: {
    facebook?: string
    twitter?: string
    youtube?: string
  }
  rating: number

  // License info
  licenseNumber: string
  licenseDate: string
  licenseIssuer: string
  licenseDescription: string
  licenseImageUrl: string | null

  // User info
  user: {
    fullName: string
    email: string
    phone: string
    profileImage: string | null
    province: string
    district: string
    ward: string
    address: string
  }

  // Campaign list
  campaigns: {
    id: string
    title: string
    status: "STARTING" | "ONGOING" | "CLOSED" | "COMPLETED"
    targetAmount: number
    currentAmount: number
    startDate: string
    endDate: string
    progress?: number // Calculated on frontend: (currentAmount / targetAmount) * 100
  }[]

  // Statistics
  statistics: {
    totalCampaigns: number
    totalRaised: number
    activeCampaigns: number
    completedCampaigns: number
  }
}

export interface CharityDetailResponse {
  success: boolean
  data: CharityDetail
  message?: string
}
