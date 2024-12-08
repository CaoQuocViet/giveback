"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Check,
  FileText,
  Mail,
  MapPin,
  Phone,
  Star,
  XCircle,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react"

import { formatAmount, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Cập nhật mock data
const mockCharity = {
  // Thông tin từ bảng Users
  id: "1",
  fullName: "Nguyễn Văn A",
  email: "contact@redcross.org.vn",
  phone: "0123456789",
  avatar: "/images/red-cross.jpg",
  province: "Hà Nội",
  district: "Đống Đa",
  ward: "Quang Trung",
  address: "82 Nguyễn Du",

  // Thông tin từ bảng Charities
  title: "Hội Chữ thập đỏ Việt Nam",
  description:
    "Tổ chức nhân đạo lớn nhất Việt Nam, hoạt động trong lĩnh vực cứu trợ nhân đạo và từ thiện.",
  representativeName: "Nguyễn Văn A",
  licenseDescription: "Giấy phép hoạt động số 123/GP-BTXH",
  licenseUrl: "/documents/license.pdf",
  verificationStatus: "PENDING",
  rating: 4.8,
  campaignCount: 150,
  totalRaised: 25000000000,
  licenseImageUrl: "/images/license.jpg",

  // Thêm các trường mới
  licenseNumber: "123/GP-BTXH",
  licenseDate: "2020-01-01T00:00:00Z",
  licenseIssuer: "Bộ Lao động - Thương binh và Xã hội",
  
  foundingDate: "1946-11-23T00:00:00Z",
  website: "https://redcross.org.vn",
  socialLinks: {
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/"
  },

  // Danh sách chiến dịch
  campaigns: [
    {
      id: "1",
      title: "Hỗ trợ đồng bào miền Trung",
      status: "ONGOING",
      targetAmount: 1000000000,
      currentAmount: 750000000,
      startDate: "2024-03-01T00:00:00Z",
      endDate: "2024-04-01T00:00:00Z",
    },
    {
      id: "2",
      title: "Xây dựng trường học vùng cao",
      status: "COMPLETED",
      targetAmount: 500000000,
      currentAmount: 500000000,
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-02-01T00:00:00Z",
    },
  ],
}

// Mock user data - có thể lấy từ useSession() sau này
const mockUser = {
  role: "CHARITY",
}

export default function CharityDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const isAdmin = mockUser.role === "ADMIN"

  return (
    <div className="h-full overflow-auto bg-gray-50/50 p-6">
      {/* Header với background gradient */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-white to-gray-50 p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-start gap-6">
          {/* Avatar với kích thước cố định và căn chỉnh */}
          <div className="relative h-[172px] w-[172px] shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200">
            <Image
              src={mockCharity.avatar}
              alt={mockCharity.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-h-[150px] flex flex-col justify-between">
            {/* Title section */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
                    {mockCharity.title}
                  </h1>
                  <Badge
                    className={`${getVerificationStatusStyle(
                      mockCharity.verificationStatus
                    )} shadow-sm`}
                  >
                    {getVerificationStatusLabel(mockCharity.verificationStatus)}
                  </Badge>
                </div>

                {/* Admin buttons */}
                {isAdmin && mockCharity.verificationStatus === "PENDING" && (
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all hover:from-green-600 hover:to-emerald-700"
                    >
                      <Check className="mr-2 size-4" />
                      Xác thực
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-gradient-to-r from-red-500 to-rose-600 transition-all hover:from-red-600 hover:to-rose-700"
                    >
                      <XCircle className="mr-2 size-4" />
                      Buộc dừng
                    </Button>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mb-4 max-w-2xl text-gray-600">{mockCharity.description}</p>
            </div>

            {/* Stats section - luôn ở dưới cùng */}
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100">
                <div className="font-medium text-gray-900">{mockCharity.campaignCount}</div>
                <div className="text-sm text-gray-600">Chiến dịch</div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100">
                <div className="font-medium text-gray-900">
                  {formatAmount(mockCharity.totalRaised)} VNĐ
                </div>
                <div className="text-sm text-gray-600">Đã quyên góp</div>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <div className="font-medium text-gray-900">{mockCharity.rating}/5</div>
                <div className="ml-1 text-sm text-gray-600">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Row 1: Info Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card className="h-[calc(50%-12px)] overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-sm ring-1 ring-gray-100">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Thông tin liên hệ</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Địa chỉ</div>
                      <div>{mockCharity.address}, {mockCharity.ward}, {mockCharity.district}, {mockCharity.province}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 size-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div>{mockCharity.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 size-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Điện thoại</div>
                      <div>{mockCharity.phone}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info Card */}
            <Card className="h-[calc(50%-12px)] overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-sm ring-1 ring-gray-100">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Thông tin tổ chức</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Ngày thành lập</div>
                    <div>{formatDate(mockCharity.foundingDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Website</div>
                    <a href={mockCharity.website} target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline">
                      {mockCharity.website}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Mạng xã h���i</div>
                    <div className="flex gap-4">
                      {Object.entries(mockCharity.socialLinks).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                           className="text-muted-foreground hover:text-primary">
                          {platform === 'facebook' && <Facebook className="h-5 w-5" />}
                          {platform === 'twitter' && <Twitter className="h-5 w-5" />}
                          {platform === 'youtube' && <Youtube className="h-5 w-5" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - License Card */}
          <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-sm ring-1 ring-gray-100">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Giấy phép hoạt động</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Số giấy phép</div>
                    <div>{mockCharity.licenseNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Ngày cấp</div>
                    <div>{formatDate(mockCharity.licenseDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Cơ quan cấp</div>
                    <div>{mockCharity.licenseIssuer}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Mô tả</div>
                    <div>{mockCharity.licenseDescription}</div>
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
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

        {/* Row 2: Campaigns Table */}
        <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-sm ring-1 ring-gray-100">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Danh sách chiến dịch</h2>
            <div className="rounded-lg border border-gray-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="text-gray-600">Tên chiến dịch</TableHead>
                    <TableHead className="text-gray-600">Trạng thái</TableHead>
                    <TableHead className="text-gray-600">Mục tiêu</TableHead>
                    <TableHead className="text-gray-600">Đã quyên góp</TableHead>
                    <TableHead className="text-gray-600">Thời gian</TableHead>
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
                      <TableCell>
                        {formatAmount(campaign.targetAmount)} VNĐ
                      </TableCell>
                      <TableCell>
                        {formatAmount(campaign.currentAmount)} VNĐ
                      </TableCell>
                      <TableCell>
                        <div>{formatDate(campaign.startDate)}</div>
                        <div>{formatDate(campaign.endDate)}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
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

function getVerificationStatusStyle(status: string) {
  switch (status) {
    case "VERIFIED":
      return "bg-green-100 text-green-800 border-green-200"
    case "REJECTED":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
  }
}

function getVerificationStatusLabel(status: string) {
  switch (status) {
    case "VERIFIED":
      return "Đã xác thực"
    case "REJECTED":
      return "Đã từ chối"
    default:
      return "Chờ xác thực"
  }
}
