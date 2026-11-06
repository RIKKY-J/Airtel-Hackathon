'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { 
  Wifi, 
  ShieldCheck, 
  Receipt, 
  Clock, 
  Sparkles, 
  Store, 
  Building2, 
  HardDrive, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function DashboardPage() {
  const { language, business } = useApp();

  const segment = business?.business_type || 'micro_retail_services';

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-100 text-[#E40000] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {business?.city || 'Jaipur'}, Tier {business?.city_tier || 2}
            </span>
            <span className="text-xs text-gray-700">
              {business?.has_gstin === 1 ? '• Verified GSTIN' : '• Non-GSTIN MSME (Udyam Track)'}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-1">
            {business?.business_name || 'Sharma Kirana Store'}
          </h1>
          <p className="text-xs text-gray-700 mt-0.5">
            {language === 'en'
              ? 'Personalized self-service portal tailored for your business category.'
              : 'आपके व्यापार वर्ग के अनुसार अनुकूलित डिजिटल सेवा पोर्टल।'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/advisor"
            className="bg-[#E40000] hover:bg-[#B30000] text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'en' ? 'Start AI Need Advisor' : 'स्मार्ट एडवाइजर शुरू करें'}</span>
          </Link>
          <Link
            href="/kyc"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 transition-all flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Smart KYC' : 'केवाईसी'}</span>
          </Link>
        </div>
      </div>

      {/* Segment-Adaptive Telemetry Cards */}
      {segment === 'micro_retail_services' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">UPI / POS Uptime</span>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">99.98%</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>Zero failed UPI QR transactions today</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Broadband Plan</span>
              <Wifi className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">100 Mbps</div>
            <p className="text-xs text-gray-700 mt-1">Biz Fibre 100 • Unlimited Data</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Cloud CCTV & Security</span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">2 Cameras</div>
            <p className="text-xs text-emerald-600 mt-1">7-Day Cloud Storage Active</p>
          </div>
        </div>
      )}

      {segment === 'professional_office' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Static IP Server</span>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">122.160.x.x</div>
            <p className="text-xs text-blue-600 mt-1">Bound to Clinic Patient Management System</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Cloud Backup</span>
              <HardDrive className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">1 TB Encrypted</div>
            <p className="text-xs text-emerald-600 mt-1">Last backup: 18 mins ago</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Endpoint Security</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">6 Protected Seats</div>
            <p className="text-xs text-gray-700 mt-1">Practice data shielded</p>
          </div>
        </div>
      )}

      {segment === 'small_multisite' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Active Outlets</span>
              <Store className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">4 Branches</div>
            <p className="text-xs text-emerald-600 mt-1">All sites synchronized on 1 bill</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">4G Backup Failover</span>
              <Wifi className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">Hot Standby</div>
            <p className="text-xs text-gray-700 mt-1">Auto-switches in &lt;1.5 seconds</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">SD-WAN Central</span>
              <Building2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">Mesh Active</div>
            <p className="text-xs text-blue-600 mt-1">Central branch QoS enabled</p>
          </div>
        </div>
      )}

      {segment === 'small_manufacturer' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Internet Leased Line</span>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">20 Mbps 1:1</div>
            <p className="text-xs text-amber-600 mt-1">Symmetrical upload/download • SLA 99.9%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Machine IoT Telemetry</span>
              <Cpu className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">12 Connected CNCs</div>
            <p className="text-xs text-emerald-600 mt-1">Cloud ERP gateway active</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-700 uppercase">Managed Firewall</span>
              <ShieldCheck className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">Fortified</div>
            <p className="text-xs text-gray-700 mt-1">Zero intrusion attempts</p>
          </div>
        </div>
      )}

      {/* Main Guided Workflow Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          {language === 'en' ? 'Guided MSME Digital Onboarding Flow' : 'डिजिटल ऑनबोर्डिंग प्रक्रिया'}
        </h2>
        <p className="text-xs text-gray-700 mb-6">
          {language === 'en'
            ? 'Complete your connectivity setup in under 10 minutes without waiting for a salesperson visit.'
            : 'सेल्समैन का इंतजार किए बिना 10 मिनट में अपना कनेक्शन प्रोसेस पूरा करें।'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/advisor"
            className="p-4 rounded-xl border border-gray-200 hover:border-[#E40000] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E40000] flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#E40000]">
                {language === 'en' ? 'AI Business Advisor' : 'बिजनेस एडवाइजर'}
              </h3>
              <p className="text-xs text-gray-700 mt-1">
                {language === 'en'
                  ? 'Answer 3 plain-talk questions to get a catalogue-restricted outcome bundle.'
                  : 'केवल 3 आसान सवालों के जवाब देकर अपनी जरूरत का पैक चुनें।'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-[#E40000]">
              <span>{language === 'en' ? 'Explore Bundles' : 'पैक देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/quote"
            className="p-4 rounded-xl border border-gray-200 hover:border-[#E40000] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600">
                {language === 'en' ? 'Transparent Quotation' : 'पारदर्शी कोटेशन'}
              </h3>
              <p className="text-xs text-gray-700 mt-1">
                {language === 'en'
                  ? 'Clear recurring and setup fees. Toggle add-ons with server-side recalculation.'
                  : 'स्पष्ट मासिक शुल्क, बिना किसी छिपे हुए चार्ज के।'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-600">
              <span>{language === 'en' ? 'View Quote' : 'कोटेशन देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/kyc"
            className="p-4 rounded-xl border border-gray-200 hover:border-[#E40000] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600">
                {language === 'en' ? 'Zero-Touch Smart KYC' : 'स्मार्ट केवाईसी'}
              </h3>
              <p className="text-xs text-gray-700 mt-1">
                {language === 'en'
                  ? 'DPDP 2023 unbundled consent. Fast GSTIN or Udyam-only non-GSTIN route.'
                  : 'बिना विजिट के Udyam या GSTIN द्वारा डिजिटल सत्यापन।'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-600">
              <span>{language === 'en' ? 'Verify Documents' : 'सत्यापन करें'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/tracker"
            className="p-4 rounded-xl border border-gray-200 hover:border-[#E40000] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
                4
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600">
                {language === 'en' ? 'Live Order Tracker' : 'ऑर्डर ट्रैकर'}
              </h3>
              <p className="text-xs text-gray-700 mt-1">
                {language === 'en'
                  ? 'Real-time SLA clock and technician milestones. Zero status chasing.'
                  : 'रियल-टाइम इंस्टॉलेशन स्टेटस और 48 घंटे में एक्टिवेशन।'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-purple-600">
              <span>{language === 'en' ? 'Track Order' : 'ट्रैक करें'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

