# NexStay API Gate Report

This is a pre-build API contract gate for a documentation-only repository. No routes or runtime services are implemented; every contract below is **PLANNED**, derived only from approved product and architecture decisions.

## Gate status

- **Scope:** owner-only MVP; tenant portal and tenant self-service are deferred.
- **Approved platform:** Supabase Auth, PostgreSQL, and private Storage; UUID keys.
- **Delivery:** online-only installable PWA; no offline mutation or sync contract.
- **Contract rule:** controllers/routes remain thin; authorization, state transitions, and financial invariants are enforced server-side and in database policies.
- **Not approved/invented:** payment gateway, tenant-authenticated routes, public property profiles, electricity billing, marketplace routes, or an SMS implementation.

## Service Catalog

| Service/module | Port | Category | Purpose |
|---|---:|---|---|
| Next.js owner application/API | TBD | API + owner UI | Owner-authenticated API surface and PWA delivery; hosting and port are undecided. |
| Supabase Auth | Managed | Infrastructure | Owner identity, OTP/password fallback, session/token lifecycle. |
| Supabase PostgreSQL | Managed | Infrastructure | Authoritative owner/property-scoped operational data. |
| Supabase Storage | Managed | Infrastructure | Private KYC and approved document objects with signed access. |
| Invoice/report worker | TBD | Business/internal | Planned privileged job path for invoice generation and server-side HTML-to-PDF; scheduler mechanism is open. |
| SMS provider | TBD | External | Planned notification delivery dependency; vendor and webhook contract are open. |

## API Endpoints Inventory

All rows are **PLANNED**, not implemented. Paths follow the repository's existing API design document; no additional public routes are proposed here.

| Group | Method | Path | Typed request | Typed response |
|---|---|---|---|---|
| Auth | POST | `/api/auth/signup` | `OwnerSignupRequest` | `AuthSessionResponse` |
| Auth | POST | `/api/auth/login` | `OwnerLoginRequest` | `AuthSessionResponse` |
| Auth | POST | `/api/auth/otp/request` | `OtpRequest` | `OtpRequestResponse` |
| Auth | POST | `/api/auth/otp/verify` | `OtpVerifyRequest` | `AuthSessionResponse` |
| Auth | POST | `/api/auth/logout` | `EmptyRequest` | `EmptyResponse` |
| Properties | GET | `/api/properties` | `PropertyListQuery` | `PageResponse<PropertySummary>` |
| Properties | POST | `/api/properties` | `CreatePropertyRequest` | `PropertyResponse` |
| Properties | GET | `/api/properties/:id` | `PropertyPath` | `PropertyResponse` |
| Inventory | POST | `/api/floors` | `CreateFloorRequest` | `FloorResponse` |
| Inventory | POST | `/api/rooms` | `CreateRoomRequest` | `RoomResponse` |
| Inventory | POST | `/api/beds` | `CreateBedRequest` | `BedResponse` |
| Tenants | GET | `/api/tenants` | `TenantListQuery` | `PageResponse<TenantSummary>` |
| Tenants | POST | `/api/tenants` | `CreateTenantRequest` | `TenantResponse` |
| Tenants | PATCH | `/api/tenants/:id` | `UpdateTenantRequest` | `TenantResponse` |
| Stays | POST | `/api/stays` | `CreateStayRequest` | `StayResponse` |
| Stays | POST | `/api/stays/:id/checkout` | `CheckoutRequest` | `CheckoutResponse` |
| Imports | POST | `/api/imports/csv/validate` | `CsvValidateRequest` | `CsvValidationResponse` |
| Imports | POST | `/api/imports/csv/commit` | `CsvCommitRequest` | `ImportCommitResponse` |
| Invoices | POST | `/api/invoices/generate` | `GenerateInvoicesRequest` | `InvoiceGenerationResponse` |
| Invoices | GET | `/api/invoices` | `InvoiceListQuery` | `PageResponse<InvoiceSummary>` |
| Payments | POST | `/api/payments` | `RecordPaymentRequest` | `PaymentResponse` |
| Expenses | GET | `/api/expenses` | `ExpenseListQuery` | `PageResponse<ExpenseSummary>` |
| Expenses | POST | `/api/expenses` | `CreateExpenseRequest` | `ExpenseResponse` |
| Complaints | GET | `/api/complaints` | `ComplaintListQuery` | `PageResponse<ComplaintSummary>` |
| Complaints | POST | `/api/complaints` | `CreateComplaintRequest` | `ComplaintResponse` |
| Complaints | PATCH | `/api/complaints/:id` | `UpdateComplaintRequest` | `ComplaintResponse` |
| Notifications | planned | `/api/notifications` | `CreateNotificationRequest` | `NotificationResponse` |
| Reports/exports | planned | `/api/reports` | `ReportQuery` | `ReportResponse` or streamed CSV/PDF |
| Documents | planned | `/api/documents/:id` | `DocumentAccessRequest` | short-lived signed URL or streamed PDF |

