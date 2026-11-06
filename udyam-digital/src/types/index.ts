export type BusinessType = 
  | 'micro_retail_services'
  | 'professional_office'
  | 'small_multisite'
  | 'small_manufacturer';

export type UserRole = 'customer' | 'partner' | 'sales_agent' | 'admin';
export type SupportedLanguage = 'en' | 'hi';

export interface CatalogueProduct {
  product_id: string;
  category: string;
  product_name: string;
  description: string;
  unit: string;
  price_min_inr_per_month: number;
  price_max_inr_per_month: number;
  one_time_setup_inr: number;
  min_contract_months: number;
  available_city_tiers: string;
  min_employees: number;
  min_sites: number;
  requires_gstin: 'Y' | 'N';
  requires_one_of: string | null;
  typical_install_days: number;
  target_segments: string;
}

export interface BusinessProfile {
  id: string;
  owner_user_id: string;
  business_name: string;
  business_type: BusinessType;
  city: string;
  city_tier: number;
  state: string;
  preferred_language: SupportedLanguage;
  employee_count: number;
  num_sites: number;
  has_gstin: number; // 0 or 1
  gstin?: string | null;
  has_udyam: number; // 0 or 1
  udyam_number?: string | null;
  partner_code?: string | null;
  created_at: string;
}

export interface QuoteItem {
  product_id: string;
  product_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  setup_fee: number;
  is_addon: boolean;
  min_contract_months: number;
}

export interface BundleOption {
  bundle_id: string;
  bundle_name_en: string;
  bundle_name_hi: string;
  description_en: string;
  description_hi: string;
  badge: string;
  primary_product_id: string;
  included_product_ids: string[];
  eligible_addons: string[];
  monthly_recurring_total: number;
  one_time_setup_total: number;
  contract_months: number;
  items: QuoteItem[];
}

export interface QuoteRecord {
  id: string;
  business_id: string;
  bundle_name: string;
  monthly_recurring_total: number;
  one_time_setup_total: number;
  contract_months: number;
  items_json: string;
  status: 'draft' | 'presented' | 'accepted' | 'expired';
  created_at: string;
}

export type KycTrack = 'gstin' | 'non_gstin_udyam';
export type KycStatus = 'pending' | 'verified' | 'needs_review' | 'rejected';

export interface KycCheckItem {
  check_type: string;
  passed: boolean;
  message_en: string;
  message_hi: string;
  severity: 'blocker' | 'warning' | 'info';
}

export interface KycValidationResult {
  case_id: string;
  business_id: string;
  applicant_id?: string;
  track: KycTrack;
  status: KycStatus;
  checks: KycCheckItem[];
  flagged_reasons: string[];
  extracted_data: Record<string, any>;
  created_at: string;
}

export interface OrderRecord {
  id: string;
  business_id: string;
  quote_id: string;
  kyc_case_id: string;
  bundle_name: string;
  monthly_recurring_total: number;
  one_time_setup_total: number;
  status: 'order_placed' | 'kyc_cleared' | 'installation_scheduled' | 'activated' | 'cancelled';
  expected_activation_date: string;
  created_at: string;
}

export interface OrderMilestone {
  stage_name: string;
  stage_name_hi: string;
  status: 'completed' | 'in_progress' | 'pending';
  sla_time: string;
  completed_at: string | null;
}

