"use client";

import React, { useState, useRef, useEffect } from "react";
import "quill/dist/quill.snow.css";

// Icons
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-450">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const VerticalDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

// Actions Icons
const ViewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-550">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-550">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const SignatureIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    <path d="M6 15h2" />
  </svg>
);

const AssignIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PersonOutlineIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="21" cy="11" r="7" />
    <path d="M11 38v-9.5c0-4 3.2-7.2 7.2-7.2h5.6c4 0 7.2 3.2 7.2 7.2V38" />
    <path d="M21 21.3V38" />
    <path d="M11 28.6h8" />
    <path d="M23 28.6h8" />
  </svg>
);

const WaiverFileIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M27 5H14.5A5.5 5.5 0 0 0 9 10.5v25A5.5 5.5 0 0 0 14.5 41h17A5.5 5.5 0 0 0 37 35.5V15L27 5Z" />
    <path d="M27 5v10h10" />
    <path d="M17 26h12" />
    <path d="M17 33h7" />
  </svg>
);

const EyeMiniIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const RefreshMiniIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 1-15.2 6.5" />
    <path d="M3 12A9 9 0 0 1 18.2 5.5" />
    <path d="M18 2v4h-4" />
    <path d="M6 22v-4h4" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// Home icon for breadcrumb
const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

interface Waiver {
  id: string;
  name: string;
  lastUpdate: string;
  content: string;
  clientSignature?: string;
  ownerSignature?: string;
  signedBy?: string;
  signedEmail?: string;
  signedDate?: string;
  isSigned?: boolean;
}

type QuillEditor = import("quill").default & {
  history?: {
    undo: () => void;
    redo: () => void;
  };
};

const mockEmployees = [
  { name: "Maria Rodriguez", email: "maria@bellavista.com" },
  { name: "Roberto Marini", email: "roberto@beautywellness.com" },
  { name: "Alessandro Costa", email: "alessandro@luxuryspa.com" },
  { name: "Anna Bianchi", email: "anna@glamourlounge.com" }
];

const mockClients = [
  { name: "Dominik Szoboszlai", email: "dominik@liverpool.fc" },
  { name: "Erling Haaland", email: "erling@city.fc" },
  { name: "Kevin De Bruyne", email: "kevin@city.fc" },
  { name: "Mohamed Salah", email: "salah@liverpool.fc" }
];

const clientProfilePreview = {
  businessName: "Beauty Wellness Center",
  owner: "Roberto Marini",
  city: "Bologna",
  email: "marco.rossi@bellaforma.com",
  phone: "+39 329 123 4567",
  plan: "Premium",
  status: "Active",
  waivers: [
    { name: "Privacy", status: "unsigned" },
    { name: "Social Media", status: "signed" }
  ]
};

const defaultWaiverContent = `<h3>What is Lorem Ipsum?</h3>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
<h3>What is Lorem Ipsum?</h3>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
<h3>What is Lorem Ipsum?</h3>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`;

