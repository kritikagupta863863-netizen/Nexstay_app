"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppBottomNav } from "@/components/app-bottom-nav";

type Tenant = {
  id: string;
  name: string;
  phone: string;
  room: string;
  floor: number;
  type: "Single" | "Double" | "Triple";
  joined: string;
  joinedValue: number;
  status: "Active" | "Past";
  initials: string;
};

const previewTenants: Tenant[] = [
  { id: "aarav", name: "Aarav Mehta", phone: "+91 98765 43210", room: "101-A", floor: 1, type: "Single", joined: "12 Mar 2025", joinedValue: 20250312, status: "Active", initials: "AM" },
  { id: "riya", name: "Riya Shah", phone: "+91 98765 43211", room: "103-B", floor: 1, type: "Double", joined: "05 Jan 2025", joinedValue: 20250105, status: "Active", initials: "RS" },
  { id: "kabir", name: "Kabir Singh", phone: "+91 98765 43212", room: "103-A", floor: 1, type: "Double", joined: "20 Nov 2024", joinedValue: 20241120, status: "Active", initials: "KS" },
  { id: "dev", name: "Dev Patel", phone: "+91 98765 43213", room: "201-A", floor: 2, type: "Triple", joined: "15 Feb 2025", joinedValue: 20250215, status: "Active", initials: "DP" },
  { id: "priya", name: "Priya Sharma", phone: "+91 98765 43214", room: "201-B", floor: 2, type: "Triple", joined: "10 Oct 2024", joinedValue: 20241010, status: "Active", initials: "PS" },
  { id: "sara", name: "Sara Rodrigues", phone: "+91 98765 43215", room: "B-204", floor: 2, type: "Single", joined: "05 Jan 2024", joinedValue: 20240105, status: "Past", initials: "SR" },
  { id: "michael", name: "Michael Kim", phone: "+91 98765 43216", room: "C-301", floor: 3, type: "Triple", joined: "20 Nov 2023", joinedValue: 20231120, status: "Past", initials: "MK" },
];

type SortOption = "name" | "joined";

export function TenantDirectory() {
  const [status, setStatus] = useState<"Active" | "Past">("Active");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("name");
  const [type, setType] = useState("All Types");
  const [floor, setFloor] = useState("All Floors");

  const tenants = useMemo(() => previewTenants
    .filter((tenant) => tenant.status === status)
    .filter((tenant) => type === "All Types" || tenant.type === type)
    .filter((tenant) => floor === "All Floors" || tenant.floor === Number(floor.replace("Floor ", "")))
    .filter((tenant) => `${tenant.name} ${tenant.phone} ${tenant.room}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : b.joinedValue - a.joinedValue), [floor, query, sort, status, type]);

  return (
    <div className="tenants-shell">
      <main className="tenants-content">
        <header className="tenants-heading"><div><p className="eyebrow">MAPLE HOUSE / PEOPLE</p><h1>Tenant directory</h1><p className="lede">Keep track of who calls your property home.</p></div><button type="button" className="primary-button" onClick={() => setStatus("Active")}>+ Add tenant</button></header>
        <section className="notice-banner tenant-preview-note" aria-label="Preview data notice"><span aria-hidden="true">i</span><p><strong>Preview data.</strong> This owner workspace is ready for the directory workflow; live tenant records and authentication will connect in a later slice.</p></section>
        <section className="tenant-toolbar" aria-label="Tenant filters">
          <label className="tenant-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search by name, phone, or room</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, phone, or room..." /></label>
          <div className="tenant-toggle" role="tablist" aria-label="Tenant status">
            {(["Active", "Past"] as const).map((item) => <button type="button" role="tab" aria-selected={status === item} className={status === item ? "selected" : ""} onClick={() => setStatus(item)} key={item}>{item}</button>)}
          </div>
        </section>
        <section className="tenant-filter-row" aria-label="Directory sorting and filters">
          <label><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="name">Name (A-Z)</option><option value="joined">Joining date (newest)</option></select></label>
          <label><span>Room type</span><select value={type} onChange={(event) => setType(event.target.value)}><option>All Types</option><option>Single</option><option>Double</option><option>Triple</option></select></label>
          <label><span>Floor</span><select value={floor} onChange={(event) => setFloor(event.target.value)}><option>All Floors</option><option>Floor 1</option><option>Floor 2</option><option>Floor 3</option></select></label>
        </section>
        <section className="tenant-table-panel" aria-labelledby="tenant-list-heading">
          <div className="table-heading"><div><p className="eyebrow">TENANT DIRECTORY</p><h2 id="tenant-list-heading">{tenants.length} {status.toLowerCase()} tenants shown</h2></div><span className="table-note">Representative preview · {previewTenants.length} total records</span></div>
          {tenants.length ? <div className="tenant-table-wrap"><table className="tenant-table"><thead><tr><th>Tenant</th><th>Contact</th><th>Room</th><th>Sharing</th><th>Joined on</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{tenants.map((tenant) => <tr key={`${tenant.name}-${tenant.room}`}><td data-label="Tenant"><Link className="tenant-name" href={`/tenants/${tenant.id}`}><span className="tenant-avatar">{tenant.initials}</span><strong>{tenant.name}</strong></Link></td><td data-label="Contact"><span className="tenant-phone">{tenant.phone}</span></td><td data-label="Room"><strong className="mono">{tenant.room}</strong><small>Floor {tenant.floor}</small></td><td data-label="Sharing"><span className={`sharing-chip ${tenant.type.toLowerCase()}`}>{tenant.type}</span></td><td data-label="Joined on"><span className="tenant-date">{tenant.joined}</span></td><td className="tenant-action"><Link href={`/tenants/${tenant.id}`} className="details-button">View details <span aria-hidden="true">→</span></Link></td></tr>)}</tbody></table></div> : <div className="rooms-empty"><strong>No tenants match these filters.</strong><p>Try another status, floor, room type, or search term.</p><button type="button" onClick={() => { setQuery(""); setType("All Types"); setFloor("All Floors"); }}>Clear filters</button></div>}
        </section>
      </main>
      <AppBottomNav activeTab="tenants" />
    </div>
  );
}
