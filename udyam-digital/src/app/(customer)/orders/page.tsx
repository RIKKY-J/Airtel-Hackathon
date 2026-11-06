'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { OrderRecord } from '@/types';
import { 
  Clock, 
  Package, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  AlertCircle,
  Truck,
  Building2,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function MyOrdersPage() {
  const { business, activeOrderId } = useApp();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchOrders();
  }, [business?.id]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = business?.id
        ? `/api/v1/orders?business_id=${business.id}`
        : '/api/v1/orders';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'activated':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Activated & Live</span>
          </span>
        );
      case 'in_progress':
      case 'order_placed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>Fulfilment in Progress</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
            <Truck className="w-3 h-3" />
            <span>Technician Scheduled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
            <span>{status.toUpperCase()}</span>
          </span>
        );
    }
  };

  const filteredOrders = orders.filter(o => {
    const q = search.toLowerCase();
    const matchesSearch = !q || 
      o.id.toLowerCase().includes(q) || 
      (o.bundle_name && o.bundle_name.toLowerCase().includes(q));
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              My Orders & Fulfilment
            </h1>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-bold rounded">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time tracking of telecom orders with committed sub-48-hour activation SLA.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/bundles"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#E40000] hover:bg-[#B30000] px-4 py-2 rounded-xl shadow transition-all"
          >
            <Package className="w-4 h-4" />
            <span>Order New Bundle</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-1">
          <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Active Deployments</div>
          <div className="text-2xl font-black text-gray-900">{orders.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Multi-point milestone tracking</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-1">
          <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Fulfilment SLA Target</div>
          <div className="text-2xl font-black text-gray-900">&lt; 48 Hours</div>
          <div className="text-[11px] text-blue-600 font-semibold flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>vs 17.6 days manual baseline</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-1">
          <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Status Chase Count</div>
          <div className="text-2xl font-black text-emerald-600">0 Calls</div>
          <div className="text-[11px] text-gray-500">
            Automated SMS & digital telemetry updates
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Order ID or bundle name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'order_placed', 'in_progress', 'activated'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'ALL' ? 'All Orders' : status.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-xs text-gray-500 space-y-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Loading your orders and milestone status...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center space-y-4 shadow-sm max-w-xl mx-auto">
          <div className="w-14 h-14 bg-red-50 text-[#E40000] rounded-2xl flex items-center justify-center mx-auto">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto leading-relaxed">
              Explore pre-configured MSME bundles or use the Need Advisor to get an outcome package 
              tailored to your store or factory.
            </p>
          </div>
          <div className="pt-2 flex justify-center space-x-3">
            <Link
              href="/advisor"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#E40000] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl shadow transition-all"
            >
              <span>Launch 3-Click Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/bundles"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
            >
              <span>Browse Bundles</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 p-5 sm:p-6 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <span className="font-mono text-xs font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                    {order.id}
                  </span>
                  {getStatusBadge(order.status)}
                  <span className="text-[11px] text-gray-500 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Ordered: {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {order.bundle_name || 'Business Connectivity Bundle'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Target Activation: <span className="font-semibold text-gray-700">{order.expected_activation_date}</span> (&lt;48h SLA)
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <div>
                    Monthly: <span className="font-bold text-gray-900">₹{order.monthly_recurring_total?.toLocaleString('en-IN') || '0'}</span>/mo
                  </div>
                  <span>•</span>
                  <div>
                    One-time Setup: <span className="font-bold text-gray-900">₹{order.one_time_setup_total || 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href={`/tracker?orderId=${order.id}`}
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  <Clock className="w-4 h-4 text-red-400" />
                  <span>Track Live SLA</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-1 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Support</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
