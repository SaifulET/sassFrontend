"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  BellIcon,
  Menu01Icon,
  UserIcon,
  Settings01Icon
} from "@hugeicons/core-free-icons";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSalonId: string | null;
  toggleSidebar: () => void;
}

export default function Header({ activeTab, setActiveTab, selectedSalonId, toggleSidebar }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 right-0 left-0 h-20 bg-white border-b border-[#eef2f6] flex items-center justify-between px-6 md:px-8 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-300 ${
      selectedSalonId !== null ? "lg:left-0" : "lg:left-64"
    }`}>
      {/* Brand/Logo & Search Wrapper */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Mobile Hamburger Burger */}
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 lg:hidden transition-colors"
        >
          <HugeiconsIcon icon={Menu01Icon} size={22} />
        </button>

        {/* Brand/Logo Header - Desktop */}
        {selectedSalonId !== null && (
          <div className="hidden lg:flex items-center gap-2.5 mr-6 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5e53fc] to-[#8075ff] flex items-center justify-center shadow-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2c3a50]">
              MatDash
            </span>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative w-full hidden md:block max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HugeiconsIcon icon={Search01Icon} size={18} className="text-[#a0aec0]" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#f8fafc] text-slate-700 placeholder-[#a0aec0] text-sm rounded-2xl pl-11 pr-4 py-2.5 border border-transparent focus:bg-white focus:border-[#5e53fc] focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Search for mobile */}
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 md:hidden transition-colors">
          <HugeiconsIcon icon={Search01Icon} size={20} />
        </button>

        {/* Notifications */}
        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors relative">
          <HugeiconsIcon icon={BellIcon} size={20} />
          {/* Notification Badge */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#5e53fc]" />
        </button>

        {/* Profile Area */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1.5 focus:outline-none group p-1 rounded-full hover:bg-slate-50 transition-colors"
          >
            {/* User Avatar Image or Placeholder */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-100 shadow-sm relative bg-indigo-50 flex items-center justify-center">
              <img src="/avatar.png" alt="Admin Avatar" className="w-full h-full object-cover" />
            </div>
          </button>

          {/* Interactive Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3.5 w-72 bg-white rounded-3xl shadow-xl border border-slate-100 py-3 z-50 transform origin-top-right transition-all duration-200 animate-in fade-in slide-in-from-top-2">
              {/* Header profile info */}
              <div className="px-5 py-3 border-b border-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center">
                  <img src="/avatar.png" alt="Admin Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-slate-800 truncate flex items-center gap-1.5">
                    David McMichael
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Super Admin
                    </span>
                  </span>
                  <span className="text-xs text-slate-400 truncate">example@example.com</span>
                </div>
              </div>

              {/* Dropdown options */}
              <div className="px-2 py-2 flex flex-col gap-0.5">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    alert("Navigating to Profile Settings");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium"
                >
                  <HugeiconsIcon icon={UserIcon} size={18} className="text-[#a0aec0]" />
                  View profile
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setActiveTab("settings");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium"
                >
                  <HugeiconsIcon icon={Settings01Icon} size={18} className="text-[#a0aec0]" />
                  Account Settings
                </button>
              </div>

              {/* Log out */}
              <div className="px-2 pt-2 border-t border-slate-50">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    alert("Logging out...");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 transition-colors text-sm font-medium text-left"
                >
                  {/* Logout Icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-400"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
