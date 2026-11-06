'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { BusinessType } from '@/types';
import { Settings, ShieldCheck, Check, AlertCircle, Building2 } from 'lucide-react';

export default function SettingsPage() {
  const { language, business, setBusiness } = useApp();
  const [selectedType, setSelectedType] = useState<BusinessType>(business?.business_type || 'micro_retail_services');
  const [businessName, setBusinessName] = useState(business?.business_name || '');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!business) return;
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch('/api/v1/businesses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: business.id,
          business_type: selectedType,
          business_name: businessName
        })
      });
      const data = await res.json();
      if (data.success && data.business) {
        setBusiness(data.business);
        setSaved(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">
            {language === 'en' ? 'Account Settings & Business Profile' : 'अकाउंट सेटिंग्स एवं व्यापार प्रोफाइल'}
          </h1>
          <p className="text-xs text-gray-700">
            {language === 'en'
              ? 'Update your business segment without altering existing orders or active subscriptions.'
              : 'मौजूदा कनेक्शन को बदले बिना अपना व्यापार वर्ग अपडेट करें।'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            {language === 'en' ? 'Registered Trade Name' : 'व्यापार का नाम'}
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            {language === 'en' ? 'Primary Business Category' : 'व्यापार का प्रकार'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { type: 'micro_retail_services', label: 'Micro Retail & Services (Kirana, Salon, Pharmacy)' },
              { type: 'professional_office', label: 'Professional Office (CA, Clinic, Coaching)' },
              { type: 'small_multisite', label: 'Small Multi-Site (Restaurant / Store Chain)' },
              { type: 'small_manufacturer', label: 'Small Manufacturer (Industrial Light Unit)' }
            ].map(item => (
              <button
                key={item.type}
                onClick={() => setSelectedType(item.type as BusinessType)}
                className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                  selectedType === item.type
                    ? 'border-[#E40000] bg-red-50/50 text-[#E40000] ring-1 ring-[#E40000]'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Protection Notice */}
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            {language === 'en'
              ? 'Architectural Guardrail: Changing your business profile updates dashboard shortcuts and future recommendations; it never cancels or alters existing orders.'
              : 'सुरक्षा नियम: प्रोफाइल बदलने से सक्रिय कनेक्शन या पुराने ऑर्डर प्रभावित नहीं होंगे।'}
          </span>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center">
            <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
            <span>Profile updated successfully!</span>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#E40000] hover:bg-[#B30000] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow transition-all"
        >
          {loading ? 'Saving...' : (language === 'en' ? 'Save Changes' : 'बदलाव सुरक्षित करें')}
        </button>
      </div>
    </div>
  );
}

