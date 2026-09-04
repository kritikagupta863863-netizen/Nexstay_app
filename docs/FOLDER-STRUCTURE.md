# Folder structure

## Actual repository structure

```text
Nexstay App/
├── .DS_Store
├── Design Files/
│   └── stitch_pg_management_hub/
│       ├── add_new_tenant_with_kyc/
│       ├── complaints_management/
│       ├── dashboard_with_elaborate_revenue_graph/
│       ├── efficient_residency_management/
│       ├── notifications_broadcasts_hub_dynamic_form/
│       └── ...
├── docs/
│   ├── prd/
│   │   └── owner-erp.md
│   ├── srs/
│   │   └── owner-erp-srs.md
│   └── ... (future project docs live here)
├── status/
│   ├── README.md
│   ├── PROJECT-STATUS.md
│   ├── TASKS.md
│   └── JOURNAL.md
├── product_pdfs/
│   ├── NEXSTAY Business Plan.pdf
│   ├── NEXSTAY Overview.pdf
│   └── Nexstay Pitch Deck - BeyondX.pdf
├── README.md
└── .env.example
```

## Purpose of each top-level area

### `Design Files/`

Purpose: design references and mockups for the product UI.

What belongs here:
- concept screens
- design system metadata
- UI explorations

What does not belong here:
- production app code
- database migrations
- backend services

### `docs/`

Purpose: product, technical, and process documentation.

What belongs here:
- PRD and SRS
- architecture and engineering standards
- ADRs, testing, and workflows
What does not belong here:
- source code
- generated build artifacts
- secrets or credentials

### `status/`

Purpose: project status, task tracking, and task history.

What belongs here:
- project status and approved decisions
- the stable task board
- date-wise task history

What does not belong here:
- product or technical documentation (keep those under `docs/`)

### `product_pdfs/`

Purpose: product documents and business plan assets.

What belongs here:
- market overview and pitch material
- product planning references

What does not belong here:
- technical implementation docs
- runtime files

## Naming conventions

- Use lowercase hyphenation for files and directories where possible.
- Use descriptive names such as `owner-erp.md`, `ARCHITECTURE.md`, or `feature-tenant-management.md`.
- Keep docs and product artifacts distinct from application source files.

## Dependency rules

- Product docs must be source-of-truth for product expectations.
- Screens and design mockups should inform UX decisions, not replace implementation docs.
- Future implementation code should live outside the `docs/` and `Design Files/` directories.

## Planned future structure

The future application code should likely follow a standard Next.js layout such as:

```text
src/
├── app/
├── components/
├── lib/
├── modules/
├── types/
├── utils/
└── hooks/
```

This is a proposed future structure, not a current implementation.
