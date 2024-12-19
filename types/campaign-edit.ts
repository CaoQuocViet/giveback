export interface CampaignEditData {
  id: string
  title: string
  status: "STARTING" | "ONGOING" | "CLOSED" | "COMPLETED"
  startDate: string
  endDate: string
  targetAmount: number
  description: string
  detailGoal: string
  images: string[]
  location: {
    address: string
    ward: string
    district: string
    province: string
  }
}

export interface CampaignEditResponse {
  success: boolean
  data: CampaignEditData
  message?: string
}
