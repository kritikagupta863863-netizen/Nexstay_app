# NEXSTAY — Product Context & Business Domain

You are working on NEXSTAY.

NEXSTAY is an AI-powered operating system for India's PG (Paying Guest) and co-living industry.

NEXSTAY is NOT simply a PG listing website.

It is a connected ecosystem consisting of:

1. PG Management ERP
2. Tenant Living / Super App
3. PG Marketplace
4. AI-powered operational intelligence
5. Trust and transparency infrastructure


# 1. CORE PRODUCT VISION

NEXSTAY connects PG owners, property managers, employees, tenants and prospective tenants through one platform.

The fundamental product model is:

PG Owner
    ↓
Property / PG
    ↓
Rooms
    ↓
Beds
    ↓
Tenants
    ↓
Rent / Billing / Complaints / Operations

At the same time:

Prospective Tenant
    ↓
Discover PG
    ↓
Compare
    ↓
View details
    ↓
Send inquiry / request booking
    ↓
Become Tenant
    ↓
Manage stay through NEXSTAY


# 2. PRIMARY PRODUCT AREAS

NEXSTAY has three primary product surfaces.

## A. PG MANAGEMENT SYSTEM

The owner platform is used to operate one or multiple PG properties.

Major capabilities include:

- Property management
- Room management
- Bed management
- Occupancy management
- Vacancy tracking
- Sharing type management
- Tenant management
- Rent tracking
- Revenue tracking
- Expense management
- Profit analytics
- Employee management
- Complaint management
- Invoice and billing
- PG profile management
- Marketplace promotions
- Notifications
- AI-powered operational insights


## B. TENANT LIVING SYSTEM

Once a tenant joins a PG, NEXSTAY becomes their digital living companion.

Major capabilities include:

- Tenant profile
- Room/bed information
- Rent tracking
- Invoice access
- Electricity bill visibility
- Payment confirmations
- Agreements
- Complaint management
- Complaint status tracking
- Notifications
- Maintenance updates
- Emergency alerts
- Stay information
- Notice period workflows
- Security deposit information


## C. PG MARKETPLACE

The marketplace allows prospective tenants to discover and compare PGs.

Major capabilities include:

- PG discovery
- Location-based search
- Budget filtering
- Facilities filtering
- Sharing type filtering
- Room type filtering
- Availability
- PG detail pages
- Images
- Videos
- Room tours
- Food information
- Nearby places
- Pricing
- Rules and policies
- Security deposit information
- Direct owner contact
- Inquiry
- Booking requests
- AI recommendations
- Roommate compatibility


# 3. CORE USERS / ACTORS

The system should be designed around distinct roles.

## PG OWNER

The owner manages PG operations and business performance.

Typical responsibilities:

- Manage properties
- Manage rooms and beds
- Manage tenants
- Track occupancy
- Collect rent
- Track expenses
- Manage employees
- Handle complaints
- Generate invoices
- Monitor revenue
- Monitor profitability
- Manage PG marketplace listing
- Send notifications


## PROPERTY MANAGER / STAFF

May perform operational tasks on behalf of the owner.

Permissions must be explicitly defined.

Do not assume that a property manager has the same permissions as the property owner.


## TENANT

The tenant lives in a PG managed through NEXSTAY.

Typical capabilities:

- View own profile
- View own room/bed
- View rent
- View invoices
- View payment history
- View agreements
- Raise complaints
- Upload complaint media
- Track complaint resolution
- Receive notifications
- Manage relevant stay information


## PROSPECTIVE TENANT

A person who has not yet joined a PG.

Typical capabilities:

- Search PGs
- Filter PGs
- View PG details
- Compare options
- View pricing
- View amenities
- View policies
- View room availability
- Contact owner
- Send inquiry
- Request booking


## SUPER ADMIN

Platform-level administration.

Super-admin permissions must be treated separately from PG-owner permissions.

Never assume a PG owner should have platform-wide administrative access.


# 4. CORE BUSINESS ENTITIES

The application should conceptually revolve around these entities.

## Organization / Owner

Represents the business/operator using NEXSTAY.

## Property / PG

A physical PG property operated by an owner.

A single owner may eventually manage multiple properties.

## Floor

A logical grouping of rooms within a property.

## Room

A physical room inside a property.

A room can have:

- Room number/name
- Floor
- Room type
- Sharing type
- Capacity
- Rent
- Availability
- Occupancy state

## Bed

A bed represents an actual rentable occupancy unit.

Bed-level modeling should be preferred where the business requires tracking individual occupants.

## Tenant

A person currently or previously associated with a PG.

Tenant information may include:

