# NexStay Owner ERP — Design Enhancement Brief

**Status:** Approved direction for implementation and review  
**Scope:** Preserve the existing `Design Files/stitch_pg_management_hub/` screens and behavior while refining them into a cohesive, classy, cool, Apple-inspired owner experience.

## UX understanding

The primary user is a PG owner/operator using a responsive web application to manage one property and up to 100 beds. Desktop is the primary design surface; tablet and mobile layouts are responsive adaptations of the web application, not separate native mobile designs. The product must answer “what needs my attention today?” quickly, without weakening the operational truth of rooms, beds, tenants, invoices, payments, expenses, complaints, and audit history. This is an owner-only MVP: tenant portal/self-service, marketplace, staff roles, electricity billing, and automatic notification delivery remain deferred or blocked as documented in the PRD/SRS.

## Screen inventory and implementation intent

| Existing artifact | Role in MVP | Enhancement intent |
|---|---|---|
| `dashboard_with_elaborate_revenue_graph` | Owner home: KPIs, bed grid, urgent actions, six-month revenue/expense trend | Establish the visual anchor; improve scan order, chart legibility, and “next action” prominence. |
| `room_availability_table_view` | Room/bed availability and occupancy operations | Keep table-first behavior; add responsive card fallback and explicit status/filter affordances. |
| `room_detail_101` | Room overview, occupants, room actions | Make room hierarchy and occupancy state obvious; retain edit and tenant links. |
| `edit_room_details_with_image_upload` | Room attributes and images | Preserve fields and image upload; clarify save state, upload validation, and visibility. |
| `tenant_directory_tab_aware_fab` | Searchable tenant list with lifecycle tabs and add action | Preserve tabs/FAB; improve mobile table-to-card transition and keyboard row actions. |
| `add_new_tenant_with_kyc` | Move-in, bed assignment, billing, and one proof upload | Keep the transaction flow; use a clear step structure and exactly one Aadhaar-or-PAN upload. |
| `tenant_profile_detail` | Active tenant detail and operational history | Prioritize stay, bed, rent, deposit, invoice/payment summary, and safe actions. |
| `edit_tenant_profile` | Update profile, KYC metadata/file, and lease details | Preserve sections; make sensitive proof handling and unsaved changes explicit. |
| `past_tenant_profile_detail` | Checked-out tenant/stay history | Distinguish historical/read-only context from active tenant actions; retain bed history. |
| `complaints_management` | Complaint queue/kanban and SLA visibility | Keep owner-entered complaint workflow and statuses `open → in_progress → resolved → closed`; make priority/SLA readable without color dependence. |
| `reminders_management` | Reminder management concept | Preserve artifact as a future/deferred flow; do not imply active delivery until an SMS vendor is selected. |
| `notifications_broadcasts_hub_dynamic_form` | Broadcast/notification targeting concept | Preserve as a blocked/deferred design reference; clearly label delivery as unavailable pending vendor selection. |

The HTML/PNG artifacts remain visual references, not production routes or contracts. Application screens must preserve their intent and required workflows while adopting this brief's refined visual system.

## Reusable design system

### Visual direction

- **Personality:** calm precision, premium restraint, trustworthy operations; Apple-inspired through whitespace, hierarchy, quiet surfaces, and purposeful motion—not imitation or decorative gradients.
- **Foundation:** retain Hanken Grotesk for UI text/headlines and JetBrains Mono for IDs, dates, room labels, and INR amounts.
- **Palette:** preserve the existing cool slate/blue semantic palette and WCAG contrast intent. Use near-white layered surfaces, slate text, blue primary actions, and restrained emerald/amber/rose status tones.
- **Depth:** tonal layering and 1px borders first; use soft shadows only for transient overlays. Avoid heavy shadows, gradients, glass effects, and ornamental decoration.
- **Shape:** preserve disciplined 4px controls, 8px cards, 12px dialogs, and pill status chips. Keep radii consistent across all screens.

### Tokens and primitives

