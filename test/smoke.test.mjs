import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Next.js scaffold has an owner dashboard entry point", async () => {
  const page = await readFile("src/app/page.tsx", "utf8");
  assert.match(page, /DashboardShell/);
});

test("dashboard exposes the rooms vertical slice navigation", async () => {
  const dashboard = await readFile("src/components/dashboard-shell.tsx", "utf8");
  assert.match(dashboard, /href="\/rooms"/);
  assert.match(dashboard, /View all/);
});

test("rooms route uses typed preview data and room interactions", async () => {
  const rooms = await readFile("src/components/rooms-view.tsx", "utf8");
  assert.match(rooms, /type RoomStatus/);
  assert.match(rooms, /role="tablist"/);
  assert.match(rooms, /View details/);
});
