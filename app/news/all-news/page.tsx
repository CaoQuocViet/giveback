'use client';
import NewsIndexPage from "@/components/news/news-components/NewsIndexPage";
import { Text, LinkTo } from "@/components/news/news-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import Search from "@/components/news/news-components/Search"; // Import module Search

const AllArticles = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <section className='w-full md:pt-[100px] md:pb-[70px] pt-[130px] pb-20 mb-10 dark:bg-slate-800 bg-slate-200'>
        <div className="container text-center px-3">
          <Text title className='text-3xl'>
            Bảng tin cập nhật tình hình thiên tai và các hoạt động hỗ trợ tại Việt Nam
          </Text>

          <Text p className="mt-3 text-xl">
            Cung cấp thông tin mới nhất từ các nguồn chính thống.
          </Text>

          <div className='flex justify-center mt-5 flex-wrap '>
            <button
                onClick={openSearch}
                className='flex items-center justify-center rounded-md bg-blue-600 px-4 pb-2 text-white hover:text-white shadow-lg hover:shadow-none transition-all mb-3 md:mx-5 mx-2'
              >
                <AiOutlineSearch className="text-xl pt-2 block" />
                <span className='text-xl pt-2 block'>Tìm kiếm</span>
            </button>

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
      <NewsIndexPage articlesPerPage={6} />
      {searchOpen && <Search closeSearch={closeSearch} />} {/* Hiển thị giao diện tìm kiếm */}
    </>
  );
};

export default AllArticles;
