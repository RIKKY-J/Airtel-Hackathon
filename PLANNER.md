# Project Udyam Digital — Software Engineering Blueprint & Planner

**Target:** Enterprise MSME Acquisition, Smart KYC & Fulfilment Platform  
**Language & Tech Stack:** 100% TypeScript (Next.js + Node.js/Express)  
**Version:** 2.1.0  
**Focus:** Pure Software Engineering & Implementation  

---

## 1. Concrete Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Language** | **TypeScript (v5.x)** (strict mode) | End-to-end type safety between frontend, backend, and database models |
| **Frontend Framework** | **Next.js (v14/15 App Router, TypeScript)** | High-performance mobile-first web app, React Server Components, optimized client hydration |
| **Styling & Icons** | **Tailwind CSS + Lucide React** | Segment-adaptive UI theme engine, clean telecom-grade mobile-responsive layout |
| **Frontend State** | **Zustand / React Context + TanStack Query** | Client-side session, cart/quote state, and API caching |
| **Backend Runtime** | **Node.js (v22+)** with `tsx` | High-performance async modular API runtime |
| **Backend Framework** | **Express.js (TypeScript)** / `cors` / `dotenv` | Modular REST API routing, middleware, error handling |
| **Database** | **SQLite** (`better-sqlite3`) | Fast, zero-config relational store seeded directly from hackathon CSVs |
| **Data Ingestion (ETL)** | `csv-parser` / TypeScript script | Ingests `product_catalogue.csv`, `mock_gstin_registry.csv`, `mock_udyam_registry.csv`, `smb_leads.csv` |
| **Document/OCR Engine** | Custom TypeScript Rule Engine + Canvas/Tesseract.js | Document parsing, checksum validation, date recency, mock registry validator |

---

## 2. Repository Architecture

```
Airtel-hackathon/
├── package.json                   # Root scripts (run frontend & backend concurrently)
├── tsconfig.json                  # Root TypeScript configuration
├── .gitignore
├── YTL_TrackA_Udyam_Digital_Data/ # Hackathon test pack (CSVs & KYC specimen images)
│   ├── product_catalogue.csv      # 25 products with constraint rules
│   ├── mock_gstin_registry.csv    # 3,534 GST records
│   ├── mock_udyam_registry.csv    # 2,723 Udyam records
│   ├── smb_leads.csv              # 5,000 lead records
│   └── kyc_documents/             # 47 PNG specimen images (K01–K12)
│
├── shared/                        # Shared TypeScript interfaces & DTOs
│   └── types.ts                   # Product, Bundle, Quote, KYC, Order types
│
├── server/                        # Backend TypeScript Express Application
│   ├── tsconfig.json
│   ├── package.json
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.sql         # Relational database schema
│   │   │   ├── seed.ts            # ETL: populates SQLite from CSV files
│   │   │   └── database.ts        # Typed SQLite client connection
│   │   ├── services/
│   │   │   ├── catalogueService.ts # Strict hard-constraint & bundle logic
│   │   │   ├── quoteService.ts    # Server-side pricing & add-on recalculations
│   │   │   ├── kycService.ts      # Multi-point validator & registry lookups
│   │   │   └── orderService.ts    # State machine & milestone SLA tracker
│   │   ├── routes/
│   │   │   ├── authRoutes.ts      # OTP demo verification
│   │   │   ├── businessRoutes.ts  # Segment profile CRUD & adaptive config
│   │   │   ├── advisorRoutes.ts   # Needs assessment & recommendations
│   │   │   ├── quoteRoutes.ts     # Quote creation & acceptance
│   │   │   ├── kycRoutes.ts       # DPDP consent & document processing
│   │   │   ├── orderRoutes.ts     # Order submission & tracking
│   │   │   ├── partnerRoutes.ts   # Stalled leads & human review queue
│   │   │   └── analyticsRoutes.ts # 5,000-lead funnel & CAC engine
│   │   └── server.ts              # Express app bootstrap & middleware
│
└── frontend/                      # Next.js App Router (TypeScript + Tailwind)
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    ├── src/
    │   ├── app/                   # Next.js App Router pages
    │   │   ├── layout.tsx         # Root layout with language & theme providers
    │   │   ├── page.tsx           # Landing & Mobile Login (OTP verification)
    │   │   ├── dashboard/         # Segment-adaptive dashboard (Kirana/Clinic/Multi/Mfg)
    │   │   │   └── page.tsx
    │   │   ├── advisor/           # Interactive question wizard & bundle selector
    │   │   │   └── page.tsx
    │   │   ├── quote/             # Transparent pricing breakdown & live add-on toggles
    │   │   │   └── page.tsx
    │   │   ├── kyc/               # DPDP consent modal & document upload
    │   │   │   └── page.tsx
    │   │   ├── tracker/           # Live order activation timeline & SLA countdown
    │   │   │   └── page.tsx
    │   │   ├── partner/           # Field partner lead recovery & review console
    │   │   │   └── page.tsx
    │   │   └── analytics/         # 5,000-lead funnel metrics & CAC calculator
    │   │       └── page.tsx
    │   ├── components/
    │   │   ├── layout/            # MobileFrame, Header, Navbar, LanguageSwitch (EN/HI)
    │   │   ├── ui/                # Buttons, Modals, Badges, Sliders, Cards
    │   │   ├── dashboard/         # Segment cards (Kirana, Clinic, Multi-site, Factory)
    │   │   ├── advisor/           # Dialogue bubble, Need options, Bundle summary
    │   │   ├── kyc/               # DPDP consent checkbox, Specimen picker (K01–K12)
    │   │   └── tracker/           # Milestone step indicators, SLA badge
    │   ├── lib/                   # API client fetchers, shared constants
    │   └── context/               # LanguageContext (EN/HI), BusinessContext, AuthContext
```

