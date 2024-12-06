"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Mock user data
const mockUser = {
  name: "Người dùng",
  role: "CHARITY", // Có thể thay đổi role để test: ADMIN, CHARITY, DONOR, BENEFICIARY
  avatar: "/default-avatar.png"
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuItems] = useState(getMenuByRole(mockUser.role));

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        {/* Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <img 
              src={mockUser.avatar} 
              alt="Profile"
              className="w-10 h-10 rounded-full" 
            />
            <div>
              <p className="font-medium">{mockUser.name}</p>
              <p className="text-sm text-gray-500">{getRoleLabel(mockUser.role)}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

// Helper functions and types
interface MenuItem {
  label: string;
  href: string;
  icon: any;
}

function getMenuByRole(role: string): MenuItem[] {
  switch (role) {
    case "ADMIN":
      return [
        { label: "Thông tin quản trị", href: "/dashboard/profile", icon: Icons.user },
        { label: "Danh sách tổ chức", href: "/dashboard/charities", icon: Icons.users },
        { label: "Theo dõi báo cáo", href: "/dashboard/reports", icon: Icons.report }
      ];
    case "CHARITY":
      return [
        { label: "Thông tin tổ chức", href: "/dashboard/profile", icon: Icons.user },
        { label: "Danh sách tổ chức", href: "/dashboard/charities", icon: Icons.users },
        { label: "Quản lý chiến dịch", href: "/dashboard/charity/campaigns", icon: Icons.campaign },
        { label: "Theo dõi báo cáo", href: "/dashboard/reports", icon: Icons.report }
      ];
    case "DONOR":
      return [
        { label: "Thông tin cá nhân", href: "/dashboard/profile", icon: Icons.user },
        { label: "Danh sách tổ chức", href: "/dashboard/charities", icon: Icons.users },
        { label: "Lịch sử đóng góp", href: "/dashboard/donations", icon: Icons.history },
        { label: "Theo dõi báo cáo", href: "/dashboard/reports", icon: Icons.report }
      ];
    case "BENEFICIARY":
      return [
        { label: "Thông tin cá nhân", href: "/dashboard/profile", icon: Icons.user },
        { label: "Danh sách tổ chức", href: "/dashboard/charities", icon: Icons.users },
        { label: "Theo dõi báo cáo", href: "/dashboard/reports", icon: Icons.report }
      ];
    default:
      return [];
  }
}

function getRoleLabel(role?: string): string {
  switch (role) {
    case "ADMIN": return "Quản trị viên";
    case "CHARITY": return "Tổ chức từ thiện";
    case "DONOR": return "Người đóng góp";
    case "BENEFICIARY": return "Người nhận hỗ trợ";
    default: return "";
  }
} 