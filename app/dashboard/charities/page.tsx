"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CharityList } from "@/components/charities/charity-list"
import { Pagination } from "@/components/ui/pagination"

// Mock data
const mockCharities = {
  charities: [
    {
      id: "1",
      name: "Hội Chữ thập đỏ Việt Nam",
      logo: "/images/red-cross.jpg",
      description:
        "Tổ chức nhân đạo lớn nhất Việt Nam, hoạt động trong lĩnh vực cứu trợ nhân đạo và từ thiện.",
      verified: true,
      rating: 4.8,
      totalCampaigns: 150,
      totalDonations: 25000,
      address: "Hà Nội, Việt Nam",
    },
    {
      id: "2",
      name: "Quỹ Hy vọng xanh Việt Nam",
      logo: "/images/hope.jpg",
      description:
        "Quỹ từ thiện tập trung vào giáo dục và phát triển cộng đồng.",
      verified: true,
      rating: 4.5,
      totalCampaigns: 75,
      totalDonations: 12000,
      address: "TP.HCM, Việt Nam",
    },
    {
      id: "3",
      name: "Hội Chữ thập đỏ Việt Nam",
      logo: "/images/red-cross.jpg",
      description:
        "Tổ chức nhân đạo lớn nhất Việt Nam, hoạt động trong lĩnh vực cứu trợ nhân đạo và từ thiện.",
      verified: true,
      rating: 4.8,
      totalCampaigns: 150,
      totalDonations: 25000,
      address: "Hà Nội, Việt Nam",
    },
    {
      id: "4",
      name: "Quỹ Hy vọng xanh Việt Nam",
      logo: "/images/hope.jpg",
      description:
        "Quỹ từ thiện tập trung vào giáo dục và phát triển cộng đồng.",
      verified: true,
      rating: 4.5,
      totalCampaigns: 75,
      totalDonations: 12000,
      address: "TP.HCM, Việt Nam",
    },
    {
      id: "5",
      name: "Trái tim cho em",
      logo: "/images/heart.jpg",
      description:
        "Chương trình hỗ trợ phẫu thuật tim bẩm sinh cho trẻ em nghèo.",
      verified: true,
      rating: 4.9,
      totalCampaigns: 50,
      totalDonations: 8000,
      address: "Đà Nẵng, Việt Nam",
    },
  ],
}

export default function CharitiesPage() {
  const { data: session } = useSession()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // 3x3 grid
  
  const totalPages = Math.ceil(mockCharities.charities.length / itemsPerPage)
  const currentCharities = {
    charities: mockCharities.charities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <CharityList data={currentCharities} />
      
      <Pagination
        total={mockCharities.charities.length}
        page={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}
