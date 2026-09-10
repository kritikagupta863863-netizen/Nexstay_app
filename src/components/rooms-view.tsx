"use client";

import { useState, useMemo } from "react";
import { AppBottomNav } from "@/components/app-bottom-nav";
import Link from "next/link";
import { getRooms, type Room, type RoomStatus } from "@/lib/data";

export function RoomsView() {
  const [rooms] = useState<Room[]>(getRooms());
  const [activeFloor, setActiveFloor] = useState<number | "All">("All");
  const [activeType, setActiveType] = useState<string>("Filter by Type");

  // Derive counts based on the unfiltered room list (or filtered, depending on requirement. Usually it's total).
  // We'll keep counts based on ALL rooms for the bento grid as per typical dashboards.
  const counts = {
    total: rooms.length,
    occupied: rooms.filter((r) => r.status === "Occupied").length,
    vacant: rooms.filter((r) => r.status === "Vacant").length,
    maintenance: rooms.filter((r) => r.status === "Maintenance").length,
  };

  // Filter the rooms based on selected floor and type
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesFloor = activeFloor === "All" || room.floor === activeFloor;
      
      let matchesType = true;
      if (activeType !== "Filter by Type") {
        if (activeType === "Available Rooms") {
          matchesType = room.status === "Vacant";
        } else if (activeType === "Occupied Rooms") {
          matchesType = room.status === "Occupied";
        } else if (activeType === "Under Maintenance") {
          matchesType = room.status === "Maintenance";
        } else {
          matchesType = room.type === activeType;
        }
      }
      
      return matchesFloor && matchesType;
    });
  }, [rooms, activeFloor, activeType]);

  return (
    <div className="bg-surface text-on-surface antialiased pb-24">
      
      <main className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 space-y-8">
        {/* Summary Section: Bento Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between h-32 hover:border-primary transition-all">
            <div className="flex justify-between items-start">
              <span className="font-label text-[10px] tracking-wider uppercase text-on-surface-variant">TOTAL ROOMS</span>
              <span className="material-symbols-outlined text-primary opacity-40">bed</span>
            </div>
            <span className="font-headline text-4xl font-bold">{counts.total.toString().padStart(2, '0')}</span>
          </div>
          <div className="p-5 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between h-32 hover:border-secondary transition-all">
            <div className="flex justify-between items-start">
              <span className="font-label text-[10px] tracking-wider uppercase text-on-surface-variant">OCCUPIED</span>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <span className="font-headline text-4xl font-bold text-secondary">{counts.occupied.toString().padStart(2, '0')}</span>
          </div>
          <div className="p-5 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between h-32 hover:border-primary transition-all">
            <div className="flex justify-between items-start">
              <span className="font-label text-[10px] tracking-wider uppercase text-on-surface-variant">VACANT</span>
              <span className="material-symbols-outlined text-primary">check_circle</span>
            </div>
            <span className="font-headline text-4xl font-bold">{counts.vacant.toString().padStart(2, '0')}</span>
          </div>
          <div className="p-5 bg-surface-container-lowest border border-error/20 rounded-xl flex flex-col justify-between h-32 hover:border-error transition-all">
            <div className="flex justify-between items-start">
              <span className="font-label text-[10px] tracking-wider uppercase text-on-surface-variant">MAINTENANCE</span>
              <span className="material-symbols-outlined text-error">build</span>
            </div>
            <span className="font-headline text-4xl font-bold text-error">{counts.maintenance.toString().padStart(2, '0')}</span>
          </div>
        </section>

        {/* Filter Section */}
        <section className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto" style={{ scrollbarWidth: 'none' }}>
            <button 
              onClick={() => setActiveFloor("All")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all active:scale-95 whitespace-nowrap ${activeFloor === "All" ? "bg-primary !text-white" : "bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              All Floors
            </button>
            <button 
              onClick={() => setActiveFloor(1)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all active:scale-95 whitespace-nowrap ${activeFloor === 1 ? "bg-primary !text-white" : "bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              Floor 1
            </button>
            <button 
              onClick={() => setActiveFloor(2)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all active:scale-95 whitespace-nowrap ${activeFloor === 2 ? "bg-primary !text-white" : "bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              Floor 2
            </button>
            <button 
              onClick={() => setActiveFloor(3)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all active:scale-95 whitespace-nowrap ${activeFloor === 3 ? "bg-primary !text-white" : "bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"}`}
            >
              Floor 3
            </button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <select 
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="w-full appearance-none bg-surface-container-lowest border border-outline-variant px-4 py-2 pr-10 rounded-lg text-sm font-medium focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none cursor-pointer"
              >
                <option value="Filter by Type">Filter by Type</option>
                <option value="Single Premium">Single Premium</option>
                <option value="Double Sharing">Double Sharing</option>
                <option value="Triple Sharing">Triple Sharing</option>
                <option value="Available Rooms">Available Rooms</option>
                <option value="Occupied Rooms">Occupied Rooms</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">tune</span>
            </div>
          </div>
        </section>

        {/* Room List */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant">
                  <th className="px-6 py-4 font-label text-[10px] tracking-wider uppercase text-on-surface-variant">Room No.</th>
                  <th className="px-6 py-4 font-label text-[10px] tracking-wider uppercase text-on-surface-variant">Type</th>
                  <th className="px-6 py-4 font-label text-[10px] tracking-wider uppercase text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 font-label text-[10px] tracking-wider uppercase text-on-surface-variant">Occupancy</th>
                  <th className="px-6 py-4 font-label text-[10px] tracking-wider uppercase text-on-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <tr key={room.number} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 font-headline font-semibold text-lg">{room.number}</td>
                      <td className="px-6 py-4 text-sm">{room.type}</td>
                      <td className="px-6 py-4">
                        {room.status === "Occupied" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            Occupied
                          </span>
                        )}
                        {room.status === "Vacant" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Vacant
                          </span>
                        )}
                        {room.status === "Maintenance" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error/10 text-error text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                            Maintenance
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{room.occupied}/{room.capacity}</td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/rooms/${room.number}`} 
                          className="text-secondary font-semibold text-sm hover:underline"
                        >
                          {room.status === "Vacant" ? "Assign" : room.status === "Maintenance" ? "Schedule" : "Details"}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant text-sm">
                      No rooms match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
      <AppBottomNav activeTab="rooms" />
    </div>
  );
}
