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
    const { requestId, code } = await request.json();
    
    const resp = await vonage.verify.check(requestId, code);

    if (resp.status === '0') {
      return NextResponse.json({ success: true });
    } else {
      throw new Error('Invalid code');
    }
  } catch (error) {
    console.error('Verification check error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
} 