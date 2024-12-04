import { vonage } from '@/lib/vonage';
import { NextResponse } from 'next/server';

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