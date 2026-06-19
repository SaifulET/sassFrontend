"use client";

import React from "react";

export interface ActivityItem {
  id: string;
  time: string;
  dotColor: string; // "teal" | "purple" | "yellow"
  text: string;
  boldText: string;
  amount?: string;
}

interface RecentActivitySectionProps {
  activities: ActivityItem[];
  onViewAllClick: () => void;
}

export default function RecentActivitySection({
  activities,
  onViewAllClick
}: RecentActivitySectionProps) {
  const getDotBgColor = (color: string) => {
    switch (color) {
      case "teal":
        return "bg-teal-400";
      case "purple":
        return "bg-[#5e53fc]";
      case "yellow":
        return "bg-amber-400";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-slate-800">Recent Activity</h3>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#635BFF] bg-white border border-[#635BFF] hover:bg-[#635BFF]/5 px-4 py-1.5 rounded-[8px] transition-all duration-200"
        >
          View All
        </button>
      </div>

      {/* Timeline List */}
      <div className="flex-1 flex flex-col relative">
        {activities.map((item, index) => (
          <div key={item.id} className="flex items-start group relative pb-6 last:pb-2">
            {/* Vertical Line Connector */}
            {index < activities.length - 1 && (
              <div className="absolute left-[73px] top-4 bottom-0 w-[1.5px] bg-slate-100 group-hover:bg-slate-200 transition-colors" />
            )}

            {/* Time Stamp (fixed width) */}
            <div className="w-16 text-xs font-medium text-slate-400 pt-0.5 pr-2 select-none">
              {item.time}
            </div>

            {/* Indicator Dot */}
            <div className="mx-2 flex items-center justify-center pt-1.5 relative z-10">
              <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-white ${getDotBgColor(item.dotColor)}`} />
            </div>

            {/* Content text & value */}
            <div className="flex-1 flex items-start justify-between pl-2 min-w-0">
              <div className="text-sm text-slate-500 font-medium truncate pr-4">
                <span className="font-bold text-slate-800 group-hover:text-[#5e53fc] transition-colors duration-150">
                  {item.boldText}
                </span>{" "}
                {item.text.replace(item.boldText, "").trim()}
              </div>

              {/* Amount (if exists) */}
              {item.amount && (
                <div className="text-sm font-bold text-slate-700 whitespace-nowrap">
                  {item.amount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
