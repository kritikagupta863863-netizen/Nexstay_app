# NexStay task board

Last updated: 2026-09-05

## Required

### NS-T001 — Create the future web/PWA application scaffold

- status: Required
- priority: P1
- area: Application foundation
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)
- notes: Framework and providers remain subject to the documented decisions.

### NS-T002 — Define the multi-property-ready database schema and access boundaries

- status: Required
- priority: P0
- area: Database and authorization
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `../docs/DATABASE.md`
- notes: Include owner/property access boundaries.

### NS-T003 — Implement owner authentication and one-property MVP onboarding

- status: Required
- priority: P0
- area: Authentication and onboarding
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

### NS-T004 — Implement owner-only MVP CRUD

- status: Required
- priority: P1
- area: Core operations
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)
- notes: Property, rooms, beds, tenants, invoices, payments, expenses, complaints,
  reports, and exports.

### NS-T005 — Add validated CSV tenant import

- status: Required
- priority: P1
- area: Tenant operations
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `../docs/DATABASE.md`

### NS-T006 — Add PDF invoice generation and report exports

- status: Required
- priority: P1
- area: Billing and reporting
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)
- notes: CSV and PDF exports are required.

### NS-T007 — Enforce the single encrypted Aadhaar-or-PAN move-in proof

- status: Required
- priority: P0
- area: KYC and privacy
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: Store proof type and file only; auto-delete the file at checkout.

### NS-T008 — Enforce explained overpayment resolution

- status: Required
- priority: P0
- area: Payments
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: Require an explanation and owner-selected `credit_balance` or `refund_due`.

### NS-T009 — Add installable, online-only PWA behavior

- status: Required
- priority: P1
- area: PWA
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `../docs/PWA.md`
- notes: Do not implement offline data entry or synchronization.

### NS-T010 — Implement responsive sidebar and bottom navigation

- status: Required
- priority: P1
- area: UX
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

### NS-T011 — Keep the MVP UI English-only

- status: Required
- priority: P1
- area: Localization
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: Hindi localization is deferred.

### NS-T012 — Apply WCAG 2.2 AA acceptance checks

- status: Required
- priority: P0
- area: Accessibility
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `../docs/TESTING.md`

### NS-T013 — Add validation, accessibility, tests, and deployment documentation

- status: Required
- priority: P0
- area: Quality and operations
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

### NS-T014 — Implement the first vertical-slice test baseline

- status: Required
- priority: P0
- area: Testing
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `../docs/TESTING.md`
- notes: Owner email/password auth; one property hierarchy; clean-fixture KYC upload
  token; tenant/stay; first invoice; exact payment; dashboard reconciliation; logout;
  protected-access denial.

### NS-T015 — Add required vertical-slice negative, invariant, export, PWA, and accessibility checks

- status: Required
- priority: P0
- area: Testing
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `../docs/TESTING.md`
- notes: RLS negative tests; financial/occupancy invariants; KYC rejection; atomic CSV
  import; bounded synchronous PDF/export; online-only PWA; WCAG 2.2 AA.

## In progress

### NS-T016 — Complete architecture documentation

- status: Completed
- priority: P0
- area: Architecture
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`

### NS-T017 — Complete future implementation planning and stack decisions

- status: Blocked / decision needed
- priority: P0
- area: Planning
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: `PROJECT-STATUS.md`
- notes: On hold at the user's request; resume only when implementation planning and stack decisions are explicitly reopened.

### NS-T018 — Set up the real application codebase

- status: Completed
- priority: P0
- area: Application foundation
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`
- notes: Initial Next.js + TypeScript App Router shell, responsive owner dashboard, design tokens, scripts, and smoke test added. Backend, database, authentication, PWA, SMS, and hosting remain out of scope.

### NS-T019 — Complete testing gate documentation and first vertical-slice baseline

- status: In progress
- priority: P0
- area: Testing
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: `PROJECT-STATUS.md`

## Completed

### NS-T020 — Complete requirement discovery and PRD drafting

- status: Completed
- priority: P0
- area: Product
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`

### NS-T021 — Complete SRS drafting

- status: Completed
- priority: P0
- area: Requirements
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`

### NS-T022 — Complete design review of the PG management screen set

- status: Completed
- priority: P0
- area: Design
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`

### NS-T023 — Establish the initial engineering documentation layout

- status: Completed
- priority: P0
- area: Documentation
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`

### NS-T024 — Establish the AI coding guidance baseline

- status: Completed
- priority: P0
- area: Documentation
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: 2026-09-05
- source: `PROJECT-STATUS.md`

## Blocked / decision needed

### NS-T025 — Select an SMS vendor/provider

- status: Blocked / decision needed
- priority: P0
- area: Notifications
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: OTP delivery and rent/complaint notification tests remain blocked; in-app-only
  is not an approved MVP substitute.

### NS-T026 — Select monthly invoice scheduler mechanism, job runner, and hosting

- status: Blocked / decision needed
- priority: P0
- area: Scheduling
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: Invoice timing policy is already decided: monthly on the 1st, idempotent per
  tenant/month, default due date the 5th, using `Asia/Kolkata`.

### NS-T027 — Confirm Next.js hosting provider and final hosting/data-region choice

- status: Blocked / decision needed
- priority: P0
- area: Hosting
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: India-based hosting/data regions are preferred where available; provider is
  `UNKNOWN — REQUIRES DECISION`.

### NS-T028 — Confirm detailed DPDP/legal retention policy and durations

- status: Blocked / decision needed
- priority: P0
- area: Legal and privacy
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`

### NS-T029 — Confirm GST treatment

- status: Blocked / decision needed
- priority: P1
- area: Billing
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`

### NS-T030 — Confirm pricing model

- status: Blocked / decision needed
- priority: P1
- area: Commercial
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`

### NS-T031 — Confirm final operational and product limits

- status: Blocked / decision needed
- priority: P1
- area: Operations
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`
- notes: Includes numeric synchronous PDF/export time and size bounds.

## Deferred

### NS-T032 — Defer electricity billing logic

- status: Deferred
- priority: P2
- area: Billing
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

### NS-T033 — Defer public property profile

- status: Deferred
- priority: P2
- area: Product
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

### NS-T034 — Defer tenant portal and tenant self-service

- status: Deferred
- priority: P2
- area: Product
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`

### NS-T035 — Defer multi-property UI and chain operations

- status: Deferred
- priority: P2
- area: Product
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

### NS-T036 — Defer Hindi localization

- status: Deferred
- priority: P2
- area: Localization
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present), `PROJECT-STATUS.md`

### NS-T037 — Defer notification/SMS workflows and active reminders

- status: Deferred
- priority: P2
- area: Notifications
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)
- notes: Deferred until an SMS vendor is selected.

### NS-T038 — Defer extra KYC uploads

- status: Deferred
- priority: P2
- area: KYC and privacy
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)
- notes: Passport, address-proof, rental-agreement, and other uploads beyond one
  Aadhaar-or-PAN file remain out of scope.

## Future

### NS-T039 — Record implementation progress as source code is added

- status: Future
- priority: P1
- area: Project tracking
- created: 2026-09-05 (imported; original date not recorded)
- updated: 2026-09-05
- completed: —
- source: former TODO list (historical import; source file no longer present)

Add only documented, approved work using the instructions in `README.md`.
