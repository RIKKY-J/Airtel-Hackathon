'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { BusinessType } from '@/types';
import { 
  Building2, 
  Sparkles, 
  Receipt, 
  ShieldCheck, 
  Clock, 
  Users2, 
  BarChart3, 
  Languages, 
  Settings 
} from 'lucide-react';

const SEGMENTS: { type: BusinessType; label_en: string; label_hi: string }[] = [
  { type: 'micro_retail_services', label_en: 'Kirana / Retail', label_hi: 'किराना / रिटेल' },
  { type: 'professional_office', label_en: 'CA / Clinic', label_hi: 'क्लिनिक / सीए' },
  { type: 'small_multisite', label_en: 'Multi-Store', label_hi: 'मल्टी-ब्रांच' },
  { type: 'small_manufacturer', label_en: 'Manufacturing', label_hi: 'लघु उद्योग' }
];

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, business, setBusiness } = useApp();

  const handleSegmentSwitch = async (type: BusinessType) => {
    if (!business) return;
    const names: Record<BusinessType, string> = {
      micro_retail_services: 'Sharma Kirana & Daily Needs',
      professional_office: 'Aura Dental & Care Clinic',
      small_multisite: 'Bawarchi Sweets & Restaurant Chain',
      small_manufacturer: 'Apex Precision Auto Components'
    };

    const hasGstMap: Record<BusinessType, number> = {
      micro_retail_services: 0,
      professional_office: 1,
      small_multisite: 1,
      small_manufacturer: 1
    };

    const updated = {
      ...business,
      business_type: type,
      business_name: names[type],
      has_gstin: hasGstMap[type]
    };
    setBusiness(updated);

    // Persist to backend without touching active subscriptions
    try {
      await fetch('/api/v1/businesses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: business.id,
          business_type: type,
          business_name: names[type]
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const navLinks = [
    { href: '/dashboard', label_en: 'Dashboard', label_hi: 'डैशबोर्ड', icon: Building2 },
    { href: '/advisor', label_en: 'Need Advisor', label_hi: 'एडवाइजर', icon: Sparkles },
    { href: '/quote', label_en: 'Live Quote', label_hi: 'कोटेशन', icon: Receipt },
    { href: '/kyc', label_en: 'Smart KYC', label_hi: 'स्मार्ट KYC', icon: ShieldCheck },
    { href: '/tracker', label_en: 'Order Tracker', label_hi: 'ट्रैकर', icon: Clock },
    { href: '/partner/leads', label_en: 'Partner Console', label_hi: 'पार्टनर कंसोल', icon: Users2 },
    { href: '/analytics', label_en: 'Funnel Analytics', label_hi: 'एनालिटिक्स', icon: BarChart3 }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-white text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-[#E40000] text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
            Airtel Business
          </span>
          <span className="text-gray-300">Project Udyam Digital (Enterprise MSME Track A)</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <Languages className="w-3.5 h-3.5 text-gray-400" />
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-xs font-semibold text-white bg-gray-800 hover:bg-gray-700 px-2 py-0.5 rounded border border-gray-700"
            >
              {language === 'en' ? 'हिन्दी (Hindi)' : 'English'}
            </button>
          </div>
          <Link href="/settings" className="hover:text-red-400 flex items-center space-x-1">
            <Settings className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Settings' : 'सेटिंग्स'}</span>
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Current Business */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-[#E40000] flex items-center justify-center text-white font-extrabold text-xl shadow">
                U
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 tracking-tight">Udyam<span className="text-[#E40000]">Digital</span></span>
                <span className="hidden sm:block text-[10px] text-gray-700 font-medium -mt-1">MSME Self-Service Platform</span>
              </div>
            </Link>

            {/* Quick Segment Switcher for Demo */}
            <div className="hidden lg:flex items-center bg-gray-100 p-1 rounded-lg space-x-1 border border-gray-200">
              <span className="text-[11px] font-semibold text-gray-700 px-2">Segment:</span>
              {SEGMENTS.map(s => (
                <button
                  key={s.type}
                  onClick={() => handleSegmentSwitch(s.type)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    business?.business_type === s.type
                      ? 'bg-white text-gray-900 shadow-sm font-bold border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {language === 'en' ? s.label_en : s.label_hi}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-1 overflow-x-auto py-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-red-50 text-[#E40000] border-b-2 border-[#E40000]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E40000]' : 'text-gray-600'}`} />
                  <span>{language === 'en' ? link.label_en : link.label_hi}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

