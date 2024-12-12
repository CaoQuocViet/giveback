"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, DollarSign, Package } from "lucide-react"
import axios from "axios"

interface CampaignReport {
  id: string
  title: string
  status: string
  totalReceived: number
  totalDistributed: number
  donorCount: number
  distributionCount: number
}

interface CharityReport {
  id: string
  title: string
  campaignCount: number
  totalFundraised: number
  totalDistributed: number
  averageRating: string
}

interface DonationReport {
  id: string
  fullName: string
  campaignCount: number
  totalDonated: number
  lastDonationDate: string
}

interface DistributionReport {
  campaignName: string
  distributions: any[]
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [campaignReport, setCampaignReport] = useState<CampaignReport[]>([])
  const [charityReport, setCharityReport] = useState<CharityReport[]>([])
  const [donationReport, setDonationReport] = useState<DonationReport[]>([])
  const [distributionReport, setDistributionReport] = useState<DistributionReport[]>([])

  const [stats, setStats] = useState({
    campaignCount: 0,
    charityCount: 0,
    donorCount: 0,
    distributionCount: 0
  })

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [campaignRes, charityRes, donationRes, distributionRes] = await Promise.all([
          axios.get('http://localhost:5000/api/reports/campaign'),
          axios.get('http://localhost:5000/api/reports/charity'),
          axios.get('http://localhost:5000/api/reports/donation'),
          axios.get('http://localhost:5000/api/reports/distribution')
        ])

        setCampaignReport(campaignRes.data)
        setCharityReport(charityRes.data)
        setDonationReport(donationRes.data)
        setDistributionReport(distributionRes.data)
      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  useEffect(() => {
    setStats({
      campaignCount: campaignReport.length,
      charityCount: charityReport.length,
      donorCount: donationReport.length,
      distributionCount: distributionReport.length
    })
  }, [campaignReport, charityReport, donationReport, distributionReport])

  const reportTypes = [
    {
      title: "Báo cáo chiến dịch",
      description: "Thống kê về các chiến dịch và tiến độ thực hiện",
      icon: FileText,
      type: "campaign",
      data: campaignReport,
      count: stats.campaignCount,
      color: "bg-blue-800 hover:bg-blue-900"
    },
    {
      title: "Báo cáo tổ chức",
      description: "Thống kê hoạt động của các tổ chức từ thiện",
      icon: Users,
      type: "charity",
      data: charityReport,
      count: stats.charityCount,
      color: "bg-emerald-800 hover:bg-emerald-900"
    },
    {
      title: "Báo cáo đóng góp",
      description: "Thống kê các khoản đóng góp theo thời gian",
      icon: DollarSign,
      type: "donation",
      data: donationReport,
      count: stats.donorCount,
      color: "bg-violet-800 hover:bg-violet-900"
    },
    {
      title: "Báo cáo hỗ trợ",
      description: "Thống kê các đợt phân phối hỗ trợ",
      icon: Package,
      type: "distribution",
      data: distributionReport,
      count: stats.distributionCount,
      color: "bg-rose-800 hover:bg-rose-900"
    }
  ]

  const handleExport = async (type: string, format: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reports/${type}/export`,
        {
          params: { format },
          responseType: "blob",
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute(
        "download",
        `${type}_report.${format === "excel" ? "xlsx" : "pdf"}`
      )
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    } catch (error) {
      console.error(`Error exporting ${type} report:`, error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Theo dõi báo cáo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card 
            key={report.type} 
            className="border hover:shadow-lg transition-all duration-200"
          >
            <CardHeader className={`flex flex-row items-center gap-4 ${report.color} text-white rounded-t-lg`}>
              <report.icon className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">{report.title}</h3>
                <p className="text-sm text-white/90">
                  {report.description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-800">{report.data.length}</span>
                <p className="text-sm text-gray-600 mt-1">
                  {report.type === 'campaign' && 'các chiến dịch'}
                  {report.type === 'charity' && 'các tổ chức'}
                  {report.type === 'donation' && 'những người đóng góp'}
                  {report.type === 'distribution' && 'các đợt hỗ trợ'}
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  className={`flex-1 ${report.color} hover:opacity-90`}
                  onClick={() => handleExport(report.type, 'pdf')}
                >
                  Xuất PDF
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-2 hover:bg-gray-50"
                  onClick={() => handleExport(report.type, 'excel')}
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
