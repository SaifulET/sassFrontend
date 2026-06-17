"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";

type ChartMode = "line" | "bar";
type SubTab = "Subscribers" | "Movements" | "Breakdown";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";

type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

// ---- Data Sets ----

// Subscribers Tab Data (Yellow Curve)
const subscriberPoints: ChartPoint[] = [
  { month: "Jan", value: 48000 },
  { month: "Feb", value: 60000 },
  { month: "Mar", value: 52000 },
  { month: "Apr", value: 38000 },
  { month: "May", value: 24000 },
  { month: "Jun", value: 45000 },
  { month: "Jul", value: 42000 },
  { month: "Aug", value: 34000 },
  { month: "Sep", value: 28000 },
];

// Movements Tab Data (Stacked Bars)
interface MovementSegment {
  label: string;
  value: number; // positive or negative
  color: string;
}
interface MovementPoint {
  month: string;
  segments: MovementSegment[];
}
const movementsPoints: MovementPoint[] = [
  {
    month: "Jan",
    segments: [
      { label: "New", value: 22000, color: "#34C759" },
      { label: "Expanded", value: 10000, color: "#00C7BE" },
      { label: "Reactivated", value: 8000, color: "#33ADE5" },
      { label: "Contracted", value: 5000, color: "#FFCC00" },
      { label: "Churned", value: -18000, color: "#FF6692" },
      { label: "FX Impact", value: -6000, color: "#EEEFEF" },
    ],
  },
  {
    month: "Feb",
    segments: [
      { label: "New", value: 21000, color: "#34C759" },
      { label: "Expanded", value: 9000, color: "#00C7BE" },
      { label: "Reactivated", value: 7000, color: "#33ADE5" },
      { label: "Contracted", value: 4000, color: "#FFCC00" },
      { label: "Churned", value: -20000, color: "#FF6692" },
      { label: "FX Impact", value: -5000, color: "#EEEFEF" },
    ],
  },
  {
    month: "Mar",
    segments: [
      { label: "New", value: 23000, color: "#34C759" },
      { label: "Expanded", value: 11000, color: "#00C7BE" },
      { label: "Reactivated", value: 9000, color: "#33ADE5" },
      { label: "Contracted", value: 4500, color: "#FFCC00" },
      { label: "Churned", value: -17000, color: "#FF6692" },
      { label: "FX Impact", value: -4000, color: "#EEEFEF" },
    ],
  },
  {
    month: "Apr",
    segments: [
      { label: "New", value: 20000, color: "#34C759" },
      { label: "Expanded", value: 8000, color: "#00C7BE" },
      { label: "Reactivated", value: 7000, color: "#33ADE5" },
      { label: "Contracted", value: 3500, color: "#FFCC00" },
      { label: "Churned", value: -19000, color: "#FF6692" },
      { label: "FX Impact", value: -5000, color: "#EEEFEF" },
    ],
  },
  {
    month: "May",
    segments: [
      { label: "New", value: 24000, color: "#34C759" },
      { label: "Expanded", value: 12000, color: "#00C7BE" },
      { label: "Reactivated", value: 10000, color: "#33ADE5" },
      { label: "Contracted", value: 6000, color: "#FFCC00" },
      { label: "Churned", value: -38000, color: "#FF6692" },
      { label: "FX Impact", value: -10000, color: "#EEEFEF" },
    ],
  },
  {
    month: "Jun",
    segments: [
      { label: "New", value: 22000, color: "#34C759" },
      { label: "Expanded", value: 10000, color: "#00C7BE" },
      { label: "Reactivated", value: 8000, color: "#33ADE5" },
      { label: "Contracted", value: 5000, color: "#FFCC00" },
      { label: "Churned", value: -20000, color: "#FF6692" },
      { label: "FX Impact", value: -6000, color: "#EEEFEF" },
    ],
  },
  {
    month: "Jul",
    segments: [
      { label: "New", value: 23000, color: "#34C759" },
      { label: "Expanded", value: 11000, color: "#00C7BE" },
      { label: "Reactivated", value: 9000, color: "#33ADE5" },
      { label: "Contracted", value: 4500, color: "#FFCC00" },
      { label: "Churned", value: -17000, color: "#FF6692" },
      { label: "FX Impact", value: -4000, color: "#EEEFEF" },
    ],
  },
  { month: "Aug", segments: [] },
  { month: "Sep", segments: [] },
];

