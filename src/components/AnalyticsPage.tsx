"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";

type PlanType = "All" | "Basic" | "Premium" | "Enterprise";
type ChartMode = "line" | "bar";
type ChartTab = "MRR" | "Movements" | "Breakdown";
type TimeRange = "Monthly" | "Yearly" | "2023-2024";
type FilterStage = "root" | "plan";

type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };
type MovementSegment = { label: string; value: number; color: string };
type MovementPoint = { month: string; segments: MovementSegment[] };

const planTypeOptions: PlanType[] = ["All", "Basic", "Premium", "Enterprise"];
const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2024"];
const salonOptions = ["All / Select Salon", "Beauty Wellness Center", "Bella Vista Salon", "Elite Beauty Group"];
const cityOptions = ["All cities", "Bologna", "Milano", "Roma", "Torino"];

const rootFilters = ["Plan","Region","Currency","Billing Frequency","Payment Method","Pricing Model","Customer Age","Industry","Company Size","Channel","Data Source"];
const planFilters = ["Analytics Insights","Custom Fields","Developer API","File Share Basic","File Share Plus","File Share Unlimited","Meta Pixel Integration","Multi Branch","Online Payments","Queue Manager","Scheduler Basic","Scheduler Plus","Scheduler Starter","Scheduler Unlimited","Site Designer","Social Connect (Facebook)","Social Connect (Google)","Social Connect (Instagram)"];

const mrrPoints: ChartPoint[] = [
  { month: "Jan", value: 28000 },{ month: "Feb", value: 33500 },{ month: "Mar", value: 39000 },
  { month: "Apr", value: 38500 },{ month: "May", value: 34000 },{ month: "Jun", value: 34500 },
  { month: "Jul", value: 35500 },{ month: "Aug", value: 40500 },{ month: "Sep", value: 37500 },
];
const movementsPoints: ChartPoint[] = [
  { month: "Jan", value: 22 },{ month: "Feb", value: 18 },{ month: "Mar", value: 31 },
  { month: "Apr", value: 27 },{ month: "May", value: 15 },{ month: "Jun", value: 16 },
  { month: "Jul", value: 19 },{ month: "Aug", value: 24 },{ month: "Sep", value: 21 },
];
const breakdownPoints: ChartPoint[] = [
  { month: "Jan", value: 12 },{ month: "Feb", value: 16 },{ month: "Mar", value: 22 },
  { month: "Apr", value: 25 },{ month: "May", value: 21 },{ month: "Jun", value: 24 },
  { month: "Jul", value: 26 },{ month: "Aug", value: 30 },{ month: "Sep", value: 29 },
];

const movementBars: MovementPoint[] = [
  { month: "Jan", segments: [{ label: "New", value: 12, color: "#20C9C5" },{ label: "Expand", value: 10, color: "#635BFF" },{ label: "Churn", value: 8, color: "#FF6692" }] },
  { month: "Feb", segments: [{ label: "New", value: 10, color: "#20C9C5" },{ label: "Expand", value: 9, color: "#635BFF" },{ label: "Churn", value: 7, color: "#FF6692" }] },
  { month: "Mar", segments: [{ label: "New", value: 11, color: "#20C9C5" },{ label: "Expand", value: 11, color: "#635BFF" },{ label: "Churn", value: 6, color: "#FF6692" }] },
  { month: "Apr", segments: [{ label: "New", value: 9, color: "#20C9C5" },{ label: "Expand", value: 10, color: "#635BFF" },{ label: "Churn", value: 7, color: "#FF6692" }] },
  { month: "May", segments: [{ label: "New", value: 13, color: "#20C9C5" },{ label: "Expand", value: 9, color: "#635BFF" },{ label: "Churn", value: 19, color: "#FF6692" }] },
  { month: "Jun", segments: [{ label: "New", value: 8, color: "#20C9C5" },{ label: "Expand", value: 8, color: "#635BFF" },{ label: "Churn", value: 6, color: "#FF6692" }] },
  { month: "Jul", segments: [{ label: "New", value: 10, color: "#20C9C5" },{ label: "Expand", value: 10, color: "#635BFF" },{ label: "Churn", value: 7, color: "#FF6692" }] },
  { month: "Aug", segments: [{ label: "New", value: 6, color: "#20C9C5" },{ label: "Expand", value: 7, color: "#635BFF" },{ label: "Churn", value: 5, color: "#FF6692" }] },
  { month: "Sep", segments: [{ label: "New", value: 8, color: "#20C9C5" },{ label: "Expand", value: 6, color: "#635BFF" },{ label: "Churn", value: 4, color: "#FF6692" }] },
];

