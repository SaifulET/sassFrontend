"use client";

import React, { useState, useRef } from "react";

// Solar:alt-arrow-left-line-duotone (Solar / solar:alt-arrow-down-line-duotone/tabler:download)
const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const ImportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#98A4AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const LaptopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const DotsVerticalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#98A4AE] cursor-pointer hover:text-[#29343D]">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const QRCodePlaceholder = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-4 border border-[#E0E6EB] p-2.5 rounded-lg bg-white">
    <rect width="150" height="150" rx="8" fill="white" />
    <rect x="15" y="15" width="35" height="35" rx="2" fill="#29343D" />
    <rect x="22" y="22" width="21" height="21" rx="1" fill="white" />
    <rect x="27" y="27" width="11" height="11" fill="#29343D" />
    <rect x="100" y="15" width="35" height="35" rx="2" fill="#29343D" />
    <rect x="107" y="22" width="21" height="21" rx="1" fill="white" />
    <rect x="112" y="27" width="11" height="11" fill="#29343D" />
    <rect x="15" y="100" width="35" height="35" rx="2" fill="#29343D" />
    <rect x="22" y="107" width="21" height="21" rx="1" fill="white" />
    <rect x="27" y="112" width="11" height="11" fill="#29343D" />
    <rect x="60" y="20" width="10" height="10" fill="#29343D" />
    <rect x="80" y="25" width="10" height="10" fill="#29343D" />
    <rect x="65" y="45" width="15" height="10" fill="#29343D" />
    <rect x="20" y="65" width="10" height="15" fill="#29343D" />
    <rect x="40" y="70" width="10" height="10" fill="#29343D" />
    <rect x="60" y="65" width="20" height="10" fill="#29343D" />
    <rect x="90" y="60" width="10" height="20" fill="#29343D" />
    <rect x="110" y="65" width="15" height="10" fill="#29343D" />
    <rect x="115" y="80" width="10" height="15" fill="#29343D" />
    <rect x="65" y="90" width="10" height="25" fill="#29343D" />
    <rect x="85" y="95" width="20" height="10" fill="#29343D" />
    <rect x="60" y="120" width="25" height="10" fill="#29343D" />
    <rect x="100" y="110" width="10" height="10" fill="#29343D" />
    <rect x="120" y="115" width="15" height="10" fill="#29343D" />
    <rect x="105" y="130" width="20" height="10" fill="#29343D" />
  </svg>
);