---

## 3. Database Schema (SQLite)

```sql
-- 1. Users & Authentication
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    mobile TEXT NOT NULL UNIQUE,
    role TEXT CHECK(role IN ('customer', 'partner', 'sales_agent', 'admin')) DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Business Profiles (Supports all 4 segments)
CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY,
    owner_user_id TEXT NOT NULL REFERENCES users(id),
    business_name TEXT NOT NULL,
    business_type TEXT CHECK(business_type IN ('micro_retail_services', 'professional_office', 'small_multisite', 'small_manufacturer')) NOT NULL,
    city TEXT NOT NULL,
    city_tier INTEGER CHECK(city_tier IN (1, 2)) NOT NULL DEFAULT 2,
    state TEXT NOT NULL,
    preferred_language TEXT CHECK(preferred_language IN ('en', 'hi')) DEFAULT 'en',
    employee_count INTEGER NOT NULL DEFAULT 1,
    num_sites INTEGER NOT NULL DEFAULT 1,
    has_gstin INTEGER NOT NULL DEFAULT 0,
    gstin TEXT,
    has_udyam INTEGER NOT NULL DEFAULT 0,
    udyam_number TEXT,
    partner_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Imported Catalogue Cache (from product_catalogue.csv)
CREATE TABLE IF NOT EXISTS catalogue_products (
    product_id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    product_name TEXT NOT NULL,
    description TEXT NOT NULL,
    unit TEXT NOT NULL,
    price_min_inr_per_month INTEGER NOT NULL,
    price_max_inr_per_month INTEGER NOT NULL,
    one_time_setup_inr INTEGER NOT NULL,
    min_contract_months INTEGER NOT NULL,
    available_city_tiers TEXT NOT NULL,
    min_employees INTEGER NOT NULL,
    min_sites INTEGER NOT NULL,
    requires_gstin TEXT NOT NULL,
    requires_one_of TEXT,
    typical_install_days INTEGER NOT NULL,
    target_segments TEXT NOT NULL
);

-- 4. Quotes & Line Items
CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL REFERENCES businesses(id),
    bundle_name TEXT NOT NULL,
    monthly_recurring_total INTEGER NOT NULL,
    one_time_setup_total INTEGER NOT NULL,
    contract_months INTEGER NOT NULL,
    items_json TEXT NOT NULL, -- JSON array of { product_id, quantity, unit_price, is_addon }
    status TEXT CHECK(status IN ('draft', 'presented', 'accepted', 'expired')) DEFAULT 'presented',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. DPDP Consent & KYC Records
CREATE TABLE IF NOT EXISTS consents (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL REFERENCES businesses(id),
    purpose TEXT NOT NULL,
    notice_version TEXT NOT NULL,
    is_granted INTEGER NOT NULL,
    ip_address TEXT,
    granted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kyc_cases (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL REFERENCES businesses(id),
    track TEXT CHECK(track IN ('gstin', 'non_gstin_udyam')) NOT NULL,
    status TEXT CHECK(status IN ('pending', 'verified', 'needs_review', 'rejected')) DEFAULT 'pending',
    flagged_reasons TEXT, -- JSON array of strings
    extracted_data TEXT,  -- JSON object of normalized fields
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Orders & Activation Timeline
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL REFERENCES businesses(id),
    quote_id TEXT NOT NULL REFERENCES quotes(id),
    kyc_case_id TEXT NOT NULL REFERENCES kyc_cases(id),
    status TEXT CHECK(status IN ('order_placed', 'kyc_cleared', 'installation_scheduled', 'activated', 'cancelled')) DEFAULT 'order_placed',
    expected_activation_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_milestones (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL REFERENCES orders(id),
    stage_name TEXT NOT NULL,
    status TEXT CHECK(status IN ('completed', 'in_progress', 'pending')) NOT NULL,
    sla_time TEXT NOT NULL,
    completed_at DATETIME
);

-- 7. Partner Handoff & Attribution
CREATE TABLE IF NOT EXISTS handoff_tasks (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL REFERENCES businesses(id),
    lead_id TEXT,
    partner_id TEXT,
    stage_stalled TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT CHECK(status IN ('open', 'claimed', 'resolved')) DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Shared TypeScript Definitions (`shared/types.ts`)

```typescript
export type BusinessType = 
  | 'micro_retail_services'
  | 'professional_office'
  | 'small_multisite'
  | 'small_manufacturer';

