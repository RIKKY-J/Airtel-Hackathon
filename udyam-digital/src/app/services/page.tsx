'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { CatalogueProduct } from '@/types';
import { Package, Search, Filter, Check, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function ServicesCataloguePage() {
  const { language } = useApp();
  const [products, setProducts] = useState<CatalogueProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/catalogue')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products || []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Connectivity', 'Communication', 'Cloud & Productivity', 'Security', 'IoT & Physical'];

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch = p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.product_id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-red-50 text-[#E40000] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            product_catalogue.csv • 25 SKUs
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-2">
            {language === 'en' ? 'Business Solutions & Catalogue' : 'व्यावसायिक सेवाएं एवं सूची'}
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            {language === 'en'
              ? 'Authoritative catalogue backed by strict hard eligibility, city-tier constraints, and dependency rules.'
              : 'कठोर पात्रता नियमों और तकनीकी निर्भरताओं के साथ अधिकृत उत्पाद सूची।'}
          </p>
        </div>

        <Link
          href="/advisor"
          className="bg-[#E40000] hover:bg-[#B30000] text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center space-x-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>{language === 'en' ? 'Need Help Choosing? Ask Advisor' : 'एडवाइजर से पूछें'}</span>
        </Link>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-72 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product, SKU, keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs outline-none w-full text-gray-900"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-gray-900 text-white shadow'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-12 text-xs text-gray-500 font-bold">Loading catalogue...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.product_id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-extrabold px-2 py-0.5 rounded font-mono">
                    {p.product_id}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {p.category}
                  </span>
                </div>

                <Link href={`/services/${p.product_id}`} className="hover:text-[#E40000] transition-colors">
                  <h3 className="text-sm font-bold text-gray-900">{p.product_name}</h3>
                </Link>
                <p className="text-xs text-gray-600 mt-1 mb-3 line-clamp-2">{p.description}</p>

                {/* Eligibility Badges */}
                <div className="space-y-1.5 text-[11px] bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>City Tiers:</span>
                    <span className="font-bold text-gray-900">Tier {p.available_city_tiers}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GSTIN Required:</span>
                    <span className={`font-bold ${p.requires_gstin === 'Y' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {p.requires_gstin === 'Y' ? 'Mandatory (Y)' : 'No (N)'}
                    </span>
                  </div>
                  {p.requires_one_of && (
                    <div className="text-[10px] text-blue-600 font-medium">
                      Requires one of: {p.requires_one_of}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <div>
                  <div className="text-base font-extrabold text-gray-900">
                    ₹{p.price_min_inr_per_month}
                    <span className="text-[10px] text-gray-500 font-normal"> / mo</span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Setup: ₹{p.one_time_setup_inr} • {p.min_contract_months}M Term
                  </div>
                </div>

                <Link
                  href="/quote"
                  className="bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  Configure
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
