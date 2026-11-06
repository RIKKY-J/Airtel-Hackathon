# Project Udyam Digital

## Product Definition, System Architecture and Data Flows

**Document purpose:** Product and technical blueprint for the YTL
Hackathon 2026 -- Enterprise Track A\
**Product concept:** A digital-first acquisition and onboarding platform
for micro, small and medium businesses (MSMEs)\
**Version:** 1.0\
**Status:** Proposed solution architecture

------------------------------------------------------------------------

## 1. Executive summary

Project Udyam Digital is a single, mobile-first platform through which
an MSME owner can discover suitable business connectivity and digital
services, receive a transparent quote, complete business KYC, place an
order, and track installation and activation.

The product replaces a slow, fragmented, salesperson-led journey with a
guided digital journey. It combines:

1.  **Business profiling and personalisation** -- identify the business
    segment and tailor the app experience.
2.  **AI Business Advisor** -- understand the business's actual
    requirements and recommend eligible products from the supplied
    catalogue.
3.  **Quote and checkout** -- show a clear monthly price, one-time
    charges, contract terms and optional add-ons.
4.  **Smart KYC** -- collect documents with explicit consent, extract
    fields, and validate them against the supplied mock GSTIN and Udyam
    registries.
5.  **Order and activation tracker** -- give customers visibility into
    each fulfilment stage and reduce status-chasing calls.
6.  **Partner and sales handoff** -- route leads to a human sales or
    channel partner when digital self-service cannot complete the
    journey.

The platform supports **all four customer segments** in one application.
It does not create four separate apps. A business-type profile controls
the default dashboard, language and advisor questions, while the
customer's detailed needs and catalogue eligibility control the actual
recommendation.

> **Important case-study context:** The PDF describes a fictional
> operator, Accel Telecom, and its B2B arm, Accel Business. It states
> that the case data is synthetic and is not company data. This document
> uses "Udyam Digital" for the proposed product and does not treat the
> synthetic figures as real Airtel operating data.

------------------------------------------------------------------------

## 2. Core problem: broken B2B unit economics and operating drag

The core problem is **not simply that MSMEs need another app**. The underlying problem is that a high-touch enterprise sales and onboarding model is economically difficult to use for a very large, low-ticket MSME market.

The accompanying core-problem and judging guide frames the challenge in three connected ways:

1. **Acquisition economics:** blended customer acquisition cost (CAC) is approximately ₹15,000, while the stated monthly revenue per customer is approximately ₹2,500 for micro businesses and ₹6,900 for the median bundle. A high-cost, field-sales-heavy journey can make low-ticket accounts difficult to acquire profitably.
2. **Operating latency:** the journey takes an average 17.6 days from lead to activation and creates three or more customer status chases. Delay and uncertainty increase drop-off and consume staff time.
3. **Conversion friction:** customers face technical product names, unbundled services and confusing multi-item PDF quotations. The result is a weak transition from assessed need to accepted quote.

**Product implication:** Udyam Digital must be designed as an operating-model and unit-economics improvement, not as a collection of screens. The app is the customer-facing layer of a system that lowers the cost of discovery, recommendation, quoting, verification, fulfilment coordination and support.

### 2.1 The three business failures and the product response

| Business failure | Stated cause in the core-problem guide | Required product response |
|---|---|---|
| Quote acceptance drop | Technical jargon, unbundled products and confusing PDF quotes | Deterministic, outcome-based bundles with plain-language names, transparent pricing and clear inclusions |
| GSTIN vs non-GSTIN activation gap | Verification paralysis for unorganised micro-businesses | Alternative, compliant verification paths using applicable Udyam, PAN and utility-bill evidence, with review where needed |
| Field-channel conflict | Digital self-service may threaten field-agent and reseller commissions | Assisted-digital recovery: route stalled checkouts to partners and attribute eligible conversions through partner codes |

The guide reports that 1,974 leads reached needs assessed and 861 accepted a quote. That is a 56.4% drop from the assessed stage (or 43.6% proceeding to quote acceptance). The case PDF rounds the stage conversion to 44%. Both descriptions refer to the same funnel transition.

The guide also highlights an activation gap: 9.6% for leads with GSTIN versus 2.0% for leads without GSTIN. This makes a robust non-GSTIN pathway a central product requirement, not a minor KYC enhancement.

### 2.2 Unit economics must shape the design

The core-problem guide asks the team to demonstrate a reduction in CAC from approximately ₹15,000 to **below ₹3,000**, and a reduction in activation time from 17.6 days to **under 48 hours**.

Treat these as judging targets/hypotheses, not proven outcomes. The prototype should show a credible mechanism for reaching them:

- Replace repeated field visits and manual discovery with guided self-service.
- Use catalogue-constrained recommendations to reduce sales effort and quote rework.
- Present outcome-based bundles to improve quote comprehension and acceptance.
- Automate document extraction and registry checks where legally and operationally appropriate.
- Provide a non-GSTIN verification route with transparent review and fallback rules.
- Give customers a tracker and proactive updates to reduce status calls.
- Use partners for exception handling and assisted conversion rather than sending every lead through a high-cost field-sales journey.
- Measure cost per activated customer, not just app registrations or chatbot conversations.

A lower CAC claim is credible only if the team explains which human tasks are removed, automated or shifted to a lower-cost channel, and includes partner incentives and servicing costs in the calculation.

### 2.3 Product principle: outcome-based bundles, not technical SKU lists

The advisor should translate a business outcome into an eligible bundle. For example, a customer should see a plain-language option such as **“Coaching Centre Pack”**, with its services, monthly price, setup charges and contract terms explained. The underlying catalogue may contain technical items such as bandwidth, leased-line or static-IP products, but those terms should be explained rather than used as the primary customer-facing product name.

Bundles must still be deterministic and catalogue-restricted:
- Every included product must exist in `product_catalogue.csv`.
- All city-tier, business-size, GSTIN and contract-length constraints must be enforced.
- Product dependencies must be satisfied.
- The displayed price must be calculated from catalogue-backed values.
- If no eligible bundle fits, explain the limitation or route the case for assisted review; never invent a product.