## Typed Request and Response Shapes

Shapes below are TypeScript-style contract names, not implementation code. All IDs are UUID strings; all money is integer INR paise; dates are ISO `YYYY-MM-DD`; timestamps are ISO 8601 UTC.

```ts
type OwnerSignupRequest = { email?: string; phone?: string; password?: string };
type OwnerLoginRequest = { emailOrPhone: string; passwordOrOtp: string };
type OtpRequest = { phone: string };
type OtpVerifyRequest = { phone: string; code: string };
type AuthSessionResponse = { owner: OwnerSummary; accessToken: string; expiresAt: string };

type CreatePropertyRequest = { name: string; address: AddressInput; amenities?: string[]; rules?: string[]; securityDepositPaise?: number; noticePeriodDays?: number };
type CreateFloorRequest = { propertyId: string; name: string; orderIndex: number };
type CreateRoomRequest = { floorId: string; label: string; sharingType: string };
type CreateBedRequest = { roomId: string; label: string; monthlyRentPaise: number; isAcAttached?: boolean; hasPrivateBathroom?: boolean };

type CreateTenantRequest = { propertyId: string; name: string; phone: string; email?: string; kycProofType: "aadhaar" | "pan"; kycUploadToken: string };
type UpdateTenantRequest = { name?: string; phone?: string; email?: string; status?: "prospect" | "active" | "notice_period" | "checked_out" };
type CreateStayRequest = { tenantId: string; propertyId: string; bedId: string; checkInDate: string; agreementEndDate?: string; rentPaise: number; depositPaise: number };
type CheckoutRequest = { checkOutDate: string; reason?: string };

type CsvValidateRequest = { propertyId: string; fileUploadToken: string; schemaVersion: string; idempotencyKey: string };
type CsvCommitRequest = { propertyId: string; batchId: string; idempotencyKey: string };
type GenerateInvoicesRequest = { propertyId: string; billingMonth: string; tenantIds?: string[]; idempotencyKey: string };
type RecordPaymentRequest = { invoiceId: string; amountPaise: number; paymentDate: string; method: string; reference?: string; overpaymentExplanation?: string; overpaymentResolution?: "credit_balance" | "refund_due"; idempotencyKey: string };
type CreateExpenseRequest = { propertyId: string; category: string; amountPaise: number; date: string; vendor?: string; notes?: string; billUploadToken?: string };
type CreateComplaintRequest = { propertyId: string; tenantId?: string; category: string; description: string; priority: string };
type UpdateComplaintRequest = { status?: string; note?: string };
type CreateNotificationRequest = { propertyId: string; tenantIds: string[]; channel: "in_app" | "sms"; subject?: string; body: string };

type ApiError = { code: string; message: string; fieldErrors?: { field: string; code: string; message: string }[]; requestId: string };
type PageResponse<T> = { items: T[]; nextCursor?: string };
```

Responses must be allow-listed DTOs. They must not expose database rows wholesale, Storage paths, access tokens beyond the approved auth response, KYC contents, Aadhaar/PAN numbers, or internal error details. Issued invoice totals and line-item snapshots are response data but are immutable.

