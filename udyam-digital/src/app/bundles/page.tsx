'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { BusinessType } from '@/types';
import { 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Store, 
  Building2, 
  Network, 
  Factory,
  Info,
  Clock,
  HelpCircle,
  Plus
} from 'lucide-react';

interface BundleDetail {
  id: string;
  segment: BusinessType;
  title: string;
  tagline: string;
  badge: string;
  targetAudience: string;
  monthlyPrice: number;
  setupFee: number;
  contractMonths: number;
  whyThisBundle: string;
  eligibilityNotes: string[];
  includedProducts: { id: string; name: string; benefit: string; monthly: number; setup: number }[];
  optionalAddons: { id: string; name: string; monthly: number; setup: number }[];
}

const BUNDLE_DATA: BundleDetail[] = [
  {
    id: 'BUNDLE_KIRANA_START',
    segment: 'micro_retail_services',
    title: 'Kirana Digital Uptime Pack',
    tagline: 'Rock-solid POS/UPI connectivity with customer Wi-Fi and cloud security for neighbourhood shops.',
    badge: 'Most Popular for Retail',
    targetAudience: 'Kirana stores, pharmacies, salons, bakeries, and retail grocers',
    monthlyPrice: 1997,
    setupFee: 1000,
    contractMonths: 12,
    whyThisBundle: 'Eliminates dropped UPI payments at peak billing hours, prevents queue pileups, and provides remote security cameras for owner peace of mind.',
    eligibilityNotes: [
      'No GSTIN mandatory (Available via Track B Udyam verification)',
      'Available in Tier 1, 2, and 3 cities',
      'Requires active commercial electricity connection'
    ],
    includedProducts: [
      { id: 'P01', name: 'Biz Fibre 100 Mbps', benefit: 'Unlimited high-speed optical broadband for fast UPI QR code scans and cloud billing', monthly: 999, setup: 1000 },
      { id: 'P22', name: 'Secure Wi-Fi Router & Access Point', benefit: 'Separate isolated network for customer Wi-Fi without slowing down POS terminals', monthly: 299, setup: 0 },
      { id: 'P23', name: 'Cloud CCTV Surveillance (2 Cams)', benefit: '7-day tamper-proof cloud storage with mobile live stream to protect shop stock', monthly: 699, setup: 0 }
    ],
    optionalAddons: [
      { id: 'P04', name: 'Biz 5G AirFiber 100 (Secondary wireless backup)', monthly: 899, setup: 1000 },
      { id: 'P19', name: 'Cloud POS & Invoicing Terminal Software', monthly: 399, setup: 0 }
    ]
  },
  {
    id: 'BUNDLE_RETAIL_VALUE',
    segment: 'micro_retail_services',
    title: 'Micro Retail Starter Pack',
    tagline: 'Affordable plug-and-play wireless 5G connectivity with integrated digital billing.',
    badge: 'Best Value',
    targetAudience: 'Single-counter retail shops, boutiques, and quick-service food stalls',
    monthlyPrice: 1298,
    setupFee: 1000,
    contractMonths: 12,
    whyThisBundle: 'Rapid same-day wireless setup where physical fiber trenching is difficult or delayed.',
    eligibilityNotes: [
      'Non-GSTIN friendly (Udyam + PAN + 90-day utility bill permitted)',
      'Tier 1, Tier 2 & Tier 3 5G service coverage zones'
    ],
    includedProducts: [
      { id: 'P04', name: 'Biz 5G AirFiber 100 Mbps', benefit: 'Zero-trenching wireless broadband with plug-and-play outdoor antenna', monthly: 899, setup: 1000 },
      { id: 'P19', name: 'Cloud POS & Billing System', benefit: 'Instant GST/non-GST invoicing, inventory alerts, and daily sales SMS summary', monthly: 399, setup: 0 }
    ],
    optionalAddons: [
      { id: 'P22', name: 'Secure Wi-Fi Access Point', monthly: 299, setup: 0 },
      { id: 'P23', name: 'Cloud CCTV Surveillance', monthly: 699, setup: 0 }
    ]
  },
  {
    id: 'BUNDLE_CLINIC_PRACTICE',
    segment: 'professional_office',
    title: 'Professional Practice & Clinic Suite',
    tagline: 'High-speed business fiber, static IP for medical/tax software, 1TB cloud backup, and endpoint security.',
    badge: 'Recommended for CA & Clinics',
    targetAudience: 'Dental clinics, diagnostic labs, CA & audit firms, architecture studios, and coaching centres',
    monthlyPrice: 3296,
    setupFee: 1000,
    contractMonths: 12,
    whyThisBundle: 'Guarantees DPDP-compliant patient/client records protection, uninterrupted tele-consultations, and secure remote server logins.',
    eligibilityNotes: [
      'GSTIN or Registered Professional Practice Certificate',
      'Available across all Tier 1 and Tier 2 cities'
    ],
    includedProducts: [
      { id: 'P02', name: 'Biz Fibre 300 Mbps', benefit: 'Symmetric high-bandwidth connection for HD video telemedicine and bulky tax files', monthly: 1499, setup: 1000 },
      { id: 'P11', name: 'Static IP Address (Single)', benefit: 'Required for secure hosting of on-premise EMR, Tally remote, and CCTV NVR portals', monthly: 399, setup: 0 },
      { id: 'P17', name: 'Cloud Backup Storage 1TB', benefit: 'Automated encrypted nightly backup to comply with professional record-keeping laws', monthly: 699, setup: 0 },
      { id: 'P20', name: 'Endpoint Antivirus & Firewall (5 Licences)', benefit: 'Real-time ransomware shielding for reception and consultation PCs', monthly: 699, setup: 0 }
    ],
    optionalAddons: [
      { id: 'P09', name: '4G LTE Automatic Backup Failover Dongle', monthly: 499, setup: 500 },
      { id: 'P16', name: 'Cloud Office Email & Collaboration (5 users)', monthly: 499, setup: 0 }
    ]
  },
  {
    id: 'BUNDLE_MULTISTORE_PRO',
    segment: 'small_multisite',
    title: 'Multi-Store Business Connected Pack',
    tagline: 'Multi-branch connectivity with automatic 4G/5G failover, remote CCTV monitoring, and centralized billing.',
    badge: 'Designed for 3–10 Outlets',
    targetAudience: 'Restaurant chains, multi-location retail bakeries, electronics stores, and regional distribution offices',
    monthlyPrice: 2697,
    setupFee: 1500,
    contractMonths: 24,
    whyThisBundle: 'Prevents single-store downtime from halting central order sync, aggregates multi-store security into one dashboard, and gives a consolidated single bill.',
    eligibilityNotes: [
      'Valid GSTIN required for multi-site commercial billing',
      'Minimum 2 operating branches'
    ],
    includedProducts: [
      { id: 'P02', name: 'Biz Fibre 300 Mbps Primary Link', benefit: 'High-speed dedicated link for real-time POS inventory synchronization', monthly: 1499, setup: 1000 },
      { id: 'P09', name: '4G LTE Automatic Failover Link', benefit: 'Zero-touch failover if physical line is severed during local road repairs', monthly: 499, setup: 500 },
      { id: 'P23', name: 'Multi-Site Cloud CCTV (2 Cameras/Site)', benefit: 'Centralized live surveillance view across all branch stores on founder mobile app', monthly: 699, setup: 0 }
    ],
    optionalAddons: [
      { id: 'P10', name: 'Managed SD-WAN Edge Gateway', monthly: 1999, setup: 2000 },
      { id: 'P13', name: 'Toll-Free Customer Care Number (1800)', monthly: 1299, setup: 1000 },
      { id: 'P25', name: 'Commercial Vehicle & Delivery Fleet GPS Tracker', monthly: 399, setup: 500 }
    ]
  },
  {
    id: 'BUNDLE_MFG_INDUSTRIAL',
    segment: 'small_manufacturer',
    title: 'Smart Industrial Plant Connectivity Pack',
    tagline: 'Dedicated 1:1 symmetrical bandwidth, machine monitoring IoT sensors, and managed cybersecurity firewall.',
    badge: 'Enterprise SLA 99.9%',
    targetAudience: 'Auto components workshops, light engineering fabrication, packaging plants, textile spinning units',
    monthlyPrice: 7997,
    setupFee: 5000,
    contractMonths: 24,
    whyThisBundle: 'Mission-critical leased internet ensuring CNC machines, ERP synchronization, and connected IoT telemetry never experience jitter or downtime.',
    eligibilityNotes: [
      'Valid GSTIN and Industrial Park / Commercial Electricity Survey required',
      'Requires site visit survey prior to installation'
    ],
    includedProducts: [
      { id: 'P05', name: 'Internet Leased Line 50 Mbps (1:1 Symmetrical)', benefit: 'Guaranteed 99.9% uptime SLA with low latency for industrial automation & cloud ERP', monthly: 5499, setup: 5000 },
      { id: 'P24', name: 'Industrial IoT Sensor Gateway', benefit: 'Real-time telemetry for factory temperature, power surges, and motor uptime', monthly: 1299, setup: 0 },
      { id: 'P21', name: 'Managed Unified UTM Firewall Appliance', benefit: 'Zero-day protection stopping malware and ransomware from halting production lines', monthly: 1199, setup: 0 }
    ],
    optionalAddons: [
      { id: 'P09', name: '4G Failover Router', monthly: 499, setup: 500 },
      { id: 'P17', name: 'Cloud Backup 1TB for ERP Databases', monthly: 699, setup: 0 },
      { id: 'P25', name: 'Dispatch & Fleet GPS Tracker', monthly: 399, setup: 500 }
    ]
  }
];

