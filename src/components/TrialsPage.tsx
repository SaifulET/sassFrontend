"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";
import AnalyticsHeader from "./AnalyticsHeader";

type ChartMode = "line" | "bar";
type SubTab = "New Trials" | "Conversion rate";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";

type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

// ---- Curves Data for each Tab ----
const newTrialsPoints: ChartPoint[] = [
  { month: "Jan", value: 66 },
  { month: "Feb", value: 61 },
  { month: "Mar", value: 51 },
  { month: "Apr", value: 62 },
  { month: "May", value: 52 },
  { month: "Jun", value: 66 },
  { month: "Jul", value: 52 },
  { month: "Aug", value: 34 },
  { month: "Sep", value: 38 },
];

const conversionRatePoints: ChartPoint[] = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 32 },
  { month: "Mar", value: 60 },
  { month: "Apr", value: 48 },
  { month: "May", value: 60 },
  { month: "Jun", value: 48 },
  { month: "Jul", value: 56 },
  { month: "Aug", value: 60 },
  { month: "Sep", value: 72 },
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
    label: "Trials",
    values: { jan: "476", feb: "476", mar: "476", apr: "476", may: "476" },
  },
  {
    label: "Converted",
    isBgGray: true,
    values: { jan: "66", feb: "66", mar: "66", apr: "66", may: "66" },
  },
  {
    label: "Conversion rate",
    values: { jan: "13.87%", feb: "13.87%", mar: "13.87%", apr: "-", may: "13.87%" },
  },
];

