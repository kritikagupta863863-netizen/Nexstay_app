# AGENTS.md

## Repository context

This repository currently contains product and design artifacts for NexStay. The project is not yet a live code implementation.

## Operating rules

- Read the product docs before proposing changes.
- Confirm what is actual versus planned.
- Prefer targeted documentation updates over large rewrites.
- Use the existing design and requirements docs as the primary source of truth.
- Mark missing information as `UNKNOWN — REQUIRES DECISION`.
- Do not fabricate backend APIs, data schema, or environment values.
- Keep future implementation plans aligned with the business and technical requirements in the repo.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
