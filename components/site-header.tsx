"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Bảng điều khiển" },
    { href: "/dashboard/donations", label: "Đóng góp" },
    { href: "/dashboard/reports", label: "Báo cáo" },
    { href: "/heatmap", label: "Bản đồ" },
    { href: "/news", label: "Tin tức" },
  ];

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo/>
        </Link>
        <MainNav items={siteConfig.mainNav} />
        <nav className="flex items-center space-x-0">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button
                className={
                  buttonVariants({ size: "lg", variant: "ghost" }) +
                  " font-semibold text-base " +
                  (pathname === item.href ? "text-blue-700" : "hover:text-blue-700")
                }
              >
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-8">
          <nav className="flex items-center space-x-4">
            <Link href={siteConfig.links.facebook} target="_blank" rel="noreferrer">
              <div className={buttonVariants({ size: "icon", variant: "ghost" })}>
                <Icons.facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div className={buttonVariants({ size: "icon", variant: "ghost" })}>
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link href="/auth/login">
              <button className="text-black hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-300">
                Đăng nhập
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition-colors duration-300">
                Đăng ký
              </button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
