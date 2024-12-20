"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { DollarSign, FileText, Package, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Tạo axios instance với default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Add token vào header cho mọi request
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState({
    campaign: { count: 0, data: [] },
    charity: { count: 0, data: [] },
    donation: { count: 0, data: [] },
    distribution: { count: 0, data: [] },
  })

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const [campaignRes, charityRes, donationRes, distributionRes] =
          await Promise.all([
            api.get("/api/reports/campaign"),
            api.get("/api/reports/charity"),
            api.get("/api/reports/donation"),
            api.get("/api/reports/distribution"),
          ])

        // Tính toán số liệu thống kê
        setReports({
          campaign: {
            count: campaignRes.data.data.length,
            data: campaignRes.data.data,
          },
          charity: {
            count: charityRes.data.data.filter(
              (c: any) => c.campaignCount > 0
            ).length,
            data: charityRes.data.data,
          },
          donation: {
            count: donationRes.data.data.filter(
              (d: any) => d.id !== "system_donor"
            ).length,
            data: donationRes.data.data,
          },
          distribution: {
            count: distributionRes.data.data.reduce(
              (total: any, campaign: any) =>
                total + campaign.distributions.length,
              0
            ),
            data: distributionRes.data.data,
          },
        })
      } catch (error) {
        console.error("Error fetching reports:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const reportTypes = [
    {
      title: "Báo cáo chiến dịch",
      description: "Thống kê về các chiến dịch và tiến độ thực hiện",
      icon: FileText,
      type: "campaign",
      count: reports.campaign.count,
      color: "bg-blue-500",
    },
    {
      title: "Báo cáo tổ chức",
      description: "Thống kê hoạt động của các tổ chức từ thiện",
      icon: Users,
      type: "charity",
      count: reports.charity.count,
      color: "bg-blue-500",
    },
    {
      title: "Báo cáo đóng góp",
      description: "Thống kê các khoản đóng góp theo thời gian",
      icon: DollarSign,
      type: "donation",
      count: reports.donation.count,
      color: "bg-blue-500",
    },
    {
      title: "Báo cáo hỗ trợ",
      description: "Thống kê các đợt phân phối hỗ trợ",
      icon: Package,
      type: "distribution",
      count: reports.distribution.count,
      color: "bg-blue-500",
    },
  ]

  const handleExport = async (type: string, format: string) => {
    try {
      const token = Cookies.get("auth_token")
      const response = await api.get(`/api/reports/${type}/export`, {
        params: { format },
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Định nghĩa tên file theo loại báo cáo
      const fileNames = {
        campaign: "Bao_cao_chien_dich",
        charity: "Bao_cao_to_chuc",
        donation: "Bao_cao_dong_gop",
        distribution: "Bao_cao_ho_tro",
      }

      // Tạo và tải file
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute(
        "download",
        `${fileNames[type as keyof typeof fileNames]}_${new Date().toISOString().split("T")[0]}.${
          format === "excel" ? "xlsx" : "pdf"
        }`
      )
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)

      // Giải phóng URL
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(`Lỗi khi xuất báo cáo ${type}:`, error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Theo dõi báo cáo</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card
            key={report.type}
            className="border transition-all duration-200 hover:shadow-lg"
          >
            <CardHeader
              className={`flex flex-row items-center gap-4 ${report.color} rounded-t-lg text-white`}
            >
              <report.icon className="size-8" />
              <div>
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-sm text-white/90">{report.description}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold text-orange-500">
                  {report.count}
                </span>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
                  {report.type === "campaign" && "các chiến dịch"}
                  {report.type === "charity" && "các tổ chức có hoạt động"}
                  {report.type === "donation" && "những người đóng góp"}
                  {report.type === "distribution" && "các đợt hỗ trợ"}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-orange-700 text-white transition-all hover:bg-orange-700"
                  onClick={() => handleExport(report.type, "pdf")}
                >
                  Xuất PDF
                </Button>
                <Button
                  className="flex-1 bg-green-800 text-white transition-all hover:bg-green-900"
                  onClick={() => handleExport(report.type, "excel")}
                >
                  Xuất Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
