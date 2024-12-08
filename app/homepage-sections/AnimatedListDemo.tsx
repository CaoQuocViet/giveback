"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/magicui/animated-list"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let notifications = [
  {
    name: "Quỹ Phòng chống thiên tai",
    description:
      "Các tỉnh thành còn dư hơn 2.200 tỷ đồng, nhưng thiệt hại sau bão Yagi hơn 3.200 tỷ.",
    time: "Cập nhật tháng 9/2024",
    icon: "💰",
    color: "#FF6B6B",
  },
  {
    name: "Trong mắt bão Yagi",
    description:
      "Yagi quét qua Việt Nam, xé toạc mái nhà và gây lũ lụt nghiêm trọng.",
    time: "15 giờ trước",
    icon: "🌪️",
    color: "#FFB800",
  },
  {
    name: "Vietbank quyên góp",
    description:
      "Vietbank quyên góp 700 triệu đồng ủng hộ người dân bị ảnh hưởng thiên tai.",
    time: "17/9",
    icon: "🤝",
    color: "#1E86FF",
  },
  {
    name: "Carlsberg hỗ trợ",
    description:
      "Carlsberg Việt Nam và nhân viên hỗ trợ 1,1 tỷ đồng cho vùng bão lũ.",
    time: "Hôm qua",
    icon: "💖",
    color: "#00C9A7",
  },
  {
    name: "Bão hình thành và 'chết' như thế nào?",
    description:
      "Bão hình thành khi có áp suất khí quyển thấp ở vùng nước ấm, dần mạnh lên rồi lại suy yếu hoặc tan hẳn khi quét qua mặt đất.",
    time: "43 phút trước",
    icon: "🌊",
    color: "#4B7BE5",
  },
  {
    name: "Chủ quán kêu gọi ủng hộ",
    description:
      "Chủ quán cà phê ở Tam Kỳ đề nghị khách thanh toán tiền đồ uống bằng cách chuyển khoản cho Mặt trận Tổ quốc.",
    time: "79 phút trước",
    icon: "☕",
    color: "#FFA07A",
  },
  {
    name: "Hậu quả sau bão Yagi",
    description:
      "12 ngày sau bão Yagi, lũ quét và sạt lở đã làm 299 người chết, 34 mất tích, trong đó Lào Cai là tỉnh chịu thương vong nhiều nhất.",
    time: "90 phút trước",
    icon: "⚠️",
    color: "#DC143C",
  },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListDemo() {
  return (
    <div className="relative flex max-h-[400px] min-h-[400px] w-full max-w-lg flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  )
}
