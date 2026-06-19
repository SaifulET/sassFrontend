"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowDown01Icon,
  Search01Icon
} from "@hugeicons/core-free-icons";
import EmployeeDetailPage from "./EmployeeDetailPage";

// Custom SVG Icons
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const VerticalDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Manager" | "Staff" | "Sole Director";
  status: "Active" | "Pending" | "Inactive";
  employmentStatus: "Currently Hired" | string; // e.g. "Out of Team: 02/02/2025"
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

interface UsersAndStaffPageProps {
  salon: any;
  onBack: () => void;
  activePermissionEmployeeId: string | null;
  setActivePermissionEmployeeId: (id: string | null) => void;
  setSalonSubTab: (tab: string) => void;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export default function UsersAndStaffPage({
  salon,
  onBack,
  activePermissionEmployeeId,
  setActivePermissionEmployeeId,
  setSalonSubTab,
  employees,
  setEmployees
}: UsersAndStaffPageProps) {
  // Active employee detail view state
  const [activeEmployeeId, setActiveEmployeeId] = useState<string | null>(null);

  // Tab Filtering: "hired", "out", "all"
  const [filterTab, setFilterTab] = useState<"hired" | "out" | "all">("hired");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Actions menu state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Custom confirmation modal states
  const [suspendEmployeeId, setSuspendEmployeeId] = useState<string | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [resetPasswordEmployeeId, setResetPasswordEmployeeId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const convertToInputDate = (dateStr: string) => {
    if (dateStr && dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    return dateStr || "";
  };

  // Form states for Add User
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formDob, setFormDob] = useState("");
  const [formPob, setFormPob] = useState("Select city");
  const [formAddress, setFormAddress] = useState("");
  const [formContractType, setFormContractType] = useState("Permanent");
  const [formTaxCode, setFormTaxCode] = useState("");
  const [formIban, setFormIban] = useState("");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formOccupation, setFormOccupation] = useState("Barber");
  const [formRemuneration, setFormRemuneration] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formEmergencyName, setFormEmergencyName] = useState("");
  const [formEmergencyPhone, setFormEmergencyPhone] = useState("");

  // Close dropdowns on outside click and scroll
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    const handleScroll = () => {
      setActiveMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Filter logic
  const filteredEmployees = employees.filter((emp) => {
    // 1. Tab filter
    if (filterTab === "hired" && emp.employmentStatus !== "Currently Hired") return false;
    if (filterTab === "out" && !emp.employmentStatus.startsWith("Out of Team")) return false;

    // 2. Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      if (!fullName.includes(q) && !emp.email.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFirstName || !formLastName || !formEmail || !formTaxCode) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedDob = formDob && formDob.includes("-") ? formDob.split("-").reverse().join("/") : formDob;
    const formattedStartDate = formStartDate && formStartDate.includes("-") ? formStartDate.split("-").reverse().join("/") : formStartDate;

    if (editingEmployeeId) {
      setEmployees((prev) => prev.map(emp => emp.id === editingEmployeeId ? {
        ...emp,
        firstName: formFirstName,
        lastName: formLastName,
        email: formEmail,
        dob: formattedDob,
        pob: formPob,
        address: formAddress,
        contractType: formContractType,
        taxCode: formTaxCode,
        iban: formIban,
        startDate: formattedStartDate,
        endDate: formEndDate || undefined,
        occupation: formOccupation,
        remuneration: formRemuneration,
        phone: formPhone,
        emergencyName: formEmergencyName,
        emergencyPhone: formEmergencyPhone
      } : emp));
    } else {
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        firstName: formFirstName,
        lastName: formLastName,
        email: formEmail,
        role: "Staff",
        status: "Pending",
        employmentStatus: "Currently Hired",
        lastLogin: "Never",
        dob: formattedDob,
        pob: formPob,
        address: formAddress,
        contractType: formContractType,
        taxCode: formTaxCode,
        iban: formIban,
        startDate: formattedStartDate,
        endDate: formEndDate || undefined,
        occupation: formOccupation,
        remuneration: formRemuneration,
        phone: formPhone,
        emergencyName: formEmergencyName,
        emergencyPhone: formEmergencyPhone
      };
      setEmployees((prev) => [newEmp, ...prev]);
    }

    // Reset Form
    setFormFirstName("");
    setFormLastName("");
    setFormDob("");
    setFormPob("Select city");
    setFormAddress("");
    setFormContractType("Permanent");
    setFormTaxCode("");
    setFormIban("");
    setFormStartDate("");
    setFormEndDate("");
    setFormOccupation("Barber");
    setFormRemuneration("");
    setFormPhone("");
    setFormEmail("");
    setFormEmergencyName("");
    setFormEmergencyPhone("");

    setIsAddModalOpen(false);
    setEditingEmployeeId(null);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setDeleteEmployeeId(null);
  };

  const handleResetPassword = (id: string) => {
    setResetPasswordEmployeeId(null);
  };

  const handleSuspendEmployee = (id: string) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" } : e));
    setSuspendEmployeeId(null);
  };

