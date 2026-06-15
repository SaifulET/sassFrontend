"use client";

import React, { useState, useMemo } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  source: string;
  value: number;
  receivedDaysAgo: number;
  priority: "High" | "Medium" | "Low";
  stage: "to_contact" | "call_to_fix" | "fixed_call" | "follow_up" | "waiting_decision" | "won" | "lost" | "incoming";
  assignedTo: string | null;
  task: string | null;
  taskCompleted: boolean;
}

const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Alessandro Bianchi",
    email: "alessandro.bianchi@gmail.com",
    company: "Bianchi Estetica",
    phone: "+39 347 123 4567",
    source: "Google Ads",
    value: 1200,
    receivedDaysAgo: 1,
    priority: "Low",
    stage: "incoming",
    assignedTo: null,
    task: "Call to confirm email address",
    taskCompleted: false,
  },
  {
    id: "lead-2",
    name: "Elena Conti",
    email: "elena.conti@outlook.it",
    company: "Conti Parrucchieri",
    phone: "+39 333 987 6543",
    source: "Instagram",
    value: 850,
    receivedDaysAgo: 2,
    priority: "Medium",
    stage: "incoming",
    assignedTo: null,
    task: null,
    taskCompleted: false,
  },
  {
    id: "lead-3",
    name: "Dr. Marco Rossi",
    email: "m.rossi@rossimedical.it",
    company: "Rossi Wellness Clinic",
    phone: "+39 328 111 2222",
    source: "Direct Referral",
    value: 3500,
    receivedDaysAgo: 4,
    priority: "High",
    stage: "incoming",
    assignedTo: null,
    task: "Send enterprise custom contract PDF",
    taskCompleted: false,
  },
  {
    id: "lead-4",
    name: "Giulia Ferraro",
    email: "giulia.ferraro@beautyloft.com",
    company: "Beauty Loft Milan",
    phone: "+39 349 444 5555",
    source: "Facebook Page",
    value: 950,
    receivedDaysAgo: 1,
    priority: "Low",
    stage: "to_contact",
    assignedTo: "Roberto Marini",
    task: "Intro call",
    taskCompleted: false,
  },
  {
    id: "lead-5",
    name: "Matteo Ricci",
    email: "matteo.ricci@ricci-salon.it",
    company: "Ricci & Co. Salon",
    phone: "+39 335 666 7777",
    source: "Google Ads",
    value: 1400,
    receivedDaysAgo: 3,
    priority: "High",
    stage: "call_to_fix",
    assignedTo: "Maria Rodriguez",
    task: "Schedule callback",
    taskCompleted: true,
  },
  {
    id: "lead-6",
    name: "Sofia Marino",
    email: "sofia.marino@stylelab.it",
    company: "Style Lab Naples",
    phone: "+39 339 888 9999",
    source: "Website Chat",
    value: 1100,
    receivedDaysAgo: 2,
    priority: "Medium",
    stage: "fixed_call",
    assignedTo: "Alessandro Costa",
    task: "Prepare demo sandbox",
    taskCompleted: false,
  },
  {
    id: "lead-7",
    name: "Federico Barbarossa",
    email: "federico@barbarossa-barber.it",
    company: "Barbarossa Grooming",
    phone: "+39 340 777 8888",
    source: "Instagram",
    value: 750,
    receivedDaysAgo: 5,
    priority: "High",
    stage: "follow_up",
    assignedTo: "Roberto Marini",
    task: "Send follow up email with discount code",
    taskCompleted: false,
  },
  {
    id: "lead-8",
    name: "Francesca Neri",
    email: "francesca.neri@nerihair.com",
    company: "Neri Hair Art",
    phone: "+39 334 555 4444",
    source: "Referral",
    value: 2000,
    receivedDaysAgo: 3,
    priority: "Medium",
    stage: "waiting_decision",
    assignedTo: "Maria Rodriguez",
    task: "Review pricing concerns",
    taskCompleted: false,
  },
  {
    id: "lead-9",
    name: "Lorenzo Gatti",
    email: "lorenzo.gatti@spa-spa.it",
    company: "Golden Spa Group",
    phone: "+39 347 555 6666",
    source: "SEO Web",
    value: 4500,
    receivedDaysAgo: 6,
    priority: "High",
    stage: "won",
    assignedTo: "Alessandro Costa",
    task: "Onboarding call completed",
    taskCompleted: true,
  },
  {
    id: "lead-10",
    name: "Chiara Fontana",
    email: "chiara.fontana@modernhair.it",
    company: "Modern Hair Lounge",
    phone: "+39 338 222 3333",
    source: "Cold Email",
    value: 500,
    receivedDaysAgo: 8,
    priority: "Low",
    stage: "lost",
    assignedTo: "Roberto Marini",
    task: "Not interested: price too high",
    taskCompleted: true,
  }
];

