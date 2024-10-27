"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import RetroGrid from "@/components/magicui/retro-grid";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContent from "./content";

export default function IndexPage() {
  return (
    <section>
      <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10 mx-auto justify-center mt-20">
        <div className="flex max-w-[980px] flex-col items-center gap-6 retro-theme relative">
          <div
            className={cn(
              "group rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 z-10"
            )}
          >
            <a href="/news/document">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black text-neutral-600 z-10">
                <span>😇 {" "}Hướng dẫn & Mục tiêu Dự án</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </a>
          </div>
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel font-bold leading-tight tracking-wider text-accent-foreground text-center z-10">
            Cùng Giveback thắp sáng phần tổ quốc đang gặp khó khăn!
          </h1>
          <p className="max-w-[700px] text-lg sm:text-xl text-accent-foreground text-center z-10">
            Chúng tôi hỗ trợ nạn nhân thiên tai bằng cách kết nối người đóng góp với các tổ chức từ thiện uy tín
          </p>
        </div>
        <div className="flex gap-4 justify-center">
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
  );
}
