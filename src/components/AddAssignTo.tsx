"use client";

import React, { useState } from "react";

interface AssignToModalProps {
  onClose: () => void;
  onAssign: (assignee: string, note: string) => void;
  assignees: string[];
  initialNote?: string;
}

export default function AssignToModal({ onClose, onAssign, assignees, initialNote = "" }: AssignToModalProps) {
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [note, setNote] = useState(initialNote);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="w-[638px] h-[402px] rounded-xl bg-white p-6 shadow-[0_16px_32px_-8px_rgba(12,12,13,0.4)] font-['Manrope'] animate-in scale-in-95 duration-100">
        <div className="flex h-full flex-col gap-6">
          <div className="flex h-[25px] items-center justify-between">
            <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
              Assign to
            </h2>

            <button 
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center text-[#29343D]"
            >
              <span className="text-[26px] font-light leading-none">×</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
              Employee *
            </label>

            <div className="relative">
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className={`h-[42px] w-full appearance-none rounded border border-[#E0E6EB] bg-white px-3 pr-10 text-[14px] leading-5 outline-none ${selectedAssignee ? "text-[#29343D]" : "text-[#98A4AE]"}`}
              >
                <option value="" disabled>
                  Select employee
                </option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.7 9.3L12 14.6L17.3 9.3"
                  stroke="#98A4AE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
              Text
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter assign details..."
              className="h-[125px] w-full resize-none rounded border border-[#E0E6EB] p-4 text-[14px] font-normal leading-5 text-[#29343D] outline-none placeholder:text-[#98A4AE]"
            />
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => {
                if (selectedAssignee) {
                  onAssign(selectedAssignee, note);
                }
              }}
              disabled={!selectedAssignee}
              className={`h-9 w-24 rounded-lg text-[12px] font-medium leading-4 text-white transition-colors ${selectedAssignee ? "bg-[#635BFF] hover:bg-[#4d42eb]" : "bg-[#635BFF]/50 cursor-not-allowed"}`}
            >
              Assign now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}