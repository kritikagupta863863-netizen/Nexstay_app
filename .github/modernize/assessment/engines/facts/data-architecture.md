# Data Architecture & Persistence Layer

The repository is documentation-only: no runtime, ORM, migrations, or live schema exist. The approved persistence target is Supabase PostgreSQL, with Supabase Auth and private Supabase Storage.

## Database Configuration

| Service/Module | DB Type | Profile | Driver | Connection | Migration Tool |
|---|---|---|---|---|---|
| Owner ERP | PostgreSQL via Supabase | Planned production and staging | Supabase PostgreSQL client/driver not yet selected | Supabase project connection; values are not committed | Versioned SQL migrations are required; tool not selected |
| Identity | Supabase Auth | Planned | Supabase Auth client | Supabase-managed | Supabase-managed |
| Files | Supabase Storage | Planned | Supabase Storage client | Private buckets with signed, short-lived access | Storage lifecycle/configuration not yet implemented |

> Note: No implemented database configuration or entities were found.

## Data Ownership per Service

| Service | Tables Owned | ORM Framework | Caching | Notes |
|---|---|---|---|---|
| Owner ERP | Planned property, inventory, stay, finance, complaint, notification, import, and audit tables | None yet | None documented | Single owner-facing application; tenant portal is deferred |

## Entity Model

The normalized target model separates a tenant/person from each occupancy episode (`stay`) so a tenant can return and a bed can be reused without overwriting history. `invoice_line_item` and `complaint_activity` preserve detailed financial and operational history.

