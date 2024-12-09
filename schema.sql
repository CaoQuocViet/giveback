-- Enums
CREATE TYPE Role AS ENUM (
  'ADMIN',     -- Quản trị viên hệ thống
  'DONOR',     -- Người quyên góp
  'CHARITY',   -- Tổ chức từ thiện
  'BENEFICIARY' -- Người thụ hưởng
);

CREATE TYPE CampaignStatus AS ENUM (
  'STARTING',  -- Chiến dịch mới tạo, chưa bắt đầu gây quỹ
  'ONGOING',   -- Đang trong thời gian gây quỹ
  'CLOSED',    -- Đã kết thúc gây quỹ, chưa hoàn thành phân phối
  'COMPLETED'  -- Đã hoàn thành phân phối
);

CREATE TYPE VerificationStatus AS ENUM (
  'PENDING',   -- Đang chờ xác thực
  'VERIFIED',  -- Đã xác thực
  'REJECTED'   -- Từ chối xác thực
);

CREATE TYPE PaymentStatus AS ENUM (
  'PENDING',   -- Đang chờ thanh toán
  'SUCCESS',   -- Thanh toán thành công
  'FAILED'     -- Thanh toán thất bại
);

-- Base tables
CREATE TABLE Users (
  id varchar PRIMARY KEY,                    -- UUID v4
  full_name varchar NOT NULL,                -- Họ tên đầy đủ
  email varchar UNIQUE NOT NULL,             -- Email, dùng để đăng nhập
  phone varchar UNIQUE NOT NULL,             -- Số điện thoại, dùng để xác thực OTP/đăng nhập
  otp_verified boolean NOT NULL DEFAULT false, -- Trạng thái xác thực OTP
  password varchar NOT NULL,                 -- Mật khẩu đã hash
  role Role NOT NULL,                        -- Vai trò người dùng
  profile_image varchar,                     -- URL ảnh đại diện
  province varchar,                          -- Tỉnh/Thành phố
  district varchar,                          -- Quận/Huyện/Thị xã
  ward varchar,                              -- Phường/Xã/Thị trấn
  address varchar,                           -- Số/Đường/Ấp
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Thời điểm tạo
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Thời điểm cập nhật
  phone_verified_at timestamp                -- Thời điểm xác thực số điện thoại
);

CREATE TABLE Admins (
  id varchar PRIMARY KEY REFERENCES Users(id), -- ID admin, link với Users
  is_system_admin boolean NOT NULL DEFAULT false -- Cờ để phân biệt admin với user Role khác
);

-- Thêm rating, title, description,
-- license_description vào Charities
CREATE TABLE Charities (
  id varchar PRIMARY KEY REFERENCES Users(id), -- ID tổ chức, link với Users
  title varchar NOT NULL,                    -- Tên tổ chức
  description text,                          -- Mô tả về tổ chức
  
  -- Thông tin pháp lý
  license_description text,                  -- Mô tả về giấy phép
  license_image_url varchar NOT NULL,        -- URL ảnh giấy phép
  license_number varchar,                    -- Số giấy phép hoạt động
  license_date timestamp,                    -- Ngày cấp giấy phép
  license_issuer varchar,                    -- Cơ quan cấp phép
  verification_status VerificationStatus NOT NULL DEFAULT 'PENDING', -- Trạng thái xác thực
  
  -- Thông tin tổ chức
  founding_date timestamp,                   -- Ngày thành lập
  website varchar,                           -- Website chính thức
  social_links jsonb,                        -- Links mạng xã hội (Facebook, Twitter...)
  
  -- Thông tin merchant
  merchant_id varchar UNIQUE,                -- ID định danh merchant từ cổng thanh toán
  merchant_name varchar,                     -- Tên merchant đăng ký với cổng thanh toán
  bank_account varchar,                      -- Số tài khoản ngân hàng nhận tiền
  payment_gateway varchar,                   -- Cổng thanh toán sử dụng (VNPay, Momo...)
  api_key varchar,                           -- Khóa API để tích hợp với cổng thanh toán
  
  -- Các trường thống kê
  rating decimal DEFAULT 0,                  -- Điểm đánh giá trung bình
  campaign_count int DEFAULT 0,              -- Số lượng chiến dịch
  total_raised decimal DEFAULT 0,            -- Tổng số tiền đã gây quỹ thành công
  
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm cập nhật
  bank_name varchar,                         -- Tên ngân hàng
  bank_branch varchar,                       -- Chi nhánh ngân hàng
  bank_owner varchar                         -- Chủ tài khoản ngân hàng
);

