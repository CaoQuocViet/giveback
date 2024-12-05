"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, FileText, DollarSign, Edit, Trash } from "lucide-react"
import Image from "next/image"
import { formatDate, formatAmount } from "@/lib/utils"
import { CommentList } from "@/components/reports/comment-list"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { marked } from "marked"

// Cập nhật interface theo database schema
interface Campaign {
  id: string
  charityId: string
  title: string
  description: string
  status: 'STARTING' | 'ONGOING' | 'CLOSED' | 'COMPLETED'
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
  // Thông tin bổ sung từ relation
  charity: {
    id: string
    name: string
    isOwner: boolean
  }
  comments: Array<{
    id: string
    content: string
    user: {
      name: string
      role: string
    }
    createdAt: string
  }>
}

// Cập nhật mock data
const mockCampaign: Campaign = {
  id: '1',
  charityId: '1',
  title: 'Hỗ trợ đồng bào miền Trung',
  description: `# Chiến dịch hỗ trợ đồng bào miền Trung

## 1. Bối cảnh
Sau đợt bão lũ vừa qua, nhiều địa phương tại miền Trung đã bị thiệt hại nặng nề về người và của. Nhiều gia đình đã mất nhà cửa, tài sản và phương tiện sinh kế.

## 2. Mục tiêu
- Hỗ trợ 1000 hộ gia đình bị ảnh hưởng bởi bão
- Xây dựng lại 50 ngôi nhà bị hư hỏng nặng
- Cung cấp nhu yếu phẩm và dụng cụ học tập cho trẻ em

## 3. Đối tượng thụ hưởng
- Hộ gia đình bị thiệt hại về nhà cửa
- Hộ nghèo, cận nghèo bị ảnh hưởng
- Học sinh có hoàn cảnh khó khăn

## 4. Kế hoạch triển khai
### Giai đoạn 1: Khảo sát (2 tuần)
- Khảo sát thiệt hại
- Lập danh sách hộ gia đình cần hỗ trợ
- Xác định mức độ ưu tiên

### Giai đoạn 2: Hỗ trợ khẩn cấp (1 tháng)
- Phân phối nhu yếu phẩm
- Hỗ trợ sửa chữa nhà tạm
- Cấp phát dụng cụ học tập

### Giai đoạn 3: Tái thiết (3 tháng)
- Xây dựng nhà mới
- Hỗ trợ phục hồi sinh kế
- Theo dõi và đánh giá

## 5. Ngân sách dự kiến
- Xây nhà: 500.000.000 VNĐ
- Nhu yếu phẩm: 300.000.000 VNĐ
- Dụng cụ học tập: 200.000.000 VNĐ

## 6. Kết quả mong đợi
- 1000 hộ gia đình được hỗ trợ ổn định cuộc sống
- 50 ngôi nhà được xây mới
- 500 học sinh được hỗ trợ dụng cụ học tập`,
  status: 'ONGOING',
  targetAmount: 1000000000,
  currentAmount: 750000000,
  startDate: '2024-03-01T00:00:00Z',
  endDate: '2024-04-01T00:00:00Z',
  province: 'Quảng Nam',
  district: 'Tam Kỳ',
  ward: 'An Xuân',
  address: '123 Đường Hùng Vương',
  images: [
    '/images/campaign-1.jpg',
    '/images/campaign-1-2.jpg',
    '/images/campaign-1-3.jpg'
  ],
  createdAt: '2024-02-28T00:00:00Z',
  updatedAt: '2024-03-15T00:00:00Z',
  charity: {
    id: '1',
    name: 'Hội Chữ thập đỏ Việt Nam',
    isOwner: true
  },
  comments: [
    {
      id: '1',
      content: 'Rất ý nghĩa, tôi sẽ ủng hộ!',
      user: {
        name: 'Nguyễn Văn A',
        role: 'DONOR'
      },
      createdAt: '2024-03-15T10:00:00Z'
    },
    {
      id: '2',
      content: 'Cảm ơn mọi người đã quan tâm và ủng hộ chiến dịch. Chúng tôi sẽ cập nhật tiến độ thường xuyên.',
      user: {
        name: 'Hội Chữ thập đỏ Việt Nam',
        role: 'CHARITY'
      },
      createdAt: '2024-03-15T11:30:00Z'
    },
    {
      id: '3',
      content: 'Tôi đã đóng góp 5 triệu. Mong chiến dịch sẽ sớm đạt mục tiêu!',
      user: {
        name: 'Trần Thị B',
        role: 'DONOR'
      },
      createdAt: '2024-03-16T09:15:00Z'
    },
    {
      id: '4',
      content: 'Đã chia sẻ thông tin chiến dịch trên các kênh truyền thông.',
      user: {
        name: 'Lê Văn C',
        role: 'DONOR'
      },
      createdAt: '2024-03-16T14:20:00Z'
    },
    {
      id: '5',
      content: 'Cập nhật: Đã hoàn thành khảo sát và lập danh sách các hộ gia đình cần hỗ trợ khẩn cấp.',
      user: {
        name: 'Hội Chữ thập đỏ Việt Nam',
        role: 'CHARITY'
      },
      createdAt: '2024-03-17T08:00:00Z'
    }
  ]
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const progress = (mockCampaign.currentAmount / mockCampaign.targetAmount) * 100
  
  const isOwner = session?.user?.role === 'CHARITY' && mockCampaign.charity.isOwner
  const canEdit = isOwner && ['STARTING', 'ONGOING', 'CLOSED'].includes(mockCampaign.status)
  const canDelete = isOwner && mockCampaign.status === 'STARTING'

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{mockCampaign.title}</h1>
          <p className="text-muted-foreground">
            Tổ chức: {mockCampaign.charity.name}
          </p>
        </div>
        <Badge>{getStatusLabel(mockCampaign.status)}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Thông tin chính */}
        <div className="md:col-span-2 space-y-6">
          {/* Ảnh và thông tin cơ bản */}
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Ảnh chiến dịch */}
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={mockCampaign.images[0]}
                    alt={mockCampaign.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Thông tin cơ bản */}
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">Thời gian</div>
                    <div>Bắt đầu: {formatDate(mockCampaign.startDate)}</div>
                    <div>Kết thúc: {formatDate(mockCampaign.endDate)}</div>
                  </div>

                  <div>
                    <div className="font-medium mb-1">Địa điểm</div>
                    <div>{mockCampaign.address}</div>
                    <div>{mockCampaign.ward}, {mockCampaign.district}</div>
                    <div>{mockCampaign.province}</div>
                  </div>

                  <div>
                    <div className="font-medium mb-1">Ngân sách</div>
                    <div>Mục tiêu: {formatAmount(mockCampaign.targetAmount)} VNĐ</div>
                    <div>Đã nhận: {formatAmount(mockCampaign.currentAmount)} VNĐ</div>
                    <div>Tiến độ: {Math.round(progress)}%</div>
                  </div>

                  <div>
                    <div className="font-medium mb-1">Đánh giá</div>
                    <div>{mockCampaign.rating}/5 ⭐</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs cho nội dung chi tiết */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="plan">
                <TabsList className="mb-4">
                  <TabsTrigger value="plan">Kế hoạch chi tiết</TabsTrigger>
                  <TabsTrigger value="comments">Bình luận</TabsTrigger>
                </TabsList>

                <TabsContent value="plan" className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(mockCampaign.description) }} />
                </TabsContent>

                <TabsContent value="comments">
                  <CommentList comments={mockCampaign.comments} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thống kê */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Đã quyên góp</span>
                  <span className="font-medium">
                    {formatAmount(mockCampaign.currentAmount)} / {formatAmount(mockCampaign.targetAmount)} VNĐ
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <div>Bắt đầu: {formatDate(mockCampaign.startDate)}</div>
                <div>Kết thúc: {formatDate(mockCampaign.endDate)}</div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Button 
                  className="w-full"
                  disabled={mockCampaign.status !== 'ONGOING'}
                  variant={mockCampaign.status === 'ONGOING' ? "default" : "secondary"}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Đóng góp
                </Button>

                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Sao kê
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>

                {canEdit && (
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/campaigns/${params.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Sửa
                    </Link>
                  </Button>
                )}

                {canDelete && (
                  <Button variant="destructive" className="w-full">
                    <Trash className="w-4 h-4 mr-2" />
                    Xóa
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'STARTING': return 'Khởi động'
    case 'ONGOING': return 'Đang kêu gọi'
    case 'CLOSED': return 'Đã đóng'
    case 'COMPLETED': return 'Đã kết thúc'
    default: return status
  }
} 