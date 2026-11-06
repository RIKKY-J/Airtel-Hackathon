'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Layers, 
  Receipt, 
  Clock, 
  Users2, 
  Building2,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tag?: string;
}

const FAQS: FAQItem[] = [
  // KYC & Verification
  {
    id: 'kyc-1',
    category: 'GSTIN & Smart KYC',
    question: 'Can I get business broadband without a GSTIN?',
    answer: 'Yes! Under Track B verification, micro-enterprises and unregistered partnerships can submit their Udyam Registration Certificate along with the proprietor’s PAN and a recent utility bill (dated within 90 days). You do not need a GSTIN for standard retail packages like Biz Fibre 100 or AirFiber 100.',
    tag: 'Track B MSME'
  },
  {
    id: 'kyc-2',
    category: 'GSTIN & Smart KYC',
    question: 'What happens if my GSTIN is cancelled or suspended on the registry?',
    answer: 'Our automated registry check flags cancelled or suspended GST numbers immediately. Your application will be placed in "NEEDS REVIEW" rather than being auto-approved or silently rejected, and a notification is routed to our operations queue and channel partner to help you submit active alternative documentation.',
    tag: 'Edge Case'
  },
  {
    id: 'kyc-3',
    category: 'GSTIN & Smart KYC',
    question: 'Why was my electricity bill rejected for being over 90 days old?',
    answer: 'Under telecom regulatory verification guidelines, proof of business address (such as electricity or piped gas bills) must be dated within 90 days of the application benchmark date. Bills older than 90 days trigger a "NEEDS REVIEW" flag requiring you to re-upload the latest cycle bill.',
    tag: 'Rule K04'
  },
  {
    id: 'kyc-4',
    category: 'GSTIN & Smart KYC',
    question: 'What if the name on my Udyam certificate does not match my PAN card?',
    answer: 'A high-confidence name match is required to prevent business impersonation. If a minor spelling variance occurs (e.g., initial abbreviations), the OCR validation engine flags the record for manual channel partner verification rather than terminating the order.',
    tag: 'Name Match'
  },

  // Bundles & Pricing
  {
    id: 'pricing-1',
    category: 'Recommendations & Bundles',
    question: 'Are bundle prices fixed, or can I customize add-ons?',
    answer: 'Bundle prices represent transparent base packages of products from product_catalogue.csv. On the Live Quote screen, you can toggle optional add-ons (such as 4G backup dongles, cloud CCTV cameras, or static IPs). Every toggle triggers an authoritative server-side recalculation to guarantee pricing accuracy.',
    tag: 'Live Quote'
  },
  {
    id: 'pricing-2',
    category: 'Recommendations & Bundles',
    question: 'Why does Internet Leased Line (P05) require a mandatory GSTIN?',
    answer: 'High-grade dedicated leased lines (P05) and enterprise SD-WAN gateways (P10) carry commercial enterprise service level agreements (99.9% uptime SLA) and point-to-point fiber drops, which under current telecom licensing regulations require commercial business registration (GSTIN).',
    tag: 'Eligibility Rule'
  },
  {
    id: 'pricing-3',
    category: 'Recommendations & Bundles',
    question: 'How long are quotes valid once generated?',
    answer: 'Every quote generates an immutable digital snapshot valid for 15 calendar days. During this window, product rates, setup fees, and discounts are locked even if general catalogue pricing updates in the interim.',
    tag: 'Snapshot'
  },

  // Fulfilment & Orders
  {
    id: 'fulfilment-1',
    category: 'Orders & Fulfilment',
    question: 'What is the SLA for physical fiber installation and service activation?',
    answer: 'Project Udyam Digital targets sub-48-hour activation from the moment KYC verification is approved. You can monitor the real-time milestone tracker on your dashboard, showing dispatch, lead-in cable pulling, ONT router configuration, and live signal sync.',
    tag: '<48h SLA'
  },
  {
    id: 'fulfilment-2',
    category: 'Orders & Fulfilment',
    question: 'Can I track multi-branch orders in one central view?',
    answer: 'Yes. Small multi-site businesses can view branch-level fulfilment statuses under "My Orders", with independent dispatch checkpoints and physical address verification notes for each outlet.',
    tag: 'Multi-site'
  },

  // Account & Profile
  {
    id: 'account-1',
    category: 'Account & Preferences',
    question: 'If I change my business category in Settings, do I lose my active services?',
    answer: 'Strictly NO. Changing your business persona or category only personalizes future dashboard telemetry, advisor prompts, and suggested packages. Your existing active quotes, orders, and commercial subscriptions are completely unaffected and preserved.',
    tag: 'Guardrail'
  },
  {
    id: 'account-2',
    category: 'Account & Preferences',
    question: 'How is my business data protected under the DPDP Act 2023?',
    answer: 'We practice strict data minimisation. Identity document images are never sent to external AI/LLMs. Consent is completely unbundled: accepting KYC verification never opts you in for commercial marketing calls unless you explicitly choose to check that box.',
    tag: 'DPDP 2023'
  },

  // Assisted-Digital & Partners
  {
    id: 'partner-1',
    category: 'Partner Assistance',
    question: 'What is the "Assisted-Digital" channel partner model?',
    answer: 'If you ever encounter an upload error, OCR mismatch, or prefer human guidance, you can request local partner assistance. An authorized Airtel Business channel partner in your locality receives your attributed lead and visits your premises to complete onboarding seamlessly.',
    tag: 'Assisted Digital'
  }
];

const CATEGORIES = [
  'All Topics',
  'GSTIN & Smart KYC',
  'Recommendations & Bundles',
  'Orders & Fulfilment',
  'Account & Preferences',
  'Partner Assistance'
];

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('kyc-1');

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'All Topics' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        faq.question.toLowerCase().includes(q) || 
        faq.answer.toLowerCase().includes(q) || 
        (faq.tag && faq.tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 text-[#E40000] rounded-full text-xs font-bold border border-red-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base & Verification Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Help Centre & MSME FAQ
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Clear answers about catalogue rules, non-GSTIN verification, quote calculation, and partner support.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by topic, e.g. non-GSTIN, utility bill 90 days, leased line, quote..."
          className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3 pt-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-gray-800">No matching questions found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try searching with different keywords or reach out to our dedicated support desk for personalized help.
            </p>
            <button
              onClick={() => { setSelectedCategory('All Topics'); setSearchQuery(''); }}
              className="text-xs font-bold text-[#E40000] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {faq.category}
                      </span>
                      {faq.tag && (
                        <span className="text-[10px] bg-red-50 text-[#E40000] font-bold px-2 py-0.5 rounded-md border border-red-100">
                          {faq.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 border-t border-gray-100 leading-relaxed bg-slate-50/50">
                    <p className="mt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Need Help Box */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm mt-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#E40000] shadow-sm flex-shrink-0">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Can’t find what you are looking for?</h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Connect with our MSME care specialists or request an on-site channel partner visit.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center space-x-2 bg-[#E40000] hover:bg-[#B30000] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all whitespace-nowrap"
        >
          <span>Contact MSME Desk</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
