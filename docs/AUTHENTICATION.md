# Authentication and authorization

## Current status

No authentication implementation exists in the repository yet.

## Intended model

Supabase Auth is approved as the identity provider. The exact OTP/password configuration remains an implementation detail.

The design and SRS suggest the following:

- Owner login with mobile OTP, with email/password fallback
- Mobile OTP delivery depends on the same unresolved SMS vendor/provider selection used for notifications: **UNKNOWN — REQUIRES DECISION**. Email/password login and password reset remain available independent of that decision.
- Tenant portal access is deferred from MVP; tenant interactions are represented by owner-entered records and notifications.
- `owner_id` and `property_id` as primary authorization boundaries
- Session or token management handled by Supabase Auth
- Supabase Auth authenticates the owner but does not authorize KYC access; each KYC upload-token request must independently verify the current owner/property scope server-side.

## Proposed flow

1. Owner signs up.
2. Mobile OTP verifies identity; email/password is the fallback path.
3. Application attaches user session.
4. Backend checks property ownership and tenant scope for each request.
5. Dashboard shows only permitted owner/property data; tenant portal authorization is a future decision.

## Roles

- Owner: full property management access
- Tenant: no authenticated application role in MVP
- System operator: separate operational role

## Authorization rules

- Owners must not access another owner's property data.
- Tenants must not access other tenants' records or financial history.
- All mutations must be validated against current ownership and state.

## Security notes

- Never trust client-side role claims.
- Keep password handling, OTP flow, and session expiry under secure server-side control.
- Use proper rate limiting and logs for authentication events.
- Password reset and OTP issuance/verification must be rate-limited and handled through Supabase Auth.
- Do not issue application sessions based only on a client-provided role, owner ID, property ID, or phone/email claim.
