# Security requirements

## Security posture

This repository does not yet contain a live application implementation. The security expectations below reflect the intended product requirements and should be treated as the baseline for future implementation.

## Authentication

- Use secure authentication for owner accounts.
- Support mobile OTP and email/password fallback paths through Supabase Auth. Mobile OTP delivery depends on the unresolved SMS vendor/provider selection below; email/password remains available regardless.
- Rate-limit OTP and failed login attempts.
- Require strong session management and explicit logout behavior.

## Authorization

- Every resource must be scoped by owner and property.
- Tenant portal access is deferred from the owner-only MVP; if introduced later, tenants must see only their own data and allowed property information.
- Business rules must not rely on client-side visibility alone.

## Session and token handling

- Never expose tokens in DOM or logs.
- Keep refresh flows secure and explicit.
- Use secure cookies or equivalent session transport based on the implementation stack.

## Secrets and environment variables

- Never hardcode secrets.
- Store all secrets in secure environment management.
- Keep API keys, database URLs, and provider tokens out of source control.

## Input validation

- Validate all user input server-side.
- Sanitize and constrain text, money, IDs, and phone fields.
- Treat all input as untrusted.

## XSS, CSRF, and injection

- Use safe rendering patterns for user-generated content.
- Protect against CSRF when cookies or browser sessions are used.
- Apply safe query construction and use parameterized storage patterns.

## Sensitive data

- Treat KYC documents, phone numbers, and resident records as sensitive.
- Store exactly one identity-proof type and encrypted uploaded file: Aadhaar or PAN only. Do not collect passport, address proof, or rental-agreement files in the MVP, and never store Aadhaar or PAN numbers.
- Auto-delete the uploaded KYC file when the tenant checks out; retain only a minimal deletion-audit tombstone.
- Retain stays, bed assignments, invoices, payments, and complaints after checkout for operational history. MVP deletion applies only to the KYC file.
- Limit document access to authorized personnel.
- Use signed URLs or secure object storage access patterns when files are involved.
- Issue short-lived, server-generated upload tokens for KYC uploads; never accept arbitrary client storage paths.
- Accept only one PDF, JPEG, or PNG KYC file up to 10 MB. Malware scanning is mandatory before persistence; if scanning is unavailable, reject the upload. Reject files that fail scanning; never silently quarantine or accept them.

## API security

- Require authentication for protected endpoints.
- Validate authorization before data mutation.
- Return consistent, non-leaky error responses.
- Use status codes that distinguish client errors from server failures.

## Logging and error exposure

- Never log full credentials, tokens, or tenant documents.
- Log operational events without exposing PII unnecessarily.
- Return generic error messages to end users where appropriate.

## Notification boundary

- Notification work is blocked until an SMS vendor/provider is selected.
- Do not define in-app-only delivery as the MVP substitute. Keep notification contracts/provider integration explicitly pending.

## PDF generation boundary

- MVP invoice and report PDFs are synchronous and bounded by a documented request time/size limit.
- Queued or asynchronous PDF generation is deferred; timeout/failure responses must not expose renderer internals.

## Import and financial integrity

- Validate every CSV row before committing any batch; return validation errors and reject the entire batch if any row is invalid.
- Treat invoice totals and line-item snapshots as immutable after issuance.
- Require an explanation for every overpayment and an owner-selected `credit_balance` or `refund_due` treatment.
- Enforce ownership and tenant isolation at the database/server layer; a valid record ID alone is never sufficient for access.

## Dependency security

- Review dependencies before adding them.
- Keep packages current and follow vulnerability scanning as the product matures.

## Decided scheduling and retention policies

- Monthly invoices are generated on the 1st with a default due date of the 5th; rent reminders are sent on the 1st and 5th. The owner may configure a different due date in a later release.
- All scheduled operations and displayed timestamps use `Asia/Kolkata`.
- Operational database backups use a daily snapshot with 30-day retention and a quarterly-tested restore procedure. This backup retention is distinct from the unresolved DPDP/legal data-retention policy below, which governs how long tenant PII and documents may be kept.

## Unresolved retention decisions

- Detailed DPDP/legal retention policy and retention durations: **UNKNOWN — REQUIRES DECISION**
- Monthly invoice scheduler mechanism, job runner, and hosting (the 1st/5th timing policy above is decided; the automation mechanism is not): **UNKNOWN — REQUIRES DECISION**
- SMS vendor/provider: **UNKNOWN — REQUIRES DECISION**
- Prefer India-based hosting and data regions where available. The exact Next.js hosting provider remains **UNKNOWN — REQUIRES DECISION**.
