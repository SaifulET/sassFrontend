"use client";

import React, { useState } from "react";

interface AddTaskModalProps {
  onClose: () => void;
  onSave: (task: string) => void;
  initialTask?: string;
}

export default function AddTaskModal({ onClose, onSave, initialTask = "" }: AddTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState(initialTask);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="w-[638px] h-[402px] rounded-xl bg-white p-6 shadow-[0_16px_32px_-8px_rgba(12,12,13,0.4)] font-['Manrope'] animate-in scale-in-95 duration-100">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
                Add Task
              </h2>

              <button 
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center text-[#29343D]"
              >
                <span className="text-[28px] leading-none font-light">×</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
                Task Title *
              </label>
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter title"
                className="h-[42px] w-full rounded border border-[#E0E6EB] px-3 text-[14px] font-normal leading-5 text-[#29343D] placeholder:text-[#98A4AE] outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
                Reminder Settings
              </p>

              <label className="flex items-center gap-2 text-[14px] font-normal leading-5 text-[#29343D] cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border border-[#98A4AE] bg-white checked:bg-[#635BFF] cursor-pointer"
                />
                No reminder needed (just create the task)
              </label>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-1 flex-col gap-2">
                <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
                  Amount *
                </label>
                <input
                  placeholder="Enter amount"
                  className="h-[42px] w-full rounded border border-[#E0E6EB] px-3 text-[14px] leading-5 text-[#29343D] placeholder:text-[#98A4AE] outline-none"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
                  Time Unit *
                </label>

                <div className="relative">
                  <select
                    defaultValue="Minutes"
                    className="h-[42px] w-full appearance-none rounded border border-[#E0E6EB] bg-white px-3 pr-10 text-[14px] leading-5 text-[#29343D] outline-none"
                  >
                    <option>Minutes</option>
                    <option>Hours</option>
                    <option>Days</option>
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
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => onSave(taskTitle)}
              className="h-9 rounded-lg bg-[#635BFF] px-4 text-[12px] font-medium leading-4 text-white hover:bg-[#4d42eb] transition-colors"
            >
              Set up task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}