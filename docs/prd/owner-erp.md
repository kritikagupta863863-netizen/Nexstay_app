 # PRD — Nexstay Owner ERP (MVP)

**Product:** Nexstay · **Module:** Owner ERP (PG Management System)
**Author:** Drafted by Nexstay team · **Status:** Draft v0.1 (pre-build)
**Last updated:** 2026-09-05
**Related docs:** `../product_pdfs/NEXSTAY Overview.pdf`, `../product_pdfs/NEXSTAY Business Plan.pdf`, `../product_pdfs/Nexstay Pitch Deck - BeyondX.pdf`

---

## 1. Background and context

Nexstay's three pillars (per Overview PDF) are:
1. **PG Management System** (owner-side ERP) ← this PRD
2. PG Marketplace (discovery)
3. Tenant Living App (resident experience)

This PRD scopes pillar **#1 only**. The ERP is what owners pay the **bed-based SaaS subscription** for (Starter ₹4,999 / Growth ₹8,999 / Enterprise ₹14,999+ per the Business Plan PDF). Without a credible ERP, the recurring-revenue model has no foundation.

Today, Indian PG owners run their business on **WhatsApp + Excel + paper + calls** (Business Plan, page 1). That creates revenue leakage, missed rent, lost records, and zero analytics. Nexstay's ERP replaces that workflow end-to-end.

## 2. Goal

Ship an **MVP web application** that lets a single PG owner manage **one property in the MVP UI (≤100 beds)** end-to-end — rooms, tenants, rent collection, expenses, complaints, invoices, reports, and exports — and replace their Excel/WhatsApp workflow in **under 14 days of onboarding**. The database must be multi-property-ready.

Out of goal for this PRD: tenant portal/self-service, marketplace, multi-property UI, electricity billing, public property profile, AI profit coach, smart access, embedded finance.

## 3. Non-goals (this PRD)

See §13 — explicit out-of-scope list. Anything not in the in-scope checklist below is not built in MVP.

## 4. Target user and primary jobs

### 4.1 Persona — "Suresh"

- **Name:** Suresh (placeholder)
- **Role:** Owner-operator of 1–3 PGs in a Tier-1/Tier-2 city (Kanpur, Lucknow, Noida, Delhi NCR)
- **Size:** 30–100 beds per property
- **Tech comfort:** Uses WhatsApp, Google Sheets, Paytm/UPI; rarely opens a laptop; **primary device is Android**
- **Pain:** Spends 2–4 hours/day on rent follow-ups, complaint messages, and ledger updates. Has no real view of monthly profit.

### 4.2 Primary jobs-to-be-done

1. "When rent is due, remind every tenant and record who paid."
2. "When a tenant raises a complaint, log it, route it, and confirm it's fixed."
3. "When I want to know if I'm profitable this month, give me a one-screen answer."
4. "When a new tenant joins, store their KYC, assign them a bed, and generate their first invoice."
5. "When a tenant leaves, close them out, refund the deposit, and free the bed."

## 5. Success metrics (MVP)

| Metric | Target at 90 days post-launch |
|---|---|
| PGs onboarded (paying) | 10–20 |
| Avg beds managed per PG | 40–80 |
| Weekly active owners | ≥ 70% of onboarded |
| Owner-reported time saved vs Excel/WhatsApp | ≥ 2 hrs/day (self-reported) |
| Monthly churn | < 10% |
| MRR at day 90 | ≥ ₹50K (≈ 10 Starter plans) |

A PG is considered **onboarded** when: (a) property + room + tenant data loaded, (b) first invoice generated through Nexstay, (c) at least one rent payment recorded through Nexstay.

## 6. In-scope features (MVP)

Each feature gets a `P0 / P1 / P2` priority. **P0 = must ship.** P1 = ships within 4 weeks of MVP launch. P2 = later this quarter.

### 6.1 Onboarding and property setup — P0

- Owner signup with mobile OTP + email/password fallback
- Owner onboarding wizard (3 steps): create property → add floors/rooms/beds → invite first tenant
- Property profile: name, address (manual + Google Maps link), amenities checklist (WiFi, food, AC, laundry, power backup, CCTV, parking, etc.), rules, security deposit amount, notice period, food details, 6–12 photos

