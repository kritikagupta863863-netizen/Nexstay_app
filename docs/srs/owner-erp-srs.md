# Software Requirements Specification
## Nexstay Owner ERP MVP

**Product:** Nexstay
**Module:** Owner ERP (PG Management System)
**Document status:** Draft v1.0
**Date:** 25 August 2026
**Owner:** BeyondX / Nexstay team
**Primary source:** `docs/prd/owner-erp.md`

---

## 1. Purpose

Nexstay Owner ERP is a mobile-responsive web application for Indian PG owners. It replaces WhatsApp, Excel, paper records, and manual follow-ups with one system for managing property operations, tenants, beds, rent, expenses, complaints, invoices, and operational reporting.

The MVP must allow one owner to operate one property with up to 100 beds and complete initial onboarding in under 14 days. The platform must be designed so the wider service can scale to approximately 1,000 PGs and 100,000 beds without a fundamental redesign.

## 2. MVP Scope

### 2.1 In scope

- Owner registration using mobile OTP and email/password fallback
- One property visible in the MVP UI per owner account; schema is multi-property-ready
- Property, floor, room, and bed management
- Bulk room and bed creation
- Tenant records, KYC documents, lifecycle, move-in, and move-out
- Monthly invoice generation and manual payment recording
- Expense and recurring-expense tracking
- Complaint recording by the owner based on tenant interactions
- Complaint workflow, activity history, SLA timer, and status notifications
- SMS notifications (blocked until vendor selection; in-app-only is not the MVP substitute)
- Owner announcements
- Owner dashboard, reports, CSV/PDF exports, and audit log
- CSV import and assisted onboarding for pilot customers
- English-only interface support in MVP; Hindi localization is deferred

### 2.2 Out of scope

- PG marketplace and public discovery
- Native iOS or Android applications
- Multi-property dashboards and chain operations
- Tenant portal and tenant self-service
- Electricity billing
- Public property profile
- Payment gateway or automatic UPI reconciliation
- WhatsApp Business API
- AI WhatsApp assistant, AI profit coach, and predictive analytics
- Digital agreement e-signature
- Smart locks, IoT, and sub-meter hardware
- Embedded finance and tenant credit profiles
- Staff sub-users and role-based staff permissions
- GST/TDS compliance
- Offline data entry and synchronization
- BeyondX super-admin panel

## 3. Users and Roles

| Role | MVP permissions |
|---|---|
| Owner | Full access to the owner's property and all ERP functions |
| Tenant | No authenticated portal role in MVP; interactions are represented by owner-entered records and notifications |
| Staff | Not an authenticated application role in MVP; staff may be recorded in the optional directory after launch |
| System operator | Infrastructure/support access only, protected by separate operational controls; not part of the customer application |

Every customer request must be scoped by `owner_id` and `property_id`. A user must never read or mutate another owner's data.

## 4. Assumptions and Decisions

1. Invoices are generated on the 1st of each month and payment is due on the 5th by default.
2. The property owner may configure a different due date in a later configuration release; the MVP default is the 5th.
3. Payments are recorded manually for cash, UPI, or bank transfer. No payment gateway is required for MVP.
4. The ERP is a responsive web application and PWA-ready; native mobile applications are deferred.
5. Supabase is approved for PostgreSQL, authentication, and file storage. Next.js is separately deployable; its hosting vendor remains UNKNOWN — REQUIRES DECISION.
6. MVP move-in requires exactly one identity-proof upload: Aadhaar or PAN. Use a server-issued upload token; accept PDF/JPEG/PNG up to 10 MB and malware-scan where available. Store only the proof type and encrypted uploaded file, never the Aadhaar/PAN number; auto-delete the file at tenant checkout.
7. Currency is INR, monetary values are stored as integer paise, and all scheduled operations use `Asia/Kolkata`.
8. CSV import is included for pilot onboarding because manual data entry is a material adoption risk.

## 5. Functional Requirements

