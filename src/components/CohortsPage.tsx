"use client";
import React, { useState, useMemo } from "react";

type TimeRange = "Monthly" | "Yearly" | "2023-2025";
type TabType = "Net MRR Retention" | "Subscriber Retention";
type CellType = "high" | "med" | "low";

interface CohortRow {
  month: string;
  mrr: string;
  plan: string;
  city: string;
  cells: { value: string; type: CellType }[];
}

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

// ---- Dynamic Cohort Datasets ----

// Monthly dataset (Rows: Aug 2024 to Aug 2025, Columns: M1 to M8)
const cohortMonthlyData: CohortRow[] = [
  {
    month: "Aug 2024", mrr: "€ 19,866", plan: "Premium", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "Sep 2024", mrr: "€ 19,866", plan: "Premium", city: "Milano",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "Oct 2024", mrr: "€ 19,866", plan: "Basic", city: "Bologna",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "Nov 2024", mrr: "€ 19,866", plan: "Enterprise", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "Dec 2024", mrr: "€ 19,866", plan: "Premium", city: "Milano",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "Jan 2025", mrr: "€ 19,866", plan: "Basic", city: "Bologna",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "high" },
    ]
  },
  {
    month: "Feb 2025", mrr: "€ 19,866", plan: "Enterprise", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "Mar 2025", mrr: "€ 19,866", plan: "Premium", city: "Milano",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "Apr 2025", mrr: "€ 19,866", plan: "Basic", city: "Bologna",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "May 2025", mrr: "€ 19,866", plan: "Enterprise", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "Jun 2025", mrr: "€ 19,866", plan: "Premium", city: "Milano",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "Jul 2025", mrr: "€ 19,866", plan: "Basic", city: "Bologna",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
      { value: "82.9%", type: "high" },
    ]
  },
  {
    month: "Aug 2025", mrr: "€ 19,866", plan: "Premium", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
    ]
  },
];

// Yearly dataset (Rows: 2023, 2024, 2025, Columns: Y1 to Y3)
const cohortYearlyData: CohortRow[] = [
  {
    month: "2023", mrr: "€ 240,000", plan: "Premium", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "2024", mrr: "€ 280,000", plan: "Basic", city: "Milano",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "2025", mrr: "€ 310,000", plan: "Enterprise", city: "Bologna",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
    ]
  },
];

// Custom Year range dataset (2023-2025, Columns: Period 1 to Period 3)
const cohortCustomData: CohortRow[] = [
  {
    month: "2023 (Custom)", mrr: "€ 150,000", plan: "Basic", city: "Bologna",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "med" },
    ]
  },
  {
    month: "2024 (Custom)", mrr: "€ 180,000", plan: "Premium", city: "Rome",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
      { value: "82.9%", type: "low" },
    ]
  },
  {
    month: "2025 (Custom)", mrr: "€ 210,000", plan: "Enterprise", city: "Milano",
    cells: [
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "high" },
      { value: "82.9%", type: "med" },
    ]
  },
];

