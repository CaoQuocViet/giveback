"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Users, 
  FileText, 
  History,
  LogOut,
  Flag
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Mock user data
const mockUser = {
  name: "Người dùng",
  role: "ADMIN", // Có thể thay đổi role để test: ADMIN, CHARITY, DONOR, BENEFICIARY
  avatar: "/default-avatar.png"
};

// Thay thế Icons bằng các components từ lucide-react
const Icons = {
  user: User,
  users: Users,
  report: FileText,
  history: History,
  logOut: LogOut,
  campaign: Flag
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuItems] = useState(getMenuByRole(mockUser.role));

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        {/* Profile Section */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <img 
                src={mockUser.avatar} 
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover" 
              />
            </div>
            <div>
              <p className="font-semibold text-lg">{mockUser.name}</p>
              <Badge variant="secondary" className="mt-1">
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
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium
                    transition-colors hover:bg-primary/10 hover:text-primary
                    group relative"
                >
                  <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full opacity-0
                    group-hover:opacity-100 transition-opacity" />
                  <item.icon className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-primary" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-64 p-4 border-t bg-white">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Icons.logOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
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