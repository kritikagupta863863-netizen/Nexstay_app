# Feature: property onboarding

- Purpose: enable an owner to configure a property and begin operation quickly.
- User: owner
- User flow: register > create property > define floors/rooms/beds > add first tenant > generate invoice
- Business rules: new property must include valid address and initial room structure
- UI: onboarding wizard, summary, validation states
- Data: property, floor, room, bed, owner metadata
- API: create property, add floor/room/bed
- Validation: required property name, valid room configuration, occupancy alignment
- Error states: invalid form values, duplicate bed labels, failed save
- Empty states: no property exists yet
- Loading states: property creation in progress
- Permissions: owner only
- Accessibility: labels, keyboard navigation, error announcement
- Tests: onboarding happy path and validation failure path
- Known limitations: MVP UI exposes one property per owner; the database must remain multi-property-ready
