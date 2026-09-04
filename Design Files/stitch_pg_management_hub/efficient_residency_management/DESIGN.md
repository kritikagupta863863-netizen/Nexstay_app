---
name: Efficient Residency Management
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered for PG owners who require a high-trust, systematic environment to manage property logistics, tenant data, and financial transactions. The brand personality is **reliable, organized, and transparent**. 

The design style follows a **Corporate / Modern** aesthetic with a focus on high information density without visual clutter. It prioritizes clarity through a structured hierarchy, ample whitespace, and a "utility-first" approach. The emotional response should be one of "calm control," reducing the cognitive load of managing multiple tenants and rooms. 

The interface avoids decorative flourishes, opting instead for a professional framework where the data remains the primary focus.

## Colors

The color palette is anchored by **Slate Blue (#0F172A)** as the primary color, used for navigation and high-level headers to establish authority. **Sky Blue (#3B82F6)** serves as the secondary color for primary actions, links, and status indicators, providing a clear path for user intent. 

The neutral palette utilizes a range of cool greys. The background is set to **#F8FAFC** to maintain a clean, open feel. Text is primarily rendered in Slate 900 for maximum legibility, while Slate 500/600 is used for secondary metadata. Success, Warning, and Error states should use standard semantic colors (Emerald, Amber, and Rose) but with slightly desaturated tones to match the professional environment.

## Typography

This design system utilizes **Hanken Grotesk** for its primary typeface. It is a clean, contemporary sans-serif that balances high legibility with a professional character. For data-heavy contexts, such as room numbers, rent amounts, and dates, **JetBrains Mono** is used as a secondary font to ensure characters are distinct and columns of figures align vertically.

- **Headlines:** Use Bold or SemiBold weights to anchor page sections.
- **Body:** Regular weight is preferred for readability. Use 14px as the standard for dense dashboards.
- **Labels:** Use JetBrains Mono in uppercase for small metadata labels to distinguish them from interactive text.
- **Mobile:** Scale display titles down by 20% on mobile devices while maintaining body font sizes for accessibility.

## Layout & Spacing

The layout is built on a **12-column fluid grid** for desktop, transitioning to a single-column stack for mobile. A strict 4px spacing scale is enforced to ensure mathematical consistency throughout the UI.

- **Desktop:** 12 columns, 24px gutters, 40px outer margins.
- **Tablet:** 8 columns, 16px gutters, 24px outer margins.
- **Mobile:** 4 columns, 16px gutters, 16px outer margins.

The layout should prioritize a "sidebar-and-canvas" structure. The sidebar is fixed at 280px for navigation, while the main canvas area is fluid, containing widgets and data tables that use responsive padding (24px to 32px) to separate content modules.

## Elevation & Depth

This design system uses a **Tonal Layering** approach combined with **Low-contrast outlines**. Depth is communicated through subtle shifts in background color rather than heavy shadows.

1.  **Level 0 (Base):** #F8FAFC (The main background).
2.  **Level 1 (Cards/Containers):** #FFFFFF with a 1px solid border (#E2E8F0).
3.  **Level 2 (Dropdowns/Popovers):** #FFFFFF with a soft, diffused shadow (0px 10px 15px -3px rgba(0, 0, 0, 0.05)) to indicate temporary overlay.

Avoid using gradients or heavy drop shadows. Interactive elements should feel like they are part of the page surface, moving only slightly on hover via a subtle border color change or a 1-shade darker background tint.

## Shapes

The design system uses a **Soft (0.25rem)** roundedness logic. This creates a modern feel that is friendlier than sharp corners but remains disciplined and professional.

- **Buttons & Inputs:** 4px (0.25rem) border radius.
- **Cards & Content Modules:** 8px (0.5rem) border radius.
- **Modals & Overlays:** 12px (0.75rem) border radius.
- **Status Tags/Chips:** Fully rounded (pill) for immediate visual distinction from buttons.

## Components

### Buttons
- **Primary:** Solid Slate 900 background, White text.
- **Secondary:** Solid Blue 600 background, White text.
- **Ghost:** Transparent background, Blue 600 text, Blue 600 border on hover.
- *State:* Subtle opacity shift (90%) on hover; 2px focus ring in Blue 400.

### Inputs & Forms
- Inputs feature a 1px Slate 200 border. On focus, the border transitions to Blue 500 with a 2px soft outer glow.
- Labels sit above the field in Hanken Grotesk SemiBold (12px).
- Error states use a Red 600 border and 11px helper text.

### Cards & Data Tables
- Cards use a White background with a 1px Slate 200 border. No shadow.
- Tables use a "zebra-striping" alternate row color (Slate 50) for long lists.
- Table headers are Slate 50 background with uppercase JetBrains Mono labels.

### Chips & Badges
- Used for "Room Status" (Occupied, Vacant, Maintenance).
- Small padding (4px 8px) with a semi-transparent background (10% opacity of the status color) and bold text of the same color.

### Navigation
- Vertical sidebar with high contrast (Slate 900).
- Active states indicated by a 4px Blue 500 left-accent bar and a subtle light-blue background tint on the menu item.