"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";

type ChartMode = "line" | "bar";
type SubTab = "New Leads" | "Lead-to-trial conversion" | "Lead-to-paid conversion";
type TimeRange = "Monthly" | "Weekly" | "Daily" | "Custom range";
type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Weekly", "Daily", "Custom range"];

// ---- Curves Data for each Tab ----
const newLeadsPoints: ChartPoint[] = [
  { month: "Jul", value: 48 },
  { month: "Aug", value: 50 },
  { month: "Sep", value: 65 },
  { month: "Oct", value: 58 },
  { month: "Nov", value: 115 },
  { month: "Dec", value: 110 },
];

const leadToTrialPoints: ChartPoint[] = [
  { month: "Jul", value: 38 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 55 },
  { month: "Oct", value: 60 },
  { month: "Nov", value: 95 },
  { month: "Dec", value: 105 },
];

const leadToPaidPoints: ChartPoint[] = [
  { month: "Jul", value: 28 },
  { month: "Aug", value: 35 },
  { month: "Sep", value: 48 },
  { month: "Oct", value: 52 },
  { month: "Nov", value: 85 },
  { month: "Dec", value: 92 },
];

interface PerformanceMetricRow {
  period: string;
  leads: string;
  trials: string;
  converted: string;
  leadToTrialRate: string;
  leadToPaidRate: string;
  trialToPaidRate: string;
}

const performanceMetricsRows: PerformanceMetricRow[] = [
  {
    period: "Mar 2025",
    leads: "108",
    trials: "72",
    converted: "54",
    leadToTrialRate: "60%",
    leadToPaidRate: "60%",
    trialToPaidRate: "60%",
  },
  {
    period: "Apr 2025",
    leads: "108",
    trials: "72",
    converted: "54",
    leadToTrialRate: "60%",
    leadToPaidRate: "60%",
    trialToPaidRate: "60%",
  },
  {
    period: "May 2025",
    leads: "108",
    trials: "72",
    converted: "54",
    leadToTrialRate: "5%",
    leadToPaidRate: "5%",
    trialToPaidRate: "5%",
  },
  {
    period: "Jun 2025",
    leads: "108",
    trials: "72",
    converted: "54",
    leadToTrialRate: "9%",
    leadToPaidRate: "9%",
    trialToPaidRate: "9%",
  },
  {
    period: "Jul 2025",
    leads: "108",
    trials: "72",
    converted: "54",
    leadToTrialRate: "20%",
    leadToPaidRate: "20%",
    trialToPaidRate: "20%",
  },
  {
    period: "Aug 2025",
    leads: "108",
    trials: "72",
    converted: "54",
    leadToTrialRate: "20%",
    leadToPaidRate: "20%",
    trialToPaidRate: "20%",
  },
];

// ---- Icons ----
const RefreshIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" />
  </svg>
);

const TrashIconMini = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const DownloadIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const getRateBadgeClass = (rate: string) => {
  if (rate === "60%") {
    return "bg-[#EBFAF0] text-[#36C76C]";
  }
  if (rate === "20%") {
    return "bg-[#FFEAD2] text-[#FFAD46]";
  }
  return "bg-[#FFE5ED] text-[#FF6692]";
};

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