Requirement priorities are **P0** (launch-critical), **P1** (post-launch), and **P2** (later roadmap).

### 5.1 Authentication and onboarding

- **FR-AUTH-001 P0:** The system shall support owner login and signup using mobile OTP.
- **FR-AUTH-002 P0:** The system shall provide email/password fallback and OTP password reset.
- **FR-AUTH-003 P0:** The system shall rate-limit OTP requests and failed authentication attempts.
- **FR-ONB-001 P0:** The owner onboarding wizard shall create a property, add floors/rooms/beds, and invite or create the first tenant.
- **FR-ONB-002 P0:** The system shall show onboarding progress and prevent completion until required property and bed data is valid.
- **FR-ONB-003 P0:** The system shall support validated CSV import for rooms, beds, tenants, and opening balances.

### 5.2 Property and bed management

- **FR-PROP-001 P0:** The system shall represent the hierarchy Property > Floor > Room > Bed.
- **FR-PROP-002 P0:** The owner shall maintain address, amenities, rules, deposit, notice period, food details, and property photos.
- **FR-PROP-003 P0:** The owner shall create rooms and beds individually or in bulk.
- **FR-PROP-004 P0:** Each bed shall have a unique label, sharing type, rent, bathroom flag, AC flag, and status.
- **FR-PROP-005 P0:** Bed statuses shall be `vacant`, `occupied`, `reserved`, or `maintenance`.
- **FR-PROP-006 P0:** The application shall provide a responsive text/table floor grid; a visual plan is deferred.

### 5.3 Tenant management and lifecycle

- **FR-TEN-001 P0:** The system shall store tenant contact details, photo, exactly one Aadhaar-or-PAN identity-proof type and encrypted uploaded file, emergency contact, check-in date, assigned bed, rent, deposit, and agreement end date; it shall not store the Aadhaar/PAN number.
- **FR-TEN-002 P0:** Tenant states shall be `prospect`, `active`, `notice_period`, and `checked_out`.
- **FR-TEN-003 P0:** Move-in shall validate a vacant bed, capture required KYC, set rent/deposit, generate the first invoice, and occupy the bed atomically.
- **FR-TEN-004 P0:** Move-out shall capture notice date, calculate deposit refund, record deductions, free the bed, and archive the tenant.
- **FR-TEN-005 P0:** The system shall retain tenant history for each bed and support search/filter by name, phone, bed, and state.

### 5.4 Invoicing and payments

- **FR-FIN-001 P0:** The system shall generate one monthly invoice for each active tenant; the scheduler mechanism and deployment remain UNKNOWN — REQUIRES DECISION, and the owner shall be able to preview and manually trigger generation.
- **FR-FIN-002 P0:** The owner shall be able to preview and manually trigger invoice generation.
- **FR-FIN-003 P0:** Invoice line items shall support base rent, electricity, food, laundry, other charges, and previous dues.
- **FR-FIN-004 P0:** Invoice states shall be `draft`, `issued`, `partially_paid`, `paid`, or `overdue`.
- **FR-FIN-005 P0:** The owner shall record amount, payment date, method, reference, and optional proof for manual payments; any overpayment requires an explanation and an owner-selected `credit_balance` or `refund_due` resolution.
- **FR-FIN-006 P0:** The system shall send rent reminders on the 1st and 5th, with the 5th treated as the default due date.
- **FR-FIN-007 P0:** The system shall provide overdue aging buckets of 0-30, 31-60, 61-90, and 90+ days.
- **FR-FIN-008 P0:** The system shall generate downloadable per-tenant PDF invoices and bulk ZIP exports synchronously, within a documented MVP bound, using server-side HTML-to-PDF generation; queued generation is deferred.

### 5.5 Expenses and electricity

