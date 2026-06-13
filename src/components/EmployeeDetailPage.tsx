"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

// Custom icons
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Manager" | "Staff" | "Sole Director";
  status: "Active" | "Pending" | "Inactive";
  employmentStatus: "Currently Hired" | string;
  lastLogin: string;
  dob: string;
  pob: string;
  address: string;
  contractType: string;
  taxCode: string;
  iban: string;
  startDate: string;
  endDate?: string;
  occupation: string;
  remuneration: string;
  phone: string;
  emergencyName: string;
  emergencyPhone: string;
}

interface EmployeeDetailPageProps {
  employee: Employee;
  onBack: () => void;
  onViewPermissions: () => void;
}

export default function EmployeeDetailPage({ employee, onBack, onViewPermissions }: EmployeeDetailPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<"basic" | "remuneration" | "activity" | "production">("basic");

  // Additional Data Form edit modal state
  const [isEditAdditionalOpen, setIsEditAdditionalOpen] = useState(false);
  // Previous Thinking modal state
  const [isPreviousThinkingOpen, setIsPreviousThinkingOpen] = useState(false);
  const [previousThinking, setPreviousThinking] = useState("");

  // Touch/hover states for charts
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(1); // default Tuesday
  const [hoveredBarMonth, setHoveredBarMonth] = useState<number | null>(3); // default Apr
  const [hoveredTrendYear, setHoveredTrendYear] = useState<number | null>(1); // default 2020

  // Interactive drop-down states
  const [productionPeriod, setProductionPeriod] = useState("Monthly");
  const [isProdPeriodDropdownOpen, setIsProdPeriodDropdownOpen] = useState(false);

  const [trendsPeriod, setTrendsPeriod] = useState("Yearly");
  const [isTrendsPeriodDropdownOpen, setIsTrendsPeriodDropdownOpen] = useState(false);

  const [perfSelectedMonth, setPerfSelectedMonth] = useState("April");
  const [perfSelectedYear, setPerfSelectedYear] = useState(2025);
  const [isPerfMetricDropdownOpen, setIsPerfMetricDropdownOpen] = useState(false);
  const [perfDropdownSubMenu, setPerfDropdownSubMenu] = useState<"month" | "year">("month");

  const [opsPeriod, setOpsPeriod] = useState("Last Month");
  const [isOpsPeriodDropdownOpen, setIsOpsPeriodDropdownOpen] = useState(false);

  // Terminate Contract modal state
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [terminateEndDate, setTerminateEndDate] = useState("");
  const [terminateReason, setTerminateReason] = useState("");
  const [terminateAccessDate, setTerminateAccessDate] = useState("");

  // Touch handlers for charts
  const handleActivityTouch = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const touchX = ((touch.clientX - rect.left) / rect.width) * 1000;

    let closestIdx = 0;
    let minDistance = Infinity;
    weeklyData.forEach((d, i) => {
      const dist = Math.abs(touchX - d.x);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });

    if (minDistance < 80) {
      setHoveredPoint(closestIdx);
    }
  };

  const handleBarTouch = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const touchX = ((touch.clientX - rect.left) / rect.width) * 1000;

    let closestIdx = 0;
    let minDistance = Infinity;
    prodBarData.forEach((d, i) => {
      const dist = Math.abs(touchX - d.cx);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });

    if (minDistance < 80) {
      setHoveredBarMonth(closestIdx);
    }
  };

  const handleTrendTouch = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const touchX = ((touch.clientX - rect.left) / rect.width) * 1000;

    let closestIdx = 0;
    let minDistance = Infinity;
    trendPoints.forEach((p, i) => {
      const dist = Math.abs(touchX - p.x);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });

    if (minDistance < 80) {
      setHoveredTrendYear(closestIdx);
    }
  };

  // Weekly appointments data
  const weeklyData = [
    { day: "Monday", x: 110, y: 128, value: 45 },
    { day: "Tuesday", x: 250, y: 118, value: 40 },
    { day: "Wednesday", x: 390, y: 102, value: 55 },
    { day: "Thursday", x: 530, y: 92, value: 60 },
    { day: "Friday", x: 670, y: 108, value: 50 },
    { day: "Saturday", x: 810, y: 32, value: 125 },
    { day: "Sunday", x: 950, y: 38, value: 120 },
  ];

  // Production bar chart data
  const prodBarData = [
    { month: "Jan", cx: 140, tealH: 30, pinkH: 74, total: "€ 1.4k", threshold: "€ 1.2k", above: "€ 0.2k", date: "January, 2025" },
    { month: "Feb", cx: 270, tealH: 80, pinkH: 34, total: "€ 2.1k", threshold: "€ 1.5k", above: "€ 0.6k", date: "February, 2025" },
    { month: "Mar", cx: 400, tealH: 24, pinkH: 64, total: "€ 1.5k", threshold: "€ 1.3k", above: "€ 0.2k", date: "March, 2025" },
    { month: "Apr", cx: 530, tealH: 84, pinkH: 44, total: "€ 1.7k", threshold: "€ 1.7k", above: "€ 1.7k", date: "April, 2025" },
    { month: "Jun", cx: 710, tealH: 0, pinkH: 74, total: "€ 2.3k", threshold: "€ 1.8k", above: "€ 0.5k", date: "June, 2025" },
    { month: "Jul", cx: 850, tealH: 90, pinkH: 54, total: "€ 2.6k", threshold: "€ 2.0k", above: "€ 0.6k", date: "July, 2025" },
  ];

  // Production trends data points
  const trendPoints = [
    { year: "2019", x: 100, y: 68, color: "#10b981", status: "Above Threshold", value: "€ 2.5k" },
    { year: "2020", x: 240, y: 62, color: "#10b981", status: "Above Threshold", value: "€ 1.7k" },
    { year: "2021", x: 380, y: 70, color: "#10b981", status: "Above Threshold", value: "€ 2.4k" },
    { year: "2022", x: 520, y: 78, color: "#10b981", status: "Above Threshold", value: "€ 2.2k" },
    { year: "2023", x: 660, y: 124, color: "#f43f5e", status: "Below Threshold", value: "€ 1.7k" },
    { year: "2024", x: 800, y: 48, color: "#10b981", status: "Above Threshold", value: "€ 2.8k" },
    { year: "2025", x: 940, y: 54, color: "#10b981", status: "Above Threshold", value: "€ 2.6k" },
  ];
  const [certifications, setCertifications] = useState(["Professional Hairdresser", "Business Management"]);
  const [newCert, setNewCert] = useState("");
  const [courses, setCourses] = useState(["Leadership Management", "Customer Service Excellence"]);
  const [newCourse, setNewCourse] = useState("");
  const [languages, setLanguages] = useState([
    { lang: "Italian", level: "Native" },
    { lang: "English", level: "Advanced" },
    { lang: "Spanish", level: "Intermediate" }
  ]);
  const [newLang, setNewLang] = useState("French");
  const [newLangLevel, setNewLangLevel] = useState("Intermediate");
  const [manager, setManager] = useState("Maria Rodriguez");

  // Handles adding new metadata items
  const handleAddCert = () => {
    setCertifications(prev => [...prev, newCert.trim() || "New Certification"]);
    setNewCert("");
  };

  const handleAddCourse = () => {
    setCourses(prev => [...prev, newCourse.trim() || "New Course"]);
    setNewCourse("");
  };

  const handleAddLanguage = () => {
    setLanguages(prev => [...prev, { lang: newLang, level: newLangLevel }]);
  };

  const handleSaveAdditional = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditAdditionalOpen(false);
  };

  const handleSaveThinking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviousThinkingOpen(false);
  };

  // Mock Payslips List for Remuneration Tab
  const payslips = [
    { date: "November 29, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
    { date: "October 30, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
    { date: "September 29, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
    { date: "August 30, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
    { date: "July 29, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" }
  ];

  // Mock Stamps for Activity Tab
  const stamps = [
    { date: "November 29, 2024", time: "08:00 - 18:00", total: "10h", added: "2 hours ago" },
    { date: "October 30, 2024", time: "08:00 - 18:00", total: "10h", added: "2 hours ago" },
    { date: "September 29, 2024", time: "08:00 - 18:00", total: "10h", added: "2 hours ago" }
  ];

  // Mock Customers for Activity Tab
  const loyalCustomers = [
    { name: "Sofia Bianchi", appts: 25, spent: "€ 1,700", lastAppt: "November 21, 2024" },
    { name: "Guy Hawkins", appts: 24, spent: "€ 1,500", lastAppt: "October 14, 2024" },
    { name: "Cameron Williamson", appts: 20, spent: "€ 1,200", lastAppt: "December 28, 2024" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">

      {/* Breadcrumb Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors inline-flex text-slate-500 hover:text-slate-800"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            {employee.firstName} {employee.lastName}
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors inline-flex">
            <HomeIcon />
          </button>
          <span className="text-slate-300">/</span>
          <span className="bg-[#eff6ff] text-[#2563eb] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">
            Salon Beauty
          </span>
        </div>
      </div>

      {/* Main Profile Cover Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)] flex flex-col p-6 w-full text-left">
        {/* Cover Picture Background */}
        <div className="h-[240px] w-full rounded-2xl relative overflow-hidden">
          <Image src="/bg-main.png" alt="Cover" fill className="object-cover" unoptimized />
        </div>

        {/* Profile Details Overlay Section */}
        <div className="flex flex-col items-center -mt-12 relative z-10 mb-6">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-50 flex items-center justify-center font-bold text-2xl text-[#5e53fc]">
            {employee.firstName[0]}{employee.lastName[0]}
          </div>

          <h2 className="text-lg font-extrabold text-slate-800 mt-3">{employee.firstName} {employee.lastName}</h2>
          <span className="text-xs text-slate-400 font-semibold">{employee.pob || "Bologna"}, Italy</span>
          <span className="mt-2.5 px-2.5 py-0.5 rounded-full text-[9px] bg-[#dcfce7] text-[#16a34a] font-extrabold uppercase">
            {employee.status}
          </span>
        </div>

        {/* Action button row with stats details */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-800">{employee.startDate || "May 31, 2022"}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Start Date</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-800">{employee.contractType || "Permanent"}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Contract Type</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => alert(`Editing employee: ${employee.firstName}`)}
              className="px-5 py-2.5 bg-[#f2f1ff] hover:bg-[#e2dfff] text-[#5e53fc] rounded-xl text-xs font-bold transition-all"
            >
              Edit Employee
            </button>
            <button
              onClick={() => setIsTerminateModalOpen(true)}
              className="px-5 py-2.5 bg-[#fee2e2] hover:bg-[#fecaca] text-[#dc2626] rounded-xl text-xs font-bold transition-all"
            >
              Terminate Contract
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs Row */}
        <div className="flex items-center border-b border-slate-100 mt-8">
          <button
            onClick={() => setActiveSubTab("basic")}
            className={`px-6 py-3 border-b-2 text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === "basic"
                ? "border-[#5e53fc] text-[#5e53fc]"
                : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
          >
            <span>Basic Data</span>
          </button>
          <button
            onClick={() => setActiveSubTab("remuneration")}
            className={`px-6 py-3 border-b-2 text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === "remuneration"
                ? "border-[#5e53fc] text-[#5e53fc]"
                : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
          >
            <span>Remuneration</span>
          </button>
          <button
            onClick={() => setActiveSubTab("activity")}
            className={`px-6 py-3 border-b-2 text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === "activity"
                ? "border-[#5e53fc] text-[#5e53fc]"
                : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
          >
            <span>Activity in Salon</span>
          </button>
          <button
            onClick={() => setActiveSubTab("production")}
            className={`px-6 py-3 border-b-2 text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === "production"
                ? "border-[#5e53fc] text-[#5e53fc]"
                : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
          >
            <span>Production</span>
          </button>
        </div>

        {/* Sub-tab content renderer */}
        <div className="pt-8">
          {/* TAB 1: BASIC DATA */}
          {activeSubTab === "basic" && (
            <div className="flex flex-col gap-6 w-full">
              {/* Row 1: Personal Data + Contract side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Data */}
                <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col relative">
                  <button
                    onClick={() => alert("Edit Personal Data")}
                    className="absolute right-6 top-6 px-4.5 py-1.5 border border-slate-100 hover:bg-slate-50 text-[#5e53fc] rounded-xl text-[11px] font-bold transition-all"
                  >
                    Edit
                  </button>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Personal data</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-xs font-semibold">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Date of birth</span>
                      <span className="text-slate-700">{employee.dob || "November 7, 1992"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Full Address</span>
                      <span className="text-slate-700 leading-snug">{employee.address || "Corso Buenos Aires 67, 20124 Milano (MI)"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Telephone</span>
                      <span className="text-slate-700">{employee.phone || "+39 336 789 012"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                      <span className="text-slate-700">{employee.email || "anna@bellavista.com"}</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Contact</span>
                      <span className="text-slate-700">{employee.emergencyName} ({employee.emergencyPhone})</span>
                    </div>
                  </div>
                </div>

                {/* Contract */}
                <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col relative">
                  <div className="absolute right-6 top-6 flex items-center gap-2">
                    <button
                      title="Download Contract"
                      onClick={() => alert("Downloading employee contract...")}
                      className="px-3 py-1.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      <DownloadIcon />
                      <span>Download Contract</span>
                    </button>
                    <button
                      onClick={() => alert("Edit Contract Details")}
                      className="px-4.5 py-1.5 border border-slate-100 hover:bg-slate-50 text-[#5e53fc] rounded-xl text-[11px] font-bold transition-all"
                    >
                      Edit
                    </button>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Contract</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-xs font-semibold">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">End Date</span>
                      <span className="text-slate-700">{employee.endDate || "Indeterminate"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Tax ID Code</span>
                      <span className="text-slate-700 uppercase">{employee.taxCode || "RSSANN92S48F205Z"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Occupation</span>
                      <span className="text-slate-700">{employee.occupation || "Barber"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Remuneration</span>
                      <span className="text-slate-700">€ {employee.remuneration || "2,200"}</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">IBAN</span>
                      <span className="text-slate-700 uppercase tracking-wide">IT60 X054 ******* 123</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Additional Data — full width */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col relative">
                <button
                  onClick={() => setIsEditAdditionalOpen(true)}
                  className="absolute right-6 top-6 px-4.5 py-1.5 border border-slate-100 hover:bg-slate-50 text-[#5e53fc] rounded-xl text-[11px] font-bold transition-all"
                >
                  Edit
                </button>
                <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Additional Data</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-xs font-semibold">
                  {/* Left column: Certifications + Languages */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Certifications</span>
                      <div className="flex flex-wrap gap-2">
                        {certifications.map((cert, idx) => (
                          <span key={idx} className="bg-slate-100/60 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-bold">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Languages</span>
                      <div className="flex flex-col gap-1.5">
                        {languages.map((l, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-slate-700 font-bold">{l.lang}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase ${l.level === "Native"
                                ? "bg-purple-50 text-purple-600"
                                : l.level === "Advanced"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-orange-50 text-orange-600"
                              }`}>
                              {l.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Right column: Completed Courses + Direct Manager */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Completed Courses</span>
                      <div className="flex flex-col gap-1 font-bold text-slate-700">
                        {courses.map((course, idx) => (
                          <span key={idx} className="block leading-relaxed">{course}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Direct Manager</span>
                      <span className="text-slate-700 font-bold">{manager}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Social & Access — full width */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col relative">
                <button
                  onClick={onViewPermissions}
                  className="absolute right-6 top-6 px-4.5 py-1.5 border border-slate-100 hover:bg-slate-50 text-[#5e53fc] rounded-xl text-[11px] font-bold transition-all"
                >
                  Change Permits
                </button>
                <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Social & Access</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-xs font-semibold">
                  {/* Left: Social Connected */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Social Connected</span>
                    <div className="flex items-center gap-2 justify-between max-w-sm border border-slate-50 p-2.5 rounded-xl">
                      <span className="font-bold text-slate-600 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </span>
                      <span className="px-2 py-0.5 rounded text-[8px] bg-rose-50 text-rose-500 font-extrabold uppercase">
                        Not Connected
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-between max-w-sm border border-slate-50 p-2.5 rounded-xl">
                      <span className="font-bold text-slate-600 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink-600">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        </svg>
                        Instagram
                      </span>
                      <span className="px-2 py-0.5 rounded text-[8px] bg-emerald-50 text-emerald-600 font-extrabold uppercase">
                        Connected
                      </span>
                    </div>
                  </div>

                  {/* Right: Access info */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Direct Manager</span>
                    <div className="flex items-center gap-3 border border-slate-50 p-2.5 rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Last Access</span>
                        <span className="text-slate-700 font-extrabold">1h ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 border border-slate-50 p-2.5 rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Permits</span>
                        <span className="px-2.5 py-0.5 bg-[#eff6ff] text-[#2563eb] rounded-md text-[9px] font-extrabold uppercase mt-0.5 w-fit">
                          All
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REMUNERATION */}
          {activeSubTab === "remuneration" && (
            <div className="flex flex-col gap-6 w-full text-left">
              {/* Section Title */}
              <h3 className="text-[22px] font-semibold leading-[120%] text-[#29343D] font-[family-name:var(--font-manrope)] flex-none flex-grow">Remuneration</h3>

              {/* Metric cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Last Payslip — white card with blue icon */}
                <div className="border border-slate-100 rounded-3xl p-5 bg-white flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#5e53fc]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v12M9 9h6M9 15h4" /></svg>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wide">Last Payslip</span>
                  </div>
                  <span className="text-2xl font-black text-slate-800">€ 1,700</span>
                  <div className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    <span>Gross: € 4,500.00</span>
                    <span className="block">November 29, 2024</span>
                  </div>
                </div>

                {/* Average Salary — white card with orange icon */}
                <div className="border border-slate-100 rounded-3xl p-5 bg-white flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#fff7ed] flex items-center justify-center text-[#f59e0b]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M2 10h20" /></svg>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wide">Average Salary</span>
                  </div>
                  <span className="text-2xl font-black text-slate-800">€ 2,200</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Last 12 months</span>
                </div>

                {/* Accumulated TFR — light purple card */}
                <div className="rounded-3xl p-5 bg-[#f2f1ff] flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#5e53fc]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-[#5e53fc]/60 tracking-wide">Accumulated TFR</span>
                  </div>
                  <span className="text-2xl font-black text-slate-800">€ 5,500</span>
                </div>
              </div>

              {/* Payments per Year Section & SVG Bar Chart */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Payments per Year</h4>
                </div>

                {/* SVG Bar Chart — wide stacked bars */}
                <div className="w-full py-2">
                  <svg className="w-full h-[300px]" viewBox="0 0 1385 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Y-axis labels */}
                    <text x="42" y="32" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 4,000</text>
                    <text x="42" y="72" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 3,500</text>
                    <text x="42" y="112" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 3,000</text>
                    <text x="42" y="152" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 2,500</text>
                    <text x="42" y="192" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 2,000</text>
                    <text x="42" y="232" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 1,500</text>
                    <text x="42" y="262" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 1,000</text>

                    {/* Horizontal gridlines */}
                    <line x1="52" y1="28" x2="1370" y2="28" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="52" y1="68" x2="1370" y2="68" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="52" y1="108" x2="1370" y2="108" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="52" y1="148" x2="1370" y2="148" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="52" y1="188" x2="1370" y2="188" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="52" y1="228" x2="1370" y2="228" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="52" y1="258" x2="1370" y2="258" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Bars: 140px wide, 85px gap between each */}
                    {/* 2020 — x=60 */}
                    <rect x="60" y="48" width="140" height="225" rx="12" fill="#f1f0ff" />
                    <rect x="60" y="218" width="140" height="55" rx="12" fill="#5e53fc" />
                    <text x="130" y="290" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">2020</text>

                    {/* 2021 — x=285 */}
                    <rect x="285" y="58" width="140" height="215" rx="12" fill="#f1f0ff" />
                    <rect x="285" y="208" width="140" height="65" rx="12" fill="#5e53fc" />
                    <text x="355" y="290" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">2021</text>

                    {/* 2022 — x=510 */}
                    <rect x="510" y="48" width="140" height="225" rx="12" fill="#f1f0ff" />
                    <rect x="510" y="188" width="140" height="85" rx="12" fill="#5e53fc" />
                    <text x="580" y="290" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">2022</text>

                    {/* 2023 — x=735 */}
                    <rect x="735" y="38" width="140" height="235" rx="12" fill="#f1f0ff" />
                    <rect x="735" y="198" width="140" height="75" rx="12" fill="#5e53fc" />
                    <text x="805" y="290" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">2023</text>

                    {/* 2024 — x=960 */}
                    <rect x="960" y="28" width="140" height="245" rx="12" fill="#f1f0ff" />
                    <rect x="960" y="208" width="140" height="65" rx="12" fill="#5e53fc" />
                    <text x="1030" y="290" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">2024</text>

                    {/* 2025 — x=1185 */}
                    <rect x="1185" y="18" width="140" height="255" rx="12" fill="#f1f0ff" />
                    <rect x="1185" y="188" width="140" height="85" rx="12" fill="#5e53fc" />
                    <text x="1255" y="290" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="600">2025</text>
                  </svg>
                </div>

                {/* Chart navigation arrows — circular */}
                <div className="flex justify-end gap-2 -mt-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-300 hover:text-slate-500 hover:bg-slate-50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>

              {/* Payslip List Table */}
              <div className="border border-slate-100 rounded-3xl overflow-hidden w-full bg-white flex flex-col">
                <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800">Payslip List</h4>
                  <div className="relative">
                    <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 bg-white flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                      Custom Range <HugeiconsIcon icon={ArrowDown01Icon} size={10} />
                    </button>
                  </div>
                </div>

                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                      <th className="px-6 py-4">Data</th>
                      <th className="px-6 py-4">Net</th>
                      <th className="px-6 py-4">Gross</th>
                      <th className="px-6 py-4">Contributions</th>
                      <th className="px-6 py-4">TFR</th>
                      <th className="px-6 py-4">Last Login</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                    {payslips.map((ps, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-all">
                        <td className="px-6 py-4 text-slate-800 font-bold">{ps.date}</td>
                        <td className="px-6 py-4 text-slate-800 font-extrabold">{ps.net}</td>
                        <td className="px-6 py-4">{ps.gross}</td>
                        <td className="px-6 py-4">{ps.contributions}</td>
                        <td className="px-6 py-4">{ps.tfr}</td>
                        <td className="px-6 py-4 text-slate-400 font-medium">{ps.login}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => alert(`Downloading payslip for ${ps.date}`)}
                            className="p-2 bg-indigo-50/60 hover:bg-indigo-100 text-[#5e53fc] rounded-xl transition-all inline-flex"
                          >
                            <DownloadIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer with pagination */}
                <div className="px-6 py-4 flex items-center justify-end gap-4 border-t border-slate-100 text-slate-400 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span>Items per page:</span>
                    <select className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 text-xs">
                      <option>5</option>
                      <option>10</option>
                    </select>
                  </div>
                  <span>1-5 of 10</span>
                  <div className="flex items-center gap-1">
                    {/* First page */}
                    <button className="p-1 border border-slate-100 rounded hover:bg-slate-50 disabled:opacity-40 transition-colors" disabled>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="11 18 5 12 11 6" /><line x1="19" y1="6" x2="19" y2="18" /></svg>
                    </button>
                    {/* Prev page */}
                    <button className="p-1 border border-slate-100 rounded hover:bg-slate-50 disabled:opacity-40 transition-colors" disabled>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    {/* Next page */}
                    <button className="p-1 border border-slate-100 rounded hover:bg-slate-50 transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                    {/* Last page */}
                    <button className="p-1 border border-slate-100 rounded hover:bg-slate-50 transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="13 6 19 12 13 18" /><line x1="5" y1="6" x2="5" y2="18" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVITY IN SALON */}
          {activeSubTab === "activity" && (
            <div className="flex flex-col gap-6 w-full text-left">
              {/* Metric grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-3xl p-5 bg-gradient-to-tr from-slate-50/40 to-slate-50 flex flex-col gap-1">
                  <span className="text-[#5e53fc] text-[9px] font-extrabold uppercase">Appointments Completed (Last 30 days)</span>
                  <span className="text-3xl font-black text-slate-800 mt-1">45</span>
                </div>
                <div className="border border-slate-100 rounded-3xl p-5 bg-gradient-to-tr from-slate-50/40 to-slate-50 flex flex-col gap-1">
                  <span className="text-teal-600 text-[9px] font-extrabold uppercase">Appointments Booked Now (Last 30 days)</span>
                  <span className="text-3xl font-black text-slate-800 mt-1">52</span>
                </div>
              </div>

              {/* Weekly Appointments Line Chart */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col gap-4">
                <h4 className="text-sm font-bold text-slate-800">Weekly Appointments</h4>

                {/* SVG Line Chart — full width, interactive */}
                <div className="w-full py-2">
                  <svg 
                    className="w-full h-[250px]" 
                    viewBox="0 0 1000 250" 
                    preserveAspectRatio="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    onMouseLeave={() => setHoveredPoint(null)}
                    onTouchMove={handleActivityTouch}
                    onTouchStart={handleActivityTouch}
                    style={{ touchAction: "none" }}
                  >
                    {/* Y-axis labels */}
                    <text x="30" y="22" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">140</text>
                    <text x="30" y="62" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">105</text>
                    <text x="30" y="102" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">70</text>
                    <text x="30" y="142" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">35</text>
                    <text x="30" y="182" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">0</text>

                    {/* Horizontal gridlines */}
                    <line x1="40" y1="18" x2="980" y2="18" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="58" x2="980" y2="58" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="98" x2="980" y2="98" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="138" x2="980" y2="138" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="178" x2="980" y2="178" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Green gradient fill */}
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Green area fill under curve */}
                    <path
                      d="M 40 128 C 80 120, 140 115, 250 118 C 320 120, 350 125, 390 102 C 430 80, 480 88, 530 92 C 580 96, 620 112, 670 108 C 720 104, 760 48, 810 32 C 860 16, 900 28, 950 38 L 950 178 L 40 178 Z"
                      fill="url(#greenGradient)"
                      opacity="0.12"
                    />

                    {/* Green smooth curve line */}
                    <path
                      d="M 40 128 C 80 120, 140 115, 250 118 C 320 120, 350 125, 390 102 C 430 80, 480 88, 530 92 C 580 96, 620 112, 670 108 C 720 104, 760 48, 810 32 C 860 16, 900 28, 950 38"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive data points — invisible hit areas + visible dots */}
                    {weeklyData.map((d, i) => (
                      <g key={`pt-${i}`}>
                        {/* Invisible hit area for hover/click */}
                        <rect
                          x={d.x - 50}
                          y="0"
                          width="100"
                          height="200"
                          fill="transparent"
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHoveredPoint(i)}
                          onClick={() => setHoveredPoint(i)}
                        />
                        {/* Visible dot */}
                        <circle
                          cx={d.x}
                          cy={d.y}
                          r={hoveredPoint === i ? 6 : 0}
                          fill="#10b981"
                          stroke="white"
                          strokeWidth="2.5"
                          style={{ transition: "r 0.15s ease" }}
                        />
                        {/* Vertical indicator line */}
                        {hoveredPoint === i && (
                          <line x1={d.x} y1={d.y + 8} x2={d.x} y2="178" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                        )}
                      </g>
                    ))}

                    {/* Tooltip Card (using transform translation) */}
                    {(() => {
                      if (hoveredPoint === null) return null;
                      const activePoint = weeklyData[hoveredPoint];
                      const tooltipX = activePoint.x - 65;
                      const tooltipY = activePoint.y - 45;
                      return (
                        <g 
                          style={{ 
                            transform: `translate(${tooltipX}px, ${tooltipY}px)`, 
                            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            pointerEvents: "none"
                          }}
                        >
                          <rect x="0" y="0" width="130" height="36" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.02))" />
                          <text x="65" y="14" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">{activePoint.day}</text>
                          <text x="65" y="27" textAnchor="middle" fontSize="10" fill="#10b981" fontWeight="extrabold">{activePoint.value} Appointments</text>
                        </g>
                      );
                    })()}

                    {/* Day labels */}
                    {weeklyData.map((d, i) => (
                      <text 
                        key={`dl-${i}`} 
                        x={d.x} 
                        y="198" 
                        textAnchor="middle" 
                        fontSize="11" 
                        fill={hoveredPoint === i ? "#10b981" : "#94a3b8"} 
                        fontWeight={hoveredPoint === i ? "700" : "600"}
                        style={{ transition: "fill 0.2s ease" }}
                      >
                        {d.day}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Top 3 Services */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col gap-4">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Top 3 Services</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 justify-between p-3.5 border border-slate-50 rounded-2xl bg-slate-50/20">
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-[#5e53fc] font-bold text-xs flex items-center justify-center">1</span>
                      <span className="text-xs font-bold text-slate-700">Cut and Fold</span>
                    </span>
                    <span className="text-xs font-extrabold text-[#5e53fc]">35 sales</span>
                  </div>
                  <div className="flex items-center gap-3 justify-between p-3.5 border border-slate-50 rounded-2xl bg-slate-50/20">
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-[#5e53fc] font-bold text-xs flex items-center justify-center">2</span>
                      <span className="text-xs font-bold text-slate-700">Shampoo Treatment</span>
                    </span>
                    <span className="text-xs font-extrabold text-[#5e53fc]">25 sales</span>
                  </div>
                  <div className="flex items-center gap-3 justify-between p-3.5 border border-slate-50 rounded-2xl bg-slate-50/20">
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-[#5e53fc] font-bold text-xs flex items-center justify-center">3</span>
                      <span className="text-xs font-bold text-slate-700">Hair Coloring</span>
                    </span>
                    <span className="text-xs font-extrabold text-[#5e53fc]">15 sales</span>
                  </div>
                </div>
              </div>

              {/* Recent Stamps */}
              <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white flex flex-col">
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Recents Stamps</h4>
                  <button className="px-3 py-1.5 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 bg-white flex items-center gap-1.5">
                    Custom Range <HugeiconsIcon icon={ArrowDown01Icon} size={10} />
                  </button>
                </div>
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                      <th className="px-6 py-4">Data</th>
                      <th className="px-6 py-4">Time-Range</th>
                      <th className="px-6 py-4">Total Time</th>
                      <th className="px-6 py-4">Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                    {stamps.map((st, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-all">
                        <td className="px-6 py-4 text-slate-800 font-bold">{st.date}</td>
                        <td className="px-6 py-4">{st.time}</td>
                        <td className="px-6 py-4 text-slate-800 font-extrabold">{st.total}</td>
                        <td className="px-6 py-4 text-slate-400 font-medium">{st.added}</td>
                      </tr>
                    ))}
                    {/* Total hours summary row */}
                    <tr className="bg-slate-50/20">
                      <td colSpan={2} className="px-6 py-4"></td>
                      <td colSpan={2} className="px-6 py-4 text-slate-800 font-black">
                        30h <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">Total of the hours</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Most Loyal Customers */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col gap-4">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Most Loyal Customers</h4>
                <div className="flex flex-col gap-3">
                  {loyalCustomers.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 justify-between p-3.5 border border-slate-50 rounded-2xl">
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-indigo-50 text-[#5e53fc] font-bold text-xs flex items-center justify-center">{idx + 1}</span>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-slate-800">{c.name}</span>
                          <span className="text-[9px] text-slate-400 font-semibold mt-0.5">Last Visit: {c.lastAppt}</span>
                        </div>
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-extrabold text-slate-800">{c.spent}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{c.appts} appts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Days Worked (Holidays & Other Data) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col text-left">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-5">Days Worked (Holidays)</h4>
                  <div className="flex flex-col gap-3.5 text-xs font-semibold">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Matured</span>
                      <span className="text-slate-850 font-bold">22 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Enjoyed</span>
                      <span className="text-slate-850 font-bold">8 days</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col text-left">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-5">Days Worked (Other Data)</h4>
                  <div className="flex flex-col gap-3.5 text-xs font-semibold">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Sick Days</span>
                      <span className="text-slate-850 font-bold">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Next Evaluation</span>
                      <span className="text-slate-850 font-bold">March 14, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTION */}
          {activeSubTab === "production" && (
            <div className="flex flex-col gap-6 w-full text-left">
              {/* Stacked bar chart: Daily production */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Daily Production (Monthly)</h4>
                  {/* Daily Production Period Selector */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsProdPeriodDropdownOpen(!isProdPeriodDropdownOpen)}
                      className="px-3 py-1.5 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 bg-white flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                    >
                      {productionPeriod} <HugeiconsIcon icon={ArrowDown01Icon} size={10} className={`transition-transform duration-200 ${isProdPeriodDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isProdPeriodDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsProdPeriodDropdownOpen(false)}></div>
                        <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-150 text-left text-xs font-semibold text-slate-600">
                          {["Monthly", "Yearly"].map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setProductionPeriod(option);
                                setIsProdPeriodDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2 text-left transition-colors ${productionPeriod === option ? "bg-indigo-50 text-indigo-600 font-bold" : "hover:bg-slate-50 hover:text-slate-800"}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full py-2">
                  <svg 
                    className="w-full h-[280px]" 
                    viewBox="0 0 1000 280" 
                    preserveAspectRatio="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseLeave={() => setHoveredBarMonth(null)}
                    onTouchStart={handleBarTouch}
                    onTouchMove={handleBarTouch}
                    style={{ touchAction: "none" }}
                  >
                    {/* Y-axis */}
                    <text x="32" y="30" textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="600">€ 3k</text>
                    <text x="32" y="80" textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="600">€ 2.5k</text>
                    <text x="32" y="130" textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="600">€ 2k</text>
                    <text x="32" y="180" textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="600">€ 1.5k</text>
                    <text x="32" y="230" textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="600">€ 1k</text>

                    {/* Gridlines */}
                    <line x1="42" y1="26" x2="980" y2="26" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="76" x2="980" y2="76" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="126" x2="980" y2="126" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="176" x2="980" y2="176" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="226" x2="980" y2="226" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Bar groups */}
                    {prodBarData.map((d, i) => {
                      const isActive = hoveredBarMonth === i;
                      const isAnyActive = hoveredBarMonth !== null;
                      const opacity = isActive ? 1 : (isAnyActive ? 0.3 : 1);

                      // Center axis is at y = 140
                      // Teal top bar grows upward (y decreases)
                      const tealY = 134 - d.tealH;
                      // Pink bottom bar grows downward (y increases)
                      const pinkY = 146;

                      return (
                        <g key={`bar-${i}`} style={{ opacity, transition: "opacity 0.2s ease" }}>
                          {/* Hit area */}
                          <rect 
                            x={d.cx - 60} 
                            y="0" 
                            width="120" 
                            height="260" 
                            fill="transparent" 
                            style={{ cursor: "pointer" }} 
                            onMouseEnter={() => setHoveredBarMonth(i)} 
                            onClick={() => setHoveredBarMonth(i)} 
                          />
                          {/* Teal top bar */}
                          {d.tealH > 0 && (
                            <rect 
                              x={d.cx - 12} 
                              y={tealY} 
                              width="24" 
                              height={d.tealH} 
                              rx="5" 
                              fill="#14b8a6" 
                              style={{ transition: "fill 0.2s ease" }}
                            />
                          )}
                          {/* Pink bottom bar */}
                          {d.pinkH > 0 && (
                            <rect 
                              x={d.cx - 12} 
                              y={pinkY} 
                              width="24" 
                              height={d.pinkH} 
                              rx="5" 
                              fill="#ff6289" 
                              style={{ transition: "fill 0.2s ease" }}
                            />
                          )}
                        </g>
                      );
                    })}

                    {/* Sliding Tooltip */}
                    {(() => {
                      if (hoveredBarMonth === null) return null;
                      const activeBar = prodBarData[hoveredBarMonth];
                      const tooltipX = activeBar.cx - 72;
                      const tooltipY = 15;
                      return (
                        <g
                          style={{
                            transform: `translate(${tooltipX}px, ${tooltipY}px)`,
                            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            pointerEvents: "none"
                          }}
                        >
                          <rect x="0" y="0" width="145" height="72" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))" />
                          <text x="10" y="18" fontSize="9" fill="#94a3b8" fontWeight="bold">{activeBar.date}</text>
                          <text x="10" y="33" fontSize="8" fill="#374151" fontWeight="650">Total Production</text>
                          <text x="135" y="33" textAnchor="end" fontSize="8" fill="#94a3b8" fontWeight="600">{activeBar.total}</text>
                          <text x="10" y="46" fontSize="8" fill="#14b8a6" fontWeight="650">Threshold</text>
                          <text x="135" y="46" textAnchor="end" fontSize="8" fill="#94a3b8" fontWeight="600">{activeBar.threshold}</text>
                          <text x="10" y="59" fontSize="8" fill="#ff6289" fontWeight="650">Above Threshold</text>
                          <text x="135" y="59" textAnchor="end" fontSize="8" fill="#94a3b8" fontWeight="600">{activeBar.above}</text>
                        </g>
                      );
                    })()}

                    {/* X-axis Month labels */}
                    {prodBarData.map((d, i) => (
                      <text 
                        key={`lbl-${i}`} 
                        x={d.cx} 
                        y="262" 
                        textAnchor="middle" 
                        fontSize="11" 
                        fill={hoveredBarMonth === i ? "#374151" : "#94a3b8"} 
                        fontWeight={hoveredBarMonth === i ? "700" : "600"}
                        style={{ transition: "fill 0.2s ease" }}
                      >
                        {d.month}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Production Details Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-100 rounded-3xl p-5 bg-gradient-to-tr from-slate-50/40 to-slate-50 flex flex-col gap-1.5">
                  <span className="text-[#5e53fc] text-[9px] font-extrabold uppercase">Monthly Turnover</span>
                  <span className="text-2xl font-black text-slate-800 mt-1">€ 8,500</span>
                </div>
                <div className="border border-slate-100 rounded-3xl p-5 bg-gradient-to-tr from-slate-50/40 to-slate-50 flex flex-col gap-1.5">
                  <span className="text-slate-500 text-[9px] font-extrabold uppercase">Target Threshold</span>
                  <span className="text-2xl font-black text-slate-800 mt-1">€ 6,400</span>
                </div>
                <div className="border border-slate-100 rounded-3xl p-5 bg-gradient-to-tr from-slate-50/40 to-slate-50 flex flex-col gap-2.5">
                  <span className="text-emerald-600 text-[9px] font-extrabold uppercase block">Performance</span>
                  <span className="text-2xl font-black text-slate-800">133%</span>
                  <span className="px-2.5 py-0.5 rounded text-[8px] bg-emerald-50 text-emerald-600 font-extrabold uppercase w-fit">
                    Cost Effective
                  </span>
                </div>
              </div>

              {/* Production Trends spline chart */}
              <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Production Trends (Yearly)</h4>
                  {/* Trends Period Selector */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsTrendsPeriodDropdownOpen(!isTrendsPeriodDropdownOpen)}
                      className="px-3 py-1.5 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 bg-white flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                    >
                      {trendsPeriod} <HugeiconsIcon icon={ArrowDown01Icon} size={10} className={`transition-transform duration-200 ${isTrendsPeriodDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isTrendsPeriodDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsTrendsPeriodDropdownOpen(false)}></div>
                        <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-150 text-left text-xs font-semibold text-slate-600">
                          {["Yearly", "Custom Range"].map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setTrendsPeriod(option);
                                setIsTrendsPeriodDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2 text-left transition-colors ${trendsPeriod === option ? "bg-indigo-50 text-indigo-600 font-bold" : "hover:bg-slate-50 hover:text-slate-800"}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full py-2">
                  <svg 
                    className="w-full h-[250px]" 
                    viewBox="0 0 1000 250" 
                    preserveAspectRatio="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    onMouseLeave={() => setHoveredTrendYear(null)}
                    onTouchStart={handleTrendTouch}
                    onTouchMove={handleTrendTouch}
                    style={{ touchAction: "none" }}
                  >
                    <defs>
                      <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="58%" stopColor="#10b981" />
                        <stop offset="66%" stopColor="#f43f5e" />
                        <stop offset="75%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>

                    {/* Y-axis labels */}
                    <text x="32" y="32" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 3.0k</text>
                    <text x="32" y="72" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 2.5k</text>
                    <text x="32" y="112" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 2.0k</text>
                    <text x="32" y="152" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 1.5k</text>
                    <text x="32" y="192" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 1.0k</text>
                    <text x="32" y="232" textAnchor="end" fontSize="11" fill="#94a3b8" fontWeight="600">€ 0.5k</text>

                    {/* Gridlines */}
                    <line x1="42" y1="28" x2="980" y2="28" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="68" x2="980" y2="68" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="108" x2="980" y2="108" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="148" x2="980" y2="148" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="188" x2="980" y2="188" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="42" y1="228" x2="980" y2="228" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Trend spline line */}
                    <path
                      d="M 100 68 C 170 65, 170 62, 240 62 C 310 62, 310 70, 380 70 C 450 70, 450 78, 520 78 C 590 78, 590 124, 660 124 C 730 124, 730 48, 800 48 C 870 48, 870 54, 940 54"
                      fill="none"
                      stroke="url(#trendGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Dots and hit areas */}
                    {trendPoints.map((p, i) => (
                      <g key={`trend-${i}`}>
                        {/* Hit area */}
                        <rect
                          x={p.x - 50}
                          y="0"
                          width="100"
                          height="240"
                          fill="transparent"
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHoveredTrendYear(i)}
                          onClick={() => setHoveredTrendYear(i)}
                        />
                        {/* Dot */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={hoveredTrendYear === i ? 6 : 4}
                          fill={p.color}
                          stroke="white"
                          strokeWidth="2"
                          style={{ transition: "r 0.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        />
                      </g>
                    ))}

                    {/* Sliding Tooltip */}
                    {(() => {
                      if (hoveredTrendYear === null) return null;
                      const activeTrend = trendPoints[hoveredTrendYear];
                      const tooltipX = activeTrend.x - 75;
                      const tooltipY = activeTrend.y - 45;
                      return (
                        <g
                          style={{
                            transform: `translate(${tooltipX}px, ${tooltipY}px)`,
                            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            pointerEvents: "none"
                          }}
                        >
                          <rect x="0" y="0" width="150" height="32" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.02))" />
                          <text x="75" y="12" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="bold">August 24, {activeTrend.year}</text>
                          <text x="8" y="24" textAnchor="start" fontSize="8" fill={activeTrend.color} fontWeight="bold">{activeTrend.status}</text>
                          <text x="142" y="24" textAnchor="end" fontSize="9" fill="#374151" fontWeight="extrabold">{activeTrend.value}</text>
                        </g>
                      );
                    })()}

                    {/* X-axis labels */}
                    {trendPoints.map((p, i) => (
                      <text 
                        key={`xl-${i}`} 
                        x={p.x} 
                        y="245" 
                        textAnchor="middle" 
                        fontSize="11" 
                        fill={hoveredTrendYear === i ? "#374151" : "#94a3b8"} 
                        fontWeight={hoveredTrendYear === i ? "700" : "600"}
                        style={{ transition: "fill 0.2s ease" }}
                      >
                        {p.year}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Performance Metrics & Operation Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col text-left">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Performance Metrics</h4>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsPerfMetricDropdownOpen(!isPerfMetricDropdownOpen)}
                        className="px-3 py-1.5 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 bg-white flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                      >
                        {perfSelectedMonth}, {perfSelectedYear} <HugeiconsIcon icon={ArrowDown01Icon} size={10} className={`transition-transform duration-200 ${isPerfMetricDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isPerfMetricDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsPerfMetricDropdownOpen(false)}></div>
                          <div className="absolute right-0 mt-1.5 w-[280px] bg-white border border-slate-100 rounded-2xl shadow-xl p-3 z-20 animate-in fade-in slide-in-from-top-2 duration-150 flex gap-3">
                            {/* Left Pane: Month / Year menu selectors */}
                            <div className="flex flex-col gap-1 border-r border-slate-100 pr-3 w-[80px]">
                              <button
                                type="button"
                                onClick={() => setPerfDropdownSubMenu("month")}
                                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left transition-colors ${perfDropdownSubMenu === "month" ? "bg-indigo-50 text-[#5e53fc]" : "text-slate-400 hover:bg-slate-50"}`}
                              >
                                Month
                              </button>
                              <button
                                type="button"
                                onClick={() => setPerfDropdownSubMenu("year")}
                                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left transition-colors ${perfDropdownSubMenu === "year" ? "bg-indigo-50 text-[#5e53fc]" : "text-slate-400 hover:bg-slate-50"}`}
                              >
                                Year
                              </button>
                            </div>

                            {/* Right Pane */}
                            <div className="flex-1">
                              {perfDropdownSubMenu === "month" && (
                                <div className="flex flex-col gap-2">
                                  {/* Year navigation row */}
                                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                                    <button 
                                      type="button" 
                                      onClick={() => setPerfSelectedYear(prev => prev - 1)}
                                      className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-650"
                                    >
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
                                    </button>
                                    <span className="text-[10px] font-bold text-slate-705">{perfSelectedYear}</span>
                                    <button 
                                      type="button" 
                                      onClick={() => setPerfSelectedYear(prev => prev + 1)}
                                      className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-650"
                                    >
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6" /></svg>
                                    </button>
                                  </div>
                                  {/* Month Grid */}
                                  <div className="grid grid-cols-3 gap-1.5 max-h-[120px] overflow-y-auto pr-0.5">
                                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => {
                                      const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                      const fullMonthName = fullMonths[idx];
                                      return (
                                        <button
                                          key={m}
                                          type="button"
                                          onClick={() => {
                                            setPerfSelectedMonth(fullMonthName);
                                            setIsPerfMetricDropdownOpen(false);
                                          }}
                                          className={`py-1 rounded text-[10px] font-semibold transition-colors ${perfSelectedMonth === fullMonthName ? "bg-[#5e53fc] text-white" : "hover:bg-slate-50 text-slate-600"}`}
                                        >
                                          {m}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {perfDropdownSubMenu === "year" && (
                                <div className="flex flex-col gap-1 max-h-[140px] overflow-y-auto pr-0.5 text-left">
                                  {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y) => (
                                    <button
                                      key={y}
                                      type="button"
                                      onClick={() => {
                                        setPerfSelectedYear(y);
                                        setPerfDropdownSubMenu("month");
                                      }}
                                      className={`w-full px-2.5 py-1.5 rounded text-[10px] font-semibold text-left transition-colors ${perfSelectedYear === y ? "bg-indigo-50 text-[#5e53fc] font-bold" : "hover:bg-slate-50 text-slate-600"}`}
                                    >
                                      {y}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 text-xs font-semibold">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Target Threshold</span>
                      <span className="text-slate-850 font-bold">€ 1,700</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Monthly Salary</span>
                      <span className="text-slate-850 font-bold">€ 3,200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Threshold Calculation (20%)</span>
                      <span className="text-slate-850 font-bold">€ 1,700</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <span className="text-slate-500">Performance Status</span>
                      <span className="px-2.5 py-0.5 rounded text-[9px] bg-emerald-50 text-emerald-600 font-extrabold uppercase">
                        Cost Effective
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-3xl p-6 bg-white flex flex-col text-left">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Operation Statics</h4>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsOpsPeriodDropdownOpen(!isOpsPeriodDropdownOpen)}
                        className="px-3 py-1.5 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 bg-white flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                      >
                        {opsPeriod} <HugeiconsIcon icon={ArrowDown01Icon} size={10} className={`transition-transform duration-200 ${isOpsPeriodDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpsPeriodDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsOpsPeriodDropdownOpen(false)}></div>
                          <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-150 text-left text-xs font-semibold text-slate-600">
                            {["Last Month", "Last Year", "Custom Range"].map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setOpsPeriod(option);
                                  setIsOpsPeriodDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 text-left transition-colors ${opsPeriod === option ? "bg-indigo-50 text-indigo-600 font-bold" : "hover:bg-slate-50 hover:text-slate-800"}`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 text-xs font-semibold">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Completed Appointments</span>
                      <span className="text-slate-850 font-bold">38</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Revenue Appointment</span>
                      <span className="text-slate-850 font-bold">€ 223.68</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Working Days</span>
                      <span className="text-slate-850 font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <span className="text-slate-500">Performance Status</span>
                      <span className="text-slate-850 font-extrabold">€ 2,833.33</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Additional Data Modal */}
      {isEditAdditionalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[540px] shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="px-7 pt-7 pb-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Additional Data</h3>
              <button
                type="button"
                onClick={() => setIsEditAdditionalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            {/* Scrollable Form body */}
            <form onSubmit={handleSaveAdditional} className="flex-1 overflow-y-auto px-7 pb-7 max-h-[75vh] flex flex-col gap-6 text-left">

              {/* Certifications Card */}
              <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-700">Certifications</span>
                {certifications.map((c, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-500">Certification Name</label>
                      <button
                        type="button"
                        onClick={() => setCertifications(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-600 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCertifications(prev => prev.map((item, i) => i === idx ? val : item));
                      }}
                      className="w-full border-b border-slate-200 focus:border-[#5e53fc] focus:outline-none pb-2 text-sm text-slate-700 bg-transparent"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCert}
                  className="self-start px-4 py-2 border border-[#5e53fc] text-[#5e53fc] rounded-lg text-xs font-semibold hover:bg-[#f2f1ff] transition-all mt-1"
                >
                  Add New Certification
                </button>
              </div>

              {/* Completed Courses Card */}
              <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-700">Completed Courses</span>
                {courses.map((c, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-500">Course Name</label>
                      <button
                        type="button"
                        onClick={() => setCourses(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-600 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCourses(prev => prev.map((item, i) => i === idx ? val : item));
                      }}
                      className="w-full border-b border-slate-200 focus:border-[#5e53fc] focus:outline-none pb-2 text-sm text-slate-700 bg-transparent"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="self-start px-4 py-2 border border-[#5e53fc] text-[#5e53fc] rounded-lg text-xs font-semibold hover:bg-[#f2f1ff] transition-all mt-1"
                >
                  Add New Course
                </button>
              </div>

              {/* Languages Section */}
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-700">Languages</span>
                {languages.map((l, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-500">Language *</label>
                      <div className="relative">
                        <select
                          value={l.lang}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLanguages(prev => prev.map((item, i) => i === idx ? { ...item, lang: val } : item));
                          }}
                          className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white appearance-none cursor-pointer"
                        >
                          <option>Italian</option>
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Portuguese</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-500">Level *</label>
                      <div className="relative">
                        <select
                          value={l.level}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLanguages(prev => prev.map((item, i) => i === idx ? { ...item, level: val } : item));
                          }}
                          className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white appearance-none cursor-pointer"
                        >
                          <option>Native</option>
                          <option>Advanced</option>
                          <option>Intermediate</option>
                          <option>Beginner</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="self-start px-4 py-2 border border-[#5e53fc] text-[#5e53fc] rounded-lg text-xs font-semibold hover:bg-[#f2f1ff] transition-all mt-1"
                >
                  Add Language
                </button>
              </div>

              {/* Direct Manager Section */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5">
                <span className="text-sm font-semibold text-slate-700">Direct Manager</span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">User *</label>
                  <div className="relative">
                    <select
                      value={manager}
                      onChange={(e) => setManager(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select user</option>
                      <option>Maria Rodriguez</option>
                      <option>Dr. Marco Rossi</option>
                      <option>Roberto Marini</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Save button */}
              <div className="flex justify-end mt-2 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-100"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Previous Thinking Modal */}
      {isPreviousThinkingOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 pt-8 pb-5 border-b border-slate-100 flex flex-col relative text-left">
              <button type="button" onClick={() => setIsPreviousThinkingOpen(false)} className="absolute right-6 top-6 p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
              <h3 className="text-lg font-bold text-slate-800">Previous Thinking</h3>
            </div>
            <form onSubmit={handleSaveThinking} className="flex-1 overflow-y-auto px-8 py-6 max-h-[70vh] flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5e53fc] block mb-1">Thoughts & Decisions</span>
                <textarea
                  value={previousThinking}
                  onChange={(e) => setPreviousThinking(e.target.value)}
                  placeholder="Record previous design decisions, notes, or rationale..."
                  className="w-full h-48 border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl p-2.5 text-xs text-slate-700"
                />
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
                <button type="submit" className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100">Save Thoughts</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Terminate Contract Modal */}
      {isTerminateModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[480px] shadow-2xl p-8 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200 text-left">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">Terminate Contract</h3>
              <p className="text-sm text-[#475569] font-normal mt-1.5">Are you sure you want to termnate this contract?</p>
            </div>

            {/* Form fields */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Contract terminated! End Date: ${terminateEndDate}, Access Date: ${terminateAccessDate}`);
                setIsTerminateModalOpen(false);
              }}
              className="flex flex-col gap-5 text-sm"
            >
              {/* End Date */}
              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-semibold text-sm">End Date *</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="Enter end date"
                    onFocus={(e) => {
                      e.target.type = "date";
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        e.target.type = "text";
                      }
                    }}
                    value={terminateEndDate}
                    onChange={(e) => setTerminateEndDate(e.target.value)}
                    className="w-full h-11 border border-slate-200 rounded-lg px-4 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5e53fc]"
                  />
                  <div className="absolute right-4 pointer-events-none text-slate-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Reason for termination */}
              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-semibold text-sm">Reason for termination</label>
                <textarea
                  placeholder="Enter reason for termination"
                  value={terminateReason}
                  onChange={(e) => setTerminateReason(e.target.value)}
                  className="w-full min-h-[90px] border border-slate-200 rounded-lg p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5e53fc] resize-none"
                />
              </div>

              {/* Platform access date */}
              <div className="flex flex-col gap-2">
                <label className="text-[#334155] font-semibold text-sm">Platform access date</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Enter platform access date"
                    onFocus={(e) => {
                      e.target.type = "date";
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        e.target.type = "text";
                      }
                    }}
                    value={terminateAccessDate}
                    onChange={(e) => setTerminateAccessDate(e.target.value)}
                    className="w-full h-11 border border-slate-200 rounded-lg px-4 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5e53fc]"
                  />
                  <div className="absolute right-4 pointer-events-none text-slate-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsTerminateModalOpen(false)}
                  className="px-6 py-2.5 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#475569] hover:text-[#1e293b] rounded-lg text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#fff1f2] hover:bg-[#ffe4e6] text-[#ff4e73] rounded-lg text-sm font-semibold transition-all"
                >
                  Terminate Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
