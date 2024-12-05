import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email đã được sử dụng' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu user mới vào database
    await sql`
      INSERT INTO users (email, password, phone_number)
      VALUES (${email}, ${hashedPassword}, ${phoneNumber})
    `;

    return res.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Đăng ký thất bại' });
  }
};

export const login = async (req, res) => {
  // Logic đăng nhập
}; 