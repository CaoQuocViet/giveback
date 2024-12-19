"use client"

import { motion } from "framer-motion"

export default function DocumentPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 dark:from-blue-700 dark:to-blue-900">
            <h1 className="text-3xl font-bold text-white">
              Hướng dẫn & Mục tiêu Dự án GIVEBACK
            </h1>
            <p className="mt-2 text-blue-100">
              Hệ thống kết nối và quản lý hoạt động từ thiện
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 px-6 py-8">
            {/* Giới thiệu */}
            <section>
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
                <span className="mr-2">📖</span> Giới thiệu
              </h2>
              <div className="prose text-gray-600 dark:text-gray-300">
                <p>
                  GIVEBACK là nền tảng kết nối các nhà hảo tâm với các tổ chức
                  từ thiện uy tín, nhằm hỗ trợ đồng bào gặp khó khăn do thiên
                  tai. Chúng tôi cam kết:
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Minh bạch trong quản lý và phân phối tài trợ</li>
                  <li>Kết nối trực tiếp người đóng góp với tổ chức từ thiện</li>
                  <li>Cập nhật thông tin thiên tai kịp thời</li>
                  <li>Báo cáo chi tiết quá trình sử dụng đóng góp</li>
                </ul>
              </div>
            </section>

            {/* Đối tượng sử dụng */}
            <section>
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
                <span className="mr-2">👥</span> Đối tượng Sử dụng
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                  <h3 className="mb-2 font-semibold text-blue-800 dark:text-blue-300">
                    Người Đóng góp
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Đăng ký tài khoản dễ dàng</li>
                    <li>Xác thực qua số điện thoại</li>
                    <li>Chọn hình thức đóng góp</li>
                    <li>Theo dõi tiến độ sử dụng</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/30">
                  <h3 className="mb-2 font-semibold text-green-800 dark:text-green-300">
                    Tổ chức Từ thiện
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Xác thực giấy phép hoạt động</li>
                    <li>Tạo chiến dịch cứu trợ</li>
                    <li>Quản lý và phân phối</li>
                    <li>Báo cáo minh bạch</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
                  <h3 className="mb-2 font-semibold text-purple-800 dark:text-purple-300">
                    Quản trị viên
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
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
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
                <span className="mr-2">⭐</span> Tính năng Nổi bật
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    <span className="mr-2">💳</span> Đa dạng Hình thức Đóng góp
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Chuyển khoản ngân hàng</li>
                    <li>Ví điện tử (Momo, VNPay)</li>
                    <li>Thẻ tín dụng/ghi nợ</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    <span className="mr-2">📊</span> Báo cáo Minh bạch
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Cập nhật thời gian thực</li>
                    <li>Thống kê chi tiết</li>
                    <li>Xuất báo cáo định kỳ</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    <span className="mr-2">🗺️</span> Bản đồ Thiên tai
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Hiển thị vùng bị ảnh hưởng</li>
                    <li>Thông tin cứu trợ</li>
                    <li>Cập nhật tình hình</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    <span className="mr-2">📱</span> Tiện ích
                  </h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Thông báo tự động</li>
                    <li>Tương tác dễ dàng</li>
                    <li>Hỗ trợ 24/7</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quy trình hoạt động */}
            <section>
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
                <span className="mr-2">🔄</span> Quy trình Hoạt động
              </h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <div className="relative left-3 space-y-6">
                  {[
                    {
                      title: "Bước 1: Đăng ký & Xác thực",
                      desc: "Đăng ký tài khoản và xác thực qua OTP",
                    },
                    {
                      title: "Bước 2: Tạo hoặc Chọn Chiến dịch",
                      desc: "Tổ chức tạo chiến dịch hoặc người dùng chọn chiến dịch để đóng góp",
                    },
                    {
                      title: "Bước 3: Thực hiện Đóng góp",
                      desc: "Chọn hình thức và thực hiện đóng góp",
                    },
                    {
                      title: "Bước 4: Theo dõi & Nhận Báo cáo",
                      desc: "Cập nhật tiến độ và nhận báo cáo sử dụng đóng góp",
                    },
                  ].map((step, index) => (
                    <div key={index} className="relative ml-8">
                      <div className="absolute -left-10 mt-1.5 flex size-6 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-700">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Liên hệ hỗ trợ */}
            <section>
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
                <span className="mr-2">📞</span> Liên hệ Hỗ trợ
              </h2>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua các kênh dưới đây:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Email:</span> <a href="mailto:support@giveback.vn" className="ml-2 hover:underline">support@giveback.vn</a>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Số điện thoại:</span> <span className="ml-2">+84 123 456 789</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Địa chỉ:</span> <span className="ml-2">123 Nhà tui, Đường ABC, TP.HCM</span>
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
