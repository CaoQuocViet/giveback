/**These are necessary imports / components for the page */
'use client';
import Image from 'next/image';

export default function StormDamageReport() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Cập nhật hậu quả sau bão Yagi
      </h1>
      <p className="text-gray-600 mb-6">Cập nhật tới Thứ tư, 18/9/2024, 17:00 (GMT+7)</p>

      <div className="prose max-w-none">
        {/* Thống kê thiệt hại */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600">299</div>
            <div>Người thiệt mạng</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">34</div>
            <div>Người mất tích</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">1.932</div>
            <div>Người bị thương</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">235.065</div>
            <div>Nhà bị thiệt hại</div>
          </div>
        </div>

        {/* Timeline sự kiện tại Hà Nội */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">Diễn biến tại Hà Nội</h2>
          {/* Timeline format từ how-to-deploy-blog */}
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">14/09/2024</p>
            <p>Ôtô được chạy bình thường trên cao tốc Pháp Vân - Cầu Giẽ</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">13/09/2024</p>
            <p>Dỡ lệnh cấm cầu Long Biên, cầu Đuống</p>
          </div>
        </div>

        <Image
          src="/news_imp_assets/news/15.png"
          alt="Bản đồ dự báo mưa tại các tỉnh phía Bắc"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Bản đồ dự báo lượng mưa trong 24h tới tại các tỉnh phía Bắc. Nguồn: Trung tâm Dự báo KTTV Quốc gia
        </p>

        <Image
          src="/news_imp_assets/news/16.png"
          alt="Bản đồ cảnh báo ngập lụt"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Bản đồ cảnh báo khu vực có nguy cơ ngập lụt, lũ quét và sạt lở đất. Nguồn: Trung tâm Dự báo KTTV Quốc gia
        </p>

        <Image
          src="/news_imp_assets/news/17.png"
          alt="Thống kê thiệt hại theo tỉnh"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Biểu đồ thống kê thiệt hại tại các tỉnh bị ảnh hưởng nặng nhất. Đồ họa: Khánh Hoàng - Thanh Hạ
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>Nội dung: Đăng Nguyên - Quang Tuệ - Gia Chính</p>
          <p>Đồ họa: Khánh Hoàng - Thanh Hạ</p>
          <p>Nguồn dữ liệu: Cục Quản lý đê điều và Phòng chống thiên tai</p>
        </div>
      </div>
    </article>
  );
}