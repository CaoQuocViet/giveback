/**These are necessary imports / components for the page */
"use client"

import Image from "next/image"

export default function StormArticle() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">
        Trong mắt bão: 15 giờ Yagi tàn phá miền Bắc
      </h1>

      <div className="prose max-w-none">
        {/* Tóm tắt bài viết */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h2 className="mb-2 text-xl font-semibold">Tóm tắt</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Bão Yagi - cơn bão mạnh nhất trong 30 năm tại Việt Nam với sức gió
              cấp 14, giật cấp 17
            </li>
            <li>
              Gây thiệt hại nặng nề tại Quảng Ninh, Hải Phòng và các tỉnh miền
              Bắc
            </li>
            <li>
              29 người thiệt mạng, 1.609 người bị thương trong ngày bão đổ bộ
            </li>
            <li>Mưa lớn 300-700mm gây lũ lụt nghiêm trọng sau bão</li>
          </ul>
        </div>
        <Image
          src="/news_imp_assets/news/01.png"
          alt="Gió giật cấp 17 tại Quảng Ninh khiến du thuyền bị lật"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <div className="my-6">
          <h2 className="mb-4 text-2xl font-semibold">Trực diện với bão</h2>
          <p className="mb-4 text-gray-700">
            Gần 12h trưa 7/9, ngôi nhà hai gian cấp bốn - nơi đặt trạm khí tượng
            Bãi Cháy, Quảng Ninh, rung lắc liên hồi khi bão Yagi đổ bộ. Trạm
            trưởng Vũ Thị Trường cùng đồng nghiệp nấp dưới gầm bàn, vội vàng
            soạn đoạn tin nhắn gửi về Tổng cục Khí tượng Thủy văn...
          </p>
        </div>

        <div className="my-6">
          <h2 className="mb-4 text-2xl font-semibold">Diễn biến 15 giờ bão</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">12:00 - Bão đổ bộ</p>
              <p>
                1,4 triệu người Quảng Ninh và 2 triệu dân Hải Phòng hứng chịu
                cơn bão với sức gió cấp 12-14
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">19:00 - Bão vào Hà Nội</p>
              <p>
                4 người chết, 23 bị thương; trên 40.000 cây xanh gãy đổ; hơn
                2.500 ngôi nhà bị hư hại
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/news_imp_assets/news/03.png"
          alt="Bộ đội tìm kiếm nạn nhân trong bùn"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic">
          "24 năm làm khí tượng, tôi trải qua không ít cơn bão, nhưng lần đầu
          tiên rơi vào hoàn cảnh kinh hãi đến vậy"
          <footer className="mt-2 text-gray-600">
            - Trạm trưởng Vũ Thị Trường
          </footer>
        </blockquote>

        <div className="mt-8 text-sm text-gray-600">
          <p>Nguồn: VnExpress</p>
        </div>
      </div>
    </article>
  )
}
