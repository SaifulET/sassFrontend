"use client";

import React, { useState } from "react";
import Layout from "../components/Layout";
import DashboardPage from "../components/DashboardPage";
import RecentActivityPage from "../components/RecentActivityPage";
import SalonsPage from "../components/SalonsPage";
import SalonDetailPage from "../components/SalonDetailPage";
import UsersAndStaffPage from "../components/UsersAndStaffPage";
import PermissionsPage from "../components/PermissionsPage";
import BillingHistoryPage from "../components/BillingHistoryPage";
import BillingRevenuePage from "../components/BillingRevenuePage";
import AnalyticsPage from "../components/AnalyticsPage";
import SalonSettingsPage from "../components/SalonSettingsPage";
import SalonActivityPage from "../components/SalonActivityPage";
import SalonSupportPage from "../components/SalonSupportPage";
import SalonAutomationsPage from "../components/SalonAutomationsPage";
import AutomationsMailPage from "../components/AutomationsMailPage";
import WaiversPage from "../components/WaiversPage";
import SettingsPage from "../components/SettingsPage";
import SupportPage from "../components/SupportPage";
import ASPPage from "../components/ASPPage";
import LTVPage from "../components/LTVPage";
import CashflowPage from "../components/CashflowPage";
import SubscribersPage from "../components/SubscribersPage";
import LeadsPage from "../components/LeadsPage";
import TrialsPage from "../components/TrialsPage";
import ARPAPage from "../components/ARPAPage";
import ChurnPage from "../components/ChurnPage";
import CohortsPage from "../components/CohortsPage";
import MapPage from "../components/MapPage";


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

const defaultEmployees: Employee[] = [
  {
    id: "emp-1",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria@bellavista.com",
    role: "Manager",
    status: "Active",
    employmentStatus: "Currently Hired",
    lastLogin: "2 hours ago",
    dob: "12/08/1990",
    pob: "Milano (MI)",
    address: "Via Dante 45, Milano",
    contractType: "Permanent",
    taxCode: "RDGMAR90M12H501K",
    iban: "IT99A0123456789012345678901",
    startDate: "01/02/2021",
    occupation: "Barber",
    remuneration: "1.800,00 €",
    phone: "+39 333 4455667",
    emergencyName: "Carlos Rodriguez",
    emergencyPhone: "+39 333 9988776"
  },
  {
    id: "emp-2",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria@bellavista.com",
    role: "Staff",
    status: "Pending",
    employmentStatus: "Currently Hired",
    lastLogin: "2 hours ago",
    dob: "15/05/1993",
    pob: "Roma (RM)",
    address: "Via Veneto 12, Roma",
    contractType: "Temporary",
    taxCode: "RDGMAR93M15H501Z",
    iban: "IT99B0123456789012345678902",
    startDate: "10/05/2023",
    occupation: "Hairdresser",
    remuneration: "1.500,00 €",
    phone: "+39 334 1122334",
    emergencyName: "Luisa Rodriguez",
    emergencyPhone: "+39 334 5566778"
  },
  {
    id: "emp-3",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria@bellavista.com",
    role: "Staff",
    status: "Inactive",
    employmentStatus: "Out of Team: 02/02/2025",
    lastLogin: "2 hours ago",
    dob: "20/11/1988",
    pob: "Torino (TO)",
    address: "Corso Francia 99, Torino",
    contractType: "Permanent",
    taxCode: "RDGMAR88M20H501Y",
    iban: "IT99C0123456789012345678903",
    startDate: "15/09/2019",
    endDate: "02/02/2025",
    occupation: "Receptionist",
    remuneration: "1.400,00 €",
    phone: "+39 335 7788990",
    emergencyName: "Pedro Rodriguez",
    emergencyPhone: "+39 335 4433221"
  }
];

