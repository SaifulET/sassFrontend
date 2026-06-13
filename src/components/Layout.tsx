"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSalonId: string | null;
  setSelectedSalonId: (id: string | null) => void;
  salonSubTab: string;
  setSalonSubTab: (tab: string) => void;
}

export default function Layout({
  children,
  activeTab,
  setActiveTab,
  selectedSalonId,
  setSelectedSalonId,
  salonSubTab,
  setSalonSubTab
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans">
      {/* Header - Fixed top across the entire width or offset */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSalonId={selectedSalonId}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Sidebar - Narrow + Extended bar container */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSalonId={selectedSalonId}
        setSelectedSalonId={setSelectedSalonId}
        salonSubTab={salonSubTab}
        setSalonSubTab={setSalonSubTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Container - offsets for desktop single vs double sidebar */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        selectedSalonId !== null ? "lg:pl-72" : "lg:pl-64"
      }`}>
        {/* Page Content - scrolls under header */}
        <main className={`flex-1 px-4 md:px-8 pb-12 overflow-y-auto transition-all duration-300 ${
          selectedSalonId !== null ? "pt-24" : "pt-24"
        }`}>
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