const tableMonths = [
  { label: "Jan 2025", key: "jan" },
  { label: "Feb 2025", key: "feb" },
  { label: "Mar 2025", key: "mar" },
] as const;

const tableRows = [
  { label: "New", amount: "€ 19,866", count: "79", change: "-" },
  { label: "Expanded", amount: "€ 19,866", count: "79", change: "-" },
  { label: "Reactivated", amount: "€ 19,866", count: "79", change: "-" },
  { label: "Contracted", amount: "€ 19,866", count: "79", change: "-" },
  { label: "Churned", amount: "€ 19,866", count: "79", change: "-" },
  { label: "MRR Change", amount: "(€ 19,866)", count: "79", change: "-" },
  { label: "FX Impact", amount: "(€ 19,866)", count: "79", change: "-" },
  { label: "Total MRR", amount: "€ 7,474", count: "-", change: "-" },
  { label: "Growth Rate", amount: "-", count: "-", change: "5.25%" },
];

// ---- Icons ----
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 1 0 2 5" /><path d="M20 5v6h-6" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" />
  </svg>
);
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5h18" /><path d="M6 12h12" /><path d="M10 19h4" />
  </svg>
);
const LineChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const BarChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16V10" /><path d="M12 16V7" /><path d="M16 16v-5" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 6 6 6-6 6" />
  </svg>
);
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 6-12 12" /><path d="m6 6 12 12" />
  </svg>
);

function StatCard({ title, value, note, noteClass = "text-[#263241]" }: { title: string; value: string; note: string; noteClass?: string }) {
  return (
    <div className="rounded-[12px] border border-[#E0E6EB] bg-white px-5 py-4 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
      <div className="text-[13px] font-semibold leading-5 text-[#29343D]">{title}</div>
      <div className="mt-3 text-[28px] font-semibold leading-9 text-[#29343D]">{value}</div>
      <div className={`mt-1 text-[12px] leading-5 ${noteClass}`}>{note}</div>
    </div>
  );
}

