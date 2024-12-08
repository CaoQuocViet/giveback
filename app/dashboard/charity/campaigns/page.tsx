"use client"

import Link from "next/link"
import { Button } from "@mui/material"
import { Edit, Plus, Heart, DollarSign } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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

// Mock data - sẽ được thay thế bằng API call
const mockCampaigns = [
  {
    id: "1",
    title: "Hỗ trợ đồng bào miền Trung",
    status: "STARTING",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    updatedAt: "2024-02-28",
  },
  {
    id: "2",
    title: "Hỗ trợ đồng bào miền Trung",
    status: "ONGOING",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    updatedAt: "2024-02-28",
  },
  {
    id: "3",
    title: "Hỗ trợ đồng bào miền Trung",
    status: "CLOSED",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    updatedAt: "2024-02-28",
  },
  {
    id: "4",
    title: "Hỗ trợ đồng bào miền Trung",
    status: "COMPLETED",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    updatedAt: "2024-02-28",
  },
]

export default function CharityCampaignsPage() {
  const { data: session } = useSession()
  const [selectedCampaign, setSelectedCampaign] = useState<string>("")

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý chiến dịch</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outlined" startIcon={<Heart />}>
                Tạo khoản cứu trợ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo khoản cứu trợ mới</DialogTitle>
              </DialogHeader>
              <CreateDistributionForm campaigns={mockCampaigns} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outlined" startIcon={<DollarSign />}>
                Tạo khoản đóng góp
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo khoản đóng góp mới</DialogTitle>
              </DialogHeader>
              <CreateDonationForm campaigns={mockCampaigns} />
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
          {mockCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.title}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(campaign.status)}>
                  {getStatusLabel(campaign.status)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(campaign.startDate)}</TableCell>
              <TableCell>{formatDate(campaign.endDate)}</TableCell>
              <TableCell>{formatDate(campaign.updatedAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>
                    <Button variant="contained" size="small" color="primary">
                      Xem chi tiết
                    </Button>
                  </Link>

                  {campaign.status !== "COMPLETED" && (
                    <Link
                      href={`/dashboard/charity/campaigns/${campaign.id}/edit`}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                      >
                        Sửa
                      </Button>
                    </Link>
                  )}

                  {campaign.status === "STARTING" && (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        // Thêm xử lý xóa ở đây
                        console.log("Xóa chiến dịch:", campaign.id)
                      }}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

function getStatusVariant(status: string) {
  switch (status) {
    case "STARTING":
      return "secondary"
    case "ONGOING":
      return "default"
    case "CLOSED":
      return "warning"
    case "COMPLETED":
      return "success"
    default:
      return "default"
  }
}
