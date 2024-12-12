// Thêm các types mới
export interface CampaignDetail {
  id: string;
  title: string;
  charity: {
    name: string;
    representative: string;
  };
  status: string;
  images: string;
  timeline: {
    start_date: string;
    end_date: string;
  };
  location: {
    address: string;
    ward: string;
    district: string;
    province: string;
  };
  budget: {
    target: number;
    current: number;
    distributed: number;
  };
  rating: number;
  description: string;
  detail_goal: string;
  share_url: string;
  distributions: {
    title: string;
    description: string;
    relief_date: string;
    budget: number;
    beneficiary_count: number;
    location: {
      address: string;
      ward: string;
      district: string;
      province: string;
    };
  }[];
  comments: {
    user: {
      name: string;
      role: string;
      avatar: string;
    };
    content: string;
    rating: number;
    created_at: string;
  }[];
} 