- Name
- Photo
- Contact information
- Emergency contact
- ID/KYC information
- Room
- Bed
- Stay duration
- Preferences


## Lease / Stay

Represents the tenant's stay relationship with a property.

Relevant concepts may include:

- Start date
- End date
- Rent
- Security deposit
- Notice period
- Status


## Invoice

Represents a charge issued to a tenant.

Possible invoice types include:

- Monthly rent
- Electricity
- Additional charges


## Payment

Represents money paid against an invoice or other financial obligation.

Payment state must be treated as trusted financial data.


## Expense

Represents a PG business expense.

Examples include:

- Electricity
- Food
- Maintenance
- Staff salaries
- Internet
- Repairs
- Miscellaneous expenses


## Complaint

Represents a tenant-reported issue.

Expected workflow:

Pending
    ↓
In Progress
    ↓
Resolved

Complaints may include:

- Description
- Images
- Videos
- Status
- Resolution information
- Timestamps


## Employee

Represents a person working for a PG.

Possible information:

- Profile
- Role
- Salary
- Attendance
- Emergency contact


## Notification

Represents communication sent to tenants or other users.

Possible notification purposes:

- Rent reminder
- Maintenance alert
- Complaint update
- Emergency notice
- General announcement


## Marketplace Listing

Represents the public-facing representation of a PG.

May include:

- Images
- Videos
- Amenities
- Food details
- Pricing
- Availability
- Rules
- Policies
- Security deposit
- Promotional content


# 5. IMPORTANT RELATIONSHIPS

Maintain clear ownership relationships.

Conceptually:

Owner
    └── Properties
          ├── Floors
          │     └── Rooms
          │           └── Beds
          │
          ├── Employees
          │
          ├── Expenses
          │
          └── Tenants
                └── Stays
                      ├── Room / Bed
                      ├── Invoices
                      ├── Payments
                      └── Complaints


A marketplace listing belongs to a property.

A tenant belongs to a stay/property relationship rather than simply being globally attached to a room.

Financial records must have explicit relationships and ownership.

Do not invent relationships without inspecting the existing schema.


# 6. OCCUPANCY MODEL

Occupancy is a core business concept in NEXSTAY.

The system should distinguish between:

- Total capacity
- Occupied beds
- Available beds
- Reserved beds
- Vacant rooms
- Partially occupied rooms

Do not derive important financial or occupancy information from unreliable UI state when authoritative database information exists.


# 7. FINANCIAL MODEL

NEXSTAY includes financial tracking for PG owners.

Important concepts include:

- Rent
- Pending rent
- Collected payments
- Security deposits
- Expenses
- Revenue
- Profit
- Electricity charges
- Additional charges

Financial calculations must be deterministic and traceable.

Never allow the frontend to be the source of truth for:

- payment status
- amount paid
- outstanding amount
- credits
- refunds
- financial entitlements


# 8. COMPLAINT WORKFLOW

Complaints are not simply messages.

They represent an operational workflow.

Expected lifecycle:

Tenant raises complaint
        ↓
Complaint created
        ↓
Owner/staff reviews
        ↓
Pending / In Progress
        ↓
Maintenance / resolution work
        ↓
Resolution recorded
        ↓
Resolved
        ↓
Tenant notified


Important:

Maintain an auditable history where appropriate.

Do not silently overwrite important state transitions.


# 9. MARKETPLACE TRANSPARENCY

Transparency is a core NEXSTAY product principle.

The marketplace should make important costs and conditions visible.

Relevant information includes:

- Actual rent
- Electricity charges
- Security deposit
- Food charges
- Extra fees
- Room condition
- Notice period
- Rules
- Policies


Avoid UX or data models that intentionally hide material pricing or stay conditions.


# 10. AI FEATURES

AI is part of NEXSTAY's product layer.

Potential AI capabilities include:

- Profit suggestions
- Occupancy insights
- Pricing suggestions
- Expense reduction suggestions
- Revenue improvement suggestions
- PG recommendations
- Roommate compatibility
- AI-powered lead qualification
- AI WhatsApp assistant
- AI voice assistant
- Future predictive analytics


AI output must NOT automatically become trusted business truth.

AI-generated recommendations should be treated as recommendations unless a deterministic business rule explicitly converts them into an action.

Important AI considerations:

- Input validation
- Output validation
- Structured responses where appropriate
- Cost
- Latency
- Failure handling
- Privacy
- Logging
- Fallback behavior


# 11. AI PROFIT / OCCUPANCY INTELLIGENCE

AI may provide suggestions such as:

- Adjust pricing for high-demand rooms
- Improve occupancy
- Convert underperforming room configurations
- Reduce unnecessary expenses
- Identify revenue opportunities


