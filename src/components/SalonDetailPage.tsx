"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowDown01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";

// Custom SVG Icons
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BasicDataIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const LocationsIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ContactsIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TaxIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const DocumentsIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const MembersIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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

interface SalonDetailPageProps {
  salon: Salon;
  onBack: () => void;
  onImpersonate: (name: string, silent?: boolean) => void;
}

export default function SalonDetailPage({ salon, onBack, onImpersonate }: SalonDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "locations" | "contacts" | "tax" | "documents" | "members">("basic");

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [isShareCapitalModalOpen, setIsShareCapitalModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [isOtherDataModalOpen, setIsOtherDataModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [salonStatus, setSalonStatus] = useState(salon.status);

  // Add Member form state
  const [memberFormName, setMemberFormName] = useState("");
  const [memberFormType, setMemberFormType] = useState("Natural Person");
  const [memberFormRole, setMemberFormRole] = useState("Sole Director");
  const [memberFormPossession, setMemberFormPossession] = useState("100%");
  const [memberFormCfPiva, setMemberFormCfPiva] = useState("");
  const [memberFormDob, setMemberFormDob] = useState("");
  const [memberFormPob, setMemberFormPob] = useState("");
  const [memberFormResidence, setMemberFormResidence] = useState("");

  // Share Capital state
  const [subscribedCapital, setSubscribedCapital] = useState("€ 10.000");
  const [paidUpCapital, setPaidUpCapital] = useState("€ 10.000");
  const [companyDuration, setCompanyDuration] = useState("Indefinite period");
  const [shareDivision, setShareDivision] = useState("Quote ordinarie");

  // Main Contacts state
  const [contactPec, setContactPec] = useState("info@beautywellnesscenter.pec.it");
  const [contactEmail, setContactEmail] = useState(salon.email);
  const [contactLandline, setContactLandline] = useState("+39 051 3333 4444");
  const [contactMobile, setContactMobile] = useState("+39 339 3333 4444");
  const [contactWebsite, setContactWebsite] = useState("https://beautywellnesscenter.com");

  // Bank Details state
  const [bankIban, setBankIban] = useState("IT60 X054 2811 1010 0000 0123 456");
  const [bankName, setBankName] = useState("Intesa Sanpaolo Bank");
  const [bankBic, setBankBic] = useState("BCITITMM");

  // Financial Indicators state
  const [turnover, setTurnover] = useState("€ 450,000");

  // Other Data state
  const [investedCapital, setInvestedCapital] = useState("€ 15,000");

  // Activity state
  const [primaryAteco, setPrimaryAteco] = useState("96.02.01 - Barber and hairdressing services");
  const [secondaryAteco, setSecondaryAteco] = useState("96.02.02 - Beauty salon services");
  const [corporateObject, setCorporateObject] = useState("Beauty and wellness activities with hairdressing and beauty center services");

  // Edit form state
  const [editName, setEditName] = useState(salon.name);
  const [editBusinessType, setEditBusinessType] = useState(salon.tag === "SPA" ? "SPA" : salon.tag === "SRL" ? "SRL" : "Sole Proprietorship");
  const [editVtaNumber, setEditVtaNumber] = useState("IT44556677889");
  const [editEmployees, setEditEmployees] = useState("12");
  const [editOwnerFirst, setEditOwnerFirst] = useState(salon.manager.split(" ")[0] || "Roberto");
  const [editOwnerLast, setEditOwnerLast] = useState(salon.manager.split(" ").slice(1).join(" ") || "Marini");
  const [editEmail, setEditEmail] = useState(salon.email);
  const [editPhone, setEditPhone] = useState("+39 02 1234 5678");
  const [editCountry, setEditCountry] = useState("Italy");
  const [editCity, setEditCity] = useState(salon.city);
  const [editProvince, setEditProvince] = useState(salon.city);
  const [editZip, setEditZip] = useState("40126");
  const [editPlan, setEditPlan] = useState<"Basic" | "Premium" | "Enterprise">(salon.plan);
  const [editNotes, setEditNotes] = useState("VIP customer, very engaged with support team");

  // Payment form state
  const [payMethod, setPayMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("4321 0000 0000 1234");
  const [payExpiry, setPayExpiry] = useState("12/28");
  const [payCvc, setPayCvc] = useState("123");
  const [payProvider, setPayProvider] = useState("Visa");
  const [payCurrency, setPayCurrency] = useState("Euro €");

  const [paymentMethods, setPaymentMethods] = useState([
    { id: "pay-1", type: "Visa ending in ****1234", provider: "visa", isDefault: true }
  ]);

  // Location form state
  const [locEmployees, setLocEmployees] = useState("10");
  const [locEmail, setLocEmail] = useState("bologna@beautywellness.com");
  const [locPhone, setLocPhone] = useState("+39 051 9876543");
  const [locAddress, setLocAddress] = useState("Independence Street 567");
  const [locCountry, setLocCountry] = useState("Italy");
  const [locCity, setLocCity] = useState("Bologna");
  const [locProvince, setLocProvince] = useState("Bologna (BO)");
  const [locZip, setLocZip] = useState("40126");

  const [locations, setLocations] = useState([
    {
      id: "loc-1",
      name: "Legal Address",
      address: "Independence Street 567",
      zip: "40126",
      city: "Bologna",
      province: "Bologna (BO)",
      country: "Italy",
      registrationDate: "03/14/2020",
      isHQ: true
    },
    {
      id: "loc-2",
      name: "Operational Address",
      address: "Independence Street 567",
      zip: "40126",
      city: "Bologna",
      province: "Bologna (BO)",
      country: "Italy",
      registrationDate: "03/14/2020",
      isHQ: true
    }
  ]);

  // Documents state
  interface DocumentItem {
    id: string;
    title: string;
    size: string;
    type: string;
    updated: string;
    fileUrl?: string;
  }

  const [documentsList, setDocumentsList] = useState<DocumentItem[]>([
    { id: "doc-1", title: "Articles of Association", size: "2.1 MB", type: "PDF", updated: "March 15, 2020" },
    { id: "doc-2", title: "Chamber of Commerce Certificate", size: "2.1 MB", type: "PDF", updated: "March 15, 2020" },
    { id: "doc-3", title: "2023 Budget", size: "2.1 MB", type: "PDF", updated: "March 15, 2020" },
    { id: "doc-4", title: "ISO 9001 Certified", size: "2.1 MB", type: "PDF", updated: "March 15, 2020" },
    { id: "doc-5", title: "Minutes of the Meeting", size: "2.1 MB", type: "PDF", updated: "March 15, 2020" },
    { id: "doc-6", title: "2023 Management Report", size: "2.1 MB", type: "PDF", updated: "March 15, 2020" }
  ]);

  // Members state
  const [membersList, setMembersList] = useState([
    {
      id: "mem-1",
      name: "Roberto Marini",
      company: "Beauty Wellness Center",
      cfPiva: "RSSMRA85M01H501Z",
      type: "Natural Person",
      possession: "100%",
      role: "Sole Director",
      dob: "01/03/1985",
      pob: "Milan (MI)",
      residence: "Via Giuseppe Verdi 123, 20121 Milan (MI)",
      appointmentDate: "15/03/2020"
    }
  ]);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    salon.name = editName;
    salon.manager = `${editOwnerFirst} ${editOwnerLast}`;
    salon.email = editEmail;
    salon.city = editCity;
    salon.plan = editPlan;
    setIsEditModalOpen(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastFour = cardNumber.replace(/\s/g, "").slice(-4) || "1234";
    setPaymentMethods(prev => [
      ...prev,
      {
        id: `pay-${Date.now()}`,
        type: `${payProvider} ending in ****${lastFour}`,
        provider: payProvider.toLowerCase(),
        isDefault: false
      }
    ]);
    setIsPaymentModalOpen(false);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocations(prev => [
      ...prev,
      {
        id: `loc-${Date.now()}`,
        name: "Secondary Branch",
        address: locAddress,
        zip: locZip,
        city: locCity,
        province: locProvince,
        country: locCountry,
        registrationDate: new Date().toLocaleDateString(),
        isHQ: false
      }
    ]);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in duration-300">
      
      {/* Top Header Breadcrumbs Card */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex items-center justify-between w-full">
        <div className="text-base font-bold leading-none tracking-normal text-[#1f2937]">
          {salon.name}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button onClick={onBack} className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors inline-flex">
            <HomeIcon />
          </button>
          <span className="text-slate-300">/</span>
          <button onClick={onBack} className="bg-[#e4e2ff] text-[#5e53fc] px-3 py-1 rounded-full text-[10px] font-extrabold transition-all hover:bg-[#d8d5ff]">
            Salon Beauty
          </button>
        </div>
      </div>

      {/* Main Profile Cover Card */}
      <div className="w-full min-w-0 bg-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)] rounded-[12px] flex flex-col items-start p-0 gap-[30px] z-0 relative overflow-hidden">
        
        {/* User Heading Container */}
        <div className="flex flex-col items-start p-0 w-full lg:h-[533px] md:h-auto self-stretch flex-shrink-0 relative">
          
          {/* Cover Picture */}
          <div 
            className="h-[330px] bg-cover bg-center w-full self-stretch flex-shrink-0 mb-[-88px] relative z-0" 
            style={{ backgroundImage: "url('/bg-main.png')" }}
          />          {/* Profile Details Row: Stats (Left), Avatar & Name (Middle), Button (Right) */}
          <div className="flex flex-col md:flex-row md:flex-nowrap flex-wrap items-center md:items-end justify-between p-4 md:p-[30px] gap-[20px] md:gap-[30px] w-full self-stretch flex-shrink-0 md:h-auto relative z-10 bg-transparent">
            
            {/* Left Column: Stats */}
            <div className="flex flex-row flex-nowrap items-start content-start p-0 gap-[6px] md:gap-[30px] w-full md:flex-1 min-w-[264px] h-auto md:h-auto order-2 md:order-1 justify-center md:justify-start">
              {/* posts */}
              <div className="flex flex-col items-center p-0 gap-[12px] w-[82px] md:w-[95.33px] flex-grow">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6 text-[#29343D] flex-shrink-0">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex flex-col items-center p-0 gap-[4px] w-full max-w-[95px] h-[50px] flex-shrink-0">
                  <span className="w-auto h-[26px] font-manrope font-semibold text-lg md:text-[22px] leading-[120%] text-center text-[#29343D] flex-shrink-0">{editEmployees}</span>
                  <span className="w-full h-[20px] font-manrope font-normal text-[10px] md:text-[14px] leading-[20px] text-center text-[#98A4AE] flex-shrink-0">Staff Members</span>
                </div>
              </div>

              {/* followers */}
              <div className="flex flex-col justify-between items-center p-0 gap-[12px] w-[82px] md:w-[95.33px] flex-grow">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6 text-[#29343D] mx-auto flex-shrink-0">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex flex-col items-center p-0 gap-[4px] w-full max-w-[113px] h-[50px] mx-auto flex-shrink-0">
                  <span className="w-auto h-[26px] font-manrope font-semibold text-lg md:text-[22px] leading-[120%] text-center text-[#29343D] flex-shrink-0">€ 299</span>
                  <span className="w-full h-[20px] font-manrope font-normal text-[10px] md:text-[14px] leading-[20px] text-center text-[#98A4AE] flex-shrink-0">Monthly Payment</span>
                </div>
              </div>

              {/* following */}
              <div className="flex flex-col items-center p-0 gap-[12px] w-[82px] md:w-[95.33px] flex-grow">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6 text-[#1C274C] flex-shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex flex-col items-center p-0 gap-[4px] w-full max-w-[78px] h-[50px] flex-shrink-0">
                  <span className="w-auto h-[26px] font-manrope font-semibold text-lg md:text-[22px] leading-[120%] text-center text-[#29343D] flex-shrink-0">{salon.lastActive}</span>
                  <span className="w-full h-[20px] font-manrope font-normal text-[10px] md:text-[14px] leading-[20px] text-center text-[#98A4AE] flex-shrink-0">Last Active</span>
                </div>
              </div>
            </div>

            {/* Middle Column: Avatar & Details (centered) */}
            <div className="flex flex-col items-center p-0 gap-[16px] w-full md:flex-1 min-w-[116px] h-auto md:h-auto relative z-10 order-1 md:order-2">
              {/* Avatar container */}
              <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[102px] self-stretch flex-shrink-0">
                <div className="w-[102px] h-[102px] relative flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-md">
                  <img 
                    src="/ball.png" 
                    alt="Salon Avatar Ball" 
                    className="w-[94px] h-[94px] rounded-full object-cover" 
                  />
                </div>
              </div>

              {/* Centered Salon Details */}
              <div className="flex flex-col items-center p-0 gap-[8px] w-full h-auto self-stretch flex-shrink-0">
                <h2 className="w-full h-auto font-manrope font-semibold text-[18px] leading-snug text-center text-[#29343D]">{salon.name}</h2>
                <p className="w-[183px] h-auto font-manrope font-normal text-[14px] leading-[20px] text-center text-[#98A4AE]">Member Since: Aug 22, 2025</p>
                <p className="w-full h-auto font-manrope font-normal text-[14px] leading-[20px] text-center text-[#98A4AE]">{salon.city}, Italy</p>
                
                <div className="flex flex-row justify-center items-start p-0 gap-[8px] w-auto h-[24px] flex-shrink-0">
                  {/* Dynamic Status Badge */}
                  {salonStatus === "Active" && (
                    <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-[#EBFAF0] rounded-[999px] flex-shrink-0 justify-center">
                      <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-[#36C76C] text-center whitespace-nowrap">Active</span>
                    </div>
                  )}
                  {salonStatus === "Trial" && (
                    <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-[#e6fcf9] rounded-[999px] flex-shrink-0 justify-center">
                      <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-[#14b8a6] text-center whitespace-nowrap">Trial</span>
                    </div>
                  )}
                  {salonStatus === "Cancelled" && (
                    <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-[#f1f5f9] rounded-[999px] flex-shrink-0 justify-center">
                      <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-[#64748b] text-center whitespace-nowrap">Cancel</span>
                    </div>
                  )}
                  {salonStatus === "Leads" && (
                    <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-[#f2f1ff] rounded-[999px] flex-shrink-0 justify-center">
                      <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-[#5e53fc] text-center whitespace-nowrap">Leads</span>
                    </div>
                  )}
                  {salonStatus === "Past Due" && (
                    <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-[#fff0f3] rounded-[999px] flex-shrink-0 justify-center">
                      <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-[#f43f5e] text-center whitespace-nowrap">Due</span>
                    </div>
                  )}
                  {salonStatus === "Expired" && (
                    <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-slate-100 rounded-[999px] flex-shrink-0 justify-center">
                      <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-slate-400 text-center whitespace-nowrap">Exp</span>
                    </div>
                  )}
                  {/* Plan Badge */}
                  <div className="flex flex-row items-center px-[6px] py-[2px] md:px-[8px] md:py-[4px] gap-[10px] w-auto h-auto md:h-[24px] bg-[#D2F4F2] rounded-[8px] flex-shrink-0 justify-center">
                    <span className="w-auto h-auto md:h-[16px] font-manrope font-medium text-[10px] md:text-[12px] leading-[16px] text-[#29343D] text-center whitespace-nowrap">{salon.plan}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Impersonate Button */}
            <div className="flex flex-row flex-nowrap justify-center md:justify-end items-center content-end p-0 gap-[16px] w-full md:flex-1 min-w-[155px] h-[44px] order-3 md:order-3">
              <button 
                onClick={() => {
                  setIsReactivateModalOpen(true);
                }}
                className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[10px] w-[155px] h-[44px] bg-[#DDDBFF] rounded-[8px] hover:bg-[#d0cdff] transition-all flex-shrink-0"
              >
                <span className="w-[123px] h-[24px] font-manrope font-medium text-[14px] text-center leading-[24px] text-[#635BFF] flex items-center justify-center">Impersonate Salon</span>
              </button>
            </div>

          </div>

        </div>

        <div 
          className="flex flex-row flex-nowrap justify-start lg:justify-center items-center px-0 md:px-[16px] gap-0 md:gap-[16px] w-full h-[48px] bg-[#DDDBFF] rounded-none self-stretch flex-shrink-0 overflow-x-auto"
        >
          {[
            { id: "basic", label: "Basic Data", icon: BasicDataIcon, width: "w-1/3 md:w-[126px]" },
            { id: "locations", label: "Locations", icon: LocationsIcon, width: "w-1/3 md:w-[121px]" },
            { id: "contacts", label: "Contacts", icon: ContactsIcon, width: "w-1/3 md:w-[118px]" },
            { id: "tax", label: "Tax and Banking", icon: TaxIcon, width: "w-1/3 md:w-[162px]" },
            { id: "documents", label: "Documents", icon: DocumentsIcon, width: "w-1/3 md:w-[133px]" },
            { id: "members", label: "Members", icon: MembersIcon, width: "w-1/3 md:w-[118px]" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`h-full flex flex-row items-center justify-center px-1.5 py-3 md:p-[12px] gap-1 md:gap-[8px] ${tab.width} flex-shrink-0 transition-all border-b-2 rounded-none ${
                  isActive
                    ? "border-[#635BFF] text-[#635BFF]"
                    : "border-transparent text-[#29343D] hover:bg-black/5"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 md:w-6 md:h-6 flex-shrink-0 ${isActive ? "text-[#635BFF]" : "text-[#29343D]"}`} />
                <span className={`font-manrope font-medium text-[11px] md:text-[14px] leading-tight md:leading-[24px] text-center whitespace-nowrap ${
                  isActive ? "text-[#635BFF]" : "text-[#29343D]"
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Conditional Panels */}
      <div className="grid grid-cols-1 gap-6">

        {/* Panel 1: Basic Data */}
        {activeTab === "basic" && (
          <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
            
            {/* Row 1: Identification Data (Left) & Share Capital (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Identification Data Box */}
              <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-800">Identification Data</h3>
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                  >
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Name</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{salon.name} S.R.L.</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Legal Form</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{editBusinessType}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VAT number</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{editVtaNumber}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Tax Code</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{editVtaNumber}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PEC</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">info@beautywellnesscenter.pec.it</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SDI Recipient Code</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">BWC2023</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">REA Number</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">BO-3344556</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chamber of Commerce Office</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">Bologna</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date of Constitution</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">14/03/2020</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Term</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">Indefinite period</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{salon.manager}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                    <span className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Share Capital Box */}
              <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-800">Share Capital</h3>
                  <button 
                    onClick={() => setIsShareCapitalModalOpen(true)}
                    className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                  >
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subscribed Capital</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{subscribedCapital}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paid-up Capital</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{paidUpCapital}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Duration</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{companyDuration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Share Division</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{shareDivision}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 2: Subscription Payment Method Box (Full width) */}
            {(() => {
              const defaultMethod = paymentMethods.find(m => m.isDefault) || paymentMethods[0];
              return (
                <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5 relative">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-800">Subscription Payment Method</h3>
                    
                    <div className="flex items-center gap-2">
                      {/* Plus Button */}
                      <button 
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="w-8 h-8 flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-[#5e53fc] rounded-lg transition-all"
                        title="Add Payment Method"
                      >
                        <PlusIcon />
                      </button>
                      {/* Trash Button */}
                      <button 
                        onClick={() => {
                          if (paymentMethods.length > 1) {
                            const activeMethod = paymentMethods.find(m => m.isDefault) || paymentMethods[0];
                            setPaymentMethods(prev => prev.filter(p => p.id !== activeMethod.id));
                          } else {
                            alert("Cannot delete the only payment method.");
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg transition-all"
                        title="Delete Payment Method"
                      >
                        <TrashIcon />
                      </button>
                      {/* Mark as Default Button with Tooltip */}
                      <div className="relative group">
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20">
                          <span className="bg-[#00c9db] text-white text-[9px] font-extrabold px-2 py-1 rounded-md whitespace-nowrap shadow-sm">
                            Mark as default
                          </span>
                          <span className="w-2.5 h-2.5 bg-[#00c9db] rotate-45 -mt-1.5" />
                        </div>
                        <button 
                          className="w-8 h-8 flex items-center justify-center bg-[#e6fcf9] hover:bg-[#d0faf4] text-[#0d9488] rounded-lg transition-all"
                        >
                          <CheckIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default payment method</span>
                        <span className="text-xs font-semibold text-slate-700 mt-1">{defaultMethod?.type || "Visa ending in ****1234"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billing currency</span>
                        <span className="text-xs font-semibold text-slate-700 mt-1">Euro €</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment provider being used</span>
                      <div className="mt-2.5">
                        <div className="w-[50px] h-[30px] bg-[#0f172a] rounded-md flex flex-col items-center justify-center p-1 shadow-sm border border-slate-700">
                          <span className="text-[10px] font-extrabold text-blue-400 italic tracking-wider uppercase">{defaultMethod?.provider || "visa"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Row 3: Activity Box (Full width) */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Activity</h3>
                <button 
                  onClick={() => setIsActivityModalOpen(true)}
                  className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                >
                  <EditIcon />
                  <span>Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary ATECO Code</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{primaryAteco}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secondary ATECO Codes</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{secondaryAteco}</span>
                </div>
                <div className="flex flex-col col-span-1 md:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description of Corporate Object</span>
                  <span className="text-xs font-semibold text-slate-600 mt-1 leading-relaxed">
                    {corporateObject}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Panel 2: Locations */}
        {activeTab === "locations" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Headquarters block */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Company Headquarters</h3>
                
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="px-4 py-2 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <PlusIcon />
                  <span>Add Location</span>
                </button>
              </div>

              {/* Render HQ Locations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.filter(l => l.isHQ).map((loc) => (
                  <div key={loc.id} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/10 flex flex-col relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-800">{loc.name}</span>
                      <span className="text-[8px] bg-indigo-50 text-[#5e53fc] px-1.5 py-0.5 rounded font-extrabold uppercase">
                        Principal
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 text-xs mt-1">
                      <div className="flex flex-col col-span-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Address</span>
                        <span className="text-slate-700 font-semibold mt-0.5">{loc.address}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">CAP</span>
                        <span className="text-slate-700 font-semibold mt-0.5">{loc.zip}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">City</span>
                        <span className="text-slate-700 font-semibold mt-0.5">{loc.city}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Province</span>
                        <span className="text-slate-700 font-semibold mt-0.5">{loc.province}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Nation</span>
                        <span className="text-slate-700 font-semibold mt-0.5">{loc.country}</span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Registration Date</span>
                        <span className="text-slate-700 font-semibold mt-0.5">{loc.registrationDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Branches block */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Secondary Branches</h3>
              </div>

              {locations.filter(l => !l.isHQ).length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mb-4">
                    {/* Shop / Building outline SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">No registered branch offices</h4>
                  <p className="text-slate-400 text-xs mt-1 mb-6">Additional operating locations will be displayed here</p>
                  
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="px-5 py-2.5 bg-[#f2f1ff] hover:bg-[#e2dfff] text-[#5e53fc] rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Add First Secondary Branch
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {locations.filter(l => !l.isHQ).map((loc) => (
                    <div key={loc.id} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/10 flex flex-col relative group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-800">{loc.name}</span>
                        <button
                          onClick={() => setLocations(prev => prev.filter(l => l.id !== loc.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 text-xs mt-1">
                        <div className="flex flex-col col-span-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Address</span>
                          <span className="text-slate-700 font-semibold mt-0.5">{loc.address}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">CAP</span>
                          <span className="text-slate-700 font-semibold mt-0.5">{loc.zip}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">City</span>
                          <span className="text-slate-700 font-semibold mt-0.5">{loc.city}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Province</span>
                          <span className="text-slate-700 font-semibold mt-0.5">{loc.province}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Nation</span>
                          <span className="text-slate-700 font-semibold mt-0.5">{loc.country}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Panel 3: Contacts */}
        {activeTab === "contacts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {/* Main Contacts */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Main Contacts</h3>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                >
                  <EditIcon />
                  <span>Edit</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PEC</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{contactPec}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ordinary Email</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{contactEmail}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Landline Phone</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{contactLandline}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobile Phone</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{contactMobile}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website</span>
                  <a 
                    href={contactWebsite} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-bold text-[#5e53fc] hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    {contactWebsite}
                  </a>
                </div>
              </div>
            </div>

            {/* Electronic Invoicing */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Electronic Invoicing</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SDI Recipient Code</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">BWC2023</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tax Regime</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">RF01 - Ordinary</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customs Office Code</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">Not applicable</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 4: Tax and Banking */}
        {activeTab === "tax" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bank Details */}
              <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-800">Bank Details</h3>
                  <button 
                    onClick={() => setIsBankModalOpen(true)}
                    className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                  >
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company IBAN</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1 tracking-wider">{bankIban}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Supporting Bank</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{bankName}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BIC/SWIFT</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{bankBic}</span>
                  </div>
                </div>
              </div>

              {/* Financial Indicators */}
              <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-800">Financial Indicators</h3>
                  <button 
                    onClick={() => setIsFinancialModalOpen(true)}
                    className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                  >
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Year's Turnover</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{turnover}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Number of Employees</span>
                    <span className="text-xs font-semibold text-slate-700 mt-1">{editEmployees}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Plan</span>
                    <span className="inline-flex max-w-fit px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-[#D2F4F2] text-[#29343D] uppercase tracking-wide mt-1.5 font-bold">
                      {editPlan}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Data */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5 w-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Other Data</h3>
                <button 
                  onClick={() => setIsOtherDataModalOpen(true)}
                  className="text-[#5e53fc] hover:underline text-xs font-bold flex items-center gap-1"
                >
                  <EditIcon />
                  <span>Edit</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invested Capital</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">{investedCapital}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certifications</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
                      ISO 9001:2015
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-md">
                      GDPR Compliant
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Free Notes</span>
                  <span className="text-xs font-semibold text-slate-600 mt-1.5 leading-relaxed">{editNotes}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 5: Documents */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800">Company Documentation</h3>
              
              <input 
                type="file" 
                id="file-upload-input" 
                style={{ display: "none" }} 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
                    const ext = file.name.split(".").pop()?.toUpperCase() || "PDF";
                    const fileUrl = URL.createObjectURL(file);
                    setDocumentsList(prev => [
                      ...prev,
                      {
                        id: `doc-${Date.now()}`,
                        title: file.name,
                        size: sizeInMB,
                        type: ext,
                        updated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                        fileUrl: fileUrl
                      }
                    ]);
                  }
                }}
              />

              <button 
                onClick={() => document.getElementById("file-upload-input")?.click()}
                className="px-4 py-2 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <PlusIcon />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentsList.map((doc) => (
                <div key={doc.id} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/10 flex flex-col items-center text-center relative hover:shadow-sm transition-all group">
                  {/* File Icon circle */}
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#5e53fc] flex items-center justify-center mb-3.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">{doc.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{doc.type} • {doc.size}</span>
                  <span className="text-[10px] font-semibold text-slate-400 mb-5">Updated: {doc.updated}</span>

                  {/* Actions row */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => window.open(doc.fileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank")}
                      className="w-8 h-8 rounded-full bg-indigo-50 text-[#5e53fc] hover:bg-indigo-100 transition-colors flex items-center justify-center"
                      title="View"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setDocumentsList(prev => prev.filter(d => d.id !== doc.id))}
                      className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors flex items-center justify-center"
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                    <button 
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = doc.fileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
                        link.download = doc.title;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center"
                      title="Download"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel 6: Members */}
        {activeTab === "members" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Staff Details table block */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-4">
                <h3 className="text-sm font-bold text-slate-800">Staff Details</h3>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2 pr-10 text-xs font-semibold text-slate-650 bg-white appearance-none cursor-pointer">
                      <option value="all">All Salons</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={12} />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setEditingMemberId(null);
                      setMemberFormName("");
                      setMemberFormType("Natural Person");
                      setMemberFormRole("Sole Director");
                      setMemberFormPossession("100%");
                      setMemberFormCfPiva("");
                      setMemberFormDob("");
                      setMemberFormPob("");
                      setMemberFormResidence("");
                      setIsAddMemberModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <PlusIcon />
                    <span>Add Member</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pt-1 pl-2">Name and Surname</th>
                      <th className="pb-3 pt-1">CF/P.IVA</th>
                      <th className="pb-3 pt-1">Type</th>
                      <th className="pb-3 pt-1">% Possession</th>
                      <th className="pb-3 pt-1">Role</th>
                      <th className="pb-3 pt-1 text-right pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {membersList.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 pl-2 font-bold text-slate-800">{m.name}</td>
                        <td className="py-3.5 font-semibold text-slate-500">{m.cfPiva}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 font-semibold rounded bg-slate-50 border border-slate-200 text-[9px] text-slate-500">
                            {m.type}
                          </span>
                        </td>
                        <td className="py-3.5 font-bold text-slate-750">{m.possession}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 font-bold rounded-md bg-indigo-50 text-[#5e53fc] text-[9px] uppercase tracking-wide">
                            {m.role}
                          </span>
                        </td>
                        <td className="py-3.5 text-right pr-4">
                          <button
                            onClick={() => setSelectedMember(m)}
                            className="w-8 h-8 rounded-full bg-indigo-50 text-[#5e53fc] hover:bg-indigo-100 transition-colors inline-flex items-center justify-center"
                            title="View Details"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Majority Shareholder Detail */}
            <div className="bg-white rounded-3xl p-6 border border-[#eef2f6] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-5 w-full">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Majority Shareholder Detail</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name and Surname</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">Roberto Marini</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tax ID code</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">RSSMRA85M01H501Z</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date of birth</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">01/03/1985</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Place of birth</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">Milan (MI)</span>
                </div>
                <div className="flex flex-col col-span-1 md:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Residence</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">Via Giuseppe Verdi 123, 20121 Milan (MI)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Appointment Date</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">15/03/2020</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ownership Percentage</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1">100%</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Edit Salon Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Salon</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Salon Name *</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Business Type</label>
                  <div className="relative">
                    <select
                      value={editBusinessType}
                      onChange={e => setEditBusinessType(e.target.value)}
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
                    value={editVtaNumber}
                    onChange={e => setEditVtaNumber(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Number of Employees</label>
                  <div className="relative">
                    <select
                      value={editEmployees}
                      onChange={e => setEditEmployees(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="12">12</option>
                      <option value="20+">20+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Owner's First Name *</label>
                  <input
                    type="text"
                    required
                    value={editOwnerFirst}
                    onChange={e => setEditOwnerFirst(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Owner's Last Name *</label>
                  <input
                    type="text"
                    required
                    value={editOwnerLast}
                    onChange={e => setEditOwnerLast(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Country *</label>
                  <div className="relative">
                    <select
                      value={editCountry}
                      onChange={e => setEditCountry(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Italy">Italy</option>
                      <option value="France">France</option>
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
                      value={editCity}
                      onChange={e => setEditCity(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Bologna">Bologna</option>
                      <option value="Milano">Milano</option>
                      <option value="Rome">Rome</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Province *</label>
                  <div className="relative">
                    <select
                      value={editProvince}
                      onChange={e => setEditProvince(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Select province">Select province</option>
                      <option value="Bologna">Bologna</option>
                      <option value="Milano">Milano</option>
                      <option value="Rome">Rome</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">ZIP code *</label>
                  <input
                    type="text"
                    required
                    value={editZip}
                    onChange={e => setEditZip(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Initial Plan</label>
                  <div className="relative">
                    <select
                      value={editPlan}
                      onChange={e => setEditPlan(e.target.value as any)}
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

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Internal Notes</label>
                <textarea
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  rows={3}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Add Payment Method</h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Payment method *</label>
                <div className="relative">
                  <select
                    value={payMethod}
                    onChange={e => setPayMethod(e.target.value)}
                    className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                  >
                    <option value="Credit Card">Credit Card</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Card Number *</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Expiration *</label>
                  <input
                    type="text"
                    required
                    value={payExpiry}
                    onChange={e => setPayExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">CVC *</label>
                  <input
                    type="text"
                    required
                    value={payCvc}
                    onChange={e => setPayCvc(e.target.value)}
                    placeholder="CVC"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Payment provider being used</label>
                <div className="relative">
                  <select
                    value={payProvider}
                    onChange={e => setPayProvider(e.target.value)}
                    className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Billing currency</label>
                <div className="relative">
                  <select
                    value={payCurrency}
                    onChange={e => setPayCurrency(e.target.value)}
                    className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                  >
                    <option value="Euro €">Euro €</option>
                    <option value="US Dollar $">US Dollar $</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Add Location</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form onSubmit={handleLocationSubmit} className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Number of Employees</label>
                <div className="relative">
                  <select
                    value={locEmployees}
                    onChange={e => setLocEmployees(e.target.value)}
                    className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                  >
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="10">10</option>
                    <option value="20+">20+</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={locEmail}
                    onChange={e => setLocEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={locPhone}
                    onChange={e => setLocPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Address *</label>
                <input
                  type="text"
                  required
                  value={locAddress}
                  onChange={e => setLocAddress(e.target.value)}
                  placeholder="Enter address"
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Country *</label>
                  <div className="relative">
                    <select
                      value={locCountry}
                      onChange={e => setLocCountry(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="Italy">Italy</option>
                      <option value="France">France</option>
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
                      value={locCity}
                      onChange={e => setLocCity(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Select city">Select city</option>
                      <option value="Bologna">Bologna</option>
                      <option value="Milano">Milano</option>
                      <option value="Rome">Rome</option>
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
                      value={locProvince}
                      onChange={e => setLocProvince(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Select province">Select province</option>
                      <option value="Bologna">Bologna (BO)</option>
                      <option value="Milano">Milano (MI)</option>
                      <option value="Rome">Rome (RM)</option>
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
                    value={locZip}
                    onChange={e => setLocZip(e.target.value)}
                    placeholder="Enter zip code"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Add Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">View Member</h3>
              <button onClick={() => setSelectedMember(null)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
              
              {/* Member Profile Header Card */}
              <div className="flex items-center gap-4 bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                {/* Person avatar circle */}
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#5e53fc] font-bold flex items-center justify-center text-sm">
                  {selectedMember.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-800">{selectedMember.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{selectedMember.company}</span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-md bg-slate-100 text-slate-500 uppercase tracking-wide">
                      {selectedMember.type}
                    </span>
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-md bg-indigo-55 text-[#5e53fc] uppercase tracking-wide">
                      {selectedMember.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* General Information */}
              <div className="border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">General Information</h5>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date of birth</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{selectedMember.dob}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Place of birth</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{selectedMember.pob}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Residence</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{selectedMember.residence}</span>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">Business Information</h5>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Appointment Date</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{selectedMember.appointmentDate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ownership Percentage</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{selectedMember.possession}</span>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">CF/P.IVA</span>
                    <span className="text-slate-700 font-semibold mt-0.5">{selectedMember.cfPiva}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center gap-3">
              <button
                onClick={() => {
                  setMemberFormName(selectedMember.name);
                  setMemberFormType(selectedMember.type);
                  setMemberFormRole(selectedMember.role);
                  setMemberFormPossession(selectedMember.possession);
                  setMemberFormCfPiva(selectedMember.cfPiva);
                  if (selectedMember.dob && selectedMember.dob.includes("/")) {
                    const parts = selectedMember.dob.split("/");
                    if (parts.length === 3) {
                      setMemberFormDob(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
                    } else {
                      setMemberFormDob("");
                    }
                  } else {
                    setMemberFormDob(selectedMember.dob || "");
                  }
                  setMemberFormPob(selectedMember.pob || "");
                  setMemberFormResidence(selectedMember.residence || "");
                  setEditingMemberId(selectedMember.id);
                  setIsAddMemberModalOpen(true);
                  setSelectedMember(null);
                }}
                className="px-5 py-2.5 bg-indigo-50 text-[#5e53fc] hover:bg-indigo-100 rounded-xl text-xs font-bold transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedMember(null);
                }}
                className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition-all"
              >
                View Permissions
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">{editingMemberId ? "Edit Member" : "Add Member"}</h3>
              <button 
                onClick={() => {
                  setIsAddMemberModalOpen(false);
                }} 
                className="text-slate-400 hover:text-slate-600"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formattedDob = memberFormDob && memberFormDob.includes("-") 
                  ? memberFormDob.split("-").reverse().join("/") 
                  : memberFormDob || "01/01/1990";

                if (editingMemberId) {
                  setMembersList(prev => prev.map(m => m.id === editingMemberId ? {
                    ...m,
                    name: memberFormName,
                    cfPiva: memberFormCfPiva,
                    type: memberFormType,
                    possession: memberFormPossession,
                    role: memberFormRole,
                    dob: formattedDob,
                    pob: memberFormPob,
                    residence: memberFormResidence
                  } : m));
                } else {
                  const id = `mem-${Date.now()}`;
                  setMembersList(prev => [
                    ...prev,
                    {
                      id,
                      name: memberFormName,
                      company: salon.name,
                      cfPiva: memberFormCfPiva || ("RSSMRA" + Math.floor(100000 + Math.random() * 900000) + "H501Z"),
                      type: memberFormType,
                      possession: memberFormPossession,
                      role: memberFormRole,
                      dob: formattedDob,
                      pob: memberFormPob || "Milan (MI)",
                      residence: memberFormResidence || "Via Giuseppe Verdi 12, Milan",
                      appointmentDate: new Date().toLocaleDateString("it-IT")
                    }
                  ]);
                }
                setIsAddMemberModalOpen(false);
                setEditingMemberId(null);
                // Reset form values
                setMemberFormName("");
                setMemberFormType("Natural Person");
                setMemberFormRole("Sole Director");
                setMemberFormPossession("100%");
                setMemberFormCfPiva("");
                setMemberFormDob("");
                setMemberFormPob("");
                setMemberFormResidence("");
              }} 
              className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberFormName}
                    onChange={e => setMemberFormName(e.target.value)}
                    placeholder="e.g. Roberto Marini"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Type *</label>
                  <div className="relative">
                    <select
                      value={memberFormType}
                      onChange={e => setMemberFormType(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Natural Person">Natural Person</option>
                      <option value="Legal Entity">Legal Entity</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Role *</label>
                  <input
                    type="text"
                    required
                    value={memberFormRole}
                    onChange={e => setMemberFormRole(e.target.value)}
                    placeholder="e.g. Stylist / Sole Director"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Ownership % *</label>
                  <input
                    type="text"
                    required
                    value={memberFormPossession}
                    onChange={e => setMemberFormPossession(e.target.value)}
                    placeholder="e.g. 100% or 50%"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">CF/P.IVA *</label>
                  <input
                    type="text"
                    required
                    value={memberFormCfPiva}
                    onChange={e => setMemberFormCfPiva(e.target.value)}
                    placeholder="CF/P.IVA code"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={memberFormDob}
                    onChange={e => setMemberFormDob(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Place of Birth *</label>
                  <input
                    type="text"
                    required
                    value={memberFormPob}
                    onChange={e => setMemberFormPob(e.target.value)}
                    placeholder="Place of birth"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Residence Address *</label>
                  <input
                    type="text"
                    required
                    value={memberFormResidence}
                    onChange={e => setMemberFormResidence(e.target.value)}
                    placeholder="Full residence address"
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  {editingMemberId ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Contacts Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Main Contacts</h3>
              <button onClick={() => setIsContactModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsContactModalOpen(false);
              }} 
              className="p-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">PEC *</label>
                  <input
                    type="text"
                    required
                    value={contactPec}
                    onChange={e => setContactPec(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Ordinary Email *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Landline Phone *</label>
                  <input
                    type="text"
                    required
                    value={contactLandline}
                    onChange={e => setContactLandline(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    value={contactMobile}
                    onChange={e => setContactMobile(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Website *</label>
                <input
                  type="text"
                  required
                  value={contactWebsite}
                  onChange={e => setContactWebsite(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Bank Details Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Bank Details</h3>
              <button onClick={() => setIsBankModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsBankModalOpen(false);
              }} 
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Company IBAN *</label>
                <input
                  type="text"
                  required
                  value={bankIban}
                  onChange={e => setBankIban(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Supporting Bank *</label>
                  <input
                    type="text"
                    required
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">BIC/SWIFT *</label>
                  <input
                    type="text"
                    required
                    value={bankBic}
                    onChange={e => setBankBic(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Financial Indicators Modal */}
      {isFinancialModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Financial Indicators</h3>
              <button onClick={() => setIsFinancialModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsFinancialModalOpen(false);
              }} 
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Last Year's Turnover *</label>
                <input
                  type="text"
                  required
                  value={turnover}
                  onChange={e => setTurnover(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Number of Employees</label>
                  <div className="relative">
                    <select
                      value={editEmployees}
                      onChange={e => setEditEmployees(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="12">12</option>
                      <option value="20+">20+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Current Plan</label>
                  <div className="relative">
                    <select
                      value={editPlan}
                      onChange={e => setEditPlan(e.target.value as any)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsFinancialModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Other Data Modal */}
      {isOtherDataModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Other Data</h3>
              <button onClick={() => setIsOtherDataModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsOtherDataModalOpen(false);
              }} 
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Invested Capital *</label>
                <input
                  type="text"
                  required
                  value={investedCapital}
                  onChange={e => setInvestedCapital(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Free Notes</label>
                <textarea
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  rows={3}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOtherDataModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Activity Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Activity</h3>
              <button onClick={() => setIsActivityModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsActivityModalOpen(false);
              }} 
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Primary ATECO Code *</label>
                <input
                  type="text"
                  required
                  value={primaryAteco}
                  onChange={e => setPrimaryAteco(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Secondary ATECO Codes *</label>
                <input
                  type="text"
                  required
                  value={secondaryAteco}
                  onChange={e => setSecondaryAteco(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Description of Corporate Object *</label>
                <textarea
                  required
                  value={corporateObject}
                  onChange={e => setCorporateObject(e.target.value)}
                  rows={3}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 w-full"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Share Capital Modal */}
      {isShareCapitalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Edit Share Capital</h3>
              <button onClick={() => setIsShareCapitalModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsShareCapitalModalOpen(false);
              }} 
              className="p-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Subscribed Capital *</label>
                  <input
                    type="text"
                    required
                    value={subscribedCapital}
                    onChange={e => setSubscribedCapital(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Paid-up Capital *</label>
                  <input
                    type="text"
                    required
                    value={paidUpCapital}
                    onChange={e => setPaidUpCapital(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Company Duration *</label>
                  <input
                    type="text"
                    required
                    value={companyDuration}
                    onChange={e => setCompanyDuration(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Share Division *</label>
                  <input
                    type="text"
                    required
                    value={shareDivision}
                    onChange={e => setShareDivision(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsShareCapitalModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Reactivate Profile Modal */}
      {isReactivateModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[480px] shadow-2xl p-8 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200 text-left animate-in duration-200">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">Reactive Profile</h3>
              <p className="text-sm text-[#475569] font-normal mt-1.5">Are you sure you want to reactive this profile?</p>
            </div>
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsReactivateModalOpen(false);
                }}
                className="px-6 py-2.5 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#475569] hover:text-[#1e293b] rounded-lg text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  // Reactivate the status
                  setSalonStatus("Active");
                  salon.status = "Active";
                  setIsReactivateModalOpen(false);
                  // Trigger impersonation
                  onImpersonate(salon.name, true);
                }}
                className="px-6 py-2.5 bg-[#ecfeff] hover:bg-[#cffafe] text-[#0891b2] rounded-lg text-sm font-semibold transition-all"
              >
                Reactive Profile Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