- **FR-EXP-001 P0:** The owner shall record one-off and recurring expenses with amount, date, category, vendor, bill image, and notes.
- **FR-EXP-002 P0:** Expense categories shall include electricity, food, maintenance, salaries, internet, repairs, water, gas, and miscellaneous.
- **FR-EXP-003 P0:** The system shall calculate monthly and property-level expense totals.
Electricity billing is deferred and has no MVP functional requirements.

### 5.6 Complaints and notifications

- **FR-CMP-001 P0:** The owner shall record a complaint received from a tenant with category, description, optional photo, and priority.
- **FR-CMP-002 P0:** The owner shall manage complaints in states `open`, `in_progress`, `resolved`, and `closed`.
- **FR-CMP-003 P0:** Each complaint shall maintain an immutable activity history of notes, photos, status changes, and timestamps.
- **FR-CMP-004 P0:** The system shall calculate a configurable resolution SLA timer.
- **FR-CMP-005 P0 (deferred/blocked):** The system shall send configured tenant status notifications when status changes only after an SMS vendor is selected; this is not an active MVP workflow.
- **FR-NOT-001 P0 (deferred/blocked):** Notification delivery is blocked until an SMS vendor is selected; transactional SMS is a post-selection capability, and in-app-only delivery is not the MVP substitute.
- **FR-NOT-002 P0 (deferred/blocked):** After vendor selection, notifications may cover rent due, payment received, invoice issued, complaint changes, notice acknowledgement, and announcements.
- **FR-NOT-003 P0 (deferred/blocked):** After vendor selection, owners may broadcast announcements to all tenants, a floor, or a room.

### 5.7 Dashboards and reports

- **FR-DASH-001 P0:** The owner dashboard shall show current revenue collected, rent pending, expenses, estimated profit, occupancy, open complaints, and priority actions.
- **FR-DASH-002 P0:** The dashboard shall show a color-coded bed grid: paid, pending, overdue, and vacant.
- **FR-DASH-003 P0:** The dashboard shall show revenue versus expenses for the previous six months.
- **FR-REP-001 P0:** The system shall export monthly P&L, occupancy trends, tenant ledgers, and cash-book CSV/PDF outputs.
- **FR-REP-002 P1:** The system shall provide an audit-log view for the owner's property.
Public property profile is deferred and has no MVP functional requirement.

### 5.8 Deferred tenant portal

Tenant portal and tenant self-service are deferred from MVP. Tenant interactions are handled through owner-entered records and notifications.

## 6. Core Business Rules

- A bed may have only one active assignment at a time; this must be enforced at database level.
- An invoice becomes overdue when it is unpaid or partially paid at least five days after issue/due date.
- Manual overpayments are allowed only when the owner provides an explanation and selects `credit_balance` or `refund_due` for that payment.
- Deposit refund equals deposit paid minus unpaid invoices minus owner-entered damage deductions.
- Paid invoices and payments cannot be hard-deleted.
- All destructive user actions are soft deletes and must be auditable.
- Invoice generation must be idempotent: rerunning the job cannot create duplicate monthly invoices.
- A payment may exceed the invoice balance only when the owner supplies the required explanation and selects `credit_balance` or `refund_due` for that payment.
- Tenant move-in and bed assignment must succeed or fail as one transaction.
- Scheduled jobs must use IST and must record execution status, duration, and failures.

## 7. Data Requirements

The initial relational model shall include:

`User`, `Property`, `Floor`, `Room`, `Bed`, `Tenant`, `BedAssignment`, `Invoice`, `InvoiceLineItem`, `Payment`, `Expense`, `Complaint`, `ComplaintActivity`, `Notification`, `NotificationLog`, `Announcement`, `AuditLog`, and `FileAsset`.

Required data controls:

- UUID or equivalent non-sequential public identifiers
- Foreign-key constraints and indexes for owner/property/tenant/invoice queries
- Unique active bed assignment constraint
- Monetary fields stored in paise
- Created/updated timestamps and actor identifiers on mutable records
- File metadata separated from object storage paths
- KYC files encrypted at rest and never written to application logs
- KYC files are encrypted and auto-deleted at tenant checkout; only proof type and encrypted uploaded file metadata/reference are retained, never Aadhaar/PAN numbers

