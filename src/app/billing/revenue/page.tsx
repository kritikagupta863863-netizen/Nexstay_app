"use client";

import { useState, useMemo } from "react";

type Invoice = {
  id: string;
  tenant: string;
  room: string;
  amount: string;
  due: string;
  status: string;
  type: "Pending" | "Completed";
};

const initialInvoices: Invoice[] = [
  // Pending Invoices
  { id: "inv-1", tenant: "Riya Shah", room: "103-B", amount: "4000", due: "Overdue · 3 days", status: "Overdue", type: "Pending" },
  { id: "inv-2", tenant: "Kabir Singh", room: "103-A", amount: "4000", due: "Overdue · 1 day", status: "Overdue", type: "Pending" },
  { id: "inv-3", tenant: "Dev Patel", room: "201-A", amount: "4000", due: "Due today", status: "Due soon", type: "Pending" },
  { id: "inv-4", tenant: "Priya Sharma", room: "201-B", amount: "4000", due: "Due tomorrow", status: "Due soon", type: "Pending" },
  { id: "inv-5", tenant: "Sara Rodrigues", room: "B-204", amount: "4000", due: "Due in 3 days", status: "Due soon", type: "Pending" },
  { id: "inv-6", tenant: "Michael Kim", room: "C-301", amount: "4000", due: "Due in 5 days", status: "Due soon", type: "Pending" },
  
  // Completed Invoices
  { id: "inv-7", tenant: "Arjun Kumar", room: "101-A", amount: "4000", due: "Paid on 1st Sep", status: "Paid", type: "Completed" },
  { id: "inv-8", tenant: "Neha Gupta", room: "102-B", amount: "4500", due: "Paid on 2nd Sep", status: "Paid", type: "Completed" },
  { id: "inv-9", tenant: "Rohan Desai", room: "203-A", amount: "4000", due: "Paid on 2nd Sep", status: "Paid", type: "Completed" },
];

export default function RevenuePage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Pending" | "Completed">("Pending");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentNotes, setPaymentNotes] = useState("");

  const pendingList = useMemo(() => invoices.filter(inv => inv.type === "Pending"), [invoices]);
  const selectedInvoice = useMemo(() => invoices.find(inv => inv.id === selectedInvoiceId), [invoices, selectedInvoiceId]);

  const handleRecordPayment = () => {
    if (!selectedInvoiceId) return;
    
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    setInvoices(prev => prev.map(inv => {
      if (inv.id === selectedInvoiceId) {
        return {
          ...inv,
          type: "Completed",
          status: "Paid",
          due: `Paid on ${today}`,
        };
      }
      return inv;
    }));

    setIsModalOpen(false);
    setSelectedInvoiceId("");
    setPaymentNotes("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Overdue":
        return "bg-red-50 text-red-700 border-red-200";
      case "Due soon":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Paid":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = inv.type === activeTab;
    const matchesSearch = inv.tenant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <main className="p-4 md:px-8 md:py-8 max-w-7xl mx-auto font-body">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary mb-2">Revenue & Receivables</h1>
          <p className="text-on-surface-variant text-base">Track monthly revenue and manage pending rent collections.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0A58CA] text-white hover:bg-[#084298] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
            Record Payment
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Monthly Revenue</span>
          <span className="text-4xl font-black text-primary font-headline">₹1,84,500</span>
          <div className="flex items-center gap-1.5 text-green-600 mt-1">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="text-sm font-bold">8.6% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Collected This Month</span>
          <span className="text-4xl font-black text-primary font-headline">₹1,60,500</span>
          <div className="flex items-center gap-1.5 text-blue-600 mt-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span className="text-sm font-bold">87% of billed rent</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Pending Rent</span>
          <span className="text-4xl font-black text-red-600 font-headline">₹24,000</span>
          <div className="flex items-center gap-1.5 text-red-600 mt-1">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span className="text-sm font-bold">{pendingList.length} invoices need attention</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        
        {/* Invoice Tabs */}
        <div className="flex p-1 bg-surface-container-lowest border border-outline-variant/40 rounded-xl max-w-max shadow-sm">
          {(["Pending", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-colors ${
                activeTab === tab 
                  ? "bg-white text-primary shadow-sm border border-outline-variant/20" 
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              }`}
            >
              {tab} Invoices
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
              placeholder="Search tenant or room..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/40">
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Tenant</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Room</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Due Date</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No {activeTab.toLowerCase()} invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          {inv.tenant.charAt(0)}
                        </div>
                        <p className="font-bold text-primary">{inv.tenant}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-mono bg-surface-container px-2 py-1 rounded text-sm text-on-surface-variant">{inv.room}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-primary text-[15px]">₹{inv.amount}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[#555]">
                        <span className="material-symbols-outlined text-[16px] opacity-70">calendar_clock</span>
                        <span className="text-[14px] font-medium">{inv.due}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${getStatusBadge(inv.status)}`}>
                        <span className="text-[12px] font-bold tracking-wide">{inv.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        className="text-on-surface-variant hover:text-[#0A58CA] transition-colors p-2 rounded-lg hover:bg-blue-50 inline-flex items-center justify-center"
                        title="Download Invoice"
                      >
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
              <h3 className="text-xl font-bold text-primary">Record Payment</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-5">
              
              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Select Pending Invoice</label>
                <select 
                  value={selectedInvoiceId}
                  onChange={(e) => setSelectedInvoiceId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all cursor-pointer"
                >
                  <option value="" disabled>Select tenant...</option>
                  {pendingList.map(inv => (
                    <option key={inv.id} value={inv.id}>
                      {inv.tenant} (Room {inv.room}) - ₹{inv.amount}
                    </option>
                  ))}
                  {pendingList.length === 0 && <option disabled>No pending invoices</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Amount Received</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                  <input 
                    type="number" 
                    value={selectedInvoice ? selectedInvoice.amount : ""}
                    disabled={!selectedInvoice}
                    placeholder="0.00" 
                    className="w-full pl-8 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm font-bold focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all disabled:opacity-70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all cursor-pointer"
                >
                  <option>UPI / QR</option>
                  <option>Bank Transfer (NEFT/IMPS)</option>
                  <option>Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Notes (Optional)</label>
                <textarea 
                  rows={2}
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Transaction ID or notes..." 
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all resize-none"
                />
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
                onClick={handleRecordPayment}
                disabled={!selectedInvoiceId}
                className="bg-[#0A58CA] text-white hover:bg-[#084298] px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-[#0A58CA]"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Confirm Payment
              </button>
            </div>
            
          </div>
        </div>
      )}

    </main>
  );
}
