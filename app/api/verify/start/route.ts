import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';
import { NextResponse } from 'next/server';

const vonage = new Vonage(
  new Auth({
    apiKey: process.env.VONAGE_API_KEY || "",
    apiSecret: process.env.VONAGE_API_SECRET || ""
  })
);

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