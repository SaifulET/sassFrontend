"use client";

import React, { useState } from "react";

// HomeIcon for breadcrumbs
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

interface Salon {
  id: string;
  name: string;
  tag: string;
  manager: string;
  city: string;
  region: string;
  email: string;
  status: "Active" | "Trial" | "Cancelled" | "Leads" | "Past Due" | "Expired";
  plan: "Basic" | "Premium" | "Enterprise";
  revenue: string;
  ltv: string;
  lastActive: string;
  hasTicket: boolean;
  vip?: boolean;
  enterprise?: boolean;
}

interface SalonSupportPageProps {
  salon: Salon;
  onBack: () => void;
}

export default function SalonSupportPage({ salon, onBack }: SalonSupportPageProps) {
  // Local state for tickets array
  const [tickets, setTickets] = useState([
    {
      id: "#001",
      order: "Employee access issues",
      priority: "Urgent",
      status: "Closed",
      category: "Technical",
      assignTo: "Maria Rodriguez",
      date: "08/08/2025"
    },
    {
      id: "#001",
      order: "Employee access issues",
      priority: "High",
      status: "Open",
      category: "Billing",
      assignTo: "Maria Rodriguez",
      date: "08/08/2025"
    },
    {
      id: "#001",
      order: "Employee access issues",
      priority: "Medium",
      status: "Waiting",
      category: "Feature Request",
      assignTo: "Maria Rodriguez",
      date: "08/08/2025"
    },
    {
      id: "#001",
      order: "Employee access issues",
      priority: "Low",
      status: "Closed",
      category: "General",
      assignTo: "Maria Rodriguez",
      date: "08/08/2025"
    },
    {
      id: "#001",
      order: "Employee access issues",
      priority: "High",
      status: "Closed",
      category: "Bug Report",
      assignTo: "Maria Rodriguez",
      date: "08/08/2025"
    },
    {
      id: "#001",
      order: "Employee access issues",
      priority: "High",
      status: "Closed",
      category: "Other",
      assignTo: "Maria Rodriguez",
      date: "08/08/2025"
    }
  ]);

  // Modal and custom states
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [viewingTicket, setViewingTicket] = useState<typeof tickets[number] | null>(null);
  const [deleteTicketIndex, setDeleteTicketIndex] = useState<number | null>(null);

  const [newOrder, setNewOrder] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("General");
  const [newAssignTo, setNewAssignTo] = useState("Maria Rodriguez");

  const handleNewTicket = () => {
    setNewOrder("");
    setNewPriority("Medium");
    setNewCategory("General");
    setNewAssignTo("Maria Rodriguez");
    setIsNewTicketModalOpen(true);
  };

  const handleViewTicket = (ticketId: string, index: number) => {
    setViewingTicket(tickets[index]);
  };

  const handleDeleteTicket = (index: number) => {
    setDeleteTicketIndex(index);
  };

  // Badge styling helpers
  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-[#ffe4e6] text-[#ff4e73]";
      case "high":
        return "bg-[#fff1f2] text-[#ff4e73]";
      case "medium":
        return "bg-[#fffbeb] text-[#d97706]";
      case "low":
        return "bg-[#f0fdf4] text-[#16a34a]";
      default:
        return "bg-slate-100 text-slate-650";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "closed":
        return "bg-[#ecfeff] text-[#0891b2]";
      case "open":
        return "bg-[#ffe4e6] text-[#ff4d72]";
      case "waiting":
        return "bg-[#fffbeb] text-[#d97706]";
      default:
        return "bg-slate-105 text-slate-650";
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "technical":
        return "bg-[#fffbeb] text-[#d97706]";
      case "billing":
        return "bg-[#f0fdf4] text-[#16a34a]";
      case "feature request":
        return "bg-[#f5f3ff] text-[#5e53fc]";
      case "general":
        return "bg-[#eff6ff] text-[#2563eb]";
      case "bug report":
        return "bg-[#fff1f2] text-[#ff4e73]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
      {/* Top Header Breadcrumbs Card */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex items-center justify-between w-full">
        <div className="text-base font-bold leading-none tracking-normal text-[#1f2937]">
          {salon.name}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button onClick={onBack} className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors inline-flex">
            <HomeIcon />
          </button>
          <span className="text-slate-300">/</span>
          <button onClick={onBack} className="bg-[#e4e2ff] text-[#5e53fc] px-3 py-1 rounded-full text-[10px] font-extrabold transition-all hover:bg-[#d8d5ff]">
            Salon Beauty
          </button>
        </div>
      </div>

      {/* Main Support Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] flex flex-col p-8 w-full">
        {/* Title and Top Action Button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">Support Tickets ({tickets.length})</h2>
          <button
            onClick={handleNewTicket}
            className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100"
          >
            New Ticket
          </button>
        </div>

        {/* Tickets Table */}
        <div className="border border-slate-100 rounded-2xl overflow-x-auto w-full bg-white">
          <table className="w-full min-w-[800px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#f5f4ff] border-b border-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Assign to</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {tickets.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  {/* ID */}
                  <td className="px-6 py-4 text-slate-500">{t.id}</td>

                  {/* Order */}
                  <td className="px-6 py-4 text-slate-800 font-bold">{t.order}</td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide whitespace-nowrap ${getPriorityStyle(t.priority)}`}>
                      {t.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide whitespace-nowrap ${getStatusStyle(t.status)}`}>
                      {t.status}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide whitespace-nowrap ${getCategoryStyle(t.category)}`}>
                      {t.category}
                    </span>
                  </td>

                  {/* Assign to */}
                  <td className="px-6 py-4 text-slate-500 font-semibold">{t.assignTo}</td>

                  {/* Date */}
                  <td className="px-6 py-4 text-slate-400 font-semibold">{t.date}</td>

                  {/* Actions (View & Delete) */}
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewTicket(t.id, idx)}
                      className="p-2 bg-[#f2f1ff] text-[#5e53fc] hover:bg-[#e4e2ff] rounded-lg transition-colors inline-flex"
                      title="View Ticket Details"
                    >
                      <ViewIcon />
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(idx)}
                      className="p-2 bg-[#fff1f2] text-[#ff4e73] hover:bg-[#ffe4e6] rounded-lg transition-colors inline-flex"
                      title="Delete Ticket"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-[#0f172a]">Create Support Ticket</h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newOrder) return;
                const newT = {
                  id: `#${String(tickets.length + 1).padStart(3, "0")}`,
                  order: newOrder,
                  priority: newPriority,
                  status: "Open",
                  category: newCategory,
                  assignTo: newAssignTo,
                  date: new Date().toLocaleDateString("en-GB")
                };
                setTickets(prev => [newT, ...prev]);
                setIsNewTicketModalOpen(false);
              }}
              className="flex flex-col gap-4 text-sm"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Subject / Order *</label>
                <input
                  type="text"
                  required
                  value={newOrder}
                  onChange={(e) => setNewOrder(e.target.value)}
                  placeholder="Employee access issues"
                  className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc] bg-white text-xs font-semibold"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc] bg-white text-xs font-semibold"
                >
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General">General</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Assign To</label>
                <input
                  type="text"
                  value={newAssignTo}
                  onChange={(e) => setNewAssignTo(e.target.value)}
                  className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Ticket Details Modal */}
      {viewingTicket && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0f172a]">Ticket {viewingTicket.id} Details</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Created on {viewingTicket.date}</p>
            </div>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Subject / Order</span>
                <span className="text-slate-800 text-sm font-extrabold">{viewingTicket.order}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Priority</span>
                  <span className={`w-fit px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${getPriorityStyle(viewingTicket.priority)}`}>
                    {viewingTicket.priority}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                  <span className={`w-fit px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${getStatusStyle(viewingTicket.status)}`}>
                    {viewingTicket.status}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Category</span>
                  <span className={`w-fit px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${getCategoryStyle(viewingTicket.category)}`}>
                    {viewingTicket.category}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned To</span>
                  <span className="text-slate-700">{viewingTicket.assignTo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
              <button
                type="button"
                onClick={() => setViewingTicket(null)}
                className="px-5 py-2 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Ticket Confirmation Modal */}
      {deleteTicketIndex !== null && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[400px] shadow-2xl p-6 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-[#0f172a]">Delete Ticket</h3>
              <p className="text-sm text-[#475569]">Are you sure you want to delete this ticket? This action cannot be undone.</p>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setDeleteTicketIndex(null)}
                className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setTickets((prev) => prev.filter((_, i) => i !== deleteTicketIndex));
                  setDeleteTicketIndex(null);
                }}
                className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
