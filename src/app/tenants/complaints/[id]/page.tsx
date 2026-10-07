"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { AppBottomNav } from "@/components/app-bottom-nav";

// Mock data to match what's on the Complaints view
const mockComplaints: Record<string, any> = {
  c1: { id: "c1", title: "Leaking tap", description: "The bathroom tap is leaking continuously. Please fix it as soon as possible to avoid water wastage.", room: "204", status: "Open", raised: "2 days ago", images: ["https://placehold.co/600x400/eeeeee/999999?text=Leaking+Tap+Image"] },
  c2: { id: "c2", title: "AC not cooling", description: "The air conditioner is running but not cooling the room at all. Needs servicing or gas refill.", room: "301", status: "Open", raised: "1 day ago", images: [] },
  c3: { id: "c3", title: "WiFi not working", description: "Cannot connect to the internet. The router shows a red light.", room: "102", status: "Open", raised: "3 days ago", images: [] },
  c4: { id: "c4", title: "Water heater not working", description: "Geyser is not heating water. The indicator light doesn't turn on.", room: "201-B", status: "Open", raised: "4 days ago", images: [] },
  c5: { id: "c5", title: "Broken cupboard door", description: "One of the hinges on the wardrobe door is broken. It's difficult to open and close.", room: "101-A", status: "Open", raised: "6 days ago", images: ["https://placehold.co/600x400/eeeeee/999999?text=Broken+Hinge", "https://placehold.co/600x400/eeeeee/999999?text=Wardrobe"] },
  c6: { id: "c6", title: "Fan replacement request", description: "The ceiling fan is making a loud noise and running very slow.", room: "103-B", status: "Resolved", raised: "9 days ago", images: [] },
};

function StatusChip({ status }: { status: string }) {
  return <span className={`status status-${status.toLowerCase().replace(" ", "-")}`}>{status}</span>;
}

export default function ComplaintDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const complaint = mockComplaints[unwrappedParams.id];

  if (!complaint) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headline mb-2 text-primary">Complaint not found</h1>
          <button onClick={() => router.back()} className="text-secondary font-bold hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen pb-24 overflow-x-hidden font-body">
      {/* App Bar */}
      <header className="sticky top-0 w-full z-50 bg-surface-container-lowest/80 border-b border-outline-variant/40 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-16 w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 group">
              <span className="material-symbols-outlined text-primary group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            </button>
            <h1 className="font-headline text-lg font-bold text-primary truncate">Ticket #{complaint.id.toUpperCase()}</h1>
          </div>
          <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 text-on-surface-variant">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      <main className="mt-6 md:mt-10 px-4 md:px-8 max-w-4xl mx-auto space-y-6">
        {/* Primary Details Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <StatusChip status={complaint.status} />
            <span className="text-sm font-medium text-on-surface-variant flex items-center gap-1.5">
               <span className="material-symbols-outlined text-[16px]">schedule</span>
               {complaint.raised}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight mb-8 text-primary leading-tight">{complaint.title}</h2>
          
          <div className="bg-surface-container/30 rounded-xl p-5 md:p-6 border border-outline-variant/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
            <h3 className="text-[11px] font-bold font-label text-secondary uppercase tracking-[0.15em] mb-3">Description</h3>
            <p className="text-on-surface leading-relaxed">{complaint.description}</p>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">meeting_room</span>
            <span className="text-sm font-medium text-on-surface-variant">Room</span>
            <span className="font-bold text-primary ml-2">{complaint.room}</span>
          </div>

          {complaint.images && complaint.images.length > 0 && (
            <div className="mt-10 pt-8 border-t border-outline-variant/20">
              <h3 className="text-[11px] font-bold font-label text-on-surface-variant uppercase tracking-[0.15em] mb-4">Attachments ({complaint.images.length})</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {complaint.images.map((img: string, idx: number) => (
                  <div key={idx} className="shrink-0 w-64 md:w-72 aspect-[4/3] bg-surface-container-highest rounded-xl overflow-hidden border border-outline-variant/50 shadow-sm relative group cursor-pointer snap-start">
                    <img src={img} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                       <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md transform scale-75 group-hover:scale-100 duration-300">zoom_in</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AppBottomNav activeTab="tenants" />
    </div>
  );
}
