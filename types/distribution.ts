export interface AvailableCampaign {
  id: string
  title: string
  currentAmount: number
  totalDistributed: number
  remainingAmount: number
}

export interface CreateDistributionFormData {
  campaignId: string
  title: string
  budget: string // Sẽ được convert sang number khi gửi API
  distributionDate: string
  province: string
  district: string
  ward: string
  address: string
  beneficiaryCount: string // Sẽ được convert sang number khi gửi API
  description: string
  proofImage: File | null
  reliefDate: string
}

export interface CreateDistributionResponse {
  success: boolean
  message: string
  data?: {
    id: string
    representativeFullName: string
    [key: string]: any
  }
} 