## 8. External Platforms and Integrations

Supabase is approved for PostgreSQL, authentication, and file storage. The SMS vendor, Next.js hosting vendor, and monthly scheduler implementation/deployment remain UNKNOWN — REQUIRES DECISION. PDF invoices and reports use bounded synchronous server-side HTML-to-PDF generation for MVP; queued generation is deferred. Notification work is blocked until SMS vendor selection.

### 8.1 MVP integrations

| Capability | Baseline | Requirement |
|---|---|---|
| Web hosting | Separately deployable Next.js application | Hosting vendor UNKNOWN — REQUIRES DECISION |
| Database | Supabase PostgreSQL | Relational storage, row-level security, backups, migrations |
| Authentication | Supabase Auth | OTP and email/password; confirm India SMS support and pricing |
| File storage | Supabase Storage | Encrypted KYC, photos, receipts, and bill images |
| SMS | Provider abstraction | Vendor UNKNOWN — REQUIRES DECISION; support OTP, rent reminders, complaint/status alerts, announcements |
| Maps | Google Maps link | Store a validated map link; no embedded map billing in MVP |
| PDF | Server-side HTML-to-PDF | Invoice PDF and bulk ZIP generation |
| Scheduled jobs | Implementation/deployment choice | Monthly invoices, reminders, recurring expenses, overdue state updates |
| Monitoring | Sentry plus uptime monitor | Error tracking, uptime, p95 latency, job failures |
| Source control/CI | GitHub plus CI provider | Branch checks, migrations, tests, deployment gates |

### 8.2 Deferred integrations

| Integration | Purpose | Deferred reason |
|---|---|---|
| WhatsApp Business API | Automated owner/tenant conversations | Vendor approval, templates, and conversation charges |
| Razorpay or equivalent | Online UPI collection and reconciliation | Payment onboarding and reconciliation complexity |
| Digio/Leegality | Digital agreements and e-signature | Not required for core ERP launch |
| Tally/Zoho APIs | Accounting synchronization | CSV export is sufficient for MVP |
| Google Maps APIs | Embedded map, search, and geocoding | Link-only flow is sufficient initially |
| Smart locks | Automated access | Hardware and installation dependency |
| Sub-meter hardware | Accurate electricity allocation | Hardware integration deferred |
| AI services | Lead qualification, profit coach, predictive occupancy | Rule-based dashboard nudges are sufficient for MVP |

## 9. Technical Architecture

- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui or equivalent accessible component library.
- **Backend:** Next.js server actions/API routes or NestJS; use one consistent validation and authorization layer.
- **Database:** Supabase PostgreSQL with migrations and row-level security backed by server-side owner checks.
- **Storage:** Private bucket with signed, short-lived URLs for KYC and documents.
- **Jobs:** Idempotent scheduled jobs with a job-run table, retry policy, and failure alerting; the deployment mechanism remains UNKNOWN — REQUIRES DECISION.
- **Documents:** Server-side HTML-to-PDF invoice generation with deterministic invoice numbering.
- **Deployment:** Separately deployable Next.js hosting plus Supabase; hosting vendor and data residency are UNKNOWN — REQUIRES DECISION.
- **Environments:** Local, staging, and production; production secrets must never be committed.

## 10. API and Interface Requirements

All APIs shall:

- Validate request bodies, query parameters, and file types server-side.
- Return consistent JSON error objects with request IDs.
- Enforce authenticated owner/tenant authorization on every protected request.
- Use idempotency keys for invoice generation, payment recording, imports, and notification dispatch where retries can duplicate effects.
- Paginate tenant, invoice, payment, complaint, and audit-log lists.
- Limit file size and scan or validate uploaded document types.
- Return timestamps in ISO 8601 while displaying dates in IST.
- Record webhook signatures and delivery status when future integrations are added.

