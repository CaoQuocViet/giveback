import "@/styles/globals.css"
import TextReveal from "@/components/magicui/text-reveal"

import AnimatedListDemo from "@/app/homepage-sections/AnimatedListDemo";
import GlobePage from "@/app/homepage-sections/GlobeSection";
import Feature from "@/app/homepage-sections/Features";

import CharityBrand from "@/components/charity-brand";

import RetroGrid from "@/components/magicui/retro-grid";

export default function PageContent() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1 mx-auto justify-center items-center">
        <div className="pt-20 flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
          <GlobePage />
          <AnimatedListDemo />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <CharityBrand />
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white dark:bg-black overflow-hidden h-auto">
        <TextReveal
          text="Quyên góp cho vùng thiên tai.
          Công khai, minh bạch và hiệu quả"
        />
        <TextReveal
          text="Dự án quyên góp từ thiện nhằm kết nối tấm lòng hảo tâm với nạn nhân thiên tai ở Việt Nam. Mục tiêu là xây dựng nền tảng minh bạch và hiệu quả, giúp người dân dễ dàng đóng góp cho các tổ chức từ thiện uy tín, khôi phục cuộc sống cho nạn nhân."
        />
      </div>
      <Feature />
    </div>
  );
}

