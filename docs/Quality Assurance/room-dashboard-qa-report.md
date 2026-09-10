# QA Report — NexStay Room & Dashboard Pages

**Date:** 11 September 2026  
**Reviewed by:** Antigravity QA  
**Pages Covered:** `/rooms`, `/rooms/[id]`, `/rooms/[id]/edit`, `/` (Dashboard)

---

## 📋 Rooms List Page (`/rooms`)

| # | Issue | Severity |
|---|-------|----------|
| 1 | **No "Add Room" button** — there is a heading area but no CTA to add a new room. A PG manager needs to add rooms eventually. | Medium |
| 2 | **Floor filter is hardcoded** — Floor 1/2/3 buttons are hard-coded in the UI even though floors could vary per property. They should be derived dynamically from `getRooms()`. | Medium |
| 3 | **Occupancy column shows just "1/2"** — there is no visual progress bar. The design system already uses occupancy bars in other places; consistency is missing here. | Low |
| 4 | **Action label inconsistency** — the action column shows "Assign", "Schedule", or "Details" based on status, but there is no visual distinction (same blue link text for all three). Vacant rooms should feel more inviting, Maintenance should feel urgent. | Low |
| 5 | **Bento stat cards are not clickable** — clicking "Occupied" card should auto-filter the table below to show only occupied rooms. Currently there is no connection between the stat cards and the table filter. | Medium |
| 6 | **No search bar** — with 12+ rooms, a search by room number or tenant name would improve usability significantly. | Medium |

---

## 📋 Room Detail Page (`/rooms/[id]`)

| # | Issue | Severity |
|---|-------|----------|
| 7 | **Hero image is hardcoded** — every room shows the exact same Unsplash bedroom photo. It should either rotate per room or show a placeholder/icon when no image is uploaded. | High |
| 8 | **Tenant IDs are random on every render** — `Math.random()` inside JSX generates a new ID on every page load. This is unstable and would cause hydration errors in production. IDs should be part of the data model. | High |
| 9 | **Floor label is always "Block A"** — the block info is hardcoded. Every room reads "1st Floor • Block A" even if the block differs. | Medium |
| 10 | **"Furnishing" is hardcoded as "Fully Furnished"** — the data model has no furnishing field yet, so all rooms show the same value regardless. | Medium |
| 11 | **"View Profile" and "Manage Lease" buttons are dead** — they do nothing on click. Should either link somewhere or show a toast "Coming soon" to avoid dead-end UX. | Low |
| 12 | **The "more_vert" (⋮) menu button does nothing** — there is no dropdown or action attached. Should be disabled or have a stub menu. | Low |
| 13 | **Recent History table is fully static** — same two rows (Routine Cleaning, AC Repair) appear for every room regardless of its actual history. | Medium |

---

## 📋 Edit Room Page (`/rooms/[id]/edit`)

| # | Issue | Severity |
|---|-------|----------|
| 14 | **"Save Changes" is a Link, not a submit button** — it navigates back to the detail page without actually processing the form. The form has `action={...}` but it is an HTML GET navigation, not a POST. Should use a `<button type="submit">` inside the form. | High |
| 15 | **Furnishing status always defaults to "furnished"** — does not read the room's actual furnishing from the data. The room data doesn't have this field yet either. | Medium |
| 16 | **"DRAFT" badge has no meaning** — the badge says "DRAFT" but it is never updated to "Saved" or removed. It is purely decorative right now. | Low |
| 17 | **Image upload is non-functional** — the "ADD IMAGES" button and the delete (✕) buttons on images do nothing. At minimum there should be a placeholder file input behind the button. | Medium |
| 18 | **Amenities checkbox section is missing** — the original design had checkboxes for individual amenities (AC, WiFi, Laundry etc.). Currently there is only a free-text area, which is weaker UX. | Medium |
| 19 | **Audit log date is hardcoded** — "Last edited by System Admin on Oct 24, 2023" is static for all rooms. | Low |

---

## 📋 Dashboard (`/`)

| # | Issue | Severity |
|---|-------|----------|
| 20 | **Date is hardcoded** — "SATURDAY, 5 SEPTEMBER 2026" should either use `new Date()` dynamically or be clearly labelled as a preview. | Medium |
| 21 | **"Good morning" greeting doesn't follow time of day** — it always says "Good morning" even if viewed at night. Should show "Good afternoon" / "Good evening" based on the current hour. | Low |
| 22 | **Revenue, Pending Rent, Monthly Expense are static** — these three metric cards show hardcoded values (₹1,84,500 etc.). Only Occupancy is now dynamic. They should be flagged or tied to data. | Medium |
| 23 | **Revenue chart trend & expense data are hardcoded** — the bar chart has static month/value pairs. Once billing data is added, this chart should draw from the central data layer. | Low |
| 24 | **"Collect Rent" button does nothing** — it is a prominent CTA but has no action or link. Should route to `/billing` or show a modal. | Medium |

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 High | 3 (Issues #7, #8, #14) |
| 🟡 Medium | 13 |
| 🟢 Low | 8 |

---

## Priority Order for Next Session

**Fix first (High — functional bugs):**
1. `#14` — Save Changes button not submitting the form
2. `#8` — Tenant IDs using `Math.random()` (hydration risk)
3. `#7` — Hero image is the same for all rooms

**Fix second (Medium — data integrity):**
4. `#10` & `#15` — Add `furnishing` field to data model and wire it up
5. `#5` — Make bento stat cards filter the table
6. `#9` — Remove hardcoded "Block A"
7. `#20` — Dynamic date on Dashboard

**Fix last (Low — polish):**
8. `#3` — Add occupancy progress bars to the rooms table
9. `#21` — Time-aware greeting
10. `#11`, `#12` — Wire up dead buttons
