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
  Cancel01Icon,
  Menu01Icon
} from "@hugeicons/core-free-icons";

const SidebarIcon = ({ src, size = 20, className = "" }: { src: string; size?: number; className?: string }) => {
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
  isExpanded?: boolean;
  setIsExpanded?: (val: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedSalonId,
  setSelectedSalonId,
  salonSubTab,
  setSalonSubTab,
  isOpen,
  setIsOpen,
  isExpanded = true,
  setIsExpanded = () => {}
}: SidebarProps) {
  const [analyticsExpanded, setAnalyticsExpanded] = React.useState(false);
  const [revenueExpanded, setRevenueExpanded] = React.useState(false);
  const [customersExpanded, setCustomersExpanded] = React.useState(false);
  const [performanceExpanded, setPerformanceExpanded] = React.useState(false);
  const [leadsExpanded, setLeadsExpanded] = React.useState(false);

  // Main menu item mappings (added Waivers)
  const mainNavigation = [
    { id: "dashboard", label: "Dashboard", icon: "/dashboard.svg" },
    { id: "salons", label: "Salons", icon: "/salon.svg" },
    { id: "leads", label: "Leads", icon: "/leads.svg" },
    { id: "billing", label: "Billing", icon: "/billing.svg" },
    { id: "analytics", label: "Analytics", icon: "/analytics.svg" },
    { id: "automations", label: "Automations & Mail", icon: "/automationAndMails.svg" }
  ];

  const secondaryNavigation = [
    { id: "support", label: "Support", icon: "/supports.svg" },
    { id: "settings", label: "Settings", icon: "/settings.svg" }
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
            ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150"
            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
        }`}
        title={item.label}
      >
        <SidebarIcon src={item.icon} size={20} />
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
          className={`fixed inset-y-0 left-0 ${isExpanded ? "w-[280px]" : "w-20"} bg-white border-r border-[#eef2f6] flex flex-col z-50 lg:z-30 transform lg:transform-none transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Brand/Logo Header */}
          <div className={`h-[63px] ${isExpanded ? "px-6 justify-between" : "px-2 justify-center"} border-b border-[#eef2f6] flex items-center shrink-0`}>
            {isExpanded && (
              <div className="flex items-center">
                <img src="/logo.svg" alt="MatDash" className="w-[120px] h-[50px] object-contain" />
              </div>
            )}

            {/* Desktop Hamburger / Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>

          {/* Sidebar Nav Links */}
          <div className={`flex-1 overflow-y-auto ${isExpanded ? "px-4" : "px-2"} py-6 flex flex-col gap-6 text-left`}>
            {/* Main Section */}
            <div className="flex flex-col gap-1">
              {isExpanded && (
                <span className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#b0bac9] mb-2">
                  Main
                </span>
              )}
              {mainNavigation.map((item) => {
                const isActive = activeTab === item.id || 
                  (item.id === "analytics" && activeTab.startsWith("analytics_")) ||
                  (item.id === "leads" && (activeTab.startsWith("leads_") || activeTab === "analytics_customers_leads"));
                
                if (!isExpanded) {
                  return (
                    <div key={item.id} className="relative group flex justify-center w-full my-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.id === "analytics") {
                            handleMainItemClick("analytics_revenue_mrr_arr");
                          } else if (item.id === "leads") {
                            handleMainItemClick("leads_pipeline");
                          } else {
                            handleMainItemClick(item.id);
                          }
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isActive
                            ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150"
                            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <SidebarIcon src={item.icon} size={20} />
                      </button>
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#635BFF] text-white text-[10px] font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    </div>
                  );
                }
                if (item.id === "leads") {
                  const isLeadsActive = activeTab.startsWith("leads_") || activeTab === "leads" || activeTab === "analytics_customers_leads";
                  return (
                    <div key={item.id} className="flex flex-col gap-1 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          const nextState = !leadsExpanded;
                          setLeadsExpanded(nextState);
                          if (nextState) {
                            setAnalyticsExpanded(false);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isLeadsActive
                            ? "bg-[#F5F8FC]/60 text-[#635BFF]"
                            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <SidebarIcon src={item.icon} size={20} />
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
                              icon: "/pipeline.svg"
                            },
                            {
                              id: "analytics_customers_leads",
                              label: "Data Analysis",
                              icon: "/dataAnalysis.svg"
                            }
                          ].map((sub) => {
                            const isSubActive = activeTab === sub.id;
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
                                <SidebarIcon src={sub.icon} size={16} />
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
                        onClick={() => {
                          const nextState = !analyticsExpanded;
                          setAnalyticsExpanded(nextState);
                          if (nextState) {
                            setLeadsExpanded(false);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                          isAnalyticsActive
                            ? "bg-[#F5F8FC]/60 text-[#635BFF]"
                            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <SidebarIcon src={item.icon} size={20} />
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
                              onClick={() => {
                                const nextState = !revenueExpanded;
                                setRevenueExpanded(nextState);
                                if (nextState) {
                                  setCustomersExpanded(false);
                                  setPerformanceExpanded(false);
                                }
                              }}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <SidebarIcon src="/revenue.svg" size={14} className="text-[#29343D]" />
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
                              onClick={() => {
                                const nextState = !customersExpanded;
                                setCustomersExpanded(nextState);
                                if (nextState) {
                                  setRevenueExpanded(false);
                                  setPerformanceExpanded(false);
                                }
                              }}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <SidebarIcon src="/customers.svg" size={14} className="text-[#29343D]" />
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
                              onClick={() => {
                                const nextState = !performanceExpanded;
                                setPerformanceExpanded(nextState);
                                if (nextState) {
                                  setRevenueExpanded(false);
                                  setCustomersExpanded(false);
                                }
                              }}
                              className="w-full flex items-center justify-between py-1.5 px-2 rounded-xl text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <SidebarIcon src="/performance.svg" size={14} className="text-[#29343D]" />
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
                    <SidebarIcon src={item.icon} size={20} />
                    <span className="text-xs font-semibold tracking-wide">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Others Section */}
            <div className="flex flex-col gap-1">
              {isExpanded && (
                <span className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#b0bac9] mb-2">
                  Others
                </span>
              )}
              {secondaryNavigation.map((item) => {
                const isActive = activeTab === item.id;
                if (!isExpanded) {
                  return (
                    <div key={item.id} className="relative group flex justify-center w-full my-1">
                      <button
                        type="button"
                        onClick={() => handleMainItemClick(item.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isActive
                            ? "bg-[#5e53fc] text-white shadow-md shadow-indigo-150"
                            : "text-[#7e8b9b] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <SidebarIcon src={item.icon} size={20} />
                      </button>
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#635BFF] text-white text-[10px] font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    </div>
                  );
                }
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
                    <SidebarIcon src={item.icon} size={20} />
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

      {/* DESKTOP SIDEBAR: Double column fixed structure starting at top (top-0) */}
      <aside className={`hidden lg:flex fixed top-0 bottom-0 left-0 ${isExpanded ? "w-72" : "w-20"} bg-white z-30 transition-all duration-300`}>
        {/* Column 1: Narrow vertical icon bar */}
        <div className="w-20 bg-white border-r border-[#eef2f6] flex flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col items-center gap-4.5 w-full">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 mb-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
            {mainNavigation.map(renderNarrowIcon)}
          </div>
          <div className="flex flex-col items-center gap-4.5 w-full">
            {secondaryNavigation.map(renderNarrowIcon)}
          </div>
        </div>

        {/* Column 2: Extended text menu bar */}
        {isExpanded && (
          <div className="w-52 bg-[#f8fafc] border-r border-[#eef2f6] flex flex-col pt-[87px] pb-6 px-3.5 overflow-y-auto animate-in fade-in duration-200">
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
      )}
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
