"use client"

import { useSession } from "next-auth/react"
import { DonationHistory } from "@/components/donations/donation-history"

// Mock data
const mockDonations = {
  donations: [
    {
      id: '1',
      amount: 1000000,
      campaign: {
        id: '1',
        name: 'Hỗ trợ đồng bào miền Trung',
        charity: {
          name: 'Hội Chữ thập đỏ Việt Nam'
        }
      },
      status: 'completed',
      createdAt: '2024-03-15T10:00:00Z',
      paymentMethod: 'Chuyển khoản ngân hàng'
    },
    {
      id: '2', 
      amount: 500000,
      campaign: {
        id: '2',
        name: 'Cứu trợ bão Yagi khu vực miền Trung',
        charity: {
          name: 'Quỹ Hy vọng xanh Việt Nam'
        }
      },
      status: 'pending',
      createdAt: '2024-03-14T15:30:00Z',
      paymentMethod: 'Ví điện tử MoMo'
    },
    {
      id: '3',
      amount: 1000000,
      campaign: {
        id: '3',
        name: 'Hỗ trợ đồng bào miền Trung',
        charity: {
          name: 'Hội Chữ thập đỏ Việt Nam'
        }
      },
      status: 'completed',
      createdAt: '2024-03-13T12:00:00Z',
      paymentMethod: 'Chuyển khoản ngân hàng'
    },
    {
      id: '4',
      amount: 1000000,
      campaign: {
        id: '4',
        name: 'Hỗ trợ đồng bào miền Trung',
        charity: {
          name: 'Hội Chữ thập đỏ Việt Nam'
        }
      },
      status: 'completed',
      createdAt: '2024-03-12T09:00:00Z',
      paymentMethod: 'Chuyển khoản ngân hàng'
    }
  ]
}

export default function DonationsPage() {
  const { data: session } = useSession()
  
//   if (session?.user?.role !== 'DONOR') {
//     return (
//       <div className="text-center py-12">
//         Bạn không có quyền truy cập trang này
//       </div>
//     )
//   }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <DonationHistory data={mockDonations} />
    </div>
  )
} 