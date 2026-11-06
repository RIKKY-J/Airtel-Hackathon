import { NextResponse } from 'next/server';
import { OrderService } from '@/modules/order/orderService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { business_id, quote_id, kyc_case_id } = body;

    if (!business_id || !quote_id || !kyc_case_id) {
      return NextResponse.json({ success: false, error: 'business_id, quote_id, and kyc_case_id required' }, { status: 400 });
    }

    const { order, milestones } = OrderService.createOrder({
      business_id,
      quote_id,
      kyc_case_id
    });

    return NextResponse.json({ success: true, order, milestones });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('id');
  const businessId = searchParams.get('business_id');

  if (orderId) {
    const res = OrderService.getOrder(orderId);
    if (!res.order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, ...res });
  }

  const orders = OrderService.getOrders(businessId || undefined);
  return NextResponse.json({ success: true, orders });
}
