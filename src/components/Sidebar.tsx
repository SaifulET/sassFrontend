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

const SidebarIcon = ({ src, size = 24, className = "" }: { src: string; size?: number; className?: string }) => {
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
    { id: "overview", label: "Overview", icon: "/dashboard.svg" },
    { id: "users_and_staff", label: "Users and Staff", icon: "/customers.svg" },
    { id: "billing", label: "Billing", icon: "/billing.svg" },
    { id: "settings", label: "Settings", icon: "/settings.svg" },
    { id: "activity", label: "Activity", icon: "/performance.svg" },
    { id: "support", label: "Support", icon: "/supports.svg" },
    { id: "automations", label: "Automations & Mail", icon: "/automationAndMails.svg" }
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
        <SidebarIcon src={item.icon} size={24} />
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
                        <SidebarIcon src={item.icon} size={24} />
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
                      {leadsExpanded ? (
                        <div className="flex flex-col items-start p-4 gap-6 w-full bg-[#F1F2FE] rounded-lg flex-none border border-[#E8EEF5]">
                          {/* Header: Click to collapse */}
                          <button
                            type="button"
                            onClick={() => setLeadsExpanded(false)}
                            className="flex flex-row items-center justify-between w-full h-6 text-[#635BFF]"
                          >
                            <div className="flex flex-row items-center gap-2">
                              <SidebarIcon src={item.icon} size={24} className="text-[#635BFF]" />
                              <span className="font-['Manrope'] font-semibold text-[15px] leading-[20px]">
                                Leads
                              </span>
                            </div>
                            <span className="text-[#635BFF] transform rotate-180">
                              <ChevronDownIcon />
                            </span>
                          </button>

                          {/* Sub-items list */}
                          <div className="flex flex-col items-start p-0 gap-2 self-stretch w-full">
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
                                  className={`w-full h-[44px] rounded-full px-4 py-2 flex items-center justify-start text-[15px] font-normal font-sans leading-[20px] transition-all ${
                                    isSubActive
                                      ? "bg-[#635BFF] text-white shadow-sm"
                                      : "bg-white text-[#635BFF] hover:bg-slate-50"
                                  }`}
                                >
                                  <SidebarIcon src={sub.icon} size={24} className={isSubActive ? "text-white" : "text-[#635BFF]"} />
                                  <span className="ml-2">{sub.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setLeadsExpanded(true);
                            setAnalyticsExpanded(false);
                          }}
                          className={`w-full h-[44px] flex items-center justify-between px-4 py-2 rounded-full transition-all duration-200 ${
                            isLeadsActive
                              ? "bg-[#F5F8FC]/60 text-[#635BFF]"
                              : "text-[#29343D] hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <SidebarIcon src={item.icon} size={24} />
                            <span className="text-[15px] font-normal font-sans leading-[20px]">{item.label}</span>
                          </div>
                          <span className="text-[#b0bac9]">
                            <ChevronDownIcon />
                          </span>
                        </button>
                      )}
                    </div>
                  );
                }

                if (item.id === "analytics") {
                  const isAnalyticsActive = activeTab.startsWith("analytics_") || activeTab === "analytics";
                  return (
                    <div key={item.id} className="flex flex-col gap-1 w-full">
                      {analyticsExpanded ? (
                        <div className="flex flex-col items-start p-4 gap-6 w-full bg-[#F1F2FE] rounded-lg flex-none border border-[#E8EEF5]">
                          {/* Header: Click to collapse */}
                          <button
                            type="button"
                            onClick={() => setAnalyticsExpanded(false)}
                            className="flex flex-row items-center justify-between w-full h-6 text-[#635BFF]"
                          >
                            <div className="flex flex-row items-center gap-2">
                              <SidebarIcon src={item.icon} size={24} className="text-[#635BFF]" />
                              <span className="font-['Manrope'] font-semibold text-[15px] leading-[20px]">
                                Analytics
                              </span>
                            </div>
                            <span className="text-[#635BFF] transform rotate-180">
                              <ChevronDownIcon />
                            </span>
                          </button>

                          {/* Sub-items list */}
                          <div className="flex flex-col items-start p-0 gap-4 self-stretch w-full">
                            {/* Revenue Group */}
                            <div className="flex flex-col gap-2 w-full">
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
                                className="flex flex-row justify-between items-center px-4 py-2 w-full h-[44px] bg-[#DDDBFF] rounded-full text-[#635BFF] font-['Manrope'] font-semibold text-[15px]"
                              >
                                <div className="flex items-center gap-2">
                                  <SidebarIcon src="/revenue.svg" size={24} className="text-[#635BFF]" />
                                  <span>Revenue</span>
                                </div>
                                <span className={`transition-transform duration-200 ${revenueExpanded ? "rotate-180" : ""}`}>
                                  <ChevronDownIcon />
                                </span>
                              </button>
                              {revenueExpanded && (
                                <div className="flex flex-col gap-2 pl-2 w-full">
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
                                        className={`w-full h-[44px] rounded-full px-4 py-2 flex items-center justify-start text-[15px] font-normal font-sans leading-[20px] transition-all ${
                                          isSubActive
                                            ? "bg-[#635BFF] text-white shadow-sm"
                                            : "bg-white text-[#635BFF] hover:bg-slate-50"
                                        }`}
                                      >
                                        {sub.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Customers Group */}
                            <div className="flex flex-col gap-2 w-full">
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
                                className="flex flex-row justify-between items-center px-4 py-2 w-full h-[44px] bg-[#DDDBFF] rounded-full text-[#635BFF] font-['Manrope'] font-semibold text-[15px]"
                              >
                                <div className="flex items-center gap-2">
                                  <SidebarIcon src="/customers.svg" size={24} className="text-[#635BFF]" />
                                  <span>Customers</span>
                                </div>
                                <span className={`transition-transform duration-200 ${customersExpanded ? "rotate-180" : ""}`}>
                                  <ChevronDownIcon />
                                </span>
                              </button>
                              {customersExpanded && (
                                <div className="flex flex-col gap-2 pl-2 w-full">
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
                                        className={`w-full h-[44px] rounded-full px-4 py-2 flex items-center justify-start text-[15px] font-normal font-sans leading-[20px] transition-all ${
                                          isSubActive
                                            ? "bg-[#635BFF] text-white shadow-sm"
                                            : "bg-white text-[#635BFF] hover:bg-slate-50"
                                        }`}
                                      >
                                        {sub.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Performance Group */}
                            <div className="flex flex-col gap-2 w-full">
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
                                className="flex flex-row justify-between items-center px-4 py-2 w-full h-[44px] bg-[#DDDBFF] rounded-full text-[#635BFF] font-['Manrope'] font-semibold text-[15px]"
                              >
                                <div className="flex items-center gap-2">
                                  <SidebarIcon src="/performance.svg" size={24} className="text-[#635BFF]" />
                                  <span>Performance</span>
                                </div>
                                <span className={`transition-transform duration-200 ${performanceExpanded ? "rotate-180" : ""}`}>
                                  <ChevronDownIcon />
                                </span>
                              </button>
                              {performanceExpanded && (
                                <div className="flex flex-col gap-2 pl-2 w-full">
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
                                        className={`w-full h-[44px] rounded-full px-4 py-2 flex items-center justify-start text-[15px] font-normal font-sans leading-[20px] transition-all ${
                                          isSubActive
                                            ? "bg-[#635BFF] text-white shadow-sm"
                                            : "bg-white text-[#635BFF] hover:bg-slate-50"
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
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setAnalyticsExpanded(true);
                            setLeadsExpanded(false);
                          }}
                          className={`w-full h-[44px] flex items-center justify-between px-4 py-2 rounded-full transition-all duration-200 ${
                            isAnalyticsActive
                              ? "bg-[#F5F8FC]/60 text-[#635BFF]"
                              : "text-[#29343D] hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <SidebarIcon src={item.icon} size={24} />
                            <span className="font-sans font-normal text-[15px] leading-[20px] tracking-wide">{item.label}</span>
                          </div>
                          <span className="text-[#b0bac9]">
                            <ChevronDownIcon />
                          </span>
                        </button>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMainItemClick(item.id)}
                    className={`w-full h-[44px] flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#635BFF] text-white shadow-md shadow-indigo-150"
                        : "text-[#29343D] hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <SidebarIcon src={item.icon} size={24} className={isActive ? "text-white" : "text-[#98A4AE]"} />
                    <span className="font-sans font-normal text-[15px] leading-[20px] tracking-wide">{item.label}</span>
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
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isActive
                            ? "bg-[#635BFF] text-white shadow-md shadow-indigo-150"
                            : "text-[#29343D] hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <SidebarIcon src={item.icon} size={24} className={isActive ? "text-white" : "text-[#98A4AE]"} />
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
                    className={`w-full h-[44px] flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[#635BFF] text-white shadow-md shadow-indigo-150"
                        : "text-[#29343D] hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <SidebarIcon src={item.icon} size={24} className={isActive ? "text-white" : "text-[#98A4AE]"} />
                    <span className="font-sans font-normal text-[15px] leading-[20px] tracking-wide">{item.label}</span>
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
      <aside className={`hidden lg:flex fixed top-0 bottom-0 left-0 ${isExpanded ? "w-72" : "w-20"} bg-white z-30 border-r border-[#eef2f6] flex flex-row transition-all duration-300`}>
        
        {/* Column 1: Narrow vertical icon bar */}
        <div className="w-20 bg-white border-r border-[#eef2f6] flex flex-col items-center shrink-0">
          {/* Header block for Hamburger button */}
          <div className="h-[63px] w-full border-b border-[#eef2f6] flex items-center justify-center shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
          </div>

          {/* Icons container */}
          <div className="flex-1 flex flex-col items-center py-6 justify-between w-full overflow-y-auto">
            <div className="flex flex-col items-center gap-4.5 w-full">
              {mainNavigation.map(renderNarrowIcon)}
            </div>
            <div className="flex flex-col items-center gap-4.5 w-full">
              {secondaryNavigation.map(renderNarrowIcon)}
            </div>
          </div>
        </div>

        {/* Column 2: Extended text menu bar */}
        {isExpanded && (
          <div className="w-52 bg-[#f8fafc] flex flex-col shrink-0">
            {/* Header block for Logo */}
            <div className="h-[63px] w-full border-b border-[#eef2f6] flex items-center px-4 shrink-0 bg-white">
              <img src="/logo.svg" alt="MatDash" className="w-[120px] h-[50px] object-contain" />
            </div>

            {/* Menu container */}
            <div className="flex-1 pt-6 pb-6 px-3.5 overflow-y-auto animate-in fade-in duration-200">
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
                          className={`w-full text-left px-4 py-2 h-[44px] flex items-center rounded-full font-sans font-normal text-[15px] leading-[20px] transition-all duration-200 ${
                            isActive
                              ? "bg-[#635BFF] text-white shadow-sm"
                              : "text-[#29343D] hover:bg-slate-50 hover:text-slate-950"
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
                      className={`w-full text-left px-4 py-2 h-[44px] flex items-center rounded-full font-sans font-normal text-[15px] leading-[20px] transition-all duration-200 ${
                        isActive
                          ? "bg-[#635BFF] text-white shadow-sm"
                          : "text-[#29343D] hover:bg-slate-50 hover:text-slate-950"
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