### 2.4 Non-GSTIN KYC is a first-class journey

Do not design KYC as “GSTIN upload or failure.” The guide explicitly calls for frictionless paths for non-GSTIN businesses using applicable Udyam, PAN and utility-bill evidence without requiring a manual sales visit.

The workflow should:
1. Determine which evidence is required for the selected product and applicable policy.
2. Explain the purpose of each requested document separately.
3. Obtain explicit, unbundled consent before processing each relevant purpose.
4. Extract and validate only the required fields.
5. Use registry checks where available and permitted.
6. Route mismatches, low-quality documents or unsupported cases to manual review.
7. Avoid automatic rejection merely because a business does not have GSTIN, unless a specific catalogue or policy rule makes GSTIN mandatory for that product.

The actual accepted evidence and verification rules must be configurable and validated with the competition's supplied data and applicable legal/compliance requirements. The prototype must label mock lookups as mock.

### 2.5 Assisted-digital partner model

Digital self-service should not compete with the existing field force and local resellers. It should make their work more productive.

Proposed operating model:
- A customer can enter through a digital channel or a partner code.
- The digital journey handles routine discovery, bundle selection, quoting and document collection.
- If a customer stalls, requests help or encounters a verification exception, create a handoff task.
- Attribute the lead and eligible conversion to the originating or assisting partner using a partner code and clear attribution rules.
- Give the partner enough context to continue the journey without asking the customer to repeat everything.
- Track partner-assisted recovery, conversion and payout/commission eligibility.

The exact commission formula is a business decision and is not specified in the supplied guide. The prototype should demonstrate attribution and handoff without inventing an official commission rate.

## 3. Problem being solved

The case study describes a fragmented MSME buying journey:

-   Needs are discovered through a field-sales visit.
-   A quotation takes approximately 3--5 days and is difficult for an
    owner to understand.
-   KYC documents are collected physically or by email.
-   Installation and activation take approximately 10--14 days on
    average in the described process.
-   Products are billed and supported separately.

The case-study funnel reports 5,000 leads and 368 activations (7.36%)
for April--June 2026. The largest stage-to-stage percentage drop is from
**Needs assessed (1,974) to Quote accepted (861)**, where 44% proceed.
It also reports an average 17.6 days from lead to activation, three
status chases per activated customer, and an approximate blended
acquisition cost of ₹15,000 per activated SMB.

These figures indicate that the product should prioritise: - Easier
needs discovery and understandable recommendations. - Faster, more
transparent quotations. - Lower-friction, consent-based KYC. - Better
visibility into fulfilment and activation. - Lower-cost digital
acquisition, with human help available when needed.

The proposed targets in this document are hypotheses for the business
case, not targets specified by the case PDF. They must be tested and
refined.

------------------------------------------------------------------------

## 4. Product goals and non-goals

### 3.1 Goals

-   Let an MSME owner complete the core purchase journey from a phone.
-   Support Hindi and a path to additional regional languages.
-   Personalise the experience for all four business segments.
-   Recommend only products present in the product catalogue and
    eligible for the customer's profile.
-   Show a transparent quote, including recurring and one-time charges.
-   Collect only the information needed for the stated onboarding
    purpose.
-   Use mock registry integrations for the hackathon demonstration.
-   Provide an order status view that reduces avoidable support calls.
-   Allow a customer to update their business profile without silently
    changing existing subscriptions.
-   Give sales and channel partners a structured handoff for leads
    requiring human assistance.

### 3.2 Non-goals for the hackathon prototype

Unless the team has access to real provider integrations, the prototype
should **not** claim to: - Provision a live telecom connection. -
Perform a real government GSTIN or Udyam verification. - Execute a real
payment or e-signature. - Guarantee installation slots or service
availability. - Replace a production CRM, billing platform, identity
provider or fulfilment system.

Mock these integrations clearly and label their results as simulated.
The prototype should demonstrate the interfaces, business rules and data
flow that a production integration would use.

------------------------------------------------------------------------

## 5. Customer segments and personalisation model

The case PDF identifies four indicative segments. The percentages below
are the segment shares stated in its appendix; they are not market-wide
independently verified estimates.

  ------------------------------------------------------------------------------
  Segment          Case-study share Example       Typical needs    Price
                                    businesses                     sensitivity
  --------------- ----------------- ------------- ---------------- -------------
  Micro retail &                55% Kirana,       Reliable         Very high
  services                          salon,        internet for     
                                    pharmacy      UPI/POS,         
                                                  WhatsApp         
                                                  catalogue        

  Professional                  25% Clinic, CA    Uptime, cloud    Medium
  offices                           firm,         email/storage,   
                                    coaching      data security    
                                    centre                         

  Small                         15% Restaurant    One bill,        Medium--low
  multi-site                        chain,        central          
  businesses                        retailer with management,      
                                    3--10 stores  CCTV, failover   

  Small                          5% Auto-parts    Dedicated        Low
  manufacturers                     unit, textile bandwidth, IoT,  
                                    unit          ERP access       
  ------------------------------------------------------------------------------

### 4.1 Registration and profile setup

During registration, the owner selects a primary business type:

-   `micro_retail_services`
-   `professional_office`
-   `small_multisite`
-   `small_manufacturer`

The onboarding flow then asks follow-up questions relevant to that
segment. Examples:

**Micro retail & services** - Business subtype (kirana, salon, pharmacy,
etc.). - Number of employees. - Number of locations. - Whether UPI/POS,
WhatsApp catalogue or CCTV connectivity is needed.

**Professional offices** - Office type (clinic, CA firm, coaching
centre, etc.). - Number of employees. - Number of locations. - Cloud
email/storage and security requirements.

**Small multi-site businesses** - Number of branches and their
locations. - Whether each branch needs connectivity. - Central billing
and monitoring requirements. - CCTV and backup-connectivity needs.

**Small manufacturers** - Manufacturing subtype. - Number of sites and
relevant machines. - Dedicated bandwidth requirements. - IoT and ERP
connectivity requirements.

