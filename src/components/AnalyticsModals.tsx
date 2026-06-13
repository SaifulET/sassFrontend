"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  UserIcon,
  GlobalRefreshIcon,
  Shop,
  CreditCardIcon,
  ArrowDown01Icon
} from "@hugeicons/core-free-icons";

interface AnalyticsModalsProps {
  isOpen: boolean;
  type: "sales" | "subscriptions" | "leads" | "salons" | null;
  onClose: () => void;
}

export default function AnalyticsModals({ isOpen, type, onClose }: AnalyticsModalsProps) {
  if (!isOpen || !type) return null;

  // Render overlay backdrop
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full max-h-[90vh] overflow-y-auto z-10 transform transition-all duration-300 animate-in zoom-in-95 relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
        </button>

        {/* Modal content selection */}
        {type === "sales" && <SalesModalContent />}
        {type === "subscriptions" && <SubscriptionsModalContent />}
        {type === "leads" && <LeadsModalContent />}
        {type === "salons" && <SalonsModalContent />}
      </div>
    </div>
  );
}

// 1. Monthly Processed Sales Modal Content
function SalesModalContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-bold text-slate-800">Monthly Processed Sales</h3>
        <p className="text-xs text-slate-400 mt-0.5">Current MRR breakdown and growth metrics</p>
      </div>

      {/* Main KPI */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-slate-800">€ 23,850</span>
        <span className="text-xs font-bold text-slate-400">August</span>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
          +12.5% from last month
        </span>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative w-full h-40 mt-2">
        <svg viewBox="0 0 500 120" className="w-full h-full">
          {/* Horizontal lines */}
          <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="55" x2="480" y2="55" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />

          {/* Bars */}
          {/* Feb */}
          <rect x="55" y="55" width="22" height="35" rx="3" fill="#14b8a6" fillOpacity="0.1" />
          {/* Mar */}
          <rect x="115" y="60" width="22" height="30" rx="3" fill="#14b8a6" fillOpacity="0.1" />
          {/* Apr */}
          <rect x="175" y="40" width="22" height="50" rx="3" fill="#14b8a6" fillOpacity="0.1" />
          {/* May */}
          <rect x="235" y="45" width="22" height="45" rx="3" fill="#14b8a6" fillOpacity="0.1" />
          {/* Jun */}
          <rect x="295" y="65" width="22" height="25" rx="3" fill="#14b8a6" fillOpacity="0.1" />
          {/* Jul */}
          <rect x="355" y="50" width="22" height="40" rx="3" fill="#14b8a6" fillOpacity="0.1" />
          {/* Aug (Active/Selected highlight) */}
          <rect x="415" y="30" width="22" height="60" rx="3" fill="#14b8a6" />

          {/* Month labels */}
          <text x="66" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">February</text>
          <text x="126" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">March</text>
          <text x="186" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">April</text>
          <text x="246" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">May</text>
          <text x="306" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">June</text>
          <text x="366" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">July</text>
          <text x="426" y="108" textAnchor="middle" className="text-[10px] font-bold text-[#14b8a6] fill-current">Aug</text>
        </svg>
      </div>

      {/* Pagination controls below chart */}
      <div className="flex justify-center gap-2 -mt-2">
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        </button>
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </button>
      </div>

      {/* Metrics breakdown list */}
      <div className="flex flex-col gap-3.5 mt-2 bg-slate-50/50 p-4 rounded-2xl">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Annual Recurring Revenue</span>
          <span className="bg-[#e6fcf9] text-[#10b981] px-2.5 py-1 rounded-lg font-extrabold">€ 0,00</span>
        </div>
        <div className="w-full h-px bg-slate-100" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Average per Salon</span>
          <span className="bg-[#e6fcf9] text-[#10b981] px-2.5 py-1 rounded-lg font-extrabold">€ 0,00</span>
        </div>
        <div className="w-full h-px bg-slate-100" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Active Subscriptions</span>
          <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg font-extrabold">44</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => alert("Redirecting to full Sales Analytics...")}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 2. Total Active Subscriptions Modal Content
function SubscriptionsModalContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-bold text-slate-800">Total Active Subscriptions</h3>
        <p className="text-xs text-slate-400 mt-0.5">Current MRR breakdown and growth metrics</p>
      </div>

      {/* Split layout: Category lists & Radial Chart */}
      <div className="grid grid-cols-2 gap-6 items-center my-2">
        {/* Left categories list */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400">Total</span>
            <span className="text-3xl font-extrabold text-slate-800 leading-none mt-1">44</span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-1">
              ▲ +9% last month
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan categories</span>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
              <span>Basic (25%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5e53fc]" />
              <span>Premium (35%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Enterprise (40%)</span>
            </div>
          </div>
        </div>

        {/* Right Radial Chart using SVG */}
        <div className="flex justify-center">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {/* Center hole background */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />

              {/* Segment 1: Basic 25% (Teal) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#14b8a6"
                strokeWidth="3.2"
                strokeDasharray="25 75"
                strokeDashoffset="0"
              />

              {/* Segment 2: Premium 35% (Purple) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#5e53fc"
                strokeWidth="3.2"
                strokeDasharray="35 65"
                strokeDashoffset="-25"
              />

              {/* Segment 3: Enterprise 40% (Blue) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="3.2"
                strokeDasharray="40 60"
                strokeDashoffset="-60"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <button
          onClick={() => alert("Redirecting to Subscriptions Management...")}
          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#5e53fc] font-bold rounded-2xl text-xs transition-all"
        >
          Manage Subscriptions
        </button>
        <button
          onClick={() => alert("Redirecting to detailed Subscriptions Analytics...")}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 3. New SaaS Leads Modal Content
function LeadsModalContent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-bold text-slate-800">New Saas Leads</h3>
        <p className="text-xs text-slate-400 mt-0.5">Current MRR breakdown and growth metrics</p>
      </div>

      {/* Metric Grid (2 Cards) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-50 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-100/50 flex items-center justify-center text-[#5e53fc]">
            <HugeiconsIcon icon={UserIcon} size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800 leading-tight">40</span>
            <span className="text-[11px] font-bold text-slate-400">Total Trials</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-[#5e53fc] rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-3.5 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
            <HugeiconsIcon icon={GlobalRefreshIcon} size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black leading-tight">4</span>
            <span className="text-[11px] font-bold opacity-80">Trial Converted</span>
          </div>
        </div>
      </div>

      {/* Trial Conversions Line Graph */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Trial Conversions (last 30 days)</span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
            10% ▲ +9%
          </span>
        </div>

        {/* SVG Spline Chart */}
        <div 
          className="relative h-28 w-full mt-2 cursor-pointer select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip on hover/active */}
          {isHovered && (
            <div className="absolute z-20 bg-white border border-slate-100 shadow-xl rounded-xl p-2.5 w-40 pointer-events-none left-[150px] top-[10px]">
              <div className="flex flex-col text-[10px] text-slate-500 gap-0.5">
                <span className="font-bold text-slate-800">Mar 03, 2025</span>
                <div className="flex justify-between">
                  <span>Total Trials:</span>
                  <span className="font-semibold text-slate-700">20</span>
                </div>
                <div className="flex justify-between">
                  <span>Trial Converted:</span>
                  <span className="font-semibold text-indigo-600">2</span>
                </div>
              </div>
            </div>
          )}

          <svg viewBox="0 0 400 80" className="w-full h-full">
            {/* Wave Path */}
            <path
              d="M 10 50 Q 50 30, 90 60 T 170 30 T 250 60 T 330 35 T 390 50"
              fill="none"
              stroke="#5e53fc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Shading area below wave */}
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5e53fc" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#5e53fc" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 10 50 Q 50 30, 90 60 T 170 30 T 250 60 T 330 35 T 390 50 L 390 80 L 10 80 Z"
              fill="url(#leadsGradient)"
            />

            {/* Target highlight dot */}
            <circle cx="170" cy="30" r="4" fill="#5e53fc" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <button
          onClick={() => alert("Redirecting to Leads Management...")}
          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#5e53fc] font-bold rounded-2xl text-xs transition-all"
        >
          Manage Leads
        </button>
        <button
          onClick={() => alert("Redirecting to detailed Leads Analytics...")}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 4. New Salons Modal Content
function SalonsModalContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title & Legend Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-50 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">New Salons</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 text-[10px] font-semibold text-slate-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6]" />
              <span>Basic Plan</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#5e53fc]" />
              <span>Premium Plan</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Enterprise plan</span>
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none bg-slate-50 text-[10px] font-bold text-slate-600 border border-slate-100 pl-2 pr-6 py-1 rounded-md cursor-pointer">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
            <HugeiconsIcon icon={ArrowDown01Icon} size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stacked Bar Graph */}
      <div className="relative w-full h-36">
        <svg viewBox="0 0 500 120" className="w-full h-full">
          {/* Horizontal Grid lines */}
          <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="55" x2="480" y2="55" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />

          {/* Stacked Columns: Jan, Feb, Mar, Apr, May, Jun */}
          {/* Jan */}
          <g>
            <rect x="55" y="30" width="25" height="15" fill="#3b82f6" /> {/* Enterprise 20% */}
            <rect x="55" y="45" width="25" height="20" fill="#5e53fc" /> {/* Premium 32% */}
            <rect x="55" y="65" width="25" height="25" fill="#14b8a6" /> {/* Basic 48% */}
          </g>
          {/* Feb */}
          <g>
            <rect x="125" y="35" width="25" height="12" fill="#3b82f6" />
            <rect x="125" y="47" width="25" height="18" fill="#5e53fc" />
            <rect x="125" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          {/* Mar */}
          <g>
            <rect x="195" y="28" width="25" height="17" fill="#3b82f6" />
            <rect x="195" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="195" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          {/* Apr */}
          <g>
            <rect x="265" y="33" width="25" height="14" fill="#3b82f6" />
            <rect x="265" y="47" width="25" height="18" fill="#5e53fc" />
            <rect x="265" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          {/* May */}
          <g>
            <rect x="335" y="25" width="25" height="20" fill="#3b82f6" />
            <rect x="335" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="335" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          {/* Jun */}
          <g>
            <rect x="405" y="30" width="25" height="15" fill="#3b82f6" />
            <rect x="405" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="405" y="65" width="25" height="25" fill="#14b8a6" />
          </g>

          {/* Month labels */}
          <text x="67" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Jan</text>
          <text x="137" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Feb</text>
          <text x="207" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Mar</text>
          <text x="277" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Apr</text>
          <text x="347" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">May</text>
          <text x="417" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Jun</text>
        </svg>
      </div>

      {/* Pagination arrows */}
      <div className="flex justify-center gap-2 -mt-3">
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        </button>
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </button>
      </div>

      {/* Dual Summary Metric Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-[#5e53fc] rounded-2xl shadow-lg shadow-indigo-100 text-white flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
            <HugeiconsIcon icon={Shop} size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black leading-tight">1650</span>
            <span className="text-[11px] font-bold opacity-80">Total Subscriptions</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-[#14b8a6] rounded-2xl shadow-lg shadow-teal-100 text-white flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
            <HugeiconsIcon icon={CreditCardIcon} size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black leading-tight">+8</span>
            <span className="text-[11px] font-bold opacity-80">New Subscriptions</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <button
          onClick={() => alert("Redirecting to Salons Management...")}
          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#5e53fc] font-bold rounded-2xl text-xs transition-all"
        >
          Manage Salons
        </button>
        <button
          onClick={() => alert("Redirecting to detailed Salons Analytics...")}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
