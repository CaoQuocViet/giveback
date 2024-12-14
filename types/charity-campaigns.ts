export interface CharityCampaign {
  id: string;
  title: string;
  status: 'STARTING' | 'ONGOING' | 'CLOSED' | 'COMPLETED';
  startDate: string;
  endDate: string;
  updatedAt: string;
}

export interface CharityCampaignResponse {
  success: boolean;
  data: CharityCampaign[];
  message?: string;
} 