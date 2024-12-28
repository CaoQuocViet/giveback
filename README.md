# GIVEBACK Frontend

## Giới Thiệu

GIVEBACK là một nền tảng hỗ trợ đóng góp từ thiện cho vùng thiên tai tại Việt Nam. Hệ thống được thiết kế để quản lý các chiến dịch từ thiện, xử lý đóng góp của người dùng, và cung cấp các báo cáo minh bạch về việc sử dụng nguồn quỹ. GIVEBACK nhằm đảm bảo tính công khai, minh bạch và hiệu quả trong quản lý quyên góp và phân phối tài trợ.

![Demo](Resources\img\demo\Giveback2.png)

Chúng tôi mong muốn nhận được sự đóng góp từ cộng đồng để có thể ứng dụng thực tế và hỗ trợ hiệu quả cho người Việt bị ảnh hưởng bởi thiên tai.

## Các Chức Năng Chính

![Demo](Resources\img\demo\giveback_usecase.png)

### 1. Đăng Ký và Xác Thực Tài Khoản
- **Đăng ký tài khoản:**
  - Người dùng có thể đăng ký với vai trò DONOR (Người đóng góp), CHARITY (Tổ chức từ thiện), hoặc BENEFICIARY (Người nhận hỗ trợ).
  - Nhập thông tin cơ bản như email, mật khẩu, họ tên, số điện thoại, địa chỉ.
  - Xác thực qua OTP gửi đến số điện thoại.

- **Xác thực tài khoản CHARITY:**
  - Tổ chức từ thiện cần cung cấp giấy phép hoạt động.
  - Admin kiểm tra và xác thực giấy phép trước khi cập nhật trạng thái thành VERIFIED.

![Demo](Resources\img\demo\Giveback3.png)

### 2. Quản Lý Chiến Dịch Từ Thiện
- **Tạo chiến dịch mới (CHARITY):**
  - Nhập thông tin chiến dịch như tên, mô tả, ngân sách mục tiêu, địa điểm, thời gian bắt đầu và kết thúc.
  - Định vị địa điểm cụ thể (Tỉnh/Thành, Quận/Huyện, Phường/Xã, Số/Đường/Ấp).
  - Đăng tải hình ảnh minh họa cho chiến dịch.

![Demo](Resources\img\demo\Giveback4.png)

- **Chỉnh sửa thông tin chiến dịch (CHARITY):**
  - Cập nhật các thông tin có thể chỉnh sửa như trạng thái, mô tả, ngân sách.
  - Hệ thống kiểm tra tính hợp lệ của thông tin trước khi lưu thay đổi.

- **Xóa chiến dịch (CHARITY):**
  - Tổ chức có thể xóa chiến dịch thuộc quyền quản lý.
  - Hệ thống xử lý các liên kết và dữ liệu liên quan đến chiến dịch bị xóa.

### 3. Đóng Góp Từ Thiện
- **Thực hiện đóng góp (DONOR):**
  - Chọn chiến dịch muốn đóng góp.
  - Nhập số tiền đóng góp và ghi chú (nếu có).
  - Chọn phương thức thanh toán (Chuyển khoản ngân hàng, Ví điện tử như Momo, VNPAY).
  - Xác nhận thông tin và hoàn tất giao dịch.

- **Xử lý thanh toán:**
  - Hệ thống tích hợp với các cổng thanh toán như ZaloPay để xử lý giao dịch.
  - Cập nhật trạng thái thanh toán (PENDING, SUCCESS, FAILED) dựa trên phản hồi từ cổng thanh toán.

### 4. Xem và Quản Lý Báo Cáo
- **Xuất báo cáo (DONOR & CHARITY):**
  - Người dùng có thể xuất báo cáo chi tiết dưới định dạng PDF hoặc Excel.
  - Báo cáo bao gồm thông tin tổng quan về chiến dịch, đóng góp, và phân bổ nguồn quỹ.

- **Xem báo cáo tổng quan (ADMIN & CHARITY):**
  - Hệ thống hiển thị các loại báo cáo như số tổ chức từ thiện, số chiến dịch, tổng tiền quyên góp, và số người đóng góp.
  - Cung cấp biểu đồ tương ứng để dễ dàng theo dõi.

### 5. Bình Luận và Đánh Giá
- **Tương tác với chiến dịch (DONOR & BENEFICIARY):**
  - Người dùng có thể bình luận về chiến dịch, đánh giá bằng sao (1-5).
  - Chia sẻ thông tin chiến dịch trên mạng xã hội.

