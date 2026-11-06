import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info, HeartHandshake } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-xs text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#E40000] flex items-center justify-center text-white font-black text-sm">
                U
              </div>
              <span className="font-extrabold text-gray-900 tracking-tight text-sm">
                Udyam<span className="text-[#E40000]">Digital</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Empowering 63M+ Indian MSMEs with self-service connectivity discovery, automated 
              multi-path KYC, and real-time SLA fulfilment.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200 text-[11px] font-medium">
              <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
              <span>Hackathon Prototype: Synthetic Data</span>
            </div>
          </div>

          {/* Business Solutions */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-3">
              MSME Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-[#E40000] transition-colors">
                  Product Catalogue (25 SKUs)
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-[#E40000] transition-colors">
                  Pre-configured Outcome Bundles
                </Link>
              </li>
              <li>
                <Link href="/advisor" className="hover:text-[#E40000] transition-colors">
                  3-Click Need Advisor
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#E40000] transition-colors">
                  Live Quotation Engine
                </Link>
              </li>
              <li>
                <Link href="/kyc" className="hover:text-[#E40000] transition-colors">
                  DPDP Smart KYC (Track A & B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Support */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-3">
              Explore & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#E40000] transition-colors">
                  About Project Udyam
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#E40000] transition-colors">
                  How It Works (8 Steps)
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#E40000] transition-colors">
                  My Orders & Tracker
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-[#E40000] transition-colors">
                  Help Centre & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E40000] transition-colors">
                  Contact & Channel Partner Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-3">
              Trust & Governance
            </h4>
            <div className="flex items-start space-x-2 text-gray-500 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>DPDP Act 2023 Compliant unbundled consent & data minimisation.</span>
            </div>
            <div className="flex items-start space-x-2 text-gray-500 text-xs">
              <HeartHandshake className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>Assisted-digital channel recovery with verified partner attribution.</span>
            </div>
            <div className="pt-2 flex flex-wrap gap-3 text-xs text-gray-500">
              <Link href="/privacy" className="hover:underline hover:text-gray-900">
                Privacy Notice
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:underline hover:text-gray-900">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 gap-3">
          <p>
            © 2026 Project Udyam Digital — Track A: Accel YTL Hackathon 2026. Inspired by Airtel Business.
          </p>
          <p className="text-gray-400">
            Simulated environment: All telemetry, GSTIN, and Udyam lookups are local mock fixtures.
          </p>
        </div>
      </div>
    </footer>
  );
}
