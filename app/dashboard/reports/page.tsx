"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, DollarSign, Package } from "lucide-react"

interface Stats {
  campaignCount: number
  charityCount: number
  donorCount: number
  distributionCount: number
}

export default function ReportsPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats>({
    campaignCount: 0,
    charityCount: 0,
    donorCount: 0,
    distributionCount: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/reports/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }
    fetchStats()
  }, [])

  const reportTypes = [
    {
      title: "Báo cáo chiến dịch",
      description: "Thống kê về các chiến dịch và tiến độ thực hiện",
      icon: FileText,
      type: "campaign",
      count: stats?.campaignCount || 0,
      color: "bg-blue-800 hover:bg-blue-900" // Màu xanh dương nhẹ
    },
    {
      title: "Báo cáo tổ chức",
      description: "Thống kê hoạt động của các tổ chức từ thiện",
      icon: Users,
      type: "charity",
      count: stats?.charityCount || 0,
      color: "bg-emerald-800 hover:bg-emerald-900" // Màu xanh lá cây nhẹ
    },
    {
      title: "Báo cáo đóng góp",
      description: "Thống kê các khoản đóng góp theo thời gian",
      icon: DollarSign,
      type: "donation",
      count: stats?.donorCount || 0,
      color: "bg-violet-800 hover:bg-violet-900" // Màu tím nhẹ
    },
    {
      title: "Báo cáo hỗ trợ", 
      description: "Thống kê các đợt phân phối hỗ trợ",
      icon: Package,
      type: "distribution",
      count: stats?.distributionCount || 0,
      color: "bg-rose-800 hover:bg-rose-900" // Màu hồng nhẹ
    }
  ]

  const handleGenerateReport = async (type: string) => {
    try {
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type,
          format: "pdf"
        })
      })
      
      if (res.ok) {
        const data = await res.json()
        window.open(data.fileUrl, "_blank")
      }
    } catch (error) {
      console.error("Failed to generate report:", error)
    }
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
                <span className="text-4xl font-bold text-gray-800">{report.count}</span>
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
                  onClick={() => handleGenerateReport(report.type)}
                >
                  Xuất PDF
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-2 hover:bg-gray-50"
                  onClick={() => handleGenerateReport(report.type + '_excel')}
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