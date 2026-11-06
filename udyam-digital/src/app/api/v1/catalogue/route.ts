import { NextResponse } from 'next/server';
import { CatalogueService } from '@/modules/catalogue/catalogueService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cityTier = searchParams.get('city_tier') ? parseInt(searchParams.get('city_tier')!, 10) : undefined;
  const hasGstin = searchParams.get('has_gstin') === 'true' || searchParams.get('has_gstin') === '1' ? 1 : 0;
  const employees = searchParams.get('employees') ? parseInt(searchParams.get('employees')!, 10) : 1;

  const products = CatalogueService.getEligibleProducts({
    city_tier: cityTier,
    has_gstin: hasGstin,
    employee_count: employees
  });

  return NextResponse.json({ success: true, count: products.length, products });
}