These are recommendations.

Do not automatically change:

- rent
- pricing
- tenant billing
- occupancy
- financial records

based solely on an AI suggestion without an explicit product workflow requiring that action.


# 12. AUTHENTICATION MODEL

NEXSTAY requires different onboarding experiences for different users.

Current product requirements include:

- PG owner onboarding
- Tenant onboarding
- Mobile OTP login
- Email signup
- Secure authentication
- Profile setup


Authentication and authorization must remain separate.

A successful login does NOT automatically grant access to PG data.


# 13. MULTI-TENANCY

NEXSTAY should be treated as a multi-tenant SaaS application.

One owner/business may have multiple properties.

One property may contain multiple rooms.

One room may contain multiple beds.

One tenant may have a current stay and historical stays.

Data access must respect the ownership hierarchy.

Conceptually:

Platform
    ↓
Organization / Owner
    ↓
Property
    ↓
Room
    ↓
Bed
    ↓
Tenant / Stay


Never assume that knowing a record ID means the current user is allowed to access that record.


# 14. TENANT DATA PRIVACY

Tenant information can be sensitive.

Examples include:

- Personal information
- Contact information
- Emergency contacts
- ID/KYC documents
- Payment information
- Stay information
- Complaint information


Access must be restricted according to role and ownership.

Do not expose tenant information through:

- public APIs
- marketplace pages
- client-side state
- logs
- error messages
- URLs
- analytics

unless explicitly required and appropriately protected.


# 15. MARKETPLACE VS PRIVATE DATA

NEXSTAY has a critical distinction between:

PUBLIC MARKETPLACE DATA

and

PRIVATE OPERATIONAL DATA.

Public marketplace data may include:

- PG name
- Images
- Amenities
- Pricing
- Availability
- Facilities
- Policies
- Public promotional information

Private operational data may include:

- Tenant identity
- KYC
- Emergency contacts
- Payments
- Complaints
- Internal expenses
- Employee information
- Internal analytics


Never accidentally expose private operational information through marketplace APIs or public pages.


# 16. NOTIFICATIONS

Notifications may be targeted at:

- All tenants
- Specific property
- Specific room
- Specific tenant
- Relevant user groups


Examples:

- Rent due reminders
- Maintenance notices
- Complaint updates
- Emergency alerts
- General announcements


Notification delivery should not bypass authorization.

A user should only receive information they are entitled to receive.


# 17. PRODUCT PRIORITY

When implementing features, prioritize:

1. Core PG operations
2. Data integrity
3. Security
4. Tenant experience
5. Owner operational relief
6. Financial correctness
7. Marketplace functionality
8. AI intelligence
9. Advanced automation


Do not add AI merely because AI is available.

AI should solve a meaningful product problem.


# 18. OPERATIONAL RELIEF

NEXSTAY is intended to reduce manual operational work.

The product should progressively replace workflows currently handled through:

- WhatsApp
- Excel
- Paper records
- Manual follow-ups
- Manual rent reminders
- Manual complaint tracking


When evaluating a feature, ask:

"Does this reduce operational effort or improve the tenant experience?"

If not, question whether the feature belongs in the core product.


# 19. FUTURE DIRECTION

The broader NEXSTAY vision includes:

- AI-powered operations
- PG marketplace
- Digital rental agreements
- Smart access systems
- Embedded financial services
- Tenant credit profiles
- Smart locks
- AI financial services


These are future/product-roadmap concepts unless explicitly requested.

Do not implement future functionality automatically merely because it appears in the product vision.


# 20. PRODUCT DECISION RULE

When a request conflicts with existing NEXSTAY product concepts:

1. Identify the conflict.
2. Explain it.
3. Do not silently rewrite the product model.
4. Prefer preserving existing architecture and business terminology.
5. Ask for clarification when the conflict materially affects the system.


# 21. TERMINOLOGY

Use NEXSTAY's product terminology consistently.

Prefer:

- PG
- Property
- Room
- Bed
- Tenant
- Owner
- Employee
- Stay
- Invoice
- Payment
- Complaint
- Expense
- Marketplace
- Occupancy
- Availability
- Security Deposit
- Notice Period

Avoid inventing alternative terminology for existing business concepts unless there is a clear technical reason.


# FINAL PRODUCT RULE

Every feature should be evaluated from three perspectives:

OWNER:
Does this make PG operations easier, more automated or more profitable?

TENANT:
Does this make living, payments, communication or issue resolution easier and more transparent?

PLATFORM:
Does this maintain security, data integrity, scalability and a coherent NEXSTAY ecosystem?

A feature is not complete until it makes sense across the relevant perspective(s).