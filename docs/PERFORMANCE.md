# Performance standards

## Goals

- Keep dashboard operations responsive for small-to-medium property management workloads.
- Avoid unnecessary re-renders and duplicated requests.
- Prefer lazy loading for heavier view islands and large table data.

## Principles

- Optimize real slow paths before adding abstraction.
- Consider page-level code splitting.
- Use image compression where property photos or tenant uploads are involved.
- Cache data where it is safe and helpful.
- Limit repeated API requests and expensive reports.

## Future measurement

Use real device and browser profiling once implementation exists, especially for dashboard screens, invoice views, and large tenant lists.
