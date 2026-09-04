# ADR 0002: Prefer a PWA-first owner experience

- Status: Accepted
- Date: 2026-09-03

## Context

The target owner uses a web application on mobile and tablet browsers. The design assets emphasize a compact, responsive, dashboard-driven interface rather than a desktop/laptop experience or separate native mobile application.

## Decision

Design the owner experience as a mobile/tablet-first responsive web app with optional PWA characteristics. Desktop and laptop layouts are outside the design scope, and a native mobile app is not part of MVP.

## Alternatives considered

- Native Android app
- Desktop-only admin interface
- Pure responsive website without installability

## Consequences

Positive:
- Faster launch
- Lower delivery cost
- Better fit for Android-heavy usage patterns

Negative:
- App store distribution and push capabilities are more limited than native apps
- MVP requires connectivity and does not include offline data entry or synchronization