const trialsTransactionsLogs = [
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
  { created: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", email: "Example", trialStarted: "-", paidStarted: "-", cancelDate: "-" },
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

// ---- Red/Green mini sparklines ----
const MiniSparklineRed = () => (
  <svg className="w-[52.88px] h-[24px]" viewBox="0 0 53 24" fill="none">
    <path d="M1 18 Q 13 8, 26 15 T 52 10" stroke="#FF6692" strokeWidth="1.6" fill="none" />
  </svg>
);

const MiniSparklineGreen = () => (
  <svg className="w-[52.88px] h-[24px]" viewBox="0 0 53 24" fill="none">
    <path d="M1 18 Q 13 8, 26 15 T 52 10" stroke="#36C76C" strokeWidth="1.6" fill="none" />
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

// ---- Chart Component ----
function TrialsChart({
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

  const series = useMemo(() => {
    if (timeRange === "Monthly") {
      return activeSubTab === "New Trials" ? newTrialsPoints : conversionRatePoints;
    }
    // Yearly and custom ranges
    if (activeSubTab === "New Trials") {
      return [
        { month: "2023", value: 35 },
        { month: "2024", value: 48 },
        { month: "2025", value: 58 },
      ];
    }
    return [
      { month: "2023", value: 40 },
      { month: "2024", value: 48 },
      { month: "2025", value: 58 },
    ];
  }, [timeRange, activeSubTab]);

  const count = series.length;

  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  const yLabels = ["70", "60", "50", "40", "30", "20"];

  // getY mapping (raw scale 20 to 70)
  const getY = (val: number) => {
    return H - PY - ((val - 20) / 50) * (H - PY * 2);
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

  const tooltipValue =
    activeSubTab === "New Trials"
      ? "581"
      : "13.87%";

  const barW = Math.min(Math.max(((W - PX * 2) / count) * 0.45, 12), 48);

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
            {chartMode !== "bar" && series.map((_, i) => {
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

          <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {chartMode === "bar" ? (
              <>
                {series.map((point, i) => {
                  const cx = PX + (i * (W - PX * 2)) / (count - 1);
                  const bx = cx - barW / 2;
                  const bh = Math.max(((point.value - 20) / 50) * (H - PY * 2), 8);
                  const by = H - PY - bh;
                  const isHov = hoveredIndex === i;
                  return (
                    <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9}>
                      <rect
                        x={bx} y={by} width={barW} height={bh}
                        fill={isHov ? "#FFD648" : "#EFF4FA"}
                        rx={4}
                      />
                    </g>
                  );
                })}
              </>
            ) : (
              <>
                <defs>
                  <linearGradient id="yellow-trials-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="58.56%" stopColor="#FFD648" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#FFD648" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gradient area fill */}
                <path d={areaPath} fill="url(#yellow-trials-gradient)" />

                {/* Line Curve */}
                <path d={linePath} fill="none" stroke="#FFD648" strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />

                {/* Hover dot */}
                {hPt && (
                  <>
                    <circle cx={hPt.x} cy={hPt.y} r={5.5} fill="#FFD648" stroke="#FFFFFF" strokeWidth="1.89919" />
                    <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#FFD648" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                  </>
                )}
              </>
            )}
          </svg>

          {/* Hover Tooltip */}
          {hovered && (
            <div
              className="pointer-events-none absolute z-30 flex flex-col items-start p-0 w-[96.79px] h-[54.79px] bg-[#FFFFFF] shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px]"
              style={{
                left: Math.min(Math.max((tipX / W) * 100, 10), 80) + "%",
                top: Math.max((tipY / H) * 100 - 15, 5) + "%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex flex-col items-start p-0 w-[96.79px] h-[54.79px]">
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[96.79px] h-[27.4px]">
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D]">
                    {series[hoveredIndex!]?.month} 03, 2025
                  </span>
                </div>
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[96.79px] h-[27.4px] self-stretch border-t border-slate-50">
                  <span className="w-[7.6px] h-[7.6px] bg-[#FFD648] rounded-[7.59675px]" />
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] mr-auto">
                    Trials
                  </span>
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#98A4AE]">
                    {tooltipValue}
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
                    hoveredIndex === i ? "text-[#FFD648] font-bold" : "text-[#98A4AE]"
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

// ---- Main Page Component ----
export default function TrialsPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("New Trials");

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

  const currentTableRows = useMemo(() => {
    if (timeRange === "Monthly") {
      return [
        {
          label: "Trials",
          values: { jan: "476", feb: "476", mar: "476", apr: "476", may: "476" },
        },
        {
          label: "Converted",
          isBgGray: true,
          values: { jan: "66", feb: "66", mar: "66", apr: "66", may: "66" },
        },
        {
          label: "Conversion rate",
          values: { jan: "13.87%", feb: "13.87%", mar: "13.87%", apr: "-", may: "13.87%" },
        },
      ];
    }
    return [
      {
        label: "Trials",
        values: { jan: "4,800", feb: "5,200", mar: "5,800" },
      },
      {
        label: "Converted",
        isBgGray: true,
        values: { jan: "660", feb: "720", mar: "810" },
      },
      {
        label: "Conversion rate",
        values: { jan: "13.75%", feb: "13.85%", mar: "13.97%" },
      },
    ];
  }, [timeRange]);

  // Dynamic Section Title depending on activeSubTab
  const dynamicTitle =
    activeSubTab === "New Trials"
      ? "Trials"
      : "Conversion rate";

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

        {/* Chart card panel */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between border-b border-slate-50 pb-4">
            
            {/* Title, Filter, Subtabs */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
                  {dynamicTitle}
                </h2>
                <button
                  type="button"
                  className="inline-flex h-[36px] items-center gap-1.5 rounded-[8px] bg-[#EFF4FA] px-4 text-[12px] font-medium text-[#0A2540] hover:opacity-80 transition-opacity"
                >
                  <AdjustmentsIcon /> Filter
                </button>
              </div>

              {/* Subtab selection links */}
              <div className="flex items-center gap-4.5 h-[36px] mt-1 border-b border-slate-100 w-full">
                {(["New Trials", "Conversion rate"] as SubTab[]).map((tab) => {
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

            {/* Right side options selector */}
            <div className="flex flex-wrap items-center gap-2 self-end xl:self-auto">
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

          {/* Renders line chart curve */}
          <div className="pb-4">
            <TrialsChart
              timeRange={timeRange}
              activeSubTab={activeSubTab}
              chartMode={chartMode}
              setExportModalOpen={setExportModalOpen}
            />
          </div>

          {/* Five Stat Cards (ONLY shown on New Trials subtab view) */}
          {activeSubTab === "New Trials" && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard
                title="Total Trials This Year"
                value="150"
                subtitle={<MiniSparklineRed />}
              />
              <StatCard
                title="YoY Change in Trials"
                value="250"
                subtitle={
                  <div className="flex items-center gap-2">
                    <MiniSparklineGreen />
                    <span className="text-[#36C76C] text-[13px] font-bold">10%</span>
                  </div>
                }
              />
              <StatCard
                title="Total Converted Trials This Year"
                value="1,289"
                subtitle={<MiniSparklineRed />}
              />
              <StatCard
                title="Average Trial-to-Paid Conversion Rate"
                value="2023"
                subtitle=""
              />
              <StatCard
                title="Best Conversion Month"
                value="March"
                subtitle=""
              />
            </div>
          )}
        </section>

        {/* Table 1: Trials breakdown grid */}
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
                {currentTableRows.map((row) => {
                  const bgClass = row.isBgGray ? "bg-[#FAFAFA]" : "bg-white";
                  return (
                    <tr key={row.label} className={`${bgClass}`}>
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-bold text-[#29343D]">
                        {row.label}
                      </td>
                      {currentTableMonths.map((m) => (
                        <td
                          key={m.key}
                          className="border-b border-r border-[#E0E6EB] px-6 py-4 text-right text-[14px] text-[#29343D]"
                        >
                          {(row.values as any)[m.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Activity Log records */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F5F4FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Created</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Customer Name</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Email</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Trial started</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Paid started</th>
                  <th className="border-b border-[#E0E6EB] px-6 py-4 text-[14px] font-semibold text-[#29343D]">Cancel date</th>
                </tr>
              </thead>
              <tbody>
                {trialsTransactionsLogs.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-[#FAFAFA]">
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.created}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.customer}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.email}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.trialStarted}</td>
                    <td className="border-b border-r border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.paidStarted}</td>
                    <td className="border-b border-[#E0E6EB] px-6 py-4 text-[14px] text-[#29343D]">{row.cancelDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Export Data Modal */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="relative w-[638px] h-[400px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] flex flex-col p-6 gap-6 justify-between box-sizing-border-box">
              <div className="flex flex-row items-center justify-between w-full h-[54px] border-b border-slate-100 pb-2">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-manrope font-bold text-[18px] text-[#29343D]">
                    Export Trial Conversion Data
                  </span>
                  <span className="font-manrope font-normal text-[14px] text-[#98A4AE]">
                    Generate spreadsheets for all trial funnel reports
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
                  Click the button below to download the CSV statement of current trials conversion funnel.
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
