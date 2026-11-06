'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, BusinessType, BusinessProfile } from '@/types';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  user: { id: string; mobile: string; role: string } | null;
  setUser: (u: any) => void;
  business: BusinessProfile | null;
  setBusiness: (b: BusinessProfile | null) => void;
  activeQuoteId: string | null;
  setActiveQuoteId: (id: string | null) => void;
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [user, setUser] = useState<{ id: string; mobile: string; role: string } | null>({
    id: 'U_KIRANA',
    mobile: '9876543210',
    role: 'customer'
  });
  const [business, setBusiness] = useState<BusinessProfile | null>({
    id: 'B_KIRANA',
    owner_user_id: 'U_KIRANA',
    business_name: 'Sharma Kirana & Daily Needs',
    business_type: 'micro_retail_services',
    city: 'Jaipur',
    city_tier: 2,
    state: 'Rajasthan',
    preferred_language: 'hi',
    employee_count: 2,
    num_sites: 1,
    has_gstin: 0,
    has_udyam: 1,
    partner_code: 'PARTNER_RAJ01',
    created_at: new Date().toISOString()
  });
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        user,
        setUser,
        business,
        setBusiness,
        activeQuoteId,
        setActiveQuoteId,
        activeOrderId,
        setActiveOrderId
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

