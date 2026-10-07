"use client";

import { useState } from "react";

type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
  icon: string;
};

const initialExpenses: Expense[] = [
  { id: "exp-1", date: "2 Sep 2026", category: "Utilities", description: "Electricity bill · Maple House", amount: "6200", icon: "bolt" },
  { id: "exp-2", date: "30 Aug 2026", category: "Maintenance", description: "Plumbing repair · Room 204", amount: "1450", icon: "plumbing" },
  { id: "exp-3", date: "28 Aug 2026", category: "Staff", description: "Housekeeping salary", amount: "18000", icon: "cleaning_services" },
  { id: "exp-4", date: "26 Aug 2026", category: "Utilities", description: "Internet bill · Maple House", amount: "1200", icon: "wifi" },
  { id: "exp-5", date: "22 Aug 2026", category: "Maintenance", description: "Pest control", amount: "2500", icon: "bug_report" },
  { id: "exp-6", date: "20 Aug 2026", category: "Utilities", description: "Water tanker delivery", amount: "900", icon: "water_drop" },
];

const categoryIcons: Record<string, string> = {
  "Utilities": "bolt",
  "Maintenance": "build",
  "Staff": "cleaning_services",
  "Other": "receipt"
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: "Utilities",
    description: "",
    amount: ""
  });

  const openAddModal = () => {
    setEditingExpenseId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: "Utilities",
      description: "",
      amount: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    
    // Parse the date back to YYYY-MM-DD for the input if possible, or just default to today
    // For simplicity with the mock date format (e.g., "2 Sep 2026"), we'll just set it to today for editing
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: expense.category,
      description: expense.description,
      amount: expense.amount.replace(/[^0-9]/g, '')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.description || !formData.amount) return;

    // Format date nicely (e.g., "15 Oct 2026")
    const dateObj = new Date(formData.date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const icon = categoryIcons[formData.category] || "receipt";

    if (editingExpenseId) {
      // Update existing
      setExpenses(expenses.map(exp => 
        exp.id === editingExpenseId 
          ? { ...exp, date: formattedDate, category: formData.category, description: formData.description, amount: formData.amount, icon }
          : exp
      ));
    } else {
      // Add new
      const newExpense: Expense = {
        id: `exp-${Date.now()}`,
        date: formattedDate,
        category: formData.category,
        description: formData.description,
        amount: formData.amount,
        icon
      };
      setExpenses([newExpense, ...expenses]);
    }

    setIsModalOpen(false);
  };

  const filteredExpenses = expenses.filter((exp) => 
    exp.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-4 md:px-8 md:py-8 max-w-7xl mx-auto font-body">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black font-headline text-primary mb-2">Property Expenses</h1>
          <p className="text-on-surface-variant text-base">Track and categorize your outgoing spending and operational costs.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#0A58CA] text-white hover:bg-[#084298] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Expense
        </button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Total Expenses</span>
          <span className="text-4xl font-black text-primary font-headline">
            ₹{expenses.reduce((acc, curr) => acc + parseInt(curr.amount || "0"), 0).toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1.5 text-on-surface-variant mt-1">
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span className="text-sm font-bold">{expenses.length} recorded transactions</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <span className="text-sm font-bold text-on-surface-variant">Utilities</span>
          <span className="text-2xl font-black text-primary font-headline">
            ₹{expenses.filter(e => e.category === 'Utilities').reduce((acc, curr) => acc + parseInt(curr.amount || "0"), 0).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">build</span>
          </div>
          <span className="text-sm font-bold text-on-surface-variant">Maintenance</span>
          <span className="text-2xl font-black text-primary font-headline">
            ₹{expenses.filter(e => e.category === 'Maintenance').reduce((acc, curr) => acc + parseInt(curr.amount || "0"), 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-primary">Recent Expenses</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="bg-surface-container-lowest border border-outline-variant/40 p-2.5 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search expenses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/40">
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Description</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold font-mono tracking-wider text-on-surface-variant uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-bold text-primary">{exp.date}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{exp.icon}</span>
                        <span className="font-medium text-[14px]">{exp.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-medium text-on-surface-variant">{exp.description}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-primary text-[15px]">₹{Number(exp.amount).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(exp)}
                          className="text-on-surface-variant hover:text-[#0A58CA] transition-colors p-2 rounded-lg hover:bg-blue-50"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(exp.id)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
              <h3 className="text-xl font-bold text-primary">{editingExpenseId ? "Edit Expense" : "Add Expense"}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              
              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all cursor-pointer"
                >
                  <option>Utilities</option>
                  <option>Maintenance</option>
                  <option>Staff</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00" 
                    className="w-full pl-8 pr-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-bold focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Description</label>
                <textarea 
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="E.g., Plumbing repair · Room 204" 
                  className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] transition-all resize-none"
                />
              </div>

            </div>

            <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!formData.amount || !formData.description}
                className="bg-[#0A58CA] text-white hover:bg-[#084298] px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-[#0A58CA]"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Expense
              </button>
            </div>
            
          </div>
        </div>
      )}

    </main>
  );
}