// Breakdown Tab Data (Multi-line Curves)
interface BreakdownPlan {
  label: string;
  color: string;
  points: number[];
}
const breakdownPlans: BreakdownPlan[] = [
  { label: "Premium", color: "#007AFE", points: [80000, 81000, 80000, 75000, 75000, 80000, 82000, 81000, 82000] },
  { label: "Basic", color: "#FF6692", points: [60000, 62000, 60000, 55000, 56000, 60000, 61000, 60000, 61000] },
  { label: "Enterprise", color: "#FFCC00", points: [50000, 51000, 48000, 40000, 40000, 45000, 47000, 45000, 46000] },
  { label: "Addon A", color: "#34C759", points: [30000, 31000, 30000, 30000, 30000, 30000, 30000, 30000, 30000] },
  { label: "Addon B", color: "#00C7BE", points: [24000, 25000, 24000, 24000, 24000, 24000, 24000, 24000, 24000] },
  { label: "Addon C", color: "#5655D2", points: [18000, 19000, 18000, 18000, 18000, 18000, 18000, 18000, 18000] },
];

const mainTableMonths = [
  { label: "Jan 2025", key: "jan" },
  { label: "Feb 2025", key: "feb" },
  { label: "Mar 2025", key: "mar" },
  { label: "Apr 2025", key: "apr" },
  { label: "May 2025", key: "may" },
] as const;

interface TableRowData {
  label: string;
  isBgGray?: boolean;
  valueClass?: string;
  values: {
    [key in "jan" | "feb" | "mar" | "apr" | "may"]: string;
  };
}

const mainTableRows: TableRowData[] = [
  {
    label: "New",
    values: { jan: "79", feb: "79", mar: "79", apr: "79", may: "79" },
  },
  {
    label: "Reactivated",
    isBgGray: true,
    values: { jan: "79", feb: "79", mar: "79", apr: "79", may: "79" },
  },
  {
    label: "Churned",
    values: { jan: "(79)", feb: "(79)", mar: "(79)", apr: "(79)", may: "(79)" },
  },
  {
    label: "Change",
    isBgGray: true,
    valueClass: "text-[#36C76C] font-semibold",
    values: { jan: "79", feb: "79", mar: "79", apr: "79", may: "79" },
  },
  {
    label: "Customers",
    values: { jan: "1696", feb: "1696", mar: "1696", apr: "1696", may: "1696" },
  },
  {
    label: "Growth rate",
    isBgGray: true,
    valueClass: "text-[#36C76C] font-semibold",
    values: { jan: "3.04%", feb: "3.04%", mar: "3.04%", apr: "3.04%", may: "3.04%" },
  },
];

const movementTransactions = [
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
];

// ---- Icons ----
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 1 0 2 5" /><path d="M20 5v6h-6" />
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

// ---- StatCard Component ----
interface StatCardProps {
  title: string;
  value: string;
  subtitle: string | React.ReactNode;
  subtitleClass?: string;
}
function StatCard({ title, value, subtitle, subtitleClass = "text-[#29343D]" }: StatCardProps) {
  return (
    <div className="box-sizing-border-box flex flex-col justify-center items-center p-6 gap-1 h-[129px] bg-white rounded-xl bg-white shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-1 min-w-0">
      <span className="font-manrope font-semibold text-[13px] leading-[18px] text-[#29343D] text-center">{title}</span>
      <span className="font-manrope font-semibold text-[24px] leading-[29px] text-[#29343D] text-center mt-1">{value}</span>
      <span className={`font-manrope font-semibold text-[13px] leading-[18px] text-center mt-1 ${subtitleClass}`}>{subtitle}</span>
    </div>
  );
}

