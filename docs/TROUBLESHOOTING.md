# Troubleshooting

## Missing implementation symptoms

- The repo contains no `package.json`: the app skeleton has not been created yet.
- The repo contains no environment variables: create `.env.example` and copy to local environment as needed.
- Missing backend or database implementation: confirm the project is still in product-definition phase before building runtime code.

## Product-documentation issues

- If product requirements or design docs conflict, resolve them against the PRD and SRS before making code changes.
- If a requirement is uncertain, mark it as `UNKNOWN — REQUIRES DECISION` rather than assuming behavior.
