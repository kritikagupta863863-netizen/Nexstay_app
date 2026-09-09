# NEXSTAY — Core Engineering Instructions

You are working on NEXSTAY, a production-oriented software platform.

These instructions apply to ALL development, debugging, refactoring, testing, architecture and implementation tasks.

## 1. DEVELOPMENT PRINCIPLES

Follow these principles:

- Understand before changing.
- Inspect the existing code before implementing anything.
- Prefer simple, maintainable solutions over clever or unnecessarily complex solutions.
- Reuse existing components, utilities, services and patterns whenever possible.
- Do not duplicate functionality that already exists.
- Do not rewrite working code without a clear reason.
- Do not modify unrelated files or functionality.
- Keep changes focused and reviewable.
- Preserve existing behavior unless the requested change explicitly requires otherwise.
- Do not introduce a new library, framework or architectural pattern without first checking whether the existing stack can solve the problem.

## 2. AI CODING WORKFLOW

For every non-trivial task:

1. Understand the request.
2. Inspect the relevant codebase and existing implementation.
3. Identify dependencies and affected areas.
4. Determine whether database, API, authentication, authorization or security changes are involved.
5. Create a concise implementation plan before making substantial changes.
6. Implement the smallest coherent solution.
7. Run the relevant tests, type checks, linting and/or build.
8. Inspect the resulting behavior.
9. Fix problems discovered during validation.
10. Report what changed and what was actually tested.

Do not claim that a feature is complete merely because code was generated successfully.

A feature is complete only when its intended behavior has been verified.

## 3. EXISTING CODEBASE

Before creating a new:

- component
- page
- API
- service
- utility
- hook
- database table
- database function
- type
- validation schema

search the existing codebase for equivalent or related functionality.

Prefer extending existing architecture over creating parallel implementations.

Follow the conventions already established in the repository unless there is a strong technical reason to change them.

## 4. ARCHITECTURE

Maintain clear separation between:

- presentation/UI
- application/business logic
- data access
- external integrations
- authentication
- authorization
- infrastructure

Business rules must not exist only in the frontend.

Important business logic should be enforced at a trusted server-side boundary.

Avoid unnecessary abstraction.

Do not create abstractions until there is a real reuse or architectural need.

## 5. SECURITY

Security is a mandatory consideration for every feature.

Never trust values supplied by the client for:

- identity
- user role
- permissions
- ownership
- pricing
- payment status
- credits
- subscription status
- administrative privileges

Authentication answers:
"Who is the user?"

Authorization answers:
"What is the user allowed to do?"

Always treat them as separate concerns.

Sensitive authorization must be enforced server-side and/or at the database layer.

Never rely on frontend visibility or disabled UI elements as a security mechanism.

Always consider:

- authentication
- authorization
- role-based access
- ownership
- tenant isolation
- data leakage
- privilege escalation
- insecure direct object references
- input validation
- secrets
- external API credentials

Never expose secrets, API keys or private credentials in client-side code or source control.

## 6. DATABASE

Treat database changes as architectural changes.

Before modifying a schema:

- inspect existing tables and relationships
- identify affected queries
- identify affected application code
- consider existing permissions
- consider data migration requirements
- consider backward compatibility
- consider rollback/recovery

Never casually delete or rename existing database fields, tables or relationships.

Never use frontend filtering as the primary security mechanism for sensitive data.

Database-level permissions/security must be considered where appropriate.

## 7. VALIDATION

Validate important inputs on the server.

Client-side validation is for user experience.

Server-side validation is for correctness and security.

Validate:

- types
- required fields
- ranges
- formats
- ownership
- permissions
- business rules
- external API responses

Never assume external services will always return valid data.

## 8. ERROR HANDLING

Do not silently swallow errors.

Errors should:

- be handled deliberately
- provide useful information to developers
- avoid exposing sensitive internal information to users
- preserve useful logging/context

Every important user workflow should have sensible:

- loading states
- empty states
- error states
- success states

## 9. TESTING

When modifying existing functionality:

- identify relevant existing tests
- update them when necessary
- add tests for important new behavior
- add regression tests for meaningful bugs

Test both:

- expected behavior
- failure/edge cases

For security-sensitive functionality, test unauthorized behavior as well as authorized behavior.

## 10. DEBUGGING

When debugging:

1. Reproduce the problem.
2. Capture the actual error or observed behavior.
3. Compare expected vs actual behavior.
4. Inspect the relevant implementation.
5. Identify the most likely root cause.
6. Make the smallest appropriate fix.
7. Reproduce the problem again.
8. Add a regression test when appropriate.

Do not randomly modify multiple unrelated parts of the system in an attempt to fix a problem.

## 11. DEPENDENCIES

Before adding a dependency:

- check whether the repository already contains an equivalent capability
- check whether the existing framework provides the functionality
- consider bundle size and runtime impact
- consider maintenance/security implications

Do not add dependencies simply because they make implementation slightly easier.

## 12. GIT AND CHANGES

Keep changes:

- small
- focused
- understandable
- reversible

Do not modify unrelated files.

Do not remove working functionality without explicit justification.

Before considering a task complete, inspect the effective diff and make sure the changes match the requested task.

## 13. PERFORMANCE

Do not prematurely optimize.

First make the system:

1. correct
2. secure
3. maintainable

Then optimize based on evidence.

Avoid unnecessary:

- database queries
- API calls
- network requests
- renders
- expensive computations
- duplicated data fetching

## 14. DOCUMENTATION

When a change introduces an important architectural decision, business rule or non-obvious implementation detail, document it.

Documentation should explain WHY something exists, not merely repeat what the code does.

## 15. COMMUNICATION

When reporting completed work, clearly state:

- what was changed
- which files/modules were affected
- important architectural decisions
- tests/checks that were run
- whether those checks passed
- known limitations or remaining uncertainty

Never say "everything works" unless the relevant behavior was actually tested.

## 16. WHEN REQUIREMENTS ARE AMBIGUOUS

Do not invent important business requirements.

If ambiguity could materially affect:

- architecture
- security
- database design
- user experience
- business logic
- financial behavior

identify the ambiguity before making a major implementation decision.

For minor ambiguity where a safe default exists, use the simplest reasonable interpretation and clearly state the assumption.

## 17. NEXSTAY-SPECIFIC PRIORITY

When technical convenience conflicts with:

- data security
- tenant privacy
- financial correctness
- authorization
- data integrity
- maintainability

prioritize the latter.

Build for a real production product, not merely a working demo.

## FINAL RULE

Do not optimize for generating the most code.

Optimize for producing the smallest amount of correct, secure, maintainable code that solves the actual problem.