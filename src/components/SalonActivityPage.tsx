"use client";

import React from "react";

// HomeIcon for breadcrumbs
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Icon 1: Upgrade / Cycle
const CycleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#5e53fc]">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57.57" />
  </svg>
);

// Icon 2: Add User
const AddUserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0891b2]">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="17" y1="11" x2="23" y2="11" />
  </svg>
);

// Icon 3: Login / Screen
const MonitorIcon = ({ className }: { className: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
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

interface SalonActivityPageProps {
  salon: Salon;
  onBack: () => void;
}

export default function SalonActivityPage({ salon, onBack }: SalonActivityPageProps) {
  // Mock activity logs matched exactly with screenshot
  const activities = [
    {
      type: "upgrade",
      title: "Plan Upgraded",
      description: "Upgraded from Basic to Premium plan",
      timestamp: "21/08/2025, 13:33:39",
      performer: "Super Admin (admin)",
      badgeBg: "bg-[#f2f1ff]",
      badgeText: "text-[#5e53fc]",
      iconBg: "bg-[#f5f3ff]",
      titleColor: "text-[#5e53fc]"
    },
    {
      type: "addUser",
      title: "User Added",
      description: "Added staff member Marco Verdi",
      timestamp: "21/08/2025, 13:33:39",
      performer: "Maria Rodriguez (user)",
      badgeBg: "bg-[#ecfeff]",
      badgeText: "text-[#0891b2]",
      iconBg: "bg-[#ecfeff]",
      titleColor: "text-[#0891b2]"
    },
    {
      type: "login",
      title: "Login",
      description: "Logged in from 192.168.1.1",
      timestamp: "21/08/2025, 13:33:39",
      performer: "Maria Rodriguez (system)",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-600",
      iconBg: "bg-slate-50",
      titleColor: "text-slate-800"
    },
    {
      type: "updateProfile",
      title: "Profile Updated",
      description: "Updated salon contact information",
      timestamp: "21/08/2025, 13:33:39",
      performer: "Maria Rodriguez (system)",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-600",
      iconBg: "bg-[#f0f9ff]",
      titleColor: "text-sky-500"
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
      {/* Top Header Breadcrumbs Card */}
      <div className="bg-white rounded-2xl border border-[#eef2f6] shadow-sm px-6 py-4 flex items-center justify-between w-full">
        <h1 className="text-sm font-bold text-slate-800">
          {salon.name}
        </h1>
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

      {/* Main Activity Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] flex flex-col p-8 w-full">
        {/* Title and Top Header Action Buttons */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">Activity Log</h2>
          <button
            onClick={() => alert("Exporting activity logs...")}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#f2f1ff] hover:bg-[#e4e2ff] text-[#5e53fc] border border-[#e2dfff] rounded-2xl text-xs font-semibold transition-all shadow-sm"
          >
            <DownloadIcon />
            <span>Export Data</span>
          </button>
        </div>

        {/* Activity Items List */}
        <div className="flex flex-col gap-4">
          {activities.map((act, index) => (
            <div
              key={index}
              className="bg-white border border-[#eef2f6] rounded-2xl p-6 flex items-center justify-between hover:shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-shadow duration-200"
            >
              {/* Left Side: Icon + Details */}
              <div className="flex items-center gap-5">
                {/* Icon Wrapper */}
                <div className={`w-11 h-11 rounded-full ${act.iconBg} flex items-center justify-center shrink-0`}>
                  {act.type === "upgrade" && <CycleIcon />}
                  {act.type === "addUser" && <AddUserIcon />}
                  {act.type === "login" && <MonitorIcon className="text-slate-500" />}
                  {act.type === "updateProfile" && <MonitorIcon className="text-sky-500" />}
                </div>

                {/* Text Block */}
                <div className="flex flex-col gap-0.5">
                  <span className={`text-sm font-bold ${act.titleColor}`}>{act.title}</span>
                  <span className="text-xs text-slate-500 font-semibold">{act.description}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{act.timestamp}</span>
                </div>
              </div>

              {/* Right Side: Performer Badge */}
              <span className={`px-4 py-2 rounded-full text-[10px] font-bold ${act.badgeBg} ${act.badgeText}`}>
                By: {act.performer}
              </span>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