## 11. User Experience Requirements

- Mobile/tablet-first responsive web layout; desktop and laptop layouts are outside the design scope, and native mobile applications are deferred.
- Latest two versions of Chrome, Safari, Edge, and Samsung Internet.
- MVP UI and product copy are English-only; Hindi localization is deferred.
- WCAG 2.2 AA target for owner screens: keyboard access, labels, contrast, focus states, and screen-reader names.
- Every list and workflow must define loading, empty, validation, failure, retry, and success states.
- Dashboard target: usable one-screen answer to revenue, pending rent, expense, profit estimate, occupancy, and urgent actions.

## 12. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | Dashboard loads in under 2 seconds on a representative 4G connection; invoice generation for 100 beds completes within 5 seconds under normal load. |
| Availability | 99% during IST business hours, excluding announced maintenance. |
| Scalability | Architecture supports 1,000 PGs x 100 beds / 100,000 beds without redesign of core entities. |
| Security | TLS 1.2+, secure cookies, bcrypt/managed password hashing, OTP rate limits, server-side authorization, and private storage. |
| Privacy | Aadhaar/PAN access is minimized, encrypted, logged, and governed by retention/deletion controls aligned with DPDP principles. |
| Backups | Daily database snapshot with 30-day retention; restore procedure tested at least quarterly. |
| Timezone | Asia/Kolkata for application display and scheduled jobs. |
| Currency | INR only; values stored as integer paise. |
| Logging | Structured JSON logs with propagated request IDs; no secrets or KYC contents. |
| Observability | Uptime, error rate, p95 latency, SMS delivery, scheduled-job status, and database health. |
| Maintenance | Planned maintenance window 02:00-04:00 IST, with incident communication. |

## 13. Security, Privacy, and Compliance

- Apply least privilege to application, database, storage, and operations accounts.
- Use row-level security and server-side ownership checks; never trust client-provided owner IDs.
- Encrypt data in transit and sensitive files at rest.
- Generate short-lived signed URLs for ID-proof access and record each access.
- Mask sensitive ID numbers in the UI and prohibit KYC values in logs, analytics, and error messages.
- Obtain tenant consent and provide a documented purpose for KYC collection.
- Support correction, export, retention, and deletion workflows subject to legal and audit requirements.
- Rate-limit OTP, login, import, upload, and notification endpoints.
- Run dependency scanning, secret scanning, access review, and security testing before pilot.
- Maintain audit records for tenant, invoice, payment, complaint, and document mutations.
- Confirm legal review for DPDP Act obligations, SMS/DLT registration, terms of service, privacy notice, and data-processing agreements before public launch.

## 14. Testing and Acceptance Criteria

### 14.1 Required testing

- Unit tests for invoice totals, due dates, overdue aging, refunds, overpayment validation, and bed-state transitions.
- Integration tests for authentication, database authorization, invoice jobs, payment recording, file access, SMS dispatch, and owner/property isolation.
- End-to-end tests for onboarding, rent day, move-in, move-out, owner-entered complaint resolution, and CSV import.
- Responsive testing on Android Chrome, iPad/tablet Safari, and Samsung Internet.
- Accessibility testing for keyboard navigation, labels, focus, contrast, and error messaging.
- Load testing for 100-bed invoice generation and dashboard queries.
- Security tests for IDOR, unauthorized property access, upload abuse, OTP abuse, and session expiry.
- Backup restore test before pilot and at least quarterly thereafter.

### 14.2 Launch acceptance criteria

The MVP is accepted when:

1. An owner can create a property and bulk-create rooms and beds.
2. A tenant can be moved into a vacant bed with KYC, deposit, rent, and a first invoice.
3. The monthly job creates exactly one invoice per active tenant and sends configured reminders.
4. An owner can record a partial or full manual payment and the dashboard updates correctly.
5. Move-out calculates a transparent refund and frees the bed while preserving history.
6. An owner can record a complaint and send status notifications after owner action.
7. Dashboard totals reconcile with invoice, payment, and expense records.
8. Owner/property authorization tests demonstrate complete data isolation.
9. PDF invoices, CSV exports, audit logs, backups, and monitoring work in staging.
10. Pilot owners can complete onboarding with assisted support and no P0 defects.

