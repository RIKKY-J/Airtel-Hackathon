'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { Building2, Sparkles, ShieldCheck, Users2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AboutPage() {
  const { language } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Hero */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <span className="bg-red-50 text-[#E40000] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-red-200">
          Airtel Business Enterprise Track A
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
          {language === 'en' ? 'About Project Udyam Digital' : 'प्रोजेक्ट उद्यम डिजिटल के बारे में'}
        </h1>
        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {language === 'en'
            ? 'A unified digital acquisition and onboarding platform designed to solve broken B2B unit economics and high operating latency for India\'s 63M micro, small, and medium businesses.'
            : 'भारतीय एमएसएमई के लिए डिजिटल-फर्स्ट डिस्कवरी, जीरो-विजिट स्मार्ट केवाईसी और पारदर्शी एक्टिवेशन प्लेटफॉर्म।'}
        </p>
      </div>

      {/* The Core Problem We Solve */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'en' ? 'The MSME Acquisition Challenge' : 'पारंपरिक मॉडल की समस्याएं'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 space-y-2">
            <div className="text-xs font-extrabold text-[#E40000] uppercase">1. High Customer Acquisition Cost</div>
            <div className="text-2xl font-black text-gray-900">₹15,000 CAC</div>
            <p className="text-xs text-gray-700">
              Blended field-sales visits result in high acquisition drag for low-ticket ₹2,500 monthly accounts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-2">
            <div className="text-xs font-extrabold text-amber-600 uppercase">2. Onboarding Latency</div>
            <div className="text-2xl font-black text-gray-900">17.6 Days</div>
            <p className="text-xs text-gray-700">
              Average 17.6 days from lead to activation, generating 3+ customer status-chasing calls.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
            <div className="text-xs font-extrabold text-purple-600 uppercase">3. The 56% Quote Drop-Off</div>
            <div className="text-2xl font-black text-gray-900">43.6% Conv.</div>
            <p className="text-xs text-gray-700">
              Technical jargon and complex PDF quotes cause over half of interested MSMEs to abandon the funnel.
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Business Segments */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'en' ? 'One Platform, Four Configurable Experiences' : 'एक ऐप, चार व्यापार वर्ग'}
        </h2>
        <p className="text-xs text-gray-600">
          Instead of maintaining four siloed applications, Udyam Digital dynamically configures dashboard emphasis, advisor questions, and outcome bundles for:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-xs text-gray-900">1. Micro Retail & Services</h3>
            <p className="text-[11px] text-gray-600 mt-1">Kirana stores, salons, pharmacies needing rock-solid UPI/POS uptime.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-xs text-gray-900">2. Professional Offices</h3>
            <p className="text-[11px] text-gray-600 mt-1">CA firms, clinics, coaching institutes needing static IP and 1TB cloud backup.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-xs text-gray-900">3. Small Multi-Site</h3>
            <p className="text-[11px] text-gray-600 mt-1">Restaurant and store chains needing 4G failover, central CCTV, and SD-WAN.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-xs text-gray-900">4. Small Manufacturers</h3>
            <p className="text-[11px] text-gray-600 mt-1">Industrial units needing symmetrical Leased Lines (ILL) and IoT machine sensors.</p>
          </div>
        </div>
      </div>

      {/* Assisted-Digital Partner Model */}
      <div className="bg-indigo-50/60 p-8 rounded-2xl border border-indigo-200 space-y-3">
        <div className="flex items-center space-x-2 text-indigo-700 font-bold text-sm">
          <Users2 className="w-5 h-5" />
          <span>Assisted-Digital: Partner & Reseller Harmony</span>
        </div>
        <p className="text-xs text-indigo-900 leading-relaxed">
          Digital self-service does not cannibalize local resellers. Instead, stalled checkouts and KYC review exceptions are automatically routed to nearby channel partners with preserved partner attribution codes (<code>partner_code</code>), ensuring field agents earn full commission on digitally assisted conversions.
        </p>
      </div>

      {/* Case Study Notice */}
      <div className="p-4 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-700 flex items-start space-x-2">
        <AlertCircle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
        <span>
          <strong>Academic & Hackathon Context:</strong> This product uses synthetic test data from the Accel YTL Hackathon 2026 case study. Figures such as ₹15,000 CAC and 17.6 days latency represent baseline case parameters and do not describe live operating data.
        </span>
      </div>
    </div>
  );
}
