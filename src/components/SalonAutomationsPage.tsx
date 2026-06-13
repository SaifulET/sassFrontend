"use client";

import React, { useState } from "react";

// HomeIcon for breadcrumbs
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57.57" />
  </svg>
);

const PaperPlaneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// KPI icons
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MailOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 21.2L12 14.8 2 21.2V6.8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v14.4z" />
    <path d="M2 6.8l10 6.4 10-6.4" />
  </svg>
);

const MailCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9" />
    <polyline points="22 6 12 13 2 6" />
    <polyline points="16 19 18 21 22 17" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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

interface SalonAutomationsPageProps {
  salon: Salon;
  onBack: () => void;
}

export default function SalonAutomationsPage({ salon, onBack }: SalonAutomationsPageProps) {
  // State for selectors
  const [dateRange, setDateRange] = useState("All Time");
  const [source, setSource] = useState("All Sources");

  // Invoices list mapping matching screenshot
  const initialEmails = [
    {
      date: "08/08/2025 13:59",
      subject: "Payment expired",
      type: "Email",
      source: "Auto",
      category: "Opened"
    },
    {
      date: "08/08/2025 13:59",
      subject: "Credit card update",
      type: "Email",
      source: "Auto",
      category: "Opened"
    },
    {
      date: "08/08/2025 13:59",
      subject: "Invoice reminder",
      type: "Email",
      source: "Auto",
      category: "Sent"
    },
    {
      date: "08/08/2025 13:59",
      subject: "Welcome to SalonFlow",
      type: "Email",
      source: "Auto",
      category: "Sent"
    },
    {
      date: "08/08/2025 13:59",
      subject: "Premium features update",
      type: "Email",
      source: "Auto",
      category: "Sent"
    }
  ];

  const handleSendEmail = () => {
    alert("Initiating Send Email modal...");
  };

  const handleViewEmail = (subject: string) => {
    alert(`Viewing details of email: "${subject}"`);
  };

  const handleResendEmail = (subject: string) => {
    alert(`Resending email: "${subject}"`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
      {/* Top Header Breadcrumbs Card */}
      <div className="bg-white rounded-2xl border border-[#eef2f6] shadow-sm px-6 py-[19px] flex items-center justify-between w-full">
        <h1 className="font-bold text-[16px] leading-none tracking-normal text-slate-800">
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

      {/* Main Email Communications Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] flex flex-col p-8 w-full">
        {/* Title and Action Button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">Email Communications</h2>
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100"
          >
            <span>Send Email</span>
            <PaperPlaneIcon />
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Total Emails */}
          <div className="bg-[#f5f3ff] rounded-3xl p-6 border border-[#e2dfff]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#5e53fc] text-white flex items-center justify-center shrink-0">
              <MailIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Emails</span>
              <span className="text-2xl font-black text-slate-850">24</span>
            </div>
          </div>

          {/* Card 2: Opened */}
          <div className="bg-[#ecfeff] rounded-3xl p-6 border border-[#cffafe]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#0891b2] text-white flex items-center justify-center shrink-0">
              <MailOpenIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Opened</span>
              <span className="text-2xl font-black text-slate-850">18</span>
            </div>
          </div>

          {/* Card 3: Clicked */}
          <div className="bg-[#f0fdf4] rounded-3xl p-6 border border-[#dcfce7]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0">
              <MailCheckIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clicked</span>
              <span className="text-2xl font-black text-slate-850">10</span>
            </div>
          </div>

          {/* Card 4: Failed */}
          <div className="bg-[#fff1f2] rounded-3xl p-6 border border-[#ffe4e6]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#ff4d72] text-white flex items-center justify-center shrink-0">
              <AlertCircleIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Failed</span>
              <span className="text-2xl font-black text-slate-850">1</span>
            </div>
          </div>
        </div>

        {/* Filter Selectors Bar */}
        <div className="flex items-center gap-4 mb-6">
          {/* Data Range Selector */}
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Data Range</label>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-white border border-[#eef2f6] rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-[#5e53fc]"
              >
                <option value="All Time">All Time</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Source Selector */}
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Source</label>
            <div className="relative">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-white border border-[#eef2f6] rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-[#5e53fc]"
              >
                <option value="All Sources">All Sources</option>
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Emails Communications Table */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden w-full bg-white">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#f5f4ff] border-b border-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {initialEmails.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  {/* Date */}
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>

                  {/* Subject */}
                  <td className="px-6 py-4 text-slate-800 font-bold">{item.subject}</td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-[#ecfeff] text-[#0891b2]">
                      {item.type}
                    </span>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-slate-100 text-slate-650">
                      {item.source}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                      item.category === "Opened" ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-[#eff6ff] text-[#2563eb]"
                    }`}>
                      {item.category}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewEmail(item.subject)}
                      className="p-2 bg-[#f2f1ff] text-[#5e53fc] hover:bg-[#e4e2ff] rounded-lg transition-colors inline-flex"
                      title="View Details"
                    >
                      <ViewIcon />
                    </button>
                    <button
                      onClick={() => handleResendEmail(item.subject)}
                      className="p-2 bg-[#ecfeff] text-[#0891b2] hover:bg-[#cffafe] rounded-lg transition-colors inline-flex"
                      title="Resend Email"
                    >
                      <RefreshIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
