# Hệ thống đóng góp từ thiện vùng thiên tai lũ lụt

**Bài tập cá nhân**: Vẽ sơ đồ USE CASE của đặt tả yêu cầu phần mềm này

- Demo có xác thực OTP
- Kiểm duyệt giấy phép giống như quy trình bên ngoài
- Các chức năng cần thực tế, dùng được, rõ ràng, thêm cái nào hay thì cộng điểm
- Tổ chức từ thiện đề xuất cá nhân được hỗ trợ
- Phải dùng web app
- Tính năng heatmap

## Mục tiêu hệ thống

Hệ thống được thiết kế để hỗ trợ việc quyên góp từ thiện cho các nạn nhân bị ảnh hưởng bởi thiên tai (ví dụ bão Yagi miền Bắc) với mục tiêu đảm bảo tính công khai, minh bạch và hiệu quả trong quản lý quyên góp và phân phối tài trợ.

## 0. Các chức năng chính

### Đăng ký và xác minh tài khoản
- **Người dùng**: Người đóng góp, tổ chức từ thiện, người nhận hỗ trợ.
- **Yêu cầu**: 
  - Hỗ trợ đăng ký tài khoản.
  - Xác minh qua số điện thoại (OTP).
  - Tổ chức từ thiện cần cung cấp giấy phép hoạt động và được kiểm duyệt khi sử dụng hệ thống.

### Đóng góp từ thiện
- **Người dùng**: Người đóng góp.
- **Yêu cầu**:
  - Cho phép đóng góp qua nhiều hình thức (chuyển khoản ngân hàng, ví điện tử, thẻ tín dụng, tiền mặt,...).
  - Hiển thị đầy đủ về thông tin chi tiết và tình hình bão lũ và nhu cầu cứu trợ.

### Theo dõi và báo cáo
- **Người dùng**: Người đóng góp, tổ chức từ thiện, quản trị hệ thống.
- **Yêu cầu**:
  - Cung cấp thông tin công khai về tổng số tiền và vật phẩm đã quyên góp, phân phối, và số dư còn lại.
  - Hiển thị danh sách đóng góp theo thời gian thực.
  - Hỗ trợ xuất báo cáo chi tiết.

### Quản lý chiến dịch cứu trợ
- **Người dùng**: Tổ chức từ thiện.
- **Yêu cầu**:
  - Tạo và quản lý các chiến dịch cứu trợ (mô tả mục tiêu, thời gian, ngân sách dự kiến).
  - Cập nhật trạng thái chiến dịch và thông báo tự động cho người đóng góp về các thay đổi của chiến dịch.

### Phản hồi và đánh giá
- **Người dùng**: Người đóng góp, người nhận hỗ trợ.
- **Yêu cầu**:
  - Cho phép gửi phản hồi và đánh giá về tình hình quyên góp và nhận hỗ trợ.
  - Hiển thị phản hồi để tạo lòng tin từ cộng đồng.

## 0. Các chức năng khác

### Bản đồ lũ và tình hình giúp đỡ (heatmap)
- **Người dùng**: Người đóng góp, tổ chức từ thiện, quản trị hệ thống.
- **Yêu cầu**:
  - Tích hợp bản đồ nhiệt tương tác để hiển thị vùng bị ảnh hưởng bởi thiên tai, mức độ thiệt hại, và khu vực cần giúp đỡ.
  - Cập nhật thông tin theo thời gian thực dựa trên dữ liệu từ các cơ quan khí tượng, tổ chức cứu trợ hoặc các nguồn khác.

### Bảng tin cập nhật tình hình lũ (news feed)
- **Người dùng**: Người đóng góp, tổ chức từ thiện, quản trị hệ thống.
- **Yêu cầu**:
  - Tạo bảng tin cập nhật tình hình lũ lụt và các hoạt động hỗ trợ theo thời gian thực từ các nguồn chính thức.
  - Cho phép người dùng bình luận chia sẻ thông tin và đăng tải cập nhật tình hình thực tế.

## 0. Yêu cầu về hệ thống và công nghệ

- Làm trên môi trường web
- Dịch vụ bản đồ: Google Maps,...
- Cập nhật thông tin real-time: WebSocket, Push Notification,...
- API cập nhật dữ liệu thời gian thực từ các nguồn chính thức: cơ quan khí tượng, chính quyền địa phương, tổ chức cứu trợ,...
