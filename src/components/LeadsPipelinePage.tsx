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
  stage: "to_contact" | "online_partner" | "call_to_fix" | "fixed_call" | "follow_up" | "waiting_decision" | "won" | "lost" | "incoming" | "not_workable" | "prospect";
  assignedTo: string | null;
  task: string | null;
  taskCompleted: boolean;
}

const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Alessandro Bianchi",
    email: "alessandro.bianchi@moderncuts.it",
    company: "Modern Cuts Barbershop",
    phone: "+39 347 111 2222",
    source: "Organico",
    value: 3500,
    receivedDaysAgo: 3,
    priority: "High",
    stage: "to_contact",
    assignedTo: "Roberto Marini",
    task: null,
    taskCompleted: false,
  },
  {
    id: "lead-2",
    name: "Elena Conti",
    email: "elena.conti@luxurywell.it",
    company: "Elena Conti Luxury Spa & Wellnes",
    phone: "+39 333 444 5555",
    source: "Website Chat",
    value: 15500,
    receivedDaysAgo: 3,
    priority: "Low",
    stage: "to_contact",
    assignedTo: "Maria Rodriguez",
    task: null,
    taskCompleted: false,
  },
  {
    id: "lead-3",
    name: "Francesco Martini",
    email: "francesco.martini@quicky.it",
    company: "Quicky Custs Express",
    phone: "+39 328 666 7777",
    source: "Phone",
    value: 2500,
    receivedDaysAgo: 3,
    priority: "Medium",
    stage: "to_contact",
    assignedTo: "Alessandro Costa",
    task: null,
    taskCompleted: false,
  },
  {
    id: "lead-4",
    name: "Marco Rossi",
    email: "marco.rossi@bellaforma.it",
    company: "Bella Forma Hair Salon",
    phone: "+39 335 888 9999",
    source: "Organico",
    value: 5000,
    receivedDaysAgo: 3,
    priority: "High",
    stage: "waiting_decision",
    assignedTo: "Dr. Marco Rossi",
    task: null,
    taskCompleted: false,
  },
  {
    id: "lead-5",
    name: "Giulia Ferrari",
    email: "giulia.ferrari@stylecare.it",
    company: "Style & Care Beauty Center",
    phone: "+39 339 999 0000",
    source: "Referral",
    value: 8000,
    receivedDaysAgo: 3,
    priority: "High",
    stage: "won",
    assignedTo: "Alessandro Costa",
    task: null,
    taskCompleted: false,
  },
  {
    id: "lead-6",
    name: "Matteo Ricci",
    email: "matteo.ricci@ricci-salon.it",
    company: "Ricci & Co. Salon",
    phone: "+39 335 666 7777",
    source: "Google Ads",
    value: 1400,
    receivedDaysAgo: 3,
    priority: "High",
    stage: "incoming",
    assignedTo: "Maria Rodriguez",
    task: "Schedule callback",
    taskCompleted: true,
  },
  {
    id: "lead-7",
    name: "Sofia Marino",
    email: "sofia.marino@stylelab.it",
    company: "Style Lab Naples",
    phone: "+39 339 888 9999",
    source: "Website Chat",
    value: 1100,
    receivedDaysAgo: 2,
    priority: "Medium",
    stage: "incoming",
    assignedTo: "Alessandro Costa",
    task: "Prepare demo sandbox",
    taskCompleted: false,
  }
];

interface PipelineStage {
  id: "to_contact" | "online_partner" | "call_to_fix" | "fixed_call" | "follow_up" | "waiting_decision" | "won" | "lost" | "not_workable" | "prospect";
  label: string;
  bgClass: string;
  badgeBg: string;
}