### 6.2 Room and bed management — P0

- **Hierarchy:** Property → Floor → Room → Bed (this is the unit of billing per Business Plan)
- Per-bed attributes: bed label (e.g. "R2-B3"), sharing type (single / double / triple / 4+), monthly rent, attached bathroom (Y/N), AC (Y/N)
- **Bulk room creation** (e.g. "create 10 double-sharing rooms on Floor 2 in one click")
- Bed status: `vacant` / `occupied` / `reserved` / `maintenance`
- Visual floor-plan grid (text/table MVP, real plan view V2)

### 6.3 Tenant management — P0

- Tenant record: name, phone, email, photo, exactly one encrypted identity-proof upload (Aadhaar or PAN) and its proof type, emergency contact, and status. Aadhaar/PAN numbers are not stored. Check-in/out dates, assigned bed, rent, deposit, and agreement end date are retained on a separate Stay/lease record.
- **Tenant lifecycle states:** `prospect → active → notice_period → checked_out`
- Move-in flow: pick vacant bed → enter KYC → set deposit + rent → generate first invoice → mark bed occupied
- Move-out flow: capture notice date → calculate refund (deposit − dues − damages) → mark bed vacant → close and retain the Stay/lease record
- **Tenant history** per bed (everyone who ever lived there); operational history remains after checkout, while the KYC file is deleted and only a minimal deletion tombstone is retained
- Search/filter tenants by name, phone, bed, status

### 6.4 Rent collection and invoicing — P0

- Monthly rent invoices must be generated for every active tenant, with owner preview/manual trigger. MVP PDF generation is synchronous and bounded; queued generation is deferred. The scheduler mechanism is UNKNOWN — REQUIRES DECISION.
- Invoice line items: base rent, food, laundry, other charges, previous dues; electricity billing is deferred
- Issued invoice totals and line-item snapshots are immutable.
- Invoice statuses: `draft → issued → partially_paid → paid → overdue`
- **Payment recording:** owner records cash/UPI/bank-transfer amount + date + reference. Manual overpayments require an explanation and an owner-selected `credit_balance` or `refund_due` resolution for each payment. No payment gateway in MVP.
- CSV imports validate every row before commit and reject the entire batch if any row is invalid.
- Rent **due reminders** are a deferred/blocked workflow: SMS delivery cannot be enabled until a vendor is selected, and in-app-only delivery is not the MVP substitute
- Overdue aging report (0–30, 31–60, 61–90, 90+ days)
- Downloadable PDF invoice (per-tenant and bulk zip), generated synchronously and within an MVP bound from server-side HTML; queued generation is deferred

### 6.5 Expense tracking — P0

- Expense categories (predefined): electricity, food/provisions, maintenance, staff salary, internet, repairs, water, gas, miscellaneous
- Log expense: amount, date, category, vendor, optional photo of bill, notes
- Recurring expenses: e.g. internet ₹1,500/mo (auto-logged)
- Per-property and per-month totals

### 6.6 Electricity billing — Deferred

- Per-meter kWh entry (one meter per property or per floor — configurable)
- Per-tenant split: flat split across beds (MVP) or sub-meter (V2 with hardware)
- Auto-added to next month's invoice

### 6.7 Complaint management — P0

- Owner records a complaint received from a tenant through existing channels: category (plumbing / electrical / cleanliness / wifi / food / other), description, optional photo, priority (low/med/high by owner)
- Owner sees complaints in a kanban: `open → in_progress → resolved → closed`
- Each complaint has activity log (notes, photos, status changes)
- Owner can add notes; tenant status updates are deferred/blocked until the SMS vendor is selected
- Resolution SLA timer (configurable per category)

### 6.8 Notifications — P0

- Channels: SMS via an abstract provider integration (vendor **UNKNOWN — REQUIRES DECISION**); all notification work is deferred/blocked until selection, and in-app-only is not the MVP substitute
- Future triggers after vendor selection: rent due (day 1, day 5), rent received, invoice issued, complaint status change, notice-period acknowledgement, owner announcement
- Future owner announcement: broadcast message to "all tenants" / "specific floor" / "specific room"

### 6.9 Dashboard (owner home) — P0