- 4px spacing scale; 12-column desktop / 8-column tablet / 4-column mobile grid.
- Desktop sidebar + fluid canvas; tablet and mobile layouts preserve the same web information architecture with responsive navigation.
- Reusable primitives: page shell, section header, KPI card, status chip, filter bar, data table, responsive list/card, form field, file dropzone, stepper, drawer/dialog, toast/banner, empty state, skeleton, confirmation dialog, chart wrapper, audit/activity timeline.
- Standardize icon treatment with one icon family and accessible labels; do not mix unlabeled decorative icons with text-only controls.
- Standardize copy: `Vacant`, `Occupied`, `Reserved`, `Maintenance`; tenant states `Prospect`, `Active`, `Notice period`, `Checked out`; invoice states from the PRD/SRS.
- INR values use tabular numerals and explicit currency formatting. Never communicate financial or occupancy state by color alone.

### Interaction polish

- Use subtle 150–200ms transitions for hover/focus/selection; respect `prefers-reduced-motion`.
- Preserve directness of existing actions and links. Avoid hidden gestures, auto-advancing forms, or decorative animation.
- Destructive/irreversible actions require confirmation and explain the outcome; paid invoices/payments remain non-destructive and auditable.

## Responsive requirements

- Desktop-first responsive web application; preserve dashboard usability on tablet and mobile browsers.
- Tablet: primary large-screen target, with compact navigation, adaptive grids, and readable two-column forms where space permits.
- Mobile browser: primary small-screen target, with single-column flow and table rows becoming stacked cards with equivalent actions.
- Desktop and laptop layouts are outside the design scope. Do not introduce a separate native mobile design system or mobile-only workflow.
- Forms must keep labels and helper text visible; do not rely on placeholders.
- Charts need a compact mobile summary/table alternative, not horizontal clipping.
- Dialogs become bottom drawers on narrow screens when appropriate; focus and scroll must remain contained.
- Keep touch targets at least 44×44 CSS px for tablet and mobile browser users.

## Accessibility requirements

- Target WCAG 2.2 AA for all owner screens.
- Use semantic landmarks/headings, associated labels, logical heading order, keyboard-operable menus/tables/dialogs, and visible focus rings.
- Announce validation, save, upload, and async errors via accessible status/live regions; place errors next to fields and summarize them at form submission.
- Provide text/icon labels for bed, invoice, complaint, and tenant statuses; never use color as the only signal.
- Ensure contrast for text, chart lines, chips, focus indicators, disabled states, and image overlays.
- Tables require caption/headers and a keyboard-accessible equivalent for row actions. Kanban interactions need a non-drag alternative.
- File upload states must expose type/size limits, progress, success, failure, retry, and the one-file KYC constraint.

## Functional constraints to preserve

1. One owner and one visible property in MVP; backend remains multi-property-ready.
2. Property → Floor → Room → Bed hierarchy and one active bed assignment remain unchanged.
3. Owner-only MVP; no tenant authenticated portal, staff role, or marketplace UI.
4. Exactly one Aadhaar-or-PAN proof upload; never collect/store the document number in UI.
5. Rent/payment, invoice, expense, complaint, audit, soft-delete, and lifecycle semantics remain those in PRD/SRS.
6. Notifications, reminders, SMS, and broadcasts remain visibly deferred/blocked until an SMS vendor is selected; do not substitute an in-app-only delivery promise.
7. English-only, INR-only, Asia/Kolkata display/scheduling assumptions remain.
8. No offline data entry or synchronization; PWA remains online-only.
9. Visual refinement must not change permissions, validation, data ownership, transaction boundaries, or API behavior.
10. Existing screen intent, information architecture, and action availability are preserved; enhancements are consolidation and accessibility improvements, not a feature expansion.

## Required states for every screen

Loading/skeleton, empty, populated, validation error, permission/blocked, network/server failure with retry, upload progress/failure, successful save/confirmation, and unsaved-change/navigation warning where relevant.

## Open decisions / unresolved

- SMS vendor and therefore activation criteria for reminders, broadcasts, and tenant status notifications.
- Hosting vendor/data residency and scheduled-job implementation (not visual blockers, but affect status/copy).
- Whether “electricity” remains visible only as a generic expense category in the MVP UI; SRS lists it as an invoice line item while PRD defers electricity billing.
- Final charting library and icon package for implementation; select accessible, lightweight options without changing the visual contract.
- Exact breakpoints and whether the room availability table uses a persistent horizontal scroll or card transformation after usability testing.
