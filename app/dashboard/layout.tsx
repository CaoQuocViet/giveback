"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Flag, History, LogOut, Settings, User, Users } from "lucide-react"
import Cookies from 'js-cookie'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

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
  const { logout } = useAuth()
  const [userData, setUserData] = useState<any>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    // Kiểm tra token
    const token = Cookies.get('auth_token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    // Lấy user info từ localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      setUserData(user)
      setMenuItems(getMenuByRole(user.role))
    } else {
      router.push('/auth/login')
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
    <div className="flex min-h-screen bg-gray-100 dark:from-gray-900 dark:to-blue-900/20">
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 
        bg-white shadow-lg
        dark:from-gray-800 dark:via-blue-900/10 dark:to-indigo-900/10 
        dark:border-blue-900/20"
      >
        {/* Profile Section */}
        <div className="border-b border-gray-200 dark:border-blue-900/30 p-6 
          hover:bg-gray-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="flex size-12 items-center justify-center rounded-full 
              bg-blue-100/50 dark:bg-blue-900/30 
              ring-2 ring-blue-200 dark:ring-blue-700 
              hover:ring-blue-300 dark:hover:ring-blue-600 transition-all"
            >
              <img
                src={userData.avatar || "/default-avatar.png"}
                alt="Profile"
                className="size-10 rounded-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {userData.full_name}
              </p>
              <Badge className={`mt-1.5 font-medium ${getRoleBadgeColor(userData.role)}`}>
                {getRoleLabel(userData.role)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="h-[calc(100vh-280px)] overflow-y-auto p-4 
          scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-200 
          dark:scrollbar-track-blue-900/10 dark:scrollbar-thumb-blue-800"
        >
          <ul className="space-y-2.5">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center rounded-xl px-4 py-3.5
                    text-sm font-medium transition-all duration-300 ease-in-out
                    bg-white/60 dark:bg-blue-900/20
                    hover:bg-blue-100/60 hover:text-blue-700 hover:translate-x-1
                    dark:text-blue-100 dark:hover:bg-blue-800/30 dark:hover:text-blue-300
                    border border-transparent hover:border-blue-200/50 dark:hover:border-blue-700/50
                    shadow-sm hover:shadow-md backdrop-blur-sm
                    relative overflow-hidden`}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-transparent 
                    dark:from-blue-600/20 dark:to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  />

                  {/* Icon container */}
                  <div className="relative flex items-center justify-center size-9 
                    rounded-lg bg-blue-100/80 dark:bg-blue-900/50
                    group-hover:bg-blue-200/80 dark:group-hover:bg-blue-800/50
                    transition-colors duration-300 mr-3
                    border border-blue-200 dark:border-blue-700
                    group-hover:border-blue-300 dark:group-hover:border-blue-600"
                  >
                    <item.icon className="size-5 text-blue-600 dark:text-blue-300 
                      group-hover:text-blue-700 dark:group-hover:text-blue-200
                      transition-colors duration-300" 
                    />
                  </div>

                  {/* Label */}
                  <span className="relative font-medium tracking-wide
                    text-gray-700 dark:text-blue-100
                    group-hover:text-blue-700 dark:group-hover:text-blue-200
                    transition-all duration-300"
                  >
                    {item.label}
                  </span>

                  {/* Indicator line */}
                  <div className="absolute right-0 h-full w-1 bg-blue-500/70 dark:bg-blue-400/70
                    transform translate-x-full group-hover:translate-x-0
                    transition-transform duration-300 rounded-l-full"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200 dark:border-blue-900/30 
          bg-white dark:bg-gray-800/80 p-4"
        >
          <Button 
            variant="outline" 
            className="w-full justify-start font-medium
              hover:bg-red-50 hover:text-red-600 hover:border-red-200
              dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800
              transition-all duration-200"
            size="sm"
            onClick={handleLogout}
          >
            <Icons.logOut className="mr-2 size-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
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

