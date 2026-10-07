"use client";

import Link from "next/link";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { AppBottomNav } from "@/components/app-bottom-nav";

const mockTenants: Record<string, any> = {
  arjun: {
    name: "Arjun Sharma",
    initials: "AS",
    phone: "+91 98765 43210",
    email: "arjun.sharma@example.com",
    room: "Room 101",
    roommates: [
      { id: "rohan", name: "Rohan Kulkarni", initials: "RK", since: "June 2023" }
    ]
  },
  rohan: {
    name: "Rohan Kulkarni",
    initials: "RK",
    phone: "+91 98765 43222",
    email: "rohan.kulkarni@example.com",
    room: "Room 101",
    roommates: [
      { id: "arjun", name: "Arjun Sharma", initials: "AS", since: "August 2023" }
    ]
  }
};

export default function TenantProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const unwrappedParams = use(params);
  const tenant = mockTenants[unwrappedParams.id] || mockTenants.arjun;

  return (
    <div className="bg-background text-on-surface min-h-screen pb-24 overflow-x-hidden">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant">
        <div className="flex items-center justify-between px-4 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:opacity-80 block">
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <h1 className="font-headline text-headline-sm font-semibold text-primary">Tenant Profile</h1>
          </div>
          <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:opacity-80">
            <span className="material-symbols-outlined text-primary">more_vert</span>
          </button>
        </div>
      </header>
      
      <main className="mt-6 px-4 md:px-10 max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface shadow-sm overflow-hidden bg-surface-container-highest flex items-center justify-center">
                  <span className="text-4xl text-primary font-bold">{tenant.initials}</span>
              </div>
              <div className="absolute bottom-1 right-1 bg-secondary text-white rounded-full p-1 border-2 border-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{tenant.name}</h2>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-label font-bold bg-secondary/10 text-secondary uppercase tracking-wider">Verified Resident</span>
              </div>
              <div className="space-y-1 text-on-surface-variant font-medium">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="material-symbols-outlined text-lg">call</span>
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="material-symbols-outlined text-lg">mail</span>
                  <span>{tenant.email}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                <button 
                  onClick={() => setIsMessageOpen(!isMessageOpen)}
                  className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {isMessageOpen && (
          <div className="transition-all duration-300 ease-in-out overflow-hidden bg-surface-container-lowest p-6 rounded-xl border border-outline-variant space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-headline">New Message</h3>
              <button onClick={() => setIsMessageOpen(false)} className="p-1 hover:bg-surface-container-high rounded-full">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <textarea className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm min-h-[100px]" placeholder="Type your message here..."></textarea>
            <div className="flex justify-end">
              <button onClick={() => setIsMessageOpen(false)} className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95">Send</button>
            </div>
          </div>
        )}

        {/* Quick Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center gap-4 group hover:border-secondary transition-colors cursor-default">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <span className="material-symbols-outlined text-secondary">meeting_room</span>
            </div>
            <div>
              <p className="text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Current Room</p>
              <p className="text-xl font-bold font-headline">{tenant.room}</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center gap-4 group hover:border-secondary transition-colors cursor-default">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
            </div>
            <div>
              <p className="text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Rent Status</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green text-green"></span>
                <p className="text-xl font-bold font-headline text-green">Paid</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center gap-4 group hover:border-secondary transition-colors cursor-default">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <span className="material-symbols-outlined text-secondary">calendar_today</span>
            </div>
            <div>
              <p className="text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Next Due</p>
              <p className="text-xl font-bold font-headline">Nov 1st</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Information Section */}
          <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-headline">Room Information</h3>
              <span className="material-symbols-outlined text-on-surface-variant">info</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-outline-variant/30">
                <span className="text-on-surface-variant font-medium">Floor Level</span>
                <span className="font-semibold">1st Floor (East Wing)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-outline-variant/30">
                <span className="text-on-surface-variant font-medium">Sharing Type</span>
                <span className="font-semibold">Twin Sharing</span>
              </div>
              <div className="pt-2">
                <span className="text-on-surface-variant font-medium block mb-3">Roommates</span>
                <div className="flex flex-col gap-3">
                  {tenant.roommates.map((roommate: any) => (
                    <Link key={roommate.id} href={`/tenants/${roommate.id}`} className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-outline-variant/20 hover:border-secondary transition-colors group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{roommate.initials}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm group-hover:text-secondary transition-colors">{roommate.name}</p>
                        <p className="text-xs text-on-surface-variant">Occupant since {roommate.since}</p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-secondary transition-colors">open_in_new</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Documents Section */}
          <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-headline">KYC Documents</h3>
              <button className="text-secondary text-sm font-bold flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-sm">add</span> Upload
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant/30 hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">badge</span>
                  <span className="font-medium text-sm">Aadhar Card</span>
                </div>
                <button className="bg-surface-container-lowest px-3 py-1.5 rounded border border-outline-variant text-xs font-bold hover:bg-surface-container-high transition-colors">View</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant/30 hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">work</span>
                  <span className="font-medium text-sm">Employment Letter</span>
                </div>
                <button className="bg-surface-container-lowest px-3 py-1.5 rounded border border-outline-variant text-xs font-bold hover:bg-surface-container-high transition-colors">View</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-outline-variant/30 hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">description</span>
                  <span className="font-medium text-sm">Lease Agreement</span>
                </div>
                <button className="bg-surface-container-lowest px-3 py-1.5 rounded border border-outline-variant text-xs font-bold hover:bg-surface-container-high transition-colors">View</button>
              </div>
            </div>
          </section>
        </div>

        {/* Payment History Table-style */}
        <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant mb-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-headline">Recent Transactions</h3>
            <Link className="text-secondary text-sm font-bold hover:underline" href="#">View All</Link>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4 first:rounded-l-lg font-bold">Transaction ID</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-4 font-bold">Amount</th>
                  <th className="py-3 px-4 last:rounded-r-lg font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-4 font-label text-sm">#TXN-88421</td>
                  <td className="py-4 px-4 text-sm font-medium">Oct 01, 2023</td>
                  <td className="py-4 px-4 font-bold text-primary">₹12,500.00</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-soft text-green uppercase tracking-tighter">Paid</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-4 font-label text-sm">#TXN-87299</td>
                  <td className="py-4 px-4 text-sm font-medium">Sep 01, 2023</td>
                  <td className="py-4 px-4 font-bold text-primary">₹12,500.00</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-soft text-green uppercase tracking-tighter">Paid</span>
                  </td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-4 font-label text-sm">#TXN-86112</td>
                  <td className="py-4 px-4 text-sm font-medium">Aug 03, 2023</td>
                  <td className="py-4 px-4 font-bold text-primary">₹12,500.00</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-tighter">Late</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <AppBottomNav activeTab="tenants" />
    </div>
  );
}
