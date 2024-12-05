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

// Mock data - sau này sẽ fetch từ API dựa vào params.id
const mockCampaign = {
  id: '1',
  name: 'Hỗ trợ đồng bào miền Trung',
  image: '/images/campaign-1.jpg',
  description: 'Chiến dịch hỗ trợ người dân miền Trung khắc phục hậu quả thiên tai.',
  charity: {
    id: '1',
    name: 'Hội Chữ thập đỏ Việt Nam',
    isOwner: true // giả định đây là tổ chức sở hữu chiến dịch
  },
  target: 1000000000,
  raised: 750000000,
  startDate: '2024-03-01T00:00:00Z',
  endDate: '2024-04-01T00:00:00Z',
  status: 'DANGKEUGOI',
  comments: [
    {
      id: '1',
      content: 'Rất ý nghĩa, tôi sẽ ủng hộ!',
      user: {
        name: 'Nguyên Văn A',
        role: 'Người đóng góp'
      },
      createdAt: '2024-03-15T10:00:00Z'
    }
  ]
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const progress = (mockCampaign.raised / mockCampaign.target) * 100
  
  const isOwner = session?.user?.role === 'CHARITY' && mockCampaign.charity.isOwner
  const canEdit = isOwner && ['KHOIDONG', 'DANGKEUGOI', 'DADONG'].includes(mockCampaign.status)
  const canDelete = isOwner && mockCampaign.status === 'KHOIDONG'

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{mockCampaign.name}</h1>
          <p className="text-muted-foreground">
            Tổ chức: {mockCampaign.charity.name}
          </p>
        </div>
        <Badge>{getStatusLabel(mockCampaign.status)}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Thông tin chính */}
        <Card className="md:col-span-2">
          <CardContent className="p-6 space-y-6">
            {/* Ảnh chiến dịch */}
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={mockCampaign.image}
                alt={mockCampaign.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Mô tả */}
            <div className="prose max-w-none">
              <h2 className="text-lg font-semibold">Mô tả chiến dịch</h2>
              <p>{mockCampaign.description}</p>
            </div>

            {/* Bình luận */}
            <CommentList comments={mockCampaign.comments} />
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thống kê */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Đã quyên góp</span>
                  <span className="font-medium">
                    {formatAmount(mockCampaign.raised)} / {formatAmount(mockCampaign.target)} VNĐ
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
                {mockCampaign.status === 'DANGKEUGOI' && session?.user?.role === 'DONOR' && (
                  <Button className="w-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Đóng góp
                  </Button>
                )}
                
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
    case 'KHOIDONG': return 'Khởi động'
    case 'DANGKEUGOI': return 'Đang kêu gọi'
    case 'DADONG': return 'Đã đóng'
    case 'DAKETTHUC': return 'Đã kết thúc'
    default: return status
  }
} 