export type UserRole = 'customer' | 'partner' | 'sales_agent' | 'admin';
export type SupportedLanguage = 'en' | 'hi';

export interface CatalogueProduct {
  product_id: string;
  category: string;
  product_name: string;
  description: string;
  unit: string;
  price_min_inr_per_month: number;
  price_max_inr_per_month: number;
  one_time_setup_inr: number;
  min_contract_months: number;
  available_city_tiers: string; // "1;2" or "1"
  min_employees: number;
  min_sites: number;
  requires_gstin: 'Y' | 'N';
  requires_one_of: string | null; // e.g. "P01|P02|P03|P05|P06"
  typical_install_days: number;
  target_segments: string; // "micro;prof"
}

export interface QuoteItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  setup_fee: number;
  is_addon: boolean;
}

export interface QuoteCalculationResult {
  bundle_name: string;
  monthly_recurring_total: number;
  one_time_setup_total: number;
  contract_months: number;
  items: QuoteItem[];
}

export type KycTrack = 'gstin' | 'non_gstin_udyam';
export type KycStatus = 'pending' | 'verified' | 'needs_review' | 'rejected';

export interface KycCheckItem {
  check_type: string;
  passed: boolean;
  message: string;
  severity: 'blocker' | 'warning' | 'info';
}

export interface KycValidationResult {
  status: KycStatus;
  checks: KycCheckItem[];
  flagged_reasons: string[];
  extracted_data: Record<string, any>;
}

