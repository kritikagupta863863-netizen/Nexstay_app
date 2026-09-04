# Deployment plan

## Current status

No deployment configuration or hosting files are present in this repository.

## Intended deployment model

Based on the approved decisions, the likely target stack is:

- Frontend hosting: separately deployable Next.js application; vendor is UNKNOWN — REQUIRES DECISION
- Region preference: use India-based hosting and data regions where available; the exact Next.js hosting provider remains UNKNOWN — REQUIRES DECISION
- API/data layer: Supabase PostgreSQL and Supabase Auth
- Storage: Supabase Storage
- SMS: provider abstraction; vendor is UNKNOWN — REQUIRES DECISION. Notification work is blocked until selected; in-app-only is not the MVP substitute.
- PDF invoices/reports: synchronous, bounded server-side HTML-to-PDF for MVP; queued generation is deferred
- Invoice timing (decided): generate on the 1st of each month with a default due date of the 5th, idempotent per tenant/month; reminders sent on the 1st and 5th
- Scheduling timezone (decided): all scheduled jobs use `Asia/Kolkata`
- Monthly invoice scheduler mechanism/job runner and hosting: UNKNOWN — REQUIRES DECISION (the timing policy above is decided; the automation mechanism is not)
- Operational database backups (decided): daily snapshot, 30-day retention, quarterly-tested restore
- Detailed retention/legal policy: UNKNOWN — REQUIRES DECISION

## Production considerations

- Use HTTPS
- Define environment variables for every environment
- Configure monitoring and health checks
- Set up rollback strategy for schema or app release issues
- Ensure domain, DNS, and certificate configuration are properly handled
- Run daily database backups with 30-day retention and test restores quarterly (decided operational policy; distinct from the still-unresolved DPDP/legal data-retention policy)
- Schedule planned maintenance within 02:00-04:00 IST with incident communication

## Deployment checklist

- app builds successfully
- env vars are present
- DB schema is deployed
- storage buckets are configured
- the selected SMS provider is configured before notification work is enabled
- KYC storage upload-token rules, exactly one Aadhaar-or-PAN file, file limits (PDF/JPEG/PNG, 10 MB), and mandatory malware scanning are configured; reject uploads whenever scanning is unavailable or fails
- synchronous PDF limits are documented and tested
- health checks pass
