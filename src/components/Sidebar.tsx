"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Shop,
  UserGroupIcon,
  CreditCardIcon,
  ChartAreaIcon,
  Mail01Icon,
  CustomerSupportIcon,
  Settings01Icon,
  Cancel01Icon
} from "@hugeicons/core-free-icons";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSalonId: string | null;
  setSelectedSalonId: (id: string | null) => void;
  salonSubTab: string;
  setSalonSubTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedSalonId,
  setSelectedSalonId,
  salonSubTab,
  setSalonSubTab,
  isOpen,
  setIsOpen
}: SidebarProps) {

  // Main menu item mappings
  const mainNavigation = [
    { id: "dashboard", label: "Dashboard", icon: DashboardCircleIcon },
    { id: "salons", label: "Salons", icon: Shop },
    { id: "leads", label: "Leads", icon: UserGroupIcon },
    { id: "billing", label: "Billing", icon: CreditCardIcon },
    { id: "analytics", label: "Analytics", icon: ChartAreaIcon },
    { id: "automations", label: "Automations & Mail", icon: Mail01Icon }
  ];

  const secondaryNavigation = [
    { id: "support", label: "Support", icon: CustomerSupportIcon },
    { id: "settings", label: "Settings", icon: Settings01Icon }
  ];

  // Salon specific sub-navigation links
  const salonNavigation = [
    { id: "overview", label: "Overview" },
    { id: "users_and_staff", label: "Users and Staff" },
    { id: "billing", label: "Billing" },
    { id: "settings", label: "Settings" },
    { id: "activity", label: "Activity" },
    { id: "support", label: "Support" },
    { id: "automations", label: "Automations and Mail" }
  ];

  const handleMainItemClick = (id: string) => {
    setActiveTab(id);
    setSelectedSalonId(null); // Clear active salon context when clicking main items
    setIsOpen(false);
  };

  const renderNarrowIcon = (item: any) => {
    const isTabActive = activeTab === item.id;
    const isHighlighted = item.id === "salons" ? (activeTab === "salons" || selectedSalonId !== null) : isTabActive;

    return (
      <button
        key={item.id}
        onClick={() => handleMainItemClick(item.id)}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
          isHighlighted
            ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150 scale-105"
            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
        }`}
        title={item.label}
      >
        <HugeiconsIcon
          icon={item.icon}
          size={22}
          color={isHighlighted ? "#ffffff" : "currentColor"}
        />
        {isHighlighted && (
          <span className="absolute right-0 w-1.5 h-1.5 rounded-full bg-white mr-1" />
        )}
      </button>
    );
  };

  // If no salon is selected, display the original single column w-64 sidebar layout
  if (selectedSalonId === null) {
    return (
      <>
        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar Container - Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-[#eef2f6] flex flex-col z-30 transform lg:transform-none transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Brand/Logo Header */}
          <div className="h-20 px-6 border-b border-[#eef2f6] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
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

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>

          {/* Sidebar Nav Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 text-left">
            {/* Main Section */}
            <div className="flex flex-col gap-1">
              <span className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#b0bac9] mb-2">
                Main
              </span>
              {mainNavigation.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMainItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150"
                        : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={20}
                      color={isActive ? "#ffffff" : "currentColor"}
                    />
                    <span className="text-xs font-semibold tracking-wide">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Others Section */}
            <div className="flex flex-col gap-1">
              <span className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#b0bac9] mb-2">
                Others
              </span>
              {secondaryNavigation.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMainItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150"
                        : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={20}
                      color={isActive ? "#ffffff" : "currentColor"}
                    />
                    <span className="text-xs font-semibold tracking-wide">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Render double sidebar (narrow w-20 + extended w-52) when inside active salon view
  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DESKTOP SIDEBAR: Double column fixed structure starting below header (top-20) */}
      <aside className="hidden lg:flex fixed top-20 bottom-0 left-0 w-72 bg-white z-30">
        {/* Column 1: Narrow vertical icon bar */}
        <div className="w-20 bg-white border-r border-[#eef2f6] flex flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col items-center gap-4.5 w-full">
            {mainNavigation.map(renderNarrowIcon)}
          </div>
          <div className="flex flex-col items-center gap-4.5 w-full">
            {secondaryNavigation.map(renderNarrowIcon)}
          </div>
        </div>

        {/* Column 2: Extended text menu bar */}
        <div className="w-52 bg-[#f8fafc] border-r border-[#eef2f6] flex flex-col py-6 px-3.5 overflow-y-auto">
          <div className="flex flex-col gap-6 w-full text-left">
            <div>
              <span className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#b0bac9]">
                Salon
              </span>
              <div className="flex flex-col gap-1 mt-3.5">
                {salonNavigation.map((item) => {
                  const isActive = salonSubTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSalonSubTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                        isActive
                          ? "bg-[#5e53fc] text-white shadow-sm"
                          : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER: Full sliding menu bar containing narrow & extended side-by-side */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white flex z-50 transform lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Column 1: Narrow icon bar */}
        <div className="w-20 bg-white border-r border-[#eef2f6] flex flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col items-center gap-4.5 w-full">
            {mainNavigation.map(renderNarrowIcon)}
          </div>
          <div className="flex flex-col items-center gap-4.5 w-full">
            {secondaryNavigation.map(renderNarrowIcon)}
          </div>
        </div>

        {/* Column 2: Extended menu + Mobile close button */}
        <div className="w-52 bg-[#f8fafc] border-r border-[#eef2f6] flex flex-col py-6 px-3.5 overflow-y-auto relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 p-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors shadow-sm"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={14} />
          </button>
          <div className="mt-8 text-left">
            <div>
              <span className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#b0bac9]">
                Salon
              </span>
              <div className="flex flex-col gap-1 mt-3.5">
                {salonNavigation.map((item) => {
                  const isActive = salonSubTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSalonSubTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                        isActive
                          ? "bg-[#5e53fc] text-white shadow-sm"
                          : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
