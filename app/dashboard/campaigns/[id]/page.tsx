"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import Cookies from "js-cookie"
import {
  DollarSign,
  Edit,
  FileText,
  MapPin,
  Share2,
  Star,
  Trash,
  Users,
} from "lucide-react"
import { marked } from "marked"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import {
  FaHeart,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa"

import { formatAmount, formatDate } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DonateButton } from "@/components/campaigns/donate-button"
import { CampaignStatement } from "@/components/donations/campaign-statement"
import { CommentList } from "@/components/reports/comment-list"

interface Comment {
  id: string
  user: {
    name: string
    role: string
    avatar: string
  }
  content: string
  rating: number
  created_at: string
}

interface CampaignDonation {
  id: string
  donor: {
    name: string
    role: string
    avatar: string | null
  }
  amount: number
  message: string | null
  payment_method: string
  invoice_code: string | null
  transaction_id: string | null
  status: "PENDING" | "SUCCESS" | "FAILED"
  created_at: string
  is_anonymous: boolean
}

// Cập nhật interface theo database schema
interface Campaign {
  id: string
  title: string
  description: string
  detailGoal: string
  status: "STARTING" | "ONGOING" | "CLOSED" | "COMPLETED"
  images: string
  timeline: {
    start_date: string
    end_date: string
  }
  location: {
    address: string
    ward: string
    district: string
    province: string
  }
  budget: {
    target: number
    current: number
    total_distributed: number
  }
  rating: number
  charity: {
    name: string
    representative: string
  }
  shareUrl: string
  distributions: Array<{
    title: string
    description: string
    relief_date: string
    budget: number
    beneficiary_count: number
    location: {
      address: string
      ward: string
      district: string
      province: string
    }
  }>
  comments: Comment[]
  donations: CampaignDonation[]
}

