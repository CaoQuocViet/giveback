/**These are necessary imports / components for the page */
"use client"

import { LinkTo, PageLayout, Text } from "@/components/news/news-components"
import ArticleCard from "@/components/news/news-components/ArticleCards/ArticleCard"
import FeaturedArticleSection from "@/components/news/news-components/Misc/FeaturedArticleSection"
import HomeNonFeatureArticles from "@/components/news/news-components/Misc/HomeNonFeatureAricles"

import { SORTED_ARTICLES_BY_DATE } from "../../components/news/NEWS_CONSTANTS/_ARTICLES_LIST"
import { DEFAULT_SEO } from "../../components/news/NEWS_CONSTANTS/_NEW_SETUP"

const Home = () => {
  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
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
            <a
              href="/news/all-news"
              rel="noopener noreferrer"
              className="mx-2 mb-3 flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white shadow-lg transition-all hover:text-white hover:shadow-none md:mx-5"
            >
              <span className="block pt-2 text-xl">Tất cả bài viết</span>
            </a>
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
      <div className="container mx-auto px-0 lg:px-[15px]">
        <div className={"flex flex-wrap"}>
          <FeaturedArticleSection />
          <h1 className="mb-5 w-full px-3 text-xl font-medium md:text-3xl">
            Các bài viết khác
          </h1>
          <hr className="border-1 mx-auto mb-5 w-[98%]" />
          <HomeNonFeatureArticles />
        </div>
      </div>
    </PageLayout>
  )
}

export default Home