## 15. Cost Model

The figures below are planning estimates in INR, not vendor quotes. They assume India-first MVP delivery, one production application, up to 20 pilot PGs, approximately 2,000 beds during pilot, and Supabase plus separately deployable Next.js hosting as the baseline. Actual costs depend on negotiated plans, message volume, staffing model, taxes, and vendor pricing at purchase time.

### 15.1 One-time MVP build and launch budget

| Cost item | Lean estimate | Planning estimate | Higher estimate |
|---|---:|---:|---:|
| Product engineering | ₹6,00,000 | ₹12,00,000 | ₹24,00,000 |
| UX/UI and design system | ₹1,00,000 | ₹2,50,000 | ₹5,00,000 |
| QA, device, and performance testing | ₹75,000 | ₹1,50,000 | ₹3,00,000 |
| Security/privacy review and penetration testing | ₹75,000 | ₹2,00,000 | ₹5,00,000 |
| Legal, privacy policy, contracts, and DPDP review | ₹50,000 | ₹1,50,000 | ₹4,00,000 |
| Pilot onboarding and CSV migration | ₹50,000 | ₹1,50,000 | ₹4,00,000 |
| Initial infrastructure setup and CI/CD | ₹25,000 | ₹75,000 | ₹2,00,000 |
| **Estimated total** | **₹9,75,000** | **₹21,75,000** | **₹47,00,000** |

These estimates exclude founder salary, office costs, travel beyond pilot activity, GST, and hardware. A founder-led build can reduce cash spend but does not remove the labor cost.

### 15.2 Recurring monthly operating cost

| Cost item | Pilot planning range/month | Notes |
|---|---:|---|
| Next.js hosting and build usage | ₹0-₹5,000 | Planning estimate only; hosting vendor remains UNKNOWN — REQUIRES DECISION. |
| Supabase database, auth, storage, and backups | ₹3,000-₹20,000 | Validate India-region availability and storage/egress tiers. |
| SMS and OTP | ₹2,000-₹15,000 | Depends on OTP, two rent reminders, complaint alerts, announcements, and DLT/template charges. |
| Monitoring, error tracking, uptime | ₹0-₹8,000 | Free tiers may cover pilot; paid plans improve retention and alerting. |
| Email/domain/DNS/CI tooling | ₹1,000-₹5,000 | Depends on providers and seats. |
| Support and assisted onboarding | ₹15,000-₹75,000 | Usually the largest pilot operating cost. |
| Maintenance and engineering reserve | ₹50,000-₹2,00,000 | Bug fixes, security updates, support, and minor improvements. |
| **Estimated monthly total** | **₹71,000-₹3,28,000** | Excludes payment fees and future integrations. |

### 15.3 Usage assumptions for cost planning

At 20 pilot PGs x 60 beds:

- Approximately 1,200 active tenants.
- Up to 1,200 monthly invoices.
- At least 2,400 rent-reminder SMS per month, plus OTP, payment, complaint, and announcement traffic.
- Approximately 2-10 GB initial document/photo storage, plus backups and growth.
- PDF generation concentrated around the 1st and 5th of each month.

At 1,000 PGs x 100 beds:

- Approximately 100,000 active beds at full occupancy.
- Up to 100,000 monthly invoices.
- At least 200,000 rent-reminder SMS per month before other notifications.
- Queue-based job processing, storage lifecycle policies, and a reviewed database tier will likely be required.

### 15.4 Future integration cost categories

