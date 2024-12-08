import "@/styles/globals.css"
import CharityBrand from "@/components/charity-brand"
import RetroGrid from "@/components/magicui/retro-grid"
import TextReveal from "@/components/magicui/text-reveal"
import AnimatedListDemo from "@/app/homepage-sections/AnimatedListDemo"
import Feature from "@/app/homepage-sections/Features"
import GlobePage from "@/app/homepage-sections/GlobeSection"

export default function PageContent() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="mx-auto flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-8 pt-20 lg:flex-row lg:space-x-8 lg:space-y-0">
          <GlobePage />
          <AnimatedListDemo />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <CharityBrand />
      </div>
      <div className="flex h-auto items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-black">
        <TextReveal
          text="Quyên góp cho vùng thiên tai.
          Công khai, minh bạch và hiệu quả"
        />
        <TextReveal text="Dự án quyên góp từ thiện nhằm kết nối tấm lòng hảo tâm với nạn nhân thiên tai ở Việt Nam. Mục tiêu là xây dựng nền tảng minh bạch và hiệu quả, giúp người dân dễ dàng đóng góp cho các tổ chức từ thiện uy tín, khôi phục cuộc sống cho nạn nhân." />
      </div>
      <Feature />
    </div>
  )
}
