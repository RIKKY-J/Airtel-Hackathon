'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { OrderRecord, OrderMilestone } from '@/types';
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  Wifi, 
  MessageSquare, 
  PhoneOff, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function TrackerPage() {
  const { language, activeOrderId } = useApp();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [milestones, setMilestones] = useState<OrderMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [activeOrderId]);

  const loadOrder = async () => {
    const oid = activeOrderId || 'ORD_DEMO';
    try {
      const res = await fetch(`/api/v1/orders?id=${oid}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        setMilestones(data.milestones);
      } else {
        // Fallback demo order for immediate viewing
        setOrder({
          id: 'ORD_KIRANA99',
          business_id: 'B_KIRANA',
          quote_id: 'Q_KIRANA_01',
          kyc_case_id: 'KYC_K03_PASS',
          bundle_name: 'Kirana Digital Uptime Pack',
          monthly_recurring_total: 1597,
          one_time_setup_total: 1800,
          status: 'installation_scheduled',
          expected_activation_date: '2026-07-17',
          created_at: new Date().toISOString()
        });
        setMilestones([
          {
            stage_name: 'Order Placed & Quote Accepted',
            stage_name_hi: 'ऑर्डर दर्ज एवं कोटेशन स्वीकृत',
            status: 'completed',
            sla_time: 'Instant (0 mins)',
            completed_at: new Date().toISOString()
          },
          {
            stage_name: 'Smart KYC & Registry Cleared',
            stage_name_hi: 'स्मार्ट KYC एवं पोर्टल सत्यापन पूर्ण',
            status: 'completed',
            sla_time: '12 mins',
            completed_at: new Date().toISOString()
          },
          {
            stage_name: 'Field Technician Assigned & Installation Scheduled',
            stage_name_hi: 'फील्ड इंजीनियर नियुक्त एवं इंस्टॉलेशन शेड्यूल',
            status: 'in_progress',
            sla_time: 'Today by 4:00 PM',
            completed_at: null
          },
          {
            stage_name: 'Connection Activated & Billing Live',
            stage_name_hi: 'कनेक्शन एक्टिवेटेड एवं बिलिंग चालू',
            status: 'pending',
            sla_time: '< 48 Hours SLA',
            completed_at: null
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {language === 'en' ? 'Live Fulfilment & Activation Tracker' : 'लाइव इंस्टॉलेशन एवं एक्टिवेशन ट्रैकर'}
            </h1>
            <p className="text-xs text-gray-700">
              {language === 'en'
                ? 'Transparent stage-by-stage visibility eliminating customer follow-up chasing calls.'
                : 'पारदर्शी ट्रैकर, जिससे ग्राहक को बार-बार कॉल करने की आवश्यकता नहीं होती।'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-gray-900">Order #{order?.id}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
            <span>Target: &lt; 48h Turn-Up</span>
          </div>
        </div>
      </div>

      {/* Latency & Status Chase Solution Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-emerald-900">
              Activation SLA: Under 48 Hours
            </div>
            <div className="text-[11px] text-emerald-700">
              Reduced from traditional industry baseline of 17.6 days.
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <PhoneOff className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-blue-900">
              Zero Status-Chasing Calls
            </div>
            <div className="text-[11px] text-blue-700">
              Automated WhatsApp & SMS milestone notifications enabled.
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Progress Timeline */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
          {language === 'en' ? 'Fulfilment Milestones' : 'इंस्टॉलेशन प्रगति'}
        </h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gray-200 before:z-0">
          {milestones.map((ms, idx) => {
            const isDone = ms.status === 'completed';
            const isInProg = ms.status === 'in_progress';

            return (
              <div key={idx} className="relative z-10 flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold border-2 ${
                  isDone
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                    : isInProg
                    ? 'bg-white text-blue-600 border-blue-600 shadow-md ring-4 ring-blue-50'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}>
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-xs font-bold ${isDone ? 'text-gray-900' : isInProg ? 'text-blue-600 font-extrabold' : 'text-gray-600'}`}>
                      {language === 'en' ? ms.stage_name : ms.stage_name_hi}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDone
                        ? 'bg-emerald-50 text-emerald-700'
                        : isInProg
                        ? 'bg-blue-50 text-blue-700 animate-pulse'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {ms.sla_time}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-700 mt-0.5">
                    {isDone && 'Completed successfully. Digital records auditable.'}
                    {isInProg && 'Technician dispatched for field optical fiber turn-up.'}
                    {!isDone && !isInProg && 'Pending prior milestone completion.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated WhatsApp Notification Card */}
      <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">
              WhatsApp Updates: +91 9876543210
            </div>
            <div className="text-[11px] text-gray-700">
              &quot;Namaste Sharmaji, your Airtel Biz Fibre engineer Manoj is on the way (OTP: 4182)&quot;
            </div>
          </div>
        </div>
        <span className="text-[10px] bg-white text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
          Proactive Push
        </span>
      </div>
    </div>
  );
}

