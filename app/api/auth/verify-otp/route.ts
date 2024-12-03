import { NextResponse } from 'next/server';

// Use the same storage from send-otp
declare const otpStore: { [key: string]: { otp: string, timestamp: number } };

export async function POST(req: Request) {
  try {
    const { phoneNumber, otp } = await req.json();
    
    const formattedPhone = phoneNumber.startsWith('+84') 
      ? phoneNumber 
      : phoneNumber.startsWith('0')
      ? '+84' + phoneNumber.slice(1)
      : '+84' + phoneNumber;

    const storedData = otpStore[formattedPhone];
    
    if (!storedData) {
      return NextResponse.json({ error: 'OTP expired or not found' }, { status: 400 });
    }

    if (Date.now() > storedData.timestamp) {
      delete otpStore[formattedPhone];
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    if (storedData.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Clear used OTP
    delete otpStore[formattedPhone];
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }
} 