"use client";

import React, { useMemo, useState } from "react";
import InvoiceDetailPage from "./InvoiceDetailPage";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 1-15 6.7" />
    <path d="M3 12a9 9 0 0 1 15-6.7" />
    <path d="M18 2v4h-4" />
    <path d="M6 22v-4h4" />
  </svg>
);

const DownloadIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

const SyncIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4v6h6" />
    <path d="M20 20v-6h-6" />
    <path d="M20 9A8 8 0 0 0 6.2 5.2L4 10" />
    <path d="M4 15a8 8 0 0 0 13.8 3.8L20 14" />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
  </svg>
);

const RevenueIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="14" height="16" rx="3" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
    <path d="M9 16h3" />
  </svg>
);

const CardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 10h18" />
    <path d="M7 15h4" />
  </svg>
);

const StackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5" />
    <path d="m3 16.5 9 4.5 9-4.5" />
  </svg>
);

const FailedIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <path d="m7 15 4-4 3 3 5-7" />
  </svg>
);

type Plan = "Basic" | "Premium" | "Enterprise";
type BillingStatus = "Paid" | "Pending" | "Failed" | "Refunded";
type FilterStatus = "All Statuses" | BillingStatus;
type FilterPlan = "All Plans" | Plan;
type FilterTime = "All Time" | "This Month" | "Last Month" | "Custom...";
type ModalName = "plan" | "failed" | "report" | null;

interface BillingRecord {
  id: string;
  salon: string;
  legal: string;
  owner: string;
  city: string;
  email: string;
  invoice: string;
  plan: Plan;
  amount: string;
  status: BillingStatus;
  billingDate: string;
  dueDate: string;
  month: "This Month" | "Last Month";
  tag?: string;
  selected?: boolean;
}

interface FailedPayment {
  id: string;
  salon: string;
  method: string;
  plan: Plan;
  amount: string;
  dueDate: string;
  status: string;
}

const recordsSeed: BillingRecord[] = [
  { id: "rec-1", salon: "Beauty Wellness Center", legal: "SRL", owner: "Roberto Marini", city: "Bologna", email: "roberto@beautywellness.com", invoice: "INV-2024-001", plan: "Premium", amount: "299.00 €", status: "Paid", billingDate: "30/11/2024", dueDate: "30/11/2024", month: "This Month" },
  { id: "rec-2", salon: "Bella Vista Salon", legal: "SRL", owner: "Maria Rodriguez", city: "Milano", email: "maria@bellavista.com", invoice: "INV-2024-001", plan: "Basic", amount: "299.00 €", status: "Paid", billingDate: "30/11/2024", dueDate: "30/11/2024", month: "This Month", selected: true },
  { id: "rec-3", salon: "Elite Beauty Group S.p.A.", legal: "SPA", owner: "Dr. Marco Rossi", city: "Milano", email: "marco.rossi@elitebeauty.com", invoice: "INV-2024-001", plan: "Premium", amount: "299.00 €", status: "Failed", billingDate: "30/11/2024", dueDate: "30/11/2024", month: "Last Month", tag: "Insufficient..." },
  { id: "rec-4", salon: "Elite Beauty Group S.p.A.", legal: "SPA", owner: "Dr. Marco Rossi", city: "Milano", email: "marco.rossi@elitebeauty.com", invoice: "INV-2024-001", plan: "Premium", amount: "299.00 €", status: "Failed", billingDate: "30/11/2024", dueDate: "30/11/2024", month: "Last Month", tag: "Insufficient..." },
  { id: "rec-5", salon: "Elite Beauty Group S.p.A.", legal: "SPA", owner: "Dr. Marco Rossi", city: "Milano", email: "marco.rossi@elitebeauty.com", invoice: "INV-2024-001", plan: "Premium", amount: "299.00 €", status: "Failed", billingDate: "30/11/2024", dueDate: "30/11/2024", month: "Last Month" }
];

const failedPaymentsSeed: FailedPayment[] = [
  { id: "fail-1", salon: "Bella Vista Salon", method: "Credit Card", plan: "Premium", amount: "299.00 €", dueDate: "30/11/2024", status: "Insufficient funds" },
  { id: "fail-2", salon: "Urban Hair Studio", method: "Bank Transfer", plan: "Basic", amount: "299.00 €", dueDate: "30/11/2024", status: "Insufficient funds" },
  { id: "fail-3", salon: "Glamour Lounge", method: "Credit Card", plan: "Premium", amount: "299.00 €", dueDate: "30/11/2024", status: "Insufficient funds" }
];