## Validation and Error Conventions

- Every request is validated server-side; unknown fields are rejected or ignored according to one globally chosen policy, which must be consistent.
- UUIDs, dates, enums, pagination cursors, text lengths, phone/email formats, file type/size, and non-negative paise amounts are validated before business logic.
- Cross-entity consistency is mandatory: tenant, stay, bed, invoice, payment, and property must resolve to the same authorized property.
- Move-in atomically validates a vacant bed and exactly one KYC proof upload (`aadhaar` or `pan`); no document number is accepted or stored.
- A payment exceeding the current invoice balance requires both `overpaymentExplanation` and `overpaymentResolution`; invoice snapshots cannot be patched.
- CSV validation returns all row/field errors and writes no production rows. Commit accepts only the matching valid batch and is atomic.
- Checkout retains operational history, enqueues/deletes only the KYC object, and writes a minimal deletion tombstone. Repeated checkout/deletion requests are safe no-ops or return the existing outcome.
- Recommended status mapping: `400` malformed/validation, `401` unauthenticated, `403` authenticated but out of scope, `404` authorized resource absent, `409` state/conflict/idempotency mismatch, `413` file too large, `415` unsupported media, `422` business-rule violation, `429` rate limited, `500` unexpected failure.
- Error body is always `ApiError`; `requestId` is returned and used for support correlation. Do not reveal whether an out-of-scope UUID exists.

## Authorization Boundaries

- Product role is **owner only**. Supabase Auth identifies the owner; client role claims and client-selected `ownerId` are never trusted.
- Every protected operation derives owner scope from the authenticated session and checks `property.owner_id = auth.uid()` through server checks and RLS.
- A property selector is a scope selector, not an authorization grant. Child records are authorized through their parent property; IDs alone never grant access.
- Tenant portal routes, tenant bearer tokens, tenant self-service, and tenant financial reads are not MVP contracts.
- Background invoice/scheduler and Storage deletion paths are privileged internal operations only, with narrow scope, audit actor, and no browser-exposed service-role key.
- KYC access uses private Storage and short-lived signed URLs after owner/property authorization. KYC objects and URLs are excluded from logs, exports, notifications, and reports.

## Idempotency and Atomicity

- **Invoices:** `GenerateInvoicesRequest.idempotencyKey` plus a uniqueness invariant for tenant/property/billing month. Replays return the original generation result; concurrent calls cannot create duplicates.
- **Payments:** caller-supplied `idempotencyKey` is unique per owner/property operation. A replay returns the original payment; the same key with a different payload returns `409`. Payment, balance/overpayment treatment, audit, and notification-outbox record commit atomically.
- **CSV imports:** validate stores a batch keyed by idempotency key and file hash. Commit is allowed only for the same validated batch, exactly once; replay returns the prior result. No partial production writes.
- **Checkout/KYC deletion:** checkout transaction and deletion tombstone are idempotent; external object deletion is retried safely and never restores the file.
- **Exports/PDFs:** generation may be retried using a report/invoice request key; generated artifacts must be immutable per source snapshot or explicitly versioned. No route may mutate an issued invoice to regenerate it.

## Upload, PDF, Report, and Export Handling

- Uploads use a server-issued upload token or signed upload policy after authorization. Private buckets, allow-listed MIME types/extensions, size limits, checksum/scan where available, and no raw PII logging are required.
- KYC accepts exactly one proof file per move-in, stores only proof type and encrypted Storage metadata, and auto-deletes the object at checkout while retaining the approved tombstone.
- PDF invoices and reports are generated server-side from authorized immutable snapshots/queries using HTML-to-PDF. The API returns a short-lived download URL or a streamed file; it does not expose HTML templates or Storage internals.
- CSV exports are authorization-filtered, explicitly column allow-listed, and must not include Aadhaar/PAN numbers, KYC files, secrets, or internal audit payloads. PDF/CSV outputs use `Content-Disposition`, correct content type, and bounded report ranges.
- Report queries are read-only and property-scoped. The MVP dashboard/report contract should cover occupancy, pending rent, overdue aging, expenses, and profit-related metrics without inventing additional KPIs.

