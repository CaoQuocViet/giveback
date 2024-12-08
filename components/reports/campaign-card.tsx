"use client"

import Image from "next/image"
import Link from "next/link"

import { formatAmount, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    image: string
    description: string
    charity: {
      id: string
      name: string
    }
    target: number
    raised: number
    startDate: string
    endDate: string
    status: "KHOIDONG" | "DANGKEUGOI" | "DADONG" | "DAKETTHUC"
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.target) * 100

  return (
    <Card>
      <CardHeader className="relative">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={campaign.image}
            alt={campaign.name}
            fill
            className="object-cover"
          />
        </div>
        <Badge className="absolute right-2 top-2">
          {getStatusLabel(campaign.status)}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{campaign.name}</h3>
            <p className="text-sm text-muted-foreground">
              Tổ chức: {campaign.charity.name}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Đã quyên góp</span>
              <span className="font-medium">
                {formatAmount(campaign.raised)} /{" "}
                {formatAmount(campaign.target)} VNĐ
              </span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Bắt đầu: {formatDate(campaign.startDate)}</span>
            <span>Kết thúc: {formatDate(campaign.endDate)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/campaigns/${campaign.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function getStatusLabel(status: string) {
  switch (status) {
    case "KHOIDONG":
      return "Khởi động"
    case "DANGKEUGOI":
      return "Đang kêu gọi"
    case "DADONG":
      return "Đã đóng"
    case "DAKETTHUC":
      return "Đã kết thúc"
    default:
      return status
  }
}
