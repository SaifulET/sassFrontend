"use client";

import React, { useState } from "react";
import Image from "next/image";

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

  // Dynamic state for emails
  const [emails, setEmails] = useState(initialEmails);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [viewingEmail, setViewingEmail] = useState<typeof initialEmails[number] | null>(null);

  // Form states for send email
  const [emailSubject, setEmailSubject] = useState("");
  const [emailCategory, setEmailCategory] = useState("Sent");
  const [emailBody, setEmailBody] = useState("");
  const [emailType, setEmailType] = useState("Email");

  const handleSendEmail = () => {
    setEmailSubject("");
    setEmailBody("");
    setEmailCategory("Sent");
    setEmailType("Email");
    setIsSendModalOpen(true);
  };

  const handleViewEmail = (subject: string) => {
    const matched = emails.find(e => e.subject === subject);
    if (matched) {
      setViewingEmail(matched);
    }
  };

  const handleResendEmail = (subject: string) => {
    setEmails(prev => prev.map(e => e.subject === subject ? { ...e, category: "Sent", date: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }) } : e));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
      {/* Top Header Breadcrumbs Card */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex items-center justify-between w-full">
        <div className="text-base font-bold leading-none tracking-normal text-[#1f2937]">
          {salon.name}
        </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] w-full mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {/* Card 1: Total Emails */}
          <div
            className="flex flex-col items-start p-6 h-[138px] rounded-xl w-full"
            style={{ background: 'linear-gradient(180deg, rgba(99, 91, 255, 0.12) 0%, rgba(99, 91, 255, 0.03) 100%), #FFFFFF' }}
          >
            <div className="flex flex-col justify-center items-start p-0 gap-4 h-[90px] self-stretch">
              <div className="flex flex-row items-center p-0 gap-2 w-full h-[40px] self-stretch">
                <div>
                  <Image src="/totalEmail.svg" alt="Total Emails" width={41} height={41} />
                </div>
                <span className="text-[13px] font-semibold leading-[18px] text-[#29343D] flex-1">Total Emails</span>
              </div>
              <div className="flex flex-col justify-center items-start p-0 gap-2 w-full h-[34px] self-stretch">
                <span className="text-[28px] font-semibold leading-[120%] text-[#29343D]">24</span>
              </div>
            </div>
          </div>

          {/* Card 2: Opened */}
          <div
            className="flex flex-col items-start p-6 h-[138px] rounded-xl w-full"
            style={{ background: 'linear-gradient(180deg, rgba(22, 205, 199, 0.13) 0%, rgba(22, 205, 199, 0.03) 100%), #FFFFFF' }}
          >
            <div className="flex flex-col justify-center items-start p-0 gap-4 h-[90px] self-stretch">
              <div className="flex flex-row items-center p-0 gap-2 w-full h-[40px] self-stretch">
                <div>
                  <Image src="/openedEmail.svg" alt="Opened" width={41} height={41} />
                </div>
                <span className="text-[13px] font-semibold leading-[18px] text-[#29343D] flex-1">Opened</span>
              </div>
              <div className="flex flex-col justify-center items-start p-0 gap-2 w-full h-[34px] self-stretch">
                <span className="text-[28px] font-semibold leading-[120%] text-[#29343D]">18</span>
              </div>
            </div>
          </div>

          {/* Card 3: Clicked */}
          <div
            className="flex flex-col items-start p-6 h-[138px] rounded-xl w-full"
            style={{ background: 'linear-gradient(180deg, rgba(22, 205, 199, 0.13) 0%, rgba(22, 205, 199, 0.03) 100%), #FFFFFF' }}
          >
            <div className="flex flex-col justify-center items-start p-0 gap-4 h-[90px] self-stretch">
              <div className="flex flex-row items-center p-0 gap-2 w-full h-[40px] self-stretch">
                <div>
                  <Image src="/clickedEmail.svg" alt="Clicked" width={41} height={41} />
                </div>
                <span className="text-[13px] font-semibold leading-[18px] text-[#29343D] flex-1">Clicked</span>
              </div>
              <div className="flex flex-col justify-center items-start p-0 gap-2 w-full h-[34px] self-stretch">
                <span className="text-[28px] font-semibold leading-[120%] text-[#29343D]">10</span>
              </div>
            </div>
          </div>

          {/* Card 4: Failed */}
          <div
            className="flex flex-col items-start p-6 h-[138px] rounded-xl w-full"
            style={{ background: 'linear-gradient(180deg, rgba(255, 102, 146, 0.13) 0%, rgba(255, 102, 146, 0.03) 100%), #FFFFFF' }}
          >
            <div className="flex flex-col justify-center items-start p-0 gap-4 h-[90px] self-stretch">
              <div className="flex flex-row items-center p-0 gap-2 w-full h-[40px] self-stretch">
                <div>
                  <Image src="/failedEmail.svg" alt="Failed" width={41} height={41} />
                </div>
                <span className="text-[13px] font-semibold leading-[18px] text-[#29343D] flex-1">Failed</span>
              </div>
              <div className="flex flex-col justify-center items-start p-0 gap-2 w-full h-[34px] self-stretch">
                <span className="text-[28px] font-semibold leading-[120%] text-[#29343D]">1</span>
              </div>
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
        <div className="overflow-x-auto w-full">
          <div className="flex flex-row min-w-[1098px] rounded-xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
            {/* Column 1: Date */}
            <div className="flex flex-col flex-grow select-none" style={{ width: '191.5px' }}>
              {/* Header */}
              <div className="flex items-center px-[14px] bg-[#F3F3FF] border border-[#E0E6EB] rounded-tl-xl text-[#29343D] font-bold text-base h-[72px]">
                Date
              </div>
              {/* Cells */}
              {emails.map((item, idx) => {
                const isAlt = idx % 2 === 1;
                const isLast = idx === emails.length - 1;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-[14px] text-[#29343D] text-sm h-[72px] border-l border-r border-b border-[#E0E6EB] ${isAlt ? 'bg-[#FAFAFA]' : 'bg-white'} ${isLast ? 'rounded-bl-xl' : ''}`}
                  >
                    {item.date}
                  </div>
                );
              })}
            </div>

            {/* Column 2: Subject */}
            <div className="flex flex-col select-none" style={{ width: '192px' }}>
              {/* Header */}
              <div className="flex items-center px-[14px] bg-[#F3F3FF] border-t border-r border-b border-[#E0E6EB] text-[#29343D] font-bold text-base h-[72px]">
                Subject
              </div>
              {/* Cells */}
              {emails.map((item, idx) => {
                const isAlt = idx % 2 === 1;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col justify-center px-[14px] text-[#29343D] font-medium text-sm h-[72px] border-r border-b border-[#E0E6EB] ${isAlt ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                  >
                    {item.subject}
                  </div>
                );
              })}
            </div>

            {/* Column 3: Type */}
            <div className="flex flex-col flex-grow select-none" style={{ width: '191.5px' }}>
              {/* Header */}
              <div className="flex items-center px-[14px] bg-[#F3F3FF] border-t border-r border-b border-[#E0E6EB] text-[#29343D] font-bold text-base h-[72px]">
                Type
              </div>
              {/* Cells */}
              {emails.map((item, idx) => {
                const isAlt = idx % 2 === 1;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-[14px] h-[72px] border-r border-b border-[#E0E6EB] ${isAlt ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                  >
                    <div className="inline-flex items-center justify-center px-2 py-0.5 bg-[#ECFDFD] text-[#16CDC7] rounded-md text-xs font-semibold">
                      {item.type}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 4: Source */}
            <div className="flex flex-col flex-grow select-none" style={{ width: '191.5px' }}>
              {/* Header */}
              <div className="flex items-center px-[14px] bg-[#F3F3FF] border-t border-r border-b border-[#E0E6EB] text-[#29343D] font-bold text-base h-[72px]">
                Source
              </div>
              {/* Cells */}
              {emails.map((item, idx) => {
                const isAlt = idx % 2 === 1;
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-[14px] h-[72px] border-r border-b border-[#E0E6EB] ${isAlt ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                  >
                    <div className="inline-flex items-center justify-center px-2.5 py-1 bg-[#EFF4FA] text-[#0A2540] rounded-lg text-xs font-medium">
                      {item.source}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 5: Category */}
            <div className="flex flex-col flex-grow select-none" style={{ width: '191.5px' }}>
              {/* Header */}
              <div className="flex items-center px-[14px] bg-[#F3F3FF] border-t border-r border-b border-[#E0E6EB] text-[#29343D] font-bold text-base h-[72px]">
                Category
              </div>
              {/* Cells */}
              {emails.map((item, idx) => {
                const isAlt = idx % 2 === 1;
                const isSuccess = item.category === "Opened";
                return (
                  <div
                    key={idx}
                    className={`flex items-center px-[14px] h-[72px] border-r border-b border-[#E0E6EB] ${isAlt ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                  >
                    <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-semibold ${isSuccess ? 'bg-[#EBFAF0] text-[#36C76C]' : 'bg-[#ECFDFD] text-[#16CDC7]'}`}>
                      {item.category}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Column 6: Actions */}
            <div className="flex flex-col select-none" style={{ width: '140px' }}>
              {/* Header */}
              <div className="flex items-center px-[14px] bg-[#F3F3FF] border-t border-r border-b border-[#E0E6EB] rounded-tr-xl text-[#29343D] font-bold text-base h-[72px]">
                Actions
              </div>
              {/* Cells */}
              {emails.map((item, idx) => {
                const isAlt = idx % 2 === 1;
                const isLast = idx === emails.length - 1;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-end px-[14px] gap-4 h-[72px] border-r border-b border-[#E0E6EB] ${isAlt ? 'bg-[#FAFAFA]' : 'bg-white'} ${isLast ? 'rounded-br-xl' : ''}`}
                  >
                    <button
                      onClick={() => handleViewEmail(item.subject)}
                      className="w-12 h-9 flex items-center justify-center bg-[#F1F2FE] hover:bg-[#e4e2ff] rounded-lg transition-colors text-[#635BFF]"
                      title="View Details"
                    >
                      <ViewIcon />
                    </button>
                    <button
                      onClick={() => handleResendEmail(item.subject)}
                      className="w-12 h-9 flex items-center justify-center bg-[#ECFDFD] hover:bg-[#cffafe] rounded-lg transition-colors text-[#16CDC7]"
                      title="Resend Email"
                    >
                      <RefreshIcon />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Send Email Modal */}
      {isSendModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-[#0f172a]">Compose Email</h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!emailSubject) return;
                const newMail = {
                  date: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }),
                  subject: emailSubject,
                  type: emailType,
                  source: "Manual",
                  category: emailCategory
                };
                setEmails(prev => [newMail, ...prev]);
                setIsSendModalOpen(false);
              }}
              className="flex flex-col gap-4 text-sm"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Subject *</label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Invoice reminder"
                  className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Category</label>
                <select
                  value={emailCategory}
                  onChange={(e) => setEmailCategory(e.target.value)}
                  className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc] bg-white text-xs font-semibold"
                >
                  <option value="Sent">Sent</option>
                  <option value="Opened">Opened</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#334155] font-semibold text-xs">Message Body</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Dear customer, please find attached the details..."
                  className="min-h-[100px] border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-[#5e53fc] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsSendModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Email Details Modal */}
      {viewingEmail && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0f172a]">Email details</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Processed on {viewingEmail.date}</p>
            </div>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Subject</span>
                <span className="text-slate-800 text-sm font-extrabold">{viewingEmail.subject}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Source</span>
                  <span className="text-slate-700">{viewingEmail.source}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                  <span className="text-slate-700">{viewingEmail.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
              <button
                type="button"
                onClick={() => setViewingEmail(null)}
                className="px-5 py-2 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
