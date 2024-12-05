export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>
      
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Xin chào, Người dùng!
        </h2>
        <p className="text-gray-600">
          Chọn chức năng từ menu bên trái để bắt đầu.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Tổ chức từ thiện</h3>
          <p className="text-3xl font-bold">123</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Chiến dịch đang diễn ra</h3>
          <p className="text-3xl font-bold">45</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-2">Tổng số tiền quyên góp</h3>
          <p className="text-3xl font-bold">789.5M</p>
        </div>
      </div>
    </div>
  );
} 