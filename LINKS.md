# NexStay Application & Preview Links

This document provides quick access to all live local routes, preview environments, and instructions for running the application.

---

## 1. Quick Start

If the development server is not already running, start it from the repository root:

```bash
npm run dev
```

The application will be served at `http://localhost:3000`.

---

## 2. Live Application Routes

| View | URL | Description |
|---|---|---|
| **Owner Dashboard** | [http://localhost:3000/](http://localhost:3000/) | Main overview with property KPIs, live room/bed occupancy, open complaints, recent expenses, and 6-month financial chart. |
| **Rooms & Beds** | [http://localhost:3000/rooms](http://localhost:3000/rooms) | Room directory filterable by status (Occupied, Vacant, Maintenance), floor, and search query, with room details modal. |
| **Tenant Directory** | [http://localhost:3000/tenants](http://localhost:3000/tenants) | Tenant roster filterable by Active/Past, room type, floor, search, and sorting with profile detail modal. |
| **Billing & Finance** | [http://localhost:3000/billing](http://localhost:3000/billing) | Monthly finance summary, pending rent invoices table, and categorized property expenses. |
| **Complaints Log** | [http://localhost:3000/tenants/complaints](http://localhost:3000/tenants/complaints) | Tenant complaint queue with status filter tabs (`Open`, `In Progress`, `Resolved`) and priority badges. |

---

## 3. Mobile & Tablet Device Simulator

* **Device Preview URL:** [http://localhost:3000/preview](http://localhost:3000/preview)

### Preview Features:
* **Interactive Viewport Switching:** Toggle between:
  * **Phone View:** iPhone 15 Pro (`393 × 852` px)
  * **Tablet View:** iPad 11-inch portrait (`820 × 1180` px)
* **Real Responsive Testing:** Renders the live app inside realistic device frames to review touch navigation, sticky bottom navigation bars, adaptive table-to-card transformations, and compact headers.

---

## 4. Internal Project Dashboard (Static)

* **Dashboard URL:** [http://localhost:8000/dashboard/](http://localhost:8000/dashboard/)

To run the internal static task & activity dashboard:

```bash
python3 -m http.server 8000
```
*(Note: Browsers block direct `file://` opening because the dashboard fetches local JSON snapshots).*