const metricCards = [
  { title: "2025 Revenue", value: "47.850,00 €", note: "+20% from same period last year", icon: RevenueIcon, bg: "bg-[#eafffb]", iconBg: "bg-[#24c96b]", tone: "text-[#263241]" },
  { title: "Monthly Recurring Revenue", value: "23.925,00 €", note: "+11.6% from last month", icon: CardIcon, bg: "bg-[#f5f3ff]", iconBg: "bg-[#6a5cff]", tone: "text-[#263241]" },
  { title: "Total Active Subscriptions", value: "44", note: "+10% from last month", icon: StackIcon, bg: "bg-[#e7fbfb]", iconBg: "bg-[#00c9c9]", tone: "text-[#263241]" },
  { title: "Failed Payments", value: "8", note: "8 pending retry", icon: FailedIcon, bg: "bg-[#fff0f5]", iconBg: "bg-[#ff5f87]", tone: "text-[#ff4f82]" }
];

const planCards = [
  { name: "Basic", amount: "1.782,00 €", salons: "18 salons", color: "bg-[#21c7bd]", label: "bg-[#ddd8ff] text-[#5e53fc]", width: "56%" },
  { name: "Premium", amount: "6.279,00 €", salons: "21 salons", color: "bg-[#635bff]", label: "bg-[#d7f5ef] text-[#1ba886]", width: "72%" },
  { name: "Enterprise", amount: "4.792,00 €", salons: "8 salons", color: "bg-[#ff5f9c]", label: "bg-[#635bff] text-white", width: "67%" }
];

const distributionMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const distributionYears = ["2021", "2022", "2023", "2024", "2025", "2026"];

const downloadTextFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const AvatarMark = () => (
  <div className="h-10 w-10 overflow-hidden rounded-full bg-[#72829a]">
    <div className="h-full w-full bg-[radial-gradient(circle_at_52%_47%,#f46a72_0_31%,transparent_32%),repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0_6px,transparent_6px_12px)]" />
  </div>
);

const statusClass = (status: BillingStatus) => {
  if (status === "Paid") return "bg-[#dcfaec] text-[#1fc76a]";
  if (status === "Pending") return "bg-[#fff7df] text-[#efb629]";
  if (status === "Refunded") return "bg-[#eef3f8] text-[#758598]";
  return "bg-[#ffeaf1] text-[#ff4f82]";
};

const planClass = (plan: Plan) => {
  if (plan === "Basic") return "bg-[#eeeaff] text-[#6258ff]";
  if (plan === "Enterprise") return "bg-[#635bff] text-white";
  return "bg-[#d7f5ef] text-[#1ba886]";
};

interface FilterButtonProps {
  id: "status" | "plan" | "time";
  value: string;
  options: string[];
  openFilter: "status" | "plan" | "time" | null;
  setOpenFilter: (filter: "status" | "plan" | "time" | null) => void;
  onSelect: (value: string) => void;
  showNotice: (message: string) => void;
}

