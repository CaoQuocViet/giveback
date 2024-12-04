import { vonage } from '@/lib/vonage';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();
    
    const resp = await vonage.verify.start({
      number: phoneNumber,
      brand: "Giveback",
      workflow: [{
        channel: "sms",
        to: phoneNumber
      }]
    });

    return NextResponse.json({ requestId: resp.requestId });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
} 