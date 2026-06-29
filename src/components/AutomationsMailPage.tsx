"use client";

import React, { useState } from "react";

// Types
interface NotificationItem {
  id: string;
  title: string;
  category: string;
  salon: string;
  date: string;
  time: string;
  type: "Email" | "SMS" | "WhatsApp";
  source: "Auto" | "Manual";
  status: "Sent" | "Failed" | "Opened" | "Clicked";
  read: boolean;
  hasAttachment?: boolean;
  attachmentCount?: number;
  emailLink?: string;
  operator?: string;
  recipient?: string;
  message?: string;
}

// Icons Component Helpers (Raw SVG styled with exact vectors matching screenshot)
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57.57" />
  </svg>
);

const PaperPlaneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-400 shrink-0 ml-1.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-400 shrink-0 ml-1.5">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#98A4AE]">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

// Custom Category Icons (designed to match screenshot circles with white vectors)
const ShopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
    <path d="M12 9v12" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BillingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const PerformanceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const AccountantIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

const FlagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const TechnicalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
    <path d="M22 12h-4" />
    <path d="M6 12H2" />
    <path d="M10 12h4" />
  </svg>
);

const TicketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
    <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="3 3" />
  </svg>
);

const CloudIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19A5.5 5.5 0 0 0 18 8.02a1 1 0 0 0-.8-.8A7 7 0 0 0 3.5 11.5a1 1 0 0 0 .5.8 5.5 5.5 0 0 0 13.5 6.7Z" />
  </svg>
);

const LeadsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Initial list of notifications matching Screenshot 1 exactly
const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New appointment scheduled for tomorrow at 3 PM",
    category: "Salon Operations",
    salon: "Bella Vista Salon",
    date: "07/08/2025",
    time: "11:44",
    type: "Email",
    source: "Auto",
    status: "Opened",
    read: true,
    operator: "Maria Rodriguez",
    recipient: "Clients",
    message: "A new appointment has been scheduled for tomorrow at 3 PM at Bella Vista Salon. Details: Hair Cut & Coloring with Senior Operator Maria Rodriguez. Client has confirmed via email."
  },
  {
    id: "notif-2",
    title: "Client Maria left a 5-star review on your service",
    category: "Client Engagement",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "Email",
    source: "Auto",
    status: "Opened",
    read: true,
    hasAttachment: true,
    attachmentCount: 1,
    operator: "Carlos Rodriguez",
    recipient: "Owners",
    message: "Client Maria left a 5-star review: 'Outstanding service! The massage and aromatherapy were amazing. Very professional staff and peaceful environment.' Attachment: review_photo.jpg"
  },
  {
    id: "notif-3",
    title: "Online payment of $120 has been successfully processed",
    category: "Payments & Billing",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "Email",
    source: "Manual",
    status: "Opened",
    read: false,
    emailLink: "teste@teste.com",
    operator: "Auto",
    recipient: "Accountant",
    message: "Transaction notification: Online payment of $120.00 from client test@teste.com has been successfully processed via Stripe. Invoice ref: #INV-080825."
  },
  {
    id: "notif-4",
    title: "Shampoo stock is running low (5 units remaining)",
    category: "Inventory & Product Management",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "SMS",
    source: "Auto",
    status: "Clicked",
    read: true,
    hasAttachment: true,
    attachmentCount: 1,
    operator: "Auto",
    recipient: "Owners",
    message: "Inventory Warning: Shampoo stock is running low. Only 5 units remaining in the backroom inventory. Attachment: auto_order_requisition.pdf"
  },
  {
    id: "notif-5",
    title: "Weekly performance report for staff is now available",
    category: "Employee Performance & HR",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "Email",
    source: "Auto",
    status: "Sent",
    read: false,
    operator: "Roberto Marini",
    recipient: "Employees",
    message: "The weekly performance report for staff has been generated. Key highlights: 15% increase in rebookings, average client rating 4.8/5.0."
  },
  {
    id: "notif-6",
    title: "Monthly financial summary is ready for review",
    category: "Accountant-Specific",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "Email",
    source: "Manual",
    status: "Sent",
    read: false,
    emailLink: "teste@teste.com",
    operator: "Auto",
    recipient: "Accountant",
    message: "Financial Operations: Monthly financial summary statement is completed. Please review revenue reconciliation spreadsheet attached in document portal."
  },
  {
    id: "notif-7",
    title: "New salon branch has been added to the platform",
    category: "Super Admin / Platform-Level",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "WhatsApp",
    source: "Auto",
    status: "Sent",
    read: false,
    operator: "Auto",
    recipient: "Super Admin",
    message: "System Event: A new salon branch 'Elegant Touch Spa - East Side' has been added to the tenant dashboard and is awaiting service activation."
  },
  {
    id: "notif-8",
    title: "Scheduled system maintenance will occur at 2 AM",
    category: "System & Technical",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "SMS",
    source: "Auto",
    status: "Sent",
    read: true,
    operator: "Auto",
    recipient: "Super Admin",
    message: "Maintenance Advisory: Infrastructure database upgrading and security patching will be carried out at 2:00 AM on 07/08/2025. Expected downtime is 10 minutes."
  },
  {
    id: "notif-9",
    title: "A new support ticket (#4521) has been assigned to you",
    category: "Support & Ticketing",
    salon: "Elegant Touch Spa",
    date: "07/08/2025",
    time: "11:44",
    type: "Email",
    source: "Auto",
    status: "Sent",
    read: true,
    operator: "Auto",
    recipient: "Owners",
    message: "Support desk: Ticket #4521 has been assigned to you. Subject: 'Card reader terminal integration failure'. Customer is requesting urgent phone callback."
  }
];

