"use client";

import React, { useState } from "react";
import InvoiceDetailPage from "./InvoiceDetailPage";

// Custom icons to ensure match and prevent import path issues
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

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57.57" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
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

interface BillingHistoryPageProps {
  salon: Salon;
  onBack: () => void;
}

export default function BillingHistoryPage({ salon, onBack }: BillingHistoryPageProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
    }, 1500);
  };

  const handleExport = () => {
    const csvContent = `Invoice ID,Date,Description,Period,Amount,Method,Status
BILL__001,November 30, 2024,Premium,December 2024,EUR 299.00,Credit Card,Paid
BILL__002,November 30, 2024,Premium,December 2024,EUR 299.00,Credit Card,Paid
BILL__003,November 30, 2024,Premium,December 2024,EUR 299.00,Bank Transfer,Paid
`;
    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "billing_history_export.csv";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Mock billing history list matching the screenshot
  const invoices = [
    {
      id: "BILL__001",
      date: "November 30, 2024",
      description: "Premium",
      billingMonth: "December 2024",
      amount: "EUR 299,00",
      method: "Credit Card (*1234)",
      status: "Paid",
      employmentStatus: "Currently Hired"
    },
    {
      id: "BILL__002",
      date: "November 30, 2024",
      description: "Premium",
      billingMonth: "December 2024",
      amount: "EUR 299,00",
      method: "Credit Card (*1234)",
      status: "Paid",
      employmentStatus: "Currently Hired"
    },
    {
      id: "BILL__003",
      date: "November 30, 2024",
      description: "Premium",
      billingMonth: "December 2024",
      amount: "EUR 299,00",
      method: "Bank Transfer",
      status: "Paid",
      employmentStatus: "Out of Team: 02/02/2025"
    }
  ];

  if (selectedInvoiceId) {
    const selectedInvoice = invoices.find((inv) => inv.id === selectedInvoiceId);
    if (selectedInvoice) {
      return (
        <InvoiceDetailPage
          invoice={selectedInvoice}
          salon={salon}
          onBack={() => setSelectedInvoiceId(null)}
        />
      );
    }
  }

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

      {/* Main Billing Wrapper */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] flex flex-col p-8 w-full">
        {/* Title and top header buttons */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">Billing History</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eef2f6] hover:bg-slate-50 rounded-2xl text-xs font-semibold text-slate-600 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshIcon />
              <span>{retrying ? "Retrying..." : "Retry Failed"}</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#f2f1ff] hover:bg-[#e4e2ff] text-[#5e53fc] border border-[#e2dfff] rounded-2xl text-xs font-semibold transition-all shadow-sm"
            >
              <DownloadIcon />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Current Plan Cost */}
          <div className="bg-[#f5f3ff] rounded-3xl p-6 border border-[#e2dfff]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#5e53fc] text-white flex items-center justify-center shrink-0">
              <WalletIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current Plan Cost</span>
              <span className="text-2xl font-black text-slate-850">EUR 299</span>
            </div>
          </div>

          {/* Card 2: Next Billing Date */}
          <div className="bg-[#fff1f2] rounded-3xl p-6 border border-[#ffe4e6]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#ff4e73] text-white flex items-center justify-center shrink-0">
              <CalendarIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Next Billing Date</span>
              <span className="text-2xl font-black text-slate-850">August 22, 2025</span>
            </div>
          </div>

          {/* Card 3: Annual Value */}
          <div className="bg-[#ecfeff] rounded-3xl p-6 border border-[#cffafe]/40 flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-[#0891b2] text-white flex items-center justify-center shrink-0">
              <TrendingUpIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Annual Value</span>
              <span className="text-2xl font-black text-slate-850">EUR 3,588</span>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="border border-slate-100 rounded-2xl overflow-x-auto w-full bg-white">
          <table className="w-full min-w-[800px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#f5f4ff] border-b border-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Employment Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {invoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  {/* Date */}
                  <td className="px-6 py-4 font-semibold text-slate-700">{inv.date}</td>

                  {/* Description with Subtext */}
                  <td className="px-6 py-4 flex flex-col gap-1 items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#ecfeff] text-[#0891b2] uppercase tracking-wide">
                      {inv.description}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {inv.billingMonth}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-slate-800 font-bold">{inv.amount}</td>

                  {/* Payment Method */}
                  <td className="px-6 py-4 text-slate-500 font-semibold">{inv.method}</td>

                  {/* Status Capsule (Solid Green Background with White Text) */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[#10b981] text-white uppercase tracking-wider">
                      {inv.status}
                    </span>
                  </td>

                  {/* Employment Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      inv.employmentStatus === "Currently Hired"
                        ? "bg-[#eff6ff] text-[#2563eb]"
                        : "bg-[#fff1f2] text-[#ff4e73]"
                    }`}>
                      {inv.employmentStatus}
                    </span>
                  </td>

                  {/* Actions View Button */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedInvoiceId(inv.id)}
                      className="p-2 bg-[#f2f1ff] text-[#5e53fc] hover:bg-[#e2dfff] rounded-lg transition-colors inline-flex"
                      title="View Details"
                    >
                      <ViewIcon />
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