## Communication Patterns

- Browser/PWA to Next.js API is synchronous HTTPS request/response.
- API to Supabase Auth/Postgres/Storage is synchronous through approved SDK/server boundaries.
- Invoice generation, KYC deletion, notification delivery, and report/PDF generation may use internal asynchronous jobs, but the scheduler, queue, retry policy, and SMS vendor are not approved yet.
- No inter-service REST, GraphQL, gRPC, broker, circuit-breaker, or service-discovery contract exists in the repository.
- If SMS is selected, delivery status and webhook verification must be added as a separate approved contract; until then `in_app` notifications are the only concrete channel.

## Service Technology Matrix

| Service | Web/API | Data access | Discovery | Gateway | Health/metrics | Cache |
|---|---|---|---|---|---|---|
| Next.js owner application/API | Planned Next.js/TypeScript | Supabase client/server access | None approved | Single application boundary | Not specified | None approved |
| Supabase Auth | Managed | Supabase Auth | Managed | N/A | Managed | Managed |
| Supabase PostgreSQL | Managed | PostgreSQL/RLS | Managed | N/A | Managed | None approved |
| Supabase Storage | Managed | Storage API/private bucket | Managed | N/A | Managed | None approved |
| Invoice/report worker | Planned internal job | Supabase server access | None approved | N/A | Audit/observability to be defined | None approved |

## Service Communication Sequence

<!-- mermaid-checked: every participant uses `participant Id as "Label"`, no \n in aliases/messages/notes, every alt/opt/loop closed by end, no `:` inside any alias -->
~~~mermaid
sequenceDiagram
    participant Owner as "Owner PWA"
    participant Api as "Next.js API"
    participant Auth as "Supabase Auth"
    participant Db as "Supabase PostgreSQL"
    participant Store as "Private Storage"
    participant Job as "Internal Worker"

    Owner->>Api: POST /api/stays with auth session
    Api->>Auth: Validate owner session
    Auth-->>Api: Authenticated owner
    Api->>Db: Check property scope and vacant bed
    Db-->>Api: Authorized inventory
    Api->>Store: Verify KYC upload token
    Store-->>Api: One proof object available
    Api->>Db: Commit tenant stay bed and first invoice
    Db-->>Api: Stay and invoice snapshots
    Api-->>Owner: 201 StayResponse
    opt Checkout later
        Owner->>Api: POST /api/stays/id/checkout
        Api->>Db: Close stay free bed and create tombstone
        Db-->>Api: Checkout committed
        Api-)Job: Enqueue KYC deletion
        Job->>Store: Delete KYC object
        Store-->>Job: Delete result
        Job->>Db: Record deletion outcome
        Api-->>Owner: 200 CheckoutResponse
    end
~~~

## Questions requiring user input

1. Which exact owner authentication UX is approved for launch: OTP only, email/password fallback, or both, and should signup create a property in the same transaction?
2. What API hosting/runtime and public port should be used for the Next.js server/API?
3. Which monthly invoice scheduler/job mechanism is approved, including timezone, retry policy, and privileged execution/audit model?
4. Which SMS vendor, delivery channels, webhook verification, and delivery-history retention are approved? If none is selected, should MVP notifications be `in_app` only?
5. Confirm whether a server-issued upload-token flow or direct short-lived signed Storage upload is preferred, and specify file size/type/virus-scan limits.
6. Confirm the invoice total representation: immutable header total plus immutable line-item snapshot, line-item-derived total only, or both.
7. Define `credit_balance` and `refund_due` settlement semantics, including whether either can later be applied/marked settled and by which owner action.
8. Confirm report/PDF delivery policy: synchronous versus queued generation, maximum date range/file size, and artifact retention.
9. Confirm audit and tenant PII retention/correction/deletion rules, including DPDP/legal requirements and whether deleted KYC metadata remains as a tombstone indefinitely or for a bounded period.

