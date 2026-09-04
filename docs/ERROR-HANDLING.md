# Error handling

## Principles

- Never silently ignore failures.
- Provide user-facing feedback for expected failures.
- Log technical failures with enough context to debug, but without exposing secrets or sensitive data.
- Keep validation and permission errors explicit.

## Error categories

- validation errors
- authentication errors
- data not found
- authorization failures
- payment or invoice inconsistencies
- network issues
- unexpected exceptions

## Future behavior

- Display inline validation for form errors.
- Show safe empty and retry states for failed data loads.
- Use consistent error messages across the app.