The selected segment controls the default app experience. The follow-up
answers---not the segment label alone---drive the product
recommendation.

### 4.2 One app, four configurable experiences

The app shell, authentication, quote engine, KYC, order tracking and
account settings are shared. The following are configurable by segment:

-   Dashboard cards and shortcuts.
-   Advisor question flow.
-   Relevant product categories and explanations.
-   Suggested bundle templates.
-   Terminology and educational help.
-   Multi-location controls where relevant.

For example, a multi-site customer should see branch management
prominently, while a kirana owner should see connectivity status and a
simple monthly bill.

### 4.3 Change business type in Account Settings

A customer can update their business type and profile under **Account
Settings → Business Profile → Change business type**.

The change flow should: 1. Explain that the dashboard and future
recommendations will change. 2. Ask the customer to confirm the new
primary business type. 3. Collect any newly required profile details. 4.
Recalculate future recommendations using the updated profile. 5.
Preserve existing orders, invoices and active subscriptions. 6. Flag any
existing product that may need a separate review; do not automatically
cancel or replace it.

A business type change is a profile update. It is **not** an instruction
to change a customer's purchased services.

For businesses that genuinely span categories, consider a later
enhancement: allow one primary category plus multiple business locations
or business activities. For the initial prototype, keep one primary
segment to avoid unnecessary complexity.

------------------------------------------------------------------------

## 6. End-to-end customer journey

1.  **Discover:** Customer opens the mobile-first web app or supported
    mobile interface.
2.  **Register/sign in:** Customer verifies their mobile number using a
    demo OTP or authentication provider.
3.  **Choose language:** Customer selects a supported language.
4.  **Select business type:** Customer chooses one of the four segments.
5.  **Complete business profile:** Customer answers a short,
    segment-specific set of questions.
6.  **Consult advisor:** AI asks follow-up questions about actual
    requirements, budget, locations and current setup.
7.  **View recommendations:** Recommendation engine filters and ranks
    catalogue products using requirements, eligibility and dependencies.
8.  **Review quote:** Customer sees recurring price, one-time fees,
    contract duration, taxes/assumptions and optional add-ons.
9.  **Checkout:** Customer confirms the quote and provides the
    information required to create an order.
10. **Complete KYC:** Customer sees a clear consent notice, uploads
    required documents, and reviews extracted information.
11. **Validate:** Document processing and mock registry checks return
    pass, review or fail outcomes.
12. **Submit order:** An order is created only after required checks and
    customer confirmation.
13. **Track:** Customer views order, KYC, installation and activation
    statuses.
14. **Escalate when needed:** A failed check, unavailable product or
    unresolved requirement can be routed to a partner or sales queue.
15. **Manage account:** Customer can update business profile, language,
    users and notification preferences.

------------------------------------------------------------------------

## 7. Functional architecture

### 6.1 High-level architecture

``` mermaid
flowchart TB
    subgraph CLIENT["Customer and staff interfaces"]
        WEB["Responsive web / mobile UI"]
        STAFF["Partner and sales console"]
    end

    subgraph EDGE["Application access layer"]
        AUTH["Authentication and session"]
        API["API gateway / backend-for-frontend"]
    end

    subgraph CORE["Core application services"]
        PROFILE["Business profile service"]
        ADVISOR["AI advisor orchestration"]
        RECO["Recommendation and eligibility engine"]
        CATALOG["Product catalogue service"]
        QUOTE["Quote and checkout service"]
        KYC["KYC workflow service"]
        DOC["Document OCR and validation"]
        ORDER["Order and fulfilment service"]
        TRACK["Order status and notification service"]
        HANDOFF["Lead routing, partner handoff and attribution"]
        VERIFY["Verification policy and evidence-path rules"]
    end

    subgraph DATA["Data and integrations"]
        DB[("Application database")]
        FILES[("Encrypted document storage")]
        GST["Mock GSTIN registry API"]
        UDYAM["Mock Udyam registry API"]
        LLM["LLM provider"]
        MSG["SMS / WhatsApp / email adapter"]
        PRODUCT["product_catalogue.csv"]
        LEADS["smb_leads.csv"]
    end

    WEB --> AUTH
    STAFF --> AUTH
    AUTH --> API
    API --> PROFILE
    API --> ADVISOR
    API --> QUOTE
    API --> KYC
    API --> ORDER
    API --> TRACK

    ADVISOR --> RECO
    ADVISOR --> LLM
    RECO --> CATALOG
    CATALOG --> PRODUCT
    QUOTE --> CATALOG
    PROFILE --> DB
    RECO --> DB
    QUOTE --> DB
    KYC --> VERIFY
    VERIFY --> DOC
    DOC --> FILES
    DOC --> GST
    DOC --> UDYAM
    KYC --> DB
    ORDER --> DB
    ORDER --> TRACK
    TRACK --> MSG
    ADVISOR --> HANDOFF
    KYC --> HANDOFF
    ORDER --> HANDOFF
    HANDOFF --> STAFF
    STAFF --> DB
    LEADS --> DB
```

This is a logical architecture for the prototype. It can be implemented
as a modular monolith (one backend with clearly separated modules)
rather than deploying every box as a separate microservice. A modular
monolith is usually faster to build, test and demo in a hackathon. The
module boundaries can later be separated if traffic, team ownership or
reliability needs justify it.

### 6.2 Main components

#### A. Responsive customer application

**Responsibilities** - Registration, login and language selection. -
Business-type selection and profile completion. - Segment-specific
dashboard rendering. - AI advisor chat/voice interface. - Product
recommendations and quote review. - Document upload and consent. - Order
tracking and account settings.

**Key design rule:** The frontend may adapt its layout to the selected
segment, but business eligibility and pricing must be decided and
validated by the backend. Do not trust a price or eligibility value
supplied by the browser.

#### B. Authentication and access control

**Responsibilities** - Verify customer identity through OTP or a
suitable authentication mechanism. - Manage sessions and logout. -
Enforce roles such as business owner, authorised employee, partner and
internal sales user. - Restrict each user to their own business account
and permitted locations.

