import {
  MagicCard,
  MagicContainer,
} from "@/components/magicui/magic-card";
import { FaDonate, FaRegChartBar, FaClipboardList, FaComments, FaMapMarkedAlt, FaNewspaper } from 'react-icons/fa';
import Link from 'next/link';

export default function Feature() {
  return (
    <div className="mx-auto flex max-w-full flex-col items-center space-y-4 text-center">
      <h2 className="font-heading text-5xl leading-[1.1] sm:text-6xl md:text-3xl lg:text-5xl font-bold">
        Các giải pháp của Giveback
      </h2>
      <p className="text-muted-foreground max-w-[85%] pb-1 sm:pb-1 lg:pb-10 leading-normal sm:text-lg sm:leading-7 opacity-75">
        Dưới đây là các giải pháp mà chúng tôi cung cấp 🚑
      </p>

      <MagicContainer className="mt-60 flex h-auto w-full flex-wrap justify-center gap-4 px-14 pb-10 md:mt-20 lg:mt-20">
        {[{
            icon: <FaDonate className="w-14 h-14 text-blue-600 transition-transform duration-300 hover:scale-110" />,
            title: "Đóng góp từ thiện",
            description: "Đóng góp qua nhiều hình thức: chuyển khoản ngân hàng, ví điện tử. Lựa chọn nơi đóng góp từ thông tin newsfeed.",
            href: "/donation"
          },
          {
            icon: <FaRegChartBar className="w-14 h-14 text-blue-600 transition-transform duration-300 hover:scale-110" />,
            title: "Theo dõi và báo cáo",
            description: "Hiển thị thông tin công khai về tổng quyên góp, danh sách theo thời gian thực, xuất báo cáo chi tiết.",
            href: "/report"
          },
          {
            icon: <FaClipboardList className="w-14 h-14 text-blue-600 transition-transform duration-300 hover:scale-110" />,
            title: "Quản lý chiến dịch",
            description: "Tạo và quản lý các chiến dịch cứu trợ thiên tai. Cập nhật trạng thái về các thay đổi của chiến dịch.",
            href: "/campaign"
          },
          {
            icon: <FaComments className="w-14 h-14 text-blue-600 transition-transform duration-300 hover:scale-110" />,
            title: "Phản hồi và đánh giá",
            description: "Gửi phản hồi và đánh giá về tình hình quyên góp và nhận hỗ trợ. Hiển thị thông tin và bình luận về chiến dịch.",
            href: "/feedback"
          },
          {
            icon: <FaMapMarkedAlt className="w-14 h-14 text-blue-600 transition-transform duration-300 hover:scale-110" />,
            title: "Bản đồ thiên tai",
            description: "Hiển thị vùng bị ảnh hưởng bởi thiên tai và khu vực cần giúp đỡ; cập nhật thông tin theo thời gian thực.",
            href: "/heatmap"
          },
          {
            icon: <FaNewspaper className="w-14 h-14 text-blue-600 transition-transform duration-300 hover:scale-110" />,
            title: "Cập nhật tin tức",
            description: "Cung cấp thông tin về tình hình lũ lụt và các hoạt động hỗ trợ. Cho phép người dùng bình luận, chia sẻ thông tin.",
            href: "/news"
          }].map((item, index) => (
            <Link key={index} href={item.href} className="w-full md:w-1/4 lg:w-1/4">
              <MagicCard className="flex cursor-pointer flex-col items-center justify-center overflow-hidden p-10 shadow-2xl">
                <div className="flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <p className="z-10 whitespace-nowrap text-3xl font-bold text-gray-800 dark:text-gray-200">
                  {item.title}
                </p>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </MagicCard>
            </Link>
          ))}
      </MagicContainer>
    </div>
  );
}
