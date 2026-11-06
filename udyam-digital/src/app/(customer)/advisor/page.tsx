'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { BundleOption } from '@/types';
import { Sparkles, Check, ArrowRight, ShieldCheck, Wifi, Layers, HelpCircle } from 'lucide-react';

export default function AdvisorPage() {
  const router = useRouter();
  const { language, business, setActiveQuoteId } = useApp();
  const [loading, setLoading] = useState(false);
  const [bundles, setBundles] = useState<BundleOption[]>([]);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);

  // Structured advisor questions
  const [employees, setEmployees] = useState(business?.employee_count || 3);
  const [primaryNeed, setPrimaryNeed] = useState('pos_wifi');

  useEffect(() => {
    fetchBundles();
  }, [business?.business_type, employees]);

  const fetchBundles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business?.id,
          business_type: business?.business_type,
          has_gstin: business?.has_gstin,
          city_tier: business?.city_tier
        })
      });
      const data = await res.json();
      if (data.success && data.bundles) {
        setBundles(data.bundles);
        if (data.bundles.length > 0) {
          setSelectedBundleId(data.bundles[0].bundle_id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAndQuote = async (bundle: BundleOption) => {
    if (!business) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business.id,
          bundle_name: language === 'en' ? bundle.bundle_name_en : bundle.bundle_name_hi,
          product_ids: bundle.included_product_ids.map(pid => ({ product_id: pid, is_addon: false, quantity: 1 }))
        })
      });
      const data = await res.json();
      if (data.success && data.quote) {
        setActiveQuoteId(data.quote.id);
        router.push('/quote');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E40000] flex items-center justify-center font-bold">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">
            {language === 'en' ? 'AI Business Need Advisor' : 'एआई बिजनेस एडवाइजर'}
          </h1>
          <p className="text-xs text-gray-700">
            {language === 'en'
              ? 'Translating your actual business requirements into catalogue-eligible outcome bundles with zero technical jargon.'
              : 'बिना किसी तकनीकी उलझन के अपनी व्यावसायिक जरूरतों के अनुसार उपयुक्त बंडल चुनें।'}
          </p>
        </div>
      </div>

      {/* Need Discovery Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#E40000]" />
          <span>{language === 'en' ? 'Step 1: Understand Your Requirements' : 'चरण 1: अपनी आवश्यकताएं बताएं'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'Total Employees / Connected Users' : 'कुल कर्मचारी / उपयोगकर्ता'}
            </label>
            <div className="flex items-center space-x-3">
              {[1, 3, 8, 15, 30].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setEmployees(cnt)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    employees === cnt
                      ? 'bg-[#E40000] text-white border-[#E40000] shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cnt}+
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'Primary Connectivity Priority' : 'मुख्य प्राथमिकता'}
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'pos_wifi', label_en: 'UPI & POS Uptime', label_hi: 'UPI/POS भुगतान' },
                { id: 'cloud_backup', label_en: 'Static IP & Backup', label_hi: 'क्लाउड बैकअप' },
                { id: 'failover', label_en: '4G Auto-Failover', label_hi: '4G बैकअप' },
                { id: 'dedicated_ill', label_en: 'Symmetrical ILL', label_hi: 'समान लीज्ड लाइन' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPrimaryNeed(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    primaryNeed === opt.id
                      ? 'bg-gray-900 text-white border-gray-900 shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {language === 'en' ? opt.label_en : opt.label_hi}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Bundles */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>{language === 'en' ? 'Step 2: Recommended Eligible Bundles' : 'चरण 2: उपयुक्त बंडल सुझाव'}</span>
        </h2>

        {loading ? (
          <div className="text-center py-12 text-sm text-gray-700 font-semibold">
            Calculating catalogue-restricted bundles...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map(bundle => (
              <div
                key={bundle.bundle_id}
                className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between shadow-sm ${
                  selectedBundleId === bundle.bundle_id
                    ? 'border-[#E40000] ring-2 ring-red-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-red-50 text-[#E40000] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {bundle.badge}
                    </span>
                    <span className="text-xs text-gray-700 font-medium">
                      {bundle.contract_months} Mo. Term
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900 mt-2">
                    {language === 'en' ? bundle.bundle_name_en : bundle.bundle_name_hi}
                  </h3>
                  <p className="text-xs text-gray-700 mt-1 mb-4">
                    {language === 'en' ? bundle.description_en : bundle.description_hi}
                  </p>

                  <div className="bg-gray-50 p-4 rounded-xl space-y-2 mb-4 border border-gray-100">
                    <div className="text-[11px] font-bold text-gray-700 uppercase">What&apos;s Included:</div>
                    {bundle.items.map(item => (
                      <div key={item.product_id} className="flex justify-between items-center text-xs">
                        <span className="flex items-center text-gray-800 font-semibold">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          {item.product_name}
                        </span>
                        <span className="text-gray-700 font-medium">₹{item.unit_price}/mo</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-baseline mb-4">
                    <div>
                      <div className="text-2xl font-black text-gray-900">
                        ₹{bundle.monthly_recurring_total}
                        <span className="text-xs font-normal text-gray-700"> / month</span>
                      </div>
                      <div className="text-[11px] text-gray-700">
                        One-time setup: ₹{bundle.one_time_setup_total}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectAndQuote(bundle)}
                    className="w-full bg-[#E40000] hover:bg-[#B30000] text-white py-2.5 rounded-xl text-xs font-bold shadow flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>{language === 'en' ? 'Select & Generate Live Quote' : 'चुनें एवं कोटेशन बनाएं'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

