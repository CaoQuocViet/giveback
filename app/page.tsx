"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text"
import RetroGrid from "@/components/magicui/retro-grid"

import PageContent from "./content"

export default function IndexPage() {
  return (
    <section>
      <div className="container mx-auto mt-20 grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
        <div className="retro-theme relative flex max-w-[980px] flex-col items-center gap-6">
          <div
            className={cn(
              "group z-10 rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <a href="/news/document">
              <AnimatedShinyText className="z-10 inline-flex items-center justify-center px-4 py-1 text-neutral-600 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black">
                <span>😇 Hướng dẫn & Mục tiêu Dự án</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </a>
          </div>
          <h1 className="font-pixel z-10 text-center text-3xl font-bold leading-tight tracking-wider text-accent-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Cùng Giveback thắp sáng phần tổ quốc đang gặp khó khăn!
          </h1>
          <p className="z-10 max-w-[700px] text-center text-lg text-accent-foreground sm:text-xl">
            Chúng tôi hỗ trợ nạn nhân thiên tai bằng cách kết nối người đóng góp
            với các tổ chức từ thiện uy tín
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Xem chiến dịch
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.facebook}
            className={buttonVariants({ variant: "outline" })}
          >
            Đóng góp ngay
          </Link>
        </div>
      </div>
      <PageContent />
    </section>
  )
}