// ---- Chart Area ----
function LeadsChart({
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
    if (timeRange === "Weekly") {
      return activeSubTab === "New Leads"
        ? [
            { month: "W1", value: 30 },
            { month: "W2", value: 45 },
            { month: "W3", value: 35 },
            { month: "W4", value: 50 },
            { month: "W5", value: 40 },
            { month: "W6", value: 65 },
          ]
        : activeSubTab === "Lead-to-trial conversion"
        ? [
            { month: "W1", value: 20 },
            { month: "W2", value: 35 },
            { month: "W3", value: 40 },
            { month: "W4", value: 30 },
            { month: "W5", value: 45 },
            { month: "W6", value: 50 },
          ]
        : [
            { month: "W1", value: 15 },
            { month: "W2", value: 25 },
            { month: "W3", value: 30 },
            { month: "W4", value: 22 },
            { month: "W5", value: 35 },
            { month: "W6", value: 42 },
          ];
    }

    if (timeRange === "Daily") {
      return activeSubTab === "New Leads"
        ? [
            { month: "Mon", value: 10 },
            { month: "Tue", value: 15 },
            { month: "Wed", value: 12 },
            { month: "Thu", value: 20 },
            { month: "Fri", value: 25 },
            { month: "Sat", value: 18 },
          ]
        : activeSubTab === "Lead-to-trial conversion"
        ? [
            { month: "Mon", value: 8 },
            { month: "Tue", value: 12 },
            { month: "Wed", value: 10 },
            { month: "Thu", value: 15 },
            { month: "Fri", value: 18 },
            { month: "Sat", value: 14 },
          ]
        : [
            { month: "Mon", value: 5 },
            { month: "Tue", value: 10 },
            { month: "Wed", value: 8 },
            { month: "Thu", value: 12 },
            { month: "Fri", value: 14 },
            { month: "Sat", value: 11 },
          ];
    }

    // Default to Monthly and Custom Range
    return activeSubTab === "New Leads"
      ? newLeadsPoints
      : activeSubTab === "Lead-to-trial conversion"
      ? leadToTrialPoints
      : leadToPaidPoints;
  }, [timeRange, activeSubTab]);

  const count = series.length;

  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  const yLabels = ["140", "105", "70", "35", "0"];

  // Mapping function for Y-axis (scale raw value 0 to 140)
  const getY = (val: number) => {
    return H - PY - (val / 140) * (H - PY * 2);
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

  // Tooltip Category segments values depending on active sub-tab
  const tooltipLabel =
    activeSubTab === "New Leads"
      ? "New Leads"
      : activeSubTab === "Lead-to-trial conversion"
      ? "Trial rate"
      : "Paid rate";

  const tooltipValue =
    activeSubTab === "New Leads"
      ? `${hPt?.value}`
      : `${hPt?.value}%`;

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
            {Array.from({ length: 5 }, (_, i) => {
              const y = PY + (i / 4) * (H - PY * 2);
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
                  const bh = Math.max((point.value / 140) * (H - PY * 2), 8);
                  const by = H - PY - bh;
                  const isHov = hoveredIndex === i;
                  return (
                    <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9}>
                      <rect
                        x={bx} y={by} width={barW} height={bh}
                        fill={isHov ? "#FF6692" : "#EFF4FA"}
                        rx={4}
                      />
                    </g>
                  );
                })}
              </>
            ) : (
              <>
                <defs>
                  <linearGradient id="pink-leads-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6692" stopOpacity="0.09" />
                    <stop offset="91.46%" stopColor="#FF6692" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Gradient area fill */}
                <path d={areaPath} fill="url(#pink-leads-gradient)" />

                {/* Line Curve */}
                <path d={linePath} fill="none" stroke="#FF6692" strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />

                {/* Hover dot */}
                {hPt && (
                  <>
                    <circle cx={hPt.x} cy={hPt.y} r={5.5} fill="#FF6692" stroke="#FFFFFF" strokeWidth="1.89919" />
                    <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#FF6692" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                  </>
                )}
              </>
            )}
          </svg>

          {/* Tooltip */}
          {hovered && hPt && (
            <div
              className="pointer-events-none absolute z-30 flex flex-col items-start p-0 w-[139.59px] h-[54.79px] bg-white shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px]"
              style={{
                left: `${(tipX / W) * 100}%`,
                top: `${(tipY / H) * 100}%`,
                transform: "translateX(-50%) translateY(-100%) translateY(-12px)",
              }}
            >
              <div className="flex flex-col items-start w-full h-full">
                {/* Row 1: Month */}
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] h-[27.4px]">
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D]">
                    {series[hoveredIndex!]?.month}
                  </span>
                </div>
                {/* Row 2: Value */}
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] h-[27.4px] self-stretch border-t border-slate-50">
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#FF6692] mr-auto">
                    {tooltipLabel}:
                  </span>
                  <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#98A4AE]">
                    {tooltipValue}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* X-axis Month labels */}
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