![Demo](Resources\img\demo\Giveback5.png)

- **Quản lý bình luận (ADMIN):**
  - Kiểm duyệt nội dung bình luận để đảm bảo không vi phạm các quy định.

### 6. Quản Lý Người Dùng
- **Quản lý hồ sơ cá nhân:**
  - Người dùng có thể chỉnh sửa thông tin cá nhân như họ tên, email, ảnh đại diện, địa chỉ.
  - Không thể chỉnh sửa các thông tin quan trọng như số điện thoại, vai trò.

- **Phân quyền người dùng:**
  - Vai trò ADMIN có quyền quản lý toàn bộ hệ thống.
  - CHARITY và BENEFICIARY có các quyền hạn riêng biệt tùy theo vai trò.

### 7. Bảo Mật và Kiểm Duyệt
- **Xác thực và phân quyền:**
  - Sử dụng JWT để xác thực người dùng.
  - Phân quyền dựa trên vai trò để truy cập các chức năng phù hợp.

- **Kiểm duyệt giấy phép CHARITY:**
  - Admin kiểm tra tính hợp lệ của giấy phép hoạt động từ các tổ chức từ thiện.

## Các Chức Năng Phụ

### 1. Bản Đồ Nhiệt (Heatmap)
- **Hiển thị vùng bị ảnh hưởng (DONOR & PUBLIC):**
  - Tích hợp bản đồ nhiệt để hiển thị các vùng chịu ảnh hưởng bởi thiên tai.
  - Cập nhật thông tin real-time từ các nguồn chính thức.

### 2. Bảng Tin Cập Nhật Tình Hình Thiên Tai
- **News Feed:**
  - Hiển thị các bản tin cập nhật về tình hình thiên tai và các hoạt động hỗ trợ.
  - Người dùng có thể bình luận và chia sẻ thông tin trên bảng tin.

![Demo](Resources\img\demo\Heatmap.png)

## Quy Trình Sử Dụng OTP và Xác Thực
- **Gửi OTP:**
  - Hệ thống gửi mã OTP qua số điện thoại để xác thực người dùng trong quá trình đăng ký và đăng nhập.

- **Xác nhận OTP:**
  - Người dùng nhập mã OTP để hoàn tất quá trình xác thực tài khoản.

## Hệ Thống Bảo Mật và Kiểm Duyệt
- **Bảo vệ dữ liệu:**
  - Sử dụng các biện pháp bảo mật như mã hóa mật khẩu, bảo vệ chống lại các lỗ hổng bảo mật phổ biến.

- **Kiểm duyệt nội dung:**
  - Admin có khả năng kiểm duyệt các nội dung người dùng đăng tải như bình luận, đánh giá để đảm bảo tính phù hợp và tuân thủ quy định.

## Công Nghệ Sử Dụng
- **Frontend:**
  - Next.js, TypeScript, Tailwind CSS.

- **Backend:**
  - Node.js, Express.js, PostgreSQL, Sequelize

- **Công cụ khác:**
  - Docker, Git, ESLint, Prettier.

## Kết

Hệ thống GIVEBACK được thiết kế nhằm cung cấp một nền tảng mạnh mẽ và linh hoạt để quản lý các hoạt động từ thiện, đảm bảo tính minh bạch và hiệu quả trong việc sử dụng nguồn quỹ từ thiện. Với các chức năng đa dạng và công nghệ hiện đại, GIVEBACK hy vọng sẽ hỗ trợ hiệu quả cho các nạn nhân bị ảnh hưởng bởi thiên tai tại Việt Nam.

---

## Cách Thức Đóng Góp

Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng để hoàn thiện và nâng cao hệ thống. Bạn có thể đóng góp bằng cách:

1. **Fork repository**.
2. **Tạo một nhánh mới** cho tính năng hoặc sửa lỗi bạn muốn thêm.
3. **Gửi Pull Request** với mô tả chi tiết về các thay đổi của bạn.

Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua email: [vietcao10@gmail.com](mailto:vietcao10@gmail.com).

## Liên Kết Repository

- **Frontend:** [https://github.com/CaoQuocViet/giveback](https://github.com/CaoQuocViet/giveback)
- **Backend:** [https://github.com/CaoQuocViet/giveback-server](https://github.com/CaoQuocViet/giveback-server)
