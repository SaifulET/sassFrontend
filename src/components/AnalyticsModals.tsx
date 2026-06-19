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
  type: "sales" | "subscriptions" | "leads" | "salons" | "churn" | null;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

interface ModalContentProps {
  onNavigate: (tab: string) => void;
  onClose: () => void;
}

export default function AnalyticsModals({ isOpen, type, onClose, onNavigate }: AnalyticsModalsProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box - sized to max-w-[638px] matching Figma */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-[638px] w-full z-10 transform transition-all duration-300 animate-in zoom-in-95 relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors z-30"
          aria-label="Close modal"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
        </button>

        {/* Scrollable content wrapper */}
        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {/* Modal content selection */}
          {type === "sales" && <SalesModalContent onNavigate={onNavigate} onClose={onClose} />}
          {type === "subscriptions" && <SubscriptionsModalContent onNavigate={onNavigate} onClose={onClose} />}
          {type === "leads" && <LeadsModalContent onNavigate={onNavigate} onClose={onClose} />}
          {type === "salons" && <SalonsModalContent onNavigate={onNavigate} onClose={onClose} />}
          {type === "churn" && <ChurnModalContent onNavigate={onNavigate} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

// 1. Monthly Processed Sales Modal Content
function SalesModalContent({ onNavigate, onClose }: ModalContentProps) {
  const handleRedirect = () => {
    onClose();
    onNavigate("analytics_revenue_mrr_arr");
  };

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
          <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="55" x2="480" y2="55" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />

          <rect x="55" y="55" width="22" height="35" rx="3" fill="#14b8a6" fillOpacity="0.1" className="cursor-pointer hover:fill-opacity-30 transition-all" />
          <rect x="115" y="60" width="22" height="30" rx="3" fill="#14b8a6" fillOpacity="0.1" className="cursor-pointer hover:fill-opacity-30 transition-all" />
          <rect x="175" y="40" width="22" height="50" rx="3" fill="#14b8a6" fillOpacity="0.1" className="cursor-pointer hover:fill-opacity-30 transition-all" />
          <rect x="235" y="45" width="22" height="45" rx="3" fill="#14b8a6" fillOpacity="0.1" className="cursor-pointer hover:fill-opacity-30 transition-all" />
          <rect x="295" y="65" width="22" height="25" rx="3" fill="#14b8a6" fillOpacity="0.1" className="cursor-pointer hover:fill-opacity-30 transition-all" />
          <rect x="355" y="50" width="22" height="40" rx="3" fill="#14b8a6" fillOpacity="0.1" className="cursor-pointer hover:fill-opacity-30 transition-all" />
          <rect x="415" y="30" width="22" height="60" rx="3" fill="#14b8a6" className="cursor-pointer hover:opacity-85 transition-all" />

          <text x="66" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">February</text>
          <text x="126" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">March</text>
          <text x="186" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">April</text>
          <text x="246" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">May</text>
          <text x="306" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">June</text>
          <text x="366" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">July</text>
          <text x="426" y="108" textAnchor="middle" className="text-[10px] font-bold text-[#14b8a6] fill-current">Aug</text>
        </svg>
      </div>

      <div className="flex justify-center gap-2 -mt-2">
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        </button>
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-3.5 mt-2 bg-slate-50/50 p-4 rounded-2xl">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Annual Recurring Revenue</span>
          <span className="bg-[#e6fcf9] text-[#10b981] px-2.5 py-1 rounded-lg font-extrabold">€ 286.200</span>
        </div>
        <div className="w-full h-px bg-slate-100" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Average per Salon</span>
          <span className="bg-[#e6fcf9] text-[#10b981] px-2.5 py-1 rounded-lg font-extrabold">€ 542</span>
        </div>
        <div className="w-full h-px bg-slate-100" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Active Subscriptions</span>
          <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg font-extrabold">44</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRedirect}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4a3fdf] text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 2. Total Active Subscriptions Modal Content
function SubscriptionsModalContent({ onNavigate, onClose }: ModalContentProps) {
  const handleManage = () => {
    onClose();
    onNavigate("salons");
  };

  const handleAnalytics = () => {
    onClose();
    onNavigate("analytics_customers_subscribers");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-bold text-slate-800">Total Active Subscriptions</h3>
        <p className="text-xs text-slate-400 mt-0.5">Current MRR breakdown and growth metrics</p>
      </div>

      {/* Split layout: Category lists & Radial Chart */}
      <div className="grid grid-cols-2 gap-6 items-center my-2">
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
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer hover:opacity-80 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
              <span>Basic (25%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer hover:opacity-80 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5e53fc]" />
              <span>Premium (35%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer hover:opacity-80 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Enterprise (40%)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />

              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#14b8a6"
                strokeWidth="3.2"
                strokeDasharray="25 75"
                strokeDashoffset="0"
                className="cursor-pointer hover:opacity-80 transition-all"
              />

              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#5e53fc"
                strokeWidth="3.2"
                strokeDasharray="35 65"
                strokeDashoffset="-25"
                className="cursor-pointer hover:opacity-80 transition-all"
              />

              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="3.2"
                strokeDasharray="40 60"
                strokeDashoffset="-60"
                className="cursor-pointer hover:opacity-80 transition-all"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <button
          onClick={handleManage}
          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#5e53fc] font-bold rounded-2xl text-xs transition-all"
        >
          Manage Subscriptions
        </button>
        <button
          onClick={handleAnalytics}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 3. New SaaS Leads Modal Content (styled matching Figma CSS)
function LeadsModalContent({ onNavigate, onClose }: ModalContentProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleManage = () => {
    onClose();
    onNavigate("leads_pipeline");
  };

  const handleAnalytics = () => {
    onClose();
    onNavigate("analytics_customers_leads");
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Title block */}
      <div>
        <h3 className="font-semibold text-[18px] leading-[25px] text-[#29343D] font-sans">New Saas Leads</h3>
        <p className="font-semibold text-[14px] leading-[19px] text-[#29343D] font-sans mt-0.5 opacity-60">
          Current MRR breakdown and growth metrics
        </p>
      </div>

      {/* Frame 1000004043: KPI Cards */}
      <div className="flex flex-row items-start gap-6 w-full">
        {/* Card 1: Dash (Total Trials) */}
        <div className="flex flex-row items-center p-[30px] gap-[12px] flex-1 bg-[#DDDBFF] rounded-[12px] shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] h-[111px]">
          <img src="/newSaasLeadUserIcon.svg" className="w-[40px] h-[40px] object-contain shrink-0" alt="" />

          <div className="flex flex-col items-start p-0">
            <span className="font-semibold text-[24px] leading-[120%] text-[#635BFF] font-sans">40</span>
            <span className="font-semibold text-[16px] leading-[22px] text-[#635BFF] opacity-70 font-sans whitespace-nowrap">Total Trials</span>
          </div>
        </div>

        {/* Card 2: Ripple (Trial Converted) */}
        <div className="flex flex-row items-center p-[30px] gap-[12px] flex-1 bg-[#635BFF] rounded-[12px] shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] h-[111px]">
          <span
            className="inline-block bg-white shrink-0"
            style={{
              width: "40px",
              height: "40px",
              maskImage: `url(/syncIcon.svg)`,
              WebkitMaskImage: `url(/syncIcon.svg)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <div className="flex flex-col items-start p-0">
            <span className="font-semibold text-[24px] leading-[120%] text-white font-sans">4</span>
            <span className="font-semibold text-[16px] leading-[22px] text-white opacity-70 font-sans whitespace-nowrap">Trial Converted</span>
          </div>
        </div>
      </div>

      {/* Row 2: Monthly Earnings / Chart Box */}
      <div className="flex flex-col items-start p-0 bg-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] rounded-[12px] border border-slate-50 w-full h-[219px] overflow-hidden">
        {/* Detail text */}
        <div className="flex flex-col items-start p-[24px] gap-[12px] w-full">
          <div className="font-semibold text-[18px] leading-[25px] text-[#29343D] font-sans">
            Trial Conversions (last 30 days)
          </div>
          <div className="flex flex-row items-center gap-[9px] w-full">
            <span className="font-semibold text-[28px] leading-[120%] text-[#29343D] font-sans">10%</span>
            <div className="flex flex-row items-center gap-[8px]">
              <div className="w-[24px] h-[24px] bg-[#EBFAF0] rounded-[10px] flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#36C76C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </div>
              <span className="font-normal text-[14px] leading-[20px] text-[#98A4AE] font-sans">+9%</span>
            </div>
          </div>
        </div>

        {/* SVG Spline Chart with Tooltip */}
        <div
          className="relative h-[70px] w-full select-none cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <div
              className="absolute z-20 bg-white border border-slate-100 shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px] flex flex-col justify-between"
              style={{
                width: "141.58px",
                height: "82.19px",
                left: "40%",
                top: "-90px",
                padding: "8px 11px"
              }}
            >
              <div className="text-[12px] font-semibold text-[#29343D] leading-[16px] font-sans">
                Mar 03, 2025
              </div>
              <div className="flex items-center justify-between text-[12px] font-semibold text-[#29343D] font-sans">
                <div className="flex items-center gap-[7.6px]">
                  <div className="w-[7.6px] h-[7.6px] bg-[#635BFF] rounded-full" />
                  <span>Total Trials</span>
                </div>
                <span className="text-[#98A4AE]">20</span>
              </div>
              <div className="flex items-center justify-between text-[12px] font-semibold text-[#29343D] font-sans">
                <div className="flex items-center gap-[7.6px]">
                  <div className="w-[7.6px] h-[7.6px] bg-[#635BFF] rounded-full" />
                  <span>Trial Converted</span>
                </div>
                <span className="text-[#98A4AE]">2</span>
              </div>
            </div>
          )}

          <svg viewBox="0 0 590 70" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 10 50 Q 100 30, 200 45 T 400 20 T 580 35 L 580 70 L 10 70 Z"
              fill="#F1F2FE"
            />
            <path
              d="M 10 50 Q 100 30, 200 45 T 400 20 T 580 35"
              fill="none"
              stroke="#635BFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="200" cy="45" r="4.5" fill="#635BFF" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Row 3: Footer Buttons */}
      <div className="flex flex-row justify-between items-center w-full h-[36px] mt-2">
        <button
          onClick={handleManage}
          className="flex flex-row justify-center items-center px-4 py-2 bg-[#DDDBFF] hover:bg-[#c9c5ff] rounded-[8px] text-[#635BFF] font-medium text-[12px] leading-[16px] h-[36px] w-[114px] transition-all"
        >
          Manage Leads
        </button>
        <button
          onClick={handleAnalytics}
          className="flex flex-row justify-center items-center px-4 py-2 gap-2 bg-[#635BFF] hover:bg-[#4d42eb] rounded-[8px] text-white font-medium text-[12px] leading-[16px] h-[36px] w-[140px] transition-all shadow-[0px_4px_12px_rgba(99,91,255,0.2)]"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 4. New Salons Modal Content
function SalonsModalContent({ onNavigate, onClose }: ModalContentProps) {
  const handleManage = () => {
    onClose();
    onNavigate("salons");
  };

  const handleAnalytics = () => {
    onClose();
    onNavigate("analytics_performance_map");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-50 pb-4 pr-6">
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

      <div className="relative w-full h-36">
        <svg viewBox="0 0 500 120" className="w-full h-full">
          <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="55" x2="480" y2="55" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />

          <g className="cursor-pointer hover:opacity-80 transition-all">
            <rect x="55" y="30" width="25" height="15" fill="#3b82f6" />
            <rect x="55" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="55" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          <g className="cursor-pointer hover:opacity-80 transition-all">
            <rect x="125" y="35" width="25" height="12" fill="#3b82f6" />
            <rect x="125" y="47" width="25" height="18" fill="#5e53fc" />
            <rect x="125" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          <g className="cursor-pointer hover:opacity-80 transition-all">
            <rect x="195" y="28" width="25" height="17" fill="#3b82f6" />
            <rect x="195" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="195" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          <g className="cursor-pointer hover:opacity-80 transition-all">
            <rect x="265" y="33" width="25" height="14" fill="#3b82f6" />
            <rect x="265" y="47" width="25" height="18" fill="#5e53fc" />
            <rect x="265" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          <g className="cursor-pointer hover:opacity-80 transition-all">
            <rect x="335" y="25" width="25" height="20" fill="#3b82f6" />
            <rect x="335" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="335" y="65" width="25" height="25" fill="#14b8a6" />
          </g>
          <g className="cursor-pointer hover:opacity-80 transition-all">
            <rect x="405" y="30" width="25" height="15" fill="#3b82f6" />
            <rect x="405" y="45" width="25" height="20" fill="#5e53fc" />
            <rect x="405" y="65" width="25" height="25" fill="#14b8a6" />
          </g>

          <text x="67" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Jan</text>
          <text x="137" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Feb</text>
          <text x="207" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Mar</text>
          <text x="277" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Apr</text>
          <text x="347" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">May</text>
          <text x="417" y="105" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Jun</text>
        </svg>
      </div>

      <div className="flex justify-center gap-2 -mt-3">
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        </button>
        <button className="p-1 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[#5e53fc] rounded-2xl shadow-lg shadow-indigo-100 text-white flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
            <HugeiconsIcon icon={Shop} size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black leading-tight">1650</span>
            <span className="text-[11px] font-bold opacity-80">Total Subscriptions</span>
          </div>
        </div>

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

      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
        <button
          onClick={handleManage}
          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-[#5e53fc] font-bold rounded-2xl text-xs transition-all"
        >
          Manage Salons
        </button>
        <button
          onClick={handleAnalytics}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

// 5. Monthly Churn Rate Modal Content
function ChurnModalContent({ onNavigate, onClose }: ModalContentProps) {
  const handleRedirect = () => {
    onClose();
    onNavigate("analytics_performance_churn");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Monthly Churn Rate</h3>
        <p className="text-xs text-slate-400 mt-0.5">Customer retention and churn metrics</p>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-slate-800">7%</span>
        <span className="text-xs font-bold text-slate-400">August</span>
        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full ml-auto">
          Target: &lt; 5%
        </span>
      </div>

      <div className="relative w-full h-40 mt-2">
        <svg viewBox="0 0 500 120" className="w-full h-full">
          <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="55" x2="480" y2="55" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="30" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeWidth="1" />

          <path
            d="M 55 90 Q 125 70, 195 80 T 335 60 T 425 55 L 425 90 L 55 90 Z"
            fill="#f43f5e"
            fillOpacity="0.05"
          />

          <path
            d="M 55 90 Q 125 70, 195 80 T 335 60 T 425 55"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="cursor-pointer hover:stroke-rose-600 transition-all"
          />

          <circle cx="55" cy="90" r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" className="cursor-pointer hover:r-5 transition-all" />
          <circle cx="125" cy="74" r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" className="cursor-pointer hover:r-5 transition-all" />
          <circle cx="195" cy="80" r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" className="cursor-pointer hover:r-5 transition-all" />
          <circle cx="335" cy="62" r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" className="cursor-pointer hover:r-5 transition-all" />
          <circle cx="425" cy="55" r="4.5" fill="#f43f5e" stroke="#fff" strokeWidth="2" className="cursor-pointer hover:r-5 transition-all" />

          <text x="55" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Apr</text>
          <text x="125" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">May</text>
          <text x="195" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Jun</text>
          <text x="335" y="108" textAnchor="middle" className="text-[10px] font-semibold text-slate-400 fill-current">Jul</text>
          <text x="425" y="108" textAnchor="middle" className="text-[10px] font-bold text-rose-600 fill-current">Aug</text>
        </svg>
      </div>

      <div className="flex flex-col gap-3.5 mt-2 bg-slate-50/50 p-4 rounded-2xl">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Current Monthly Churn</span>
          <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-lg font-extrabold">7.0%</span>
        </div>
        <div className="w-full h-px bg-slate-100" />
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Customer Retention Rate</span>
          <span className="bg-[#e6fcf9] text-[#10b981] px-2.5 py-1 rounded-lg font-extrabold">93.0%</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRedirect}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4a3fdf] text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
