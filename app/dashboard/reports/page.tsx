"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { DollarSign, FileText, Package, Users } from "lucide-react"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
  averageRating: number
}

interface DonationReport {
  id: string
  fullName: string
  campaignCount: number
  totalDonated: number
  lastDonationDate: string
}

interface Distribution {
  title: string
  budget: number
  beneficiaryCount: number
  reliefDate: string
  representativeName: string
  location: string
}

interface DistributionReport {
  campaignName: string
  distributions: Distribution[]
}

export default function ReportsPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const [campaignReport, setCampaignReport] = useState<CampaignReport[]>([])
  const [charityReport, setCharityReport] = useState<CharityReport[]>([])
  const [donationReport, setDonationReport] = useState<DonationReport[]>([])
  const [distributionReport, setDistributionReport] = useState<
    DistributionReport[]
  >([])

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports()
    }
  }, [isAuthenticated])

  const fetchReports = async () => {
    try {
      const token = Cookies.get("auth_token")
      if (!token) {
        console.error("No authentication token found.")
        return
      }
      const [campaignRes, charityRes, donationRes, distributionRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/reports/campaign", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/reports/charity", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/reports/donation", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/reports/distribution", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

      setCampaignReport(campaignRes.data.data)
      setCharityReport(charityRes.data.data)
      setDonationReport(donationRes.data.data)
      setDistributionReport(distributionRes.data.data)
      console.log(distributionRes.data.data)
    } catch (error) {
      console.error("Error fetching reports:", error)
    }
  }

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
      // Handle error (e.g., show notification)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>You are not authorized to view this page.</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Báo cáo Tổng Quan</h1>

      {/* Campaign Report */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Báo cáo theo chiến dịch</h2>
            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => handleExport("campaign", "pdf")}
              >
                Xuất PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("campaign", "excel")}
              >
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {campaignReport.length === 0 ? (
            <p>Chưa có dữ liệu báo cáo chiến dịch.</p>
          ) : (
            campaignReport.map((campaign) => (
              <div key={campaign.id} className="mb-4 p-4 border rounded">
                <h3 className="text-xl font-semibold">{campaign.title}</h3>
                <p>Trạng thái: {campaign.status}</p>
                <p>Tổng tiền đã nhận: {campaign.totalReceived}</p>
                <p>Tổng tiền đã cứu trợ: {campaign.totalDistributed}</p>
                <p>Số người đóng góp: {campaign.donorCount}</p>
                <p>Số đợt cứu trợ: {campaign.distributionCount}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Charity Report */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Báo cáo tổng hợp theo tổ chức</h2>
            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => handleExport("charity", "pdf")}
              >
                Xuất PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("charity", "excel")}
              >
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {charityReport.length === 0 ? (
            <p>Chưa có dữ liệu báo cáo tổ chức.</p>
          ) : (
            charityReport.map((charity) => {
              const rating = parseFloat(charity.averageRating).toFixed(1)
              return (
                <div key={charity.id} className="mb-4 p-4 border rounded">
                  <h3 className="text-xl font-semibold">{charity.title}</h3>
                  <p>Số chiến dịch đã tạo: {charity.campaignCount}</p>
                  <p>Tổng tiền đã gây quỹ: {charity.totalFundraised}</p>
                  <p>Tổng tiền đã cứu trợ: {charity.totalDistributed}</p>
                  <p>Đánh giá trung bình: {rating}</p>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      {/* Donation Report */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Báo cáo đóng góp</h2>
            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => handleExport("donation", "pdf")}
              >
                Xuất PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("donation", "excel")}
              >
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {donationReport.length === 0 ? (
            <p>Chưa có dữ liệu báo cáo đóng góp.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID cá nhân</th>
                  <th className="px-4 py-2">Tên người đóng góp</th>
                  <th className="px-4 py-2">Số chiến dịch đã tham gia</th>
                  <th className="px-4 py-2">Tổng số tiền đã đóng góp</th>
                  <th className="px-4 py-2">Thời gian đóng góp gần nhất</th>
                </tr>
              </thead>
              <tbody>
                {donationReport.map((donor) => (
                  <tr key={donor.id} className="text-center">
                    <td className="border px-4 py-2">{donor.id}</td>
                    <td className="border px-4 py-2">{donor.fullName}</td>
                    <td className="border px-4 py-2">{donor.campaignCount}</td>
                    <td className="border px-4 py-2">{donor.totalDonated}</td>
                    <td className="border px-4 py-2">
                      {new Date(donor.lastDonationDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Distribution Report */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Báo cáo hỗ trợ (Distribution)</h2>
            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => handleExport("distribution", "pdf")}
              >
                Xuất PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("distribution", "excel")}
              >
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {distributionReport.length === 0 ? (
            <p>Chưa có dữ liệu báo cáo hỗ trợ.</p>
          ) : (
            distributionReport.map((campaign, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Chiến dịch: {campaign.campaignName}
                </h3>
                {campaign.distributions.length === 0 ? (
                  <p>Không có đợt hỗ trợ nào cho chiến dịch này.</p>
                ) : (
                  <table className="min-w-full table-auto mb-4">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Tên khoản cứu trợ</th>
                        <th className="px-4 py-2">Người đại diện tổ chức</th>
                        <th className="px-4 py-2">Ngân sách đã sử dụng</th>
                        <th className="px-4 py-2">Số lượng người nhận</th>
                        <th className="px-4 py-2">Ngày cứu trợ</th>
                        <th className="px-4 py-2">Địa điểm thực hiện</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaign.distributions.map((distribution, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="border px-4 py-2">
                            {distribution.title}
                          </td>
                          <td className="border px-4 py-2">
                            {distribution.representativeName}
                          </td>
                          <td className="border px-4 py-2">
                            {distribution.budget}
                          </td>
                          <td className="border px-4 py-2">
                            {distribution.beneficiaryCount}
                          </td>
                          <td className="border px-4 py-2">
                            {new Date(
                              distribution.reliefDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="border px-4 py-2">
                            {distribution.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
