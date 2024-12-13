"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { CharityList } from "@/components/charities/charity-list"
import { Pagination } from "@/components/ui/pagination"

interface CharityListResponse {
  success: boolean
  data: {
    charities: Array<{
      id: string
      title: string
      description: string
      rating: string | number
      campaign_count: number
      total_raised: string | number
      verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED'
      user: {
        full_name: string
        profile_image: string | null
      }
    }>
    pagination: {
      total: number
      page: number
      total_pages: number
    }
  }
}

export default function CharitiesPage() {
  const router = useRouter()
  const [charities, setCharities] = useState<CharityListResponse['data']['charities']>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 9 // 3x3 grid

  const fetchCharities = async () => {
    try {
      setIsLoading(true)
      const token = Cookies.get('auth_token')
      if (!token) {
        router.push('/auth/login')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/charities?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách tổ chức')
      }

      const data: CharityListResponse = await response.json()
      
      // Transform API data to match CharityList component format
      const transformedCharities = data.data.charities.map(charity => ({
        id: charity.id,
        name: charity.title,
        logo: charity.user.profile_image 
          ? (charity.user.profile_image.startsWith('http') 
            ? charity.user.profile_image 
            : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${charity.user.profile_image}`)
          : '/images/default-charity.jpg', // Fallback image
        description: charity.description,
        verification_status: charity.verification_status,
        rating: Number(charity.rating),
        totalCampaigns: charity.campaign_count,
        totalDonations: Number(charity.total_raised),
        address: '' // TODO: Add address from user data if needed
      }))

      setCharities(transformedCharities)
      setTotalItems(data.data.pagination.total)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCharities()
  }, [currentPage])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <CharityList data={{ charities }} />
      
      <Pagination
        total={totalItems}
        page={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}
