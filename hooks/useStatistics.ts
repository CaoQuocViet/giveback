import { useEffect, useState } from "react"
import Cookies from "js-cookie"

interface SystemStats {
  total_charities: number
  total_campaigns: number
  total_donated: number
  total_relief: number
  total_donors: number
  total_beneficiaries: number
}

export function useStatistics() {
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      const token = Cookies.get("auth_token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/statistics/overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Lỗi khi lấy thống kê")
      }

      const data = await response.json()
      setStats(data.data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, isLoading, error, refetch: fetchStats }
}
