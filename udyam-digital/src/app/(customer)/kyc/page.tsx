'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { KycValidationResult, KycTrack } from '@/types';
import { 
  ShieldCheck, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Lock, 
  Sparkles,
  Info
} from 'lucide-react';

export default function KycPage() {
  const router = useRouter();
  const { language, business, activeQuoteId, setActiveOrderId } = useApp();

  const [consentGranted, setConsentGranted] = useState(true);
  const [track, setTrack] = useState<KycTrack>(business?.has_gstin === 1 ? 'gstin' : 'non_gstin_udyam');
  const [selectedApplicant, setSelectedApplicant] = useState('K03');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KycValidationResult | null>(null);

  const handleRunVerification = async () => {
    if (!consentGranted) {
      alert('Please grant DPDP 2023 consent to proceed with verification.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // 1. Record consent
      await fetch('/api/v1/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consent',
          business_id: business?.id || 'B_KIRANA',
          purposes: ['Identity Verification', 'Site Installation Verification']
        })
      });

      // 2. Run verification on chosen applicant specimen
      const res = await fetch('/api/v1/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'validate',
          business_id: business?.id || 'B_KIRANA',
          applicant_id: selectedApplicant,
          track: track
        })
      });

      const data = await res.json();
      if (data.success && data.result) {
        setResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business?.id || 'B_KIRANA',
          quote_id: activeQuoteId || 'Q_DEMO',
          kyc_case_id: result.case_id
        })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setActiveOrderId(data.order.id);
        router.push('/tracker');
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
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {language === 'en' ? 'Smart KYC & Automated Registry Check' : 'स्मार्ट केवाईसी एवं पोर्टल सत्यापन'}
            </h1>
            <p className="text-xs text-gray-700">
              {language === 'en'
                ? 'Zero-visit document extraction verified against mock GSTIN & Udyam government registries.'
                : 'दुकान से बिना बाहर निकले सरकारी पोर्टल द्वारा तुरंत डिजिटल सत्यापन।'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>DPDP Act 2023 Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Consent, Track Selection & Specimen Tester */}
        <div className="lg:col-span-2 space-y-6">
          {/* DPDP 2023 Unbundled Consent Screen */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
              {language === 'en' ? '1. Purpose & Unbundled Consent Notice' : '1. सहमति एवं उद्देश्य विवरण'}
            </h2>
            <p className="text-xs text-gray-700 mb-4">
              {language === 'en'
                ? 'Under the Digital Personal Data Protection (DPDP) Act, 2023, we collect only minimal necessary evidence solely for telecom provisioning.'
                : 'डीपीडीपी अधिनियम 2023 के अंतर्गत केवल कनेक्शन चालू करने के लिए आवश्यक न्यूनतम दस्तावेज लिए जाते हैं।'}
            </p>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={(e) => setConsentGranted(e.target.checked)}
                  className="mt-0.5 rounded text-[#E40000] focus:ring-red-500 w-4 h-4"
                />
                <span className="text-gray-800">
                  <strong>{language === 'en' ? 'Business Identity Verification:' : 'पहचान सत्यापन:'}</strong>{' '}
                  {language === 'en'
                    ? 'I consent to verify my GSTIN / Udyam certificate and Authorised Signatory details with mock registries.'
                    : 'मैं अपने जीएसटी / उद्यम प्रमाण पत्र के सत्यापन की सहमति देता हूँ।'}
                </span>
              </label>

              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={(e) => setConsentGranted(e.target.checked)}
                  className="mt-0.5 rounded text-[#E40000] focus:ring-red-500 w-4 h-4"
                />
                <span className="text-gray-800">
                  <strong>{language === 'en' ? 'Installation Site Verification:' : 'साइट पता सत्यापन:'}</strong>{' '}
                  {language === 'en'
                    ? 'I consent to verify my business premises address via electricity utility bill issued within the last 90 days.'
                    : 'मैं पिछले 90 दिनों के भीतर जारी बिजली बिल द्वारा पते के सत्यापन की सहमति देता हूँ।'}
                </span>
              </label>
            </div>
          </div>

          {/* Verification Track: Track A vs Track B */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              {language === 'en' ? '2. Select Verification Route' : '2. सत्यापन मार्ग चुनें'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => setTrack('gstin')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  track === 'gstin'
                    ? 'border-[#E40000] bg-red-50/40 ring-1 ring-[#E40000]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-xs font-bold text-gray-900 mb-1">
                  {language === 'en' ? 'Track A: Registered with GSTIN' : 'ट्रैक A: जीएसटी धारक'}
                </div>
                <p className="text-[11px] text-gray-700">
                  {language === 'en'
                    ? 'GST Certificate + Signatory ID + 90-day Electricity Bill'
                    : 'जीएसटी प्रमाण पत्र + आईडी + बिजली बिल'}
                </p>
              </button>

              <button
                onClick={() => setTrack('non_gstin_udyam')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  track === 'non_gstin_udyam'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-gray-900">
                    {language === 'en' ? 'Track B: Micro MSME (Non-GSTIN)' : 'ट्रैक B: गैर-जीएसटी सूक्ष्म उद्योग'}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                    Zero Visit
                  </span>
                </div>
                <p className="text-[11px] text-gray-700 mt-1">
                  {language === 'en'
                    ? 'Udyam Certificate + Signatory ID + 90-day Utility Bill'
                    : 'उद्यम प्रमाण पत्र + आईडी + बिजली बिल'}
                </p>
              </button>
            </div>

            {/* Specimen Test Harness (K01 to K05) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-800 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
                  <span>{language === 'en' ? 'Test on Hackathon Specimen Applicants:' : 'टेस्ट सैंपल आवेदक चुनें:'}</span>
                </span>
                <span className="text-[10px] text-gray-700">47 Specimen Images Pack</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'K03', label: 'K03: Clean Pass', type: 'verified' },
                  { id: 'K01', label: 'K01: Cancelled GST', type: 'issue' },
                  { id: 'K02', label: 'K02: Date Mismatch', type: 'issue' },
                  { id: 'K04', label: 'K04: Expired Bill', type: 'issue' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedApplicant(item.id)}
                    className={`px-2.5 py-1.5 rounded-lg font-bold border transition-all text-center ${
                      selectedApplicant === item.id
                        ? 'bg-gray-900 text-white border-gray-900 shadow'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunVerification}
              disabled={loading}
              className="mt-4 w-full bg-[#E40000] hover:bg-[#B30000] text-white py-2.5 rounded-xl text-xs font-bold shadow flex items-center justify-center space-x-2 transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>
                {loading
                  ? 'Running OCR & Mock Registry Checks...'
                  : (language === 'en' ? `Verify ${selectedApplicant} Documents` : `${selectedApplicant} का सत्यापन करें`)}
              </span>
            </button>
          </div>
        </div>

        {/* Right Col: Automated Check Results */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              {language === 'en' ? 'Verification Outcome' : 'सत्यापन परिणाम'}
            </h2>

            {!result && !loading && (
              <div className="text-center py-12 text-xs text-gray-700">
                Click &apos;Verify Documents&apos; to run automated registry lookups and edge-case validation.
              </div>
            )}

            {loading && (
              <div className="text-center py-12 space-y-3">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-xs text-gray-700 font-medium">Extracting fields and querying registries...</div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Result Badge */}
                <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
                  result.status === 'verified'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : result.status === 'needs_review'
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  {result.status === 'verified' && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                  {result.status === 'needs_review' && <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />}
                  {result.status === 'rejected' && <XCircle className="w-6 h-6 text-red-600 shrink-0" />}
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      Status: {result.status.replace('_', ' ')}
                    </div>
                    <div className="text-[11px] mt-0.5">
                      Case #{result.case_id}
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-gray-700 uppercase">Check Breakdown:</div>
                  {result.checks.map((chk, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] p-2 rounded-lg bg-gray-50 border border-gray-100">
                      {chk.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : chk.severity === 'blocker' ? (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <span className="text-gray-800">{language === 'en' ? chk.message_en : chk.message_hi}</span>
                    </div>
                  ))}
                </div>

                {/* If Needs Review: Explain Partner Handoff */}
                {result.status === 'needs_review' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-1">
                    <div className="font-bold flex items-center">
                      <Info className="w-3.5 h-3.5 mr-1" />
                      <span>Routed to Partner Console</span>
                    </div>
                    <p>
                      This case has been automatically assigned to your local partner rep. You do not need to re-upload documents.
                    </p>
                  </div>
                )}

                {/* Order Submit Button */}
                <button
                  onClick={handleCreateOrder}
                  className="w-full bg-[#E40000] hover:bg-[#B30000] text-white py-2.5 rounded-xl text-xs font-bold shadow flex items-center justify-center space-x-2 transition-all mt-4"
                >
                  <span>
                    {language === 'en' ? 'Submit Order & Open Tracker' : 'ऑर्डर दर्ज करें एवं स्टेटस देखें'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

