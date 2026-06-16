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
}

export default function DashboardPage({ onViewAllActivities }: DashboardPageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); // Default to Mar point (index 4) for matching Figma/mockup
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeModal, setActiveModal] = useState<"sales" | "subscriptions" | "leads" | "salons" | null>(null);

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

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eef2f6] hover:bg-slate-50 rounded-2xl text-xs font-semibold text-slate-600 transition-all shadow-sm ${
              isRefreshing ? "opacity-75" : ""
            }`}
          >
            <HugeiconsIcon
              icon={GlobalRefreshIcon}
              size={14}
              className={`text-[#7e8b9b] ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh Data
          </button>

          <button
            onClick={() => alert("Viewing All Salons")}
            className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all duration-150"
          >
            View All Salons
          </button>
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
          icon={CreditCardIcon}
          iconBgClass="bg-[#f0efff]"
          iconColor="#5e53fc"
          onViewClick={() => setActiveModal("sales")}
        />
        <StatCard
          title="Total Active Subscriptions"
          value="44"
          subtext="from last month"
          trendType="up"
          trendValue="+10%"
          icon={ChartAreaIcon}
          iconBgClass="bg-[#e6fcf9]"
          iconColor="#10b981"
          onViewClick={() => setActiveModal("subscriptions")}
        />
        <StatCard
          title="New Saas Leads"
          value="10"
          subtext="14 total leads in pipeline"
          trendType="neutral"
          icon={UserGroupIcon}
          iconBgClass="bg-[#eefcf2]"
          iconColor="#059669"
          onViewClick={() => setActiveModal("leads")}
        />
        <StatCard
          title="New Salons"
          value="+8"
          subtext="from last month"
          trendType="up"
          trendValue="+18.5%"
          icon={Shop}
          iconBgClass="bg-[#fff9eb]"
          iconColor="#f59e0b"
          onViewClick={() => setActiveModal("salons")}
        />
        <StatCard
          title="Monthly Churn Rate"
          value="7%"
          subtext="Last month Churn Rate: 5%"
          trendType="neutral"
          icon={Mail01Icon}
          iconBgClass="bg-[#fff0f3]"
          iconColor="#f43f5e"
          onViewClick={() => alert("Monthly Churn Rate analytics details coming soon!")}
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
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
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
              onClick={() => alert("Exporting data...")}
              className="font-medium transition-all duration-200 border border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF]/5 flex items-center justify-center"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "12px",
                lineHeight: "16px",
                borderRadius: "8px",
                padding: "10px 16px",
                width: "99px",
                height: "36px"
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
        <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-800">Critical Alerts</h3>
            <button
              onClick={() => alert("Viewing all alerts...")}
              className="text-xs font-semibold text-[#5e53fc] bg-[#f2f1ff] border border-[#d9d5ff] hover:bg-[#5e53fc] hover:text-white px-3.5 py-1.5 rounded-xl transition-all duration-200"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Alert Row 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-rose-50/20 border border-rose-100/30 group gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <HugeiconsIcon icon={Alert01Icon} size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800">Bella Vista Salon</span>
                  <span className="text-xs text-slate-400">Subscription failed - Card declined</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <span className="text-[10px] font-bold text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-full uppercase">
                  High
                </span>
                <span className="text-xs text-slate-400">2h ago</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Retrying payment for Bella Vista...")}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f1ff] hover:bg-[#5e53fc] hover:text-white rounded-xl text-xs font-semibold text-[#5e53fc] transition-all"
                  >
                    <HugeiconsIcon icon={Refresh01Icon} size={12} />
                    Retry Payment
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-xl transition-colors">
                    <HugeiconsIcon icon={ViewIcon} size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Alert Row 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-amber-50/20 border border-amber-100/30 group gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <HugeiconsIcon icon={Alert01Icon} size={20} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800">Urban Hair Studio</span>
                  <span className="text-xs text-slate-400">Subscription expires in 3 days</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100/60 px-2 py-0.5 rounded-full uppercase">
                  Medium
                </span>
                <span className="text-xs text-slate-400">4h ago</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Sending reminder to Urban Hair Studio...")}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f1ff] hover:bg-[#5e53fc] hover:text-white rounded-xl text-xs font-semibold text-[#5e53fc] transition-all"
                  >
                    {/* Paper Plane Send Icon */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Reminder
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-xl transition-colors">
                    <HugeiconsIcon icon={ViewIcon} size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-800">Tickets</h3>
            <button
              onClick={() => alert("Viewing all tickets...")}
              className="text-xs font-semibold text-[#5e53fc] bg-[#f2f1ff] border border-[#d9d5ff] hover:bg-[#5e53fc] hover:text-white px-3.5 py-1.5 rounded-xl transition-all duration-200"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Ticket Row 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 group gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <HugeiconsIcon icon={Ticket01Icon} size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800">Bella Vista Salon</span>
                  <span className="text-xs text-slate-400">Employee access issues</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full uppercase">
                  High
                </span>
                <span className="text-xs text-slate-400">08/08/2025</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Viewing ticket details...")}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f1ff] hover:bg-[#5e53fc] hover:text-white rounded-xl text-xs font-semibold text-[#5e53fc] transition-all"
                  >
                    View Details
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-xl transition-colors">
                    <HugeiconsIcon icon={ViewIcon} size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Ticket Row 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 group gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <HugeiconsIcon icon={Ticket01Icon} size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800">Bella Vista Salon</span>
                  <span className="text-xs text-slate-400">Employee access issues</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full uppercase">
                  High
                </span>
                <span className="text-xs text-slate-400">08/08/2025</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Viewing ticket details...")}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f1ff] hover:bg-[#5e53fc] hover:text-white rounded-xl text-xs font-semibold text-[#5e53fc] transition-all"
                  >
                    View Details
                  </button>
                  <button className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-xl transition-colors">
                    <HugeiconsIcon icon={ViewIcon} size={14} />
                  </button>
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
      />
    </div>
  );
}
