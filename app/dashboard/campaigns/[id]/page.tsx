"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { Star, Share2, FileText, Edit, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatAmount, formatDate } from "@/lib/utils"
import { CampaignDetail } from "@/types/campaign"
import { getStatusLabel, getStatusVariant } from "@/types/campaigns"
import { DonateButton } from "@/components/campaigns/donate-button"
import { marked } from "marked"

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return "/campaign-placeholder.jpg"
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${imagePath}`
  }

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      try {
        setIsLoading(true)
        const token = Cookies.get('auth_token')
        
        if (!token) {
          setError('Vui lòng đăng nhập để xem chi tiết chiến dịch')
          return
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/detail/${params.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (!response.ok) {
          throw new Error('Không thể tải thông tin chiến dịch')
        }

        const data = await response.json()
        if (data.success) {
          setCampaign(data.data)
        } else {
          throw new Error(data.message || 'Không thể tải thông tin chiến dịch')
        }
      } catch (err) {
        console.error('Error fetching campaign detail:', err)
        setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaignDetail()
  }, [params.id])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  }

  if (error || !campaign) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500">{error || 'Không tìm thấy thông tin chiến dịch'}</div>
    </div>
  }

  const progress = (campaign.budget.current / campaign.budget.target) * 100
  const isOwner = session?.user?.role === "CHARITY" // Cần thêm logic kiểm tra owner
  const canEdit = isOwner && ["STARTING", "ONGOING", "CLOSED"].includes(campaign.status)
  const canDelete = isOwner && campaign.status === "STARTING"

  return (
    <div className="h-full overflow-auto bg-gray-50/50 p-6 dark:bg-gray-900">
      {/* Header section */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-white to-gray-50 p-6 shadow-sm ring-1 ring-gray-100 dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{campaign.title}</h1>
            <p className="text-muted-foreground">
              Tổ chức: {campaign.charity.name}
            </p>
          </div>
          <Badge>{getStatusLabel(campaign.status)}</Badge>
        </div>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="flex h-full flex-col p-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={getImageUrl(campaign.images)}
                alt={campaign.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-medium">Thời gian</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Bắt đầu:</span>
                  <div className="font-medium">
                    {formatDate(campaign.timeline.start_date)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Kết thúc:</span>
                  <div className="font-medium">
                    {formatDate(campaign.timeline.end_date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Địa điểm */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-medium">Địa điểm</h3>
              <div className="space-y-1 text-sm">
                <div>{campaign.location.address}</div>
                <div>
                  {campaign.location.ward}, {campaign.location.district}
                </div>
                <div>{campaign.location.province}</div>
              </div>
            </div>

            {/* Ngân sách */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-medium">Ngân sách</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mục tiêu:</span>
                  <span className="font-medium">
                    {formatAmount(campaign.budget.target)} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right side stats */}
        <div className="flex flex-col gap-6">
          {/* Rating Card */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <div className="mb-1 text-sm font-medium text-muted-foreground">
                  Đánh giá trung bình
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= campaign.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{campaign.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="flex-1">
            <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
              {/* Tiến trình */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến trình nhận</span>
                  <span className="font-medium">
                    {formatAmount(campaign.budget.current)} /{" "}
                    {formatAmount(campaign.budget.target)} VNĐ
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Đã cứu trợ */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Đã cứu trợ</span>
                  <span className="font-medium">
                    {formatAmount(campaign.budget.distributed)} /{" "}
                    {formatAmount(campaign.budget.current)} VNĐ
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ 
                      width: `${(campaign.budget.distributed / campaign.budget.current) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                {campaign.status === "ONGOING" && (
                  <DonateButton
                    campaignId={campaign.id}
                    campaignTitle={campaign.title}
                    minAmount={10000}
                  />
                )}

                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 size-4" />
                  Sao kê
                </Button>

                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 size-4" />
                  Chia sẻ
                </Button>

                {canEdit && (
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/campaigns/${params.id}/edit`}>
                      <Edit className="mr-2 size-4" />
                      Sửa
                    </Link>
                  </Button>
                )}

                {canDelete && (
                  <Button variant="destructive" className="w-full">
                    <Trash className="mr-2 size-4" />
                    Xóa
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs section */}
      <Card className="w-full">
        <CardContent className="p-6">
          <Tabs defaultValue="description" className="space-y-4">
            <TabsList>
              <TabsTrigger value="description">Mô tả</TabsTrigger>
              <TabsTrigger value="plan">Kế hoạch chi tiết</TabsTrigger>
              <TabsTrigger value="distributions">Phân phối</TabsTrigger>
              <TabsTrigger value="comments">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: campaign.description ? marked(campaign.description) : 'Chưa có mô tả' 
                }} />
              </div>
            </TabsContent>

            <TabsContent value="plan">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: campaign.detail_goal ? marked(campaign.detail_goal) : 'Chưa có kế hoạch chi tiết' 
                }} />
              </div>
            </TabsContent>

            <TabsContent value="distributions">
              <div className="space-y-6">
                {campaign.distributions.map((dist, index) => (
                  <div key={index} className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{dist.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {dist.description}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {formatDate(dist.relief_date)}
                      </Badge>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Ngân sách
                          </div>
                          <div className="font-medium">
                            {formatAmount(dist.budget)} VNĐ
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-muted-foreground">
                            Số người nhận
                          </div>
                          <div className="font-medium">
                            {dist.beneficiary_count} người
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground">
                          Địa điểm
                        </div>
                        <div className="font-medium">
                          {dist.location.address}
                          <div className="text-sm text-muted-foreground">
                            {dist.location.ward}, {dist.location.district},{" "}
                            {dist.location.province}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <div className="space-y-6">
                {campaign.comments.map((comment, index) => (
                  <div key={index} className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{comment.user.name}</div>
                        <Badge variant="outline">{comment.user.role}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= comment.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
