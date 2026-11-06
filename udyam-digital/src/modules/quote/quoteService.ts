import crypto from 'crypto';
import { queryOne, execute } from '@/infrastructure/db/client';
import { CatalogueService } from '../catalogue/catalogueService';
import { QuoteRecord, QuoteItem } from '@/types';

export class QuoteService {
  /**
   * Recalculates pricing for a bundle + selected add-on product IDs
   */
  static calculateQuote(params: {
    bundle_name: string;
    product_ids: { product_id: string; is_addon: boolean; quantity?: number }[];
  }): {
    bundle_name: string;
    monthly_recurring_total: number;
    one_time_setup_total: number;
    contract_months: number;
    items: QuoteItem[];
  } {
    const items: QuoteItem[] = [];
    let monthlyTotal = 0;
    let setupTotal = 0;
    let maxContract = 12;

    for (const item of params.product_ids) {
      const prod = CatalogueService.getProductById(item.product_id);
      if (prod) {
        const qty = item.quantity || 1;
        const recurring = prod.price_min_inr_per_month * qty;
        const setup = prod.one_time_setup_inr;

        items.push({
          product_id: prod.product_id,
          product_name: prod.product_name,
          category: prod.category,
          quantity: qty,
          unit_price: prod.price_min_inr_per_month,
          setup_fee: setup,
          is_addon: item.is_addon,
          min_contract_months: prod.min_contract_months
        });

        monthlyTotal += recurring;
        setupTotal += setup;
        if (prod.min_contract_months > maxContract) {
          maxContract = prod.min_contract_months;
        }
      }
    }

    return {
      bundle_name: params.bundle_name,
      monthly_recurring_total: monthlyTotal,
      one_time_setup_total: setupTotal,
      contract_months: maxContract,
      items
    };
  }

  static createQuote(params: {
    business_id: string;
    bundle_name: string;
    product_ids: { product_id: string; is_addon: boolean; quantity?: number }[];
  }): QuoteRecord {
    const calc = this.calculateQuote({
      bundle_name: params.bundle_name,
      product_ids: params.product_ids
    });

    const quoteId = `Q_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const itemsJson = JSON.stringify(calc.items);

    execute(
      `INSERT INTO quotes (id, business_id, bundle_name, monthly_recurring_total, one_time_setup_total, contract_months, items_json, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'presented')`,
      [quoteId, params.business_id, calc.bundle_name, calc.monthly_recurring_total, calc.one_time_setup_total, calc.contract_months, itemsJson]
    );

    return queryOne<QuoteRecord>('SELECT * FROM quotes WHERE id = ?', [quoteId])!;
  }

  static getQuote(quoteId: string): QuoteRecord | null {
    return queryOne<QuoteRecord>('SELECT * FROM quotes WHERE id = ?', [quoteId]);
  }

  static acceptQuote(quoteId: string): QuoteRecord | null {
    execute("UPDATE quotes SET status = 'accepted' WHERE id = ?", [quoteId]);
    return this.getQuote(quoteId);
  }
}

