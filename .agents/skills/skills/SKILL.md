# 01 — feature-development

---
name: feature-development
description: Implements NEXSTAY features through a structured inspect-plan-build-test workflow while preserving architecture, security, and existing behavior.
---

# Feature Development

## Purpose
Provide a consistent workflow for implementing NEXSTAY features without unnecessary complexity or scope expansion.

## Workflow
1. Understand the requirement and user outcome.
2. Inspect existing architecture and related code.
3. Identify affected UI, API, database, integrations, and permissions.
4. Plan the smallest complete implementation.
5. Reuse existing patterns and components.
6. Implement the feature.
7. Test success, failure, permissions, and important edge cases.
8. Review the final change for regressions.
9. Report what was implemented and verified.

## Rules
- Do not rewrite working code unnecessarily.
- Do not expand scope without reason.
- Never trust client-side security.
- Preserve existing contracts unless change is intentional.
- Do not claim completion without verification.

---

# 02 — database-migration

---
name: database-migration
description: Safely designs and applies NEXSTAY database changes while preserving data integrity, tenant isolation, compatibility, and migration safety.
---

# Database Migration

## Purpose
Make database changes safely and predictably.

## Workflow
1. Inspect current schema and migrations.
2. Identify affected models, queries, APIs, and data.
3. Define relationships, ownership, constraints, and indexes.
4. Design the smallest safe migration.
5. Consider existing production data and backfill needs.
6. Check RLS and tenant isolation.
7. Apply the migration.
8. Validate schema and application compatibility.

## Rules
- Never casually modify applied migrations.
- Avoid destructive changes without a recovery strategy.
- Preserve historical financial data.
- Use constraints for important invariants.
- Consider concurrency for occupancy, bookings, and payments.
- Keep migrations backwards-compatible when practical.

---

# 03 — api-development

---
name: api-development
description: Builds and modifies NEXSTAY APIs with secure authorization, validation, business logic, predictable responses, and reliable error handling.
---

# API Development

## Workflow
1. Inspect existing API patterns.
2. Define endpoint purpose and contract.
3. Identify authentication, authorization, and ownership.
4. Validate all inputs server-side.
5. Implement business logic in the appropriate layer.
6. Return only required data.
7. Handle errors and edge cases.
8. Add relevant tests.
9. Verify the endpoint directly.

## Rules
- Never trust client-provided identity, role, price, or payment state.
- Prevent cross-tenant access.
- Protect against mass assignment and injection.
- Use transactions/idempotency where required.
- Follow existing API conventions.
- Never expose secrets or internal errors.

---

# 04 — security-audit

---
name: security-audit
description: Audits NEXSTAY features for authentication, authorization, tenant isolation, data exposure, injection, financial risks, and unsafe integrations.
---

# Security Audit

## Workflow
1. Understand the feature and trust boundaries.
2. Inspect authentication and authorization.
3. Check organization/property ownership.
4. Test unauthorized and cross-tenant scenarios.
5. Review input validation and data exposure.
6. Review database/RLS access.
7. Check financial and integration risks.
8. Report findings by severity.
9. Verify fixes with regression tests.

## Rules
Prioritize:
- authentication/authorization
- tenant isolation
- sensitive data
- financial operations
- APIs
- file uploads
- webhooks
- AI/tool access
- secrets

Do not report theoretical issues as confirmed vulnerabilities.

---

# 05 — ui-implementation

---
name: ui-implementation
description: Implements NEXSTAY UI using existing design patterns with strong UX, accessibility, responsive behavior, reusable components, and complete interface states.
---

# UI Implementation

## Workflow
1. Inspect existing components and design patterns.
2. Understand the user and primary task.
3. Reuse existing components.
4. Implement the simplest clear interaction.
5. Handle loading, empty, error, success, and disabled states.
6. Ensure responsive behavior.
7. Check keyboard and accessibility behavior.
8. Test the actual user flow.

## Rules
- Do not introduce unnecessary visual patterns.
- Do not duplicate existing components.
- Do not rely on color alone.
- Keep forms clear and accessible.
- Do not put business/security logic only in the UI.
- Preserve existing product terminology and design language.

---