-- Thêm rating, goal vào Campaigns
CREATE TABLE Campaigns (
  id varchar PRIMARY KEY,                    -- UUID v4
  charity_id varchar REFERENCES Charities(id), -- ID tổ chức tạo chiến dịch
  title varchar NOT NULL,                    -- Tên chiến dịch
  description text,                          -- Mô tả chiến dịch
  detail_goal text,                          -- Chi tiết mục tiêu
  status CampaignStatus NOT NULL DEFAULT 'STARTING', -- Trạng thái chiến dịch
  rating decimal DEFAULT 0,                  -- Điểm đánh giá trung bình
  target_amount decimal NOT NULL,            -- Số tiền mục tiêu
  current_amount decimal DEFAULT 0,          -- Số tiền đã gây quỹ được
  start_date timestamp NOT NULL,             -- Ngày bắt đầu
  end_date timestamp NOT NULL,               -- Ngày kết thúc
  province varchar,                          -- Tỉnh/Thành phố triển khai
  district varchar,                          -- Quận/Huyện/Thị xã triển khai
  ward varchar,                              -- Phường/Xã/Thị trấn triển khai
  address varchar,                           -- Số/Đường/Ấp triển khai
  images varchar NOT NULL,                   -- URLs ảnh chiến dịch
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm cập nhật
  edit_history jsonb                         -- Lịch sử chỉnh sửa
);

CREATE TABLE PaymentMethods (
  id varchar PRIMARY KEY,                    -- UUID v4
  name varchar NOT NULL,                     -- Tên phương thức thanh toán
  transaction_code varchar NOT NULL UNIQUE   -- Mã giao dịch định danh
);

CREATE TABLE Donations (
  id varchar PRIMARY KEY,                    -- UUID v4
  campaign_id varchar REFERENCES Campaigns(id), -- ID chiến dịch được quyên góp
  donor_id varchar REFERENCES Users(id),     -- ID người quyên góp
  payment_method_id varchar REFERENCES PaymentMethods(id), -- ID phương thức thanh toán
  amount decimal NOT NULL,                   -- Số tiền quyên góp
  note text,                                -- Lời nhắn
  invoice_code varchar UNIQUE,               -- Mã hóa đơn do giveback tạo ra
  payment_transaction_id varchar UNIQUE,      -- Mã giao dịch do cổng thanh toán tạo ra
  is_anonymous boolean NOT NULL DEFAULT false, -- Flag đóng góp ẩn danh
  status PaymentStatus NOT NULL DEFAULT 'PENDING', -- Trạng thái thanh toán
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm cập nhật
  is_intermediate boolean DEFAULT false      -- Flag đánh dấu quyên góp trực tiếp qua tổ chức
);

CREATE TABLE Distributions (
  id varchar PRIMARY KEY,                    -- UUID v4
  campaign_id varchar REFERENCES Campaigns(id), -- ID chiến dịch phân phối
  title varchar NOT NULL,                    -- Tên đợt phân phối
  budget decimal NOT NULL,                   -- Ngân sách phân phối
  distribution_date timestamp NOT NULL,      -- Ngày phân phối dự kiến
  
  -- Thông tin địa điểm
  province varchar,                          -- Tỉnh/Thành phố phân phối
  district varchar,                          -- Quận/Huyện/Thị xã phân phối
  ward varchar,                              -- Phường/Xã/Thị trấn phân phối
  address varchar,                           -- Số/Ấp/Đường
  
  -- Thông tin phân phối
  beneficiary_count int NOT NULL,            -- Số lượng người nhận
  description text,                          -- Mô tả đợt phân phối
  proof_images varchar,                      -- URLs ảnh chứng minh
  
  -- Thông tin người tạo/xác nhận
  representative_name varchar REFERENCES Users(id), -- ID người đại diện tổ chức tạo phân phối
  relief_date timestamp,                     -- Ngày thực hiện cứu trợ
  
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP  -- Thời điểm cập nhật
);

CREATE TABLE Comments (
  id varchar PRIMARY KEY,                    -- UUID v4
  campaign_id varchar REFERENCES Campaigns(id), -- ID chiến dịch được comment
  user_id varchar REFERENCES Users(id),      -- ID người comment
  content text NOT NULL,                     -- Nội dung comment
  rating decimal NOT NULL CHECK (rating >= 0 AND rating <= 5), -- Điểm đánh giá
  role Role NOT NULL,                        -- Vai trò người comment
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP -- Thời điểm tạo
);

-- Thêm system donor để tổ chức tạo đóng góp trực tiếp (đảm bảo tính toàn vẹn dữ liệu)
INSERT INTO Users (
  id,
  full_name, 
  email,
  phone,
  password,
  role,
  otp_verified
) VALUES (
  'system_donor',
  'Đóng góp trực tiếp qua tổ chức', 
  'system.donor@giveback.local',
  '0000000000',
  'SYSTEM_ACCOUNT_NOT_FOR_LOGIN', -- password hash không dùng được để login
  'DONOR',
  true -- đã verify OTP
);

