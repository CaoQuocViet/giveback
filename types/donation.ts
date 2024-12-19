export interface DonationHistory {
  id: string
  campaignTitle: string
  charityTitle: string
  paymentMethod: string
  transactionId: string | null
  amount: number
  status: "PENDING" | "SUCCESS" | "FAILED"
  note: string | null
  isAnonymous: boolean
  createdAt: string
}

export interface DonationHistoryResponse {
  success: boolean
  data: {
    donations: DonationHistory[]
    pagination: {
      total: number
      currentPage: number
      totalPages: number
      limit: number
    }
  }
}

export interface PaymentMethod {
  id: string
  name: string
}

export interface CreateDonationResponse {
  success: boolean
  data: {
    donation_id: string
    order_url?: string
  }
}

export interface DonationStatus {
  success: boolean
  data: {
    status: "PENDING" | "SUCCESS" | "FAILED"
    amount: string
    created_at?: string
  }
}
