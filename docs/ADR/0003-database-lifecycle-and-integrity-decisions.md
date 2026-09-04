# ADR 0003: Database lifecycle and integrity decisions

- Status: Accepted
- Date: 2026-09-05

## Context

NexStay needs a Supabase-compatible schema that preserves operational history while protecting KYC data and financial records.

## Decisions

- Use UUID primary keys by default.
- Model `Tenant` separately from `Stay`/lease. Retain completed stays and bed assignments.
- Store immutable invoice totals and line-item snapshots at issuance.
- Validate all CSV rows before commit and reject the entire batch when any row is invalid.
- Delete only the KYC file at checkout in MVP and retain a minimal deletion tombstone. Never store Aadhaar or PAN numbers.
- Retain stays, invoices, payments, and complaints after checkout.
- Require an explanation and owner-selected `credit_balance` or `refund_due` treatment for overpayments.

## Consequences

- Historical reporting remains possible without retaining the KYC file.
- Imports need a validation phase and an atomic commit.
- Future migrations must preserve these invariants and enforce tenant/property ownership.

## Unresolved

- Monthly invoice scheduler mechanism, job runner, and hosting (see ADR 0005 for the decided timing policy, which is separate from this unresolved automation mechanism): **UNKNOWN — REQUIRES DECISION**
- SMS vendor/provider: **UNKNOWN — REQUIRES DECISION**
- Detailed DPDP/legal retention policy: **UNKNOWN — REQUIRES DECISION**
