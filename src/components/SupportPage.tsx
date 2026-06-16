"use client";

import React, { useState, useEffect } from "react";

// Types
interface Ticket {
  id: string;
  order: string;
  salonName: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "Waiting" | "Closed";
  category: string;
  assignTo: string;
  date: string;
  initialRequest: string;
  emailsSent: Array<{ sender: string; message: string; date: string }>;
  internalNotes: Array<{ 
    title?: string; 
    category?: string; 
    author: string; 
    message: string; 
    daysAgo: string; 
    type: "note" | "resolution"; 
  }>;
}

interface Announcement {
  id: string;
  title: string;
  audience: string;
  channel: string;
  date: string;
  status: string;
  message: string;
  type?: "Alert" | "Maintenance" | "New Feature" | "Update";
  category?: "Sent" | "Scheduled" | "Draft";
  scheduleTime?: string;
  sentCount?: number;
  openedCount?: number;
  timeAgo?: string;
}

interface Audience {
  id: string;
  name: string;
  recipient: "All" | "Owner" | "Employee" | "Accountants" | "Clients";
  employeeCount: "All" | "Between a and b";
  age: "All" | "Between a and b";
  status: "All" | "Active" | "Cancelled" | "Trial";
  region: string;
  city: string;
  province: string;
  socialMediaLinked?: string;
  hasWhatsappApi?: string;
  membershipType?: string;
  subscribedFrom?: string;
  clientsNumber?: string;
  income?: string;
}

interface SupportPageProps {
  activeTicketId?: string | null;
  onCloseTicketDetail?: () => void;
}

// Icons Component Helpers (Raw SVG styled with exact vectors matching Figma/screenshot style)
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 animate-spin-slow">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57.57" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const TicketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
    <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="3 3" />
  </svg>
);

const UserGroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SupportAvatar = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto drop-shadow-md shrink-0">
    <circle cx="60" cy="60" r="60" fill="#DDDBFF"/>
    <path d="M60 90C73.8 90 85 78.8 85 65V45C85 36.7 78.3 30 70 30H50C41.7 30 35 36.7 35 45V65C35 78.8 46.2 90 60 90Z" fill="#F8B195"/>
    <rect x="38" y="52" width="18" height="12" rx="3" stroke="#29343D" strokeWidth="3" fill="none"/>
    <rect x="64" y="52" width="18" height="12" rx="3" stroke="#29343D" strokeWidth="3" fill="none"/>
    <line x1="56" y1="58" x2="64" y2="58" stroke="#29343D" strokeWidth="3"/>
    <path d="M34 44C34 25.2 45.6 10 60 10C74.4 10 86 25.2 86 44H34Z" fill="#635BFF"/>
    <path d="M30 40H90V46H30V40Z" fill="#4D42EB"/>
    <circle cx="60" cy="22" r="6" fill="#FFD648"/>
    <path d="M50 78C53 82 67 82 70 78V74H50V78Z" fill="#5A3E36"/>
    <circle cx="47" cy="58" r="2" fill="#29343D"/>
    <circle cx="73" cy="58" r="2" fill="#29343D"/>
    <path d="M56 84C58 86 62 86 64 84" stroke="#29343D" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Initial support tickets
const initialTickets: Ticket[] = [
  {
    id: "#001",
    order: "Employee access issues",
    salonName: "Bella Forma Hair Salon",
    priority: "Urgent",
    status: "Closed",
    category: "Technical",
    assignTo: "Maria Rodriguez",
    date: "08/18/2025",
    initialRequest: "Several employees are unable to log into their accounts. They get an error message saying \"Invalid credentials\" even though they are using the correct passwords.",
    emailsSent: [
      {
        sender: "Support Team",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "08/18/2025 14:56"
      },
      {
        sender: "Support Team",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        date: "08/18/2025 14:55"
      }
    ],
    internalNotes: [
      {
        author: "Support Team",
        message: "Internal note: Reset passwords for users employee_002, employee_003, employee_005 in salon 1.",
        daysAgo: "16 days ago",
        type: "note"
      },
      {
        author: "Resolution",
        message: "Issue resolved successfully",
        daysAgo: "16 days ago",
        type: "resolution"
      }
    ]
  },
  {
    id: "#4521",
    order: "Card reader terminal integration failure",
    salonName: "Bella Vista Salon",
    priority: "Urgent",
    status: "Open",
    category: "Technical",
    assignTo: "Maria Rodriguez",
    date: "08/08/2025",
    initialRequest: "The new POS card reader terminal is showing an 'SSL connection error' during transaction handshakes. It blocks our checkout page completely. We are losing client bookings.",
    emailsSent: [
      {
        sender: "Support Team",
        message: "Hello Maria, we are looking into this network handshake failure. We noticed that your terminal firmware might be outdated (v1.0.8). Can you please confirm the model name?",
        date: "08/08/2025 12:05"
      }
    ],
    internalNotes: [
      {
        author: "Support Team",
        message: "Check connection logs for Stripe integration and firmware versions.",
        daysAgo: "2 days ago",
        type: "note"
      }
    ]
  },
  {
    id: "#4522",
    order: "Invoice clarification request",
    salonName: "Beauty Wellness Center",
    priority: "High",
    status: "Waiting",
    category: "Billing",
    assignTo: "Roberto Marini",
    date: "08/08/2025",
    initialRequest: "Our invoice #INV-9988 for this month displays a charge of 299,00 € instead of our discounted trial rate of 149,00 €. Please adjust the pricing.",
    emailsSent: [
      {
        sender: "Support Team",
        message: "Hello Roberto, we have updated your discount code status. The coupon is code-active now.",
        date: "08/08/2025 10:10"
      }
    ],
    internalNotes: [
      {
        author: "Support Team",
        message: "Verify discount token code application values.",
        daysAgo: "1 day ago",
        type: "note"
      }
    ]
  },
  {
    id: "#4523",
    order: "Feedback on SMS automation speed",
    salonName: "Elite Beauty Group S.p.A.",
    priority: "Medium",
    status: "Open",
    category: "Feature Request",
    assignTo: "Dr. Marco Rossi",
    date: "08/08/2025",
    initialRequest: "We need custom webhooks to trigger immediate SMS updates for VIP customers. The current scheduling delay is around 5 minutes. We want it instantaneous.",
    emailsSent: [],
    internalNotes: []
  },
  {
    id: "#4524",
    order: "System performance degradation report",
    salonName: "Glamour Lounge SRLS",
    priority: "High",
    status: "Closed",
    category: "Bug Report",
    assignTo: "Anna Bianchi",
    date: "07/08/2025",
    initialRequest: "The calendar loading page feels laggy today. It takes 4 seconds to retrieve appointment data. Is there a server degradation?",
    emailsSent: [
      {
        sender: "Support Team",
        message: "Temporary node-West lock has been resolved.",
        date: "07/08/2025 16:30"
      }
    ],
    internalNotes: [
      {
        author: "Resolution",
        message: "Database index query optimized.",
        daysAgo: "7 days ago",
        type: "resolution"
      }
    ]
  },
  {
    id: "#4525",
    order: "General inquiry on subscription options",
    salonName: "Hair Art Studio",
    priority: "Low",
    status: "Closed",
    category: "General",
    assignTo: "Francesca Neri",
    date: "06/08/2025",
    initialRequest: "Is there a custom plan that accommodates 15 operators without upgrading to the full Enterprise package? We have 15 staff members in Rome branch.",
    emailsSent: [
      {
        sender: "Support Team",
        message: "Hello Francesca, we can customize a staff add-on plan for 15 operators on your Premium subscription.",
        date: "06/08/2025 11:20"
      }
    ],
    internalNotes: []
  }
];

const salonContacts: Record<string, { name: string; email: string }> = {
  "Bella Forma Hair Salon": { name: "Maria Rodriguez", email: "maria@bellavista.com" },
  "Bella Vista Salon": { name: "Maria Rodriguez", email: "maria@bellavista.com" },
  "Beauty Wellness Center": { name: "Roberto Marini", email: "roberto@beautywellness.com" },
  "Elite Beauty Group S.p.A.": { name: "Dr. Marco Rossi", email: "marco.rossi@elitebeauty.com" },
  "Glamour Lounge SRLS": { name: "Anna Bianchi", email: "anna@glamourlounge.com" },
  "Hair Art Studio": { name: "Francesca Neri", email: "francesca@hairartstudio.com" }
};

// Initial announcements list
const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "New Feature: Advanced Analytics Dashboard",
    audience: "plan_specific",
    channel: "Email",
    date: "08/08/2025",
    status: "Sent",
    message: "We are excited to announce our new Advanced Analytics Dashboard, now available for Premium and Enterprise customers. Get deeper insights into your salon performance with detailed charts and reports.",
    type: "Alert",
    category: "Sent",
    sentCount: 25,
    openedCount: 18,
    timeAgo: "2d ago"
  },
  {
    id: "ann-2",
    title: "Scheduled Maintenance - Sunday 3 AM",
    audience: "all",
    channel: "Email & Dashboard",
    date: "08/08/2025",
    status: "Scheduled",
    message: "We will be performing scheduled maintenance on Sunday from 3:00 AM to 5:00 AM UTC. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.",
    type: "Maintenance",
    category: "Scheduled",
    scheduleTime: "08/19/2025 08:00",
    sentCount: 0,
    openedCount: 0,
    timeAgo: "-"
  },
  {
    id: "ann-3",
    title: "Scheduled Maintenance - Sunday 3 AM",
    audience: "all",
    channel: "Email & Dashboard",
    date: "08/08/2025",
    status: "Scheduled",
    message: "We will be performing scheduled maintenance on Sunday from 3:00 AM to 5:00 AM UTC. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.",
    type: "New Feature",
    category: "Scheduled",
    scheduleTime: "08/19/2025 08:00",
    sentCount: 0,
    openedCount: 0,
    timeAgo: "-"
  },
  {
    id: "ann-4",
    title: "Scheduled Maintenance - Sunday 3 AM",
    audience: "all",
    channel: "Email & Dashboard",
    date: "08/08/2025",
    status: "Draft",
    message: "We will be performing scheduled maintenance on Sunday from 3:00 AM to 5:00 AM UTC. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.",
    type: "Update",
    category: "Draft",
    sentCount: 0,
    openedCount: 0,
    timeAgo: "-"
  }
];

// Initial audiences list
const initialAudiences: Audience[] = [
  {
    id: "aud-1",
    name: "Audience 01",
    recipient: "All",
    employeeCount: "All",
    age: "All",
    status: "All",
    region: "Region 01",
    city: "City 01",
    province: "Province 01",
    socialMediaLinked: "No",
    hasWhatsappApi: "No",
    membershipType: "Basic",
    subscribedFrom: "Website",
    clientsNumber: "0-50",
    income: "Low"
  },
  {
    id: "aud-2",
    name: "Audience 02",
    recipient: "Owner",
    employeeCount: "Between a and b",
    age: "Between a and b",
    status: "Active",
    region: "Region 02",
    city: "City 02",
    province: "Province 02",
    socialMediaLinked: "Yes",
    hasWhatsappApi: "Yes",
    membershipType: "Premium",
    subscribedFrom: "Referral",
    clientsNumber: "51-200",
    income: "High"
  },
  {
    id: "aud-3",
    name: "Audience 03",
    recipient: "Employee",
    employeeCount: "Between a and b",
    age: "Between a and b",
    status: "Cancelled",
    region: "Region 03",
    city: "City 03",
    province: "Province 03",
    socialMediaLinked: "No",
    hasWhatsappApi: "Yes",
    membershipType: "Enterprise",
    subscribedFrom: "Website",
    clientsNumber: "201+",
    income: "Medium"
  },
  {
    id: "aud-4",
    name: "Audience 04",
    recipient: "Accountants",
    employeeCount: "Between a and b",
    age: "Between a and b",
    status: "Trial",
    region: "Region 04",
    city: "City 04",
    province: "Province 04",
    socialMediaLinked: "Yes",
    hasWhatsappApi: "No",
    membershipType: "Basic",
    subscribedFrom: "Ads",
    clientsNumber: "0-50",
    income: "Low"
  },
  {
    id: "aud-5",
    name: "Audience 05",
    recipient: "Clients",
    employeeCount: "Between a and b",
    age: "Between a and b",
    status: "Cancelled",
    region: "Region 05",
    city: "City 05",
    province: "Province 05",
    socialMediaLinked: "No",
    hasWhatsappApi: "No",
    membershipType: "Premium",
    subscribedFrom: "Referral",
    clientsNumber: "201+",
    income: "High"
  }
];

const AVAILABLE_SALONS = [
  { id: "salon-1", name: "Beauty Wellness Center", manager: "Roberto Marini", city: "Bologna", email: "roberto@beautywellness.com", plan: "Premium" },
  { id: "salon-2", name: "Bella Vista Salon", manager: "Maria Rodriguez", city: "Milano", email: "maria@bellavista.com", plan: "Premium" },
  { id: "salon-3", name: "Elite Beauty Group S.p.A.", manager: "Dr. Marco Rossi", city: "Milano", email: "marco.rossi@elitebeauty.com", plan: "Enterprise" },
  { id: "salon-4", name: "Glamour Lounge SRLS", manager: "Anna Bianchi", city: "Torino", email: "anna@glamourlounge.com", plan: "Premium" },
  { id: "salon-5", name: "Hair Art Studio", manager: "Francesca Neri", city: "Roma", email: "francesca@hairartstudio.com", plan: "Basic" },
  { id: "salon-6", name: "Luxury Spa & Wellness", manager: "Alessandro Costa", city: "Firenze", email: "alessandro@luxuryspa.com", plan: "Premium" },
  { id: "salon-7", name: "Modern Hair Lounge", manager: "Chiara Fontana", city: "Verona", email: "chiara@modernhair.com", plan: "Basic" },
  { id: "salon-8", name: "Studio Giuseppe", manager: "Giuseppe Verdi", city: "Roma", email: "giuseppe@studiogiuseppe.com", plan: "Basic" },
  { id: "salon-9", name: "Trendy Cuts Studio", manager: "Valentina Ricci", city: "Bari", email: "valentina@trendycuts.com", plan: "Basic" }
];