const ONGOING_STAGES: PipelineStage[] = [
  { id: "to_contact", label: "To Contact", bgClass: "bg-[#EFF2F8]", badgeBg: "bg-[#DDDBFF] text-[#635BFF]" },
  { id: "online_partner", label: "Online\npartner", bgClass: "bg-[#FFF9E5]", badgeBg: "bg-[#FFF9E5] text-[#FFD648] border border-[#FDE68A]" },
  { id: "call_to_fix", label: "Call To_fix", bgClass: "bg-[#EFF2F8]", badgeBg: "bg-[#DDDBFF] text-[#635BFF]" },
  { id: "fixed_call", label: "Fixed Call", bgClass: "bg-[#F4F3FF]", badgeBg: "bg-[#DDDBFF] text-[#635BFF]" },
  { id: "follow_up", label: "Follow Up", bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#ECFDFD] text-[#16CDC7]" },
  { id: "waiting_decision", label: "Waiting for\nDecision", bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#ECFDFD] text-[#16CDC7]" },
  { id: "won", label: "Won", bgClass: "bg-[#EBFAF0]", badgeBg: "bg-[#EBFAF0] text-[#36C76C]" },
  { id: "lost", label: "Lost", bgClass: "bg-[#FFE5ED]", badgeBg: "bg-[#FFE5ED] text-[#FF6692]" },
];

const COMPLETED_STAGES: PipelineStage[] = [
  { id: "not_workable", label: "Not workable", bgClass: "bg-[#FFF9E5]", badgeBg: "bg-[#FFF9E5] text-[#FFD648] border border-[#FDE68A]" },
  { id: "lost", label: "Lost", bgClass: "bg-[#FFE5ED]", badgeBg: "bg-[#FFE5ED] text-[#FF6692]" },
  { id: "prospect", label: "Prospect", bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#ECFDFD] text-[#16CDC7]" },
  { id: "won", label: "Won", bgClass: "bg-[#EBFAF0]", badgeBg: "bg-[#EBFAF0] text-[#36C76C]" },
];

// Determine which stages to display based on pipeline status
const PIPELINE_STAGES = (pipelineStatus: "Ongoing" | "Completed") => pipelineStatus === "Ongoing" ? ONGOING_STAGES : COMPLETED_STAGES;


// Helper to get priority badge classes
const getPriorityClasses = (priority: "High" | "Medium" | "Low") => {
  switch (priority) {
    case "High":
      return { bg: "bg-[#FF6692]", text: "text-white" };
    case "Medium":
      return { bg: "bg-[#FFD648]", text: "text-[#29343D]" };
    case "Low":
      return { bg: "bg-[#DDDBFF]", text: "text-[#635BFF]" };
    default:
      return { bg: "bg-gray-200", text: "text-gray-700" };
  }
};

// Helper to get source icon
const SourceIcon = ({ source }: { source: string }) => {
  if (source.includes("Instagram")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-pink-500">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (source.includes("Google")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-500">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

const TrashIconMini = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const RefreshIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" />
  </svg>
);

const DownloadIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EyeIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TaskIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ASSIGNEES = ["Roberto Marini", "Maria Rodriguez", "Dr. Marco Rossi", "Alessandro Costa"];

export default function LeadsPipelinePage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeSubTab, setActiveSubTab] = useState<"Leads da Gestire" | "Actual Pipeline" | "Settings">("Leads da Gestire");
  const [pipelineStatus, setPipelineStatus] = useState<"Ongoing" | "Completed">("Ongoing");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState<"All" | "Under 3 days" | "3+ days">("All");

  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const [activeActionsRowId, setActiveActionsRowId] = useState<string | null>(null);
  const [activeAssigneeRowId, setActiveAssigneeRowId] = useState<string | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkAssignOpen, setBulkAssignOpen] = useState(false);
  const [columnVisibilityMenuOpen, setColumnVisibilityMenuOpen] = useState(false);
  const [addTaskLeadId, setAddTaskLeadId] = useState<string | null>(null);
  const [taskTextInput, setTaskTextInput] = useState("");
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    to_contact: true,
    online_partner: true,
    call_to_fix: true,
    fixed_call: true,
    follow_up: true,
    waiting_decision: true,
    won: true,
    lost: true,
    not_workable: true,
    prospect: true,
  });

  const getBadgeStyle = (days: number) => {
    if (days >= 3) {
      return { bg: "bg-[#FFE5ED]", text: "text-[#FF6692]" };
    } else if (days === 2) {
      return { bg: "bg-[#FFF9E5]", text: "text-[#FFD648]" };
    } else {
      return { bg: "bg-[#EBFAF0]", text: "text-[#36C76C]" };
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
        <section className="flex w-full items-center justify-between rounded-[12px] bg-white px-6 py-4 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] h-[76px] shrink-0">
          <div className="flex items-center text-[#29343D]">
            <span className="text-[16px] font-bold tracking-tight text-[#29343D] font-sans">
              Leads Management
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Trash button */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete all Lost leads?")) {
                  setLeads((prev) => prev.filter((l) => l.stage !== "lost"));
                }
              }}
              className="w-[95px] h-[44px] flex flex-row justify-center items-center py-[10px] px-4 gap-2.5 border border-[#FF6692] rounded-lg text-[#FF6692] hover:bg-red-50/30 transition-colors"
            >
              <TrashIconMini color="#FF6692" />
              <span className="text-[14px] font-medium leading-[24px] text-center font-sans">Trash</span>
            </button>

            {/* Refresh Data button */}
            <button
              type="button"
              onClick={handleResync}
              className="w-[144px] h-[44px] flex flex-row justify-center items-center py-[10px] px-4 gap-2.5 bg-[#EFF4FA] rounded-lg text-[#0A2540] hover:bg-slate-200 transition-colors"
            >
              <RefreshIcon color="#0A2540" />
              <span className="text-[14px] font-medium leading-[24px] text-center font-sans">Refresh Data</span>
            </button>

            {/* Export button */}
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="w-[149px] h-[44px] flex flex-row justify-center items-center py-[10px] px-4 gap-2.5 bg-[#635BFF] rounded-lg text-white hover:bg-[#4d42eb] transition-colors"
            >
              <DownloadIcon color="#FFFFFF" />
              <span className="text-[14px] font-medium leading-[24px] text-center font-sans">Export Report</span>
            </button>
          </div>
        </section>

        {/* Content Card Wrapper */}
        <section className="relative w-full rounded-[12px] bg-white p-0 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">

          {/* Section Subtabs Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E0E6EB] px-[30px] h-[53px]">
            <div className="flex items-center gap-6 h-full">
              {(["Leads da Gestire", "Actual Pipeline", "Settings"] as const).map((tab) => {
                const isActive = activeSubTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveSubTab(tab);
                      setSelectedLeadIds([]);
                      setActiveActionsRowId(null);
                      setActiveAssigneeRowId(null);
                    }}
                    className={`h-full px-4 text-[18px] font-semibold transition-all relative border-b-2 flex items-center gap-2.5 font-sans ${isActive
                        ? "border-[#635BFF] text-[#635BFF]"
                        : "border-transparent text-[#29343D] hover:opacity-85"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtab Content Area */}
          <div className="p-[30px] flex flex-col gap-6 w-full">

            {activeSubTab === "Leads da Gestire" && (
              <div className="flex flex-col gap-6 w-full">

                {/* Description & 3 new Badge */}
                <div className="flex flex-row justify-between items-center w-full h-[46px]">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-[16px] font-bold text-[#29343D] leading-[22px] font-sans">Leads da Gestire</h3>
                    <p className="text-[15px] font-normal text-[#98A4AE] leading-[20px] font-sans">
                      New leads that need to be entered into the pipeline
                    </p>
                  </div>
                  {incomingLeads.length > 0 && (
                    <div className="w-[54px] h-[32px] bg-[#EBFAF0] rounded-full flex items-center justify-center">
                      <span className="text-[#36C76C] text-[14px] font-semibold leading-[24px] font-sans">
                        {incomingLeads.length} new
                      </span>
                    </div>
                  )}
                </div>

                {/* Filters and Selection tools */}
                <div className="flex flex-row justify-between items-end w-full h-[60px]">

                  {/* Left Filters */}
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-[12px] font-semibold text-[#98A4AE] leading-[16px] font-sans">
                      Days since lead received
                    </span>
                    <div className="flex flex-row items-center gap-2 h-[36px]">
                      <button
                        type="button"
                        onClick={() => setDaysFilter("All")}
                        className={`h-[36px] rounded-lg flex items-center justify-center text-[12px] font-semibold font-sans px-4 transition-colors ${daysFilter === "All"
                            ? "border border-[#635BFF] text-[#635BFF]"
                            : "border border-[#EFF4FA] text-[#0A2540] hover:bg-slate-50"
                          }`}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => setDaysFilter("Under 3 days")}
                        className={`h-[36px] rounded-lg flex items-center justify-center text-[12px] font-semibold font-sans px-4 transition-colors ${daysFilter === "Under 3 days"
                            ? "border border-[#635BFF] text-[#635BFF]"
                            : "border border-[#EFF4FA] text-[#0A2540] hover:bg-slate-50"
                          }`}
                      >
                        Less than 3 days
                      </button>
                      <button
                        type="button"
                        onClick={() => setDaysFilter("3+ days")}
                        className={`h-[36px] rounded-lg flex items-center justify-center text-[12px] font-semibold font-sans px-4 transition-colors ${daysFilter === "3+ days"
                            ? "border border-[#635BFF] text-[#635BFF]"
                            : "border border-[#EFF4FA] text-[#0A2540] hover:bg-slate-50"
                          }`}
                      >
                        More than 3 days
                      </button>
                    </div>
                  </div>

                  {/* Right Checkbox / Bulk Selection */}
                  <div className="flex flex-row items-center gap-2 h-9 relative">
                    {/* Master Checkbox */}
                    <div
                      onClick={() => {
                        if (selectedLeadIds.length > 0) {
                          setSelectedLeadIds([]);
                        } else {
                          setSelectedLeadIds(filteredIncomingLeads.map((l) => l.id));
                        }
                        setActiveAssigneeRowId(null);
                        setActiveActionsRowId(null);
                      }}
                      className="flex items-center gap-2 cursor-pointer select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLeadIds.length > 0
                            ? "bg-[#635BFF] border-[#635BFF]"
                            : "border-[#98A4AE]"
                          }`}
                      >
                        {selectedLeadIds.length > 0 && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-semibold font-sans leading-[20px] ${selectedLeadIds.length > 0 ? "text-[#635BFF]" : "text-[#98A4AE]"
                        }`}>
                        {selectedLeadIds.length > 0 ? "Unselect Leads" : "Select Leads"}
                      </span>
                    </div>

                    {/* Bulk Group Actions */}
                    {selectedLeadIds.length > 0 && (
                      <div className="flex items-center gap-2 ml-4 animate-in slide-in-from-right-2 duration-150">
                        {/* Group Assign */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setBulkAssignOpen(!bulkAssignOpen)}
                            className="h-[36px] w-[110px] bg-[#DDDBFF] text-[#635BFF] text-[12px] font-semibold px-4 rounded-lg border border-[#EFF4FA] hover:bg-[#c7c4ff] transition-colors"
                          >
                            Group Assign
                          </button>
                          {bulkAssignOpen && (
                            <div className="absolute right-0 bottom-11 z-30 w-[170px] rounded-[12px] bg-white p-2 shadow-2xl border border-slate-100 flex flex-col gap-1">
                              <span className="block px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select Owner</span>
                              {ASSIGNEES.map((user) => (
                                <button
                                  key={user}
                                  type="button"
                                  onClick={() => handleBulkAssign(user)}
                                  className="flex h-8 w-full items-center rounded-lg px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left transition-colors"
                                >
                                  {user}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Group Delete */}
                        <button
                          type="button"
                          onClick={handleBulkDelete}
                          className="h-[36px] w-[87px] bg-[#FFE5ED] text-[#FF6692] text-[12px] font-semibold px-4 rounded-lg border border-[#EFF4FA] hover:bg-red-100 transition-colors"
                        >
                          Group Delete
                        </button>
                      </div>
                    )}
                  </div>

                </div>

                {/* Cards Grid */}
                <div className="flex flex-row flex-wrap items-start gap-6 w-full pt-2">
                  {filteredIncomingLeads.map((lead) => {
                    const badgeStyle = getBadgeStyle(lead.receivedDaysAgo);
                    const isSelected = selectedLeadIds.includes(lead.id);
                    const formattedValue = new Intl.NumberFormat('it-IT').format(lead.value) + ' €';

                    return (
                      <div
                        key={lead.id}
                        className={`box-sizing-border-box flex flex-col justify-center items-start p-[14px] gap-4 w-[363.67px] h-[154px] bg-white border rounded-[12px] relative transition-all ${isSelected
                            ? "border-[#635BFF] shadow-md bg-slate-50/20"
                            : "border-[#E0E6EB] hover:border-slate-350"
                          }`}
                      >
                        {/* Row 1: Header */}
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex items-center gap-2">
                            {/* Card Checkbox (only visible in selection mode) */}
                            {selectedLeadIds.length > 0 && (
                              <div
                                onClick={() => handleSelectIncoming(lead.id)}
                                className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${isSelected
                                    ? "bg-[#635BFF] border-[#635BFF]"
                                    : "border-[#98A4AE]"
                                  }`}
                              >
                                {isSelected && (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <h4 className="text-[16px] font-bold text-[#29343D] leading-tight font-sans">
                              {lead.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Time received Badge */}
                            <div className={`flex flex-row justify-center items-center py-0.5 px-2 rounded-[6px] ${badgeStyle.bg}`}>
                              <span className={`text-[13px] font-semibold leading-[18px] font-sans ${badgeStyle.text}`}>
                                {lead.receivedDaysAgo}d ago
                              </span>
                            </div>

                            {/* Three dots button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveActionsRowId(activeActionsRowId === lead.id ? null : lead.id);
                                  setActiveAssigneeRowId(null);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                </svg>
                              </button>

                              {/* Card Triple dot menu dropdown */}
                              {activeActionsRowId === lead.id && (
                                <div className="absolute right-0 top-10 z-30 w-[119px] bg-white shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] rounded-[12px] py-2 border border-slate-100 flex flex-col items-start gap-1 animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    key="see_more"
                                    type="button"
                                    onClick={() => {
                                      setDetailLead(lead);
                                      setActiveActionsRowId(null);
                                    }}
                                    className="w-full h-[28px] flex items-center gap-2 px-3.5 hover:bg-slate-50 text-left transition-colors text-[14px] font-normal text-[#29343D] font-sans"
                                  >
                                    <EyeIcon color="#635BFF" />
                                    <span>See more</span>
                                  </button>
                                  <button
                                    key="add_task"
                                    type="button"
                                    onClick={() => {
                                      openAddTask(lead.id);
                                      setActiveActionsRowId(null);
                                    }}
                                    className="w-full h-[28px] flex items-center gap-2.5 px-3.5 hover:bg-slate-50 text-left transition-colors text-[14px] font-normal text-[#29343D] font-sans"
                                  >
                                    <TaskIcon color="#46CAEB" />
                                    <span>Add task</span>
                                  </button>
                                  <button
                                    key="delete"
                                    type="button"
                                    onClick={() => {
                                      handleDeleteLead(lead.id);
                                      setActiveActionsRowId(null);
                                    }}
                                    className="w-full h-[28px] flex items-center gap-2.5 px-3.5 hover:bg-slate-50 text-left transition-colors text-[14px] font-normal text-[#29343D] font-sans"
                                  >
                                    <TrashIconMini color="#FF6692" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Company Info */}
                        <div className="flex flex-col items-start gap-0.5 w-full">
                          <span className="text-[13px] font-semibold text-[#29343D] font-sans">
                            {lead.company}
                          </span>
                          <span className="text-[12px] font-medium text-[#999999] font-sans">
                            {lead.source} &bull; {formattedValue}
                          </span>
                        </div>

                        {/* Row 3: Card Actions */}
                        <div className="flex flex-row justify-end items-center w-full mt-auto relative">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveAssigneeRowId(activeAssigneeRowId === lead.id ? null : lead.id);
                              setActiveActionsRowId(null);
                            }}
                            className="w-[85px] h-[36px] bg-[#DDDBFF] text-[#635BFF] text-[12px] font-bold rounded-[8px] flex items-center justify-center hover:bg-[#c7c4ff] transition-colors font-sans"
                          >
                            Assign to
                          </button>

                          {/* Individual Assignee Dropdown menu */}
                          {activeAssigneeRowId === lead.id && (
                            <div className="absolute right-0 bottom-11 z-30 w-[160px] bg-white shadow-2xl rounded-[12px] py-1.5 border border-slate-100 flex flex-col items-start gap-0.5 animate-in fade-in zoom-in-95 duration-100">
                              <span className="block px-3 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select Owner</span>
                              {ASSIGNEES.map((user) => (
                                <button
                                  key={user}
                                  type="button"
                                  onClick={() => {
                                    handleMoveLead(lead.id, "to_contact");
                                    setLeads((prev) =>
                                      prev.map((l) =>
                                        l.id === lead.id ? { ...l, assignedTo: user } : l
                                      )
                                    );
                                    setActiveAssigneeRowId(null);
                                  }}
                                  className="w-full h-8 flex items-center px-3 hover:bg-slate-50 text-xs font-semibold text-[#29343D] text-left transition-colors font-sans"
                                >
                                  {user}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}

                  {filteredIncomingLeads.length === 0 && (
                    <div className="w-full py-20 text-center">
                      <p className="text-[14px] font-medium text-slate-400 font-sans">
                        No matching incoming leads found.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Subtab Content: Actual Pipeline (Kanban Board) */}
            {activeSubTab === "Actual Pipeline" && (
              <div className="flex flex-col gap-5">

                {/* Kanban Controls: Filters & Toggles */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-4">
                    {/* Status Toggle (Ongoing / Completed) */}
                    <div className="flex h-9 rounded-[8px] bg-[#EFF4FA] p-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setPipelineStatus("Ongoing")}
                        className={`px-4 text-[12px] font-bold rounded-[6px] transition-all ${pipelineStatus === "Ongoing"
                            ? "bg-white text-[#635BFF] shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        Ongoing
                      </button>
                      <button
                        type="button"
                        onClick={() => setPipelineStatus("Completed")}
                        className={`px-4 text-[12px] font-bold rounded-[6px] transition-all ${pipelineStatus === "Completed"
                            ? "bg-white text-[#635BFF] shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                          }`}
                      >
                        Completed
                      </button>
                    </div>

                    {/* Date Range Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 text-[12px] font-bold text-[#29343D] hover:bg-slate-50"
                      >
                        All Time
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    {/* Priority Filter */}
                    <button
                      type="button"
                      className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 text-[12px] font-bold text-[#29343D] hover:bg-slate-50"
                    >
                      Priority: <span className="text-[#635BFF]">All</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#29343D]">
                    Pipeline status: {pipelineStatus}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setColumnVisibilityMenuOpen(!columnVisibilityMenuOpen)}
                        className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-white hover:bg-slate-50 px-3.5 text-[12px] font-bold text-slate-700 border border-slate-200 shadow-sm"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                        Configure Columns
                      </button>
                      {columnVisibilityMenuOpen && (
                        <div className="absolute right-0 top-10 z-20 w-[220px] rounded-[10px] bg-white p-2.5 shadow-xl border border-slate-150 text-left">
                          <span className="block px-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visible Columns</span>
                          {PIPELINE_STAGES(pipelineStatus).map((stage) => (
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
                  </div>
                </div>

                {/* Kanban Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                  {PIPELINE_STAGES(pipelineStatus).filter((s) =>
                    pipelineStatus === "Ongoing"
                      ? s.id !== "won" && s.id !== "lost"
                      : s.id === "won" || s.id === "lost"
                  ).map((stage) => {
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
                        className={`rounded-[12px] p-3 flex flex-col gap-3 transition-all duration-200 border-2 border-transparent ${isDragOver
                            ? "bg-indigo-50/60 border-dashed border-[#635BFF]"
                            : "bg-[#F7FAFC]"
                          }`}
                      >
                        {/* Column Header */}
                        <div className={`flex flex-col gap-1.5 rounded-[8px] p-3 shadow-sm ${stage.bgClass}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[13px] tracking-tight">
                              {stage.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${stage.badgeBg}`}>
                              {stageLeads.length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-bold opacity-80">
                            <span>VALUE</span>
                            <span className="font-extrabold text-[12px]">€ {totalStageValue.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Column Card Body container */}
                        <div className="flex-1 flex flex-col gap-3 min-h-[200px]">
                          {stageLeads.map((lead) => {
                            const priorityStyle = getPriorityClasses(lead.priority);

                            return (
                              <div
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                className="bg-white rounded-[12px] p-4 shadow-sm border border-slate-200 hover:shadow-md cursor-grab active:cursor-grabbing hover:border-[#635BFF]/30 transition-all flex flex-col gap-3 relative group"
                              >
                                {/* Card Source & Priority */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <SourceIcon source={lead.source} />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{lead.source}</span>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${priorityStyle.bg} ${priorityStyle.text}`}>
                                    {lead.priority}
                                  </span>
                                </div>

                                {/* Lead Details */}
                                <div onClick={() => setDetailLead(lead)} className="cursor-pointer">
                                  <h4 className="font-bold text-[#29343D] text-[13px] group-hover:text-[#635BFF] transition-colors">
                                    {lead.name}
                                  </h4>
                                  <p className="text-[11px] font-bold text-slate-400 mt-0.5">{lead.company}</p>
                                </div>

                                {/* Value & Time in stage */}
                                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                  <span className="font-extrabold text-[#635BFF] text-[13px]">
                                    € {lead.value.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400">
                                    Time in stage: <span className="text-[#29343D]">{lead.receivedDaysAgo}d</span>
                                  </span>
                                </div>

                                {/* Action Overlay (Manual move) */}
                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <select
                                    value={lead.stage}
                                    onChange={(e) => handleMoveLead(lead.id, e.target.value as Lead["stage"])}
                                    className="bg-white border border-slate-200 rounded text-[9px] px-1 py-0.5 font-bold text-slate-500 focus:outline-none cursor-pointer"
                                  >
                                    {PIPELINE_STAGES(pipelineStatus).map((s) => (
                                      <option key={s.id} value={s.id}>{s.label}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            );
                          })}

                          {stageLeads.length === 0 && (
                            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-[12px] flex items-center justify-center p-4 text-center opacity-50">
                              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Empty</span>
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
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${integ.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                            }`}>
                            {integ.status}
                          </span>
                          <button
                            type="button"
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${integ.status === "Active" ? "bg-[#635BFF]" : "bg-slate-200"
                              }`}
                          >
                            <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${integ.status === "Active" ? "translate-x-4" : "translate-x-0"
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

          </div>
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