export default function SettingsPage({ defaultActiveTab = "Profile" }: { defaultActiveTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for avatar image
  const [avatarSrc, setAvatarSrc] = useState("/avatar.png");

  // Form states
  const [formData, setFormData] = useState({
    name: "Mathew Anderson",
    location: "United States",
    email: "info@modernize.com",
    phone: "(219) 555-0114",
    address: "3891 Ranchview Dr. Richardson, California 62639"
  });

  // System settings states
  const [systemData, setSystemData] = useState({
    platformName: "Yourcompany",
    supportEmail: "support@yourcompany.com",
    trialDays: "14",
    maxSalons: "10",
    defaultPlan: "Basic",
    maintenanceMode: true,
    newSignupsEnabled: true,
    autoBackup: true
  });

  // Security settings states
  const [securityData, setSecurityData] = useState({
    sessionTimeout: "30",
    minPasswordLength: "8",
    maxLoginAttempts: "5",
    lockoutDuration: "15",
    twoFactorEnabled: false,
    impersonateSalons: true,
    recoveryEmail: "test@test.com",
    recoveryPhone: "3482938493",
    devices: [
      { id: 1, name: "iPhone 14", location: "London UK, Oct 23 at 1:15 AM", type: "mobile" },
      { id: 2, name: "Macbook Air", location: "Gujarat India, Oct 24 at 3:15 AM", type: "desktop" }
    ]
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal state variables
  const [activeModal, setActiveModal] = useState<
    "change_password" | "signout_all" | "2fa_step1_qr" | "2fa_step1_key" | "2fa_backup" | "2fa_success" | null
  >(null);

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "••••••••••••••••",
    newPassword: "",
    confirmPassword: ""
  });

  const [twoFactorCode, setTwoFactorCode] = useState<string[]>(["", "", "", "", "", ""]);
  const codeInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Billing tab states
  const [billingData, setBillingData] = useState({
    enableStripe: true,
    stripePublishableKey: "••••••••",
    stripeSecretKey: "••••••••",
    currency: "EUR (€)",
    taxRate: "22",
    invoicePrefix: "INV-",
    gracePeriod: "3"
  });

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Notification tab states
  const [notificationData, setNotificationData] = useState({
    paymentFailures: true,
    newSignups: true,
    systemAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    stripeSecretKey: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || ""
  });

  const handleNotificationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotificationData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (name: string) => {
    setNotificationData((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof notificationData]
    }));
  };

  const handleNotificationSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Notification preferences saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNotificationCancel = () => {
    setNotificationData({
      paymentFailures: true,
      newSignups: true,
      systemAlerts: true,
      weeklyReports: false,
      monthlyReports: true,
      webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
      stripeSecretKey: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || ""
    });
    setToastMessage("Notification changes discarded");
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleTestConnection = () => {
    setIsTestingConnection(true);
    setToastMessage("Testing Stripe connection...");
    setTimeout(() => {
      setIsTestingConnection(false);
      setToastMessage("Stripe connection verified successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBillingSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Billing settings saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBillingCancel = () => {
    setBillingData({
      enableStripe: true,
      stripePublishableKey: "••••••••",
      stripeSecretKey: "••••••••",
      currency: "EUR (€)",
      taxRate: "22",
      invoicePrefix: "INV-",
      gracePeriod: "3"
    });
    setToastMessage("Billing changes discarded");
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleCodeChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return; // Allow numbers only
    const newCode = [...twoFactorCode];
    newCode[index] = val.slice(-1); // Keep only the last character
    setTwoFactorCode(newCode);

    // Auto-focus next input
    if (val && index < 5) {
      codeInputsRef.current[index + 1]?.focus();
    }

    // Check if fully entered
    const fullCode = newCode.join("");
    if (fullCode.length === 6) {
      // Transition to Backup Codes modal
      setTimeout(() => {
        setActiveModal("2fa_backup");
        setTwoFactorCode(["", "", "", "", "", ""]);
      }, 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !twoFactorCode[index] && index > 0) {
      codeInputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const chars = pasteData.split("");
      setTwoFactorCode(chars);
      setTimeout(() => {
        setActiveModal("2fa_backup");
        setTwoFactorCode(["", "", "", "", "", ""]);
      }, 300);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText("HDOEIDAOMCICSALDIVOVLAOIDC932DJSLDKLDNCCCCSD");
    setToastMessage("Secret key copied to clipboard!");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownloadBackupCodes = () => {
    const element = document.createElement("a");
    const file = new Blob(["HDOEIDAD\nOFFUSFPL\nHDOEIDAD\nOFFUSFPL\n"], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "backup-codes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setToastMessage("Backup codes downloaded!");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText("HDOEIDAD\nOFFUSFPL\nHDOEIDAD\nOFFUSFPL");
    setToastMessage("Backup codes copied to clipboard!");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Settings saved successfully!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: "Mathew Anderson",
      location: "United States",
      email: "info@modernize.com",
      phone: "(219) 555-0114",
      address: "3891 Ranchview Dr. Richardson, California 62639"
    });
    setToastMessage("Changes discarded");
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleResetAvatar = () => {
    setAvatarSrc("/avatar.png");
    setToastMessage("Avatar reset to default");
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) {
        setToastMessage("File size exceeds 800K limit!");
        setTimeout(() => {
          setToastMessage(null);
        }, 2000);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarSrc(reader.result);
          setToastMessage("Profile photo uploaded!");
          setTimeout(() => {
            setToastMessage(null);
          }, 2000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSystemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSystemData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSystemToggle = (name: string) => {
    setSystemData((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof systemData]
    }));
  };

  const handleSystemCancel = () => {
    setSystemData({
      platformName: "Yourcompany",
      supportEmail: "support@yourcompany.com",
      trialDays: "14",
      maxSalons: "10",
      defaultPlan: "Basic",
      maintenanceMode: true,
      newSignupsEnabled: true,
      autoBackup: true
    });
    setToastMessage("System changes discarded");
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleSystemSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("System settings saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSecurityInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityToggle = (name: string) => {
    setSecurityData((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof securityData]
    }));
  };

  const handleSecurityCancel = () => {
    setSecurityData({
      sessionTimeout: "30",
      minPasswordLength: "8",
      maxLoginAttempts: "5",
      lockoutDuration: "15",
      twoFactorEnabled: false,
      impersonateSalons: true,
      recoveryEmail: "test@test.com",
      recoveryPhone: "3482938493",
      devices: [
        { id: 1, name: "iPhone 14", location: "London UK, Oct 23 at 1:15 AM", type: "mobile" },
        { id: 2, name: "Macbook Air", location: "Gujarat India, Oct 24 at 3:15 AM", type: "desktop" }
      ]
    });
    setToastMessage("Security changes discarded");
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Security settings saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignoutAllDevices = () => {
    setSecurityData((prev) => ({
      ...prev,
      devices: []
    }));
    setToastMessage("Signed out from all other devices");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRemoveDevice = (id: number, name: string) => {
    setSecurityData((prev) => ({
      ...prev,
      devices: prev.devices.filter((d) => d.id !== id)
    }));
    setToastMessage(`Signed out from ${name}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const tabs = ["Profile", "System", "Security", "Billing", "Notifications"];

  return (
    <div className="flex w-full flex-col gap-5 text-left text-[#283442] animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#253143] px-5 py-3 text-xs font-semibold text-white shadow-2xl transition-all animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Heading Card */}
      <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-extrabold text-[#1f2937]">System Settings</div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Btn: Export Settings */}
            <button
              type="button"
              onClick={() => {
                setToastMessage("Exporting settings...");
                setTimeout(() => setToastMessage(null), 2000);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#eef2f6] hover:bg-slate-50 rounded-2xl text-xs font-semibold text-slate-600 transition-all shadow-sm"
            >
              <ExportIcon />
              <span>Export Settings</span>
            </button>
            {/* Btn: Import Settings */}
            <button
              type="button"
              onClick={() => {
                setToastMessage("Importing settings...");
                setTimeout(() => setToastMessage(null), 2000);
              }}
              className="px-5 py-2.5 bg-[#5e53fc] hover:bg-indigo-700 text-white rounded-2xl text-xs font-semibold tracking-wide shadow-lg shadow-indigo-150 transition-all"
            >
              <ImportIcon />
              <span>Import Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation Card */}
      <div className="rounded-xl bg-white p-4 shadow-[0_4px_18px_rgba(17,31,56,0.06)]">
        <div className="flex flex-row items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setToastMessage(`${tab} view loaded`);
                  setTimeout(() => setToastMessage(null), 1500);
                }}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                  isActive
                    ? "bg-[#eeedff] text-[#635bff]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame 1000003774: Active Tab Panel Card */}
      {activeTab === "Profile" ? (
        <form onSubmit={handleSave} className="flex flex-col items-start p-6 gap-6 bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full min-h-[904px] flex-none order-1 self-stretch grow-0">
          
          {/* Frame 1000003804: Change avatar card wrapper */}
          <div className="flex flex-col lg:flex-row items-center p-0 gap-[30px] w-full h-auto lg:h-[382px] flex-none order-0 self-stretch grow-0">
            {/* change profile pic */}
            <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full h-full flex-grow">
              <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0">
                Change profile
              </h2>
              
              {/* img section */}
              <div className="flex flex-col items-center p-0 gap-[34px] w-full h-auto lg:h-[252px] flex-none order-1 self-stretch grow-0">
                {/* Ellipse 2715: Avatar Image */}
                <div 
                  className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center bg-slate-50 flex-none order-0 grow-0"
                >
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* btns */}
                <div className="flex flex-row flex-wrap justify-center items-start content-center p-0 gap-6 w-full h-[44px] flex-none order-1 self-stretch grow-0">
                  {/* Btn: Upload */}
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="flex flex-row justify-center items-center py-2.5 px-4 gap-2.5 h-[44px] bg-[#635BFF] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-white border-none transition-colors cursor-pointer flex-none order-0 grow-0"
                  >
                    <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-white flex-none order-1 grow-0">
                      Upload
                    </span>
                  </button>
                  {/* Btn: Reset */}
                  <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="flex flex-row justify-center items-center py-2.5 px-4 gap-2.5 h-[44px] bg-[#FFE5ED] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-[#FF6692] border-none transition-colors cursor-pointer flex-none order-1 grow-0"
                  >
                    <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-[#FF6692] flex-none order-1 grow-0">
                      Reset
                    </span>
                  </button>
                </div>

                {/* Allowed JPG support label */}
                <span className="font-['Manrope'] font-normal text-[14px] leading-[20px] text-center text-[#98A4AE] w-full h-5 flex-none order-2 self-stretch grow-0">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </span>
              </div>
            </div>
          </div>

          {/* Frame 1000003805: Personal Details card */}
          <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full h-auto lg:h-[382px] flex-none order-1 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full min-w-0 h-[25px] flex-none order-0 self-stretch grow-0">
              Personal Details
            </h2>

            {/* details: columns structure */}
            <div className="flex flex-col items-start p-0 gap-[30px] w-full h-auto lg:h-[267px] flex-none order-1 self-stretch grow-0">
              {/* Row 1 */}
              <div className="flex flex-row flex-wrap items-start content-start p-0 gap-[30px] w-full h-auto lg:h-[69px] flex-none order-0 self-stretch grow-0">
                {/* Input form: Your Name */}
                <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(50%-15px)] h-[69px] flex-grow flex-none">
                  <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                    <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow">
                      Your Name
                    </label>
                  </div>
                  <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                    <div className="flex flex-row items-center p-0 gap-2.5 w-full h-5 flex-none order-0 flex-grow">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        required
                        className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                      />
                    </div>
                  </div>
                </div>

                {/* Input form: Location */}
                <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(50%-15px)] h-[69px] flex-grow flex-none">
                  <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                    <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow">
                      Location
                    </label>
                  </div>
                  <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0 relative">
                    <div className="flex flex-row items-center p-0 gap-2.5 w-full h-5 flex-none order-0 flex-grow relative">
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] appearance-none cursor-pointer pr-8 focus:outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Italy">Italy</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-6 h-6 flex items-center justify-center">
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-row flex-wrap items-start content-start p-0 gap-[30px] w-full h-auto lg:h-[69px] flex-none order-1 self-stretch grow-0">
                {/* Input form: Email */}
                <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(50%-15px)] h-[69px] flex-grow flex-none">
                  <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                    <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow">
                      Email
                    </label>
                  </div>
                  <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                    <div className="flex flex-row items-center p-0 gap-2.5 w-full h-5 flex-none order-0 flex-grow">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        required
                        className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                      />
                    </div>
                  </div>
                </div>

                {/* Input form: Phone */}
                <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(50%-15px)] h-[69px] flex-grow flex-none">
                  <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                    <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow">
                      Phone
                    </label>
                  </div>
                  <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                    <div className="flex flex-row items-center p-0 gap-2.5 w-full h-5 flex-none order-0 flex-grow">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4 (Address) */}
              <div className="flex flex-row flex-wrap items-start content-start p-0 gap-[30px] w-full h-auto lg:h-[69px] flex-none order-2 self-stretch grow-0">
                {/* Input form: Address */}
                <div className="flex flex-col items-start p-0 gap-2 w-full h-[69px] flex-none flex-grow">
                  <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                    <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow">
                      Address
                    </label>
                  </div>
                  <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                    <div className="flex flex-row items-center p-0 gap-2.5 w-full h-5 flex-none order-0 flex-grow">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                        className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Frame 1000003364: Save/Cancel Button actions */}
            <div className="flex flex-row justify-end items-center p-0 gap-3 w-full h-[44px] flex-none order-2 self-stretch grow-0 pt-4">
              {/* Btn: Cancel */}
              <button
                type="button"
                onClick={handleCancel}
                className="flex flex-row justify-center items-center py-2.5 px-4 bg-[#EFF4FA] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-[#0A2540] transition-colors cursor-pointer border-none"
              >
                <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-[#0A2540]">
                  Cancel
                </span>
              </button>
              {/* Btn: Save */}
              <button
                type="submit"
                className="flex flex-row justify-center items-center py-2.5 px-4 bg-[#635BFF] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-white transition-colors cursor-pointer border-none"
              >
                <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-white">
                  Save
                </span>
              </button>
            </div>
          </div>
        </form>
      ) : activeTab === "System" ? (
        <form onSubmit={handleSystemSave} className="flex flex-col items-start p-6 gap-6 bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full min-h-[818px] flex-none order-1 self-stretch grow-0">
          
          {/* Cards: Stat Cards container */}
          <div className="flex flex-row flex-wrap items-center p-0 gap-6 w-full flex-none order-0 self-stretch grow-0">
            {/* Stat 1: Uptime */}
            <div className="box-border flex flex-col justify-center items-center p-6 gap-[30px] flex-1 min-w-[200px] h-[108px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-none order-0">
              <div className="flex flex-col items-center p-0 gap-2 w-full h-[60px] flex-none order-0 grow-0">
                <span className="font-['Manrope'] font-semibold text-[28px] leading-[34px] text-center text-[#36C76C] h-[34px] flex-none order-0 grow-0">99.9%</span>
                <span className="font-['Manrope'] font-semibold text-[13px] leading-[18px] text-[#29343D] h-[18px] flex-none order-0 grow-0">Uptime</span>
              </div>
            </div>
            {/* Stat 2: Avg Response */}
            <div className="box-border flex flex-col justify-center items-center p-6 gap-[30px] flex-1 min-w-[200px] h-[108px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-none order-1">
              <div className="flex flex-col items-center p-0 gap-2 w-full h-[60px] flex-none order-0 grow-0">
                <span className="font-['Manrope'] font-semibold text-[28px] leading-[34px] text-center text-[#46CAEB] h-[34px] flex-none order-0 grow-0">156ms</span>
                <span className="font-['Manrope'] font-semibold text-[13px] leading-[18px] text-[#29343D] h-[18px] flex-none order-0 grow-0">Avg Response</span>
              </div>
            </div>
            {/* Stat 3: Active Salons */}
            <div className="box-border flex flex-col justify-center items-center p-6 gap-[30px] flex-1 min-w-[200px] h-[108px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-none order-2">
              <div className="flex flex-col items-center p-0 gap-2 w-full h-[60px] flex-none order-0 grow-0">
                <span className="font-['Manrope'] font-semibold text-[28px] leading-[34px] text-center text-[#635BFF] h-[34px] flex-none order-0 grow-0">47</span>
                <span className="font-['Manrope'] font-semibold text-[13px] leading-[18px] text-[#29343D] h-[18px] flex-none order-0 grow-0">Active Salons</span>
              </div>
            </div>
            {/* Stat 4: Database */}
            <div className="box-border flex flex-col justify-center items-center p-6 gap-[30px] flex-1 min-w-[200px] h-[108px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] flex-none order-3">
              <div className="flex flex-col items-center p-0 gap-2 w-full h-[60px] flex-none order-0 grow-0">
                <span className="font-['Manrope'] font-semibold text-[28px] leading-[34px] text-center text-[#36C76C] h-[34px] flex-none order-0 grow-0">Healthy</span>
                <span className="font-['Manrope'] font-semibold text-[13px] leading-[18px] text-[#29343D] h-[18px] flex-none order-0 grow-0">Database</span>
              </div>
            </div>
          </div>

          {/* Platform Configuration Card */}
          <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full flex-none order-1 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0 text-left">
              Platform Configuration
            </h2>
            <div className="flex flex-row flex-wrap items-start p-0 gap-[30px] w-full flex-none order-1 self-stretch grow-0">
              {/* Platform Name */}
              <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(50%-15px)] h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Platform Name:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow">
                    <input
                      type="text"
                      name="platformName"
                      value={systemData.platformName}
                      onChange={handleSystemInputChange}
                      placeholder="Yourcompany"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>

              {/* Support Email */}
              <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(50%-15px)] h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Support Email:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow">
                    <input
                      type="email"
                      name="supportEmail"
                      value={systemData.supportEmail}
                      onChange={handleSystemInputChange}
                      placeholder="support@yourcompany.com"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration & Trials Card */}
          <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full flex-none order-2 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0 text-left">
              Registration & Trials
            </h2>
            <div className="flex flex-row flex-wrap items-start p-0 gap-[30px] w-full flex-none order-1 self-stretch grow-0">
              {/* Trial Days */}
              <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(33.33%-20px)] h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Trial Days:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0 relative">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow relative">
                    <select
                      name="trialDays"
                      value={systemData.trialDays}
                      onChange={handleSystemInputChange}
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] appearance-none cursor-pointer pr-10 focus:outline-none"
                    >
                      <option value="7">7</option>
                      <option value="14">14</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-6 h-6 flex items-center justify-center">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Max Salons per Account */}
              <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(33.33%-20px)] h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Max Salons per Account:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0 relative">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow relative">
                    <select
                      name="maxSalons"
                      value={systemData.maxSalons}
                      onChange={handleSystemInputChange}
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] appearance-none cursor-pointer pr-10 focus:outline-none"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-6 h-6 flex items-center justify-center">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Default Plan */}
              <div className="flex flex-col items-start p-0 gap-2 w-full md:w-[calc(33.33%-20px)] h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Default Plan:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0 relative">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow relative">
                    <select
                      name="defaultPlan"
                      value={systemData.defaultPlan}
                      onChange={handleSystemInputChange}
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] appearance-none cursor-pointer pr-10 focus:outline-none"
                    >
                      <option value="Free">Free</option>
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none w-6 h-6 flex items-center justify-center">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Controls Card */}
          <div className="box-border flex flex-col justify-center items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full h-auto lg:h-[154px] flex-none order-3 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0 text-left">
              System Controls
            </h2>
            
            <div className="flex flex-row flex-wrap justify-between items-center p-0 gap-[30px] w-full h-[39px] flex-none order-1 self-stretch grow-0">
              {/* Toggle 1: Max Salons per Account (Maintenance Mode) */}
              <div className="flex flex-row items-center p-0 gap-[30px] flex-grow lg:flex-1 justify-between lg:justify-start lg:gap-6 w-full lg:w-auto h-[39px] flex-none">
                <div className="flex flex-col justify-center items-start p-0 gap-[4px] w-[264px] h-[39px] flex-none">
                  <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-[165px] h-[19px] flex-none text-left">
                    Max Salons per Account:
                  </span>
                  <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] w-[264px] h-[16px] flex-none text-left">
                    Temporarily disable platform access for all users
                  </span>
                </div>
                {/* Switch Component */}
                <button
                  type="button"
                  onClick={() => handleSystemToggle("maintenanceMode")}
                  className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                    systemData.maintenanceMode ? "bg-[#DDDBFF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                      systemData.maintenanceMode ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: New Signups Enabled */}
              <div className="flex flex-row items-center p-0 gap-[30px] flex-grow lg:flex-1 justify-between lg:justify-start lg:gap-6 w-full lg:w-auto h-[39px] flex-none">
                <div className="flex flex-col justify-center items-start p-0 gap-[4px] w-[161px] h-[39px] flex-none">
                  <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-[143px] h-[19px] flex-none text-left">
                    New Signups Enabled
                  </span>
                  <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] w-[161px] h-[16px] flex-none text-left">
                    Allow new salon registrations
                  </span>
                </div>
                {/* Switch Component */}
                <button
                  type="button"
                  onClick={() => handleSystemToggle("newSignupsEnabled")}
                  className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                    systemData.newSignupsEnabled ? "bg-[#DDDBFF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                      systemData.newSignupsEnabled ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Auto Backup */}
              <div className="flex flex-row items-center p-0 gap-[30px] flex-grow lg:flex-1 justify-between lg:justify-start lg:gap-6 w-full lg:w-auto h-[39px] flex-none">
                <div className="flex flex-col justify-center items-start p-0 gap-[4px] w-[190px] h-[39px] flex-none">
                  <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-[84px] h-[19px] flex-none text-left">
                    Auto Backup
                  </span>
                  <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] w-[190px] h-[16px] flex-none text-left">
                    Automatically backup system data
                  </span>
                </div>
                {/* Switch Component */}
                <button
                  type="button"
                  onClick={() => handleSystemToggle("autoBackup")}
                  className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                    systemData.autoBackup ? "bg-[#DDDBFF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                      systemData.autoBackup ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons at the bottom right */}
          <div className="flex flex-row justify-end items-center p-0 gap-3 w-full h-[44px] flex-none order-4 self-stretch grow-0 pt-4">
            {/* Btn: Cancel */}
            <button
              type="button"
              onClick={handleSystemCancel}
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#EFF4FA] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-[#0A2540] transition-colors cursor-pointer border-none flex-none order-0 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-[#0A2540]">
                Cancel
              </span>
            </button>
            {/* Btn: Save Changes */}
            <button
              type="submit"
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#635BFF] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-white transition-colors cursor-pointer border-none flex-none order-1 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-white">
                Save Changes
              </span>
            </button>
          </div>

        </form>
      ) : activeTab === "Security" ? (
        <form onSubmit={handleSecuritySave} className="flex flex-col items-start p-6 gap-6 bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full min-h-[818px] flex-none order-1 self-stretch grow-0">
          
          {/* Security Configuration Card */}
          <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full flex-none order-0 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0 text-left">
              Security Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full flex-none order-1 self-stretch grow-0">
              {/* Session Timeout (minutes) */}
              <div className="flex flex-col items-start p-0 gap-2 w-full h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Session Timeout (minutes):
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow">
                    <input
                      type="text"
                      name="sessionTimeout"
                      value={securityData.sessionTimeout}
                      onChange={handleSecurityInputChange}
                      placeholder="30"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>

              {/* Minimum Password Length */}
              <div className="flex flex-col items-start p-0 gap-2 w-full h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Minimum Password Length:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow">
                    <input
                      type="text"
                      name="minPasswordLength"
                      value={securityData.minPasswordLength}
                      onChange={handleSecurityInputChange}
                      placeholder="8"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>

              {/* Max Login Attempts */}
              <div className="flex flex-col items-start p-0 gap-2 w-full h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Max Login Attempts:
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow">
                    <input
                      type="text"
                      name="maxLoginAttempts"
                      value={securityData.maxLoginAttempts}
                      onChange={handleSecurityInputChange}
                      placeholder="5"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>

              {/* Lockout Duration (minutes) */}
              <div className="flex flex-col items-start p-0 gap-2 w-full h-[69px] flex-grow flex-none">
                <div className="flex flex-row items-center p-0 self-stretch w-full h-[19px] flex-none grow-0">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full h-[19px] flex-none order-0 flex-grow text-left">
                    Lockout Duration (minutes):
                  </label>
                </div>
                <div className="box-border flex flex-row items-center px-3 gap-4 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] self-stretch flex-none order-1 grow-0">
                  <div className="flex flex-row items-center p-0 gap-10 w-full h-5 flex-none order-0 flex-grow">
                    <input
                      type="text"
                      name="lockoutDuration"
                      value={securityData.lockoutDuration}
                      onChange={handleSecurityInputChange}
                      placeholder="15"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-column bottom layout */}
          <div className="flex flex-col lg:flex-row items-start py-4 px-0 gap-[30px] w-full flex-none order-1 self-stretch grow-0">
            {/* Column 1: Left larger list (2/3 width) */}
            <div className="box-border flex flex-col items-start p-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full lg:w-[calc(66.66%-15px)] flex-grow h-auto lg:h-[455px] flex-none">
              <div className="flex flex-col w-full divide-y divide-[#E0E6EB]">
                {/* Item 1: Two-factor Authentication */}
                <div className="flex flex-row justify-between items-center w-full py-4 first:pt-0">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                      Two-factor Authentication
                    </span>
                    <span className="font-['Manrope'] font-bold text-[15px] leading-5 text-[#98A4AE]">
                      Mandatory 2FA for all super admin accounts
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (securityData.twoFactorEnabled) {
                        setSecurityData((prev) => ({ ...prev, twoFactorEnabled: false }));
                        setToastMessage("Two-factor authentication disabled");
                        setTimeout(() => setToastMessage(null), 2000);
                      } else {
                        setActiveModal("2fa_step1_qr");
                      }
                    }}
                    className={`flex flex-row justify-center items-center py-[5px] px-4 h-[34px] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-6 transition-colors cursor-pointer border-none flex-none ${
                      securityData.twoFactorEnabled
                        ? "bg-[#FFE5ED] text-[#FF6692] hover:bg-[#ffd1df]"
                        : "bg-[#635BFF] text-white hover:bg-[#5249eb]"
                    }`}
                  >
                    {securityData.twoFactorEnabled ? "Disable" : "Enable"}
                  </button>
                </div>

                {/* Item 2: Password */}
                <div className="flex flex-row justify-between items-center w-full py-4">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                      Password
                    </span>
                    <span className="font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] tracking-[2px]">
                      ••••••••••••••••
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal("change_password")}
                    className="flex flex-row justify-center items-center py-[5px] px-4 h-[34px] bg-[#635BFF] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-6 text-white transition-colors cursor-pointer border-none flex-none hover:bg-[#5249eb]"
                  >
                    Change
                  </button>
                </div>

                {/* Item 3: Recovery email */}
                <div className="flex flex-row justify-between items-center w-full py-4">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                      Recovery email
                    </span>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] text-[#98A4AE]">
                      {securityData.recoveryEmail}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const email = prompt("Enter new recovery email:", securityData.recoveryEmail);
                      if (email) {
                        setSecurityData(prev => ({ ...prev, recoveryEmail: email }));
                        setToastMessage("Recovery email updated");
                        setTimeout(() => setToastMessage(null), 2000);
                      }
                    }}
                    className="flex flex-row justify-center items-center py-[5px] px-4 h-[34px] bg-[#DDDBFF] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-6 text-[#635BFF] transition-colors cursor-pointer border-none flex-none hover:bg-[#c9c6ff]"
                  >
                    Setup
                  </button>
                </div>

                {/* Item 4: Able to impersonate salons */}
                <div className="flex flex-row justify-between items-center w-full py-4">
                  <div className="flex flex-col gap-1 text-left justify-center h-[35px]">
                    <span className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                      Able to impersonate salons
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSecurityToggle("impersonateSalons")}
                    className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                      securityData.impersonateSalons ? "bg-[#DDDBFF]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                        securityData.impersonateSalons ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Item 5: Recovery phone number */}
                <div className="flex flex-row justify-between items-center w-full py-4 last:pb-0">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                      Recovery phone number
                    </span>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] text-[#98A4AE]">
                      {securityData.recoveryPhone}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const phone = prompt("Enter new recovery phone:", securityData.recoveryPhone);
                      if (phone) {
                        setSecurityData(prev => ({ ...prev, recoveryPhone: phone }));
                        setToastMessage("Recovery phone updated");
                        setTimeout(() => setToastMessage(null), 2000);
                      }
                    }}
                    className="flex flex-row justify-center items-center py-[5px] px-4 h-[34px] bg-[#DDDBFF] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-6 text-[#635BFF] transition-colors cursor-pointer border-none flex-none hover:bg-[#c9c6ff]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Right Devices list (1/3 width) */}
            <div className="box-border flex flex-col items-start p-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full lg:w-[calc(33.33%-15px)] flex-none h-auto lg:h-[468px]">
              
              <div className="flex flex-col items-start gap-4 w-full text-left">
                <div className="w-12 h-12 rounded-lg bg-[#DDDBFF] flex items-center justify-center text-[#635BFF] flex-none">
                  <MonitorIcon />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                    Devices
                  </h2>
                  <span className="font-['Manrope'] font-normal text-[15px] leading-5 text-[#29343D] max-w-xs block">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal("signout_all")}
                className="w-full h-11 mt-4 bg-[#635BFF] text-white rounded-lg font-['Manrope'] font-semibold text-[14px] leading-6 hover:bg-[#5249eb] transition-colors cursor-pointer border-none flex items-center justify-center"
              >
                Sign out from all devices
              </button>

              <div className="flex flex-col w-full divide-y divide-[#E0E6EB] mt-4">
                {securityData.devices.length > 0 ? (
                  securityData.devices.map((device) => (
                    <div key={device.id} className="flex flex-row justify-between items-center py-3.5 first:pt-0 last:pb-0">
                      <div className="flex flex-row items-center gap-3">
                        <div className="text-[#29343D]">
                          {device.type === "mobile" ? <PhoneIcon /> : <LaptopIcon />}
                        </div>
                        <div className="flex flex-col gap-0.5 text-left">
                          <span className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                            {device.name}
                          </span>
                          <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] text-[#98A4AE]">
                            {device.location}
                          </span>
                        </div>
                      </div>
                      <div onClick={() => handleRemoveDevice(device.id, device.name)}>
                        <DotsVerticalIcon />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-[#98A4AE] font-['Manrope'] w-full">
                    No active devices.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons at the bottom right */}
          <div className="flex flex-row justify-end items-center p-0 gap-3 w-full h-[44px] flex-none order-2 self-stretch grow-0 pt-4">
            {/* Btn: Cancel */}
            <button
              type="button"
              onClick={handleSecurityCancel}
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#EFF4FA] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-[#0A2540] transition-colors cursor-pointer border-none flex-none order-0 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-[#0A2540]">
                Cancel
              </span>
            </button>
            {/* Btn: Save Changes */}
            <button
              type="submit"
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#635BFF] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-white transition-colors cursor-pointer border-none flex-none order-1 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-white">
                Save Changes
              </span>
            </button>
          </div>

        </form>
      ) : activeTab === "Billing" ? (
        <form onSubmit={handleBillingSave} className="flex flex-col items-start p-6 gap-6 bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full min-h-[614px] flex-none order-1 self-stretch grow-0">
          
          {/* Payment Configuration Card */}
          <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full flex-none order-0 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0 text-left">
              Payment Configuration
            </h2>
            
            {/* Stripe Integration Section */}
            <div className="flex flex-col items-start gap-4 w-full flex-none order-1 self-stretch grow-0">
              <h3 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full text-left">
                Stripe Integration
              </h3>
              
              {/* Enable Stripe Toggle Row */}
              <div className="flex flex-row items-center gap-[30px] h-[39px] w-full">
                <div className="flex flex-col justify-center items-start gap-1 w-[152px] h-[39px]">
                  <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D]">
                    Enable Stripe
                  </span>
                  <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE]">
                    Primary payment processor
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setBillingData(prev => ({ ...prev, enableStripe: !prev.enableStripe }))}
                  className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                    billingData.enableStripe ? "bg-[#DDDBFF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                      billingData.enableStripe ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                    }`}
                  />
                </button>

                {billingData.enableStripe && (
                  <div className="flex flex-row justify-center items-center py-0.5 px-2 bg-[#EBFAF0] rounded-md h-[22px]">
                    <span className="font-['Manrope'] font-semibold text-[13px] leading-[18px] text-[#36C76C]">
                      Active
                    </span>
                  </div>
                )}
              </div>

              {/* Stripe Keys and Test Connection Row */}
              <div className={`flex flex-col lg:flex-row items-end gap-[30px] w-full mt-2 transition-opacity duration-200 ${!billingData.enableStripe ? "opacity-50" : ""}`}>
                {/* Publishable Key */}
                <div className="flex flex-col items-start gap-2 flex-grow w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Stripe Publishable Key
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="text"
                      name="stripePublishableKey"
                      value={billingData.stripePublishableKey}
                      onChange={handleBillingInputChange}
                      disabled={!billingData.enableStripe}
                      placeholder="pk_test_..."
                      required={billingData.enableStripe}
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>

                {/* Secret Key */}
                <div className="flex flex-col items-start gap-2 flex-grow w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Stripe Secret Key
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="password"
                      name="stripeSecretKey"
                      value={billingData.stripeSecretKey}
                      onChange={handleBillingInputChange}
                      disabled={!billingData.enableStripe}
                      placeholder="sk_test_..."
                      required={billingData.enableStripe}
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>

                {/* Test Connection Button */}
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={!billingData.enableStripe || isTestingConnection}
                  className={`flex flex-row justify-center items-center py-2.5 px-4 h-[42px] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] transition-colors cursor-pointer border-none flex-none ${
                    billingData.enableStripe && !isTestingConnection
                      ? "bg-[#DDDBFF] text-[#635BFF] hover:bg-[#c9c6ff]"
                      : "bg-[#EFF4FA] text-[#98A4AE] cursor-not-allowed"
                  }`}
                >
                  {isTestingConnection ? "Testing..." : "Test Connection"}
                </button>
              </div>
            </div>

            {/* Line Divider */}
            <div className="w-full h-0 border-b border-[#E0E6EB] flex-none order-2 self-stretch grow-0 my-2" />

            {/* Billing Configuration Section */}
            <div className="flex flex-col items-start gap-4 w-full flex-none order-3 self-stretch grow-0">
              <h3 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full text-left">
                Billing Configuration
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] w-full">
                {/* Currency */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Currency
                  </label>
                  <div 
                    className="relative w-full"
                    onMouseLeave={() => setCurrencyDropdownOpen(false)}
                  >
                    <div
                      onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                      className="box-border flex flex-row justify-between items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] cursor-pointer"
                    >
                      <span className="font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D]">
                        {billingData.currency}
                      </span>
                      <ChevronDownIcon />
                    </div>
                    {currencyDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-[4px] shadow-lg z-10 py-1">
                        {["EUR (€)", "USD ($)", "GBP (£)"].map((curr) => (
                          <div
                            key={curr}
                            onClick={() => {
                              setBillingData(prev => ({ ...prev, currency: curr }));
                              setCurrencyDropdownOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-[#F4F7FB] font-['Manrope'] font-normal text-[14px] text-[#29343D] cursor-pointer"
                          >
                            {curr}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tax Rate (%) */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Tax Rate (%)
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="text"
                      name="taxRate"
                      value={billingData.taxRate}
                      onChange={handleBillingInputChange}
                      placeholder="0"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>

                {/* Invoice Prefix */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Invoice Prefix
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="text"
                      name="invoicePrefix"
                      value={billingData.invoicePrefix}
                      onChange={handleBillingInputChange}
                      placeholder="INV-"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>

                {/* Grace Period (days) */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Grace Period (days)
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="text"
                      name="gracePeriod"
                      value={billingData.gracePeriod}
                      onChange={handleBillingInputChange}
                      placeholder="3"
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons at the bottom right */}
          <div className="flex flex-row justify-end items-center p-0 gap-3 w-full h-[44px] flex-none order-1 self-stretch grow-0 pt-4">
            {/* Btn: Cancel */}
            <button
              type="button"
              onClick={handleBillingCancel}
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#EFF4FA] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-[#0A2540] transition-colors cursor-pointer border-none flex-none order-0 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-[#0A2540]">
                Cancel
              </span>
            </button>
            {/* Btn: Save Changes */}
            <button
              type="submit"
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#635BFF] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-white transition-colors cursor-pointer border-none flex-none order-1 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-white">
                Save Changes
              </span>
            </button>
          </div>

        </form>
      ) : activeTab === "Notifications" ? (
        <form onSubmit={handleNotificationSave} className="flex flex-col items-start p-6 gap-6 bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full min-h-[603px] flex-none order-1 self-stretch grow-0">
          
          {/* Notification Preferences Card */}
          <div className="box-border flex flex-col items-start p-[30px] gap-[30px] bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full flex-none order-0 self-stretch grow-0">
            <h2 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] w-full h-[25px] flex-none order-0 self-stretch grow-0 text-left">
              Notification Preferences
            </h2>
            
            {/* Email Notifications Section */}
            <div className="flex flex-col items-start gap-4 w-full flex-none order-1 self-stretch grow-0">
              <h3 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full text-left">
                Email Notifications
              </h3>
              
              {/* Grid of 3 toggles: Payment Failures, New Signups, System Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] w-full">
                {/* Toggle 1: Payment Failures */}
                <div className="flex flex-row items-center justify-between md:justify-start md:gap-[30px] h-[39px] w-full">
                  <div className="flex flex-col justify-center items-start gap-1 flex-grow max-w-[215px]">
                    <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                      Payment Failures
                    </span>
                    <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                      Notify when subscription payments fail
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle("paymentFailures")}
                    className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                      notificationData.paymentFailures ? "bg-[#DDDBFF]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                        notificationData.paymentFailures ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2: New Signups */}
                <div className="flex flex-row items-center justify-between md:justify-start md:gap-[30px] h-[39px] w-full">
                  <div className="flex flex-col justify-center items-start gap-1 flex-grow max-w-[215px]">
                    <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                      New Signups
                    </span>
                    <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                      Alert when new salons register
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle("newSignups")}
                    className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                      notificationData.newSignups ? "bg-[#DDDBFF]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                        notificationData.newSignups ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 3: System Alerts */}
                <div className="flex flex-row items-center justify-between md:justify-start md:gap-[30px] h-[39px] w-full">
                  <div className="flex flex-col justify-center items-start gap-1 flex-grow max-w-[215px]">
                    <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                      System Alerts
                    </span>
                    <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                      Critical system status notifications
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle("systemAlerts")}
                    className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                      notificationData.systemAlerts ? "bg-[#DDDBFF]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                        notificationData.systemAlerts ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Line Divider */}
            <div className="w-full h-0 border-b border-[#E0E6EB] flex-none order-2 self-stretch grow-0 my-2" />

            {/* Automated Reports Section */}
            <div className="flex flex-col items-start gap-4 w-full flex-none order-3 self-stretch grow-0">
              <h3 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full text-left">
                Automated Reports
              </h3>
              
              {/* Grid of 2 toggles: Weekly Reports, Monthly Reports */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full">
                {/* Toggle 1: Weekly Reports */}
                <div className="flex flex-row items-center justify-between md:justify-start md:gap-[30px] h-[39px] w-full">
                  <div className="flex flex-col justify-center items-start gap-1 flex-grow max-w-[225px]">
                    <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                      Weekly Reports
                    </span>
                    <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                      Weekly platform analytics summary
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle("weeklyReports")}
                    className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                      notificationData.weeklyReports ? "bg-[#DDDBFF]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                        notificationData.weeklyReports ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2: Monthly Reports */}
                <div className="flex flex-row items-center justify-between md:justify-start md:gap-[30px] h-[39px] w-full">
                  <div className="flex flex-col justify-center items-start gap-1 flex-grow max-w-[225px]">
                    <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                      Monthly Reports
                    </span>
                    <span className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                      Comprehensive monthly business report
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle("monthlyReports")}
                    className={`relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-[4px] border border-transparent transition-colors duration-200 ease-in-out focus:outline-none flex-none ${
                      notificationData.monthlyReports ? "bg-[#DDDBFF]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[6px] transition duration-200 ease-in-out absolute top-[2px] shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] ${
                        notificationData.monthlyReports ? "left-[18px] bg-[#635BFF]" : "left-[2px] bg-slate-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Line Divider */}
            <div className="w-full h-0 border-b border-[#E0E6EB] flex-none order-4 self-stretch grow-0 my-2" />

            {/* Webhook Integration Section */}
            <div className="flex flex-col items-start gap-4 w-full flex-none order-5 self-stretch grow-0">
              <h3 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] w-full text-left">
                Webhook Integration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full">
                {/* Webhook URL */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Webhook URL
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="text"
                      name="webhookUrl"
                      value={notificationData.webhookUrl}
                      onChange={handleNotificationInputChange}
                      placeholder="https://..."
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>

                {/* Stripe Secret Key */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                    Stripe Secret Key
                  </label>
                  <div className="box-border flex flex-row items-center px-3 w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px]">
                    <input
                      type="text"
                      name="stripeSecretKey"
                      value={notificationData.stripeSecretKey}
                      onChange={handleNotificationInputChange}
                      placeholder="https://..."
                      required
                      className="w-full bg-transparent border-none outline-none font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE]"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Action buttons at the bottom right */}
          <div className="flex flex-row justify-end items-center p-0 gap-3 w-full h-[44px] flex-none order-1 self-stretch grow-0 pt-4">
            {/* Btn: Cancel */}
            <button
              type="button"
              onClick={handleNotificationCancel}
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#EFF4FA] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-[#0A2540] transition-colors cursor-pointer border-none flex-none order-0 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-[#0A2540]">
                Cancel
              </span>
            </button>
            {/* Btn: Save Changes */}
            <button
              type="submit"
              className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#635BFF] rounded-lg font-['Manrope'] font-medium text-[14px] leading-[24px] text-white transition-colors cursor-pointer border-none flex-none order-1 grow-0"
            >
              <span className="font-['Manrope'] font-medium text-[14px] leading-[24px] text-center text-white">
                Save Changes
              </span>
            </button>
          </div>

        </form>
      ) : (
        /* Empty tab state */
        <div className="flex flex-col p-12 gap-4 bg-white rounded-xl shadow-[0_4px_18px_rgba(17,31,56,0.06)] w-full justify-center items-center">
          <div className="w-12 h-12 rounded-full bg-[#EFF4FA] flex items-center justify-center text-[#635BFF]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
            {activeTab} Settings
          </h3>
          <p className="font-['Manrope'] font-normal text-[14px] leading-[20px] text-center text-[#98A4AE] max-w-sm">
            Configuration options for the {activeTab} panel are currently under development.
          </p>
        </div>
      )}

    {/* ========================================================================= */}
      {/* =============================== MODALS ================================== */}
      {/* ========================================================================= */}

      {/* 1. Change Password Modal */}
      {activeModal === "change_password" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] w-full max-w-[600px] p-[30px] relative shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-[#E0E6EB] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-[30px]">
              <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                Change Password
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#98A4AE] hover:text-[#29343D] transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[30px]">
              {/* Current Password */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={passwordFields.currentPassword}
                  onChange={(e) => setPasswordFields(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="box-border w-full h-[42px] px-3 bg-white border border-[#E0E6EB] rounded-[4px] font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE] focus:border-[#635BFF] focus:outline-none"
                />
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={passwordFields.newPassword}
                  onChange={(e) => setPasswordFields(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="box-border w-full h-[42px] px-3 bg-white border border-[#E0E6EB] rounded-[4px] font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE] focus:border-[#635BFF] focus:outline-none"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={passwordFields.confirmPassword}
                  onChange={(e) => setPasswordFields(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="box-border w-full h-[42px] px-3 bg-white border border-[#E0E6EB] rounded-[4px] font-['Manrope'] font-normal text-[14px] leading-5 text-[#29343D] placeholder-[#98A4AE] focus:border-[#635BFF] focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-[30px] pt-4 border-t border-[#E0E6EB]">
              <button
                type="button"
                onClick={() => {
                  setToastMessage("Password changed successfully!");
                  setActiveModal(null);
                  setPasswordFields({ currentPassword: "••••••••••••••••", newPassword: "", confirmPassword: "" });
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="flex flex-row justify-center items-center py-2.5 px-4 h-[44px] bg-[#635BFF] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-[24px] text-white transition-colors cursor-pointer border-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sign Out From All Devices Modal */}
      {activeModal === "signout_all" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] w-full max-w-[440px] p-[30px] relative shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-[#E0E6EB] animate-in zoom-in-95 duration-200">
            <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D] mb-4 text-left">
              Sign out from all devices
            </h3>
            <p className="font-['Manrope'] font-normal text-[14px] leading-[20px] text-[#29343D]/80 text-left mb-6">
              Are you sure you want to sign out of all devices?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex flex-row justify-center items-center py-2.5 px-4 h-[40px] bg-[#EFF4FA] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-[20px] text-[#0A2540] transition-colors cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSignoutAllDevices();
                  setActiveModal(null);
                }}
                className="flex flex-row justify-center items-center py-2.5 px-4 h-[40px] bg-[#635BFF] rounded-lg font-['Manrope'] font-semibold text-[14px] leading-[20px] text-white transition-colors cursor-pointer border-none"
              >
                Sign Out Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Authenticator App Modal - QR Code version */}
      {activeModal === "2fa_step1_qr" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-[30px] relative shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-[#E0E6EB] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                Add Authenticator App
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#98A4AE] hover:text-[#29343D] transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col gap-1 mt-4">
              <h4 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                Step 1: Scan this QR Code
              </h4>
              <p className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                Scan the following QR code with your authenticator app, such as Google Authenticator, Duo Mobile, Authy, etc.
              </p>
            </div>

            {/* QR Code Graphic */}
            <div className="flex flex-col items-center justify-center py-2">
              <QRCodePlaceholder />
              <button
                type="button"
                onClick={() => setActiveModal("2fa_step1_key")}
                className="text-[#635BFF] hover:underline font-['Manrope'] font-semibold text-[14px] leading-5 bg-transparent border-none cursor-pointer mt-2"
              >
                Can't scan the QR code?
              </button>
            </div>

            {/* Step 2 Inputs */}
            <div className="flex flex-col gap-2 mt-4">
              <h4 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                Step 2: Enter the one-time code
              </h4>
              <p className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                Enter the 6-digit verification code generated by the authenticator app.
              </p>
              <div className="flex flex-row justify-between gap-2.5 mt-3">
                {twoFactorCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={1}
                    ref={(el) => {
                      codeInputsRef.current[idx] = el;
                    }}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className="box-border w-12 h-12 border border-[#E0E6EB] rounded-lg text-center font-['Manrope'] font-semibold text-lg text-[#29343D] focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] focus:outline-none"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Add Authenticator App Modal - Key Text version */}
      {activeModal === "2fa_step1_key" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] w-full max-w-[500px] p-[30px] relative shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-[#E0E6EB] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                Add Authenticator App
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#98A4AE] hover:text-[#29343D] transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col gap-1 mt-4">
              <h4 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                Step 1: Scan this QR Code
              </h4>
              <p className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                Scan the following QR code with your authenticator app, such as Google Authenticator, Duo Mobile, Authy, etc.
              </p>
            </div>

            {/* Key Copy Graphic */}
            <div className="flex flex-col items-center justify-center py-4 gap-3">
              <div className="w-full bg-[#F4F7FB] border border-[#E0E6EB] rounded-[4px] py-3 px-4 break-all text-center font-mono text-xs font-semibold tracking-wider text-[#29343D]">
                HDOEIDAOMCICSALDIVOVLAOIDC932DJSLDKLDNCCCCSD
              </div>
              <button
                type="button"
                onClick={handleCopyKey}
                className="box-border border border-[#635BFF] text-[#635BFF] bg-white rounded-lg py-2 px-6 font-['Manrope'] font-semibold text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("2fa_step1_qr")}
                className="text-[#635BFF] hover:underline font-['Manrope'] font-semibold text-[14px] leading-5 bg-transparent border-none cursor-pointer mt-1"
              >
                Want to scan QR code?
              </button>
            </div>

            {/* Step 2 Inputs */}
            <div className="flex flex-col gap-2 mt-4">
              <h4 className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#29343D] text-left">
                Step 2: Enter the one-time code
              </h4>
              <p className="font-['Manrope'] font-normal text-[12px] leading-[16px] text-[#98A4AE] text-left">
                Enter the 6-digit verification code generated by the authenticator app.
              </p>
              <div className="flex flex-row justify-between gap-2.5 mt-3">
                {twoFactorCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={1}
                    ref={(el) => {
                      codeInputsRef.current[idx] = el;
                    }}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    className="box-border w-12 h-12 border border-[#E0E6EB] rounded-lg text-center font-['Manrope'] font-semibold text-lg text-[#29343D] focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] focus:outline-none"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Save your backup code Modal */}
      {activeModal === "2fa_backup" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] w-full max-w-[480px] p-[30px] relative shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-[#E0E6EB] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[25px] text-[#29343D]">
                Save your backup code
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-[#98A4AE] hover:text-[#29343D] transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="font-['Manrope'] font-normal text-[12px] leading-[18px] text-[#98A4AE] text-left mb-4">
              You can use one of these backup codes to access your account if you have trouble during 2-step authentication in another ways. Each code may be used only once.
            </p>

            {/* Code Box */}
            <div className="bg-[#F4F7FB] border border-[#E0E6EB] rounded-lg p-5 font-mono font-semibold text-[14px] tracking-wider text-[#29343D] grid grid-cols-2 gap-4 text-center my-6">
              <div>HDOEIDAD</div>
              <div>OFFUSFPL</div>
              <div>HDOEIDAD</div>
              <div>OFFUSFPL</div>
            </div>

            {/* Actions: Download / Copy */}
            <div className="flex flex-row justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={handleDownloadBackupCodes}
                className="flex-1 box-border border border-[#635BFF] text-[#635BFF] bg-white rounded-lg py-2.5 font-['Manrope'] font-semibold text-[13px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center"
              >
                Download
              </button>
              <button
                type="button"
                onClick={handleCopyBackupCodes}
                className="flex-1 box-border border border-[#635BFF] text-[#635BFF] bg-white rounded-lg py-2.5 font-['Manrope'] font-semibold text-[13px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center"
              >
                Copy
              </button>
            </div>

            {/* Bottom Continue Button */}
            <button
              type="button"
              onClick={() => {
                setSecurityData((prev) => ({ ...prev, twoFactorEnabled: true }));
                setActiveModal("2fa_success");
                setToastMessage("Two-factor authentication enabled successfully!");
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="w-full h-[44px] bg-[#635BFF] text-white rounded-lg font-['Manrope'] font-semibold text-[14px] hover:bg-[#5249eb] transition-colors cursor-pointer border-none flex items-center justify-center"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* 6. Two-Factor Authentication Success Modal */}
      {activeModal === "2fa_success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] w-full max-w-[450px] p-[30px] relative shadow-[0px_4px_24px_rgba(0,0,0,0.1)] border border-[#E0E6EB] animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-[#98A4AE] hover:text-[#29343D] transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full border-2 border-[#36C76C] flex items-center justify-center text-[#36C76C] mx-auto mt-6 mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="font-['Manrope'] font-semibold text-[18px] leading-[26px] text-[#29343D] text-center mb-2 px-4">
              Two-Factor Authentication has been successfully set up
            </h3>

            {/* Subtext */}
            <p className="font-['Manrope'] font-normal text-[13px] leading-[18px] text-[#98A4AE] text-center mb-4">
              Your account is now more secure.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}