export default function Home() {
  // Navigation states: "dashboard", "recent_activity", "salons", "leads", "billing", "analytics", "automations", "support", "settings"
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateRange, setDateRange] = useState("All Time");

  // Lifted Salon Context states
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [salonSubTab, setSalonSubTab] = useState<string>("overview");
  const [activePermissionEmployeeId, setActivePermissionEmployeeId] = useState<string | null>(null);

  // Lifted Salons state
  const [salons, setSalons] = useState<Salon[]>([
    {
      id: "salon-1",
      name: "Beauty Wellness Center",
      tag: "SRL",
      manager: "Roberto Marini",
      city: "Bologna",
      region: "Region 1",
      email: "roberto@beautywellness.com",
      status: "Active",
      plan: "Premium",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: true
    },
    {
      id: "salon-2",
      name: "Bella Vista Salon",
      tag: "SRL",
      manager: "Maria Rodriguez",
      city: "Milano",
      region: "Region 1",
      email: "maria@bellavista.com",
      status: "Active",
      plan: "Premium",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: true,
      vip: true
    },
    {
      id: "salon-3",
      name: "Elite Beauty Group S.p.A.",
      tag: "SPA",
      manager: "Dr. Marco Rossi",
      city: "Milano",
      region: "Region 1",
      email: "marco.rossi@elitebeauty.com",
      status: "Active",
      plan: "Enterprise",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: false,
      enterprise: true
    },
    {
      id: "salon-4",
      name: "Glamour Lounge SRLS",
      tag: "SRL",
      manager: "Anna Bianchi",
      city: "Torino",
      region: "Region 1",
      email: "anna@glamourlounge.com",
      status: "Trial",
      plan: "Premium",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: true
    },
    {
      id: "salon-5",
      name: "Hair Art Studio",
      tag: "Ind.",
      manager: "Francesca Neri",
      city: "Roma",
      region: "Region 2",
      email: "francesca@hairartstudio.com",
      status: "Active",
      plan: "Basic",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: false
    },
    {
      id: "salon-6",
      name: "Luxury Spa & Wellness",
      tag: "SRL",
      manager: "Alessandro Costa",
      city: "Firenze",
      region: "Region 2",
      email: "alessandro@luxuryspa.com",
      status: "Cancelled",
      plan: "Premium",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: true
    },
    {
      id: "salon-7",
      name: "Modern Hair Lounge",
      tag: "Ind.",
      manager: "Chiara Fontana",
      city: "Verona",
      region: "Region 2",
      email: "chiara@modernhair.com",
      status: "Leads",
      plan: "Basic",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: false
    },
    {
      id: "salon-8",
      name: "Studio Giuseppe",
      tag: "Ind.",
      manager: "Giuseppe Verdi",
      city: "Roma",
      region: "Region 2",
      email: "giuseppe@studiogiuseppe.com",
      status: "Active",
      plan: "Basic",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: false
    },
    {
      id: "salon-9",
      name: "Trendy Cuts Studio",
      tag: "Ind.",
      manager: "Valentina Ricci",
      city: "Bari",
      region: "Region 2",
      email: "valentina@trendycuts.com",
      status: "Past Due",
      plan: "Basic",
      revenue: "299,00 €",
      ltv: "4.187,00 €",
      lastActive: "1h ago",
      hasTicket: true
    }
  ]);

  // Lifted staff state keyed by Salon ID
  const [employeesBySalon, setEmployeesBySalon] = useState<Record<string, Employee[]>>({});

  const renderContent = () => {
    // If we have selected a salon and are on the salons view:
    if (activeTab === "salons" && selectedSalonId !== null) {
      const activeSalon = salons.find((s) => s.id === selectedSalonId);
      if (activeSalon) {
        switch (salonSubTab) {
          case "overview":
            return (
              <SalonDetailPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
                onImpersonate={(name) => {
                  alert(`Currently Impersonating: ${name}`);
                }}
              />
            );
          case "users_and_staff":
            return (
              <UsersAndStaffPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
                activePermissionEmployeeId={activePermissionEmployeeId}
                setActivePermissionEmployeeId={(id) => {
                  setActivePermissionEmployeeId(id);
                  if (id) {
                    setSalonSubTab("permissions");
                  }
                }}
                setSalonSubTab={setSalonSubTab}
                employees={employeesBySalon[activeSalon.id] || defaultEmployees}
                setEmployees={(newEmployees) => {
                  setEmployeesBySalon((prev) => ({
                    ...prev,
                    [activeSalon.id]: typeof newEmployees === "function"
                      ? (newEmployees as any)(prev[activeSalon.id] || defaultEmployees)
                      : newEmployees
                  }));
                }}
              />
            );
          case "permissions":
            return (
              <PermissionsPage
                salon={activeSalon}
                employeeId={activePermissionEmployeeId}
                onBack={() => {
                  setSalonSubTab("users_and_staff");
                  setActivePermissionEmployeeId(null);
                }}
              />
            );
          case "billing":
            return (
              <BillingHistoryPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
              />
            );
          case "settings":
            return (
              <SalonSettingsPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
              />
            );
          case "activity":
            return (
              <SalonActivityPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
              />
            );
          case "support":
            return (
              <SalonSupportPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
              />
            );
          case "automations":
            return (
              <SalonAutomationsPage
                salon={activeSalon}
                onBack={() => {
                  setSelectedSalonId(null);
                  setSalonSubTab("overview");
                }}
              />
            );
          default:
            return (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center max-w-lg mx-auto my-12 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-bold text-slate-800 mb-2 capitalize">
                  Salon {salonSubTab.replace("_", " ")}
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                  This sub-view of {activeSalon.name} is currently under construction.
                </p>
                <button
                  onClick={() => setSalonSubTab("overview")}
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-2xl text-xs font-semibold transition-all shadow-md"
                >
                  Back to Overview
                </button>
              </div>
            );
        }
      }
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardPage
            onViewAllActivities={() => setActiveTab("recent_activity")}
          />
        );
      case "salons":
        return (
          <SalonsPage
            salons={salons}
            setSalons={setSalons}
            selectedSalonId={selectedSalonId}
            setSelectedSalonId={(id) => {
              setSelectedSalonId(id);
              setSalonSubTab("overview");
            }}
          />
        );
      case "recent_activity":
        return (
          <RecentActivityPage
            currentRange={dateRange}
            onRangeChange={setDateRange}
          />
        );
      case "billing":
        return (
          <BillingRevenuePage />
        );
      case "analytics":
      case "analytics_revenue_mrr_arr":
        return (
          <AnalyticsPage setActiveTab={setActiveTab} />
        );
      case "analytics_revenue_asp":
        return (
          <ASPPage setActiveTab={setActiveTab} />
        );
      case "analytics_revenue_ltv":
        return (
          <LTVPage setActiveTab={setActiveTab} />
        );
      case "analytics_revenue_cashflow":
        return (
          <CashflowPage setActiveTab={setActiveTab} />
        );
      case "analytics_customers_subscribers":
        return (
          <SubscribersPage setActiveTab={setActiveTab} />
        );
      case "analytics_customers_leads":
        return (
          <LeadsPage setActiveTab={setActiveTab} />
        );
      case "analytics_customers_trials":
        return (
          <TrialsPage setActiveTab={setActiveTab} />
        );
      case "analytics_performance_arpa":
        return (
          <ARPAPage setActiveTab={setActiveTab} />
        );
      case "analytics_performance_churn":
        return (
          <ChurnPage setActiveTab={setActiveTab} />
        );
      case "analytics_performance_cohorts":
        return (
          <CohortsPage setActiveTab={setActiveTab} />
        );
      case "analytics_performance_map":
        return (
          <MapPage setActiveTab={setActiveTab} />
        );
      case "automations":
        return (
          <AutomationsMailPage />
        );
      case "waivers":
        return (
          <WaiversPage />
        );
      case "settings":
        return (
          <SettingsPage />
        );
      case "support":
        return (
          <SupportPage />
        );

      default:
        return (
          <div className="bg-white rounded-3xl p-8 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-center max-w-lg mx-auto my-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-16 h-16 rounded-full bg-[#f2f1ff] text-[#5e53fc] flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 capitalize">
              {activeTab.replace("-", " ")} Page
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              This section is under construction. Clicking "Dashboard" in the sidebar will return you to the main dashboard page.
            </p>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-150 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedSalonId={selectedSalonId}
      setSelectedSalonId={setSelectedSalonId}
      salonSubTab={salonSubTab}
      setSalonSubTab={setSalonSubTab}
    >
      {renderContent()}
    </Layout>
  );
}