export default function BundlesPage() {
  const { language, setBusiness, business } = useApp();
  const [selectedSegment, setSelectedSegment] = useState<string>('all');

  const filteredBundles = selectedSegment === 'all'
    ? BUNDLE_DATA
    : BUNDLE_DATA.filter(b => b.segment === selectedSegment);

  const getSegmentIcon = (seg: BusinessType) => {
    switch (seg) {
      case 'micro_retail_services': return <Store className="w-4 h-4 text-emerald-600" />;
      case 'professional_office': return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'small_multisite': return <Network className="w-4 h-4 text-purple-600" />;
      case 'small_manufacturer': return <Factory className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleSelectBundle = (bundle: BundleDetail) => {
    if (business) {
      setBusiness({
        ...business,
        business_type: bundle.segment
      });
    }
  };

  return (
    <div className="space-y-10 py-4">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/30 text-red-300 rounded-full text-xs font-bold border border-red-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue-Grounded Outcome Packages</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Curated Connectivity Bundles for Every MSME
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Stop guessing between complex telco SKUs. Our packages combine high-speed broadband, 
            backup resilience, cyber security, and cloud tools tuned specifically to your operational scale.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/advisor"
              className="inline-flex items-center space-x-2 bg-[#E40000] hover:bg-[#B30000] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg transition-all"
            >
              <span>Take the 3-Click Need Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-700 transition-all"
            >
              <span>View All 25 Catalogue Products</span>
            </Link>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Segment Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Explore Pre-Packaged Solutions</h2>
          <p className="text-xs text-gray-500">All prices exclude GST. Backed strictly by product_catalogue.csv</p>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: 'All Segments' },
            { id: 'micro_retail_services', label: 'Kirana & Retail' },
            { id: 'professional_office', label: 'CA & Clinics' },
            { id: 'small_multisite', label: 'Multi-Store' },
            { id: 'small_manufacturer', label: 'Manufacturing' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSegment(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedSegment === tab.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bundle Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredBundles.map(bundle => (
          <div
            key={bundle.id}
            className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-gray-100">
                    {getSegmentIcon(bundle.segment)}
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {bundle.targetAudience}
                  </span>
                </div>
                <span className="bg-red-50 text-[#E40000] border border-red-200 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  {bundle.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {bundle.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {bundle.tagline}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                    Monthly Subscription
                  </div>
                  <div className="text-2xl font-black text-gray-900 flex items-baseline space-x-1">
                    <span>₹{bundle.monthlyPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-500 font-normal">/ month + GST</span>
                  </div>
                </div>

                <div className="text-right text-xs text-gray-500 border-l pl-4 border-slate-200">
                  <div>One-time Setup: <span className="font-bold text-gray-800">₹{bundle.setupFee}</span></div>
                  <div>Contract: <span className="font-bold text-gray-800">{bundle.contractMonths} Months</span></div>
                </div>
              </div>

              {/* Why This Bundle */}
              <div className="text-xs bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-amber-900 space-y-1">
                <div className="font-bold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Why this bundle fits:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">{bundle.whyThisBundle}</p>
              </div>

              {/* Included Products List */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Included Catalogue Services ({bundle.includedProducts.length})</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">100% Catalogue Grounded</span>
                </div>

                <div className="space-y-2.5">
                  {bundle.includedProducts.map(p => (
                    <div key={p.id} className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex items-start space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900">
                            {p.name} <span className="text-[10px] text-gray-400 font-mono">({p.id})</span>
                          </span>
                          <span className="text-xs font-bold text-gray-800">
                            ₹{p.monthly}/mo
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                          {p.benefit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Add-ons */}
              {bundle.optionalAddons.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    Recommended Add-ons Available in Quote:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bundle.optionalAddons.map(add => (
                      <span key={add.id} className="inline-flex items-center space-x-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                        <Plus className="w-3 h-3 text-gray-400" />
                        <span>{add.name} (+₹{add.monthly}/mo)</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Eligibility Notes */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Eligibility & Compliance:</span>
                </div>
                <ul className="text-[11px] text-gray-600 space-y-1 list-disc list-inside">
                  {bundle.eligibilityNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <Link
                href="/services"
                className="text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Inspect SKUs
              </Link>
              <Link
                href={`/quote?bundleId=${bundle.id}&segment=${bundle.segment}`}
                onClick={() => handleSelectBundle(bundle)}
                className="inline-flex items-center space-x-2 bg-[#E40000] hover:bg-[#B30000] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all"
              >
                <span>Customize & Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Assistance callout */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#E40000] flex-shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Need a tailored combination or custom enterprise setup?</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Our assisted-digital channel partners can perform an on-site feasibility survey and configure multi-line discounts.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-900 hover:bg-gray-800 text-white transition-all"
          >
            Contact Partner Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
