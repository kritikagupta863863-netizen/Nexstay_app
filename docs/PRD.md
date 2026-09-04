# Product Requirements Document (PRD)

## Product vision

NexStay is a digital operating system for PG owners in India, providing a faster and more reliable way to run a property than WhatsApp and spreadsheets.

## Problem statement

Indian PG owners manage key operational tasks across rooms, tenants, rent collection, complaints, and expenses using disconnected tools that are manual and error-prone. This leads to missed rent, poor visibility, operational friction, and lack of decision support.

## Target users

### Owner-operator persona

- Manages 1-3 properties
- Runs a property with 30-100 beds
- Uses a mobile/tablet-first responsive web workflow; desktop and laptop layouts are outside the design scope, and native mobile apps are out of scope
- Needs quick operational visibility and follow-up

### Tenant persona

- Resides in a PG
- Tenant portal and tenant self-service are deferred from MVP. Owners enter tenant records and complaints; notification workflows remain blocked pending SMS vendor selection.

### MVP language

- MVP UI and documentation-facing product copy are English-only.
- Hindi localization is deferred and is not part of MVP acceptance.

### Unknowns

The repository does not provide a formal product team structure, revenue model details beyond the pricing plan, or complete persona research beyond the Suresh-style owner operator.

## Core use cases

1. Create a property and configure room inventory.
2. Add or import tenants and assign beds.
3. Generate monthly rent invoices.
4. Track payment collection and overdue aging.
5. Log expenses and view profit trends.
6. Record complaints; notification delivery is blocked pending SMS vendor selection.
7. Tenant notifications and announcements are deferred/blocked until an SMS vendor is selected; do not treat in-app-only delivery as the MVP substitute.
8. Understand occupancy and revenue using a dashboard.

## Functional requirements summary

### P0 (must ship)

- Owner onboarding and property setup
- Room and bed management
- Tenant lifecycle and KYC
- Rent generation and payment tracking
- Expense management
- Complaint workflow
- Dashboard with monthly metrics
- Validated CSV import
- Synchronous, bounded PDF invoices
- Reports and CSV/PDF exports

### Deferred

- Electricity billing logic — deferred; not part of the first launch
- Public property profile — deferred; not part of the first launch
- Tenant portal and tenant self-service
- Hindi localization
- Notification workflows and owner announcements — deferred/blocked until SMS vendor selection; not active MVP scope

### P2 (future roadmap)

- Staff directory and attendance
- AI-based insights
- Market-facing marketplace features
- Embedded finance and broader automation

## Non-functional requirements

- Mobile-first responsive design
- Practical onboarding within 14 days for one property
- Data integrity for monthly rent and tenant lifecycle state
- Role-scoped tenant and owner access
- Online-only operation; PWA installability does not include offline data entry or synchronization
- Responsive navigation preserves the desktop web information architecture across tablet and mobile browser layouts
- WCAG 2.2 AA is the accessibility target
- Reasonable performance for small and mid-sized property operations
- Secure handling of sensitive tenant documents such as ID proofs

## Business rules

- Access is restricted by `owner_id` and `property_id`.
- The schema is multi-property-ready, while MVP owner UI exposes one property per owner.
- Invoices are mostly monthly; MVP generation is synchronous and bounded. Scheduler mechanism is UNKNOWN — REQUIRES DECISION.
- Payments are recorded manually in the MVP and not processed automatically.
- Manual overpayments are allowed only when the owner supplies an explanation and selects `credit_balance` or `refund_due` for that payment.
- Bed and tenant lifecycle states follow the documented `vacant`, `occupied`, `reserved`, `maintenance` and `prospect`, `active`, `notice_period`, `checked_out` flows.
- Currency uses INR and values are expected to be stored in paise.

## Constraints

- The repository is not an implemented app; requirements are design and planning documents.
- There is no named data residency or compliance strategy in the repo beyond standard Indian PG operations.
- No explicit business KPI or instrumentation strategy is present beyond product goals in the PRD.
- Hosting provider, monthly scheduler mechanism, SMS vendor, detailed legal/DPDP retention, GST treatment, and pricing are **UNKNOWN — REQUIRES DECISION**.

## Out-of-scope items

- Native mobile apps
- Multi-property UI and chain operations in the initial product scope
- Marketplace and discovery features for the MVP
- Tenant portal and tenant self-service in the MVP
- Electricity billing and public property profile are deferred and are not part of the first launch
- Payment gateway integration
- Full e-signature and automation stack
- Many future AI or finance features
- Additional KYC documents beyond exactly one Aadhaar-or-PAN file

## Future capabilities

- Multi-property dashboards
- Tenant app experience
- AI profit coach
- Smart access and automation
- Embedded financial products

## Assumptions

- The product uses an installable, online-only web application with PWA characteristics.
- Supabase is approved for PostgreSQL, authentication, and storage. Next.js is separately deployable; hosting vendor, SMS vendor, and monthly scheduler implementation/deployment remain UNKNOWN — REQUIRES DECISION. PDF invoices and reports use bounded synchronous server-side HTML-to-PDF generation for MVP; queued generation is deferred.
- MVP is owner-only: tenant self-service, Hindi localization, and active SMS notification workflows are not included.

## Status

This PRD is a planning document derived from product PDFs and design assets. It should be treated as a working product specification, not a verified implementation contract.

**Last updated:** 2026-09-05
