# Phân chia công việc dự án GIVEBACK (20 ngày)

## A. Giai đoạn 1: Phân tích & Thiết kế (4 ngày)

### Người 1 (Frontend + Database + Diagrams):
1. Documentation & Diagrams:
   - Vẽ các sơ đồ cho Template#2-PhanTichThietKe.docx:
     + Sơ đồ Use Case tổng quát
     + Sơ đồ tuần tự (Sequence Diagram)
     + Sơ đồ lớp (Class Diagram)
     + Sơ đồ thành phần (Component Diagram)
     + Sơ đồ ERD
   - Vẽ các mockup UI/Prototype
   - Vẽ sơ đồ kiến trúc hệ thống
   - Thiết kế database schema
   - Tạo tài liệu hướng dẫn sử dụng (User Manual)

2. Frontend:
   - Phân tích yêu cầu (2 ngày):
     - Thiết kế cơ sở dữ liệu:
       + Phân tích & thiết kế schema
       + Thiết kế quan hệ giữa các bảng
       + Viết scripts tạo DB
     - Thiết kế prototype UI/UX đơn giản trên Figma (focus vào layout chính)
     - Xác định các luồng người dùng cốt lõi

   - Thiết kế giao diện (2 ngày):
     - Thiết kế layout tổng thể
     - Thiết kế các components chính
     - Thiết kế responsive cho mobile/tablet
     - Xây dựng style guide cơ bản

3. Database:
   - Phân tích & thiết kế schema
   - Thiết kế quan hệ giữa các bảng
   - Viết scripts tạo DB
   - Implement database migrations
   - Tạo seeders cho development
   - Setup database indexes
   - Setup production database

4. Deployment & Testing:
   - Deploy frontend (Vercel/Netlify)
   - Tạo demo video ngắn

### Người 2 (Backend + Reports):
1. Documentation & Reports:
   - Template#0-ProjectProposal.docx:
     + Mô tả tổng quan dự án
     + Phân tích yêu cầu
     + Kế hoạch thực hiện
     + Công nghệ sử dụng
   
   - Template#2-PhanTichThietKe.docx:
     + Đặc tả yêu cầu chức năng
     + Đặc tả yêu cầu phi chức năng
     + Mô tả các đối tượng
     + Mô tả luồng xử lý
     + Thiết kế API
     + Thiết kế bảo mật

   - Template#3-KetQuaDatDuoc.docx:
     + Kết quả đạt được
     + Hướng dẫn cài đặt
     + Hướng dẫn build & deploy
     + Các API endpoints
     + Cấu trúc source code
     + Những khó khăn & giải pháp
   
   - Viết tài liệu API (Swagger/OpenAPI)
   - Viết tài liệu deployment
   - Viết tài liệu bảo mật

2. Backend:
   - Xây dựng lại yêu cầu chi tiết từ file gốc vào REQs.txt
   - Vẽ sơ đồ Use Case tổng quát
   - Thiết kế API endpoints cốt lõi
   - Xác định các services chính

   - Thiết kế kiến trúc (2 ngày):
     - Thiết kế authentication flow
     - Lên kế hoạch tích hợp payment gateway
     - Viết tài liệu thiết kế hệ thống
     - Viết tài liệu API

   - Setup & Core Services (3 ngày):
     - Setup Node.js + TypeScript + Express
     - User service + Auth service
     - Campaign service
     - Donation service
     - Viết tài liệu setup hướng dẫn

   - Features chính (5 ngày):
     - OTP verification
     - Payment integration (ZaloPay)
     - File upload service
     - Email notifications
     - Basic reporting
     - Viết tài liệu API cho từng feature

   - Security & Documentation (4 ngày):
     - JWT + RBAC implementation
     - Input validation
     - Basic security measures
     - Viết tài liệu bảo mật
     - Viết tài liệu deployment

3. Deployment & Testing:
   - Deploy backend (Railway/Heroku)

### Công việc chung
1. Báo cáo & Presentation:
   - Review & hoàn thiện 3 file báo cáo
   - Chuẩn bị slide
   - Demo kịch bản
   - Chuẩn bị video demo

2. Quy trình làm việc:
   - Daily standup meeting
   - Code review
   - Git flow
   - Báo cáo tiến độ

## B. Giai đoạn 2: Phát triển (12 ngày)

### Người 1 (Frontend + Database):
1. Setup & Database (3 ngày):
   - Setup Next.js + TypeScript
   - Implement database migrations
   - Tạo seeders cho development
   - Setup database indexes

2. Phát triển các trang chính (5 ngày):
   - Trang chủ
   - Auth pages (đăng ký/đăng nhập)
   - Dashboard
   - CRUD chiến dịch
   - CRUD đóng góp
   - Profile pages

3. Tích hợp & Features (4 ngày):
   - Tích hợp API
   - Authentication UI
   - File upload UI
   - Charts & thống kê đơn giản
   - Export reports UI

### Người 2 (Backend + Documentation):
1. Setup & Core Services (3 ngày):
   - Setup Node.js + TypeScript + Express
   - User service + Auth service
   - Campaign service
   - Donation service
   - Viết tài liệu setup hướng dẫn

