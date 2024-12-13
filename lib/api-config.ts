// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify-email',
  
  // Campaigns
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_DETAIL: (id: string) => `/campaigns/${id}`,
  CAMPAIGN_DONATIONS: (id: string) => `/campaigns/${id}/donations`,
  CAMPAIGN_DISTRIBUTIONS: (id: string) => `/campaigns/${id}/distributions`,
  CAMPAIGN_COMMENTS: (id: string) => `/campaigns/${id}/comments`,
  
  // Donations
  DONATIONS: '/donations',
  DONATION_DETAIL: (id: string) => `/donations/${id}`,
  VERIFY_PAYMENT: '/donations/verify-payment',
  
  // Distributions  
  DISTRIBUTIONS: '/distributions',
  DISTRIBUTION_DETAIL: (id: string) => `/distributions/${id}`,
  
  // Administrative Units
  PROVINCES: '/provinces',
  DISTRICTS: '/districts',
  WARDS: '/wards',
}

// API client configuration
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30s
  withCredentials: true
} 