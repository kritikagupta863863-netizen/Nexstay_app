# Feature: rent management

- Purpose: track monthly billing and overdue state.
- User: owner
- User flow: generate invoice > review due date > record payment > monitor overdue queue
- Business rules: invoices are generated per tenant per month, payment dates update status, and manual overpayments require an explanation
- UI: invoice table, payment form, reminder status/placeholder (delivery is deferred/blocked until an SMS vendor is selected)
- Data: invoices, payments, tenant state, due dates
- API: generate invoices, list invoices, record payment
- Validation: invoice totals must match expected amounts; overpayments require an explanation and payment references remain auditable
- Error states: invalid payment amount, missing invoice, duplicate payment transaction
- Empty states: no invoice history yet
- Loading states: invoice generation in progress
- Permissions: owner may manage invoices for their property
- Accessibility: focusable payment controls and screen-reader labels
- Tests: invoice generation, payment recording, overdue aging views
- Known limitations: no automatic payment gateway during MVP; SMS reminder delivery is not active in MVP pending vendor selection
