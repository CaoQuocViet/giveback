export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Bảng điều khiển</h1>

      {/* Welcome Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-semibold">Xin chào, Người dùng!</h2>
        <p className="text-gray-600">
          Chọn chức năng từ menu bên trái để bắt đầu.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-2 font-semibold">Tổ chức từ thiện</h3>
          <p className="text-3xl font-bold">123</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-2 font-semibold">Chiến dịch đang diễn ra</h3>
          <p className="text-3xl font-bold">45</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-2 font-semibold">Tổng số tiền quyên góp</h3>
          <p className="text-3xl font-bold">789.5M</p>
        </div>
      </div>
    </div>
  )
}
