"use client"

import { CharityCard } from "./charity-card"
import { CharityFilter } from "./charity-filter"
import { useState } from "react"

interface CharityListProps {
  data?: {
    charities: Array<{
      id: string
      name: string
      logo: string
      description: string
      verified: boolean
      rating: number
      totalCampaigns: number
      totalDonations: number
      address: string
    }>
  }
}

export function CharityList({ data }: CharityListProps) {
  const [filter, setFilter] = useState({
    verified: 'all',
    rating: 'all',
    search: ''
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Danh sách tổ chức từ thiện</h2>
        <CharityFilter 
          filter={filter}
          onChange={setFilter}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.charities.map((charity) => (
          <CharityCard key={charity.id} charity={charity} />
        ))}
      </div>
    </div>
  )
} 