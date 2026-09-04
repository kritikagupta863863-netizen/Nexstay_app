# NexStay internal dashboard

This is a deliberately separate, dependency-free project dashboard. It reads
`data/tasks.json` and `data/activity.json` and provides summary counts, status
groups, search/filter controls, recent activity, manual refresh, and optional
60-second auto-refresh.

## Run locally

From the repository root, use any static HTTP server, for example:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/dashboard/>. Opening `index.html` directly with
`file://` will not work because browsers restrict JSON `fetch` requests.

## Data and update workflow

- `data/tasks.json` is a lightweight snapshot derived from `status/TASKS.md`.
  Keep stable `NS-T###` IDs, status, priority, area, and ISO dates.
- `data/activity.json` is an append-only event log derived from
  `status/JOURNAL.md`. Add a new event when work starts, completes, is blocked,
  or changes.
- The dashboard does **not** capture tool calls, commits, or file changes
  automatically. Any action update must be recorded by editing the task JSON
  and appending an event to the activity JSON, alongside the canonical status
  documents when appropriate.
- The full task board and project decisions remain in `status/TASKS.md`,
  `status/JOURNAL.md`, and `status/PROJECT-STATUS.md`; this dashboard is only a
  convenient internal view.