-- Tạo bảng OTP
CREATE TABLE OTPCodes (
  id varchar PRIMARY KEY,                    -- UUID v4
  phone varchar NOT NULL REFERENCES Users(phone), -- Số điện thoại nhận OTP
  code varchar NOT NULL,                     -- Mã OTP
  expires_at timestamp NOT NULL,             -- Thời điểm hết hạn
  verified boolean DEFAULT false,            -- Trạng thái xác thực
  attempt_count int DEFAULT 0,               -- Số lần thử nhập sai
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP -- Thời điểm tạo
);

-- Tạo bảng PasswordReset
CREATE TABLE PasswordResets (
  id varchar PRIMARY KEY,                    -- UUID v4
  user_id varchar NOT NULL REFERENCES Users(id), -- ID người dùng reset password
  token varchar NOT NULL UNIQUE,             -- Token reset password
  expires_at timestamp NOT NULL,             -- Thời điểm hết hạn
  used boolean DEFAULT false,                -- Trạng thái sử dụng
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP -- Thời điểm tạo
);

-- Indexes
-- Users indexes
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_phone ON Users(phone); 
CREATE INDEX idx_users_role ON Users(role);

-- Campaigns indexes 
CREATE INDEX idx_campaigns_charity ON Campaigns(charity_id);
CREATE INDEX idx_campaigns_status ON Campaigns(status);
CREATE INDEX idx_campaigns_dates ON Campaigns(start_date, end_date);
CREATE INDEX idx_campaigns_location ON Campaigns(province, district);
CREATE INDEX idx_campaigns_rating ON Campaigns(rating DESC);

-- Donations indexes
CREATE INDEX idx_donations_campaign ON Donations(campaign_id);
CREATE INDEX idx_donations_donor ON Donations(donor_id);
CREATE INDEX idx_donations_status ON Donations(status);
CREATE INDEX idx_donations_created ON Donations(created_at DESC);

-- Distributions indexes
CREATE INDEX idx_distributions_campaign ON Distributions(campaign_id);
CREATE INDEX idx_distributions_date ON Distributions(distribution_date);
CREATE INDEX idx_distributions_location ON Distributions(province, district);

-- Comments indexes
CREATE INDEX idx_comments_campaign ON Comments(campaign_id);
CREATE INDEX idx_comments_user ON Comments(user_id);
CREATE INDEX idx_comments_rating ON Comments(rating DESC);

-- Auth indexes
CREATE INDEX idx_otpcodes_phone ON OTPCodes(phone);
CREATE INDEX idx_otpcodes_expires ON OTPCodes(expires_at);
CREATE INDEX idx_passwordresets_token ON PasswordResets(token);
CREATE INDEX idx_passwordresets_expires ON PasswordResets(expires_at);

-- Trigger cập nhật rating campaign khi có comment mới
CREATE OR REPLACE FUNCTION update_campaign_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE Campaigns 
  SET rating = (
    SELECT AVG(rating)::decimal(3,2)
    FROM Comments
    WHERE campaign_id = NEW.campaign_id
  )
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_campaign_rating
AFTER INSERT OR UPDATE OR DELETE ON Comments
FOR EACH ROW
EXECUTE FUNCTION update_campaign_rating();

-- Trigger cập nhật rating charity khi rating campaign thay đổi 
CREATE OR REPLACE FUNCTION update_charity_rating() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE Charities
  SET rating = (
    SELECT AVG(rating)::decimal(3,2)
    FROM Campaigns 
    WHERE charity_id = (SELECT charity_id FROM Campaigns WHERE id = NEW.id)
  )
  WHERE id = (SELECT charity_id FROM Campaigns WHERE id = NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_charity_rating
AFTER UPDATE OF rating ON Campaigns
FOR EACH ROW 
EXECUTE FUNCTION update_charity_rating();

-- Trigger cập nhật số tiền campaign khi có donation mới
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'SUCCESS' THEN
    UPDATE Campaigns
    SET current_amount = current_amount + NEW.amount
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_campaign_amount
AFTER UPDATE OF status ON Donations
FOR EACH ROW
WHEN (NEW.status = 'SUCCESS')
EXECUTE FUNCTION update_campaign_amount();

-- Trigger cập nhật thống kê cho charity
CREATE OR REPLACE FUNCTION update_charity_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE Charities
  SET 
    campaign_count = (
      SELECT COUNT(*) FROM Campaigns WHERE charity_id = NEW.charity_id
    ),
    total_raised = (
      SELECT COALESCE(SUM(d.amount), 0)
      FROM Donations d
      JOIN Campaigns c ON d.campaign_id = c.id 
      WHERE c.charity_id = NEW.charity_id
      AND d.status = 'SUCCESS'
    )
  WHERE id = NEW.charity_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_charity_stats
AFTER INSERT OR UPDATE ON Campaigns
FOR EACH ROW
EXECUTE FUNCTION update_charity_stats();