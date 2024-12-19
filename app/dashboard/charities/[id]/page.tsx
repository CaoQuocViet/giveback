"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import {
  Check,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
  XCircle,
  Youtube,
} from "lucide-react"

import { CharityDetailResponse } from "@/types/charity-detail"
import { formatAmount, formatDate } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import ImageModal from "@/components/image-modal"

const getCharityDetail = async (id: string): Promise<CharityDetailResponse> => {
  const token = Cookies.get("auth_token")
  if (!token) {
    throw new Error("No auth token found")
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/charities/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch charity detail")
  }
  return response.json()
}

export default function CharityDetailPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const { toast } = useToast()
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const queryClient = useQueryClient()

  // Kiểm tra role admin
  const isAdmin = user?.role === "ADMIN"

  const { data: charityResponse, isLoading } = useQuery({
    queryKey: ["charity", id],
    queryFn: () => getCharityDetail(id as string),
    enabled: !loading && isAuthenticated,
  })

  if (loading || isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please login to view this page</div>
  if (!charityResponse?.data) return <div>Charity not found</div>

  const charity = {
    ...charityResponse.data,
    campaigns: charityResponse.data.campaigns.map((campaign) => ({
      ...campaign,
      progress: (campaign.currentAmount / campaign.targetAmount) * 100,
    })),
    // Add user object to match interface
    user: {
      email: charityResponse.data.email,
      phone: charityResponse.data.phone,
      address: charityResponse.data.address,
      ward: charityResponse.data.ward,
      district: charityResponse.data.district,
      province: charityResponse.data.province,
      profileImage: charityResponse.data.avatar,
      fullName: charityResponse.data.title, // hoặc có thể để trống nếu không cần
    },
  }

  // Xác định trạng thái của các nút
  const showVerifyButton =
    isAdmin &&
    (charity.verificationStatus === "PENDING" ||
      charity.verificationStatus === "REJECTED")
  const showRejectButton =
    isAdmin &&
    (charity.verificationStatus === "PENDING" ||
      charity.verificationStatus === "VERIFIED")

  // Handlers cho các nút (tạm thời console.log)
  const handleVerify = async () => {
    try {
      const token = Cookies.get("auth_token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/charities/${id}/verify`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to verify charity")
      }

      toast({
        title: "Thành công",
        description: "Đã xác thực tổ chức thành công",
      })

      // Refresh data
      await queryClient.invalidateQueries(["charity", id])
    } catch (error) {
      console.error("Error verifying charity:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xác thực tổ chức. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async () => {
    try {
      const token = Cookies.get("auth_token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/charities/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to reject charity")
      }

      toast({
        title: "Thành công",
        description: "Đã từ chối xác thực tổ chức",
      })

      // Refresh data
      await queryClient.invalidateQueries(["charity", id])
    } catch (error) {
      console.error("Error rejecting charity:", error)
      toast({
        title: "Lỗi",
        description:
          error.message ||
          "Không thể từ chối xác thực tổ chức. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    }
  }

  const totalCampaigns = charity.campaigns.length
  const currentCampaigns = charity.campaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Kiểm tra và format địa chỉ
  const formatAddress = (user: any) => {
    const parts = []
    if (user?.address) parts.push(user.address)
    if (user?.ward) parts.push(user.ward)
    if (user?.district) parts.push(user.district)
    if (user?.province) parts.push(user.province)
    return parts.join(", ") || "Chưa cập nhật"
  }

  return (
    <div className="h-full overflow-auto bg-gray-50/50 p-6 dark:bg-gray-900">
      {/* Header với background gradient */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-black dark:ring-gray-700">
        <div className="flex items-start gap-6">
          {/* Avatar với kích thước cố định và căn chỉnh */}
          <div className="relative flex size-[172px] shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200 dark:ring-gray-700">
            <Image
              src={charity.user?.profileImage || "/placeholder.png"}
              alt={charity.title || "Charity"}
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex min-h-[150px] flex-1 flex-col justify-between">
            {/* Title section */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400">
                    {charity.title}
                  </h1>
                  <Badge
                    className={`${getVerificationStatusStyle(
                      charity.verificationStatus
                    )} shadow-sm`}
                  >
                    {getVerificationStatusLabel(charity.verificationStatus)}
                  </Badge>
                </div>

                {/* Admin buttons */}
                {isAdmin && (
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                      onClick={handleVerify}
                      disabled={!showVerifyButton}
                    >
                      <Check className="mr-2 size-4" />
                      Xác thực
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-gradient-to-r from-red-500 to-rose-600 transition-all hover:from-red-600 hover:to-rose-700 disabled:opacity-50"
                      onClick={handleReject}
                      disabled={!showRejectButton}
                    >
                      <XCircle className="mr-2 size-4" />
                      Buộc dừng
                    </Button>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mb-4 max-w-2xl text-gray-600 dark:text-gray-400">
                {charity.description}
              </p>
            </div>

            {/* Stats section - luôn ở dưới cùng */}
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {charity.statistics.totalCampaigns}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Chiến dịch
                </div>
              </div>
              <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {formatAmount(charity.statistics.totalRaised)} VNĐ
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Đã quyên góp
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {charity.rating}/5
                </div>
                <div className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  Đánh giá
                </div>
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
            <Card className="h-[calc(50%-12px)] overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 dark:bg-black dark:to-gray-900 dark:ring-gray-700">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-5 text-muted-foreground dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-gray-200">
                        Địa chỉ
                      </div>
                      <div className="dark:text-gray-400">
                        {formatAddress(charity.user)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 size-5 text-muted-foreground dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-gray-200">
                        Email
                      </div>
                      <div className="dark:text-gray-400">
                        {charity.user?.email || "Chưa cập nhật"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 size-5 text-muted-foreground dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-gray-200">
                        Điện thoại
                      </div>
                      <div className="dark:text-gray-400">
                        {charity.user?.phone || "Chưa cập nhật"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info Card */}
            <Card className="h-[calc(50%-12px)] overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 dark:bg-black dark:to-gray-900 dark:ring-gray-700">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Thông tin tổ chức
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Ngày thành lập
                    </div>
                    <div className="dark:text-gray-300">
                      {charity.foundingDate
                        ? formatDate(charity.foundingDate)
                        : "Chưa cập nhật"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Website
                    </div>
                    {charity.website ? (
                      <a
                        href={charity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline dark:text-gray-300"
                      >
                        {charity.website}
                      </a>
                    ) : (
                      <div className="dark:text-gray-300">Chưa cập nhật</div>
                    )}
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Mạng xã hội
                    </div>
                    <div className="flex gap-4 dark:text-gray-300">
                      {charity.socialLinks?.facebook && (
                        <a
                          href={charity.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary dark:text-gray-300"
                        >
                          <Facebook className="size-5" />
                        </a>
                      )}
                      {charity.socialLinks?.twitter && (
                        <a
                          href={charity.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary dark:text-gray-300"
                        >
                          <Twitter className="size-5" />
                        </a>
                      )}
                      {charity.socialLinks?.youtube && (
                        <a
                          href={charity.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary dark:text-gray-300"
                        >
                          <Youtube className="size-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - License Card */}
          <Card className="h-full overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 dark:bg-black dark:to-gray-900 dark:ring-gray-700">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Giấy phép hoạt động
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Số giấy phép
                    </div>
                    <div className="dark:text-gray-300">
                      {charity.licenseNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Ngày cấp
                    </div>
                    <div className="dark:text-gray-300">
                      {formatDate(charity.licenseDate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Cơ quan cấp
                    </div>
                    <div className="dark:text-gray-300">
                      {charity.licenseIssuer}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Mô tả
                    </div>
                    <div className="dark:text-gray-300">
                      {charity.licenseDescription}
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={charity.licenseImageUrl || "/placeholder.png"}
                    alt="Giấy phép hoạt động"
                    fill
                    className="cursor-pointer object-cover transition-opacity hover:opacity-90"
                    onClick={() => setShowLicenseModal(true)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Campaigns Table */}
        <Card className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 dark:bg-black dark:ring-gray-700">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Danh sách chiến dịch
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-900">
                    <TableHead className="text-gray-600 dark:text-gray-400">
                      Tên chiến dịch
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">
                      Trạng thái
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">
                      Mục tiêu
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">
                      Đã quyên góp
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400">
                      Thời gian
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCampaigns.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className="dark:border-gray-700"
                    >
                      <TableCell className="dark:text-gray-300">
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="dark:text-primary-400 text-primary hover:underline"
                        >
                          {campaign.title}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        <Badge
                          variant="secondary"
                          className="dark:bg-gray-700 dark:text-gray-300"
                        >
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

      {/* Thêm Modal */}
      {showLicenseModal && (
        <ImageModal
          imageUrl={charity.licenseImageUrl || "/placeholder.png"}
          onClose={() => setShowLicenseModal(false)}
        />
      )}
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