One-screen answer to "how is my PG doing this month":
- **This month:** revenue collected, rent pending, expenses, **estimated profit**, occupancy %
- **Bed grid:** color-coded (green=paid, yellow=pending, red=overdue, grey=vacant)
- **Open complaints** count
- **Top 3 things needing action** (e.g. "5 tenants overdue", "WiFi complaint open 3 days", "2 beds vacant 30+ days")
- Trend chart: revenue vs expenses last 6 months

### 6.10 PG public profile — Deferred

The Overview PDF (§1, "PG Profile Management") and Marketplace PRD both need a clean property page. For the MVP, owners maintain their public profile (photos, amenities, food, rules, deposit) inside the ERP so it's ready when the marketplace goes live.

### 6.11 Employee / staff management — P2

- Staff records: name, role (manager / cook / cleaner / guard), salary, attendance
- MVP keeps this lightweight: just a directory + salary expense log
- Full attendance workflow is V2

### 6.12 Reports and exports — P0

- Monthly P&L (revenue − expenses) per property
- Occupancy trend (last 12 months)
- Tenant ledger (all payments and dues for one tenant, exportable PDF/CSV)
- Tally-style cash book export (CSV)

### 6.13 Owner auth and access — P0

- Mobile OTP + email/password
- One owner = one account; multiple staff can be added later as **sub-users with role-based access** (deferred to V2)
- "Forgot password" via OTP
- Session timeout after 30 days idle

## 7. User experience — key flows

### 7.1 Onboarding (Suresh's first 10 minutes)

1. Lands on signup → enters phone → receives OTP → password set
2. Wizard step 1: "Tell us about your PG" (name, address, deposit, notice period)
3. Wizard step 2: "Add your rooms" — pick "bulk create" → "10 double-sharing rooms on Floor 1, rent ₹8,000 each" → created
4. Wizard step 3: "Add your first tenant" → tenant form → assign bed R1-B2 → invoice auto-generated → done
5. Lands on dashboard, sees "Welcome, Suresh. You have 1 active tenant, ₹8,000 due on the 1st."

### 7.2 Rent day (the 1st of the month) — Illustrative future/deferred flow

- Illustrative scheduler example (not a fixed implementation): invoices generated for all active tenants, status `issued`
- 8:05 AM: **Deferred/inconsistent with MVP:** SMS sent to each tenant: "Your rent of ₹8,000 is due on 5 Aug. Pay via UPI to …" (blocked until vendor selection)
- Suresh opens app → bed grid shows 9 yellow + 1 green (already paid cash)
- Tenant pays via UPI, sends screenshot on WhatsApp → Suresh taps the bed → "Mark paid" → uploads screenshot → done
- Illustrative future reminder schedule: re-sends reminder to still-yellow beds (deferred/blocked in MVP)

### 7.3 Complaint (water leakage) — Owner-only MVP; notification step deferred

- **Deferred tenant self-service:** Tenant fills web form: "Water leak in bathroom, urgent" + photo. In MVP, the owner records the complaint received through existing channels.
- Owner sees red card on dashboard → drags to `in_progress` → assigns plumber (notes) → after fix, drags to `resolved` → **deferred/blocked SMS** "Your complaint #C-204 is resolved"

## 8. Functional requirements — detail

### 8.1 Data model (high level)

- `User` (owner)
- `Property` (one visible in MVP UI; schema supports multiple per owner)
- `Floor` (optional grouping)
- `Room`
- `Bed` (unique per property)
- `Tenant` (lifecycle states)
- `BedAssignment` (tenant ↔ bed over time, supports history)
- `Invoice` (monthly, per tenant)
- `InvoiceLineItem`
- `Payment` (against invoice)
- `Expense` (recurring or one-off)
- `Complaint` + `ComplaintActivity`
- `Notification` (future/deferred) + `NotificationLog` (SMS sent, status); notification workflows are blocked in MVP pending vendor selection
- `Announcement` (broadcast)
- `AuditLog` (who changed what, when)

### 8.2 Business rules

- A bed can have **only one active assignment** at a time (DB-enforced).
- Rent due date defaults to the **5th** of each month (configurable per property).
- Security deposit refund on move-out = deposit paid − unpaid invoices − damage deductions (owner enters damage amount with photo).
- Overdue = invoice issued ≥ 5 days ago and not fully paid.
- Manual overpayments are permitted only with a required explanation and an owner-selected `credit_balance` or `refund_due` resolution per payment.
- Soft delete only — no hard deletes in MVP (audit trail matters for paid invoices).

