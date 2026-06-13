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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(3); // Default to Apr point for the tooltip
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

  // Chart data points
  const chartPoints = [
    { label: "Jan", val: 32000, x: 0, y: 164 },
    { label: "Feb", val: 40000, x: 75, y: 134 },
    { label: "Mar", val: 38000, x: 150, y: 142.4 },
    { label: "Apr", val: 45000, x: 225, y: 116 },
    { label: "May", val: 41000, x: 300, y: 130.4 },
    { label: "Jun", val: 43000, x: 375, y: 123.2 },
    { label: "Jul", val: 51000, x: 450, y: 92 },
    { label: "Aug", val: 48000, x: 525, y: 104 },
    { label: "Sep", val: 46000, x: 600, y: 111.2 }
  ];

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
          <div className="relative h-[266px] w-full select-none">
            {/* Tooltip Overlay */}
            {hoveredIndex !== null && (() => {
              const p = chartPoints[hoveredIndex];
              const isFirst = hoveredIndex === 0;
              const isLast = hoveredIndex === chartPoints.length - 1;
              
              let leftStyle = `${(p.x / 600) * 100}%`;
              let transformStyle = "translateX(-50%)";
              
              if (isFirst) {
                leftStyle = "0%";
                transformStyle = "translateX(0)";
              } else if (isLast) {
                leftStyle = "100%";
                transformStyle = "translateX(-100%)";
              }
              
              return (
                <div
                  className="absolute z-20 bg-white pointer-events-none transition-all duration-150 ease-out flex flex-col justify-between"
                  style={{
                    width: "190.58px",
                    height: "180.37px",
                    left: leftStyle,
                    top: `${p.y - 190}px`, // Hover above dot
                    transform: transformStyle,
                    boxShadow: "0px 3.79px 45.58px -11.39px rgba(10, 37, 64, 0.14)",
                    borderRadius: "7.59675px",
                    padding: "10px"
                  }}
                >
                  {/* row 6: Total gross revenue */}
                  <div className="flex items-center gap-[7.6px] h-[27.4px]">
                    <div className="w-[7.6px] h-[7.6px] bg-[#16CDC7] rounded-full flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-[#29343D] w-[112px] font-sans">
                      Total gross revenue
                    </span>
                    <span className="text-[12px] font-semibold text-[#98A4AE] font-sans">
                      € 96K
                    </span>
                  </div>

                  {/* row 3: Basic 20% */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#29343D] font-sans">
                      <span>Basic</span>
                      <span>20%</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[114.79px] h-[6px] bg-[#F6F7F9] rounded-full relative overflow-hidden flex-shrink-0">
                        <div className="absolute left-0 top-0 bottom-0 w-[82.9px] bg-[#DAD8FF] rounded-full" />
                      </div>
                      <span className="text-[12px] font-semibold text-[#98A4AE] font-sans text-right flex-1">
                        € 19,2K
                      </span>
                    </div>
                  </div>

                  {/* row 7: Basic 32% */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#29343D] font-sans">
                      <span>Basic</span>
                      <span>32%</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[110.79px] h-[6px] bg-[#F6F7F9] rounded-full relative overflow-hidden flex-shrink-0">
                        <div className="absolute left-0 top-0 bottom-0 w-[80.02px] bg-[#D2F4F2] rounded-full" />
                      </div>
                      <span className="text-[12px] font-semibold text-[#98A4AE] font-sans text-right flex-1">
                        € 30,7K
                      </span>
                    </div>
                  </div>

                  {/* row 8: Basic 48% */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#29343D] font-sans">
                      <span>Basic</span>
                      <span>48%</span>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[115.79px] h-[6px] bg-[#F6F7F9] rounded-full relative overflow-hidden flex-shrink-0">
                        <div className="absolute left-0 top-0 bottom-0 w-[83.63px] bg-[#6C63FF] rounded-full" />
                      </div>
                      <span className="text-[12px] font-semibold text-[#98A4AE] font-sans text-right flex-1">
                        € 46K
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Custom Responsive SVG Chart */}
            <svg viewBox="0 0 600 280" className="w-full h-full" style={{ overflow: "visible" }}>
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#F6F7F9" strokeWidth="0.949594" />
              <line x1="0" y1="62" x2="600" y2="62" stroke="#F6F7F9" strokeWidth="0.949594" />
              <line x1="0" y1="104" x2="600" y2="104" stroke="#F6F7F9" strokeWidth="0.949594" />
              <line x1="0" y1="146" x2="600" y2="146" stroke="#F6F7F9" strokeWidth="0.949594" />
              <line x1="0" y1="188" x2="600" y2="188" stroke="#F6F7F9" strokeWidth="0.949594" />
              <line x1="0" y1="230" x2="600" y2="230" stroke="#F6F7F9" strokeWidth="0.949594" />

              {/* Y Axis Labels */}
              <text x="10" y="24" textAnchor="start" className="font-normal fill-[#98A4AE] font-sans" style={{ fontSize: "11.3951px" }}>70k</text>
              <text x="10" y="66" textAnchor="start" className="font-normal fill-[#98A4AE] font-sans" style={{ fontSize: "11.3951px" }}>60k</text>
              <text x="10" y="108" textAnchor="start" className="font-normal fill-[#98A4AE] font-sans" style={{ fontSize: "11.3951px" }}>50k</text>
              <text x="10" y="150" textAnchor="start" className="font-normal fill-[#98A4AE] font-sans" style={{ fontSize: "11.3951px" }}>40k</text>
              <text x="10" y="192" textAnchor="start" className="font-normal fill-[#98A4AE] font-sans" style={{ fontSize: "11.3951px" }}>30k</text>
              <text x="10" y="234" textAnchor="start" className="font-normal fill-[#98A4AE] font-sans" style={{ fontSize: "11.3951px" }}>20k</text>

              {/* Area Under Curve (Gradient) */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16CDC7" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#16CDC7" stopOpacity="0.00" />
                </linearGradient>
              </defs>
              <path
                d="M 0 164 C 37.5 146, 37.5 134, 75 134 C 112.5 134, 112.5 146, 150 142.4 C 187.5 138.8, 187.5 116, 225 116 C 262.5 116, 262.5 130.4, 300 130.4 C 337.5 130.4, 337.5 123.2, 375 123.2 C 412.5 123.2, 412.5 92, 450 92 C 487.5 92, 487.5 104, 525 104 C 562.5 104, 562.5 111.2, 600 111.2 L 600 230 L 0 230 Z"
                fill="url(#chartGradient)"
              />

              {/* Spline Path */}
              <path
                d="M 0 164 C 37.5 146, 37.5 134, 75 134 C 112.5 134, 112.5 146, 150 142.4 C 187.5 138.8, 187.5 116, 225 116 C 262.5 116, 262.5 130.4, 300 130.4 C 337.5 130.4, 337.5 123.2, 375 123.2 C 412.5 123.2, 412.5 92, 450 92 C 487.5 92, 487.5 104, 525 104 C 562.5 104, 562.5 111.2, 600 111.2"
                fill="none"
                stroke="#16CDC7"
                strokeWidth="1.89919"
                strokeLinecap="round"
              />

              {/* X Axis Month Labels */}
              {chartPoints.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y="260"
                  textAnchor="middle"
                  className="font-normal fill-[#98A4AE] font-sans"
                  style={{ fontSize: "11.3951px" }}
                >
                  {p.label}
                </text>
              ))}

              {/* Interactive invisible hover column lines */}
              {chartPoints.map((p, idx) => (
                <g key={idx}>
                  {/* Hover vertical guidelining */}
                  {hoveredIndex === idx && (
                    <line
                      x1={p.x}
                      y1="20"
                      x2={p.x}
                      y2="230"
                      stroke="#16CDC7"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  )}
                  {/* Touch targets */}
                  <rect
                    x={p.x - 25}
                    y="10"
                    width="50"
                    height="220"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {/* Active node dot */}
                  {hoveredIndex === idx && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#16CDC7"
                      stroke="#ffffff"
                      strokeWidth="1.89919"
                      className="pointer-events-none drop-shadow-sm"
                    />
                  )}
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
            <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/20 border border-rose-100/30 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <HugeiconsIcon icon={Alert01Icon} size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Bella Vista Salon</span>
                  <span className="text-xs text-slate-400">Subscription failed - Card declined</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
            <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/20 border border-amber-100/30 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <HugeiconsIcon icon={Alert01Icon} size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Urban Hair Studio</span>
                  <span className="text-xs text-slate-400">Subscription expires in 3 days</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <HugeiconsIcon icon={Ticket01Icon} size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Bella Vista Salon</span>
                  <span className="text-xs text-slate-400">Employee access issues</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-100 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                  <HugeiconsIcon icon={Ticket01Icon} size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Bella Vista Salon</span>
                  <span className="text-xs text-slate-400">Employee access issues</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