  // Intercept render if viewing an employee detail page
  if (activeEmployeeId !== null) {
    const activeEmployee = employees.find(e => e.id === activeEmployeeId);
    if (activeEmployee) {
      return (
        <EmployeeDetailPage
          employee={activeEmployee}
          onBack={() => setActiveEmployeeId(null)}
          onViewPermissions={() => {
            setActivePermissionEmployeeId(activeEmployee.id);
            setSalonSubTab("permissions");
          }}
          onUpdateEmployee={(updated) => {
            setEmployees(prev => prev.map(e => e.id === updated.id ? updated : e));
          }}
        />
      );
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Header Bar with Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">{salon.name}</h1>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors inline-flex">
            <HomeIcon />
          </button>
          <span className="text-slate-300">/</span>
          <button onClick={onBack} className="text-[#5e53fc] hover:underline">
            Salon Beauty
          </button>
        </div>
      </div>

      {/* Main Page Container card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)] flex flex-col p-8 w-full">
        {/* Title and Add User Action Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Users & Staff</h2>
          <button
            onClick={() => {
              setEditingEmployeeId(null);
              setFormFirstName("");
              setFormLastName("");
              setFormDob("");
              setFormPob("Select city");
              setFormAddress("");
              setFormContractType("Permanent");
              setFormTaxCode("");
              setFormIban("");
              setFormStartDate("");
              setFormEndDate("");
              setFormOccupation("Barber");
              setFormRemuneration("");
              setFormPhone("");
              setFormEmail("");
              setFormEmergencyName("");
              setFormEmergencyPhone("");
              setIsAddModalOpen(true);
            }}
            className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5"
          >
            Add User
          </button>
        </div>

        {/* Filters and Search toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Status filtering tabs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setFilterTab("hired")}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${filterTab === "hired"
                  ? "border-[#5e53fc] text-[#5e53fc] bg-[#f8f7ff]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-white"
                }`}
            >
              Currently Hired
            </button>
            <button
              onClick={() => setFilterTab("out")}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${filterTab === "out"
                  ? "border-[#5e53fc] text-[#5e53fc] bg-[#f8f7ff]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-white"
                }`}
            >
              Out of Team
            </button>
            <button
              onClick={() => setFilterTab("all")}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${filterTab === "all"
                  ? "border-[#5e53fc] text-[#5e53fc] bg-[#f8f7ff]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-white"
                }`}
            >
              All
            </button>
          </div>

          {/* Search field */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <HugeiconsIcon icon={Search01Icon} size={16} />
            </span>
            <input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#5e53fc] focus:bg-white focus:outline-none rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-700"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="border border-slate-100 rounded-2xl overflow-x-auto w-full min-h-[350px]">
          <table className="w-full min-w-[800px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Employment Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name with Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#5e53fc] flex items-center justify-center font-bold text-xs">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <span className="font-bold text-slate-800">
                        {emp.firstName} {emp.lastName}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">{emp.email}</td>

                  {/* Role Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase whitespace-nowrap ${emp.role === "Manager"
                        ? "bg-[#e2f7fc] text-[#0ea5e9]"
                        : "bg-[#fef9c3] text-[#ca8a04]"
                      }`}>
                      {emp.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1.5 w-fit whitespace-nowrap ${emp.status === "Active"
                        ? "bg-[#dcfce7] text-[#16a34a]"
                        : emp.status === "Pending"
                          ? "bg-[#ffedd5] text-[#ea580c]"
                          : "bg-[#fee2e2] text-[#dc2626]"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active"
                          ? "bg-[#16a34a]"
                          : emp.status === "Pending"
                            ? "bg-[#ea580c]"
                            : "bg-[#dc2626]"
                        }`} />
                      {emp.status}
                    </span>
                  </td>

                  {/* Employment Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold whitespace-nowrap ${emp.employmentStatus === "Currently Hired"
                        ? "bg-[#eff6ff] text-[#2563eb]"
                        : "bg-[#fce7f3] text-[#db2777]"
                      }`}>
                      {emp.employmentStatus}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">{emp.lastLogin}</td>

                  {/* Action Dots & Menu */}
                  <td className="px-6 py-4 text-center relative whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMenuCoords({
                          top: rect.bottom + 4,
                          left: rect.right - 176
                        });
                        setActiveMenuId(activeMenuId === emp.id ? null : emp.id);
                      }}
                      className="p-1.5 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <VerticalDotsIcon />
                    </button>

                    {/* Popover actions menu */}
                    {activeMenuId === emp.id && menuCoords && (
                      <div
                        ref={menuRef}
                        style={{
                          position: "fixed",
                          top: `${menuCoords.top}px`,
                          left: `${menuCoords.left}px`,
                        }}
                        className="w-44 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50 text-left animate-in fade-in zoom-in-95 duration-100"
                      >
                        <button
                          onClick={() => {
                            setActiveEmployeeId(emp.id);
                            setActiveMenuId(null);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-slate-50 text-[#5e53fc] font-bold text-xs"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-slate-50 text-slate-600 font-semibold text-xs"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                          </svg>
                          Impersonate
                        </button>
                        <button
                          onClick={() => {
                            setFormFirstName(emp.firstName);
                            setFormLastName(emp.lastName);
                            setFormDob(convertToInputDate(emp.dob));
                            setFormPob(emp.pob || "Select city");
                            setFormAddress(emp.address || "");
                            setFormContractType(emp.contractType || "Permanent");
                            setFormTaxCode(emp.taxCode);
                            setFormIban(emp.iban || "");
                            setFormStartDate(convertToInputDate(emp.startDate));
                            setFormEndDate(emp.endDate || "");
                            setFormOccupation(emp.occupation || "Barber");
                            setFormRemuneration(emp.remuneration || "");
                            setFormPhone(emp.phone || "");
                            setFormEmail(emp.email);
                            setFormEmergencyName(emp.emergencyName || "");
                            setFormEmergencyPhone(emp.emergencyPhone || "");
                            setEditingEmployeeId(emp.id);
                            setIsAddModalOpen(true);
                            setActiveMenuId(null);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-slate-50 text-slate-600 font-semibold text-xs"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit Employee
                        </button>
                        <button
                          onClick={() => {
                            setResetPasswordEmployeeId(emp.id);
                            setNewPassword("");
                            setConfirmPassword("");
                            setActiveMenuId(null);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-slate-50 text-slate-600 font-semibold text-xs"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Reset Password
                        </button>
                        <button
                          onClick={() => {
                            setSuspendEmployeeId(emp.id);
                            setActiveMenuId(null);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-slate-50 text-amber-600 font-bold text-xs"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          Suspend
                        </button>
                        <button
                          onClick={() => {
                            setDeleteEmployeeId(emp.id);
                            setActiveMenuId(null);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-bold text-xs border-t border-slate-50 mt-1 pt-1.5"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 pt-8 pb-5 border-b border-slate-100 flex flex-col relative">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute right-6 top-6 p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
              <h3 className="text-lg font-bold text-slate-800">{editingEmployeeId ? "Edit User" : "Add User"}</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">{editingEmployeeId ? "Update the employee profile details in the system" : "Create a new employee profile in the system"}</p>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleAddUserSubmit} className="flex-1 overflow-y-auto px-8 py-6 max-h-[70vh] flex flex-col gap-5 text-left">
              {/* Row 1: Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Owner's First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter user's first name"
                    value={formFirstName}
                    onChange={(e) => setFormFirstName(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Owner's Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter user's last name"
                    value={formLastName}
                    onChange={(e) => setFormLastName(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Row 2: DOB & POB */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Date of birth *</label>
                  <input
                    type="date"
                    required
                    value={formDob}
                    onChange={(e) => setFormDob(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Place of birth</label>
                  <div className="relative">
                    <select
                      value={formPob}
                      onChange={(e) => setFormPob(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Select city">Select city</option>
                      <option value="Milano (MI)">Milano (MI)</option>
                      <option value="Bologna (BO)">Bologna (BO)</option>
                      <option value="Roma (RM)">Roma (RM)</option>
                      <option value="Torino (TO)">Torino (TO)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Full Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Residence</label>
                <input
                  type="text"
                  placeholder="Enter residence address"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                />
              </div>

              {/* Row 4: Contract Type & Tax ID */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Type *</label>
                  <div className="relative">
                    <select
                      value={formContractType}
                      onChange={(e) => setFormContractType(e.target.value)}
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
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">CF/P.IVA *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Tax ID code"
                    value={formTaxCode}
                    onChange={(e) => setFormTaxCode(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Row 5: IBAN */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">IBAN</label>
                <input
                  type="text"
                  placeholder="Enter IBAN details"
                  value={formIban}
                  onChange={(e) => setFormIban(e.target.value)}
                  className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 uppercase"
                />
              </div>

              {/* Row 6: Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">% Possession</label>
                  <input
                    type="text"
                    placeholder="Enter % possession"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Row 7: Occupation & Remuneration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Role *</label>
                  <div className="relative">
                    <select
                      value={formOccupation}
                      onChange={(e) => setFormOccupation(e.target.value)}
                      className="w-full border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 pr-10 text-xs font-semibold text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="Sole Director">Sole Director</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Remuneration / Hours</label>
                  <input
                    type="text"
                    placeholder="Enter remuneration details"
                    value={formRemuneration}
                    onChange={(e) => setFormRemuneration(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Row 8: Contacts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Telephone *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter phone number"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                  />
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5e53fc] block mb-4">Emergency Contacts</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Emergency Contact (Name) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Emergency contact name"
                      value={formEmergencyName}
                      onChange={(e) => setFormEmergencyName(e.target.value)}
                      className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Emergency Contact (Telephone) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Emergency phone number"
                      value={formEmergencyPhone}
                      onChange={(e) => setFormEmergencyPhone(e.target.value)}
                      className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Submit footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    // Pre-fill some values for testing/demo permissions path easily
                    setFormFirstName("Roberto");
                    setFormLastName("Marini");
                    setFormEmail("roberto@beautywellness.com");
                    setFormTaxCode("RSSMRA85M01H501Z");
                    setFormDob("1985-03-01");
                    setFormPob("Milano (MI)");
                    setFormAddress("Via Giuseppe Verdi 123, 20121 Milan (MI)");
                    setFormStartDate("2020-03-15");
                    setFormEndDate("100%");
                    setFormOccupation("Sole Director");
                    setFormPhone("+39 02 1234 5678");
                    setFormEmergencyName("Emergency Name");
                    setFormEmergencyPhone("+39 111 222333");
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-[#5e53fc] hover:bg-[#f8f7ff] rounded-xl transition-colors"
                >
                  View Permissions
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100"
                >
                  {editingEmployeeId ? "Save Changes" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal Overlay */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header X */}
            <button
              onClick={() => setSelectedEmployee(null)}
              className="absolute right-6 top-6 p-1.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors z-10"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            {/* Modal Body */}
            <div className="px-8 pt-8 pb-6 text-left">
              <h3 className="text-base font-extrabold text-slate-800 mb-6">View Member</h3>

              {/* Avatar and name banner card */}
              <div className="flex items-center gap-4 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5e53fc] to-indigo-400 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-extrabold text-slate-800 leading-snug">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{salon.name}</span>
                </div>
                <div className="ml-auto flex flex-col gap-1 items-end shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-slate-200 text-slate-600 font-extrabold uppercase">
                    Natural Person
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-[#eff6ff] text-[#2563eb] font-extrabold uppercase">
                    {selectedEmployee.role}
                  </span>
                </div>
              </div>

              {/* General Information Section */}
              <div className="flex flex-col gap-4 border border-slate-100 rounded-2xl p-5 mb-5 bg-white relative">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">General Information</span>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Date of birth</span>
                    <span className="font-extrabold text-slate-800">{selectedEmployee.dob || "01/03/1985"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Place of birth</span>
                    <span className="font-extrabold text-slate-800">{selectedEmployee.pob || "Milan (MI)"}</span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Residence</span>
                    <span className="font-extrabold text-slate-800 leading-relaxed">{selectedEmployee.address || "Via Giuseppe Verdi 123, 20121 Milan (MI)"}</span>
                  </div>
                </div>
              </div>

              {/* Business Information Section */}
              <div className="flex flex-col gap-4 border border-slate-100 rounded-2xl p-5 mb-6 bg-white">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Business Information</span>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Appointment Date</span>
                    <span className="font-extrabold text-slate-800">{selectedEmployee.startDate || "15/03/2020"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Ownership Percentage</span>
                    <span className="font-extrabold text-slate-800">{selectedEmployee.endDate || "100%"}</span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">CF/P.IVA</span>
                    <span className="font-extrabold text-slate-800 tracking-wide uppercase">{selectedEmployee.taxCode || "RSSMRA85M01H501Z"}</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                <button
                  onClick={() => {
                    setFormFirstName(selectedEmployee.firstName);
                    setFormLastName(selectedEmployee.lastName);
                    setFormDob(convertToInputDate(selectedEmployee.dob));
                    setFormPob(selectedEmployee.pob || "Select city");
                    setFormAddress(selectedEmployee.address || "");
                    setFormContractType(selectedEmployee.contractType || "Permanent");
                    setFormTaxCode(selectedEmployee.taxCode);
                    setFormIban(selectedEmployee.iban || "");
                    setFormStartDate(convertToInputDate(selectedEmployee.startDate));
                    setFormEndDate(selectedEmployee.endDate || "");
                    setFormOccupation(selectedEmployee.occupation || "Barber");
                    setFormRemuneration(selectedEmployee.remuneration || "");
                    setFormPhone(selectedEmployee.phone || "");
                    setFormEmail(selectedEmployee.email);
                    setFormEmergencyName(selectedEmployee.emergencyName || "");
                    setFormEmergencyPhone(selectedEmployee.emergencyPhone || "");
                    setEditingEmployeeId(selectedEmployee.id);
                    setIsAddModalOpen(true);
                    setSelectedEmployee(null);
                  }}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setActivePermissionEmployeeId(selectedEmployee.id);
                    setSalonSubTab("permissions");
                    setSelectedEmployee(null);
                  }}
                  className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
                >
                  View Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteEmployeeId !== null && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200 text-left">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-[#0f172a]">Delete Employee</h3>
              <p className="text-sm text-[#475569]">Are you sure you want to delete this employee? This action cannot be undone.</p>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setDeleteEmployeeId(null)}
                className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteEmployee(deleteEmployeeId)}
                className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Suspend Confirmation Modal */}
      {suspendEmployeeId !== null && (() => {
        const emp = employees.find(e => e.id === suspendEmployeeId);
        if (!emp) return null;
        const isSuspended = emp.status === "Inactive";
        return (
          <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200 text-left">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-[#0f172a]">{isSuspended ? "Reactivate" : "Suspend"} Employee</h3>
                <p className="text-sm text-[#475569]">
                  Are you sure you want to {isSuspended ? "reactivate" : "suspend"} <strong>{emp.firstName} {emp.lastName}</strong>?
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSuspendEmployeeId(null)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSuspendEmployee(suspendEmployeeId)}
                  className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl text-xs font-bold transition-all"
                >
                  {isSuspended ? "Reactivate" : "Suspend"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Custom Reset Password Modal */}
      {resetPasswordEmployeeId !== null && (() => {
        const emp = employees.find(e => e.id === resetPasswordEmployeeId);
        if (!emp) return null;
        return (
          <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[6px] z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[20px] w-full max-w-[440px] shadow-2xl p-6 flex flex-col gap-5 relative animate-in zoom-in-95 duration-200 text-left">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-[#0f172a]">Reset Password</h3>
                <p className="text-xs text-[#475569]">Reset password for {emp.firstName} {emp.lastName} ({emp.email})</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPassword || newPassword !== confirmPassword) {
                    alert("Passwords do not match or are empty.");
                    return;
                  }
                  handleResetPassword(resetPasswordEmployeeId);
                }}
                className="flex flex-col gap-4 text-sm"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#334155] font-semibold text-xs">New Password *</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#334155] font-semibold text-xs">Confirm New Password *</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-10 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-[#5e53fc]"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setResetPasswordEmployeeId(null)}
                    className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