export default function AutomationsMailPage() {
  // Lists data states
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Filtering states
  const [activeTypeTab, setActiveTypeTab] = useState<"All" | "Email" | "SMS" | "WhatsApp">("All");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Advanced Filters states
  const [dataRangeFilter, setDataRangeFilter] = useState("All Time");
  const [salonFilter, setSalonFilter] = useState("All Salons");
  const [operatorFilter, setOperatorFilter] = useState("All Operators");
  const [recipientFilter, setRecipientFilter] = useState("All Recipient");

  // Dropdown UI opening control
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Modals & toast states
  const [viewDetailsItem, setViewDetailsItem] = useState<NotificationItem | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "info" | "error" }[]>([]);

  // Send Email Modal fields
  const [sendRecipient, setSendRecipient] = useState("");
  const [sendSubject, setSendSubject] = useState("");
  const [sendCategory, setSendCategory] = useState("Salon Operations");
  const [sendSalon, setSendSalon] = useState("Elegant Touch Spa");
  const [sendMessage, setSendMessage] = useState("");

  // Reusable trigger for Toast notification
  const triggerToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    triggerToast("All notifications marked as read!");
  };

  // Mark single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
    triggerToast("Notification marked as read");
  };

  // Refresh page data trigger simulation
  const handleRefreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      triggerToast("Data successfully synchronized", "success");
    }, 1000);
  };

  // Reset all filter selections
  const handleResetFilters = () => {
    setActiveTypeTab("All");
    setSourceFilter("All Sources");
    setStatusFilter("All Status");
    setCategoryFilter("All Categories");
    setDataRangeFilter("All Time");
    setSalonFilter("All Salons");
    setOperatorFilter("All Operators");
    setRecipientFilter("All Recipient");
    triggerToast("All filters reset successfully", "info");
  };

  // Send email simulation
  const handleSendEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendRecipient || !sendSubject || !sendMessage) {
      triggerToast("Please fill in all required fields", "error");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: sendSubject,
        category: sendCategory,
        salon: sendSalon,
        date: new Date().toLocaleDateString("en-GB"),
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        type: "Email",
        source: "Manual",
        status: "Sent",
        read: false,
        emailLink: sendRecipient,
        operator: "David McMichael",
        recipient: "Clients",
        message: sendMessage
      };

      setNotifications((prev) => [newNotif, ...prev]);
      setIsSending(false);
      setShowSendModal(false);

      setSendRecipient("");
      setSendSubject("");
      setSendMessage("");

      triggerToast(`Email to ${sendRecipient} sent successfully!`, "success");
    }, 1200);
  };

  // Filter application logic
  const filteredNotifications = notifications.filter((item) => {
    if (activeTypeTab !== "All" && item.type !== activeTypeTab) return false;

    if (sourceFilter !== "All Sources") {
      if (sourceFilter === "Auto" && item.source !== "Auto") return false;
      if (sourceFilter === "Manual" && item.source !== "Manual") return false;
    }

    if (statusFilter !== "All Status" && item.status !== statusFilter) return false;

    if (categoryFilter !== "All Categories" && item.category !== categoryFilter) return false;

    if (salonFilter !== "All Salons" && item.salon !== salonFilter) return false;

    if (operatorFilter !== "All Operators") {
      if (operatorFilter === "Auto" && item.operator !== "Auto") return false;
      if (operatorFilter === "Manual" && item.operator === "Auto") return false;
      if (operatorFilter !== "Auto" && operatorFilter !== "Manual" && item.operator !== operatorFilter) return false;
    }

    if (recipientFilter !== "All Recipient" && item.recipient !== recipientFilter) return false;

    return true;
  });

  const unreadCount = filteredNotifications.filter((item) => !item.read).length;

  // Category visual matching helpers (using colors from Figma specifications)
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Salon Operations":
        return { bg: "bg-[#635BFF]", text: "text-white", icon: <ShopIcon /> };
      case "Client Engagement":
        return { bg: "bg-[#16CDC7]", text: "text-white", icon: <UserIcon /> };
      case "Payments & Billing":
        return { bg: "bg-[#36C76C]", text: "text-white", icon: <BillingIcon /> };
      case "Inventory & Product Management":
        return { bg: "bg-[#3A4B5A]", text: "text-white", icon: <BoxIcon /> };
      case "Employee Performance & HR":
        return { bg: "bg-[#0099FF]", text: "text-white", icon: <PerformanceIcon /> };
      case "Accountant-Specific":
        return { bg: "bg-[#FFA800]", text: "text-white", icon: <AccountantIcon /> };
      case "Super Admin / Platform-Level":
        return { bg: "bg-[#FF4B72]", text: "text-white", icon: <FlagIcon /> };
      case "System & Technical":
        return { bg: "bg-[#1A202C]", text: "text-white", icon: <TechnicalIcon /> };
      case "Support & Ticketing":
        return { bg: "bg-[#5850EC]", text: "text-white", icon: <TicketIcon /> };
      case "Internal SAAS":
        return { bg: "bg-[#8B5CF6]", text: "text-white", icon: <CloudIcon /> };
      case "Leads Management":
        return { bg: "bg-[#EC4899]", text: "text-white", icon: <LeadsIcon /> };
      default:
        return { bg: "bg-slate-300", text: "text-white", icon: <ShopIcon /> };
    }
  };

  // Dropdown values options definitions
  const sourcesOptions = ["All Sources", "Auto", "Manual"];
  const statusOptions = ["All Status", "Sent", "Failed", "Opened", "Clicked"];
  const categoryOptions = [
    "All Categories",
    "Salon Operations",
    "Client Engagement",
    "Payments & Billing",
    "Inventory & Product Management",
    "Employee Performance & HR",
    "Accountant-Specific",
    "Super Admin / Platform-Level",
    "System & Technical",
    "Support & Ticketing",
    "Internal SAAS",
    "Leads Management"
  ];
  const dataRangeOptions = ["All Time", "Today", "Last 7 Days", "Last 30 Days", "Range Picker"];
  const salonOptions = [
    "All Salons",
    "Beauty Wellness Center",
    "Bella Vista Salon",
    "Elite Beauty Group S.p.A.",
    "Glamour Lounge SRLS",
    "Hair Art Studio",
    "Luxury Spa & Wellness",
    "Modern Hair Lounge",
    "Studio Giuseppe",
    "Trendy Cuts Studio",
    "Elegant Touch Spa"
  ];
  const operatorOptions = ["All Operators", "Auto", "Manual", "Roberto Marini", "Maria Rodriguez", "Carlos Rodriguez"];
  const recipientOptions = ["All Recipient", "Owners", "Employees", "Accountant", "Clients", "Super Admin"];

  // Custom Dropdown Renderer Sub-component (styled matching Figma CSS tokens)
  const renderCustomDropdown = (
    label: string,
    id: string,
    currentValue: string,
    options: string[],
    setValue: (val: string) => void
  ) => {
    const isOpen = activeDropdown === id;
    return (
      <div className="flex flex-col text-left gap-2 relative select-none">
        {label && <label className="text-[12px] font-semibold text-[#98A4AE] uppercase tracking-wide">{label}</label>}
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className="flex items-center justify-between min-w-[150px] bg-white border border-[#E0E6EB] rounded-lg px-4 py-2 text-xs font-semibold text-[#29343D] shadow-sm hover:border-slate-300 transition-all text-left"
          style={{ height: "36px" }}
        >
          <span className="truncate">{currentValue}</span>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>

        {isOpen && (
          <div
            className="absolute left-0 top-full mt-1.5 w-max min-w-[150px] max-w-[320px] bg-white border border-[#E0E6EB] rounded-xl shadow-2xl z-50 p-2 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 origin-top"
            style={{ boxShadow: "0px 16px 32px -8px rgba(12, 12, 13, 0.4)" }}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setValue(option);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${currentValue === option
                      ? "bg-[#EFF4FA] text-[#635BFF]"
                      : "text-[#29343D] hover:bg-[#EFF4FA] hover:text-[#29343D]"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full text-left relative font-sans">

      {/* Invisible backdrop to dismiss dropdowns seamlessly */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold text-[#29343D] bg-white pointer-events-auto animate-in slide-in-from-right duration-250 ${toast.type === "success"
                ? "border-emerald-100 shadow-emerald-50/20"
                : toast.type === "error"
                  ? "border-[#FFE5ED] shadow-rose-50/20"
                  : "border-indigo-100 shadow-indigo-50/20"
              }`}
          >
            {toast.type === "success" && <div className="w-5 h-5 rounded-full bg-[#EBFAF0] text-[#36C76C] flex items-center justify-center"><CheckIcon className="w-3.5 h-3.5" /></div>}
            {toast.type === "error" && <div className="w-5 h-5 rounded-full bg-[#FFE5ED] text-[#FF6692] flex items-center justify-center font-black">!</div>}
            {toast.type === "info" && <div className="w-5 h-5 rounded-full bg-[#F1F2FE] text-[#635BFF] flex items-center justify-center font-bold">i</div>}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Main Top Header Section (Figma: title) */}
      <div
        className="bg-white rounded-xl flex items-center justify-between w-full px-6 py-4"
        style={{
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          border: "1px solid #E0E6EB"
        }}
      >
        <div>
          <h1 className="font-bold text-[#29343D] text-[16px] leading-[22px]">
            Automations & Mail
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Refresh Data button (Figma style) */}
          <button
            onClick={handleRefreshData}
            disabled={refreshing}
            className={`flex items-center justify-center px-4 py-2.5 bg-[#EFF4FA] hover:bg-slate-200 text-xs font-medium text-[#0A2540] rounded-lg transition-all ${refreshing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            style={{ height: "44px" }}
          >
            <RefreshIcon />
            <span className="ml-2.5 font-bold">{refreshing ? "Syncing..." : "Refresh Data"}</span>
          </button>

          {/* Send Email button (Figma style) */}
          <button
            onClick={() => setShowSendModal(true)}
            className="flex items-center justify-center px-4 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-xs font-medium text-white rounded-lg transition-all shadow-md"
            style={{ height: "44px" }}
          >
            <PaperPlaneIcon />
            <span className="ml-2.5 font-bold">Send Email</span>
          </button>
        </div>
      </div>

      {/* Top Filter Bar Section */}
      <div
        className="bg-white rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 w-full"
        style={{
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          border: "1px solid #E0E6EB"
        }}
      >
        {/* Type tabs toggles */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-[12px] font-semibold text-[#98A4AE] uppercase tracking-wide mr-2">Type:</span>
          {["All", "Email", "SMS", "WhatsApp"].map((type) => {
            const isActive = activeTypeTab === type;
            return (
              <button
                key={type}
                onClick={() => setActiveTypeTab(type as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${isActive
                    ? "border-[#635BFF] bg-[#F1F2FE] text-[#635BFF] font-bold"
                    : "border-[#EFF4FA] hover:bg-slate-50 text-slate-400 hover:text-slate-650"
                  }`}
                style={{ height: "36px" }}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Dynamic Select Dropdowns */}
        <div className="flex items-center gap-4 flex-wrap">
          {renderCustomDropdown("Sources", "sources", sourceFilter, sourcesOptions, setSourceFilter)}
          {renderCustomDropdown("Status", "status", statusFilter, statusOptions, setStatusFilter)}
          {renderCustomDropdown("Category", "category", categoryFilter, categoryOptions, setCategoryFilter)}
        </div>
      </div>

      {/* Split Body Layout (Figma: Details) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start w-full bg-white rounded-xl overflow-hidden"
        style={{
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          border: "1px solid #E0E6EB"
        }}
      >

        {/* Left Side: Advanced Filters Column (Figma: Filters) */}
        <div className="lg:col-span-3 border-r border-[#E0E6EB] p-7 flex flex-col gap-6 h-full min-h-[600px] text-left">
          <div className="border-b border-[#EFF4FA] pb-3">
            <h2 className="font-bold text-[15px] leading-[20px] text-[#29343D]">Advanced Filters</h2>
          </div>

          <div className="flex flex-col gap-4">
            {renderCustomDropdown("Data Range", "dataRange", dataRangeFilter, dataRangeOptions, setDataRangeFilter)}
            {renderCustomDropdown("Salon", "salon", salonFilter, salonOptions, setSalonFilter)}
            {renderCustomDropdown("Operator", "operator", operatorFilter, operatorOptions, setOperatorFilter)}
            {renderCustomDropdown("Recipient", "recipient", recipientFilter, recipientOptions, setRecipientFilter)}
          </div>

          <div className="flex flex-col gap-3 pt-6 mt-auto">
            {/* Reset button matching Figma light style */}
            <button
              onClick={handleResetFilters}
              className="w-full bg-[#EFF4FA] hover:bg-slate-200 text-[#0A2540] font-semibold py-2.5 px-4 rounded-lg text-xs transition-all flex items-center justify-center"
              style={{ height: "44px" }}
            >
              Reset Filters
            </button>

            {/* Export Menu trigger button matching Figma primary blue style */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "export" ? null : "export")}
                className="w-full flex items-center justify-between bg-[#635BFF] hover:bg-[#4d42eb] text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-all shadow-md"
                style={{ height: "44px" }}
              >
                <span className="flex items-center gap-2">
                  {/* Figma export/download icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v12M17 8l-5-5-5 5" />
                  </svg>
                  <span>Export</span>
                </span>
                {activeDropdown === "export" ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>

              {activeDropdown === "export" && (
                <div
                  className="absolute left-0 bottom-full mb-1.5 w-full bg-white border border-[#E0E6EB] rounded-xl shadow-2xl z-50 p-2 flex flex-col gap-0.5 animate-in fade-in duration-100 origin-bottom"
                  style={{ boxShadow: "0px 16px 32px -8px rgba(12, 12, 13, 0.4)" }}
                >
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      triggerToast("Exporting PDF compilation file...", "info");
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      triggerToast("Exporting CSV spreadsheet data...", "info");
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                  >
                    CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Notifications List Column (Figma: products) */}
        <div className="lg:col-span-9 p-7 flex flex-col gap-6 min-h-[600px] text-left">

          {/* Notifications Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFF4FA] gap-3">
            <div className="flex items-center gap-3 text-left flex-wrap">
              <h2 className="font-bold text-[18px] leading-[25px] text-[#29343D]">
                Notifications ({filteredNotifications.length})
              </h2>
              {unreadCount > 0 && (
                <span className="bg-[#FFE5ED] text-[#FF6692] font-bold text-[13px] leading-none px-2.5 py-1.5 rounded-md">
                  {unreadCount} unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center justify-center gap-1.5 px-4 py-2 border border-[#635BFF] hover:bg-[#F1F2FE] text-[#635BFF] rounded-lg text-xs font-bold transition-all shadow-sm w-full sm:w-auto"
                style={{ minHeight: "36px" }}
              >
                <span>Mark All As Read</span>
                <CheckIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* List Wrapper with scroll layout */}
          <div className="flex flex-col divide-y divide-[#E0E6EB] max-h-[750px] overflow-y-auto pr-1 custom-scrollbar text-left">
            {filteredNotifications.length === 0 ? (
              <div className="py-20 text-center text-slate-400 text-xs font-medium flex flex-col items-center justify-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#98A4AE]">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span>No notifications match active filters</span>
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const categoryTheme = getCategoryTheme(item.category);
                return (
                  <div
                    key={item.id}
                    className={`py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 group transition-colors px-2 rounded-xl hover:bg-slate-50/50 ${!item.read ? "bg-slate-50/25" : ""
                      }`}
                  >
                    {/* Circle Icon and Text description combo */}
                    <div className="flex items-start lg:items-center gap-4 flex-1 min-w-0">
                      {/* Circle Category Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${categoryTheme.bg} ${categoryTheme.text} shadow-sm`}
                      >
                        {categoryTheme.icon}
                      </div>

                      {/* Content text metadata */}
                      <div className="flex flex-col min-w-0">
                        <span className={`text-[15px] font-semibold leading-[20px] text-[#29343D] ${!item.read ? "font-bold" : ""}`}>
                          {item.title}
                        </span>

                        <div className="flex items-center gap-x-2.5 flex-wrap text-xs text-[#98A4AE] mt-1 font-semibold">
                          <span>{item.category}</span>
                          <span className="text-slate-300">•</span>
                          <span>{item.salon}</span>
                          <span className="text-slate-300">•</span>
                          <span>{item.date}</span>
                          <span className="text-slate-300">•</span>
                          <span>{item.time}</span>

                          {item.hasAttachment && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="inline-flex items-center text-[#98A4AE]">
                                <PaperclipIcon />
                                <span className="ml-0.5">{item.attachmentCount}</span>
                              </span>
                            </>
                          )}

                          {item.emailLink && (
                            <>
                              <span className="text-slate-300">•</span>
                              <a
                                href={`mailto:${item.emailLink}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#635BFF] hover:underline font-semibold"
                              >
                                {item.emailLink}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Badge state indicator & Actions buttons layout */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 w-full lg:w-auto border-t lg:border-t-0 border-[#E0E6EB]/50 pt-3 lg:pt-0">

                      {/* Badges status details */}
                      <div className="flex items-center gap-1.5 select-none font-bold">
                        {item.source && (
                          <span className="bg-[#EFF4FA] text-[#0A2540] text-[12px] leading-none px-2.5 py-1.5 rounded-lg uppercase tracking-wide">
                            {item.source}
                          </span>
                        )}
                        <span
                          className={`text-[13px] leading-none px-2.5 py-1.5 rounded-md uppercase tracking-wide ${item.status === "Opened" || item.status === "Clicked"
                              ? "bg-[#EBFAF0] text-[#36C76C]"
                              : item.status === "Sent"
                                ? "bg-[#E0F2FE] text-[#0284c7]"
                                : "bg-[#FFE5ED] text-[#FF6692]"
                            }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Action buttons ( eyeball details + checkmark read ) */}
                      <div className="flex items-center gap-2">
                        {/* Eye details trigger */}
                        <div className="relative group/btn">
                          <button
                            onClick={() => setViewDetailsItem(item)}
                            className="p-2 bg-[#F1F2FE] text-[#635BFF] hover:bg-[#e4e2ff] rounded-lg transition-all inline-flex hover:scale-105 shadow-sm"
                            style={{ width: "36px", height: "36px", alignItems: "center", justifyContent: "center" }}
                          >
                            <EyeIcon />
                          </button>

                          {/* Eye Tooltip */}
                          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-1.5 bg-[#635BFF] text-white text-[10px] font-bold rounded-lg shadow-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            View Details
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#635BFF]" />
                          </div>
                        </div>

                        {/* Checkmark read trigger (only if unread) */}
                        {!item.read && (
                          <div className="relative group/btn">
                            <button
                              onClick={() => handleMarkAsRead(item.id)}
                              className="p-2 bg-[#EBFAF0] text-[#36C76C] hover:bg-[#d5f5e3] rounded-lg transition-all inline-flex hover:scale-105 shadow-sm border border-emerald-100/30"
                              style={{ width: "36px", height: "36px", alignItems: "center", justifyContent: "center" }}
                            >
                              <CheckIcon className="w-3.5 h-3.5" />
                            </button>

                            {/* Checkmark Tooltip */}
                            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-1.5 bg-[#36C76C] text-white text-[10px] font-bold rounded-lg shadow-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                              Mark As Read
                              <div className="absolute left-full top-1/2 transform -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#36C76C]" style={{ borderLeftColor: "#36C76C" }} />
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* VIEW DETAILS DIALOG MODAL */}
      {viewDetailsItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-xl p-6 shadow-2xl flex flex-col gap-6 max-w-[638px] w-full max-h-[95vh] overflow-y-auto custom-scrollbar select-none"
            style={{ boxShadow: "0px 16px 32px -8px rgba(12, 12, 13, 0.4)" }}
          >
            {/* Title row */}
            <div className="flex items-center justify-between w-full border-b border-[#E0E6EB] pb-4">
              <h3 className="font-bold text-[18px] leading-[25px] text-[#29343D]">
                Notifications
              </h3>
              <button
                onClick={() => setViewDetailsItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                {/* carbon:close SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#29343D]">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Main Widget Card */}
            <div
              className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-6 w-full"
              style={{ boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)" }}
            >
              {/* Profile/Category header (username) */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getCategoryTheme(viewDetailsItem.category).bg
                    } ${getCategoryTheme(viewDetailsItem.category).text}`}
                >
                  {getCategoryTheme(viewDetailsItem.category).icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[15px] leading-[20px] text-[#29343D]">
                    {viewDetailsItem.title}
                  </span>
                  <span className="text-sm font-semibold text-[#98A4AE] mt-0.5">
                    {viewDetailsItem.category}
                  </span>
                </div>
              </div>

              {/* Sub-widget 1: Informations */}
              <div
                className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-4 text-left"
                style={{ boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)" }}
              >
                <h4 className="font-bold text-xs text-[#29343D] uppercase tracking-wider pb-1 border-b border-[#EFF4FA]">
                  Informations
                </h4>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="col-span-2">
                    <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Salon</span>
                    <span className="text-[#29343D] font-bold">{viewDetailsItem.salon}</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Date</span>
                    <span className="text-[#29343D] font-bold">{viewDetailsItem.date}</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Time</span>
                    <span className="text-[#29343D] font-bold">{viewDetailsItem.time}</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#999999] block mb-1">Source</span>
                    <span className="bg-[#EFF4FA] text-[#0A2540] text-[12px] font-bold px-3 py-1.5 rounded-lg uppercase inline-block">
                      {viewDetailsItem.source}
                    </span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#999999] block mb-1">Status</span>
                    <span className={`text-[13px] font-bold px-2.5 py-1 rounded-md uppercase inline-block ${viewDetailsItem.status === "Opened" || viewDetailsItem.status === "Clicked"
                        ? "bg-[#EBFAF0] text-[#36C76C]"
                        : viewDetailsItem.status === "Sent"
                          ? "bg-[#E0F2FE] text-[#0284c7]"
                          : "bg-[#FFE5ED] text-[#FF6692]"
                      }`}>
                      {viewDetailsItem.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-widget 2: Details */}
              <div
                className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-4 text-left"
                style={{ boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)" }}
              >
                <h4 className="font-bold text-xs text-[#29343D] uppercase tracking-wider pb-1 border-b border-[#EFF4FA]">
                  Details
                </h4>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Created</span>
                    <span className="text-[#29343D] font-bold">{viewDetailsItem.date}, 07:44:57</span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Sent</span>
                    <span className="text-[#29343D] font-bold">{viewDetailsItem.date}, 07:44:57</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Opened</span>
                    <span className="text-[#29343D] font-bold">
                      {viewDetailsItem.status === "Opened" || viewDetailsItem.status === "Clicked"
                        ? `${viewDetailsItem.date}, 10:02:15`
                        : "Not opened yet"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-widget 3: Content */}
              <div
                className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-4 text-left"
                style={{ boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)" }}
              >
                <h4 className="font-bold text-xs text-[#29343D] uppercase tracking-wider">
                  Content
                </h4>
                <div className="bg-[#F1F2FE] rounded-xl p-6">
                  <p className="text-sm font-semibold text-[#29343D] leading-[20px] font-sans">
                    {viewDetailsItem.message || "No content details available."}
                  </p>
                </div>
              </div>

              {/* Sub-widget 4: Metadata (conditional) */}
              {(viewDetailsItem.category === "Payments & Billing" || viewDetailsItem.category === "Accountant-Specific") && (
                <div
                  className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-4 text-left"
                  style={{ boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)" }}
                >
                  <h4 className="font-bold text-xs text-[#29343D] uppercase tracking-wider pb-1 border-b border-[#EFF4FA]">
                    Metadata
                  </h4>

                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div>
                      <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Transaction ID</span>
                      <span className="text-[#29343D] font-bold">bill_003</span>
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold text-[#999999] block mb-0.5">Retry Count</span>
                      <span className="text-[#29343D] font-bold">2</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-widget 5: Attachments (conditional) */}
              {(viewDetailsItem.hasAttachment || viewDetailsItem.category === "Client Engagement" || viewDetailsItem.category === "Inventory & Product Management") && (
                <div
                  className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-4 text-left"
                  style={{ boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)" }}
                >
                  <h4 className="font-bold text-xs text-[#29343D] uppercase tracking-wider">
                    Attachments
                  </h4>

                  <div className="flex items-center justify-between bg-white border border-[#E9EAEB] rounded-xl p-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#635BFF] flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#635BFF]">
                          {viewDetailsItem.hasAttachment ? "originalname.pdf" : "receipt_details.pdf"}
                        </span>
                        <span className="text-xs text-[#98A4AE]">
                          4.2 MB
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => triggerToast("Viewing attachment details...", "info")}
                        className="p-2 bg-[#F1F2FE] hover:bg-[#e4e2ff] text-[#635BFF] rounded-lg transition-all flex items-center justify-center"
                        style={{ width: "48px", height: "36px" }}
                      >
                        <EyeIcon />
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast("Downloading attachment file...", "success")}
                        className="p-2 bg-[#DDDBFF] hover:bg-[#c6c2ff] text-[#635BFF] rounded-lg transition-all flex items-center justify-center"
                        style={{ width: "48px", height: "36px" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between w-full border-t border-[#E0E6EB] pt-4">
              <button
                type="button"
                onClick={() => {
                  triggerToast("Notification forwarded successfully", "success");
                  setViewDetailsItem(null);
                }}
                className="flex items-center justify-center px-4 py-2.5 bg-[#EFF4FA] hover:bg-slate-200 text-[#0A2540] font-semibold rounded-lg transition-all text-xs"
                style={{ height: "44px" }}
              >
                Foward
              </button>

              <div className="flex items-center gap-3">
                {!viewDetailsItem.read && (
                  <button
                    type="button"
                    onClick={() => {
                      handleMarkAsRead(viewDetailsItem.id);
                      setViewDetailsItem(null);
                    }}
                    className="px-5 py-2.5 bg-[#36C76C] hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                    style={{ height: "44px" }}
                  >
                    Mark As Read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    triggerToast("Notification archived successfully", "success");
                    setViewDetailsItem(null);
                  }}
                  className="flex items-center justify-center px-4 py-2.5 bg-[#DDDBFF] hover:bg-[#c6c2ff] text-[#635BFF] font-semibold rounded-lg transition-all text-xs"
                  style={{ height: "44px" }}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEND EMAIL MODAL DIALOG */}
      {showSendModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-7 border border-[#E0E6EB] max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 text-left relative">
            <button
              onClick={() => setShowSendModal(false)}
              className="absolute right-5 top-5 p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#98A4AE] hover:text-slate-700 transition-all font-bold text-xs"
            >
              ✕
            </button>

            <h3 className="font-bold text-[16px] text-[#29343D] mb-5">Compose & Send Email</h3>

            <form onSubmit={handleSendEmailSubmit} className="flex flex-col gap-4 text-xs font-semibold text-left">
              {/* Recipient Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#98A4AE] font-bold">Recipient Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. teste@teste.com"
                  value={sendRecipient}
                  onChange={(e) => setSendRecipient(e.target.value)}
                  className="border border-[#E0E6EB] focus:border-[#635BFF] focus:outline-none rounded-lg px-4 py-2 text-xs text-[#29343D] font-semibold"
                  style={{ height: "36px" }}
                />
              </div>

              {/* Subject Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#98A4AE] font-bold">Subject / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Online payment processed successfully"
                  value={sendSubject}
                  onChange={(e) => setSendSubject(e.target.value)}
                  className="border border-[#E0E6EB] focus:border-[#635BFF] focus:outline-none rounded-lg px-4 py-2 text-xs text-[#29343D] font-semibold"
                  style={{ height: "36px" }}
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category select dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#98A4AE] font-bold">Category</label>
                  <select
                    value={sendCategory}
                    onChange={(e) => setSendCategory(e.target.value)}
                    className="border border-[#E0E6EB] focus:border-[#635BFF] focus:outline-none bg-white rounded-lg px-3 py-2 text-xs text-[#29343D] font-semibold cursor-pointer"
                    style={{ height: "36px" }}
                  >
                    {categoryOptions.slice(1).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salon select dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#98A4AE] font-bold">Salon Origin</label>
                  <select
                    value={sendSalon}
                    onChange={(e) => setSendSalon(e.target.value)}
                    className="border border-[#E0E6EB] focus:border-[#635BFF] focus:outline-none bg-white rounded-lg px-3 py-2 text-xs text-[#29343D] font-semibold cursor-pointer"
                    style={{ height: "36px" }}
                  >
                    {salonOptions.slice(1).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message text details */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#98A4AE] font-bold">Message Content *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your email message details here..."
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  className="border border-[#E0E6EB] focus:border-[#635BFF] focus:outline-none rounded-lg px-4 py-2.5 text-xs text-[#29343D] font-semibold resize-none"
                />
              </div>

              {/* Action Buttons Submit */}
              <div className="flex items-center justify-end gap-3.5 mt-2.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  className="px-5 py-2.5 bg-[#EFF4FA] hover:bg-slate-200 text-[#0A2540] rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Email"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled custom scrollbar style injected */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>

    </div>
  );
}
