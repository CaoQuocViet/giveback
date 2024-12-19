"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import html2pdf from "html2pdf.js"
import { FileSpreadsheet, FileText } from "lucide-react"
import * as XLSX from "xlsx"

import { DonationHistoryResponse } from "@/types/donation"
import apiClient from "@/lib/api-client"
import { Button } from "@/components/ui/button"

// Import font

import { DonationFilter } from "./donation-filter"
import { DonationList } from "./donation-list"

export function DonationHistory() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DonationHistoryResponse["data"] | null>(null)
  const [filter, setFilter] = useState({
    status: "all",
    dateRange: "all",
    campaign: "",
  })

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await apiClient.get<DonationHistoryResponse>(
          "/api/donor/donations"
        )
        setData(response.data)
      } catch (error) {
        console.error("Error fetching donations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  const handleExportExcel = () => {
    if (!data?.donations?.length) {
      console.log("No donations data to export")
      return
    }

    // Format data cho Excel
    const excelData = data.donations.map((donation) => ({
      "Mã đóng góp": donation.id,
      "Chiến dịch": donation.campaignTitle,
      "Tổ chức": donation.charityTitle,
      "Số tiền": new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(donation.amount),
      "Phương thức": donation.paymentMethod,
      "Trạng thái": donation.status === "SUCCESS" ? "Thành công" : "Thất bại",
      "Thời gian": new Date(donation.createdAt).toLocaleDateString("vi-VN"),
      "Ghi chú": donation.note || "",
    }))

    // Tạo workbook và worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(excelData)
    XLSX.utils.book_append_sheet(wb, ws, "Donations")

    // Xuất file
    XLSX.writeFile(wb, "donations.xlsx")
  }

  const handleExportPDF = () => {
    if (!data?.donations?.length) {
      console.log("No donations data to export")
      return
    }

    // Tạo nội dung HTML
    const content = `
    <div style="font-family: Arial, sans-serif; color: #000000;">
      <h1 style="text-align: center; margin-bottom: 20px; color: #000000;">Báo Cáo Đóng Góp</h1>
      ${data.donations
        .map(
          (donation, index) => `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #000000;">Đóng góp #${index + 1}</h2>
          <p style="color: #000000;">Mã đóng góp: ${donation.id}</p>
          <p style="color: #000000;">Chiến dịch: ${donation.campaignTitle}</p>
          <p style="color: #000000;">Tổ chức: ${donation.charityTitle}</p>
          <p style="color: #000000;">Số tiền: ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(donation.amount)}</p>
          <p style="color: #000000;">Phương thức: ${donation.paymentMethod}</p>
          <p style="color: #000000;">Trạng thái: ${
            donation.status === "SUCCESS" ? "Thành công" : "Thất bại"
          }</p>
          <p style="color: #000000;">Thời gian: ${new Date(
            donation.createdAt
          ).toLocaleDateString("vi-VN")}</p>
          <p style="color: #000000;">Ghi chú: ${donation.note || ""}</p>
        </div>
      `
        )
        .join("")}
    </div>
    `
    // Cấu hình PDF
    const opt = {
      margin: 1,
      filename: "donations.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    // Tạo PDF
    html2pdf().from(content).set(opt).save()
  }

  if (loading) {
    return <div>Đang tải...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lịch sử đóng góp</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-green-800 text-white hover:bg-green-900"
          >
            <FileSpreadsheet className="size-4" />
            Xuất Excel
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700"
          >
            <FileText className="size-4" />
            Xuất PDF
          </Button>
          <DonationFilter filter={filter} onChange={setFilter} />
        </div>
      </div>

      <DonationList donations={data?.donations || []} />
    </div>
  )
}