For the prototype, a simulated OTP may be used. It must be clearly
marked as a demo mechanism and not represented as production-grade
authentication.

#### C. Business profile service

**Responsibilities** - Store the primary business segment and profile
answers. - Maintain employee count, locations, current tools and stated
requirements. - Provide the profile to the advisor and recommendation
engine. - Support profile updates and an audit history of important
changes.

**Important distinction:** `business_type` is a personalisation
attribute; it is not proof of legal business identity and does not
establish product eligibility by itself.

#### D. AI advisor orchestration

**Responsibilities** - Ask a short, structured sequence of questions. -
Use the selected language and business segment to choose relevant
prompts. - Convert natural-language answers into structured requirement
fields. - Ask clarifying questions when required information is
missing. - Call the recommendation engine. - Explain recommendations in
plain language. - Offer a human handoff when confidence is low, the
request is unsupported or the customer asks for help.

The LLM should not invent products, prices, contract terms, coverage or
eligibility. It should receive catalogue-backed options and explain
them. The backend recommendation engine remains authoritative.

**Example structured requirements**

``` json
{
  "business_type": "micro_retail_services",
  "subtype": "kirana",
  "employee_count": 3,
  "locations": 1,
  "needs": {
    "broadband": true,
    "business_sims": 2,
    "upi_pos_connectivity": true,
    "cctv_connectivity": true,
    "cloud_storage": false
  },
  "budget_monthly_inr": 1800,
  "preferred_language": "hi"
}
```

This is an illustrative schema, not a record from the supplied dataset.

#### E. Product catalogue and recommendation engine

**Catalogue service responsibilities** - Load and expose the 25 products
in `product_catalogue.csv`. - Preserve product IDs, descriptions, price
ranges, setup fees, contract length, eligibility rules and
dependencies. - Provide versioned catalogue data so a quote can be
traced to the catalogue version used.

**Recommendation engine responsibilities** 1. Receive structured
requirements and business profile. 2. Retrieve candidate products from
the catalogue. 3. Apply hard eligibility rules (for example, city tier,
business size or GSTIN requirement). 4. Apply product dependency rules.
5. Rank eligible products against the customer's stated needs and
budget. 6. Return a small set of suitable bundles with reasons and any
unmet requirements.

Do not use the LLM to bypass catalogue rules. If a product is
ineligible, the system must not recommend it as purchasable.

#### F. Quote and checkout service

**Responsibilities** - Create a quote from selected catalogue product
IDs. - Calculate recurring charges and one-time/setup fees. - Apply
dependencies, eligibility and any permitted discounts. - Show contract
length and material terms. - Allow optional add-ons to be toggled. -
Recalculate the quote on the server whenever selections change. - Store
a quote snapshot so the accepted price and terms are auditable.

A quote should clearly distinguish: - Monthly recurring total. -
One-time/setup charges. - Contract duration. - Taxes or other charges,
if represented in the supplied catalogue or explicitly modelled. -
Optional items versus required items.

Do not invent actual catalogue prices. The sample price table in earlier
brainstorming was illustrative only. The real prototype should use
`product_catalogue.csv`.

#### G. Smart KYC and document processing

**Responsibilities** - Present a clear notice explaining the purpose of
each requested document and data field. - Capture consent before the
relevant processing. - Accept the required document types. - Store
uploaded files securely. - Run OCR and extract fields. - Validate
document type, readability and consistency. - Query the mock GSTIN and
Udyam registries. - Return a structured result: `verified`,
`needs_review` or `rejected`. - Allow manual review for uncertain or
mismatched results.

**Expected document types in the case** - GST certificate. - Udyam
registration. - Address proof. - Signatory ID.

**Validation example** - Extract GSTIN from the uploaded GST
certificate. - Check the extracted GSTIN against
`mock_gstin_registry.csv` through a mock lookup adapter. - Compare
relevant returned fields with the uploaded document and customer-entered
details. - Check registry status, including cancelled or suspended
statuses where represented. - If values conflict or OCR confidence is
low, mark for review rather than silently accepting.

The PDF says some specimen KYC documents contain planted problems. The
team should use the provided student dataset and README to design
validation cases. The judge-only answer key is not part of the student
materials and must not be used or shared.

#### H. Order and fulfilment service

**Responsibilities** - Create an order from an accepted quote. - Link
the order to the business, selected products and KYC case. - Maintain
order status and status history. - Record installation tasks or
simulated fulfilment events. - Prevent duplicate order creation on
retries. - Trigger notifications when a meaningful status changes.

Suggested statuses: - `draft` - `quote_accepted` - `kyc_pending` -
`kyc_in_review` - `kyc_verified` - `order_submitted` -
`installation_scheduled` - `installation_in_progress` - `activated` -
`on_hold` - `cancelled`

The exact statuses should be agreed by the team and used consistently in
the API, database and UI. For the hackathon, installation and activation
events may be simulated.

#### I. Order tracker and notifications

**Responsibilities** - Show a customer-friendly timeline based on
backend order events. - Display the current status, last update and next
expected action where known. - Send notifications through an adapter for
SMS, WhatsApp or email. - Avoid showing an estimated activation time
unless the fulfilment system actually provides one.

#### J. Partner and sales console

**Responsibilities** - Show leads that need human assistance. - Display
the reason for handoff, customer-approved contact details and relevant
requirements. - Allow an authorised partner or salesperson to update
follow-up status. - Record the outcome so the business can analyse where
digital self-service is failing.

Human support should complement the digital journey, not force every
customer back into a salesperson-led process.

------------------------------------------------------------------------

## 8. Data architecture

### 7.1 Supplied case-study data

The case PDF lists these student data assets:

  ---------------------------------------------------------------------------
  File                        Contents stated in the  Primary use
                              case                    
  --------------------------- ----------------------- -----------------------
  `product_catalogue.csv`     25 products             Recommendations, quotes
                                                      and eligibility

  `smb_leads.csv`             5,000 leads             Funnel analysis,
                                                      drop-off and lead
                                                      prioritisation

  `mock_gstin_registry.csv`   3,534 records           Mock GSTIN lookup

  `mock_udyam_registry.csv`   2,723 records           Mock Udyam lookup

  `kyc_documents/`            47 images, 12           OCR and KYC validation
                              applicants              tests
  ---------------------------------------------------------------------------

