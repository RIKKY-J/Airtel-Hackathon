import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { queryOne, execute } from '@/infrastructure/db/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action || 'verify'; // 'request' or 'verify'
    const mobile = (body.mobile || '').trim();

    if (!mobile || mobile.length < 10) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number required' }, { status: 400 });
    }

    if (action === 'request') {
      return NextResponse.json({
        success: true,
        message: `OTP sent to ${mobile}`,
        simulated_otp: '123456'
      });
    }

    // Verify OTP
    const otp = body.otp || '';
    if (otp !== '123456' && otp.length !== 6) {
      return NextResponse.json({ success: false, error: 'Invalid verification OTP' }, { status: 400 });
    }

    let user = queryOne<{ id: string; mobile: string; role: string }>(
      'SELECT id, mobile, role FROM users WHERE mobile = ?',
      [mobile]
    );

    if (!user) {
      const userId = `U_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      execute('INSERT INTO users (id, mobile, role) VALUES (?, ?, ?)', [userId, mobile, body.role || 'customer']);
      user = { id: userId, mobile, role: body.role || 'customer' };
    }

    // Get linked business if exists
    const business = queryOne(
      'SELECT * FROM businesses WHERE owner_user_id = ? ORDER BY created_at DESC LIMIT 1',
      [user.id]
    );

    return NextResponse.json({
      success: true,
      token: `demo-token-${user.id}`,
      user,
      business
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

