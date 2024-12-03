import { NextResponse } from 'next/server';
import vonage from '@/lib/vonage';

// Temporary OTP storage (NOT FOR PRODUCTION)
const otpStore: { [key: string]: { otp: string, timestamp: number } } = {};

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();
    
    const formattedPhone = phoneNumber.startsWith('+84') 
      ? phoneNumber.substring(1)
      : phoneNumber.startsWith('0')
      ? '84' + phoneNumber.slice(1)
      : '84' + phoneNumber;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpStore[formattedPhone] = {
      otp,
      timestamp: Date.now() + 5 * 60 * 1000
    };
    
    console.log('Sending OTP to:', formattedPhone);

    const result = await vonage.sms.send({
      to: formattedPhone,
      from: "GIVEBACK",
      text: `Ma xac thuc cua ban la: ${otp}`,
      type: "unicode"
    });

    console.log('Vonage response:', result);

    if (result.messages[0].status !== '0') {
      throw new Error(`SMS failed with status: ${result.messages[0].status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ 
      error: 'Failed to send OTP',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 