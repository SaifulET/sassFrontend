"use client";

import React, { useMemo, useState, useCallback, useRef } from "react";

type PlanType = "All" | "Basic" | "Premium" | "Enterprise";
type ChartMode = "line" | "bar";
type ChartTab = "MRR" | "Movements" | "Breakdown";
type TimeRange = "Monthly" | "Yearly" | "2023-2025";
type FilterStage = "root" | "plan";

type ChartPoint = { month: string; value: number };
type PositionedPoint = ChartPoint & { x: number; y: number };
type MovementSegment = { label: string; value: number; color: string };
type MovementPoint = { month: string; segments: MovementSegment[] };

const planTypeOptions: PlanType[] = ["All", "Basic", "Premium", "Enterprise"];
const timeRangeOptions: TimeRange[] = ["Monthly", "Yearly", "2023-2025"];
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
  {
    month: "Jan",
    segments: [
      { label: "New", value: 25000, color: "#34C759" },
      { label: "Expansion", value: 15000, color: "#00C7BE" },
      { label: "Reactivation", value: 10000, color: "#32ADE6" },
      { label: "Other", value: 3300, color: "#F3F3F3" },
      { label: "Contracted", value: 4000, color: "#FFCC00" },
      { label: "Churned", value: 20000, color: "#FF6692" },
    ],
  },
  {
    month: "Feb",
    segments: [
      { label: "New", value: 24000, color: "#34C759" },
      { label: "Expansion", value: 14000, color: "#00C7BE" },
      { label: "Reactivation", value: 10000, color: "#32ADE6" },
      { label: "Other", value: 3200, color: "#F3F3F3" },
      { label: "Contracted", value: 3000, color: "#FFCC00" },
      { label: "Churned", value: 20000, color: "#FF6692" },
    ],
  },
  {
    month: "Mar",
    segments: [
      { label: "New", value: 26000, color: "#34C759" },
      { label: "Expansion", value: 15000, color: "#00C7BE" },
      { label: "Reactivation", value: 8000, color: "#32ADE6" },
      { label: "Other", value: 2800, color: "#F3F3F3" },
      { label: "Contracted", value: 3300, color: "#FFCC00" },
      { label: "Churned", value: 20000, color: "#FF6692" },
    ],
  },
  {
    month: "Apr",
    segments: [
      { label: "New", value: 25000, color: "#34C759" },
      { label: "Expansion", value: 14200, color: "#00C7BE" },
      { label: "Reactivation", value: 10000, color: "#32ADE6" },
      { label: "Other", value: 3000, color: "#F3F3F3" },
      { label: "Contracted", value: 4800, color: "#FFCC00" },
      { label: "Churned", value: 20000, color: "#FF6692" },
    ],
  },
  {
    month: "May",
    segments: [
      { label: "New", value: 27000, color: "#34C759" },
      { label: "Expansion", value: 15000, color: "#00C7BE" },
      { label: "Reactivation", value: 9000, color: "#32ADE6" },
      { label: "Other", value: 3000, color: "#F3F3F3" },
      { label: "Contracted", value: 12000, color: "#FFCC00" },
      { label: "Churned", value: 40000, color: "#FF6692" },
    ],
  },
  {
    month: "Jun",
    segments: [
      { label: "New", value: 22000, color: "#34C759" },
      { label: "Expansion", value: 13000, color: "#00C7BE" },
      { label: "Reactivation", value: 10000, color: "#32ADE6" },
      { label: "Other", value: 3200, color: "#F3F3F3" },
      { label: "Contracted", value: 5000, color: "#FFCC00" },
      { label: "Churned", value: 18000, color: "#FF6692" },
    ],
  },
  {
    month: "Jul",
    segments: [
      { label: "New", value: 23000, color: "#34C759" },
      { label: "Expansion", value: 14000, color: "#00C7BE" },
      { label: "Reactivation", value: 10000, color: "#32ADE6" },
      { label: "Other", value: 3200, color: "#F3F3F3" },
      { label: "Contracted", value: 5800, color: "#FFCC00" },
      { label: "Churned", value: 20000, color: "#FF6692" },
    ],
  },
  {
    month: "Aug",
    segments: [],
  },
  {
    month: "Sep",
    segments: [],
  },
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

const movementTransactions = [
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "Aug 31, 2024", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
  { date: "MRR Change", customer: "Advocate Data (haylie.zboncak@advocate.com)", description: "Subscribed to Scheduler Basic yearly (EUR) v2 + 3", type: "New", change: "US$ 181 (€ 175)" },
];

