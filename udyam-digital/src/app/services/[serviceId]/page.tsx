import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CatalogueService } from '@/modules/catalogue/catalogueService';
import { 
  Package, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  Receipt, 
  Building2, 
  Info,
  MapPin,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const product = CatalogueService.getProductById(serviceId.toUpperCase());

  if (!product) {
    notFound();
  }

  const cityTiers = product.available_city_tiers.split(';').map(t => `Tier ${t.trim()}`).join(', ');

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/services"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Main Product Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Top Badges & Title */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 flex-wrap gap-2">
            <span className="font-mono text-xs font-black bg-gray-900 text-white px-2.5 py-1 rounded-md">
              SKU: {product.product_id}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
              Category: {product.category}
            </span>
            {product.requires_gstin === 'Y' ? (
              <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                GSTIN Mandatory
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                Non-GSTIN / Udyam Eligible
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {product.product_name}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
            {product.description}
          </p>
        </div>

        {/* Pricing Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Catalogue Price</div>
            <div className="text-3xl font-black text-gray-900 mt-1 flex items-baseline space-x-1">
              <span>₹{product.price_min_inr_per_month.toLocaleString('en-IN')}</span>
              <span className="text-xs font-normal text-gray-500">/ month + GST</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">Authoritative base tariff from product_catalogue.csv</p>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-6 border-slate-200 space-y-1 text-xs text-gray-600">
            <div>One-time Setup / Install Fee: <span className="font-bold text-gray-900">₹{product.one_time_setup_inr}</span></div>
            <div>Minimum Contract Commitment: <span className="font-bold text-gray-900">{product.min_contract_months} Months</span></div>
          </div>
        </div>

        {/* Hard Constraints & Eligibility Table */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>Eligibility & Technical Feasibility Constraints</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-semibold block">Available City Tiers</span>
              <span className="font-bold text-gray-900 text-sm">{cityTiers}</span>
              <span className="text-[11px] text-gray-500 block">Strictly constrained to network-mapped geographic zones.</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-semibold block">Business Scale Requirements</span>
              <span className="font-bold text-gray-900 text-sm">
                Min {product.min_employees} Staff • Min {product.min_sites} Site(s)
              </span>
              <span className="text-[11px] text-gray-500 block">Validated during profile discovery before bundle recommendation.</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-semibold block">GSTIN Verification Rule</span>
              <span className={`font-bold text-sm ${product.requires_gstin === 'Y' ? 'text-amber-700' : 'text-emerald-700'}`}>
                {product.requires_gstin === 'Y' ? 'Commercial GSTIN Mandatory' : 'Permits Non-GSTIN (Udyam Track B)'}
              </span>
              <span className="text-[11px] text-gray-500 block">
                {product.requires_gstin === 'Y'
                  ? 'Must have active status in GST registry.'
                  : 'Eligible with Udyam Certificate + PAN + 90-day utility bill.'}
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-semibold block">Prerequisite / Co-requisite Service</span>
              <span className="font-bold text-gray-900 text-sm">
                {product.requires_one_of ? `Requires: ${product.requires_one_of}` : 'None (Standalone Deployable)'}
              </span>
              <span className="text-[11px] text-gray-500 block">
                {product.requires_one_of
                  ? 'Must be bundled alongside an active primary broadband link.'
                  : 'Can be activated independently.'}
              </span>
            </div>
          </div>
        </div>

        {/* Realistic Disclaimers & Caveats */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5">
          <div className="font-bold flex items-center space-x-1.5 text-amber-800">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Feasibility & Installation Notice</span>
          </div>
          <p className="leading-relaxed text-amber-800">
            Viewing or quoting this service does not guarantee physical last-mile feasibility. 
            All wired optical fiber connections require physical lead-in duct verification, and AirFiber 5G 
            requires line-of-sight signal clearance confirmed during technician dispatch.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/advisor"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-5 py-3 rounded-xl transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#E40000]" />
            <span>Check Fit via Need Advisor</span>
          </Link>

          <Link
            href={`/quote?serviceId=${product.product_id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#E40000] hover:bg-[#B30000] text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-all"
          >
            <span>Configure in Live Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
