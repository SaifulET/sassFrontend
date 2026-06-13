"use client";

import React, { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ClockIcon,
  FilterIcon,
  ArrowRight01Icon,
  ArrowLeft01Icon
} from "@hugeicons/core-free-icons";
import DateRangeFilter from "./DateRangeFilter";

interface RecentActivityPageProps {
  currentRange: string;
  onRangeChange: (rangeStr: string) => void;
}

interface ActivityDetail {
  id: string;
  salonName: string;
  salonTag: string; // "SRL" | "SPA" | "Ind."
  hasCrown?: boolean;
  hasStar?: boolean;
  contactName: string;
  city: string;
  email: string;
  activityType: string;
  activityLabel: string; // "Subscribed Premium" | "Monthly Payment" | "2 new staff" | "Upgraded Plan" | "Modern Cuts"
  activityColor: "purple" | "teal" | "blue" | "yellow" | "gray";
  price: string;
  timeAgo: string;
  dateKey: string; // for mock date range filtering
}

export default function RecentActivityPage({ currentRange, onRangeChange }: RecentActivityPageProps) {
  const [selectedSalon, setSelectedSalon] = useState("All Salons");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [isSalonDropdownOpen, setIsSalonDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // Full mock database of activities
  const mockActivities: ActivityDetail[] = useMemo(() => [
    {
      id: "detail-1",
      salonName: "Beauty Wellness Center",
      salonTag: "SRL",
      contactName: "Roberto Marini",
      city: "Bologna",
      email: "roberto@beautywellness.com",
      activityType: "Subscribed Premium",
      activityLabel: "Subscribed Premium",
      activityColor: "purple",
      price: "€ 299",
      timeAgo: "30 min ago",
      dateKey: "Today"
    },
    {
      id: "detail-2",
      salonName: "Bella Vista Salon",
      salonTag: "SRL",
      hasCrown: true,
      contactName: "Maria Rodriguez",
      city: "Milano",
      email: "maria@bellavista.com",
      activityType: "Monthly Payment",
      activityLabel: "Monthly Payment",
      activityColor: "teal",
      price: "€ 299",
      timeAgo: "2h ago",
      dateKey: "Today"
    },
    {
      id: "detail-3",
      salonName: "Elite Beauty Group S.p.A.",
      salonTag: "SPA",
      hasStar: true,
      contactName: "Dr. Marco Rossi",
      city: "Milano",
      email: "marco.rossi@elitebeauty.com",
      activityType: "New staff",
      activityLabel: "2 new staff",
      activityColor: "blue",
      price: "-",
      timeAgo: "2h ago",
      dateKey: "Today"
    },
    {
      id: "detail-4",
      salonName: "Glamour Lounge SRL",
      salonTag: "SRL",
      contactName: "Anna Bianchi",
      city: "Torino",
      email: "anna@glamourlounge.com",
      activityType: "Upgraded Plan",
      activityLabel: "Upgraded Plan",
      activityColor: "yellow",
      price: "€ 299",
      timeAgo: "3h ago",
      dateKey: "Today"
    },
    {
      id: "detail-5",
      salonName: "Hair Art Studio",
      salonTag: "Ind.",
      contactName: "Francesca Neri",
      city: "Roma",
      email: "francesca@hairartstudio.com",
      activityType: "Modern Cuts",
      activityLabel: "Modern Cuts",
      activityColor: "gray",
      price: "-",
      timeAgo: "5h ago",
      dateKey: "Today"
    },
    {
      id: "detail-6",
      salonName: "Beauty Wellness Center",
      salonTag: "SRL",
      contactName: "Roberto Marini",
      city: "Bologna",
      email: "roberto@beautywellness.com",
      activityType: "Monthly Payment",
      activityLabel: "Monthly Payment",
      activityColor: "teal",
      price: "€ 299",
      timeAgo: "1 day ago",
      dateKey: "Last 7 Days"
    },
    {
      id: "detail-7",
      salonName: "Bella Vista Salon",
      salonTag: "SRL",
      hasCrown: true,
      contactName: "Maria Rodriguez",
      city: "Milano",
      email: "maria@bellavista.com",
      activityType: "Upgraded Plan",
      activityLabel: "Upgraded Plan",
      activityColor: "yellow",
      price: "€ 299",
      timeAgo: "2 days ago",
      dateKey: "Last 7 Days"
    },
    {
      id: "detail-8",
      salonName: "Glamour Lounge SRL",
      salonTag: "SRL",
      contactName: "Anna Bianchi",
      city: "Torino",
      email: "anna@glamourlounge.com",
      activityType: "Subscribed Premium",
      activityLabel: "Subscribed Premium",
      activityColor: "purple",
      price: "€ 299",
      timeAgo: "3 days ago",
      dateKey: "Last 7 Days"
    },
    {
      id: "detail-9",
      salonName: "Elite Beauty Group S.p.A.",
      salonTag: "SPA",
      hasStar: true,
      contactName: "Dr. Marco Rossi",
      city: "Milano",
      email: "marco.rossi@elitebeauty.com",
      activityType: "Monthly Payment",
      activityLabel: "Monthly Payment",
      activityColor: "teal",
      price: "€ 299",
      timeAgo: "4 days ago",
      dateKey: "Last 7 Days"
    },
    {
      id: "detail-10",
      salonName: "Hair Art Studio",
      salonTag: "Ind.",
      contactName: "Francesca Neri",
      city: "Roma",
      email: "francesca@hairartstudio.com",
      activityType: "New staff",
      activityLabel: "2 new staff",
      activityColor: "blue",
      price: "-",
      timeAgo: "5 days ago",
      dateKey: "Last 7 Days"
    }
  ], []);

  // Dropdown list options
  const salons = ["All Salons", "Beauty Wellness Center", "Bella Vista Salon", "Elite Beauty Group S.p.A.", "Glamour Lounge SRL", "Hair Art Studio"];
  const activityTypes = ["All Types", "Subscribed Premium", "Monthly Payment", "New staff", "Upgraded Plan", "Modern Cuts"];

  // Filter Logic
  const filteredActivities = useMemo(() => {
    return mockActivities.filter((item) => {
      // 1. Salon Filter
      if (selectedSalon !== "All Salons") {
        if (selectedSalon === "Elite Beauty Group S.p.A." && item.salonName !== "Elite Beauty Group S.p.A.") return false;
        if (selectedSalon === "Glamour Lounge SRL" && item.salonName !== "Glamour Lounge SRL") return false;
        if (item.salonName !== selectedSalon && !item.salonName.startsWith(selectedSalon)) return false;
      }
      // 2. Type Filter
      if (selectedType !== "All Types" && item.activityType !== selectedType) {
        return false;
      }
      // 3. Date Range Filter (mock representation)
      if (currentRange === "Today" && item.dateKey !== "Today") return false;
      if (currentRange === "Last 7 Days" && item.dateKey !== "Today" && item.dateKey !== "Last 7 Days") return false;
      return true;
    });
  }, [mockActivities, selectedSalon, selectedType, currentRange]);

  // Paginated activities
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage) || 1;
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredActivities, currentPage, itemsPerPage]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedActivities.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const getBadgeColorClasses = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-indigo-50 text-[#5e53fc]";
      case "teal":
        return "bg-[#e6fcf9] text-[#10b981]";
      case "blue":
        return "bg-blue-50 text-blue-600";
      case "yellow":
        return "bg-amber-50 text-amber-600 font-bold bg-[#fffbeb]";
      case "gray":
        return "bg-slate-50 text-slate-500";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Title & Breadcrumbs Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Recent Activity</h1>
        </div>

        {/* Breadcrumbs matching screenshot */}
        <div className="flex items-center gap-2 text-xs font-semibold select-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[#a0aec0]">/</span>
          <span className="bg-[#f2f1ff] text-[#5e53fc] px-2.5 py-1 rounded-lg">Recent Activity</span>
        </div>
      </div>

      {/* Filter controls row */}
      <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col md:flex-row items-start md:items-center gap-6 z-20 relative">
        {/* Salons Select Dropdown */}
        <div className="relative w-full md:w-52">
          <label className="block text-[11px] font-bold text-[#a0aec0] uppercase tracking-wider mb-2">
            Salons
          </label>
          <button
            onClick={() => {
              setIsSalonDropdownOpen(!isSalonDropdownOpen);
              setIsTypeDropdownOpen(false);
            }}
            className="flex items-center justify-between w-full bg-white text-slate-700 font-medium text-sm border border-[#eef2f6] rounded-2xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-[#5e53fc] focus:outline-none transition-all text-left"
          >
            <span className="truncate">{selectedSalon.replace(" S.p.A.", "").replace(" SRL", "")}</span>
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-[#a0aec0] ml-2" />
          </button>
          {isSalonDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1">
              {salons.map((salon) => (
                <button
                  key={salon}
                  onClick={() => {
                    setSelectedSalon(salon);
                    setIsSalonDropdownOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                    selectedSalon === salon
                      ? "text-[#5e53fc] bg-[#f2f1ff]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {salon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Filter Picker */}
        <DateRangeFilter currentRange={currentRange} onRangeChange={(range) => {
          onRangeChange(range);
          setCurrentPage(1);
        }} />

        {/* Type Select Dropdown */}
        <div className="relative w-full md:w-52">
          <label className="block text-[11px] font-bold text-[#a0aec0] uppercase tracking-wider mb-2">
            Type
          </label>
          <button
            onClick={() => {
              setIsTypeDropdownOpen(!isTypeDropdownOpen);
              setIsSalonDropdownOpen(false);
            }}
            className="flex items-center justify-between w-full bg-white text-slate-700 font-medium text-sm border border-[#eef2f6] rounded-2xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-[#5e53fc] focus:outline-none transition-all text-left"
          >
            <span className="truncate">{selectedType}</span>
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-[#a0aec0] ml-2" />
          </button>
          {isTypeDropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in slide-in-from-top-1">
              {activityTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setIsTypeDropdownOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                    selectedType === type
                      ? "text-[#5e53fc] bg-[#f2f1ff]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Indicator */}
        {(selectedSalon !== "All Salons" || selectedType !== "All Types" || currentRange !== "All Time") && (
          <button
            onClick={() => {
              setSelectedSalon("All Salons");
              setSelectedType("All Types");
              onRangeChange("All Time");
              setCurrentPage(1);
            }}
            className="mt-6 text-xs font-semibold text-red-500 hover:underline flex items-center gap-1.5"
          >
            <HugeiconsIcon icon={FilterIcon} size={14} />
            Reset Filters
          </button>
        )}
      </div>

      {/* Full recent activity data table */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden flex flex-col justify-between z-10">
        {/* Table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#eef2f6] bg-slate-50/50">
                <th className="p-5 w-14">
                  <input
                    type="checkbox"
                    checked={
                      paginatedActivities.length > 0 &&
                      paginatedActivities.every((item) => selectedRows.includes(item.id))
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-[#5e53fc] focus:ring-[#5e53fc] cursor-pointer"
                  />
                </th>
                <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wide">Salon</th>
                <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wide">Activity</th>
                <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wide">Price</th>
                <th className="p-5 text-sm font-bold text-slate-500 uppercase tracking-wide">Update</th>
              </tr>
            </thead>
            <tbody>
              {paginatedActivities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-sm font-medium text-slate-400">
                    No activities matching selected filters.
                  </td>
                </tr>
              ) : (
                paginatedActivities.map((row) => {
                  const rowSelected = selectedRows.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-[#eef2f6] hover:bg-slate-50/50 transition-colors ${
                        rowSelected ? "bg-indigo-50/10" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-5">
                        <input
                          type="checkbox"
                          checked={rowSelected}
                          onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#5e53fc] focus:ring-[#5e53fc] cursor-pointer"
                        />
                      </td>

                      {/* Salon Information column */}
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          {/* Circular Logo Image Placeholder */}
                          <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center bg-gradient-to-tr from-[#ff4e50] to-[#f9d423]">
                            <span className="text-white font-bold text-sm">
                              {row.salonName.slice(0, 1)}
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-800 leading-tight">
                                {row.salonName}
                              </span>

                              {/* Crown Badge */}
                              {row.hasCrown && (
                                <span className="text-amber-500 select-none text-xs" title="Featured Crown">
                                  👑
                                </span>
                              )}

                              {/* Star Badge */}
                              {row.hasStar && (
                                <span className="text-indigo-400 select-none text-xs" title="Special Partner">
                                  ⭐
                                </span>
                              )}

                              {/* Tag Label */}
                              <span className="text-[9px] font-extrabold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                {row.salonTag}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 font-medium mt-1">
                              {row.contactName} • {row.city}
                            </span>
                            <span className="text-xs text-slate-400 font-medium leading-none mt-0.5">
                              {row.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Activity column */}
                      <td className="p-5">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl ${getBadgeColorClasses(
                            row.activityColor
                          )}`}
                        >
                          {row.activityLabel}
                        </span>
                      </td>

                      {/* Price column */}
                      <td className="p-5">
                        <span className="text-sm font-bold text-slate-700">{row.price}</span>
                      </td>

                      {/* Update timestamp column */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <HugeiconsIcon icon={ClockIcon} size={14} className="text-slate-300" />
                          <span>{row.timeAgo}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination row */}
        <div className="p-5 border-t border-[#eef2f6] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
          {/* Items per page Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#a0aec0] font-bold">Items per page:</span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-white border border-[#eef2f6] rounded-xl pl-3 pr-8 py-1.5 text-xs font-bold text-slate-600 focus:outline-none focus:border-[#5e53fc] cursor-pointer shadow-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Current Page indices & Navigation */}
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-500">
              {filteredActivities.length === 0
                ? "0-0 of 0"
                : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                    currentPage * itemsPerPage,
                    filteredActivities.length
                  )} of ${filteredActivities.length}`}
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 rounded-xl transition-all"
              >
                &lt;&lt;
              </button>
              {/* Prev Page */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 rounded-xl transition-all"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
              </button>
              {/* Next Page */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 rounded-xl transition-all"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </button>
              {/* Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 rounded-xl transition-all"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
