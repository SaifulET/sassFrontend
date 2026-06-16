"use client";

import React, { useState } from "react";

interface DeleteLeadModalProps {
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const DeleteLeadModal: React.FC<DeleteLeadModalProps> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="flex h-auto max-h-[95vh] overflow-y-auto w-full max-w-[521px] flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_16px_32px_-8px_rgba(12,12,13,0.4)] font-['Manrope'] animate-in scale-in-95 duration-100">
        <h2 className="text-[18px] font-semibold leading-[25px] text-[#29343D]">
          Are you sure you want to delete this Lead?
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold leading-[19px] text-[#29343D]">
            Reason for deletion *
          </label>

          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason"
            className="h-[42px] w-full rounded border border-[#E0E6EB] bg-white px-3 text-[14px] leading-5 text-[#29343D] placeholder:text-[#98A4AE] outline-none"
          />
        </div>

        <div className="flex justify-end gap-[10px]">
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-[72px] rounded-lg bg-[#F6F7F9] text-[12px] font-medium leading-4 text-[#0A2540] hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(reason)}
            className="h-9 w-[99px] rounded-lg bg-[#FFE5ED] text-[12px] font-medium leading-4 text-[#FF6692] hover:bg-red-100 transition-colors"
          >
            Delete Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeadModal;