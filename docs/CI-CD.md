# CI/CD

## Current status

No CI/CD workflow files are present in the repository.

## Proposed future setup

A recommended future structure would include:

- linting
- type-checking
- unit and integration tests
- build validation
- deployment jobs for preview and production
- security scanning for dependencies and secrets

## Suggested branch model

- feature branches
- preview deployments for pull requests
- main branch for production deployment

## Why this matters

The app will handle PII, money, and operational workflows. A disciplined CI/CD pipeline is necessary before launch.
