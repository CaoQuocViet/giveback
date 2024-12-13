"use client"

import { useState } from "react"
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
import { Pagination } from "@/components/ui/pagination"

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Số dòng trong bảng

  const totalCampaigns = mockCharity.campaigns.length
  const currentCampaigns = mockCharity.campaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="h-full overflow-auto bg-gray-50/50 dark:bg-gray-900 p-6">
      {/* Header với background gradient */}
      <div className="mb-6 rounded-xl bg-white dark:bg-black p-6 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
        <div className="flex items-start gap-6">
          {/* Avatar với kích thước cố định và căn chỉnh */}
          <div className="relative h-[172px] w-[172px] shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200 dark:ring-gray-700">
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
                  <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-2xl font-bold text-transparent">
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
                      Buộc dỡng
                    </Button>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mb-4 max-w-2xl text-gray-600 dark:text-gray-400">{mockCharity.description}</p>
            </div>

            {/* Stats section - luôn ở dưới cùng */}
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
                <div className="font-medium text-gray-900 dark:text-gray-100">{mockCharity.campaignCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Chiến dịch</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {formatAmount(mockCharity.totalRaised)} VNĐ
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Đã quyên góp</div>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-white dark:bg-gray-800 p-3 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <div className="font-medium text-gray-900 dark:text-gray-100">{mockCharity.rating}/5</div>
                <div className="ml-1 text-sm text-gray-600 dark:text-gray-400">Đánh giá</div>
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
            <Card className="h-[calc(50%-12px)] overflow-hidden bg-white dark:bg-black dark:to-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Thông tin liên hệ</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-5 text-muted-foreground dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-gray-200">Địa chỉ</div>
                      <div className="dark:text-gray-400">{mockCharity.address}, {mockCharity.ward}, {mockCharity.district}, {mockCharity.province}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 size-5 text-muted-foreground dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-gray-200">Email</div>
                      <div className="dark:text-gray-400">{mockCharity.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 size-5 text-muted-foreground dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-gray-200">Điện thoại</div>
                      <div className="dark:text-gray-400">{mockCharity.phone}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info Card */}
            <Card className="h-[calc(50%-12px)] overflow-hidden bg-white dark:bg-black dark:to-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Thông tin tổ chức</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Ngày thành lập</div>
                    <div className="dark:text-gray-300">{formatDate(mockCharity.foundingDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Website</div>
                    <a href={mockCharity.website} target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline dark:text-gray-300">
                      {mockCharity.website}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400 mb-2">Mạng xã hội</div>
                    <div className="flex gap-4 dark:text-gray-300">
                      {Object.entries(mockCharity.socialLinks).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                           className="text-muted-foreground hover:text-primary dark:text-gray-300">
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
          <Card className="h-full overflow-hidden bg-white dark:bg-black dark:to-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Giấy phép hoạt động</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Số giấy phép</div>
                    <div className="dark:text-gray-300">{mockCharity.licenseNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Ngày cấp</div>
                    <div className="dark:text-gray-300">{formatDate(mockCharity.licenseDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Cơ quan cấp</div>
                    <div className="dark:text-gray-300">{mockCharity.licenseIssuer}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Mô tả</div>
                    <div className="dark:text-gray-300">{mockCharity.licenseDescription}</div>
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
        <Card className="overflow-hidden bg-white dark:bg-black shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Danh sách chiến dịch</h2>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-900">
                    <TableHead className="text-gray-600 dark:text-gray-400">Tên chiến dịch</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">Trạng thái</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">Mục tiêu</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">Đã quyên góp</TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">Thời gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCampaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="dark:border-gray-700">
                      <TableCell className="dark:text-gray-300">
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="text-primary hover:underline dark:text-primary-400"
                        >
                          {campaign.title}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {getStatusLabel(campaign.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {formatAmount(campaign.targetAmount)} VNĐ
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {formatAmount(campaign.currentAmount)} VNĐ
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <div>{formatDate(campaign.startDate)}</div>
                        <div>{formatDate(campaign.endDate)}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalCampaigns > itemsPerPage && (
              <div className="mt-4">
                <Pagination
                  total={totalCampaigns}
                  page={currentPage}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  className="dark:text-gray-300"
                />
              </div>
            )}
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