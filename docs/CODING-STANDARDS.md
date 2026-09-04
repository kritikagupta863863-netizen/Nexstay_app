# Coding standards

## Language and typing

- Prefer TypeScript over JavaScript for all new app code.
- Use explicit interfaces and domain types.
- Avoid `any` unless absolutely necessary and documented.
- Do not overuse type assertions.
- Reuse domain models across app layers instead of duplicating structures.

## Naming conventions

- Components: PascalCase (`PropertyCard`, `TenantForm`)
- Functions: camelCase (`generateInvoice`, `calculateOverdue`) 
- Constants: UPPER_SNAKE_CASE (`DEFAULT_RENT_DUE_DAY`)
- Hooks: use `useX` naming (`useTenantSummary`, `useDashboardStats`)
- Services: noun-based or action-based modules (`tenantService`, `invoiceService`)
- Types: descriptive nouns and domain contexts (`Tenant`, `InvoiceStatus`, `PropertyRecord`)
- Files: kebab-case or domain-based names (`tenant-form.tsx`, `invoice-service.ts`)
- Folders: lowercase and purpose-based (`app/`, `components/`, `lib/`, `modules/`)

## React and UI rules

- Keep components focused and loosely coupled.
- Separate business logic from display components.
- Avoid giant components and deeply nested conditional UI.
- Prefer clear loading, empty, and error states for all asynchronous operations.
- Minimize prop drilling by using a sensible module boundary and shared domain hooks.
- Use memoization only where there is an actual measurable need.

## Architecture rules

- Single responsibility by module
- Clear dependency direction from presentation to domain and infrastructure layers
- Avoid circular dependencies
- Keep side effects explicit and centralized
- Prefer boring, understandable code over clever abstractions

## Error handling

- Never silently swallow errors.
- Surface meaningful errors to users and logs without exposing secrets.
- Handle expected API failures explicitly.
- Keep validation and recovery paths obvious and user-friendly.

## Async behavior

- Handle loading, empty, error, and disabled states explicitly.
- Be aware of race conditions and stale closures.
- Avoid unbounded retries without user feedback.

## Documentation comments

- Add comments only where they provide reasoning or explain a non-obvious decision.
- Prefer clarity and domain semantics over comments that state the obvious.

## Project-specific expectations

- Respect the owner / tenant / property ownership boundaries.
- Keep money and document-handling logic safe and explicit.
- Preserve a clear distinction between UI concerns and business logic.
