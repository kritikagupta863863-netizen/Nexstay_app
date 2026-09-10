import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomById } from "@/lib/data";

export default async function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-24 lg:pb-8 flex flex-col">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-30 flex items-center justify-between px-4 h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <Link href={`/rooms/${room.number}`} className="cursor-pointer active:opacity-70 p-2 rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <h2 className="font-headline text-headline-sm font-semibold tracking-tight">Edit Room</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-label text-[10px] text-on-surface-variant bg-surface-container px-2 py-1 rounded">DRAFT</span>
        </div>
      </header>

      {/* Form Content Canvas */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)]">
          {/* Section Header */}
          <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline font-semibold text-body-lg">Room Specifications</h3>
            <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold">Room {room.number}</span>
          </div>

          <form className="p-6 md:p-8 space-y-8" action={`/rooms/${room.number}`}>
            {/* Grid Layout for Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Room Number (Readonly) */}
              <div className="space-y-2">
                <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Room Number</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">meeting_room</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-high border border-outline-variant rounded-lg font-body text-on-surface-variant cursor-not-allowed outline-none" 
                    readOnly 
                    type="text" 
                    value={room.number} 
                  />
                </div>
                <p className="text-[11px] text-outline font-medium">Identifier cannot be changed once assigned.</p>
              </div>

              {/* Monthly Rent */}
              <div className="space-y-2">
                <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Monthly Rent</label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label font-bold text-secondary">₹</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none" 
                    placeholder="0.00" 
                    type="text" 
                    defaultValue={room.rent.replace('₹', '').replace(',', '')} 
                  />
                </div>
              </div>

              {/* Floor Selection */}
              <div className="space-y-2">
                <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Floor Level</label>
                <div className="relative">
                  <select 
                    defaultValue={room.floor}
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none appearance-none bg-transparent"
                  >
                    <option value="1">Floor 1</option>
                    <option value="2">Floor 2</option>
                    <option value="3">Floor 3</option>
                    <option value="4">Floor 4</option>
                    <option value="5">Floor 5</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-outline">expand_more</span>
                </div>
              </div>

              {/* Furnishing Status */}
              <div className="space-y-2">
                <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Furnishing Status</label>
                <div className="relative">
                  <select 
                    defaultValue="furnished"
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none appearance-none bg-transparent"
                  >
                    <option value="furnished">Furnished</option>
                    <option value="semi">Semi-furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-outline">expand_more</span>
                </div>
              </div>
            </div>

            {/* Sharing Type (Segmented Control) */}
            <div className="space-y-4">
              <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Sharing Configuration</label>
              <div className="flex flex-wrap gap-2 md:gap-0 md:bg-surface-container rounded-lg p-1">
                
                <div className="flex-1 min-w-[100px] relative">
                  <input 
                    className="peer hidden" 
                    id="share-single" 
                    name="sharing" 
                    type="radio" 
                    value="single" 
                    defaultChecked={room.type === "Single Premium"} 
                  />
                  <label 
                    className="flex flex-col items-center justify-center py-4 px-2 rounded-lg cursor-pointer transition-all hover:bg-surface-container-high text-on-surface-variant border border-outline-variant md:border-none peer-checked:bg-secondary-container peer-checked:text-on-secondary-container" 
                    htmlFor="share-single"
                  >
                    <span className="material-symbols-outlined mb-1">person</span>
                    <span className="font-label text-[10px] font-bold">SINGLE</span>
                  </label>
                </div>

                <div className="flex-1 min-w-[100px] relative">
                  <input 
                    className="peer hidden" 
                    id="share-double" 
                    name="sharing" 
                    type="radio" 
                    value="double" 
                    defaultChecked={room.type === "Double Sharing"} 
                  />
                  <label 
                    className="flex flex-col items-center justify-center py-4 px-2 rounded-lg cursor-pointer transition-all hover:bg-surface-container-high text-on-surface-variant border border-outline-variant md:border-none peer-checked:bg-secondary-container peer-checked:text-on-secondary-container" 
                    htmlFor="share-double"
                  >
                    <span className="material-symbols-outlined mb-1">group</span>
                    <span className="font-label text-[10px] font-bold">DOUBLE</span>
                  </label>
                </div>

                <div className="flex-1 min-w-[100px] relative">
                  <input 
                    className="peer hidden" 
                    id="share-triple" 
                    name="sharing" 
                    type="radio" 
                    value="triple" 
                    defaultChecked={room.type === "Triple Sharing"} 
                  />
                  <label 
                    className="flex flex-col items-center justify-center py-4 px-2 rounded-lg cursor-pointer transition-all hover:bg-surface-container-high text-on-surface-variant border border-outline-variant md:border-none peer-checked:bg-secondary-container peer-checked:text-on-secondary-container" 
                    htmlFor="share-triple"
                  >
                    <span className="material-symbols-outlined mb-1">groups</span>
                    <span className="font-label text-[10px] font-bold">TRIPLE</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities and Other Details */}
            <div className="space-y-4">
              <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Room Images</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Upload Placeholder */}
                <button className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors group" type="button">
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary mb-2">add_a_photo</span>
                  <span className="font-label text-[10px] font-bold text-on-surface-variant">ADD IMAGES</span>
                </button>
                {/* Placeholder Image 1 */}
                <div className="aspect-square rounded-xl overflow-hidden border border-outline-variant relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Room view" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80" />
                  <button className="absolute top-1 right-1 bg-error text-on-error rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
                {/* Placeholder Image 2 */}
                <div className="aspect-square rounded-xl overflow-hidden border border-outline-variant relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Room detail" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80" />
                  <button className="absolute top-1 right-1 bg-error text-on-error rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
                {/* Placeholder Image 3 */}
                <div className="aspect-square rounded-xl overflow-hidden border border-outline-variant relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Room window" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" />
                  <button className="absolute top-1 right-1 bg-error text-on-error rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block font-headline font-semibold text-xs text-on-surface-variant uppercase tracking-wider">Additional Amenities &amp; Details</label>
              <textarea 
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none resize-none" 
                placeholder="e.g., Balcony access, Personal cupboard, High-speed fiber internet availability..." 
                rows={4}
              ></textarea>
            </div>

            {/* Actions Area */}
            <div className="pt-8 flex flex-col md:flex-row gap-4">
              <Link 
                href={`/rooms/${room.number}`} 
                className="flex-1 bg-primary !text-white py-4 rounded-lg font-headline font-bold text-body-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Save Changes
              </Link>
              <Link 
                href={`/rooms/${room.number}`} 
                className="flex-1 bg-surface-container-high text-on-surface-variant py-4 rounded-lg font-headline font-bold text-body-md hover:bg-surface-container-highest active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Discard
              </Link>
            </div>
          </form>
        </div>

        {/* Contextual Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-outline-variant rounded-lg bg-surface flex gap-4 items-start">
            <span className="material-symbols-outlined text-secondary">info</span>
            <div>
              <h4 className="font-headline font-semibold text-body-md mb-1">Tenant Visibility</h4>
              <p className="text-on-surface-variant text-body-sm">Changes to rent will notify currently active tenants of Room {room.number} via the resident app.</p>
            </div>
          </div>
          <div className="p-4 border border-outline-variant rounded-lg bg-surface flex gap-4 items-start">
            <span className="material-symbols-outlined text-error">history</span>
            <div>
              <h4 className="font-headline font-semibold text-body-md mb-1">Audit Log</h4>
              <p className="text-on-surface-variant text-body-sm">Last edited by System Admin on Oct 24, 2023. All changes are logged for transparency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