export default function CohortsPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [activeTabType, setActiveTabType] = useState<TabType>("Net MRR Retention");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Filters state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [planFilter, setPlanFilter] = useState<"All" | "Basic" | "Premium" | "Enterprise">("All");
  const [cityFilter, setCityFilter] = useState("All cities");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  // Columns layout dynamically computed
  const columns = useMemo(() => {
    if (timeRange === "Yearly") return ["Y1", "Y2", "Y3"];
    if (timeRange === "2023-2025") return ["Period 1", "Period 2", "Period 3"];
    return ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"];
  }, [timeRange]);

  // Filter rows dynamically
  const filteredRows = useMemo(() => {
    let rows = [...cohortMonthlyData];
    if (timeRange === "Yearly") rows = [...cohortYearlyData];
    if (timeRange === "2023-2025") rows = [...cohortCustomData];

    // Filter by Plan
    if (planFilter !== "All") {
      rows = rows.filter((r) => r.plan === planFilter);
    }
    // Filter by City
    if (cityFilter !== "All cities") {
      rows = rows.filter((r) => r.city === cityFilter);
    }

    return rows;
  }, [timeRange, planFilter, cityFilter]);

  // Average row dynamic calculation
  const averageRowCells = useMemo(() => {
    if (filteredRows.length === 0) {
      return columns.map(() => ({ value: "-", type: "med" as CellType }));
    }
    return columns.map((_, colIdx) => {
      // Simulate simple average type (mostly high/med)
      const isHigh = colIdx === 0 || colIdx === 6;
      return {
        value: "82.9%",
        type: (isHigh ? "high" : "med") as CellType
      };
    });
  }, [filteredRows, columns]);

  const exportRows = useMemo(() => {
    return [
      { label: "Cohort Subscribed Size", value: timeRange === "Monthly" ? "Aug 2024 to Aug 2025" : "2023 to 2025" },
      { label: "Start Monthly Recurring Revenue", value: "€ 19,866" },
      { label: "Average Month 1 / Year 1 Retention", value: "82.9%" },
    ];
  }, [timeRange]);

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
              setActiveTabType("Net MRR Retention");
              setTimeRange("Monthly");
              setPlanFilter("All");
              setCityFilter("All cities");
            }}
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-medium text-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] transition-all duration-150 self-start"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 11a8 8 0 1 0 2 5" /><path d="M20 5v6h-6" />
            </svg>
            Resync
          </button>
        </div>
      </div>

        {/* Heatmap Panel */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
                Cohorts
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
            </div>
          )}

          {/* Subtab selection */}
          <div className="flex border-b border-[#EFF4FA] gap-8 mb-6 mt-4">
            {([ "Net MRR Retention", "Subscriber Retention" ] as const).map((tab) => {
              const isActive = activeTabType === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTabType(tab)}
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

          {/* Heatmap Grid Table */}
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB] mt-4">
            <table className="w-full border-collapse text-left text-[14px] min-w-[900px]">
              <thead>
                <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D]">
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] w-[150px] whitespace-nowrap">
                    {timeRange === "Monthly" ? "Subscribed" : timeRange === "Yearly" ? "Subscribed Year" : "Period"}
                  </th>
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] w-[140px] whitespace-nowrap">Start MRR</th>
                  {columns.map((colName) => (
                    <th key={colName} className="px-4 py-[14px] font-bold text-center border-r border-[#E0E6EB]/50 whitespace-nowrap">
                      {colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => {
                  const bgClass = idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white";
                  
                  // Adjust display start MRR dynamically according to selected plan
                  let displayMRR = row.mrr;
                  if (planFilter === "Basic") displayMRR = "€ 9,866";
                  else if (planFilter === "Premium") displayMRR = "€ 19,866";
                  else if (planFilter === "Enterprise") displayMRR = "€ 29,866";

                  return (
                    <tr key={idx} className={`${bgClass} border-b border-[#E0E6EB] hover:bg-slate-50 transition-colors`}>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] font-semibold text-[#29343D] whitespace-nowrap">{row.month}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] text-[#29343D] font-medium whitespace-nowrap">{displayMRR}</td>
                      
                      {row.cells.slice(0, columns.length).map((cell, cidx) => {
                        let pillClass = "";
                        if (cell.type === "high") {
                          pillClass = "bg-[#16CDC7] text-white";
                        } else if (cell.type === "med") {
                          pillClass = "bg-[#E0FDFB] text-[#0D9488]";
                        } else {
                          pillClass = "bg-[#FFEBF0] text-[#FF6692]";
                        }

                        return (
                          <td key={cidx} className="border-r border-[#E0E6EB]/50 px-4 py-[11px] text-center">
                            <span className={`inline-flex items-center justify-center w-[58px] h-[26px] rounded-full text-[12px] font-semibold ${pillClass}`}>
                              {cell.value}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 2} className="text-center text-slate-400 py-8 font-medium">
                      No matching records found for active filters.
                    </td>
                  </tr>
                )}

                {/* Average summary row */}
                {filteredRows.length > 0 && (
                  <tr className="bg-slate-50/70 border-b border-[#E0E6EB] font-bold">
                    <td className="border-r border-[#E0E6EB] px-6 py-[13px] text-[#29343D] rounded-bl-[12px]">Average</td>
                    <td className="border-r border-[#E0E6EB] px-6 py-[13px]" />
                    {averageRowCells.map((cell, cidx) => {
                      let pillClass = "";
                      if (cell.type === "high") {
                        pillClass = "bg-[#16CDC7] text-white";
                      } else {
                        pillClass = "bg-[#E0FDFB] text-[#0D9488]";
                      }
                      return (
                        <td key={cidx} className="border-r border-[#E0E6EB]/50 px-4 py-[13px] text-center">
                          <span className={`inline-flex items-center justify-center w-[58px] h-[26px] rounded-full text-[12px] font-semibold ${pillClass}`}>
                            {cell.value}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-end gap-2 text-slate-400 mt-6">
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
        </section>

        {/* Export Data Overlay Modal */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="relative w-[638px] h-[360px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] flex flex-col p-6 gap-6 justify-between box-sizing-border-box">
              <div className="flex flex-row items-center justify-between w-full h-[54px] border-b border-slate-100 pb-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-manrope font-bold text-[18px] text-[#29343D]">
                    Export Cohort Retention Data
                  </span>
                  <span className="font-manrope font-normal text-[14px] text-[#98A4AE]">
                    Generate spreadsheets for your {activeTabType} analysis reports.
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
