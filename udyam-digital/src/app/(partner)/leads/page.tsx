'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { Users2, ShieldAlert, PhoneCall, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export default function PartnerConsolePage() {
  const { language } = useApp();
  const [stalledLeads, setStalledLeads] = useState<any[]>([]);
  const [handoffTasks, setHandoffTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPartnerData();
  }, []);

  const fetchPartnerData = async () => {
    try {
      const res = await fetch('/api/v1/partner?limit=8');
      const data = await res.json();
      if (data.success) {
        setStalledLeads(data.stalled_leads || []);
        setHandoffTasks(data.handoff_tasks || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimLead = (id: string) => {
    setClaimedIds(prev => new Set(prev).add(id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {language === 'en' ? 'Field Partner & Reseller Assisted Console' : 'पार्टनर एवं फील्ड सेल्स कंसोल'}
            </h1>
            <p className="text-xs text-gray-700">
              {language === 'en'
                ? 'Assisted-digital recovery for stalled checkouts and KYC exceptions with guaranteed partner commission attribution.'
                : 'रुके हुए ग्राहकों की सहायता करें और पार्टनर कोड द्वारा कमिशन प्राप्त करें।'}
            </p>
          </div>
        </div>

        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
          Partner Code: RAJ_DIST_402
        </span>
      </div>

      {/* KYC Exception Tasks (Planted Issues K01, K02) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            {language === 'en' ? 'Smart KYC Exception Queue (Human Review)' : 'केवाईसी अपवाद समीक्षा कतार'}
          </h2>
        </div>

        {handoffTasks.length === 0 ? (
          <p className="text-xs text-gray-700">No pending KYC review tasks.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {handoffTasks.map(task => {
              const isClaimed = claimedIds.has(task.id);
              return (
                <div key={task.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-gray-900">{task.business_name}</div>
                      <div className="text-[11px] text-gray-700">{task.city} • {task.business_type}</div>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      {task.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-amber-900 bg-white p-2.5 rounded-lg border border-amber-200 font-medium">
                    <strong>Flagged:</strong> {task.reason}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] text-gray-700">Audit ID: {task.id}</span>
                    <button
                      onClick={() => handleClaimLead(task.id)}
                      disabled={isClaimed}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isClaimed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow'
                      }`}
                    >
                      {isClaimed ? 'Approved via Partner' : 'Approve & Clear KYC'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stalled SMB Leads Recovery from smb_leads.csv */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <PhoneCall className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            {language === 'en' ? 'Stalled Self-Service Leads (smb_leads.csv)' : 'अटके हुए लीड्स (स्मार्ट रिकवरी)'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-700 uppercase">
                <th className="py-2.5 px-3">Lead ID</th>
                <th className="py-2.5 px-3">Business</th>
                <th className="py-2.5 px-3">City</th>
                <th className="py-2.5 px-3">Stalled Stage</th>
                <th className="py-2.5 px-3">Drop Reason</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stalledLeads.map(lead => {
                const isClaimed = claimedIds.has(lead.lead_id);
                return (
                  <tr key={lead.lead_id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-mono font-bold text-gray-700">{lead.lead_id}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">{lead.business_name}</div>
                      <div className="text-[10px] text-gray-700">{lead.contact_name}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-700">{lead.city}</td>
                    <td className="py-3 px-3">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                        {lead.stage_reached}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-red-600 font-medium">{lead.drop_reason}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleClaimLead(lead.lead_id)}
                        disabled={isClaimed}
                        className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                          isClaimed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-900 text-white hover:bg-black'
                        }`}
                      >
                        {isClaimed ? 'Attributed' : 'Recover Lead'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

