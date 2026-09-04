# API design

## Current status

No live API implementation exists in the repository. This document describes the intended API layer based on the PRD, SRS, and TODO files.

## Planned API areas

- Authentication endpoints
- Property management endpoints
- Room and bed management endpoints
- Tenant management endpoints
- Invoice and payment endpoints
- Expense endpoints
- Complaint endpoints
- Notification endpoints
- Dashboard and reporting endpoints
- CSV import and PDF/CSV export endpoints

## Documentation rule

All planned routes below are expectations, not implemented code.

## Authentication API (planned)

### `POST /api/auth/signup`
- Purpose: register a new owner account
- Auth: none
- Body: email, phone, password, property fields (likely optional on signup)
- Response: session token or user record

### `POST /api/auth/login`
- Purpose: sign in an owner
- Auth: none
- Body: phone or email and password or OTP token

### `POST /api/auth/otp/request`
- Purpose: start OTP verification
- Auth: none

### `POST /api/auth/otp/verify`
- Purpose: complete OTP verification
- Auth: none

### `POST /api/auth/password/reset`
- Purpose: reset an owner password through Supabase Auth
- Auth: none; rate-limited and token-protected

### `POST /api/auth/logout`
- Purpose: end the active session
- Auth: required

## Property API (planned)

### `GET /api/properties`
- Purpose: list properties for owner
- Auth: required

### `POST /api/properties`
- Purpose: create a property
- Auth: required

### `GET /api/properties/:id`
- Purpose: fetch a property detail view
- Auth: required

## Tenant API (planned)

### `GET /api/tenants`
- Purpose: list tenant records
- Auth: required

### `POST /api/tenants`
- Purpose: create or import tenant record
- Auth: required
- Note: tenant identity is separate from occupancy; bed and tenancy dates are supplied through a stay/lease operation.

### `PATCH /api/tenants/:id`
- Purpose: update tenant profile or status
- Auth: required

### `POST /api/stays`
- Purpose: create a tenant stay/lease and bed assignment
- Auth: required
- Integrity: retain completed stays and assignments; prevent conflicting active assignments.

### `POST /api/tenants/:id/kyc/upload-token`
- Purpose: issue a short-lived, server-authorized upload token for exactly one KYC identity-proof file
- Auth: required; owner/property scope is verified server-side
- Validation: exactly one Aadhaar-or-PAN identity-proof file; only PDF, JPEG, or PNG; maximum 10 MB; passport, address-proof, and rental-agreement uploads are out of MVP scope; no client-supplied storage path or tenant scope is trusted
- Security: malware scanning is mandatory before persistence; reject the upload if scanning is unavailable or fails, and never silently quarantine or accept it

### `POST /api/tenants/:id/kyc/complete`
- Purpose: finalize the tokenized KYC upload and attach the server-validated file reference
- Auth: required; owner/property scope is verified server-side
- Integrity: store proof type and file reference only; never store Aadhaar/PAN numbers

### `POST /api/imports/csv/validate`
- Purpose: validate every row of a CSV import batch before commit
- Auth: required
- Response: structured row and field validation errors; no records are written.

### `POST /api/imports/csv/commit`
- Purpose: commit a previously validated CSV batch
- Auth: required
- Integrity: commit atomically; if any row is invalid, reject the entire batch and write no rows.

## Invoice API (planned)

### `POST /api/invoices/generate`
- Purpose: generate monthly invoice for one or many tenants
- Auth: required
- MVP behavior: synchronous and bounded; return a completed result or a safe timeout/error. Queued generation is deferred.
- Timing policy (decided): one invoice per active tenant on the 1st of each month, default due date the 5th, idempotent per tenant/month (no duplicate invoices on rerun). The scheduler mechanism/job runner that triggers this automatically remains UNKNOWN — REQUIRES DECISION; the owner can also preview and manually trigger generation regardless of the scheduler decision.

### `GET /api/invoices`
- Purpose: list invoice records
- Auth: required

### `POST /api/payments`
- Purpose: record payment against an invoice
- Auth: required
- Validation: manual overpayment requires an explanation and an owner-selected resolution of `credit_balance` or `refund_due` for that payment.
- Invoice totals and line-item snapshots are read-only after issuance.

## Expense API (planned)

### `GET /api/expenses`
- Purpose: list expenses
- Auth: required

### `POST /api/expenses`
- Purpose: add an expense
- Auth: required

## Complaint API (planned)

### `GET /api/complaints`
- Purpose: list complaints by status and ownership scope
- Auth: required

### `POST /api/complaints`
- Purpose: owner records a complaint received from a tenant
- Auth: owner required

### `PATCH /api/complaints/:id`
- Purpose: update status or add notes
- Auth: required

## Error handling expectations

- Standardized JSON error response format
- Structured validation messages
- Safe error messaging for unauthorized access
- Clear HTTP status codes
- Report and export responses must support the approved CSV/PDF outputs.
- PDF invoices and reports are generated synchronously server-side from HTML within a documented MVP size/time bound; queued generation is deferred.
- The monthly invoice scheduler's automation mechanism/job runner remains an implementation/deployment decision (UNKNOWN — REQUIRES DECISION); the 1st/5th timing policy itself is decided.

## Security expectations

- All protected routes require authentication and authorization
- Tenant-level read access is deferred from the owner-only MVP; if introduced later, it must be filtered by tenant or property ownership
- External document or media uploads must be access-controlled
- KYC uploads must use server-issued, short-lived upload tokens and enforce PDF/JPEG/PNG and 10 MB limits before persistence.
- KYC file deletion at checkout must be server-side and idempotent, with only a minimal deletion tombstone retained.
- Notification delivery is blocked until an SMS vendor is selected; in-app-only notifications are not the MVP substitute.

## Decided scheduling policies

- Invoice generation timing and default due date (1st of month, due on the 5th, with reminders on the 1st and 5th) are decided; only the automation mechanism is not.
- All scheduled operations use `Asia/Kolkata`.

## Unresolved implementation decisions

- Monthly invoice scheduler mechanism, job runner, and hosting (timing above is decided; the automation mechanism is not): **UNKNOWN — REQUIRES DECISION**
- SMS vendor/provider: **UNKNOWN — REQUIRES DECISION**
- Detailed DPDP/legal retention policy: **UNKNOWN — REQUIRES DECISION**
- Prefer India-based hosting and data regions where available; the exact Next.js hosting provider remains **UNKNOWN — REQUIRES DECISION**.
