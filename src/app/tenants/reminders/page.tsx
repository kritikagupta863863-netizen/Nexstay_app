"use client";

import { useState } from "react";

// Data Model
type ReminderCategory = "Rent" | "Other";

type Reminder = {
  id: string;
  title: string;
  category: ReminderCategory;
  target: string;
  targetIcon: string;
  frequency: string;
  frequencyIcon: string;
  isActive: boolean;
};

const initialReminders: Reminder[] = [
  {
    id: "r1",
    title: "Rent Payment",
    category: "Rent",
    target: "All Tenants",
    targetIcon: "group",
    frequency: "Monthly on 1st",
    frequencyIcon: "calendar_today",
    isActive: true,
  },
  {
    id: "r2",
    title: "Document Update",
    category: "Other",
    target: "Room B-204",
    targetIcon: "meeting_room",
    frequency: "Daily at 10 AM",
    frequencyIcon: "schedule",
    isActive: true,
  },
  {
    id: "r3",
    title: "Maintenance Follow-up",
    category: "Other",
    target: "Sarah Johnson",
    targetIcon: "person",
    frequency: "Every 2 days",
    frequencyIcon: "history",
    isActive: true,
  },
  {
    id: "r4",
    title: "Late Fee Notice",
    category: "Rent",
    target: "Overdue Tenants",
    targetIcon: "warning",
    frequency: "Monthly on 5th",
    frequencyIcon: "calendar_today",
    isActive: false,
  },
];