<!-- mermaid-checked: every attribute is `<type> <name> [<key>] ["<description>"]` with at most one of PK/FK/UK, no \n in descriptions, no {} in descriptions, every relationship label is double-quoted -->
~~~mermaid
erDiagram
    owner ||--o{ property : "owns"
    property ||--o{ floor : "contains"
    floor ||--o{ room : "contains"
    room ||--o{ bed : "contains"
    property ||--o{ tenant : "registers"
    tenant ||--o{ stay : "has history"
    bed ||--o{ stay : "is assigned over time"
    property ||--o{ invoice : "issues"
    tenant ||--o{ invoice : "receives"
    invoice ||--o{ invoice_line_item : "contains"
    invoice ||--o{ payment : "is paid by"
    property ||--o{ expense : "records"
    property ||--o{ complaint : "tracks"
    tenant ||--o{ complaint : "reports"
    complaint ||--o{ complaint_activity : "has history"
    property ||--o{ notification : "owns"
    tenant ||--o{ notification : "targets"
    tenant ||--o| kyc_document : "has one proof"
    owner {
        uuid id PK
    }
    property {
        uuid id PK
        uuid owner_id FK
        string name
        string status
    }
    floor {
        uuid id PK
        uuid property_id FK
        string name
        int order_index
    }
    room {
        uuid id PK
        uuid floor_id FK
        string label
        string status
    }
    bed {
        uuid id PK
        uuid room_id FK
        string label
        int monthly_rent_paise
        string status
    }
    tenant {
        uuid id PK
        uuid property_id FK
        string name
        string status
    }
    stay {
        uuid id PK
        uuid tenant_id FK
        uuid bed_id FK
        date check_in_date
        date check_out_date
        int rent_paise
        int deposit_paise
        string status
    }
    invoice {
        uuid id PK
        uuid property_id FK
        uuid tenant_id FK
        string billing_month
        int total_paise
        string status
    }
    invoice_line_item {
        uuid id PK
        uuid invoice_id FK
        int amount_paise
        string description
    }
    payment {
        uuid id PK
        uuid invoice_id FK
        uuid tenant_id FK
        int amount_paise
        string overpayment_resolution
    }
    expense {
        uuid id PK
        uuid property_id FK
        int amount_paise
        date expense_date
    }
    complaint {
        uuid id PK
        uuid property_id FK
        uuid tenant_id FK
        string status
    }
    complaint_activity {
        uuid id PK
        uuid complaint_id FK
        string activity_type
    }
    notification {
        uuid id PK
        uuid property_id FK
        uuid tenant_id FK
        string status
    }
    kyc_document {
        uuid id PK
        uuid tenant_id FK
        string proof_type
        string storage_path
    }
~~~

## Key Repository Methods

No repository interfaces or ORM methods exist. Future data access should use ownership-scoped queries; custom methods should include property/owner scope rather than accepting an ID alone. Important planned operations are: idempotent invoice generation by tenant and billing month, active-stay lookup by bed, payment allocation with overpayment validation, complaint activity append, and CSV staging validation.

## Caching Strategy

No cache is approved or implemented. Do not cache KYC files, payment state, occupancy state, or authorization decisions without an explicit invalidation design. Initial implementation should read authoritative PostgreSQL state; any later cache requires a separate decision.

## Data Ownership Boundaries

Use one Supabase PostgreSQL database with logical tenant isolation. `property.owner_id` is the ownership root; every property-owned row should carry `property_id`, and tenant/bed/invoice relationships must be validated against the same property. Supabase Auth identifies the owner through `auth.uid()`. Supabase Storage KYC access must be private and mediated by owner/property authorization and short-lived signed URLs. Service-role access, if used by jobs, must be narrowly scoped and never exposed to the browser.

### Data Classification & Sensitivity

| Entity | Sensitive Fields | Classification | Controls in Place |
|---|---|---|---|
| Tenant | Name, phone, email, emergency contact, photo | PII | RLS and server-side authorization required; no implementation yet |
| KYC document | Aadhaar/PAN proof file and metadata | Highly sensitive identity data | Private encrypted storage, signed URLs, no document logging, deletion at checkout required |
| Invoice/Payment/Expense | Financial amounts, references, vendor data | Financial/PII-adjacent | Owner/property RLS and append-only audit required |
| Complaint | Tenant-linked descriptions, photos, activity | PII/operationally sensitive | Owner/property RLS and redacted audit logging required |

## Gate Findings

### Normalized schema and lifecycle

- Use `owner -> property -> floor -> room -> bed` for inventory.
- Keep `tenant` as the resident profile and add `stay` (or lease/occupancy episode) for check-in, check-out, bed, rent, deposit, notice, and lifecycle state. This is required to preserve historical bed assignments and re-occupancy.
- Enforce one active stay per bed with a PostgreSQL partial unique index. Also validate tenant/property consistency with composite foreign keys or server-side transactional checks.
- Use invoice headers plus line items; payments remain immutable financial events. Model credit/refund-due treatment explicitly, but do not invent a refund processor or credit application workflow.
- Model complaint activity as append-only history. Notifications need delivery/status records; SMS delivery behavior remains dependent on the future vendor.

### Keys, constraints, and indexes

- UUID primary keys are recommended for Supabase/Auth interoperability; confirm this implementation convention before migrations.
- Every child row needs foreign keys and appropriate `NOT NULL` constraints. Add checks for enumerated states, non-negative money, valid date ranges, and `overpayment_resolution` required exactly when payment exceeds remaining balance.
- Uniqueness is scoped: room labels within a floor, bed labels within a room, and one invoice per tenant/property/billing month. Do not make labels globally unique.
- Required indexes: owner/property lookup, property hierarchy joins, active stay by bed, tenant status, invoice due/status/month, payment invoice/date, expense property/date, complaint property/status, notification delivery state, and audit entity/time. Add only after confirming query plans.
- Paid invoices and payments must not be hard-deleted. Destructive user actions are soft-delete plus audit where the product permits deletion.

### Monetary fields

- Store INR as integer paise (`bigint` where aggregate range warrants it), never floating point.
- Store currency explicitly on financial records even though MVP is INR. Preserve original payment amount and immutable payment history.
- Define whether invoice totals are stored snapshots, derived from line items, or both; this is an implementation contract that must be settled before migration.

### RLS and tenant isolation

- Enable RLS on every customer table, not only top-level properties.
- Policies should derive ownership through `property.owner_id = auth.uid()` and enforce property consistency; an ID alone must never authorize access.
- Keep tenant portal policies out of MVP; owners are the only authenticated product role. Use server-side checks in addition to RLS for state transitions.
- Treat service-role jobs as privileged: narrow functions/transactions, no client exposure, and audit actor/job identity.

### KYC metadata and deletion workflow

- Store only `proof_type` (`aadhaar` or `pan`) and encrypted Storage metadata/reference (bucket, object path, MIME type, size, checksum if approved, uploaded time, deletion time/status). Never store the Aadhaar/PAN number.
- Use a private bucket and short-lived signed URLs. Do not put file contents, URLs, or identifiers in logs, exports, analytics, or audit snapshots.
- Checkout transaction should close the stay, free the bed, and mark the KYC object for deletion. A trusted server/job then deletes the Storage object and records success/failure; retries must be idempotent.
- Whether post-deletion metadata is retained as a tombstone or fully removed is not specified and requires a privacy/legal decision.

### Audit model

- Add an append-only `audit_event` table for tenant, stay, invoice, payment, complaint, document, import, and authorization-relevant mutations.
- Capture actor Auth user/job, owner/property, entity and record IDs, action, timestamp, request/correlation ID, and redacted before/after or change summary. Never capture KYC contents or Aadhaar/PAN values.
- Restrict inserts to trusted server/database paths and make audit rows non-editable to normal owners. Retention and legal export/deletion policy remain to be defined.

### Transaction boundaries

- Move-in: validate vacant bed and KYC, create tenant/stay, occupy bed, and create first invoice atomically.
- Move-out: calculate refund/deductions, close stay, free bed, archive tenant state, and enqueue KYC deletion atomically; external Storage deletion is retried separately.
- Invoice generation: claim a job/run, create exactly one invoice per tenant/month under a unique constraint, and record outcomes idempotently.
- Payment recording: validate invoice ownership and balance, persist payment and overpayment treatment atomically, and emit notification/audit work through an outbox or equivalent retryable record.
- CSV import: stage and validate before promotion; never partially mutate production rows without an explicit batch policy.

### CSV import safety

- Require authenticated owner and selected property context; reject cross-property identifiers.
- Import into a staging area with schema/version, file hash, batch ID, row number, parsed values, and row-level errors. Provide dry-run results before commit.
- Validate headers, types, date/timezone, enum values, money in paise, duplicate labels, duplicate tenants, bed occupancy conflicts, and opening-balance semantics before promotion.
- Use idempotency key/file hash and a unique batch record to prevent replay. Commit a valid batch in a transaction or clearly report per-row partial outcomes; never silently overwrite existing financial history.
- Quarantine uploads, enforce size/type limits, virus scanning where available, and never log raw rows containing PII.

## Decisions Requiring User Input

1. Confirm UUID versus another key convention for all tables.
2. Confirm the exact invoice-total model: immutable header snapshot, line-item-derived total, or both.
3. Confirm whether tenant records are soft-deleted/archived independently from stays, and the retention period for historical PII.
4. Decide whether deleted KYC metadata remains as a tombstone or is removed after Storage deletion; confirm legal retention/consent requirements.
5. Select the migration runner and deployment/rollback procedure for Supabase SQL migrations.
6. Select the scheduled-job mechanism and its privileged execution/audit model.
7. Select SMS vendor and delivery-status/webhook retention behavior.
8. Define refund-due and credit-balance settlement semantics; current approval only defines owner treatment selection.
9. Confirm CSV import partial-batch policy and the exact opening-balance format.
10. Confirm retention, export, correction, and deletion rules for audit events and tenant data, including DPDP/legal review.