// ---- Main Component ----
export default function LeadsPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("New Leads");

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
          label: "Leads",
          values: { jan: "476", feb: "476", mar: "476", apr: "476", may: "476" },
        },
        {
          label: "Trials",
          isBgGray: true,
          values: { jan: "66", feb: "66", mar: "66", apr: "66", may: "66" },
        },
        {
          label: "Converted",
          values: { jan: "51", feb: "(51)", mar: "(51)", apr: "-", may: "51" },
        },
        {
          label: "Lead-to-trial rate",
          isBgGray: true,
          values: { jan: "13.87%", feb: "13.87%", mar: "13.87%", apr: "13.87%", may: "-" },
        },
        {
          label: "Lead-to-paid rate",
          values: { jan: "10.71%", feb: "10.71%", mar: "10.71%", apr: "10.71%", may: "10.71%" },
        },
        {
          label: "Trial-to-paid rate",
          isBgGray: true,
          values: { jan: "77.27%", feb: "77.27%", mar: "77.27%", apr: "-", may: "77.27%" },
        },
      ];
    }
    return [
      {
        label: "Leads",
        values: { jan: "4,800", feb: "5,200", mar: "5,800" },
      },
      {
        label: "Trials",
        isBgGray: true,
        values: { jan: "660", feb: "720", mar: "810" },
      },
      {
        label: "Converted",
        values: { jan: "510", feb: "540", mar: "620" },
      },
      {
        label: "Lead-to-trial rate",
        isBgGray: true,
        values: { jan: "13.75%", feb: "13.85%", mar: "13.97%" },
      },
      {
        label: "Lead-to-paid rate",
        values: { jan: "10.62%", feb: "10.38%", mar: "10.69%" },
      },
      {
        label: "Trial-to-paid rate",
        isBgGray: true,
        values: { jan: "77.27%", feb: "75.00%", mar: "76.54%" },
      },
    ];
  }, [timeRange]);

  // Dynamic Page Title depending on activeSubTab
  const dynamicTitle =
    activeSubTab === "New Leads"
      ? "Leads"
      : activeSubTab === "Lead-to-trial conversion"
      ? "Lead-to-trial conversion"
      : "Lead-to-paid conversion";

  const toggleChartMode = useCallback(() => {
    setChartMode((m) => (m === "line" ? "bar" : "line"));
  }, []);

  const handleExportCSV = () => {
    const headers = ["Metric", ...currentTableMonths.map(m => m.label)];
    const rows = currentTableRows.map((r) => [
      r.label,
      ...currentTableMonths.map(m => r.values[m.key as keyof typeof r.values])
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_analytics_report_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-w-0">
      <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header toolbar */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-extrabold text-[#1f2937]">Leads Management</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">

            {/* Refresh Data button */}
            <button
              type="button"
              onClick={() => setTimeRange("Monthly")}
              className="w-[144px] h-[44px] flex flex-row justify-center items-center py-[10px] px-4 gap-2.5 bg-[#EFF4FA] rounded-lg text-[#0A2540] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <RefreshIcon color="#0A2540" />
              <span className="text-[14px] font-medium leading-[24px] text-center font-sans">Refresh Data</span>
            </button>

            {/* Export button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="w-[149px] h-[44px] flex flex-row justify-center items-center py-[10px] px-4 gap-2.5 bg-[#635BFF] rounded-lg text-white hover:bg-[#4d42eb] transition-colors cursor-pointer"
            >
              <DownloadIcon color="#FFFFFF" />
              <span className="text-[14px] font-medium leading-[24px] text-center font-sans">Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart card panel */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between border-b border-slate-50 pb-4">
            
            {/* Title, Filter button, and Sub-tabs */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-[16px] font-bold leading-[22px] text-[#29343D] font-sans">
                  Lead Analytics
                </h2>
              </div>

              {/* Subtab selection links */}
              <div className="flex items-center gap-6 h-[36px] mt-1 border-b border-[#E0E6EB] w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                {(["New Leads", "Lead-to-trial conversion", "Lead-to-paid conversion"] as SubTab[]).map((tab) => {
                  const isActive = activeSubTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveSubTab(tab)}
                      className={`h-full px-1 text-[14px] font-semibold transition-all border-b-2 font-sans cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "border-[#635BFF] text-[#635BFF]"
                          : "border-transparent text-[#98A4AE] hover:text-[#29343D]"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side options dropdowns */}
            <div className="flex flex-wrap items-center gap-2 self-end xl:self-auto">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimeRangeOpen((v) => !v)}
                  className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#E0E6EB] bg-white px-3.5 text-[12px] font-semibold text-[#526B7A] hover:bg-[#F7F9FC] font-sans cursor-pointer"
                >
                  {timeRange} <ChevronDownIcon />
                </button>
                {timeRangeOpen && (
                  <div className="absolute right-0 top-[42px] z-30 w-[160px] rounded-[12px] bg-white p-1.5 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.18)] border border-slate-100">
                    {timeRangeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setTimeRange(opt);
                          setTimeRangeOpen(false);
                        }}
                        className={`flex h-9 w-full items-center rounded-[8px] px-3 text-[12px] font-medium font-sans cursor-pointer ${
                          timeRange === opt ? "bg-[#EFF4FA] text-[#0A2540]" : "text-[#0A2540] hover:bg-[#F7F9FC]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Renders line chart curve */}
          <div className="pb-4 overflow-x-auto w-full scrollbar-thin">
            <div className="min-w-[600px] xl:min-w-0 w-full">
              <LeadsChart
                timeRange={timeRange}
                activeSubTab={activeSubTab}
                chartMode={chartMode}
                setExportModalOpen={setExportModalOpen}
              />
            </div>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#29343D] font-sans">
              Performance Metrics
            </h3>
          </div>
          
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left font-sans">
              <thead>
                <tr className="bg-[#F3F3FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Period</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Leads</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Trials</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Converted</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Lead-to-Trial Rate</th>
                  <th className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Lead-to-Paid Rate</th>
                  <th className="border-b border-[#E0E6EB] px-6 py-[14px] text-[16px] font-bold text-[#29343D] h-[57px] box-sizing-border-box">Trial-to-Paid Rate</th>
                </tr>
              </thead>
              <tbody>
                {performanceMetricsRows.map((row, index) => {
                  const isBgGray = index % 2 !== 0; // Alternating background matching Figma table spacing
                  const bgClass = isBgGray ? "bg-[#FAFAFA]" : "bg-white";
                  return (
                    <tr key={row.period} className={`${bgClass} h-[57px]`}>
                      {/* Period */}
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px] font-normal text-[#29343D]">
                        {row.period}
                      </td>
                      
                      {/* Leads */}
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px]">
                        <div className="inline-flex items-center justify-center bg-[#FFD648] text-white px-2.5 py-[5px] rounded-[999px] text-[12px] font-semibold min-w-[40px] h-[26px] box-sizing-border-box leading-none">
                          {row.leads}
                        </div>
                      </td>

                      {/* Trials */}
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px]">
                        <div className="inline-flex items-center justify-center bg-[#DDDBFF] text-[#635BFF] px-2.5 py-[5px] rounded-[999px] text-[12px] font-semibold min-w-[34px] h-[26px] box-sizing-border-box leading-none">
                          {row.trials}
                        </div>
                      </td>

                      {/* Converted */}
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px]">
                        <div className="inline-flex items-center justify-center bg-[#ECFDFD] text-[#16CDC7] px-2.5 py-[5px] rounded-[999px] text-[12px] font-semibold min-w-[34px] h-[26px] box-sizing-border-box leading-none">
                          {row.converted}
                        </div>
                      </td>

                      {/* Lead-to-Trial Rate */}
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px]">
                        <div className={`inline-flex items-center justify-center px-2.5 py-[5px] rounded-[999px] text-[12px] font-semibold min-w-[40px] h-[26px] box-sizing-border-box leading-none ${getRateBadgeClass(row.leadToTrialRate)}`}>
                          {row.leadToTrialRate}
                        </div>
                      </td>

                      {/* Lead-to-Paid Rate */}
                      <td className="border-b border-r border-[#E0E6EB] px-6 py-[14px] text-[14px]">
                        <div className={`inline-flex items-center justify-center px-2.5 py-[5px] rounded-[999px] text-[12px] font-semibold min-w-[40px] h-[26px] box-sizing-border-box leading-none ${getRateBadgeClass(row.leadToPaidRate)}`}>
                          {row.leadToPaidRate}
                        </div>
                      </td>

                      {/* Trial-to-Paid Rate */}
                      <td className="border-b border-[#E0E6EB] px-6 py-[14px] text-[14px]">
                        <div className={`inline-flex items-center justify-center px-2.5 py-[5px] rounded-[999px] text-[12px] font-semibold min-w-[40px] h-[26px] box-sizing-border-box leading-none ${getRateBadgeClass(row.trialToPaidRate)}`}>
                          {row.trialToPaidRate}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>



    </div>
  );
}
