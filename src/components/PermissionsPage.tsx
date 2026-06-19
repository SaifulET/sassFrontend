"use client";

import React, { useState } from "react";

// Custom Home Icon
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

interface PermissionItemProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}

function SwitchToggle({ label, description, enabled, onChange }: PermissionItemProps) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 border border-slate-50 rounded-2xl hover:bg-slate-50/35 transition-all">
      <div className="flex flex-col text-left min-w-0">
        <span className="text-xs font-bold text-slate-800 leading-snug">{label}</span>
        <span className="text-[10px] text-slate-400 font-semibold mt-1 leading-normal">{description}</span>
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`w-10 h-6 rounded-full relative transition-all duration-200 shrink-0 outline-none ${
          enabled ? "bg-[#5e53fc]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

interface PermissionsPageProps {
  salon: any;
  employeeId: string | null;
  onBack: () => void;
}

export default function PermissionsPage({ salon, employeeId, onBack }: PermissionsPageProps) {
  // Hardcoded or dynamically fetched employee name
  const employeeName = "Roberto Marini";

  // Permissions state
  const [tenantPermissions, setTenantPermissions] = useState([
    { id: "tp-1", label: "Manage salon profile", description: "Branding name header and business info", enabled: true },
    { id: "tp-2", label: "Manage subscription & feature toggles", description: "Allow subscription & feature toggles", enabled: true },
    { id: "tp-3", label: "Manage roles & member invites", description: "Add/remove users, set permissions", enabled: true },
    { id: "tp-4", label: "View audit log / user operation history", description: "Track key history events", enabled: true }
  ]);

  const [calendarPermissions, setCalendarPermissions] = useState([
    { id: "cp-1", label: "View team calendars (same salon)", description: "View team calendars inside salon", enabled: true },
    { id: "cp-2", label: "View all salon calendars (incl. private slots)", description: "View private slots as well", enabled: true },
    { id: "cp-3", label: "Create appointments", description: "Book new appointments", enabled: true },
    { id: "cp-4", label: "Edit appointments (own)", description: "Edit own bookings", enabled: true },
    { id: "cp-5", label: "Edit appointments (others)", description: "Edit team members bookings", enabled: true },
    { id: "cp-6", label: "Approve/reject client self-bookings", description: "Handle automated client slots", enabled: true },
    { id: "cp-7", label: "Override conflicts/overbook", description: "Force calendar overlap booking slots", enabled: true },
    { id: "cp-8", label: "Block time / set breaks", description: "Prevent appointments in specific slots", enabled: true },
    { id: "cp-9", label: "Manage shift scheduling & rotations", description: "Set recurring/Saturday rotation rules", enabled: true },
    { id: "cp-10", label: "Configure service durations & availability logic", description: "Adjust service availability logic", enabled: true },
    { id: "cp-11", label: "Export calendar / sync", description: "Sync external calendars", enabled: true },
    { id: "cp-12", label: "View client notes from calendar", description: "View private client records", enabled: true }
  ]);

  const handleTenantChange = (id: string, val: boolean) => {
    setTenantPermissions(prev => prev.map(item => item.id === id ? { ...item, enabled: val } : item));
  };

  const handleCalendarChange = (id: string, val: boolean) => {
    setCalendarPermissions(prev => prev.map(item => item.id === id ? { ...item, enabled: val } : item));
  };

  const handleSave = () => {
    onBack();
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Header Bar with Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back Arrow navigation */}
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors inline-flex text-slate-500 hover:text-slate-800"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            {employeeName} (Permissions)
          </h1>
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

      {/* Tenant & Users Section Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)] flex flex-col p-8 w-full text-left">
        <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Tenant & Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenantPermissions.map((item) => (
            <SwitchToggle
              key={item.id}
              label={item.label}
              description={item.description}
              enabled={item.enabled}
              onChange={(val) => handleTenantChange(item.id, val)}
            />
          ))}
        </div>
      </div>

      {/* Calendar & Bookings Section Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)] flex flex-col p-8 w-full text-left">
        <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-wider">Calendar & Bookings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calendarPermissions.map((item) => (
            <SwitchToggle
              key={item.id}
              label={item.label}
              description={item.description}
              enabled={item.enabled}
              onChange={(val) => handleCalendarChange(item.id, val)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="flex justify-end gap-3.5 mt-2">
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-[#f8fafc] hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm border border-slate-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-150"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
