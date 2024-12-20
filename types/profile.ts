export interface DonorProfileResponse {
  success: boolean
  data: {
    id: string
    fullName: string
    email: string
    phone: string
    role: string
    profileImage: string | null
    province: string
    district: string
    ward: string
    address: string
    createdAt: string
    updatedAt: string
    donationStats: {
      campaignCount: number
      totalDonated: number
    }
  }
}

export interface AdminProfileResponse {
  success: boolean
  data: {
    id: string
    fullName: string
    email: string
    phone: string
    role: string
    profileImage: string | null
    province: string
    district: string
    ward: string
    address: string
    createdAt: string
    updatedAt: string
    admin: {
      id: string
      isSystemAdmin: boolean
    }
  }
}

export interface BeneficiaryProfileResponse {
  success: boolean
  data: {
    id: string
    fullName: string
    email: string
    phone: string
    role: string
    profileImage: string | null
    province: string
    district: string
    ward: string
    address: string
    createdAt: string
    updatedAt: string
  }
}

export interface CharityProfileResponse {
  success: boolean
  data: {
    id: string
    fullName: string
    email: string
    phone: string
    role: string
    profileImage: string | null
    province: string
    district: string
    ward: string
    address: string
    createdAt: string
    updatedAt: string
    phoneVerifiedAt?: string
    charity: {
      id: string
      title: string
      description: string
      website: string | null
      socialLinks: {
        facebook?: string | null
        twitter?: string | null
        youtube?: string | null
      }
      foundingDate: string
      licenseImageUrl: string | null
      licenseNumber: string
      licenseDate: string
      licenseIssuer: string
      licenseDescription: string
      verificationStatus: "VERIFIED" | "PENDING" | "REJECTED"
      rating: string | number
      campaignCount: number
      totalRaised: string | number
      bankAccount: string | null
      bankName: string | null
      bankBranch: string | null
      bankOwner: string | null
      merchantName: string | null
      paymentGateway: string | null
      merchantId: string | null
      apiKey: string | null
      created_at: string
      updated_at: string
    }
  }
}
