import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY || '',
  apiSecret: process.env.VONAGE_API_SECRET || ''
});

export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    // Logic gửi OTP qua Vonage
    const result = await vonage.verify.start({
      number: phoneNumber,
      brand: "GiveBack"
    });
    
    res.json({ requestId: result.request_id });
  } catch (error) {
    res.status(500).json({ error: 'Không thể gửi OTP' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { requestId, code } = req.body;
    // Logic verify OTP
    const result = await vonage.verify.check(requestId, code);
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Mã OTP không hợp lệ' });
  }
}; 