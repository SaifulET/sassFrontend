"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GlobalRefreshIcon,
  Shop,
  Cancel01Icon,
  ArrowDown01Icon,
  ViewIcon,
  Mail01Icon,
  CustomerSupportIcon,
  Settings01Icon,
  Alert01Icon
} from "@hugeicons/core-free-icons";

import SalonDetailPage from "./SalonDetailPage";

// Custom SVG Icons to avoid import bugs and ensure perfect design matching
const CrownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 14h14v2H5v-2z" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const PurpleStarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#5e53fc]">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const VerticalDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

const KeyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const ImpersonateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

interface Salon {
  id: string;
  name: string;
  tag: string;
  manager: string;
  city: string;
  region: string;
  email: string;
  status: "Active" | "Trial" | "Cancelled" | "Leads" | "Past Due" | "Expired";
  plan: "Basic" | "Premium" | "Enterprise";
  revenue: string;
  ltv: string;
  lastActive: string;
  hasTicket: boolean;
  vip?: boolean;
  enterprise?: boolean;
}

interface SalonsPageProps {
  salons: Salon[];
  setSalons: React.Dispatch<React.SetStateAction<Salon[]>>;
  selectedSalonId: string | null;
  setSelectedSalonId: (id: string | null) => void;
}

export default function SalonsPage({
  salons,
  setSalons,
  selectedSalonId,
  setSelectedSalonId
}: SalonsPageProps) {

  // Filter States
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPlan, setSelectedPlan] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All regions");
  const [selectedCity, setSelectedCity] = useState<string>("All cities");

  // Filter Dropdown Toggles
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  // Search Inputs inside Dropdowns
  const [regionSearch, setRegionSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  // Refs for closing dropdowns on click outside
  const regionRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  // Selection state
  const [selectedSalonIds, setSelectedSalonIds] = useState<string[]>([]);

  // Action Menu state
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Impersonating Banner State
  const [impersonatingSalon, setImpersonatingSalon] = useState<string | null>(null);

  // Selected Salon Details State is passed as a prop

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalStep, setAddModalStep] = useState<1 | 2>(1);
  const [addModalType, setAddModalType] = useState<"invite" | "manual" | null>(null);

  // Invite Form states
  const [inviteSalonName, setInviteSalonName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteInviter, setInviteInviter] = useState("Super admin name");

  // Manual wizard state variables
  const [manualStep, setManualStep] = useState(1);
  const [manualSalonName, setManualSalonName] = useState("");
  const [manualBusinessType, setManualBusinessType] = useState("Sole Proprietorship");
  const [manualVtaNumber, setManualVtaNumber] = useState("");
  const [manualEmployeeCount, setManualEmployeeCount] = useState("10");

  const [manualOwners, setManualOwners] = useState([
    { id: "owner-1", firstName: "", lastName: "" }
  ]);

  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");

  const [manualCountry, setManualCountry] = useState("United States");
  const [manualCity, setManualCity] = useState("Select city");
  const [manualProvince, setManualProvince] = useState("Select province");
  const [manualZip, setManualZip] = useState("");

  const [manualTrialPeriod, setManualTrialPeriod] = useState("14 days");
  const [manualInitialPlan, setManualInitialPlan] = useState<"Basic" | "Premium" | "Enterprise">("Basic");

  // Loading/Refresh State
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionDropdownOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveActionMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter salons logic
  const filteredSalons = salons.filter((salon) => {
    // Status filter
    if (selectedStatus !== "All") {
      if (selectedStatus === "Active" && salon.status !== "Active") return false;
      if (selectedStatus === "Cancelled" && salon.status !== "Cancelled") return false;
      if (selectedStatus === "Trial" && salon.status !== "Trial") return false;
      if (selectedStatus === "Leads" && salon.status !== "Leads") return false;
      if (selectedStatus === "Expired" && salon.status !== "Expired" && salon.status !== "Past Due") return false;
    }
    // Plan filter
    if (selectedPlan !== "All" && salon.plan !== selectedPlan) {
      return false;
    }
    // Region filter
    if (selectedRegion !== "All regions" && salon.region !== selectedRegion) {
      return false;
    }
    // City filter
    if (selectedCity !== "All cities" && salon.city !== selectedCity) {
      return false;
    }
    return true;
  });

  // Pagination calculations
  const totalItems = filteredSalons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSalons = filteredSalons.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleExport = () => {
    alert("Exporting " + filteredSalons.length + " salons to CSV...");
  };

  // Row Selection logic
  const handleSelectAll = () => {
    if (selectedSalonIds.length === paginatedSalons.length) {
      // Unselect all on current page
      const pageIds = paginatedSalons.map(s => s.id);
      setSelectedSalonIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      // Select all on current page
      const pageIds = paginatedSalons.map(s => s.id);
      setSelectedSalonIds(prev => {
        const union = new Set([...prev, ...pageIds]);
        return Array.from(union);
      });
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedSalonIds.includes(id)) {
      setSelectedSalonIds(prev => prev.filter(rowId => rowId !== id));
    } else {
      setSelectedSalonIds(prev => [...prev, id]);
    }
  };

  const handleUnselectAll = () => {
    setSelectedSalonIds([]);
  };

  // Actions menu handlers
  const handleDeleteSalon = (id: string) => {
    const name = salons.find(s => s.id === id)?.name;
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setSalons(prev => prev.filter(s => s.id !== id));
      setSelectedSalonIds(prev => prev.filter(rowId => rowId !== id));
      setActiveActionMenuId(null);
    }
  };

  const handleImpersonate = (id: string) => {
    const name = salons.find(s => s.id === id)?.name;
    setImpersonatingSalon(name || null);
    setActiveActionMenuId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add salon submission
  const handleAddSalonManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSalonName || !manualEmail || !manualCity) {
      alert("Please fill in all required fields.");
      return;
    }

    const newSalon: Salon = {
      id: `salon-${Date.now()}`,
      name: manualSalonName,
      tag: manualBusinessType === "Sole Proprietorship" ? "Ind." : (manualBusinessType === "SPA" ? "SPA" : "SRL"),
      manager: manualOwners.map(o => `${o.firstName} ${o.lastName}`).filter(name => name.trim() !== "").join(", ") || "No Owner",
      city: manualCity,
      region: manualCountry,
      email: manualEmail,
      status: manualTrialPeriod !== "No trial" ? "Trial" : "Active",
      plan: manualInitialPlan,
      revenue: "299,00 €",
      ltv: "299,00 €",
      lastActive: "Just now",
      hasTicket: false
    };

    setSalons(prev => [newSalon, ...prev]);

    // Reset wizard states
    setManualSalonName("");
    setManualBusinessType("Sole Proprietorship");
    setManualVtaNumber("");
    setManualEmployeeCount("10");
    setManualOwners([{ id: "owner-1", firstName: "", lastName: "" }]);
    setManualEmail("");
    setManualPhone("");
    setManualCountry("United States");
    setManualCity("Select city");
    setManualProvince("Select province");
    setManualZip("");
    setManualTrialPeriod("14 days");
    setManualInitialPlan("Basic");

    setIsAddModalOpen(false);
    setAddModalStep(1);
    setAddModalType(null);
    setManualStep(1);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteSalonName || !inviteEmail) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Invitation successfully sent to ${inviteSalonName} (${inviteEmail}) by ${inviteInviter}`);
    setInviteSalonName("");
    setInviteEmail("");
    setIsAddModalOpen(false);
    setAddModalStep(1);
    setAddModalType(null);
  };

  const handleAddNewOwner = () => {
    setManualOwners(prev => [
      ...prev,
      { id: `owner-${Date.now()}-${prev.length}`, firstName: "", lastName: "" }
    ]);
  };

  const handleDeleteOwner = (id: string) => {
    if (manualOwners.length > 1) {
      setManualOwners(prev => prev.filter(o => o.id !== id));
    }
  };

  // Dropdown list mocks
  const regions = ["All regions", "Region 1", "Region 2"];
  const cities = ["All cities", "Bologna", "Milano", "Torino", "Roma", "Firenze", "Verona", "Bari"];

  // Filtered lists for dropdown search input
  const filteredRegions = regions.filter(r => r.toLowerCase().includes(regionSearch.toLowerCase()));
  const filteredCities = cities.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));

  // Rendering of details is now handled by page.tsx switcher

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Impersonation Banner */}
      {impersonatingSalon && (
        <div className="bg-[#fff3cd] border border-[#ffeeba] text-[#856404] px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
              <ImpersonateIcon />
            </div>
            <span className="text-sm font-semibold">
              Currently Impersonating: <strong className="text-amber-950 font-bold">{impersonatingSalon}</strong>
            </span>
          </div>
          <button
            onClick={() => setImpersonatingSalon(null)}
            className="text-xs font-bold bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 px-3.5 py-1.5 rounded-xl transition-all"
          >
            End Session
          </button>
        </div>
      )}

      {/* Header toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Salon Management</h1>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Refresh Data */}
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eef2f6] hover:bg-slate-50 rounded-2xl text-xs font-semibold text-slate-600 transition-all shadow-sm ${isRefreshing ? "opacity-75" : ""
              }`}
          >
            <HugeiconsIcon
              icon={GlobalRefreshIcon}
              size={14}
              className={`text-[#7e8b9b] ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh Data
          </button>

          {/* Export Data */}
          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-[#f2f1ff] hover:bg-[#e4e2ff] text-[#5e53fc] border border-[#e2dfff] rounded-2xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            {/* Export/download SVG Icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Data
          </button>

          {/* Add Salon */}
          <button
            onClick={() => {
              setAddModalStep(1);
              setAddModalType(null);
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all flex items-center gap-2"
          >
            {/* Plus Icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Salon
          </button>
        </div>
      </div>

      {/* Filters card */}
      <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">

        {/* Buttons filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Status Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span>Status</span>
              {/* Filter icon tooltip info */}
              <div className="relative group cursor-pointer">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 hover:text-slate-500">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md z-30 font-medium">
                  Advanced Filters
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Active", "Cancelled", "Trial", "Leads", "Expired"].map((status) => {
                const isActive = selectedStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-2xl border transition-all ${isActive
                        ? "border-[#5e53fc] bg-[#f9f8ff] text-[#5e53fc] shadow-sm"
                        : "border-slate-100 hover:bg-slate-50 text-slate-500"
                      }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plan Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400">Plan</span>
            <div className="flex flex-wrap gap-2">
              {["All", "Basic", "Premium", "Enterprise"].map((plan) => {
                const isActive = selectedPlan === plan;
                return (
                  <button
                    key={plan}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-2xl border transition-all ${isActive
                        ? "border-[#5e53fc] bg-[#f9f8ff] text-[#5e53fc] shadow-sm"
                        : "border-slate-100 hover:bg-slate-50 text-slate-500"
                      }`}
                  >
                    {plan}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

          {/* Region Dropdown */}
          <div className="flex flex-col gap-1.5" ref={regionRef}>
            <span className="text-xs font-semibold text-slate-400">Region</span>
            <div className="relative">
              <button
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-[#eef2f6] hover:border-slate-300 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-700 shadow-sm transition-all"
              >
                <span>{selectedRegion}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-slate-400" />
              </button>

              {isRegionDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-[#eef2f6] rounded-2xl shadow-xl z-30 p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Search box input inside */}
                  <div className="relative mb-1">
                    <input
                      type="text"
                      placeholder="Search"
                      value={regionSearch}
                      onChange={(e) => setRegionSearch(e.target.value)}
                      className="w-full border border-slate-100 focus:border-[#5e53fc] focus:outline-none rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto flex flex-col">
                    {filteredRegions.map((reg) => (
                      <button
                        key={reg}
                        onClick={() => {
                          setSelectedRegion(reg);
                          setIsRegionDropdownOpen(false);
                          setRegionSearch("");
                          setCurrentPage(1);
                        }}
                        className={`text-left w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors ${selectedRegion === reg ? "text-[#5e53fc] bg-indigo-50/40" : "text-slate-600"
                          }`}
                      >
                        {reg}
                      </button>
                    ))}
                    {filteredRegions.length === 0 && (
                      <span className="text-[10px] text-slate-400 text-center py-2 font-semibold">
                        No matches found
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* City Dropdown */}
          <div className="flex flex-col gap-1.5" ref={cityRef}>
            <span className="text-xs font-semibold text-slate-400">City</span>
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-[#eef2f6] hover:border-slate-300 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-700 shadow-sm transition-all"
              >
                <span>{selectedCity}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-slate-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-[#eef2f6] rounded-2xl shadow-xl z-30 p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Search box input inside */}
                  <div className="relative mb-1">
                    <input
                      type="text"
                      placeholder="Search"
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full border border-slate-100 focus:border-[#5e53fc] focus:outline-none rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto flex flex-col">
                    {filteredCities.map((cit) => (
                      <button
                        key={cit}
                        onClick={() => {
                          setSelectedCity(cit);
                          setIsCityDropdownOpen(false);
                          setCitySearch("");
                          setCurrentPage(1);
                        }}
                        className={`text-left w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors ${selectedCity === cit ? "text-[#5e53fc] bg-indigo-50/40" : "text-slate-600"
                          }`}
                      >
                        {cit}
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <span className="text-[10px] text-slate-400 text-center py-2 font-semibold">
                        No matches found
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Bulk selection actions bar */}
      {selectedSalonIds.length > 0 && (
        <div className="bg-[#fcfcff] border border-[#e2dfff] px-6 py-4 rounded-3xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#5e53fc]">
              {selectedSalonIds.length} salon{selectedSalonIds.length > 1 ? "s" : ""} selected
            </span>
          </div>
          <button
            onClick={handleUnselectAll}
            className="text-xs font-bold text-[#5e53fc] hover:underline"
          >
            Unselect All Salons
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={paginatedSalons.length > 0 && paginatedSalons.every(s => selectedSalonIds.includes(s.id))}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#5e53fc] border-slate-300 rounded focus:ring-[#5e53fc] cursor-pointer"
                  />
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Salon</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Plan</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Revenue</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Last Active</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Support</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-16 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedSalons.map((salon) => {
                const isChecked = selectedSalonIds.includes(salon.id);
                return (
                  <tr
                    key={salon.id}
                    className={`hover:bg-slate-50/30 transition-colors ${isChecked ? "bg-indigo-50/10" : ""
                      }`}
                  >
                    {/* Checkbox */}
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelectRow(salon.id)}
                        className="w-4 h-4 text-[#5e53fc] border-slate-300 rounded focus:ring-[#5e53fc] cursor-pointer"
                      />
                    </td>

                    {/* Salon Profile Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        {/* Avatar */}
                        <div 
                          onClick={() => setSelectedSalonId(salon.id)}
                          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs uppercase flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          {salon.name.charAt(0)}
                        </div>

                        {/* Name/Tags/Manager/City */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span 
                              onClick={() => setSelectedSalonId(salon.id)}
                              className="text-sm font-bold text-slate-800 tracking-tight leading-tight cursor-pointer hover:text-[#5e53fc] hover:underline transition-colors"
                            >
                              {salon.name}
                            </span>

                            {/* Tags */}
                            <span className="text-[9px] font-bold tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded uppercase">
                              {salon.tag}
                            </span>

                            {/* Crown VIP Badge */}
                            {salon.vip && (
                              <div className="flex items-center gap-1 bg-[#fffbe6] border border-[#ffe58f] text-[#d4b106] px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                                <CrownIcon />
                                <span>VIP Customer</span>
                              </div>
                            )}

                            {/* Star Enterprise Badge */}
                            {salon.enterprise && (
                              <div className="flex items-center gap-1 bg-[#f9f8ff] border border-[#e2dfff] text-[#5e53fc] px-1.5 py-0.5 rounded-full text-[9px] font-bold">
                                <PurpleStarIcon />
                                <span>Enterprise Customer</span>
                              </div>
                            )}
                          </div>

                          <span className="text-xs text-slate-400 mt-1 font-semibold">
                            {salon.manager} • {salon.city}
                          </span>
                          <span className="text-xs text-[#a1abb9] font-medium leading-none mt-0.5">
                            {salon.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      {salon.status === "Active" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#eefcf5] text-[#10b981] uppercase tracking-wide">
                          Active
                        </span>
                      )}
                      {salon.status === "Trial" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#e6fcf9] text-[#14b8a6] uppercase tracking-wide">
                          Trial
                        </span>
                      )}
                      {salon.status === "Cancelled" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#f1f5f9] text-[#64748b] uppercase tracking-wide">
                          Cancelled
                        </span>
                      )}
                      {salon.status === "Leads" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#f2f1ff] text-[#5e53fc] uppercase tracking-wide">
                          Leads
                        </span>
                      )}
                      {salon.status === "Past Due" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#fff0f3] text-[#f43f5e] uppercase tracking-wide">
                          Past Due
                        </span>
                      )}
                      {salon.status === "Expired" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-slate-100 text-slate-400 uppercase tracking-wide">
                          Expired
                        </span>
                      )}
                    </td>

                    {/* Plan Badge */}
                    <td className="p-4">
                      {salon.plan === "Basic" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#f3f4f6] text-[#4b5563] uppercase">
                          Basic
                        </span>
                      )}
                      {salon.plan === "Premium" && (
                        <span className="inline-flex px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#e0f2fe] text-[#0369a1] uppercase">
                          Premium
                        </span>
                      )}
                      {salon.plan === "Enterprise" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-xl bg-[#5e53fc] text-white uppercase shadow-sm">
                          <StarIcon />
                          <span>Enterprise</span>
                        </span>
                      )}
                    </td>

                    {/* Revenue */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 leading-none">{salon.revenue}</span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">LTV: {salon.ltv}</span>
                      </div>
                    </td>

                    {/* Last Active */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs">
                        <ClockIcon />
                        <span>{salon.lastActive}</span>
                      </div>
                    </td>

                    {/* Support badge */}
                    <td className="p-4">
                      {salon.hasTicket ? (
                        <span className="inline-flex px-2 py-0.5 text-[9px] font-bold rounded-full bg-rose-500 text-white uppercase tracking-wide">
                          1 ticket
                        </span>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <CheckIcon />
                        </div>
                      )}
                    </td>

                    {/* Action trigger menu */}
                    <td className="p-4 text-center relative">
                      <button
                        onClick={() => setActiveActionMenuId(activeActionMenuId === salon.id ? null : salon.id)}
                        className="p-2 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-colors inline-flex"
                      >
                        <VerticalDotsIcon />
                      </button>

                      {/* Dropdown Action Popover */}
                      {activeActionMenuId === salon.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-12 top-2 mt-1 w-44 bg-white border border-[#eef2f6] rounded-2xl shadow-xl z-20 p-2 flex flex-col gap-0.5 animate-in scale-in duration-100 origin-top-right"
                        >
                          <button
                            onClick={() => {
                              setSelectedSalonId(salon.id);
                              setActiveActionMenuId(null);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors text-left"
                          >
                            <HugeiconsIcon icon={ViewIcon} size={14} className="text-slate-400" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleImpersonate(salon.id)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors text-left"
                          >
                            <ImpersonateIcon />
                            Impersonate
                          </button>
                          <button
                            onClick={() => {
                              alert(`Viewing mails sent to: ${salon.email}`);
                              setActiveActionMenuId(null);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors text-left"
                          >
                            <HugeiconsIcon icon={Mail01Icon} size={14} className="text-slate-400" />
                            Mails Sent
                          </button>
                          <button
                            onClick={() => {
                              alert(`Password reset link dispatched for: ${salon.email}`);
                              setActiveActionMenuId(null);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors text-left"
                          >
                            <KeyIcon />
                            Reset Password
                          </button>
                          <button
                            onClick={() => {
                              alert(`Suspended salon: ${salon.name}`);
                              setActiveActionMenuId(null);
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50 rounded-xl transition-colors text-left"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                            </svg>
                            Suspend
                          </button>
                          <button
                            onClick={() => handleDeleteSalon(salon.id)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left border-t border-slate-100/60 mt-1 pt-1.5"
                          >
                            <TrashIcon />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {/* Empty state */}
              {paginatedSalons.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400 font-semibold text-sm">
                    No salons match your selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-slate-50/20 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-end gap-4 border-t border-slate-100">

          {/* Page size */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#5e53fc] cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Page count label */}
          <span className="text-xs font-semibold text-slate-500">
            {totalItems === 0 ? "0-0" : `${startIndex + 1}-${Math.min(startIndex + itemsPerPage, totalItems)}`} of {totalItems}
          </span>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || totalItems === 0}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 rounded-xl transition-colors inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </button>

            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalItems === 0}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 rounded-xl transition-colors inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalItems === 0}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 rounded-xl transition-colors inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages || totalItems === 0}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 rounded-xl transition-colors inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>

      {/* Add New Salon Modal Overlay Backdrop */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Step 1: Choice of Category */}
            {addModalStep === 1 && (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-800">Add New Salon</h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-1 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={20} />
                  </button>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Option 1: Invite Salon */}
                    <div
                      onClick={() => setAddModalType("invite")}
                      className={`border rounded-2xl p-6 flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-200 select-none ${
                        addModalType === "invite"
                          ? "border-[#5e53fc] bg-[#f9f8ff] ring-1 ring-[#5e53fc]"
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        addModalType === "invite" ? "bg-[#e2dfff] text-[#5e53fc]" : "bg-slate-50 text-slate-400"
                      }`}>
                        <HugeiconsIcon icon={Mail01Icon} size={20} />
                      </div>
                      <span className={`text-sm font-bold ${addModalType === "invite" ? "text-[#5e53fc]" : "text-slate-700"}`}>
                        Invite Salon
                      </span>
                    </div>

                    {/* Option 2: Add Salon Manually */}
                    <div
                      onClick={() => setAddModalType("manual")}
                      className={`border rounded-2xl p-6 flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-200 select-none ${
                        addModalType === "manual"
                          ? "border-[#5e53fc] bg-[#f9f8ff] ring-1 ring-[#5e53fc]"
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        addModalType === "manual" ? "bg-[#e2dfff] text-[#5e53fc]" : "bg-slate-50 text-slate-400"
                      }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                      <span className={`text-sm font-bold ${addModalType === "manual" ? "text-[#5e53fc]" : "text-slate-700"}`}>
                        Add Salon Manually
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      disabled={addModalType === null}
                      onClick={() => setAddModalStep(2)}
                      className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white disabled:bg-slate-100 disabled:text-slate-400 rounded-2xl text-xs font-semibold shadow-md transition-all inline-flex items-center gap-1.5"
                    >
                      <span>Next</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Add Salon Manually (Multi-step form wizard) */}
            {addModalStep === 2 && addModalType === "manual" && (
              <div className="flex flex-col">
                {/* Header */}
                <div className="px-8 pt-8 pb-5 border-b border-slate-100 flex flex-col relative">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="absolute right-6 top-6 p-1 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={20} />
                  </button>
                  <h3 className="text-lg font-bold text-slate-800">Add New Salon</h3>
                  <p className="text-xs font-semibold text-slate-450 mt-1">Create a new salon account and send invitation to the owner</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (manualStep < 5) {
                      // Validate and advance
                      if (manualStep === 1) {
                        if (!manualSalonName.trim()) {
                          alert("Salon Name is required.");
                          return;
                        }
                        if (!manualVtaNumber.trim()) {
                          alert("VTA Number is required.");
                          return;
                        }
                      } else if (manualStep === 2) {
                        const hasEmpty = manualOwners.some(o => !o.firstName.trim() || !o.lastName.trim());
                        if (hasEmpty) {
                          alert("Please fill in first and last name for all owners.");
                          return;
                        }
                      } else if (manualStep === 3) {
                        if (!manualEmail.trim()) {
                          alert("Email address is required.");
                          return;
                        }
                        if (!manualPhone.trim()) {
                          alert("Phone number is required.");
                          return;
                        }
                      } else if (manualStep === 4) {
                        if (manualCountry === "" || manualCity === "Select city" || manualProvince === "Select province" || !manualZip.trim()) {
                          alert("Please fill in Country, City, Province, and ZIP code.");
                          return;
                        }
                      }
                      setManualStep(prev => prev + 1);
                    } else {
                      handleAddSalonManualSubmit(e);
                    }
                  }}
                  className="px-8 pb-8 flex flex-col gap-6"
                >
                  {/* Stepper Progress Bar */}
                  <div className="flex items-center justify-between px-2 mb-4 relative mt-4">
                    {/* Background connection track */}
                    <div className="absolute left-6 right-6 top-[15px] h-[2px] bg-slate-100 -z-0" />
                    
                    {/* Filled connection track */}
                    <div 
                      className="absolute left-6 top-[15px] h-[2px] bg-[#5e53fc] transition-all duration-355 -z-0" 
                      style={{
                        width: `${((Math.min(manualStep, 5) - 1) / 4) * 100}%`
                      }}
                    />

                    {[1, 2, 3, 4, 5].map((stepNum) => {
                      const isCompleted = manualStep > stepNum;
                      const isActive = manualStep === stepNum;
                      
                      return (
                        <div key={stepNum} className="flex flex-col items-center relative z-10 flex-1">
                          {/* Step Circle */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-355 ${
                              isCompleted
                                ? "bg-[#5e53fc] text-white"
                                : isActive
                                ? "bg-white border-2 border-[#5e53fc] text-[#5e53fc] shadow-[0_0_12px_rgba(94,83,252,0.15)]"
                                : "bg-white border-2 border-slate-200 text-slate-400"
                            }`}
                          >
                            {isCompleted ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              stepNum
                            )}
                          </div>
                          
                          {/* Step Label */}
                          <span
                            className={`text-[10px] font-bold mt-2 whitespace-nowrap transition-colors duration-300 ${
                              isActive ? "text-slate-800 font-extrabold" : "text-slate-450 font-semibold"
                            }`}
                          >
                            {stepNum === 1 && "General Info"}
                            {stepNum === 2 && "Ownership"}
                            {stepNum === 3 && "Contact information"}
                            {stepNum === 4 && "Provenance"}
                            {stepNum === 5 && "Subscription type"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Wizard Step Content */}
                  <div className="mt-4 min-h-[160px]">
                    {/* Step 1: General Info */}
                    {manualStep === 1 && (
                      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">Salon Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter salon name"
                              value={manualSalonName}
                              onChange={(e) => setManualSalonName(e.target.value)}
                              className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">Business Type</label>
                            <div className="relative">
                              <select
                                value={manualBusinessType}
                                onChange={(e) => setManualBusinessType(e.target.value)}
                                className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                              >
                                <option value="Sole Proprietorship">Sole Proprietorship</option>
                                <option value="SRL">SRL</option>
                                <option value="SPA">SPA</option>
                                <option value="LLC">LLC</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">VTA Number *</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter VTA number"
                              value={manualVtaNumber}
                              onChange={(e) => setManualVtaNumber(e.target.value)}
                              className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">Number of Employees</label>
                            <div className="relative">
                              <select
                                value={manualEmployeeCount}
                                onChange={(e) => setManualEmployeeCount(e.target.value)}
                                className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                              >
                                <option value="1-5">1-5</option>
                                <option value="6-10">6-10</option>
                                <option value="11-20">11-20</option>
                                <option value="20+">20+</option>
                                <option value="10">10</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Ownership */}
                    {manualStep === 2 && (
                      <div className="flex flex-col gap-4 animate-in fade-in duration-200 max-h-[30vh] overflow-y-auto pr-1">
                        {manualOwners.map((owner, index) => (
                          <div key={owner.id} className="flex items-end gap-3 group">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">
                                  {index === 0 ? "Owner's First Name *" : `Owner's ${index + 1} First Name *`}
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Enter owner's first name"
                                  value={owner.firstName}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setManualOwners(prev => prev.map(o => o.id === owner.id ? { ...o, firstName: val } : o));
                                  }}
                                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">
                                  {index === 0 ? "Owner's Last Name *" : `Owner's ${index + 1} Last Name *`}
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Enter owner's last name"
                                  value={owner.lastName}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setManualOwners(prev => prev.map(o => o.id === owner.id ? { ...o, lastName: val } : o));
                                  }}
                                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                              </div>
                            </div>

                            {manualOwners.length > 1 && (
                              <div className="flex items-center self-end mb-1">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteOwner(owner.id)}
                                  className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors relative group"
                                  title="Delete Owner"
                                >
                                  <TrashIcon />
                                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-rose-500 text-white text-[9px] py-1 px-2.5 rounded-md whitespace-nowrap z-20 font-bold shadow-sm">
                                    Delete Owner
                                  </span>
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 3: Contact Info */}
                    {manualStep === 3 && (
                      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-600">Email address *</label>
                          <input
                            type="email"
                            required
                            placeholder="Enter email address"
                            value={manualEmail}
                            onChange={(e) => setManualEmail(e.target.value)}
                            className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-600">phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="Enter phone number"
                            value={manualPhone}
                            onChange={(e) => setManualPhone(e.target.value)}
                            className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Provenance */}
                    {manualStep === 4 && (
                      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">Country *</label>
                            <div className="relative">
                              <select
                                value={manualCountry}
                                onChange={(e) => setManualCountry(e.target.value)}
                                className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                              >
                                <option value="United States">United States</option>
                                <option value="Italy">Italy</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                                <option value="Spain">Spain</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">City *</label>
                            <div className="relative">
                              <select
                                value={manualCity}
                                onChange={(e) => setManualCity(e.target.value)}
                                className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                              >
                                <option value="Select city">Select city</option>
                                <option value="Bologna">Bologna</option>
                                <option value="Milano">Milano</option>
                                <option value="Rome">Rome</option>
                                <option value="Torino">Torino</option>
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">Province *</label>
                            <div className="relative">
                              <select
                                value={manualProvince}
                                onChange={(e) => setManualProvince(e.target.value)}
                                className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                              >
                                <option value="Select province">Select province</option>
                                <option value="Bologna">Bologna</option>
                                <option value="Milano">Milano</option>
                                <option value="Rome">Rome</option>
                                <option value="Torino">Torino</option>
                                <option value="New York">New York</option>
                                <option value="California">California</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-600">ZIP code *</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter zip code"
                              value={manualZip}
                              onChange={(e) => setManualZip(e.target.value)}
                              className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 5: Subscription type */}
                    {manualStep === 5 && (
                      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-600">Trial Period</label>
                          <div className="relative">
                            <select
                              value={manualTrialPeriod}
                              onChange={(e) => setManualTrialPeriod(e.target.value)}
                              className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                            >
                              <option value="14 days">Start with 14-day trial</option>
                              <option value="7 days">Start with 7-day trial</option>
                              <option value="30 days">Start with 30-day trial</option>
                              <option value="No trial">No trial period</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-600">Initial Plan</label>
                          <div className="relative">
                            <select
                              value={manualInitialPlan}
                              onChange={(e) => setManualInitialPlan(e.target.value as any)}
                              className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                            >
                              <option value="Basic">Basic Plan (€99/month)</option>
                              <option value="Premium">Premium Plan (€199/month)</option>
                              <option value="Enterprise">Enterprise Plan (€299/month)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Footer Actions */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                    <div>
                      {manualStep === 2 && (
                        <button
                          type="button"
                          onClick={handleAddNewOwner}
                          className="px-4 py-2 bg-[#f2f1ff] hover:bg-[#e2dfff] text-[#5e53fc] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                          <span>Add New Owner</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Only render back button if step > 1 and step < 5 */}
                      {manualStep > 1 && manualStep < 5 && (
                        <button
                          type="button"
                          onClick={() => setManualStep(prev => prev - 1)}
                          className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                        >
                          <span>Back</span>
                        </button>
                      )}

                      {manualStep < 5 ? (
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-md transition-all inline-flex items-center gap-1.5"
                        >
                          <span>Next</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all animate-in"
                        >
                          Add Salon and Send Invitation
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Invite Form */}
            {addModalStep === 2 && addModalType === "invite" && (
              <div className="flex flex-col">
                <div className="px-8 pt-8 pb-5 border-b border-slate-100 flex flex-col relative">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="absolute right-6 top-6 p-1 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={20} />
                  </button>
                  <h3 className="text-base font-bold text-slate-800">Invite Salon</h3>
                  <p className="text-xs font-semibold text-[#8a99a8] mt-1">Send invitation to the owner</p>
                </div>

                <form onSubmit={handleInviteSubmit} className="px-8 pb-8 pt-6 flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Salon's Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600">Salon's Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter salon's name"
                        value={inviteSalonName}
                        onChange={(e) => setInviteSalonName(e.target.value)}
                        className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                      />
                    </div>

                    {/* Salon's Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600">Salon's Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter salon's email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {/* Inviter */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">Inviter</label>
                    <div className="relative">
                      <select
                        value={inviteInviter}
                        onChange={(e) => setInviteInviter(e.target.value)}
                        className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                      >
                        <option value="Super admin name">Super admin name</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all animate-in"
                    >
                      Send Invitation
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