The PDF says a README accompanies the ZIP and explains every column. The
ZIP and README were not included with the six-page case PDF uploaded for
this document, so the exact column names and data types are not
specified here. Inspect the README before implementing imports or
database mappings.

### 7.2 Proposed core entities

A relational database such as PostgreSQL is suitable for the prototype.

  -----------------------------------------------------------------------
  Entity                  Purpose                 Example important
                                                  fields
  ----------------------- ----------------------- -----------------------
  `users`                 Login identity          `id`, `mobile`, `role`,
                                                  `created_at`

  `businesses`            Business account        `id`, `owner_user_id`,
                                                  `name`,
                                                  `business_type`,
                                                  `status`

  `business_profiles`     Needs and segment       `business_id`,
                          details                 `employee_count`,
                                                  `locations_count`,
                                                  `language`,
                                                  `profile_data`

  `business_locations`    Branch/site details     `id`, `business_id`,
                                                  `address`, `city`,
                                                  `site_type`

  `catalogue_products`    Imported catalogue      `product_id`, `name`,
                                                  `price`, `setup_fee`,
                                                  `contract_months`,
                                                  `eligibility`,
                                                  `dependencies`,
                                                  `catalogue_version`

  `advisor_sessions`      Advisor conversation    `id`, `business_id`,
                          state                   `language`, `status`,
                                                  `created_at`

  `requirements`          Structured needs        `id`, `business_id`,
                          extracted from answers  `requirements_json`,
                                                  `created_at`

  `recommendations`       Recommended             `id`, `business_id`,
                          products/bundles        `product_ids`,
                                                  `reasons`, `created_at`

  `quotes`                Quote header and        `id`, `business_id`,
                          snapshot                `status`,
                                                  `monthly_total`,
                                                  `one_time_total`,
                                                  `catalogue_version`,
                                                  `expires_at`

  `quote_items`           Products and add-ons in `id`, `quote_id`,
                          quote                   `product_id`,
                                                  `quantity`,
                                                  `unit_price`,
                                                  `is_optional`

  `consents`              Consent records         `id`, `business_id`,
                                                  `purpose`,
                                                  `notice_version`,
                                                  `granted_at`,
                                                  `withdrawn_at`

  `documents`             Uploaded KYC document   `id`, `business_id`,
                          metadata                `document_type`,
                                                  `storage_key`, `status`

  `kyc_cases`             Verification workflow   `id`, `business_id`,
                                                  `status`,
                                                  `review_reason`

  `kyc_checks`            Individual              `id`, `kyc_case_id`,
                          extraction/registry     `check_type`, `result`,
                          checks                  `confidence`, `details`

  `orders`                Accepted customer order `id`, `business_id`,
                                                  `quote_id`, `status`,
                                                  `created_at`

  `order_items`           Products in an order    `id`, `order_id`,
                                                  `product_id`,
                                                  `quantity`,
                                                  `price_snapshot`

  `order_events`          Status history          `id`, `order_id`,
                                                  `status`, `event_time`,
                                                  `message`

  `handoff_tasks`         Human follow-up         `id`, `business_id`,
                                                  `reason`,
                                                  `assigned_to`, `status`

  `audit_logs`            Important               `id`, `actor_id`,
                          security/business       `action`,
                          events                  `resource_type`,
                                                  `resource_id`,
                                                  `timestamp`
  -----------------------------------------------------------------------

Use foreign keys and indexes for business ownership, order lookup and
status filtering. Store structured but evolving profile answers in JSON
where useful, while keeping important searchable fields in typed
columns.

### 7.3 Data separation and retention

-   Keep identity/account data separate from uploaded document contents.
-   Store documents in private object storage; store only metadata and a
    storage key in the database.
-   Never expose registry data or another customer's documents to the
    frontend.
-   Define retention and deletion rules for uploaded documents and
    extracted data.
-   Avoid putting full identity documents, OTPs or unnecessary personal
    data into LLM prompts or application logs.
-   Restrict access to KYC files to authorised roles and only for the
    required purpose.

------------------------------------------------------------------------

## 9. Detailed data flows

### 8.1 Registration and personalisation flow

``` mermaid
sequenceDiagram
    actor Customer
    participant UI as Customer App
    participant Auth as Auth Service
    participant API as Backend API
    participant Profile as Profile Service
    participant DB as Database

    Customer->>UI: Enter mobile and verify OTP
    UI->>Auth: Request verification
    Auth-->>UI: Demo/verified session
    Customer->>UI: Select language and business type
    UI->>API: Submit registration profile
    API->>Profile: Validate profile fields
    Profile->>DB: Create user/business/profile
    DB-->>Profile: Saved profile IDs
    Profile-->>API: Profile created
    API-->>UI: Personalised dashboard configuration
    UI-->>Customer: Show segment-specific experience
```

**Key output:** A business account with a primary segment and an initial
profile. This profile is not a KYC verification result.

### 8.2 Advisor and recommendation flow

``` mermaid
sequenceDiagram
    actor Customer
    participant UI as Customer App
    participant Advisor as Advisor Orchestrator
    participant LLM as LLM
    participant Reco as Recommendation Engine
    participant Cat as Catalogue Service
    participant DB as Database

    Customer->>UI: Describe business needs
    UI->>Advisor: Send answer and session context
    Advisor->>DB: Load business profile and session
    Advisor->>LLM: Ask next structured question
    LLM-->>Advisor: Question / extracted fields
    Advisor-->>UI: Ask customer
    Customer->>UI: Answer follow-up questions
    UI->>Advisor: Submit answers
    Advisor->>Reco: Send structured requirements
    Reco->>Cat: Fetch candidate products
    Cat-->>Reco: Catalogue products and rules
    Reco->>Reco: Apply eligibility, dependencies and ranking
    Reco-->>Advisor: Eligible options with reasons
    Advisor-->>UI: Explain recommended bundle
    Advisor->>DB: Save requirements and recommendation
```

