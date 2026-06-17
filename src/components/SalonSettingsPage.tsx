"use client";

import React, { useState } from "react";

// HomeIcon for breadcrumbs
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
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

interface SalonSettingsPageProps {
  salon: Salon;
  onBack: () => void;
}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  value: boolean;
}

export default function SalonSettingsPage({ salon, onBack }: SalonSettingsPageProps) {
  // Local state for all settings toggle buttons (initialized to matching values in screenshot)
  const [settings, setSettings] = useState<Record<string, boolean>>({
    advancedAnalytics: true,
    socialMediaTools: true,
    multiLocationSupport: true,
    apiAccess: true,
    whiteLabelBranding: true,
    twoFactorAuth: false,
    dataBackup: true
  });

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveChanges = () => {
    alert("Settings saved successfully!");
  };

  const Toggle = ({ id }: { id: string }) => {
    const isChecked = settings[id];
    return (
      <button
        onClick={() => toggleSetting(id)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isChecked ? "bg-[#5e53fc]" : "bg-slate-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in duration-300">
      {/* Top Header Breadcrumbs Card */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex items-center justify-between w-full">
        <div className="text-sm font-extrabold text-[#1f2937]">
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

      {/* Main Settings Card */}
      <div className="bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex flex-col p-6 w-full">
        {/* Title */}
        <h2 className="text-base font-bold text-[#1f2937] mb-6">Settings</h2>

        {/* Inner Bordered Settings Container Card */}
        <div className="border border-[#eef2f6] rounded-xl p-6 flex flex-col gap-6 w-full bg-white">
          
          {/* Section 1: Salon-Specific Settings */}
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-base font-bold text-[#2c3a50]">Salon-Specific Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              {/* Advanced Analytics */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">Advanced Analytics</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Enable detailed reporting and analytics
                  </span>
                </div>
                <Toggle id="advancedAnalytics" />
              </div>

              {/* Social Media Tools */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">Social Media Tools</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Social media integration and posting
                  </span>
                </div>
                <Toggle id="socialMediaTools" />
              </div>

              {/* Multi-location Support */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">Multi-location Support</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Manage multiple salon locations
                  </span>
                </div>
                <Toggle id="multiLocationSupport" />
              </div>

              {/* API Access */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">API Access</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Allow third-party integrations
                  </span>
                </div>
                <Toggle id="apiAccess" />
              </div>

              {/* White Label Branding */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">White Label Branding</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Custom branding and logos
                  </span>
                </div>
                <Toggle id="whiteLabelBranding" />
              </div>
            </div>
          </div>

          <hr className="border-[#eef2f6]" />

          {/* Section 2: Data & Security */}
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-base font-bold text-[#2c3a50]">Data & Security</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">Two-Factor Authentication</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Require 2FA for all users
                  </span>
                </div>
                <Toggle id="twoFactorAuth" />
              </div>

              {/* Spacer for middle grid cell */}
              <div className="hidden md:block" />

              {/* Data Backup */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-850">Data Backup</span>
                  <span className="text-[10px] text-slate-400 font-medium leading-normal">
                    Daily automated backups
                  </span>
                </div>
                <Toggle id="dataBackup" />
              </div>
            </div>
          </div>

        </div>

        {/* Cancel and Save Changes Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
