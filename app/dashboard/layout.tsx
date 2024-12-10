"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Flag, History, LogOut, Settings, User, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Mock user data
const mockUser = {
  name: "Đang Trầm Cảm",
  role: "CHARITY", // Có thể thay đổi role để test: ADMIN, CHARITY, DONOR, BENEFICIARY
  avatar: "/default-avatar.png",
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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuItems] = useState(getMenuByRole(mockUser.role))

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
        {/* Profile Section */}
        <div className="border-b p-6 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/5">
              <img
                src={mockUser.avatar}
                alt="Profile"
                className="size-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold dark:text-gray-100">{mockUser.name}</p>
              <Badge variant="secondary" className="mt-1 dark:bg-gray-700 dark:text-gray-300">
                {getRoleLabel(mockUser.role)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative flex items-center rounded-lg px-4 py-3
                    text-sm font-medium transition-colors
                    hover:bg-primary/10 hover:text-primary
                    dark:text-gray-300 dark:hover:bg-primary/5 dark:hover:text-primary"
                >
                  <div
                    className="absolute left-0 h-8 w-1 rounded-r-full bg-primary opacity-0
                    transition-opacity group-hover:opacity-100"
                  />
                  <item.icon className="mr-3 size-5 text-muted-foreground group-hover:text-primary dark:text-gray-400" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-64 border-t bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
          <Button variant="outline" className="w-full justify-start dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" size="sm">
            <Icons.logOut className="mr-2 size-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 dark:bg-gray-900">{children}</main>
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

function getRoleLabel(role?: string): string {
  switch (role) {
    case "ADMIN":
      return "Quản trị viên"
    case "CHARITY":
      return "Tổ chức từ thiện"
    case "DONOR":
      return "Người đóng góp"
    case "BENEFICIARY":
      return "Người nhận hỗ trợ"
    default:
      return ""
  }
}
