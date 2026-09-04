# Environment configuration

## Current status

There is no runtime environment configuration in the repository.

## Recommended environment variables

Create a `.env.example` file with placeholders for:

```env
NEXT_PUBLIC_APP_NAME="NexStay"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
NEXT_PUBLIC_APP_ENV="development"
# Decided: all scheduled jobs and displayed timestamps use this fixed timezone.
APP_TIMEZONE="Asia/Kolkata"

# SMS provider settings remain unconfigured and UNKNOWN — REQUIRES DECISION.
# Notification work is blocked until a vendor is selected.
SMS_PROVIDER_API_KEY="set-after-vendor-selection"
SMS_PROVIDER_FROM="set-after-vendor-selection"

# Monthly invoice scheduler/job-runner variables remain undefined until the
# scheduler mechanism is selected: UNKNOWN — REQUIRES DECISION. The invoice
# timing policy itself (1st of month, due on the 5th) is already decided.

# Malware scanning is mandatory for KYC uploads. If these are unset or the
# scanner is unavailable, the server must reject the upload (never accept or
# silently quarantine it).
MALWARE_SCANNER_ENDPOINT="required-provider-endpoint"
MALWARE_SCANNER_API_KEY="required-provider-key"
```

## Requirements

- Keep all secrets server-side unless explicitly public.
- Never commit real credentials.
- Use environment-specific values for local, staging, and production.
- Keep the SMS integration behind a provider abstraction until vendor selection; do not ship an in-app-only MVP substitute.
- KYC upload tokens, exactly one Aadhaar-or-PAN file, file-type/size validation, and mandatory malware scanning are server-side concerns, not client configuration. Passport, address-proof, and rental-agreement uploads are not part of the MVP.
- Application timezone (`Asia/Kolkata`) is fixed and decided; it may be set as a build-time or runtime constant rather than an env var if preferred.
- Prefer India-based hosting and data regions where available. The exact Next.js hosting provider, monthly invoice scheduler mechanism/job runner, and detailed retention/legal policy are **UNKNOWN — REQUIRES DECISION**; add scheduler and hosting-specific settings only after those decisions.
