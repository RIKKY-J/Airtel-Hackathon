'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { BusinessType, UserRole } from '@/types';
import { 
  Building2, 
  Sparkles, 
  Receipt, 
  ShieldCheck, 
  Clock, 
  Users2, 
  BarChart3, 
  Languages, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  Package,
  Layers,
  Info,
  ChevronDown
} from 'lucide-react';

const SEGMENTS: { type: BusinessType; label_en: string; label_hi: string }[] = [
  { type: 'micro_retail_services', label_en: 'Kirana Store', label_hi: 'किराना' },
  { type: 'professional_office', label_en: 'CA / Clinic', label_hi: 'क्लिनिक' },
  { type: 'small_multisite', label_en: 'Multi-Store', label_hi: 'मल्टी-ब्रांच' },
  { type: 'small_manufacturer', label_en: 'Manufacturing', label_hi: 'लघु उद्योग' }
];

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, userRole, setUserRole, business, setBusiness } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPersonaDialog, setShowPersonaDialog] = useState(false);
  const [pendingSegment, setPendingSegment] = useState<BusinessType | null>(null);

  const confirmSegmentSwitch = async () => {
    if (!business || !pendingSegment) return;
    const type = pendingSegment;
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
    setShowPersonaDialog(false);
    setPendingSegment(null);
  };

  const handleSegmentClick = (type: BusinessType) => {
    if (type === business?.business_type) return;
    setPendingSegment(type);
    setShowPersonaDialog(true);
  };

  // Customer Navigation Links
  const customerNavLinks = [
    { href: '/dashboard', label_en: 'Dashboard', label_hi: 'डैशबोर्ड', icon: Building2 },
    { href: '/advisor', label_en: 'Advisor', label_hi: 'एडवाइजर', icon: Sparkles },
    { href: '/services', label_en: 'Services', label_hi: 'सेवाएं', icon: Package },
    { href: '/bundles', label_en: 'Bundles', label_hi: 'बंडल', icon: Layers },
    { href: '/quote', label_en: 'Quote', label_hi: 'कोटेशन', icon: Receipt },
    { href: '/kyc', label_en: 'Smart KYC', label_hi: 'केवाईसी', icon: ShieldCheck },
    { href: '/orders', label_en: 'Orders', label_hi: 'ऑर्डर्स', icon: Clock }
  ];

  // Partner Navigation Links (Hidden from ordinary customers)
  const partnerNavLinks = [
    { href: '/leads', label_en: 'Lead Recovery', label_hi: 'लीड रिकवरी', icon: Users2 },
    { href: '/analytics', label_en: 'Funnel & CAC', label_hi: 'फ़नल एवं CAC', icon: BarChart3 }
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        {/* Global Top Utility Bar */}
        <div className="bg-[#1A1A1A] text-white text-[11px] px-3 sm:px-6 py-1.5 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#E40000] text-white font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              Airtel Business
            </span>
            <span className="text-gray-300 font-medium hidden sm:inline">Project Udyam Digital</span>
            <span className="bg-gray-800 text-amber-400 font-bold px-2 py-0.2 rounded border border-gray-700 text-[10px]">
              Simulated Demo Environment
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {/* Role Switcher (Customer vs Partner) */}
            <div className="flex items-center bg-gray-800 rounded px-1.5 py-0.5 border border-gray-700">
              <span className="text-[10px] text-gray-400 mr-1.5">View:</span>
              <button
                onClick={() => setUserRole(userRole === 'customer' ? 'partner' : 'customer')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${
                  userRole === 'partner'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:text-white'
                }`}
              >
                {userRole === 'partner' ? 'Staff / Partner Mode' : 'Customer Mode'}
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-[11px] font-semibold text-white bg-gray-800 hover:bg-gray-700 px-2 py-0.5 rounded border border-gray-700 flex items-center space-x-1"
            >
              <Languages className="w-3 h-3 text-red-400" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            <Link href="/help" className="hover:text-red-400 text-gray-300 flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{language === 'en' ? 'Help' : 'मदद'}</span>
            </Link>

            <Link href="/settings" className="hover:text-red-400 text-gray-300 flex items-center space-x-1">
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{language === 'en' ? 'Settings' : 'सेटिंग्स'}</span>
            </Link>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#E40000] flex items-center justify-center text-white font-extrabold text-lg shadow">
                  U
                </div>
                <div>
                  <span className="text-base font-extrabold text-gray-900 tracking-tight">
                    Udyam<span className="text-[#E40000]">Digital</span>
                  </span>
                </div>
              </Link>

              {/* Segment Persona Switcher with clear Demo indicator */}
              <div className="hidden xl:flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5 text-xs">
                <span className="text-[10px] font-bold text-gray-500 uppercase px-2">Demo Persona:</span>
                {SEGMENTS.map(s => (
                  <button
                    key={s.type}
                    onClick={() => handleSegmentClick(s.type)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                      business?.business_type === s.type
                        ? 'bg-white text-gray-900 shadow-xs font-bold border border-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {language === 'en' ? s.label_en : s.label_hi}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {(userRole === 'partner' ? partnerNavLinks : customerNavLinks).map(link => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-red-50 text-[#E40000]'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E40000]' : 'text-gray-500'}`} />
                    <span>{language === 'en' ? link.label_en : link.label_hi}</span>
                  </Link>
                );
              })}

              {/* Public Pages Quick Links */}
              <div className="border-l pl-2 ml-1 flex items-center space-x-1 text-xs text-gray-600">
                <Link href="/about" className="px-2 py-1 hover:text-[#E40000]">
                  {language === 'en' ? 'About' : 'परिचय'}
                </Link>
                <Link href="/contact" className="px-2 py-1 hover:text-[#E40000]">
                  {language === 'en' ? 'Contact' : 'संपर्क'}
                </Link>
              </div>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
            <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-1">
              {userRole === 'partner' ? 'Staff / Partner Console' : 'Customer Workspace'}
            </div>
            {(userRole === 'partner' ? partnerNavLinks : customerNavLinks).map(link => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold ${
                    isActive ? 'bg-red-50 text-[#E40000]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{language === 'en' ? link.label_en : link.label_hi}</span>
                </Link>
              );
            })}
            <div className="border-t pt-2 grid grid-cols-2 gap-1 text-xs">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-gray-600">
                About
              </Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-gray-600">
                Services
              </Link>
              <Link href="/bundles" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-gray-600">
                Bundles
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 text-gray-600">
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Confirmation Dialog for Persona Switch */}
      {showPersonaDialog && pendingSegment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center font-bold">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900">
                {language === 'en' ? 'Switch Demo Persona?' : 'डेमो प्रोफाइल बदलें?'}
              </h3>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed">
              {language === 'en'
                ? `You are switching to "${pendingSegment.replace('_', ' ').toUpperCase()}". This will adapt your dashboard shortcuts, KPIs, and advisor recommendations. Existing active orders, quotes, and subscriptions are strictly preserved.`
                : 'प्रोफाइल बदलने पर डैशबोर्ड और एडवाइजर की सिफारिशें अपडेट होंगी। आपके मौजूदा सक्रिय कनेक्शन सुरक्षित रहेंगे।'}
            </p>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => { setShowPersonaDialog(false); setPendingSegment(null); }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                {language === 'en' ? 'Cancel' : 'रद्द करें'}
              </button>
              <button
                onClick={confirmSegmentSwitch}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#E40000] hover:bg-[#B30000] text-white shadow"
              >
                {language === 'en' ? 'Confirm Switch' : 'स्वीकार करें'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