### 8.3 Permissions

- Single role `OWNER` in MVP. All data scoped to `property_id` → owner check on every request.
- `STAFF` role is V2.

### 8.4 Audit

- Every mutation (create/update/delete) on Tenant, Invoice, Payment, Complaint logs `who, when, before, after`.
- Owners can see audit log for their own property (basic view in MVP).

## 9. Non-functional requirements

| Area | Requirement |
|---|---|
| **Platform** | Installable, online-only mobile-responsive web app (PWA). No offline data entry or synchronization. Native iOS/Android deferred. |
| **Browsers** | Latest 2 versions of Chrome, Safari, Edge, Samsung Internet |
| **Primary device** | Android phone, 4G |
| **Performance** | Dashboard < 2s on 4G; invoice generation < 5s for 100 beds |
| **Availability** | 99% during IST business hours; nightly maintenance window 02:00–04:00 IST |
| **Security** | TLS 1.2+; bcrypt password hashing; OTP rate-limited; KYC identity proof encrypted at rest; signed URLs for ID-proof downloads; role-based authorization |
| **Privacy** | Store only proof type and encrypted uploaded KYC file; do not store Aadhaar/PAN numbers; auto-delete the file at tenant checkout; never log the file; access logged. Compliant with DPDP Act 2023 spirit (full compliance in V2) |
| **Data residency** | India preference where available; exact hosting provider/region is **UNKNOWN — REQUIRES DECISION** |
| **Backup** | Daily DB snapshot, 30-day retention |
| **Scalability** | MVP targets 1,000 PGs × 100 beds = 100K beds. Architecture should not block scaling to 10K PGs without redesign |
| **Accessibility** | WCAG 2.2 AA for owner screens |
| **i18n** | English-only in MVP; Hindi localization deferred |
| **Currency** | INR only; amounts stored in paise (integer) |
| **Time zone** | Asia/Kolkata everywhere |
| **Logging** | Structured JSON logs, request-id propagated |
| **Observability** | Basic: uptime, error rate, p95 latency. APM tool in V2 |

## 10. Tech stack (proposed — open for review)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui (proposed).
- **Backend, database, auth, and file storage:** Supabase (approved). **SMS vendor, Next.js hosting vendor, and scheduled-job implementation/deployment:** UNKNOWN — REQUIRES DECISION. PDF invoices and reports use bounded synchronous server-side HTML-to-PDF generation for MVP; queued generation is deferred.

Rationale: minimizes infra cost at MVP scale; Postgres gives clean schema for audit + reporting; Next.js gives SEO-friendly public PG profiles when marketplace lands.

## 11. Integrations

Provider names below are candidates only; the SMS vendor is UNKNOWN — REQUIRES DECISION.

| Integration | MVP | V2 |
|---|---|---|
| SMS (vendor not selected) | Blocked pending decision | ✅ |
| WhatsApp Business API | ❌ | ✅ |
| Payment gateway (Razorpay) | ❌ | ✅ (UPI auto-collect + auto-reconcile) |
| Google Maps (property pin) | ✅ (link only) | ✅ (embedded) |
| E-sign (Leegality / Digio) | ❌ | ✅ |
| Accounting (Tally/Zoho export) | CSV (P1) | API |
| Smart lock (Yale/Godrej) | ❌ | ✅ |
| Sub-meter hardware | ❌ | ✅ |

## 12. Open questions / assumptions to confirm

These are the decisions I made while drafting — please mark each as ✓ / ✗ / change:

