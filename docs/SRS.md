# Software Requirements Specification

## System scope

NexStay's MVP is an owner ERP for a PG with up to 100 beds. It streamlines onboarding, management, finance, tenant operations, and complaint handling.

## Functional requirements

### Authentication and onboarding

- Support owner signup with mobile OTP and email/password fallback.
- Support password reset and rate limiting.
- Allow the owner to establish a property and assign rooms and beds.
- Allow initial tenant onboarding and CSV import.
- MVP user-facing language is English-only; Hindi localization is deferred.

### Property and room management

- Maintain a property > floor > room > bed hierarchy.
- Manage occupancy and room status.
- Allow bulk creation of rooms and beds.
- Track amenities, deposit, notice period, and rules.

### Tenant management

- Store KYC, contact data, check-in dates, rent, deposit, and status.
- Issue a short-lived server upload token for exactly one KYC file; accept PDF/JPEG/PNG up to 10 MB and malware-scan where available.
- The single KYC file is exactly one Aadhaar or PAN proof; passport, address-proof, and rental-agreement uploads are out of MVP scope.
- Support move-in and move-out lifecycle states.
- Maintain tenant history by bed.

### Invoicing and payments

- Generate monthly rent invoices.
- Generate invoice/report PDFs synchronously within an MVP bound; queued generation is deferred.
- Support manual payment recording and due reminders.
- Track overdue buckets and invoice status transitions.

### Expenses and complaints

- Record expenses across categories.
- Track complaint lifecycle and activity history.
- Let owners record complaints; notification delivery is deferred/blocked until an SMS vendor is selected. In-app-only is not the MVP substitute; tenant portal access is deferred.

## Non-functional requirements

- Mobile-first responsive web experience
- Use secure, stateless sessions or equivalent token-based auth
- Restrict data by owner and property
- Use a clear API contract and error handling model
- Provide accessible user flows and keyboard support
- Support an installable, online-only PWA; no offline data entry or synchronization
- Use mobile/tablet web navigation with compact navigation treatment; desktop and laptop layouts are outside the design scope
- Target WCAG 2.2 AA

## User roles

- Owner
- System operator (operational access only)

Tenant records are managed by the owner in MVP; tenant portal access is deferred.
Hindi localization and tenant self-service are deferred.

## Input and output expectations

- Forms should validate required fields and monetary values.
- Reports and invoices must support PDF and CSV export patterns.
- MVP launch includes core P0 features plus validated CSV import, PDF invoices, and reports/exports.
- Dashboard data should show occupancy, pending rent, and profit-related KPIs.

## Validation requirements

- Invoices must not be recorded against invalid tenant/bed assignments.
- Move-in must ensure bed availability and exactly one identity-proof upload (Aadhaar or PAN).
- Tenant profiles are separate from Stay/lease records; completed stays and bed assignments remain available as history after checkout.
- Issued invoice totals and line-item snapshots are immutable.
- CSV imports must validate all rows before commit and reject the complete batch when any row is invalid.
- Manual overpayments require an owner explanation and an owner-selected `credit_balance` or `refund_due` resolution per payment.
- Complaint statuses must follow the documented workflow.

## Security requirements

- Protect PII and KYC documents.
- Enforce server-issued KYC upload tokens, PDF/JPEG/PNG type checks, 10 MB size limits, and malware scanning where available.
- Delete the KYC file at checkout in MVP, retain a minimal deletion-audit tombstone, and never store Aadhaar/PAN numbers.
- Retain operational tenant history, including stays, invoices, payments, and complaints, after checkout.
- Restrict reads and mutations by owner and tenant scope.
- Never expose sensitive payment or document data in client-side code.

## Performance requirements

- Dashboards and lists should remain responsive within normal PG-operator usage. The repository does not provide formal SLA targets.

## Accessibility requirements

- Semantic labels and keyboard support are required.
- Forms, dialogs, and tables should be screen-reader friendly.
- High-contrast UI and focus states should be supported.

## Reliability requirements

- Tenant and invoice workflows must be consistent with documented states.
- Critical operations should be auditable and recoverable.

## Integration requirements

- Abstract SMS provider integration for reminders and announcements; work is blocked and vendor is UNKNOWN — REQUIRES DECISION. Do not replace it with in-app-only notifications.
- Supabase PostgreSQL and Supabase Auth
- Supabase Storage for image and document uploads

Hosting provider, monthly scheduler mechanism, SMS vendor, detailed legal/DPDP retention, GST treatment, and pricing remain **UNKNOWN — REQUIRES DECISION**.

## Browser and device expectations

- Mobile/tablet-first responsive design optimized for Android-heavy usage
- Desktop and laptop layouts are outside the design scope
- Lightweight app experience for a PWA-ready delivery model
