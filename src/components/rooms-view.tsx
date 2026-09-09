"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { AppBottomNav } from "@/components/app-bottom-nav";

type RoomStatus = "Occupied" | "Vacant" | "Maintenance";
type Room = {
  number: string;
  floor: number;
  type: string;
  status: RoomStatus;
  occupied: number;
  capacity: number;
  beds: string[];
  rent: string;
};

const rooms: Room[] = [
  { number: "101", floor: 1, type: "Single Premium", status: "Occupied", occupied: 1, capacity: 1, beds: ["Aarav Mehta"], rent: "₹8,500" },
  { number: "102", floor: 1, type: "Double Sharing", status: "Vacant", occupied: 0, capacity: 2, beds: ["Ready to assign", "Ready to assign"], rent: "₹6,500" },
  { number: "103", floor: 1, type: "Double Sharing", status: "Occupied", occupied: 2, capacity: 2, beds: ["Kabir Singh", "Riya Shah"], rent: "₹6,500" },
  { number: "201", floor: 2, type: "Triple Sharing", status: "Occupied", occupied: 2, capacity: 3, beds: ["Dev Patel", "Move-in Friday", "Ready to assign"], rent: "₹5,200" },
  { number: "205", floor: 2, type: "Triple Sharing", status: "Maintenance", occupied: 0, capacity: 3, beds: ["Fan replacement", "Unavailable", "Unavailable"], rent: "₹5,200" },
  { number: "301", floor: 3, type: "Double Sharing", status: "Vacant", occupied: 0, capacity: 2, beds: ["Ready to assign", "Ready to assign"], rent: "₹6,500" },
];

const statusFilters = ["All", "Occupied", "Vacant", "Maintenance"] as const;

function StatusChip({ status }: { status: RoomStatus }) {
  return <span className={`status status-${status.toLowerCase()}`}><i />{status}</span>;
}

export function RoomsView() {
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("All");
  const [floor, setFloor] = useState("All floors");
  const [query, setQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms = useMemo(() => rooms.filter((room) => {
    const matchesStatus = filter === "All" || room.status === filter;
    const matchesFloor = floor === "All floors" || room.floor === Number(floor.replace("Floor ", ""));
    const matchesQuery = `${room.number} ${room.type} ${room.beds.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesFloor && matchesQuery;
  }), [filter, floor, query]);

  const counts = {
    total: rooms.length,
    occupied: rooms.filter((room) => room.status === "Occupied").length,
    vacant: rooms.filter((room) => room.status === "Vacant").length,
    maintenance: rooms.filter((room) => room.status === "Maintenance").length,
  };

  return (
    <div className="rooms-shell">
      <AppHeader activeNav="Rooms & beds" />
      <main className="rooms-content">
        <header className="rooms-heading"><div><p className="eyebrow">MAPLE HOUSE / INVENTORY</p><h1>Rooms &amp; beds</h1><p className="lede">A clear view of every room, bed, and upcoming move-in.</p></div><button className="primary-button" type="button" onClick={() => setFilter("Vacant")}>+ Find a vacant bed</button></header>

        <section className="rooms-metrics" aria-label="Room inventory summary">
          <Metric label="Total rooms" value={counts.total} detail="Across 3 floors" />
          <Metric label="Occupied" value={counts.occupied} detail="At least one bed filled" tone="blue" />
          <Metric label="Vacant" value={counts.vacant} detail="Ready to assign" tone="green" />
          <Metric label="Maintenance" value={counts.maintenance.toString().padStart(2, "0")} detail="Needs attention" tone="rose" />
        </section>

        <section className="rooms-toolbar" aria-label="Room filters">
          <div className="filter-tabs" role="tablist" aria-label="Filter rooms by status">
            {statusFilters.map((item) => <button type="button" role="tab" aria-selected={filter === item} className={filter === item ? "filter-tab selected" : "filter-tab"} onClick={() => setFilter(item)} key={item}>{item}</button>)}
          </div>
          <div className="room-controls">
            <label className="search-control"><span aria-hidden="true">⌕</span><span className="sr-only">Search rooms or tenants</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rooms or tenants" /></label>
            <label className="select-control"><span className="sr-only">Filter by floor</span><select value={floor} onChange={(event) => setFloor(event.target.value)}><option>All floors</option><option>Floor 1</option><option>Floor 2</option><option>Floor 3</option></select></label>
          </div>
        </section>

        <section className="rooms-table-panel" aria-labelledby="room-list-heading">
          <div className="table-heading"><div><p className="eyebrow">ROOM DIRECTORY</p><h2 id="room-list-heading">{filteredRooms.length} rooms shown</h2></div><span className="table-note">Preview data · updates will appear in a later slice</span></div>
          {filteredRooms.length > 0 ? <div className="rooms-table-wrap"><table className="rooms-table"><thead><tr><th>Room no.</th><th>Type</th><th>Status</th><th>Occupancy</th><th className="action-column">Action</th></tr></thead><tbody>{filteredRooms.map((room) => <tr key={room.number}><td data-label="Room no."><strong className="mono">{room.number}</strong><small>Floor {room.floor}</small></td><td data-label="Type">{room.type}</td><td data-label="Status"><StatusChip status={room.status} /></td><td data-label="Occupancy"><strong>{room.occupied}/{room.capacity}</strong><span className="occupancy-bar"><i style={{ width: `${room.occupied / room.capacity * 100}%` }} /></span></td><td className="action-column"><button type="button" className="details-button" onClick={() => setSelectedRoom(room)}>View details <span aria-hidden="true">→</span></button></td></tr>)}</tbody></table></div> : <div className="rooms-empty"><strong>No rooms match those filters.</strong><p>Try another status, floor, or search term.</p><button type="button" onClick={() => { setFilter("All"); setFloor("All floors"); setQuery(""); }}>Clear filters</button></div>}
        </section>
      </main>
      <AppBottomNav activeTab="rooms" />
      {selectedRoom && <div className="room-modal-backdrop" role="presentation" onClick={() => setSelectedRoom(null)}><section className="room-modal" role="dialog" aria-modal="true" aria-labelledby="room-detail-title" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">ROOM DETAIL</p><h2 id="room-detail-title">Room {selectedRoom.number}</h2></div><button type="button" className="modal-close" aria-label="Close room details" onClick={() => setSelectedRoom(null)}>×</button></div><div className="modal-meta"><StatusChip status={selectedRoom.status} /><span>Floor {selectedRoom.floor} · {selectedRoom.type}</span></div><div className="modal-stats"><div><span>Occupancy</span><strong>{selectedRoom.occupied}/{selectedRoom.capacity}</strong></div><div><span>Monthly rent</span><strong>{selectedRoom.rent}</strong></div></div><h3>Bed assignments</h3><ul className="bed-assignment-list">{selectedRoom.beds.map((bed, index) => <li key={`${bed}-${index}`}><span className="mono">Bed {String.fromCharCode(65 + index)}</span><span>{bed}</span></li>)}</ul><button type="button" className="primary-button modal-action" onClick={() => setSelectedRoom(null)}>Done</button></section></div>}
    </div>
  );
}

function Metric({ label, value, detail, tone = "" }: { label: string; value: number | string; detail: string; tone?: string }) {
  return <article className={`room-metric ${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}
