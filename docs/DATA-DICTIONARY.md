# Data dictionary

## Conventions

- Primary keys use UUIDs by default for Supabase/PostgreSQL interoperability.
- Organization/property ownership must be reachable from every organization-owned record.
- Historical operational records are retained; checkout does not delete tenant history.

## Property
- Purpose: represents the PG property owned or managed by a user.
- Fields: id, owner_id, name, address, amenities, photos, rules, deposit, notice period
- Relationships: one owner has many properties

## Floor
- Purpose: organizes rooms inside a property.
- Fields: id, property_id, name, order_index

## Room
- Purpose: group of beds for a section of a property.
- Fields: id, floor_id, label, sharing_type, status

## Bed
- Purpose: billing and occupancy unit.
- Fields: id, room_id, label, status, rent, has_private_bathroom, is_ac_attached

## Tenant
- Purpose: person living in the PG.
- Fields: id, property_id, name, phone, email, image, emergency_contact, status
- Sensitive data: KYC documents and contact details
- Lifecycle: retained after checkout; occupancy dates and bed assignment belong to Stay.

## Stay / lease
- Purpose: one tenant's occupancy period and historical bed assignment.
- Fields: id, tenant_id, property_id, bed_id, check_in_date, check_out_date, agreement_end_date, rent_snapshot, security_deposit_snapshot, status
- Lifecycle: retained after checkout to preserve tenancy and bed-assignment history.

## Invoice
- Purpose: monthly rent and service billing.
- Fields: id, tenant_id, property_id, stay_id, month, status, line_items_snapshot, subtotal_snapshot, total_snapshot, paid_amount, due_amount, currency, issued_at
- Integrity: issued totals and line-item snapshots are immutable.

## Payment
- Purpose: recorded rent or due payment.
- Fields: id, invoice_id, tenant_id, amount, date, method, reference, overpayment_explanation, overpayment_resolution
- Integrity: overpayment requires an explanation and owner-selected `credit_balance` or `refund_due`.

## Expense
- Purpose: property operating costs.
- Fields: id, property_id, category, amount, date, vendor, notes, bill_image_url

## Complaint
- Purpose: tenant issues or maintenance tasks.
- Fields: id, property_id, tenant_id, category, description, priority, status, sla_deadline

## KYC deletion audit tombstone
- Purpose: minimal evidence that a KYC file was deleted at checkout.
- Fields: id, tenant_id, stay_id, deleted_at, file_type, deletion_reason
- Exclusions: no Aadhaar/PAN number and no recoverable file content.

## CSV import batch
- Purpose: atomic import of tenant and operational records.
- Fields: id, property_id, submitted_by, submitted_at, status, validation_errors
- Integrity: validate all rows before commit; any invalid row rejects the entire batch and writes no imported records.
