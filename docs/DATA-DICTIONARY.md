# Data dictionary

## Conventions

- Primary keys use UUIDs by default for Supabase/PostgreSQL interoperability.
- Organization/property ownership must be reachable from every organization-owned record.
- Historical operational records are retained; checkout does not delete tenant history.

## Property
- Purpose: represents the PG property owned or managed by a user.
- Fields: id, owner_id, name, address, amenities, photos, rules, deposit, notice period
- Relationships: one owner has many properties

## Floor
- Purpose: organizes rooms inside a property.
- Fields: id, property_id, name, order_index

## Room
- Purpose: group of beds for a section of a property.
- Fields: id, floor_id, label, sharing_type, status

## Bed
- Purpose: billing and occupancy unit.
- Fields: id, room_id, label, status, rent, has_private_bathroom, is_ac_attached

## Tenant
- Purpose: person living in the PG.
- Fields: id, property_id, name, phone, email, image, emergency_contact, status
- Sensitive data: KYC documents and contact details
- Lifecycle: retained after checkout; occupancy dates and bed assignment belong to Stay.

## Stay / lease
- Purpose: one tenant's occupancy period and historical bed assignment.
- Fields: id, tenant_id, property_id, bed_id, check_in_date, check_out_date, agreement_end_date, rent_snapshot, security_deposit_snapshot, status
- Lifecycle: retained after checkout to preserve tenancy and bed-assignment history.

## Invoice
- Purpose: monthly rent and service billing.
- Fields: id, tenant_id, property_id, stay_id, month, status, line_items_snapshot, subtotal_snapshot, total_snapshot, paid_amount, due_amount, currency, issued_at
- Integrity: issued totals and line-item snapshots are immutable.

## Payment
- Purpose: recorded rent or due payment.
- Fields: id, invoice_id, tenant_id, amount, date, method, reference, overpayment_explanation, overpayment_resolution
- Integrity: overpayment requires an explanation and owner-selected `credit_balance` or `refund_due`.

## Expense
- Purpose: property operating costs.
- Fields: id, property_id, category, amount, date, vendor, notes, bill_image_url

## Complaint
- Purpose: tenant issues or maintenance tasks.
- Fields: id, property_id, tenant_id, category, description, priority, status, sla_deadline

## KYC deletion audit tombstone
- Purpose: minimal evidence that a KYC file was deleted at checkout.
- Fields: id, tenant_id, stay_id, deleted_at, file_type, deletion_reason
- Exclusions: no Aadhaar/PAN number and no recoverable file content.

## CSV import batch
- Purpose: atomic import of tenant and operational records.
- Fields: id, property_id, submitted_by, submitted_at, status, validation_errors
- Integrity: validate all rows before commit; any invalid row rejects the entire batch and writes no imported records.

---

## 🚧 Frontend Temporary Data Models (Mock Data)

*Note: The following interfaces are currently used in the frontend to render the UI while the backend is pending. They should be referenced when designing the final API contracts.*

### 1. Mock Room (`src/lib/data.ts`)
Currently used in the Room List and Dashboard.
```typescript
type Room = {
  number: string;
  floor: number;
  type: string;           // e.g., "Single Premium", "Double Sharing"
  status: RoomStatus;     // "Occupied" | "Vacant" | "Maintenance"
  occupied: number;       // Current number of tenants
  capacity: number;       // Total beds
  beds: string[];         // Array of tenant names or status strings (e.g., "Ready to assign")
  rent: string;           // Formatted rent string (e.g., "₹8,500")
};
```

### 2. Mock Tenant List Item (`src/components/tenant-directory.tsx`)
Currently used in the Tenant Directory table/list.
```typescript
type Tenant = {
  name: string;
  phone: string;
  room: string;           // Room number/label
  floor: number;
  type: "Single" | "Double" | "Triple";
  joined: string;         // Formatted date string (e.g., "12 Mar 2025")
  joinedValue: number;    // Numeric sortable value (YYYYMMDD)
  status: "Active" | "Past";
  initials: string;       // E.g., "AM"
};
```

### 3. Mock Tenant Profile (`src/app/tenants/[id]/page.tsx`)
Currently used to render the detailed tenant profile view.
```typescript
type TenantProfile = {
  name: string;
  initials: string;
  phone: string;
  email: string;
  room: string;           // Room number
  roommates: {            // Array of co-tenants
    id: string;
    name: string;
    initials: string;
    since: string;        // E.g., "June 2023"
  }[];
};
```
