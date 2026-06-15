"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";

type ChartMode = "line" | "bar";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";

type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };

const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];

const aspPoints: ChartPoint[] = [
  { month: "Jan", value: 43000 },
  { month: "Feb", value: 59000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 34000 },
  { month: "May", value: 27000 },
  { month: "Jun", value: 59000 },
  { month: "Jul", value: 40000 },
  { month: "Aug", value: 36000 },
  { month: "Sep", value: 27000 },
];

const tableMonths = [
  { label: "Jan 2025", key: "jan" },
  { label: "Feb 2025", key: "feb" },
  { label: "Mar 2025", key: "mar" },
  { label: "Apr 2025", key: "apr" },
] as const;

const tableRows = [
  { label: "New business MRR", amount: "€ 451,343", count: "-" },
  { label: "New customers", amount: "-", count: "1696" },
  { label: "ASP", amount: "€ 266", count: "-" },
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

// ---- Chart Component ----
function ASPChart({
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
      return aspPoints;
    }
    if (timeRange === "Yearly") {
      return [
        { month: "2023", value: 35000 },
        { month: "2024", value: 48000 },
        { month: "2025", value: 62000 },
      ];
    }
    // "2023-2025"
    return [
      { month: "2023", value: 35000 },
      { month: "2024", value: 48000 },
      { month: "2025", value: 62000 },
    ];
  }, [timeRange]);

  const count = series.length;

  const W = 1115.87;
  const H = 227.55;
  const PX = 36.42;
  const PY = 0.35;

  const yLabels = ["70k", "60k", "50k", "40k", "30k", "20k"];

  // Mapping function for Y-axis (linear scaling 20k to 70k)
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

  const linePath = buildPath(pts);

  const hovered = hoveredIndex !== null;
  const hPt = hovered ? pts[hoveredIndex!] : null;

  const tipX = hPt?.x ?? 0;
  const tipY = hPt?.y ?? 0;

  // Bar width
  const barSlot = (W - PX * 2) / count;
  const barW = Math.min(Math.max(barSlot * 0.45, 12), 48);

  return (
    <div className="relative w-full select-none">
      <div className={`relative w-full min-w-0 ${chartMode === "bar" ? "h-[327px]" : "h-[264px]"}`}>
        {/* Y-axis */}
        <div className={`absolute left-0 flex h-[228px] w-[34px] flex-col justify-between p-0 gap-[30.39px] items-start ${chartMode === "bar" ? "top-[39px]" : "top-0"}`}>
          {yLabels.map((l) => (
            <span
              key={l}
              className="w-[34px] h-[15.35px] font-manrope font-normal text-[11.3951px] leading-[15px] text-center text-[#98A4AE] self-stretch flex-none order-none grow-0"
            >
              {l}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div
          className={`absolute left-[35px] right-0 overflow-visible bg-transparent ${
            chartMode === "bar" ? "top-[32px] h-[263.45px]" : "top-[0.35px] h-[227.55px]"
          }`}
        >
          {/* Grid lines */}
          <svg className="overflow-visible pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${W} ${H}`}>
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
                  const cx = PX + (i * (W - PX * 2)) / (count - 1);
                  const bx = cx - barW / 2;
                  const bh = Math.max(((point.value - 20000) / 50000) * (H - PY * 2), 8);
                  const by = H - PY - bh;
                  const isHov = hoveredIndex === i;
                  return (
                    <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9} filter={isHov ? "url(#bar-shadow)" : undefined}>
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
              // Line chart
              <>
                <path d={linePath} fill="none" stroke="#16CDC7" strokeWidth="1.89919" strokeLinecap="round" strokeLinejoin="round" />
                {pts.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y} r={2.75}
                    fill="#16CDC7"
                    stroke="#FFFFFF"
                    strokeWidth="1.89919"
                    opacity={hoveredIndex === i ? 1 : 0}
                    style={{ transition: "opacity 0.15s" }}
                  />
                ))}
                {hPt && (
                  <line x1={hPt.x} y1={PY} x2={hPt.x} y2={H - PY} stroke="#16CDC7" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                )}
              </>
            )}
          </svg>

          {/* Tooltip */}
          {hovered && (
            <div
              className="pointer-events-none absolute z-30 flex flex-col items-start p-0 w-[103.58px] h-auto min-h-[54.79px] bg-[#FFFFFF] shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px]"
              style={{
                left: Math.min(Math.max((tipX / W) * 100, 10), 72) + "%",
                top: Math.max((tipY / H) * 100 - 20, 4) + "%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex flex-col items-start p-0 w-[103.58px] h-auto min-h-[54.79px]">
                {/* row 2 */}
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[96.79px] h-[27.4px] flex-none order-0 grow-0">
                  <span className="w-[74px] h-[16px] font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] flex-none order-0 grow-0">
                    {series[hoveredIndex!]?.month} 03, 2025
                  </span>
                </div>

                {/* row 3 */}
                <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[103.58px] h-[27.4px] self-stretch flex-none order-1 grow-0">
                  <span className="w-[7.6px] h-[7.6px] bg-[#16CDC7] rounded-[7.59675px] flex-none order-0 grow-0" />
                  <span className="w-[26px] h-[16px] font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] flex-none order-1 grow-0">
                    ASP
                  </span>
                  <span className="w-[32px] h-[16px] font-manrope font-semibold text-[12px] leading-[16px] text-[#98A4AE] flex-none order-2 grow-0">
                    € {Math.round(series[hoveredIndex!]?.value / 1000)}k
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* X-axis labels */}
          <div
            className="absolute h-[15.35px] right-0 left-0"
            style={{
              top: chartMode === "bar" ? "279.45px" : "239px",
            }}
          >
            {series.map((p, i) => {
              const x = PX + (i * (W - PX * 2)) / Math.max(count - 1, 1);
              return (
                <span
                  key={i}
                  className={`absolute font-manrope font-normal text-center transition-colors ${
                    chartMode === "bar" ? "text-[12px] leading-[16px] h-[15.1px]" : "text-[11.3951px] leading-[15px] h-[15.35px]"
                  } ${hoveredIndex === i ? "text-[#16CDC7]" : "text-[#98A4AE]"}`}
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
export default function ASPPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const currentTableMonths = useMemo(() => {
    if (timeRange === "Monthly") {
      return [
        { label: "Jan 2025", key: "jan" },
        { label: "Feb 2025", key: "feb" },
        { label: "Mar 2025", key: "mar" },
        { label: "Apr 2025", key: "apr" },
      ];
    }
    return [
      { label: "2023", key: "2023" },
      { label: "2024", key: "2024" },
      { label: "2025", key: "2025" },
    ];
  }, [timeRange]);

  const toggleChartMode = useCallback(() => {
    setChartMode((m) => (m === "line" ? "bar" : "line"));
  }, []);

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
            <span className="text-[18px] font-bold tracking-tight text-[#29343D]">
              Analytics
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeRange("Monthly");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(94,83,252,0.22)] transition-all duration-150"
          >
            <RefreshIcon /> Resync
          </button>
        </section>

        {/* Chart section */}
        <section className="relative w-full rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[16px] font-semibold leading-[22px] text-[#29343D]">
                  Average Sales Price
                </h2>
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
              <button
                type="button"
                onClick={toggleChartMode}
                className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#EFF4FA] bg-white px-3 text-[12px] font-medium text-[#0A2540] hover:bg-[#F7F9FC]"
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
            <ASPChart timeRange={timeRange} chartMode={chartMode} setExportModalOpen={setExportModalOpen} />
          </div>
        </section>

        {/* Table section */}
        <section className="overflow-hidden rounded-[12px] bg-white p-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[700px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F5F4FF]">
                  <th className="w-[180px] border-b border-r border-[#E0E6EB] px-5 py-4 text-[13px] font-bold text-[#29343D]"></th>
                  {currentTableMonths.map((m) => (
                    <th key={m.key} colSpan={2} className="border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[14px] font-bold text-[#29343D]">{m.label}</th>
                  ))}
                </tr>
                <tr className="bg-[#F5F4FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[13px] font-bold text-[#29343D]"></th>
                  {currentTableMonths.flatMap((m) => [
                    <th key={`${m.key}-a`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-bold text-[#29343D]">Amount</th>,
                    <th key={`${m.key}-c`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-bold text-[#29343D]">Count</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.label} className="odd:bg-white even:bg-[#FAFAFA]">
                    <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-bold text-[#29343D]">{row.label}</td>
                    {currentTableMonths.flatMap((m) => [
                      <td key={`${row.label}-${m.key}-a`} className="border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[12px] text-[#29343D]">{row.amount}</td>,
                      <td key={`${row.label}-${m.key}-c`} className="border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[12px] text-[#29343D]">{row.count}</td>,
                    ])}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Export Modal overlay */}
        {exportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
            <div className="relative w-[638px] h-[826px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12, 12, 13, 0.4)] flex flex-col p-6 gap-6 box-sizing-border-box">
              {/* Title row */}
              <div className="flex flex-row items-center justify-between w-full h-[54px] flex-none self-stretch">
                <div className="flex flex-col items-start gap-1 flex-grow">
                  <span className="w-[110px] h-[25px] font-manrope font-semibold text-[18px] leading-[25px] text-[#29343D] flex items-center">
                    Current MRR
                  </span>
                  <span className="w-[294px] h-[19px] font-manrope font-semibold text-[14px] leading-[19px] text-[#29343D] flex items-center">
                    Current MRR breakdown and growth metrics
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setExportModalOpen(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* 2x2 Cards Grid */}
              <div className="grid grid-cols-2 gap-6 w-full flex-grow">
                {[
                  {
                    label: "New",
                    centerText: "€ 98,260",
                    value: "45",
                    note: "2.5%",
                    noteClass: "text-[#36C76C]",
                  },
                  {
                    label: "Reactivation",
                    centerText: "€ 40,000",
                    value: "5",
                    note: "5.5%",
                    noteClass: "text-[#36C76C]",
                  },
                  {
                    label: "Renewals",
                    centerText: "€ 80,000",
                    value: "45",
                    note: "5%",
                    noteClass: "text-[#36C76C]",
                  },
                  {
                    label: "Churn",
                    centerText: "€ 60,260",
                    value: "5%",
                    note: "(2.5%)",
                    noteClass: "text-[#FF6692]",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="flex flex-col items-start p-[30px] gap-[34px] w-[283px] h-[338px] bg-white border border-[#E0E6EB] shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] rounded-[12px] flex-none"
                  >
                    {/* Gauge SVG */}
                    <div className="w-[223px] h-[198px] flex-none self-stretch flex items-center justify-center">
                      <svg className="w-[223px] h-[198px] overflow-visible" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#EFF4FA"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray="330 440"
                          transform="rotate(135 100 100)"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#16CDC7"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray="165 440"
                          transform="rotate(135 100 100)"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#635BFF"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray="165 440"
                          transform="rotate(270 100 100)"
                        />
                        <text
                          x="100"
                          y="108"
                          textAnchor="middle"
                          className="font-manrope font-semibold text-[20px] fill-[#29343D]"
                        >
                          {card.centerText}
                        </text>
                      </svg>
                    </div>
                    {/* Stats Row */}
                    <div className="flex flex-row items-end justify-between p-0 gap-[30px] w-[223px] h-[46px] flex-none">
                      <div className="flex flex-col items-start p-0 w-[149px] h-[46px] flex-grow">
                        <span className="w-[94px] h-[20px] font-manrope font-normal text-[14px] leading-[20px] text-[#98A4AE] flex items-center">
                          {card.label}
                        </span>
                        <span className="w-auto h-[26px] font-manrope font-semibold text-[22px] leading-[120%] text-[#29343D] flex items-center">
                          {card.value}
                        </span>
                      </div>
                      <span className={`w-[44px] h-[20px] font-manrope font-normal text-[14px] leading-[20px] flex items-center justify-end text-right ${card.noteClass}`}>
                        {card.note}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