# 06 — testing-and-verification

---
name: testing-and-verification
description: Tests NEXSTAY changes for functional correctness, regressions, security boundaries, edge cases, and production readiness.
---

# Testing & Verification

## Workflow
1. Inspect existing testing conventions.
2. Understand acceptance criteria.
3. Identify critical paths and risks.
4. Test the happy path.
5. Test failures and important edge cases.
6. Test permissions and tenant boundaries.
7. Add regression tests for bugs.
8. Run appropriate tests, type checks, linting, and builds.
9. Report exactly what passed or failed.

## Rules
- Test behavior, not implementation unnecessarily.
- Prefer unit/integration tests when sufficient.
- Use E2E for important user journeys.
- Never weaken tests just to make them pass.
- Never claim verification that was not performed.

---

# 07 — ai-feature-development

---
name: ai-feature-development
description: Builds NEXSTAY AI features and agents with controlled data access, structured outputs, prompt-injection resistance, reliability, and cost awareness.
---

# AI Feature Development

## Workflow
1. Determine whether AI is actually needed.
2. Define the AI responsibility.
3. Define available data and tools.
4. Define authorization boundaries.
5. Design prompt and output contract.
6. Validate structured output.
7. Add failure/fallback behavior.
8. Test normal and adversarial inputs.
9. Evaluate cost and latency.

## Rules
- AI must never bypass authorization.
- Treat user/retrieved content as untrusted.
- Minimize sensitive data sent to models.
- Never treat hallucinated values as financial truth.
- Never execute arbitrary AI-generated code/queries.
- Tool authorization must be enforced independently.
- Prefer deterministic logic for deterministic business rules.

---

# 08 — integration-development

---
name: integration-development
description: Builds secure and reliable NEXSTAY integrations with external APIs, payments, messaging, storage, authentication providers, and webhooks.
---

# Integration Development

## Workflow
1. Inspect existing integration patterns.
2. Understand the provider contract.
3. Define credentials and data boundaries.
4. Implement an isolated integration layer.
5. Validate requests and responses.
6. Handle failures, retries, and timeouts.
7. Secure webhooks.
8. Add tests.
9. Verify real integration behavior where possible.

## Rules
- Prefer official SDKs/APIs.
- Never expose credentials.
- Never blindly trust external responses.
- Verify webhook authenticity.
- Make retryable operations idempotent.
- Respect tenant and privacy boundaries.
- Avoid unnecessary dependencies.

---

# 09 — production-readiness

---
name: production-readiness
description: Evaluates NEXSTAY changes before release for functionality, security, data integrity, testing, configuration, performance, and operational risk.
---

# Production Readiness

## Checklist

Verify:

- requirements are satisfied
- critical tests pass
- type/build/lint checks pass where applicable
- authentication and authorization work
- tenant isolation is preserved
- database migrations are safe
- financial logic is correct
- secrets/configuration are safe
- integrations handle failures
- important UI states exist
- errors are handled
- logging does not expose sensitive data
- deployment and rollback implications are understood

## Rules
- Do not approve based only on compilation.
- Focus on real production risks.
- Do not introduce unrelated cleanup.
- Clearly identify anything that could not be verified.

## Output

State:

`READY` / `READY WITH RISKS` / `NOT READY`

with only the important reasons.

---

# 10 — debugging

---
name: debugging
description: Systematically diagnoses and fixes NEXSTAY bugs by reproducing failures, identifying root causes, making minimal fixes, and preventing regressions.
---

# Debugging

## Workflow
1. Reproduce the problem.
2. Identify the exact failure.
3. Trace the relevant data/control flow.
4. Find the root cause.
5. Check related code for the same issue.
6. Implement the smallest correct fix.
7. Add or update a regression test.
8. Run relevant verification.
9. Confirm the original problem is resolved.

## Rules
- Fix root causes, not symptoms.
- Do not guess when evidence is available.
- Do not randomly change unrelated code.
- Do not hide errors with retries or swallowed exceptions.
- Preserve existing behavior outside the bug.
- If the issue cannot be reproduced, clearly state that limitation.

## Output

Report:

- root cause
- fix
- affected areas
- tests
- verification
- remaining uncertainty