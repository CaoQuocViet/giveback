"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate, formatAmount } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, FileText, Star, Check, XCircle } from "lucide-react"

// Cập nhật mock data
const mockCharity = {
  // Thông tin từ bảng Users
  id: '1',
  fullName: 'Nguyễn Văn A',
  email: 'contact@redcross.org.vn',
  phone: '0123456789',
  avatar: '/images/red-cross.jpg',
  province: 'Hà Nội',
  district: 'Đống Đa',
  ward: 'Quang Trung',
  address: '82 Nguyễn Du',
  
  // Thông tin từ bảng Charities
  title: 'Hội Chữ thập đỏ Việt Nam',
  description: 'Tổ chức nhân đạo lớn nhất Việt Nam, hoạt động trong lĩnh vực cứu trợ nhân đạo và từ thiện.',
  representativeName: 'Nguyễn Văn A',
  licenseDescription: 'Giấy phép hoạt động số 123/GP-BTXH',
  licenseUrl: '/documents/license.pdf',
  verificationStatus: 'PENDING',
  rating: 4.8,
  campaignCount: 150,
  totalRaised: 25000000000,
  licenseImageUrl: '/images/license.jpg',
  
  // Danh sách chiến dịch
  campaigns: [
    {
      id: '1',
      title: 'Hỗ trợ đồng bào miền Trung',
      status: 'ONGOING',
      targetAmount: 1000000000,
      currentAmount: 750000000,
      startDate: '2024-03-01T00:00:00Z',
      endDate: '2024-04-01T00:00:00Z',
    },
    {
      id: '2',
      title: 'Xây dựng trường học vùng cao',
      status: 'COMPLETED',
      targetAmount: 500000000,
      currentAmount: 500000000,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-02-01T00:00:00Z',
    }
  ]
}

// Mock user data - có thể lấy từ useSession() sau này
const mockUser = {
  role: "CHARITY"
};

export default function CharityDetailPage({ params }: { params: { id: string } }) {
  const isAdmin = mockUser.role === "ADMIN";

  return (
    <div className="h-full p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-start gap-6">
        <div className="w-32 h-32 relative rounded-lg overflow-hidden">
          <Image
            src={mockCharity.avatar}
            alt={mockCharity.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{mockCharity.title}</h1>
              <Badge className={getVerificationStatusStyle(mockCharity.verificationStatus)}>
                {getVerificationStatusLabel(mockCharity.verificationStatus)}
              </Badge>
            </div>
            
            {/* Thêm 2 nút cho ADMIN khi tổ chức đang ở trạng thái PENDING */}
            {isAdmin && mockCharity.verificationStatus === 'PENDING' && (
              <div className="flex gap-3">
                <Button 
                  variant="default"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    console.log('Verify charity:', params.id)
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Xác thực
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    console.log('Reject charity:', params.id)
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Buộc dừng
                </Button>
              </div>
            )}
          </div>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            {mockCharity.description}
          </p>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-medium">{mockCharity.campaignCount}</div>
              <div className="text-muted-foreground">Chiến dịch</div>
            </div>
            <div>
              <div className="font-medium">{formatAmount(mockCharity.totalRaised)} VNĐ</div>
              <div className="text-muted-foreground">Đã quyên góp</div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <div className="font-medium">{mockCharity.rating}/5</div>
              <div className="text-muted-foreground ml-1">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết và giấy phép */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Thông tin liên hệ */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Người đại diện</div>
                  <div>{mockCharity.representativeName}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Địa chỉ</div>
                  <div>{mockCharity.address}, {mockCharity.ward}, {mockCharity.district}, {mockCharity.province}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email</div>
                  <div>{mockCharity.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Điện thoại</div>
                  <div>{mockCharity.phone}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Giấy phép hoạt động */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Giấy phép hoạt động</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">{mockCharity.licenseDescription}</div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src={mockCharity.licenseImageUrl}
                  alt="Giấy phép hoạt động"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danh sách chiến dịch */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Danh sách chiến dịch</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên chiến dịch</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Mục tiêu</TableHead>
                <TableHead>Đã quyên góp</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCharity.campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <Link 
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="text-primary hover:underline"
                    >
                      {campaign.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatAmount(campaign.targetAmount)} VNĐ</TableCell>
                  <TableCell>{formatAmount(campaign.currentAmount)} VNĐ</TableCell>
                  <TableCell>
                    <div>{formatDate(campaign.startDate)}</div>
                    <div>{formatDate(campaign.endDate)}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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

function getVerificationStatusStyle(status: string) {
  switch (status) {
    case 'VERIFIED':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'REJECTED':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
}

function getVerificationStatusLabel(status: string) {
  switch (status) {
    case 'VERIFIED':
      return 'Đã xác thực'
    case 'REJECTED':
      return 'Đã từ chối'
    default:
      return 'Chờ xác thực'
  }
} 