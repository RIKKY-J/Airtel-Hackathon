import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-gray-200 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>DPDP Act 2023 Compliant Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Privacy Notice & Data Protection Policy
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Last revised: February 2026 • Project Udyam Digital (Track A, Accel YTL Hackathon)
        </p>
      </div>

      {/* Synthetic Sandbox Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
        <div className="font-bold flex items-center space-x-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Prototype Environment & Synthetic Data Notice</span>
        </div>
        <p className="leading-relaxed text-amber-800">
          This application is a competitive hackathon software prototype. All GSTIN, Udyam, PAN, and address verifications 
          in this prototype run against offline synthetic test databases (<code className="font-mono bg-amber-100 px-1 rounded">mock_gstin_registry.csv</code> and <code className="font-mono bg-amber-100 px-1 rounded">mock_udyam_registry.csv</code>). 
          No live government portals or real citizen databases are queried in this demo environment.
        </p>
      </div>

      {/* DPDP Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Unbundled Consent</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            KYC verification consent is collected independently of optional marketing or promotional updates. No pre-ticked checkboxes.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Data Minimisation</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            We store only minimal necessary registration metadata. Document images are processed privately and never sent to external LLMs.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Purpose Limitation</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Collected enterprise data is used solely for feasibility surveys, quote generation, order fulfilment, and billing.
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">1. Data Categories We Process</h2>
          <p>
            In the Project Udyam Digital self-service journey, the following data categories may be collected:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            <li><strong>Business Identity:</strong> Business legal name, trade name, GSTIN (Track A), Udyam Registration Number (Track B), PAN of proprietor/signatory.</li>
            <li><strong>Premises & Contact:</strong> Installation site address, PIN code, contact person name, authorized mobile number, and email.</li>
            <li><strong>Service Configuration:</strong> Required internet speed, backup preferences, number of branches, and CCTV requirements.</li>
            <li><strong>Verification Evidence:</strong> Uploaded images or PDFs of GST/Udyam certificates and commercial utility bills (strictly for KYC validation).</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">2. Processing Lawfulness & Consent Mechanisms</h2>
          <p>
            In strict compliance with Section 6 of the Digital Personal Data Protection Act 2023:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            <li>Consent is requested through clear, plain-language notices available in English and Hindi.</li>
            <li>Users can proceed with service discovery and quote calculation without submitting identity documents.</li>
            <li>Consent can be revoked prior to order submission by clearing session preferences in Account Settings.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">3. AI / LLM Guardrails & Document Privacy</h2>
          <p>
            Our conversational Need Advisor operates under strict privacy and hallucination guardrails:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            <li>Uploaded customer identity documents, Aadhaar/PAN scans, and utility bills are <strong>never</strong> transmitted to third-party Large Language Model APIs.</li>
            <li>The LLM only receives non-sensitive category keywords (e.g. &ldquo;Kirana shop&rdquo;, &ldquo;needs POS connectivity&rdquo;) to explain eligible packages.</li>
            <li>Pricing and eligibility validation are executed by deterministic server-side engines backed by <code className="font-mono bg-gray-100 px-1 rounded">product_catalogue.csv</code>.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">4. Assisted-Digital Partner Access</h2>
          <p>
            When a customer requests local channel partner assistance or when an onboarding application stalls, 
            authorized local partners are granted temporary, role-restricted access to contact details and drop-off stage 
            to assist in physical lead recovery. Every partner interaction is audited and logged.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">5. Grievance Redressal & Data Protection Officer</h2>
          <p>
            For privacy queries, data access requests, or rectification of incorrect registry data, you may reach our 
            designated prototype Grievance Redressal Officer:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/70 text-xs text-gray-700 space-y-1 mt-2">
            <div><strong>Data Protection Officer:</strong> Project Udyam Digital Privacy Cell</div>
            <div><strong>Email:</strong> dpo-udyam@airtelbusiness.demo</div>
            <div><strong>Response SLA:</strong> Within 48 business hours</div>
          </div>
        </section>
      </div>
    </div>
  );
}
