"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@mui/material"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import Cookies from "js-cookie"
import { DollarSign, Edit, Heart, Plus } from "lucide-react"

import {
  CharityCampaign,
  CharityCampaignResponse,
} from "@/types/charity-campaigns"
import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreateDistributionForm } from "@/components/campaigns/create-distribution-form"
import { CreateDonationForm } from "@/components/campaigns/create-donation-form"

export default function CharityCampaigns() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const [campaigns, setCampaigns] = useState<CharityCampaign[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }

      if (user?.role !== "CHARITY") {
        router.push("/auth/login")
        return
      }

      fetchCampaigns()
    }
  }, [loading, isAuthenticated, user])

  const fetchCampaigns = async () => {
    try {
      const token = Cookies.get("auth_token")
      if (!token) {
        throw new Error("Vui lòng đăng nhập")
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/charity/campaigns`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      const result: CharityCampaignResponse = await response.json()

      if (!response.ok) throw new Error(result.message || "Có lỗi xảy ra")

      setCampaigns(result.data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa chiến dịch này?")) return

    try {
      const token = Cookies.get("auth_token")
      if (!token) {
        throw new Error("Vui lòng đăng nhập")
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/charity/campaigns/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      const result = await response.json()

      if (!response.ok) throw new Error(result.message)

      fetchCampaigns()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Chưa cập nhật"
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        return "Không hợp lệ"
      }
      return format(date, "dd/MM/yyyy", { locale: vi })
    } catch (err) {
      console.error("Error formatting date:", dateStr, err)
      return "Không hợp lệ"
    }
  }

  const getStatusText = (status: CharityCampaign["status"]) => {
    const statusMap = {
      STARTING: "Khởi động",
      ONGOING: "Đang diễn ra",
      CLOSED: "Đã đóng",
      COMPLETED: "Đã kết thúc",
    }
    return statusMap[status]
  }

  const getStatusVariant = (status: CharityCampaign["status"]) => {
    const variantMap = {
      STARTING: "default",
      ONGOING: "success",
      CLOSED: "warning",
      COMPLETED: "destructive",
    }
    return variantMap[status]
  }

  if (isLoading) return <div>Đang tải...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý chiến dịch</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outlined"
                className="bg-none hover:bg-blue-500 hover:text-white"
                startIcon={<Heart />}
              >
                Tạo khoản cứu trợ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo khoản cứu trợ mới</DialogTitle>
              </DialogHeader>
              <CreateDistributionForm campaigns={campaigns} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outlined"
                className="bg-none hover:bg-blue-500 hover:text-white"
                startIcon={<DollarSign />}
              >
                Tạo khoản đóng góp
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo khoản đóng góp mới</DialogTitle>
              </DialogHeader>
              <CreateDonationForm campaigns={campaigns} />
            </DialogContent>
          </Dialog>

          <Link href="/dashboard/charity/campaigns/new">
            <Button variant="contained" startIcon={<Plus />}>
              Thêm chiến dịch
            </Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên chiến dịch</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày bắt đầu</TableHead>
            <TableHead>Ngày kết thúc</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.title}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(campaign.status)}>
                  {getStatusText(campaign.status)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(campaign.startDate)}</TableCell>
              <TableCell>{formatDate(campaign.endDate)}</TableCell>
              <TableCell>{formatDate(campaign.updatedAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className="dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                    >
                      Xem chi tiết
                    </Button>
                  </Link>

                  {campaign.status !== "COMPLETED" ? (
                    <Link
                      href={`/dashboard/charity/campaigns/${campaign.id}/edit`}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                        className="dark:disabled:border-gray-700 dark:disabled:text-gray-500"
                      >
                        Sửa
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit />}
                      disabled
                      className="dark:disabled:border-gray-700 dark:disabled:text-gray-500"
                    >
                      Sửa
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(campaign.id)}
                    disabled={campaign.status !== "STARTING"}
                    className="dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  >
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