**Key controls** - The advisor collects structured facts rather than
relying only on free text. - The recommendation engine applies
deterministic catalogue rules. - The LLM explains the result but does
not create prices or override eligibility. - If the requirements cannot
be met, return a clear limitation or create a human handoff.

### 8.3 Quote and checkout flow

``` mermaid
sequenceDiagram
    actor Customer
    participant UI as Customer App
    participant API as Backend API
    participant Quote as Quote Service
    participant Cat as Catalogue Service
    participant DB as Database

    Customer->>UI: Select recommended bundle
    UI->>API: Request quote
    API->>Quote: Create quote from product IDs
    Quote->>Cat: Validate products, prices and dependencies
    Cat-->>Quote: Current catalogue rules
    Quote->>Quote: Calculate recurring and one-time totals
    Quote->>DB: Save quote and item snapshots
    DB-->>Quote: Quote ID
    Quote-->>UI: Quote with terms and totals
    Customer->>UI: Toggle add-on / accept quote
    UI->>API: Update selection / accept
    API->>Quote: Revalidate and recalculate
    Quote->>DB: Save revised quote and acceptance
    Quote-->>UI: Confirmed quote
```

**Key control:** The server recalculates every quote. A
browser-calculated total is for display only and cannot be trusted for
order creation.

### 8.4 Smart KYC flow

``` mermaid
sequenceDiagram
    actor Customer
    participant UI as Customer App
    participant KYC as KYC Service
    participant Store as Private File Storage
    participant OCR as OCR/Validation
    participant GST as Mock GSTIN Registry
    participant Udyam as Mock Udyam Registry
    participant DB as Database

    KYC-->>UI: Show purpose and consent notice
    Customer->>UI: Grant consent and upload document
    UI->>KYC: Submit consent and document metadata
    KYC->>DB: Record notice version and consent
    UI->>Store: Upload document securely
    Store-->>KYC: Storage reference
    KYC->>OCR: Process authorised document
    OCR-->>KYC: Extracted fields and confidence
    KYC->>GST: Lookup extracted GSTIN if applicable
    GST-->>KYC: Mock registry result
    KYC->>Udyam: Lookup Udyam number if applicable
    Udyam-->>KYC: Mock registry result
    KYC->>KYC: Compare fields and apply validation rules
    KYC->>DB: Save checks and KYC status
    KYC-->>UI: Verified / needs review / rejected
```

**Key controls** - Obtain and record consent before the relevant
processing. - Explain the purpose and document requirement in plain
language. - Use only the minimum data needed for the KYC purpose. -
Treat low OCR confidence and mismatches as review cases. - Do not equate
a successful mock lookup with real government verification. - Make the
consent record and document access auditable.

### 8.5 Order creation and tracking flow

``` mermaid
sequenceDiagram
    actor Customer
    participant UI as Customer App
    participant Order as Order Service
    participant KYC as KYC Service
    participant DB as Database
    participant Notify as Notification Adapter
    participant Staff as Partner/Sales Console

    Customer->>UI: Confirm accepted quote and submit
    UI->>Order: Create order request
    Order->>DB: Check idempotency and quote state
    Order->>KYC: Check required KYC outcome
    KYC-->>Order: Verified / review / rejected
    alt Required checks pass
        Order->>DB: Create order and initial event
        Order->>Notify: Send confirmation
        Notify-->>Customer: Order confirmation
        Order-->>UI: Order ID and status
    else Review or failure
        Order->>DB: Save hold/review state
        Order->>Staff: Create human review task
        Order-->>UI: Explain next action
    end
    Staff->>Order: Update fulfilment status
    Order->>DB: Append order event
    Order->>Notify: Send status update
    UI->>Order: Fetch latest timeline
    Order-->>UI: Current status and history
```

In the hackathon prototype, staff status updates can be made from a
simple admin/partner screen. In production, these events would normally
come from the fulfilment or provisioning systems.

### 8.6 Business type change flow

1.  Customer opens Account Settings.
2.  UI fetches the current business profile.
3.  Customer chooses a new primary segment.
4.  Backend validates the change and requests any missing profile
    fields.
5.  Customer confirms the change.
6.  Profile service stores the new profile and audit event.
7.  Dashboard configuration and future advisor questions update.
8.  Recommendation engine uses the updated profile for future quotes.
9.  Existing quotes and orders retain their original snapshots.
10. Active subscriptions remain unchanged unless the customer separately
    requests a service change.

------------------------------------------------------------------------

## 10. Suggested API surface

The following endpoints are a proposed contract to help frontend and
backend work in parallel. Exact paths can be adjusted by the team.

  -------------------------------------------------------------------------------------------------
  Method                  Endpoint                                          Purpose
  ----------------------- ------------------------------------------------- -----------------------
  `POST`                  `/api/v1/auth/otp/request`                        Request login OTP

  `POST`                  `/api/v1/auth/otp/verify`                         Verify OTP and create
                                                                            session

  `POST`                  `/api/v1/businesses`                              Create business account

  `GET`                   `/api/v1/businesses/{businessId}`                 Fetch business profile

  `PATCH`                 `/api/v1/businesses/{businessId}/profile`         Update segment/profile

  `GET`                   `/api/v1/dashboard/config`                        Get segment-specific
                                                                            dashboard configuration

  `POST`                  `/api/v1/advisor/sessions`                        Start advisor session

  `POST`                  `/api/v1/advisor/sessions/{sessionId}/messages`   Send answer and receive
                                                                            next step

  `POST`                  `/api/v1/recommendations`                         Generate
                                                                            catalogue-backed
                                                                            recommendations

  `POST`                  `/api/v1/quotes`                                  Create quote

  `PATCH`                 `/api/v1/quotes/{quoteId}`                        Update
                                                                            add-ons/selections and
                                                                            recalculate

  `POST`                  `/api/v1/quotes/{quoteId}/accept`                 Accept quote

  `POST`                  `/api/v1/kyc/consents`                            Record consent

  `POST`                  `/api/v1/kyc/documents`                           Upload/register KYC
                                                                            document

  `GET`                   `/api/v1/kyc/cases/{caseId}`                      Get KYC result

  `POST`                  `/api/v1/orders`                                  Submit accepted quote
                                                                            as an order

  `GET`                   `/api/v1/orders/{orderId}`                        Get order and current
                                                                            status

  `GET`                   `/api/v1/orders/{orderId}/events`                 Get status timeline

  `POST`                  `/api/v1/handoffs`                                Create partner/sales
                                                                            handoff
  -------------------------------------------------------------------------------------------------

