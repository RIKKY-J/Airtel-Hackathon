import crypto from 'crypto';
import { queryAll, queryOne, execute } from '@/infrastructure/db/client';
import { OrderRecord, OrderMilestone } from '@/types';

export class OrderService {
  static createOrder(params: {
    business_id: string;
    quote_id: string;
    kyc_case_id: string;
  }): { order: OrderRecord; milestones: OrderMilestone[] } {
    const quote = queryOne<{ bundle_name: string; monthly_recurring_total: number; one_time_setup_total: number }>(
      'SELECT bundle_name, monthly_recurring_total, one_time_setup_total FROM quotes WHERE id = ?',
      [params.quote_id]
    );

    if (!quote) {
      throw new Error('Quote not found');
    }

    const orderId = `ORD_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const expectedDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]; // < 48 hours!

    execute(
      `INSERT INTO orders (id, business_id, quote_id, kyc_case_id, status, expected_activation_date)
       VALUES (?, ?, ?, ?, 'order_placed', ?)`,
      [orderId, params.business_id, params.quote_id, params.kyc_case_id, expectedDate]
    );

    // Create 4 transparent fulfilment milestones to eliminate status chasing
    const milestones = [
      {
        id: `MS_${crypto.randomBytes(3).toString('hex')}`,
        order_id: orderId,
        stage_name: 'Order Placed & Quote Accepted',
        stage_name_hi: 'ऑर्डर दर्ज एवं कोटेशन स्वीकृत',
        status: 'completed' as const,
        sla_time: 'Instant (0 mins)',
        completed_at: new Date().toISOString()
      },
      {
        id: `MS_${crypto.randomBytes(3).toString('hex')}`,
        order_id: orderId,
        stage_name: 'Smart KYC & Registry Cleared',
        stage_name_hi: 'स्मार्ट KYC एवं पोर्टल सत्यापन पूर्ण',
        status: 'completed' as const,
        sla_time: '15 mins',
        completed_at: new Date().toISOString()
      },
      {
        id: `MS_${crypto.randomBytes(3).toString('hex')}`,
        order_id: orderId,
        stage_name: 'Field Technician Assigned & Installation Scheduled',
        stage_name_hi: 'फील्ड इंजीनियर नियुक्त एवं इंस्टॉलेशन शेड्यूल',
        status: 'in_progress' as const,
        sla_time: 'Under 24 hours',
        completed_at: null
      },
      {
        id: `MS_${crypto.randomBytes(3).toString('hex')}`,
        order_id: orderId,
        stage_name: 'Connection Activated & Billing Live',
        stage_name_hi: 'कनेक्शन एक्टिवेटेड एवं बिलिंग चालू',
        status: 'pending' as const,
        sla_time: 'Under 48 hours total SLA',
        completed_at: null
      }
    ];

    for (const ms of milestones) {
      execute(
        `INSERT INTO order_milestones (id, order_id, stage_name, status, sla_time, completed_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [ms.id, ms.order_id, ms.stage_name, ms.status, ms.sla_time, ms.completed_at]
      );
    }

    const order = queryOne<OrderRecord>('SELECT * FROM orders WHERE id = ?', [orderId])!;
    return {
      order: {
        ...order,
        bundle_name: quote.bundle_name,
        monthly_recurring_total: quote.monthly_recurring_total,
        one_time_setup_total: quote.one_time_setup_total
      },
      milestones
    };
  }

  static getOrder(orderId: string): { order: OrderRecord | null; milestones: OrderMilestone[] } {
    const order = queryOne<OrderRecord>(
      `SELECT o.*, q.bundle_name, q.monthly_recurring_total, q.one_time_setup_total
       FROM orders o
       JOIN quotes q ON o.quote_id = q.id
       WHERE o.id = ?`,
      [orderId]
    );

    if (!order) return { order: null, milestones: [] };

    const milestones = queryAll<OrderMilestone>(
      'SELECT * FROM order_milestones WHERE order_id = ? ORDER BY rowid ASC',
      [orderId]
    );

    return { order, milestones };
  }
}

