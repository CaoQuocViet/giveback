"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export default function CharityCampaignsPage() {
  const { data: session } = useSession()
  
  if (session?.user?.role !== 'CHARITY') {
    return <div>Không có quyền truy cập</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý chiến dịch</h1>
        <Link href="/dashboard/charity/campaigns/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm chiến dịch
          </Button>
        </Link>
      </div>

      <Table>
        {/* Giữ nguyên phần code bảng */}
      </Table>
    </div>
  )
} 