export default function SupportPage({ activeTicketId, onCloseTicketDetail }: SupportPageProps = {}) {
  // Lists data states
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [audiences, setAudiences] = useState<Audience[]>(initialAudiences);

  // Active ticket being viewed at full page level
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  // Nav sub-tab: "tickets" | "announcements" | "audiences"
  const [currentTab, setCurrentTab] = useState<"tickets" | "announcements" | "audiences">("tickets");

  // Filtering states
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Dropdown UI opening control
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Modals & toast states
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [isSubmittingAnnouncement, setIsSubmittingAnnouncement] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "info" | "error" }[]>([]);
  const [viewingEmailItem, setViewingEmailItem] = useState<any | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);
  const [deletingAnnouncementId, setDeletingAnnouncementId] = useState<string | null>(null);
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [noteTitleInput, setNoteTitleInput] = useState("");
  const [noteContentInput, setNoteContentInput] = useState("");
  const [noteCategoryInput, setNoteCategoryInput] = useState("Several");

  // Announcement inputs
  const [annType, setAnnType] = useState<"Alert" | "Maintenance" | "New Feature" | "Update" | "">("");
  const [annCategory, setAnnCategory] = useState<"Sent" | "Scheduled" | "Draft" | "">("");
  const [annScheduleTime, setAnnScheduleTime] = useState("");
  const [previewingAnnouncement, setPreviewingAnnouncement] = useState<Announcement | null>(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);
  const [composeStep, setComposeStep] = useState<1 | 2>(1);

  // Composing inputs
  const [annTitle, setAnnTitle] = useState("");
  const [annAudience, setAnnAudience] = useState("");
  const [annChannel, setAnnChannel] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annCtaEnabled, setAnnCtaEnabled] = useState(false);
  const [annCtaTitle, setAnnCtaTitle] = useState("");
  const [annSignature, setAnnSignature] = useState("");
  const [annDisclaimer, setAnnDisclaimer] = useState("");
  const [annDate, setAnnDate] = useState("");
  const [annTime, setAnnTime] = useState("");
  const [annFileName, setAnnFileName] = useState("");

  const [emailMessageText, setEmailMessageText] = useState("");
  const [internalNoteText, setInternalNoteText] = useState("");
  const [internalNoteType, setInternalNoteType] = useState<"note" | "resolution">("note");

  const [recipientFilter, setRecipientFilter] = useState("All Recipient");
  const [employeesFilter, setEmployeesFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [provinceFilter, setProvinceFilter] = useState("All Provinces");

  // Advanced filters states
  const [socialMediaFilter, setSocialMediaFilter] = useState("All");
  const [whatsappApiFilter, setWhatsappApiFilter] = useState("All");
  const [membershipTypeFilter, setMembershipTypeFilter] = useState("All");
  const [membershipStatusFilter, setMembershipStatusFilter] = useState("All");
  const [subscribedFromFilter, setSubscribedFromFilter] = useState("All");
  const [clientsNumberFilter, setClientsNumberFilter] = useState("All");
  const [incomeFilter, setIncomeFilter] = useState("All");
  const [showAdvancedFiltersModal, setShowAdvancedFiltersModal] = useState(false);

  const [activeAudienceMenuId, setActiveAudienceMenuId] = useState<string | null>(null);
  const [viewedAudience, setViewedAudience] = useState<Audience | null>(null);
  const [editingAudienceItem, setEditingAudienceItem] = useState<Audience | null>(null);
  const [showAudienceBuilderPage, setShowAudienceBuilderPage] = useState(false);
  const [showNewAudienceModal, setShowNewAudienceModal] = useState(false);
  const [deletingAudienceItem, setDeletingAudienceItem] = useState<Audience | null>(null);

  const [showSalonsListModal, setShowSalonsListModal] = useState(false);
  const [deletingSalonId, setDeletingSalonId] = useState<string | null>(null);
  const [showAddSalonModal, setShowAddSalonModal] = useState(false);
  const [selectedSalonToAddId, setSelectedSalonToAddId] = useState<string | null>(null);
  const [isAddSalonDropdownOpen, setIsAddSalonDropdownOpen] = useState(false);
  const [salonsInAudience, setSalonsInAudience] = useState<Array<{
    id: string;
    name: string;
    manager: string;
    city: string;
    email: string;
    plan: "Basic" | "Premium" | "Enterprise";
    lastActive: string;
  }>>([]);

  useEffect(() => {
    if (viewedAudience) {
      setSalonsInAudience([
        { id: "s-1", name: "Bella Forma Hair Salon", manager: "Roberto Marini", city: "Bologna", email: "roberto@beautywellness.com", plan: "Premium", lastActive: "1h ago" },
        { id: "s-2", name: "Urban Hair Studio", manager: "Roberto Marini", city: "Bologna", email: "roberto@beautywellness.com", plan: "Premium", lastActive: "1h ago" },
        { id: "s-3", name: "Glamour Lounge", manager: "Roberto Marini", city: "Bologna", email: "roberto@beautywellness.com", plan: "Enterprise", lastActive: "1h ago" },
        { id: "s-4", name: "Urban Hair Studio", manager: "Roberto Marini", city: "Bologna", email: "roberto@beautywellness.com", plan: "Premium", lastActive: "1h ago" }
      ]);
    } else {
      setSalonsInAudience([]);
    }
  }, [viewedAudience]);

  // Audience Form inputs
  const [audNameInput, setAudNameInput] = useState("");
  const [audRecipientInput, setAudRecipientInput] = useState<"All" | "Owner" | "Employee" | "Accountants" | "Clients">("All");
  const [audEmployeesInput, setAudEmployeesInput] = useState<"All" | "Between a and b">("All");
  const [audAgeInput, setAudAgeInput] = useState<"All" | "Between a and b">("All");
  const [audStatusInput, setAudStatusInput] = useState<"All" | "Active" | "Cancelled" | "Trial">("All");
  const [audRegionInput, setAudRegionInput] = useState("");
  const [audCityInput, setAudCityInput] = useState("");
  const [audProvinceInput, setAudProvinceInput] = useState("");
  const [audMembershipTypeInput, setAudMembershipTypeInput] = useState("X");
  const [audClientsNumberInput, setAudClientsNumberInput] = useState("All");
  const [audSocialMediaLinkedInput, setAudSocialMediaLinkedInput] = useState("No");
  const [audHasWhatsappApiInput, setAudHasWhatsappApiInput] = useState("No");
  const [audAgeMinInput, setAudAgeMinInput] = useState("18");
  const [audAgeMaxInput, setAudAgeMaxInput] = useState("25");
  const [audIncomeInput, setAudIncomeInput] = useState("Between x and y");
  const [audSubscribedFromInput, setAudSubscribedFromInput] = useState("Between x and y");

  const handleNewAudienceClick = () => {
    setAudNameInput("Audience 02");
    setAudRecipientInput("Owner");
    setAudEmployeesInput("Between a and b");
    setAudAgeInput("Between a and b");
    setAudStatusInput("Active");
    setAudRegionInput("All");
    setAudCityInput("All");
    setAudProvinceInput("All");
    setAudMembershipTypeInput("X");
    setAudClientsNumberInput("All");
    setAudSocialMediaLinkedInput("No");
    setAudHasWhatsappApiInput("Yes");
    setAudAgeMinInput("18");
    setAudAgeMaxInput("25");
    setAudIncomeInput("Between x and y");
    setAudSubscribedFromInput("Between x and y");
    setCurrentTab("audiences");
    setViewedAudience(null);
    setEditingAudienceItem(null);
    setActiveDropdown(null);
    setActiveAudienceMenuId(null);
    setShowNewAudienceModal(false);
    setShowAudienceBuilderPage(true);
  };

  const handleRemoveSalon = (id: string) => {
    const updated = salonsInAudience.filter((s) => s.id !== id);
    setSalonsInAudience(updated);
    triggerToast("Salon removed from audience", "success");
  };

  const handleAddSalon = () => {
    setSelectedSalonToAddId(null);
    setIsAddSalonDropdownOpen(false);
    setShowAddSalonModal(true);
  };

  const handleAddSalonConfirm = () => {
    if (!selectedSalonToAddId) return;
    const target = AVAILABLE_SALONS.find((s) => s.id === selectedSalonToAddId);
    if (!target) return;

    const newSalon = {
      id: `s-${Date.now()}`,
      name: target.name,
      manager: target.manager,
      city: target.city,
      email: target.email,
      plan: target.plan as any,
      lastActive: "Just now"
    };

    setSalonsInAudience((prev) => [...prev, newSalon]);
    triggerToast(`Salon "${target.name}" added to audience`, "success");
    setShowAddSalonModal(false);
    setSelectedSalonToAddId(null);
  };

  const renderModalSalonLogo = (name: string) => {
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
    return (
      <div className="w-12 h-12 rounded-[12px] bg-gradient-to-tr from-rose-400 to-indigo-500 text-white flex items-center justify-center text-sm font-black tracking-wider shadow-inner shrink-0">
        {initials}
      </div>
    );
  };

  const handleEditAudienceClick = (aud: Audience) => {
    setAudNameInput(aud.name);
    setAudRecipientInput(aud.recipient);
    setAudEmployeesInput(aud.employeeCount);
    setAudAgeInput(aud.age);
    setAudStatusInput(aud.status);
    setAudRegionInput(aud.region);
    setAudCityInput(aud.city);
    setAudProvinceInput(aud.province);
    setAudMembershipTypeInput(aud.membershipType || "X");
    setAudClientsNumberInput(aud.clientsNumber || "All");
    setAudSocialMediaLinkedInput(aud.socialMediaLinked || "No");
    setAudHasWhatsappApiInput(aud.hasWhatsappApi || "No");
    setAudIncomeInput(aud.income || "Between x and y");
    setAudSubscribedFromInput(aud.subscribedFrom || "Between x and y");

    const ageVal = aud.age || "All";
    if (ageVal.includes("-")) {
      const parts = ageVal.split("-");
      setAudAgeMinInput(parts[0]);
      setAudAgeMaxInput(parts[1]);
    } else {
      setAudAgeMinInput("18");
      setAudAgeMaxInput("25");
    }

    setShowAudienceBuilderPage(true);
    setShowNewAudienceModal(false);
    setViewedAudience(null);
    setActiveDropdown(null);
    setActiveAudienceMenuId(null);
    setEditingAudienceItem(aud);
  };

  const handleNewAudienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audNameInput) {
      triggerToast("Please enter an audience name", "error");
      return;
    }
    const newAud: Audience = {
      id: `aud-${Date.now()}`,
      name: audNameInput,
      recipient: audRecipientInput,
      employeeCount: audEmployeesInput,
      age: (audAgeMinInput && audAgeMaxInput) ? `${audAgeMinInput}-${audAgeMaxInput}` as any : "All",
      status: audStatusInput,
      region: audRegionInput || "Region 01",
      city: audCityInput || "City 01",
      province: audProvinceInput || "Province 01",
      membershipType: audMembershipTypeInput,
      clientsNumber: audClientsNumberInput,
      socialMediaLinked: audSocialMediaLinkedInput,
      hasWhatsappApi: audHasWhatsappApiInput,
      income: audIncomeInput,
      subscribedFrom: audSubscribedFromInput
    };
    setAudiences((prev) => [...prev, newAud]);
    setShowNewAudienceModal(false);
    setShowAudienceBuilderPage(false);
    setCurrentTab("audiences");
    triggerToast(`Audience "${newAud.name}" created successfully`, "success");
  };

  const handleEditAudienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAudienceItem || !audNameInput) return;
    const updated = audiences.map((aud) => {
      if (aud.id === editingAudienceItem.id) {
        const updatedItem = {
          ...aud,
          name: audNameInput,
          recipient: audRecipientInput,
          employeeCount: audEmployeesInput,
          age: (audAgeMinInput && audAgeMaxInput) ? `${audAgeMinInput}-${audAgeMaxInput}` as any : "All",
          status: audStatusInput,
          region: audRegionInput || "Region 01",
          city: audCityInput || "City 01",
          province: audProvinceInput || "Province 01",
          membershipType: audMembershipTypeInput,
          clientsNumber: audClientsNumberInput,
          socialMediaLinked: audSocialMediaLinkedInput,
          hasWhatsappApi: audHasWhatsappApiInput,
          income: audIncomeInput,
          subscribedFrom: audSubscribedFromInput
        };
        if (viewedAudience && viewedAudience.id === aud.id) {
          setViewedAudience(updatedItem);
        }
        return updatedItem;
      }
      return aud;
    });
    setAudiences(updated);
    setEditingAudienceItem(null);
    setShowAudienceBuilderPage(false);
    setCurrentTab("audiences");
    triggerToast(`Audience "${audNameInput}" updated successfully`, "success");
  };

  const confirmDeleteAudience = () => {
    if (!deletingAudienceItem) return;
    setAudiences((prev) => prev.filter((aud) => aud.id !== deletingAudienceItem.id));
    triggerToast(`Audience "${deletingAudienceItem.name}" deleted successfully`, "success");
    setDeletingAudienceItem(null);
  };

  const getRecipientBadgeStyle = (recipient: string) => {
    switch (recipient) {
      case "All":
        return "bg-[#EFF4FA] text-[#0A2540]";
      case "Owner":
        return "bg-[#E8E5FF] text-[#635BFF]";
      case "Employee":
        return "bg-[#ECFDFD] text-[#16CDC7]";
      case "Accountants":
        return "bg-[#EBFAF0] text-[#36C76C]";
      case "Clients":
        return "bg-[#FFF9E5] text-[#FFD648]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getEmployeeBadgeStyle = (val: string) => {
    if (val === "All") return "bg-[#EFF4FA] text-[#0A2540]";
    return "bg-[#E8E5FF] text-[#635BFF]";
  };

  const getAgeBadgeStyle = (val: string) => {
    if (val === "All") return "bg-[#EFF4FA] text-[#0A2540]";
    return "bg-[#ECFDFD] text-[#16CDC7]";
  };

  const getMembershipBadgeStyle = (val: string) => {
    switch (val) {
      case "All":
        return "bg-[#EFF4FA] text-[#0A2540]";
      case "Active":
        return "bg-[#EBFAF0] text-[#36C76C]";
      case "Cancelled":
        return "bg-[#FFE5ED] text-[#FF6692]";
      case "Trial":
        return "bg-[#FFF9E5] text-[#FFD648]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getAudienceSalonCount = (name: string) => {
    switch (name) {
      case "Audience 01": return 5;
      case "Audience 02": return 4;
      case "Audience 03": return 12;
      case "Audience 04": return 3;
      case "Audience 05": return 8;
      default: return 4;
    }
  };

  // Custom dropdown filter renderer for Audiences tab
  const renderAudienceFilterDropdown = (
    label: string,
    id: string,
    currentValue: string,
    options: string[],
    setValue: (val: string) => void
  ) => {
    const isOpen = activeDropdown === id;
    return (
      <div className="flex flex-col text-left gap-2 relative select-none">
        <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide h-[16px]">{label}</label>
        <button
          type="button"
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className="flex items-center justify-between min-w-[150px] bg-white border border-[#E0E6EB] rounded-lg px-4 py-2 text-xs font-semibold text-[#29343D] shadow-sm hover:border-slate-350 transition-all text-left"
          style={{ height: "36px" }}
        >
          <span className="truncate">{currentValue}</span>
          <ChevronDownIcon />
        </button>

        {isOpen && (
          <div 
            className="absolute left-0 top-full mt-1.5 w-60 bg-white border border-[#E0E6EB] rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 origin-top"
            style={{ boxShadow: "0px 16px 32px -8px rgba(12, 12, 13, 0.4)" }}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue(option);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentValue === option
                      ? "bg-[#EFF4FA] text-[#635BFF]"
                      : "text-[#29343D] hover:bg-[#EFF4FA]"
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

  // Sync external ticket ID from props (e.g. when redirected from Automations & Mail page)
  useEffect(() => {
    if (activeTicketId) {
      const match = tickets.find((t) => t.id === activeTicketId);
      if (match) {
        setActiveTicket(match);
      }
    }
  }, [activeTicketId, tickets]);

  // Reusable trigger for Toast notification
  const triggerToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Refresh page data trigger simulation
  const handleRefreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      triggerToast("Support status dashboard synchronized", "success");
    }, 1000);
  };

  // Delete ticket handler
  const handleDeleteTicket = (ticketId: string) => {
    setDeletingTicketId(ticketId);
  };

  const confirmDeleteTicket = () => {
    if (!deletingTicketId) return;
    setTickets((prev) => prev.filter((t) => t.id !== deletingTicketId));
    triggerToast(`Ticket ${deletingTicketId} deleted successfully`, "success");
    if (activeTicket?.id === deletingTicketId) {
      handleGoBack();
    }
    setDeletingTicketId(null);
  };

  // Close ticket handler inside profile card
  const handleCloseActiveTicket = () => {
    if (!activeTicket) return;
    if (confirm(`Are you sure you want to close ticket ${activeTicket.id}?`)) {
      const updated = tickets.map((t) => {
        if (t.id === activeTicket.id) {
          return { ...t, status: "Closed" as const };
        }
        return t;
      });
      setTickets(updated);
      setActiveTicket({ ...activeTicket, status: "Closed" });
      triggerToast(`Ticket ${activeTicket.id} marked as Closed`, "success");
    }
  };

  // Delete announcement handler
  const handleDeleteAnnouncement = (id: string) => {
    setDeletingAnnouncementId(id);
  };

  const confirmDeleteAnnouncement = () => {
    if (!deletingAnnouncementId) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== deletingAnnouncementId));
    triggerToast("Announcement deleted successfully", "success");
    setDeletingAnnouncementId(null);
  };

  // Reset filters handler
  const handleResetFilters = () => {
    setPriorityFilter("All Priority");
    setCategoryFilter("All Categories");
    triggerToast("Filters cleared", "info");
  };

  // Submit announcement simulation
  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annMessage) {
      triggerToast("Please fill in all required fields", "error");
      return;
    }

    setIsSubmittingAnnouncement(true);
    setTimeout(() => {
      if (editingAnnouncementId) {
        // Edit existing announcement
        const updated = announcements.map((a) => {
          if (a.id === editingAnnouncementId) {
            return {
              ...a,
              title: annTitle,
              audience: annAudience,
              channel: annChannel,
              message: annMessage,
              type: (annType || undefined) as any,
              status: annCategory,
              category: (annCategory || undefined) as any,
              scheduleTime: annCategory === "Scheduled" ? (annDate && annTime ? `${annDate} ${annTime}` : annScheduleTime) : undefined
            };
          }
          return a;
        });
        setAnnouncements(updated);
        triggerToast("Announcement updated successfully!", "success");
      } else {
        // Create new announcement
        const newAnn: Announcement = {
          id: `ann-${Date.now()}`,
          title: annTitle,
          audience: annAudience,
          channel: annChannel,
          date: new Date().toLocaleDateString("en-GB"),
          status: annCategory,
          message: annMessage,
          type: (annType || undefined) as any,
          category: (annCategory || undefined) as any,
          scheduleTime: annCategory === "Scheduled" ? (annDate && annTime ? `${annDate} ${annTime}` : "08/19/2025 08:00") : undefined,
          sentCount: annCategory === "Sent" ? Math.floor(Math.random() * 50) + 10 : 0,
          openedCount: annCategory === "Sent" ? Math.floor(Math.random() * 10) + 5 : 0,
          timeAgo: annCategory === "Sent" ? "Just now" : undefined
        };
        setAnnouncements((prev) => [newAnn, ...prev]);
        triggerToast(`Announcement "${newAnn.title}" published successfully!`, "success");
      }

      setIsSubmittingAnnouncement(false);
      setShowAnnouncementModal(false);
      setEditingAnnouncementId(null);

      // Reset fields
      setAnnTitle("");
      setAnnAudience("");
      setAnnChannel("");
      setAnnMessage("");
      setAnnType("");
      setAnnCategory("");
      setAnnScheduleTime("");
      setAnnCtaEnabled(false);
      setAnnCtaTitle("");
      setAnnSignature("");
      setAnnDisclaimer("");
      setAnnDate("");
      setAnnTime("");
      setAnnFileName("");
    }, 1200);
  };

  const handleStartEditAnnouncement = (a: Announcement) => {
    setEditingAnnouncementId(a.id);
    setAnnTitle(a.title);
    setAnnAudience(a.audience);
    setAnnChannel(a.channel);
    setAnnMessage(a.message);
    setAnnType(a.type || "Alert");
    setAnnCategory((a.category || a.status) as any);
    setAnnScheduleTime(a.scheduleTime || "");
    // Load defaults or existing values
    setAnnCtaEnabled(true);
    setAnnCtaTitle("Enter CTA title");
    setAnnSignature("");
    setAnnDisclaimer("");
    if (a.scheduleTime) {
      const parts = a.scheduleTime.split(" ");
      setAnnDate(parts[0] || "08/19/2025");
      setAnnTime(parts[1] || "08:00");
    } else {
      setAnnDate("08/19/2025");
      setAnnTime("12:00");
    }
    setAnnFileName("");
    setPreviewingAnnouncement(null);
    setShowAnnouncementModal(true);
  };

  // Submit Send Email simulator
  const handleSendEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailMessageText.trim() || !activeTicket) return;

    setIsSendingEmail(true);
    setTimeout(() => {
      const timestampStr = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).replace(",", "");

      const newEmail = {
        sender: "Support Team",
        message: emailMessageText,
        date: timestampStr
      };

      const updated = tickets.map((t) => {
        if (t.id === activeTicket.id) {
          return {
            ...t,
            emailsSent: [newEmail, ...t.emailsSent]
          };
        }
        return t;
      });

      setTickets(updated);
      setActiveTicket({
        ...activeTicket,
        emailsSent: [newEmail, ...activeTicket.emailsSent]
      });

      setIsSendingEmail(false);
      setShowSendEmailModal(false);
      setEmailMessageText("");
      triggerToast("Email sent and recorded successfully", "success");
    }, 1000);
  };

  // Submit Add Note simulator
  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteText.trim() || !activeTicket) return;

    const newNote = {
      author: internalNoteType === "resolution" ? "Resolution" : "Support Team",
      message: internalNoteText,
      daysAgo: "Just now",
      type: internalNoteType
    };

    const updated = tickets.map((t) => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          internalNotes: [newNote, ...t.internalNotes],
          status: internalNoteType === "resolution" ? ("Closed" as const) : t.status
        };
      }
      return t;
    });

    setTickets(updated);
    setActiveTicket({
      ...activeTicket,
      internalNotes: [newNote, ...activeTicket.internalNotes],
      status: internalNoteType === "resolution" ? "Closed" : activeTicket.status
    });

    setShowAddNoteModal(false);
    setInternalNoteText("");
    triggerToast(
      internalNoteType === "resolution"
        ? "Resolution saved. Ticket closed successfully."
        : "Internal note saved.",
      "success"
    );
  };

  const handleAddNewNoteClick = () => {
    setEditingNoteIndex(null);
    setNoteTitleInput("");
    setNoteContentInput("");
    setNoteCategoryInput("Several");
    setShowAddNoteModal(true);
  };

  const handleStartEditNote = (note: any, index: number) => {
    setEditingNoteIndex(index);
    setNoteTitleInput(note.title || "");
    setNoteContentInput(note.message || "");
    setNoteCategoryInput(note.category || "Several");
    setShowAddNoteModal(true);
  };

  // Go back to the tickets table view list
  const handleGoBack = () => {
    setActiveTicket(null);
    if (onCloseTicketDetail) {
      onCloseTicketDetail();
    }
  };

  // Filter application logic
  const filteredTickets = tickets.filter((ticket) => {
    if (priorityFilter !== "All Priority" && ticket.priority !== priorityFilter) return false;
    if (categoryFilter !== "All Categories" && ticket.category !== categoryFilter) return false;
    return true;
  });

  // Calculate live values
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const waitingCount = tickets.filter((t) => t.status === "Waiting").length;
  const closedCount = tickets.filter((t) => t.status === "Closed").length;

  // Custom Colors & Style helpers
  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-[#FFE5ED] text-[#FF6692] border border-[#FF6692]/10";
      case "high":
        return "bg-[#FFF1F2] text-[#FF4E73] border border-[#FF4E73]/10";
      case "medium":
        return "bg-[#FFF9E5] text-[#FFD648] border border-[#FFD648]/10";
      case "low":
        return "bg-[#EBFAF0] text-[#36C76C] border border-[#36C76C]/10";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const getAnnTypeStyle = (type?: string) => {
    switch (type) {
      case "Alert":
        return "bg-[#FFE5ED] text-[#FF6692]";
      case "Maintenance":
        return "bg-[#FFF9E5] text-[#FFD648]";
      case "New Feature":
        return "bg-[#ECFDFD] text-[#16CDC7]";
      case "Update":
        return "bg-[#E8E5FF] text-[#635BFF]";
      default:
        return "bg-[#EFF4FA] text-[#0A2540]";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "closed":
        return "bg-[#EBFAF0] text-[#36C76C]";
      case "open":
        return "bg-[#FFE5ED] text-[#FF6692]";
      case "waiting":
        return "bg-[#FFF9E5] text-[#FFD648]";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "technical":
        return "bg-[#f5f3ff] text-[#5e53fc]";
      case "billing":
        return "bg-[#f0fdf4] text-[#16a34a]";
      case "feature request":
        return "bg-purple-50 text-purple-700";
      case "general":
        return "bg-[#eff6ff] text-[#2563eb]";
      case "bug report":
        return "bg-[#fff1f2] text-rose-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // Render salon logo initials
  const renderSalonLogo = (name: string) => {
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const bgColors = [
      "bg-indigo-500 text-white",
      "bg-teal-500 text-white",
      "bg-purple-500 text-white",
      "bg-rose-500 text-white",
      "bg-blue-500 text-white"
    ];
    const bgIdx = name.length % bgColors.length;

    return (
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black tracking-wider shadow-inner shrink-0 ${bgColors[bgIdx]}`}>
        {initials}
      </div>
    );
  };

  // Dropdown values options definitions
  const priorityOptions = ["All Priority", "Urgent", "High", "Medium", "Low"];
  const categoryOptions = [
    "All Categories",
    "Technical",
    "Billing",
    "Bug Report",
    "Feature Request",
    "General",
    "Other"
  ];

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
      <div className="flex flex-col text-left gap-1.5 relative select-none">
        {label && <label className="text-[10px] font-extrabold text-[#98A4AE] uppercase tracking-wide">{label}</label>}
        <button
          type="button"
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className="flex items-center justify-between min-w-[160px] bg-white border border-[#E0E6EB] rounded-lg px-4 py-2 text-xs font-semibold text-[#29343D] shadow-sm hover:border-slate-300 transition-all text-left"
          style={{ height: "36px" }}
        >
          <span className="truncate">{currentValue}</span>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>

        {isOpen && (
          <div 
            className="absolute left-0 top-full mt-1.5 w-60 bg-white border border-[#E0E6EB] rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 origin-top"
            style={{ boxShadow: "0px 16px 32px -8px rgba(12, 12, 13, 0.4)" }}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setValue(option);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentValue === option
                      ? "bg-[#EFF4FA] text-[#635BFF]"
                      : "text-[#29343D] hover:bg-[#EFF4FA]"
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

  const audienceBuilderInputClass =
    "w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-[14px] font-normal leading-5 text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-colors placeholder:text-[#98A4AE]";

  const renderAudienceBuilderSelect = (
    label: string,
    id: string,
    value: string,
    options: string[],
    onChange: (value: string) => void
  ) => {
    const isOpen = activeDropdown === id;

    return (
      <div className="relative flex min-w-0 flex-col gap-2">
        <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className={`${audienceBuilderInputClass} flex items-center justify-between gap-4 text-left`}
        >
          <span className={`truncate ${value ? "text-[#29343D]" : "text-[#98A4AE]"}`}>
            {value}
          </span>
          <span className="shrink-0 text-[#98A4AE]">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-[90] mt-1 rounded-[8px] border border-[#E0E6EB] bg-white p-2 shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)]">
            <div className="flex max-h-[184px] flex-col gap-1 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setActiveDropdown(null);
                  }}
                  className={`h-7 rounded-[4px] px-2 text-left text-[12px] font-normal leading-4 transition-colors ${
                    value === option
                      ? "bg-[#F1F2FE] text-[#635BFF]"
                      : "text-[#29343D] hover:bg-[#EFF4FA]"
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

  const renderAudienceBuilderInput = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder?: string
  ) => (
    <div className="flex min-w-0 flex-col gap-2">
      <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={audienceBuilderInputClass}
      />
    </div>
  );

  const audienceBuilderSectionClass =
    "flex w-full min-w-[0] flex-col items-start gap-[30px] rounded-[12px] bg-white p-[30px] shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]";

  const audienceBuilderGridClass = "grid w-full grid-cols-1 gap-x-6 gap-y-[30px] md:grid-cols-2";

  // Render Full detailed view if a ticket is selected (Figma SS spec: width 1247px layout view)
  if (activeTicket) {
    return (
      <div className="flex flex-col gap-6 w-full text-left font-sans select-none animate-in fade-in duration-300">
        
        {/* Toast Container */}
        <div className="fixed top-6 right-6 z-[120] flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-bold text-[#29343D] bg-white pointer-events-auto"
              style={{ borderColor: toast.type === "success" ? "#EBFAF0" : "#FFE5ED" }}
            >
              {toast.type === "success" && <div className="w-5 h-5 rounded-full bg-[#EBFAF0] text-[#36C76C] flex items-center justify-center"><CheckIcon className="w-3.5 h-3.5" /></div>}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>

        {/* Title Bar (Breadcrumb Header - Figma height 60px, padding 16px 30px) */}
        <div 
          className="bg-white rounded-xl flex items-center justify-between w-full px-[30px] py-4"
          style={{
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
            border: "1px solid #E0E6EB",
            height: "60px"
          }}
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={handleGoBack}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-[#635BFF]"
              title="Back to Ticket List"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="font-bold text-[#29343D] text-[16px] leading-[22px] font-sans">
              {activeTicket.order}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-[#29343D]">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[#29343D] text-xs font-bold">/</span>
            <div className="flex items-center justify-center px-3 py-1 bg-[#DDDBFF] rounded-lg text-xs font-semibold text-[#635BFF]" style={{ height: "28px" }}>
              Support
            </div>
          </div>
        </div>

        {/* Profile Card & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full">
          
          {/* Left Card: Change profile pic (Figma size: 584.5px x 337px) */}
          <div className="bg-white border border-[#E0E6EB] rounded-xl p-[30px] flex flex-col items-center justify-between h-[337px] shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <SupportAvatar />
              <div className="text-center">
                <h3 className="font-bold text-[18px] leading-[25px] text-[#29343D] font-sans">
                  {salonContacts[activeTicket.salonName]?.name || activeTicket.assignTo}
                </h3>
                <p className="text-sm text-[#98A4AE] font-sans">
                  {salonContacts[activeTicket.salonName]?.email || "maria@bellavista.com"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={() => setShowSendEmailModal(true)}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#EFF4FA] hover:bg-slate-200 text-sm font-semibold text-[#0A2540] rounded-lg transition-all"
                style={{ width: "130px", height: "44px" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Send Email</span>
              </button>

              <button
                onClick={handleCloseActiveTicket}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#FF6692] hover:bg-[#e6557e] text-sm font-semibold text-white rounded-lg transition-all shadow-sm"
                style={{ width: "114px", height: "44px" }}
              >
                <span>Close Ticket</span>
              </button>
            </div>
          </div>

          {/* Right Card: Ticket Informations Widget (Figma size: 584.5px x 337px) */}
          <div className="bg-white border border-[#E0E6EB] rounded-xl p-[30px] flex flex-col h-[337px] shadow-sm text-left">
            <h3 className="font-bold text-[18px] leading-[25px] text-[#29343D] border-b border-slate-100 pb-3 font-sans">
              Ticket Informations
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-5">
              
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#999999] uppercase tracking-wide">ID</span>
                <span className="text-[13px] font-bold text-[#29343D] font-mono">{activeTicket.id}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#999999] uppercase tracking-wide">Salon Beauty</span>
                <span className="text-[13px] font-bold text-[#29343D]">{activeTicket.salonName}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#999999] uppercase tracking-wide">Category</span>
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 bg-[#FFF9E5] text-[#FFD648] rounded-full text-xs font-bold">
                    {activeTicket.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#999999] uppercase tracking-wide">Date</span>
                <span className="text-[13px] font-bold text-[#29343D]">{activeTicket.date}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#999999] uppercase tracking-wide">Priority</span>
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 bg-[#FF6692] text-[#FFE5ED] rounded text-xs font-bold uppercase tracking-wide">
                    {activeTicket.priority}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#999999] uppercase tracking-wide">Status</span>
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 bg-[#ECFDFD] text-[#16CDC7] rounded text-xs font-bold uppercase tracking-wide">
                    {activeTicket.status}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Initial Request (Figma size: 1199px x 120px widget) */}
        <div className="bg-white border border-[#E0E6EB] rounded-xl p-[30px] flex flex-col gap-3.5 shadow-sm text-left">
          <h4 className="text-xs font-bold text-[#29343D] uppercase tracking-wider">Initial Request</h4>
          <p className="text-[13px] leading-[18px] text-[#29343D] font-semibold">
            {activeTicket.initialRequest}
          </p>
        </div>

        {/* Email Sent from tickets section */}
        <div className="bg-white border border-[#E0E6EB] rounded-xl p-[30px] flex flex-col gap-6 shadow-sm text-left">
          <h4 className="font-bold text-[18px] leading-[25px] text-[#29343D]">
            Email Sent from tickets section
          </h4>

          <div className="flex flex-col gap-5">
            {activeTicket.emailsSent.length === 0 ? (
              <div className="text-xs text-slate-400 py-4 font-semibold italic text-center">
                No outbound emails have been sent for this support ticket.
              </div>
            ) : (
              activeTicket.emailsSent.map((email, i) => (
                <div 
                  key={i} 
                  className="bg-[#F1F2FE] rounded-xl p-6 flex flex-col gap-2 relative border border-[#EFF4FA]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#29343D]">{email.sender}</span>
                    <button 
                      onClick={() => setViewingEmailItem(email)}
                      className="w-12 h-9 bg-[#DDDBFF] text-[#635BFF] hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center shrink-0"
                    >
                      <EyeIcon />
                    </button>
                  </div>
                  <p className="text-sm text-[#29343D] font-medium leading-relaxed">
                    {email.message}
                  </p>
                  <span className="text-xs text-[#98A4AE] mt-1 font-semibold">{email.date}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Internal Notes Card */}
        <div className="bg-white border border-[#E0E6EB] rounded-xl p-[30px] flex flex-col gap-6 shadow-sm text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[18px] leading-[25px] text-[#29343D]">Internal Notes</h4>
            <button 
              onClick={handleAddNewNoteClick}
              className="w-12 h-9 bg-[#B5EAF7] text-[#2F889E] hover:bg-[#99dff0] rounded-lg transition-colors flex items-center justify-center shrink-0"
              title="Add Internal Note"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {activeTicket.internalNotes.length === 0 ? (
              <div className="text-xs text-slate-400 py-4 font-semibold italic text-center">
                No internal notes recorded for this ticket.
              </div>
            ) : (
              activeTicket.internalNotes.map((note, i) => (
                <div 
                  key={i}
                  className={`border rounded-xl p-4 flex items-center justify-between gap-4 ${
                    note.type === "resolution" 
                      ? "bg-[#EBFAF0] border-[#36C76C]" 
                      : "bg-[#FFF9E5] border-[#FFD648]"
                  }`}
                >
                  <div className="flex gap-4 items-center flex-1">
                    <div className={`w-0.5 h-10 rounded-full shrink-0 ${
                      note.type === "resolution" ? "bg-[#36C76C]" : "bg-[#FFD648]"
                    }`} />

                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[14px] font-bold ${
                          note.type === "resolution" ? "text-[#36C76C]" : "text-[#29343D]"
                        }`}>
                          {note.title || note.author}
                        </span>
                        {note.category && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded">
                            {note.category}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        note.type === "resolution" ? "text-[#36C76C]" : "text-[#98A4AE]"
                      }`}>
                        {note.message}
                      </p>
                      <span className={`text-xs font-semibold ${
                        note.type === "resolution" ? "text-[#36C76C]/80" : "text-[#526B7A]"
                      }`}>
                        {note.daysAgo}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleStartEditNote(note, i)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors shrink-0"
                    title="Edit Note"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MODAL: Send Email popup */}
        {showSendEmailModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[130] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col text-left border border-[#E0E6EB]">
              <div className="px-6 py-4 border-b border-[#E0E6EB] flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-sm text-[#29343D]">Send Outbound Email</h3>
                <button onClick={() => setShowSendEmailModal(false)} className="text-slate-400 hover:text-slate-650">
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleSendEmailSubmit} className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-[#98A4AE] uppercase tracking-wide">Recipient</label>
                  <input
                    type="text"
                    disabled
                    value={`${salonContacts[activeTicket.salonName]?.name || "Maria Rodriguez"} <${salonContacts[activeTicket.salonName]?.email || "maria@bellavista.com"}>`}
                    className="w-full bg-slate-50 border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#98A4AE]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-[#98A4AE] uppercase tracking-wide">Email Body *</label>
                  <textarea
                    required
                    rows={4}
                    value={emailMessageText}
                    onChange={(e) => setEmailMessageText(e.target.value)}
                    placeholder="Type the message you want to email to the customer..."
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowSendEmailModal(false)}
                    className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSendingEmail || !emailMessageText.trim()}
                    className="px-5 py-2 bg-[#635BFF] text-white hover:bg-[#4d42eb] text-xs font-bold rounded-lg transition-all"
                  >
                    {isSendingEmail ? "Sending..." : "Send Email"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: Edit Note popup */}
        {showAddNoteModal && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[130] flex items-center justify-center p-4"
            onClick={() => setShowAddNoteModal(false)}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col text-left border border-[#E0E6EB] p-6 gap-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-[#29343D]">
                  {editingNoteIndex !== null ? "Edit Note" : "Add Note"}
                </h3>
                <button 
                  onClick={() => setShowAddNoteModal(false)} 
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editingNoteIndex !== null) {
                    // Save changes to existing note
                    const updatedNotes = [...activeTicket.internalNotes];
                    updatedNotes[editingNoteIndex] = {
                      ...updatedNotes[editingNoteIndex],
                      title: noteTitleInput,
                      message: noteContentInput,
                      category: noteCategoryInput
                    };
                    const updatedTickets = tickets.map((t) => {
                      if (t.id === activeTicket.id) {
                        return { ...t, internalNotes: updatedNotes };
                      }
                      return t;
                    });
                    setTickets(updatedTickets);
                    setActiveTicket({ ...activeTicket, internalNotes: updatedNotes });
                    setShowAddNoteModal(false);
                    triggerToast("Note updated successfully", "success");
                  } else {
                    // Add new note
                    const newNote = {
                      author: "Support Team",
                      title: noteTitleInput,
                      message: noteContentInput,
                      category: noteCategoryInput,
                      daysAgo: "Just now",
                      type: "note" as const
                    };
                    const updatedNotes = [newNote, ...activeTicket.internalNotes];
                    const updatedTickets = tickets.map((t) => {
                      if (t.id === activeTicket.id) {
                        return { ...t, internalNotes: updatedNotes };
                      }
                      return t;
                    });
                    setTickets(updatedTickets);
                    setActiveTicket({ ...activeTicket, internalNotes: updatedNotes });
                    setShowAddNoteModal(false);
                    triggerToast("Note added successfully", "success");
                  }
                  // Reset inputs
                  setNoteTitleInput("");
                  setNoteContentInput("");
                  setNoteCategoryInput("Several");
                  setEditingNoteIndex(null);
                }}
                className="flex flex-col gap-4"
              >
                {/* Title Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Title</label>
                  <input
                    type="text"
                    value={noteTitleInput}
                    onChange={(e) => setNoteTitleInput(e.target.value)}
                    placeholder="Enter title"
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                  />
                </div>

                {/* Content Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Content</label>
                  <textarea
                    rows={4}
                    value={noteContentInput}
                    onChange={(e) => setNoteContentInput(e.target.value)}
                    placeholder="Enter content"
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Category</label>
                  <div className="relative">
                    <select
                      value={noteCategoryInput}
                      onChange={(e) => setNoteCategoryInput(e.target.value)}
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="Several">Several</option>
                      <option value="Technical">Technical</option>
                      <option value="Billing">Billing</option>
                      <option value="General">General</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-2">
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-[#635BFF] text-white hover:bg-[#4d42eb] text-xs font-bold rounded-lg transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: View Email Details popup */}
        {viewingEmailItem && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setViewingEmailItem(null)}
          >
            <div 
              className="bg-white rounded-xl shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[638px] max-w-full flex flex-col gap-6 p-6 overflow-y-auto max-h-[90vh] text-left border border-[#E0E6EB] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header block */}
              <div className="flex flex-row items-center justify-between w-full h-[25px] shrink-0">
                <div className="flex flex-col items-start gap-2.5 flex-grow">
                  <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
                    View Email Details
                  </h3>
                </div>
                <button 
                  onClick={() => setViewingEmailItem(null)} 
                  className="w-6 h-6 flex items-center justify-center shrink-0 text-[#29343D] hover:opacity-80 transition-opacity"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Inner widget card container */}
              <div className="w-full border border-[#E0E6EB] rounded-xl p-6 flex flex-col gap-6 bg-white shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
                
                {/* Username header */}
                <div className="flex flex-row items-center gap-3 w-full h-10">
                  <div className="w-10 h-10 rounded-full bg-[#16CDC7] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-sans font-semibold text-[15px] leading-5 text-[#29343D]">
                      Suport Team
                    </span>
                    <span className="font-sans font-normal text-[14px] leading-5 text-[#98A4AE]">
                      Ticket {activeTicket.id}
                    </span>
                  </div>
                </div>

                {/* Informations section */}
                <div className="flex flex-col gap-4 w-full">
                  <h4 className="font-sans font-semibold text-[13px] leading-[18px] text-[#29343D]">
                    Informations
                  </h4>
                  <div className="flex flex-col gap-4">
                    {/* Created and Sent row */}
                    <div className="flex flex-row items-start gap-4 w-full">
                      <div className="flex flex-col justify-center items-start gap-1 w-1/2">
                        <span className="font-sans font-normal text-[12px] leading-4 text-[#999999]">
                          Created
                        </span>
                        <span className="font-sans font-semibold text-[13px] leading-[18px] text-[#29343D]">
                          07/08/2025, 07:44:57
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-start gap-1 w-1/2">
                        <span className="font-sans font-normal text-[12px] leading-4 text-[#999999]">
                          Sent
                        </span>
                        <span className="font-sans font-semibold text-[13px] leading-[18px] text-[#29343D]">
                          07/08/2025, 07:44:57
                        </span>
                      </div>
                    </div>

                    {/* Opened row */}
                    <div className="flex flex-row items-start gap-4 w-full">
                      <div className="flex flex-col justify-center items-start gap-1 w-full">
                        <span className="font-sans font-normal text-[12px] leading-4 text-[#999999]">
                          Opened
                        </span>
                        <span className="font-sans font-semibold text-[13px] leading-[18px] text-[#29343D]">
                          07/08/2025, 10:02:15
                        </span>
                      </div>
                    </div>

                    {/* Source and Status row */}
                    <div className="flex flex-row items-start gap-4 w-full">
                      <div className="flex flex-col justify-center items-start gap-1 w-1/2">
                        <span className="font-sans font-normal text-[12px] leading-4 text-[#999999]">
                          Source
                        </span>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-1 bg-[#EFF4FA] text-[#0A2540] rounded-lg font-sans font-medium text-[12px] leading-4">
                            Auto
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-start gap-1 w-1/2">
                        <span className="font-sans font-normal text-[12px] leading-4 text-[#999999]">
                          Status
                        </span>
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 bg-[#EBFAF0] text-[#36C76C] rounded-md font-sans font-semibold text-[13px] leading-[18px]">
                            Opened
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject section */}
                <div className="flex flex-col gap-2 w-full">
                  <h4 className="font-sans font-semibold text-[13px] text-[#29343D]">
                    Subject
                  </h4>
                  <div className="w-full bg-[#F1F2FE] p-6 rounded-xl flex flex-col gap-4">
                    <p className="font-sans font-normal text-[14px] leading-5 text-[#29343D]">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>

                {/* Content section */}
                <div className="flex flex-col gap-2 w-full">
                  <h4 className="font-sans font-semibold text-[13px] text-[#29343D]">
                    Content
                  </h4>
                  <div className="w-full bg-[#F1F2FE] p-6 rounded-xl flex flex-col gap-4">
                    <p className="font-sans font-normal text-[14px] leading-5 text-[#29343D] break-words whitespace-pre-wrap">
                      {viewingEmailItem.message}
                    </p>
                  </div>
                </div>

                {/* Attachments section */}
                <div className="flex flex-col gap-2 w-full">
                  <h4 className="font-sans font-semibold text-[13px] text-[#29343D]">
                    Attachments
                  </h4>
                  <div className="w-full border border-[#E9EAEB] rounded-xl p-4 flex flex-row items-center justify-between gap-1 bg-white h-[76px]">
                    <div className="flex flex-row items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" rx="8" fill="#F1F2FE"/>
                          <path d="M14 11H22L28 17V29C28 30.1 27.1 31 26 31H14C12.9 31 12 30.1 12 29V13C12 11.9 12.9 11 14 11Z" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 11V17H28" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17 21H23" stroke="#635BFF" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M17 25H23" stroke="#635BFF" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-sans font-semibold text-[16px] leading-[22px] text-[#635BFF]">
                          originalname.pdf
                        </span>
                        <span className="font-sans font-normal text-[14px] leading-[20px] text-[#98A4AE]">
                          4.2 MB
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      {/* Eyeball preview */}
                      <button className="w-12 h-9 rounded-lg bg-[#F1F2FE] hover:bg-[#e0e2fe] transition-colors flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      {/* Download */}
                      <button className="w-12 h-9 rounded-lg bg-[#DDDBFF] hover:bg-[#c6c3fe] transition-colors flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Foward button */}
              <div className="flex flex-row justify-end items-center gap-2.5 w-full mt-2">
                <button 
                  onClick={() => triggerToast("Email forwarded", "success")}
                  className="px-4 py-2.5 bg-[#EFF4FA] hover:bg-slate-200 text-sm font-semibold text-[#0A2540] rounded-lg transition-all"
                  style={{ width: "79px", height: "44px" }}
                >
                  Foward
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  if (showAudienceBuilderPage) {
    return (
      <form
        onSubmit={editingAudienceItem ? handleEditAudienceSubmit : handleNewAudienceSubmit}
        className="relative mx-auto flex w-full max-w-[1247px] flex-col items-start gap-[30px] rounded-[20px] bg-[#F4F7FB] p-[30px] text-left font-sans"
      >
        {activeDropdown && (
          <button
            type="button"
            aria-label="Close dropdown"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setActiveDropdown(null)}
          />
        )}

        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-bold text-[#29343D] bg-white pointer-events-auto animate-in slide-in-from-right duration-250 ${
                toast.type === "success"
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

        <div className="flex h-[68px] w-full items-center justify-between gap-[30px] rounded-[12px] bg-white px-[30px] py-4 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setShowAudienceBuilderPage(false);
                setEditingAudienceItem(null);
                setActiveDropdown(null);
              }}
              className="flex h-6 w-6 shrink-0 items-center justify-center text-[#635BFF] transition-opacity hover:opacity-80"
              title="Back to audiences"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="truncate text-[16px] font-bold leading-[22px] text-[#29343D]">
              {editingAudienceItem ? "Edit Audience" : "New Audience"}
            </h1>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#29343D]" aria-hidden="true">
              <path d="M3 10.5L12 3L21 10.5V21H15V15H9V21H3V10.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" opacity="0.5" />
            </svg>
            <span className="text-[16px] font-bold leading-[22px] text-[#29343D]">/</span>
            <span className="rounded-[8px] bg-[#DDDBFF] px-2 py-1 text-[14px] font-normal leading-5 text-[#635BFF]">
              Support
            </span>
          </div>
        </div>

        <section className={audienceBuilderSectionClass}>
          <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
            Recipient Profile
          </h2>
          <div className={audienceBuilderGridClass}>
            {renderAudienceBuilderInput("Name of Audience", audNameInput, setAudNameInput, "Audience 02")}
            {renderAudienceBuilderSelect("Recipient", "aud-recipient", audRecipientInput, ["All", "Owner", "Employee", "Accountants", "Clients"], (value) => setAudRecipientInput(value as typeof audRecipientInput))}
            {renderAudienceBuilderSelect("Type of membership", "aud-membership-type", audMembershipTypeInput, ["All", "X", "Y"], setAudMembershipTypeInput)}
            {renderAudienceBuilderSelect("Membership status", "aud-membership-status", audStatusInput, ["All", "Active", "Cancelled", "Trial"], (value) => setAudStatusInput(value as typeof audStatusInput))}
          </div>
        </section>

        <section className={audienceBuilderSectionClass}>
          <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
            Company Structure
          </h2>
          <div className={audienceBuilderGridClass}>
            {renderAudienceBuilderSelect("Number of employees", "aud-employees", audEmployeesInput, ["All", "Between a and b"], (value) => setAudEmployeesInput(value as typeof audEmployeesInput))}
            {renderAudienceBuilderSelect("Number of clients", "aud-clients", audClientsNumberInput, ["All", "0-50", "51-200", "201+"], setAudClientsNumberInput)}
          </div>
        </section>

        <section className={audienceBuilderSectionClass}>
          <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
            Digital Presence
          </h2>
          <div className={audienceBuilderGridClass}>
            {renderAudienceBuilderSelect("Social media linked", "aud-social", audSocialMediaLinkedInput, ["No", "Yes"], setAudSocialMediaLinkedInput)}
            {renderAudienceBuilderSelect("Has whatsapp API", "aud-whatsapp", audHasWhatsappApiInput, ["Yes", "No"], setAudHasWhatsappApiInput)}
          </div>
        </section>

        <section className={audienceBuilderSectionClass}>
          <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
            Demographics
          </h2>
          <div className={audienceBuilderGridClass}>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
                Age (Pick-number)
              </label>
              <div className="grid grid-cols-1 gap-x-6 gap-y-[30px] md:grid-cols-2">
                <input
                  type="number"
                  min="0"
                  value={audAgeMinInput}
                  onChange={(e) => setAudAgeMinInput(e.target.value)}
                  className={audienceBuilderInputClass}
                />
                <input
                  type="number"
                  min="0"
                  value={audAgeMaxInput}
                  onChange={(e) => setAudAgeMaxInput(e.target.value)}
                  className={audienceBuilderInputClass}
                />
              </div>
            </div>
            {renderAudienceBuilderSelect("Income", "aud-income", audIncomeInput, ["Between x and y", "Low", "Medium", "High", "All"], setAudIncomeInput)}
          </div>
        </section>

        <section className={audienceBuilderSectionClass}>
          <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
            Location
          </h2>
          <div className={audienceBuilderGridClass}>
            {renderAudienceBuilderSelect("Region", "aud-region", audRegionInput, ["All", "Region 01", "Region 02", "Region 03", "Region 04", "Region 05"], setAudRegionInput)}
            {renderAudienceBuilderSelect("City", "aud-city", audCityInput, ["All", "City 01", "City 02", "City 03", "City 04", "City 05"], setAudCityInput)}
            {renderAudienceBuilderSelect("Province", "aud-province", audProvinceInput, ["All", "Province 01", "Province 02", "Province 03", "Province 04", "Province 05"], setAudProvinceInput)}
          </div>
        </section>

        <section className={audienceBuilderSectionClass}>
          <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
            Engagement
          </h2>
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-[30px] md:grid-cols-2">
            {renderAudienceBuilderSelect("Subscribed from", "aud-subscribed", audSubscribedFromInput, ["Between x and y", "Website", "Referral", "Ads", "All"], setAudSubscribedFromInput)}
          </div>
        </section>

        <div className="flex h-9 w-full justify-end">
          <button
            type="submit"
            className="flex h-9 w-[113px] items-center justify-center rounded-[8px] bg-[#635BFF] px-4 text-center text-[12px] font-medium leading-4 text-white transition-colors hover:bg-[#4d42eb]"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  }

  // Render Full detailed view if an audience is selected (Figma SS spec: width 1247px layout view)
  if (viewedAudience) {
    const matchingSalonCount = getAudienceSalonCount(viewedAudience.name);

    return (
      <div 
        className="flex flex-col items-start p-[30px] gap-[30px] w-full bg-[#F4F7FB] rounded-[20px] select-none animate-in fade-in duration-300"
        style={{ minHeight: "805px" }}
      >
        {/* Title Bar */}
        <div 
          className="bg-white rounded-[12px] flex items-center justify-between w-full px-[30px] py-4 border border-[#E0E6EB]"
          style={{
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
            height: "68px"
          }}
        >
          <div className="flex flex-row items-center gap-4 flex-grow">
            <button 
              onClick={() => setViewedAudience(null)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-[#635BFF] flex items-center justify-center"
              title="Back to Audience List"
              style={{ width: "24px", height: "24px" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="font-sans font-bold text-[16px] leading-[22px] text-[#29343D]">
              Salons in {viewedAudience.name}
            </h1>
            <div className="flex items-center justify-center w-6 h-6 bg-[#635BFF] text-white rounded-full text-[12px] font-bold">
              {matchingSalonCount}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowSalonsListModal(true)}
              className="flex items-center justify-center px-4 py-2 bg-[#F1F2FE] hover:bg-slate-200 rounded-lg text-xs font-semibold text-[#635BFF] transition-all"
              style={{ height: "36px", width: "79px" }}
            >
              View list
            </button>
            
            <div className="flex items-center gap-2 text-xs font-bold text-[#29343D]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-[#29343D]">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="opacity-50 text-[#29343D]">/</span>
              <div className="flex items-center justify-center px-2 py-1 bg-[#DDDBFF] rounded-lg text-xs font-semibold text-[#635BFF]" style={{ height: "28px", width: "69px" }}>
                Support
              </div>
            </div>
          </div>
        </div>

        {/* Grid Container (3 Rows) */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Row 1: Recipient Profile & Company Structure */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            
            {/* Widget 1: Recipient Profile */}
            <div className="flex-grow flex-1 bg-white border border-[#E0E6EB] rounded-[12px] p-6 flex flex-col gap-6 shadow-[0px_2px_4px_-1px_rgba(175, 182, 201, 0.2)]" style={{ height: "201px" }}>
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] text-left">
                Recipient Profile
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Name</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.name}</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Recipient</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold ${getRecipientBadgeStyle(viewedAudience.recipient)}`}>
                    {viewedAudience.recipient}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Type of Membership</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.membershipType || "X"}</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Membership Status</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${getMembershipBadgeStyle(viewedAudience.status)}`}>
                    {viewedAudience.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Widget 2: Company Structure */}
            <div className="flex-grow flex-1 bg-white border border-[#E0E6EB] rounded-[12px] p-6 flex flex-col gap-6 shadow-[0px_2px_4px_-1px_rgba(175, 182, 201, 0.2)]" style={{ height: "201px" }}>
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] text-left">
                Company Structure
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Number of Employees</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${getEmployeeBadgeStyle(viewedAudience.employeeCount)}`}>
                    {viewedAudience.employeeCount}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Number of Clients</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.clientsNumber || "All"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Digital Presence & Demographics */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            
            {/* Widget 3: Digital Presence */}
            <div className="flex-grow flex-1 bg-white border border-[#E0E6EB] rounded-[12px] p-6 flex flex-col gap-6 shadow-[0px_2px_4px_-1px_rgba(175, 182, 201, 0.2)]" style={{ height: "141px" }}>
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] text-left">
                Digital Presence
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Social Media Linked</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${
                    (viewedAudience.socialMediaLinked || "No").toLowerCase() === "yes" 
                      ? "bg-[#EBFAF0] text-[#36C76C] rounded-full" 
                      : "bg-[#FFE5ED] text-[#FF6692] rounded-full"
                  }`}>
                    {viewedAudience.socialMediaLinked || "No"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Has WhatsApp API</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${
                    (viewedAudience.hasWhatsappApi || "No").toLowerCase() === "yes" 
                      ? "bg-[#EBFAF0] text-[#36C76C] rounded-full" 
                      : "bg-[#FFE5ED] text-[#FF6692] rounded-full"
                  }`}>
                    {viewedAudience.hasWhatsappApi || "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Widget 4: Demographics */}
            <div className="flex-grow flex-1 bg-white border border-[#E0E6EB] rounded-[12px] p-6 flex flex-col gap-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]" style={{ height: "141px" }}>
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] text-left">
                Demographics
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Age</span>
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${getAgeBadgeStyle(viewedAudience.age)}`}>
                    {viewedAudience.age}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Income</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.income || "All"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Row 3: Location & Engagement */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            
            {/* Widget 5: Location */}
            <div className="flex-grow flex-1 bg-white border border-[#E0E6EB] rounded-[12px] p-6 flex flex-col gap-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]" style={{ height: "191px" }}>
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] text-left">
                Location
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Region</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.region || "All"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">City</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.city || "All"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Province</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.province || "All"}</span>
                </div>
              </div>
            </div>

            {/* Widget 6: Engagement */}
            <div className="flex-grow flex-1 bg-white border border-[#E0E6EB] rounded-[12px] p-6 flex flex-col gap-6 shadow-[0px_2px_4px_-1px_rgba(175,182,201,0.2)]" style={{ height: "191px" }}>
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] text-left">
                Engagement
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 text-[#999999] font-normal">Subscribed From</span>
                  <span className="text-sm font-semibold text-[#29343D]">{viewedAudience.subscribedFrom || "All"}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* MODAL: Salons in Audience */}
        {showSalonsListModal && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[160] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setShowSalonsListModal(false)}
          >
            <div 
              className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[1000px] max-w-full flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
              style={{ height: "537px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex flex-row items-center justify-between w-full h-[25px] shrink-0">
                <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
                  Salons in {viewedAudience.name}
                </h3>
                <button 
                  type="button"
                  onClick={() => setShowSalonsListModal(false)} 
                  className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-650 transition-colors shrink-0"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Actions Bar */}
              <div className="flex justify-start shrink-0">
                <button
                  type="button"
                  onClick={handleAddSalon}
                  className="flex items-center justify-center bg-[#635BFF] hover:bg-[#4d42eb] text-white text-xs font-semibold rounded-lg h-9 w-[89px] transition-colors"
                >
                  Add Salon
                </button>
              </div>

              {/* Table Frame 1000003770 */}
              <div className="border border-[#E0E6EB] rounded-[12px] w-full h-[380px] overflow-hidden flex flex-col bg-white">
                {/* Table header */}
                <div className="flex w-full h-[52px] shrink-0 bg-[#F3F3FF] border-b border-[#E0E6EB] select-none">
                  <div className="w-[288px] flex items-center px-6 py-4 font-sans font-bold text-sm text-[#29343D] border-r border-[#E0E6EB]">
                    Salon Name
                  </div>
                  <div className="w-[288px] flex items-center px-6 py-4 font-sans font-bold text-sm text-[#29343D] border-r border-[#E0E6EB]">
                    Plan
                  </div>
                  <div className="w-[288px] flex items-center px-6 py-4 font-sans font-bold text-sm text-[#29343D] border-r border-[#E0E6EB]">
                    Last Active
                  </div>
                  <div className="w-[88px] flex items-center justify-center py-4 font-sans font-bold text-sm text-[#29343D]">
                    Actions
                  </div>
                </div>

                {/* Table Body scrollable area */}
                <div className="flex-grow overflow-y-auto custom-scrollbar">
                  {salonsInAudience.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic font-semibold py-8">
                      No salons matching this audience.
                    </div>
                  ) : (
                    salonsInAudience.map((salon, idx) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <div 
                          key={salon.id} 
                          className={`flex w-full h-[76px] shrink-0 border-b border-[#E0E6EB] hover:bg-slate-50/50 transition-colors ${
                            isEven ? "bg-white" : "bg-[#FAFAFA]"
                          }`}
                        >
                          {/* Salon Name Column */}
                          <div className="w-[288px] h-full flex items-center gap-3 px-6 py-3.5 border-r border-[#E0E6EB] overflow-hidden">
                            {renderModalSalonLogo(salon.name)}
                            <div className="flex flex-col justify-center overflow-hidden">
                              <span className="font-sans font-semibold text-xs text-[#29343D] truncate" title={salon.name}>
                                {salon.name}
                              </span>
                              <span className="font-sans font-normal text-[11px] text-[#29343D] mt-0.5 truncate">
                                {salon.manager} • {salon.city}
                              </span>
                              <span className="font-sans font-normal text-[11px] text-[#999999] truncate">
                                {salon.email}
                              </span>
                            </div>
                          </div>

                          {/* Plan Column */}
                          <div className="w-[288px] h-full flex items-center px-6 py-3.5 border-r border-[#E0E6EB]">
                            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-[8px] ${
                              salon.plan === "Premium" 
                                ? "bg-[#D2F4F2] text-[#29343D]" 
                                : salon.plan === "Enterprise" 
                                ? "bg-[#6C63FF] text-white" 
                                : "bg-slate-100 text-slate-700"
                            }`}>
                              {salon.plan}
                            </span>
                          </div>

                          {/* Last Active Column */}
                          <div className="w-[288px] h-full flex items-center px-6 py-3.5 border-r border-[#E0E6EB]">
                            <div className="flex items-center text-xs font-medium text-[#29343D]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#29343D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mr-1.5 opacity-80">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{salon.lastActive}</span>
                            </div>
                          </div>

                          {/* Actions Column */}
                          <div className="w-[88px] h-full flex items-center justify-center py-3.5">
                            <button
                              type="button"
                              onClick={() => setDeletingSalonId(salon.id)}
                              className="w-12 h-9 flex items-center justify-center bg-[#FFE5ED] hover:bg-[#ffd1de] text-[#FF6692] rounded-[8px] transition-colors"
                              title="Remove Salon"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODAL: Delete Salon Confirmation */}
        {deletingSalonId && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[170] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setDeletingSalonId(null)}
          >
            <div 
              className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[400px] flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-semibold text-[16px] leading-[22px] text-[#29343D]">
                  Are you sure you want to remove this salon from {viewedAudience.name}?
                </h3>
                <p className="font-sans font-normal text-xs text-[#6B7280]">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex flex-row justify-end items-center gap-2.5 w-full">
                <button 
                  type="button"
                  onClick={() => setDeletingSalonId(null)}
                  className="px-4 py-2 bg-[#EFF4FA] hover:bg-slate-200 text-xs font-semibold text-[#0A2540] rounded-[8px] h-[38px] transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    handleRemoveSalon(deletingSalonId);
                    setDeletingSalonId(null);
                  }}
                  className="px-4 py-2 bg-[#FFE5ED] hover:bg-[#ffd1de] text-xs font-semibold text-[#FF6692] rounded-[8px] h-[38px] transition-all"
                >
                  Remove Salon
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Add Salon */}
        {showAddSalonModal && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[170] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setShowAddSalonModal(false)}
          >
            <div 
              className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[450px] flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-visible animate-in zoom-in-95 duration-150"
              onClick={() => setIsAddSalonDropdownOpen(false)}
            >
              {/* Header */}
              <div className="flex flex-row items-center justify-between w-full h-[25px] shrink-0">
                <h3 className="font-sans font-bold text-[18px] leading-[25px] text-[#29343D]">
                  Add Salon
                </h3>
                <button 
                  type="button"
                  onClick={() => setShowAddSalonModal(false)} 
                  className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Form Input Container */}
              <div className="flex flex-col gap-1.5 w-full relative">
                <label className="text-xs font-semibold text-[#29343D]">Salon</label>
                
                {/* Custom Dropdown Trigger */}
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddSalonDropdownOpen(!isAddSalonDropdownOpen);
                    }}
                    className="w-full bg-white border border-[#E0E6EB] rounded-[8px] px-3.5 py-2.5 text-xs font-semibold text-left text-[#29343D] flex items-center justify-between cursor-pointer focus:border-[#635BFF] focus:outline-none transition-all h-[42px]"
                  >
                    {selectedSalonToAddId ? (
                      <span className="text-[#29343D]">
                        {AVAILABLE_SALONS.find((s) => s.id === selectedSalonToAddId)?.name}
                      </span>
                    ) : (
                      <span className="text-slate-450 font-normal">Select Salon</span>
                    )}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-slate-400 transition-transform duration-200 ${isAddSalonDropdownOpen ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Dropdown Options overlay */}
                  {isAddSalonDropdownOpen && (
                    <div 
                      className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E0E6EB] rounded-[8px] shadow-lg max-h-48 overflow-y-auto z-50 p-1.5 flex flex-col gap-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {AVAILABLE_SALONS.filter(
                        (avail) => !salonsInAudience.some((s) => s.name === avail.name)
                      ).length === 0 ? (
                        <div className="text-xs text-slate-400 italic p-3 text-center">
                          All salons are already in this audience
                        </div>
                      ) : (
                        AVAILABLE_SALONS.filter(
                          (avail) => !salonsInAudience.some((s) => s.name === avail.name)
                        ).map((avail) => (
                          <button
                            key={avail.id}
                            type="button"
                            onClick={() => {
                              setSelectedSalonToAddId(avail.id);
                              setIsAddSalonDropdownOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2.5 rounded-[6px] text-xs font-semibold transition-colors text-[#29343D] hover:bg-[#EFF4FA]"
                          >
                            {avail.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-row justify-end items-center w-full mt-2">
                <button 
                  type="button"
                  onClick={handleAddSalonConfirm}
                  disabled={!selectedSalonToAddId}
                  className={`px-5 py-2 text-xs font-semibold rounded-[8px] h-[38px] transition-all flex items-center justify-center ${
                    selectedSalonToAddId
                      ? "bg-[#635BFF] hover:bg-[#4d42eb] text-white cursor-pointer shadow-md"
                      : "bg-[#e2e8f0] text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Add Salon
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: Edit Audience */}
        {editingAudienceItem && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setEditingAudienceItem(null)}
          >
            <form 
              onSubmit={handleEditAudienceSubmit}
              className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[638px] max-w-full flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Block */}
              <div className="flex flex-row items-center justify-between w-full h-[30px] shrink-0 border-b border-slate-100 pb-3">
                <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
                  Edit Audience
                </h3>
                <button 
                  type="button"
                  onClick={() => setEditingAudienceItem(null)} 
                  className="w-6 h-6 flex items-center justify-center text-[#29343D] hover:opacity-80 transition-opacity shrink-0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Fields container */}
              <div className="flex flex-col gap-4 w-full">
                {/* Audience Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Name of Audience</label>
                  <input
                    type="text"
                    required
                    value={audNameInput}
                    onChange={(e) => setAudNameInput(e.target.value)}
                    placeholder="e.g. Audience 06"
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                  />
                </div>

                {/* Grid 2 Columns */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Recipient */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">Recipient</label>
                    <select
                      value={audRecipientInput}
                      onChange={(e) => setAudRecipientInput(e.target.value as any)}
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="All">All</option>
                      <option value="Owner">Owner</option>
                      <option value="Employee">Employee</option>
                      <option value="Accountants">Accountants</option>
                      <option value="Clients">Clients</option>
                    </select>
                  </div>

                  {/* Employees count */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">Number of Employees</label>
                    <select
                      value={audEmployeesInput}
                      onChange={(e) => setAudEmployeesInput(e.target.value as any)}
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="All">All</option>
                      <option value="Between a and b">Between a and b</option>
                    </select>
                  </div>
                </div>

                {/* Grid 2 Columns */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">Age</label>
                    <select
                      value={audAgeInput}
                      onChange={(e) => setAudAgeInput(e.target.value as any)}
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="All">All Ages</option>
                      <option value="Between a and b">Between a and b</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">Membership Status</label>
                    <select
                      value={audStatusInput}
                      onChange={(e) => setAudStatusInput(e.target.value as any)}
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Trial">Trial</option>
                    </select>
                  </div>
                </div>

                {/* Grid 3 Columns */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Region */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">Region</label>
                    <input
                      type="text"
                      value={audRegionInput}
                      onChange={(e) => setAudRegionInput(e.target.value)}
                      placeholder="Region 01"
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">City</label>
                    <input
                      type="text"
                      value={audCityInput}
                      onChange={(e) => setAudCityInput(e.target.value)}
                      placeholder="City 01"
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Province */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#29343D]">Province</label>
                    <input
                      type="text"
                      value={audProvinceInput}
                      onChange={(e) => setAudProvinceInput(e.target.value)}
                      placeholder="Province 01"
                      className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex flex-row justify-end items-center gap-2.5 w-full mt-2 border-t border-slate-100 pt-3">
                <button 
                  type="button"
                  onClick={() => setEditingAudienceItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#635BFF] hover:bg-[#4d42eb] text-white text-sm font-semibold rounded-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Render original full ticket list dashboard
  return (
    <div className="flex flex-col gap-6 w-full text-left relative font-sans">
      
      {/* Invisible backdrop to dismiss dropdowns */}
      {(activeDropdown || activeAudienceMenuId) && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => {
            setActiveDropdown(null);
            setActiveAudienceMenuId(null);
          }} 
        />
      )}

      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-bold text-[#29343D] bg-white pointer-events-auto animate-in slide-in-from-right duration-250 ${
              toast.type === "success"
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

      {/* Main Top Header Section */}
      <div 
        className="bg-white rounded-xl flex flex-col md:flex-row md:items-center justify-between w-full px-6 py-4 gap-4"
        style={{
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          border: "1px solid #E0E6EB"
        }}
      >
        <div>
          <h1 className="font-bold text-[#29343D] text-[16px] leading-[22px]">
            Support & Communications
          </h1>
          <p className="text-[11px] text-[#98A4AE] mt-0.5 font-semibold">
            Manage customer tickets, publish global announcements, and define message audiences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Refresh Data button */}
          <button
            onClick={handleRefreshData}
            disabled={refreshing}
            className={`flex items-center justify-center px-4 py-2.5 bg-[#EFF4FA] hover:bg-slate-200 text-xs font-semibold text-[#0A2540] rounded-lg transition-all ${
              refreshing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ height: "44px" }}
          >
            <RefreshIcon />
            <span className="ml-2.5">{refreshing ? "Syncing..." : "Refresh Data"}</span>
          </button>

          {/* New Announcement button */}
          <button
            onClick={() => {
              setEditingAnnouncementId(null);
              setComposeStep(1);
              setAnnTitle("");
              setAnnAudience("");
              setAnnChannel("");
              setAnnMessage("");
              setAnnType("");
              setAnnCategory("");
              setAnnScheduleTime("");
              setAnnCtaEnabled(false);
              setAnnCtaTitle("");
              setAnnSignature("");
              setAnnDisclaimer("");
              setAnnDate("");
              setAnnTime("");
              setAnnFileName("");
              setShowAnnouncementModal(true);
            }}
            className="flex items-center justify-center px-4 py-2.5 bg-[#635BFF] hover:bg-[#4d42eb] text-xs font-semibold text-white rounded-lg transition-all shadow-md"
            style={{ height: "44px" }}
          >
            <PlusIcon />
            <span className="ml-2.5">New Announcement</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        
        {/* Metric 1: Total */}
        <div 
          className="rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(99, 91, 255, 0.12) 0%, rgba(99, 91, 255, 0.03) 100%)",
            borderColor: "rgba(99, 91, 255, 0.20)",
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.1)"
          }}
          onClick={() => {
            setPriorityFilter("All Priority");
            setCategoryFilter("All Categories");
            triggerToast("Showing all support tickets", "info");
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#635BFF] uppercase tracking-wide">Total Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
              <TicketIcon />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2 text-left">
            <span className="text-3xl font-extrabold text-[#29343D]">{totalCount}</span>
            <span className="text-[10px] font-bold text-slate-400">across all salons</span>
          </div>
        </div>

        {/* Metric 2: Open */}
        <div 
          className="rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(255, 102, 146, 0.12) 0%, rgba(255, 102, 146, 0.03) 100%)",
            borderColor: "rgba(255, 102, 146, 0.20)",
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.1)"
          }}
          onClick={() => {
            triggerToast("Filtered to Open tickets", "info");
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#FF6692] uppercase tracking-wide">Open Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF6692]/10 text-[#FF6692] flex items-center justify-center">
              <span className="font-extrabold text-sm">!</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2 text-left">
            <span className="text-3xl font-extrabold text-[#29343D]">{openCount}</span>
            <span className="text-[10px] font-bold text-[#FF6692]">requires response</span>
          </div>
        </div>

        {/* Metric 3: Waiting */}
        <div 
          className="rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(248, 194, 10, 0.12) 0%, rgba(248, 194, 10, 0.03) 100%)",
            borderColor: "rgba(248, 194, 10, 0.20)",
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.1)"
          }}
          onClick={() => {
            triggerToast("Filtered to Waiting tickets", "info");
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wide">Waiting Customer</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF9E5] text-[#d97706] flex items-center justify-center">
              <span className="font-extrabold text-sm">?</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2 text-left">
            <span className="text-3xl font-extrabold text-[#29343D]">{waitingCount}</span>
            <span className="text-[10px] font-bold text-amber-600">awaiting feedback</span>
          </div>
        </div>

        {/* Metric 4: Closed */}
        <div 
          className="rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(54, 199, 108, 0.12) 0%, rgba(54, 199, 108, 0.03) 100%)",
            borderColor: "rgba(54, 199, 108, 0.20)",
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.1)"
          }}
          onClick={() => {
            triggerToast("Filtered to Closed tickets", "info");
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#36C76C] uppercase tracking-wide">Closed Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-[#EBFAF0] text-[#36C76C] flex items-center justify-center">
              <CheckIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2 text-left">
            <span className="text-3xl font-extrabold text-[#29343D]">{closedCount}</span>
            <span className="text-[10px] font-bold text-[#36C76C]">resolved tickets</span>
          </div>
        </div>

      </div>

      {/* Tabs Navigation Card */}
      <div 
        className="bg-white rounded-xl w-full flex flex-col"
        style={{
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          border: "1px solid #E0E6EB"
        }}
      >
        {/* Tab selection bar */}
        <div className="flex border-b border-[#E0E6EB] px-6 select-none bg-slate-50/50 justify-between items-center w-full rounded-t-xl">
          <div className="flex">
            {[
              { id: "tickets", label: "Support Tickets", icon: <TicketIcon /> },
              { id: "announcements", label: "Announcements", icon: <MegaphoneIcon /> },
              { id: "audiences", label: "Audiences", icon: <UserGroupIcon /> }
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`flex items-center gap-2.5 py-4 px-4 text-xs font-bold transition-all relative border-b-2 -mb-[1px] ${
                    isActive
                      ? "border-[#635BFF] text-[#635BFF]"
                      : "border-transparent text-[#98A4AE] hover:text-[#29343D]"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {currentTab === "audiences" && (
            <button
              onClick={handleNewAudienceClick}
              className="flex items-center justify-center px-4 py-2 bg-[#DDDBFF] hover:bg-[#c6c3fe] text-xs font-bold text-[#635BFF] rounded-lg transition-all"
              style={{ height: "44px", width: "126px" }}
            >
              <span>New Audience</span>
            </button>
          )}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6">
          
          {/* TAB 1: Support Tickets */}
          {currentTab === "tickets" && (
            <div className="flex flex-col gap-6">
              
              {/* Table Filters Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-4 flex-wrap">
                  {renderCustomDropdown("Priority", "priority", priorityFilter, priorityOptions, setPriorityFilter)}
                  {renderCustomDropdown("Category", "category", categoryFilter, categoryOptions, setCategoryFilter)}
                  
                  {/* Reset button */}
                  {(priorityFilter !== "All Priority" || categoryFilter !== "All Categories") && (
                    <button
                      onClick={handleResetFilters}
                      className="mt-5 text-xs font-bold text-[#635BFF] hover:text-[#4d42eb] transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
                
                <div className="text-right text-[11px] text-slate-400 font-semibold mt-auto">
                  Showing {filteredTickets.length} of {tickets.length} tickets
                </div>
              </div>

              {/* Tickets Data Table */}
              <div className="border border-[#E0E6EB] rounded-xl overflow-hidden w-full bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#E0E6EB] text-slate-500 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Order / Issue</th>
                      <th className="px-6 py-4">Salon</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Assign To</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E6EB] text-slate-700 font-semibold">
                    {filteredTickets.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-6 py-16 text-center text-slate-400 text-xs font-semibold">
                          No support tickets match the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredTickets.map((t, idx) => (
                        <tr 
                          key={t.id} 
                          className={`hover:bg-slate-50/70 transition-colors ${
                            idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"
                          }`}
                        >
                          {/* ID */}
                          <td className="px-6 py-4 text-[#98A4AE] font-mono font-bold">{t.id}</td>

                          {/* Order/Title */}
                          <td className="px-6 py-4 text-[#29343D] font-bold max-w-[240px] truncate" title={t.order}>
                            {t.order}
                          </td>

                          {/* Salon Logo and Name */}
                          <td className="px-6 py-4 text-slate-800 font-bold">
                            <div className="flex items-center gap-2.5">
                              {renderSalonLogo(t.salonName)}
                              <span className="truncate">{t.salonName}</span>
                            </div>
                          </td>

                          {/* Priority badge */}
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${getPriorityStyle(t.priority)}`}>
                              {t.priority}
                            </span>
                          </td>

                          {/* Status badge */}
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${getStatusStyle(t.status)}`}>
                              {t.status}
                            </span>
                          </td>

                          {/* Category badge */}
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${getCategoryStyle(t.category)}`}>
                              {t.category}
                            </span>
                          </td>

                          {/* Assign to */}
                          <td className="px-6 py-4 text-slate-500 font-semibold">{t.assignTo}</td>

                          {/* Date */}
                          <td className="px-6 py-4 text-[#98A4AE] font-semibold">{t.date}</td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {/* View button */}
                              <button
                                onClick={() => setActiveTicket(t)}
                                className="p-2 bg-[#F1F2FE] text-[#635BFF] hover:bg-[#e0e2fe] rounded-lg transition-colors inline-flex"
                                title="View Ticket Details"
                              >
                                <EyeIcon />
                              </button>
                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteTicket(t.id)}
                                className="p-2 bg-[#FFE5ED] text-[#FF6692] hover:bg-[#ffd1de] rounded-lg transition-colors inline-flex"
                                title="Delete Ticket"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Announcements */}
          {currentTab === "announcements" && (
            <div className="flex flex-col gap-6 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Broadcast Campaigns</h3>
                  <p className="text-[11px] text-[#98A4AE] mt-0.5">System-wide notifications currently displayed to platform customers.</p>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                  {announcements.length} Published
                </span>
              </div>

              <div className="border border-[#E0E6EB] rounded-xl overflow-hidden w-full bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D] font-bold h-[52px]">
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Recent Announcements</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Type</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Category</th>
                      <th className="px-6 py-4 text-center font-bold text-[16px] text-[#29343D]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E6EB] text-slate-700 font-semibold">
                    {announcements.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-16 text-center text-slate-400 text-xs font-semibold">
                          No active announcements. Click "+ New Announcement" above to publish.
                        </td>
                      </tr>
                    ) : (
                      announcements.map((a, idx) => (
                        <tr 
                          key={a.id} 
                          className={`hover:bg-slate-50/70 transition-colors ${
                            idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"
                          }`}
                        >
                          {/* Announcement details */}
                          <td className="px-6 py-5 max-w-[500px]">
                            <div className="flex flex-col gap-1 items-start text-left">
                              <span className="font-bold text-[#29343D] text-sm leading-snug">
                                {a.title}
                              </span>
                              <span className="text-xs text-[#98A4AE] mt-1 leading-relaxed">
                                {a.message}
                              </span>
                              <div className="flex flex-wrap gap-2 mt-3 select-none">
                                <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#DDDBFF] text-[#635BFF]">
                                  Audience: {a.audience}
                                </span>
                                <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#FFE5ED] text-[#FF6692]">
                                  Channel: {a.channel}
                                </span>
                                <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#ECFDFD] text-[#16CDC7]">
                                  Sent: {a.sentCount !== undefined ? a.sentCount : 0}
                                </span>
                                <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#EBFAF0] text-[#36C76C]">
                                  Opened: {a.openedCount !== undefined ? a.openedCount : 0}
                                </span>
                                <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#FFF9E5] text-[#FFD648]">
                                  Sent: {a.timeAgo || a.date}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getAnnTypeStyle(a.type)}`}>
                              {a.type || "Alert"}
                            </span>
                          </td>

                          {/* Category (status) */}
                          <td className="px-6 py-5 whitespace-nowrap">
                            {a.status === "Scheduled" ? (
                              <div className="flex flex-col items-start gap-1">
                                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#FFF9E5] text-[#FFD648]">
                                  Scheduled
                                </span>
                                <span className="text-[11px] text-[#98A4AE] font-semibold">
                                  {a.scheduleTime || "08/19/2025 08:00"}
                                </span>
                              </div>
                            ) : a.status === "Draft" ? (
                              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#FFE5ED] text-[#FF6692]">
                                Draft
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#EBFAF0] text-[#36C76C]">
                                Sent
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-5 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-2">
                              {/* View / Preview button */}
                              <button
                                onClick={() => setPreviewingAnnouncement(a)}
                                className="p-2 bg-[#F1F2FE] text-[#635BFF] hover:bg-[#e0e2fe] rounded-lg transition-colors inline-flex"
                                title="Preview Announcement"
                              >
                                <EyeIcon />
                              </button>
                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteAnnouncement(a.id)}
                                className="p-2 bg-[#FFE5ED] text-[#FF6692] hover:bg-[#ffd1de] rounded-lg transition-colors inline-flex"
                                title="Remove Announcement"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Audiences */}
          {currentTab === "audiences" && (
            <div className="flex flex-col gap-6 text-left w-full">
              {/* Dropdown Filters Bar */}
              <div className="flex flex-wrap items-end gap-3 w-full border-b border-slate-100 pb-5 select-none">
                {renderAudienceFilterDropdown("Recipient", "recipientFilter", recipientFilter, ["All Recipient", "Owner", "Employee", "Accountants", "Clients"], setRecipientFilter)}
                {renderAudienceFilterDropdown("Number of employees", "employeesFilter", employeesFilter, ["All", "Between a and b"], setEmployeesFilter)}
                {renderAudienceFilterDropdown("Age", "ageFilter", ageFilter, ["All Ages", "Between a and b"], setAgeFilter)}
                {renderAudienceFilterDropdown("Region", "regionFilter", regionFilter, ["All Regions", "Region 01", "Region 02", "Region 03", "Region 04", "Region 05"], setRegionFilter)}
                {renderAudienceFilterDropdown("City", "cityFilter", cityFilter, ["All Cities", "City 01", "City 02", "City 03", "City 04", "City 05"], setCityFilter)}
                {renderAudienceFilterDropdown("Province", "provinceFilter", provinceFilter, ["All Provinces", "Province 01", "Province 02", "Province 03", "Province 04", "Province 05"], setProvinceFilter)}

                {/* Reset filters button opens Advanced Filters Modal */}
                <button
                  onClick={() => setShowAdvancedFiltersModal(true)}
                  className="w-9 h-9 border border-[#E0E6EB] hover:bg-slate-50 text-[#526B7A] rounded-lg flex items-center justify-center shrink-0 mb-[1px]"
                  title="Advanced Filters"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
              </div>

              {/* Data Table */}
              <div className="border border-[#E0E6EB] rounded-xl overflow-hidden w-full bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB] text-[#29343D] font-bold h-[52px]">
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Name of Audience</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Recipient</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Number of employees</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Age</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Membership status</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">Region</th>
                      <th className="px-6 py-4 font-bold text-[16px] text-[#29343D]">City</th>
                      <th className="px-6 py-4 text-center font-bold text-[16px] text-[#29343D]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E6EB] text-[#29343D] font-semibold">
                    {(() => {
                      const filtered = audiences.filter((aud) => {
                        if (recipientFilter !== "All Recipient" && aud.recipient !== recipientFilter) return false;
                        if (employeesFilter !== "All" && aud.employeeCount !== employeesFilter) return false;
                        if (ageFilter !== "All Ages" && aud.age !== ageFilter) return false;
                        if (regionFilter !== "All Regions" && aud.region !== regionFilter) return false;
                        if (cityFilter !== "All Cities" && aud.city !== cityFilter) return false;
                        if (provinceFilter !== "All Provinces" && aud.province !== provinceFilter) return false;

                        // Advanced filters
                        if (socialMediaFilter !== "All" && aud.socialMediaLinked !== socialMediaFilter) return false;
                        if (whatsappApiFilter !== "All" && aud.hasWhatsappApi !== whatsappApiFilter) return false;
                        if (membershipTypeFilter !== "All" && aud.membershipType !== membershipTypeFilter) return false;
                        if (membershipStatusFilter !== "All" && aud.status !== membershipStatusFilter) return false;
                        if (subscribedFromFilter !== "All" && aud.subscribedFrom !== subscribedFromFilter) return false;
                        if (clientsNumberFilter !== "All" && aud.clientsNumber !== clientsNumberFilter) return false;
                        if (incomeFilter !== "All" && aud.income !== incomeFilter) return false;

                        return true;
                      });

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={8} className="px-6 py-16 text-center text-slate-400 text-xs font-semibold">
                              No audiences match the selected filters.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((aud, idx) => (
                        <tr 
                          key={aud.id} 
                          className={`hover:bg-slate-50/70 transition-colors ${
                            idx % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"
                          }`}
                        >
                          <td className="px-6 py-4 text-[#29343D] font-bold">
                            {aud.name}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${getRecipientBadgeStyle(aud.recipient)}`}>
                              {aud.recipient}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${getEmployeeBadgeStyle(aud.employeeCount)}`}>
                              {aud.employeeCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${getAgeBadgeStyle(aud.age)}`}>
                              {aud.age}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${getMembershipBadgeStyle(aud.status)}`}>
                              {aud.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">
                            {aud.region}
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">
                            {aud.city}
                          </td>
                          <td className="px-6 py-4 text-center relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveAudienceMenuId(activeAudienceMenuId === aud.id ? null : aud.id);
                              }}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors inline-flex"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </button>

                            {activeAudienceMenuId === aud.id && (
                              <div 
                                className="absolute right-6 top-10 w-36 bg-white border border-[#E0E6EB] rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-0.5 origin-top-right text-left"
                                style={{ boxShadow: "0px 16px 32px -8px rgba(12, 12, 13, 0.4)" }}
                              >
                                <button
                                  onClick={() => {
                                    setViewedAudience(aud);
                                    setActiveAudienceMenuId(null);
                                  }}
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                                >
                                  <EyeIcon />
                                  <span>View Details</span>
                                </button>
                                <button
                                  onClick={() => {
                                    handleEditAudienceClick(aud);
                                    setActiveAudienceMenuId(null);
                                  }}
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#29343D] hover:bg-[#EFF4FA] transition-colors"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                  </svg>
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setDeletingAudienceItem(aud);
                                    setActiveAudienceMenuId(null);
                                  }}
                                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#FF6692] hover:bg-[#FFE5ED]/50 transition-colors"
                                >
                                  <TrashIcon />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: Compose Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div 
            className={`bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[638px] max-w-full flex flex-col text-left border border-[#E0E6EB] animate-in zoom-in-95 duration-150 ${
              !editingAnnouncementId && composeStep === 1 
                ? "h-auto max-h-[90vh]" 
                : "h-[90vh] max-h-[1112px]"
            }`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 flex items-center justify-between bg-white h-[59px] shrink-0">
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
                {editingAnnouncementId ? "Edit Announcement" : "Create New Announcement"}
              </h3>
              <button 
                type="button"
                onClick={() => setShowAnnouncementModal(false)}
                className="w-6 h-6 flex items-center justify-center text-[#29343D] hover:opacity-80 transition-opacity shrink-0"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#29343D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Stepper (Only when composing/creating) */}
            {!editingAnnouncementId && (
              <div className="shrink-0 bg-white">
                <div className="flex items-center justify-center w-full py-4 select-none">
                  <div className="flex items-center justify-center relative w-[240px]">
                    {/* Background Line */}
                    <div className="absolute top-[16px] left-8 right-8 h-[2px] bg-[#E2E8F0]" />
                    
                    <div className="flex justify-between w-full relative z-10">
                      {/* Step 1: Audience */}
                      <div className="flex flex-col items-center gap-1 bg-white px-2">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            composeStep === 1 
                              ? "bg-[#635BFF] text-white" 
                              : "bg-[#475569] text-white"
                          }`}
                        >
                          {composeStep === 1 ? "1" : <CheckIcon className="w-4 h-4 text-white" />}
                        </div>
                        <span className={`text-[12px] font-semibold font-sans ${composeStep === 1 ? "text-[#635BFF]" : "text-[#98A4AE]"}`}>
                          Audience
                        </span>
                      </div>

                      {/* Step 2: Announcement */}
                      <div className="flex flex-col items-center gap-1 bg-white px-2">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            composeStep === 2 
                              ? "bg-[#635BFF] text-white" 
                              : "bg-[#EFF2F5] text-[#98A4AE]"
                          }`}
                        >
                          2
                        </div>
                        <span className={`text-[12px] font-semibold font-sans ${composeStep === 2 ? "text-[#635BFF]" : "text-[#98A4AE]"}`}>
                          Announcement
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Body Content */}
            {!editingAnnouncementId && composeStep === 1 ? (
              /* Step 1 Content */
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                    Announcement
                  </label>
                  <div className="relative">
                    <select
                      value={annAudience}
                      onChange={(e) => setAnnAudience(e.target.value)}
                      className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[42px]"
                    >
                      <option value="">Select Audience</option>
                      <option value="All Salons">All Salons</option>
                      <option value="Active Salons">Active Salons</option>
                      <option value="Premium & Enterprise Plan">Premium & Enterprise Plan</option>
                      <option value="VIP Salons">VIP Salons</option>
                      <option value="Leads & Trials">Leads & Trials</option>
                      <option value="Clients">Clients</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#98A4AE]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="#98A4AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="flex flex-row justify-between items-center w-full mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newAud = prompt("Enter new audience name:");
                      if (newAud) {
                        setAnnAudience(newAud);
                        triggerToast(`Audience "${newAud}" selected!`, "success");
                      }
                    }}
                    className="px-4 py-2 bg-[#F1F2FE] hover:bg-[#e4e2fe] text-[#635BFF] text-xs font-semibold rounded-[8px] transition-colors h-[36px]"
                  >
                    Create New Audience
                  </button>
                  <button
                    type="button"
                    disabled={!annAudience}
                    onClick={() => setComposeStep(2)}
                    className="px-5 py-2 bg-[#635BFF] hover:bg-[#4d42eb] disabled:bg-[#635BFF]/50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-[8px] transition-colors h-[36px]"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2 Form Content / Edit Form Content */
              <form onSubmit={handleAnnouncementSubmit} className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Fields container */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                  
                  {/* Title */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      placeholder="Enter Title"
                      className="w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 w-full">
                    <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                      Content
                    </span>
                    <textarea
                      required
                      value={annMessage}
                      onChange={(e) => setAnnMessage(e.target.value)}
                      placeholder="Enter text content..."
                      className="w-full h-[125px] border border-[#E0E6EB] rounded-[4px] p-4 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Type and Category Selection */}
                  <div className="grid grid-cols-2 gap-6 w-full">
                    
                    {/* Type */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Type
                      </label>
                      <div className="relative">
                        <select
                          value={annType}
                          onChange={(e) => setAnnType(e.target.value as any)}
                          className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[42px]"
                        >
                          <option value="">Select Type</option>
                          <option value="Alert">Alert</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="New Feature">New Feature</option>
                          <option value="Update">Update</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#98A4AE]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#98A4AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Category / Status */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={annCategory}
                          onChange={(e) => setAnnCategory(e.target.value as any)}
                          className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[42px]"
                        >
                          <option value="">Select Category</option>
                          <option value="Sent">Sent</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Draft">Draft</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#98A4AE]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#98A4AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Call To Action Button Title */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row items-center justify-between w-full h-[20px]">
                      <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Call To Action Button Title
                      </span>
                      <button
                        type="button"
                        onClick={() => setAnnCtaEnabled(!annCtaEnabled)}
                        className="relative w-9 h-5 rounded-[4px] transition-colors focus:outline-none shrink-0"
                        style={{ backgroundColor: annCtaEnabled ? "#DDDBFF" : "#EFF2F5" }}
                      >
                        <span
                          className="absolute top-0.5 w-4 h-4 rounded-[6px] bg-[#635BFF] shadow-[0px_0px_2px_rgba(145,158,171,0.2)] transition-all"
                          style={{ left: annCtaEnabled ? "18px" : "2px" }}
                        />
                      </button>
                    </div>
                    <input
                      type="text"
                      disabled={!annCtaEnabled}
                      value={annCtaTitle}
                      onChange={(e) => setAnnCtaTitle(e.target.value)}
                      placeholder="Enter CTA title"
                      className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 h-[42px] text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all disabled:opacity-50 disabled:bg-slate-50"
                    />
                  </div>

                  {/* Signature and Disclaimer */}
                  <div className="grid grid-cols-2 gap-6 w-full">
                    
                    {/* Signature */}
                    <div className="flex flex-col gap-2 w-full">
                      <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Signature
                      </span>
                      <input
                        type="text"
                        value={annSignature}
                        onChange={(e) => setAnnSignature(e.target.value)}
                        placeholder="Enter signature"
                        className="w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Disclaimer */}
                    <div className="flex flex-col gap-2 w-full">
                      <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Disclaimer
                      </span>
                      <input
                        type="text"
                        value={annDisclaimer}
                        onChange={(e) => setAnnDisclaimer(e.target.value)}
                        placeholder="Enter disclaimer"
                        className="w-full h-[42px] bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                      />
                    </div>

                  </div>

                  {/* Delivery Channels */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                      Delivery Channels
                    </label>
                    <div className="relative">
                      <select
                        value={annChannel}
                        onChange={(e) => setAnnChannel(e.target.value)}
                        className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[42px]"
                      >
                        <option value="">Select Channel</option>
                        <option value="Email & Dashboard">Email & Dashboard</option>
                        <option value="Email Only">Email Only</option>
                        <option value="WhatsApp & Email">WhatsApp & Email</option>
                        <option value="Dashboard Only">Dashboard Only</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#98A4AE]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="#98A4AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="grid grid-cols-2 gap-6 w-full">
                    
                    {/* Date */}
                    <div className="flex flex-col gap-2 w-full">
                      <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Date
                      </span>
                      <div className="relative w-full h-[42px]">
                        <input
                          type="text"
                          value={annDate}
                          onChange={(e) => setAnnDate(e.target.value)}
                          placeholder="mm/dd/yyyy"
                          className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 pr-10 h-[42px] text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#1C274C]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V8.5C3 6.29086 4.79086 4.5 7 4.5H17C19.2091 4.5 21 6.29086 21 8.5Z" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex flex-col gap-2 w-full">
                      <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D]">
                        Time
                      </span>
                      <div className="relative w-full h-[42px]">
                        <input
                          type="text"
                          value={annTime}
                          onChange={(e) => setAnnTime(e.target.value)}
                          placeholder="HH:MM"
                          className="w-full bg-white border border-[#E0E6EB] rounded-[4px] px-3 pr-10 h-[42px] text-sm font-normal text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#1C274C]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1C274C" strokeWidth="1.5"/>
                            <path d="M12 6V12L16 14" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* File Upload zone */}
                  <div 
                    onClick={() => {
                      const fakeName = prompt("Enter file name to upload:", "announcement_banner.png");
                      if (fakeName) setAnnFileName(fakeName);
                    }}
                    className="w-full h-[127px] bg-white border border-dashed border-[#635BFF] rounded-[12px] flex flex-col items-center justify-center p-4 gap-2 cursor-pointer hover:bg-[#F1F2FE]/30 transition-all shrink-0 select-none"
                  >
                    <div className="w-[48px] h-[48px] bg-[#F1F2FE] border border-[#DDDBFF] rounded-[12px] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 15V16C3 18.2091 4.79086 21 7 21H17C19.2091 21 21 18.2091 21 16V15" stroke="#635BFF" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#635BFF]">
                      {annFileName || "Drop here or click to browse"}
                    </span>
                  </div>

                </div>

                {/* Modal Footer (Fixed at the bottom) */}
                <div className="px-6 py-4 flex items-center justify-end bg-white h-[68px] shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmittingAnnouncement}
                    className="w-[150px] h-[36px] bg-[#635BFF] hover:bg-[#4d42eb] disabled:bg-[#635BFF]/50 disabled:cursor-not-allowed text-[#FFFFFF] font-sans font-medium text-[12px] leading-[16px] rounded-[8px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    {isSubmittingAnnouncement ? "Saving..." : editingAnnouncementId ? "Save Changes" : "Create Announcement"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Preview Announcement Details */}
      {previewingAnnouncement && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPreviewingAnnouncement(null)}
        >
          <div 
            className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[638px] max-w-full h-[409px] flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block */}
            <div className="flex flex-row items-center justify-between w-full h-[59px] shrink-0">
              <div className="flex flex-col items-start gap-2.5 flex-grow">
                <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D] truncate max-w-[500px]" title={previewingAnnouncement.title}>
                  {previewingAnnouncement.title}
                </h3>
                <div className="flex flex-row items-center gap-2 h-[24px]">
                  {(() => {
                    const type = previewingAnnouncement.type || "Alert";
                    let typeStyle = "bg-[#FFE5ED] text-[#FF6692]";
                    if (type === "Maintenance") typeStyle = "bg-[#FFF9E5] text-[#FFD648]";
                    else if (type === "New Feature") typeStyle = "bg-[#ECFDFD] text-[#16CDC7]";
                    else if (type === "Update") typeStyle = "bg-[#E8E5FF] text-[#635BFF]";
                    
                    return (
                      <div className={`flex flex-row items-center px-2.5 py-1 gap-2.5 h-[24px] rounded-full ${typeStyle} font-sans font-medium text-[12px] leading-[16px] shrink-0`}>
                        {type}
                      </div>
                    );
                  })()}

                  {(() => {
                    const status = previewingAnnouncement.status || "Sent";
                    let statusStyle = "bg-[#EBFAF0] text-[#36C76C]";
                    if (status === "Scheduled") statusStyle = "bg-[#FFF9E5] text-[#FFD648]";
                    else if (status === "Draft") statusStyle = "bg-[#FFE5ED] text-[#FF6692]";
                    
                    return (
                      <div className={`flex flex-row justify-center items-center px-2 py-0.5 gap-2 h-[22px] rounded-[6px] ${statusStyle} font-sans font-semibold text-[13px] leading-[18px] shrink-0`}>
                        {status}
                      </div>
                    );
                  })()}
                </div>
              </div>
              <button 
                onClick={() => setPreviewingAnnouncement(null)} 
                className="w-6 h-6 flex items-center justify-center text-[#29343D] hover:opacity-80 transition-opacity shrink-0"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#29343D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Content Message */}
            <div className="flex flex-col items-start gap-2 w-full h-[87px] shrink-0">
              <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D] h-[19px]">
                Content
              </span>
              <p className="w-full h-[60px] font-sans font-normal text-[14px] leading-[20px] text-[#98A4AE] select-text overflow-y-auto break-words whitespace-pre-wrap">
                {previewingAnnouncement.message}
              </p>
            </div>

            {/* Times Frame */}
            <div className="flex flex-row items-start gap-6 w-full h-[47px] shrink-0">
              <div className="flex flex-col items-start gap-2 w-[283px] flex-grow h-[47px]">
                <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D] h-[19px]">
                  From When
                </span>
                <span className="font-sans font-normal text-[14px] leading-[20px] text-[#98A4AE] h-[20px]">
                  {previewingAnnouncement.status === "Scheduled" ? previewingAnnouncement.scheduleTime || "08/19/2025 12:00" : "08/19/2025 12:00"}
                </span>
              </div>
              <div className="flex flex-col items-start gap-2 w-[283px] flex-grow h-[47px]">
                <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#29343D] h-[19px]">
                  To When
                </span>
                <span className="font-sans font-normal text-[14px] leading-[20px] text-[#98A4AE] h-[20px]">
                  08/20/2025 12:00
                </span>
              </div>
            </div>

            {/* Pill Badges Row */}
            <div className="flex flex-row items-center gap-2 w-full h-[36px] shrink-0 overflow-x-hidden">
              <div className="flex flex-row justify-center items-center px-3.5 h-[36px] bg-[#DDDBFF] rounded-full text-[#635BFF] font-sans font-medium text-[12px] leading-[16px] text-center shrink-0">
                Audience: {previewingAnnouncement.audience}
              </div>
              <div className="flex flex-row justify-center items-center px-3.5 h-[36px] bg-[#FFE5ED] rounded-full text-[#FF6692] font-sans font-medium text-[12px] leading-[16px] text-center shrink-0">
                Channel: {previewingAnnouncement.channel}
              </div>
              <div className="flex flex-row justify-center items-center px-3.5 h-[36px] bg-[#ECFDFD] rounded-full text-[#16CDC7] font-sans font-medium text-[12px] leading-[16px] text-center shrink-0">
                Sent: {previewingAnnouncement.sentCount !== undefined ? previewingAnnouncement.sentCount : 0}
              </div>
              <div className="flex flex-row justify-center items-center px-3.5 h-[36px] bg-[#EBFAF0] rounded-full text-[#36C76C] font-sans font-medium text-[12px] leading-[16px] text-center shrink-0">
                Opened: {previewingAnnouncement.openedCount !== undefined ? previewingAnnouncement.openedCount : 0}
              </div>
              <div className="flex flex-row justify-center items-center px-3.5 h-[36px] bg-[#FFF9E5] rounded-full text-[#FFD648] font-sans font-medium text-[12px] leading-[16px] text-center shrink-0">
                Sent: {previewingAnnouncement.timeAgo || previewingAnnouncement.date}
              </div>
            </div>

            {/* Footer Details Action */}
            <div className="flex flex-row justify-end items-center gap-6 w-full h-[36px] shrink-0">
              <button 
                onClick={() => handleStartEditAnnouncement(previewingAnnouncement)}
                className="w-[55px] h-[36px] bg-[#635BFF] hover:bg-[#4d42eb] text-[#FFFFFF] font-sans font-medium text-[12px] leading-[16px] rounded-[8px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                Edit
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: Delete Ticket Confirmation */}
      {deletingTicketId && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[160] flex items-center justify-center p-4"
          onClick={() => setDeletingTicketId(null)}
        >
          <div 
            className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-full max-w-[480px] p-6 flex flex-col gap-6 text-left border border-[#E0E6EB] relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Title */}
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-bold text-[18px] leading-[25px] text-[#29343D]">
                Are you sure you want to delete this ticket?
              </h3>
              <button 
                onClick={() => setDeletingTicketId(null)} 
                className="text-slate-400 hover:text-slate-650 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Description */}
            <p className="font-sans font-medium text-[14px] leading-5 text-[#98A4AE]">
              This action cannot be undone.
            </p>

            {/* Actions Buttons */}
            <div className="flex flex-row justify-end items-center gap-3 mt-2">
              <button 
                type="button" 
                onClick={() => setDeletingTicketId(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                style={{ height: "38px" }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={confirmDeleteTicket}
                className="px-5 py-2.5 bg-[#FFE5ED] text-[#FF6692] hover:bg-[#ffd1de] text-xs font-bold rounded-lg transition-colors animate-pulse-once"
                style={{ height: "38px" }}
              >
                Delete Ticket
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: Delete Announcement Confirmation */}
      {deletingAnnouncementId && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[160] flex items-center justify-center p-4"
          onClick={() => setDeletingAnnouncementId(null)}
        >
          <div 
            className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-full max-w-[480px] p-6 flex flex-col gap-6 text-left border border-[#E0E6EB] relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
              Are you sure you want to delete this announcement?
            </h3>

            {/* Description */}
            <p className="font-sans font-normal text-[14px] leading-5 text-[#98A4AE]">
              This action cannot be undone.
            </p>

            {/* Actions Buttons */}
            <div className="flex flex-row justify-end items-center gap-3 mt-2">
              <button 
                type="button" 
                onClick={() => setDeletingAnnouncementId(null)}
                className="px-5 py-2 bg-[#EFF4FA] hover:bg-slate-200 text-[#0A2540] text-xs font-bold rounded-[8px] transition-colors"
                style={{ height: "38px" }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={confirmDeleteAnnouncement}
                className="px-5 py-2 bg-[#FFE5ED] text-[#FF6692] hover:bg-[#ffd1de] text-xs font-bold rounded-[8px] transition-colors"
                style={{ height: "38px" }}
              >
                Delete Announcement
              </button>
            </div>

          </div>
        </div>
      )}



      {/* MODAL: New / Edit Audience */}
      {(showNewAudienceModal || editingAudienceItem) && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => {
            setShowNewAudienceModal(false);
            setEditingAudienceItem(null);
          }}
        >
          <form 
            onSubmit={editingAudienceItem ? handleEditAudienceSubmit : handleNewAudienceSubmit}
            className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[638px] max-w-full flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block */}
            <div className="flex flex-row items-center justify-between w-full h-[30px] shrink-0 border-b border-slate-100 pb-3">
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
                {editingAudienceItem ? "Edit Audience" : "Create New Audience"}
              </h3>
              <button 
                type="button"
                onClick={() => {
                  setShowNewAudienceModal(false);
                  setEditingAudienceItem(null);
                }} 
                className="w-6 h-6 flex items-center justify-center text-[#29343D] hover:opacity-80 transition-opacity shrink-0"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Fields container */}
            <div className="flex flex-col gap-4 w-full">
              {/* Audience Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#29343D]">Name of Audience</label>
                <input
                  type="text"
                  required
                  value={audNameInput}
                  onChange={(e) => setAudNameInput(e.target.value)}
                  placeholder="e.g. Audience 06"
                  className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                />
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Recipient */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Recipient</label>
                  <select
                    value={audRecipientInput}
                    onChange={(e) => setAudRecipientInput(e.target.value as any)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="Owner">Owner</option>
                    <option value="Employee">Employee</option>
                    <option value="Accountants">Accountants</option>
                    <option value="Clients">Clients</option>
                  </select>
                </div>

                {/* Employees count */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Number of Employees</label>
                  <select
                    value={audEmployeesInput}
                    onChange={(e) => setAudEmployeesInput(e.target.value as any)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="Between a and b">Between a and b</option>
                  </select>
                </div>
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-2 gap-4">
                {/* Age */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Age</label>
                  <select
                    value={audAgeInput}
                    onChange={(e) => setAudAgeInput(e.target.value as any)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="All">All Ages</option>
                    <option value="Between a and b">Between a and b</option>
                  </select>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Membership Status</label>
                  <select
                    value={audStatusInput}
                    onChange={(e) => setAudStatusInput(e.target.value as any)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Trial">Trial</option>
                  </select>
                </div>
              </div>

              {/* Grid 3 Columns */}
              <div className="grid grid-cols-3 gap-4">
                {/* Region */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Region</label>
                  <input
                    type="text"
                    value={audRegionInput}
                    onChange={(e) => setAudRegionInput(e.target.value)}
                    placeholder="Region 01"
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">City</label>
                  <input
                    type="text"
                    value={audCityInput}
                    onChange={(e) => setAudCityInput(e.target.value)}
                    placeholder="City 01"
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                  />
                </div>

                {/* Province */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#29343D]">Province</label>
                  <input
                    type="text"
                    value={audProvinceInput}
                    onChange={(e) => setAudProvinceInput(e.target.value)}
                    placeholder="Province 01"
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3.5 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-row justify-end items-center gap-2.5 w-full mt-2 border-t border-slate-100 pt-3">
              <button 
                type="button"
                onClick={() => {
                  setShowNewAudienceModal(false);
                  setEditingAudienceItem(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-[#635BFF] hover:bg-[#4d42eb] text-white text-sm font-semibold rounded-lg transition-all"
              >
                {editingAudienceItem ? "Save Changes" : "Create Audience"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: Delete Audience Confirmation */}
      {deletingAudienceItem && (
        <div 
          className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-900/10 p-4"
          onClick={() => setDeletingAudienceItem(null)}
        >
          <div 
            className="flex h-[177px] w-full max-w-[521px] flex-col items-start gap-6 rounded-[12px] bg-white p-6 text-left shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h3 className="h-[25px] w-full text-[18px] font-semibold leading-[25px] text-[#29343D]">
              Are you sure you want to delete this audience?
            </h3>

            {/* Description */}
            <p className="h-5 w-full text-[14px] font-normal leading-5 text-[#29343D]">
              This action cannot be undone.
            </p>

            {/* Actions Buttons */}
            <div className="flex h-9 w-full flex-row items-start justify-end gap-2.5">
              <button 
                type="button" 
                onClick={() => setDeletingAudienceItem(null)}
                className="flex h-9 w-[72px] items-center justify-center rounded-[8px] bg-[#F6F7F9] px-4 py-2.5 text-center text-[12px] font-medium leading-4 text-[#0A2540] transition-colors hover:bg-[#EFF4FA]"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={confirmDeleteAudience}
                className="flex h-9 w-[125px] items-center justify-center rounded-[8px] bg-[#FFE5ED] px-4 py-2.5 text-center text-[12px] font-medium leading-4 text-[#FF6692] transition-colors hover:bg-[#ffd1de]"
              >
                Delete Audience
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: Advanced Filters */}
      {showAdvancedFiltersModal && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowAdvancedFiltersModal(false)}
        >
          <div 
            className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[638px] max-w-full flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Block */}
            <div className="flex flex-row items-center justify-between w-full h-[30px] shrink-0 border-b border-slate-100 pb-3">
              <h3 className="font-sans font-bold text-[18px] leading-[25px] text-[#29343D]">
                Advanced Filters
              </h3>
              <button 
                type="button"
                onClick={() => setShowAdvancedFiltersModal(false)} 
                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-650 transition-colors shrink-0"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 w-full">
              {/* Social media linked */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Social media linked
                </label>
                <div className="relative">
                  <select
                    value={socialMediaFilter}
                    onChange={(e) => setSocialMediaFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Has whatsapp API */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Has whatsapp API
                </label>
                <div className="relative">
                  <select
                    value={whatsappApiFilter}
                    onChange={(e) => setWhatsappApiFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Type of membership */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Type of membership
                </label>
                <div className="relative">
                  <select
                    value={membershipTypeFilter}
                    onChange={(e) => setMembershipTypeFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Membership status */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Membership status
                </label>
                <div className="relative">
                  <select
                    value={membershipStatusFilter}
                    onChange={(e) => setMembershipStatusFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Trial">Trial</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Subscribed from */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Subscribed from
                </label>
                <div className="relative">
                  <select
                    value={subscribedFromFilter}
                    onChange={(e) => setSubscribedFromFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Ads">Ads</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Number of clients */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Number of clients
                </label>
                <div className="relative">
                  <select
                    value={clientsNumberFilter}
                    onChange={(e) => setClientsNumberFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="0-50">0-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201+">201+</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              {/* Income */}
              <div className="flex flex-col gap-2 w-[283px]">
                <label className="text-[12px] font-semibold text-[#98A4AE] tracking-wide">
                  Income
                </label>
                <div className="relative">
                  <select
                    value={incomeFilter}
                    onChange={(e) => setIncomeFilter(e.target.value)}
                    className="w-full bg-white border border-[#E0E6EB] rounded-lg px-3 py-2 text-xs font-semibold text-[#29343D] focus:border-[#635BFF] focus:outline-none transition-all appearance-none cursor-pointer pr-10 h-[36px]"
                  >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-row justify-between items-center w-full mt-4 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setRecipientFilter("All Recipient");
                  setEmployeesFilter("All");
                  setAgeFilter("All Ages");
                  setRegionFilter("All Regions");
                  setCityFilter("All Cities");
                  setProvinceFilter("All Provinces");
                  setSocialMediaFilter("All");
                  setWhatsappApiFilter("All");
                  setMembershipTypeFilter("All");
                  setMembershipStatusFilter("All");
                  setSubscribedFromFilter("All");
                  setClientsNumberFilter("All");
                  setIncomeFilter("All");
                  setShowAdvancedFiltersModal(false);
                  triggerToast("All filters reset", "info");
                }}
                className="px-4 py-2 bg-[#EFF4FA] hover:bg-slate-200 text-xs font-bold text-[#0A2540] rounded-lg transition-colors h-[36px] w-[126px] flex items-center justify-center cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAdvancedFiltersModal(false);
                  triggerToast("Advanced filters applied", "success");
                }}
                className="px-5 py-2 bg-[#635BFF] hover:bg-[#4d42eb] text-xs font-bold text-white rounded-lg transition-colors h-[36px] w-[110px] flex items-center justify-center cursor-pointer"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Salons in Audience */}
      {showSalonsListModal && viewedAudience && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[160] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowSalonsListModal(false)}
        >
          <div 
            className="bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] w-[1000px] max-w-full flex flex-col gap-6 p-6 text-left border border-[#E0E6EB] relative overflow-hidden animate-in zoom-in-95 duration-150"
            style={{ height: "537px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-row items-center justify-between w-full h-[25px] shrink-0">
              <h3 className="font-sans font-semibold text-[18px] leading-[25px] text-[#29343D]">
                Salons in {(viewedAudience as any)?.name}
              </h3>
              <button 
                type="button"
                onClick={() => setShowSalonsListModal(false)} 
                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-650 transition-colors shrink-0"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-start shrink-0">
              <button
                type="button"
                onClick={handleAddSalon}
                className="flex items-center justify-center bg-[#635BFF] hover:bg-[#4d42eb] text-white text-xs font-semibold rounded-lg h-9 w-[89px] transition-colors"
              >
                Add Salon
              </button>
            </div>

            {/* Table Frame 1000003770 */}
            <div className="border border-[#E0E6EB] rounded-[12px] w-full h-[380px] overflow-hidden flex flex-col bg-white">
              {/* Table header */}
              <div className="flex w-full h-[52px] shrink-0 bg-[#F3F3FF] border-b border-[#E0E6EB] select-none">
                <div className="w-[288px] flex items-center px-6 py-4 font-sans font-bold text-sm text-[#29343D] border-r border-[#E0E6EB]">
                  Salon Name
                </div>
                <div className="w-[288px] flex items-center px-6 py-4 font-sans font-bold text-sm text-[#29343D] border-r border-[#E0E6EB]">
                  Plan
                </div>
                <div className="w-[288px] flex items-center px-6 py-4 font-sans font-bold text-sm text-[#29343D] border-r border-[#E0E6EB]">
                  Last Active
                </div>
                <div className="w-[88px] flex items-center justify-center py-4 font-sans font-bold text-sm text-[#29343D]">
                  Actions
                </div>
              </div>

              {/* Table Body scrollable area */}
              <div className="flex-grow overflow-y-auto custom-scrollbar">
                {salonsInAudience.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic font-semibold py-8">
                    No salons matching this audience.
                  </div>
                ) : (
                  salonsInAudience.map((salon, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div 
                        key={salon.id} 
                        className={`flex w-full h-[76px] shrink-0 border-b border-[#E0E6EB] hover:bg-slate-50/50 transition-colors ${
                          isEven ? "bg-white" : "bg-[#FAFAFA]"
                        }`}
                      >
                        {/* Salon Name Column */}
                        <div className="w-[288px] h-full flex items-center gap-3 px-6 py-3.5 border-r border-[#E0E6EB] overflow-hidden">
                          {renderModalSalonLogo(salon.name)}
                          <div className="flex flex-col justify-center overflow-hidden">
                            <span className="font-sans font-semibold text-xs text-[#29343D] truncate" title={salon.name}>
                              {salon.name}
                            </span>
                            <span className="font-sans font-normal text-[11px] text-[#29343D] mt-0.5 truncate">
                              {salon.manager} • {salon.city}
                            </span>
                            <span className="font-sans font-normal text-[11px] text-[#999999] truncate">
                              {salon.email}
                            </span>
                          </div>
                        </div>

                        {/* Plan Column */}
                        <div className="w-[288px] h-full flex items-center px-6 py-3.5 border-r border-[#E0E6EB]">
                          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-[8px] ${
                            salon.plan === "Premium" 
                              ? "bg-[#D2F4F2] text-[#29343D]" 
                              : salon.plan === "Enterprise" 
                              ? "bg-[#6C63FF] text-white" 
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {salon.plan}
                          </span>
                        </div>

                        {/* Last Active Column */}
                        <div className="w-[288px] h-full flex items-center px-6 py-3.5 border-r border-[#E0E6EB]">
                          <div className="flex items-center text-xs font-medium text-[#29343D]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#29343D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mr-1.5 opacity-80">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{salon.lastActive}</span>
                          </div>
                        </div>

                        {/* Actions Column */}
                        <div className="w-[88px] h-full flex items-center justify-center py-3.5">
                          <button
                            type="button"
                            onClick={() => handleRemoveSalon(salon.id)}
                            className="w-12 h-9 flex items-center justify-center bg-[#FFE5ED] hover:bg-[#ffd1de] text-[#FF6692] rounded-[8px] transition-colors"
                            title="Remove Salon"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