// ---- Main Chart Component ----
function MRRChart({
  activeTab,
  chartMode,
  planType,
}: {
  activeTab: ChartTab;
  chartMode: ChartMode;
  planType: PlanType;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const isMovements = activeTab === "Movements";

  const baseSeries = useMemo(() => {
    if (activeTab === "Movements") return movementsPoints;
    if (activeTab === "Breakdown") return breakdownPoints;
    return mrrPoints;
  }, [activeTab]);

  const series = useMemo(() => {
    const mult = planType === "Basic" ? 0.82 : planType === "Premium" ? 1.08 : planType === "Enterprise" ? 1.2 : 1;
    return baseSeries.map((p) => ({ ...p, value: Math.round(p.value * mult) }));
  }, [baseSeries, planType]);

  const movementSeries = useMemo(() => {
    const mult = planType === "Basic" ? 0.82 : planType === "Premium" ? 1.08 : planType === "Enterprise" ? 1.2 : 1;
    return movementBars.map((bar) => ({
      month: bar.month,
      total: Math.round(bar.segments.reduce((s, seg) => s + seg.value, 0) * mult),
      segments: bar.segments.map((seg) => ({ ...seg, value: Math.round(seg.value * mult) })),
    }));
  }, [planType]);

  // Chart dimensions tuned to the screenshot frame
  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;
  const count = series.length;
  const maxVal = Math.max(...series.map((p) => p.value), 1);
  const minVal = Math.min(...series.map((p) => p.value));
  const range = Math.max(maxVal - minVal, 1);
  const maxMov = Math.max(...movementSeries.map((p) => p.total), 1);

  const pts: PositionedPoint[] = series.map((p, i) => {
    const x = PX + (i * (W - PX * 2)) / (count - 1);
    const y = H - PY - ((p.value - minVal) / range) * (H - PY * 2);
    return { ...p, x, y };
  });

  const buildPath = (points: PositionedPoint[]) => {
    if (points.length < 2) return "";
    const d = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 0; i < points.length - 1; i++) {
      const c = points[i], n = points[i + 1];
      const p = points[i - 1] ?? c, a = points[i + 2] ?? n;
      d.push(`C ${c.x + (n.x - p.x) / 5} ${c.y + (n.y - p.y) / 5}, ${n.x - (a.x - c.x) / 5} ${n.y - (a.y - c.y) / 5}, ${n.x} ${n.y}`);
    }
    return d.join(" ");
  };

  const linePath = buildPath(pts);
  const areaPath = pts.length
    ? `${linePath} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`
    : "";

  // Y-axis labels
  const ySteps = 5;
  const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => {
    const v = maxVal - (i / ySteps) * (maxVal - minVal);
    return v >= 1000 ? `${Math.round(v / 1000)}k` : `${Math.round(v)}`;
  });

  const formatVal = (v: number) => activeTab === "MRR" ? `€ ${v >= 1000 ? `${Math.round(v / 1000)}K` : v}` : `${v}`;
  const hovered = hoveredIndex !== null;
  const hPt = hovered ? pts[hoveredIndex!] : null;
  const hMov = hovered ? movementSeries[hoveredIndex!] : null;

  // Tooltip position
  const tipX = isMovements
    ? PX + (hoveredIndex! * (W - PX * 2)) / (count - 1)
    : hPt?.x ?? 0;
  const tipY = isMovements ? 60 : hPt?.y ?? 0;

  // Bar width
  const barSlot = (W - PX * 2) / count;
  const barW = Math.max(barSlot * 0.45, 12);

  return (
    <div className="relative w-full select-none">
      <div className="relative h-[264px] w-full min-w-0">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 flex h-[228px] w-[34px] flex-col justify-between pr-0 pt-0 text-right">
          {yLabels.map((l) => (
            <span key={l} className="block text-[10px] leading-none text-[#B8C4CE]">{l}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute left-[35px] top-[0.35px] h-[227.55px] right-0 overflow-hidden rounded-[10px] border border-[#F0F4F9] bg-[#FAFBFD]">
          {/* Grid lines */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${W} ${H}`}>
            {Array.from({ length: ySteps + 1 }, (_, i) => {
              const y = PY + (i / ySteps) * (H - PY * 2);
              return <line key={i} x1={0} y1={y} x2={W} y2={y} stroke="#EEF2F7" strokeWidth="1" />;
            })}
            {series.map((_, i) => {
              const x = PX + (i * (W - PX * 2)) / (count - 1);
              return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F0F4F8" strokeWidth="1" strokeDasharray="3 3" />;
            })}
          </svg>

          {/* Hover zones */}
          <div className="absolute inset-0 flex">
            {series.map((_, i) => (
              <div
                key={i}
                className="relative flex-1 cursor-crosshair"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          {/* SVG content */}
          <svg ref={svgRef} className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#20C9C5" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#20C9C5" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="bar-new" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22D4D0" /><stop offset="100%" stopColor="#17A8A5" />
              </linearGradient>
              <linearGradient id="bar-expand" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7B74FF" /><stop offset="100%" stopColor="#5850E8" />
              </linearGradient>
              <linearGradient id="bar-churn" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF7DA0" /><stop offset="100%" stopColor="#F04472" />
              </linearGradient>
              <filter id="bar-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#00000015" />
              </filter>
            </defs>

            {/* Line / bar content */}
            {isMovements || chartMode === "bar" ? (
              // Bar chart
              <>
                {(isMovements ? movementSeries : series).map((point, i) => {
                  const cx = PX + (i * (W - PX * 2)) / (count - 1);
                  const bx = cx - barW / 2;
                  const isHov = hoveredIndex === i;

                  if (isMovements) {
                    const mp = point as typeof movementSeries[0];
                    const totalH = maxMov > 0 ? (mp.total / maxMov) * (H - PY * 2) : 0;
                    const gradMap: Record<string, string> = { New: "url(#bar-new)", Expand: "url(#bar-expand)", Churn: "url(#bar-churn)" };
                    let yOff = H - PY;
                    return (
                      <g key={i} opacity={isHov ? 1 : 0.88} filter={isHov ? "url(#bar-shadow)" : undefined}>
                        {mp.segments.map((seg) => {
                          if (mp.total === 0 || seg.value === 0) return null;
                          const segH = (seg.value / mp.total) * totalH;
                          yOff -= segH;
                          return (
                            <rect
                              key={seg.label}
                              x={bx}
                              y={yOff}
                              width={barW}
                              height={segH}
                              fill={gradMap[seg.label] ?? seg.color}
                              rx={seg.label === "New" ? 4 : 0}
                            />
                          );
                        })}
                      </g>
                    );
                  } else {
                    const sp = point as ChartPoint;
                    const bh = Math.max((sp.value / maxVal) * (H - PY * 2), 8);
                    const by = H - PY - bh;
                    return (
                      <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.6 : 0.9} filter={isHov ? "url(#bar-shadow)" : undefined}>
                        <rect
                          x={bx} y={by} width={barW} height={bh}
                          fill={isHov ? "#20C9C5" : i === 2 ? "#20C9C5" : "#D8E5F2"}
                          rx={4}
                        />
                      </g>
                    );
                  }
                })}
              </>
            ) : (
              // Line chart
              <>
                <path d={areaPath} fill="url(#area-fill)" />
                <path d={linePath} fill="none" stroke="#20C9C5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {pts.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y} r={hoveredIndex === i ? 5 : 3}
                    fill={hoveredIndex === i ? "#20C9C5" : "#fff"}
                    stroke="#20C9C5"
                    strokeWidth="2"
                    opacity={hoveredIndex === null ? 0 : hoveredIndex === i ? 1 : 0}
                    style={{ transition: "r 0.15s, opacity 0.15s" }}
                  />
                ))}
                {hPt && (
                  <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#20C9C5" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                )}
              </>
            )}
          </svg>

          {/* Tooltip */}
          {hovered && (
            <div
              className="pointer-events-none absolute z-30 min-w-[120px] rounded-[10px] bg-white px-3 py-2.5 shadow-[0_8px_24px_-4px_rgba(17,31,56,0.18)] ring-1 ring-black/5"
              style={{
                left: Math.min(Math.max((tipX / W) * 100, 10), 72) + "%",
                top: Math.max((tipY / H) * 100 - 20, 4) + "%",
                transform: "translateX(-50%)",
              }}
            >
              <p className="mb-1.5 text-[10px] font-semibold text-[#98A4AE]">
                {(isMovements ? movementSeries[hoveredIndex!]?.month : series[hoveredIndex!]?.month)} 2025
              </p>
              {isMovements ? (
                <>
                  {hMov?.segments.map((seg) => (
                    <div key={seg.label} className="flex items-center justify-between gap-3 py-[2px]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: seg.color }} />
                        <span className="text-[11px] text-[#253143]">{seg.label}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#253143]">{seg.value}</span>
                    </div>
                  ))}
                  <div className="mt-1.5 flex items-center justify-between gap-3 border-t border-[#F0F4F8] pt-1.5">
                    <span className="text-[11px] font-semibold text-[#253143]">Total</span>
                    <span className="text-[11px] font-semibold text-[#635BFF]">{hMov?.total}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#20C9C5]" />
                  <span className="text-[11px] text-[#253143]">{activeTab}</span>
                  <span className="text-[11px] font-semibold text-[#253143]">{formatVal(series[hoveredIndex!]?.value ?? 0)}</span>
                </div>
              )}
            </div>
          )}

          {/* X-axis labels */}
          <div className="absolute left-[36px] top-[239px] flex h-[15px] w-[calc(100%-36px)] items-start">
            {series.map((p, i) => (
              <div key={i} className="basis-0 flex-1 min-w-0 text-center">
                <span className={`text-[10px] font-medium ${hoveredIndex === i ? "text-[#20C9C5]" : "text-[#C1CBD6]"}`}>{p.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend for Movements */}
      {isMovements && (
        <div className="mt-3 flex items-center gap-5 pl-9">
          {[{ label: "New", color: "#20C9C5" }, { label: "Expand", color: "#635BFF" }, { label: "Churn", color: "#FF6692" }].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
              <span className="text-[11px] font-medium text-[#7A8897]">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Page ----
export default function AnalyticsPage() {
  const [planType, setPlanType] = useState<PlanType>("All");
  const [salon, setSalon] = useState(salonOptions[0]);
  const [city, setCity] = useState(cityOptions[0]);
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [activeTab, setActiveTab] = useState<ChartTab>("MRR");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStage, setFilterStage] = useState<FilterStage>("root");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string | null>(null);

  const isMovements = activeTab === "Movements";

  const handleTabChange = useCallback((tab: ChartTab) => {
    setActiveTab(tab);
    if (tab === "Movements") setChartMode("bar");
  }, []);

  const toggleChartMode = useCallback(() => {
    setChartMode((m) => (m === "line" ? "bar" : "line"));
  }, []);

  const togglePlanFilter = (item: string) => {
    setSelectedPlanFilter((c) => (c === item ? null : item));
    setFilterOpen(false);
    setFilterStage("root");
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex w-full flex-col gap-6 rounded-[20px] bg-[#F4F7FB] p-6">

        {/* Top filters */}
        <section className="flex w-full flex-col gap-6 rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-5">
              <h1 className="text-[16px] font-semibold leading-[22px] text-[#29343D]">Analytics Overview</h1>
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-semibold leading-4 text-[#98A4AE]">Plan Type</span>
                  <div className="flex flex-wrap gap-2">
                    {planTypeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPlanType(opt)}
                        className={`h-9 rounded-[8px] border px-4 text-[12px] font-medium transition-colors ${
                          planType === opt
                            ? "border-[#635BFF] bg-white text-[#29343D] shadow-[0_0_0_1px_rgba(99,91,255,0.18)]"
                            : "border-[#EFF4FA] bg-white text-[#29343D] hover:bg-[#F7F9FC]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[12px] font-semibold leading-4 text-[#98A4AE]">Salon</span>
                  <div className="relative">
                    <select value={salon} onChange={(e) => setSalon(e.target.value)} className="h-9 w-full appearance-none rounded-[8px] border border-[#EFF4FA] bg-white px-4 pr-10 text-[12px] font-medium text-[#29343D] outline-none">
                      {salonOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#29343D]"><ChevronDownIcon /></span>
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[12px] font-semibold leading-4 text-[#98A4AE]">City</span>
                  <div className="relative">
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="h-9 w-full appearance-none rounded-[8px] border border-[#EFF4FA] bg-white px-4 pr-10 text-[12px] font-medium text-[#29343D] outline-none">
                      {cityOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#29343D]"><ChevronDownIcon /></span>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => { setPlanType("All"); setSalon(salonOptions[0]); setCity(cityOptions[0]); }} className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#EFF4FA] px-4 text-[14px] font-medium text-[#0A2540] hover:bg-[#E8EEF7]">
                <RefreshIcon /> Refresh Data
              </button>
              <button type="button" className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#635BFF] px-4 text-[14px] font-medium text-white shadow-[0_8px_18px_rgba(94,83,252,0.22)] hover:bg-[#4d42eb]">
                <DownloadIcon /> Export Data
              </button>
            </div>
          </div>
        </section>

        {/* Chart section */}
        <section className="relative w-full rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[16px] font-semibold leading-[22px] text-[#29343D]">
                  MRR Growth – {timeRange === "Yearly" ? "Yearly" : "Monthly"} Recurring Revenue
                </h2>
                {selectedPlanFilter && (
                  <span className="inline-flex h-7 items-center gap-2 rounded-full bg-[#635BFF]/10 px-3 text-[11px] font-medium text-[#635BFF]">
                    Plan: {selectedPlanFilter}
                    <button type="button" onClick={() => setSelectedPlanFilter(null)} className="opacity-60 hover:opacity-100"><CloseIcon /></button>
                  </span>
                )}
                <button type="button" onClick={() => setFilterOpen((v) => !v)} className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-[#EFF4FA] px-3 text-[12px] font-medium text-[#0A2540] hover:bg-[#E8EEF7]">
                  <FilterIcon /> Filter
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-[#F0F4F8]">
                {(["MRR", "Movements", "Breakdown"] as ChartTab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`relative pb-3 text-[13px] font-medium transition-colors ${
                      activeTab === tab
                        ? "text-[#635BFF] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#635BFF] after:content-['']"
                        : "text-[#7A8897] hover:text-[#253143]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Time range */}
              <div className="relative">
                <button type="button" onClick={() => setTimeRangeOpen((v) => !v)} className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 text-[12px] font-medium text-[#0A2540] hover:bg-[#F7F9FC]">
                  {timeRange} <ChevronDownIcon />
                </button>
                {timeRangeOpen && (
                  <div className="absolute right-0 top-[42px] z-30 w-[160px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)]">
                    {timeRangeOptions.map((opt) => (
                      <button key={opt} type="button" onClick={() => { setTimeRange(opt); setTimeRangeOpen(false); }} className={`flex h-9 w-full items-center rounded-[8px] px-3 text-[12px] font-medium ${timeRange === opt ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chart mode toggle */}
              {!isMovements && (
                <div className="flex rounded-[8px] border border-[#EFF4FA] bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => setChartMode("line")}
                    title="Line chart"
                    className={`inline-flex h-7 w-8 items-center justify-center rounded-[6px] transition-colors ${chartMode === "line" ? "bg-[#635BFF] text-white shadow-sm" : "text-[#98A4AE] hover:text-[#253143]"}`}
                  >
                    <LineChartIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartMode("bar")}
                    title="Bar chart"
                    className={`inline-flex h-7 w-8 items-center justify-center rounded-[6px] transition-colors ${chartMode === "bar" ? "bg-[#635BFF] text-white shadow-sm" : "text-[#98A4AE] hover:text-[#253143]"}`}
                  >
                    <BarChartIcon />
                  </button>
                </div>
              )}

              <button type="button" className="inline-flex h-9 items-center rounded-[8px] border border-[#635BFF] bg-white px-4 text-[12px] font-medium text-[#635BFF] hover:bg-[#F1F2FE]">
                Export Data
              </button>
            </div>
          </div>

          {/* The chart */}
          <div className="pb-4">
            <MRRChart activeTab={activeTab} chartMode={chartMode} planType={planType} />
          </div>

          {/* Stat cards */}
          {isMovements ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard title="Top plan by MRR" value="Basic" note="200 20%" noteClass="text-[#36C76C]" />
              <StatCard title="Bottom plan by MRR" value="Enterprise" note="100 (6%)" noteClass="text-[#FF6692]" />
              <StatCard title="Plan with biggest MoM gain" value="€ 463,570" note="(0.36%)" noteClass="text-[#FF6692]" />
              <StatCard title="Plan with biggest MoM loss" value="€ 465,259" note="(0.53%)" noteClass="text-[#FF6692]" />
              <StatCard title="Total MRR" value="€ 407,060" note="All plans combined" />
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard title="Current MRR" value="€ 463,570" note="this month" />
              <StatCard title="MoM change" value="€ 465,259" note="vs previous month (0.36%)" noteClass="text-[#FF6692]" />
              <StatCard title="YoY change" value="€ 465,259" note="vs previous year (0.53%)" noteClass="text-[#FF6692]" />
              <StatCard title="Net New MRR" value="€ 407,060" note="this month" />
              <StatCard title="Gross MRR churn" value="7.05%" note="this month" noteClass="text-[#36C76C]" />
            </div>
          )}

          {/* Filter dropdown */}
          {filterOpen && (
            <>
              <div className="absolute left-6 top-[88px] z-30 w-[194px] rounded-[12px] bg-white p-2 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.2)] ring-1 ring-black/5">
                {filterStage === "root" ? (
                  <div className="flex flex-col gap-0.5">
                    <div className="mb-1 flex h-9 items-center gap-2 px-3 text-[12px] font-semibold text-[#253143]">
                      <FilterIcon /> Filter
                    </div>
                    <button type="button" onClick={() => setFilterStage("plan")} className="flex items-center justify-between rounded-[8px] px-3 py-2 text-left text-[12px] font-medium text-[#0A2540] hover:bg-[#F5F8FC]">
                      Plan <ChevronRightIcon />
                    </button>
                    {rootFilters.slice(1).map((item) => (
                      <button key={item} type="button" className="flex items-center justify-between rounded-[8px] px-3 py-2 text-left text-[12px] font-medium text-[#0A2540] hover:bg-[#F5F8FC]">
                        {item} <ChevronRightIcon />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex max-h-[320px] flex-col gap-0.5 overflow-y-auto">
                    <button type="button" onClick={() => setFilterStage("root")} className="mb-1 flex h-9 items-center gap-2 rounded-[8px] px-3 text-[12px] font-semibold text-[#0A2540] hover:bg-[#F5F8FC]">
                      <ChevronRightIcon /> Plan
                    </button>
                    {planFilters.map((item) => {
                      const checked = selectedPlanFilter === item;
                      return (
                        <button key={item} type="button" onClick={() => togglePlanFilter(item)} className="flex items-center gap-2 rounded-[8px] px-3 py-2 text-left text-[12px] font-medium text-[#0A2540] hover:bg-[#F5F8FC]">
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${checked ? "border-[#635BFF] bg-[#635BFF] text-white" : "border-[#D0DAE4] bg-white"}`}>
                            {checked && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </span>
                          <span className="flex-1 leading-4">{item}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <button type="button" aria-label="Close filter" className="fixed inset-0 z-20 cursor-default" onClick={() => { setFilterOpen(false); setFilterStage("root"); }} />
            </>
          )}
        </section>

        {/* Table */}
        <section className="overflow-hidden rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F5F4FF]">
                  <th className="w-[140px] border-b border-r border-[#E0E6EB] px-5 py-4 text-[14px] font-semibold text-[#29343D]"></th>
                  {tableMonths.map((m) => (
                    <th key={m.key} colSpan={3} className="border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[16px] font-semibold text-[#29343D]">{m.label}</th>
                  ))}
                </tr>
                <tr className="bg-[#F5F4FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[14px] font-semibold text-[#29343D]"></th>
                  {tableMonths.flatMap((m) => [
                    <th key={`${m.key}-a`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-medium text-[#29343D]">Amount</th>,
                    <th key={`${m.key}-c`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-medium text-[#29343D]">Count</th>,
                    <th key={`${m.key}-ch`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-medium text-[#29343D]">Change</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label} className="odd:bg-white even:bg-[#FAFAFA]">
                    <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">{row.label}</td>
                    {tableMonths.flatMap((m) => [
                      <td key={`${row.label}-${m.key}-a`} className={`border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[12px] ${row.label === "Total MRR" || row.label === "Growth Rate" ? "font-semibold text-[#36C76C]" : "text-[#29343D]"}`}>{row.amount}</td>,
                      <td key={`${row.label}-${m.key}-c`} className={`border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[12px] ${row.label === "Total MRR" || row.label === "Growth Rate" ? "font-semibold text-[#36C76C]" : "text-[#29343D]"}`}>{row.count}</td>,
                      <td key={`${row.label}-${m.key}-ch`} className={`border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[12px] ${row.label === "Growth Rate" ? "font-semibold text-[#36C76C]" : "text-[#29343D]"}`}>{row.change}</td>,
                    ])}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
