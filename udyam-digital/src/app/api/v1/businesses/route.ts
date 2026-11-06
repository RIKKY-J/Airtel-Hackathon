import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { queryOne, execute } from '@/infrastructure/db/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const biz = queryOne('SELECT * FROM businesses WHERE id = ?', [id]);
    if (!biz) return NextResponse.json({ success: false, error: 'Business not found' }, { status: 404 });
    return NextResponse.json({ success: true, business: biz });
  }

  const userId = searchParams.get('user_id');
  if (userId) {
    const biz = queryOne('SELECT * FROM businesses WHERE owner_user_id = ? ORDER BY created_at DESC LIMIT 1', [userId]);
    return NextResponse.json({ success: true, business: biz });
  }

  return NextResponse.json({ success: false, error: 'Missing business or user id' }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = `B_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    execute(`
      INSERT INTO businesses (
        id, owner_user_id, business_name, business_type, city, city_tier, state,
        preferred_language, employee_count, num_sites, has_gstin, gstin, has_udyam, udyam_number, partner_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      body.owner_user_id,
      body.business_name,
      body.business_type || 'micro_retail_services',
      body.city || 'Jaipur',
      body.city_tier || 2,
      body.state || 'Rajasthan',
      body.preferred_language || 'en',
      body.employee_count || 1,
      body.num_sites || 1,
      body.has_gstin ? 1 : 0,
      body.gstin || null,
      body.has_udyam ? 1 : 0,
      body.udyam_number || null,
      body.partner_code || null
    ]);

    const created = queryOne('SELECT * FROM businesses WHERE id = ?', [id]);
    return NextResponse.json({ success: true, business: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, business_type, business_name, employee_count, num_sites, preferred_language } = body;

    if (!id) return NextResponse.json({ success: false, error: 'Business ID required' }, { status: 400 });

    execute(`
      UPDATE businesses
      SET business_type = COALESCE(?, business_type),
          business_name = COALESCE(?, business_name),
          employee_count = COALESCE(?, employee_count),
          num_sites = COALESCE(?, num_sites),
          preferred_language = COALESCE(?, preferred_language),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [business_type, business_name, employee_count, num_sites, preferred_language, id]);

    const updated = queryOne('SELECT * FROM businesses WHERE id = ?', [id]);
    return NextResponse.json({
      success: true,
      message: 'Profile updated. Active subscriptions preserved.',
      business: updated
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

