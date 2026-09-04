# Contributing

## Repository setup

1. Review the PRD and SRS before making changes.
2. Confirm the intended app architecture from `docs/ARCHITECTURE.md`.
3. Check whether the change is product, design, or implementation work.
4. Review the current task board in `status/TASKS.md`; update the task and
   `status/JOURNAL.md` when work changes status.

## Creating a feature

- Start with the relevant requirement.
- Review existing design references.
- Update the relevant docs when the feature is implemented.
- Add tests for meaningful business logic.

## Validating changes

- Run type checks and linting for the implementation stack.
- Validate business logic with focused tests.
- Ensure security, accessibility, and data-boundary concerns are addressed.

## Pull requests

- Keep PRs narrowly scoped.
- Summarize the change, affected files, and validation used.
- Call out any unknowns or assumptions.
- Use a stable `NS-T###` task ID for tracked work and do not invent scope beyond the
  product and technical decisions documented in the repository.
