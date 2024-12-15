"use client"

import Image from "next/image"
import Link from "next/link"

import { Campaign, getStatusLabel, getStatusVariant } from "@/types/campaigns"
import { formatAmount, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={campaign.campaign_image ? campaign.campaign_image : "/campaign-placeholder.jpg"}
          alt={campaign.title}
          fill
          className="object-cover object-center"
        />
      </div>


      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate flex-1 mr-2">
              {campaign.title}
            </h3>
            <Badge variant={getStatusVariant(campaign.status)}>
              {getStatusLabel(campaign.status)}
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span className="font-medium">Mục tiêu:</span>
              <span>{formatAmount(campaign.target_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Đã quyên góp:</span>
              <span>{formatAmount(campaign.current_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Bắt đầu:</span>
              <span>{formatDate(campaign.start_date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Kết thúc:</span>
              <span>{formatDate(campaign.end_date)}</span>
            </div>
          </div>

          <Button asChild className="w-full" variant="default">
            <Link href={`/dashboard/campaigns/${campaign.id}`}>
              Xem chi tiết
            </Link>
          </Button>
        </div>
      </CardContent>

      {/* {campaign.charity?.logo && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/charities/${campaign.charity.logo}`}
          alt={campaign.charity.name || ""}
          width={40}
          height={40}
          className="rounded-full"
        />
      )} */}
    </Card>
  )
}
