/**These are necessary imports / components for the page */
'use client';
import Image from 'next/image';

export default function CarlsbergArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Carlsberg Việt Nam và nhân viên hỗ trợ vùng bão lũ 1,1 tỷ đồng
      </h1>

      <div className="prose max-w-none">
        {/* Tóm tắt bài viết - format từ home-layout */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Tóm tắt</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Trao 1,1 tỷ đồng cho UBMTTQ Việt Nam tại Thái Nguyên và Lào Cai</li>
            <li>Nguồn tiền từ quỹ công ty và đóng góp tự nguyện của nhân viên</li>
            <li>Hỗ trợ sửa chữa nhà cửa và sinh kế cho người dân vùng bão</li>
            <li>Thể hiện cam kết trách nhiệm xã hội của Carlsberg tại Việt Nam</li>
          </ul>
        </div>

        {/* Ảnh minh họa - format từ how-to-deploy-blog */}
        <Image
          src="/news_imp_assets/news/07.png"
          alt="UBMTTQ tỉnh Thái Nguyên tiếp nhận hỗ trợ từ Carlsberg"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Ủy ban Mặt trận Tổ quốc tỉnh Thái Nguyên tiếp nhận sự hỗ trợ từ công ty Carlsberg và cán bộ nhân viên công ty hôm 17/9. Ảnh: Nguyên Bảo
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Chi tiết hoạt động hỗ trợ</h2>
        <p className="mb-4">
          Số tiền quyên góp được huy động từ hai nguồn, bao gồm từ quỹ công ty và đóng góp tự nguyện từ các nhân viên của Carlsberg Việt Nam...
        </p>

        <Image 
          src="/news_imp_assets/news/08.png"
          alt="Đại diện Carlsberg trao tiền hỗ trợ"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Ông Bùi Hữu Quang - Giám đốc chiến lược cấp cao (thứ 3 bên phải) và đại diện Công đoàn Carlsberg Việt Nam trao số tiền 500 triệu hỗ trợ người dân Thái Nguyên sau bão lũ. Ảnh: Nguyên Bảo
        </p>

        <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic">
          "Trong thời điểm đầy thách thức này, sứ mệnh của Carlsberg càng trở nên rõ nét, thúc đẩy chúng tôi chung tay cùng nhau để mang đến sự hỗ trợ và niềm hy vọng cho người dân"
          <footer className="text-gray-600 mt-2">- Andrew Khan, Tổng giám đốc Carlsberg Việt Nam</footer>
        </blockquote>

        <Image
          src="/news_imp_assets/news/09.png"
          alt="Chia sẻ với người dân vùng bão lũ"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Ông Bùi Hữu Quang thay mặt Carlsberg Việt Nam và nhân viên gửi lời chia sẻ với người dân vùng bão lũ tại Thái Nguyên. Ảnh: Nguyên Bảo
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>Tác giả: Diệp Chi</p>
          <p>Nguồn: VnExpress</p>
        </div>
      </div>
    </article>
  );
}