import React from 'react';
import Link from 'next/link';
import { FileCheck, ShieldAlert, Scale, HelpCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-gray-200 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold border border-gray-300">
          <Scale className="w-3.5 h-3.5 text-gray-600" />
          <span>Terms of Use & Prototype Scope</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Terms & Commercial Conditions
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Last updated: February 2026 • Accel YTL Hackathon 2026 (Track A: Project Udyam Digital)
        </p>
      </div>

      {/* Prominent Demo Disclaimer */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-900 space-y-1.5">
        <div className="font-bold flex items-center space-x-1.5 text-red-700">
          <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>Non-Binding Demonstration Environment</span>
        </div>
        <p className="leading-relaxed text-red-800">
          Project Udyam Digital is a hackathon innovation prototype created to demonstrate digital-first MSME onboarding, 
          AI-guided discovery, and multi-path KYC automation. The platform operates on synthetic test data and does 
          <strong> not</strong> execute real financial debits or live telecom provisioning orders.
        </p>
      </div>

      {/* Main Sections */}
      <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900">1. Nature of the Service & Quotation Engine</h2>
          <p>
            All telecom plans, recurring monthly charges, and one-time setup fees displayed on this platform are derived 
            from the standard catalogue reference (<code className="font-mono bg-gray-100 px-1 rounded">product_catalogue.csv</code>). 
            When a user requests a quote:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            <li>The system generates an immutable server-side quote snapshot with a unique Quote ID.</li>
            <li>Quote snapshots remain locked for 15 calendar days from timestamp of generation.</li>
            <li>All prices exclude Goods and Services Tax (GST), which is levied at the statutory 18% rate upon final invoicing.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">2. Technical Feasibility & Installation Survey</h2>
          <p>
            Submission of an order request does not constitute a guaranteed installation agreement until physical line 
            feasibility is confirmed:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            <li><strong>Optical Fiber (Biz Fibre / ILL):</strong> Requires physical optical distribution frame (ODF) availability within 300 meters of customer premises.</li>
            <li><strong>5G AirFiber:</strong> Requires clear line-of-sight to the nearest commercial 5G gNodeB cell site.</li>
            <li>In cases where physical feasibility fails, orders are automatically re-routed to an authorized channel partner for alternative medium recommendation without penalty.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">3. Business Verification & KYC Obligations</h2>
          <p>
            Customers agree to submit accurate, non-expired credentials. Regulatory guidelines mandate:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
            <li><strong>Track A (GSTIN):</strong> GST registration status must be &ldquo;Active&rdquo; in the official registry. Cancelled or suspended registrations will trigger manual review.</li>
            <li><strong>Track B (Non-GSTIN):</strong> Udyam Registration Certificate must match the applicant trade name, accompanied by a recent commercial electricity bill dated within 90 days.</li>
            <li>Attempting to upload fraudulent, tampered, or expired documentation will lead to order cancellation.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">4. Business Profile Changes Guardrail</h2>
          <p>
            In accordance with Project Udyam Digital design principles, modifying your business segment (e.g. switching 
            from Kirana to Small Multi-Site) in Account Settings updates interface views and advisor prompts only. 
            It strictly <strong>does not</strong> cancel, modify, or re-price existing orders or active subscriptions.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900">5. Limitation of Liability</h2>
          <p>
            As a competition submission for the Accel YTL Hackathon 2026, the developers and organizers assume no legal 
            liability for commercial reliance on this software. For actual enterprise telecom procurement, please visit 
            the official Airtel Business portal at airtel.in/business.
          </p>
        </section>
      </div>
    </div>
  );
}
