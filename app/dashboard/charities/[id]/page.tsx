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
    <div className="h-full overflow-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-start gap-6">
        <div className="relative size-32 overflow-hidden rounded-lg">
          <Image
            src={mockCharity.avatar}
            alt={mockCharity.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{mockCharity.title}</h1>
              <Badge
                className={getVerificationStatusStyle(
                  mockCharity.verificationStatus
                )}
              >
                {getVerificationStatusLabel(mockCharity.verificationStatus)}
              </Badge>
            </div>

            {/* Thêm 2 nút cho ADMIN khi tổ chức đang ở trạng thái PENDING */}
            {isAdmin && mockCharity.verificationStatus === "PENDING" && (
              <div className="flex gap-3">
                <Button
                  variant="default"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    console.log("Verify charity:", params.id)
                  }}
                >
                  <Check className="mr-2 size-4" />
                  Xác thực
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    console.log("Reject charity:", params.id)
                  }}
                >
                  <XCircle className="mr-2 size-4" />
                  Buộc dừng
                </Button>
              </div>
            )}
          </div>
          <p className="mb-4 max-w-2xl text-muted-foreground">
            {mockCharity.description}
          </p>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-medium">{mockCharity.campaignCount}</div>
              <div className="text-muted-foreground">Chiến dịch</div>
            </div>
            <div>
              <div className="font-medium">
                {formatAmount(mockCharity.totalRaised)} VNĐ
              </div>
              <div className="text-muted-foreground">Đã quyên góp</div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-primary text-primary" />
              <div className="font-medium">{mockCharity.rating}/5</div>
              <div className="ml-1 text-muted-foreground">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết và giấy phép */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        {/* Thông tin liên hệ */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Thông tin liên hệ</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-2">
                <FileText className="mt-0.5 size-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Người đại diện</div>
                  <div>{mockCharity.representativeName}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Địa chỉ</div>
                  <div>
                    {mockCharity.address}, {mockCharity.ward},{" "}
                    {mockCharity.district}, {mockCharity.province}
                  </div>
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

        {/* Giấy phép hoạt động */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Giấy phép hoạt động</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">{mockCharity.licenseDescription}</div>
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

      {/* Danh sách chiến dịch */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Danh sách chiến dịch</h2>
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
