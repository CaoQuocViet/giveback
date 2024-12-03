"use client";

import { motion } from "framer-motion";

export default function DocumentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">
              Hướng dẫn & Mục tiêu Dự án GIVEBACK
            </h1>
            <p className="mt-2 text-blue-100">
              Hệ thống kết nối và quản lý hoạt động từ thiện
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-8">
            {/* Giới thiệu */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📖</span> Giới thiệu
              </h2>
              <div className="prose text-gray-600">
                <p>
                  GIVEBACK là nền tảng kết nối các nhà hảo tâm với các tổ chức từ thiện uy tín,
                  nhằm hỗ trợ đồng bào gặp khó khăn do thiên tai. Chúng tôi cam kết:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Minh bạch trong quản lý và phân phối tài trợ</li>
                  <li>Kết nối trực tiếp người đóng góp với tổ chức từ thiện</li>
                  <li>Cập nhật thông tin thiên tai kịp thời</li>
                  <li>Báo cáo chi tiết quá trình sử dụng đóng góp</li>
                </ul>
              </div>
            </section>

            {/* Đối tượng sử dụng */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">👥</span> Đối tượng Sử dụng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Người Đóng góp</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Đăng ký tài khoản dễ dàng</li>
                    <li>Xác thực qua số điện thoại</li>
                    <li>Chọn hình thức đóng góp</li>
                    <li>Theo dõi tiến độ sử dụng</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Tổ chức Từ thiện</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Xác thực giấy phép hoạt động</li>
                    <li>Tạo chiến dịch cứu trợ</li>
                    <li>Quản lý và phân phối</li>
                    <li>Báo cáo minh bạch</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Quản trị viên</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Kiểm duyệt tổ chức</li>
                    <li>Giám sát hoạt động</li>
                    <li>Quản lý hệ thống</li>
                    <li>Xử lý khiếu nại</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tính năng nổi bật */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">⭐</span> Tính năng Nổi bật
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    <span className="mr-2">💳</span> Đa dạng Hình thức Đóng góp
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Chuyển khoản ngân hàng</li>
                    <li>Ví điện tử (Momo, VNPay)</li>
                    <li>Thẻ tín dụng/ghi nợ</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    <span className="mr-2">📊</span> Báo cáo Minh bạch
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Cập nhật thời gian thực</li>
                    <li>Thống kê chi tiết</li>
                    <li>Xuất báo cáo định kỳ</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    <span className="mr-2">🗺️</span> Bản đồ Thiên tai
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Hiển thị vùng bị ảnh hưởng</li>
                    <li>Thông tin cứu trợ</li>
                    <li>Cập nhật tình hình</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    <span className="mr-2">📱</span> Tiện ích
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Thông báo tự động</li>
                    <li>Tương tác dễ dàng</li>
                    <li>Hỗ trợ 24/7</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quy trình hoạt động */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🔄</span> Quy trình Hoạt động
              </h2>
              <div className="relative">
                <div className="absolute left-4 inset-y-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6 relative">
                  {[
                    {
                      title: "Bước 1: Đăng ký & Xác thực",
                      desc: "Đăng ký tài khoản và xác thực qua OTP"
                    },
                    {
                      title: "Bước 2: Tạo hoặc Chọn Chiến dịch",
                      desc: "Tổ chức tạo chiến dịch hoặc người dùng chọn chiến dịch để đóng góp"
                    },
                    {
                      title: "Bước 3: Thực hiện Đóng góp",
                      desc: "Chọn hình thức và thực hiện đóng góp"
                    },
                    {
                      title: "Bước 4: Theo dõi & Nhận Báo cáo",
                      desc: "Cập nhật tiến độ và nhận báo cáo sử dụng đóng góp"
                    }
                  ].map((step, index) => (
                    <div key={index} className="ml-8 relative">
                      <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
