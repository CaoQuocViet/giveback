"use client"

import Image from "next/image"

export default function StormFormationArticle() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">
        Bão hình thành và "chết" như thế nào?
      </h1>

      <div className="prose max-w-none">
        {/* Tóm tắt format từ home-layout */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h2 className="mb-2 text-xl font-semibold">Tóm tắt</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Bão hình thành từ vùng áp thấp trên biển có nhiệt độ trên 26.5°C
            </li>
            <li>
              Cần ít nhất 3 điều kiện: nhiệt độ nước biển ấm, độ ẩm cao và lực
              Coriolis
            </li>
            <li>Bão suy yếu khi đi vào đất liền hoặc gặp vùng nước lạnh</li>
            <li>Chu kỳ sống của bão thường kéo dài 5-7 ngày</li>
          </ul>
        </div>

        <Image
          src="/news_imp_assets/news/10.png"
          alt="Sơ đồ hình thành bão"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="mb-6 mt-2 text-sm text-gray-600">
          Sơ đồ minh họa quá trình hình thành và phát triển của bão. Ảnh: NASA
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">
          Quá trình hình thành bão
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Giai đoạn 1: Vùng áp thấp</p>
            <p>
              Hình thành từ vùng nước biển ấm trên 26.5°C, không khí nóng bốc
              lên tạo áp suất thấp
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Giai đoạn 2: Áp thấp nhiệt đới</p>
            <p>Gió xoáy với tốc độ 17m/s, hình thành mắt bão</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Giai đoạn 3: Bão trưởng thành</p>
            <p>Sức gió trên cấp 8, đường kính mắt bão 20-50km</p>
          </div>
        </div>

        <Image
          src="/news_imp_assets/news/11.png"
          alt="Cấu trúc của bão"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="mb-6 mt-2 text-sm text-gray-600">
          Cấu trúc điển hình của một cơn bão trưởng thành. Ảnh: NOAA
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">
          Quá trình suy yếu và tan rã
        </h2>
        <p className="mb-4">
          Bão suy yếu khi đi vào đất liền do mất nguồn năng lượng từ nước biển
          ấm, ma sát với địa hình và thiếu hơi nước...
        </p>

        <Image
          src="/news_imp_assets/news/12.png"
          alt="Bão suy yếu khi vào đất liền"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="mb-6 mt-2 text-sm text-gray-600">
          Hình ảnh vệ tinh cho thấy bão Yagi suy yếu nhanh chóng sau khi đổ bộ
          vào đất liền. Ảnh: NOAA
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>Nguồn: NASA, NOAA</p>
        </div>
      </div>
    </article>
  )
}