export default function WaiversPage() {
  const [activeTab, setActiveTab] = useState<"templates" | "signed">("templates");
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Route Switching inside page
  const [isAddingWaiver, setIsAddingWaiver] = useState(false);
  const [newWaiverName, setNewWaiverName] = useState("");
  const [editingWaiverId, setEditingWaiverId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const menuRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillEditor | null>(null);

  // Modal flow states
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(null);
  const [activeModal, setActiveModal] = useState<"view" | "sign_flow" | null>(null);
  const [signStep, setSignStep] = useState<1 | 2 | 3>(1);
  const [signMethod, setSignMethod] = useState<"in_person" | "remote" | null>(null);
  const [activeAssignModal, setActiveAssignModal] = useState<"clients" | "employees" | null>(null);
  const [assignStep, setAssignStep] = useState<1 | 2 | 3>(1);
  const [selectedAssignWaiverType, setSelectedAssignWaiverType] = useState<"adult" | "minor" | null>(null);
  const [receiverType, setReceiverType] = useState<"Employees" | "Clients">("Employees");
  const [selectedReceiverName, setSelectedReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [showReceiverDropdown, setShowReceiverDropdown] = useState(false);

  // Drawing signature states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Close dropdown menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveActionId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock Waivers list matching screenshot (Waiver 1 to Waiver 9)
  const [waivers, setWaivers] = useState<Waiver[]>([
    { id: "w-1", name: "Waiver 1", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-2", name: "Waiver 2", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-3", name: "Waiver 3", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-4", name: "Waiver 4", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-5", name: "Waiver 5", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-6", name: "Waiver 6", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-7", name: "Waiver 7", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-8", name: "Waiver 8", lastUpdate: "1h ago", content: defaultWaiverContent },
    { id: "w-9", name: "Waiver 9", lastUpdate: "1h ago", content: defaultWaiverContent }
  ]);

  // Mock Signed Waivers list
  const [signedWaivers, setSignedWaivers] = useState<Waiver[]>([
    {
      id: "sw-1",
      name: "Waiver 1 (Signed)",
      lastUpdate: "2h ago",
      content: defaultWaiverContent,
      clientSignature: "signed",
      ownerSignature: "signed",
      signedBy: "Maria Rodriguez",
      signedEmail: "maria@bellavista.com",
      signedDate: "14/06/2026",
      isSigned: true
    }
  ]);

  // Initialize Quill Editor dynamically on Client Side inside adding state
  useEffect(() => {
    if (isAddingWaiver && typeof window !== "undefined" && editorRef.current && !quillRef.current) {
      import("quill").then((QuillModule) => {
        const Quill = QuillModule.default;
        quillRef.current = new Quill(editorRef.current!, {
          theme: "snow",
          modules: {
            toolbar: "#toolbar"
          }
        }) as QuillEditor;

        // Load initial content if editing
        if (editingWaiverId) {
          const waiverToEdit = waivers.find(w => w.id === editingWaiverId);
          if (waiverToEdit && waiverToEdit.content) {
            quillRef.current.root.innerHTML = waiverToEdit.content;
          }
        }
      });
    }

    // Cleanup editor ref when unmounting
    return () => {
      quillRef.current = null;
    };
  }, [isAddingWaiver, editingWaiverId, waivers]);

  // Filter templates or signed based on active tab
  const displayedWaivers = activeTab === "templates"
    ? waivers
    : signedWaivers;

  // Pagination Logic
  const totalItems = displayedWaivers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWaivers = displayedWaivers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddWaiver = () => {
    setEditingWaiverId(null);
    setNewWaiverName("");
    setIsAddingWaiver(true);
  };

  const handleDeleteWaiver = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      if (activeTab === "templates") {
        setWaivers(prev => prev.filter(w => w.id !== id));
      } else {
        setSignedWaivers(prev => prev.filter(w => w.id !== id));
      }
      setActiveActionId(null);
      alert(`${name} deleted successfully.`);
    }
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.strokeStyle = "#4f46e5"; // Indigo matching design theme
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleConfirmSignature = () => {
    if (!selectedWaiver) return;

    const canvas = canvasRef.current;
    let signatureUrl = "";
    if (canvas) {
      signatureUrl = canvas.toDataURL("image/png");
    }

    const newSignedWaiver: Waiver = {
      id: `sw-${Date.now()}`,
      name: `${selectedWaiver.name} (Signed)`,
      lastUpdate: "Just now",
      content: selectedWaiver.content,
      clientSignature: signatureUrl || "signed",
      ownerSignature: signatureUrl || "signed",
      signedBy: selectedReceiverName || "Client User",
      signedEmail: receiverEmail || "client@user.com",
      signedDate: new Date().toLocaleDateString(),
      isSigned: true
    };

    setSignedWaivers(prev => [newSignedWaiver, ...prev]);

    // Reset state & redirect
    setActiveTab("signed");
    setActiveModal(null);
    setSignStep(1);
    setSignMethod(null);
    setSelectedReceiverName("");
    setReceiverEmail("");
    setSelectedWaiver(null);

    alert(`Waiver "${selectedWaiver.name}" was signed successfully!`);
  };

  const closeAssignModal = () => {
    setActiveAssignModal(null);
    setAssignStep(1);
    setSelectedAssignWaiverType(null);
    setSelectedWaiver(null);
  };

  const handleAssignNow = () => {
    if (activeAssignModal === "clients") {
      setAssignStep(2);
      return;
    }

    alert(`${selectedWaiver?.name || "Waiver"} assigned to employees.`);
    closeAssignModal();
  };

  const handleAssignTypeNext = () => {
    if (!selectedAssignWaiverType) return;
    setAssignStep(3);
  };

  const handleClientWaiverSign = () => {
    setActiveAssignModal(null);
    setSignMethod("remote");
    setSignStep(2);
    setReceiverType("Clients");
    setSelectedReceiverName(clientProfilePreview.businessName);
    setReceiverEmail(clientProfilePreview.email);
    setActiveModal("sign_flow");
  };

  const handleClientWaiverView = () => {
    setActiveAssignModal(null);
    setActiveModal("view");
  };

  // Editor Toolbar Actions
  const handleUndo = () => {
    if (quillRef.current && quillRef.current.history) {
      quillRef.current.history.undo();
    }
  };

  const handleRedo = () => {
    if (quillRef.current && quillRef.current.history) {
      quillRef.current.history.redo();
    }
  };

  const handleInsertHR = () => {
    if (quillRef.current) {
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.insertText(range.index, "\n---\n");
      }
    }
  };

  const handleSaveTemplate = () => {
    if (!newWaiverName.trim()) {
      alert("Please enter a Waiver Name.");
      return;
    }

    const htmlContent = quillRef.current ? quillRef.current.root.innerHTML : "";

    if (editingWaiverId) {
      setWaivers(prev => prev.map(w => w.id === editingWaiverId ? { ...w, name: newWaiverName, content: htmlContent, lastUpdate: "1s ago" } : w));
      setEditingWaiverId(null);
      alert("Waiver template updated successfully!");
    } else {
      setWaivers(prev => [
        {
          id: `w-${prev.length + 1}`,
          name: newWaiverName,
          lastUpdate: "1s ago",
          content: htmlContent || defaultWaiverContent
        },
        ...prev
      ]);
      alert("Waiver template saved successfully!");
    }

    setNewWaiverName("");
    setIsAddingWaiver(false);
  };

  if (isAddingWaiver) {
    return (
      <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-[#eef2f6] shadow-sm px-6 py-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAddingWaiver(false);
                setNewWaiverName("");
                setEditingWaiverId(null);
              }}
              className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors inline-flex text-slate-500 hover:text-slate-800"
              title="Back to Waivers list"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <span className="text-sm font-bold text-slate-800">
              {editingWaiverId ? "Edit Waiver" : "Add Waiver"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setIsAddingWaiver(false);
                setNewWaiverName("");
                setEditingWaiverId(null);
              }}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors inline-flex"
            >
              <HomeIcon />
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => {
                setIsAddingWaiver(false);
                setNewWaiverName("");
                setEditingWaiverId(null);
              }}
              className="bg-[#e4e2ff] text-[#5e53fc] px-3 py-1 rounded-full text-[10px] font-extrabold transition-all hover:bg-[#d8d5ff]"
            >
              Waiver Templates
            </button>
          </div>
        </div>

        {/* Main Editor Card */}
        <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] flex flex-col p-8 w-full gap-6">
          {/* Waiver Name input */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-slate-800">Waiver Name *</label>
            <input
              type="text"
              required
              placeholder="Enter name"
              value={newWaiverName}
              onChange={(e) => setNewWaiverName(e.target.value)}
              className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-350 w-full"
            />
          </div>

          {/* Text Editor */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-slate-800">Text Editor</label>

            {/* Custom Toolbar */}
            <div id="toolbar" className="flex items-center flex-wrap gap-1 border border-slate-200 border-b-0 rounded-t-xl bg-slate-50/55 px-4 py-2.5 text-slate-600 w-full select-none">
              {/* Group 1 */}
              <button className="ql-bold p-1 hover:bg-slate-100 rounded text-sm font-bold w-6 h-6 inline-flex items-center justify-center">B</button>
              <button className="ql-italic p-1 hover:bg-slate-100 rounded text-sm italic w-6 h-6 inline-flex items-center justify-center">I</button>
              <button className="ql-strike p-1 hover:bg-slate-100 rounded text-sm line-through w-6 h-6 inline-flex items-center justify-center">S</button>
              <button className="ql-code p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </button>
              <button className="ql-clean p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 13L16 9" /></svg>
              </button>

              <div className="w-px h-4 bg-slate-200 mx-2" />

              {/* Group 2 */}
              <button className="ql-header p-1 hover:bg-slate-100 rounded text-xs font-black w-7 h-6" value="1">H1</button>
              <button className="ql-header p-1 hover:bg-slate-100 rounded text-xs font-black w-7 h-6" value="2">H2</button>
              <button className="ql-list p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center" value="ordered">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></svg>
              </button>
              <button className="ql-list p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center" value="bullet">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><circle cx="4" cy="6" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="4" cy="18" r="1.5" /></svg>
              </button>
              <button className="ql-list p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center" value="check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              </button>
              <button className="ql-code-block p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" /><line x1="6" y1="10" x2="10" y2="10" /><line x1="6" y1="14" x2="14" y2="14" /></svg>
              </button>

              <div className="w-px h-4 bg-slate-200 mx-2" />

              {/* Group 3 */}
              <button className="ql-blockquote p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </button>
              <button type="button" onClick={handleInsertHR} className="p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center" title="Horizontal Line">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>

              <div className="w-px h-4 bg-slate-200 mx-2" />

              {/* Group 4 */}
              <button type="button" onClick={handleUndo} className="p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center" title="Undo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" /></svg>
              </button>
              <button type="button" onClick={handleRedo} className="p-1 hover:bg-slate-100 rounded w-6 h-6 inline-flex items-center justify-center" title="Redo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" /></svg>
              </button>
            </div>

            {/* Editor Area */}
            <div className="border border-slate-200 rounded-b-xl overflow-hidden bg-white">
              <div ref={editorRef} style={{ minHeight: "250px" }} />
            </div>
          </div>

          {/* Action Save Button */}
          <div className="flex items-center justify-end mt-4">
            <button
              onClick={handleSaveTemplate}
              className="px-6 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
      {/* Top Header Breadcrumbs Card */}
      <div className="bg-white rounded-2xl border border-[#eef2f6] shadow-sm px-6 py-4 flex items-center justify-between w-full">
        <h1 className="text-sm font-bold text-slate-800">
          Waivers
        </h1>
        <button
          onClick={handleAddWaiver}
          className="px-5 py-2.5 bg-[#5e53fc] hover:bg-[#4d42eb] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5"
        >
          <span>+ Add Waiver</span>
        </button>
      </div>

      {/* Main Waivers Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] flex flex-col p-8 w-full">

        {/* Toggleable Tabs */}
        <div className="flex items-center gap-2.5 mb-8">
          <button
            onClick={() => {
              setActiveTab("templates");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${activeTab === "templates"
              ? "border-[#5e53fc] bg-[#f9f8ff] text-[#5e53fc] shadow-sm"
              : "border-slate-100 hover:bg-slate-50 text-slate-400"
              }`}
          >
            Waiver Templates
          </button>
          <button
            onClick={() => {
              setActiveTab("signed");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${activeTab === "signed"
              ? "border-[#5e53fc] bg-[#f9f8ff] text-[#5e53fc] shadow-sm"
              : "border-slate-100 hover:bg-slate-50 text-slate-400"
              }`}
          >
            Waiver Signed
          </button>
        </div>

        {/* Table List Container */}
        <div className="border border-slate-100 rounded-2xl overflow-x-auto lg:overflow-visible w-full bg-white relative">
          <table className="w-full border-collapse text-left text-xs min-w-[600px] lg:min-w-0">
            <thead>
              <tr className="bg-[#f5f4ff] border-b border-slate-100 text-slate-650 font-bold uppercase tracking-wider">
                <th className="px-6 py-4 w-[60%]">Name</th>
                <th className="px-6 py-4 w-[25%]">Last Update</th>
                <th className="px-6 py-4 text-center w-[15%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {paginatedWaivers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                        <DocumentIcon />
                      </div>
                      <span className="font-bold text-slate-800 text-sm">{w.name}</span>
                    </div>
                  </td>

                  {/* Last update column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                      <ClockIcon />
                      <span>{w.lastUpdate}</span>
                    </div>
                  </td>

                  {/* Actions column with vertical dots popover */}
                  <td className="px-6 py-4 text-center relative overflow-visible">
                    <button
                      onClick={() => setActiveActionId(activeActionId === w.id ? null : w.id)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all inline-flex"
                    >
                      <VerticalDotsIcon />
                    </button>

                    {/* Dropdown Menu */}
                    {activeActionId === w.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-12 top-2 mt-1 w-52 bg-white border border-[#eef2f6] rounded-2xl shadow-xl z-50 p-2 flex flex-col gap-0.5 animate-in scale-in duration-100 origin-top-right text-left"
                      >
                        <button
                          onClick={() => {
                            setSelectedWaiver(w);
                            setActiveModal("view");
                            setActiveActionId(null);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          <ViewIcon />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => {
                            setEditingWaiverId(w.id);
                            setNewWaiverName(w.name);
                            setIsAddingWaiver(true);
                            setActiveActionId(null);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          <EditIcon />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWaiver(w);
                            setSignMethod(null);
                            setSignStep(1);
                            setActiveModal("sign_flow");
                            setActiveActionId(null);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          <SignatureIcon />
                          <span>Sign Now/Send To</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWaiver(w);
                            setActiveModal(null);
                            setActiveAssignModal("clients");
                            setAssignStep(1);
                            setSelectedAssignWaiverType(null);
                            setActiveActionId(null);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          <AssignIcon />
                          <span>Assign to Client Profiles</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWaiver(w);
                            setActiveModal(null);
                            setActiveAssignModal("employees");
                            setAssignStep(1);
                            setSelectedAssignWaiverType(null);
                            setActiveActionId(null);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          <UsersIcon />
                          <span>Assign to Employees</span>
                        </button>
                        <button
                          onClick={() => {
                            alert("Waiver downloaded successfully.");
                            setActiveActionId(null);
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          <DownloadIcon />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleDeleteWaiver(w.id, w.name)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors w-full border-t border-slate-100/60 mt-1 pt-1.5 text-left"
                        >
                          <TrashIcon />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {paginatedWaivers.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-12 text-center text-slate-400 font-semibold text-sm">
                    No waivers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalItems > 0 && (
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-end gap-4 border-t border-slate-100 mt-6 bg-slate-50/10 rounded-b-2xl">
            {/* Page Size Select */}
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

            {/* Page range info */}
            <span className="text-xs font-semibold text-slate-500">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-45 disabled:hover:bg-white transition-all inline-flex"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="11 17 6 12 11 7" />
                  <polyline points="18 17 13 12 18 7" />
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-45 disabled:hover:bg-white transition-all inline-flex"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-45 disabled:hover:bg-white transition-all inline-flex"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-45 disabled:hover:bg-white transition-all inline-flex"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VIEW WAIVER MODAL */}
      {/* ========================================================================= */}
      {activeModal === "view" && selectedWaiver && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6 animate-in zoom-in-95 duration-200 relative">

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">View Waiver</h2>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setSelectedWaiver(null);
                }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable document area */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-white overflow-y-auto max-h-[350px] text-xs leading-relaxed text-slate-650 flex flex-col gap-4 text-left">
              <h3 className="font-extrabold text-slate-800 text-sm">Waiver Name</h3>
              <div
                dangerouslySetInnerHTML={{ __html: selectedWaiver.content || "<p>No content available.</p>" }}
                className="prose prose-sm max-w-none text-slate-600"
              />
            </div>

            {/* Signature preview boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 text-left">
                <div className="h-16 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-center overflow-hidden">
                  {selectedWaiver.clientSignature ? (
                    selectedWaiver.clientSignature.startsWith("data:") ? (
                      <img src={selectedWaiver.clientSignature} alt="Client Signature" className="h-full object-contain p-2" />
                    ) : (
                      <span className="text-slate-500 text-[10px] font-bold italic">Signed</span>
                    )
                  ) : (
                    <span className="text-slate-350 text-[10px] font-semibold">No signature yet</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#2c3a50]/70 pl-1">Client Signature</span>
              </div>

              <div className="flex flex-col gap-2 text-left">
                <div className="h-16 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-center overflow-hidden">
                  {selectedWaiver.ownerSignature ? (
                    selectedWaiver.ownerSignature.startsWith("data:") ? (
                      <img src={selectedWaiver.ownerSignature} alt="Owner Signature" className="h-full object-contain p-2" />
                    ) : (
                      <span className="text-slate-500 text-[10px] font-bold italic">Signed</span>
                    )
                  ) : (
                    <span className="text-slate-350 text-[10px] font-semibold">No signature yet</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#2c3a50]/70 pl-1">Owner Signature</span>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSignMethod("in_person");
                  setSignStep(3); // direct to drawing signature
                  setActiveModal("sign_flow");
                }}
                className="px-5 py-2.5 bg-[#e6fcfc] hover:bg-[#d2fbfb] text-[#00b8c4] rounded-xl text-xs font-bold transition-all"
              >
                Sign Now
              </button>
              <button
                onClick={() => {
                  setSignMethod("remote");
                  setSignStep(2); // direct to remote input fields
                  setActiveModal("sign_flow");
                }}
                className="px-5 py-2.5 bg-[#e4e2ff] hover:bg-[#d8d5ff] text-[#5e53fc] rounded-xl text-xs font-bold transition-all"
              >
                Send To
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SIGN NOW / SEND TO FLOW MODAL */}
      {/* ========================================================================= */}
      {activeModal === "sign_flow" && selectedWaiver && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6 animate-in zoom-in-95 duration-200 relative">

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Sign Now/Send To</h2>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setSignStep(1);
                  setSignMethod(null);
                  setSelectedReceiverName("");
                  setReceiverEmail("");
                  setSelectedWaiver(null);
                }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Step 1: Selector (In person vs Remote) */}
            {signStep === 1 && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* In person card */}
                  <div
                    onClick={() => setSignMethod("in_person")}
                    className={`border-2 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all h-40 ${signMethod === "in_person"
                      ? "border-[#5e53fc] bg-[#fdfdff]"
                      : "border-slate-150 hover:border-slate-350 hover:bg-slate-50/50"
                      }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f3f1ff] flex items-center justify-center text-[#5e53fc]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 21a6 6 0 0 0-12 0" />
                        <circle cx="12" cy="10" r="4" />
                        <path d="M12 2v2" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-slate-800">In person</span>
                  </div>

                  {/* Remote card */}
                  <div
                    onClick={() => setSignMethod("remote")}
                    className={`border-2 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all h-40 ${signMethod === "remote"
                      ? "border-[#5e53fc] bg-[#fdfdff]"
                      : "border-slate-150 hover:border-slate-350 hover:bg-slate-50/50"
                      }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f3f1ff] flex items-center justify-center text-[#5e53fc]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-slate-800">Remote</span>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-end mt-2">
                  <button
                    onClick={() => {
                      if (signMethod === "remote") setSignStep(2);
                      else if (signMethod === "in_person") setSignStep(3);
                    }}
                    disabled={signMethod === null}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${signMethod === null
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-[#5e53fc] hover:bg-[#4d42eb] text-white cursor-pointer"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Remote Details Fields */}
            {signStep === 2 && (
              <div className="flex flex-col gap-5 text-left">
                {/* Receiver Type */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-slate-800">Receiver Type</label>
                  <select
                    value={receiverType}
                    onChange={(e) => {
                      setReceiverType(e.target.value as "Employees" | "Clients");
                      setSelectedReceiverName("");
                      setReceiverEmail("");
                    }}
                    className="bg-white border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 cursor-pointer w-full"
                  >
                    <option value="Employees">Employees</option>
                    <option value="Clients">Clients</option>
                  </select>
                </div>

                {/* Select Receiver Dropdown */}
                <div className="flex flex-col gap-1.5 w-full relative">
                  <label className="text-xs font-bold text-slate-800">Select Receiver</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select"
                      readOnly
                      value={selectedReceiverName}
                      onClick={() => setShowReceiverDropdown(!showReceiverDropdown)}
                      className="w-full bg-white border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl pl-4 pr-10 py-2.5 text-xs font-semibold text-slate-700 cursor-pointer"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                  </div>

                  {/* Dropdown options */}
                  {showReceiverDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#eef2f6] rounded-2xl shadow-xl z-50 p-2 flex flex-col gap-0.5 max-h-48 overflow-y-auto">
                      {(receiverType === "Employees" ? mockEmployees : mockClients).map((person) => (
                        <button
                          key={person.name}
                          type="button"
                          onClick={() => {
                            setSelectedReceiverName(person.name);
                            setReceiverEmail(person.email);
                            setShowReceiverDropdown(false);
                          }}
                          className="flex items-center px-3 py-2 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors w-full text-left"
                        >
                          {person.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Email input field */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-slate-800">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                    className="border border-slate-200 focus:border-[#5e53fc] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder:text-slate-350 w-full"
                  />
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-end mt-4 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSignStep(3)}
                    disabled={!receiverEmail || !selectedReceiverName}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${(!receiverEmail || !selectedReceiverName)
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-[#5e53fc] hover:bg-[#4d42eb] text-white cursor-pointer"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Interactive Canvas Drawing Pad */}
            {signStep === 3 && (
              <div className="flex flex-col gap-4">
                <div className="border border-slate-200 rounded-2xl bg-[#fafafa] overflow-hidden relative shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={450}
                    height={180}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[180px] bg-white cursor-crosshair block"
                    style={{ touchAction: "none" }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-450 text-center">Draw your signature above</span>

                {/* Footer action buttons */}
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100">
                  <button
                    onClick={clearCanvas}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    Reset
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearCanvas}
                      className="px-5 py-2.5 bg-[#e4e2ff] hover:bg-[#d8d5ff] text-[#5e53fc] rounded-xl text-xs font-bold transition-all"
                    >
                      Resign
                    </button>
                    <button
                      onClick={handleConfirmSignature}
                      className="px-5 py-2.5 bg-[#e6fcfc] hover:bg-[#d2fbfb] text-[#00b8c4] rounded-xl text-xs font-bold transition-all"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ASSIGN WAIVER FLOW MODAL */}
      {/* ========================================================================= */}
      {activeAssignModal && selectedWaiver && (
        <div className="fixed inset-0 bg-slate-900/25 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          {assignStep === 1 && (
            <div className="bg-white rounded-none shadow-2xl w-full max-w-[775px] px-6 py-7 sm:px-8 sm:py-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
              <h2 className="text-[28px] leading-tight font-bold text-[#273340]">
                {activeAssignModal === "clients" ? "Assign to Client's Profiles" : "Assign to Employees"}
              </h2>
              <p className="mt-10 text-[22px] leading-8 font-medium text-[#2f3b47]">
                {activeAssignModal === "clients"
                  ? "Are you sure you want to assign this waiver to client's profiles?"
                  : "Are you sure you want to assign this waiver to employees?"}
              </p>
              <div className="mt-9 flex items-center justify-end gap-4">
                <button
                  onClick={closeAssignModal}
                  className="h-14 min-w-28 rounded-xl bg-[#f3f6fa] px-7 text-lg font-semibold text-[#11213a] transition-colors hover:bg-[#e9eef5]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignNow}
                  className="h-14 min-w-36 rounded-xl bg-[#e9fbfc] px-7 text-lg font-semibold text-[#00c4cb] transition-colors hover:bg-[#d8f7f9]"
                >
                  Assign Now
                </button>
              </div>
            </div>
          )}

          {assignStep === 2 && activeAssignModal === "clients" && (
            <div className="bg-white shadow-2xl w-full max-w-[880px] px-5 py-5 sm:px-6 sm:py-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold text-[#273340]">{"Assign to Client's Profiles"}</h2>
                <button
                  onClick={closeAssignModal}
                  className="p-1 text-[#1f2933] transition-colors hover:text-[#5e53fc]"
                  aria-label="Close assign modal"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
                {([
                  ["adult", "Adult Waiver"],
                  ["minor", "Minor Waiver"]
                ] as const).map(([type, label]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedAssignWaiverType(type)}
                    className={`h-60 rounded-2xl border bg-white px-7 py-8 text-left shadow-[0_6px_14px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#5f5cff] ${selectedAssignWaiverType === type
                      ? "border-[#5f5cff] ring-2 ring-[#5f5cff]/10"
                      : "border-[#f2f4f8]"
                      }`}
                  >
                    <div className="text-[#6157ff]">
                      <PersonOutlineIcon />
                    </div>
                    <div className="mt-6 text-xl font-bold text-[#273340]">{label}</div>
                  </button>
                ))}
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  onClick={handleAssignTypeNext}
                  disabled={!selectedAssignWaiverType}
                  className={`h-11 rounded-xl px-5 text-sm font-semibold transition-all ${selectedAssignWaiverType
                    ? "bg-[#5e53fc] text-white hover:bg-[#4d42eb]"
                    : "cursor-not-allowed bg-[#f2f5f9] text-[#a9b5c3]"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {assignStep === 3 && activeAssignModal === "clients" && (
            <div className="bg-white shadow-2xl w-full max-w-[744px] px-5 py-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold text-[#273340]">Client Profile</h2>
                <button
                  onClick={closeAssignModal}
                  className="p-1 text-[#1f2933] transition-colors hover:text-[#5e53fc]"
                  aria-label="Close client profile modal"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-7 rounded-xl border border-[#dfe8f0] bg-white px-7 py-7 shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-[#718099]">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_7px,transparent_7px,transparent_14px)]" />
                      <div className="absolute left-3 top-3 h-9 w-9 rounded-full bg-gradient-to-br from-[#ff9ea2] via-[#e95d66] to-[#c5424f]" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-[#273340]">{clientProfilePreview.businessName}</div>
                      <div className="text-lg font-medium text-[#a1adba]">{clientProfilePreview.owner} &bull; {clientProfilePreview.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 sm:pt-1">
                    <span className="rounded-full bg-[#e9fbef] px-3 py-1.5 text-sm font-semibold text-[#23c55e]">{clientProfilePreview.status}</span>
                    <span className="rounded-lg bg-[#cfefed] px-3 py-1.5 text-sm font-semibold text-[#355b64]">{clientProfilePreview.plan}</span>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-white px-7 py-7 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <h3 className="text-base font-semibold text-[#273340]">Contact Information</h3>
                  <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium text-[#a6a6a6]">Email</div>
                      <div className="mt-1 text-base font-semibold text-[#273340]">{clientProfilePreview.email}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#a6a6a6]">Phone</div>
                      <div className="mt-1 text-base font-semibold text-[#273340]">{clientProfilePreview.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-9 rounded-2xl bg-white px-7 py-7 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                  <h3 className="text-base font-semibold text-[#273340]">Waivers</h3>
                  <div className="mt-8 flex flex-col gap-5">
                    {clientProfilePreview.waivers.map((waiver) => (
                      <div key={waiver.name} className="relative flex flex-col sm:flex-row min-h-[86px] sm:items-center justify-between gap-4 rounded-xl border border-[#e3e7ec] bg-white px-5 py-4">
                        <div className="flex items-center gap-4 text-[#6157ff]">
                          <WaiverFileIcon />
                          <span className="text-xl font-semibold">{waiver.name}</span>
                        </div>

                        {waiver.status === "unsigned" ? (
                          <button
                            onClick={handleClientWaiverSign}
                            className="rounded-xl bg-[#e9fbfc] px-5 py-3 text-sm font-semibold text-[#00c4cb] transition-colors hover:bg-[#d8f7f9]"
                          >
                            Sign Now
                          </button>
                        ) : (
                          <div className="flex items-center gap-5">
                            <button
                              onClick={handleClientWaiverView}
                              className="flex h-[43px] w-[58px] items-center justify-center rounded-xl bg-[#eeedff] text-[#6157ff] transition-colors hover:bg-[#e3e0ff]"
                              aria-label={`View ${waiver.name} waiver`}
                            >
                              <EyeMiniIcon />
                            </button>
                            <button
                              onClick={() => alert(`${waiver.name} signature revoked.`)}
                              className="flex h-[43px] w-[58px] items-center justify-center rounded-xl bg-[#fff7df] text-[#ffc52f] transition-colors hover:bg-[#fff0c3]"
                              aria-label={`Revoke ${waiver.name} signature`}
                            >
                              <RefreshMiniIcon />
                            </button>
                            <span className="absolute -right-6 -top-5 rounded-full bg-[#fff7df] px-3 py-1.5 text-sm font-medium text-[#ffc52f]">Revoke Signature</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
