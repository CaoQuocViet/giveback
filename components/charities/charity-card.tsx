"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CharityCardProps {
  charity: {
    id: string
    name: string
    logo: string
    description: string
    verification_status: "PENDING" | "VERIFIED" | "REJECTED"
    rating: number
    totalCampaigns: number
    totalDonations: number
    address: string
  }
}

export function CharityCard({ charity }: CharityCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="relative">
        <div className="relative aspect-square overflow-hidden rounded-full">
          <Image
            src={charity.logo}
            alt={charity.name}
            fill
            width={500}
            height={500}
            className="object-cover object-center"
          />
        </div>

        <Badge
          variant={
            charity.verification_status === "VERIFIED"
              ? "success"
              : charity.verification_status === "REJECTED"
              ? "destructive"
              : "warning"
          }
          className="absolute right-2 top-2"
        >
          {charity.verification_status === "VERIFIED"
            ? "Đã xác minh"
            : charity.verification_status === "REJECTED"
            ? "Bị từ chối"
            : "Chờ xác minh"}
        </Badge>
      </CardHeader>
      <CardContent className="flex grow flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{charity.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="mr-1 size-4 fill-yellow-400 text-yellow-400" />
            <span>{charity.rating}/5</span>
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {charity.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <Star className="mr-1 size-4 fill-yellow-400 text-yellow-400" />
            <span>{charity.rating}/5</span>
          </div> */}
          <div>{charity.totalCampaigns} chiến dịch</div>
          <div>{charity.totalDonations.toLocaleString()} VNĐ đóng góp</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          asChild
          className="w-full bg-blue-500 text-white hover:bg-blue-700"
        >
          <Link href={`/dashboard/charities/${charity.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
