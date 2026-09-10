import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomById } from "@/lib/data";

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  // Dynamic styling based on status
  const statusStyles = {
    Occupied: "bg-secondary text-on-secondary",
    Vacant: "bg-primary !text-white",
    Maintenance: "bg-error text-on-error",
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-24">
      {/* Top App Bar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/rooms" className="p-2 cursor-pointer active:scale-95 transition-transform hover:bg-surface-container-low rounded-lg">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <h1 className="text-headline-sm font-bold text-primary">Room {room.number}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/rooms/${room.number}/edit`} className="p-2 cursor-pointer active:scale-95 transition-transform hover:bg-surface-container-low rounded-lg block">
            <span className="material-symbols-outlined text-primary">edit</span>
          </Link>
          <button className="p-2 cursor-pointer active:scale-95 transition-transform hover:bg-surface-container-low rounded-lg">
            <span className="material-symbols-outlined text-primary">more_vert</span>
          </button>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-24 py-8">
        {/* Room Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left: Hero/Status Card */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="relative h-64 w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80')" }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`${statusStyles[room.status]} px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md`}>
                    {room.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-end gap-4">
                  <div>
                    <h2 className="text-display-lg font-bold text-primary mb-1">Room {room.number}</h2>
                    <p className="text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {room.floor} {room.floor === 1 ? 'st' : room.floor === 2 ? 'nd' : room.floor === 3 ? 'rd' : 'th'} Floor • Block A
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-label text-xs uppercase tracking-wider text-on-surface-variant opacity-70 mb-1">MONTHLY RENT</span>
                    <span className="text-headline-md font-bold text-secondary">{room.rent}</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-surface-container pt-6">
                  <div className="space-y-1">
                    <span className="block font-label text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Type</span>
                    <p className="font-semibold text-on-surface">{room.type}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block font-label text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Beds Occupied</span>
                    <p className="font-semibold text-on-surface">{room.occupied} / {room.capacity}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block font-label text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Furnishing</span>
                    <p className="font-semibold text-on-surface">Fully Furnished</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block font-label text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Notice Period</span>
                    <p className="font-semibold text-on-surface">30 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Amenities & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
              <h3 className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-4">AMENITIES</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary">ac_unit</span>
                  <span className="text-sm font-medium">AC</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary">wifi</span>
                  <span className="text-sm font-medium">High-speed WiFi</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary">local_laundry_service</span>
                  <span className="text-sm font-medium">Laundry</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary">shower</span>
                  <span className="text-sm font-medium">Attached Bath</span>
                </div>
              </div>
            </div>
            
            <Link href={`/rooms/${room.number}/edit`} className="w-full bg-primary !text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
              <span className="material-symbols-outlined">edit_square</span>
              Edit Room Details
            </Link>
          </div>
        </div>

        {/* Dynamic Section based on Room Status */}
        {room.status === "Occupied" && (
          <section className="mb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-headline-sm font-bold text-primary">Tenants</h3>
              <span className="text-sm text-on-surface-variant font-medium">Capacity: {room.occupied}/{room.capacity}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {room.beds.filter(name => name !== "Ready to assign" && name !== "Move-in Friday").map((tenant, idx) => (
                <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-secondary transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-surface-container bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                      {tenant.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-on-surface">{tenant}</h4>
                          <p className="text-sm text-on-surface-variant font-label">ID: TN-{Math.floor(Math.random() * 9000) + 1000}</p>
                        </div>
                        <button className="p-2 bg-secondary-container text-on-secondary rounded-full active:scale-90 transition-transform">
                          <span className="material-symbols-outlined text-sm">call</span>
                        </button>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-on-surface-variant text-sm">
                        <span className="material-symbols-outlined text-sm">event</span>
                        <span>Joined: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 py-2 text-sm font-bold text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors">
                          View Profile
                        </button>
                        <button className="flex-1 py-2 text-sm font-bold text-on-surface-variant bg-surface-container-low rounded-lg hover:bg-surface-container-high transition-colors">
                          Manage Lease
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* If there are still empty beds in an occupied room, show a placeholder */}
              {room.occupied < room.capacity && (
                <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-5 flex flex-col items-center justify-center min-h-[160px] text-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-2 opacity-50">person_add</span>
                  <h4 className="font-bold text-on-surface mb-1">Available Bed</h4>
                  <p className="text-xs text-on-surface-variant mb-4">Assign a new tenant to this room.</p>
                  <Link href={`/rooms/${room.number}/edit`} className="inline-block px-4 py-2 bg-primary !text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                    Assign Tenant
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {room.status === "Vacant" && (
          <section className="mb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-headline-sm font-bold text-primary">Availability</h3>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-4xl">meeting_room</span>
              </div>
              <h4 className="text-xl font-bold text-on-surface mb-2">Room is fully vacant</h4>
              <p className="text-sm text-on-surface-variant max-w-md mb-6">
                This room is ready for occupancy. You can assign {room.capacity} tenant(s) to this {room.type} room.
              </p>
              <div className="flex gap-4">
                <Link href={`/rooms/${room.number}/edit`} className="px-6 py-3 bg-primary !text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span className="material-symbols-outlined">person_add</span>
                  Assign Tenant
                </Link>
                <button className="px-6 py-3 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined">visibility</span>
                  Show to Leads
                </button>
              </div>
            </div>
          </section>
        )}

        {room.status === "Maintenance" && (
          <section className="mb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-headline-sm font-bold text-error">Active Maintenance</h3>
            </div>
            
            <div className="bg-error/5 border border-error/20 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-error/10 text-error rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">build</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-error mb-1">Room Blocked for Maintenance</h4>
                  <p className="text-sm text-error/80 mb-6">
                    {room.beds[0] === "Painting" ? "The room is currently undergoing scheduled painting and deep cleaning." : "A repair ticket is currently open for this room."}
                  </p>
                  
                  <div className="bg-surface-container-lowest rounded-lg border border-error/10 p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">Issue reported:</span>
                      <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">{room.beds[0]}</span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-2">
                      <div className="bg-error h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                      <span>Reported 2 days ago</span>
                      <span>Vendor Assigned</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-error text-on-error rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                      Resolve Issue
                    </button>
                    <button className="px-5 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant rounded-lg font-bold text-sm hover:bg-surface-container-low transition-colors">
                      Contact Vendor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Maintenance & History */}
        <section className="mb-20">
          <h3 className="text-headline-sm font-bold text-primary mb-6">Recent History</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-3 font-label text-[10px] tracking-wider uppercase text-on-surface-variant font-bold">Activity</th>
                  <th className="px-6 py-3 font-label text-[10px] tracking-wider uppercase text-on-surface-variant font-bold">Status</th>
                  <th className="px-6 py-3 font-label text-[10px] tracking-wider uppercase text-on-surface-variant font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container">cleaning_services</span>
                      <span className="text-sm font-medium">Routine Cleaning</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-soft text-green text-[10px] font-bold rounded-full uppercase tracking-tighter">Completed</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant font-label">2 days ago</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-tertiary-container">build</span>
                      <span className="text-sm font-medium">AC Repair & Gas Refill</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-soft text-green text-[10px] font-bold rounded-full uppercase tracking-tighter">Completed</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant font-label">Last week</td>
                </tr>
              </tbody>
            </table>
            <div className="p-4 bg-surface-container-lowest border-t border-surface-container text-center">
              <button className="text-secondary text-sm font-bold hover:underline">View All History</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
