"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Quỹ Phòng chống thiên tai",
    description: "Các tỉnh thành còn dư hơn 2.200 tỷ đồng, nhưng thiệt hại sau bão Yagi hơn 3.200 tỷ.",
    time: "Cập nhật tháng 9/2024",
    icon: "💰",
    color: "#FF6B6B",
  },
  {
    name: "Cơn bão Yagi",
    description: "Yagi quét qua Việt Nam, xé toạc mái nhà và gây lũ lụt nghiêm trọng.",
    time: "15 giờ trước",
    icon: "🌪️",
    color: "#FFB800",
  },
  {
    name: "Vietbank quyên góp",
    description: "Vietbank quyên góp 700 triệu đồng ủng hộ người dân bị ảnh hưởng thiên tai.",
    time: "17/9",
    icon: "🤝",
    color: "#1E86FF",
  },
  {
    name: "Carlsberg hỗ trợ",
    description: "Carlsberg Việt Nam và nhân viên hỗ trợ 1,1 tỷ đồng cho vùng bão lũ.",
    time: "Hôm qua",
    icon: "💖",
    color: "#00C9A7",
  },
];


notifications = Array.from({ length: 10 }, () => notifications).flat();

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
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
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
  );
};

export default function AnimatedListDemo() {
  return (
    <div className="relative flex max-h-[400px] min-h-[400px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
