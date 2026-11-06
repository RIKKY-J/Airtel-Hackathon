'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { BusinessType } from '@/types';
import { ShieldCheck, PhoneCall, Sparkles, Store, Building2, Cpu, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { language, setBusiness } = useApp();
  const [mobile, setMobile] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [loading, setLoading] = useState(false);

  const handleQuickDemo = (type: BusinessType, name: string, hasGst: number) => {
    setBusiness({
      id: `B_${type.toUpperCase()}`,
      owner_user_id: `U_${type.toUpperCase()}`,
      business_name: name,
      business_type: type,
      city: type === 'micro_retail_services' ? 'Jaipur' : 'Bangalore',
      city_tier: type === 'micro_retail_services' ? 2 : 1,
      state: type === 'micro_retail_services' ? 'Rajasthan' : 'Karnataka',
      preferred_language: language,
      employee_count: type === 'small_manufacturer' ? 15 : 3,
      num_sites: type === 'small_multisite' ? 4 : 1,
      has_gstin: hasGst,
      has_udyam: 1,
      partner_code: 'PARTNER_DEMO',
      created_at: new Date().toISOString()
    });
    router.push('/dashboard');
  };

  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 400);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Hero Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-red-50 text-[#E40000] border border-red-200 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Airtel Business Enterprise Track A' : 'एयरटेल बिज़नेस एंटरप्राइज ट्रैक A'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {language === 'en' ? 'Project Udyam Digital' : 'प्रोजेक्ट उद्यम डिजिटल'}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Digital-first discovery, zero-touch Smart KYC, outcome-based bundle quotation, and transparent activation for 63M Indian MSMEs.'
            : 'भारतीय एमएसएमई के लिए डिजिटल-फर्स्ट डिस्कवरी, जीरो-विजिट स्मार्ट केवाईसी, पारदर्शी कोटेशन और 48 घंटे में एक्टिवेशन।'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Card: Simulated Mobile OTP Login */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 border-b pb-4 mb-6">
            <PhoneCall className="w-5 h-5 text-[#E40000]" />
            <h2 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Mobile Verification (OTP)' : 'मोबाइल वेरिफिकेशन (OTP)'}
            </h2>
          </div>

          {step === 'mobile' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {language === 'en' ? 'Mobile Number' : 'मोबाइल नंबर'}
                </label>
                <div className="flex rounded-lg shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-red-500 overflow-hidden">
                  <span className="bg-gray-100 text-gray-600 px-3 py-2 text-sm font-semibold flex items-center border-r">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile"
                    className="flex-1 px-3 py-2 text-sm outline-none font-medium text-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-[#E40000] hover:bg-[#B30000] text-white py-2.5 rounded-lg text-sm font-bold shadow transition-colors flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Sending...' : (language === 'en' ? 'Send Demo OTP' : 'डेमो OTP भेजें')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    {language === 'en' ? 'Enter 6-Digit OTP' : '6 अंकों का OTP दर्ज करें'}
                  </label>
                  <span className="text-xs text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded">Demo: 123456</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center tracking-widest text-lg font-bold outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-[#E40000] hover:bg-[#B30000] text-white py-2.5 rounded-lg text-sm font-bold shadow transition-colors flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Verifying...' : (language === 'en' ? 'Verify & Open Dashboard' : 'वेरिफाई करें एवं आगे बढ़ें')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setStep('mobile')}
                className="w-full text-xs text-gray-700 hover:underline text-center block"
              >
                {language === 'en' ? 'Change mobile number' : 'मोबाइल नंबर बदलें'}
              </button>
            </div>
          )}
        </div>

        {/* Right Card: Instant Hackathon Demo Profiles */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-4 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'One-Click Persona Switcher' : 'त्वरित डेमो प्रोफाइल'}
            </h2>
          </div>
          <p className="text-xs text-gray-700 mb-4">
            {language === 'en'
              ? 'Select any of the four MSME segments to immediately explore the tailored dashboard, catalogue rules, and bundle recommendations:'
              : 'किसी भी सेगमेंट को चुनकर तुरंत अनुभव करें:'}
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => handleQuickDemo('micro_retail_services', 'Sharma Kirana & General Store', 0)}
              className="w-full text-left p-3 rounded-xl bg-white hover:border-[#E40000] border border-gray-200 transition-all flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#E40000]">
                    1. Micro Retail (Kirana Store)
                  </h3>
                  <p className="text-[11px] text-gray-700">Non-GSTIN • UPI/POS Uptime • ₹999/mo</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#E40000]" />
            </button>

            <button
              onClick={() => handleQuickDemo('professional_office', 'Aura Dental & Care Clinic', 1)}
              className="w-full text-left p-3 rounded-xl bg-white hover:border-[#E40000] border border-gray-200 transition-all flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#E40000]">
                    2. Professional Office (CA/Clinic)
                  </h3>
                  <p className="text-[11px] text-gray-700">Static IP • Cloud Backup • Endpoint Security</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#E40000]" />
            </button>

            <button
              onClick={() => handleQuickDemo('small_multisite', 'Bawarchi Sweets & Restaurant Chain', 1)}
              className="w-full text-left p-3 rounded-xl bg-white hover:border-[#E40000] border border-gray-200 transition-all flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#E40000]">
                    3. Multi-Store Chain (3-10 Outlets)
                  </h3>
                  <p className="text-[11px] text-gray-700">4G Failover • Central CCTV • SD-WAN</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#E40000]" />
            </button>

            <button
              onClick={() => handleQuickDemo('small_manufacturer', 'Apex Precision Auto Components', 1)}
              className="w-full text-left p-3 rounded-xl bg-white hover:border-[#E40000] border border-gray-200 transition-all flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#E40000]">
                    4. Small Manufacturer (Industrial)
                  </h3>
                  <p className="text-[11px] text-gray-700">Leased Line 20Mbps • IoT Monitoring • Firewall</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#E40000]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

