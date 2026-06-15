"use client";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet map to prevent Next.js server-side rendering errors
const ItalyLeafletMap = dynamic(() => import("./ItalyLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#EFF4FA]/40 rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-[#635BFF]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="font-manrope text-sm font-semibold text-[#526B7A]">Initializing Leaflet Map...</span>
      </div>
    </div>
  )
});

type Timeframe = "Monthly" | "Yearly" | "2023-2025";
type MetricType = "MRR" | "Subscribers" | "ARPA" | "Customer Churn" | "NET MRR Churn" | "LTV";

interface RegionDataRow {
  region: string;
  mrr: number;
  subs: number;
  arpa: number;
  churn: number;
  netChurn: number;
  ltv: number;
  city: "Milano" | "Rome" | "Bologna";
  plan: "Basic" | "Premium" | "Enterprise";
}

const defaultRows: RegionDataRow[] = [
  { region: "Lombardy", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Milano", plan: "Premium" },
  { region: "Lazio", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Rome", plan: "Premium" },
  { region: "Tuscany", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Bologna", plan: "Basic" },
  { region: "Sicily", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Rome", plan: "Basic" },
  { region: "Sardinia", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Milano", plan: "Enterprise" },
  { region: "Tuscany", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Bologna", plan: "Premium" },
  { region: "Liguria", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Bologna", plan: "Premium" },
  { region: "Piedmont", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Milano", plan: "Basic" },
  { region: "Piedmont", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Milano", plan: "Premium" },
  { region: "Campania", mrr: 244968, subs: 840, arpa: 292, churn: -3.72, netChurn: 3.72, ltv: 5940, city: "Rome", plan: "Enterprise" }
];

export default function MapPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [activeMetric, setActiveMetric] = useState<MetricType>("MRR");
  const [timeframe, setTimeframe] = useState<Timeframe>("Monthly");
  const [timeframeOpen, setTimeframeOpen] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Filters state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [planFilter, setPlanFilter] = useState<"All" | "Basic" | "Premium" | "Enterprise">("All");
  const [cityFilter, setCityFilter] = useState<"All cities" | "Rome" | "Milano" | "Bologna">("All cities");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"Highest" | "Lowest">("Highest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Scale table row data based on Monthly vs Yearly vs Custom Yearly ranges
  const timeframeMultiplier = useMemo(() => {
    if (timeframe === "Yearly") return 12;
    if (timeframe === "2023-2025") return 36;
    return 1;
  }, [timeframe]);

  // Handle plan updates dynamically (Enterprise plan usually doubles basic MRR, Basic halves it)
  const getPlanMultiplier = (plan: "Basic" | "Premium" | "Enterprise") => {
    if (planFilter === "Basic") {
      return plan === "Basic" ? 1 : plan === "Premium" ? 0.7 : 0.5;
    }
    if (planFilter === "Premium") {
      return plan === "Premium" ? 1.2 : 0.9;
    }
    if (planFilter === "Enterprise") {
      return plan === "Enterprise" ? 1.5 : 0.8;
    }
    return 1;
  };

  // Filter and sort region rows dynamically
  const filteredAndSortedRows = useMemo(() => {
    let rows = defaultRows.map((row) => {
      const pm = getPlanMultiplier(row.plan);
      // Scale dynamic values
      return {
        ...row,
        mrr: Math.round(row.mrr * timeframeMultiplier * pm),
        subs: Math.round(row.subs * pm),
        arpa: Math.round(row.arpa * pm),
        ltv: Math.round(row.ltv * timeframeMultiplier * pm),
        // Churn and net churn remain rates (percentage) with minor scaling variation
        churn: row.churn * (planFilter === "Basic" ? 1.2 : planFilter === "Enterprise" ? 0.8 : 1),
        netChurn: row.netChurn * (planFilter === "Basic" ? 0.9 : planFilter === "Enterprise" ? 1.3 : 1)
      };
    });

    // Apply city location filters
    if (cityFilter !== "All cities") {
      rows = rows.filter((r) => r.city === cityFilter);
    }

    // Apply plan selections
    if (planFilter !== "All") {
      rows = rows.filter((r) => r.plan === planFilter);
    }

    // Sort by selected metric
    rows.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      switch (activeMetric) {
        case "MRR":
          valA = a.mrr;
          valB = b.mrr;
          break;
        case "Subscribers":
          valA = a.subs;
          valB = b.subs;
          break;
        case "ARPA":
          valA = a.arpa;
          valB = b.arpa;
          break;
        case "Customer Churn":
          valA = Math.abs(a.churn);
          valB = Math.abs(b.churn);
          break;
        case "NET MRR Churn":
          valA = a.netChurn;
          valB = b.netChurn;
          break;
        case "LTV":
          valA = a.ltv;
          valB = b.ltv;
          break;
      }

      return sortOrder === "Highest" ? valB - valA : valA - valB;
    });

    return rows;
  }, [timeframeMultiplier, planFilter, cityFilter, activeMetric, sortOrder]);

  return (
    <div className="w-full min-w-0">
      <div className="flex w-full flex-col gap-6 rounded-[20px] bg-[#F4F7FB] p-6">
        
        {/* Top Header Bar */}
        <section className="flex w-full items-center justify-between rounded-[12px] bg-white px-6 py-4 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab("dashboard")}
            className="flex items-center text-[#29343D] hover:opacity-80 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-[16px] font-bold tracking-tight text-[#29343D]">
              Analytics
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMetric("MRR");
              setTimeframe("Monthly");
              setPlanFilter("All");
              setCityFilter("All cities");
              setSortOrder("Highest");
            }}
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-medium text-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 11a8 8 0 1 0 2 5" /><path d="M20 5v6h-6" />
            </svg>
            Resync
          </button>
        </section>

        {/* Map Panel Card */}
        <section className="relative w-full rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
                Map {hoveredRegion && <span className="text-slate-400 font-normal ml-1">({hoveredRegion})</span>}
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
              {/* Time range selector dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimeframeOpen((v) => !v)}
                  className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 text-[12px] font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
                >
                  {timeframe === "2023-2025" ? "2023-2025 (Custom)" : timeframe}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A2540]">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {timeframeOpen && (
                  <div className="absolute right-0 top-[42px] z-35 w-[180px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)] border border-slate-100">
                    {(["Monthly", "Yearly", "2023-2025"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setTimeframe(opt);
                          setTimeframeOpen(false);
                        }}
                        className={`flex h-9 w-full items-center rounded-[8px] px-3 text-[12px] font-semibold ${
                          timeframe === opt ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                        }`}
                      >
                        {opt === "2023-2025" ? "2023-2025 (Custom)" : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  alert("Exporting Map Performance Analytics Report...");
                }}
                className="inline-flex h-9 items-center rounded-[8px] border border-[#635BFF] bg-white px-4 text-[12px] font-semibold text-[#635BFF] hover:bg-[#F1F2FE]"
              >
                Export Data
              </button>
            </div>
          </div>

          {/* Interactive filter dropdown selections */}
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

              {/* City Filter */}
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
                      {(["All cities", "Rome", "Milano", "Bologna"] as const).map((city) => (
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

              {/* Sorting Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-[#b0bac9] uppercase">Sort Order</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSortDropdownOpen(!sortDropdownOpen);
                      setCityDropdownOpen(false);
                    }}
                    className="inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
                  >
                    {sortOrder === "Highest" ? "Highest to Lowest" : "Lowest to Highest"}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {sortDropdownOpen && (
                    <div className="absolute left-0 top-[38px] z-30 w-[170px] rounded-[10px] bg-white p-1.5 shadow-lg border border-slate-150">
                      {(["Highest", "Lowest"] as const).map((ord) => (
                        <button
                          key={ord}
                          type="button"
                          onClick={() => {
                            setSortOrder(ord);
                            setSortDropdownOpen(false);
                          }}
                          className={`flex h-8 w-full items-center rounded-[6px] px-2.5 font-medium ${
                            sortOrder === ord ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                          }`}
                        >
                          {ord === "Highest" ? "Highest to Lowest" : "Lowest to Highest"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Metric Sub-tabs select overlay */}
          <div className="flex border-b border-[#EFF4FA] gap-8 mb-6 mt-4 overflow-x-auto whitespace-nowrap scrollbar-none">
            {(["MRR", "Subscribers", "ARPA", "Customer Churn", "NET MRR Churn", "LTV"] as const).map((tab) => {
              const isActive = activeMetric === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveMetric(tab)}
                  className={`pb-3 text-sm font-semibold transition-all relative ${
                    isActive ? "text-[#635BFF]" : "text-[#7e8b9b] hover:text-[#29343D]"
                  }`}
                >
                  {tab === "Customer Churn" ? "Customer Churn" : tab === "NET MRR Churn" ? "NET MRR Churn" : tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635BFF] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Italy Leaflet Map Component (Direct Map) */}
          <div className="w-full h-[538px] rounded-[12px] border border-slate-100 overflow-hidden relative">
            <ItalyLeafletMap
              activeMetric={activeMetric}
              timeframe={timeframe}
              planFilter={planFilter}
              cityFilter={cityFilter}
              onRegionHover={setHoveredRegion}
              onRegionClick={(name) => {
                setHoveredRegion(name);
                alert(`You selected region: ${name}`);
              }}
            />
          </div>
        </section>

        {/* Detailed Region Breakdown Table */}
        <section className="w-full rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[#29343D]">Regions Breakdown</h3>
            <p className="text-xs text-slate-400">Analysis breakdown of key performance indicators grouped by active geographical boundaries.</p>
          </div>

          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="w-full border-collapse text-left text-[14px] min-w-[900px]">
              <thead>
                <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D]">
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB]">Regions</th>
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-right">MRR</th>
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-right">Subscribers</th>
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-right">ARPA</th>
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-right">Churn Rate</th>
                  <th className="px-6 py-[14px] font-bold border-r border-[#E0E6EB] text-right">Net MRR Churn</th>
                  <th className="px-6 py-[14px] font-bold text-right">LTV</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedRows.map((row, idx) => {
                  const bgClass = idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white";
                  return (
                    <tr key={idx} className={`${bgClass} border-b border-[#E0E6EB] hover:bg-slate-50 transition-colors`}>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] font-semibold text-[#29343D]">
                        {row.region}
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] text-[#29343D] text-right font-medium">
                        € {row.mrr.toLocaleString("de-DE")}
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] text-[#36C76C] text-right font-medium">
                        {row.subs.toLocaleString("de-DE")}
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] text-[#29343D] text-right font-medium">
                        € {row.arpa.toLocaleString("de-DE")}
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] text-[#FF3B30] text-right font-medium">
                        ({Math.abs(row.churn).toFixed(2)}%)
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-[11px] text-[#36C76C] text-right font-medium">
                        {row.netChurn.toFixed(2)}%
                      </td>
                      <td className="px-6 py-[11px] text-[#36C76C] text-right font-semibold">
                        € {row.ltv.toLocaleString("de-DE")}
                      </td>
                    </tr>
                  );
                })}

                {filteredAndSortedRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-slate-400 py-10 font-semibold">
                      No matching records found for active plan/location filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
