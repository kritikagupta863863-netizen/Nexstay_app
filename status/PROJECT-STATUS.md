# Project status

**Last updated:** 2026-09-05

For task-level status, use [`TASKS.md`](TASKS.md). Its
[`JOURNAL.md`](JOURNAL.md) records dated task changes. This document remains the
source of truth for project-level status and approved product/technical decisions.

For a lightweight visual summary, see the internal [`dashboard/`](../dashboard/).
It reads a maintained JSON snapshot and does not automatically capture tool calls.

## Completed

- Requirement discovery and PRD drafting
- SRS drafting
- Design review of the PG management screen set
- Initial engineering documentation layout
- AI coding guidance baseline
- Architecture documentation and pre-build architecture gate
- Initial Next.js application scaffold and responsive owner dashboard shell
- Device preview simulator (phone/tablet) and first Rooms & beds UI slice
- Git repository initialized and pushed to GitHub (`kritikagupta863863-netizen/Nexstay_app`, private, branch `main`)

## In progress

- Testing gate documentation and first vertical-slice baseline
- Database setup, authentication, and domain workflows

## On hold

- Future implementation planning and stack decisions are on hold at the user's request.
- The application is web-only in product scope: mobile/tablet-first; desktop and laptop layouts are not design targets, and no separate native mobile design is planned.

## Planned

- Next.js app scaffold
- Selected PostgreSQL schema and auth integration
- Owner dashboard, reports, and export features
- Installable online-only PWA with responsive sidebar/bottom navigation
- CI/CD setup and deployment pipeline
- Implement the approved first vertical-slice test baseline before expanding scope

## Blocked

- The application shell uses representative preview data until backend workflows are connected
- No production database or authentication integration exists yet
- No production database or deployment configuration exists

## Technical debt

- Requirements are not yet implemented in code
- Security and monitoring baselines are still design-time only
- No automated validation pipeline exists yet
- The testing gate is documented but not yet executable because application code and test
  infrastructure are not present

## Decisions pending

- Reopen future implementation planning and stack decisions when the user requests it
- final stack decision for Next.js production hosting
- India-based hosting/data region preference applies where available; exact Next.js hosting provider remains **UNKNOWN — REQUIRES DECISION**
- SMS vendor will be selected during implementation; integration remains abstract until that build-stage decision
- SMS-dependent features (OTP delivery and rent/complaint notifications) remain blocked until the vendor is selected; in-app-only is not an approved MVP substitute
- MVP language is English-only; Hindi localization is deferred
- Tenant portal and tenant self-service are deferred; MVP is owner-only
- Exactly one Aadhaar-or-PAN KYC file is allowed; extra KYC document designs are deferred/inconsistent with MVP
- exact database schema and migrations (core decisions documented; migrations not yet implemented)

## Recorded database decisions

- UUID primary keys are the default convention for Supabase interoperability.
- Tenant is separate from Stay/lease; completed stays and bed assignments are retained.
- Issued invoices retain immutable totals and line-item snapshots.
- CSV imports validate the full batch before commit and reject the batch on any invalid row.
- Checkout deletes only the KYC file in MVP and retains a minimal deletion-audit tombstone; Aadhaar/PAN numbers are never stored.
- Operational tenant history (stays, invoices, payments, complaints) is retained after checkout.
- Overpayments require an explanation and owner-selected `credit_balance` or `refund_due` treatment.

## Recorded scheduling and operations decisions

- Invoice generation timing: one invoice per active tenant on the 1st of each month, idempotent per tenant/month, default due date the 5th. Reminder timing is reserved for the 1st and 5th, but delivery is blocked until an SMS vendor is selected. Owner-configurable due dates are a later release.
- Timezone: all scheduled jobs and displayed timestamps use `Asia/Kolkata`.
- Backups: daily database snapshot with 30-day retention and a quarterly-tested restore procedure (distinct from the still-unresolved DPDP/legal retention policy below).
- Planned maintenance window: 02:00-04:00 IST, with incident communication.

## Unresolved decisions

- Monthly invoice scheduler mechanism, job runner, and hosting (the timing policy above is decided; the automation mechanism is not): **UNKNOWN — REQUIRES DECISION**
- SMS vendor/provider: **UNKNOWN — REQUIRES DECISION**; selection is planned during implementation
- Detailed DPDP/legal retention policy: **UNKNOWN — REQUIRES DECISION**
- Next.js hosting vendor: **UNKNOWN — REQUIRES DECISION**
- India-based hosting and data regions are preferred where available; this does not decide the provider.
- GST treatment: **UNKNOWN — REQUIRES DECISION**
- Pricing model: **UNKNOWN — REQUIRES DECISION**
- Final operational/product limits, including numeric synchronous PDF/export time and size
  bounds: **UNKNOWN — REQUIRES DECISION**

## Testing gate decisions

- First baseline is owner email/password auth, one property, floors/rooms/beds, clean-fixture
  KYC upload token, tenant/stay, first invoice, exact payment, dashboard reconciliation,
  logout, and protected-access denial.
- RLS negative tests, financial and occupancy invariants, KYC rejection behavior,
  all-or-nothing CSV import, bounded synchronous PDF/export checks, online-only PWA
  checks, and WCAG 2.2 AA checks are required for the first vertical slice.
- OTP delivery is blocked and tested separately only after the SMS vendor is selected during implementation. Rent/complaint notifications remain blocked until then. SMS, scheduler, hosting,
  legal retention, GST, pricing, and final limits remain **UNKNOWN — REQUIRES DECISION**.
- See `../docs/TESTING.md` for the acceptance baseline and explicit out-of-scope boundaries.
