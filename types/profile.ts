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
    charity: {
      id: string
      title: string
      description: string
      website: string | null
      socialLinks: {
        facebook: string | null
        twitter: string | null
        youtube: string | null
      }
      representativeName: string
      organizationName: string
      bankAccount: string
      bankName: string
      bankBranch: string
      bankOwner: string
      merchantName: string | null
      paymentGateway: string | null
      merchantId: string | null
      apiKey: string | null
      licenseImageUrl: string | null
      licenseNumber: string
      licenseDate: string
      licenseIssuer: string
      licenseDescription: string
      verificationStatus: "VERIFIED" | "PENDING" | "REJECTED"
      rating: number
      campaignCount: number
      totalRaised: number
      createdAt: string
      updatedAt: string
    }
  }
}
