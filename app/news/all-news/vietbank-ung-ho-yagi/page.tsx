/**These are necessary imports / components for the page */
'use client';
import Image from 'next/image';

export default function VietbankArticle() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Vietbank quyên góp 700 triệu đồng ủng hộ đồng bào bão lụt
      </h1>

      <div className="prose max-w-none">
        {/* Tóm tắt bài viết */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Tóm tắt</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Vietbank phối hợp tổ chức lễ phát động "Mùa gắn kết - Ngân hàng Việt, vì người Việt"</li>
            <li>Thu hút 2.600 cán bộ nhân viên từ 119 điểm giao dịch tham gia</li>
            <li>Quyên góp được 700 triệu đồng sau 2 giờ tổ chức</li>
            <li>Triển khai các gói vay ưu đãi hỗ trợ người dân vùng bão lụt</li>
          </ul>
        </div>

        <Image
          src="/news_imp_assets/news/04.png"
          alt="Ban lãnh đạo cùng cán bộ nhân viên Vietbank chung tay đóng góp"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Ban lãnh đạo cùng cán bộ nhân viên Vietbank chung tay đóng góp tại sự kiện. Ảnh: Vietbank
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Chi tiết chương trình quyên góp</h2>
        <p className="mb-4">
          Sự kiện đã đấu giá thành công 7 tác phẩm nghệ thuật, bao gồm các bức ảnh của nhiếp ảnh gia Phạm Tuấn Ngọc, tranh đất sét 3D từ Quỹ Chí viễn và các tác phẩm của cán bộ nhân viên. Ngoài ra, nhiều tài khoản số đẹp cũng được đưa ra đấu giá.
        </p>

        <Image 
          src="/news_imp_assets/news/05.png"
          alt="Nghệ sĩ thị giác Phạm Tuấn Ngọc chia sẻ"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Nghệ sĩ thị giác Phạm Tuấn Ngọc chia sẻ tại sự kiện. Ảnh: Vietbank
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Các hoạt động hỗ trợ khác</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Vận động cán bộ nhân viên ủng hộ tối thiểu một ngày lương</li>
          <li>Trích 200 triệu đồng hỗ trợ theo phát động của MTTQ Việt Nam</li>
          <li>Giảm lãi suất vay 0,5-1,2% cho khách hàng vùng bão lụt</li>
          <li>Cung cấp gói vay ưu đãi từ 5%/năm, thời hạn đến 380 tháng</li>
        </ul>

        <Image
          src="/news_imp_assets/news/06.png"
          alt="Chương trình giảm lãi vay cho khách hàng bị ảnh hưởng bão lụt"
          width={800}
          height={450}
          className="my-6 rounded-lg"
        />
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Chương trình giảm lãi vay của Vietbank cho khách hàng chịu ảnh hưởng bão lụt. Ảnh: Vietbank
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>Tác giả: Thái Anh</p>
          <p>Nguồn: VnExpress</p>
        </div>
      </div>
    </article>
  );
}