'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { QuoteRecord, QuoteItem } from '@/types';
import { Receipt, Check, Plus, ShieldCheck, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export default function QuotePage() {
  const router = useRouter();
  const { language, business, activeQuoteId, setActiveQuoteId } = useApp();
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteRecord | null>(null);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [availableAddons, setAvailableAddons] = useState<any[]>([]);

  useEffect(() => {
    loadQuote();
  }, [activeQuoteId, business?.id]);

  const loadQuote = async () => {
    // If no active quote, create a default one based on business segment
    const res = await fetch('/api/v1/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business_id: business?.id || 'B_KIRANA',
        bundle_name: business?.business_type === 'professional_office'
          ? 'Professional Practice Suite'
          : 'Kirana Digital Uptime Pack',
        product_ids: business?.business_type === 'professional_office'
          ? ['P02', 'P11', 'P17', 'P20']
          : ['P01', 'P22', 'P23']
      })
    });
    const data = await res.json();
    if (data.success && data.quote) {
      setQuote(data.quote);
      setActiveQuoteId(data.quote.id);
      const parsedItems = JSON.parse(data.quote.items_json);
      setItems(parsedItems);
    }

    // Load candidate add-ons
    setAvailableAddons([
      { product_id: 'P09', product_name: 'Backup 4G/5G Failover', price: 499, setup: 1500, category: 'Connectivity' },
      { product_id: 'P11', product_name: 'Static IP Address', price: 200, setup: 0, category: 'Connectivity' },
      { product_id: 'P17', product_name: 'Cloud Backup 1 TB', price: 499, setup: 0, category: 'Cloud & Productivity' },
      { product_id: 'P07', product_name: 'Business Postpaid SIM (Unlimited)', price: 299, setup: 0, category: 'Connectivity' }
    ]);
  };

  const handleToggleAddon = async (addon: any) => {
    const exists = items.some(i => i.product_id === addon.product_id);
    let updatedItems: any[];

    if (exists) {
      updatedItems = items.filter(i => i.product_id !== addon.product_id);
    } else {
      updatedItems = [
        ...items,
        {
          product_id: addon.product_id,
          product_name: addon.product_name,
          category: addon.category,
          quantity: 1,
          unit_price: addon.price,
          setup_fee: addon.setup,
          is_addon: true,
          min_contract_months: 12
        }
      ];
    }

    // Call server to deterministically recalculate
    setLoading(true);
    try {
      const res = await fetch('/api/v1/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'recalculate',
          bundle_name: quote?.bundle_name || 'Business Bundle',
          product_ids: updatedItems.map(i => ({
            product_id: i.product_id,
            is_addon: i.is_addon,
            quantity: i.quantity
          }))
        })
      });
      const data = await res.json();
      if (data.success && data.calculation) {
        setItems(data.calculation.items);
        if (quote) {
          setQuote({
            ...quote,
            monthly_recurring_total: data.calculation.monthly_recurring_total,
            one_time_setup_total: data.calculation.one_time_setup_total,
            contract_months: data.calculation.contract_months
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async () => {
    if (!quote) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'accept',
          quote_id: quote.id
        })
      });
      const data = await res.json();
      if (data.success) {
        router.push('/kyc');
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
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {language === 'en' ? 'Itemized Business Quotation' : 'पारदर्शी कोटेशन'}
            </h1>
            <p className="text-xs text-gray-700">
              {language === 'en'
                ? 'Server-verified quotation with transparent monthly & one-time setup breakdown.'
                : 'सर्वर-सत्यापित कोटेशन, पारदर्शी शुल्क विवरण के साथ।'}
            </p>
          </div>
        </div>

        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
          Quote #{quote?.id || 'GENERATING'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Included Line Items + Add-ons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              {language === 'en' ? 'Included Bundle Items' : 'बंडल में शामिल सेवाएं'}
            </h2>

            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.product_id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">{item.product_name}</div>
                      <div className="text-[11px] text-gray-700">{item.category} • SKU: {item.product_id}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-gray-900">₹{item.unit_price}/mo</div>
                    <div className="text-[11px] text-gray-700">Setup: ₹{item.setup_fee}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons Selector */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {language === 'en' ? 'Customizable Add-ons' : 'अतिरिक्त सेवाएं जोड़ें'}
              </h2>
              <span className="text-[11px] text-gray-700">Live Server Recalculation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableAddons.map(addon => {
                const isSelected = items.some(i => i.product_id === addon.product_id);
                return (
                  <button
                    key={addon.product_id}
                    onClick={() => handleToggleAddon(addon)}
                    className={`p-3 rounded-xl border text-left transition-all flex justify-between items-center ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-900">{addon.product_name}</div>
                      <div className="text-[11px] text-gray-700">+₹{addon.price}/mo (Setup: ₹{addon.setup})</div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Price Summary & Accept Button */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              {language === 'en' ? 'Quote Summary' : 'कुल शुल्क'}
            </h2>

            <div className="space-y-3 text-xs border-b pb-4 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>{language === 'en' ? 'Monthly Recurring' : 'मासिक प्लान'}</span>
                <span className="font-bold text-gray-900">₹{quote?.monthly_recurring_total || 0}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>{language === 'en' ? 'One-time Setup Fee' : 'एकमुश्त सेटअप फीस'}</span>
                <span className="font-bold text-gray-900">₹{quote?.one_time_setup_total || 0}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>{language === 'en' ? 'Contract Duration' : 'अनुबंध अवधि'}</span>
                <span className="font-bold text-gray-900">{quote?.contract_months || 12} Months</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>{language === 'en' ? 'GST (18%)' : 'जीएसटी (18%)'}</span>
                <span className="font-bold text-gray-900">
                  ₹{Math.round((quote?.monthly_recurring_total || 0) * 0.18)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs text-gray-700 mb-1">
                {language === 'en' ? 'Total Monthly Payable:' : 'कुल मासिक देय राशि:'}
              </div>
              <div className="text-3xl font-black text-gray-900">
                ₹{Math.round((quote?.monthly_recurring_total || 0) * 1.18)}
                <span className="text-xs font-normal text-gray-700"> / mo</span>
              </div>
            </div>

            <button
              onClick={handleAcceptQuote}
              disabled={loading}
              className="w-full bg-[#E40000] hover:bg-[#B30000] text-white py-3 rounded-xl text-xs font-bold shadow flex items-center justify-center space-x-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {loading
                  ? 'Accepting...'
                  : (language === 'en' ? 'Accept Quote & Start Smart KYC' : 'स्वीकार करें एवं KYC शुरू करें')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start space-x-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {language === 'en'
                  ? 'Price is guaranteed for 30 days. Accepting this quote locks terms without obligation until KYC clearance.'
                  : 'कोटेशन 30 दिनों के लिए वैध है। स्वीकार करने पर दरें सुरक्षित हो जाती हैं।'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