// ---- Dynamic Chart Component ----
function SubscribersChart({
  timeRange,
  activeSubTab,
  chartMode,
  setExportModalOpen,
}: {
  timeRange: TimeRange;
  activeSubTab: SubTab;
  chartMode: ChartMode;
  setExportModalOpen: (open: boolean) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  // Render chart conditionally depending on activeSubTab
  if (activeSubTab === "Subscribers") {
    // -------------------------------------------------------------
    // Tab 1: Yellow Curve Line Chart
    // -------------------------------------------------------------
    const series = timeRange === "Monthly" ? subscriberPoints : [
      { month: "2023", value: 38000 },
      { month: "2024", value: 45000 },
      { month: "2025", value: 52000 },
    ];
    const count = series.length;
    const yLabels = ["70k", "60k", "50k", "40k", "30k", "20k"];

    const getY = (val: number) => {
      return H - PY - ((val - 20000) / 50000) * (H - PY * 2);
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

    return (
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
              {series.map((_, i) => {
                const x = PX + (i * (W - PX * 2)) / (count - 1);
                return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F6F7F9" strokeWidth="0.949594" />;
              })}
            </svg>

            {/* Hover zones */}
            <div className="absolute inset-0 flex z-10">
              {series.map((_, i) => (
                <div
                  key={i}
                  className="relative flex-1 cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>

            <svg ref={svgRef} className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="yellow-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="43.39%" stopColor="#FFD648" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#FFD648" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gradient Area Fill */}
              <path d={areaPath} fill="url(#yellow-gradient)" />

              {/* Yellow curve */}
              <path d={linePath} fill="none" stroke="#FFD648" strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />

              {/* Hover highlight dot */}
              {hPt && (
                <>
                  <circle cx={hPt.x} cy={hPt.y} r={5.5} fill="#FFD648" stroke="#FFFFFF" strokeWidth="1.89919" />
                  <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#FFD648" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                </>
              )}
            </svg>

            {/* Hover Tooltip */}
            {hovered && (
              <div
                className="pointer-events-none absolute z-30 flex flex-col items-start p-0 w-[140.58px] h-[54.79px] bg-[#FFFFFF] shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px]"
                style={{
                  left: Math.min(Math.max((tipX / W) * 100, 10), 80) + "%",
                  top: Math.max((tipY / H) * 100 - 15, 5) + "%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="flex flex-col items-start p-0 w-[140.58px] h-[54.79px]">
                  <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[96.79px] h-[27.4px]">
                    <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D]">
                      {series[hoveredIndex!]?.month} 03, 2025
                    </span>
                  </div>
                  <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[140.58px] h-[27.4px] self-stretch border-t border-slate-50">
                    <span className="w-[7.6px] h-[7.6px] bg-[#FFD648] rounded-[7.59675px]" />
                    <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] mr-auto">
                      Customers
                    </span>
                    <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#98A4AE]">
                      1,680
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* X-axis labels */}
            <div className="absolute h-[15.35px] right-0 left-[36px] top-[239px] flex flex-row items-start p-0">
              {series.map((p, i) => (
                <span
                  key={i}
                  className={`font-manrope font-normal text-center flex-1 min-w-0 transition-colors text-[11.3951px] leading-[15px] h-[15.35px] ${
                    hoveredIndex === i ? "text-[#FFD648] font-semibold" : "text-[#98A4AE]"
                  }`}
                >
                  {p.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (activeSubTab === "Movements") {
    // -------------------------------------------------------------
    // Tab 2: Diverging Stacked Bar Chart
    // -------------------------------------------------------------
    const series = timeRange === "Monthly" ? movementsPoints : [
      { month: "2023", segments: movementsPoints[0].segments },
      { month: "2024", segments: movementsPoints[1].segments },
      { month: "2025", segments: movementsPoints[2].segments },
    ];
    const count = series.length;
    const yLabels = ["70k", "60k", "50k", "-20k", "-40k", "-60k"];

    // getY mapping val from -60,000 to 70,000
    const getY = (val: number) => {
      return H - PY - ((val - (-60000)) / 130000) * (H - PY * 2);
    };

    const hovered = hoveredIndex !== null && series[hoveredIndex] && series[hoveredIndex].segments.length > 0;
    const hPtX = hoveredIndex !== null ? PX + (hoveredIndex * (W - PX * 2)) / Math.max(count - 1, 1) : 0;

    const barW = 32;

    return (
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
              {/* zero baseline */}
              <line x1={0} y1={getY(0)} x2={W} y2={getY(0)} stroke="#29343D" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

              {/* other lines */}
              {[70000, 60000, 50000, -20000, -40000, -60000].map((val) => {
                const y = getY(val);
                return <line key={val} x1={0} y1={y} x2={W} y2={y} stroke="#F6F7F9" strokeWidth="0.949594" />;
              })}
              {series.map((_, i) => {
                const x = PX + (i * (W - PX * 2)) / (count - 1);
                return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F6F7F9" strokeWidth="0.949594" />;
              })}
            </svg>

            {/* Hover zones */}
            <div className="absolute inset-0 flex z-10">
              {series.map((_, i) => (
                <div
                  key={i}
                  className="relative flex-1 cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>

            {/* SVG Diverging Stacked Bar Rendering */}
            <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              {series.map((point, i) => {
                if (point.segments.length === 0) return null;
                const cx = PX + (i * (W - PX * 2)) / (count - 1);
                const bx = cx - barW / 2;

                // Stack positive values upwards
                let currentPos = 0;
                // Stack negative values downwards
                let currentNeg = 0;

                const isHov = hoveredIndex === i;

                return (
                  <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9}>
                    {point.segments.map((seg, sIdx) => {
                      if (seg.value >= 0) {
                        const h = getY(currentPos) - getY(currentPos + seg.value);
                        const y = getY(currentPos + seg.value);
                        currentPos += seg.value;
                        return (
                          <rect
                            key={sIdx}
                            x={bx} y={y} width={barW} height={Math.max(h, 1)}
                            fill={seg.color}
                            rx={2}
                          />
                        );
                      } else {
                        const h = getY(currentNeg + seg.value) - getY(currentNeg);
                        const y = getY(currentNeg);
                        currentNeg += seg.value;
                        return (
                          <rect
                            key={sIdx}
                            x={bx} y={y} width={barW} height={Math.max(h, 1)}
                            fill={seg.color}
                            rx={2}
                          />
                        );
                      }
                    })}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip for Diverging Stacked Bar */}
            {hovered && (
              <div
                className="pointer-events-none absolute z-30 flex flex-col items-start p-3.5 w-[180px] bg-[#FFFFFF] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)] border border-slate-100 rounded-[12px]"
                style={{
                  left: Math.min(Math.max((hPtX / W) * 100, 15), 80) + "%",
                  top: "10px",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="w-full flex flex-col gap-2.5">
                  <span className="font-manrope font-semibold text-[13px] text-[#29343D]">
                    Mar 03, 2025
                  </span>
                  <div className="flex flex-col gap-1.5 w-full">
                    {[
                      { label: "New", color: "#34C759" },
                      { label: "Expanded", color: "#00C7BE" },
                      { label: "Reactivated", color: "#33ADE5" },
                      { label: "Contracted", color: "#FFCC00" },
                      { label: "Churned", color: "#FF6692" },
                      { label: "FX Impact", color: "#EEEFEF" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-[#29343D]">{item.label}</span>
                        </div>
                        <span className="font-semibold text-[#98A4AE]">€ 32K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* X-axis labels */}
            <div className="absolute h-[15.35px] right-0 left-[36px] top-[239px] flex flex-row items-start p-0">
              {series.map((p, i) => (
                <span
                  key={i}
                  className={`font-manrope font-normal text-center flex-1 min-w-0 transition-colors text-[11.3951px] leading-[15px] h-[15.35px] ${
                    hoveredIndex === i ? "text-[#34C759] font-bold" : "text-[#98A4AE]"
                  }`}
                >
                  {p.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // -------------------------------------------------------------
    // Tab 3: Breakdown Multi-line Chart
    // -------------------------------------------------------------
    const series = timeRange === "Monthly" ? breakdownPlans : breakdownPlans.map(plan => ({
      ...plan,
      points: plan.points.slice(0, 3)
    }));
    const count = timeRange === "Monthly" ? 9 : 3;
    const yLabels = ["100K", "80K", "60K", "40K", "20K", "0"];

    const getY = (val: number) => {
      return H - PY - (val / 100000) * (H - PY * 2);
    };

    const getLinePath = (points: number[]) => {
      const pts = points.map((val, idx) => {
        const x = PX + (idx * (W - PX * 2)) / Math.max(count - 1, 1);
        const y = getY(val);
        return { x, y };
      });
      if (pts.length < 2) return "";
      const d = [`M ${pts[0].x} ${pts[0].y}`];
      for (let i = 0; i < pts.length - 1; i++) {
        const c = pts[i], n = pts[i + 1];
        const p = pts[i - 1] ?? c, a = pts[i + 2] ?? n;
        d.push(`C ${c.x + (n.x - p.x) / 5} ${c.y + (n.y - p.y) / 5}, ${n.x - (a.x - c.x) / 5} ${n.y - (a.y - c.y) / 5}, ${n.x} ${n.y}`);
      }
      return d.join(" ");
    };

    const hovered = hoveredIndex !== null;
    const hPtX = hoveredIndex !== null ? PX + (hoveredIndex * (W - PX * 2)) / Math.max(count - 1, 1) : 0;

    return (
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
              {Array.from({ length: 9 }).map((_, i) => {
                const x = PX + (i * (W - PX * 2)) / (count - 1);
                return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F6F7F9" strokeWidth="0.949594" />;
              })}
            </svg>

            {/* Hover zones */}
            <div className="absolute inset-0 flex z-10">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="relative flex-1 cursor-crosshair"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>

            {/* SVG Breakdown Multi Line rendering */}
            <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              {series.map((plan) => (
                <path
                  key={plan.label}
                  d={getLinePath(plan.points)}
                  fill="none"
                  stroke={plan.color}
                  strokeWidth="1.89919"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* Hover line indicators and highlights */}
              {hovered && (
                <>
                  <line x1={hPtX} y1={PY} x2={hPtX} y2={H - PY} stroke="#007AFE" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
                  {series.map((plan) => {
                    const py = getY(plan.points[hoveredIndex!]);
                    return (
                      <circle
                        key={plan.label}
                        cx={hPtX} cy={py} r={4.5}
                        fill={plan.color}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </>
              )}
            </svg>

            {/* Tooltip for Breakdown */}
            {hovered && (
              <div
                className="pointer-events-none absolute z-30 flex flex-col items-start p-3.5 w-[180px] bg-[#FFFFFF] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)] border border-slate-100 rounded-[12px]"
                style={{
                  left: Math.min(Math.max((hPtX / W) * 100, 15), 80) + "%",
                  top: "10px",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="w-full flex flex-col gap-2.5">
                  <span className="font-manrope font-semibold text-[13px] text-[#29343D]">
                    Mar 03, 2025
                  </span>
                  <div className="flex flex-col gap-1.5 w-full">
                    {series.map((plan) => (
                      <div key={plan.label} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: plan.color }} />
                          <span className="text-[#29343D]">{plan.label}</span>
                        </div>
                        <span className="font-semibold text-[#98A4AE]">
                          € {Math.round(plan.points[hoveredIndex!] / 1000)}k
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* X-axis Month labels */}
            <div className="absolute h-[15.35px] right-0 left-[36px] top-[239px] flex flex-row items-start p-0">
              {Array.from({ length: count }).map((_, i) => {
                const label = timeRange === "Monthly" ? subscriberPoints[i]?.month : ["2023", "2024", "2025"][i];
                return (
                  <span
                    key={i}
                    className={`font-manrope font-normal text-center flex-1 min-w-0 transition-colors text-[11.3951px] leading-[15px] h-[15.35px] ${
                      hoveredIndex === i ? "text-[#007AFE] font-bold" : "text-[#98A4AE]"
                    }`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ---- Main Page Component ----
export default function SubscribersPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("Subscribers");
  
  // Breakdown specific By Plan selector state
  const [byPlanOpen, setByPlanOpen] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState("By Plan");

  const currentTableMonths = useMemo(() => {
    if (timeRange === "Monthly") {
      return [
        { label: "Jan 2025", key: "jan" },
        { label: "Feb 2025", key: "feb" },
        { label: "Mar 2025", key: "mar" },
        { label: "Apr 2025", key: "apr" },
        { label: "May 2025", key: "may" },
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

          <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setTimeRange("Monthly")}
            className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all flex items-center gap-2"
          >
            <RefreshIcon /> Resync
          </button>
        </div>
      </div>
        </div>

        {/* Chart Card */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between border-b border-slate-50 pb-4">
            
            {/* Title, Filter button, and Subtabs */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
                  Subscriber Movements
                </h2>
                <button
                  type="button"
                  className="inline-flex h-[36px] items-center gap-1.5 rounded-[8px] bg-[#EFF4FA] px-4 text-[12px] font-medium text-[#0A2540] hover:opacity-80 transition-opacity"
                >
                  <AdjustmentsIcon /> Filter
                </button>
              </div>

              {/* Tab options link bar */}
              <div className="flex items-center gap-4.5 h-[36px] mt-1 border-b border-slate-100 w-full">
                {(["Subscribers", "Movements", "Breakdown"] as SubTab[]).map((tab) => {
                  const isActive = activeSubTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveSubTab(tab)}
                      className={`h-full px-1 text-[12px] font-semibold transition-all border-b-2 ${
                        isActive
                          ? "border-[#635BFF] text-[#635BFF]"
                          : "border-transparent text-[#0A2540] hover:text-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side options dropdown and toggles */}
            <div className="flex flex-wrap items-center gap-2 self-end xl:self-auto">
              
              {/* Optional: "By Plan" selection block shown ONLY in Breakdown subtab */}
              {activeSubTab === "Breakdown" && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setByPlanOpen((v) => !v)}
                    className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 text-[12px] font-medium text-[#0A2540] hover:bg-[#F7F9FC]"
                  >
                    {selectedPlanType} <ChevronDownIcon />
                  </button>
                  {byPlanOpen && (
                    <div className="absolute right-0 top-[42px] z-30 w-[140px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)]">
                      {["By Plan", "By Region", "By Frequency"].map((pType) => (
                        <button
                          key={pType}
                          type="button"
                          onClick={() => {
                            setSelectedPlanType(pType);
                            setByPlanOpen(false);
                          }}
                          className={`flex h-9 w-full items-center rounded-[8px] px-3 text-[12px] font-medium ${
                            selectedPlanType === pType ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                          }`}
                        >
                          {pType}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Time range selection */}
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

              {/* Chart Mode Toggle */}
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

          {/* Renders chart based on currently selected tab */}
          <div className="pb-4">
            <SubscribersChart
              timeRange={timeRange}
              activeSubTab={activeSubTab}
              chartMode={chartMode}
              setExportModalOpen={setExportModalOpen}
            />
          </div>

          {/* Dynamically display the appropriate stat cards grids */}
          {activeSubTab === "Subscribers" ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard title="Current Customers" value="1740" subtitle="End-of-march total" />
              <StatCard title="Net Change" value="1740" subtitle="vs Last Month 0%" />
              <StatCard title="Net Change" value="1740" subtitle="vs March Last Year 0%" />
              <StatCard title="New Customers In March" value="1740" subtitle="0% of start-of-month base" />
              <StatCard title="Churned Customers In March" value="1588" subtitle="(9.57%)" subtitleClass="text-[#FF6692]" />
            </div>
          ) : activeSubTab === "Movements" ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <StatCard title="Net Movement" value="€ 463,570" subtitle="this month" />
              <StatCard title="New Subscribers" value="356" subtitle="€ 200,000" />
              <StatCard title="Churned Subscribers" value="120" subtitle="€ 100,000" />
              <StatCard title="Reactivated Subscribers" value="75" subtitle="this month" />
              <StatCard title="Expanded Subscribers" value="€ 200,000" subtitle="this month" />
              <StatCard title="Growth Rate" value="7.05%" subtitle="this month" subtitleClass="text-[#36C76C]" />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <StatCard
                title="Top plan by subscriber count"
                value="Premium"
                subtitle={
                  <span>
                    200 <span className="text-[#36C76C]">10%</span>
                  </span>
                }
              />
              <StatCard
                title="Top plan by revenue"
                value="Premium"
                subtitle={
                  <span>
                    € 200,000 <span className="text-[#36C76C]">10%</span>
                  </span>
                }
              />
              <StatCard
                title="Bottom plan by subscriber count"
                value="Enterprise"
                subtitle={
                  <span>
                    200 <span className="text-[#36C76C]">10%</span>
                  </span>
                }
              />
              <StatCard
                title="Bottom plan by revenue"
                value="Enterprise"
                subtitle={
                  <span>
                    € 200,000 <span className="text-[#36C76C]">10%</span>
                  </span>
                }
              />
              <StatCard
                title="Total subscribers (all plans)"
                value="400"
                subtitle={<span className="text-[#36C76C]">10%</span>}
              />
              <StatCard
                title="Total MRR from all plans"
                value="€ 400,000"
                subtitle={<span className="text-[#36C76C]">10%</span>}
              />
            </div>
          )}
        </section>

        {/* Table 1: Subscriber Grid details */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F3F3FF]">
                  <th className="w-[180px] border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-bold text-[#29343D]"></th>
                  {currentTableMonths.map((m) => (
                    <th
                      key={m.key}
                      className="border-b border-r border-[#E0E6EB] px-6 py-4 text-right text-[16px] font-bold text-[#29343D]"
                    >
                      {m.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mainTableRows.map((row) => {
                  const bgClass = row.isBgGray ? "bg-[#FAFAFA]" : "bg-white";
                  return (
                    <tr key={row.label} className={`${bgClass}`}>
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-bold text-[#29343D]">
                        {row.label}
                      </td>
                      {currentTableMonths.map((m) => (
                        <td
                          key={m.key}
                          className={`border-b border-r border-[#E0E6EB] px-6 py-4 text-right text-[14px] text-[#29343D] ${row.valueClass || ""}`}
                        >
                          {row.values[m.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Movements Transactions list */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F5F4FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Date</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Customer</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Description</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Type</th>
                  <th className="border-b border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">MRR change</th>
                </tr>
              </thead>
              <tbody>
                {movementTransactions.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-[#FAFAFA]">
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.date}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.customer}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.description}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.type}</td>
                    <td className="border-b border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Export Modal overlay */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="relative w-[638px] h-[400px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] flex flex-col p-6 gap-6 justify-between box-sizing-border-box">
              <div className="flex flex-row items-center justify-between w-full h-[54px] border-b border-slate-100 pb-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-manrope font-bold text-[18px] text-[#29343D]">
                    Export Subscriber Details
                  </span>
                  <span className="font-manrope font-normal text-[14px] text-[#98A4AE]">
                    Generate spreadsheets for all customer lists
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

              <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
                <svg className="text-[#FFD648]" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span className="text-[14px] text-[#29343D] font-medium max-w-sm">
                  Click the button below to download the CSV statement of current movements.
                </span>
              </div>

              <div className="flex justify-end pt-4 gap-3">
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