⚠️ 1. MVP is **web (responsive)**, not native mobile. (V2 wraps into RN.)
⚠️ 2. MVP UI exposes **one property per owner account**; the database is multi-property-ready.
⚠️ 3. **Payments are recorded manually** in MVP; no Razorpay. (Gateway onboarding is non-trivial and PG owners currently collect via UPI/cash anyway.)
⚠️ 4. **AI profit suggestions are V2.** MVP has analytics + rule-based nudges only ("3 beds vacant 30+ days → consider lower rent").
⚠️ 5. PWA is installable but **online-only** in MVP; no offline data entry or synchronization.
⚠️ 6. **English-only** in MVP; Hindi localization is deferred. Regional languages later.
⚠️ 7. **INR only**, India only, IST.
⚠️ 8. **GST treatment is UNKNOWN — REQUIRES DECISION**; do not assume inclusion or exclusion in MVP invoices.
⚠️ 9. **Electricity billing is deferred**; no electricity billing logic ships in the first launch.
⚠️ 10. **WhatsApp Business API** deferred to V2; MVP notification delivery remains blocked until an SMS vendor is selected.

## 13. Out of scope (explicit non-goals)

- ❌ Tenant portal, tenant self-service, and tenant-facing mobile app
- ❌ PG Marketplace / discovery (separate PRD)
- ❌ Smart roommate compatibility
- ❌ Digital rental agreement e-sign
- ❌ Smart lock / IoT integration
- ❌ Embedded finance / tenant credit scores
- ❌ AI WhatsApp assistant for lead qualification
- ❌ Multi-language beyond English/Hindi
- ❌ Native iOS / Android apps
- ❌ Multi-property UI and chain operations (schema remains multi-property-ready)
- ❌ Staff / sub-user roles with permissions (basic staff directory only)
- ❌ Payment gateway integration
- ❌ BeyondX super-admin panel (operations dashboard for the founders)
- ❌ GST / TDS compliance
- ❌ Offline data entry and synchronization
- ❌ AI profit coach / predictive analytics
- ❌ Public PG marketing pages / SEO (only minimal owner-side profile data capture)

## 14. Suggested build order

A solo/small-team schedule assuming one founder-dev + one designer + occasional help:

| Phase | Weeks | Deliverable |
|---|---|---|
| **0 — Foundation** | 1–2 | Repo, CI/CD, auth, DB schema, layout shell |
| **1 — Core data** | 2–4 | Property + Floor + Room + Bed + Tenant CRUD; onboarding wizard |
| **2 — Money** | 4–7 | Expense tracking, invoice generation (cron + manual), payment recording, dashboard cards |
| **3 — Operations** | 7–9 | Owner-entered complaint management, notifications, announcements |
| **4 — Polish** | 9–10 | Performance, mobile QA, reports/exports, basic analytics charts, audit log view |
| **5 — Pilot** | 10–12 | Onboard 5–10 friendly PGs in Kanpur; weekly feedback loops |
| **6 — Public beta** | 13+ | Open signup to first 100 PGs |

## 15. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Owner won't enter data manually | High | Bulk CSV import + assisted onboarding call in pilot |
| Adoption suffers because owners must enter tenant interactions | Medium | Keep owner-entered records and notifications fast; revisit tenant portal only as a separately approved roadmap item |
| Invoice accuracy bugs destroy trust | Medium | Strong unit tests on invoice engine; manual "preview invoice" before issuing |
| SMS cost eats margin at small scale | Medium | Negotiate MSG91 volume; cache templates; cap to 2 SMS/tenant/month |
| Owners want Razorpay before V2 | Medium | Make this a V2 gating decision with a waitlist |
| ID-proof storage raises DPDP concerns | Medium | Encrypt at rest, signed URLs, delete-on-move-out by default |

## 16. Glossary

- **PG** — Paying Guest accommodation (Indian co-living model)
- **Bed** — the unit of billing per Nexstay's bed-based pricing
- **KYC** — Know Your Customer documents (Aadhaar, PAN)
- **ARR / MRR** — Annual / Monthly Recurring Revenue
- **Owner** — Nexstay customer (PG operator). Same person as the SaaS subscriber.
- **Tenant** — resident of a PG (not the Nexstay customer)
- **DPDP** — Digital Personal Data Protection Act, 2023

---

**Sign-off needed before build starts:**
- [ ] Founder confirms the 10 assumptions in §12
- [ ] Designer produces wireframes for the 3 flows in §7
- [ ] Pricing tier (₹4,999 / ₹8,999 / ₹14,999) confirmed
- [ ] SMS provider chosen (**UNKNOWN — REQUIRES DECISION**; no default vendor)
- [ ] Hosting provider and region confirmed (**UNKNOWN — REQUIRES DECISION**; India-first is a preference, not an approved provider)
