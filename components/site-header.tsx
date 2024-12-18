"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import Cookies from 'js-cookie'

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export function SiteHeader() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('auth_token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        setIsAuthenticated(true)
        setUserData(JSON.parse(userStr))
      } else {
        setIsAuthenticated(false)
        setUserData(null)
      }
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
    }
  }, [pathname])

  const navItems = [
    { href: "/dashboard", label: "Bảng điều khiển" },
    { href: "/", label: "Trang chủ" },
    { href: "/heatmap", label: "Bản đồ" },
    { href: "/news", label: "Tin tức" },
    { href: "/document", label: "Về dự án" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
        </Link>
        <MainNav items={siteConfig.mainNav} />
        <nav className="flex items-center space-x-0">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button
                className={
                  buttonVariants({ size: "lg", variant: "ghost" }) +
                  " font-semibold text-base " +
                  (pathname === item.href
                    ? "text-blue-700"
                    : "hover:text-blue-700")
                }
              >
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
          <nav className="flex items-center space-x-4">
            <Link href={siteConfig.links.facebook} target="_blank" rel="noreferrer">
              <div className={buttonVariants({ size: "icon", variant: "ghost" })}>
                <Icons.facebook className="size-5 text-blue-500 hover:text-blue-600" />
                <span className="sr-only">Facebook</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div className={buttonVariants({ size: "icon", variant: "ghost" })}>
                <Icons.twitter className="size-5 text-blue-500 hover:text-blue-600" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${getRoleBadgeColor(userData?.role)}`}>
                  {getRoleLabel(userData?.role)}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 outline-none">
                      {userData?.avatar ? (
                        <img
                          src={userData.avatar}
                          alt="Avatar"
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <User className="size-6 text-primary" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={() => {
                        logout()
                        setIsAuthenticated(false)
                        setUserData(null)
                      }}
                      className="text-red-600 cursor-pointer"
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="rounded-lg px-5 py-2.5 text-center text-base font-medium text-black transition-colors duration-300 hover:text-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Đăng nhập
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-base font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Đăng ký
                  </button>
                </Link>
              </>
            )}
            <ThemeToggle />
          </nav>
      </div>
    </header>
  )
}
