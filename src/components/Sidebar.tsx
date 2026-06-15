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

// Custom SVG Icon for Waivers to match design perfectly
const WaiversIcon = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <circle cx="9" cy="9" r="1.2" fill={color || "currentColor"} />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

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
  const [analyticsExpanded, setAnalyticsExpanded] = React.useState(true);
  const [revenueExpanded, setRevenueExpanded] = React.useState(true);
  const [customersExpanded, setCustomersExpanded] = React.useState(false);
  const [performanceExpanded, setPerformanceExpanded] = React.useState(false);
  const [leadsExpanded, setLeadsExpanded] = React.useState(true);

  // Main menu item mappings (added Waivers)
  const mainNavigation = [
    { id: "dashboard", label: "Dashboard", icon: DashboardCircleIcon },
    { id: "salons", label: "Salons", icon: Shop },
    { id: "leads", label: "Leads", icon: UserGroupIcon },
    { id: "billing", label: "Billing", icon: CreditCardIcon },
    { id: "analytics", label: "Analytics", icon: ChartAreaIcon },
    { id: "automations", label: "Automations & Mail", icon: Mail01Icon },
    { id: "waivers", label: "Waivers", icon: WaiversIcon }
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
    const isTabActive =
      activeTab === item.id ||
      (item.id === "analytics" && activeTab.startsWith("analytics_")) ||
      (item.id === "leads" && (activeTab.startsWith("leads_") || activeTab === "analytics_customers_leads"));
    const isHighlighted = item.id === "salons" ? (activeTab === "salons" || selectedSalonId !== null) : isTabActive;

    return (
      <button
        key={item.id}
        onClick={() => {
          if (item.id === "analytics") {
            handleMainItemClick("analytics_revenue_mrr_arr");
          } else if (item.id === "leads") {
            handleMainItemClick("leads_pipeline");
          } else {
            handleMainItemClick(item.id);
          }
        }}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 relative group ${
          isHighlighted
            ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150 scale-105"
            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
        }`}
        title={item.label}
      >
        {typeof item.icon === "function" ? (
          (() => {
            const IconComp = item.icon as any;
            return <IconComp color={isHighlighted ? "#ffffff" : "currentColor"} />;
          })()
        ) : (
          <HugeiconsIcon
            icon={item.icon}
            size={22}
            color={isHighlighted ? "#ffffff" : "currentColor"}
          />
        )}
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
          className={`fixed inset-y-0 left-0 w-[280px] bg-white border-r border-[#eef2f6] flex flex-col z-30 transform lg:transform-none transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Brand/Logo Header */}
          <div className="h-[63px] px-6 border-b border-[#eef2f6] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12.5C6.5 12.5 7.5 7.5 11 7.5C14.5 7.5 15.5 12.5 19 12.5C21.5 12.5 22.5 10 23 9.5" stroke="#635BFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 16.5C4.5 16.5 5.5 11.5 9 11.5C12.5 11.5 13.5 16.5 17 16.5C19.5 16.5 20.5 14 21 13.5" stroke="#8075ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-[#29343D]">
                Your logo
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
                if (item.id === "leads") {
                  const isLeadsActive = activeTab.startsWith("leads_") || activeTab === "leads" || activeTab === "analytics_customers_leads";
                  return (
                    <div key={item.id} className="flex flex-col gap-1 w-full">
                      <button
                        type="button"
                        onClick={() => setLeadsExpanded(!leadsExpanded)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isLeadsActive
                            ? "bg-[#F5F8FC]/60 text-[#635BFF]"
                            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {typeof item.icon === "function" ? (
                            <item.icon color={isLeadsActive ? "#635BFF" : "currentColor"} />
                          ) : (
                            <HugeiconsIcon
                              icon={item.icon}
                              size={20}
                              color={isLeadsActive ? "#635BFF" : "currentColor"}
                            />
                          )}
                          <span className="text-xs font-semibold tracking-wide">{item.label}</span>
                        </div>
                        <span className={`text-[#b0bac9] transition-transform duration-200 ${leadsExpanded ? "rotate-180" : ""}`}>
                          <ChevronDownIcon />
                        </span>
                      </button>

                      {leadsExpanded && (
                        <div className="mx-1.5 p-3.5 bg-[#F4F7FB] border border-[#E8EEF5] rounded-[16px] flex flex-col gap-2">
                          {[
                            {
                              id: "leads_pipeline",
                              label: "Pipeline",
                              icon: (color: string) => (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="6" cy="6" r="3" />
                                  <circle cx="18" cy="18" r="3" />
                                  <path d="M6 9v7a3 3 0 0 0 3 3h6" />
                                </svg>
                              )
                            },
                            {
                              id: "analytics_customers_leads",
                              label: "Data Analysis",
                              icon: (color: string) => (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 3v18h18" />
                                  <path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3" />
                                </svg>
                              )
                            }
                          ].map((sub) => {
                            const isSubActive = activeTab === sub.id;
                            const colorClass = isSubActive ? "#635BFF" : "#7e8b9b";
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => handleMainItemClick(sub.id)}
                                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-150 ${
                                  isSubActive
                                    ? "bg-white text-[#635BFF] shadow-sm"
                                    : "bg-transparent text-[#7e8b9b] hover:bg-white/40 hover:text-slate-950"
                                }`}
                              >
                                {sub.icon(colorClass)}
                                <span>{sub.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.id === "analytics") {
                  const isAnalyticsActive = activeTab.startsWith("analytics_") || activeTab === "analytics";
                  return (
                    <div key={item.id} className="flex flex-col gap-1 w-full">
                      <button
                        type="button"
                        onClick={() => setAnalyticsExpanded(!analyticsExpanded)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isAnalyticsActive
                            ? "bg-[#F5F8FC]/60 text-[#635BFF]"
                            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {typeof item.icon === "function" ? (
                            <item.icon color={isAnalyticsActive ? "#635BFF" : "currentColor"} />
                          ) : (
                            <HugeiconsIcon
                              icon={item.icon}
                              size={20}
                              color={isAnalyticsActive ? "#635BFF" : "currentColor"}
                            />
                          )}
                          <span className="text-xs font-semibold tracking-wide">{item.label}</span>
                        </div>
                        <span className={`text-[#b0bac9] transition-transform duration-200 ${analyticsExpanded ? "rotate-180" : ""}`}>
                          <ChevronDownIcon />
                        </span>
                      </button>

                      {analyticsExpanded && (
                        <div className="mx-1.5 p-3.5 bg-[#F4F7FB] border border-[#E8EEF5] rounded-[16px] flex flex-col gap-3.5">
                          {/* Revenue Submenu */}
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => setRevenueExpanded(!revenueExpanded)}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] leading-none select-none font-bold text-[#29343D]">
                                  €
                                </span>
                                <span className="text-xs font-bold text-[#29343D]">Revenue</span>
                              </div>
                              <span className={`text-[#b0bac9] transition-transform duration-200 ${revenueExpanded ? "rotate-180" : ""}`}>
                                <ChevronDownIcon />
                              </span>
                            </button>

                            {revenueExpanded && (
                              <div className="flex flex-col gap-1.5 pl-3">
                                {[
                                  { id: "analytics_revenue_mrr_arr", label: "MRR / ARR" },
                                  { id: "analytics_revenue_asp", label: "ASP" },
                                  { id: "analytics_revenue_ltv", label: "LTV" },
                                  { id: "analytics_revenue_cashflow", label: "Cashflow" }
                                ].map((sub) => {
                                  const isSubActive = activeTab === sub.id;
                                  return (
                                    <button
                                      key={sub.id}
                                      type="button"
                                      onClick={() => handleMainItemClick(sub.id)}
                                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-150 ${
                                        isSubActive
                                          ? "bg-[#635BFF] text-white shadow-sm"
                                          : "bg-white border border-[#E0E6EB] text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-950"
                                      }`}
                                    >
                                      {sub.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Customers Submenu */}
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => setCustomersExpanded(!customersExpanded)}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                <span className="text-xs font-bold text-[#29343D]">Customers</span>
                              </div>
                              <span className={`text-[#b0bac9] transition-transform duration-200 ${customersExpanded ? "rotate-180" : ""}`}>
                                <ChevronDownIcon />
                              </span>
                            </button>
                            {customersExpanded && (
                              <div className="flex flex-col gap-1.5 pl-3">
                                {[
                                  { id: "analytics_customers_subscribers", label: "Subscribers" },
                                  { id: "analytics_customers_leads", label: "Leads" },
                                  { id: "analytics_customers_trials", label: "Trials" }
                                ].map((sub) => {
                                  const isSubActive = activeTab === sub.id;
                                  return (
                                    <button
                                      key={sub.id}
                                      type="button"
                                      onClick={() => handleMainItemClick(sub.id)}
                                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-150 ${
                                        isSubActive
                                          ? "bg-[#635BFF] text-white shadow-sm"
                                          : "bg-white border border-[#E0E6EB] text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-950"
                                      }`}
                                    >
                                      {sub.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Performance Submenu */}
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => setPerformanceExpanded(!performanceExpanded)}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="20" x2="18" y2="10" />
                                  <line x1="12" y1="20" x2="12" y2="4" />
                                  <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                                <span className="text-xs font-bold text-[#29343D]">Performance</span>
                              </div>
                              <span className={`text-[#b0bac9] transition-transform duration-200 ${performanceExpanded ? "rotate-180" : ""}`}>
                                <ChevronDownIcon />
                              </span>
                            </button>
                            {performanceExpanded && (
                              <div className="flex flex-col gap-1.5 pl-3">
                                {[
                                  { id: "analytics_performance_arpa", label: "ARPA" },
                                  { id: "analytics_performance_churn", label: "Churn" },
                                  { id: "analytics_performance_cohorts", label: "Cohorts" },
                                  { id: "analytics_performance_map", label: "Map" }
                                ].map((sub) => {
                                  const isSubActive = activeTab === sub.id;
                                  return (
                                    <button
                                      key={sub.id}
                                      type="button"
                                      onClick={() => handleMainItemClick(sub.id)}
                                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-150 ${
                                        isSubActive
                                          ? "bg-[#635BFF] text-white shadow-sm"
                                          : "bg-white border border-[#E0E6EB] text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-950"
                                      }`}
                                    >
                                      {sub.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMainItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150"
                        : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {typeof item.icon === "function" ? (
                      <item.icon color={isActive ? "#ffffff" : "currentColor"} />
                    ) : (
                      <HugeiconsIcon
                        icon={item.icon}
                        size={20}
                        color={isActive ? "#ffffff" : "currentColor"}
                      />
                    )}
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
                    {typeof item.icon === "function" ? (
                      (() => {
                        const IconComp = item.icon as any;
                        return <IconComp color={isActive ? "#ffffff" : "currentColor"} />;
                      })()
                    ) : (
                      <HugeiconsIcon
                        icon={item.icon}
                        size={20}
                        color={isActive ? "#ffffff" : "currentColor"}
                      />
                    )}
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

      {/* DESKTOP SIDEBAR: Double column fixed structure starting below header (top-[63px]) */}
      <aside className="hidden lg:flex fixed top-[63px] bottom-0 left-0 w-72 bg-white z-30">
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
