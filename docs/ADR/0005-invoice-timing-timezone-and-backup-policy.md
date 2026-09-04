# ADR 0005: Invoice timing, timezone, and backup/maintenance policy

- Status: Accepted
- Date: 2026-09-05

## Context

The SRS and PRD define concrete operational rules for when invoices are generated and reminded, which timezone scheduled jobs and timestamps use, and how the operational database is backed up and maintained. These are business/operations decisions, distinct from the still-unresolved choice of *which* scheduler mechanism, job runner, or hosting platform executes them, and distinct from the still-unresolved detailed DPDP/legal data-retention policy for tenant PII and documents.

## Decisions

- Generate one monthly invoice per active tenant on the 1st of each month; the default payment due date is the 5th. The owner may configure a different due date in a later release.
- Invoice generation must be idempotent: rerunning the job cannot create duplicate monthly invoices for the same tenant/month.
- Send rent reminders on the 1st and 5th, with the 5th treated as the default due date.
- All scheduled jobs and stored/displayed timestamps use the `Asia/Kolkata` timezone.
- Operational database backups: daily snapshot with 30-day retention, with the restore procedure tested at least quarterly.
- Planned maintenance window: 02:00-04:00 IST, with incident communication.

## Consequences

- API and database documentation can describe invoice timing and reminder behavior as fixed business rules rather than open questions.
- Deployment and environment configuration can assume a fixed `Asia/Kolkata` timezone without waiting on other pending decisions.
- Backup/restore practices can be implemented and tested now, independent of the unresolved detailed DPDP/legal retention policy, which governs how long tenant PII and documents may be retained (not how the operational database itself is backed up).

## Unresolved

- Monthly invoice scheduler mechanism, job runner, and hosting platform that executes the timing policy above: **UNKNOWN — REQUIRES DECISION**
- Next.js hosting vendor: **UNKNOWN — REQUIRES DECISION**
- SMS vendor/provider: **UNKNOWN — REQUIRES DECISION**
- Detailed DPDP/legal retention policy and retention durations for tenant PII/documents: **UNKNOWN — REQUIRES DECISION**
- Prefer India-based hosting and data regions where available; the exact Next.js hosting provider remains **UNKNOWN — REQUIRES DECISION**