| Integration | One-time/setup cost | Recurring or usage cost |
|---|---|---|
| WhatsApp Business API | Provider onboarding, templates, integration engineering | Conversation/template charges and message volume |
| Razorpay or equivalent | Integration, webhooks, reconciliation, compliance setup | Transaction/MDR, refunds, settlement, and dispute costs |
| Digio/Leegality | Agreement templates and integration | Per-document signing charges |
| Google Maps APIs | Embedded map/geocoding development | API request charges after quota |
| Tally/Zoho API | Connector and field mapping | Provider plan/API limits and maintenance |
| Smart locks | Hardware, installation, access integration | Device, connectivity, maintenance, replacement |
| Sub-metering | Hardware, installation, calibration, integration | Connectivity, maintenance, and replacement |
| AI services | Prompt/workflow integration and evaluation | Token/API usage, monitoring, and model changes |

Vendor quotes are required before committing to these items. Hardware pricing also varies substantially by property size and installation conditions.

## 16. Delivery Plan

| Phase | Duration | Output |
|---|---:|---|
| Foundation | Weeks 1-2 | Repository, environments, authentication, schema, layout, CI/CD |
| Core data | Weeks 2-4 | Property, room, bed, tenant CRUD, onboarding, CSV import |
| Money | Weeks 4-7 | Expenses, invoices, payments, dashboard financial cards |
| Operations | Weeks 7-9 | Owner-entered complaints, notifications, and announcements |
| Polish and readiness | Weeks 9-10 | Performance, mobile QA, accessibility, reports, audit logs |
| Pilot | Weeks 10-12 | 5-10 assisted PG onboardings and weekly feedback |
| Public beta | Week 13+ | Expand toward first 100 PGs after P0 acceptance |

## 17. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Owners do not enter data | CSV import, bulk creation, assisted onboarding, and simple responsive web flows. |
| Invoice errors damage trust | Unit tests, preview-before-issue, idempotent jobs, audit trail, and reconciliation checks. |
| SMS costs reduce margin | Cap reminder frequency, use templates, negotiate volume pricing, and monitor delivery. |
| Sensitive KYC data creates exposure | Minimize collection, encrypt, use signed URLs, log access, define retention, and obtain legal review. |
| Managed services do not satisfy India residency | Confirm region availability before production; India-first is a preference and exact hosting remains UNKNOWN — REQUIRES DECISION. |
| Tenant portal is deferred | Use owner-entered records and notifications in MVP; revisit portal only through a separately approved roadmap decision. |
| Scope expands into marketplace/AI/payments | Treat all deferred integrations as separately approved roadmap work. |

## 18. Traceability Summary

| PRD area | SRS coverage |
|---|---|
| Authentication and owner onboarding | FR-AUTH, FR-ONB |
| Property, room, and bed management | FR-PROP |
| Tenant lifecycle and KYC | FR-TEN |
| Rent, invoices, and payments | FR-FIN |
| Expense tracking | FR-EXP |
| Electricity billing | Deferred |
| Complaint workflow | FR-CMP |
| Notifications and announcements | FR-NOT |
| Owner dashboard | FR-DASH |
| Reports and exports | FR-REP |
| Tenant web experience | Deferred |
| Security, privacy, and audit | Sections 7, 10, 12, and 13 |
| Platforms and integrations | Section 8 |
| Costs and rollout | Sections 15 and 16 |

## 19. Sign-off Checklist

- [ ] Founder approves the invoice-on-1st and due-on-5th policy.
- [x] Tenant portal is deferred from MVP; owner-entered records and notifications are the approved interaction model.
- [ ] Supabase region, backup, and data-residency approach are validated.
- [ ] SMS provider and DLT registration approach are selected (**UNKNOWN — REQUIRES DECISION**); in-app-only is not the MVP substitute.
- [ ] Privacy/legal review approves KYC collection and retention.
- [ ] MVP build budget and monthly operating budget are approved.
- [ ] Wireframes cover onboarding, rent day, move-in/move-out, owner-entered complaints, dashboard, and reports/exports.
- [ ] Pilot PG owners and onboarding support process are confirmed.
