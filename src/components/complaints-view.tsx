"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Data Models
type ComplaintStatus = "Pending" | "Resolved";

type Complaint = {
  id: string;
  tenantName: string;
  room: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  icon: string;
  images?: string[];
  raisedOn: string;
  resolvedOn?: string;
  avatar: string;
};

const complaintsData: Complaint[] = [
  {
    id: "c1",
    tenantName: "Arjun Jaikumar",
    room: "101",
    status: "Pending",
    title: "Water Leakage in Bathroom",
    description: "Heavy leakage from the overhead shower unit. Water is pooling on the floor and might cause damage if not addressed immediately.",
    icon: "water_drop",
    images: ["/images/complaints/water_leakage_1.jpg", "/images/complaints/water_leakage_2.jpg"],
    raisedOn: "Oct 24, 09:30 AM",
    avatar: "https://i.pravatar.cc/150?u=arjun"
  },
  {
    id: "c2",
    tenantName: "Priya Sharma",
    room: "405",
    status: "Resolved",
    title: "Wi-Fi Connection Issue",
    description: "Unable to connect to the 5G band. Connection keeps dropping every 15 minutes during work hours.",
    icon: "wifi_off",
    images: ["/images/complaints/wifi_router_issue.jpg"],
    raisedOn: "Oct 22, 02:15 PM",
    resolvedOn: "Oct 23, 11:00 AM",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    id: "c3",
    tenantName: "Vikram Seth",
    room: "212",
    status: "Pending",
    title: "Power Socket Malfunction",
    description: "The socket near the desk is sparking when plugging in chargers. Possible short circuit risk.",
    icon: "bolt",
    raisedOn: "Oct 25, 07:12 PM",
    avatar: "https://i.pravatar.cc/150?u=vikram"
  }
];

export function ComplaintsView() {
  const [activeTab, setActiveTab] = useState<"All Issues" | "Pending" | "Resolved">("All Issues");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComplaints = useMemo(() => {
    return complaintsData.filter((c) => {
      const matchesTab = activeTab === "All Issues" || c.status === activeTab;
      const matchesSearch = 
        c.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.room.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 font-body">
      <main className="p-4 md:px-8 md:py-8 max-w-7xl mx-auto">
        
        {/* Desktop Header area */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black font-headline text-primary">Complaints Management</h1>
            <p className="text-on-surface-variant mt-2">Track, assign, and resolve tenant issues efficiently.</p>
          </div>
        </div>

        {/* Summary Metrics - 3 Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <h2 className="text-[11px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Total Complaints</h2>
            <div className="flex items-end justify-between">
              <div className="text-4xl md:text-5xl font-black font-headline text-primary">42</div>
              <div className="flex items-center text-sm font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[18px] mr-1">trending_up</span>
                +12%
              </div>
            </div>
          </div>

          <div className="bg-error-container/30 border border-error/20 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
            <h3 className="text-[11px] md:text-xs font-label uppercase tracking-widest text-error mb-2">Pending</h3>
            <div>
              <div className="text-4xl md:text-5xl font-black text-error mb-4">08</div>
              <div className="h-2 bg-error/20 rounded-full w-full overflow-hidden">
                <div className="h-full bg-error rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-container/20 border border-secondary/20 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
            <h3 className="text-[11px] md:text-xs font-label uppercase tracking-widest text-secondary mb-2">Resolved</h3>
            <div>
              <div className="text-4xl md:text-5xl font-black text-secondary mb-4">34</div>
              <div className="h-2 bg-secondary/20 rounded-full w-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar: Search & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          
          {/* Search */}
          <div className="flex gap-2 flex-1 md:max-w-md">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Search by tenant or room..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-outline-variant/40 rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
            <button className="bg-surface border border-outline-variant/40 px-3 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {["All Issues", "Pending", "Resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? "bg-secondary text-on-secondary shadow-md" 
                    : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/40"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="font-bold text-lg text-primary">{activeTab}</h2>
          <span className="text-xs font-label text-on-surface-variant tracking-[0.1em] uppercase bg-surface-container-high px-3 py-1 rounded-full">{filteredComplaints.length} Results</span>
        </div>

        {/* Complaint Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  {/* Top Row: User info & Status */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <img src={complaint.avatar} alt={complaint.tenantName} className="w-12 h-12 rounded-full object-cover border-2 border-surface shadow-sm" />
                      <div>
                        <h3 className="font-bold text-base text-primary leading-tight group-hover:text-secondary transition-colors cursor-pointer">{complaint.tenantName}</h3>
                        <p className="text-[11px] font-label text-on-surface-variant uppercase tracking-widest mt-1">Room {complaint.room}</p>
                      </div>
                    </div>
                    {complaint.status === "Pending" ? (
                      <span className="bg-error-container/40 text-error text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-error/10">Pending</span>
                    ) : (
                      <span className="bg-surface-container text-on-surface-variant text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-outline-variant/20">Resolved</span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mb-4 flex-1">
                    <h4 className="font-bold text-base flex items-start gap-2 mb-3 text-primary">
                      <span className={`material-symbols-outlined text-[20px] mt-0.5 ${complaint.status === "Pending" ? "text-error" : "text-on-surface-variant"}`}>
                        {complaint.icon}
                      </span>
                      {complaint.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {complaint.description}
                    </p>
                  </div>

                  {/* Optional Image */}
                  {complaint.images && complaint.images.length > 0 && (
                    <div className="mt-2 mb-5 flex gap-2 overflow-x-auto hide-scrollbar snap-x">
                      {complaint.images.map((img, idx) => (
                        <div key={idx} className="shrink-0 w-5/6 rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container group-hover:border-outline-variant/50 transition-colors snap-start">
                          <img src={img} alt={`Complaint Attachment ${idx + 1}`} className="w-full h-48 object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer / Actions */}
                <div className="px-5 py-4 md:px-6 bg-white border-t border-outline-variant/20 flex items-start justify-between mt-auto min-h-[72px]">
                  <div className="flex flex-col justify-end">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 font-mono">Raised On</p>
                    <p className="text-xs font-bold font-mono text-black">{complaint.raisedOn}</p>
                  </div>
                  <div className="flex flex-col items-end justify-end h-full">
                    {complaint.status === "Pending" ? (
                      <button className="bg-surface-container-high hover:bg-surface-dim transition-colors text-black px-3 py-1.5 rounded-lg text-[13px] font-medium shadow-sm border border-outline-variant/30 active:scale-95">
                        Mark Resolved
                      </button>
                    ) : (
                      complaint.resolvedOn && (
                        <div className="flex flex-col items-end justify-end text-right">
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 font-mono">Resolved On</p>
                          <p className="text-xs font-bold font-mono text-primary">{complaint.resolvedOn}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/30 border-dashed">
              <span className="material-symbols-outlined text-5xl mb-4 opacity-40">inbox</span>
              <p className="font-bold text-lg text-primary mb-1">No complaints found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
