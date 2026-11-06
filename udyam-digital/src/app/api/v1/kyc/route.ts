import { NextResponse } from 'next/server';
import { KycService } from '@/modules/kyc/kycService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, business_id, purposes, applicant_id, track } = body;

    // Action 1: Record DPDP Consent
    if (action === 'consent') {
      if (!business_id || !purposes) {
        return NextResponse.json({ success: false, error: 'Business ID and purposes required' }, { status: 400 });
      }
      KycService.recordConsent({ business_id, purposes });
      return NextResponse.json({ success: true, message: 'DPDP 2023 Consent recorded successfully' });
    }

    // Action 2: Validate Document / Specimen
    if (!business_id) {
      return NextResponse.json({ success: false, error: 'Business ID required' }, { status: 400 });
    }

    const applicant = applicant_id || 'K03';
    const chosenTrack = track || 'gstin';

    const result = KycService.validateApplicant({
      business_id,
      applicant_id: applicant,
      track: chosenTrack
    });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

