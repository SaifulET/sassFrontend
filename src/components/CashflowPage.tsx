"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";
import AnalyticsHeader from "./AnalyticsHeader";

type ChartMode = "line" | "bar";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";

type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

const cashflowPoints: ChartPoint[] = [
  { month: "Jan", value: 238391 },
  { month: "Feb", value: 250000 },
  { month: "Mar", value: 190000 },
  { month: "Apr", value: 110000 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
];

const mainTableMonths = [
  { label: "Jan 2025", key: "jan" },
  { label: "Feb 2025", key: "feb" },
  { label: "Mar 2025", key: "mar" },
] as const;

// 11 Rows specification:
// Row 1 to 9 are standard segments, row 10 is "Net cashflow", row 11 is "Change".
interface TableRowData {
  label: string;
  color?: string; // empty for net cashflow / change
  isHighlight?: boolean;
  values: {
    [key in "jan" | "feb" | "mar"]: {
      amount: string;
      amountClass?: string;
      count: string;
      countClass?: string;
      change: string;
      changeClass?: string;
    };
  };
}

const mainTableRows: TableRowData[] = [
  {
    label: "Monthly plans",
    color: "#34C759",
    values: {
      jan: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
      feb: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
      mar: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
    },
  },
  {
    label: "Yearly plans",
    color: "#00C7BE",
    values: {
      jan: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
      feb: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
      mar: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
    },
  },
  {
    label: "Metered",
    color: "#33ADE5",
    values: {
      jan: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
      feb: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
      mar: { amount: "€ 238,391", count: "79", countClass: "text-[#36C76C] font-semibold", change: "-" },
    },
  },
  {
    label: "One-time",
    color: "#FFCC00",
    values: {
      jan: { amount: "(€ 238,391)", count: "79", countClass: "text-[#FF6692] font-semibold", change: "-" },
      feb: { amount: "(€ 238,391)", count: "79", countClass: "text-[#FF6692] font-semibold", change: "-" },
      mar: { amount: "(€ 238,391)", count: "79", countClass: "text-[#FF6692] font-semibold", change: "-" },
    },
  },
  {
    label: "Discounts",
    color: "#FF6692",
    values: {
      jan: { amount: "(€ 238,391)", count: "79", countClass: "text-[#FF6692] font-semibold", change: "-" },
      feb: { amount: "(€ 238,391)", count: "79", countClass: "text-[#FF6692] font-semibold", change: "-" },
      mar: { amount: "(€ 238,391)", count: "79", countClass: "text-[#FF6692] font-semibold", change: "-" },
    },
  },
  {
    label: "Refunds",
    color: "#644B45",
    values: {
      jan: { amount: "€ 19,866", count: "-", change: "-" },
      feb: { amount: "€ 19,866", count: "-", change: "-" },
      mar: { amount: "€ 19,866", count: "-", change: "-" },
    },
  },
  {
    label: "Fees",
    color: "#5655D2",
    values: {
      jan: { amount: "€ 7,474", amountClass: "text-[#36C76C] font-semibold", count: "-", change: "-" },
      feb: { amount: "€ 7,474", amountClass: "text-[#36C76C] font-semibold", count: "-", change: "-" },
      mar: { amount: "€ 7,474", amountClass: "text-[#36C76C] font-semibold", count: "-", change: "-" },
    },
  },
  {
    label: "Taxes",
    color: "#007AFE",
    values: {
      jan: { amount: "€ 19,866", count: "-", change: "-" },
      feb: { amount: "€ 19,866", count: "-", change: "-" },
      mar: { amount: "€ 19,866", count: "-", change: "-" },
    },
  },
  {
    label: "FX loss",
    color: "#EEEFEF",
    values: {
      jan: { amount: "-", count: "-", change: "5.25%", changeClass: "text-[#FF6692] font-semibold" },
      feb: { amount: "-", count: "-", change: "5.25%", changeClass: "text-[#FF6692] font-semibold" },
      mar: { amount: "-", count: "-", change: "5.25%", changeClass: "text-[#FF6692] font-semibold" },
    },
  },
  {
    label: "Net cashflow",
    isHighlight: true,
    values: {
      jan: { amount: "€ 314,889", count: "-", change: "-" },
      feb: { amount: "€ 314,889", count: "-", change: "-" },
      mar: { amount: "€ 314,889", count: "-", change: "-" },
    },
  },
  {
    label: "Change",
    isHighlight: true,
    values: {
      jan: { amount: "-", count: "-", change: "5.25%" },
      feb: { amount: "-", count: "-", change: "5.25%" },
      mar: { amount: "-", count: "-", change: "5.25%" },
    },
  },
];

const movementsTransactions = [
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
];

const modalRows = [
  { label: "Monthly plans", color: "#34C759" },
  { label: "Yearly plans", color: "#00C7BE" },
  { label: "Metered", color: "#33ADE5" },
  { label: "One-time", color: "#FFCC00" },
  { label: "Discounts", color: "#FF6692" },
  { label: "Refunds", color: "#644B45" },
  { label: "Fees", color: "#5655D2" },
  { label: "Taxes", color: "#007AFE" },
  { label: "FX loss", color: "#EEEFEF" },
];

// ---- Icons ----
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <polyline points="21 3 21 8 16 8" />
  </svg>
);

const AdjustmentsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
);

const LineChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// ---- Chart Component ----
function CashflowChart({
  timeRange,
  chartMode,
  setExportModalOpen,
}: {
  timeRange: TimeRange;
  chartMode: ChartMode;
  setExportModalOpen: (open: boolean) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const series = useMemo(() => {
    if (timeRange === "Monthly") {
      return cashflowPoints;
    }
    if (timeRange === "Yearly") {
      return [
        { month: "2023", value: 150000 },
        { month: "2024", value: 190000 },
        { month: "2025", value: 238391 },
      ];
    }
    // "2023-2025"
    return [
      { month: "2023", value: 150000 },
      { month: "2024", value: 190000 },
      { month: "2025", value: 238391 },
    ];
  }, [timeRange]);

  const count = series.length;

  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  const yLabels = ["250K", "200K", "150K", "100K", "50K", "0"];

  // getY mapping (scale 0 to 250,000)
  const getY = (val: number) => {
    return H - PY - (val / 250000) * (H - PY * 2);
  };

  const pts: PositionedPoint[] = series.map((p, i) => {
    const x = PX + (i * (W - PX * 2)) / (count - 1);
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

  const linePath = buildPath(pts);

  const hovered = hoveredIndex !== null && series[hoveredIndex].value > 0;
  const hPt = hovered ? pts[hoveredIndex!] : null;

  const tipX = hPt?.x ?? 0;
  const tipY = hPt?.y ?? 0;

  // Bar slot calculations
  const barSlot = (W - PX * 2) / (count - 1);
  const barW = Math.min(Math.max(barSlot * 0.45, 12), 48);

  // Tooltip Category segments showing € 32K as mockup
  const tooltipSegments = [
    { label: "Monthly plans", value: "€ 32K", color: "#34C759" },
    { label: "Yearly plans", value: "€ 32K", color: "#00C7BE" },
    { label: "Metered", value: "€ 32K", color: "#33ADE5" },
    { label: "One-time", value: "€ 32K", color: "#FFCC00" },
    { label: "Discounts", value: "€ 32K", color: "#FF6692" },
    { label: "Refunds", value: "€ 32K", color: "#644B45" },
    { label: "Fees", value: "€ 32K", color: "#5655D2" },
    { label: "Taxes", value: "€ 32K", color: "#007AFE" },
    { label: "FX loss", value: "€ 32K", color: "#EEEFEF" },
  ];

  return (
    <div className="relative w-full select-none">
      <div className="relative w-full min-w-0 h-[264px]">
        {/* Y-axis */}
        <div className="absolute left-0 flex h-[228px] w-[34px] flex-col justify-between p-0 items-start top-0">
          {yLabels.map((l) => (
            <span
              key={l}
              className="w-[34px] h-[15.35px] font-manrope font-normal text-[11.3951px] leading-[15px] text-center text-[#98A4AE] self-stretch flex-none"
            >
              {l}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="absolute left-[35px] right-0 overflow-visible bg-transparent top-[0.35px] h-[227.55px]">
          {/* Grid lines */}
          <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${W} ${H}`}>
            {Array.from({ length: 6 }, (_, i) => {
              const y = PY + (i / 5) * (H - PY * 2);
              return <line key={i} x1={0} y1={y} x2={W} y2={y} stroke="#F6F7F9" strokeWidth="0.949594" />;
            })}
            {series.map((_, i) => {
              const x = PX + (i * (W - PX * 2)) / (count - 1);
              return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F6F7F9" strokeWidth="0.949594" />;
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
          <svg ref={svgRef} className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {chartMode === "bar" ? (
              // Bar chart
              <>
                {series.map((point, i) => {
                  if (point.value === 0) return null;
                  const cx = PX + (i * (W - PX * 2)) / (count - 1);
                  const bx = cx - barW / 2;
                  const bh = (point.value / 250000) * (H - PY * 2);
                  const by = H - PY - bh;
                  const isHov = hoveredIndex === i;
                  return (
                    <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9}>
                      <rect
                        x={bx} y={by} width={barW} height={bh}
                        fill="#007AFE"
                        rx={8}
                      />
                    </g>
                  );
                })}
              </>
            ) : (
              // Line chart
              <>
                <path d={linePath} fill="none" stroke="#007AFE" strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />
                {pts.map((p, i) => {
                  if (p.value === 0) return null;
                  return (
                    <circle
                      key={i}
                      cx={p.x} cy={p.y} r={2.75}
                      fill="#007AFE"
                      stroke="#FFFFFF"
                      strokeWidth="1.89919"
                      opacity={hoveredIndex === i ? 1 : 0}
                      style={{ transition: "opacity 0.15s" }}
                    />
                  );
                })}
                {hPt && (
                  <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#007AFE" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                )}
              </>
            )}
          </svg>

          {/* Tooltip containing 9 segments matches design */}
          {hovered && (
            <div
              className="pointer-events-none absolute z-30 flex flex-col items-start p-3.5 w-[190px] bg-[#FFFFFF] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)] border border-slate-100 rounded-[12px]"
              style={{
                left: Math.min(Math.max((tipX / W) * 100, 15), 80) + "%",
                top: "0px",
                transform: "translateX(-50%)",
              }}
            >
              <div className="w-full flex flex-col gap-2.5">
                <span className="font-manrope font-semibold text-[13px] leading-[18px] text-[#29343D]">
                  Mar 03, 2025
                </span>
                <div className="flex flex-col gap-1.5 w-full">
                  {tooltipSegments.map((seg) => (
                    <div key={seg.label} className="flex flex-row items-center justify-between w-full h-[18px]">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: seg.color }}
                        />
                        <span className="font-manrope font-normal text-[11px] leading-[15px] text-[#29343D]">
                          {seg.label}
                        </span>
                      </div>
                      <span className="font-manrope font-semibold text-[11px] leading-[15px] text-[#98A4AE]">
                        {seg.value}
                      </span>
                    </div>
                  ))}
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
                    hoveredIndex === i ? "text-[#007AFE] font-semibold" : "text-[#98A4AE]"
                  }`}
                  style={{
                    left: `${(x / W) * 100}%`,
                    transform: "translateX(-50%)",
                    width: "80px",
                  }}
                >
                  {p.month}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Page Component ----
export default function CashflowPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [chartMode, setChartMode] = useState<ChartMode>("bar");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const currentTableMonths = useMemo(() => {
    if (timeRange === "Monthly") {
      return [
        { label: "Jan 2025", key: "jan" },
        { label: "Feb 2025", key: "feb" },
        { label: "Mar 2025", key: "mar" },
      ] as const;
    }
    return [
      { label: "2023", key: "jan" },
      { label: "2024", key: "feb" },
      { label: "2025", key: "mar" },
    ] as const;
  }, [timeRange]);

  const toggleChartMode = useCallback(() => {
    setChartMode((m) => (m === "line" ? "bar" : "line"));
  }, []);

  return (
    <div className="w-full min-w-0">
      <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header toolbar */}
        <AnalyticsHeader
          title="Analytics"
          setActiveTab={setActiveTab}
          onResync={() => {
            setTimeRange("Monthly");
          }}
        />

        {/* Chart section */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
                Cashflow
              </h2>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-[#EFF4FA] px-4 text-[12px] font-medium text-[#0A2540] hover:opacity-80 transition-opacity"
              >
                <AdjustmentsIcon /> Filter
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Time range dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimeRangeOpen((v) => !v)}
                  className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 text-[12px] font-medium text-[#0A2540] hover:bg-[#F7F9FC]"
                >
                  {timeRange} <ChevronDownIcon />
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
                        className={`flex h-9 w-full items-center rounded-[8px] px-3 text-[12px] font-medium ${
                          timeRange === opt ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chart mode toggle */}
              <button
                type="button"
                onClick={toggleChartMode}
                className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-4 text-[12px] font-medium text-[#0A2540] hover:bg-[#F7F9FC]"
              >
                Change Chart View <LineChartIcon />
              </button>

              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="inline-flex h-9 items-center rounded-[8px] border border-[#635BFF] bg-white px-4 text-[12px] font-medium text-[#635BFF] hover:bg-[#F1F2FE]"
              >
                Export Data
              </button>
            </div>
          </div>

          {/* The chart */}
          <div className="pb-4">
            <CashflowChart timeRange={timeRange} chartMode={chartMode} setExportModalOpen={setExportModalOpen} />
          </div>
        </section>

        {/* Table 1: Main Cashflow Breakdown (11 Rows) */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[1000px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F3F3FF]">
                  <th className="w-[180px] border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]"></th>
                  {currentTableMonths.map((m) => (
                    <th
                      key={m.key}
                      colSpan={3}
                      className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-center text-[14px] font-semibold text-[#29343D]"
                    >
                      {m.label}
                    </th>
                  ))}
                </tr>
                <tr className="bg-[#F3F3FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]"></th>
                  {currentTableMonths.flatMap((m) => [
                    <th key={`${m.key}-a`} className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-right text-[14px] font-semibold text-[#29343D]">Amount</th>,
                    <th key={`${m.key}-c`} className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-right text-[14px] font-semibold text-[#29343D]">Count</th>,
                    <th key={`${m.key}-ch`} className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-right text-[14px] font-semibold text-[#29343D]">Change</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {mainTableRows.map((row) => {
                  const isHighlight = row.isHighlight;
                  const rowBg = isHighlight ? "bg-[#CDE9CD]" : "odd:bg-white even:bg-[#FAFAFA]";
                  const borderClass = isHighlight ? "border-y border-r border-[#526B7A]/30" : "border-b border-r border-[#E0E6EB]";

                  return (
                    <tr key={row.label} className={`${rowBg}`}>
                      {/* Name / Category */}
                      <td className={`${borderClass} px-6 py-3.5 text-[14px] font-semibold text-[#29343D] flex items-center gap-2`}>
                        {row.color && (
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: row.color }}
                          />
                        )}
                        <span>{row.label}</span>
                      </td>

                      {/* Amounts, Counts, Changes */}
                      {currentTableMonths.flatMap((m) => {
                        const cell = row.values[m.key];
                        return [
                          <td key={`${m.key}-a`} className={`${borderClass} px-6 py-3.5 text-right text-[14px] text-[#29343D] ${cell.amountClass || ""}`}>
                            {cell.amount}
                          </td>,
                          <td key={`${m.key}-c`} className={`${borderClass} px-6 py-3.5 text-right text-[14px] text-[#29343D] ${cell.countClass || ""}`}>
                            {cell.count}
                          </td>,
                          <td key={`${m.key}-ch`} className={`${borderClass} px-6 py-3.5 text-right text-[14px] text-[#29343D] ${cell.changeClass || ""}`}>
                            {cell.change}
                          </td>,
                        ];
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Movements Transactions Logs */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[1000px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F5F4FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]">Date</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]">Customer</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]">Description</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]">Type</th>
                  <th className="border-b border-[#E0E6EB] px-6 py-[14px] text-[14px] font-semibold text-[#29343D]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {movementsTransactions.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-[#FAFAFA]">
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] text-[#29343D]">{row.date}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] text-[#29343D]">{row.customer}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] text-[#29343D]">{row.description}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] text-[#29343D]">{row.type}</td>
                    <td className="border-b border-[#E0E6EB] px-6 py-[14px] text-[14px] text-[#29343D]">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Custom Table-Based Export Data Modal */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="relative w-[638px] h-[826px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] flex flex-col p-6 gap-6 box-sizing-border-box overflow-hidden">
              {/* Header Title Row */}
              <div className="flex flex-row items-center justify-between w-full h-[54px] flex-none self-stretch border-b border-slate-100 pb-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-manrope font-bold text-[18px] leading-[25px] text-[#29343D]">
                    Mar 03, 2025
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

              {/* Table Breakdown Container */}
              <div className="flex-1 w-full overflow-y-auto border border-[#E0E6EB] rounded-[8px]">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="bg-[#F3F3FF]">
                      <th className="border-b border-r border-[#E0E6EB] px-4 py-3.5 font-bold text-[#29343D]"></th>
                      <th className="border-b border-r border-[#E0E6EB] px-4 py-3.5 text-right font-bold text-[#29343D]">Total</th>
                      <th className="border-b border-r border-[#E0E6EB] px-4 py-3.5 text-right font-bold text-[#29343D]">Basic</th>
                      <th className="border-b border-r border-[#E0E6EB] px-4 py-3.5 text-right font-bold text-[#29343D]">Premium</th>
                      <th className="border-b border-[#E0E6EB] px-4 py-3.5 text-right font-bold text-[#29343D]">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalRows.map((row, idx) => (
                      <tr key={row.label} className="odd:bg-white even:bg-[#FAFAFA]">
                        <td className="border-b border-r border-[#E0E6EB] px-4 py-3 font-semibold text-[#29343D] flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: row.color }}
                          />
                          <span>{row.label}</span>
                        </td>
                        <td className="border-b border-r border-[#E0E6EB] px-4 py-3 text-right text-[#29343D]">€ 32K</td>
                        <td className="border-b border-r border-[#E0E6EB] px-4 py-3 text-right text-[#29343D]">€ 12K</td>
                        <td className="border-b border-r border-[#E0E6EB] px-4 py-3 text-right text-[#29343D]">€ 15K</td>
                        <td className="border-b border-[#E0E6EB] px-4 py-3 text-right text-[#29343D]">€ 5K</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Export Data Action Button */}
              <div className="flex-none self-stretch pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => alert("Data exported successfully.")}
                  className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-[8px] text-[14px] font-semibold shadow-md transition-all duration-150"
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
