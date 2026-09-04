# Accessibility standards

## Target

The project should target WCAG 2.2 AA as a standard for the UI.

## MVP boundaries

- MVP UI is English-only; Hindi localization is deferred.
- MVP is owner-only; tenant portal and tenant self-service are deferred.
- Notification/SMS workflows are deferred/blocked until an SMS vendor is selected. Accessibility coverage must still apply to any future notification UI, but no active SMS workflow should be treated as an MVP requirement.

## Requirements

- Use semantic HTML and landmark elements.
- Ensure keyboard focus visibility.
- Provide labels for every form input.
- Do not rely on color alone for state meaning.
- Make tables, list views, and dialogs screen-reader friendly.
- Ensure forms and validation errors are announced clearly.
- Maintain strong color contrast.
- Support reduced motion and responsive mobile interactions.
- Keep mobile/tablet web navigation usable at supported breakpoints with compact navigation and equivalent access to all workflows.
- Ensure the installable PWA remains online-only; accessibility requirements do not imply offline support.

## Special consideration for owner workflows

The product is used by business owners and property staff in operational settings. Forms and actions should be accessible on mobile and desktop, and status cues must remain understandable even without color.

## KYC design constraint

Move-in accepts exactly one Aadhaar-or-PAN file. Screens or flows requesting extra KYC documents are deferred/inconsistent with MVP and should not be used as accessibility acceptance criteria.
