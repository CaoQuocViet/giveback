"use client"

import Image from "next/image"
import Link from "next/link"
import { DollarSign, Edit, FileText, Share2, Trash, Star, MapPin, Users } from "lucide-react"
import { marked } from "marked"
import { useSession } from "next-auth/react"
import { useState } from "react"

import { formatAmount, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonateButton } from "@/components/campaigns/donate-button"
import { CommentList } from "@/components/reports/comment-list"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Cập nhật interface theo database schema
interface Campaign {
  id: string
  charityId: string
  title: string
  description: string
  detailGoal: string
  status: "STARTING" | "ONGOING" | "CLOSED" | "COMPLETED"
  targetAmount: number
  currentAmount: number
  startDate: string
  endDate: string
  province: string
  district: string
  ward: string
  address: string
  images: string[]
  createdAt: string
  updatedAt: string
  rating: number
  distributions: Array<{
    id: string
    title: string
    amount: number
    distributionDate: string
    beneficiaryCount: number
    description: string
    province: string
    district: string
    ward: string
    address: string
    relief_date: string
  }>
  // Thông tin bổ sung từ relation
  charity: {
    id: string
    name: string
    isOwner: boolean
  }
  comments: Array<{
    id: string
    content: string
    rating: number
    user: {
      name: string
      role: string
    }
    createdAt: string
  }>
}

