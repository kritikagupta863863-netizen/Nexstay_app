# Git workflow

## Recommended conventions

- Use descriptive branch names such as `feature/property-onboarding` or `fix/overdue-invoice-state`.
- Keep each PR focused on a single concern.
- Write clear commit messages.
- Require review for production-affecting changes.
- Use pull requests for all merges to the main branch.

## Recommended flow

1. Create a feature branch.
2. Implement the change and update docs if required.
3. Run validation commands.
4. Open a PR with a clear summary and evidence.
5. Review and merge after checks pass.

## Hotfix guidance

Hotfixes should be small, isolated, and validated quickly, while preserving auditability and rollback clarity.
