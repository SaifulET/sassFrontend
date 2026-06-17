"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";

type ChartMode = "line" | "bar";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";

type ChartPoint = { label: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

// ---- Static Data Sets for ARPA ----
const arpaMonthlyPoints: ChartPoint[] = [
  { label: "Jan", value: 43000 },
  { label: "Feb", value: 59000 },
  { label: "Mar", value: 48000 },
  { label: "Abr", value: 34000 },
  { label: "May", value: 27000 },
  { label: "Jun", value: 59000 },
  { label: "Jul", value: 40000 },
  { label: "Aug", value: 36000 },
  { label: "Sep", value: 27000 },
];

const arpaYearlyPoints: ChartPoint[] = [
  { label: "2023", value: 35000 },
  { label: "2024", value: 48000 },
  { label: "2025", value: 62000 },
];

const arpaCustomPoints: ChartPoint[] = [
  { label: "2023", value: 38000 },
  { label: "2024", value: 52000 },
  { label: "2025", value: 68000 },
];

// Table 1 Monthly Rows
const monthlyTableRows = [
  { month: "Jan 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Feb 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Mar 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Apr 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "May 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Jun 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Jul 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Ago 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
  { month: "Set 2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476", topSalon: "€ 821", bottomSalon: "€ 321" },
];

// Table 1 Yearly Rows
const yearlyTableRows = [
  { month: "2023", arpa: "€ 232", deltaAmt: "€ 420", deltaPct: "3%", deltaYearAmt: "€ 340", deltaYearPct: "3%", totalRev: "€ 410k", topSalon: "€ 790", bottomSalon: "€ 290" },
  { month: "2024", arpa: "€ 248", deltaAmt: "€ 455", deltaPct: "3.5%", deltaYearAmt: "€ 360", deltaYearPct: "3.5%", totalRev: "€ 445k", topSalon: "€ 810", bottomSalon: "€ 310" },
  { month: "2025", arpa: "€ 255", deltaAmt: "€ 476", deltaPct: "4%", deltaYearAmt: "€ 376", deltaYearPct: "4%", totalRev: "€ 476k", topSalon: "€ 821", bottomSalon: "€ 321" },
];

// Table 1 Custom Rows
const customTableRows = [
  { month: "2023 (Custom)", arpa: "€ 238", deltaAmt: "€ 430", deltaPct: "3.2%", deltaYearAmt: "€ 345", deltaYearPct: "3.2%", totalRev: "€ 420k", topSalon: "€ 795", bottomSalon: "€ 295" },
  { month: "2024 (Custom)", arpa: "€ 250", deltaAmt: "€ 460", deltaPct: "3.8%", deltaYearAmt: "€ 365", deltaYearPct: "3.8%", totalRev: "€ 455k", topSalon: "€ 815", bottomSalon: "€ 315" },
  { month: "2025 (Custom)", arpa: "€ 258", deltaAmt: "€ 482", deltaPct: "4.2%", deltaYearAmt: "€ 382", deltaYearPct: "4.2%", totalRev: "€ 482k", topSalon: "€ 825", bottomSalon: "€ 325" },
];

// Table 2 (Salon Rankings Data)
const salonRankings = [
  { rank: "#01", name: "Beauty Wellness Center", subType: "Premium", city: "Rome", earnings: "€ 376", manager: "Roberto Marini", email: "roberto@beautywellness.com" },
  { rank: "#02", name: "Beauty Wellness Center", subType: "Basic", city: "Rome", earnings: "€ 366", manager: "Roberto Marini", email: "roberto@beautywellness.com" },
  { rank: "#03", name: "Beauty Wellness Center", subType: "Enterprise", city: "Rome", earnings: "€ 356", manager: "Dr. Marco Rossi", email: "marco.rossi@elitebeauty.com" },
  { rank: "#04", name: "Beauty Wellness Center", subType: "Enterprise", city: "Rome", earnings: "€ 346", manager: "Dr. Marco Rossi", email: "marco.rossi@elitebeauty.com" },
  { rank: "#05", name: "Beauty Wellness Center", subType: "Basic", city: "Rome", earnings: "€ 336", manager: "Anna Bianchi", email: "anna@glamourlounge.com" },
  { rank: "#06", name: "Beauty Wellness Center", subType: "Premium", city: "Rome", earnings: "€ 326", manager: "Anna Bianchi", email: "anna@glamourlounge.com" },
  { rank: "#07", name: "Beauty Wellness Center", subType: "Premium", city: "Rome", earnings: "€ 316", manager: "Francesca Neri", email: "francesca@hairartstudio.com" },
  { rank: "#08", name: "Beauty Wellness Center", subType: "Premium", city: "Rome", earnings: "€ 306", manager: "Francesca Neri", email: "francesca@hairartstudio.com" },
  { rank: "#09", name: "Beauty Wellness Center", subType: "Premium", city: "Rome", earnings: "€ 296", manager: "Alessandro Costa", email: "alessandro@luxuryspa.com" },
  { rank: "#10", name: "Beauty Wellness Center", subType: "Premium", city: "Rome", earnings: "€ 286", manager: "Alessandro Costa", email: "alessandro@luxuryspa.com" },
];

// ---- Icons ----
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 1 0 2 5" /><path d="M20 5v6h-6" />
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

// ---- Local StatCard ----
interface StatCardProps {
  title: string;
  value: string;
  subtitle: string | React.ReactNode;
  subtitleClass?: string;
}
function StatCard({ title, value, subtitle, subtitleClass = "text-[#29343D]" }: StatCardProps) {
  return (
    <div className="box-sizing-border-box flex flex-col justify-center items-center p-6 gap-1 h-[147px] bg-white rounded-xl bg-white shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-1 min-w-0">
      <span className="font-manrope font-semibold text-[13px] leading-[18px] text-[#29343D] text-center">{title}</span>
      <span className="font-manrope font-semibold text-[24px] leading-[29px] text-[#29343D] text-center mt-1">{value}</span>
      <span className={`font-manrope font-semibold text-[13px] leading-[18px] text-center mt-1 ${subtitleClass}`}>{subtitle}</span>
    </div>
  );
}

// ---- Chart Component ----
function ARPAChart({
  timeRange,
  chartMode,
}: {
  timeRange: TimeRange;
  chartMode: ChartMode;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const series = useMemo(() => {
    if (timeRange === "Yearly") return arpaYearlyPoints;
    if (timeRange === "2023-2025") return arpaCustomPoints;
    return arpaMonthlyPoints;
  }, [timeRange]);

  const count = series.length;

  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  const yLabels = ["70k", "60k", "50k", "40k", "30k", "20k"];

  // getY mapping (linear scale 20k to 70k)
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

  // Tooltip display values
  const tooltipValue = useMemo(() => {
    if (!hPt) return "";
    return `€ ${Math.round(hPt.value / 1000) * 5 + 5}`; // matching style of € 255 scaled
  }, [hPt]);

  const barW = Math.min(Math.max(((W - PX * 2) / Math.max(count, 1)) * 0.45, 20), 48);

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
                        fill={isHov ? "#16CDC7" : "#EFF4FA"}
                        rx={4}
                      />
                    </g>
                  );
                })}
              </>
            ) : (
              <>
                <defs>
                  <linearGradient id="turquoise-arpa-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="43.39%" stopColor="#16CDC7" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#16CDC7" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gradient area fill */}
                <path d={areaPath} fill="url(#turquoise-arpa-gradient)" />

                {/* Line Curve */}
                <path d={linePath} fill="none" stroke="#16CDC7" strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />

                {/* Hover dot */}
                {hPt && (
                  <>
                    <circle cx={hPt.x} cy={hPt.y} r={5.5} fill="#16CDC7" stroke="#FFFFFF" strokeWidth="1.89919" />
                    <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#16CDC7" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                  </>
                )}
              </>
            )}
          </svg>

          {/* Hover Tooltip */}
          {hovered && hPt && (
            <div
              className="pointer-events-none absolute z-30 flex flex-col items-start p-0 w-[108.58px] h-[54.79px] bg-[#FFFFFF] shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px]"
              style={{
                left: Math.min(Math.max((tipX / W) * 100, 10), 80) + "%",
                top: Math.max((tipY / H) * 100 - 15, 5) + "%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex flex-col items-start p-0 w-[108.58px] h-[54.79px]">
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[108.58px] h-[27.4px]">
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] whitespace-nowrap">
                    {hPt.label === "Jan" || hPt.label === "Feb" || hPt.label === "Mar" || hPt.label === "Abr" || hPt.label === "May" || hPt.label === "Jun" || hPt.label === "Jul" || hPt.label === "Aug" || hPt.label === "Sep"
                      ? `${hPt.label} 03, 2025`
                      : `Year ${hPt.label}`}
                  </span>
                </div>
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[108.58px] h-[27.4px] self-stretch border-t border-slate-50">
                  <span className="w-[7.6px] h-[7.6px] bg-[#16CDC7] rounded-[7.59675px]" />
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] mr-auto">
                    ARPA
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
                    hoveredIndex === i ? "text-[#16CDC7] font-semibold" : "text-[#98A4AE]"
                  }`}
                  style={{
                    left: `${(x / W) * 100}%`,
                    transform: "translateX(-50%)",
                    width: "80px",
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
  );
}

// ---- Main Page Component ----
export default function ARPAPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Table 2 states
  const [planFilter, setPlanFilter] = useState<"All" | "Basic" | "Premium" | "Enterprise">("All");
  const [cityFilter, setCityFilter] = useState("All cities");
  const [earningsOrder, setEarningsOrder] = useState<"Highest to Lowest" | "Lowest to Highest">("Highest to Lowest");
  const [cityOpen, setCityOpen] = useState(false);
  const [earningsOpen, setEarningsOpen] = useState(false);

  const toggleChartMode = useCallback(() => {
    setChartMode((m) => (m === "line" ? "bar" : "line"));
  }, []);

  // Filtered ranking list
  const filteredRankings = useMemo(() => {
    let result = [...salonRankings];
    if (planFilter !== "All") {
      result = result.filter((s) => s.subType === planFilter);
    }
    if (cityFilter !== "All cities") {
      result = result.filter((s) => s.city === cityFilter);
    }
    if (earningsOrder === "Highest to Lowest") {
      result.sort((a, b) => parseFloat(b.earnings.replace("€", "")) - parseFloat(a.earnings.replace("€", "")));
    } else {
      result.sort((a, b) => parseFloat(a.earnings.replace("€", "")) - parseFloat(b.earnings.replace("€", "")));
    }
    return result;
  }, [planFilter, cityFilter, earningsOrder]);

  // Dynamic values depending on timeRange selection
  const tableData = useMemo(() => {
    if (timeRange === "Yearly") return yearlyTableRows;
    if (timeRange === "2023-2025") return customTableRows;
    return monthlyTableRows;
  }, [timeRange]);

  const exportRows = [
    { label: "Current Average Revenue Per Salon", value: "€ 255" },
    { label: "Change vs Last Month", value: "€ 267 (10%)" },
    { label: "Change vs Same Month Last Year", value: "€ 268 (2%)" },
    { label: "Highest Average in Past 12 Months", value: "€ 256" },
    { label: "Lowest Average in Past 12 Months", value: "€ 111" },
  ];

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

        {/* Chart Panel */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D]">
              Average Revenue Per Salon
            </h2>

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
            <ARPAChart
              timeRange={timeRange}
              chartMode={chartMode}
            />
          </div>

          {/* 5 Stat Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              title="Current Average Revenue Per Salon"
              value="€ 255"
              subtitle=""
            />
            <StatCard
              title="Change vs Last Month"
              value="€ 267"
              subtitle="10%"
              subtitleClass="text-[#FF6692] font-semibold"
            />
            <StatCard
              title="Change vs Same Month Last Year"
              value="€ 268"
              subtitle="2%"
              subtitleClass="text-[#FF6692] font-semibold"
            />
            <StatCard
              title="Highest Average in Past 12 Months"
              value="€ 256"
              subtitle="March"
              subtitleClass="text-[#29343D] font-semibold"
            />
            <StatCard
              title="Lowest Average in Past 12 Months"
              value="€ 111"
              subtitle="April"
              subtitleClass="text-[#29343D] font-semibold"
            />
          </div>
        </section>

        {/* Table 1: ARPA Breakdown grid */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[1000px] w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
                  <th className="px-6 py-[14px] font-bold text-[#29343D]">Month</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Average Revenue Per Salon (€)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Δ vs Previous Month (€)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Δ vs Previous Month (%)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Δ vs Same Month Last Year (€)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Δ vs Same Month Last Year (%)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Total Salon Revenue (€)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Top Salon (Revenue)</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right">Bottom Salon (Revenue)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => {
                  const bgClass = idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white";
                  return (
                    <tr key={idx} className={`${bgClass} border-b border-[#E0E6EB]`}>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 font-semibold text-[#29343D]">{row.month}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.arpa}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.deltaAmt}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.deltaPct}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.deltaYearAmt}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.deltaYearPct}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.totalRev}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-right text-[#29343D]">{row.topSalon}</td>
                      <td className="px-6 py-4 text-right text-[#29343D]">{row.bottomSalon}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Salon Rankings with selectors */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          
          {/* Header selectors */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-[12px]">
            {/* Plan selector */}
            <div className="flex items-center gap-1 bg-[#F5F8FC]/80 p-1 rounded-[10px]">
              {(["All", "Basic", "Premium", "Enterprise"] as const).map((plan) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setPlanFilter(plan)}
                  className={`px-3 py-1.5 rounded-[8px] font-semibold transition-all ${
                    planFilter === plan ? "bg-white text-[#635BFF] shadow-sm" : "text-[#7e8b9b] hover:text-[#29343D]"
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>

            {/* City dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityOpen((v) => !v)}
                className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
              >
                {cityFilter} <ChevronDownIcon />
              </button>
              {cityOpen && (
                <div className="absolute left-0 top-[40px] z-30 w-[160px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)]">
                  {["All cities", "Rome", "Bologna", "Milano"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCityFilter(c);
                        setCityOpen(false);
                      }}
                      className={`flex h-9 w-full items-center rounded-[8px] px-3 font-medium ${
                        cityFilter === c ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Earnings sort */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setEarningsOpen((v) => !v)}
                className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 font-semibold text-[#0A2540] hover:bg-[#F7F9FC]"
              >
                {earningsOrder} <ChevronDownIcon />
              </button>
              {earningsOpen && (
                <div className="absolute left-0 top-[40px] z-30 w-[180px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)]">
                  {["Highest to Lowest", "Lowest to Highest"].map((ord) => (
                    <button
                      key={ord}
                      type="button"
                      onClick={() => {
                        setEarningsOrder(ord as any);
                        setEarningsOpen(false);
                      }}
                      className={`flex h-9 w-full items-center rounded-[8px] px-3 font-medium ${
                        earningsOrder === ord ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                      }`}
                    >
                      {ord}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subscribed dropdown */}
            <div className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 font-semibold text-[#0A2540]">
              Subscribed at Start <ChevronDownIcon />
            </div>
          </div>

          {/* Rankings Table */}
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
                  <th className="px-6 py-[14px] font-bold text-[#29343D] w-[140px]">Ranking position</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D]">Salon Name</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-center w-[160px]">Subscription type</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-center w-[160px]">City</th>
                  <th className="px-6 py-[14px] font-bold text-[#29343D] text-right w-[160px]">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {filteredRankings.map((row, idx) => {
                  const badgeColor =
                    row.subType === "Premium"
                      ? "bg-emerald-50 text-emerald-600"
                      : row.subType === "Basic"
                      ? "bg-indigo-50 text-indigo-600"
                      : "bg-[#DDDBFF] text-[#635BFF]";
                  return (
                    <tr key={idx} className="bg-white border-b border-[#E0E6EB] hover:bg-slate-50 transition-colors">
                      <td className="border-r border-[#E0E6EB] px-6 py-4 font-bold text-[#7e8b9b]">{row.rank}</td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#635BFF] font-bold text-sm">
                            S
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-[#29343D] leading-tight">{row.name}</span>
                            <span className="text-xs text-[#98A4AE] mt-0.5">{row.manager} • {row.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-[6px] text-xs font-semibold ${badgeColor}`}>
                          {row.subType}
                        </span>
                      </td>
                      <td className="border-r border-[#E0E6EB] px-6 py-4 text-center text-[#29343D] font-medium">{row.city}</td>
                      <td className="px-6 py-4 text-right font-bold text-[#29343D]">{row.earnings}</td>
                    </tr>
                  );
                })}
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
                    Export ARPA Data
                  </span>
                  <span className="font-manrope font-normal text-[14px] text-[#98A4AE]">
                    Generate spreadsheets for Average Revenue Per Salon
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
