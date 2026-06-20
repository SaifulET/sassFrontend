"use client";
import React, { useMemo, useState, useCallback } from "react";

type ChartMode = "line" | "bar";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";
type TabType = "Customer Churn" | "Net MRR Churn" | "MRR Churn";

type ChartPoint = { label: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

// ---- Dynamic Data Sets for Churn ----

// Customer Churn points (Monthly)
const customerChurnMonthly: ChartPoint[] = [
  { label: "Jan", value: 43000 },
  { label: "Feb", value: 53000 },
  { label: "Mar", value: 45000 },
  { label: "Apr", value: 35000 },
  { label: "May", value: 30000 },
  { label: "Jun", value: 53000 },
  { label: "Jul", value: 45000 },
  { label: "Aug", value: 35000 },
  { label: "Sep", value: 32000 },
];

const customerChurnYearly: ChartPoint[] = [
  { label: "2023", value: 35000 },
  { label: "2024", value: 48000 },
  { label: "2025", value: 62000 },
];

const customerChurnCustomRange: ChartPoint[] = [
  { label: "2023", value: 38000 },
  { label: "2024", value: 52000 },
  { label: "2025", value: 68000 },
];

// Net Churn points
const netMRRChurnMonthly: ChartPoint[] = [
  { label: "Jan", value: 25000 },
  { label: "Feb", value: 32000 },
  { label: "Mar", value: 56000 },
  { label: "Apr", value: 42000 },
  { label: "May", value: 24000 },
  { label: "Jun", value: 39000 },
  { label: "Jul", value: 52000 },
  { label: "Aug", value: 42000 },
  { label: "Sep", value: 34000 },
];

const netMRRChurnYearly: ChartPoint[] = [
  { label: "2023", value: 28000 },
  { label: "2024", value: 42000 },
  { label: "2025", value: 55000 },
];

const netMRRChurnCustomRange: ChartPoint[] = [
  { label: "2023", value: 30000 },
  { label: "2024", value: 46000 },
  { label: "2025", value: 59000 },
];

// MRR Churn points
const mrrChurnMonthly: ChartPoint[] = [
  { label: "Jan", value: 43000 },
  { label: "Feb", value: 57000 },
  { label: "Mar", value: 52000 },
  { label: "Apr", value: 40000 },
  { label: "May", value: 30000 },
  { label: "Jun", value: 48000 },
  { label: "Jul", value: 57000 },
  { label: "Aug", value: 38000 },
  { label: "Sep", value: 34000 },
];

const mrrChurnYearly: ChartPoint[] = [
  { label: "2023", value: 40000 },
  { label: "2024", value: 50000 },
  { label: "2025", value: 60000 },
];

const mrrChurnCustomRange: ChartPoint[] = [
  { label: "2023", value: 42000 },
  { label: "2024", value: 54000 },
  { label: "2025", value: 65000 },
];

// Table Data - Monthly Breakdown
const monthlyTableRows = [
  { month: "Jan 2025", churnRateAmt: "-", churnRateChg: "(3.72%)", churnDeltaAmt: "€ 297", churnDeltaChg: "(3.72%)", mrrRateAmt: "-", mrrRateChg: "(3.72%)", mrrDeltaAmt: "€ 297", mrrDeltaChg: "(3.72%)", netRateAmt: "-", netRateChg: "(3.72%)", lYearAmt: "-", lYearChg: "(3.72%)", plan: "Basic", city: "Rome" },
  { month: "Feb 2025", churnRateAmt: "-", churnRateChg: "(3.72%)", churnDeltaAmt: "€ 297", churnDeltaChg: "(3.72%)", mrrRateAmt: "-", mrrRateChg: "(3.72%)", mrrDeltaAmt: "€ 297", mrrDeltaChg: "(3.72%)", netRateAmt: "-", netRateChg: "(3.72%)", lYearAmt: "-", lYearChg: "(3.72%)", plan: "Premium", city: "Milano" },
  { month: "Mar 2025", churnRateAmt: "-", churnRateChg: "(3.72%)", churnDeltaAmt: "€ 297", churnDeltaChg: "(3.72%)", mrrRateAmt: "-", mrrRateChg: "(3.72%)", mrrDeltaAmt: "€ 297", mrrDeltaChg: "(3.72%)", netRateAmt: "-", netRateChg: "(3.72%)", lYearAmt: "-", lYearChg: "(3.72%)", plan: "Enterprise", city: "Bologna" },
  { month: "Apr 2025", churnRateAmt: "-", churnRateChg: "(3.72%)", churnDeltaAmt: "€ 297", churnDeltaChg: "(3.72%)", mrrRateAmt: "-", mrrRateChg: "(3.72%)", mrrDeltaAmt: "€ 297", mrrDeltaChg: "(3.72%)", netRateAmt: "-", netRateChg: "(3.72%)", lYearAmt: "-", lYearChg: "(3.72%)", plan: "Premium", city: "Rome" },
];

// Table Data - Yearly Breakdown
const yearlyTableRows = [
  { month: "2023", churnRateAmt: "-", churnRateChg: "(3.12%)", churnDeltaAmt: "€ 1,120", churnDeltaChg: "(3.12%)", mrrRateAmt: "-", mrrRateChg: "(3.12%)", mrrDeltaAmt: "€ 1,120", mrrDeltaChg: "(3.12%)", netRateAmt: "-", netRateChg: "(3.12%)", lYearAmt: "-", lYearChg: "(3.12%)", plan: "Basic", city: "Rome" },
  { month: "2024", churnRateAmt: "-", churnRateChg: "(3.50%)", churnDeltaAmt: "€ 1,180", churnDeltaChg: "(3.50%)", mrrRateAmt: "-", mrrRateChg: "(3.50%)", mrrDeltaAmt: "€ 1,180", mrrDeltaChg: "(3.50%)", netRateAmt: "-", netRateChg: "(3.50%)", lYearAmt: "-", lYearChg: "(3.50%)", plan: "Premium", city: "Milano" },
  { month: "2025", churnRateAmt: "-", churnRateChg: "(3.72%)", churnDeltaAmt: "€ 1,290", churnDeltaChg: "(3.72%)", mrrRateAmt: "-", mrrRateChg: "(3.72%)", mrrDeltaAmt: "€ 1,290", mrrDeltaChg: "(3.72%)", netRateAmt: "-", netRateChg: "(3.72%)", lYearAmt: "-", lYearChg: "(3.72%)", plan: "Enterprise", city: "Bologna" },
];

// Table Data - Custom Year (2023-2025)
const customYearTableRows = [
  { month: "2023 (Custom)", churnRateAmt: "-", churnRateChg: "(3.20%)", churnDeltaAmt: "€ 950", churnDeltaChg: "(3.20%)", mrrRateAmt: "-", mrrRateChg: "(3.20%)", mrrDeltaAmt: "€ 950", mrrDeltaChg: "(3.20%)", netRateAmt: "-", netRateChg: "(3.20%)", lYearAmt: "-", lYearChg: "(3.20%)", plan: "Basic", city: "Bologna" },
  { month: "2024 (Custom)", churnRateAmt: "-", churnRateChg: "(3.62%)", churnDeltaAmt: "€ 990", churnDeltaChg: "(3.62%)", mrrRateAmt: "-", mrrRateChg: "(3.62%)", mrrDeltaAmt: "€ 990", mrrDeltaChg: "(3.62%)", netRateAmt: "-", netRateChg: "(3.62%)", lYearAmt: "-", lYearChg: "(3.62%)", plan: "Premium", city: "Rome" },
  { month: "2025 (Custom)", churnRateAmt: "-", churnRateChg: "(3.90%)", churnDeltaAmt: "€ 1,020", churnDeltaChg: "(3.90%)", mrrRateAmt: "-", mrrRateChg: "(3.90%)", mrrDeltaAmt: "€ 1,020", mrrDeltaChg: "(3.90%)", netRateAmt: "-", netRateChg: "(3.90%)", lYearAmt: "-", lYearChg: "(3.90%)", plan: "Enterprise", city: "Milano" },
];

// Dynamic cell tooltip details matching visual design
function TableCellHoverCard({ date }: { date: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-manrope font-semibold text-[11px] text-[#29343D] border-b border-[#EFF4FA] pb-1 block">
        {date}
      </span>
      <div className="flex flex-col gap-1 text-[10.5px] font-semibold text-[#29343D]">
        <div className="flex justify-between gap-4">
          <span>Customer Churn Rate</span>
          <span className="text-[#7e8b9b]">3%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>MRR Churn Rate</span>
          <span className="text-[#7e8b9b]">3%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Net MRR Churn Rate</span>
          <span className="text-[#7e8b9b]">3%</span>
        </div>
      </div>
    </div>
  );
}

// Local helper components for UI
interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string | React.ReactNode;
  subtitleClass?: string;
}

function StatCard({ title, value, subtitle, subtitleClass = "text-[#29343D]" }: StatCardProps) {
  return (
    <div className="box-sizing-border-box flex flex-col justify-center items-center p-6 gap-1 h-[147px] bg-white rounded-xl bg-white shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-1 min-w-0">
      <span className="font-manrope font-semibold text-[13px] leading-[18px] text-[#29343D] text-center">{title}</span>
      <span className="font-manrope font-semibold text-[24px] leading-[29px] text-[#29343D] text-center mt-1">{value}</span>
      {subtitle && (
        <span className={`font-manrope font-semibold text-[13px] leading-[18px] text-center mt-1 ${subtitleClass}`}>
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default function ChurnPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [activeSubTab, setActiveSubTab] = useState<TabType>("Customer Churn");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filters state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [planFilter, setPlanFilter] = useState<"All" | "Basic" | "Premium" | "Enterprise">("All");
  const [cityFilter, setCityFilter] = useState("All cities");
  const [churnSort, setChurnSort] = useState<"Highest to Lowest" | "Lowest to Highest">("Highest to Lowest");

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const activeColor = activeSubTab === "Customer Churn" ? "#FF6692" : "#16CDC7";

  const series = useMemo(() => {
    if (activeSubTab === "Net MRR Churn") {
      if (timeRange === "Yearly") return netMRRChurnYearly;
      if (timeRange === "2023-2025") return netMRRChurnCustomRange;
      return netMRRChurnMonthly;
    }
    if (activeSubTab === "MRR Churn") {
      if (timeRange === "Yearly") return mrrChurnYearly;
      if (timeRange === "2023-2025") return mrrChurnCustomRange;
      return mrrChurnMonthly;
    }
    // Customer Churn default
    if (timeRange === "Yearly") return customerChurnYearly;
    if (timeRange === "2023-2025") return customerChurnCustomRange;
    return customerChurnMonthly;
  }, [activeSubTab, timeRange]);

  const count = series.length;
  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  const yLabels = ["70k", "60k", "50k", "40k", "30k", "20k"];

  const getY = (val: number) => {
    return H - PY - ((val - 20000) / 50000) * (H - PY * 2);
  };

  const pts: PositionedPoint[] = series.map((p, i) => {
    const x = PX + (i * (W - PX * 2)) / Math.max(count - 1, 1);
    const y = getY(p.value);
    return { ...p, x, y };
  });

  const buildPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    const d = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 0; i < points.length - 1; i++) {
      const c = points[i], n = points[i + 1];
      const p = points[i - 1] ?? c, a = points[i + 2] ?? n;
      d.push(`C ${c.x + (n.x - p.x) / 5} ${c.y + (n.y - p.y) / 5}, ${n.x - (a.x - c.x) / 5} ${n.y - (a.y - c.y) / 5}, ${n.x} ${n.y}`);
    }
    return d.join(" ");
  };

  const buildAreaPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    const d = [`M ${points[0].x} ${H - PY}`];
    d.push(`L ${points[0].x} ${points[0].y}`);
    for (let i = 0; i < points.length - 1; i++) {
      const c = points[i], n = points[i + 1];
      const p = points[i - 1] ?? c, a = points[i + 2] ?? n;
      d.push(`C ${c.x + (n.x - p.x) / 5} ${c.y + (n.y - p.y) / 5}, ${n.x - (a.x - c.x) / 5} ${n.y - (a.y - c.y) / 5}, ${n.x} ${n.y}`);
    }
    d.push(`L ${points[points.length - 1].x} ${H - PY}`);
    d.push("Z");
    return d.join(" ");
  };

  const linePath = buildPath(pts);
  const areaPath = buildAreaPath(pts);

  const hovered = hoveredIndex !== null;
  const hPt = hovered ? pts[hoveredIndex!] : null;

  const tipX = hPt?.x ?? 0;
  const tipY = hPt?.y ?? 0;

  const barW = Math.min(Math.max(((W - PX * 2) / Math.max(count, 1)) * 0.45, 20), 48);

  const isTransposed = activeSubTab === "Net MRR Churn" || activeSubTab === "MRR Churn";

  // Filter and Sort Table Rows dynamically
  const filteredTableRows = useMemo(() => {
    let rows = [...monthlyTableRows];
    if (timeRange === "Yearly") rows = [...yearlyTableRows];
    if (timeRange === "2023-2025") rows = [...customYearTableRows];

    // Filter by Plan
    if (planFilter !== "All") {
      rows = rows.filter((r) => r.plan === planFilter);
    }
    // Filter by City
    if (cityFilter !== "All cities") {
      rows = rows.filter((r) => r.city === cityFilter);
    }
    // Sort
    rows.sort((a, b) => {
      const amtA = a.churnDeltaAmt !== "-" ? parseFloat(a.churnDeltaAmt.replace("€", "").replace(",", "").trim()) : 0;
      const amtB = b.churnDeltaAmt !== "-" ? parseFloat(b.churnDeltaAmt.replace("€", "").replace(",", "").trim()) : 0;
      return churnSort === "Highest to Lowest" ? amtB - amtA : amtA - amtB;
    });

    return rows;
  }, [timeRange, planFilter, cityFilter, churnSort]);

  const exportRows = useMemo(() => {
    if (activeSubTab === "Customer Churn") {
      return [
        { label: "Current Customer Churn Rate", value: "4%" },
        { label: "Change vs Last Period", value: timeRange === "Monthly" ? "€ 297 (4%)" : "€ 1,200 (3.5%)" },
        { label: "Current MRR Churn Rate", value: "3%" },
        { label: "Current Net MRR Churn Rate", value: "5%" },
        { label: "Best Churn Period", value: timeRange === "Monthly" ? "2% (March)" : "2023" },
      ];
    }
    return [
      { label: "Average Customer Churn Rate", value: "4%" },
      { label: "Average MRR Churn Rate", value: "3%" },
      { label: "Average Net MRR Churn Rate", value: "5%" },
    ];
  }, [activeSubTab, timeRange]);

  return (
    <div className="w-full min-w-0">
      <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header toolbar */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("dashboard")}
            className="w-10 h-10 rounded-2xl bg-white border border-[#eef2f6] flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-sm font-extrabold text-[#1f2937]">Analytics</h1>
        </div>

          <button
            type="button"
            onClick={() => {
              setActiveSubTab("Customer Churn");
              setTimeRange("Monthly");
              setPlanFilter("All");
              setCityFilter("All cities");
            }}
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-medium text-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <polyline points="21 3 21 8 16 8" />
            </svg>
            Resync
          </button>
        </div>
      </div>

        {/* Chart Panel */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
                Churn
              </h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`inline-flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-semibold transition-all ${
                  filtersOpen ? "bg-[#635BFF] text-white" : "bg-[#EFF4FA] hover:bg-[#E2EAF2] text-[#0A2540]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="2" y1="14" x2="6" y2="14" />
                  <line x1="10" y1="8" x2="14" y2="8" />
                  <line x1="18" y1="16" x2="22" y2="16" />
                </svg>
                Filter
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Time range dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimeRangeOpen((v) => !v)}
                  className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 text-[12px] font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
                >
                  {timeRange}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A2540]">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {timeRangeOpen && (
                  <div className="absolute right-0 top-[42px] z-30 w-[160px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)]">
                    {timeRangeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setTimeRange(opt);
                          setTimeRangeOpen(false);
                        }}
                        className={`flex h-9 w-full items-center rounded-[8px] px-3 text-[12px] font-semibold ${
                          timeRange === opt ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chart Mode Toggle */}
              <button
                type="button"
                onClick={() => setChartMode((m) => (m === "line" ? "bar" : "line"))}
                className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-4 text-[12px] font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
              >
                Change Chart View
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1C274C]">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="inline-flex h-9 items-center rounded-[8px] border border-[#635BFF] bg-white px-4 text-[12px] font-semibold text-[#635BFF] hover:bg-[#F1F2FE]"
              >
                Export Data
              </button>
            </div>
          </div>

          {/* Toggle filter selections */}
          {filtersOpen && (
            <div className="flex flex-wrap items-center gap-4 bg-[#F5F8FC]/50 p-4 rounded-[12px] text-[12px] border border-[#EFF4FA] mt-4 mb-2 animate-in slide-in-from-top-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-[#b0bac9] uppercase">Subscription Plan</span>
                <div className="flex items-center gap-1 bg-[#F5F8FC] p-1 rounded-[10px] border border-slate-100">
                  {(["All", "Basic", "Premium", "Enterprise"] as const).map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => setPlanFilter(plan)}
                      className={`px-3 py-1 rounded-[8px] font-semibold transition-all ${
                        planFilter === plan ? "bg-white text-[#635BFF] shadow-sm" : "text-[#7e8b9b] hover:text-[#29343D]"
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-[#b0bac9] uppercase">City</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setCityDropdownOpen(!cityDropdownOpen);
                      setSortDropdownOpen(false);
                    }}
                    className="inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
                  >
                    {cityFilter}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {cityDropdownOpen && (
                    <div className="absolute left-0 top-[38px] z-30 w-[150px] rounded-[10px] bg-white p-1.5 shadow-lg border border-slate-150">
                      {["All cities", "Rome", "Milano", "Bologna"].map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setCityFilter(city);
                            setCityDropdownOpen(false);
                          }}
                          className={`flex h-8 w-full items-center rounded-[6px] px-2.5 font-medium ${
                            cityFilter === city ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-[#b0bac9] uppercase">Sort by Delta Change</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSortDropdownOpen(!sortDropdownOpen);
                      setCityDropdownOpen(false);
                    }}
                    className="inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
                  >
                    {churnSort}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {sortDropdownOpen && (
                    <div className="absolute left-0 top-[38px] z-30 w-[170px] rounded-[10px] bg-white p-1.5 shadow-lg border border-slate-150">
                      {["Highest to Lowest", "Lowest to Highest"].map((sortOption) => (
                        <button
                          key={sortOption}
                          type="button"
                          onClick={() => {
                            setChurnSort(sortOption as any);
                            setSortDropdownOpen(false);
                          }}
                          className={`flex h-8 w-full items-center rounded-[6px] px-2.5 font-medium ${
                            churnSort === sortOption ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                          }`}
                        >
                          {sortOption}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subtab selection */}
          <div className="flex border-b border-[#EFF4FA] gap-8 mb-6 mt-4">
            {(["Customer Churn", "Net MRR Churn", "MRR Churn"] as const).map((tab) => {
              const isActive = activeSubTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveSubTab(tab)}
                  className={`pb-3 text-sm font-semibold transition-all relative ${
                    isActive ? "text-[#635BFF]" : "text-[#7e8b9b] hover:text-[#29343D]"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* SVG Trend Line / Bar Chart */}
          <div className="pb-4">
            <div className="relative w-full select-none">
              <div className="relative w-full min-w-0 h-[264px]">
                {/* Y-axis */}
                <div className="absolute left-0 flex h-[228px] w-[34px] flex-col justify-between p-0 items-start top-0">
                  {yLabels.map((l) => (
                    <span
                      key={l}
                      className="w-[34px] h-[15.35px] font-manrope font-normal text-[11.3951px] leading-[15px] text-center text-[#98A4AE] self-stretch"
                    >
                      {l}
                    </span>
                  ))}
                </div>

                {/* Chart area */}
                <div className="absolute left-[35px] right-0 overflow-visible bg-transparent top-[0.35px] h-[227.55px]">
                  {/* Grid lines */}
                  <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`}>
                    {Array.from({ length: 6 }, (_, i) => {
                      const y = PY + (i / 5) * (H - PY * 2);
                      return <line key={i} x1={0} y1={y} x2={W} y2={y} stroke="#F6F7F9" strokeWidth="0.949594" />;
                    })}
                    {chartMode !== "bar" && series.map((_, i) => {
                      const x = PX + (i * (W - PX * 2)) / Math.max(count - 1, 1);
                      return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F6F7F9" strokeWidth="0.949594" />;
                    })}
                  </svg>

                  {/* Hover zones */}
                  <div className="absolute inset-0 flex z-10">
                    {series.map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 cursor-crosshair"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    ))}
                  </div>

                  <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                    {chartMode === "bar" ? (
                      <>
                        {series.map((point, i) => {
                          const cx = PX + (i * (W - PX * 2)) / Math.max(count - 1, 1);
                          const bx = cx - barW / 2;
                          const bh = Math.max(((point.value - 20000) / 50000) * (H - PY * 2), 8);
                          const by = H - PY - bh;
                          const isHov = hoveredIndex === i;
                          return (
                            <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9}>
                              <rect
                                x={bx} y={by} width={barW} height={bh}
                                fill={isHov ? activeColor : "#EFF4FA"}
                                rx={4}
                              />
                            </g>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <defs>
                          <linearGradient id="churn-area-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="43.39%" stopColor={activeColor} stopOpacity="0.09" />
                            <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Gradient area fill */}
                        <path d={areaPath} fill="url(#churn-area-gradient)" />

                        {/* Line Curve */}
                        <path d={linePath} fill="none" stroke={activeColor} strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Hover dot */}
                        {hPt && (
                          <>
                            <circle cx={hPt.x} cy={hPt.y} r={5.5} fill={activeColor} stroke="#FFFFFF" strokeWidth="1.89919" />
                            <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke={activeColor} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                          </>
                        )}
                      </>
                    )}
                  </svg>

                  {/* Hover Tooltip */}
                  {hovered && hPt && (
                    <div
                      className="pointer-events-none absolute z-30 flex flex-col items-start p-0 w-[172.58px] h-[54.79px] bg-[#FFFFFF] shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px] border border-slate-100"
                      style={{
                        left: Math.min(Math.max((tipX / W) * 100, 10), 82) + "%",
                        top: Math.max((tipY / H) * 100 - 15, 5) + "%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="flex flex-col items-start p-0 w-[172.58px] h-[54.79px]">
                        <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[172.58px] h-[27.4px]">
                          <span className="font-manrope font-semibold text-[12px] text-[#29343D] whitespace-nowrap">
                            {timeRange === "Monthly" ? `${hPt.label} 03, 2025` : `Period ${hPt.label}`}
                          </span>
                        </div>
                        <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[172.58px] h-[27.4px] self-stretch border-t border-slate-50">
                          <span className="w-[7.6px] h-[7.6px] rounded-[7.59675px]" style={{ backgroundColor: activeColor }} />
                          <span className="font-manrope font-semibold text-[12px] text-[#29343D] mr-auto whitespace-nowrap">
                            {activeSubTab}
                          </span>
                          <span className="font-manrope font-semibold text-[12px] text-[#98A4AE] whitespace-nowrap">
                            € 255
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* X-axis labels */}
                  <div className="absolute h-[15.35px] right-0 left-0 top-[239px]">
                    {series.map((p, i) => {
                      const x = PX + (i * (W - PX * 2)) / Math.max(count - 1, 1);
                      return (
                        <span
                          key={i}
                          className={`absolute font-manrope font-normal text-center transition-colors text-[11.3951px] leading-[15px] h-[15.35px] ${
                            hoveredIndex === i ? "font-semibold" : "text-[#98A4AE]"
                          }`}
                          style={{
                            left: `${(x / W) * 100}%`,
                            transform: "translateX(-50%)",
                            width: "80px",
                            color: hoveredIndex === i ? activeColor : "#98A4AE",
                          }}
                        >
                          {p.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 KPI Cards - Only render for Customer Churn tab */}
          {activeSubTab === "Customer Churn" && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 animate-in fade-in duration-200">
              {timeRange === "Monthly" && (
                <>
                  <StatCard
                    title="Current Customer Churn Rate (%)"
                    value="4%"
                  />
                  <StatCard
                    title="Change vs Last Month (Customer Churn)"
                    value="€ 297"
                    subtitle="4%"
                    subtitleClass="text-[#FF6692] font-semibold"
                  />
                  <StatCard
                    title="Current MRR Churn Rate (%)"
                    value="3%"
                  />
                  <StatCard
                    title="Current Net MRR Churn Rate (%)"
                    value="5%"
                  />
                  <StatCard
                    title="Best Churn Month in Past 12 Months"
                    value="2%"
                    subtitle="March"
                    subtitleClass="text-[#29343D] font-semibold"
                  />
                </>
              )}
              {timeRange === "Yearly" && (
                <>
                  <StatCard
                    title="Average Customer Churn Rate (YoY)"
                    value="3.8%"
                  />
                  <StatCard
                    title="Change vs Last Year (Customer Churn)"
                    value="€ 1,200"
                    subtitle="3.5%"
                    subtitleClass="text-[#FF6692] font-semibold"
                  />
                  <StatCard
                    title="Average MRR Churn Rate"
                    value="3.1%"
                  />
                  <StatCard
                    title="Average Net MRR Churn Rate"
                    value="4.8%"
                  />
                  <StatCard
                    title="Best Churn Year in History"
                    value="2023"
                  />
                </>
              )}
              {timeRange === "2023-2025" && (
                <>
                  <StatCard
                    title="Range Avg Customer Churn Rate"
                    value="4.1%"
                  />
                  <StatCard
                    title="Range Churn Change"
                    value="€ 980"
                    subtitle="3%"
                    subtitleClass="text-[#FF6692] font-semibold"
                  />
                  <StatCard
                    title="Range Avg MRR Churn Rate"
                    value="3.3%"
                  />
                  <StatCard
                    title="Range Avg Net MRR Churn Rate"
                    value="5.1%"
                  />
                  <StatCard
                    title="Best Month in Selected Range"
                    value="April"
                  />
                </>
              )}
            </div>
          )}
        </section>

        {/* Dynamic Table Section */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="flex flex-col gap-6">
            
            {/* Standard Churn Table */}
            {!isTransposed ? (
              <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
                <table className="min-w-[1200px] w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D]">
                      <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB]">
                        {timeRange === "Monthly" ? "Month" : timeRange === "Yearly" ? "Year" : "Period"}
                      </th>
                      <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-center" colSpan={2}>Customer Churn Rate (%)</th>
                      <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-center" colSpan={2}>
                        {timeRange === "Monthly" ? "Δ vs Previous Month" : timeRange === "Yearly" ? "Δ vs Previous Year" : "Δ vs Previous Period"} (Customer Churn)
                      </th>
                      <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-center" colSpan={2}>MRR Churn Rate (%) – MRR</th>
                      <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-center" colSpan={2}>
                        {timeRange === "Monthly" ? "Δ vs Previous Month" : timeRange === "Yearly" ? "Δ vs Previous Year" : "Δ vs Previous Period"} (MRR Churn)
                      </th>
                      <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-center" colSpan={2}>Net MRR Churn Rate (%)</th>
                      <th className="px-6 py-[14px] font-bold text-center" colSpan={2}>Δ vs Same Period Last Year</th>
                    </tr>
                    <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D] text-[12px]">
                      <th className="px-6 py-[8px] font-semibold border-r border-[#E0E6EB]" />
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]/50">Amount</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]">Change</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]/50">Amount</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]">Change</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]/50">Amount</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]">Change</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]/50">Amount</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]">Change</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]/50">Amount</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]">Change</th>
                      <th className="px-4 py-[8px] font-semibold text-right border-r border-[#E0E6EB]/50">Amount</th>
                      <th className="px-4 py-[8px] font-semibold text-right">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableRows.map((row, idx) => {
                      const bgClass = idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white";
                      return (
                        <tr key={idx} className={`${bgClass} border-b border-[#E0E6EB] hover:bg-slate-50 transition-colors`}>
                          <td className="border-r border-[#E0E6EB] px-6 py-4 font-semibold text-[#29343D]">{row.month}</td>
                          <td className="border-r border-[#E0E6EB]/50 px-4 py-4 text-right text-[#29343D] font-medium">{row.churnRateAmt}</td>
                          
                          <td className="relative group border-r border-[#E0E6EB] px-4 py-4 text-right text-[#FF6692] font-semibold cursor-default">
                            {row.churnRateChg}
                            <div className="hidden group-hover:block absolute z-30 bottom-full right-2 mb-2 p-3.5 bg-white shadow-xl rounded-[10px] border border-slate-100 text-left w-[180px] pointer-events-none">
                              <TableCellHoverCard date={row.month} />
                            </div>
                          </td>

                          <td className="border-r border-[#E0E6EB]/50 px-4 py-4 text-right text-[#29343D] font-medium">{row.churnDeltaAmt}</td>
                          
                          <td className="relative group border-r border-[#E0E6EB] px-4 py-4 text-right text-[#FF6692] font-semibold cursor-default">
                            {row.churnDeltaChg}
                            <div className="hidden group-hover:block absolute z-30 bottom-full right-2 mb-2 p-3.5 bg-white shadow-xl rounded-[10px] border border-slate-100 text-left w-[180px] pointer-events-none">
                              <TableCellHoverCard date={row.month} />
                            </div>
                          </td>

                          <td className="border-r border-[#E0E6EB]/50 px-4 py-4 text-right text-[#29343D] font-medium">{row.mrrRateAmt}</td>
                          <td className="border-r border-[#E0E6EB] px-4 py-4 text-right text-[#FF6692] font-semibold">{row.mrrRateChg}</td>
                          <td className="border-r border-[#E0E6EB]/50 px-4 py-4 text-right text-[#29343D] font-medium">{row.mrrDeltaAmt}</td>
                          <td className="border-r border-[#E0E6EB] px-4 py-4 text-right text-[#FF6692] font-semibold">{row.mrrDeltaChg}</td>
                          <td className="border-r border-[#E0E6EB]/50 px-4 py-4 text-right text-[#29343D] font-medium">{row.netRateAmt}</td>
                          <td className="border-r border-[#E0E6EB] px-4 py-4 text-right text-[#FF6692] font-semibold">{row.netRateChg}</td>
                          <td className="border-r border-[#E0E6EB]/50 px-4 py-4 text-right text-[#29343D] font-medium">{row.lYearAmt}</td>
                          <td className="px-4 py-4 text-right text-[#FF6692] font-semibold">{row.lYearChg}</td>
                        </tr>
                      );
                    })}
                    {filteredTableRows.length === 0 && (
                      <tr>
                        <td colSpan={13} className="text-center text-slate-400 py-8 font-medium">
                          No matching records found for active filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              // Transposed layout table
              <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D]">
                      <th className="px-6 py-[18px] border-r border-[#E0E6EB] w-[200px]" />
                      {timeRange === "Monthly" ? (
                        <>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">Jan 2025</th>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">Feb 2025</th>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">Mar 2025</th>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">Apr 2025</th>
                          <th className="px-6 py-[18px] font-bold text-center">May 2025</th>
                        </>
                      ) : timeRange === "Yearly" ? (
                        <>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">2023</th>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">2024</th>
                          <th className="px-6 py-[18px] font-bold text-center">2025</th>
                        </>
                      ) : (
                        <>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">2023 (Custom)</th>
                          <th className="px-6 py-[18px] border-r border-[#E0E6EB] font-bold text-center">2024 (Custom)</th>
                          <th className="px-6 py-[18px] font-bold text-center">2025 (Custom)</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E0E6EB] bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#29343D] border-r border-[#E0E6EB]">Churn rate</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      {timeRange === "Monthly" && (
                        <>
                          <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                          <td className="px-6 py-5 text-center text-[#FF6692] font-semibold">(3.72%)</td>
                        </>
                      )}
                    </tr>
                    <tr className="border-b border-[#E0E6EB] bg-[#FAFAFA] hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#29343D] border-r border-[#E0E6EB]">MRR churn rate</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      {timeRange === "Monthly" && (
                        <>
                          <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                          <td className="px-6 py-5 text-center text-[#FF6692] font-semibold">(3.72%)</td>
                        </>
                      )}
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#29343D] border-r border-[#E0E6EB]">Net MRR churn rate</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      {activeSubTab === "MRR Churn" ? (
                        <td className="px-6 py-5 text-center text-emerald-500 font-semibold border-r border-[#E0E6EB]">3.72%</td>
                      ) : (
                        <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                      )}
                      {timeRange === "Monthly" && (
                        <>
                          <td className="px-6 py-5 text-center text-[#FF6692] font-semibold border-r border-[#E0E6EB]">(3.72%)</td>
                          {activeSubTab === "MRR Churn" ? (
                            <td className="px-6 py-5 text-center text-emerald-500 font-semibold">3.72%</td>
                          ) : (
                            <td className="px-6 py-5 text-center text-[#FF6692] font-semibold">(3.72%)</td>
                          )}
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-end gap-2 text-slate-400">
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[#EFF4FA] hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[#EFF4FA] hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

          </div>
        </section>

        {/* Export Data Overlay Modal */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="relative w-[638px] h-[400px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] flex flex-col p-6 gap-6 justify-between box-sizing-border-box">
              <div className="flex flex-row items-center justify-between w-full h-[54px] border-b border-slate-100 pb-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-manrope font-bold text-[18px] text-[#29343D]">
                    Export {activeSubTab} Data
                  </span>
                  <span className="font-manrope font-normal text-[14px] text-[#98A4AE]">
                    Generate spreadsheets for your churn analysis reports.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setExportModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="flex-1 w-full overflow-y-auto border border-[#E0E6EB] rounded-[8px] text-[13px]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
                      <th className="px-4 py-2 font-bold text-[#29343D]">Metric</th>
                      <th className="px-4 py-2 text-right font-bold text-[#29343D]">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-[#E0E6EB] odd:bg-white even:bg-[#FAFAFA]">
                        <td className="px-4 py-2 text-[#29343D] font-medium">{row.label}</td>
                        <td className="px-4 py-2 text-right text-[#29343D] font-semibold">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2 gap-3 flex-none">
                <button
                  type="button"
                  onClick={() => setExportModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 rounded-[8px] text-[14px] font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Exporting CSV file...");
                    setExportModalOpen(false);
                  }}
                  className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] text-[14px] font-semibold shadow-md transition-all"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
