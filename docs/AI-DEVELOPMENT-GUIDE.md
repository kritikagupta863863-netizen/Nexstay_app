# AI development guide

## How to inspect this repository

1. Read the project requirements first: `docs/prd/owner-erp.md` and `docs/srs/owner-erp-srs.md`.
2. Review the design references in `Design Files/stitch_pg_management_hub/`.
3. Check product and engineering status in `status/PROJECT-STATUS.md` and
   `status/TASKS.md`; review `status/JOURNAL.md` for recent changes.
4. Confirm whether the task affects real code or only plan documentation.

## File reading order

1. README.md
2. docs/ARCHITECTURE.md
3. docs/PRD.md and docs/SRS.md
4. relevant module design or feature docs
5. app code, if it exists later

## Architecture rules

- The product is owner-first and mobile/tablet-first responsive web; desktop and laptop layouts are not design targets, with no separate native mobile design.
- Data boundary is owner and property scoped.
- Room, tenant, invoice, and complaint flows are central domain concerns.
- Notification and payment workflows should be treated as critical business processes.

## Where future code belongs

Use a conventional frontend structure such as:

- `src/app` for routes
- `src/components` for UI blocks
- `src/lib` for configuration and service clients
- `src/modules` for business operations
- `src/types` for shared domain models

Do not invent new domain patterns without checking the actual implementation when it exists.

## What must never be changed casually

- access-control boundaries
- tenant and invoice states
- document storage rules
- required metrics and reporting assumptions
- environment variable contracts

## How to test changes

- Validate code-level logic with targeted tests.
- Run lint and type checks when a runtime app exists.
- Verify business flow outcomes for onboarding, tenancy, invoice, and complaint states.

## How to update documentation

If a change alters architecture, domain behavior, environment variables, or product assumptions, update the relevant docs immediately.

## How to handle uncertainty

If information is missing, stop and record `UNKNOWN — REQUIRES DECISION` rather than inventing requirements.