// Cập nhật mock data
const mockCampaign: Campaign = {
  id: "1",
  charityId: "1",
  title: "Hỗ trợ đồng bào miền Trung",
  description: `### Chiến dịch hỗ trợ đồng bào miền Trung

  #### 1. Mục tiêu
  Hỗ trợ đồng bào miền Trung sau bão lũ thông qua cung cấp nhu yếu phẩm, xây dựng nhà ở, và hỗ trợ học tập cho trẻ em nhằm giúp 1000 hộ gia đình phục hồi cuộc sống, xây mới 50 ngôi nhà, và đảm bảo dụng cụ học tập cho 500 học sinh.
  
  #### 2. Đối tượng thụ hưởng
  - Hộ gia đình bị thiệt hại nặng
  - Hộ nghèo, cận nghèo
  - Trẻ em có hoàn cảnh khó khăn
  
  #### 3. Kết quả mong đợi
  - 1000 hộ gia đình được hỗ trợ ổn định cuộc sống
  - 50 ngôi nhà được xây mới
  - 500 học sinh được hỗ trợ dụng cụ học tập`,
  detailGoal: `### Chiến dịch hỗ trợ đồng bào miền Trung
  
  #### 1. Bối cảnh
  Sau đợt bão lũ vừa qua, nhiều địa phương tại miền Trung đã bị thiệt hại nặng nề về người và của. Nhiều gia đình đã mất nhà cửa, tài sản và phương tiện sinh k.
  
  #### 2. Mục tiêu
  - Hỗ trợ 1000 hộ gia đình bị ảnh hưởng bởi bão
  - Xây dựng lại 50 ngôi nhà bị hư hỏng nặng
  - Cung cấp nhu yếu phẩm và dụng cụ học tập cho trẻ em
  
  #### 3. Đối tượng thụ hưởng
  - Hộ gia đình bị thiệt hại về nhà cửa
  - Hộ nghèo, cận nghèo bị ảnh hưởng
  - Học sinh có hoàn cảnh khó khăn
  
  #### 4. Kế hoạch triển khai
  ##### Giai đoạn 1: Khảo sát (2 tuần)
  - Khảo sát thiệt hại
  - Lập danh sách hộ gia đình cần hỗ trợ
  - Xác định mức độ ưu tiên
  
  ##### Giai đoạn 2: Hỗ trợ khẩn cấp (1 tháng)
  - Phân phối nhu yếu phẩm
  - Hỗ trợ sửa chữa nhà tạm
  - Cấp phát dụng cụ học tập
  
  ##### Giai đoạn 3: Tái thiết (3 tháng)
  - Xây dựng nhà mới
  - Hỗ trợ phục hồi sinh kế
  - Theo dõi và đánh giá
  
  #### 5. Ngân sách dự kiến
  - Xây nhà: 500.000.000 VNĐ
  - Nhu yếu phẩm: 300.000.000 VNĐ
  - Dụng cụ học tập: 200.000.000 VNĐ
  
  #### 6. Kết quả mong đợi
  - 1000 hộ gia đình được hỗ trợ ổn định cuộc sống
  - 50 ngôi nhà được xây mới
  - 500 học sinh được hỗ trợ dụng cụ học tập`,
  status: "ONGOING",
  targetAmount: 1000000000,
  currentAmount: 750000000,
  startDate: "2024-03-01T00:00:00Z",
  endDate: "2024-04-01T00:00:00Z",
  province: "Quảng Nam",
  district: "Tam Kỳ",
  ward: "An Xuân",
  address: "123 Đường Hùng Vương",
  images: [
    "/images/campaign-1.jpg",
    "/images/campaign-1-2.jpg",
    "/images/campaign-1-3.jpg",
  ],
  createdAt: "2024-02-28T00:00:00Z",
  updatedAt: "2024-03-15T00:00:00Z",
  rating: 4.5,
  distributions: [
    {
      id: "1",
      title: "Đợt cứu trợ 1",
      amount: 250000000,
      distributionDate: "2024-03-15",
      beneficiaryCount: 100,
      description: "Phân phối lương thực và nhu yếu phẩm cho người dân vùng lũ",
      province: "Quảng Nam",
      district: "Đại Lộc",
      ward: "Đại Hiệp",
      address: "Thôn 5",
      relief_date: "2024-03-20"
    },
    {
      id: "2",
      title: "Khoản cứu trợ 2",
      amount: 200000000,
      distributionDate: "2024-03-20T00:00:00Z",
      beneficiaryCount: 500,
      description: "Cung cấp dụng cụ học tập cho 500 học sinh có hoàn cảnh khó khăn.",
      address: "123 Đường Hùng Vương",
      ward: "An Xuân",
      district: "Tam Kỳ",
      province: "Quảng Nam",
      relief_date: "2024-03-20T00:00:00Z"
    }
  ],
  charity: {
    id: "1",
    name: "Hội Chữ thập đỏ Việt Nam",
    isOwner: true,
  },
  comments: [
    {
      id: "1",
      content: "Rất ý nghĩa, tôi sẽ ủng hộ!",
      rating: 5,
      user: {
        name: "Nguyễn Văn A",
        role: "DONOR",
      },
      createdAt: "2024-03-15T10:00:00Z",
    },
    {
      id: "2",
      content:
        "Cảm ơn mọi người đã quan tâm và ủng hộ chiến dịch. Chúng tôi xin cảm ơn rất nhiều vì sự giúp đỡ.",
      rating: 4,
      user: {
        name: "Jack",
        role: "BENEFICIARY",
      },
      createdAt: "2024-03-15T11:30:00Z",
    },
    {
      id: "3",
      content: "Tôi đã đóng góp 5 triệu. Mong chiến dịch sẽ sớm đạt mục tiêu!",
      rating: 3,
      user: {
        name: "Trần Thị B",
        role: "DONOR",
      },
      createdAt: "2024-03-16T09:15:00Z",
    },
    {
      id: "4",
      content: "Đã chia sẻ thông tin chiến dịch trên các kênh truyền thông.",
      rating: 2,
      user: {
        name: "Lê Văn C",
        role: "ADMIN",
      },
      createdAt: "2024-03-16T14:20:00Z",
    },
    {
      id: "5",
      content:
        "Cập nhật: Đã hoàn thành khảo sát và lập danh sách các hộ gia đình cần hỗ trợ khẩn cấp.",
      rating: 1,
      user: {
        name: "Hội Chữ thập đỏ Việt Nam",
        role: "CHARITY",
      },
      createdAt: "2024-03-17T08:00:00Z",
    },
  ],
}

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const progress =
    (mockCampaign.currentAmount / mockCampaign.targetAmount) * 100

  const isOwner =
    session?.user?.role === "CHARITY" && mockCampaign.charity.isOwner
  const canEdit =
    isOwner && ["STARTING", "ONGOING", "CLOSED"].includes(mockCampaign.status)
  const canDelete = isOwner && mockCampaign.status === "STARTING"

  const [newComment, setNewComment] = useState({
    content: "",
    rating: 0
  })

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý submit comment
    console.log("New comment:", newComment)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{mockCampaign.title}</h1>
          <p className="text-muted-foreground">
            Tổ chức: {mockCampaign.charity.name}
          </p>
        </div>
        <Badge>{getStatusLabel(mockCampaign.status)}</Badge>
      </div>

      {/* Basic Info Section - Grid with equal height */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        {/* Left side - Basic info */}
        <Card className="md:col-span-2">
          <CardContent className="flex h-full flex-col p-6">
            <div className="grid h-full gap-6 md:grid-cols-2">
              {/* Ảnh minh họa */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/campaign-image.jpg"
                  alt={mockCampaign.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thông tin bên phải */}
              <div className="flex flex-col justify-between space-y-4">
                {/* Thời gian */}
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-medium">Thời gian</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Bắt đầu:</span>
                      <div className="font-medium">
                        {formatDate(mockCampaign.startDate)}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Kết thúc:</span>
                      <div className="font-medium">
                        {formatDate(mockCampaign.endDate)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Địa điểm */}
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-medium">Địa điểm</h3>
                  <div className="space-y-1 text-sm">
                    <div>{mockCampaign.address}</div>
                    <div>
                      {mockCampaign.ward}, {mockCampaign.district}
                    </div>
                    <div>{mockCampaign.province}</div>
                  </div>
                </div>

                {/* Ngân sách */}
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-medium">Ngân sách</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mục tiêu:</span>
                      <span className="font-medium">
                        {formatAmount(mockCampaign.targetAmount)} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Stats */}
        <div className="flex flex-col gap-6">
          {/* Rating Card */}
          <Card>
            <CardContent className="space-y-4 p-6">
              {/* Thêm rating trung bình */}
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
                          star <= mockCampaign.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{mockCampaign.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="flex-1">
            <CardContent className="flex h-full flex-col justify-between space-y-4 p-6">
              {/* Tiến trình nhận */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến trình nhận</span>
                  <span className="font-medium">
                    {formatAmount(mockCampaign.currentAmount)} /{" "}
                    {formatAmount(mockCampaign.targetAmount)} VNĐ
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
                    {formatAmount(mockCampaign.distributedAmount)} /{" "}
                    {formatAmount(mockCampaign.currentAmount)} VNĐ
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ 
                      width: `${(mockCampaign.distributedAmount / mockCampaign.currentAmount) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                {mockCampaign.status === "ONGOING" && (
                  <DonateButton
                    campaignId={mockCampaign.id}
                    campaignTitle={mockCampaign.title}
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

      {/* Detailed Info Section - Full width */}
      <Card className="w-full">
        <CardContent className="p-6">
          <Tabs defaultValue="description" className="space-y-4">
            <TabsList>
              <TabsTrigger value="description">Mô tả</TabsTrigger>
              <TabsTrigger value="detail-goal">Kế hoạch chi tiết</TabsTrigger>
              <TabsTrigger value="distributions">Các khoản cứu trợ</TabsTrigger>
              <TabsTrigger value="comments">Bình luận</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <div className="prose prose-sm prose-slate max-w-none md:prose-base lg:prose-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(mockCampaign.description),
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="detail-goal">
              <div className="prose prose-sm prose-slate max-w-none md:prose-base lg:prose-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(mockCampaign.detailGoal),
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="distributions">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {mockCampaign.distributions.map((dist) => (
                      <div
                        key={dist.id}
                        className="rounded-lg border bg-card p-6"
                      >
                        {/* Header */}
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{dist.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{dist.description}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {formatDate(dist.relief_date)}
                          </Badge>
                        </div>

                        {/* Grid thông tin */}
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* Cột trái */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-sm text-muted-foreground">Ngân sách</div>
                                <div className="font-medium">{formatAmount(dist.amount)} VNĐ</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-sm text-muted-foreground">Số người nhận</div>
                                <div className="font-medium">{dist.beneficiaryCount} người</div>
                              </div>
                            </div>
                          </div>

                          {/* Cột phải */}
                          <div>
                            <div className="flex items-start gap-2">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                              <div>
                                <div className="text-sm text-muted-foreground">Địa điểm</div>
                                <div className="font-medium">
                                  {dist.address}
                                  <div className="text-sm text-muted-foreground">
                                    {dist.ward}, {dist.district}, {dist.province}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardContent className="pt-6">
                  {/* Form thêm bình luận mới */}
                  <form onSubmit={handleCommentSubmit} className="mb-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Đánh giá</Label>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewComment({...newComment, rating: star})}
                            className={star <= newComment.rating ? "text-yellow-400" : "text-gray-300"}
                          >
                            <Star className="h-5 w-5 fill-current" />
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Nội dung bình luận</Label>
                      <Textarea
                        required
                        placeholder="Nhập bình luận của bạn..."
                        value={newComment.content}
                        onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                      />
                    </div>
                    
                    <Button type="submit">Gửi bình luận</Button>
                  </form>

                  <CommentList comments={mockCampaign.comments} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function getStatusLabel(status: string) {
  switch (status) {
    case "STARTING":
      return "Khởi động"
    case "ONGOING":
      return "Đang kêu gọi"
    case "CLOSED":
      return "Đã đóng"
    case "COMPLETED":
      return "Đã kết thúc"
    default:
      return status
  }
}
