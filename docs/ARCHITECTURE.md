# Architecture

## Overview

NexStay is a property-management product for PG owners in India. The product aims to replace fragmented operational tools such as WhatsApp, spreadsheets, and paper records with a single operational dashboard.

## Current repository baseline

The repository currently contains:

- product and system requirements in `docs/prd/owner-erp.md` and `docs/srs/owner-erp-srs.md`
- design mockups and product screens in `Design Files/stitch_pg_management_hub/`
- related PDFs in `product_pdfs/`

There is no application runtime, frontend source, API server, database schema, or deployment configuration in this repository at the time of review.

## Current implementation vs intended implementation

### CURRENT IMPLEMENTATION

- Documentation and design artifact repository
- PRD and SRS drafts
- Screen conceptualization and design system
- Product planning materials

### INTENDED / FUTURE IMPLEMENTATION

- Owner-facing web application
- Responsive web application with optional installability and online-only operation
- PostgreSQL database provided by Supabase
- Supabase Auth and Supabase Storage for authentication and file storage
- Next.js + TypeScript frontend
- Notifications and invoice workflows
- CSV onboarding and dashboard analytics

## Intended architecture

```mermaid
flowchart LR
    User[Owner] --> Web[Next.js Web App]
    Web --> API[API / Server Routes]
    API --> DB[(PostgreSQL)]
    API --> Auth[Supabase Auth]
    API --> Storage[Supabase Storage]
    Web --> PWA[PWA Service Worker]
    API --> SMS[SMS Provider Adapter (blocked pending vendor selection)]
    API --> Logs[Monitoring & Audit]
```

## Application layers

### Presentation layer

- Responsive dashboard and forms
- Property management screens
- Tenant records, owner-entered complaints, invoices, reports, and exports
- Mobile-friendly actions for PG owners

### Application layer

- Business logic for rent generation, complaint state transitions, onboarding, and report aggregation
- Validation for invoices, bed status, tenant lifecycle, and expense logic
- API orchestration and server-side permissions

### Data layer

- Property, room, bed, tenant, invoice, payment, complaint, and notification records
- Encrypted storage for KYC uploads; delete the KYC file at checkout and retain only proof type plus a minimal deletion tombstone, never Aadhaar/PAN numbers
- Separate Tenant profiles from historical Stay/lease and bed-assignment records; retain operational history after checkout
- Immutable invoice total and line-item snapshots
- Atomic CSV import validation and commit
- PostgreSQL data model with row-level security and audit trails

### Integration layer

- SMS provider adapter for rent reminders and announcements; notification work is blocked and the vendor remains UNKNOWN — REQUIRES DECISION. In-app-only is not the MVP substitute.
- Synchronous, bounded server-side HTML-to-PDF generation for invoices and reports; queued generation is deferred
- Storage for onboarding documents and images
- External analytics or monitoring instrumentation when implemented

## Data flow

1. Owner signs up or logs in.
2. Owner creates property and configures room/bed hierarchy.
3. Tenant records are created or imported via CSV by the owner.
4. Rent invoices and reminders are generated.
5. Payments, expenses, and complaints update the analytics dashboard.
6. Notifications are sent to tenants and owners; tenant portal access is not part of MVP.

## Authentication flow

- Owner sign-up via Supabase Auth using the approved OTP or email/password flow
- Session managed by Supabase Auth
- Tenant portal access is deferred from MVP.
- Authorization enforced via property and owner scoping

## Authorization model

- `owner_id` and `property_id` are the main access boundaries
- Every customer data access must be restricted to the correct owner and property
- Tenant portal access is deferred from the owner-only MVP; any future tenant access must be scoped to that tenant's own records and approved property data

## Request lifecycle

- Client performs authenticated request
- Server validates authentication and authorization
- Domain logic validates object state and business rules
- Data is persisted or rejected with structured errors
- Notification or audit workflow triggers when relevant

## PWA architecture

The intended implementation is an installable PWA for mobile-heavy operators. MVP requires connectivity and does not support offline data entry or synchronization.

## Deployment architecture

Current evidence suggests a future deployment pattern such as:

- Frontend: separately deployable Next.js application; hosting vendor is UNKNOWN — REQUIRES DECISION
- API/auth/data: Supabase (PostgreSQL and Supabase Auth)
- Notifications: SMS provider adapter; vendor is UNKNOWN — REQUIRES DECISION
- Storage: Supabase Storage
- Invoices/reports: server-side HTML-to-PDF
- Monthly invoice scheduling: implementation/deployment decision, not fixed
- Domain and HTTPS via deployment platform defaults

This is a recommendation, not confirmed implementation detail. Hosting vendor, SMS vendor, and monthly scheduling mechanism remain UNKNOWN — REQUIRES DECISION.

## Key architectural decisions

1. Product is owner-first and mobile/tablet responsive web; desktop and laptop layouts are not design targets, and no separate native mobile app is planned.
2. MVP UI is limited to one property per owner; the database is multi-property-ready.
3. Tenant portal is deferred; owners enter tenant records and complaints.
4. Payments are manual in MVP; no payment gateway is required.
5. Data boundaries are owner- and property-scoped.

## Risks and gaps

- No code exists to validate the architecture against actual implementation.
- No database schema exists yet.
- No security controls are implemented in code.
- No actual hosting or CI/CD configuration exists.
- No app-level analytics or monitoring is present yet.
