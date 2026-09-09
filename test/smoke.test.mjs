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

test("app header provides multi-PG switcher, AI assistant, notifications, and profile", async () => {
  const header = await readFile("src/components/app-header.tsx", "utf8");
  assert.match(header, /pg-switcher-container/);
  assert.match(header, /NexStay AI/);
  assert.match(header, /notifications-dropdown/);
  assert.match(header, /Super Admin/);
  assert.doesNotMatch(header, /header-brand/);
});

test("bottom nav bar has 5 icon-only options: Home, Rooms, Tenant, Finance, and PG Profile", async () => {
  const bottomNav = await readFile("src/components/app-bottom-nav.tsx", "utf8");
  assert.match(bottomNav, /aria-label="Home \/ Dashboard"/);
  assert.match(bottomNav, /aria-label="Rooms"/);
  assert.match(bottomNav, /aria-label="Tenant"/);
  assert.match(bottomNav, /aria-label="Finance"/);
  assert.match(bottomNav, /aria-label="PG Profile"/);
  assert.match(bottomNav, /selected.*unselected/);
});

