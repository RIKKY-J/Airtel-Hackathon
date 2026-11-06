import { NextResponse } from 'next/server';
import { QuoteService } from '@/modules/quote/quoteService';
import { CatalogueService } from '@/modules/catalogue/catalogueService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { business_id, bundle_name, product_ids } = body;

    if (!business_id || !bundle_name || !product_ids || !Array.isArray(product_ids)) {
      return NextResponse.json({ success: false, error: 'Missing quote parameters' }, { status: 400 });
    }

    // Dependency check
    const pids = product_ids.map((p: any) => typeof p === 'string' ? p : p.product_id);
    const depCheck = CatalogueService.validateDependencies(pids);
    if (!depCheck.valid) {
      return NextResponse.json({ success: false, error: depCheck.errors.join('; ') }, { status: 400 });
    }

    const formattedIds = product_ids.map((p: any) => {
      if (typeof p === 'string') return { product_id: p, is_addon: false, quantity: 1 };
      return { product_id: p.product_id, is_addon: !!p.is_addon, quantity: p.quantity || 1 };
    });

    const quote = QuoteService.createQuote({
      business_id,
      bundle_name,
      product_ids: formattedIds
    });

    return NextResponse.json({ success: true, quote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { action, quote_id, bundle_name, product_ids } = body;

    if (action === 'accept') {
      if (!quote_id) return NextResponse.json({ success: false, error: 'Quote ID required' }, { status: 400 });
      const accepted = QuoteService.acceptQuote(quote_id);
      return NextResponse.json({ success: true, quote: accepted });
    }

    // Action recalculate
    if (!bundle_name || !product_ids) {
      return NextResponse.json({ success: false, error: 'Parameters missing for recalculation' }, { status: 400 });
    }

    const formattedIds = product_ids.map((p: any) => {
      if (typeof p === 'string') return { product_id: p, is_addon: false, quantity: 1 };
      return { product_id: p.product_id, is_addon: !!p.is_addon, quantity: p.quantity || 1 };
    });

    const recalculated = QuoteService.calculateQuote({
      bundle_name,
      product_ids: formattedIds
    });

    return NextResponse.json({ success: true, calculation: recalculated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

