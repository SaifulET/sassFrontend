"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GlobalRefreshIcon,
  Shop,
  CreditCardIcon,
  ChartAreaIcon,
  UserGroupIcon,
  Mail01Icon,
  Alert01Icon,
  Ticket01Icon,
  ViewIcon,
  Refresh01Icon
} from "@hugeicons/core-free-icons";
import StatCard from "./StatCard";
import RecentActivitySection from "./RecentActivitySection";
import AnalyticsModals from "./AnalyticsModals";

interface DashboardPageProps {
  onViewAllActivities: () => void;
  onNavigate?: (tab: string) => void;
  onViewSalon?: (id: string) => void;
}

const DashboardIcon = ({ src, size = 16, className = "" }: { src: string; size?: number; className?: string }) => {
  return (
    <span
      className={`inline-block bg-current transition-all duration-200 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    />
  );
};

export default function DashboardPage({ onViewAllActivities, onNavigate, onViewSalon }: DashboardPageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); // Default to Mar point (index 4) for matching Figma/mockup
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeModal, setActiveModal] = useState<"sales" | "subscriptions" | "leads" | "salons" | "churn" | null>(null);
  const [loadingSync, setLoadingSync] = useState(false);
  const [alert1Resolved, setAlert1Resolved] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  // Mock data for activities
  const mockActivities = [
    {
      id: "act-1",
      time: "30m ago",
      dotColor: "teal",
      boldText: "Elite Beauty Bar",
      text: "Elite Beauty Bar - Subscribed Premium",
      amount: "€ 299,00"
    },
    {
      id: "act-2",
      time: "2h ago",
      dotColor: "purple",
      boldText: "Hair & Harmony",
      text: "Hair & Harmony - Monthly Payment",
      amount: "€ 299,00"
    },
    {
      id: "act-3",
      time: "2h ago",
      dotColor: "teal",
      boldText: "Urban Hair Studio",
      text: "Urban Hair Studio - 2 new staff"
    },
    {
      id: "act-4",
      time: "3h ago",
      dotColor: "yellow",
      boldText: "Salon Cristina",
      text: "Salon Cristina - Upgraded Plan",
      amount: "€ 299,00"
    },
    {
      id: "act-5",
      time: "5h ago",
      dotColor: "yellow",
      boldText: "New support ticket",
      text: "New support ticket - Modern Cuts"
    }
  ];

  const xMin = 35.13;
  const xMax = 568;
  const yGridLines = [0.35, 45.74, 91.13, 136.52, 181.91, 227.31];

  // Chart data points aligned to the exact pixel specs of the layout
  const chartPoints = [
    { label: "Jan", val: 30000 },
    { label: "Feb", val: 42000 },
    { label: "Feb", val: 40000 },
    { label: "Feb", val: 35000 },
    { label: "Mar", val: 34324 }, // Mar maps exactly to top: 162.29px (value ~34.3k)
    { label: "Apr", val: 38000 },
    { label: "Jun", val: 40000 },
    { label: "Jul", val: 43000 },
    { label: "Sep", val: 40000 },
    { label: "", val: 35000 }
  ].map((p, idx) => {
    const x = xMin + idx * ((xMax - xMin) / 9);
    return {
      ...p,
      x,
      y: 227.31 - ((p.val - 20000) / 50000) * 226.96
    };
  });

  const getSplinePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    const headers = ["Month", "Value (EUR)"];
    const rows = [
      ["Jan", 30000],
      ["Feb", 42000],
      ["Feb", 40000],
      ["Feb", 35000],
      ["Mar", 34324],
      ["Apr", 38000],
      ["Jun", 40000],
      ["Jul", 43000],
      ["Sep", 40000]
    ];
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "revenue_trend_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Title section */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold leading-none tracking-normal text-[#1f2937]">Dashboard</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eef2f6] hover:bg-slate-50 rounded-2xl text-xs font-semibold text-slate-600 transition-all shadow-sm ${isRefreshing ? "opacity-75" : ""
                }`}
            >
              <DashboardIcon
                src="/syncIcon.svg"
                size={14}
                className={`${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh Data
            </button>

            <button
              onClick={() => onNavigate && onNavigate("salons")}
              className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all duration-150"
            >
              View All Salons
            </button>
          </div>
        </div>
      </div>

      {/* StatCards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard
          title="Monthly Processed Sales"
          value="€ 23,850"
          subtext="from last month"
          trendType="up"
          trendValue="+12.5%"
          icon="/monthlyProcessedSalesIcon.svg"
          iconBgClass="bg-[#f0efff]"
          iconColor="#5e53fc"
          onViewClick={() => setActiveModal("sales")}
          bgGradient="linear-gradient(180deg, rgba(99, 91, 255, 0.12) 0%, rgba(99, 91, 255, 0.03) 100%), #FFFFFF"
        />
        <StatCard
          title="Total Active Subscriptions"
          value="44"
          subtext="from last month"
          trendType="up"
          trendValue="+10%"
          icon="/TotalActiveSubscriptions.svg"
          iconBgClass="bg-[#e6fcf9]"
          iconColor="#10b981"
          onViewClick={() => setActiveModal("subscriptions")}
          bgGradient="linear-gradient(180deg, rgba(22, 205, 199, 0.13) 0%, rgba(22, 205, 199, 0.03) 100%), #FFFFFF"
        />
        <StatCard
          title="New Saas Leads"
          value="10"
          subtext="14 total leads in pipeline"
          trendType="neutral"
          icon="/NewSaasLeads.svg"
          iconBgClass="bg-[#eefcf2]"
          iconColor="#059669"
          onViewClick={() => setActiveModal("leads")}
          bgGradient="linear-gradient(180deg, rgba(54, 199, 108, 0.13) 0%, rgba(54, 199, 108, 0.03) 100%), #FFFFFF"
        />
        <StatCard
          title="New Salons"
          value="+8"
          subtext="from last month"
          trendType="up"
          trendValue="+18.5%"
          icon="/NewSalons.svg"
          iconBgClass="bg-[#fff9eb]"
          iconColor="#f59e0b"
          onViewClick={() => setActiveModal("salons")}
          bgGradient="linear-gradient(180deg, rgba(248, 194, 9, 0.13) 0%, rgba(248, 194, 9, 0.03) 100%), #FFFFFF"
        />
        <StatCard
          title="Monthly Churn Rate"
          value="7%"
          subtext="Last month Churn Rate: 5%"
          trendType="neutral"
          icon="/MonthlyChumRate.svg"
          iconBgClass="bg-[#fff0f3]"
          iconColor="#f43f5e"
          onViewClick={() => setActiveModal("churn")}
          bgGradient="linear-gradient(180deg, rgba(255, 102, 146, 0.13) 0%, rgba(255, 102, 146, 0.03) 100%), #FFFFFF"
        />
      </div>

      {/* Mid sections: Chart and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart */}
        <div
          className="xl:col-span-2 bg-white flex flex-col transition-all w-full"
          style={{
            height: "374px",
            padding: "24px",
            gap: "24px",
            boxShadow: "0 4px 18px rgba(17, 31, 56, 0.06)",
            borderRadius: "12px"
          }}
        >
          <div className="flex items-center justify-between w-full h-[36px] gap-4">
            <div>
              <h3
                className="font-semibold"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: "#29343D"
                }}
              >
                Revenue Trend (Last 12 Months)
              </h3>
            </div>
            <button
              onClick={handleExport}
              className="font-medium transition-all duration-200 border border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5 flex items-center justify-center whitespace-nowrap"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "12px",
                lineHeight: "16px",
                borderRadius: "8px",
                padding: "10px 12px",
                width: "99px",
                height: "36px",
                cursor: "pointer"
              }}
            >
              Export Data
            </button>
          </div>

          {/* Interactive SVG Chart wrapper */}
          <div className="relative h-[264px] w-full select-none">
            {/* Tooltip Overlay */}
            {hoveredIndex !== null && (() => {
              const p = chartPoints[hoveredIndex];

              // Calculate tooltip values based on scale factor
              // index 4 corresponds to Mar (val: 34324) which should display € 96K total
              const scaleFactor = 96000 / 34324;
              const displayVal = p.val * scaleFactor;

              const formatK = (val: number, precision: number = 0) => {
                const kVal = val / 1000;
                return kVal.toFixed(precision).replace(".", ",");
              };

              const totalRevenueK = formatK(displayVal, 0);
              const basicValK = formatK(displayVal * 0.20, 1);
              const premiumValK = formatK(displayVal * 0.32, 1);
              const enterpriseValK = formatK(displayVal * 0.48, 0);

              const tooltipWidth = 190.58;
              const tooltipHeight = 180.37;

              // Center the tooltip on the point's X coordinate as percentage of 568 viewBox
              const leftPercent = (p.x / 568) * 100;
              let leftStyle = `${leftPercent}%`;
              let transformStyle = "translateX(-50%)";

              if (hoveredIndex === 0) {
                leftStyle = "35.13px";
                transformStyle = "translateX(0)";
              } else if (hoveredIndex === chartPoints.length - 1) {
                leftStyle = "100%";
                transformStyle = "translateX(-100%)";
              }

              const topPos = p.y - tooltipHeight - 12; // 12px above the dot

              return (
                <div
                  className="absolute z-20 bg-white pointer-events-none transition-all duration-150 ease-out flex flex-col justify-between"
                  style={{
                    width: `${tooltipWidth}px`,
                    height: `${tooltipHeight}px`,
                    left: leftStyle,
                    top: `${topPos}px`,
                    transform: transformStyle,
                    boxShadow: "0px 3.79837px 45.5805px -11.3951px rgba(10, 37, 64, 0.14)",
                    borderRadius: "7.59675px",
                    padding: "3.8px 11.4px 7.6px",
                    border: "0.949594px solid #E0E6EB"
                  }}
                >
                  {/* row 6: Total gross revenue */}
                  <div className="flex items-center justify-between" style={{ height: "27.4px" }}>
                    <div className="flex items-center gap-[7.6px]">
                      <div className="w-[7.6px] h-[7.6px] bg-[#16CDC7] rounded-full shrink-0" />
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        Total gross revenue
                      </span>
                    </div>
                    <span
                      className="text-[#98A4AE] font-semibold text-right"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "12px",
                        lineHeight: "16px"
                      }}
                    >
                      € {totalRevenueK}K
                    </span>
                  </div>

                  {/* row 3: Basic (20%) */}
                  <div className="flex flex-col justify-center gap-[7.6px]" style={{ height: "50.99px" }}>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        Basic
                      </span>
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        20%
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {/* progressbar */}
                      <div className="relative flex-1 bg-[#F6F7F9] rounded-full" style={{ height: "6px" }}>
                        <div className="absolute left-0 top-0 bottom-0 bg-[#DAD8FF] rounded-full" style={{ width: "72.2%" }} />
                      </div>
                      <span
                        className="text-[#98A4AE] font-semibold text-right shrink-0"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px",
                          width: "45px"
                        }}
                      >
                        € {basicValK}K
                      </span>
                    </div>
                  </div>

                  {/* row 7: Basic (32%) */}
                  <div className="flex flex-col justify-center gap-[7.6px]" style={{ height: "50.99px" }}>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        Basic
                      </span>
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        32%
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {/* progressbar */}
                      <div className="relative flex-1 bg-[#F6F7F9] rounded-full" style={{ height: "6px" }}>
                        <div className="absolute left-0 top-0 bottom-0 bg-[#D2F4F2] rounded-full" style={{ width: "72.2%" }} />
                      </div>
                      <span
                        className="text-[#98A4AE] font-semibold text-right shrink-0"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px",
                          width: "45px"
                        }}
                      >
                        € {premiumValK}K
                      </span>
                    </div>
                  </div>

                  {/* row 8: Basic (48%) */}
                  <div className="flex flex-col justify-center gap-[7.6px]" style={{ height: "50.99px" }}>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        Basic
                      </span>
                      <span
                        className="text-[#29343D] font-semibold"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        48%
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {/* progressbar */}
                      <div className="relative flex-1 bg-[#F6F7F9] rounded-full" style={{ height: "6px" }}>
                        <div className="absolute left-0 top-0 bottom-0 bg-[#6C63FF] rounded-full" style={{ width: "72.2%" }} />
                      </div>
                      <span
                        className="text-[#98A4AE] font-semibold text-right shrink-0"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: "16px",
                          width: "45px"
                        }}
                      >
                        € {enterpriseValK}K
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Y Axis Labels in HTML */}
            <div className="absolute left-0 top-0 w-[34px] bottom-[36.69px] pointer-events-none select-none">
              {yGridLines.map((y, idx) => {
                const labels = ["70k", "60k", "50k", "40k", "30k", "20k"];
                return (
                  <div
                    key={idx}
                    className="absolute text-left text-[#98A4AE] font-normal"
                    style={{
                      top: `${(y / 264) * 100}%`,
                      transform: "translateY(-50%)",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "11.3951px",
                      lineHeight: "15px"
                    }}
                  >
                    {labels[idx]}
                  </div>
                );
              })}
            </div>

            {/* X Axis Month Labels in HTML */}
            <div className="absolute left-0 right-0 bottom-0 h-[15.35px] pointer-events-none select-none">
              {chartPoints.map((p, idx) => (
                p.label && (
                  <div
                    key={idx}
                    className="absolute text-center text-[#98A4AE] font-normal"
                    style={{
                      left: `${(p.x / 568) * 100}%`,
                      transform: "translateX(-50%)",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "11.3951px",
                      lineHeight: "15px"
                    }}
                  >
                    {p.label}
                  </div>
                )
              ))}
            </div>

            {/* Active Node Dot in HTML */}
            {hoveredIndex !== null && (() => {
              const p = chartPoints[hoveredIndex];
              return (
                <div
                  className="absolute rounded-full pointer-events-none transition-all duration-150 ease-out"
                  style={{
                    width: "8px",
                    height: "8px",
                    left: `${(p.x / 568) * 100}%`,
                    top: `${(p.y / 264) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#16CDC7",
                    border: "1.89919px solid #FFFFFF",
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.15)",
                    zIndex: 15
                  }}
                />
              );
            })()}

            {/* Custom Responsive SVG Chart */}
            <svg
              viewBox="0 0 568 264"
              className="w-full h-full"
              style={{ overflow: "visible" }}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredIndex(4)}
            >
              {/* Horizontal Grid Lines */}
              {yGridLines.map((y, idx) => (
                <line
                  key={idx}
                  x1="35.13"
                  y1={y}
                  x2="568"
                  y2={y}
                  stroke="#F6F7F9"
                  strokeWidth="0.949594"
                />
              ))}

              {/* Vertical Grid Lines */}
              {chartPoints.map((p, idx) => (
                <line
                  key={idx}
                  x1={p.x}
                  y1="0.35"
                  x2={p.x}
                  y2="227.31"
                  stroke="#F6F7F9"
                  strokeWidth="0.949594"
                />
              ))}

              {/* Area Under Curve (Gradient) */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16CDC7" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#16CDC7" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              <path
                d={`${getSplinePath(chartPoints)} L 568 227.31 L 35.13 227.31 Z`}
                fill="url(#chartGradient)"
              />

              {/* Spline Path */}
              <path
                d={getSplinePath(chartPoints)}
                fill="none"
                stroke="#16CDC7"
                strokeWidth="1.89919"
                strokeLinecap="round"
              />

              {/* Interactive invisible hover column lines & touch targets */}
              {chartPoints.map((p, idx) => (
                <g key={idx}>
                  {/* Hover vertical guidelining */}
                  {hoveredIndex === idx && (
                    <line
                      x1={p.x}
                      y1="0.35"
                      x2={p.x}
                      y2="227.31"
                      stroke="#16CDC7"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  )}
                  {/* Touch targets */}
                  <rect
                    x={p.x - 29.5}
                    y="0.35"
                    width="59"
                    height="227"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Recent Activity Section (Right column) */}
        <div>
          <RecentActivitySection
            activities={mockActivities}
            onViewAllClick={onViewAllActivities}
          />
        </div>
      </div>

      {/* Bottom sections: Critical Alerts and Tickets */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-800">Critical Alerts</h3>
            <button
              onClick={() => onNavigate && onNavigate("support")}
              className="text-xs font-semibold text-[#635BFF] bg-white border border-[#635BFF] hover:bg-[#635BFF]/5 px-4 py-1.5 rounded-[8px] transition-all duration-200"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Alert Row 1 */}
            {!alert1Resolved && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-rose-50/20 border border-rose-100/30 group gap-4 min-h-[72px] transition-all duration-300">
                <div className="flex flex-col justify-center items-start gap-1 min-h-[52px]">
                  <div className="flex items-center gap-2">
                    <img src="/BellaVistaSalonBellIcon.svg" className="w-7 h-7 object-contain shrink-0" alt="Bella Vista Salon" />
                    <span className="text-sm font-semibold text-[#29343D] leading-[19px]">Bella Vista Salon</span>
                  </div>
                  <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] pl-9">
                    Subscription failed - Card declined
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                  <div className="w-[45px] h-[22px] flex items-center justify-center bg-[#FFE5ED] rounded-[6px] shrink-0">
                    <span className="text-[13px] font-semibold text-[#FF6692] leading-[18px]">High</span>
                  </div>
                  <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] w-[38px] text-center">2h ago</span>
                  <div className="flex items-center gap-[16px] w-[112px] h-[36px] shrink-0">
                    <div className="relative group/tooltip">
                      <button
                        onClick={() => {
                          if (loadingSync || alert1Resolved) return;
                          setLoadingSync(true);
                          setTimeout(() => {
                            setLoadingSync(false);
                            setAlert1Resolved(true);
                          }, 1200);
                        }}
                        className="w-[48px] h-[36px] rounded-[8px] bg-[#DDDBFF] text-[#635BFF] hover:opacity-90 flex items-center justify-center transition-opacity shrink-0"
                        title="Retry Payment"
                      >
                        <DashboardIcon src="/syncIcon.svg" size={16} className={loadingSync ? "animate-spin" : ""} />
                      </button>
                      <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex flex-col items-center pointer-events-none select-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150">
                        <div className="bg-[#635BFF] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_4px_12px_rgba(99,91,255,0.25)]">
                          {loadingSync ? "Processing..." : "Retry Payment"}
                        </div>
                        <div className="w-2 h-2 bg-[#635BFF] rotate-45 -mt-1" />
                      </div>
                    </div>

                    <div className="relative group/tooltip">
                      <button 
                        onClick={() => onViewSalon && onViewSalon("salon-2")}
                        className="w-[48px] h-[36px] rounded-[8px] bg-[#F1F2FE] text-[#635BFF] hover:opacity-90 flex items-center justify-center transition-opacity shrink-0"
                      >
                        <DashboardIcon src="/viewIcon.svg" size={16} />
                      </button>
                      <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex flex-col items-center pointer-events-none select-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150">
                        <div className="bg-[#635BFF] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_4px_12px_rgba(99,91,255,0.25)]">
                          View Details
                        </div>
                        <div className="w-2 h-2 bg-[#635BFF] rotate-45 -mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alert Row 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-amber-50/20 border border-amber-100/30 group gap-4 min-h-[72px]">
              <div className="flex flex-col justify-center items-start gap-1 min-h-[52px]">
                <div className="flex items-center gap-2">
                  <img src="/UrbanHairStudio.svg" className="w-7 h-7 object-contain shrink-0" alt="Urban Hair Studio" />
                  <span className="text-sm font-semibold text-[#29343D] leading-[19px]">Urban Hair Studio</span>
                </div>
                <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] pl-9">
                  Subscription expires in 3 days
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <div className="w-[60px] h-[22px] flex items-center justify-center bg-[#FFF2D6] rounded-[6px] shrink-0">
                  <span className="text-[13px] font-semibold text-[#FFAB00] leading-[18px]">Medium</span>
                </div>
                <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] w-[38px] text-center">4h ago</span>
                <div className="flex items-center gap-[16px] w-[112px] h-[36px] shrink-0">
                  <div className="relative group/tooltip">
                    <button
                      onClick={() => {
                        if (loadingSend || reminderSent) return;
                        setLoadingSend(true);
                        setTimeout(() => {
                          setLoadingSend(false);
                          setReminderSent(true);
                        }, 1200);
                      }}
                      className={`w-[48px] h-[36px] rounded-[8px] text-[#635BFF] flex items-center justify-center shrink-0 transition-all ${
                        reminderSent ? "bg-emerald-100 text-emerald-600" : "bg-[#DDDBFF] hover:opacity-90"
                      }`}
                      title="Send Reminder"
                    >
                      {loadingSend ? (
                        <DashboardIcon src="/syncIcon.svg" size={16} className="animate-spin" />
                      ) : reminderSent ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <DashboardIcon src="/shareIcon.svg" size={16} />
                      )}
                    </button>
                    <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex flex-col items-center pointer-events-none select-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150">
                      <div className="bg-[#635BFF] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_4px_12px_rgba(99,91,255,0.25)]">
                        {loadingSend ? "Sending..." : reminderSent ? "Sent Successfully" : "Send Reminder"}
                      </div>
                      <div className="w-2 h-2 bg-[#635BFF] rotate-45 -mt-1" />
                    </div>
                  </div>

                  <div className="relative group/tooltip">
                    <button 
                      onClick={() => onViewSalon && onViewSalon("salon-5")}
                      className="w-[48px] h-[36px] rounded-[8px] bg-[#F1F2FE] text-[#635BFF] hover:opacity-90 flex items-center justify-center transition-opacity shrink-0"
                    >
                      <DashboardIcon src="/viewIcon.svg" size={16} />
                    </button>
                    <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex flex-col items-center pointer-events-none select-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150">
                      <div className="bg-[#635BFF] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_4px_12px_rgba(99,91,255,0.25)]">
                        View Details
                      </div>
                      <div className="w-2 h-2 bg-[#635BFF] rotate-45 -mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-800">Tickets</h3>
            <button
              onClick={() => onNavigate && onNavigate("support")}
              className="text-xs font-semibold text-[#635BFF] bg-white border border-[#635BFF] hover:bg-[#635BFF]/5 px-4 py-1.5 rounded-[8px] transition-all duration-200"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Ticket Row 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 group gap-4 min-h-[72px]">
              <div className="flex flex-col justify-center items-start gap-1 min-h-[52px]">
                <div className="flex items-center gap-2">
                  <img src="/BellaVistaSalon.svg" className="w-7 h-7 object-contain shrink-0" alt="Bella Vista Salon" />
                  <span className="text-sm font-semibold text-[#29343D] leading-[19px]">Bella Vista Salon</span>
                </div>
                <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] pl-9">
                  Employee access issues
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <div className="w-[45px] h-[22px] flex items-center justify-center bg-[#FFE5ED] rounded-[6px] shrink-0">
                  <span className="text-[13px] font-semibold text-[#FF6692] leading-[18px]">High</span>
                </div>
                <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] w-[70px] text-center">08/08/2025</span>
                <div className="relative group/tooltip">
                  <button 
                    onClick={() => onViewSalon && onViewSalon("salon-2")}
                    className="w-[48px] h-[36px] rounded-[8px] bg-[#F1F2FE] text-[#635BFF] hover:opacity-90 flex items-center justify-center transition-opacity shrink-0"
                  >
                    <DashboardIcon src="/viewIcon.svg" size={16} />
                  </button>
                  <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex flex-col items-center pointer-events-none select-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150">
                    <div className="bg-[#635BFF] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_4px_12px_rgba(99,91,255,0.25)]">
                      View Details
                    </div>
                    <div className="w-2 h-2 bg-[#635BFF] rotate-45 -mt-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Row 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 group gap-4 min-h-[72px]">
              <div className="flex flex-col justify-center items-start gap-1 min-h-[52px]">
                <div className="flex items-center gap-2">
                  <img src="/BellaVistaSalon.svg" className="w-7 h-7 object-contain shrink-0" alt="Bella Vista Salon" />
                  <span className="text-sm font-semibold text-[#29343D] leading-[19px]">Bella Vista Salon</span>
                </div>
                <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] pl-9">
                  Employee access issues
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <div className="w-[45px] h-[22px] flex items-center justify-center bg-[#FFE5ED] rounded-[6px] shrink-0">
                  <span className="text-[13px] font-semibold text-[#FF6692] leading-[18px]">High</span>
                </div>
                <span className="text-[11.3951px] font-normal text-[#526B7A] leading-[15px] w-[70px] text-center">08/08/2025</span>
                <div className="relative group/tooltip">
                  <button 
                    onClick={() => onViewSalon && onViewSalon("salon-2")}
                    className="w-[48px] h-[36px] rounded-[8px] bg-[#F1F2FE] text-[#635BFF] hover:opacity-90 flex items-center justify-center transition-opacity shrink-0"
                  >
                    <DashboardIcon src="/viewIcon.svg" size={16} />
                  </button>
                  <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:flex flex-col items-center pointer-events-none select-none z-30 animate-in fade-in slide-in-from-bottom-1 duration-150">
                    <div className="bg-[#635BFF] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_4px_12px_rgba(99,91,255,0.25)]">
                      View Details
                    </div>
                    <div className="w-2 h-2 bg-[#635BFF] rotate-45 -mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics modals overlay */}
      <AnalyticsModals
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onNavigate={onNavigate || (() => {})}
      />
    </div>
  );
}
