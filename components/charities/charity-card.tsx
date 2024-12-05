"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CharityCardProps {
  charity: {
    id: string
    name: string
    logo: string
    description: string
    verified: boolean
    rating: number
    totalCampaigns: number
    totalDonations: number
    address: string
  }
}

export function CharityCard({ charity }: CharityCardProps) {
  return (
    <Card>
      <CardHeader className="relative">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={charity.logo}
            alt={charity.name}
            fill
            className="object-cover"
          />
        </div>
        {charity.verified && (
          <Badge 
            variant="success" 
            className="absolute top-2 right-2"
          >
            Đã xác minh
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{charity.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {charity.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{charity.rating}/5</span>
          </div>
          <div>
            {charity.totalCampaigns} chiến dịch
          </div>
          <div>
            {charity.totalDonations.toLocaleString()} lượt đóng góp
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/charities/${charity.id}`}>
            Xem chi tiết
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 