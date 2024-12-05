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
  avatar varchar,
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
  license_description text,
  license_image_url varchar NOT NULL,
  verification_status VerificationStatus NOT NULL DEFAULT 'PENDING',
  rating decimal DEFAULT 0,
  campaign_count int DEFAULT 0,
  total_raised decimal DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Thêm rating vào Campaigns
CREATE TABLE Campaigns (
  id varchar PRIMARY KEY,
  charity_id varchar REFERENCES Charities(id),
  title varchar NOT NULL,
  description text,
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
  images varchar[] DEFAULT '{}',
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
  status PaymentStatus NOT NULL DEFAULT 'PENDING',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Distributions (
  id varchar PRIMARY KEY,
  campaign_id varchar REFERENCES Campaigns(id),
  amount decimal NOT NULL,
  distribution_date timestamp NOT NULL,
  province varchar,
  district varchar,
  ward varchar,
  address varchar,
  proof_images varchar[] DEFAULT '{}',
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

-- Indexes
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_phone ON Users(phone);
CREATE INDEX idx_campaigns_charity ON Campaigns(charity_id);
CREATE INDEX idx_donations_campaign ON Donations(campaign_id);
CREATE INDEX idx_donations_donor ON Donations(donor_id);
CREATE INDEX idx_distributions_campaign ON Distributions(campaign_id);
CREATE INDEX idx_comments_campaign ON Comments(campaign_id);
CREATE INDEX idx_comments_user ON Comments(user_id);