All endpoints should enforce authentication, business-level
authorisation, input validation and rate limits. Use idempotency keys
for operations such as order creation and document submission where
retries could otherwise create duplicates.

------------------------------------------------------------------------

## 11. Security, privacy and compliance design

The case specifically asks teams to address the Digital Personal Data
Protection (DPDP) Act, 2023, including consent, purpose limitation and
data minimisation. The following are proposed design controls, not a
legal opinion.

### 10.1 Consent and transparency

-   Show a concise notice before collecting or processing KYC data.
-   State the purpose, data categories and intended use.
-   Record the notice version, timestamp, business/user and consent
    action.
-   Do not bundle unrelated optional marketing consent with required KYC
    consent.
-   Provide a clear route to withdraw consent where applicable and
    explain the impact on an incomplete service request.

### 10.2 Data minimisation and purpose limitation

-   Request only documents required for the selected product and
    onboarding stage.
-   Do not ask every business for every document if the catalogue and
    process do not require it.
-   Do not send identity document images or full extracted identity
    details to the LLM.
-   Keep advisor prompts focused on business requirements, not sensitive
    identity data.

### 10.3 Access and storage

-   Encrypt data in transit and at rest.
-   Use private document storage and short-lived access links.
-   Enforce role-based access and business-level data isolation.
-   Keep secrets and API keys on the server, never in frontend code.
-   Redact personal information from logs and analytics.
-   Define document retention and secure deletion procedures.

### 10.4 Auditability

Record key events such as: - Consent granted or withdrawn. - Document
uploaded, viewed or deleted. - Registry lookup initiated and result
recorded. - KYC decision changed. - Quote accepted. - Order created or
status changed. - Business profile changed. - Staff or partner access to
a customer case.

### 10.5 AI safety and reliability

-   Treat customer messages and uploaded document text as untrusted
    input.
-   Do not let the LLM execute arbitrary database queries or change
    order/KYC status.
-   Use allow-listed backend tools with validated parameters.
-   Ground product, price and eligibility statements in catalogue data.
-   Escalate uncertain identity or compliance decisions to a human
    reviewer.
-   Store only the conversation information needed to operate and audit
    the advisor.

------------------------------------------------------------------------

## 12. Analytics and success measurement

The case asks teams to define 3--5 metrics. The following are
recommended measures and initial hypotheses. Baselines are taken from
the case PDF where available; targets are proposed and must be
validated.

  -------------------------------------------------------------------------------
  Metric                      Case baseline     Proposed initial Why it matters
                                                          target 
  -------------------- -------------------- -------------------- ----------------
  Lead-to-activation    7.36% (368 / 5,000)                  15% Measures
  conversion                                                     end-to-end
                                                                 funnel
                                                                 improvement

  Average                         17.6 days     Under 3 days for Measures
  lead-to-activation                          digitally eligible onboarding speed
  time                                                    orders 

  Needs-assessed to                     44%                  65% Targets the
  quote-accepted                                                 largest
                                                                 stage-to-stage
                                                                 drop

  Acquisition cost per      Approx. ₹15,000         Under ₹8,000 Measures
  activated SMB                                                  acquisition
                                                                 efficiency

  Status chases per                       3          Less than 1 Measures
  customer                                                       tracking and
                                                                 communication
                                                                 quality
  -------------------------------------------------------------------------------

Track the funnel by business segment, lead source, language, GSTIN
availability, recommendation outcome and drop-off reason. Segment-level
reporting is essential: a single overall conversion number can hide a
poor experience for one customer group.

Do not claim a target has been achieved based only on a prototype demo.
Use a pilot or controlled test to establish actual impact.

------------------------------------------------------------------------

## 13. Implementation plan

### Phase 1 -- Foundation

-   Review the dataset README and inspect all CSV columns.
-   Import and validate the product catalogue.
-   Define database schema and API contracts.
-   Implement login/demo OTP and business profile.
-   Build the four-segment registration and dashboard configuration.

### Phase 2 -- Advisor and commerce

-   Implement segment-specific question flows.
-   Convert answers into structured requirements.
-   Build deterministic catalogue eligibility and dependency checks.
-   Add recommendation explanations.
-   Implement quote calculation, add-ons and quote snapshots.

### Phase 3 -- KYC

-   Build consent UI and consent records.
-   Add document upload and private storage.
-   Implement OCR extraction.
-   Add mock GSTIN and Udyam registry adapters.
-   Add validation outcomes and manual review path.

### Phase 4 -- Order tracking and handoff

-   Create order submission from accepted quotes.
-   Implement order events and timeline UI.
-   Add simulated fulfilment status updates.
-   Build a simple partner/sales console and handoff queue.
-   Add notification simulation.

### Phase 5 -- Hardening and demo

-   Test all four customer segments.
-   Test business type changes and confirm subscriptions are preserved.
-   Test catalogue eligibility and price recalculation.
-   Test KYC planted issues using the student dataset.
-   Test access control and cross-business data isolation.
-   Prepare architecture diagram, privacy note, business case and a demo
    of no more than three minutes.

### Prioritisation if time is limited

Build the full happy path first for one sample business in each of the
four segments, then add failure and review cases. Do not spend most of
the hackathon polishing four different dashboards while quote, KYC or
order flows remain disconnected.

------------------------------------------------------------------------

