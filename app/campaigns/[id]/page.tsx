"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, FileText, DollarSign, Edit, Trash } from "lucide-react"
import Image from "next/image"
import { formatDate, formatAmount } from "@/lib/utils"
import { CommentList } from "@/components/reports/comment-list"
import Link from "next/link"

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
        name: 'Nguyễn Văn A',
        role: 'Người đóng góp'
      },
      createdAt: '2024-03-15T10:00:00Z'
    }
  ]
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const progress = (mockCampaign.raised / mockCampaign.target) * 100
  
  // Kiểm tra xem người dùng hiện tại có phải là chủ sở hữu không
  const isOwner = session?.user?.role === 'CHARITY' && mockCampaign.charity.isOwner
  
  // Kiểm tra xem chiến dịch có cho phép sửa/xóa không
  const canEdit = isOwner && ['KHOIDONG', 'DANGKEUGOI', 'DADONG'].includes(mockCampaign.status)
  const canDelete = isOwner && mockCampaign.status === 'KHOIDONG'

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{mockCampaign.name}</h1>
            <p className="text-muted-foreground">
              Tổ chức: {mockCampaign.charity.name}
            </p>
          </div>
          <Badge>{getStatusLabel(mockCampaign.status)}</Badge>
        </div>

        {/* Ảnh chiến dịch */}
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={mockCampaign.image}
            alt={mockCampaign.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Tiến độ */}
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

        {/* Thời gian */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Bắt đầu: {formatDate(mockCampaign.startDate)}</span>
          <span>Kết thúc: {formatDate(mockCampaign.endDate)}</span>
        </div>

        {/* Mô tả */}
        <div className="prose max-w-none">
          <h2>Mô tả chiến dịch</h2>
          <p>{mockCampaign.description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {mockCampaign.status === 'DANGKEUGOI' && session?.user?.role === 'DONOR' && (
            <Button>
              <DollarSign className="w-4 h-4 mr-2" />
              Đóng góp
            </Button>
          )}
          
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Sao kê
          </Button>
          
          <Button variant="outline">
            <Share2 className="w-4 h-4" />
          </Button>

          {canEdit && (
            <Button variant="outline" asChild>
              <Link href={`/campaigns/${params.id}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Sửa
              </Link>
            </Button>
          )}

          {canDelete && (
            <Button variant="destructive">
              <Trash className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          )}
        </div>

        {/* Bình luận */}
        <CommentList comments={mockCampaign.comments} />
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