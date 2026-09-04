# ADR 0001: Use Next.js + Supabase for the NexStay owner ERP

- Status: Accepted
- Date: 2026-09-03

## Context

The project requirements and TODO list clearly point to a web application for PG owners with strong mobile-first workflows. The product needs authentication, data storage, file handling, and operational dashboards.

## Decision

Use a separately deployable Next.js application with TypeScript on the frontend and Supabase for authentication, PostgreSQL, and file storage. Prefer India-based hosting and data regions where available; the exact Next.js hosting vendor remains UNKNOWN — REQUIRES DECISION.

## Alternatives considered

- Full custom backend + database stack: more engineering overhead and slower product delivery.
- Native mobile apps: too heavy for the MVP and inconsistent with the product stage.
- Pure frontend-only solution: insufficient security and persistence for operational data.

## Consequences

Positive:
- Faster MVP delivery
- Secure auth and storage primitives
- Strong fit for a mobile-first dashboard product

Negative:
- Requires thoughtful access control and schema design
- Adds dependency on the chosen platform's operational model
- Requires a separate hosting decision for the Next.js application
