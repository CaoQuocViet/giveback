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
  merchant_id varchar UNIQUE,
  merchant_name varchar,
  bank_account varchar,
  payment_gateway varchar,
  api_key varchar,
  
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
  invoice_code varchar UNIQUE,
  payment_transaction_id varchar UNIQUE,
  is_anonymous boolean NOT NULL DEFAULT false,  -- Flag đóng góp ẩn danh
  status PaymentStatus NOT NULL DEFAULT 'PENDING',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Distributions (
  id varchar PRIMARY KEY,
  campaign_id varchar REFERENCES Campaigns(id),
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
  proof_images varchar[] DEFAULT '{}', -- Hình ảnh chứng minh
  status varchar NOT NULL DEFAULT 'PENDING', -- Trạng thái xác nhận từ người nhận
  
  -- Thông tin người tạo/xác nhận
  created_by varchar REFERENCES Users(id), -- Người tạo phân phối (CHARITY)
  confirmed_by varchar REFERENCES Users(id), -- Người xác nhận (BENEFICIARY)
  confirmed_at timestamp,             -- Thời điểm xác nhận
  
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comments (
  id varchar PRIMARY KEY,
  campaign_id varchar REFERENCES Campaigns(id),
  user_id varchar REFERENCES Users(id),
  content text NOT NULL,
  role Role NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sửa bảng Ratings
CREATE TABLE Ratings (
  id varchar PRIMARY KEY,
  user_id varchar REFERENCES Users(id),
  campaign_id varchar REFERENCES Campaigns(id) NOT NULL,
  rating decimal NOT NULL CHECK (rating >= 0 AND rating <= 5),
  comment_id varchar REFERENCES Comments(id),
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_phone ON Users(phone);
CREATE INDEX idx_campaigns_charity ON Campaigns(charity_id);
CREATE INDEX idx_donations_campaign ON Donations(campaign_id);
CREATE INDEX idx_donations_donor ON Donations(donor_id);
CREATE INDEX idx_distributions_campaign ON Distributions(campaign_id);
CREATE INDEX idx_comments_campaign ON Comments(campaign_id);
CREATE INDEX idx_comments_user ON Comments(user_id);
CREATE INDEX idx_ratings_campaign ON Ratings(campaign_id);
CREATE INDEX idx_ratings_user_campaign ON Ratings(user_id, campaign_id);
CREATE INDEX idx_donations_invoice ON Donations(invoice_code);
CREATE INDEX idx_charities_merchant ON Charities(merchant_id);
CREATE INDEX idx_donations_transaction ON Donations(payment_transaction_id);
CREATE INDEX idx_distributions_created_by ON Distributions(created_by);
CREATE INDEX idx_distributions_confirmed_by ON Distributions(confirmed_by);