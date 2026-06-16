"use client";

import React from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  source: string;
  value: number;
  receivedDaysAgo: number;
  priority: "High" | "Medium" | "Low";
  stage: string;
  assignedTo: string | null;
  task: string | null;
  taskCompleted: boolean;
}

interface ViewLeadModalProps {
  lead: Lead;
  onClose: () => void;
  onAssign?: (id: string) => void;
}

interface InfoItem {
  label: string;
  value: string;
}

interface SectionProps {
  title: string;
  items: InfoItem[];
}

const InfoSection: React.FC<SectionProps> = ({ title, items }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)]">
      <h3 className="text-[13px] font-semibold leading-[18px] text-[#29343D]">
        {title}
      </h3>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-[12px] leading-4 text-[#999999]">
              {item.label}
            </p>
            <p className="text-[13px] font-semibold leading-[18px] text-[#29343D]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewLeadModal: React.FC<ViewLeadModalProps> = ({ lead, onClose, onAssign }) => {
  const formattedValue = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(lead.value);
  
  const contactInfo: InfoItem[] = [
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "Location", value: "Milano" }, // Placeholder as not in lead object
    { label: "Source", value: lead.source },
  ];

  const businessInfo: InfoItem[] = [
    { label: "Business Type", value: "Hair Salon" }, // Placeholder
    { label: "Estimated Value", value: formattedValue },
    { label: "Created", value: "10/08/2025" }, // Placeholder
    { label: "Last Updated", value: "10/08/2025" }, // Placeholder
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-[638px] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-[0_16px_32px_-8px_rgba(12,12,13,0.4)] animate-in scale-in-95 duration-100">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
              View Lead
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center hover:bg-slate-100 rounded-full transition-colors"
            >
              <span className="text-xl text-[#29343D]">×</span>
            </button>
          </div>

          {/* Content Card */}
          <div className="rounded-xl border border-[#E0E6EB] bg-white p-6 shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)]">
            <div className="flex flex-col gap-6">
              {/* User */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-[#635BFF] font-bold text-lg">
                    {lead.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold leading-5 text-[#29343D]">
                      {lead.name}
                    </h3>

                    <p className="text-[14px] leading-5 text-[#98A4AE]">
                      {lead.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start sm:self-auto">
                  <span className="rounded-md bg-[#FFE5ED] px-2 py-[2px] text-[13px] font-semibold text-[#FF6692]">
                    {lead.receivedDaysAgo} days ago
                  </span>

                  <span className="rounded-md bg-[#EBFAF0] px-2 py-[2px] text-[13px] font-semibold text-[#36C76C]">
                    New
                  </span>
                </div>
              </div>

              <InfoSection
                title="Contact Information"
                items={contactInfo}
              />

              <InfoSection
                title="Business Information"
                items={businessInfo}
              />

              {/* Notes */}
              <div className="rounded-xl bg-white p-6 shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold leading-[18px] text-[#29343D]">
                    Notes
                  </h3>

                  <button
                    type="button"
                    className="flex h-9 w-12 items-center justify-center rounded-lg bg-[#46CAEB] text-white hover:opacity-90 transition-opacity"
                  >
                    ✎
                  </button>
                </div>

                <p className="mt-6 text-[13px] font-semibold leading-[18px] text-[#29343D]">
                  {lead.task || "Interested in premium package for hair salon in Milano"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (onAssign) onAssign(lead.id);
                onClose();
              }}
              className="h-9 rounded-lg bg-[#DDDBFF] px-4 text-[12px] font-medium text-[#635BFF] hover:bg-[#c7c4ff] transition-colors"
            >
              Assign to
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLeadModal;