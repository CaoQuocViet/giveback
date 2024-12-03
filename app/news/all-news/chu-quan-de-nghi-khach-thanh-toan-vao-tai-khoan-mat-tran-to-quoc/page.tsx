/**These are necessary imports / components for the page */
'use client';
import Image from 'next/image';

export default function CoffeeShopArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Chủ quán đề nghị khách thanh toán vào tài khoản Mặt trận Tổ quốc
      </h1>

      <div className="prose max-w-none">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Tóm tắt</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Chủ quán cà phê ở Tam Kỳ kêu gọi khách chuyển tiền đồ uống vào tài khoản MTTQ</li>
            <li>Áp dụng trong 4 ngày (12-15/9) để ủng hộ đồng bào miền Bắc</li>
            <li>Nhiều khách hàng chuyển khoản cao hơn giá trị đồ uống</li>
            <li>Quán đón khoảng 100 lượt khách mỗi ngày</li>
          </ul>
        </div>

        <Image
          src="/news_imp_assets/news/13.png"
          alt="Anh Nguyễn Hẹn tại quán cà phê"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Anh Nguyễn Hẹn ở quán cà phê thuộc phường Tân Thạnh, TP Tam Kỳ, chiều 12/9. Ảnh: Nhân vật cung cấp
        </p>

        <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic">
          "Tôi đã lớn lên với nhiều cơn bão nên hiểu sự khó khăn của người dân các tỉnh phía Bắc trong thiên tai"
          <footer className="text-gray-600 mt-2">- Anh Nguyễn Hẹn, chủ quán cà phê</footer>
        </blockquote>

        <Image
          src="/news_imp_assets/news/14.png"
          alt="Quán cà phê với băng rôn kêu gọi ủng hộ"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Quán cà phê của anh Hẹn ở phường Tân Thạnh, TP Tam Kỳ, chiều 12/9. Ảnh: Nhân vật cung cấp
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>Tác giả: Ngọc Ngân</p>
          <p>Nguồn: VnExpress</p>
        </div>
      </div>
    </article>
  );
}