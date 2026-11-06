# Project Udyam Digital (Enterprise MSME Track A)

**Digital-First MSME Acquisition, AI Advisor, Smart KYC, Quotation & Fulfilment Platform**  
Built for the Accel YTL Hackathon 2026.

---

## Key Achievements & Solved Problems

1. **Unit Economics Optimization:**
   - Case Baseline CAC: **₹15,000**
   - Project Udyam Digital CAC: **₹2,850** (**-81% reduction**)
   - Activation SLA: Reduced from **17.6 days down to < 48 hours**.

2. **Solving the 56.4% Drop-Off (Needs Assessed ➔ Quote Accepted):**
   - Replaced multi-page technical PDF quotations with plain-language, outcome-based bundles (*"Kirana Uptime Pack"*, *"Practice Clinic Suite"*, *"Multi-Store Pro"*, *"Industrial Connected Unit"*).
   - Dynamic server-side recalculation on add-on toggling.

3. **Closing the Non-GSTIN Activation Gap:**
   - Baseline data showed only **2.0% activation** for non-GSTIN businesses vs 9.6% for GSTIN.
   - Built a compliant, zero-visit Track B route accepting **Udyam Certificates + 90-day Utility Bills**.

4. **Eliminating Status-Chasing Calls (3+ Calls/Order):**
   - Real-time customer milestone timeline with proactive WhatsApp notification simulation.

5. **Assisted-Digital Partner Console:**
   - Partner lead recovery queue with attributed referral codes (`partner_code`), resolving channel conflict.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + Lucide Icons + Telecom theme
- **Database:** SQLite (`node:sqlite` WAL mode) with zero native compilation dependencies
- **Data Ingestion:** Ingests `product_catalogue.csv` (25 SKUs), `mock_gstin_registry.csv` (3,534 records), `mock_udyam_registry.csv` (2,723 records), and `smb_leads.csv` (5,000 leads).
- **Compliance:** DPDP Act 2023 unbundled explicit consent logger.

---

## Quickstart

```bash
# 1. Install dependencies
cd udyam-digital
npm install

# 2. Seed database from hackathon test CSVs
npm run db:seed

# 3. Start development server
npm run dev
# Open http://localhost:3000 in your browser
```

---

## Automated Route Test Matrix

| Route | Feature |
|---|---|
| `/` | Mobile verification (OTP `123456`) & 1-click persona switcher |
| `/dashboard` | Segment-adaptive telemetry (Kirana, Clinic, Multi-store, Factory) |
| `/advisor` | Plain-language need discovery & deterministic bundle recommendation |
| `/quote` | Itemized price breakdown with server-side dynamic recalculation |
| `/kyc` | DPDP consent + dual-track verification on specimen data (K01–K12) |
| `/tracker` | Live milestone timeline & &lt;48h activation SLA clock |
| `/settings` | Update business category with subscription preservation guardrails |
| `/partner/leads` | Stalled lead recovery queue & KYC review exceptions |
| `/analytics` | 5,000-lead funnel metrics & CAC reduction model |

