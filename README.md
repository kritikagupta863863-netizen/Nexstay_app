# NexStay

NexStay is a PG management SaaS concept and product documentation set for Indian owner-operators who currently run rooms and tenants with WhatsApp, spreadsheets, and paper records.

This repository began as a documentation-first workspace. It now also contains a minimal, runnable Next.js + TypeScript owner application scaffold under `src/`. The scaffold is intentionally limited to the documented dashboard shell and visual foundation; it does not imply that production data, authentication, or integrations exist yet.

## Current implementation

The current repository contains:

- A runnable Next.js App Router shell in `src/`
- Reusable visual tokens and responsive owner dashboard primitives
- A dedicated `/preview` route with a live localhost device simulator for phone and tablet review
- Product requirements: `docs/prd/owner-erp.md`
- Solution requirements: `docs/srs/owner-erp-srs.md`
- Status and task tracking: `status/README.md`, `status/PROJECT-STATUS.md`,
  and `status/TASKS.md`
- Design system and screen mockups: `Design Files/stitch_pg_management_hub/`
- Product PDFs: `product_pdfs/`

The existing `dashboard/` folder remains the internal static project/task dashboard. It is separate from the owner-facing Next.js application.

## Intended / future implementation

The intended application is a web + PWA product for PG owners, with the following direction:

- Frontend: Next.js + TypeScript
- Styling: Tailwind CSS + UI component library
- PWA: next-pwa / service worker
- Data backend: Supabase (Postgres + auth + storage)
- Hosting: Vercel or similar
- Mobile- and tablet-first responsive owner dashboard for supported browsers
- Focus on one-property operations for up to 100 beds in MVP

Important: these are product intentions based on repository evidence and design artifacts, not implemented features.

## Repository evidence summary

### What is confirmed

- The project is focused on a PG owner ERP.
- The MVP prioritizes room, tenant, rent, expense, and complaint management.
- The product includes an owner dashboard, tenant portal, and notification flows.
- Design system conventions and screen-level prototypes exist for the owner experience.

### What is not confirmed

- No backend or frontend source code is present in this workspace.
- No live database, environment configuration, or API implementation is committed.
- No deployment pipeline or containerization configuration is present.
- No production-grade app code, tests, or package manifests exist in the repository root.

## Documentation map

- `docs/ARCHITECTURE.md` — system architecture and repository baseline
- `docs/PRD.md` — product requirements and business goals
- `docs/SRS.md` — system requirements
- `docs/FOLDER-STRUCTURE.md` — actual repo layout
- `docs/CODING-STANDARDS.md` — coding expectations for future implementation
- `docs/SECURITY.md` — security requirements and constraints
- `docs/DATABASE.md` — current and intended data design
- `docs/API.md` — planned API surface
- `docs/AUTHENTICATION.md` — identity and authorization requirements
- `docs/TESTING.md` — validation approach
- `status/PROJECT-STATUS.md` — current project status and approved decisions
- `status/` — status overview, stable task board, and date-wise task journal
- `docs/AI-DEVELOPMENT-GUIDE.md` — guidance for future AI coding agents

## Development status

Current status is best described as:

- Completed: repository discovery, requirements documents, design exploration, architecture baseline, initial Next.js application scaffold
- In progress: formalized engineering documentation and AI coding guidance
- Planned: database setup, authentication/authorization, domain workflows, PWA configuration, CI/CD, and deployment

## Recommended next steps

1. Build the real Next.js application skeleton.
2. Create Supabase schema and migrations.
3. Implement authentication and authorization.
4. Add owner dashboard, property, room, tenant, invoice, and complaint flows.
5. Add PWA asset configuration and an online-only service worker; do not add offline
   data entry or synchronization.
6. Implement tests and CI/CD before production.

## Quick reference

- Product docs: `docs/prd/owner-erp.md`
- Requirements: `docs/srs/owner-erp-srs.md`
- Design artifacts: `Design Files/stitch_pg_management_hub/`
- Task tracker: `status/TASKS.md`
- Internal project dashboard: [`dashboard/`](dashboard/)

### Responsive device preview

Start the app with `npm run dev`, then open [`http://localhost:3000/preview`](http://localhost:3000/preview).
Use the **Phone** and **Tablet** controls to switch the live dashboard viewport. The preview renders
the dashboard from `localhost:3000/` inside a device frame, so the existing dashboard route remains
unchanged and can still be used directly.

## Important note on assumptions

This project is still in a product-definition phase. All implementation guidance in these docs is intentionally explicit about what is confirmed versus what is planned. Unclear or missing requirements are labeled as `UNKNOWN — REQUIRES DECISION`.
