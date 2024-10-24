/**These are necessary imports / components for the page */
'use client';
import { PageLayout, Text, LinkTo } from "@/components/news";
import ArticleCard from '@/components/news/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '@/components/news/BLOG_CONSTANTS/_ARTICLES_LIST';
import { DEFAULT_SEO } from "@/components/news/BLOG_CONSTANTS/_BLOG_SETUP";
import FeaturedArticleSection from "@/components/news/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "@/components/news/Misc/HomeNonFeatureAricles";

const Home = () => {
  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <section className='w-full md:pt-[100px] md:pb-[70px] pt-[130px] pb-20 mb-10 dark:bg-slate-800 bg-slate-200'>
        <div className="container text-center px-3">
          <Text title className='text-3xl'>
            Cập nhật những thông tin nóng nhất về thiên tai tại Việt Nam
          </Text>

          <Text p className="mt-3 text-xl">
            Tin tức được cập nhật liên tục từ các nguồn uy tín
          </Text>

          <div className='flex justify-center mt-5 flex-wrap '>
            <a href="https://github.com/webexpe13/blog-template-using-nextjs-typescript-tailwindcss" target="_blank" rel="noopener noreferrer" className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>Github</span>
            </a>
            <LinkTo href="/pages/about-us.tsx" passHref className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>About</span>
            </LinkTo>
            <LinkTo href="/pages/tutorial/all-components.tsx" passHref className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>Components</span>
            </LinkTo>

            <a href="https://www.buymeacoffee.com/webexpe13z" target="_blank" rel="noopener noreferrer" className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'>
              <span className='text-xl pt-2 block'>Support Us</span>
            </a>
          </div>
        </div>
      </section>
      <div className="container mx-auto lg:px-[15px] px-0">
        <div className={'flex flex-wrap'}>
          <FeaturedArticleSection />
          <h1 className='px-3 w-full mb-5 text-xl md:text-3xl font-medium'>Checkout the below articles on how to use different layouts and components</h1>
          <hr className='border-1 mb-5 w-[98%] mx-auto' />
          <HomeNonFeatureArticles />
        </div>
      </div>
    </PageLayout>
  )
}

export default Home
