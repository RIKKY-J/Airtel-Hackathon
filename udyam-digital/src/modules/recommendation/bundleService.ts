import { CatalogueService } from '../catalogue/catalogueService';
import { BundleOption, BusinessProfile, QuoteItem } from '@/types';

export class BundleService {
  /**
   * Pre-configured Outcome-Based Bundles mapped to the 4 MSME segments
   * Each bundle is strictly catalogue-grounded with zero hallucinated SKUs
   */
  static getSegmentBundles(profile: Partial<BusinessProfile>): BundleOption[] {
    const segment = profile.business_type || 'micro_retail_services';
    const hasGst = profile.has_gstin === 1;

    switch (segment) {
      case 'micro_retail_services':
        return [
          this.buildBundle({
            bundle_id: 'BUNDLE_KIRANA_START',
            bundle_name_en: 'Kirana Digital Uptime Pack',
            bundle_name_hi: 'किराना डिजिटल अपटाइम पैक',
            description_en: 'Rock-solid POS/UPI connectivity with customer Wi-Fi and cloud security for shops.',
            description_hi: 'दुकानों के लिए बिना रुके UPI/POS भुगतान, सुरक्षित वाई-फाई और क्लाउड CCTV।',
            badge: 'Most Popular for Retail',
            primary_product_id: 'P01', // Biz Fibre 100
            included_product_ids: ['P01', 'P22', 'P23'], // Biz Fibre 100 + Secure Wi-Fi + Cloud CCTV
            eligible_addons: ['P04', 'P19'] // AirFiber 100, Cloud POS & Billing
          }),
          this.buildBundle({
            bundle_id: 'BUNDLE_RETAIL_VALUE',
            bundle_name_en: 'Micro Retail Starter Pack',
            bundle_name_hi: 'माइक्रो रिटेल स्टार्टर पैक',
            description_en: 'Affordable wireless AirFiber connectivity with cloud billing terminal support.',
            description_hi: 'किफायती एयरफाइबर इंटरनेट और क्लाउड बिलिंग सपोर्ट।',
            badge: 'Best Value',
            primary_product_id: 'P04', // Biz 5G AirFiber 100
            included_product_ids: ['P04', 'P19'], // AirFiber + Cloud POS
            eligible_addons: ['P22', 'P23']
          })
        ];

      case 'professional_office':
        return [
          this.buildBundle({
            bundle_id: 'BUNDLE_CLINIC_PRACTICE',
            bundle_name_en: 'Professional Practice & Clinic Suite',
            bundle_name_hi: 'प्रोफेशनल प्रैक्टिस एवं क्लिनिक सुइट',
            description_en: 'High-speed business fiber, static IP for patient/portal servers, 1TB cloud backup, and endpoint security.',
            description_hi: 'क्लिनिक और सीए फर्मों के लिए स्टेटिक आईपी, 1TB सुरक्षित क्लाउड बैकअप और एंटीवायरस।',
            badge: 'Recommended for CA & Clinics',
            primary_product_id: 'P02', // Biz Fibre 300
            included_product_ids: ['P02', 'P11', 'P17', 'P20'], // Biz Fibre 300 + Static IP + Cloud Backup + Endpoint Security
            eligible_addons: ['P08', 'P09', 'P16'] // Postpaid 599, 4G Failover, Cloud Office Suite
          }),
          this.buildBundle({
            bundle_id: 'BUNDLE_COACHING_PRO',
            bundle_name_en: 'Coaching Institute & Education Pack',
            bundle_name_hi: 'कोचिंग एवं शिक्षण संस्थान पैक',
            description_en: 'Gigabit fiber for live online classes, guest Wi-Fi for students, and cloud telephony.',
            description_hi: 'लाइव ऑनलाइन क्लास के लिए 1Gbps फाइबर, छात्रों के लिए वाई-फाई और टेलीफोनी।',
            badge: 'High Bandwidth',
            primary_product_id: hasGst ? 'P03' : 'P02', // P03 Biz Fibre 1G requires GSTIN!
            included_product_ids: hasGst ? ['P03', 'P22', 'P12'] : ['P02', 'P22', 'P17'],
            eligible_addons: ['P11', 'P20']
          })
        ];

      case 'small_multisite':
        return [
          this.buildBundle({
            bundle_id: 'BUNDLE_MULTISTORE_PRO',
            bundle_name_en: 'Multi-Store Business Connected Pack',
            bundle_name_hi: 'मल्टी-स्टोर कनेक्टेड पैक',
            description_en: 'Multi-branch connectivity with automatic 4G/5G failover, remote CCTV monitoring, and centralized billing.',
            description_hi: 'शाखाओं के लिए ऑटोमैटिक 4G बैकअप इंटरनेट, रिमोट CCTV और सिंगल बिल।',
            badge: 'Designed for 3-10 Outlets',
            primary_product_id: 'P02', // Biz Fibre 300
            included_product_ids: ['P02', 'P09', 'P23'], // Biz Fibre 300 + Backup Failover + Cloud CCTV
            eligible_addons: hasGst ? ['P10', 'P13', 'P25'] : ['P19', 'P25'] // SD-WAN & Tollfree require GSTIN
          })
        ];

      case 'small_manufacturer':
        return [
          this.buildBundle({
            bundle_id: 'BUNDLE_MFG_INDUSTRIAL',
            bundle_name_en: 'Smart Industrial Plant Connectivity Pack',
            bundle_name_hi: 'स्मार्ट इंडस्ट्रियल प्लांट पैक',
            description_en: 'Dedicated 1:1 symmetrical bandwidth, machine monitoring IoT sensors, and managed cybersecurity firewall.',
            description_hi: 'समान अपलोड/डाउनलोड स्पीड वाली लीज्ड लाइन, मशीन सेंसर IoT और फायरवॉल।',
            badge: 'Enterprise SLA 99.9%',
            primary_product_id: hasGst ? 'P05' : 'P03', // P05 requires GSTIN
            included_product_ids: hasGst ? ['P05', 'P24', 'P21'] : ['P01', 'P24', 'P20'],
            eligible_addons: ['P09', 'P17', 'P25'] // Failover, Cloud Backup, Fleet Tracker
          })
        ];

      default:
        return [];
    }
  }

