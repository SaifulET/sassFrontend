"use client";

import React, { useState, useMemo } from "react";
import AddTaskModal from "./AddTask";
import AssignToModal from "./AddAssignTo";
import ViewLeadModal from "./SeeMore";
import DeleteLeadModal from "./DeleteTask";

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
  stage: string;
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
  id: string;
  label: string;
  bgClass: string;
  badgeBg: string;
  notifiedWhenLeadEnters: boolean;
  notifyLead: boolean;
  priorityDays: {
    low: string;
    medium: string;
    high: string;
  };
  priorityNotifications: {
    low: boolean;
    medium: boolean;
    high: boolean;
  };
  emailSettings: {
    delayAmount: string;
    delayUnit: "Minutes" | "Hours" | "Days";
    subject: string;
    title: string;
    content: string;
    ctaEnabled: boolean;
    ctaText: string;
    signature: string;
    disclaimer: string;
    showImage: boolean;
  };
}

const badgeColorPresets = [
  { bgClass: "bg-[#EFF2F8]", badgeBg: "bg-[#EFF4FA] text-[#29343D]" }, // Gray
  { bgClass: "bg-[#FFF9E5]", badgeBg: "bg-[#FFD648] text-[#FFF9E5] border border-[#FDE68A]" }, // Yellow
  { bgClass: "bg-[#EFF2F8]", badgeBg: "bg-[#F1F2FE] text-[#635BFF]" }, // Light blue
  { bgClass: "bg-[#F4F3FF]", badgeBg: "bg-[#635BFF] text-[#F1F2FE]" }, // Blue
  { bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#ECFDFD] text-[#16CDC7]" }, // Turquoise
  { bgClass: "bg-[#EBFAF0]", badgeBg: "bg-[#36C76C] text-white" }, // Green
  { bgClass: "bg-[#FFE5ED]", badgeBg: "bg-[#FF6692] text-white" }, // Red
];

const ONGOING_STAGES_RAW = [
  { id: "to_contact", label: "To Contact", bgClass: "bg-[#EFF2F8]", badgeBg: "bg-[#EFF4FA] text-[#29343D]" },
  { id: "online_partner", label: "Contact me again later", bgClass: "bg-[#FFF9E5]", badgeBg: "bg-[#FFD648] text-[#FFF9E5] border border-[#FDE68A]" },
  { id: "call_to_fix", label: "Call To_fix", bgClass: "bg-[#EFF2F8]", badgeBg: "bg-[#F1F2FE] text-[#635BFF]" },
  { id: "fixed_call", label: "Fixed Call", bgClass: "bg-[#F4F3FF]", badgeBg: "bg-[#635BFF] text-[#F1F2FE]" },
  { id: "follow_up", label: "Follow Up", bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#ECFDFD] text-[#16CDC7]" },
  { id: "waiting_decision", label: "Waiting for Decision", bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#16CDC7] text-white" },
  { id: "won", label: "Won", bgClass: "bg-[#EBFAF0]", badgeBg: "bg-[#36C76C] text-white" },
  { id: "lost", label: "Lost", bgClass: "bg-[#FFE5ED]", badgeBg: "bg-[#FF6692] text-white" },
];

const COMPLETED_STAGES_RAW = [
  { id: "not_workable", label: "Not workable", bgClass: "bg-[#FFF9E5]", badgeBg: "bg-[#FFD648] text-[#FFF9E5] border border-[#FDE68A]" },
  { id: "lost", label: "Lost", bgClass: "bg-[#FFE5ED]", badgeBg: "bg-[#FF6692] text-white" },
  { id: "prospect", label: "Prospect", bgClass: "bg-[#ECFDFD]", badgeBg: "bg-[#ECFDFD] text-[#16CDC7]" },
  { id: "won", label: "Won", bgClass: "bg-[#EBFAF0]", badgeBg: "bg-[#36C76C] text-white" },
];

const mapToPipelineStage = (s: typeof ONGOING_STAGES_RAW[number]): PipelineStage => ({
  ...s,
  notifiedWhenLeadEnters: true,
  notifyLead: true,
  priorityDays: { low: "", medium: "", high: "" },
  priorityNotifications: { low: true, medium: true, high: true },
  emailSettings: {
    delayAmount: "1",
    delayUnit: "Minutes",
    subject: `Benvenuto in Salone! (${s.label})`,
    title: "Siamo felici di averti con noi",
    content: "Abbiamo ricevuto la tua richiesta e ti ricontatteremo a breve per confermare il tuo appuntamento.",
    ctaEnabled: true,
    ctaText: "Prenota Ora",
    signature: "Best regards,\nThe MatDash Team",
    disclaimer: "Ricevi questa email in quanto ti sei registrato sul nostro sito.",
    showImage: true,
  },
});

// Custom Subcomponents for Settings Redesign
const CustomSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative flex items-center focus:outline-none cursor-pointer text-left"
    >
      <div
        className={`w-9 h-5 rounded-[4px] transition-colors duration-200 ${
          checked ? "bg-[#DDDBFF]" : "bg-[#EFF4FA] border border-[#E0E6EB]"
        }`}
      />
      <div
        className={`absolute w-4 h-4 rounded-[6px] bg-[#635BFF] transition-all duration-200 shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)]`}
        style={{
          left: checked ? "18px" : "2px",
          top: "2px",
        }}
      />
    </button>
  );
};

const StageCard = ({
  stage,
  index,
  type,
  onToggleNotification,
  onOpenDropdown,
  isDropdownOpen,
  onEditStage,
  onDeleteStage,
  onEditNotification,
}: {
  stage: PipelineStage;
  index: number;
  type: "Ongoing" | "Completed";
  onToggleNotification: (checked: boolean) => void;
  onOpenDropdown: () => void;
  isDropdownOpen: boolean;
  onEditStage: () => void;
  onDeleteStage: () => void;
  onEditNotification: () => void;
}) => {
  return (
    <div className="box-sizing-border-box flex flex-col sm:flex-row sm:items-center p-5 gap-4 bg-white border border-[#E0E6EB] shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] rounded-lg w-full min-h-[95px] sm:h-[95px] justify-between relative">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[18px] font-semibold text-[#29343D] font-sans">
            Stage {index}
          </span>
          <div className={`flex flex-row items-center py-[5px] px-2.5 gap-2.5 rounded-[999px] ${stage.badgeBg}`}>
            <span className="text-[12px] font-medium leading-[16px] font-sans">
              {stage.label}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
        <div className="flex flex-row items-center gap-2">
          <CustomSwitch
            checked={stage.notifiedWhenLeadEnters}
            onChange={onToggleNotification}
          />
          <span className="text-[12px] text-[#98A4AE] font-medium leading-[16px] w-[84px] font-sans">
            Notified when lead enters
          </span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDropdown();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-[#29343D] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-10 z-50 w-[180px] bg-white shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] rounded-[12px] py-2 border border-[#E0E6EB] flex flex-col items-start gap-1 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={onEditNotification}
                className="w-full h-[32px] flex items-center gap-2 px-3.5 hover:bg-slate-50 text-left transition-colors text-[13px] font-semibold text-[#29343D] font-sans cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#635BFF]">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>View/ Edit Notification</span>
              </button>
              
              <button
                type="button"
                onClick={onEditStage}
                className="w-full h-[32px] flex items-center gap-2.5 px-3.5 hover:bg-slate-50 text-left transition-colors text-[13px] font-semibold text-[#29343D] font-sans cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                <span>Edit Stage</span>
              </button>
              
              <button
                type="button"
                onClick={onDeleteStage}
                className="w-full h-[32px] flex items-center gap-2.5 px-3.5 hover:bg-slate-50 text-left transition-colors text-[13px] font-semibold text-[#FF6692] font-sans cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6692]">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                <span>Delete Stage</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddStageModal = ({
  stages,
  onClose,
  onSubmit,
}: {
  stages: PipelineStage[];
  onClose: () => void;
  onSubmit: (
    name: string,
    position: "Before" | "After",
    existingStageId: string,
    notifiedWhenLeadEnters: boolean,
    notifyLead: boolean,
    lowDays: string,
    medDays: string,
    highDays: string,
    lowNotif: boolean,
    medNotif: boolean,
    highNotif: boolean
  ) => void;
}) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState<"Before" | "After">("Before");
  const [existingStageId, setExistingStageId] = useState(stages[0]?.id || "");
  const [notifiedWhenLeadEnters, setNotifiedWhenLeadEnters] = useState(true);
  const [notifyLead, setNotifyLead] = useState(true);
  const [lowDays, setLowDays] = useState("");
  const [medDays, setMedDays] = useState("");
  const [highDays, setHighDays] = useState("");
  const [lowNotif, setLowNotif] = useState(true);
  const [medNotif, setMedNotif] = useState(true);
  const [highNotif, setHighNotif] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-[12px] shadow-2xl flex flex-col p-6 gap-6 animate-in scale-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-[18px] text-[#29343D] font-sans">
            Add Stage
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 font-sans text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#29343D]">
              Stage Name *
            </label>
            <input
              type="text"
              placeholder="Enter stage name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#29343D]">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full h-9 px-3 border border-[#E0E6EB] rounded-lg bg-white text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF]"
              >
                <option value="Before">Before</option>
                <option value="After">After</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#29343D]">
                Existing Stage
              </label>
              <select
                value={existingStageId}
                onChange={(e) => setExistingStageId(e.target.value)}
                className="w-full h-9 px-3 border border-[#E0E6EB] rounded-lg bg-white text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF]"
              >
                {stages.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="box-sizing-border-box flex flex-row items-center p-4 gap-4 bg-white border border-[#E0E6EB] rounded-lg justify-between mt-1">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-bold text-[#29343D]">Lead Enters</span>
                <CustomSwitch checked={notifiedWhenLeadEnters} onChange={setNotifiedWhenLeadEnters} />
              </div>
              <span className="text-[11px] text-[#98A4AE] font-medium">Notify when lead enters</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-bold text-[#29343D]">Notify Lead</span>
                <CustomSwitch checked={notifyLead} onChange={setNotifyLead} />
              </div>
              <span className="text-[11px] text-[#98A4AE] font-medium">Notify lead once inside this stage</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <span className="text-[13px] font-bold text-[#29343D]">Priority Settings</span>
            
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Low", days: lowDays, setDays: setLowDays, color: "text-emerald-500 bg-emerald-50" },
                { label: "Medium", days: medDays, setDays: setMedDays, color: "text-amber-500 bg-amber-50" },
                { label: "High", days: highDays, setDays: setHighDays, color: "text-rose-500 bg-rose-50" },
              ].map((p) => (
                <div key={p.label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500 font-medium">{p.label} priority after</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.color}`}>{p.label}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the number of days"
                    value={p.days}
                    onChange={(e) => p.setDays(e.target.value)}
                    className="w-full h-9 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <span className="text-[13px] font-bold text-[#29343D]">Notification per Priority Level</span>
            
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Low", notif: lowNotif, setNotif: setLowNotif, color: "text-emerald-500 bg-emerald-50" },
                { label: "Medium", notif: medNotif, setNotif: setMedNotif, color: "text-amber-500 bg-amber-50" },
                { label: "High", notif: highNotif, setNotif: setHighNotif, color: "text-rose-500 bg-rose-50" },
              ].map((p) => (
                <div key={p.label} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.color}`}>{p.label}</span>
                    <CustomSwitch checked={p.notif} onChange={p.setNotif} />
                  </div>
                  <span className="text-[10px] text-[#98A4AE] font-semibold leading-none">Notified when reaching priority</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-[8px] text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(
              name,
              position,
              existingStageId,
              notifiedWhenLeadEnters,
              notifyLead,
              lowDays,
              medDays,
              highDays,
              lowNotif,
              medNotif,
              highNotif
            )}
            className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] text-xs font-semibold shadow-md transition-all font-sans"
          >
            Create Stage
          </button>
        </div>
      </div>
    </div>
  );
};

const EditStageModal = ({
  stage,
  onClose,
  onSubmit,
}: {
  stage: PipelineStage;
  onClose: () => void;
  onSubmit: (
    notifiedWhenLeadEnters: boolean,
    notifyLead: boolean,
    lowDays: string,
    medDays: string,
    highDays: string,
    lowNotif: boolean,
    medNotif: boolean,
    highNotif: boolean
  ) => void;
}) => {
  const [notifiedWhenLeadEnters, setNotifiedWhenLeadEnters] = useState(stage.notifiedWhenLeadEnters);
  const [notifyLead, setNotifyLead] = useState(stage.notifyLead);
  const [lowDays, setLowDays] = useState(stage.priorityDays.low);
  const [medDays, setMedDays] = useState(stage.priorityDays.medium);
  const [highDays, setHighDays] = useState(stage.priorityDays.high);
  const [lowNotif, setLowNotif] = useState(stage.priorityNotifications.low);
  const [medNotif, setMedNotif] = useState(stage.priorityNotifications.medium);
  const [highNotif, setHighNotif] = useState(stage.priorityNotifications.high);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-[12px] shadow-2xl flex flex-col p-6 gap-6 animate-in scale-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-[18px] text-[#29343D] font-sans">
              Edit Stage
            </h3>
            <div className={`flex flex-row items-center py-[5px] px-2.5 gap-2.5 rounded-[999px] ${stage.badgeBg}`}>
              <span className="text-[12px] font-medium leading-[16px] font-sans">
                {stage.label}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 font-sans text-xs">
          <div className="box-sizing-border-box flex flex-row items-center p-4 gap-4 bg-white border border-[#E0E6EB] rounded-lg justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-bold text-[#29343D]">Lead Enters</span>
                <CustomSwitch checked={notifiedWhenLeadEnters} onChange={setNotifiedWhenLeadEnters} />
              </div>
              <span className="text-[11px] text-[#98A4AE] font-medium">Notify when lead enters</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-bold text-[#29343D]">Notify Lead</span>
                <CustomSwitch checked={notifyLead} onChange={setNotifyLead} />
              </div>
              <span className="text-[11px] text-[#98A4AE] font-medium">Notify lead once inside this stage</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <span className="text-[13px] font-bold text-[#29343D]">Priority Settings</span>

            <div className="flex flex-col gap-2.5">
              {[
                { label: "Low", days: lowDays, setDays: setLowDays, color: "text-emerald-500 bg-emerald-50" },
                { label: "Medium", days: medDays, setDays: setMedDays, color: "text-amber-500 bg-amber-50" },
                { label: "High", days: highDays, setDays: setHighDays, color: "text-rose-500 bg-rose-50" },
              ].map((p) => (
                <div key={p.label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-slate-500 font-medium">{p.label} priority after</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.color}`}>{p.label}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the number of days"
                    value={p.days}
                    onChange={(e) => p.setDays(e.target.value)}
                    className="w-full h-9 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <span className="text-[13px] font-bold text-[#29343D]">Notification per Priority Level</span>

            <div className="flex flex-col gap-2.5">
              {[
                { label: "Low", notif: lowNotif, setNotif: setLowNotif, color: "text-emerald-500 bg-emerald-50" },
                { label: "Medium", notif: medNotif, setNotif: setMedNotif, color: "text-amber-500 bg-amber-50" },
                { label: "High", notif: highNotif, setNotif: setHighNotif, color: "text-rose-500 bg-rose-50" },
              ].map((p) => (
                <div key={p.label} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.color}`}>{p.label}</span>
                    <CustomSwitch checked={p.notif} onChange={p.setNotif} />
                  </div>
                  <span className="text-[10px] text-[#98A4AE] font-semibold leading-none">Notified when reaching priority</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-[8px] text-xs font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(
              notifiedWhenLeadEnters,
              notifyLead,
              lowDays,
              medDays,
              highDays,
              lowNotif,
              medNotif,
              highNotif
            )}
            className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] text-xs font-semibold shadow-md transition-all font-sans"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationEditPanel = ({
  stage,
  onUpdateSettings,
  onBack,
}: {
  stage: PipelineStage;
  onUpdateSettings: (settings: Partial<PipelineStage["emailSettings"]>) => void;
  onBack: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"Lead" | "Admin">("Lead");
  const settings = stage.emailSettings;

  return (
    <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex border-b border-[#E0E6EB] h-[40px] items-center gap-6">
            {(["Lead", "Admin"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`h-full px-2 text-[16px] font-semibold transition-all relative border-b-2 flex items-center font-sans ${
                    isActive
                      ? "border-[#635BFF] text-[#635BFF]"
                      : "border-transparent text-[#98A4AE] hover:text-[#29343D]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {activeTab === "Lead" ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Send email
                </label>
                <div className="flex items-center gap-2 font-sans">
                  <select
                    value={settings.delayAmount}
                    onChange={(e) => onUpdateSettings({ delayAmount: e.target.value })}
                    className="w-16 h-9 rounded-lg border border-[#E0E6EB] bg-white px-2 text-[13px] text-[#29343D] focus:border-[#635BFF] focus:outline-none"
                  >
                    {["1", "2", "3", "5", "10", "15", "30", "45", "60"].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <select
                    value={settings.delayUnit}
                    onChange={(e) => onUpdateSettings({ delayUnit: e.target.value as any })}
                    className="w-28 h-9 rounded-lg border border-[#E0E6EB] bg-white px-3 text-[13px] text-[#29343D] focus:border-[#635BFF] focus:outline-none"
                  >
                    {["Minutes", "Hours", "Days"].map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <span className="text-[13px] text-[#98A4AE] font-medium ml-1">
                    after being added to stage
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  value={settings.subject}
                  onChange={(e) => onUpdateSettings({ subject: e.target.value })}
                  className="w-full h-10 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF] font-sans"
                />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={settings.title}
                  onChange={(e) => onUpdateSettings({ title: e.target.value })}
                  className="w-full h-10 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF] font-sans"
                />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Content
                </label>
                <textarea
                  placeholder="Enter text"
                  value={settings.content}
                  onChange={(e) => onUpdateSettings({ content: e.target.value })}
                  className="w-full h-32 p-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF] font-sans resize-none"
                />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                    Call To Action Button Content *
                  </label>
                  <CustomSwitch
                    checked={settings.ctaEnabled}
                    onChange={(checked) => onUpdateSettings({ ctaEnabled: checked })}
                  />
                </div>
                {settings.ctaEnabled && (
                  <input
                    type="text"
                    placeholder="Enter button label"
                    value={settings.ctaText}
                    onChange={(e) => onUpdateSettings({ ctaText: e.target.value })}
                    className="w-full h-10 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF] font-sans"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Signature *
                </label>
                <input
                  type="text"
                  placeholder="Enter signature"
                  value={settings.signature}
                  onChange={(e) => onUpdateSettings({ signature: e.target.value })}
                  className="w-full h-10 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF] font-sans"
                />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Disclaimer *
                </label>
                <input
                  type="text"
                  placeholder="Enter disclaimer"
                  value={settings.disclaimer}
                  onChange={(e) => onUpdateSettings({ disclaimer: e.target.value })}
                  className="w-full h-10 px-3 border border-[#E0E6EB] rounded-lg text-[13px] text-[#29343D] focus:outline-none focus:border-[#635BFF] font-sans"
                />
              </div>

              <div className="flex items-center justify-between text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Show Image *
                </label>
                <CustomSwitch
                  checked={settings.showImage}
                  onChange={(checked) => onUpdateSettings({ showImage: checked })}
                />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <label className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                  Attachfiles *
                </label>
                <div className="w-full border-2 border-dashed border-[#DDDBFF] hover:border-[#635BFF] rounded-lg p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-indigo-50/5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  <span className="text-[12px] font-medium text-[#635BFF] font-sans">
                    Drop here or click to browse
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-[#98A4AE] font-sans">
              Admin settings panel placeholder
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col bg-[#F4F7FB] rounded-[20px] p-6 items-center justify-start min-h-[500px]">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-sans self-start">
            Live Preview
          </span>

          <div className="w-full max-w-[420px] bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden flex flex-col font-sans text-left">
            <div className="bg-[#635BFF] px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center">
                <img src="/logo.svg" alt="MatDash" className="w-[135px] h-[80px] object-contain brightness-0 invert" />
              </div>
            </div>

            <div className="bg-[#EFF4FA] py-3 px-4 text-center border-b border-[#E0E6EB]">
              <span className="text-[13px] font-bold text-[#29343D] leading-tight block font-sans">
                {settings.subject || "Subject"}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4 text-left">
              <h2 className="text-[16px] font-bold text-[#29343D] font-sans">
                {settings.title || "Title"}
              </h2>
              <p className="text-[13px] text-[#29343D] leading-relaxed whitespace-pre-wrap font-sans">
                {settings.content || "Content text"}
              </p>

              {settings.showImage && (
                <div className="w-full h-auto rounded-lg overflow-hidden border border-slate-100 mt-2">
                  <img
                    src="/OBJECTS.png"
                    alt="Salon Interior Mockup"
                    className="w-full object-cover"
                  />
                </div>
              )}

              {settings.ctaEnabled && (
                <div className="flex justify-center mt-3">
                  <button
                    type="button"
                    className="h-9 px-6 bg-[#635BFF] text-white text-[12px] font-semibold rounded-lg shadow-sm font-sans cursor-pointer"
                  >
                    {settings.ctaText || "CTA Button"}
                  </button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1 text-[11px] text-slate-500 text-left">
                <span className="font-semibold text-slate-700 whitespace-pre-wrap font-sans">
                  {settings.signature}
                </span>
              </div>

              <div className="mt-2 text-[9px] text-slate-400 leading-normal border-t border-slate-50 pt-2 font-sans text-left">
                {settings.disclaimer}
              </div>
            </div>

            <div className="bg-[#EFF4FA] py-4 px-6 flex items-center justify-center gap-4 border-t border-[#E0E6EB]">
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex gap-3 justify-end w-full max-w-[420px] mt-6">
            <button
              type="button"
              onClick={onBack}
              className="h-10 px-6 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-xs font-semibold rounded-[8px] cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                alert("Changes saved successfully!");
                onBack();
              }}
              className="h-10 px-6 bg-[#635BFF] hover:bg-[#4d42eb] text-white text-xs font-semibold rounded-[8px] shadow-sm transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


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
  if (source.includes("Instagram") || source.toLowerCase().includes("organico")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (source.toLowerCase().includes("website") || source.toLowerCase().includes("site") || source.toLowerCase().includes("chat") || source.toLowerCase().includes("google")) {
    // Target / double circle icon matching screenshot
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="#000000" />
      </svg>
    );
  }
  if (source.toLowerCase().includes("referral")) {
    // Group icon matching screenshot
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#36C76C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  // Default: Phone icon matching screenshot
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

  // Settings states
  const [ongoingStages, setOngoingStages] = useState<PipelineStage[]>(() =>
    ONGOING_STAGES_RAW.map(mapToPipelineStage)
  );
  const [completedStages, setCompletedStages] = useState<PipelineStage[]>(() =>
    COMPLETED_STAGES_RAW.map(mapToPipelineStage)
  );
  const [dropdownOpenStageId, setDropdownOpenStageId] = useState<string | null>(null);
  const [addStageModalOpen, setAddStageModalOpen] = useState<"Ongoing" | "Completed" | null>(null);
  const [editingStage, setEditingStage] = useState<{ id: string; type: "Ongoing" | "Completed" } | null>(null);
  const [viewingNotificationStage, setViewingNotificationStage] = useState<{ id: string; type: "Ongoing" | "Completed" } | null>(null);
  const [deletingStage, setDeletingStage] = useState<{ id: string; type: "Ongoing" | "Completed" } | null>(null);

  const getPipelineStages = (status: "Ongoing" | "Completed") => {
    return status === "Ongoing" ? ongoingStages : completedStages;
  };

  const handleToggleStageNotification = (type: "Ongoing" | "Completed", stageId: string, checked: boolean) => {
    if (type === "Ongoing") {
      setOngoingStages((prev) =>
        prev.map((s) => (s.id === stageId ? { ...s, notifiedWhenLeadEnters: checked } : s))
      );
    } else {
      setCompletedStages((prev) =>
        prev.map((s) => (s.id === stageId ? { ...s, notifiedWhenLeadEnters: checked } : s))
      );
    }
  };

  const handleDeleteStage = (type: "Ongoing" | "Completed", stageId: string) => {
    setDeletingStage({ id: stageId, type });
  };

  const confirmDeleteStage = () => {
    if (!deletingStage) return;
    const { id, type } = deletingStage;
    if (type === "Ongoing") {
      setOngoingStages((prev) => prev.filter((s) => s.id !== id));
    } else {
      setCompletedStages((prev) => prev.filter((s) => s.id !== id));
    }
    setDeletingStage(null);
  };

  const handleAddStageSubmit = (
    name: string,
    position: "Before" | "After",
    existingStageId: string,
    notifiedWhenLeadEnters: boolean,
    notifyLead: boolean,
    lowDays: string,
    medDays: string,
    highDays: string,
    lowNotif: boolean,
    medNotif: boolean,
    highNotif: boolean
  ) => {
    if (!name.trim()) return;
    const newId = name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    const colorIndex = (addStageModalOpen === "Ongoing" ? ongoingStages.length : completedStages.length) % badgeColorPresets.length;
    const colors = badgeColorPresets[colorIndex];

    const newStage: PipelineStage = {
      id: newId,
      label: name,
      bgClass: colors.bgClass,
      badgeBg: colors.badgeBg,
      notifiedWhenLeadEnters,
      notifyLead,
      priorityDays: { low: lowDays, medium: medDays, high: highDays },
      priorityNotifications: { low: lowNotif, medium: medNotif, high: highNotif },
      emailSettings: {
        delayAmount: "1",
        delayUnit: "Minutes",
        subject: "Subject text for " + name,
        title: "Title text",
        content: "Text text text text text text text text text text text text text text text.",
        ctaEnabled: true,
        ctaText: "CTA Button Content",
        signature: "Best regards,\nThe MatDash Team",
        disclaimer: "Enter disclaimer",
        showImage: true,
      },
    };

    if (addStageModalOpen === "Ongoing") {
      setOngoingStages((prev) => {
        const idx = prev.findIndex((s) => s.id === existingStageId);
        if (idx === -1) return [...prev, newStage];
        const newStages = [...prev];
        if (position === "Before") {
          newStages.splice(idx, 0, newStage);
        } else {
          newStages.splice(idx + 1, 0, newStage);
        }
        return newStages;
      });
    } else {
      setCompletedStages((prev) => {
        const idx = prev.findIndex((s) => s.id === existingStageId);
        if (idx === -1) return [...prev, newStage];
        const newStages = [...prev];
        if (position === "Before") {
          newStages.splice(idx, 0, newStage);
        } else {
          newStages.splice(idx + 1, 0, newStage);
        }
        return newStages;
      });
    }
    setAddStageModalOpen(null);
  };

  const handleEditStageSubmit = (
    notifiedWhenLeadEnters: boolean,
    notifyLead: boolean,
    lowDays: string,
    medDays: string,
    highDays: string,
    lowNotif: boolean,
    medNotif: boolean,
    highNotif: boolean
  ) => {
    if (!editingStage) return;
    if (editingStage.type === "Ongoing") {
      setOngoingStages((prev) =>
        prev.map((s) =>
          s.id === editingStage.id
            ? {
                ...s,
                notifiedWhenLeadEnters,
                notifyLead,
                priorityDays: { low: lowDays, medium: medDays, high: highDays },
                priorityNotifications: { low: lowNotif, medium: medNotif, high: highNotif },
              }
            : s
        )
      );
    } else {
      setCompletedStages((prev) =>
        prev.map((s) =>
          s.id === editingStage.id
            ? {
                ...s,
                notifiedWhenLeadEnters,
                notifyLead,
                priorityDays: { low: lowDays, medium: medDays, high: highDays },
                priorityNotifications: { low: lowNotif, medium: medNotif, high: highNotif },
              }
            : s
        )
      );
    }
    setEditingStage(null);
  };

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [daysFilter, setDaysFilter] = useState<"All" | "Under 3 days" | "3+ days">("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | "Low" | "Medium" | "High">("All");
  const [columnDropdownOpenId, setColumnDropdownOpenId] = useState<string | null>(null);

  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const [activeActionsRowId, setActiveActionsRowId] = useState<string | null>(null);
  const [activeAssigneeRowId, setActiveAssigneeRowId] = useState<string | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkAssignOpen, setBulkAssignOpen] = useState(false);
  const [columnVisibilityMenuOpen, setColumnVisibilityMenuOpen] = useState(false);
  const [addTaskLeadId, setAddTaskLeadId] = useState<string | null>(null);
  const [taskTextInput, setTaskTextInput] = useState("");
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
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
  const handleSaveTask = (taskContent?: string) => {
    if (!addTaskLeadId) return;
    const finalTask = taskContent !== undefined ? taskContent : taskTextInput;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === addTaskLeadId
          ? { ...l, task: finalTask.trim() || null, taskCompleted: false }
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
      <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in slide-in-from-bottom-4 duration-300">

        {/* Header toolbar */}
        {viewingNotificationStage ? (
          <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-[#29343D]">
                <button
                  type="button"
                  onClick={() => setViewingNotificationStage(null)}
                  className="w-10 h-10 rounded-2xl bg-white border border-[#eef2f6] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <h1 className="text-sm font-extrabold text-[#1f2937]">Edit/View Notification</h1>
              </div>

              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#29343D" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-[#29343D] font-bold text-[16px] leading-[22px] font-sans opacity-85">/</span>
                <div className="bg-[#DDDBFF] text-[#635BFF] rounded-lg px-2.5 py-1 flex items-center justify-center font-bold text-[12px] leading-[20px] font-sans h-[28px]">
                  Leads
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center text-[#29343D]">
                <h1 className="text-sm font-extrabold text-[#1f2937]">Leads Management</h1>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
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
            </div>
          </div>
        )}

        {/* Content Card Wrapper */}
        {viewingNotificationStage ? (
          <NotificationEditPanel
            stage={
              viewingNotificationStage.type === "Ongoing"
                ? ongoingStages.find((s) => s.id === viewingNotificationStage.id)!
                : completedStages.find((s) => s.id === viewingNotificationStage.id)!
            }
            onUpdateSettings={(updatedSettings) => {
              if (viewingNotificationStage.type === "Ongoing") {
                setOngoingStages((prev) =>
                  prev.map((s) =>
                    s.id === viewingNotificationStage.id
                      ? { ...s, emailSettings: { ...s.emailSettings, ...updatedSettings } }
                      : s
                  )
                );
              } else {
                setCompletedStages((prev) =>
                  prev.map((s) =>
                    s.id === viewingNotificationStage.id
                      ? { ...s, emailSettings: { ...s.emailSettings, ...updatedSettings } }
                      : s
                  )
                );
              }
            }}
            onBack={() => setViewingNotificationStage(null)}
          />
        ) : (
          <section className="relative w-full rounded-[12px] bg-white p-0 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">

          {/* Section Subtabs Header */}
          <div className="flex items-center border-b border-[#E0E6EB] px-[30px] h-[53px]">
            <div className="flex items-center gap-6 h-full overflow-x-auto whitespace-nowrap scrollbar-none">
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
                    className={`h-full px-4 text-[18px] font-semibold transition-all relative border-b-2 flex items-center gap-2.5 font-sans whitespace-nowrap ${isActive
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
                <div className="flex flex-col lg:flex-row justify-between lg:items-end w-full lg:h-[60px] h-auto gap-4">

                  {/* Left Filters */}
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-[12px] font-semibold text-[#98A4AE] leading-[16px] font-sans">
                      Days since lead received
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
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
                  <div className="flex flex-wrap items-center gap-2 h-auto relative">
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
                        className={`box-sizing-border-box flex flex-col justify-center items-start p-[14px] gap-4 w-full sm:w-[363.67px] min-h-[154px] sm:h-[154px] bg-white border rounded-[12px] relative transition-all ${isSelected
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
                                      setDeleteLeadId(lead.id);
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
                              setActiveAssigneeRowId(lead.id);
                              setActiveActionsRowId(null);
                            }}
                            className="w-[85px] h-[36px] bg-[#DDDBFF] text-[#635BFF] text-[12px] font-bold rounded-[8px] flex items-center justify-center hover:bg-[#c7c4ff] transition-colors font-sans"
                          >
                            Assign to
                          </button>
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
              <div className="flex flex-col gap-6 w-full">

                {/* Kanban Controls: Filters & Toggles */}
                <div className="flex flex-wrap items-center justify-between gap-6 pb-6 w-full border-b border-[#EFF4FA] font-sans text-left">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    {/* Status Filter */}
                    <div className="flex flex-col gap-2 items-start">
                      <span className="text-[12px] font-semibold text-[#98A4AE] leading-4">Status</span>
                      <div className="flex items-center gap-2 h-9">
                        <button
                          type="button"
                          onClick={() => setPipelineStatus("Ongoing")}
                          className={`h-9 px-4 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                            pipelineStatus === "Ongoing"
                              ? "border border-[#635BFF] text-[#635BFF]"
                              : "border border-[#EFF4FA] text-[#0A2540] hover:bg-slate-50"
                          }`}
                        >
                          Ongoing
                        </button>
                        <button
                          type="button"
                          onClick={() => setPipelineStatus("Completed")}
                          className={`h-9 px-4 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                            pipelineStatus === "Completed"
                              ? "border border-[#635BFF] text-[#635BFF]"
                              : "border border-[#EFF4FA] text-[#0A2540] hover:bg-slate-50"
                          }`}
                        >
                          Completed
                        </button>
                      </div>
                    </div>

                    {/* Data Range Filter */}
                    <div className="flex flex-col gap-2 items-start">
                      <span className="text-[12px] font-semibold text-[#98A4AE] leading-4">Data Range</span>
                      <div className="relative">
                        <button
                          type="button"
                          className="inline-flex h-9 w-[150px] items-center justify-between gap-2 rounded-lg border border-[#E0E6EB] bg-white px-4 text-[12px] font-medium text-[#29343D] hover:bg-slate-50 cursor-pointer"
                        >
                          <span>All Time</span>
                          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" stroke="#29343D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m1 1 5 5 5-5" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Priority Filter */}
                    <div className="flex flex-col gap-2 items-start">
                      <span className="text-[12px] font-semibold text-[#98A4AE] leading-4">Priority</span>
                      <div className="flex items-center gap-2 h-9">
                        {(["All", "Low", "Medium", "High"] as const).map((p) => {
                          const isActive = priorityFilter === p;
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPriorityFilter(p)}
                              className={`h-9 px-4 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                                isActive
                                  ? "border border-[#635BFF] text-[#635BFF]"
                                  : "border border-[#EFF4FA] text-[#0A2540] hover:bg-slate-50"
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Configure Columns */}
                  <div className="flex items-center gap-2 self-end">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setColumnVisibilityMenuOpen(!columnVisibilityMenuOpen)}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#E0E6EB] bg-white px-4 text-[12px] font-semibold text-[#29343D] hover:bg-slate-50 cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Columns
                      </button>
                      {columnVisibilityMenuOpen && (
                        <div className="absolute right-0 top-10 z-20 w-[200px] rounded-xl bg-white p-3 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.2)] border border-slate-100 text-left flex flex-col gap-1.5">
                          <span className="block px-1 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visible Columns</span>
                          {getPipelineStages(pipelineStatus).map((stage) => (
                            <label
                              key={stage.id}
                              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer select-none text-[12px] font-semibold text-[#29343D]"
                            >
                              <input
                                type="checkbox"
                                checked={visibleColumns[stage.id] !== false}
                                onChange={() =>
                                  setVisibleColumns((prev) => ({
                                    ...prev,
                                    [stage.id]: prev[stage.id] === false ? true : false,
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

                {/* Pipeline Title Header */}
                <div className="flex flex-row items-center gap-2 text-left font-sans py-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#EBFAF0] text-[#36C76C]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[16px] font-semibold text-[#29343D] leading-[22px]">
                    Open Pipeline
                  </span>
                </div>

                {/* Kanban Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px] w-full pb-4">
                  {getPipelineStages(pipelineStatus).map((stage) => {
                    if (visibleColumns[stage.id] === false) return null;

                    const stageLeads = leads
                      .filter((l) => l.stage === stage.id)
                      .filter((l) => priorityFilter === "All" || l.priority === priorityFilter);
                    const isDragOver = dragOverColumnId === stage.id;

                    return (
                      <div
                        key={stage.id}
                        onDragOver={(e) => handleDragOverColumn(e, stage.id)}
                        onDragLeave={handleDragLeaveColumn}
                        onDrop={(e) => handleDropOnColumn(e, stage.id)}
                        className={`rounded-[12px] p-5 flex flex-col gap-6 transition-all duration-200 border-2 border-transparent relative ${
                          isDragOver
                            ? "bg-[#EFF4FA]/60 border-dashed border-[#635BFF]"
                            : stage.bgClass
                        }`}
                        style={{ minHeight: "400px" }}
                      >
                        {/* Column Header */}
                        <div className="flex flex-row items-center justify-between w-full h-8 font-sans">
                          <span className="text-[16px] font-bold text-[#29343D] leading-[22px] tracking-tight">
                            {stage.label}
                          </span>
                          
                          <div className="flex flex-row items-center gap-4">
                            {/* Count Badge */}
                            <div className="flex flex-row justify-center items-center px-2 py-0.5 min-w-[24px] h-[22px] bg-[#DDDBFF] rounded-full">
                              <span className="text-[#635BFF] text-[12px] font-semibold leading-[18px]">
                                {stageLeads.length}
                              </span>
                            </div>

                            {/* Column Menu */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setColumnDropdownOpenId(columnDropdownOpenId === stage.id ? null : stage.id)}
                                className="w-6 h-6 flex items-center justify-center rounded-full text-slate-500 hover:bg-white/50 transition-colors cursor-pointer"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                </svg>
                              </button>

                              {columnDropdownOpenId === stage.id && (
                                <div className="absolute right-0 top-8 z-35 w-[130px] bg-white shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.3)] rounded-[12px] py-2 border border-slate-100 flex flex-col items-start gap-1 animate-in fade-in zoom-in-95 duration-100 text-left">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setVisibleColumns((prev) => ({ ...prev, [stage.id]: false }));
                                      setColumnDropdownOpenId(null);
                                    }}
                                    className="w-full h-[28px] flex items-center gap-2 px-3.5 hover:bg-slate-50 text-left transition-colors text-[12px] font-medium text-[#29343D]"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                      <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                    <span>Hide Column</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Column Card Body container */}
                        <div className="flex-1 flex flex-col gap-3">
                          {stageLeads.map((lead) => {
                            const priorityStyle = getPriorityClasses(lead.priority);
                            const formattedValue = new Intl.NumberFormat('it-IT').format(lead.value) + ' €';

                            return (
                              <div
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                className="bg-white rounded-xl p-4 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] border border-[#E0E6EB] hover:shadow-md cursor-grab active:cursor-grabbing hover:border-[#635BFF]/30 transition-all flex flex-col gap-4 relative group text-left"
                                style={{ minHeight: "150px" }}
                              >
                                {/* Row 1: Title & Menu */}
                                <div className="flex items-center justify-between">
                                  <h4 className="font-bold text-[#29343D] text-[14px] group-hover:text-[#635BFF] transition-colors leading-[19px] truncate pr-4">
                                    {lead.name}
                                  </h4>
                                  
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveActionsRowId(activeActionsRowId === lead.id ? null : lead.id);
                                      }}
                                      className="w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                                    >
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                                      </svg>
                                    </button>

                                    {/* Card menu dropdown */}
                                    {activeActionsRowId === lead.id && (
                                      <div className="absolute right-0 top-8 z-30 w-[119px] bg-white shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] rounded-[12px] py-2 border border-slate-100 flex flex-col items-start gap-1 animate-in fade-in zoom-in-95 duration-100 text-left font-sans">
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setDetailLead(lead);
                                            setActiveActionsRowId(null);
                                          }}
                                          className="w-full h-[28px] flex items-center gap-2 px-3.5 hover:bg-slate-50 text-left transition-colors text-[12px] font-medium text-[#29343D]"
                                        >
                                          <EyeIcon color="#635BFF" />
                                          <span>See more</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openAddTask(lead.id);
                                            setActiveActionsRowId(null);
                                          }}
                                          className="w-full h-[28px] flex items-center gap-2.5 px-3.5 hover:bg-slate-50 text-left transition-colors text-[12px] font-medium text-[#29343D]"
                                        >
                                          <TaskIcon color="#46CAEB" />
                                          <span>Add task</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteLeadId(lead.id);
                                            setActiveActionsRowId(null);
                                          }}
                                          className="w-full h-[28px] flex items-center gap-2.5 px-3.5 hover:bg-slate-50 text-left transition-colors text-[12px] font-medium text-[#29343D]"
                                        >
                                          <TrashIconMini color="#FF6692" />
                                          <span>Delete</span>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Row 2: Company details */}
                                <div className="flex flex-col gap-0.5">
                                  <p className="text-[14px] font-normal leading-5 text-[#98A4AE]">
                                    {lead.company}
                                  </p>
                                </div>

                                {/* Row 3: Value and Icon */}
                                <div className="flex justify-between items-center">
                                  <span className="text-[14px] font-normal leading-5 text-[#98A4AE]">
                                    {formattedValue}
                                  </span>
                                  <div className="flex items-center justify-center w-5 h-5">
                                    <SourceIcon source={lead.source} />
                                  </div>
                                </div>

                                {/* Row 4: Time in stage & Priority */}
                                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                  <span className="text-[14px] font-normal leading-5 text-[#98A4AE]">
                                    Time in stage
                                  </span>
                                  <div className={`px-2 py-0.5 rounded-[6px] ${
                                    lead.priority === "High"
                                      ? "bg-[#FFE5ED]"
                                      : lead.priority === "Medium"
                                      ? "bg-[#FFEAD2]"
                                      : "bg-[#EBFAF0]"
                                  }`}>
                                    <span className={`text-[13px] font-semibold leading-[18px] ${
                                      lead.priority === "High"
                                        ? "text-[#FF6692]"
                                        : lead.priority === "Medium"
                                        ? "text-[#FFAD46]"
                                        : "text-[#36C76C]"
                                    }`}>
                                      {lead.priority}
                                    </span>
                                  </div>
                                </div>

                                {/* Row 5: Date Footer */}
                                <div className="flex items-center gap-2 text-[12px] text-[#98A4AE] font-normal mt-1">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  <span>{lead.receivedDaysAgo}d ago</span>
                                </div>
                              </div>
                            );
                          })}

                          {stageLeads.length === 0 && (
                            <div className="flex-1 border border-dashed border-[#DDDBFF] rounded-xl flex items-center justify-center p-4 text-center opacity-60 min-h-[120px] bg-white/20">
                              <span className="text-[12px] font-bold text-[#635BFF] uppercase tracking-wider">Empty</span>
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
              <div className="flex flex-col gap-[30px] w-full">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-[18px] font-semibold text-[#29343D] leading-[25px] font-sans">
                    Change pipeline stages
                  </h3>
                </div>

                <div className="box-sizing-border-box flex flex-col items-start p-4 sm:p-[30px] gap-6 sm:gap-[30px] bg-white rounded-xl bg-white shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full">
                  
                  {/* Open Pipeline Section */}
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#EBFAF0] text-[#36C76C]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[16px] font-semibold text-[#29343D] leading-[22px] font-sans">
                          Open Pipeline
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setAddStageModalOpen("Ongoing")}
                        className="h-9 px-4 bg-[#DDDBFF] hover:bg-[#c7c4ff] text-[#635BFF] text-[12px] font-medium rounded-lg transition-colors font-sans cursor-pointer"
                      >
                        Add Stage
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full">
                      {ongoingStages.map((stage, index) => (
                        <StageCard
                          key={`${stage.id}-${index}`}
                          stage={stage}
                          index={index + 1}
                          type="Ongoing"
                          onToggleNotification={(checked) => handleToggleStageNotification("Ongoing", stage.id, checked)}
                          onOpenDropdown={() => setDropdownOpenStageId(dropdownOpenStageId === stage.id ? null : stage.id)}
                          isDropdownOpen={dropdownOpenStageId === stage.id}
                          onEditStage={() => {
                            setEditingStage({ id: stage.id, type: "Ongoing" });
                            setDropdownOpenStageId(null);
                          }}
                          onDeleteStage={() => {
                            handleDeleteStage("Ongoing", stage.id);
                            setDropdownOpenStageId(null);
                          }}
                          onEditNotification={() => {
                            setViewingNotificationStage({ id: stage.id, type: "Ongoing" });
                            setDropdownOpenStageId(null);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <hr className="w-full border-t border-[#E0E6EB]" />

                  {/* Pipeline Completed Section */}
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE5ED] text-[#FF6692]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                        <span className="text-[16px] font-semibold text-[#29343D] leading-[22px] font-sans">
                          Pipeline Completed
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAddStageModalOpen("Completed")}
                        className="h-9 px-4 bg-[#DDDBFF] hover:bg-[#c7c4ff] text-[#635BFF] text-[12px] font-medium rounded-lg transition-colors font-sans cursor-pointer"
                      >
                        Add Stage
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full">
                      {completedStages.map((stage, index) => (
                        <StageCard
                          key={`${stage.id}-${index}`}
                          stage={stage}
                          index={index + 1}
                          type="Completed"
                          onToggleNotification={(checked) => handleToggleStageNotification("Completed", stage.id, checked)}
                          onOpenDropdown={() => setDropdownOpenStageId(dropdownOpenStageId === stage.id ? null : stage.id)}
                          isDropdownOpen={dropdownOpenStageId === stage.id}
                          onEditStage={() => {
                            setEditingStage({ id: stage.id, type: "Completed" });
                            setDropdownOpenStageId(null);
                          }}
                          onDeleteStage={() => {
                            handleDeleteStage("Completed", stage.id);
                            setDropdownOpenStageId(null);
                          }}
                          onEditNotification={() => {
                            setViewingNotificationStage({ id: stage.id, type: "Completed" });
                            setDropdownOpenStageId(null);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </section>
        )}

      </div>

      {/* MODAL 1: Lead Detail Sheet */}
      {detailLead && (
        <ViewLeadModal
          lead={detailLead}
          onClose={() => setDetailLead(null)}
          onAssign={(id) => {
            setActiveAssigneeRowId(id);
          }}
        />
      )}

      {/* MODAL 2: Add/Edit Task Modal */}
      {addTaskLeadId !== null && (
        <AddTaskModal
          initialTask={taskTextInput}
          onClose={() => {
            setAddTaskLeadId(null);
            setTaskTextInput("");
          }}
          onSave={(task) => {
            handleSaveTask(task);
          }}
        />
      )}

      {/* MODAL 4: Assign To Modal */}
      {activeAssigneeRowId !== null && (
        <AssignToModal
          assignees={ASSIGNEES}
          onClose={() => setActiveAssigneeRowId(null)}
          onAssign={(assignee) => {
            handleMoveLead(activeAssigneeRowId, "to_contact");
            setLeads((prev) =>
              prev.map((l) =>
                l.id === activeAssigneeRowId ? { ...l, assignedTo: assignee } : l
              )
            );
            setActiveAssigneeRowId(null);
          }}
        />
      )}

      {/* MODAL 5: Delete Lead Modal */}
      {deleteLeadId !== null && (
        <DeleteLeadModal
          onClose={() => setDeleteLeadId(null)}
          onConfirm={(reason) => {
            console.log(`Lead ${deleteLeadId} deleted. Reason: ${reason}`);
            handleDeleteLead(deleteLeadId);
            setDeleteLeadId(null);
          }}
        />
      )}

      {/* MODAL 3: Export Data Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-[12px] shadow-2xl flex flex-col p-6 gap-6 animate-in scale-in-95 duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
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

            <div className="flex justify-end pt-3 gap-2 border-t border-slate-150">
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

      {/* Settings Modal: Add Stage */}
      {addStageModalOpen !== null && (
        <AddStageModal
          stages={getPipelineStages(addStageModalOpen)}
          onClose={() => setAddStageModalOpen(null)}
          onSubmit={handleAddStageSubmit}
        />
      )}

      {/* Settings Modal: Edit Stage */}
      {editingStage !== null && (
        <EditStageModal
          stage={
            editingStage.type === "Ongoing"
              ? ongoingStages.find((s) => s.id === editingStage.id)!
              : completedStages.find((s) => s.id === editingStage.id)!
          }
          onClose={() => setEditingStage(null)}
          onSubmit={handleEditStageSubmit}
        />
      )}

      {/* Settings Modal: Delete Stage Confirmation */}
      {deletingStage !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-[521px] min-h-[182px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] p-6 flex flex-col justify-between animate-in scale-in-95 duration-100 text-left font-sans">
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
                Are you sure you want to delete this Stage?
              </h3>
              <p className="text-[14px] leading-5 text-[#526B7A]">
                You are deleting both the stage and the all the automations associated to it. This action can't be undone
              </p>
            </div>

            <div className="flex justify-end gap-[10px] mt-4">
              <button
                type="button"
                onClick={() => setDeletingStage(null)}
                className="h-9 px-[22px] bg-[#F6F7F9] text-[12px] font-medium leading-4 text-[#0A2540] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteStage}
                className="h-9 px-4 bg-[#FFE5ED] text-[12px] font-medium leading-4 text-[#FF6692] hover:bg-[#ffd1de] rounded-lg transition-colors cursor-pointer"
              >
                Delete Stage
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
