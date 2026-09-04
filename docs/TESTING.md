# Testing strategy and gate baseline

## Current status

This is a documentation-first repository. No application, package manifest, test runner,
database, or automated test suite exists yet. The decisions and baseline below are the
approved first implementation gate; they do not claim that tests have run.

## Approved testing gate decisions

- The first vertical slice is owner-only and covers one property. The database remains
  multi-property-ready, and every resource must be scoped by owner and property.
- The canonical first slice is: owner email/password authentication → create one property
  → floors/rooms/beds → issue a short-lived KYC upload token and upload one clean fixture
  → create tenant/stay → generate the first invoice → record exact payment → reconcile
  the dashboard → logout → verify protected access is denied.
- Mobile OTP is tested separately only after an SMS vendor/provider is selected. It is not
  a substitute for the email/password baseline.
- Supabase PostgreSQL, Supabase Auth, and Supabase Storage are the approved backend
  direction. Tests must use isolated fixtures and must not depend on pre-existing data.
- Security tests are server/API-level where possible. A valid record ID alone must never
  bypass owner/property authorization.
- The MVP remains English-only, owner-only, online-only PWA behavior; tenant portal,
  offline data entry, offline synchronization, and extra KYC document types are out of
  scope.

## First vertical-slice test baseline

### Required journey

1. Create/login an owner with email/password.
2. Create exactly one property, at least one floor, room, and bed.
3. Request a short-lived upload token and upload exactly one clean PDF, JPEG, or PNG
   fixture within the approved 10 MB limit. Do not store an Aadhaar/PAN number.
4. Create a tenant and active stay, assign a vacant bed, and preserve rent/deposit
   snapshots.
5. Generate the first invoice and verify immutable line-item and total snapshots.
6. Record an exact payment and verify invoice balance/status and payment linkage.
7. Verify dashboard occupancy, invoice, payment, and reconciliation totals agree with the
   underlying records.
8. Log out, then verify protected routes/API calls reject access until authentication is
   restored.

### Required negative and invariant coverage

- RLS/authorization: another owner cannot read or mutate the property, bed, tenant,
  stay, invoice, payment, dashboard, or KYC object by changing IDs; cross-property access
  is denied as well.
- Authentication: invalid credentials, missing session, expired session, and logout
  behavior return the expected non-leaky denial response.
- Occupancy: a bed cannot have two active stays; assigning a non-vacant bed is rejected;
  checkout/history does not erase retained stays or assignments.
- Finance: money uses integer minor units; exact payment reconciles to zero balance;
  issued invoice totals and line items do not change when source rent/configuration changes;
  overpayment requires an explanation and `credit_balance` or `refund_due` choice.
- KYC: reject missing/expired/forged upload tokens, wrong owner/property scope, extra
  files, unsupported types, oversized files, failed malware scans, and uploads when
  scanning is unavailable. Never silently quarantine or accept rejected files.
- CSV import: validate every row before commit; one invalid row rejects the entire batch
  and persists no rows.
- PDF/report/export: synchronous generation is bounded and returns a safe timeout/failure
  response without renderer internals. The numeric time/size limits are not yet final.
- PWA/accessibility: verify online-only behavior (no offline writes or synchronization),
  install/update behavior, responsive navigation, and WCAG 2.2 AA checks including
  keyboard focus, labels, announcements, contrast, semantic landmarks, and non-color
  status cues.

## Test levels and execution rules

- **Unit:** validation, money/rent calculations, invoice due logic, occupancy transitions,
  import validation, and error mapping.
- **Integration:** full API/auth/RLS/database/storage behavior against isolated test
  infrastructure; include persistence read-back and transaction/rollback assertions.
- **Browser E2E:** Playwright for the vertical slice and accessibility checks once a UI
  exists. Framework-native API tests remain required; browser tests do not replace them.
- **Component:** dashboard reconciliation, property onboarding, tenant/stay forms, KYC
  upload errors, invoice/payment states, and empty/loading/error states.
- Every implementation task touching behavior must run the canonical project test command,
  plus relevant type-check/lint/build checks. A failing command is a failed gate; do not
  weaken assertions to obtain a pass.
- Seed unique test data per test, clean it up or roll back, and never assume shared
  records. External SMS, scheduler, and payment providers are mocked/contract-tested
  until their vendors are selected.

## Mandatory test triggers

New domain logic, validation, authorization/RLS, authentication/session behavior,
occupancy/tenant lifecycle, invoices/payments, KYC/storage, CSV imports, PDF/exports,
notifications, accessibility/PWA behavior, or migrations require targeted tests.

## Open decisions — UNKNOWN — REQUIRES DECISION

These are intentionally not resolved by the testing baseline:

- SMS vendor/provider and OTP delivery integration
- Monthly invoice scheduler mechanism, job runner, and hosting
- Next.js hosting provider and final hosting/data-region choice
- Detailed DPDP/legal retention policy and durations
- GST treatment
- Pricing model
- Final operational/product limits, including the numeric synchronous PDF/export
  request-time and output-size bounds

## Quality bar

Prefer deterministic, focused tests that prove behavior, persistence, security boundaries,
financial/occupancy invariants, and user-visible failures. Record environment constraints,
test command, pass/fail/skip counts, and known gaps; do not represent planned tests as
executed tests.

## Intended tooling

The future stack is expected to use Jest or Vitest for unit tests, React Testing Library
for components, an integration runner appropriate to the selected backend, Playwright for
browser E2E, and linting/type-checking/build validation in CI.