type AudienceType = "All Tenants" | "Specific Room" | "Specific Floor" | "Specific Person";

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ReminderCategory | "All">("All");

  // Edit/Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audienceType, setAudienceType] = useState<AudienceType>("All Tenants");
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("Daily");

  // Delete Modal State
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  const handleAudienceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAudienceType(e.target.value as AudienceType);
    setSelectedTargets([]); // Reset selections when type changes
  };

  const toggleTarget = (target: string) => {
    setSelectedTargets(prev => 
      prev.includes(target) ? prev.filter(t => t !== target) : [...prev, target]
    );
  };

  const handleToggleActive = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const openCreateModal = () => {
    setEditingReminderId(null);
    setTitle("");
    setMessage("");
    setAudienceType("All Tenants");
    setSelectedTargets([]);
    setFrequency("Daily");
    setIsModalOpen(true);
  };

  const openEditModal = (reminder: Reminder) => {
    setEditingReminderId(reminder.id);
    setTitle(reminder.title);
    setMessage("Please complete your pending action."); // Mock message
    setAudienceType("All Tenants"); // Simplified mapping for mockup
    setSelectedTargets([]);
    setFrequency(reminder.frequency);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Save logic would go here
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteConfirmationId) {
      setReminders(prev => prev.filter(r => r.id !== deleteConfirmationId));
      setDeleteConfirmationId(null);
    }
  };

  const filteredReminders = reminders.filter((r) => {
    const matchesTab = activeTab === "All" || r.category === activeTab;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-8 font-body">
      <main className="p-4 md:px-8 md:py-8 max-w-7xl mx-auto">
        
        {/* Desktop Header area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black font-headline text-primary mb-2">Tenant Reminders</h1>
            <p className="text-on-surface-variant text-base">Automate follow-ups and keep your residency running smoothly.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-[#0A58CA] text-white hover:bg-[#084298] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Reminder
          </button>
        </div>

        {/* Toolbar: Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex p-1 bg-surface-container-lowest border border-outline-variant/40 rounded-xl max-w-max shadow-sm">
            {(["All", "Rent", "Other"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-colors ${
                  activeTab === tab 
                    ? "bg-white text-primary shadow-sm border border-outline-variant/20" 
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                {tab === "All" ? "All Reminders" : `${tab} Reminders`}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="bg-surface-container-lowest border border-outline-variant/40 p-2.5 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
            <div className="relative flex-1 md:w-64">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Reminders Table */}
        <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant/40">
                  <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Reminder Title</th>
                  <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Target Audience</th>
                  <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Frequency</th>
                  <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredReminders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                      No reminders found.
                    </td>
                  </tr>
                ) : (
                  filteredReminders.map((reminder) => (
                    <tr key={reminder.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                      <td className="px-6 py-5">
                        <p className="font-bold text-primary">{reminder.title}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-[#555]">
                          <span className="material-symbols-outlined text-[18px]">{reminder.targetIcon}</span>
                          <span className="text-[14px] font-medium">{reminder.target}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-[#555]">
                          <span className="material-symbols-outlined text-[18px]">{reminder.frequencyIcon}</span>
                          <span className="text-[14px] font-medium">{reminder.frequency}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={() => handleToggleActive(reminder.id)}
                          className="flex items-center gap-2 group/toggle focus:outline-none"
                        >
                          <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${reminder.isActive ? 'bg-[#10B981]' : 'bg-gray-300'}`}>
                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${reminder.isActive ? 'translate-x-4' : 'translate-x-1'}`} />
                          </div>
                          <span className={`text-[12px] font-bold ${reminder.isActive ? 'text-[#10B981]' : 'text-gray-500'}`}>
                            {reminder.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </button>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(reminder)}
                            className="text-on-surface-variant hover:text-[#0A58CA] transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button 
                            onClick={() => setDeleteConfirmationId(reminder.id)}
                            className="text-on-surface-variant hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Delete Reminder?</h3>
            <p className="text-on-surface-variant mb-6 text-sm">
              Are you sure you want to delete this reminder? This action cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setDeleteConfirmationId(null)}
                className="flex-1 py-2.5 font-bold text-on-surface-variant bg-surface-container-lowest border border-outline-variant/40 rounded-xl hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-2.5 font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
              <h3 className="text-xl font-bold text-primary">
                {editingReminderId ? "Edit Reminder" : "Create New Reminder"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
              
              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Reminder Name</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Rent Collection" 
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Message</label>
                <textarea 
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter the reminder message..." 
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Target Audience</label>
                <select 
                  value={audienceType}
                  onChange={handleAudienceTypeChange}
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all cursor-pointer"
                >
                  <option value="All Tenants">All Tenants</option>
                  <option value="Specific Room">Specific Room(s)</option>
                  <option value="Specific Floor">Specific Floor(s)</option>
                  <option value="Specific Person">Specific Person(s)</option>
                </select>
              </div>

              {/* Dynamic Multi-Select based on Audience Type */}
              {audienceType !== "All Tenants" && (
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    Select {audienceType.replace("Specific ", "")}(s)
                  </label>
                  
                  <div className="max-h-32 overflow-y-auto pr-2 flex flex-col gap-2 custom-scrollbar">
                    {audienceType === "Specific Room" && ["101", "102", "103", "201", "202", "203", "301"].map(room => (
                      <label key={room} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white border border-transparent hover:border-outline-variant/30 cursor-pointer transition-all">
                        <input type="checkbox" checked={selectedTargets.includes(room)} onChange={() => toggleTarget(room)} className="w-4 h-4 text-[#0A58CA] rounded border-outline-variant/50 focus:ring-[#0A58CA]" />
                        <span className="text-sm font-medium">Room {room}</span>
                      </label>
                    ))}
                    {audienceType === "Specific Floor" && ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"].map(floor => (
                      <label key={floor} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white border border-transparent hover:border-outline-variant/30 cursor-pointer transition-all">
                        <input type="checkbox" checked={selectedTargets.includes(floor)} onChange={() => toggleTarget(floor)} className="w-4 h-4 text-[#0A58CA] rounded border-outline-variant/50 focus:ring-[#0A58CA]" />
                        <span className="text-sm font-medium">{floor}</span>
                      </label>
                    ))}
                    {audienceType === "Specific Person" && ["Arjun Kumar", "Priya Sharma", "Rahul Verma", "Sarah Johnson", "Michael Kim"].map(person => (
                      <label key={person} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white border border-transparent hover:border-outline-variant/30 cursor-pointer transition-all">
                        <input type="checkbox" checked={selectedTargets.includes(person)} onChange={() => toggleTarget(person)} className="w-4 h-4 text-[#0A58CA] rounded border-outline-variant/50 focus:ring-[#0A58CA]" />
                        <span className="text-sm font-medium">{person}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Frequency</label>
                <select 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all cursor-pointer"
                >
                  <option>Once (Immediate)</option>
                  <option>Daily</option>
                  <option>Every 2 days</option>
                  <option>Weekly</option>
                  <option>Monthly on 1st</option>
                  <option>Monthly on 5th</option>
                  <option>Custom Schedule</option>
                </select>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="bg-[#0A58CA] text-white hover:bg-[#084298] px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {editingReminderId ? "save" : "send"}
                </span>
                {editingReminderId ? "Save Changes" : "Create & Send"}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
