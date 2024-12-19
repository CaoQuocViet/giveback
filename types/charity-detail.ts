export interface CharityDetail {
  id: string
  title: string
  description: string
  email: string
  phone: string
  address: string
  ward: string
  district: string
  province: string
  foundingDate: string
  licenseNumber: string
  licenseDate: string
  licenseIssuer: string
  licenseDescription: string
  licenseImageUrl: string
  avatar: string
  website: string | null
  socialLinks: {
    facebook: string | null
    twitter: string | null
    youtube: string | null
  }
  verificationStatus: "VERIFIED" | "PENDING" | "REJECTED"
  rating: number
  statistics: {
    totalCampaigns: number
    totalRaised: number
  }
  campaigns: Array<{
    id: string
    title: string
    currentAmount: number
    targetAmount: number
    status: string
    startDate: string
    endDate: string
  }>
}

export interface CharityDetailResponse {
  success: boolean
  data: CharityDetail
  message?: string
}
