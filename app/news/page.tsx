/**These are necessary imports / components for the page */
'use client';
import { PageLayout, Text, LinkTo } from "@/components/news/news-components";
import ArticleCard from '@/components/news/news-components/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '../../components/news/NEWS_CONSTANTS/_ARTICLES_LIST';
import { DEFAULT_SEO } from "../../components/news/NEWS_CONSTANTS/_NEW_SETUP";
import FeaturedArticleSection from "@/components/news/news-components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "@/components/news/news-components/Misc/HomeNonFeatureAricles";

const Home = () => {
  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <section className='w-full md:pt-[100px] md:pb-[70px] pt-[130px] pb-20 mb-10 dark:bg-slate-800 bg-slate-200'>
        <div className="container text-center px-3">
          <Text title className='text-3xl'>
            Bảng tin cập nhật tình hình thiên tai và các hoạt động hỗ trợ tại Việt Nam
          </Text>

          <Text p className="mt-3 text-xl">
            Cung cấp thông tin mới nhất từ các nguồn chính thống.
          </Text>

          <div className='flex justify-center mt-5 flex-wrap '>
            <a href="/news/all-news" rel="noopener noreferrer" className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>Tất cả bài viết</span>
            </a>
            <LinkTo href="/news/all-news/all-components" passHref className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>Xem chiến dịch</span>
            </LinkTo>

            <a href="" target="_blank" rel="noopener noreferrer" className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>Đóng góp ngay</span>
            </a>
          </div>
        </div>
      </section>
      <div className="container mx-auto lg:px-[15px] px-0">
        <div className={'flex flex-wrap'}>
          <FeaturedArticleSection />
          <h1 className='px-3 w-full mb-5 text-xl md:text-3xl font-medium'>Các bài viết khác</h1>
          <hr className='border-1 mb-5 w-[98%] mx-auto' />
          <HomeNonFeatureArticles />
        </div>
      </div>
    </PageLayout>
  )
}

export default Home
