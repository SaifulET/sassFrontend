import React from "react";

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <polyline points="21 3 21 8 16 8" />
  </svg>
);

interface AnalyticsHeaderProps {
  title?: string;
  setActiveTab?: (tab: string) => void;
  onResync: () => void;
}

export default function AnalyticsHeader({
  title = "Analytics",
  setActiveTab,
  onResync
}: AnalyticsHeaderProps) {
  return (
    <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("dashboard")}
            className="w-10 h-10 rounded-2xl bg-white border border-[#eef2f6] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm shrink-0"
            title="Back to Dashboard"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-sm font-extrabold text-[#1f2937] truncate">{title}</h1>
        </div>

        <button
          type="button"
          onClick={onResync}
          className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(94,83,252,0.22)] transition-all duration-150 shrink-0"
        >
          <RefreshIcon /> <span>Resync</span>
        </button>
      </div>
    </div>
  );
}
