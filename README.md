# Giveback - Hệ thống đóng góp từ thiện vùng thiên tai lũ lụt

![Giveback Logo](public/logo.png)

## Giới thiệu

**Giveback** là một dự án nhằm kết nối những tấm lòng hảo tâm với các tổ chức từ thiện uy tín, giúp đỡ các nạn nhân bị ảnh hưởng bởi thiên tai. Dự án hướng tới mục tiêu công khai, minh bạch và hiệu quả trong việc quản lý quyên góp và phân phối tài trợ.

## Mục tiêu

1. **Hỗ trợ quyên góp từ thiện**: Tạo điều kiện thuận lợi cho người dùng đóng góp thông qua các tổ chức từ thiện uy tín.
2. **Cập nhật thông tin thiên tai**: Cung cấp thông tin mới nhất về tình hình thiên tai và các hoạt động hỗ trợ.
3. **Minh bạch và công khai**: Đảm bảo tính minh bạch trong việc quản lý và phân phối tài trợ.

## Các chức năng chính

### 1. Đăng ký và xác minh tài khoản
- **Người dùng**: Người đóng góp, tổ chức từ thiện, quản trị viên.
- **Xác minh**: Hỗ trợ đăng ký tài khoản và xác minh qua số điện thoại (OTP).

### 2. Đóng góp từ thiện
- **Hình thức đóng góp**: Chuyển khoản ngân hàng, ví điện tử (Momo, VNPAY), thẻ tín dụng, tiền mặt.
- **Lựa chọn nơi đóng góp**: Lựa chọn từ thông tin newsfeed.

### 3. Theo dõi và báo cáo
- **Thông tin công khai**: Tổng số tiền và vật phẩm đã quyên góp, đã phân phối, số dư còn lại.
- **Báo cáo chi tiết**: Theo người, theo ngày, theo tháng, theo tổ chức từ thiện, theo thiên tai.

### 4. Quản lý chiến dịch cứu trợ
- **Tạo chiến dịch**: Tạo và quản lý các chiến dịch cứu trợ, cập nhật trạng thái chiến dịch.
- **Thông báo tự động**: Notify trên user profile và thử nghiệm SMS.

### 5. Phản hồi và đánh giá
- **Gửi phản hồi**: Cho phép người dùng gửi phản hồi và đánh giá về tình hình quyên góp và nhận hỗ trợ.

### 6. Bản đồ lũ và tình hình giúp đỡ (heatmap)
- **Hiển thị bản đồ nhiệt**: Hiển thị vùng bị ảnh hưởng bởi thiên tai và khu vực cần giúp đỡ.

### 7. Bảng tin cập nhật tình hình lũ (news feed)
- **Cập nhật thông tin**: Tạo bảng tin cập nhật tình hình lũ lụt và các hoạt động hỗ trợ theo thời gian thực.

## Công nghệ sử dụng

- **Next.js**: Framework React để xây dựng ứng dụng web.
- **Tailwind CSS**: Framework CSS để tạo giao diện người dùng.
- **Firebase**: Nền tảng phát triển ứng dụng để xác thực và lưu trữ dữ liệu.
- **Supabase**: Nền tảng cơ sở dữ liệu thời gian thực.
- **Google Maps**: Dịch vụ bản đồ để hiển thị bản đồ nhiệt.

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- **Node.js**: Phiên bản 14.x hoặc mới hơn.
- **npm**: Phiên bản 6.x hoặc mới hơn.

### Cài đặt

1. Clone repository:

    ```sh
    git clone https://github.com/yourusername/giveback.git
    cd giveback
    ```

2. Cài đặt các phụ thuộc:

    ```sh
    npm install
    ```

3. Tạo file `.env.local` và cấu hình các biến môi trường cần thiết. Ví dụ:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Chạy dự án:

    ```sh
    npm run dev
    ```

5. Mở trình duyệt và truy cập `http://localhost:3000`.

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng. Nếu bạn muốn đóng góp, vui lòng tạo một pull request hoặc mở một issue trên GitHub.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem tệp [LICENSE](LICENSE) để biết thêm chi tiết.

---

Cảm ơn bạn đã quan tâm đến dự án **Giveback**. Chúng tôi hy vọng rằng dự án này sẽ mang lại nhiều giá trị cho cộng đồng và giúp đỡ những người cần sự hỗ trợ.
