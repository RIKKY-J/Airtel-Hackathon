'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { BusinessType } from '@/types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Sparkles,
  HelpCircle,
  Users2
} from 'lucide-react';

export default function ContactPage() {
  const { language, business } = useApp();

  const [form, setForm] = useState({
    name: '',
    businessName: business?.business_name || '',
    mobile: '',
    email: '',
    businessType: (business?.business_type || 'micro_retail_services') as BusinessType,
    topic: 'Product & Bundle Feasibility',
    isExistingCustomer: false,
    referenceId: '',
    contactPreference: 'Phone Call (Morning 10 AM - 1 PM)',
    requestPartnerVisit: false,
    message: '',
    consentNotice: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Contact person name is required';
    if (!form.businessName.trim()) errs.businessName = 'Business name is required';
    
    // 10-digit mobile validation
    const cleanMobile = form.mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!form.message.trim() || form.message.length < 10) {
      errs.message = 'Please provide details of your requirement (min 10 characters)';
    }

    if (!form.consentNotice) {
      errs.consentNotice = 'DPDP consent is required for us to contact you';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      const generatedRef = `UDYAM-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setSubmittedRef(generatedRef);
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 text-[#E40000] rounded-full text-xs font-bold border border-red-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Assisted-Digital MSME Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          How Can We Help Your Business?
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Whether you need a physical feasibility check, advice on choosing the right bandwidth, 
          or hands-on assistance from an authorized local channel partner, we are here to support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact Channels & Partner Presence */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#E40000]" />
              <span>Dedicated Channels</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="font-bold text-gray-900">MSME Care Helpline</div>
                <div className="text-[#E40000] font-mono font-bold text-sm">1800-103-6006</div>
                <div className="text-gray-500 text-[11px]">Toll-Free • Mon-Sat, 9:00 AM - 7:00 PM</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="font-bold text-gray-900">Email Desk</div>
                <div className="text-gray-800 font-semibold">udyam-support@airtelbusiness.demo</div>
                <div className="text-gray-500 text-[11px]">Guaranteed response within 4 business hours</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <div className="font-bold text-gray-900">Local Channel Partner Grid</div>
                <div className="text-gray-700">Present in 1,200+ towns across India</div>
                <div className="text-emerald-700 font-semibold text-[11px] flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>On-site feasibility surveys available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assisted-Digital Guarantee */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-red-400">
              <Users2 className="w-5 h-5" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Assisted-Digital Model</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer speaking with a human representative? Check the box in the form to have an Airtel Business 
              local channel partner assigned to your district with full attribution.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Authorized personnel with verified digital badge</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          {submittedRef ? (
            <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-sm space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Inquiry Request Received!</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-gray-800">{form.name}</span>. Our enterprise onboarding 
                  team has received your requirement.
                </p>
                <div className="inline-block mt-2 px-4 py-2 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl font-mono text-sm font-bold">
                  Reference: {submittedRef}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 text-left space-y-2 max-w-lg mx-auto">
                <div className="font-bold text-gray-800">What happens next:</div>
                <ul className="space-y-1.5 list-disc list-inside text-[11px]">
                  <li>An Airtel SME solution specialist will review catalogue eligibility.</li>
                  <li>You will receive a call at <span className="font-semibold">{form.mobile}</span> during your preferred window ({form.contactPreference}).</li>
                  {form.requestPartnerVisit && (
                    <li className="text-emerald-700 font-semibold">
                      A local channel partner has been assigned for an on-site feasibility visit.
                    </li>
                  )}
                </ul>
              </div>

              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setForm({ ...form, message: '', consentNotice: false });
                  }}
                  className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                >
                  Submit Another Query
                </button>
                <Link
                  href="/dashboard"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#E40000] hover:bg-[#B30000] rounded-xl shadow transition-all"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-gray-900">Send an Inquiry or Request Assistance</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  We collect only minimal necessary contact fields strictly to service your request.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name <span className="text-[#E40000]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.name ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Registered Business Name <span className="text-[#E40000]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={e => setForm({ ...form, businessName: e.target.value })}
                    placeholder="e.g. Sharma Kirana & Daily Needs"
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.businessName ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    }`}
                  />
                  {errors.businessName && <p className="text-[10px] text-red-600 mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number (10 Digits) <span className="text-[#E40000]">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={e => setForm({ ...form, mobile: e.target.value })}
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`w-full px-3 py-2 text-xs border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.mobile ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.mobile && <p className="text-[10px] text-red-600 mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="name@business.com"
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Business Segment
                  </label>
                  <select
                    value={form.businessType}
                    onChange={e => setForm({ ...form, businessType: e.target.value as BusinessType })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="micro_retail_services">Micro Retail & Services (Kirana, Salon, Clinic)</option>
                    <option value="professional_office">Professional Office (CA, Clinic, Coaching)</option>
                    <option value="small_multisite">Small Multi-site (3–10 Outlets)</option>
                    <option value="small_manufacturer">Small Manufacturer (Auto, Textile, Light Eng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={e => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="Product & Bundle Feasibility">Product & Bundle Feasibility</option>
                    <option value="KYC Verification Assistance">KYC Verification Assistance (Track A / B)</option>
                    <option value="Quote Customization">Custom Quotation & Billing Inquiry</option>
                    <option value="Order Tracking & Fulfilment">Existing Order Fulfilment Status</option>
                    <option value="Channel Partner Request">Request Local Partner Visit</option>
                  </select>
                </div>
              </div>

              {/* Existing Customer Option */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/70 space-y-3">
                <label className="flex items-center space-x-2 text-xs font-semibold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isExistingCustomer}
                    onChange={e => setForm({ ...form, isExistingCustomer: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                  />
                  <span>I already have a Quote ID or Order ID</span>
                </label>

                {form.isExistingCustomer && (
                  <div>
                    <input
                      type="text"
                      value={form.referenceId}
                      onChange={e => setForm({ ...form, referenceId: e.target.value })}
                      placeholder="e.g. QUOTE-2026-9041 or ORD-2026-7782"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Describe Your Requirement <span className="text-[#E40000]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your speed requirements, number of branches, or any specific questions..."
                  className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.message ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                  }`}
                />
                {errors.message && <p className="text-[10px] text-red-600 mt-1">{errors.message}</p>}
              </div>

              {/* Assisted-Digital Partner Checkbox */}
              <div className="p-3 bg-red-50/60 border border-red-200/60 rounded-xl flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="requestPartnerVisit"
                  checked={form.requestPartnerVisit}
                  onChange={e => setForm({ ...form, requestPartnerVisit: e.target.checked })}
                  className="w-4 h-4 mt-0.5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                />
                <label htmlFor="requestPartnerVisit" className="text-xs text-gray-700 cursor-pointer">
                  <span className="font-bold text-gray-900 block">
                    Request an Authorized Local Airtel Channel Partner Visit (Assisted-Digital)
                  </span>
                  A nearby partner will inspect physical line lead-in, survey electricity backup, and assist with document collection.
                </label>
              </div>

              {/* DPDP Consent */}
              <div>
                <label className="flex items-start space-x-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consentNotice}
                    onChange={e => setForm({ ...form, consentNotice: e.target.checked })}
                    className="w-4 h-4 mt-0.5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                  />
                  <span>
                    I consent under the Digital Personal Data Protection (DPDP) Act 2023 for Airtel Business to use my 
                    contact details strictly to respond to this commercial inquiry. We never share your data with unauthorized third parties.
                  </span>
                </label>
                {errors.consentNotice && (
                  <p className="text-[10px] text-red-600 mt-1">{errors.consentNotice}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-gray-500 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No identity documents collected here</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 bg-[#E40000] hover:bg-[#B30000] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
