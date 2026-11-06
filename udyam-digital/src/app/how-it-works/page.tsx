'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { 
  UserCheck, 
  HelpCircle, 
  Sparkles, 
  Receipt, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Users2, 
  ArrowRight 
} from 'lucide-react';

export default function HowItWorksPage() {
  const { language } = useApp();

  const steps = [
    {
      num: 1,
      title: language === 'en' ? 'Register & Select Business Type' : 'पंजीकरण एवं व्यापार वर्ग चयन',
      desc: language === 'en'
        ? 'Sign in with your mobile number via demo OTP and select your primary MSME segment (Kirana, Clinic, Multi-Store, or Manufacturer).'
        : 'मोबाइल नंबर द्वारा लॉगिन करें और अपना व्यापार वर्ग चुनें।'
    },
    {
      num: 2,
      title: language === 'en' ? 'Quick Profile Setup' : 'व्यापार प्रोफाइल',
      desc: language === 'en'
        ? 'Share employee scale, location count, and current connectivity setup in a 60-second wizard.'
        : 'कर्मचारियों की संख्या और वर्तमान इंटरनेट सेटअप की जानकारी दें।'
    },
    {
      num: 3,
      title: language === 'en' ? 'Consult the AI Business Advisor' : 'एआई एडवाइजर से परामर्श',
      desc: language === 'en'
        ? 'Answer 3 plain-talk questions about your actual business requirements (e.g. POS stability, cloud backup, or leased line).'
        : 'अपनी व्यावसायिक प्राथमिकताओं के अनुसार उपयुक्त परामर्श लें।'
    },
    {
      num: 4,
      title: language === 'en' ? 'Review Transparent Outcome Bundle' : 'पारदर्शी बंडल एवं कोटेशन',
      desc: language === 'en'
        ? 'Receive a catalogue-constrained bundle with clear recurring and one-time fees. Toggle add-ons with instant server recalculation.'
        : 'स्पष्ट मासिक शुल्क और ऐड-ऑन विकल्पों के साथ कोटेशन देखें।'
    },
    {
      num: 5,
      title: language === 'en' ? 'Complete Zero-Touch Smart KYC' : 'जीरो-विजिट स्मार्ट केवाईसी',
      desc: language === 'en'
        ? 'Grant explicit DPDP 2023 consent and verify via Track A (GSTIN) or Track B (Non-GSTIN Udyam certificate + 90-day utility bill).'
        : 'दुकान से बाहर निकले बिना सरकारी पोर्टल द्वारा तुरंत डिजिटल सत्यापन।'
    },
    {
      num: 6,
      title: language === 'en' ? 'Submit Order' : 'ऑर्डर दर्ज करें',
      desc: language === 'en'
        ? 'Accept the price-locked quote snapshot and create your formal telecom order without sales visit delays.'
        : 'कोटेशन स्वीकार करें और अपना ऑर्डर दर्ज करें।'
    },
    {
      num: 7,
      title: language === 'en' ? 'Track Live Activation (< 48h SLA)' : 'लाइव एक्टिवेशन ट्रैकिंग',
      desc: language === 'en'
        ? 'Follow real-time technician and provisioning milestones with proactive WhatsApp updates, eliminating follow-up calls.'
        : 'रियल-टाइम इंस्टॉलेशन स्टेटस और 48 घंटे में एक्टिवेशन।'
    },
    {
      num: 8,
      title: language === 'en' ? 'Assisted Partner Recovery' : 'पार्टनर सहायता',
      desc: language === 'en'
        ? 'If your verification encounters an exception or you request field help, a local authorized partner assists you immediately.'
        : 'आवश्यकता पड़ने पर स्थानीय अधिकृत पार्टनर द्वारा सहायता।'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {language === 'en' ? 'How Project Udyam Digital Works' : 'यह कैसे कार्य करता है'}
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
          {language === 'en'
            ? 'From needs discovery to activation in 8 transparent steps, replacing weeks of fragmented enterprise sales drag.'
            : 'पारंपरिक हफ्तों की देरी को समाप्त कर कुछ ही मिनटों में कनेक्शन की संपूर्ण प्रक्रिया।'}
        </p>
      </div>

      <div className="space-y-4">
        {steps.map(s => (
          <div key={s.num} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E40000] font-black flex items-center justify-center shrink-0 text-base">
              {s.num}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 bg-[#E40000] hover:bg-[#B30000] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-all"
        >
          <span>{language === 'en' ? 'Get Started on Dashboard' : 'डैशबोर्ड पर शुरू करें'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
