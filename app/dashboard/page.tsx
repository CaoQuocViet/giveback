export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold dark:text-white">Bảng điều khiển</h1>

      {/* Welcome Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800 dark:shadow-gray-700/20">
        <h2 className="mb-2 text-xl font-semibold dark:text-gray-100">Xin chào, Người dùng!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Chọn chức năng từ menu bên trái để bắt đầu.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800 dark:shadow-gray-700/20">
          <h3 className="mb-2 font-semibold dark:text-gray-100">Tổ chức từ thiện</h3>
          <p className="text-3xl font-bold dark:text-gray-100">123</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800 dark:shadow-gray-700/20">
          <h3 className="mb-2 font-semibold dark:text-gray-100">Chiến dịch đang diễn ra</h3>
          <p className="text-3xl font-bold dark:text-gray-100">45</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800 dark:shadow-gray-700/20">
          <h3 className="mb-2 font-semibold dark:text-gray-100">Tổng số tiền quyên góp</h3>
          <p className="text-3xl font-bold dark:text-gray-100">789.5M</p>
        </div>
      </div>
    </div>
  )
}