## 14. Key product and architecture decisions

  -----------------------------------------------------------------------
  Decision                Recommendation          Reason
  ----------------------- ----------------------- -----------------------
  One app or four apps?   One app with segment    Shared journey and
                          configuration           lower build/maintenance
                                                  cost

  How is segment          During registration;    Early personalisation
  selected?               editable in Account     with user control
                          Settings                

  What drives             Actual needs +          Segment alone is too
  recommendations?        catalogue rules +       broad
                          eligibility             

  Where does pricing      Backend quote service   Prevents manipulated or
  happen?                                         inconsistent prices

  What does AI control?   Conversation and        Keeps commercial and
                          explanation             compliance rules
                                                  deterministic

  How is KYC verified?    OCR + mock registry     Demonstrates automation
                          adapters + review path  without pretending to
                                                  access real registries

  How are existing        Preserve them; require  Prevents accidental
  services handled on     separate service-change cancellation or
  profile change?         action                  unexpected charges

  What backend            Modular monolith for    Faster to build while
  architecture?           prototype               retaining clear module
                                                  boundaries

  What happens when       Human partner/sales     Complements the
  self-service fails?     handoff                 existing field/channel
                                                  network
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 15. Risks and mitigations

  -----------------------------------------------------------------------
  Risk                                Mitigation
  ----------------------------------- -----------------------------------
  AI recommends a non-existent or     Catalogue-backed retrieval and
  ineligible product                  deterministic eligibility checks

  Incorrect quote total               Server-side calculation and
                                      immutable quote snapshots

  OCR extracts incorrect identity     Confidence thresholds, field
  details                             comparisons and manual review

  Mock verification is mistaken for   Label all mock checks clearly in UI
  real verification                   and demo

  Business type is changed            Confirmation, audit history and no
  accidentally                        automatic subscription changes

  One segment receives a generic      Segment-specific prompts, dashboard
  experience                          configuration and test scenarios

  Customer data is exposed across     Business-scoped authorisation,
  businesses                          private storage and access tests

  External API is unavailable         Adapter pattern, timeout handling
                                      and clearly labelled mock fallback

  Human handoff loses context         Transfer structured requirements,
                                      quote context and reason for
                                      escalation
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 16. Three-minute demo narrative

A concise demo can tell one continuous story:

1.  **0:00--0:25 -- Register:** Create a business account, choose Hindi
    or English, and select one of the four business types.
2.  **0:25--0:55 -- Personalise:** Show the relevant dashboard and
    answer the advisor's questions.
3.  **0:55--1:25 -- Recommend and quote:** Show catalogue-backed
    options, explain the recommendation and toggle an add-on to
    recalculate the price.
4.  **1:25--2:05 -- Smart KYC:** Show the consent notice, upload a
    specimen document, display OCR fields and a mock registry result.
    Demonstrate a review case if time permits.
5.  **2:05--2:35 -- Track:** Submit the order and show status updates in
    the customer tracker.
6.  **2:35--2:50 -- Human handoff:** Show how an unresolved case appears
    in the partner console.
7.  **2:50--3:00 -- Personalisation control:** Change the business type
    in Account Settings and show the dashboard update while the existing
    order remains unchanged.

Use a pre-seeded dataset and predictable demo scenarios. Avoid relying
on a live external API or an unpredictable LLM response during the final
demo.

------------------------------------------------------------------------

## 17. Definition of done

The prototype is ready for submission when:

-   [ ] A user can register and select any of the four business types.
-   [ ] Each segment gets a visibly relevant dashboard and advisor flow.
-   [ ] A user can update their business type in Account Settings.
-   [ ] Profile changes do not silently modify active subscriptions or
    existing orders.
-   [ ] Advisor recommendations use the supplied catalogue.
-   [ ] Eligibility and product dependencies are enforced by backend
    logic.
-   [ ] A quote shows recurring charges, one-time fees and contract
    terms.
-   [ ] Add-ons can be toggled and the backend recalculates the quote.
-   [ ] KYC consent is recorded before document processing.
-   [ ] Documents can be uploaded, processed and checked against mock
    registries.
-   [ ] Uncertain KYC results can be routed for manual review.
-   [ ] An accepted quote can become an order.
-   [ ] The customer can view a meaningful order timeline.
-   [ ] A partner/sales handoff can be created for unresolved cases.
-   [ ] The team has tested all four segments and key failure cases.
-   [ ] The demo, architecture diagram, business case and one-page
    privacy note are ready.

------------------------------------------------------------------------

## 18. Source basis and assumptions

### Facts taken from the supplied six-page case PDF

-   The exercise uses a fictional operator, Accel Telecom, and B2B arm,
    Accel Business; the data is synthetic.
-   The target problem is digital-first MSME acquisition and onboarding.
-   The case names four indicative customer segments and their needs.
-   The required prototype areas are Advisor, Quote and checkout, Smart
    KYC and Tracker.
-   The case identifies the student data files and their stated record
    counts.
-   The funnel and operating metrics in this document are transcribed
    from the case appendix.

### Additional requirements taken from the uploaded core-problem and evaluation guide
- The fundamental framing is broken B2B unit economics and operating drag, not simply lack of an app.
- It identifies technical jargon, unbundled products and confusing PDF quotes as causes of quote-acceptance drop-off, and calls for deterministic outcome-based bundles.
- It identifies the GSTIN/non-GSTIN activation gap and calls for applicable Udyam, PAN and utility-bill verification paths.
- It identifies field-channel conflict and calls for assisted-digital recovery with partner-code attribution.
- It lists judging checks for catalogue hard constraints, hallucination prevention, KYC edge cases, explicit unbundled consent, purpose limitation, data minimisation, CAC below ₹3,000 and activation under 48 hours.

### Proposed design choices in this document

-   One configurable app for all four segments.
-   The registration and Account Settings business-type flows.
-   The component architecture, database entities and API endpoints.
-   The modular-monolith implementation recommendation.
-   The proposed AI orchestration and deterministic recommendation
    boundary.
-   The detailed order states, data flows, security controls and
    implementation phases.
-   The suggested success targets and demo sequence.

These proposals are intended to turn the case brief into an
implementable product plan. They should be adjusted after inspecting the
actual student ZIP, its README, and the catalogue's precise eligibility
and dependency rules.