// Thêm hàm helper để xử lý markdown an toàn
const renderMarkdown = (content: string | null | undefined) => {
  if (!content) return ""
  return marked(content)
}

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { user, isAuthenticated } = useAuth()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState({
    content: "",
    rating: 0,
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      try {
        setLoading(true)
        const token = Cookies.get("auth_token")

        if (!token) {
          console.error("No auth token found")
          return
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/detail/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (response.data.success) {
          setCampaign(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching campaign detail:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCampaignDetail()
    }
  }, [params.id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để bình luận.")
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const token = Cookies.get("auth_token")
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/${params.id}/comments`,
        {
          content: newComment.content,
          rating: newComment.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // Append the new comment to the campaign's comments
      setCampaign((prev) =>
        prev
          ? { ...prev, comments: [response.data.data, ...prev.comments] }
          : prev
      )
      setNewComment({ content: "", rating: 0 })
    } catch (err: any) {
      console.error("Error submitting comment:", err)
      setError(err.response?.data?.message || "Lỗi khi gửi bình luận.")
    } finally {
      setSubmitting(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  if (loading) return <div>Loading...</div>
  if (!campaign) return <div>Campaign not found</div>

  const progress = (campaign.budget.current / campaign.budget.target) * 100

  const isOwner = user?.role === "CHARITY" && campaign.charity.representative
  const canEdit =
    isOwner && ["STARTING", "ONGOING", "CLOSED"].includes(campaign.status)
  const canDelete = isOwner && campaign.status === "STARTING"

  return (
    <div className="h-full overflow-auto bg-gray-50/50 p-6 dark:bg-gray-900">
      {/* Header section */}
      <div
        className="mb-6 rounded-xl bg-gradient-to-r from-white to-gray-50 p-6 shadow-sm ring-1 ring-gray-100
        dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700"
      >
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

      {/* Basic Info Section - Grid with equal height */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        {/* Left side - Basic info */}
        <Card className="md:col-span-2">
          <CardContent className="flex h-full flex-col p-6">
            <div className="grid h-full gap-6 md:grid-cols-2">
              {/* Ảnh minh họa */}
              <div className="relative h-full overflow-hidden rounded-lg">
                <Image
                  src={campaign.images}
                  alt={campaign.title}
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>

              {/* Thông tin bên phải */}
              <div className="flex h-full flex-col justify-between space-y-4">
                {/* Thời gian */}
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-4 ${
                          star <= campaign.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">
                    {campaign.rating.toFixed(1)}
                  </span>
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
                    {formatAmount(campaign.budget.total_distributed)} /{" "}
                    {formatAmount(campaign.budget.current)} VNĐ
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${
                        (campaign.budget.total_distributed /
                          campaign.budget.current) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                {campaign.status === "ONGOING" && user?.role === "DONOR" && (
                  <DonateButton
                    campaignId={campaign.id}
                    campaignTitle={campaign.title}
                    minAmount={10000}
                  />
                )}

                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={toggleDropdown}
                    >
                      <FileText className="mr-2 size-4" />
                      Sao kê
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="bg-green-800 text-white hover:bg-green-900"
                      onClick={() => handleExportExcel(campaign)}
                    >
                      Tải Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="bg-orange-600 text-white hover:bg-orange-700"
                      onClick={() => handleExportPDF(campaign)}
                    >
                      Tải PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (campaign.shareUrl) {
                      navigator.clipboard
                        .writeText(campaign.shareUrl)
                        .then(() => {
                          toast.success("Link đã được sao chép vào clipboard!")
                        })
                        .catch((err) => {
                          console.error("Failed to copy: ", err)
                          toast.error("Failed to copy link.")
                        })
                    } else {
                      toast.error("No link available to copy.")
                    }
                  }}
                >
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
            <TabsList className="dark:bg-gray-700">
              <TabsTrigger
                value="description"
                className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600"
              >
                Mô tả
              </TabsTrigger>
              <TabsTrigger
                value="plan"
                className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600"
              >
                Kế hoạch chi tiết
              </TabsTrigger>
              <TabsTrigger
                value="donations"
                className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600"
              >
                Danh sách đóng góp
              </TabsTrigger>
              <TabsTrigger
                value="distributions"
                className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600"
              >
                Phân phối cứu trợ
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="dark:text-gray-300 dark:data-[state=active]:bg-gray-600"
              >
                Đánh giá
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Card className="dark:border-gray-700 dark:bg-black">
                <CardContent className="prose max-w-none pt-6 dark:prose-invert">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(campaign.description),
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="plan">
              <Card className="dark:border-gray-700 dark:bg-black">
                <CardContent className="prose max-w-none pt-6 dark:prose-invert">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(campaign.detailGoal),
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="donations">
              <Card>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {campaign.donations.map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-start space-x-4 rounded-lg border p-4"
                      >
                        <div className="relative size-10 shrink-0">
                          {donation.is_anonymous ? (
                            <div className="flex size-full items-center justify-center rounded-full bg-secondary">
                              <Users className="size-5" />
                            </div>
                          ) : donation.donor.avatar ? (
                            <Image
                              src={donation.donor.avatar}
                              alt={donation.donor.name}
                              width={200}
                              height={200}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center rounded-full bg-secondary">
                              <Users className="size-5" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">
                              {donation.is_anonymous
                                ? "Ẩn danh"
                                : donation.donor.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(donation.created_at)}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                donation.status === "SUCCESS"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {formatAmount(donation.amount)} VNĐ
                            </Badge>
                            <Badge variant="outline">
                              {donation.payment_method}
                            </Badge>
                          </div>

                          {donation.message && (
                            <p className="text-sm text-muted-foreground">
                              {donation.message}
                            </p>
                          )}

                          {donation.status === "SUCCESS" &&
                            donation.transaction_id && (
                              <div className="text-xs text-muted-foreground">
                                Mã giao dịch: {donation.transaction_id}
                              </div>
                            )}
                          {donation.invoice_code && (
                            <div className="text-xs text-muted-foreground">
                              Mã hóa đơn: {donation.invoice_code}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            ;
            <TabsContent value="distributions">
              <Card className="rounded-lg bg-white shadow-lg dark:bg-black">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {campaign.distributions.map((dist, index) => (
                      <div
                        key={index}
                        className="space-y-6 border-b pb-6 last:border-none"
                      >
                        {/* Header Title */}
                        <div className="flex items-center space-x-3 text-red-500">
                          <FaHeart className="text-2xl text-red-500" />{" "}
                          {/* Icon Cứu trợ */}
                          <h3 className="text-back text-xl font-bold dark:text-white">
                            Cứu trợ - {dist.title}
                          </h3>
                        </div>

                        {/* Mô tả */}
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          {dist.description}
                        </p>

                        {/* Grid thông tin */}
                        <div className="grid gap-6 sm:grid-cols-2">
                          {/* Ngân sách và Số người hưởng lợi chung */}
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-3">
                              <FaMoneyBillWave className="text-lg text-green-500" />
                              <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Ngân sách: {formatAmount(dist.budget)} VND
                              </span>
                            </div>

                            <div className="flex items-center space-x-3">
                              <FaUsers className="text-lg text-blue-500" />
                              <span className="font-semibold text-gray-700 dark:text-gray-300">
                                Số người hưởng lợi: {dist.beneficiary_count}{" "}
                                người
                              </span>
                            </div>
                          </div>

                          {/* Địa điểm */}
                          <div className="flex flex-col space-y-4">
                            <div className="flex items-start space-x-3 text-red-500">
                              <FaMapMarkerAlt className="text-lg text-red-500" />
                              <div className="text-gray-700 dark:text-gray-300">
                                <p>{dist.location.address}</p>
                                <p>
                                  {dist.location.ward}, {dist.location.district}
                                  , {dist.location.province}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider giữa các khoản cứu trợ */}
                        {index < campaign.distributions.length - 1 && (
                          <div className="mt-6 border-t"></div> // Đường ngăn cách giữa các khoản cứu trợ
                        )}
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
                  <form
                    onSubmit={handleCommentSubmit}
                    className="mb-6 space-y-4"
                  >
                    <div className="space-y-2">
                      <Label>Đánh giá</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setNewComment({
                                ...newComment,
                                rating: Number(star),
                              })
                            }
                            className={
                              star <= newComment.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            <Star className="size-5 fill-current" />
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
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            content: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Gửi..." : "Gửi bình luận"}
                    </Button>
                  </form>

                  <CommentList comments={campaign.comments} />
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

// Function to handle Excel export
const handleExportExcel = (campaign: any) => {
  CampaignStatement.exportExcel(campaign)
}

// Function to handle PDF export
const handleExportPDF = (campaign: any) => {
  CampaignStatement.exportPDF(campaign)
}
