import { queryAll, queryOne } from '@/infrastructure/db/client';
import { CatalogueProduct, BusinessProfile } from '@/types';

export class CatalogueService {
  static getAllProducts(): CatalogueProduct[] {
    return queryAll<CatalogueProduct>('SELECT * FROM catalogue_products ORDER BY product_id ASC');
  }

  static getProductById(productId: string): CatalogueProduct | null {
    return queryOne<CatalogueProduct>('SELECT * FROM catalogue_products WHERE product_id = ?', [productId]);
  }

  /**
   * Deterministic Eligibility Engine (Strict Zero-Hallucination)
   * 1. City Tier Check
   * 2. Employee Scale Check
   * 3. Site Scale Check
   * 4. GSTIN Mandatory Check
   */
  static isProductEligible(product: CatalogueProduct, profile: Partial<BusinessProfile>): { eligible: boolean; reason?: string } {
    // 1. City Tier
    if (profile.city_tier) {
      const allowedTiers = product.available_city_tiers.split(';').map(t => parseInt(t.trim(), 10));
      if (!allowedTiers.includes(profile.city_tier)) {
        return { eligible: false, reason: `Product only available in city tier(s): ${product.available_city_tiers}` };
      }
    }

    // 2. Minimum Employees
    if (profile.employee_count !== undefined && profile.employee_count < product.min_employees) {
      return { eligible: false, reason: `Requires at least ${product.min_employees} employees` };
    }

    // 3. Minimum Sites
    if (profile.num_sites !== undefined && profile.num_sites < product.min_sites) {
      return { eligible: false, reason: `Requires at least ${product.min_sites} business locations` };
    }

    // 4. GSTIN Requirement
    if (product.requires_gstin === 'Y' && (!profile.has_gstin || profile.has_gstin === 0)) {
      return { eligible: false, reason: 'Requires an active verified GSTIN registration' };
    }

    return { eligible: true };
  }

  static getEligibleProducts(profile: Partial<BusinessProfile>): CatalogueProduct[] {
    const all = this.getAllProducts();
    return all.filter(p => this.isProductEligible(p, profile).eligible);
  }

  /**
   * Validate Bundle Dependencies (requires_one_of)
   * E.g. Failover P09 or Firewall P21 requires a primary internet pipe (P01|P02|P03|P05|P06)
   */
  static validateDependencies(selectedProductIds: string[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const idSet = new Set(selectedProductIds);

    for (const pid of selectedProductIds) {
      const prod = this.getProductById(pid);
      if (prod && prod.requires_one_of) {
        const requiredOneOf = prod.requires_one_of.split('|').map(s => s.trim());
        const hasDependency = requiredOneOf.some(reqId => idSet.has(reqId));
        if (!hasDependency) {
          errors.push(`${prod.product_name} (${prod.product_id}) requires one of: ${requiredOneOf.join(', ')}`);
        }
      }
    }

    return { valid: errors.length === 0, errors };
  }
}

