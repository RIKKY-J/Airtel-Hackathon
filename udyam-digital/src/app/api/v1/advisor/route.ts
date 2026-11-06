import { NextResponse } from 'next/server';
import { BundleService } from '@/modules/recommendation/bundleService';
import { queryOne } from '@/infrastructure/db/client';
import { BusinessProfile } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { business_id, business_type, has_gstin, city_tier } = body;

    let profile: Partial<BusinessProfile> = {
      business_type: business_type || 'micro_retail_services',
      has_gstin: has_gstin ? 1 : 0,
      city_tier: city_tier || 2
    };

    if (business_id) {
      const existing = queryOne<BusinessProfile>('SELECT * FROM businesses WHERE id = ?', [business_id]);
      if (existing) profile = existing;
    }

    const bundles = BundleService.getSegmentBundles(profile);

    return NextResponse.json({
      success: true,
      business_type: profile.business_type,
      bundles
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