  private static buildBundle(params: {
    bundle_id: string;
    bundle_name_en: string;
    bundle_name_hi: string;
    description_en: string;
    description_hi: string;
    badge: string;
    primary_product_id: string;
    included_product_ids: string[];
    eligible_addons: string[];
  }): BundleOption {
    const items: QuoteItem[] = [];
    let monthlyRecurring = 0;
    let oneTimeSetup = 0;
    let contractMonths = 12;

    for (const pid of params.included_product_ids) {
      const prod = CatalogueService.getProductById(pid);
      if (prod) {
        items.push({
          product_id: prod.product_id,
          product_name: prod.product_name,
          category: prod.category,
          quantity: 1,
          unit_price: prod.price_min_inr_per_month,
          setup_fee: prod.one_time_setup_inr,
          is_addon: false,
          min_contract_months: prod.min_contract_months
        });
        monthlyRecurring += prod.price_min_inr_per_month;
        oneTimeSetup += prod.one_time_setup_inr;
        if (prod.min_contract_months > contractMonths) {
          contractMonths = prod.min_contract_months;
        }
      }
    }

    return {
      bundle_id: params.bundle_id,
      bundle_name_en: params.bundle_name_en,
      bundle_name_hi: params.bundle_name_hi,
      description_en: params.description_en,
      description_hi: params.description_hi,
      badge: params.badge,
      primary_product_id: params.primary_product_id,
      included_product_ids: params.included_product_ids,
      eligible_addons: params.eligible_addons,
      monthly_recurring_total: monthlyRecurring,
      one_time_setup_total: oneTimeSetup,
      contract_months: contractMonths,
      items
    };
  }
}

