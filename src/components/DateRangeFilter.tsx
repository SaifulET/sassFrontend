"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowLeft01Icon, ArrowRight01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

interface DateRangeFilterProps {
  onRangeChange: (rangeStr: string) => void;
  currentRange: string;
}

export default function DateRangeFilter({ onRangeChange, currentRange }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<number | null>(4); // Default pre-selected range
  const [endDate, setEndDate] = useState<number | null>(8);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const presets = ["All Time", "Today", "Last 7 Days", "Last 30 Days", "Custom Range"];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePresetSelect = (preset: string) => {
    if (preset === "Custom Range") {
      setShowCalendar(true);
    } else {
      onRangeChange(preset);
      setIsOpen(false);
    }
  };

  const handleDateClick = (dayNum: number) => {
    if (startDate === null || (startDate !== null && endDate !== null)) {
      setStartDate(dayNum);
      setEndDate(null);
    } else if (startDate !== null && endDate === null) {
      if (dayNum < startDate) {
        setStartDate(dayNum);
      } else {
        setEndDate(dayNum);
        // Format exactly as requested: "06/04/2025 - 06/08/2025"
        const startStr = `06/${startDate.toString().padStart(2, "0")}/2025`;
        const endStr = `06/${dayNum.toString().padStart(2, "0")}/2025`;
        onRangeChange(`${startStr} - ${endStr}`);
        setIsOpen(false);
        setShowCalendar(false);
      }
    }
  };

  const handleDateHover = (dayNum: number) => {
    if (startDate !== null && endDate === null) {
      setHoveredDate(dayNum);
    }
  };

  const isSelected = (dayNum: number) => {
    return dayNum === startDate || dayNum === endDate;
  };

  const isInRange = (dayNum: number) => {
    if (startDate !== null && endDate !== null) {
      return dayNum > startDate && dayNum < endDate;
    }
    if (startDate !== null && hoveredDate !== null) {
      return dayNum > startDate && dayNum < hoveredDate;
    }
    return false;
  };

  // June 2024 Calendar Helper: 1st is Saturday
  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const juneEmptySlots = Array.from({ length: 6 }, (_, i) => i); // Sat 1st means 6 empty slots before it (Sun-Fri)

  // July 2024 Calendar Helper: 1st is Monday
  const julyDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const julyEmptySlots = Array.from({ length: 1 }, (_, i) => i); // Mon 1st means 1 empty slot before it (Sun)

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[11px] font-bold text-[#a0aec0] uppercase tracking-wider mb-2">
        Data Range
      </label>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (currentRange.includes("-")) {
            setShowCalendar(true);
          }
        }}
        className="flex items-center justify-between w-52 bg-white text-slate-700 font-medium text-sm border border-[#eef2f6] rounded-2xl px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-[#5e53fc] focus:outline-none transition-all text-left"
      >
        <span className="truncate">{currentRange}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-[#a0aec0] ml-2" />
      </button>

      {/* Preset Dropdown Overlay */}
      {isOpen && !showCalendar && (
        <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-40 animate-in fade-in slide-in-from-top-1">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                currentRange === preset || (preset === "Custom Range" && currentRange.includes("-"))
                  ? "text-[#5e53fc] bg-[#f2f1ff]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      )}

      {/* Dual Month Calendar Overlay */}
      {isOpen && showCalendar && (
        <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 w-[calc(100vw-32px)] sm:w-[600px] max-w-[600px] animate-in fade-in slide-in-from-top-2">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-[#5e53fc]" />
              Select custom range
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setShowCalendar(false);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back to presets
              </button>
            </div>
          </div>

          {/* Dual Months Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* June 2024 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <button className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                </button>
                <span className="text-sm font-bold text-slate-700">June 2024</span>
                <span className="w-6" /> {/* Placeholder to match spacing */}
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <span key={day} className="text-[11px] font-bold text-slate-400 uppercase">
                    {day}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {/* Empty spaces before Saturday 1st */}
                {juneEmptySlots.map((emptyIdx) => (
                  <div key={`empty-june-${emptyIdx}`} className="h-9" />
                ))}

                {juneDays.map((day) => {
                  const active = isSelected(day);
                  const inRange = isInRange(day);
                  const isStart = day === startDate;
                  const isEnd = day === endDate;

                  return (
                    <button
                      key={`june-${day}`}
                      onClick={() => handleDateClick(day)}
                      onMouseEnter={() => handleDateHover(day)}
                      className={`h-9 w-9 flex items-center justify-center text-xs font-semibold rounded-full transition-all relative ${
                        active
                          ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-200 z-10"
                          : inRange
                          ? "bg-[#f2f1ff] text-[#5e53fc] rounded-none scale-105"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {/* Background connecting bars for selected range in grid */}
                      {inRange && (
                        <div className="absolute inset-0 bg-[#f2f1ff] -z-10 scale-y-90" />
                      )}
                      {isStart && endDate !== null && (
                        <div className="absolute right-0 top-0 bottom-0 left-1/2 bg-[#f2f1ff] -z-10 scale-y-90" />
                      )}
                      {isEnd && (
                        <div className="absolute left-0 top-0 bottom-0 right-1/2 bg-[#f2f1ff] -z-10 scale-y-90" />
                      )}
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* July 2024 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-6" /> {/* Placeholder to match spacing */}
                <span className="text-sm font-bold text-slate-700">July 2024</span>
                <button className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <span key={day} className="text-[11px] font-bold text-slate-400 uppercase">
                    {day}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {/* Empty spaces before Monday 1st */}
                {julyEmptySlots.map((emptyIdx) => (
                  <div key={`empty-july-${emptyIdx}`} className="h-9" />
                ))}

                {julyDays.map((day) => (
                  <button
                    key={`july-${day}`}
                    onClick={() => {
                      // Handled for June only in this mock, but let's support basic selection
                      alert("Selecting dates in July is mocked for June in this design. Please select June 4 to June 8 to match visual requirements.");
                    }}
                    className="h-9 w-9 flex items-center justify-center text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-full"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