2. Features chính (5 ngày):
   - OTP verification
   - Payment integration (ZaloPay)
   - File upload service
   - Email notifications
   - Basic reporting
   - Viết tài liệu API cho từng feature

3. Security & Documentation (4 ngày):
   - JWT + RBAC implementation
   - Input validation
   - Basic security measures
   - Viết tài liệu bảo mật
   - Viết tài liệu deployment

## C. Testing & Deployment (3 ngày)

### Người 1:
- Unit tests cho components chính
- Deploy frontend (Vercel/Netlify)
- Setup production database
- Tạo demo video ngắn

### Người 2:
- Unit tests cho services chính
- Deploy backend (Railway/Heroku)
- Viết tài liệu deployment
- Viết API docs chi tiết

## D. Báo cáo & Presentation (1 ngày)

### Cả hai:
1. Chuẩn bị báo cáo:
   - Hoàn thiện 3 file báo cáo theo yêu cầu
   - Chuẩn bị slide
   - Demo kịch bản

## Timeline chi tiết (20 ngày)
- Ngày 1-4: Phân tích & Thiết kế
- Ngày 5-16: Phát triển
- Ngày 17-19: Testing & Deployment
- Ngày 20: Báo cáo & Presentation

## Quy tắc làm việc
1. Standup meeting mỗi sáng (15 phút)
2. Code review cuối ngày
3. Unit test cho các chức năng chính
4. Document API và component quan trọng
5. Git flow đơn giản (main + feature branches)
6. Báo cáo vướng mắc ngay khi gặp

## Ưu tiên
1. Hoàn thành các chức năng cốt lõi trước
2. UI/UX đơn giản nhưng đầy đủ chức năng
3. Tập trung vào tính ổn định của hệ thống
4. Đảm bảo demo được đầy đủ luồng chính
5. Documentation đủ để bảo vệ đồ án

## Tổng kết công việc theo người

### Người 1 (Frontend + Database + Diagrams)
1. Documentation & Diagrams:
   - Vẽ các sơ đồ cho Template#2-PhanTichThietKe.docx:
     + Sơ đồ Use Case tổng quát
     + Sơ đồ tuần tự (Sequence Diagram)
     + Sơ đồ lớp (Class Diagram)
     + Sơ đồ thành phần (Component Diagram)
     + Sơ đồ ERD
   - Vẽ các mockup UI/Prototype
   - Vẽ sơ đồ kiến trúc hệ thống
   - Thiết kế database schema
   - Tạo tài liệu hướng dẫn sử dụng (User Manual)

2. Database:
   - Phân tích & thiết kế schema
   - Thiết kế quan hệ giữa các bảng
   - Viết scripts tạo DB
   - Implement database migrations
   - Tạo seeders cho development
   - Setup database indexes
   - Setup production database

3. Frontend:
   - Thiết kế prototype UI/UX trên Figma
   - Thiết kế layout & components
   - Setup Next.js + TypeScript
   - Phát triển các trang:
     + Trang chủ
     + Auth pages
     + Dashboard
     + CRUD chiến dịch
     + CRUD đóng góp
     + Profile pages
   - Tích hợp API
   - Authentication UI
   - File upload UI
   - Charts & thống kê
   - Export reports UI
   - Unit tests cho components

4. Deployment & Testing:
   - Deploy frontend (Vercel/Netlify)
   - Setup production database
   - Tạo demo video ngắn

### Người 2 (Backend + Reports)
1. Documentation & Reports:
   - Template#0-ProjectProposal.docx:
     + Mô tả tổng quan dự án
     + Phân tích yêu cầu
     + Kế hoạch thực hiện
     + Công nghệ sử dụng
   
   - Template#2-PhanTichThietKe.docx:
     + Đặc tả yêu cầu chức năng
     + Đặc tả yêu cầu phi chức năng
     + Mô tả các đối tượng
     + Mô tả luồng xử lý
     + Thiết kế API
     + Thiết kế bảo mật

   - Template#3-KetQuaDatDuoc.docx:
     + Kết quả đạt được
     + Hướng dẫn cài đặt
     + Hướng dẫn build & deploy
     + Các API endpoints
     + Cấu trúc source code
     + Những khó khăn & giải pháp

   - Viết tài liệu kỹ thuật:
     + Tài liệu API (Swagger/OpenAPI)
     + Tài liệu deployment
     + Tài liệu bảo mật
     + Tài liệu setup hướng dẫn

2. Backend:
   - Thiết kế API endpoints
   - Thiết kế authentication flow
   - Setup Node.js + TypeScript + Express
   - Phát triển các services:
     + User service
     + Auth service
     + Campaign service
     + Donation service
   - OTP verification
   - Payment integration (ZaloPay)
   - File upload service
   - Email notifications
   - Basic reporting
   - JWT + RBAC implementation
   - Input validation
   - Security measures
   - Unit tests cho services

3. Deployment & Testing:
   - Deploy backend (Railway/Heroku)
   - Unit tests cho services chính

### Công việc chung
1. Báo cáo & Presentation:
   - Review & hoàn thiện 3 file báo cáo
   - Chuẩn bị slide
   - Demo kịch bản
   - Chuẩn bị video demo

2. Quy trình làm việc:
   - Daily standup meeting
   - Code review
   - Git flow
   - Báo cáo tiến độ
