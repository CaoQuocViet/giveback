#!/bin/bash

# Kiểm tra PostgreSQL đã được cài đặt chưa
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL chưa được cài đặt. Vui lòng cài đặt PostgreSQL trước."
    exit 1
fi

# Kiểm tra service PostgreSQL
if ! systemctl is-active --quiet postgresql; then
    echo "PostgreSQL service không hoạt động. Đang khởi động..."
    sudo systemctl start postgresql
fi

# Tạo user nếu chưa tồn tại
sudo -u postgres psql -c "SELECT 1 FROM pg_roles WHERE rolname = 'vietcq'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE USER vietcq WITH PASSWORD '123456789000';"

# Tạo database nếu chưa tồn tại
sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw giveback_db || \
sudo -u postgres psql -c "CREATE DATABASE giveback_db OWNER vietcq;"

# Cấp quyền cho user
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE giveback_db TO vietcq;"

# Tạo bảng users
psql "postgres://vietcq:123456789000@localhost:5432/giveback_db" << EOF
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
EOF

echo "Thiết lập database hoàn tất!" 