export interface OrderMilestone {
  stage_name: string;
  status: 'completed' | 'in_progress' | 'pending';
  sla_time: string;
  completed_at: string | null;
}
```

---

## 5. Core Algorithmic Logic & Business Rules

### 5.1 Catalogue Eligibility Engine (`catalogueService.ts`)
Zero hallucination: only products satisfying 100% of the following rules are returned:
1. **City Tier Filter:**  
   `product.available_city_tiers.split(';').map(Number).includes(business.city_tier)`
2. **Employee Scale Filter:**  
   `business.employee_count >= product.min_employees`
3. **Site Scale Filter:**  
   `business.num_sites >= product.min_sites`
4. **GSTIN Mandatory Check:**  
   If `product.requires_gstin === 'Y'`, reject if `business.has_gstin === 0`.
5. **Dependency Validation:**  
   If `product.requires_one_of` is defined, bundle must contain at least one matching SKU from the pipe-separated list.

### 5.2 Server-Side Quote Recalculation Engine (`quoteService.ts`)
* Pricing is strictly computed on the backend.
* **Monthly Total:** $\sum (\text{item.quantity} \times \text{item.price\_min\_inr\_per\_month})$
* **One-time Setup Total:** $\sum (\text{item.one\_time\_setup\_inr})$
* **Contract Length:** $\max (\text{item.min\_contract\_months})$ across all items.
* Toggling an add-on triggers a `POST /api/v1/quotes/recalculate` call that returns the updated snapshot.

### 5.3 Smart KYC Multi-Point Validator (`kycService.ts`)
Evaluates applicant documents against the mock registries and specimen rules:
1. **GSTIN Registry Verification:**
   * Query `mock_gstin_registry`. If not found $\rightarrow$ `REJECTED`.
   * If status is `'Cancelled'` or `'Suspended'` (e.g., applicant K01 `37IHKXV5167L1ZS`) $\rightarrow$ mark `NEEDS_REVIEW`.
2. **Udyam Registry Verification:**
   * Query `mock_udyam_registry`.
   * If certificate registration number is blank (e.g., K01 udyam image) $\rightarrow$ flag missing number.
   * Cross-compare `date_of_registration`: if certificate date differs from registry date (e.g., K02 `2023-01-11` vs registry `2022-09-27`) $\rightarrow$ mark `NEEDS_REVIEW`.
3. **Address Proof Recency Check:**
   * Parse utility bill date.
   * Relative to benchmark date (`2026-07-15`), if $(\text{Benchmark} - \text{BillDate}) > 90 \text{ days}$ $\rightarrow$ mark `NEEDS_REVIEW`.
4. **Signatory Verification:**
   * Compare signatory name on ID card with proprietor/director name in GST/Udyam data.
5. **Final Output State:**
   * All pass $\rightarrow$ `VERIFIED`.
   * Flags with non-fatal discrepancy $\rightarrow$ `NEEDS_REVIEW` (routes to Partner Console).
   * Blatant forgery / unresolvable data $\rightarrow$ `REJECTED`.

---

## 6. Typed API Surface (Express TypeScript)

| Route | Method | Payload / Query | Response DTO |
|---|---|---|---|
| `/api/v1/auth/otp-request` | `POST` | `{ mobile: string, role?: UserRole }` | `{ success: boolean, simulated_otp: string }` |
| `/api/v1/auth/otp-verify` | `POST` | `{ mobile: string, otp: string }` | `{ token: string, user: User, business?: Business }` |
| `/api/v1/business/profile` | `POST` | `Partial<Business>` | `{ business: Business }` |
| `/api/v1/business/:id/profile` | `PATCH` | `Partial<Business>` | `{ business: Business, message: string }` |
| `/api/v1/business/dashboard-config` | `GET` | `?business_type=...&lang=...` | `SegmentDashboardConfig` |
| `/api/v1/catalogue/products` | `GET` | `?segment=...&city_tier=...` | `CatalogueProduct[]` |
| `/api/v1/advisor/recommend` | `POST` | `{ business_id: string, needs: Record<string, any> }` | `{ bundles: BundleOption[] }` |
| `/api/v1/quotes` | `POST` | `{ business_id: string, bundle_id: string, product_ids: string[] }` | `QuoteCalculationResult & { quote_id: string }` |
| `/api/v1/quotes/recalculate` | `POST` | `{ quote_id: string, items: { product_id: string, quantity: number, is_addon: boolean }[] }` | `QuoteCalculationResult` |
| `/api/v1/quotes/:id/accept` | `POST` | `{ quote_id: string }` | `{ status: 'accepted', quote: Quote }` |
| `/api/v1/kyc/consent` | `POST` | `{ business_id: string, purposes: string[] }` | `{ consent_logged: boolean }` |
| `/api/v1/kyc/validate-specimen` | `POST` | `{ business_id: string, applicant_id: 'K01'...'K12', track: KycTrack }` | `KycValidationResult` |
| `/api/v1/orders` | `POST` | `{ quote_id: string, kyc_case_id: string }` | `{ order_id: string, status: string, timeline: OrderMilestone[] }` |
| `/api/v1/orders/:id/tracker` | `GET` | `order_id` in path | `{ order: Order, milestones: OrderMilestone[], next_action: string }` |
| `/api/v1/partner/stalled-leads` | `GET` | `?limit=20` | `{ leads: LeadItem[], kyc_reviews: KycReviewTask[] }` |
| `/api/v1/analytics/funnel` | `GET` | none | `{ funnel: StageStats[], cac_comparison: CacMetrics }` |

---

## 7. Step-by-Step Developer Sprint Checklist

### Sprint 1: TypeScript Monorepo & Backend Core Setup
- [ ] Initialize `package.json` with npm workspaces (`server`, `frontend`, `shared`).
- [ ] Configure `tsconfig.json` across shared, server, and frontend.
- [ ] Implement `server/src/db/seed.ts` using `better-sqlite3` to ingest the 4 CSV files into SQLite.
- [ ] Build Express server with typed middleware, CORS, and request logging.

### Sprint 2: Catalogue, AI Advisor & Quote Engine
- [ ] Implement `catalogueService.ts` with strict constraint validation (`requires_gstin`, `available_city_tiers`, `min_employees`, `requires_one_of`).
- [ ] Build outcome bundle templates for the 4 segments (`Kirana Pack`, `Clinic Suite`, `Multi-Store Pro`, `Industrial Plant`).
- [ ] Build `quoteService.ts` for dynamic server-side pricing and add-on recalculation.
- [ ] Implement unit tests validating that GSTIN-only SKUs are never recommended to non-GSTIN businesses.

### Sprint 3: Smart KYC, DPDP Consent & Registry Checkers
- [ ] Build `kycService.ts` incorporating dual-track workflow (GSTIN vs Non-GSTIN Udyam).
- [ ] Implement query lookups against `mock_gstin_registry` and `mock_udyam_registry`.
- [ ] Code edge-case detection rules:
  - Cancelled GSTIN status (K01)
  - Date of registration discrepancy (K02)
  - Utility bill recency check relative to `2026-07-15` ($\le 90$ days)
  - Blank or missing fields
- [ ] Implement tri-state routing (`VERIFIED`, `NEEDS_REVIEW`, `REJECTED`).

### Sprint 4: Order Tracker, SLA Engine & Partner Console
- [ ] Implement `orderService.ts` with automatic state transitions and SLA calculation.
- [ ] Build `partnerRoutes.ts` with lead claiming and manual review resolution.
- [ ] Implement partner referral code attribution to prevent channel conflict.
- [ ] Build simulated push notification dispatcher (SMS / WhatsApp preview).

### Sprint 5: Frontend Next.js App Router Application
- [ ] Initialize `frontend/` using Next.js (App Router, TypeScript, Tailwind CSS, Lucide React).
- [ ] Implement layout with language switch context (English / Hindi हिन्दी).
- [ ] Build `/dashboard` with dynamic cards adapted to the business segment (Kirana vs Clinic vs Multi-site vs Factory).
- [ ] Build `/advisor` question wizard with plain-language outcome bundle recommendations.
- [ ] Build `/quote` page with transparent breakdown and dynamic add-on recalculation.
- [ ] Build `/kyc` page with DPDP unbundled consent and specimen applicant selector (K01–K12).
- [ ] Build `/tracker` page with interactive milestone progress and SLA countdown.
- [ ] Build `/partner` page for stalled checkout recovery and lead attribution.

---

## 8. Development & Run Commands

```bash
# 1. Install all dependencies (Root, Server, Frontend)
npm install

# 2. Seed Database from CSV Files
npm run db:seed

# 3. Start Backend Development Server (TypeScript / tsx)
npm run dev:server    # Runs on http://localhost:5000

# 4. Start Next.js Frontend (App Router / TypeScript)
npm run dev:frontend  # Runs on http://localhost:3000

# 5. Run Concurrently (Both Backend & Next.js Frontend)
npm run dev
```
