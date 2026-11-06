'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { BarChart3, TrendingUp, Clock, DollarSign, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  const { language } = useApp();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/analytics')
      .then(res => res.json())
      .then(d => {
        if (d.success) setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {language === 'en' ? 'Funnel Analytics & Unit Economics Model' : 'फ़नल विश्लेषण एवं आर्थिक मॉडल'}
            </h1>
            <p className="text-xs text-gray-700">
              {language === 'en'
                ? 'Synthesized data from 5,000 SMB leads comparing baseline drag against Udyam Digital self-service.'
                : '5,000 लीड्स के वास्तविक डेटा पर आधारित तुलनात्मक विश्लेषण।'}
            </p>
          </div>
        </div>

        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          Source: smb_leads.csv (Q1 2026)
        </span>
      </div>

      {/* Target Economics Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-700 uppercase">Customer Acquisition Cost (CAC)</span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-emerald-600">₹2,850</span>
            <span className="text-xs line-through text-gray-700">₹15,000</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            -81% CAC Reduction Target Met
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-700 uppercase">Lead to Activation Time</span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-blue-600">&lt; 48 Hours</span>
            <span className="text-xs line-through text-gray-700">17.6 Days</span>
          </div>
          <div className="text-[11px] text-blue-700 font-bold mt-1">
            Zero-Wait Digital Feasibility
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-700 uppercase">Quote Acceptance Rate</span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-purple-600">70.0%</span>
            <span className="text-xs line-through text-gray-700">43.6%</span>
          </div>
          <div className="text-[11px] text-purple-700 font-bold mt-1">
            Outcome Bundles Replace PDFs
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-700 uppercase">Status Chases / Customer</span>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-amber-600">0.3 Calls</span>
            <span className="text-xs line-through text-gray-700">3.2 Calls</span>
          </div>
          <div className="text-[11px] text-amber-700 font-bold mt-1">
            Eliminated via Live Milestone App
          </div>
        </div>
      </div>

      {/* Funnel Stage Breakdown Table */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Funnel Stage Conversion: Case Baseline vs Udyam Digital
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-700 uppercase">
                <th className="py-3 px-4">Funnel Stage</th>
                <th className="py-3 px-4">Baseline Leads</th>
                <th className="py-3 px-4">Baseline %</th>
                <th className="py-3 px-4 text-emerald-700">Udyam Digital %</th>
                <th className="py-3 px-4">Key Innovation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-bold text-gray-900">1. Total Inbound Leads</td>
                <td className="py-3 px-4 font-mono font-bold">5,000</td>
                <td className="py-3 px-4 text-gray-700">100%</td>
                <td className="py-3 px-4 font-bold text-emerald-700">100%</td>
                <td className="py-3 px-4 text-gray-700">Mobile-first direct discovery & partner codes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-900">2. Needs Assessed</td>
                <td className="py-3 px-4 font-mono font-bold">1,974</td>
                <td className="py-3 px-4 text-gray-700">58.0%</td>
                <td className="py-3 px-4 font-bold text-emerald-700">86.0%</td>
                <td className="py-3 px-4 text-gray-700">AI Advisor 3-click conversational wizard (Vernacular)</td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="py-3 px-4 font-bold text-gray-900">3. Quote Accepted (The 56% Drop)</td>
                <td className="py-3 px-4 font-mono font-bold text-red-600">861</td>
                <td className="py-3 px-4 text-red-600 font-bold">43.6%</td>
                <td className="py-3 px-4 font-bold text-emerald-700">70.0%</td>
                <td className="py-3 px-4 text-gray-900 font-bold">Outcome-based bundles & live server add-on toggle</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-900">4. KYC Cleared</td>
                <td className="py-3 px-4 font-mono font-bold">588</td>
                <td className="py-3 px-4 text-gray-700">68.3%</td>
                <td className="py-3 px-4 font-bold text-emerald-700">85.0%</td>
                <td className="py-3 px-4 text-gray-700">Track B non-GSTIN Udyam route (no field visits required)</td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-3 px-4 font-bold text-emerald-900">5. Final Activated Connections</td>
                <td className="py-3 px-4 font-mono font-bold text-gray-700">368</td>
                <td className="py-3 px-4 text-gray-700">7.36%</td>
                <td className="py-3 px-4 font-bold text-emerald-700">37.0%</td>
                <td className="py-3 px-4 text-emerald-800 font-bold">5x Total Activated Customer Yield</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Primary Drop Reasons Identified in smb_leads.csv */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Analysis: Why 4,632 SMB Leads Dropped Out in Baseline Case
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-bold text-gray-900 mb-1">
              &quot;Owner had no time for field sales visit&quot; (531 leads)
            </div>
            <p className="text-gray-700">
              <strong>Udyam Digital Fix:</strong> Replaced physical field-sales visits with a self-service mobile web application available 24/7 on the owner&apos;s phone.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-bold text-gray-900 mb-1">
              &quot;Confusing technical PDF quote & unbundled pricing&quot; (414 leads)
            </div>
            <p className="text-gray-700">
              <strong>Udyam Digital Fix:</strong> Removed confusing SKUs (MPLS, subnetting) in favor of clear outcome bundles (e.g., &quot;Kirana Digital Pack&quot;, &quot;Clinic Practice Suite&quot;).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-bold text-gray-900 mb-1">
              &quot;Non-GSTIN verification paralysis&quot; (Only 2.0% activation)
            </div>
            <p className="text-gray-700">
              <strong>Udyam Digital Fix:</strong> Built a first-class Track B verification pathway accepting Udyam certificates and recent electricity bills without mandatory GSTIN.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-bold text-gray-900 mb-1">
              &quot;Field Sales & Partner Channel Friction&quot;
            </div>
            <p className="text-gray-700">
              <strong>Udyam Digital Fix:</strong> Partner Console automatically routes stalled checkouts and KYC review cases to channel partners with attributed commission codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

