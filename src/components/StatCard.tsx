"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  trendType?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: any;
  iconBgClass: string;
  iconColor: string;
  onViewClick?: () => void;
}

export default function StatCard({
  title,
  value,
  subtext,
  trendType = "neutral",
  trendValue,
  icon,
  iconBgClass,
  iconColor,
  onViewClick
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex flex-col justify-between min-h-[200px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Top Header Section */}
      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBgClass}`}>
          <HugeiconsIcon icon={icon} size={22} color={iconColor} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-slate-500 truncate leading-tight mb-1">
            {title}
          </span>
          <span className="text-3xl font-bold text-slate-800 tracking-tight leading-none py-1">
            {value}
          </span>
        </div>
      </div>

      {/* Middle Trend Section */}
      <div className="my-4 flex items-center gap-1.5">
        {trendType === "up" && (
          <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
            {trendValue}
          </span>
        )}
        {trendType === "down" && (
          <span className="text-xs font-bold text-rose-600 flex items-center bg-rose-50 px-2 py-0.5 rounded-full">
            {trendValue}
          </span>
        )}
        <span className="text-xs font-medium text-slate-400">
          {subtext}
        </span>
      </div>

      {/* Bottom Button Action */}
      <div className="mt-auto">
        <button
          onClick={onViewClick}
          className="text-xs font-semibold text-[#5e53fc] bg-[#f2f1ff] hover:bg-[#5e53fc] hover:text-white px-4 py-2 rounded-2xl transition-all duration-200"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
