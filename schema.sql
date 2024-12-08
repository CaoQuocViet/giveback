  -- Enums
  CREATE TYPE Role AS ENUM (
    'ADMIN',
    'DONOR',
    'CHARITY',
    'BENEFICIARY'
  );

  CREATE TYPE CampaignStatus AS ENUM (
    'STARTING',
    'ONGOING', 
    'CLOSED',
    'COMPLETED'
  );

  CREATE TYPE VerificationStatus AS ENUM (
    'PENDING',
    'VERIFIED',
    'REJECTED'
  );

  CREATE TYPE PaymentStatus AS ENUM (
    'PENDING',
    'SUCCESS',
    'FAILED'
  );

  -- Base tables
  CREATE TABLE Users (
    id varchar PRIMARY KEY,
    full_name varchar NOT NULL,
    email varchar UNIQUE NOT NULL,
    phone varchar UNIQUE NOT NULL,
    otp_verified boolean NOT NULL DEFAULT false,
    password varchar NOT NULL,
    role Role NOT NULL,
    profile_image varchar,
    province varchar,
    district varchar,
    ward varchar,
    address varchar,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE Admins (
    id varchar PRIMARY KEY REFERENCES Users(id),
    is_system_admin boolean NOT NULL DEFAULT false
  );

  -- Thêm rating, title, description,
  -- license_description vào Charities
  CREATE TABLE Charities (
    id varchar PRIMARY KEY REFERENCES Users(id),
    title varchar NOT NULL,
    description text,
    
    -- Thông tin pháp lý
    license_description text,
    license_image_url varchar NOT NULL,
    license_number varchar,           -- Số giấy phép hoạt động
    license_date timestamp,           -- Ngày cấp giấy phép
    license_issuer varchar,           -- Cơ quan cấp phép
    verification_status VerificationStatus NOT NULL DEFAULT 'PENDING',
    
    -- Thông tin tổ chức
    founding_date timestamp,          -- Ngày thành lập
    website varchar,                  -- Website chính thức
    social_links jsonb,              -- Links mạng xã hội (Facebook, Twitter...)
    
    -- Thông tin merchant
    merchant_id varchar UNIQUE,       -- ID định danh merchant từ cổng thanh toán
    merchant_name varchar,           -- Tên merchant đăng ký với cổng thanh toán
    bank_account varchar,           -- Số tài khoản ngân hàng nhận tiền
    payment_gateway varchar,        -- Cổng thanh toán sử dụng (VNPay, Momo...)
    api_key varchar,               -- Khóa API để tích hợp với cổng thanh toán
    
    -- Các trường thống kê
    rating decimal DEFAULT 0,
    campaign_count int DEFAULT 0,
    total_raised decimal DEFAULT 0,
    
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  -- Thêm rating, goal vào Campaigns
  CREATE TABLE Campaigns (
    id varchar PRIMARY KEY,
    charity_id varchar REFERENCES Charities(id),
    title varchar NOT NULL,
    description text,
    detail_goal text,
    status CampaignStatus NOT NULL DEFAULT 'STARTING',
    rating decimal DEFAULT 0,
    target_amount decimal NOT NULL,
    current_amount decimal DEFAULT 0,
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    province varchar,
    district varchar,
    ward varchar,
    address varchar,
    images varchar NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE PaymentMethods (
    id varchar PRIMARY KEY,
    name varchar NOT NULL,
    transaction_code varchar NOT NULL UNIQUE
  );

  CREATE TABLE Donations (
    id varchar PRIMARY KEY,
    campaign_id varchar REFERENCES Campaigns(id),
    donor_id varchar REFERENCES Users(id),
    payment_method_id varchar REFERENCES PaymentMethods(id),
    amount decimal NOT NULL,
    note text,
    invoice_code varchar UNIQUE,  -- Mã hóa đơn do giveback tạo ra
    payment_transaction_id varchar UNIQUE,  -- Mã giao dịch do cổng thanh toán tạo ra
    is_anonymous boolean NOT NULL DEFAULT false,  -- Flag đóng góp ẩn danh
    status PaymentStatus NOT NULL DEFAULT 'PENDING',
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE Distributions (
    id varchar PRIMARY KEY,
    campaign_id varchar REFERENCES Campaigns(id),
    title varchar NOT NULL,
    amount decimal NOT NULL,
    distribution_date timestamp NOT NULL,
    
    -- Thông tin địa điểm
    province varchar,
    district varchar,
    ward varchar,
    address varchar,
    
    -- Thông tin phân phối
    beneficiary_count int NOT NULL,     -- Số lượng người nhận
    description text,                   -- Mô tả đợt phân phối
    proof_images varchar,             -- Hình ảnh chứng minh
    
    -- Thông tin người tạo/xác nhận
    representative_name varchar REFERENCES Users(id), -- Người đại diện tổ chức tạo phân phối (CHARITY)
    relief_date timestamp,             -- Ngày đi cứu trợ
    
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE Comments (
    id varchar PRIMARY KEY,
    campaign_id varchar REFERENCES Campaigns(id),
    user_id varchar REFERENCES Users(id),
    content text NOT NULL,
    rating decimal NOT NULL CHECK (rating >= 0 AND rating <= 5),
    role Role NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

-- Thêm system donor để tổ chức tạo đóng góp trực tiếp
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