const breakdownSeriesList = [
  {
    label: "Analytics Insights",
    color: "#3B82F6",
    points: [91000, 91500, 91000, 84000, 84000, 90000, 93000, 95000, 92000],
  },
  {
    label: "Custom Fields",
    color: "#EF4444",
    points: [68000, 70500, 67000, 60000, 58000, 63000, 68000, 69000, 67000],
  },
  {
    label: "Developer API",
    color: "#FFCC00",
    points: [53000, 54500, 51000, 40000, 36000, 44000, 46000, 47500, 45000],
  },
  {
    label: "File Share Basic",
    color: "#F97316",
    points: [27000, 27500, 28000, 27500, 27200, 27800, 28200, 28000, 27800],
  },
  {
    label: "File Share Plus",
    color: "#8B5CF6",
    points: [25000, 25200, 25500, 25000, 24800, 25300, 25800, 25600, 25400],
  },
  {
    label: "File Share Unlimited",
    color: "#34C759",
    points: [22000, 22200, 22500, 22000, 21800, 22300, 22800, 22600, 22400],
  },
  {
    label: "Meta Pixel Integration",
    color: "#EC4899",
    points: [19000, 19200, 19500, 19000, 18800, 19300, 19800, 19600, 19400],
  },
  {
    label: "Multi Branch",
    color: "#06B6D4",
    points: [16000, 16200, 16500, 16000, 15800, 16300, 16800, 16600, 16400],
  },
  {
    label: "Online Payments",
    color: "#4F46E5",
    points: [13000, 13200, 13500, 13000, 12800, 13300, 13800, 13600, 13400],
  },
  {
    label: "Queue Manager",
    color: "#98A4AE",
    points: [10000, 10200, 10500, 10000, 9800, 10300, 10800, 10600, 10400],
  },
  {
    label: "Scheduler Basic",
    color: "#14B8A6",
    points: [3500, 3700, 3500, 3800, 3600, 4200, 8000, 10000, 10200],
  },
];

// ---- Icons ----
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <polyline points="21 3 21 8 16 8" />
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

function StatCard({ title, value, note, noteClass = "text-[#98A4AE]" }: { title: string; value: string; note: React.ReactNode; noteClass?: string }) {
  return (
    <div className="box-sizing-border-box flex flex-col justify-center items-center p-6 gap-1 h-[129px] bg-white rounded-xl bg-white shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-1 min-w-0">
      <div className="font-manrope font-semibold text-[13px] leading-[18px] text-[#29343D] text-center">{title}</div>
      <div className="font-manrope font-semibold text-[24px] leading-[29px] text-[#29343D] text-center mt-1">{value}</div>
      {note ? (
        <div className={`font-manrope font-semibold text-[13px] leading-[18px] text-center mt-1 ${noteClass}`}>{note}</div>
      ) : null}
    </div>
  );
}

