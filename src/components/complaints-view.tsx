"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { AppBottomNav } from "@/components/app-bottom-nav";

type ComplaintStatus = "Open" | "In Progress" | "Resolved";
type Priority = "High" | "Medium" | "Low";
type Complaint = {
  title: string;
  tenant: string;
  room: string;
  priority: Priority;
  status: ComplaintStatus;
  raised: string;
};

const complaints: Complaint[] = [
  { title: "Leaking tap", tenant: "Riya Shah", room: "204", priority: "High", status: "Open", raised: "2 days ago" },
  { title: "AC not cooling", tenant: "Michael Kim", room: "301", priority: "High", status: "Open", raised: "1 day ago" },
  { title: "WiFi not working", tenant: "Kabir Singh", room: "102", priority: "Medium", status: "Open", raised: "3 days ago" },
  { title: "Water heater not working", tenant: "Priya Sharma", room: "201-B", priority: "Medium", status: "Open", raised: "4 days ago" },
  { title: "Broken cupboard door", tenant: "Aarav Mehta", room: "101-A", priority: "Low", status: "In Progress", raised: "6 days ago" },
  { title: "Fan replacement request", tenant: "—", room: "103-B", priority: "Medium", status: "Resolved", raised: "9 days ago" },
];

const statusFilters = ["All", "Open", "In Progress", "Resolved"] as const;

function PriorityChip({ priority }: { priority: Priority }) {
  return <span className={`complaint-priority ${priority.toLowerCase()}`}>{priority}</span>;
}

function StatusChip({ status }: { status: ComplaintStatus }) {
  return <span className={`status status-${status.toLowerCase().replace(" ", "-")}`}>{status}</span>;
}

export function ComplaintsView() {
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("All");

  const filteredComplaints = useMemo(
    () => complaints.filter((complaint) => filter === "All" || complaint.status === filter),
    [filter]
  );

  const openCount = complaints.filter((complaint) => complaint.status === "Open").length;

  return (
    <div className="rooms-shell">
      <AppHeader activeNav="Complaints" />
      <main className="rooms-content">
        <header className="rooms-heading"><div><p className="eyebrow">MAPLE HOUSE / TENANTS</p><h1>Complaints</h1><p className="lede">Track and resolve every tenant-reported issue.</p></div></header>

        <section className="notice-banner" aria-label="Preview data notice"><span aria-hidden="true">i</span><p><strong>Preview data.</strong> This complaints workspace is ready for the resolution workflow; live updates and tenant notifications will connect in a later slice.</p></section>

        <section className="rooms-metrics" aria-label="Complaint summary">
          <Metric label="Open" value={openCount} tone="rose" />
          <Metric label="In progress" value={complaints.filter((complaint) => complaint.status === "In Progress").length} tone="amber" />
          <Metric label="Resolved" value={complaints.filter((complaint) => complaint.status === "Resolved").length} tone="green" />
          <Metric label="Total" value={complaints.length} />
        </section>

        <section className="rooms-toolbar" aria-label="Complaint filters">
          <div className="filter-tabs" role="tablist" aria-label="Filter complaints by status">
            {statusFilters.map((item) => <button type="button" role="tab" aria-selected={filter === item} className={filter === item ? "filter-tab selected" : "filter-tab"} onClick={() => setFilter(item)} key={item}>{item}</button>)}
          </div>
        </section>

        <section className="rooms-table-panel" aria-labelledby="complaint-list-heading">
          <div className="table-heading"><div><p className="eyebrow">COMPLAINT LOG</p><h2 id="complaint-list-heading">{filteredComplaints.length} complaints shown</h2></div><span className="table-note">Preview data · {complaints.length} total records</span></div>
          {filteredComplaints.length > 0 ? <div className="rooms-table-wrap"><table className="rooms-table"><thead><tr><th>Complaint</th><th>Tenant / room</th><th>Priority</th><th>Status</th><th>Raised</th></tr></thead><tbody>{filteredComplaints.map((complaint) => <tr key={complaint.title}><td data-label="Complaint"><strong>{complaint.title}</strong></td><td data-label="Tenant / room">{complaint.tenant} <small className="mono">· {complaint.room}</small></td><td data-label="Priority"><PriorityChip priority={complaint.priority} /></td><td data-label="Status"><StatusChip status={complaint.status} /></td><td data-label="Raised">{complaint.raised}</td></tr>)}</tbody></table></div> : <div className="rooms-empty"><strong>No complaints match this filter.</strong><p>Try another status.</p><button type="button" onClick={() => setFilter("All")}>Clear filter</button></div>}
        </section>
      </main>
      <AppBottomNav activeTab="tenants" />
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone?: "rose" | "amber" | "green" }) {
  return (
    <article className={tone ? `room-metric ${tone}` : "room-metric"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
