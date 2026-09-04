# NexStay status and tracking

This directory contains all NexStay status and tracking records for the
documentation-first repository. `PROJECT-STATUS.md` is the project-level overview and
decision record; `TASKS.md` is the current board; and `JOURNAL.md` is the date-wise
activity log. The tracker preserves the actionable items previously recorded in the
former TODO list and the status/decision information previously held in
`PROJECT-STATUS.md`.

The lightweight internal dashboard is available at [`../dashboard/`](../dashboard/).
It is a JSON-backed convenience view, not an automatic activity collector. Keep the
canonical task board and journal authoritative, then update the dashboard JSON snapshot
and append its activity event when recording dashboard-visible work.

## Statuses

- **Required** — approved work that is not started and is needed for the current scope.
- **In progress** — actively being worked on.
- **Completed** — verified as complete in the repository documentation.
- **Blocked / decision needed** — cannot proceed until the stated dependency or decision is resolved.
- **Deferred** — explicitly moved out of the first launch; do not treat as current scope.
- **Future** — a placeholder for later approved work (add only when there is a documented source).

## Task fields

Every task has stable ID, status, priority, area, created, updated, and (when applicable)
completed fields. Dates are ISO `YYYY-MM-DD`. The original TODO list did not record
per-item creation dates, so imported tasks use `2026-09-05` and note that their source
date was not recorded.

Priority is intentionally lightweight:

- **P0** — prerequisite or current vertical-slice gate
- **P1** — current MVP work
- **P2** — deferred or later work

## Updating the tracker

1. Read the relevant PRD, SRS, ADR, or feature document before changing a task.
2. Add a new stable ID (`NS-T###`) to `TASKS.md`; never reuse an ID.
3. Set all required fields and keep the description limited to documented scope.
4. Change the task status rather than duplicating it in another section.
5. Update `updated`; set `completed` only when completion is verified.
6. Add one entry to `JOURNAL.md` using the date of the change and event
   (`added`, `started`, `completed`, `deferred`, `blocked`, or `unblocked`).
7. If a product or technical decision changes, update the source decision document as
   well as the task tracker. The tracker is not a replacement for requirements or ADRs.

## Adding a future task

Add it to the **Future** section with the next unused ID, a documented source, and
`status: Future`. Promote it to **Required** only after the scope is approved and record
the promotion in `JOURNAL.md`.

## Related documents

- `PROJECT-STATUS.md` — project-level status and approved decisions
- `../docs/TESTING.md` — testing gate and vertical-slice baseline
- `../docs/CONTRIBUTING.md` — contribution workflow