function FilterButton({ id, value, options, openFilter, setOpenFilter, onSelect, showNotice }: FilterButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(openFilter === id ? null : id)}
        className="flex h-9 min-w-[92px] items-center justify-between gap-2 rounded-lg border border-[#e9eef6] bg-white px-3 text-[11px] font-semibold text-[#67768a] transition-colors hover:bg-[#f7f9fc]"
      >
        <span>{value}</span>
        <ChevronDownIcon />
      </button>
      {openFilter === id && (
        <div className="absolute right-0 top-10 z-40 w-28 rounded-lg border border-[#edf1f6] bg-white py-2 text-left shadow-xl">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setOpenFilter(null);
                showNotice(`${option} filter applied`);
              }}
              className="block w-full px-3 py-1.5 text-left text-[11px] font-medium text-[#526174] hover:bg-[#f5f7fb]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanDistributionModal({
  view,
  setView,
  onClose,
  onAnalytics
}: {
  view: "monthly" | "yearly";
  setView: (view: "monthly" | "yearly") => void;
  onClose: () => void;
  onAnalytics: () => void;
}) {
  const labels = view === "monthly" ? distributionMonths : distributionYears;
  const axis = view === "monthly" ? ["EUR300.000", "EUR250.000", "EUR200.000", "EUR150.000", "EUR100.000", "EUR50.000"] : ["EUR3.0M", "EUR2.5M", "EUR2.0M", "EUR1.5M", "EUR1.0M", "EUR0.5M"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/25 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[980px] bg-white px-5 py-5 shadow-2xl sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[17px] font-bold text-[#253143]">Plan Distribution</h2>
            <p className="mt-3 text-[13px] font-semibold text-[#253143]">Revenue breakdown by subscription plan</p>
          </div>
          <button onClick={onClose} className="p-1 text-[#263241] transition-colors hover:text-[#635bff]" aria-label="Close">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2 text-[12px] font-medium text-[#526174]"><span className="h-2 w-2 rounded-full bg-[#c9f3ee]" />Basic Plan</span>
            <span className="flex items-center gap-2 text-[12px] font-medium text-[#526174]"><span className="h-2 w-2 rounded-full bg-[#d9d5f6]" />Premium Plan</span>
            <span className="flex items-center gap-2 text-[12px] font-medium text-[#526174]"><span className="h-2 w-2 rounded-full bg-[#635bff]" />Enterprise plan</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView("monthly")} className={`h-9 rounded-lg border px-5 text-[12px] font-semibold ${view === "monthly" ? "border-[#635bff] text-[#635bff]" : "border-[#edf1f6] text-[#253143]"}`}>Monthly View</button>
            <button onClick={() => setView("yearly")} className={`h-9 rounded-lg border px-5 text-[12px] font-semibold ${view === "yearly" ? "border-[#635bff] text-[#635bff]" : "border-[#edf1f6] text-[#253143]"}`}>Yearly View</button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-[72px_1fr] gap-4">
          <div className="flex h-[230px] flex-col justify-between pt-1 text-[11px] font-medium text-[#a6b2c0]">
            {axis.map((label) => <span key={label}>{label}</span>)}
          </div>
          <div className="relative h-[230px] border-l border-[#e9eef6]">
            <div className="absolute inset-0 flex flex-col justify-between">
              {axis.map((label) => <div key={label} className="h-px bg-[#edf1f6]" />)}
            </div>
            <div className="relative z-10 grid h-full grid-cols-6 items-end gap-6 px-5">
              {labels.map((label) => (
                <div key={label} className="flex h-full flex-col items-center justify-end gap-3">
                  <div className="flex h-[210px] w-full max-w-[126px] flex-col-reverse overflow-hidden rounded-t-md">
                    <div className="flex h-[48%] items-center justify-center bg-[#cbf3f0] text-[13px] font-semibold text-[#253143]">48%</div>
                    <div className="flex h-[32%] items-center justify-center bg-[#dddaf6] text-[13px] font-semibold text-[#253143]">32%</div>
                    <div className="flex h-[20%] items-center justify-center bg-[#635bff] text-[13px] font-semibold text-white">20%</div>
                  </div>
                  <span className="text-[11px] font-medium text-[#a6b2c0]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            ["Basic Plan", "20%", "text-[#635bff]"],
            ["Premium Plan", "32%", "text-[#00c9c9]"],
            ["Enterprise Plan", "48%", "text-[#635bff]"]
          ].map(([name, value, color]) => (
            <div key={name} className="rounded-xl bg-white px-6 py-5 shadow-[0_4px_12px_rgba(17,31,56,0.08)]">
              <div className="text-[13px] font-semibold text-[#253143]">{name}</div>
              <div className={`mt-4 text-[28px] font-extrabold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onAnalytics} className="flex h-11 items-center gap-2 rounded-lg bg-[#635bff] px-7 text-[13px] font-bold text-white shadow-[0_8px_18px_rgba(94,83,252,0.22)]">
            <AnalyticsIcon />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

function FailedPaymentsModal({
  payments,
  onClose,
  onExport,
  onRetry,
  showNotice
}: {
  payments: FailedPayment[];
  onClose: () => void;
  onExport: () => void;
  onRetry: (id: string) => void;
  showNotice: (message: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/35 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[930px] rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#253143]">Failed Payments</h2>
            <p className="mt-2 text-[12px] font-semibold text-[#253143]">Salons with failed payment attempts requiring attention</p>
          </div>
          <button onClick={onClose} className="p-1 text-[#253143]" aria-label="Close failed payments">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <button onClick={() => showNotice("Last 7 days filter applied")} className="mt-6 flex h-9 w-[118px] items-center justify-between rounded-lg border border-[#edf1f6] px-3 text-[10px] font-semibold text-[#526174]">
          Last 7 days
          <ChevronDownIcon />
        </button>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-[0_4px_14px_rgba(17,31,56,0.08)]"><div className="text-[11px] font-semibold">Failed Payments</div><div className="mt-5 text-[24px] font-bold text-[#ff4f82]">{payments.length}</div></div>
          <div className="rounded-xl bg-white p-5 shadow-[0_4px_14px_rgba(17,31,56,0.08)]"><div className="text-[11px] font-semibold">Pending Retry</div><div className="mt-5 text-[24px] font-bold text-[#ffc228]">0</div></div>
          <div className="rounded-xl bg-white p-5 shadow-[0_4px_14px_rgba(17,31,56,0.08)]"><div className="text-[11px] font-semibold">Lost Revenue</div><div className="mt-5 text-[24px] font-bold text-[#ff4f82]">€299</div></div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-[#e4e9f1]">
          <table className="w-full min-w-[760px] border-collapse text-left text-[11px]">
            <thead className="bg-[#f0efff]">
              <tr>
                <th className="px-4 py-4 font-bold">Salon</th>
                <th className="px-4 py-4 font-bold">Plan</th>
                <th className="px-4 py-4 font-bold">Amount</th>
                <th className="px-4 py-4 font-bold">Due Date</th>
                <th className="px-4 py-4 font-bold">Status</th>
                <th className="px-4 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e9f1]">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><AvatarMark /><div><div className="font-bold">{payment.salon}</div><div className="text-xs text-[#9aa7b8]">{payment.method}</div></div></div></td>
                  <td className="px-4 py-3"><span className={`${planClass(payment.plan)} rounded-md px-3 py-1 text-xs font-bold`}>{payment.plan}</span></td>
                  <td className="px-4 py-3">{payment.amount}</td>
                  <td className="px-4 py-3">{payment.dueDate}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-[#ffeaf1] px-3 py-1 text-xs font-bold text-[#ff4f82]">{payment.status}</span></td>
                  <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => showNotice(`${payment.salon} opened`)} className="flex h-8 w-10 items-center justify-center rounded-lg bg-[#635bff] text-white"><EyeIcon /></button><button onClick={() => onRetry(payment.id)} className="flex h-8 w-10 items-center justify-center rounded-lg bg-[#12c7bf] text-white"><RefreshIcon /></button><button onClick={() => showNotice(`Calling ${payment.salon}`)} className="flex h-8 w-10 items-center justify-center rounded-lg bg-[#42c6e8] text-white"><PhoneIcon /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onExport} className="flex h-10 items-center gap-2 rounded-lg bg-[#635bff] px-6 text-[12px] font-bold text-white"><DownloadIcon />Export</button>
        </div>
      </div>
    </div>
  );
}

function ReportModal({
  onClose,
  onExport
}: {
  onClose: () => void;
  onExport: (format: string) => void;
}) {
  const [formatOpen, setFormatOpen] = useState(false);
  const [format, setFormat] = useState("PDF");
  const [plan, setPlan] = useState("All");
  const [status, setStatus] = useState("All Status");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/35 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[360px] rounded-xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div><h2 className="text-[14px] font-bold text-[#253143]">Billing Records Report</h2><p className="mt-2 text-[11px] font-semibold text-[#526174]">Export detailed financial reports</p></div>
          <button onClick={onClose} aria-label="Close report" className="p-1 text-[#253143]">×</button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="text-[10px] font-semibold text-[#9aa7b8]">Data Range<div className="mt-2 flex h-9 w-full items-center justify-between rounded-lg border border-[#edf1f6] px-3 text-[10px] text-[#526174]"><span>Last 7 days</span><span>▣</span></div></label>
          <label className="text-[10px] font-semibold text-[#9aa7b8]">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 h-9 w-full rounded-lg border border-[#edf1f6] px-3 text-[10px] text-[#253143]"><option>All Status</option><option>Failed</option><option>Paid</option><option>Pending</option><option>Refunded</option></select></label>
        </div>
        <div className="mt-5 text-[10px] font-semibold text-[#9aa7b8]">Plan</div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {["All", "Basic", "Premium", "Enterprise"].map((item) => <button key={item} onClick={() => setPlan(item)} className={`h-9 rounded-lg border text-[10px] font-semibold ${plan === item ? "border-[#635bff] text-[#635bff]" : "border-[#edf1f6] text-[#253143]"}`}>{item}</button>)}
        </div>
        <div className="mt-20 flex justify-end">
          <span className="sr-only">Selected format: {format}. Status: {status}. Plan: {plan}</span>
          <div className="relative">
            <button onClick={() => setFormatOpen(!formatOpen)} className="flex h-10 items-center gap-2 rounded-lg bg-[#635bff] px-5 text-[11px] font-bold text-white">Export <ChevronDownIcon /></button>
            {formatOpen && <div className="absolute right-0 top-11 w-20 rounded-lg bg-white py-2 shadow-xl">{["PDF", "CSV", "XML"].map((item) => <button key={item} onClick={() => { setFormat(item); setFormatOpen(false); onExport(item); }} className="block w-full px-4 py-2 text-left text-[11px] hover:bg-[#f5f7fb]">{item}</button>)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BillingRevenuePage() {
  const [records, setRecords] = useState<BillingRecord[]>(recordsSeed);
  const [failedPayments, setFailedPayments] = useState<FailedPayment[]>(failedPaymentsSeed);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All Statuses");
  const [planFilter, setPlanFilter] = useState<FilterPlan>("All Plans");
  const [timeFilter, setTimeFilter] = useState<FilterTime>("All Time");
  const [openFilter, setOpenFilter] = useState<"status" | "plan" | "time" | null>(null);
  const [modal, setModal] = useState<ModalName>(null);
  const [distributionView, setDistributionView] = useState<"monthly" | "yearly">("monthly");
  const [notice, setNotice] = useState("Ready");
  const [lastSynced, setLastSynced] = useState("Just now");
  const [selectedInvoice, setSelectedInvoice] = useState<BillingRecord | null>(null);

  const filteredRecords = useMemo(() => records.filter((record) => {
    const matchesStatus = statusFilter === "All Statuses" || record.status === statusFilter;
    const matchesPlan = planFilter === "All Plans" || record.plan === planFilter;
    const matchesTime = timeFilter === "All Time" || timeFilter === "Custom..." || record.month === timeFilter;
    return matchesStatus && matchesPlan && matchesTime;
  }), [records, statusFilter, planFilter, timeFilter]);

  const showNotice = (message: string) => setNotice(message);

  const retryRecord = (id: string) => {
    setRecords((current) => current.map((record) => record.id === id && record.status === "Failed" ? { ...record, status: "Pending", tag: "Retry queued" } : record));
    showNotice("Payment retry queued");
  };

  const retryFailedPayment = (id: string) => {
    setFailedPayments((current) => current.filter((payment) => payment.id !== id));
    showNotice("Failed payment moved to retry queue");
  };

  const retryAllFailed = () => {
    setRecords((current) => current.map((record) => record.status === "Failed" ? { ...record, status: "Pending", tag: "Retry queued" } : record));
    setFailedPayments([]);
    showNotice("All failed payments moved to retry queue");
  };

  const exportFile = (filename: string, content: string) => {
    downloadTextFile(filename, content);
    showNotice(`${filename} exported`);
  };

  const syncPayments = () => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setLastSynced(now);
    showNotice(`Payments synced at ${now}`);
  };

  if (selectedInvoice) {
    return (
      <InvoiceDetailPage
        record={selectedInvoice}
        onBack={() => setSelectedInvoice(null)}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-5 text-left text-[#283442]">
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm font-extrabold text-[#1f2937]">Billing &amp; Revenue</div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-9 min-w-[230px] items-center gap-2 rounded-lg border border-[#e8edf5] bg-white px-3 text-[#8b99aa]"><SearchIcon /><input type="search" placeholder="Search" className="w-full bg-transparent text-xs font-medium outline-none" onChange={(event) => showNotice(event.target.value ? `Searching ${event.target.value}` : "Ready")} /></div>
            <button onClick={retryAllFailed} className="flex h-9 items-center gap-2 rounded-lg bg-[#f5f7fc] px-4 text-xs font-bold text-[#40516a]"><RefreshIcon />Reset Failed</button>
            <button onClick={() => exportFile("billing-records.csv", "Salon,Invoice,Plan,Amount,Status\n" + filteredRecords.map((record) => `${record.salon},${record.invoice},${record.plan},${record.amount},${record.status}`).join("\n"))} className="flex h-9 items-center gap-2 rounded-lg bg-[#edeaff] px-4 text-xs font-bold text-[#5e53fc]"><DownloadIcon />Export Data</button>
            <button onClick={syncPayments} className="flex h-9 items-center gap-2 rounded-lg bg-[#6557ff] px-5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(94,83,252,0.22)]"><SyncIcon />Sync Payments</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={`${card.bg} min-h-[172px] rounded-xl p-6`}>
              <div className={`${card.iconBg} mb-5 flex h-9 w-9 items-center justify-center rounded-lg text-white`}><Icon /></div>
              <div className="text-xs font-bold text-[#253143]">{card.title}</div>
              <div className={`mt-4 text-3xl font-extrabold ${card.tone}`}>{card.value}</div>
              <div className="mt-2 text-[11px] font-semibold text-[#263241]">{card.note}</div>
              <button onClick={() => card.title === "Failed Payments" ? setModal("failed") : showNotice(`${card.title} details opened`)} className="mt-5 rounded-md bg-white px-5 py-2 text-[11px] font-bold text-[#40516a] shadow-[0_5px_12px_rgba(17,31,56,0.08)]">View All</button>
            </div>
          );
        })}
      </div>

      <section className="rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex items-start justify-between gap-4">
          <div><h2 className="text-sm font-bold text-[#253143]">Plan Distribution</h2><p className="mt-1 text-xs font-medium text-[#9aa7b8]">Revenue breakdown by subscription plan</p></div>
          <button onClick={() => setModal("plan")} className="rounded-lg border border-[#635bff] px-4 py-2 text-[11px] font-bold text-[#635bff]">View All</button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {planCards.map((plan) => <button key={plan.name} onClick={() => { setPlanFilter(plan.name as Plan); showNotice(`${plan.name} plan selected`); }} className="rounded-xl border border-[#edf1f6] bg-white px-7 py-5 text-left shadow-[0_5px_14px_rgba(17,31,56,0.04)]"><div className="flex items-center justify-between"><div><div className="text-base font-extrabold">{plan.amount}</div><div className="mt-1 text-xs text-[#9aa7b8]">{plan.salons}</div></div><span className={`${plan.label} rounded-md px-3 py-1 text-[10px] font-bold`}>{plan.name}</span></div><div className="mt-5 h-2 rounded-full bg-[#edf1f6]"><div className={`${plan.color} h-2 rounded-full`} style={{ width: plan.width }} /></div></button>)}
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div><h2 className="text-sm font-bold">Billing Records</h2><p className="mt-1 text-xs text-[#9aa7b8]">Complete payment history and status</p></div>
          <div className="flex flex-wrap gap-3">
            <FilterButton id="status" value={statusFilter} options={["All Statuses", "Paid", "Pending", "Failed", "Refunded"]} openFilter={openFilter} setOpenFilter={setOpenFilter} showNotice={showNotice} onSelect={(value) => setStatusFilter(value as FilterStatus)} />
            <FilterButton id="plan" value={planFilter} options={["All Plans", "Basic", "Premium", "Enterprise"]} openFilter={openFilter} setOpenFilter={setOpenFilter} showNotice={showNotice} onSelect={(value) => setPlanFilter(value as FilterPlan)} />
            <FilterButton id="time" value={timeFilter} options={["All Time", "This Month", "Last Month", "Custom..."]} openFilter={openFilter} setOpenFilter={setOpenFilter} showNotice={showNotice} onSelect={(value) => setTimeFilter(value as FilterTime)} />
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-[#edf1f6]"><div className="max-h-[360px] overflow-auto"><table className="w-full min-w-[920px] border-collapse text-left text-xs"><thead className="sticky top-0 z-10 bg-[#f5f4ff]"><tr><th className="w-9 px-3 py-3"><input type="checkbox" aria-label="Select all records" /></th><th className="px-3 py-3">Salon</th><th className="px-3 py-3">Invoice</th><th className="px-3 py-3">Plan</th><th className="px-3 py-3">Amount</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Billing Date</th><th className="px-3 py-3">Due Date</th><th className="px-3 py-3 text-center">Actions</th></tr></thead><tbody className="divide-y divide-[#edf1f6]">{filteredRecords.map((record) => <tr key={record.id} className={`${record.selected ? "bg-[#f3f1ff]" : "bg-white"} hover:bg-[#f9fbfe]`}><td className="px-3 py-3"><input type="checkbox" defaultChecked={record.selected} aria-label={`Select ${record.salon}`} /></td><td className="px-3 py-3"><div className="flex items-center gap-3"><AvatarMark /><div><div className="flex items-center gap-2"><span className="font-extrabold">{record.salon}</span><span className="rounded-full border px-1.5 py-0.5 text-[8px]">{record.legal}</span></div><div className="text-[10px] text-[#8190a4]">{record.owner} &bull; {record.city}</div><div className="text-[10px] text-[#a4afbd]">{record.email}</div></div></div></td><td className="px-3 py-3">{record.invoice}</td><td className="px-3 py-3"><span className={`${planClass(record.plan)} rounded-md px-2 py-1 text-[10px] font-bold`}>{record.plan}</span></td><td className="px-3 py-3">{record.amount}</td><td className="px-3 py-3"><span className={`${statusClass(record.status)} rounded-md px-2 py-1 text-[10px] font-bold`}>{record.status}</span>{record.tag && <div className="mt-1 text-[10px] text-[#ff4f82]">{record.tag}</div>}</td><td className="px-3 py-3">{record.billingDate}</td><td className="px-3 py-3">{record.dueDate}</td><td className="px-3 py-3"><div className="flex justify-center gap-2"><button onClick={() => setSelectedInvoice(record)} className="flex h-8 w-10 items-center justify-center rounded-lg bg-[#eeedff] text-[#635bff]" title="View Invoice"><EyeIcon /></button><button onClick={() => setSelectedInvoice(record)} className="flex h-8 w-10 items-center justify-center rounded-lg bg-[#eeedff] text-[#635bff]" title="Open Details"><DownloadIcon /></button><button onClick={() => retryRecord(record.id)} className="flex h-8 w-10 items-center justify-center rounded-lg bg-[#e9fbfc] text-[#00c4cb]"><RefreshIcon /></button></div></td></tr>)}</tbody></table></div></div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="relative rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]"><button onClick={() => setModal("failed")} className="absolute right-5 top-0 rounded-b-lg bg-[#635bff] px-8 py-2 text-[11px] font-bold text-white">View Details</button><div className="text-sm font-bold">Recent Failed Payments</div><p className="mt-1 text-xs text-[#9aa7b8]">{failedPayments.length || 1} payments require attention</p><button onClick={() => setModal("failed")} className="mt-4 flex h-8 w-10 items-center justify-center rounded-lg bg-[#eeedff] text-[#635bff]"><EyeIcon /></button><button onClick={retryAllFailed} className="mt-4 h-10 w-full rounded-lg bg-[#ddd8ff] text-xs font-bold text-[#635bff]">Retry All Failed Payments</button></section>
        <section className="rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]"><div className="text-sm font-bold">Pending Payments</div><p className="mt-1 text-xs text-[#9aa7b8]">8 payments in progress</p><button onClick={() => setStatusFilter("Pending")} className="mt-12 h-10 w-full rounded-lg bg-[#edf3fa] text-xs font-bold text-[#40516a]">Review Pending Payments</button></section>
        <section className="rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]"><div className="text-sm font-bold">Billing Records Report</div><p className="mt-1 text-xs text-[#9aa7b8]">Export detailed financial reports</p><button onClick={() => setModal("report")} className="mt-12 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#edf3fa] text-xs font-bold text-[#40516a]"><DownloadIcon />Generate Report</button></section>
      </div>

      <div className="fixed bottom-5 right-5 z-40 rounded-xl bg-[#253143] px-4 py-3 text-xs font-semibold text-white shadow-2xl">{notice} <span className="ml-2 text-[#a7b3c4]">Last sync: {lastSynced}</span></div>

      {modal === "plan" && <PlanDistributionModal view={distributionView} setView={(view) => { setDistributionView(view); showNotice(`${view} distribution selected`); }} onClose={() => setModal(null)} onAnalytics={() => { setModal(null); setPlanFilter("Enterprise"); showNotice("Enterprise analytics view applied"); }} />}
      {modal === "failed" && <FailedPaymentsModal payments={failedPayments} onClose={() => setModal(null)} onExport={() => exportFile("failed-payments.csv", failedPayments.map((payment) => `${payment.salon},${payment.amount},${payment.status}`).join("\n"))} onRetry={retryFailedPayment} showNotice={showNotice} />}
      {modal === "report" && <ReportModal onClose={() => setModal(null)} onExport={(format) => exportFile(`billing-report.${format.toLowerCase()}`, `Billing report (${format})`)} />}
    </div>
  );
}