// ---- Main Chart Component ----
function MRRChart({
  activeTab,
  chartMode,
  planType,
  timeRange,
}: {
  activeTab: ChartTab;
  chartMode: ChartMode;
  planType: PlanType;
  timeRange: TimeRange;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const isMovements = activeTab === "Movements";

  const baseSeries = useMemo(() => {
    if (timeRange === "Monthly") {
      if (activeTab === "Movements") return movementsPoints;
      if (activeTab === "Breakdown") return breakdownPoints;
      return mrrPoints;
    }
    if (timeRange === "Yearly") {
      if (activeTab === "Movements") {
        return [
          { month: "2020", value: 18 },
          { month: "2021", value: 20 },
          { month: "2022", value: 22 },
          { month: "2023", value: 24 },
          { month: "2024", value: 26 },
          { month: "2025", value: 29 },
        ];
      }
      if (activeTab === "Breakdown") {
        return [
          { month: "2020", value: 12 },
          { month: "2021", value: 15 },
          { month: "2022", value: 20 },
          { month: "2023", value: 25 },
          { month: "2024", value: 28 },
          { month: "2025", value: 32 },
        ];
      }
      return [
        { month: "2020", value: 25000 },
        { month: "2021", value: 30000 },
        { month: "2022", value: 35000 },
        { month: "2023", value: 38000 },
        { month: "2024", value: 42000 },
        { month: "2025", value: 48000 },
      ];
    }
    // "2023-2025"
    if (activeTab === "Movements") {
      return [
        { month: "2023", value: 24 },
        { month: "2024", value: 26 },
        { month: "2025", value: 29 },
      ];
    }
    if (activeTab === "Breakdown") {
      return [
        { month: "2023", value: 25 },
        { month: "2024", value: 28 },
        { month: "2025", value: 32 },
      ];
    }
    return [
      { month: "2023", value: 38000 },
      { month: "2024", value: 42000 },
      { month: "2025", value: 48000 },
    ];
  }, [activeTab, timeRange]);

  const series = useMemo(() => {
    const mult = planType === "Basic" ? 0.82 : planType === "Premium" ? 1.08 : planType === "Enterprise" ? 1.2 : 1;
    return baseSeries.map((p) => ({ ...p, value: Math.round(p.value * mult) }));
  }, [baseSeries, planType]);

  const breakdownSeries = useMemo(() => {
    const mult = planType === "Basic" ? 0.82 : planType === "Premium" ? 1.08 : planType === "Enterprise" ? 1.2 : 1;
    return breakdownSeriesList.map((s) => {
      let pts = s.points;
      if (timeRange === "Yearly") {
        pts = [
          s.points[0] - 20000,
          s.points[0] - 10000,
          s.points[0],
          s.points[3],
          s.points[6],
          s.points[8],
        ];
      } else if (timeRange === "2023-2025") {
        pts = [
          s.points[0],
          s.points[4],
          s.points[8],
        ];
      }
      return {
        ...s,
        points: pts.map((v) => Math.round(v * mult)),
      };
    });
  }, [planType, timeRange]);

  const rankedBreakdownPlans = useMemo(() => {
    if (activeTab !== "Breakdown" || hoveredIndex === null) return [];
    return breakdownSeries
      .map((s) => ({
        label: s.label,
        color: s.color,
        value: s.points[hoveredIndex],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);
  }, [activeTab, hoveredIndex, breakdownSeries]);

  const movementSeries = useMemo(() => {
    const mult = planType === "Basic" ? 0.82 : planType === "Premium" ? 1.08 : planType === "Enterprise" ? 1.2 : 1;
    const baseBars = timeRange === "Monthly"
      ? movementBars
      : timeRange === "Yearly"
      ? [
          {
            month: "2020",
            segments: [
              { label: "New", value: 180000, color: "#34C759" },
              { label: "Expansion", value: 110000, color: "#00C7BE" },
              { label: "Reactivation", value: 80000, color: "#32ADE6" },
              { label: "Other", value: 25000, color: "#F3F3F3" },
              { label: "Contracted", value: 30000, color: "#FFCC00" },
              { label: "Churned", value: 150000, color: "#FF6692" },
            ],
          },
          {
            month: "2021",
            segments: [
              { label: "New", value: 200000, color: "#34C759" },
              { label: "Expansion", value: 120000, color: "#00C7BE" },
              { label: "Reactivation", value: 90000, color: "#32ADE6" },
              { label: "Other", value: 28000, color: "#F3F3F3" },
              { label: "Contracted", value: 32000, color: "#FFCC00" },
              { label: "Churned", value: 160000, color: "#FF6692" },
            ],
          },
          {
            month: "2022",
            segments: [
              { label: "New", value: 220000, color: "#34C759" },
              { label: "Expansion", value: 130000, color: "#00C7BE" },
              { label: "Reactivation", value: 95000, color: "#32ADE6" },
              { label: "Other", value: 30000, color: "#F3F3F3" },
              { label: "Contracted", value: 35000, color: "#FFCC00" },
              { label: "Churned", value: 170000, color: "#FF6692" },
            ],
          },
          {
            month: "2023",
            segments: [
              { label: "New", value: 240000, color: "#34C759" },
              { label: "Expansion", value: 140000, color: "#00C7BE" },
              { label: "Reactivation", value: 100000, color: "#32ADE6" },
              { label: "Other", value: 31000, color: "#F3F3F3" },
              { label: "Contracted", value: 38000, color: "#FFCC00" },
              { label: "Churned", value: 180000, color: "#FF6692" },
            ],
          },
          {
            month: "2024",
            segments: [
              { label: "New", value: 260000, color: "#34C759" },
              { label: "Expansion", value: 150000, color: "#00C7BE" },
              { label: "Reactivation", value: 110000, color: "#32ADE6" },
              { label: "Other", value: 32000, color: "#F3F3F3" },
              { label: "Contracted", value: 40000, color: "#FFCC00" },
              { label: "Churned", value: 190000, color: "#FF6692" },
            ],
          },
          {
            month: "2025",
            segments: [
              { label: "New", value: 290000, color: "#34C759" },
              { label: "Expansion", value: 170000, color: "#00C7BE" },
              { label: "Reactivation", value: 120000, color: "#32ADE6" },
              { label: "Other", value: 35000, color: "#F3F3F3" },
              { label: "Contracted", value: 45000, color: "#FFCC00" },
              { label: "Churned", value: 200000, color: "#FF6692" },
            ],
          },
        ]
      : [
          {
            month: "2023",
            segments: [
              { label: "New", value: 240000, color: "#34C759" },
              { label: "Expansion", value: 140000, color: "#00C7BE" },
              { label: "Reactivation", value: 100000, color: "#32ADE6" },
              { label: "Other", value: 31000, color: "#F3F3F3" },
              { label: "Contracted", value: 38000, color: "#FFCC00" },
              { label: "Churned", value: 180000, color: "#FF6692" },
            ],
          },
          {
            month: "2024",
            segments: [
              { label: "New", value: 260000, color: "#34C759" },
              { label: "Expansion", value: 150000, color: "#00C7BE" },
              { label: "Reactivation", value: 110000, color: "#32ADE6" },
              { label: "Other", value: 32000, color: "#F3F3F3" },
              { label: "Contracted", value: 40000, color: "#FFCC00" },
              { label: "Churned", value: 190000, color: "#FF6692" },
            ],
          },
          {
            month: "2025",
            segments: [
              { label: "New", value: 290000, color: "#34C759" },
              { label: "Expansion", value: 170000, color: "#00C7BE" },
              { label: "Reactivation", value: 120000, color: "#32ADE6" },
              { label: "Other", value: 35000, color: "#F3F3F3" },
              { label: "Contracted", value: 45000, color: "#FFCC00" },
              { label: "Churned", value: 200000, color: "#FF6692" },
            ],
          },
        ];

    return baseBars.map((bar) => {
      const newVal = Math.round((bar.segments.find((s) => s.label === "New")?.value || 0) * mult);
      const expVal = Math.round((bar.segments.find((s) => s.label === "Expansion")?.value || 0) * mult);
      const reactVal = Math.round((bar.segments.find((s) => s.label === "Reactivation")?.value || 0) * mult);
      const otherVal = Math.round((bar.segments.find((s) => s.label === "Other")?.value || 0) * mult);
      const contractVal = Math.round((bar.segments.find((s) => s.label === "Contracted")?.value || 0) * mult);
      const churnVal = Math.round((bar.segments.find((s) => s.label === "Churned")?.value || 0) * mult);
      const total = newVal + expVal + reactVal + otherVal - contractVal - churnVal;

      return {
        month: bar.month,
        New: newVal,
        Expansion: expVal,
        Reactivation: reactVal,
        Other: otherVal,
        Contracted: contractVal,
        Churned: churnVal,
        total,
        segments: [
          { label: "New", value: newVal, color: "#34C759" },
          { label: "Expansion", value: expVal, color: "#00C7BE" },
          { label: "Reactivation", value: reactVal, color: "#32ADE6" },
          { label: "Contracted", value: contractVal, color: "#FFCC00" },
          { label: "Churned", value: churnVal, color: "#FF6692" },
          { label: "Other", value: otherVal, color: "#F3F3F3" },
        ],
      };
    });
  }, [planType, timeRange]);

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

  const getY = (val: number) => {
    if (timeRange === "Monthly") {
      if (val >= 0) {
        if (val <= 50000) {
          return 114 - (val / 50000) * (114 - 91.13);
        } else {
          return 91.13 - ((val - 50000) / 20000) * (91.13 - 0.35);
        }
      } else {
        if (val >= -20000) {
          return 114 + (-val / 20000) * (136.52 - 114);
        } else {
          return 136.52 + ((-val - 20000) / 40000) * (227.3 - 136.52);
        }
      }
    } else {
      if (val >= 0) {
        return 114 - (val / 600000) * (114 - 0.35);
      } else {
        return 114 + (-val / 600000) * (227.3 - 114);
      }
    }
  };

  const pts: PositionedPoint[] = series.map((p, i) => {
    const x = PX + (i * (W - PX * 2)) / (count - 1);
    const y = H - PY - ((p.value - minVal) / range) * (H - PY * 2);
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
  const areaPath = pts.length
    ? `${linePath} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`
    : "";

  // Y-axis labels
  const ySteps = 5;
  const yLabels = useMemo(() => {
    if (activeTab === "Movements") {
      return timeRange === "Monthly"
        ? ["70k", "60k", "50k", "-20K", "-40K", "-60K"]
        : ["600k", "400k", "200k", "-200k", "-400k", "-600k"];
    }
    if (activeTab === "Breakdown") {
      return ["100k", "80k", "60k", "40k", "20k", "0"];
    }
    return Array.from({ length: ySteps + 1 }, (_, i) => {
      const v = maxVal - (i / ySteps) * (maxVal - minVal);
      return v >= 1000 ? `${Math.round(v / 1000)}k` : `${Math.round(v)}`;
    });
  }, [activeTab, maxVal, minVal, timeRange]);

  const formatVal = (v: number) => activeTab === "MRR" ? `€ ${v >= 1000 ? `${Math.round(v / 1000)}K` : v}` : `${v}`;
  const hovered = hoveredIndex !== null;
  const hPt = hovered ? pts[hoveredIndex!] : null;
  const hMov = hovered ? movementSeries[hoveredIndex!] : null;

  // Tooltip position
  const tipX = (isMovements || activeTab === "Breakdown")
    ? PX + (hoveredIndex! * (W - PX * 2)) / (count - 1)
    : hPt?.x ?? 0;

  const tipY = useMemo(() => {
    if (isMovements && hMov) {
      const val = (hMov.New || 0) + (hMov.Expansion || 0) + (hMov.Reactivation || 0) + (hMov.Other || 0);
      return getY(val);
    }
    if (activeTab === "Breakdown") {
      const topVal = breakdownSeries[0].points[hoveredIndex ?? 0];
      return H - PY - (topVal / 100000) * (H - PY * 2);
    }
    return hPt?.y ?? 0;
  }, [isMovements, hMov, hPt, activeTab, breakdownSeries, hoveredIndex]);

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
            {Array.from({ length: ySteps + 1 }, (_, i) => {
              const y = PY + (i / ySteps) * (H - PY * 2);
              return <line key={i} x1={0} y1={y} x2={W} y2={y} stroke="#F6F7F9" strokeWidth="0.949594" />;
            })}
            {chartMode !== "bar" && series.map((_, i) => {
              const x = PX + (i * (W - PX * 2)) / (count - 1);
              return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke="#F6F7F9" strokeWidth="0.949594" />;
            })}
            {activeTab === "Movements" && (
              <line x1={0} y1={114} x2={W} y2={114} stroke="#0A2540" strokeWidth="0.949594" strokeOpacity="0.2" />
            )}
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
            <defs>
              <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#16CDC7" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#16CDC7" stopOpacity="0" />
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
                    const mp = point as any;
                    const newVal = mp.New || 0;
                    const expVal = mp.Expansion || 0;
                    const reactVal = mp.Reactivation || 0;
                    const contractVal = Math.abs(mp.Contracted || 0);
                    const churnVal = Math.abs(mp.Churned || 0);
                    const otherVal = Math.abs(mp.Other || 0);

                    // Stack segments with their yStart and yEnd values
                    const segmentsToDraw = [
                      // Positive
                      { label: "New", yStart: getY(reactVal + expVal), yEnd: getY(reactVal + expVal + newVal), color: "#34C759" },
                      { label: "Expansion", yStart: getY(reactVal), yEnd: getY(reactVal + expVal), color: "#00C7BE" },
                      { label: "Reactivation", yStart: getY(0), yEnd: getY(reactVal), color: "#32ADE6" },
                      // Negative
                      { label: "Contracted", yStart: getY(0), yEnd: getY(-contractVal), color: "#FFCC00" },
                      { label: "Churned", yStart: getY(-contractVal), yEnd: getY(-contractVal - churnVal), color: "#FF6692" },
                      { label: "Other", yStart: getY(-contractVal - churnVal), yEnd: getY(-contractVal - churnVal - otherVal), color: "#F3F3F3" },
                    ];

                    return (
                      <g key={i} opacity={isHov ? 1 : 0.88} filter={isHov ? "url(#bar-shadow)" : undefined}>
                        {segmentsToDraw.map((seg, idx) => {
                          const yMin = Math.min(seg.yStart, seg.yEnd);
                          const yMax = Math.max(seg.yStart, seg.yEnd);
                          const height = Math.max(yMax - yMin, 0.5);
                          if (height <= 1 && seg.yStart === seg.yEnd) return null; // skip if value is 0

                          let rx = 0;
                          if (seg.label === "New" && newVal > 0) rx = 4;
                          if (seg.label === "Other" && otherVal > 0) rx = 4;

                          return (
                            <rect
                              key={seg.label}
                              x={bx}
                              y={yMin}
                              width={barW}
                              height={height}
                              fill={seg.color}
                              rx={rx}
                            />
                          );
                        })}

                        {/* Hover circles for Movements tab stacked segments */}
                        {isHov && (
                          <g className="pointer-events-none">
                            {[
                              { y: getY(reactVal + expVal + newVal), color: "#34C759", draw: newVal > 0 },
                              { y: getY(reactVal + expVal), color: "#00C7BE", draw: expVal > 0 },
                              { y: getY(reactVal), color: "#32ADE6", draw: reactVal > 0 },
                              { y: getY(0), color: "#FFCC00", draw: contractVal > 0 },
                              { y: getY(-contractVal), color: "#FF6692", draw: churnVal > 0 },
                              { y: getY(-contractVal - churnVal), color: "#F3F3F3", draw: otherVal > 0 },
                            ].map((dot, dIdx) => {
                              if (!dot.draw) return null;
                              return (
                                <circle
                                  key={dIdx}
                                  cx={cx}
                                  cy={dot.y}
                                  r={2.75}
                                  fill={dot.color}
                                  stroke="#FFFFFF"
                                  strokeWidth="1.89919"
                                />
                              );
                            })}
                          </g>
                        )}
                      </g>
                    );
                  } else {
                    const sp = point as ChartPoint;
                    const bh = Math.max((sp.value / maxVal) * (H - PY * 2), 8);
                    const by = H - PY - bh;
                    const isMarch = i === 2;
                    return (
                      <g key={i} opacity={isHov ? 1 : hoveredIndex !== null ? 0.65 : 0.9} filter={isHov ? "url(#bar-shadow)" : undefined}>
                        <rect
                          x={bx} y={by} width={barW} height={bh}
                          fill={isHov ? "#16CDC7" : isMarch ? "#16CDC7" : "#EFF4FA"}
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
                {activeTab === "Breakdown" ? (
                  <>
                    {breakdownSeries.map((s) => {
                      const seriesPts = s.points.map((val, i) => ({
                        x: PX + (i * (W - PX * 2)) / (s.points.length - 1),
                        y: H - PY - (val / 100000) * (H - PY * 2),
                      }));
                      const pathD = buildPath(seriesPts);
                      return (
                        <g key={s.label}>
                          <path
                            d={pathD}
                            fill="none"
                            stroke={s.color}
                            strokeWidth="1.89919"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {hoveredIndex !== null && seriesPts[hoveredIndex] && (
                            <circle
                              cx={seriesPts[hoveredIndex].x}
                              cy={seriesPts[hoveredIndex].y}
                              r={2.75}
                              fill={s.color}
                              stroke="#FFFFFF"
                              strokeWidth="1.89919"
                            />
                          )}
                        </g>
                      );
                    })}
                    {hoveredIndex !== null && (
                      <line
                        x1={tipX}
                        y1={PY}
                        x2={tipX}
                        y2={H - PY}
                        stroke="#98A4AE"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                        opacity="0.5"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <path d={areaPath} fill="url(#area-fill)" />
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
              </>
            )}
          </svg>

          {/* Tooltip */}
          {hovered && (
            <div
              className={`pointer-events-none absolute z-30 flex flex-col items-start p-0 ${
                activeTab === "Breakdown" ? "w-[190px]" : "w-[103.58px]"
              } h-auto min-h-[54.79px] bg-[#FFFFFF] shadow-[0px_3.79837px_45.5805px_-11.3951px_rgba(10,37,64,0.14)] rounded-[7.59675px]`}
              style={{
                left: Math.min(Math.max((tipX / W) * 100, 10), 72) + "%",
                top: Math.max((tipY / H) * 100 - (isMovements ? 35 : (activeTab === "Breakdown" ? 30 : 20)), 4) + "%",
                transform: "translateX(-50%)",
              }}
            >
              <div className={`flex flex-col items-start p-0 ${
                activeTab === "Breakdown" ? "w-[190px]" : "w-[103.58px]"
              } h-auto min-h-[54.79px]`}>
                {/* row 2 */}
                <div className={`flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] ${
                  activeTab === "Breakdown" ? "w-full" : "w-[96.79px]"
                } h-[27.4px] flex-none order-0 grow-0`}>
                  <span className="w-full h-[16px] font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] flex-none order-0 grow-0">
                    {(isMovements ? movementSeries[hoveredIndex!]?.month : series[hoveredIndex!]?.month)} 03, 2025
                  </span>
                </div>

                {/* row 3 */}
                {activeTab === "Breakdown" ? (
                  <div className="flex flex-col gap-1.5 pt-[3.79837px] px-[11.3951px] pb-[7.59675px] w-full">
                    {rankedBreakdownPlans.map((plan) => (
                      <div key={plan.label} className="flex items-center justify-between gap-[7.6px] w-full">
                        <div className="flex items-center gap-[7.6px]">
                          <span className="w-[7.6px] h-[7.6px] rounded-[7.59675px] shrink-0" style={{ backgroundColor: plan.color }} />
                          <span className="font-manrope font-semibold text-[11px] leading-[14px] text-[#29343D]">{plan.label}</span>
                        </div>
                        <span className="font-manrope font-semibold text-[11px] leading-[14px] text-[#98A4AE]">
                          € {plan.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : isMovements ? (
                  <div className="flex flex-col gap-1.5 pt-[3.79837px] px-[11.3951px] pb-[7.59675px] w-full">
                    {hMov?.segments.map((seg) => (
                      <div key={seg.label} className="flex items-center justify-between gap-[7.6px] w-full">
                        <div className="flex items-center gap-[7.6px]">
                          <span className="w-[7.6px] h-[7.6px] rounded-[7.59675px] shrink-0" style={{ backgroundColor: seg.color }} />
                          <span className="font-manrope font-semibold text-[11px] leading-[14px] text-[#29343D]">{seg.label}</span>
                        </div>
                        <span className="font-manrope font-semibold text-[11px] leading-[14px] text-[#98A4AE]">{seg.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-row items-center pt-[3.79837px] px-[11.3951px] pb-[7.59675px] gap-[7.6px] w-[103.58px] h-[27.4px] self-stretch flex-none order-1 grow-0">
                    <span className="w-[7.6px] h-[7.6px] bg-[#16CDC7] rounded-[7.59675px] flex-none order-0 grow-0" />
                    <span className="w-[26px] h-[16px] font-manrope font-semibold text-[12px] leading-[16px] text-[#29343D] flex-none order-1 grow-0">
                      {activeTab}
                    </span>
                    <span className="w-[32px] h-[16px] font-manrope font-semibold text-[12px] leading-[16px] text-[#98A4AE] flex-none order-2 grow-0">
                      {formatVal(series[hoveredIndex!]?.value ?? 0)}
                    </span>
                  </div>
                )}
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

      {/* Legend for Movements */}
      {isMovements && (
        <div className="mt-3 flex flex-wrap items-center gap-5 pl-9">
          {[
            { label: "New", color: "#34C759" },
            { label: "Expansion", color: "#00C7BE" },
            { label: "Reactivation", color: "#32ADE6" },
            { label: "Contracted", color: "#FFCC00" },
            { label: "Churned", color: "#FF6692" },
            { label: "Other", color: "#F3F3F3" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-[#E0E6EB]" style={{ backgroundColor: l.color }} />
              <span className="text-[11px] font-medium text-[#7A8897]">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Page ----
export default function AnalyticsPage({ setActiveTab }: { setActiveTab?: (tab: string) => void } = {}) {
  const [planType, setPlanType] = useState<PlanType>("All");
  const [salon, setSalon] = useState(salonOptions[0]);
  const [city, setCity] = useState(cityOptions[0]);
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [activeTab, setActiveTabTab] = useState<ChartTab>("MRR");
  const [timeRange, setTimeRange] = useState<TimeRange>("Monthly");
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStage, setFilterStage] = useState<FilterStage>("root");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string | null>(null);
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

  const currentTableRows = useMemo(() => {
    if (timeRange === "Monthly") {
      return [
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
    }
    return [
      { label: "New", amount: "€ 240,000", count: "950", change: "-" },
      { label: "Expanded", amount: "€ 150,000", count: "580", change: "-" },
      { label: "Reactivated", amount: "€ 110,000", count: "340", change: "-" },
      { label: "Contracted", amount: "€ 40,000", count: "120", change: "-" },
      { label: "Churned", amount: "€ 190,000", count: "610", change: "-" },
      { label: "MRR Change", amount: "(€ 270,000)", count: "1,140", change: "-" },
      { label: "FX Impact", amount: "(€ 270,000)", count: "1,140", change: "-" },
      { label: "Total MRR", amount: "€ 89,474", count: "-", change: "-" },
      { label: "Growth Rate", amount: "-", count: "-", change: "26.5%" },
    ];
  }, [timeRange]);

  const isMovements = activeTab === "Movements";

  const handleTabChange = useCallback((tab: ChartTab) => {
    setActiveTabTab(tab);
    if (tab === "Movements") {
      setChartMode("bar");
    } else if (tab === "Breakdown") {
      setChartMode("line");
      setTimeRange("2023-2025");
    }
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
          <div className="text-sm font-extrabold text-[#1f2937]">Analytics</div>
        </div>

          <button
            type="button"
            onClick={() => {
              setPlanType("All");
              setSalon(salonOptions[0]);
              setCity(cityOptions[0]);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#635BFF] hover:bg-[#4d42eb] px-4 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(94,83,252,0.22)] transition-all duration-150 self-start"
          >
            <RefreshIcon /> Resync
          </button>
        </div>
      </div>

        {/* Chart section */}
        <section className="relative w-full rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[16px] font-semibold leading-[22px] text-[#29343D]">
                  MRR Growth – {timeRange === "2023-2025" ? "2023-2025" : (timeRange === "Yearly" ? "Yearly" : "Monthly")} Recurring Revenue
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
              {activeTab === "MRR" && (
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
            <MRRChart activeTab={activeTab} chartMode={chartMode} planType={planType} timeRange={timeRange} />
          </div>

          {/* Stat cards */}
          {activeTab === "Breakdown" ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard title="Top plan over range" value="Premium" note={null} />
              <StatCard title="Bottom plan over range" value="Enterprise" note={null} />
              <StatCard
                title="Best performing plan year"
                value="2024"
                note={
                  <span>
                    € 865,259 <span className="text-[#36C76C]">36%</span>
                  </span>
                }
              />
              <StatCard
                title="Worst performing plan year"
                value="2023"
                note={
                  <span>
                    € 365,259 <span className="text-[#FF6692]">(0.53%)</span>
                  </span>
                }
              />
              <StatCard
                title="Total change in all plans over range"
                value="€ 407,060"
                note={<span className="text-[#36C76C]">26%</span>}
              />
            </div>
          ) : isMovements ? (
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
        <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
          <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
            <table className="min-w-[980px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F5F4FF]">
                  <th className="w-[140px] border-b border-r border-[#E0E6EB] px-5 py-4 text-[14px] font-semibold text-[#29343D]"></th>
                  {currentTableMonths.map((m) => (
                    <th key={m.key} colSpan={3} className="border-b border-r border-[#E0E6EB] px-5 py-4 text-center text-[16px] font-semibold text-[#29343D]">{m.label}</th>
                  ))}
                </tr>
                <tr className="bg-[#F5F4FF]">
                  <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[14px] font-semibold text-[#29343D]"></th>
                  {currentTableMonths.flatMap((m) => [
                    <th key={`${m.key}-a`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-medium text-[#29343D]">Amount</th>,
                    <th key={`${m.key}-c`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-medium text-[#29343D]">Count</th>,
                    <th key={`${m.key}-ch`} className="border-b border-r border-[#E0E6EB] px-5 py-3 text-center text-[12px] font-medium text-[#29343D]">Change</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {currentTableRows.map((row) => (
                  <tr key={row.label} className="odd:bg-white even:bg-[#FAFAFA]">
                    <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">{row.label}</td>
                    {currentTableMonths.flatMap((m) => [
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

        {/* Table 2: Recent Movements Logs (Only for Movements and Breakdown tabs) */}
        {(activeTab === "Movements" || activeTab === "Breakdown") && (
          <section className="overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
            <div className="overflow-x-auto rounded-[12px] border border-[#E0E6EB]">
              <table className="min-w-[980px] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F5F4FF]">
                    <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">Date</th>
                    <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">Customer</th>
                    <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">Description</th>
                    <th className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">Type</th>
                    <th className="border-b border-[#E0E6EB] px-5 py-4 text-[12px] font-semibold text-[#29343D]">MRR change</th>
                  </tr>
                </thead>
                <tbody>
                  {movementTransactions.map((row, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-[#FAFAFA]">
                      <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] text-[#29343D]">{row.date}</td>
                      <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] text-[#29343D]">{row.customer}</td>
                      <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] text-[#29343D]">{row.description}</td>
                      <td className="border-b border-r border-[#E0E6EB] px-5 py-4 text-[12px] text-[#29343D]">{row.type}</td>
                      <td className="border-b border-[#E0E6EB] px-5 py-4 text-[12px] text-[#29343D]">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

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
                    className="flex flex-col items-start p-[30px] gap-[34px] w-[283px] h-[338px] bg-white rounded-xl bg-white shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-none"
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
