export interface Campaign {
  id: string
  title: string
  description: string
  campaign_image: string | null
  target_amount: number
  current_amount: number
  start_date: string | null
  end_date: string | null
  status: "STARTING" | "ONGOING" | "CLOSED" | "COMPLETED"
  rating: number
  created_at: string | null
  charity: {
    name: string
    logo: string | null
  } | null
}

export interface CampaignsResponse {
  success: boolean
  message?: string
  data: {
    campaigns: Campaign[]
    pagination: {
      total: number
      page: number
      total_pages: number
    }
  }
}

export function getStatusLabel(status: string) {
  switch (status) {
    case "STARTING":
      return "Khởi động"
    case "ONGOING":
      return "Đang kêu gọi"
    case "CLOSED":
      return "Đã đóng"
    case "COMPLETED":
      return "Đã kết thúc"
    default:
      return status
  }
}

export function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "STARTING":
      return "secondary"
    case "ONGOING":
      return "default"
    case "CLOSED":
      return "destructive"
    case "COMPLETED":
      return "outline"
    default:
      return "default"
  }
} 