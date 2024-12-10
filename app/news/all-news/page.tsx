"use client"

import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

import { LinkTo, Text } from "@/components/news/news-components"
import NewsIndexPage from "@/components/news/news-components/NewsIndexPage"
import Search from "@/components/news/news-components/Search"

// Import module Search

const AllArticles = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = () => {
    setSearchOpen(true)
  }

  const closeSearch = () => {
    setSearchOpen(false)
  }

  return (
    <>
      <section className="mb-10 w-full bg-slate-200 pb-20 pt-[130px] dark:bg-slate-800 md:pb-[70px] md:pt-[100px]">
        <div className="container px-3 text-center">
          <Text title className="text-3xl">
            Bảng tin cập nhật tình hình thiên tai và các hoạt động hỗ trợ tại
            Việt Nam
          </Text>

          <Text p className="mt-3 text-xl">
            Cung cấp thông tin mới nhất từ các nguồn chính thống.
          </Text>

          <div className="mt-5 flex flex-wrap justify-center ">
            <button
              onClick={openSearch}
              className="mx-2 mb-3 flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white shadow-lg transition-all hover:text-white hover:shadow-none md:mx-5"
            >
              <AiOutlineSearch className="block pt-2 text-xl" />
              <span className="block pt-2 text-xl">Tìm kiếm</span>
            </button>
            <LinkTo
              href="/dashboard/campaigns"
              passHref
              className="mx-2 mb-3 flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white shadow-lg transition-all hover:text-white hover:shadow-none md:mx-5"
            >
              <span className="block pt-2 text-xl">Xem chiến dịch</span>
            </LinkTo>

            <a
              href="/dashboard/donations"
              rel="noopener noreferrer"
              className="mx-2 mb-3 flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white shadow-lg transition-all hover:text-white hover:shadow-none md:mx-5"
            >
              <span className="block pt-2 text-xl">Đóng góp ngay</span>
            </a>
          </div>
        </div>
      </section>
      <NewsIndexPage articlesPerPage={6} />
      {searchOpen && <Search closeSearch={closeSearch} />}{" "}
      {/* Hiển thị giao diện tìm kiếm */}
    </>
  )
}

export default AllArticles
