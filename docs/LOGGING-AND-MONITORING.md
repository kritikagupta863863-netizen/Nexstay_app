# Logging and monitoring

## Current status

No application logging or monitoring implementation exists in the repository.

## Intended requirements

- Log security-relevant events such as failed login attempts and permission denials.
- Log invoice generation, payment recording, and complaint transitions.
- Capture runtime errors without storing secrets.
- Capture performance issues for slow dashboard or report operations.
- Use monitoring dashboards for operational visibility once the app is running.

## Must never be logged

- passwords
- OTP codes
- API keys
- tokens
- KYC documents
- raw sensitive tenant records
