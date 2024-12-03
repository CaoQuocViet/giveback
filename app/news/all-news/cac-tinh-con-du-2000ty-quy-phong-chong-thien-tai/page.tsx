/**These are necessary imports / components for the page */
'use client';
import Image from 'next/image';

export default function NewsArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Các tỉnh thành còn dư hơn 2.200 tỷ đồng Quỹ Phòng chống thiên tai
      </h1>

      <div className="prose max-w-none">
        {/* Tóm tắt bài viết */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Tóm tắt</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Quỹ Phòng chống thiên tai của 63 tỉnh thành kết dư hơn 2.200 tỷ đồng (tính đến tháng 9/2024)</li>
            <li>Thiệt hại sau bão Yagi ước tính hơn 3.200 tỷ đồng</li>
            <li>Quỹ đã thu được 5.925 tỷ đồng, đã chi 3.686 tỷ từ năm 2014 đến nay</li>
            <li>Nhiều tỉnh thành đã hỗ trợ lẫn nhau thông qua việc điều chuyển Quỹ</li>
          </ul>
        </div>

        <Image
          src="/news_imp_assets/news/01.png"
          alt="Quỹ phòng chống thiên tai"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />

        {/* Nội dung chi tiết */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Chi tiết về Quỹ Phòng chống thiên tai</h2>
        <p className="mb-4">
          Quỹ Phòng chống thiên tai là quỹ tài chính nhà nước ngoài ngân sách, hoạt động không vì mục đích lợi nhuận. Quỹ được chia thành hai cấp: Trung ương do Bộ Nông nghiệp và Phát triển nông thôn quản lý, và cấp tỉnh do UBND cấp tỉnh quản lý.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Nguồn thu của Quỹ</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Đóng góp tự nguyện từ tổ chức, cá nhân trong và ngoài nước</li>
          <li>Đóng góp bắt buộc từ tổ chức kinh tế (500.000đ - 100 triệu đồng)</li>
          <li>Điều tiết từ Quỹ trung ương và giữa các Quỹ cấp tỉnh</li>
          <li>Tiền lãi từ các khoản gửi</li>
        </ul>

        <Image 
          src="/news_imp_assets/news/02.png"
          alt="Người dân được sơ tán tránh lũ"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Người dân thôn An Lạc, xã Trung Giã, huyện Sóc Sơn, Hà Nội được sơ tán tránh lũ, chiều 12/9. Ảnh: Nguyễn Đông
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Thiệt hại do bão Yagi</h3>
        <ul className="list-disc list-inside mb-6">
          <li>299 người thiệt mạng</li>
          <li>34 người mất tích</li>
          <li>1.929 người bị thương</li>
          <li>238.000 ngôi nhà bị hư hỏng</li>
          <li>Thiệt hại nông nghiệp:
            <ul className="list-disc list-inside ml-6">
              <li>195.000 ha lúa bị ngập úng</li>
              <li>47.000 ha hoa màu bị thiệt hại</li>
              <li>36.000 ha cây ăn quả bị ảnh hưởng</li>
            </ul>
          </li>
        </ul>

        <Image
          src="/news_imp_assets/news/03.png" 
          alt="Bộ đội tìm kiếm nạn nhân"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Bộ đội dầm mình trong bùn nhão tìm kiếm nạn nhân ở Làng Nủ, ngày 13/9. Ảnh: Ngọc Thành
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>Tác giả: Gia Chính</p>
          <p>Nguồn: VnExpress</p>
        </div>
      </div>
    </article>
  );
}