# UX and design

For the approved screen-by-screen visual refinement direction, see
[`UX-DESIGN-ENHANCEMENT-BRIEF.md`](./UX-DESIGN-ENHANCEMENT-BRIEF.md). That brief
preserves the current design artifacts and MVP constraints while defining the
Apple-inspired enhancement direction for future implementation.

## Design principles

The design system is grounded in functional clarity and calm operational control. It prioritizes information density, trust, and clean organization over decorative graphics.

## Layout

- Compact navigation and canvas layout for tablet and mobile browser experiences; do not create a separate native mobile design
- Responsive tables and cards for operational reporting
- Strong visual hierarchy between primary actions and secondary controls

## Responsive behavior

- Mobile/tablet-first behavior with supported browser breakpoints
- A single-column layout on phones and adaptive multi-column grids on tablets
- The product is an installable, online-only PWA; no offline data entry or synchronization

## MVP scope and language

- MVP is owner-only. Tenant portal and tenant self-service screens are deferred.
- MVP is English-only. Hindi localization is deferred.
- KYC UI must request exactly one Aadhaar-or-PAN file. Designs showing passport, address-proof, rental-agreement, or other extra KYC uploads are deferred/inconsistent with MVP.
- Notification screens, SMS actions, and active reminder/broadcast flows are deferred/blocked until an SMS vendor is selected. In-app-only notifications are not the approved MVP substitute.

## Typography and colors

- Hanken Grotesk for headlines/body
- JetBrains Mono for data and numeric labels
- Slate-blue and sky-blue palette with neutral surfaces and semantic success/warning/error states

## Components

- cards
- forms
- table views
- chips
- badges
- modals
- nav panels

## Interaction patterns

- quick actions for common operations like monthly rent, tenant update, and complaint tracking
- clear status chips for occupancy, rent, and complaint states
- minimal visual noise to keep operational workflows fast

## Accessibility target

- Design and interaction decisions target WCAG 2.2 AA.
- Preserve visible focus, keyboard operation, semantic structure, labels, error announcements, and non-color status cues across sidebar, bottom navigation, forms, tables, dialogs, and responsive states.
