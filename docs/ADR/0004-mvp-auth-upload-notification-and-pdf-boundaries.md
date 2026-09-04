# ADR 0004: MVP authentication, uploads, notifications, and PDF boundaries

- Status: Accepted
- Date: 2026-09-05

## Context

The owner-only MVP needs secure owner access, sensitive KYC uploads, operational notifications, and invoice/report PDFs without prematurely committing to vendors or asynchronous infrastructure.

## Decisions

- Owner authentication uses mobile OTP with email/password fallback through Supabase Auth.
- KYC MVP accepts exactly one Aadhaar-or-PAN identity-proof file, using a short-lived, server-issued upload token. Passport, address-proof, and rental-agreement uploads are out of scope. The server accepts only PDF/JPEG/PNG files up to 10 MB, and malware scanning is mandatory: if scanning is unavailable or fails, reject the upload rather than accept or silently quarantine it.
- Notification work is blocked until an SMS vendor is selected. In-app-only delivery is not the MVP substitute.
- MVP invoice/report PDF generation is synchronous and bounded. Queued generation is deferred.
- Preserve the approved Supabase Auth/Postgres/Storage stack, UUIDs, owner-only MVP, one-property UI with a multi-property-ready schema, immutable invoice snapshots, atomic CSV imports, KYC deletion tombstones, retained operational history, and owner-selected overpayment credit/refund treatment.

## Consequences

- API contracts must distinguish upload-token issuance from upload completion and enforce owner/property scope.
- Deployment cannot enable notification workflows until the SMS vendor decision is recorded.
- PDF endpoints need explicit size/time bounds and safe timeout handling.
- Hosting vendor, the monthly scheduler's automation mechanism/job runner, and detailed retention/legal policy remain **UNKNOWN — REQUIRES DECISION**; the invoice timing policy itself (1st of month, due on the 5th) is decided separately in ADR 0005.
