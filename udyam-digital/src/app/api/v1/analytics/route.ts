import { NextResponse } from 'next/server';
import { AnalyticsService } from '@/modules/analytics/analyticsService';

export async function GET() {
  const data = AnalyticsService.getFunnelMetrics();
  return NextResponse.json({ success: true, ...data });
}

