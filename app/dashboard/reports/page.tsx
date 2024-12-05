"use client"

import { useSession } from "next-auth/react"
import { CampaignList } from "@/components/reports/campaign-list"

// Mock data
const mockCampaigns = {
  campaigns: [
    {
      id: '1',
      name: 'Hỗ trợ đồng bào miền Trung',
      image: '/images/campaign-1.jpg',
      description: 'Chiến dịch hỗ trợ người dân miền Trung khắc phục hậu quả thiên tai.',
      charity: {
        id: '1',
        name: 'Hội Chữ thập đỏ Việt Nam'
      },
      target: 1000000000,
      raised: 750000000,
      startDate: '2024-03-01T00:00:00Z',
      endDate: '2024-04-01T00:00:00Z',
      status: 'DANGKEUGOI',
      comments: [
        {
          id: '1',
          content: 'Rất ý nghĩa, tôi sẽ ủng hộ!',
          user: {
            name: 'Nguyễn Văn A',
            role: 'Người đóng góp'
          },
          createdAt: '2024-03-15T10:00:00Z'
        }
      ]
    },
    {   
      id: '2',
      name: 'Cứu trợ bão Yagi khu vực miền Trung',
      image: '/images/campaign-2.jpg',
      description: 'Chiến dịch cứu trợ người dân miền Trung khắc phục hậu quả thiên tai.',
      charity: {
        id: '2',
        name: 'Quỹ Hy vọng xanh Việt Nam'
      },
      target: 1000000000,
      raised: 750000000,
      startDate: '2024-03-01T00:00:00Z',
      endDate: '2024-04-01T00:00:00Z',
      status: 'DANGKEUGOI',
      comments: [
        {
          id: '1',
          content: 'Rất ý nghĩa, tôi sẽ ủng hộ!',
          user: {
            name: 'Trần Thị B',
            role: 'Người đóng góp'
          },
          createdAt: '2024-03-16T10:00:00Z'
        }
      ]
    },
  ],
  total: 10
}

export default function ReportsPage() {
  const { data: session } = useSession()

  return (
    <div className="max-w-4xl mx-auto py-8">
      <CampaignList data={mockCampaigns} />
    </div>
  )
} 