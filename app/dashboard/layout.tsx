"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import {
  FileText,
  Flag,
  History,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react"

import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Thay thế Icons bằng các components từ lucide-react
const Icons = {
  user: User,
  users: Users,
  report: FileText,
  history: History,
  logOut: LogOut,
  campaign: Flag,
  fileText: FileText,
  settings: Settings,
}

// Thêm helper function để lấy màu cho role badge (đồng bộ với header)
function getRoleBadgeColor(role: string): string {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "CHARITY":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "DONOR":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "BENEFICIARY":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    // Kiểm tra token
    const token = Cookies.get("auth_token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    // Lấy user info từ localStorage và thiết lập listener
    const updateUserData = () => {
      const userStr = localStorage.getItem("user")
      if (userStr) {
        const user = JSON.parse(userStr)
        setUserData(user)
        setMenuItems(getMenuByRole(user.role))
      } else {
        router.push("/auth/login")
      }
    }

    // Lắng nghe sự thay đổi của localStorage
    window.addEventListener("storage", updateUserData)

    // Khởi tạo lần đầu
    updateUserData()

    // Cleanup
    return () => {
      window.removeEventListener("storage", updateUserData)
    }
  }, [router])

  const handleLogout = () => {
    logout()
  }

  // Show loading khi chưa có userData
  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <aside
        className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 
        border-r border-gray-200
        bg-white shadow-lg
        dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/40"
      >
        {/* Profile Section */}
        <div
          className="border-b border-gray-200 p-6 transition-colors 
          hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
        >
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center justify-center rounded-full 
              bg-blue-100 ring-2
              ring-blue-200 transition-all hover:ring-blue-300 
              dark:bg-blue-950 dark:ring-blue-800 dark:hover:ring-blue-700"
              style={{ width: "40px", height: "40px" }} // Đặt kích thước ảnh cố định
            >
              <Image
                src={userData.profileImage || "/default-avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover transition-transform hover:scale-105"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                {userData.fullName}
              </p>
              <Badge
                className={`mt-1.5 font-medium ${getRoleBadgeColor(
                  userData.role
                )}`}
              >
                {getRoleLabel(userData.role)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className="scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-200 
          dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-800 h-[calc(100vh-280px)] 
          overflow-y-auto p-4"
        >
          <ul className="space-y-2.5">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(`${item.href}/`)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative flex items-center overflow-hidden rounded-xl
                      border border-transparent bg-white/60 px-4 py-3.5
                      text-sm font-medium
                      shadow-sm backdrop-blur-sm transition-all
                      duration-300 ease-in-out hover:translate-x-1
                      hover:border-blue-200/50 hover:bg-blue-100/60 hover:text-blue-700 hover:shadow-md
                      dark:bg-blue-900/20 dark:text-blue-100 dark:hover:border-blue-700/50
                      dark:hover:bg-blue-800/30 dark:hover:text-blue-300
                      ${
                        isActive
                          ? "border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/40"
                          : ""
                      }`}
                  >
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-transparent 
                      opacity-0 transition-opacity
                      duration-300 group-hover:opacity-100 dark:from-blue-600/20 dark:to-transparent"
                    />

                    {/* Icon container với style active */}
                    <div
                      className={`relative mr-3 flex size-9 items-center 
                      justify-center rounded-lg border border-blue-200
                      transition-colors duration-300 dark:border-blue-700
                      ${
                        isActive
                          ? "border-blue-300 bg-blue-200/80 dark:border-blue-600 dark:bg-blue-800/80"
                          : "bg-blue-100/80 dark:bg-blue-900/50"
                      }`}
                    >
                      <item.icon
                        className={`size-5 transition-colors duration-300
                        ${
                          isActive
                            ? "text-blue-700 dark:text-blue-200"
                            : "text-blue-600 dark:text-blue-300"
                        }`}
                      />
                    </div>

                    {/* Label với style active */}
                    <span
                      className={`relative font-medium tracking-wide transition-all duration-300
                      ${
                        isActive
                          ? "text-blue-700 dark:text-blue-200"
                          : "text-gray-700 dark:text-blue-100"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Indicator line chỉ hiện khi active */}
                    {isActive && (
                      <div
                        className="absolute right-0 h-full w-1 rounded-l-full bg-blue-500/70
                        dark:bg-blue-400/70"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div
          className="absolute bottom-0 w-64 border-t border-gray-200 bg-white 
          p-4 dark:border-gray-800 dark:bg-gray-900"
        >
          <Button
            variant="outline"
            className="w-full justify-start font-medium
              transition-all duration-200 hover:border-red-200
              hover:bg-red-50 hover:text-red-600 dark:border-gray-800
              dark:text-gray-200 dark:hover:border-red-900
              dark:hover:bg-red-950/30 dark:hover:text-red-400"
            size="sm"
            onClick={handleLogout}
          >
            <Icons.logOut className="mr-2 size-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-6 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
// Helper functions and types
interface MenuItem {
  label: string
  href: string
  icon: any
}

function getMenuByRole(role: string): MenuItem[] {
  switch (role) {
    case "ADMIN":
      return [
        {
          label: "Thông tin quản trị",
          href: "/dashboard/profile",
          icon: Icons.user,
        },
        {
          label: "Danh sách tổ chức",
          href: "/dashboard/charities",
          icon: Icons.users,
        },
        {
          label: "Danh sách chiến dịch",
          href: "/dashboard/campaigns",
          icon: Icons.fileText,
        },
        {
          label: "Theo dõi báo cáo",
          href: "/dashboard/reports",
          icon: Icons.report,
        },
      ]
    case "CHARITY":
      return [
        {
          label: "Thông tin tổ chức",
          href: "/dashboard/profile",
          icon: Icons.user,
        },
        {
          label: "Quản lý chiến dịch",
          href: "/dashboard/charity/campaigns",
          icon: Icons.settings,
        },
        {
          label: "Danh sách tổ chức",
          href: "/dashboard/charities",
          icon: Icons.users,
        },
        {
          label: "Danh sách chiến dịch",
          href: "/dashboard/campaigns",
          icon: Icons.fileText,
        },
        {
          label: "Theo dõi báo cáo",
          href: "/dashboard/reports",
          icon: Icons.report,
        },
      ]
    case "DONOR":
      return [
        {
          label: "Thông tin cá nhân",
          href: "/dashboard/profile",
          icon: Icons.user,
        },
        {
          label: "Lịch sử đóng góp",
          href: "/dashboard/donations",
          icon: Icons.history,
        },
        {
          label: "Danh sách tổ chức",
          href: "/dashboard/charities",
          icon: Icons.users,
        },
        {
          label: "Danh sách chiến dịch",
          href: "/dashboard/campaigns",
          icon: Icons.fileText,
        },
        {
          label: "Theo dõi báo cáo",
          href: "/dashboard/reports",
          icon: Icons.report,
        },
      ]
    case "BENEFICIARY":
      return [
        {
          label: "Thông tin cá nhân",
          href: "/dashboard/profile",
          icon: Icons.user,
        },
        {
          label: "Danh sách tổ chức",
          href: "/dashboard/charities",
          icon: Icons.users,
        },
        {
          label: "Danh sách chiến dịch",
          href: "/dashboard/campaigns",
          icon: Icons.fileText,
        },
        {
          label: "Theo dõi báo cáo",
          href: "/dashboard/reports",
          icon: Icons.report,
        },
      ]
    default:
      return []
  }
}

function getRoleLabel(role: string): string {
  switch (role) {
    case "ADMIN":
      return "Quản trị viên"
    case "CHARITY":
      return "Tổ chức từ thiện"
    case "DONOR":
      return "Nhà hảo tâm"
    case "BENEFICIARY":
      return "Người thụ hưởng"
    default:
      return role
  }
}
