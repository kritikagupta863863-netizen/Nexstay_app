# Database design

## Current status

No actual database implementation or migration set exists in this repository. The approved future database is PostgreSQL provided by Supabase.

## Intended technology

- Database: PostgreSQL via Supabase.
- Auth provider: Supabase Auth.
- File storage: Supabase Storage.

## Database conventions and lifecycle decisions

- Use UUID primary keys for all entities by default to preserve a consistent convention and Supabase interoperability.
- Tenant is a person/profile, not a tenancy period. Model each occupancy as a separate `stay`/lease record linked to a tenant and property; retain completed stays and bed assignments as history.
- Invoice totals and line items are immutable snapshots at invoice issuance. Later changes to rent, fees, or bed configuration must not rewrite an issued invoice.
- CSV imports are transactional batches: validate every row first, return all validation errors, and commit no rows if any row is invalid.
- At checkout, delete only the KYC file in the MVP and retain a minimal deletion-audit tombstone. Do not store Aadhaar or PAN numbers.
- Retain operational tenant history (stays, invoices, payments, and complaints) after checkout.

## Intended data model

The schema must support one owner having multiple properties, even though MVP UI exposes one property per owner. All operational rows remain scoped through `owner_id` and `property_id`.

### Core entities

#### Property
- `id`
- `owner_id`
- `name`
- `address`
- `amenities`
- `rules`
- `security_deposit`
- `notice_period_days`
- `status`

#### Floor
- `id`
- `property_id`
- `name`
- `order_index`

#### Room
- `id`
- `floor_id`
- `label`
- `sharing_type`
- `status`

#### Bed
- `id`
- `room_id`
- `label`
- `monthly_rent`
- `status`
- `is_ac_attached`
- `has_private_bathroom`

#### Tenant
- `id`
- `property_id`
- `name`
- `phone`
- `email`
- `status`
- `check_in_date`
- `agreement_end_date`
- `security_deposit`
- `monthly_rent`
- `kyc_proof_type` (`aadhaar` or `pan`)
- `kyc_uploaded_file` (encrypted upload reference); exactly one Aadhaar-or-PAN identity-proof upload is required at MVP move-in. Do not model passport, address-proof, or rental-agreement uploads in the MVP. The reference may be created only through a short-lived server-issued upload token; accepted formats are PDF/JPEG/PNG up to 10 MB. Malware scanning is mandatory; reject the upload when scanning is unavailable or fails.
- No Aadhaar or PAN number is stored. The uploaded KYC file is auto-deleted when the tenant checks out.

#### Stay / lease
- `id`
- `tenant_id`
- `property_id`
- `bed_id`
- `check_in_date`
- `check_out_date`
- `agreement_end_date`
- `rent_snapshot`
- `security_deposit_snapshot`
- `status`

Each stay is retained after checkout. Bed assignment history must be represented by retained stay records (or an equivalent assignment history), not by overwriting the tenant profile.

#### Invoice
- `id`
- `tenant_id`
- `property_id`
- `month`
- `status`
- `subtotal`
- `dues`
- `paid_amount`
- `currency`
- `issued_at`
- `line_items_snapshot`
- `subtotal_snapshot`
- `total_snapshot`

#### Payment
- `id`
- `invoice_id`
- `tenant_id`
- `amount`
- `payment_date`
- `method`
- `reference`
- `overpayment_explanation` (required when amount exceeds the invoice balance)
- `overpayment_resolution` (`credit_balance` or `refund_due`, selected by the owner for each overpayment)

An overpayment cannot be recorded without an explanation and an owner-selected `credit_balance` or `refund_due` treatment.

#### KYC deletion audit tombstone
- `id`
- `tenant_id`
- `stay_id` (when applicable)
- `deleted_at`
- `file_type`
- `deletion_reason`

The tombstone contains no Aadhaar/PAN number and no recoverable file content.

#### Expense
- `id`
- `property_id`
- `category`
- `amount`
- `date`
- `vendor`
- `notes`
- `bill_image_url`

#### Complaint
- `id`
- `tenant_id`
- `property_id`
- `category`
- `description`
- `priority`
- `status`
- `sla_deadline`

## Relationships

- One owner has many properties.
- One property has many floors, rooms, beds, tenants, invoices, expenses, and complaints.
- One room has many beds.
- One bed can have many historical stays/bed assignments over time, with at most one active assignment enforced by the future schema.
- One tenant can have many historical stays over time.
- One tenant may have many invoices and many payments.

## Constraints and consideration

- Use owner and property scoping for every row.
- Store money in a consistent currency representation, ideally paise or integer minor units.
- Treat KYC and document uploads as sensitive content with retention controls; encrypt uploaded files and auto-delete the KYC file at tenant checkout.
- Manual overpayments are allowed only with a required explanation, and the owner must select `credit_balance` or `refund_due` for each payment.
- Issued invoice totals and line-item snapshots are immutable.
- CSV batch import validation occurs before commit; any invalid row rejects the entire batch.
- Use indexed columns for lookup by tenant, property, status, and date.
- Enforce tenant/property ownership paths in database policies and server-side queries; an ID alone must never grant access.

## Migration strategy

Future implementation should keep schema changes explicit and versioned using migration files. Apply changes in a controlled order and include seed data only when required for onboarding and testing.

## Decided scheduling and backup policies

- Invoice generation timing is decided: one invoice per active tenant on the 1st of each month, with a default due date of the 5th; the owner may configure a different due date in a later release. Invoice generation must remain idempotent (no duplicate monthly invoices on rerun).
- All scheduled jobs and stored/displayed timestamps use `Asia/Kolkata`.
- Operational database backups: daily snapshot with 30-day retention and a quarterly-tested restore procedure. This is a distinct, decided operational backup policy, not the unresolved DPDP/legal retention policy below (which governs how long tenant PII/documents may be kept).

## Unresolved decisions

- Monthly invoice scheduler mechanism, job runner, and hosting (timing above is decided; the automation mechanism is not): **UNKNOWN — REQUIRES DECISION**
- SMS vendor/provider: **UNKNOWN — REQUIRES DECISION**
- Detailed DPDP/legal retention policy and retention durations: **UNKNOWN — REQUIRES DECISION**
- Prefer India-based hosting and data regions where available; the exact Next.js hosting provider remains **UNKNOWN — REQUIRES DECISION**.