const PIPELINE_STAGES = [
  { id: "to_contact", label: "To Contact", color: "border-t-4 border-t-blue-400" },
  { id: "call_to_fix", label: "Call To_fix", color: "border-t-4 border-t-amber-400" },
  { id: "fixed_call", label: "Fixed Call", color: "border-t-4 border-t-indigo-400" },
  { id: "follow_up", label: "Follow Up", color: "border-t-4 border-t-yellow-400" },
  { id: "waiting_decision", label: "Waiting for Decision", color: "border-t-4 border-t-pink-400" },
  { id: "won", label: "Won", color: "border-t-4 border-t-emerald-400" },
  { id: "lost", label: "Lost", color: "border-t-4 border-t-slate-400" },
] as const;

const ASSIGNEES = ["Roberto Marini", "Maria Rodriguez", "Dr. Marco Rossi", "Alessandro Costa"];

export default function LeadsPipelinePage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeSubTab, setActiveSubTab] = useState<"Leads da Gestire" | "Actual Pipeline" | "Settings">("Leads da Gestire");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState<"All" | "Under 3 days" | "3+ days">("All");
  const [daysFilterOpen, setDaysFilterOpen] = useState(false);

  // Selection state for incoming list
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkAssignOpen, setBulkAssignOpen] = useState(false);
  const [activeActionsRowId, setActiveActionsRowId] = useState<string | null>(null);

  // Kanban Drag and Drop highlights
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    to_contact: true,
    call_to_fix: true,
    fixed_call: true,
    follow_up: true,
    waiting_decision: true,
    won: true,
    lost: true,
  });
  const [columnVisibilityMenuOpen, setColumnVisibilityMenuOpen] = useState(false);

  // Modals state
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [addTaskLeadId, setAddTaskLeadId] = useState<string | null>(null);
  const [taskTextInput, setTaskTextInput] = useState("");
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Priority color classes mapping
  const getPriorityClasses = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return { bg: "bg-[#FFE5ED]", text: "text-[#FF6692] border border-[#FFCCD9]" };
      case "Medium":
        return { bg: "bg-[#FFF9E5]", text: "text-[#D97706] border border-[#FDE68A]" }; // Darker amber text for readability
      case "Low":
        return { bg: "bg-[#EBFAF0]", text: "text-[#36C76C] border border-[#C6F6D5]" };
    }
  };

  // Re-sync leads
  const handleResync = () => {
    setLeads(initialLeads);
    setSelectedLeadIds([]);
    setActiveActionsRowId(null);
  };

  // Delete individual lead
  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedLeadIds((prev) => prev.filter((selectedId) => selectedId !== id));
    if (activeActionsRowId === id) setActiveActionsRowId(null);
  };

  // Move individual lead to a stage
  const handleMoveLead = (id: string, stage: Lead["stage"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage } : l))
    );
  };

  // Toggle task completion
  const handleToggleTask = (id: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, taskCompleted: !l.taskCompleted } : l
      )
    );
  };

  // Open task creation modal
  const openAddTask = (id: string) => {
    const lead = leads.find((l) => l.id === id);
    setAddTaskLeadId(id);
    setTaskTextInput(lead?.task || "");
    setActiveActionsRowId(null);
  };

  // Save task
  const handleSaveTask = () => {
    if (!addTaskLeadId) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === addTaskLeadId
          ? { ...l, task: taskTextInput.trim() || null, taskCompleted: false }
          : l
      )
    );
    setAddTaskLeadId(null);
    setTaskTextInput("");
  };

  // Selection helper for incoming table
  const incomingLeads = useMemo(() => {
    return leads.filter((l) => l.stage === "incoming");
  }, [leads]);

  const filteredIncomingLeads = useMemo(() => {
    return incomingLeads.filter((l) => {
      // Search filter
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Days Filter
      if (daysFilter === "Under 3 days") {
        return matchesSearch && l.receivedDaysAgo < 3;
      }
      if (daysFilter === "3+ days") {
        return matchesSearch && l.receivedDaysAgo >= 3;
      }
      return matchesSearch;
    });
  }, [incomingLeads, searchQuery, daysFilter]);

  const allFilteredIncomingSelected = useMemo(() => {
    if (filteredIncomingLeads.length === 0) return false;
    return filteredIncomingLeads.every((l) => selectedLeadIds.includes(l.id));
  }, [filteredIncomingLeads, selectedLeadIds]);

  const handleSelectAllIncoming = () => {
    if (allFilteredIncomingSelected) {
      // Deselect all filtered
      const filteredIds = filteredIncomingLeads.map((l) => l.id);
      setSelectedLeadIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      // Select all filtered
      const filteredIds = filteredIncomingLeads.map((l) => l.id);
      setSelectedLeadIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const handleSelectIncoming = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkAssign = (assignee: string | null) => {
    setLeads((prev) =>
      prev.map((l) =>
        selectedLeadIds.includes(l.id)
          ? { ...l, assignedTo: assignee, stage: "to_contact" } // Automatically move to 'To Contact' when assigned
          : l
      )
    );
    setSelectedLeadIds([]);
    setBulkAssignOpen(false);
  };

  const handleBulkDelete = () => {
    setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l.id)));
    setSelectedLeadIds([]);
  };

  // Drag and Drop implementation
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOverColumn = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumnId(columnId);
  };

  const handleDragLeaveColumn = () => {
    setDragOverColumnId(null);
  };

  const handleDropOnColumn = (e: React.DragEvent, columnId: Lead["stage"]) => {
    e.preventDefault();
    setDragOverColumnId(null);
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      handleMoveLead(leadId, columnId);
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex w-full flex-col gap-6 rounded-[20px] bg-[#F4F7FB] p-6">
        
        {/* Top Header Bar */}
        <section className="flex w-full items-center justify-between rounded-[12px] bg-white px-6 py-4 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("dashboard")}
            className="flex items-center text-[#29343D] hover:opacity-80 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-[16px] font-bold tracking-tight text-[#29343D]">
              Analytics
            </span>
          </button>

          <div className="flex items-center gap-3">
            {/* Trash button to delete all lost leads as sample action */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete all Lost leads?")) {
                  setLeads((prev) => prev.filter((l) => l.stage !== "lost"));
                }
              }}
              title="Delete Lost Leads"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-150 border border-red-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
              </svg>
            </button>

            {/* Re-sync button */}
            <button
              type="button"
              onClick={handleResync}
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-slate-100 hover:bg-slate-200 px-4 text-[14px] font-medium text-[#29343D] border border-slate-200 shadow-sm transition-all duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 11a8 8 0 1 0 2 5" /><path d="M20 5v6-6h-6" />
              </svg>
              Re-sync Leads
            </button>

            {/* Export button */}
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-medium text-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] transition-all duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export Report
            </button>
          </div>
        </section>

        {/* Content Card Wrapper */}
        <section className="relative w-full rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          
          {/* Section Subtabs Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
            
            <div className="flex items-center gap-6">
              <h2 className="text-[18px] font-bold tracking-tight text-[#29343D]">
                Leads Pipeline
              </h2>
              
              <div className="flex items-center gap-4 h-10">
                {(["Leads da Gestire", "Actual Pipeline", "Settings"] as const).map((tab) => {
                  const isActive = activeSubTab === tab;
                  const count =
                    tab === "Leads da Gestire"
                      ? incomingLeads.length
                      : tab === "Actual Pipeline"
                      ? leads.filter((l) => l.stage !== "incoming").length
                      : null;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setActiveSubTab(tab);
                        setSelectedLeadIds([]);
                        setActiveActionsRowId(null);
                      }}
                      className={`h-full px-1 text-[13px] font-semibold transition-all relative border-b-2 flex items-center gap-1.5 ${
                        isActive
                          ? "border-[#635BFF] text-[#635BFF]"
                          : "border-transparent text-[#7e8b9b] hover:text-[#29343D]"
                      }`}
                    >
                      {tab}
                      {count !== null && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive ? "bg-[#635BFF] text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick stats details summary in header */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span>Total value: <strong className="text-slate-800">€ {leads.reduce((a, b) => a + b.value, 0).toLocaleString()}</strong></span>
              <span>•</span>
              <span>Active leads: <strong className="text-slate-800">{leads.filter(l => l.stage !== "lost" && l.stage !== "won").length}</strong></span>
            </div>
          </div>

          {/* Subtab Content: Leads da Gestire */}
          {activeSubTab === "Leads da Gestire" && (
            <div className="flex flex-col gap-4">
              
              {/* Toolbar */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                
                {/* Search query & filter dropdown */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search name, company, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 w-64 rounded-[8px] border border-slate-200 pl-9 pr-3 text-xs focus:border-[#635BFF] focus:outline-none"
                    />
                  </div>

                  {/* Filter received days */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDaysFilterOpen((o) => !o)}
                      className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Received: <span className="font-semibold text-slate-900">{daysFilter}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {daysFilterOpen && (
                      <div className="absolute left-0 top-10 z-20 w-[160px] rounded-[8px] bg-white p-1.5 shadow-lg border border-slate-100">
                        {(["All", "Under 3 days", "3+ days"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setDaysFilter(opt);
                              setDaysFilterOpen(false);
                            }}
                            className={`flex h-8 w-full items-center rounded-[6px] px-2.5 text-xs font-medium ${
                              daysFilter === opt ? "bg-[#EFF4FA] text-[#635BFF]" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bulk Actions Button Area */}
                {selectedLeadIds.length > 0 && (
                  <div className="flex items-center gap-2 bg-indigo-50 p-1.5 rounded-[8px] border border-indigo-100 self-start md:self-auto animate-in slide-in-from-bottom-2">
                    <span className="text-xs font-bold text-[#635BFF] px-2">
                      {selectedLeadIds.length} Selected
                    </span>

                    {/* Bulk Assign Trigger */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setBulkAssignOpen((o) => !o)}
                        className="inline-flex h-7 items-center gap-1 rounded-[6px] bg-white border border-indigo-200 px-3 text-[11px] font-semibold text-[#635BFF] hover:bg-indigo-100/30"
                      >
                        Assign To
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      {bulkAssignOpen && (
                        <div className="absolute right-0 top-8 z-20 w-[170px] rounded-[8px] bg-white p-1.5 shadow-lg border border-slate-100 text-left">
                          <span className="block px-2 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select Owner</span>
                          {ASSIGNEES.map((user) => (
                            <button
                              key={user}
                              type="button"
                              onClick={() => handleBulkAssign(user)}
                              className="flex h-8 w-full items-center rounded-[6px] px-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                            >
                              {user}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bulk Delete */}
                    <button
                      type="button"
                      onClick={handleBulkDelete}
                      className="inline-flex h-7 items-center gap-1 rounded-[6px] bg-red-50 border border-red-200 px-3 text-[11px] font-semibold text-red-600 hover:bg-red-100"
                    >
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>

              {/* Incoming Leads Table */}
              <div className="overflow-x-auto rounded-[12px] border border-slate-200">
                <table className="w-full border-collapse text-left text-xs min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                      <th className="px-5 py-3.5 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={allFilteredIncomingSelected}
                          onChange={handleSelectAllIncoming}
                          className="rounded text-[#635BFF] focus:ring-[#635BFF] w-4 h-4 cursor-pointer"
                        />
                      </th>
                      <th className="px-5 py-3.5">Contact</th>
                      <th className="px-5 py-3.5">Company</th>
                      <th className="px-5 py-3.5">Source</th>
                      <th className="px-5 py-3.5 text-right">Value</th>
                      <th className="px-5 py-3.5 text-center">Age / Priority</th>
                      <th className="px-5 py-3.5">Task Info</th>
                      <th className="px-5 py-3.5 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncomingLeads.map((lead, idx) => {
                      const priorityStyle = getPriorityClasses(lead.priority);
                      const isSelected = selectedLeadIds.includes(lead.id);

                      return (
                        <tr
                          key={lead.id}
                          className={`border-b border-slate-100 hover:bg-slate-50/60 transition-colors ${
                            isSelected ? "bg-indigo-50/20" : idx % 2 === 1 ? "bg-slate-50/30" : "bg-white"
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="px-5 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectIncoming(lead.id)}
                              className="rounded text-[#635BFF] focus:ring-[#635BFF] w-4 h-4 cursor-pointer"
                            />
                          </td>

                          {/* Contact Info */}
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-800 text-sm">{lead.name}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{lead.email} • {lead.phone}</div>
                          </td>

                          {/* Company */}
                          <td className="px-5 py-4 font-medium text-slate-700">{lead.company}</td>

                          {/* Source */}
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-medium">
                              {lead.source}
                            </span>
                          </td>

                          {/* Value */}
                          <td className="px-5 py-4 text-right font-bold text-slate-800 text-sm">
                            € {lead.value.toLocaleString()}
                          </td>

                          {/* Age / Priority Badge */}
                          <td className="px-5 py-4 text-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <span className="text-[10px] text-slate-400 font-semibold">
                                Received {lead.receivedDaysAgo} {lead.receivedDaysAgo === 1 ? "day" : "days"} ago
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${priorityStyle.bg} ${priorityStyle.text}`}>
                                {lead.priority} Priority
                              </span>
                            </div>
                          </td>

                          {/* Task Info */}
                          <td className="px-5 py-4 max-w-[200px] truncate">
                            {lead.task ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={lead.taskCompleted}
                                  onChange={() => handleToggleTask(lead.id)}
                                  className="rounded text-[#36C76C] focus:ring-[#36C76C] w-3.5 h-3.5 cursor-pointer"
                                />
                                <span className={`text-[11px] font-medium ${
                                  lead.taskCompleted ? "line-through text-slate-400" : "text-slate-600"
                                }`}>
                                  {lead.task}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-300 italic">No tasks assigned</span>
                            )}
                          </td>

                          {/* Actions dropdown */}
                          <td className="px-5 py-4 text-center relative">
                            <button
                              type="button"
                              onClick={() => setActiveActionsRowId(activeActionsRowId === lead.id ? null : lead.id)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors mx-auto"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
                              </svg>
                            </button>

                            {/* Floating Context Dropdown */}
                            {activeActionsRowId === lead.id && (
                              <div className="absolute right-6 top-12 z-25 w-[140px] rounded-[8px] bg-white p-1 shadow-lg border border-slate-150 text-left">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDetailLead(lead);
                                    setActiveActionsRowId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx="12" cy="12" r="3" />
                                  </svg>
                                  See More
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openAddTask(lead.id)}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 5v14M5 12h14" />
                                  </svg>
                                  {lead.task ? "Edit Task" : "Add Task"}
                                </button>
                                <hr className="my-1 border-slate-100" />
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {filteredIncomingLeads.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center text-slate-400 py-12 font-medium">
                          No matching incoming leads found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subtab Content: Actual Pipeline (Kanban Board) */}
          {activeSubTab === "Actual Pipeline" && (
            <div className="flex flex-col gap-5">
              
              {/* Kanban Controls: Column Visibilities */}
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setColumnVisibilityMenuOpen(!columnVisibilityMenuOpen)}
                    className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-slate-100 hover:bg-slate-200 px-3.5 text-xs font-semibold text-slate-700 border border-slate-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                    Configure Columns
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown to check columns visibility */}
                  {columnVisibilityMenuOpen && (
                    <div className="absolute left-0 top-10 z-20 w-[220px] rounded-[10px] bg-white p-2.5 shadow-xl border border-slate-150 text-left">
                      <span className="block px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visible Columns</span>
                      {PIPELINE_STAGES.map((stage) => (
                        <label
                          key={stage.id}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] hover:bg-slate-50 cursor-pointer select-none text-xs font-semibold text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={visibleColumns[stage.id]}
                            onChange={() =>
                              setVisibleColumns((prev) => ({
                                ...prev,
                                [stage.id]: !prev[stage.id],
                              }))
                            }
                            className="rounded text-[#635BFF] focus:ring-[#635BFF] w-4 h-4 cursor-pointer"
                          />
                          {stage.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-bold text-[#b0bac9] uppercase tracking-wider">
                  Tip: Drag and drop cards between stages
                </div>
              </div>

              {/* Kanban Grid */}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {PIPELINE_STAGES.map((stage) => {
                  if (!visibleColumns[stage.id]) return null;

                  const stageLeads = leads.filter((l) => l.stage === stage.id);
                  const totalStageValue = stageLeads.reduce((sum, current) => sum + current.value, 0);
                  const isDragOver = dragOverColumnId === stage.id;

                  return (
                    <div
                      key={stage.id}
                      onDragOver={(e) => handleDragOverColumn(e, stage.id)}
                      onDragLeave={handleDragLeaveColumn}
                      onDrop={(e) => handleDropOnColumn(e, stage.id)}
                      className={`flex-1 min-w-[260px] max-w-[320px] rounded-[12px] bg-slate-55 p-3 flex flex-col gap-3 transition-all duration-200 border-2 border-transparent ${
                        isDragOver
                          ? "bg-indigo-50/60 border-dashed border-[#635BFF] scale-[1.01]"
                          : "bg-[#F7FAFC]"
                      }`}
                    >
                      {/* Column Header */}
                      <div className={`flex flex-col gap-1.5 rounded-[8px] bg-white p-2.5 shadow-sm border-t-4 ${stage.color}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800 tracking-tight">
                            {stage.label}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                            {stageLeads.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                          <span>Volume Value:</span>
                          <span className="text-slate-700 font-bold">€ {totalStageValue.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Column Card Body container */}
                      <div className="flex-1 flex flex-col gap-2.5 min-h-[350px]">
                        {stageLeads.map((lead) => {
                          const priorityStyle = getPriorityClasses(lead.priority);
                          
                          return (
                            <div
                              key={lead.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, lead.id)}
                              className="bg-white rounded-[10px] p-3 shadow-sm border border-slate-200 hover:shadow-md cursor-grab active:cursor-grabbing hover:border-slate-300 transition-all flex flex-col gap-2 relative group"
                            >
                              {/* Card Tag Label & Manual Trigger Selector */}
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${priorityStyle.bg} ${priorityStyle.text}`}>
                                  {lead.priority} Priority
                                </span>
                                
                                {/* Quick Manual Move Stage Dropdown */}
                                <div className="relative">
                                  <select
                                    value={lead.stage}
                                    onChange={(e) => handleMoveLead(lead.id, e.target.value as Lead["stage"])}
                                    title="Move Stage"
                                    className="bg-slate-50 border border-slate-200 rounded text-[9px] px-1 py-0.5 font-bold text-slate-500 hover:bg-slate-100 focus:outline-none cursor-pointer"
                                  >
                                    <option value="incoming" disabled>Move to...</option>
                                    {PIPELINE_STAGES.map((s) => (
                                      <option key={s.id} value={s.id}>
                                        {s.label}
                                      </option>
                                    ))}
                                    <option value="incoming">Leads da Gestire</option>
                                  </select>
                                </div>
                              </div>

                              {/* Lead Details */}
                              <div>
                                <h4 className="font-bold text-slate-800 text-xs hover:text-[#635BFF] transition-colors cursor-pointer" onClick={() => setDetailLead(lead)}>
                                  {lead.name}
                                </h4>
                                <p className="text-[10px] font-medium text-slate-400 mt-0.5">{lead.company}</p>
                              </div>

                              {/* Value & Source */}
                              <div className="flex justify-between items-center bg-slate-50 p-1.5 rounded-[6px] text-[10px]">
                                <span className="font-bold text-[#635BFF]">
                                  € {lead.value.toLocaleString()}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-white text-slate-500 font-semibold border border-slate-100">
                                  {lead.source}
                                </span>
                              </div>

                              {/* Task checkbox inside card if present */}
                              {lead.task && (
                                <div className="border-t border-slate-100 pt-2 flex items-start gap-1.5">
                                  <input
                                    type="checkbox"
                                    checked={lead.taskCompleted}
                                    onChange={() => handleToggleTask(lead.id)}
                                    className="rounded text-[#36C76C] focus:ring-[#36C76C] w-3 h-3 mt-0.5 cursor-pointer"
                                  />
                                  <span className={`text-[10px] font-semibold leading-tight ${
                                    lead.taskCompleted ? "line-through text-slate-400" : "text-slate-600"
                                  }`}>
                                    {lead.task}
                                  </span>
                                </div>
                              )}

                              {/* Card Bottom Time label and Details Trigger */}
                              <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[9px] text-slate-400 font-bold">
                                <span>
                                  Received {lead.receivedDaysAgo} {lead.receivedDaysAgo === 1 ? "day" : "days"} ago
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openAddTask(lead.id)}
                                    title="Edit Task"
                                    className="text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="M12 5v14M5 12h14" />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLead(lead.id)}
                                    title="Delete Lead"
                                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {stageLeads.length === 0 && (
                          <div className="flex-1 border-2 border-dashed border-slate-200 rounded-[10px] flex items-center justify-center p-4 text-center">
                            <span className="text-[10px] font-semibold text-slate-350 italic">
                              No leads in this stage
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subtab Content: Settings Panel */}
          {activeSubTab === "Settings" && (
            <div className="flex flex-col gap-6 max-w-2xl text-xs">
              
              <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-5">
                <h3 className="font-bold text-slate-800 text-sm mb-1">Source channels integrations</h3>
                <p className="text-slate-400 mb-4">Toggle automated ingest rules from active marketing campaigns and webchat portals.</p>
                
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Google Ads Webhooks", status: "Active", desc: "Ingests daily leads with value details based on keywords" },
                    { name: "Instagram DMs Ingest", status: "Active", desc: "Syncs incoming stories responses and messages" },
                    { name: "Facebook Ads Connect", status: "Active", desc: "Binds leads directly from Lead Gen Instant Forms" },
                    { name: "Website Widget Live Chat", status: "Active", desc: "Automates leads generation from desktop live assist widget" },
                    { name: "Cold Outreach Import Webhooks", status: "Disabled", desc: "Triggers lead listings creation from external sales sheets" },
                  ].map((integ, index) => (
                    <div key={index} className="flex items-center justify-between bg-white border border-slate-100 p-3 rounded-[8px]">
                      <div>
                        <div className="font-bold text-slate-800">{integ.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{integ.desc}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          integ.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                        }`}>
                          {integ.status}
                        </span>
                        <button
                          type="button"
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                            integ.status === "Active" ? "bg-[#635BFF]" : "bg-slate-200"
                          }`}
                        >
                          <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${
                            integ.status === "Active" ? "translate-x-4" : "translate-x-0"
                          }`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-[12px] p-5">
                <h3 className="font-bold text-slate-800 text-sm mb-1">Round-Robin Auto Assignment</h3>
                <p className="text-slate-400 mb-4">Round robin automatic distribution variables for unassigned incoming leads to operators.</p>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Enable automated assignment rules</span>
                    <button
                      type="button"
                      className="w-9 h-5 rounded-full p-0.5 bg-[#635BFF] transition-colors focus:outline-none"
                    >
                      <span className="block w-4 h-4 rounded-full bg-white shadow translate-x-4 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="font-semibold text-slate-700">Eligible staff list</span>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {ASSIGNEES.map((user) => (
                        <label key={user} className="flex items-center gap-2 bg-white border border-slate-100 p-2 rounded-[6px] cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded text-[#635BFF] focus:ring-[#635BFF] w-4 h-4 cursor-pointer" />
                          <span className="font-medium text-slate-700">{user}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert("Settings saved")}
                  className="px-6 py-2 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] font-semibold transition-all shadow-sm"
                >
                  Save configuration
                </button>
              </div>

            </div>
          )}

        </section>

      </div>

      {/* MODAL 1: Lead Detail Sheet */}
      {detailLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="relative w-[500px] bg-white rounded-[12px] shadow-2xl flex flex-col p-6 gap-5 animate-in scale-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lead Information Card</span>
                <h3 className="font-bold text-[18px] text-slate-800 mt-0.5">{detailLead.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailLead(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company</span>
                  <span className="font-semibold text-slate-700 text-sm mt-0.5 block">{detailLead.company}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Value</span>
                  <span className="font-bold text-[#635BFF] text-sm mt-0.5 block">€ {detailLead.value.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</span>
                  <span className="font-semibold text-slate-700 mt-0.5 block">{detailLead.email}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phone Line</span>
                  <span className="font-semibold text-slate-700 mt-0.5 block">{detailLead.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Marketing Channel</span>
                  <span className="font-semibold text-slate-700 mt-0.5 block">{detailLead.source}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Received Timeframe</span>
                  <span className="font-semibold text-slate-700 mt-0.5 block">{detailLead.receivedDaysAgo} days ago</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Stage</span>
                  <span className="font-bold text-slate-700 mt-0.5 block uppercase">{detailLead.stage.replace("_", " ")}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Agent</span>
                  <span className="font-semibold text-slate-700 mt-0.5 block">{detailLead.assignedTo || "Unassigned"}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-[8px] border border-slate-100">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Task Task List</span>
                {detailLead.task ? (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`font-semibold text-slate-700 ${detailLead.taskCompleted ? "line-through text-slate-400" : ""}`}>
                      {detailLead.task}
                    </span>
                    {detailLead.taskCompleted && (
                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-bold">
                        Completed
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-350 italic mt-1 block">No active tasks logged on this lead entries.</span>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDetailLead(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-[8px] text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Close View
              </button>
              <button
                type="button"
                onClick={() => {
                  openAddTask(detailLead.id);
                  setDetailLead(null);
                }}
                className="px-5 py-2 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] text-xs font-semibold transition-all shadow-sm"
              >
                Manage Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add/Edit Task Modal */}
      {addTaskLeadId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="relative w-[420px] bg-white rounded-[12px] shadow-2xl flex flex-col p-5 gap-4 animate-in scale-in-95 duration-100">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Assign / Edit Lead Checklist Task</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Input an operational task checklist for this contact card.</p>
            </div>

            <textarea
              rows={3}
              value={taskTextInput}
              onChange={(e) => setTaskTextInput(e.target.value)}
              placeholder="e.g. Call back on Friday at 4 PM to present details..."
              className="w-full text-xs p-2.5 rounded-[8px] border border-slate-250 focus:border-[#635BFF] focus:outline-none resize-none font-medium"
            />

            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setAddTaskLeadId(null);
                  setTaskTextInput("");
                }}
                className="px-3 py-1.5 border border-slate-200 text-slate-500 rounded-[6px] font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTask}
                className="px-4 py-1.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[6px] font-semibold transition-all shadow-sm"
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Export Data Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="relative w-[500px] bg-white rounded-[12px] shadow-2xl flex flex-col p-6 gap-6 animate-in scale-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-[16px] text-slate-800">Export Leads Data Report</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">Generate export packages from the current leads lists</span>
              </div>
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#635BFF] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <span className="text-xs text-slate-600 max-w-xs font-semibold leading-relaxed">
                Click the button below to download the CSV statement of current leads conversion funnel.
              </span>
            </div>

            <div className="flex justify-end pt-3 gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-[8px] text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Exporting CSV file...");
                  setExportModalOpen(false);
                }}
                className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] text-xs font-semibold shadow-md transition-all"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
