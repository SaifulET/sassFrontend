"use client";

import React from "react";

// Back arrow icon
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// Download icon
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
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

interface Invoice {
  id: string;
  date: string;
  description: string;
  billingMonth: string;
  amount: string;
  method: string;
  status: string;
  employmentStatus: string;
}

interface InvoiceDetailPageProps {
  invoice: Invoice;
  salon: Salon;
  onBack: () => void;
}

export default function InvoiceDetailPage({ invoice, salon, onBack }: InvoiceDetailPageProps) {
  // Hardcoded values from the screenshot
  const senderInfo = {
    companyName: "SalonFlow S.r.l.",
    address1: "Via Milano 123",
    address2: "20121 Milan (MI)",
    piva: "P.IVA: IT12345678901"
  };

  const recipientInfo = {
    name: salon.name,
    manager: salon.manager || "Roberto Marini",
    address1: "Independence Street 567",
    address2: `${salon.city || "Bologna"}, Italy`,
    piva: "P.IVA: IT12345678901",
    taxCode: "Tax Code: RSSMRA85M01H501Z"
  };

  const invoiceDetails = {
    invoiceDate: invoice.date,
    expirationDate: "December 30, 2024",
    paymentMethod: invoice.method,
    state: invoice.status
  };

  const serviceDetails = {
    descriptionTitle: "Premium Plan - December 2024",
    descriptionSubtitle: "Premium Plan - Monthly Subscription",
    amount: 1,
    unitPrice: "€ 245.08",
    total: "€ 245.08"
  };

  const financialBreakdown = {
    taxable: "€ 245.08",
    iva: "€ 53.92",
    total: "€ 299.00"
  };

  const paymentInformation = {
    iban: "IT60 X054 2811 1010 0000 0123 456",
    bic: "BPPIITRR",
    reason: `Invoice # ${invoice.id}`
  };

  const noteInfo = {
    text1: "Payment within 30 days from the date of issue.",
    text2: "Invoice issued pursuant to Presidential Decree 633/72 and subsequent amendments."
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full text-left">
      {/* Top Invoice ID Bar Card */}
      <div className="bg-white rounded-2xl border border-[#eef2f6] shadow-sm px-6 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors inline-flex text-slate-500 hover:text-slate-800"
            title="Back to Billing History"
          >
            <ArrowLeftIcon />
          </button>
          <span className="text-sm font-bold text-slate-800">
            Invoice # {invoice.id}
          </span>
        </div>
        <button
          onClick={() => alert("Downloading PDF...")}
          className="flex items-center gap-2 px-4 py-2 bg-[#f2f1ff] hover:bg-[#e4e2ff] text-[#5e53fc] rounded-xl text-xs font-semibold transition-all shadow-sm"
        >
          <DownloadIcon />
          <span>Download PDF</span>
        </button>
      </div>

      {/* SalonFlow S.r.l. Header Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-1">{senderInfo.companyName}</h2>
        <p className="text-slate-400 text-xs font-semibold">{senderInfo.address1}</p>
        <p className="text-slate-400 text-xs font-semibold mt-0.5">{senderInfo.address2}</p>
        <p className="text-slate-400 text-[10px] font-bold tracking-wider text-slate-400/80 uppercase mt-1">{senderInfo.piva}</p>
      </div>

      {/* Two Column details row: Turnover to & Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Turnover to */}
        <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#2c3a50]">Turnover to</h3>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-slate-800">{recipientInfo.name}</h4>
            <p className="text-slate-500 text-xs font-medium">{recipientInfo.manager}</p>
            <p className="text-slate-500 text-xs font-medium">{recipientInfo.address1}</p>
            <p className="text-slate-500 text-xs font-medium">{recipientInfo.address2}</p>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">{recipientInfo.piva}</p>
            <p className="text-slate-400 text-[10px] font-bold uppercase">{recipientInfo.taxCode}</p>
          </div>
        </div>

        {/* Right Card: Invoice Details */}
        <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#2c3a50]">Invoice Details</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Invoice Date</span>
              <span className="text-xs font-bold text-slate-800">{invoiceDetails.invoiceDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Expiration Date</span>
              <span className="text-xs font-bold text-slate-800">{invoiceDetails.expirationDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Payment Method</span>
              <span className="text-xs font-bold text-slate-800">{invoiceDetails.paymentMethod}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">State</span>
              <div>
                <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[#10b981] text-white uppercase tracking-wider inline-block">
                  {invoiceDetails.state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col gap-6">
        <h3 className="text-base font-bold text-[#2c3a50]">Service Details</h3>
        
        <div className="border border-slate-100 rounded-2xl overflow-hidden w-full bg-white">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#f5f4ff] border-b border-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                <th className="px-6 py-4 w-1/2">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Unit price</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 font-semibold">
              <tr className="border-b border-slate-100">
                <td className="px-6 py-5 flex flex-col gap-1">
                  <span className="font-bold text-slate-800">{serviceDetails.descriptionTitle}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{serviceDetails.descriptionSubtitle}</span>
                </td>
                <td className="px-6 py-5 text-slate-700 font-medium">{serviceDetails.amount}</td>
                <td className="px-6 py-5 text-slate-700 font-medium">{serviceDetails.unitPrice}</td>
                <td className="px-6 py-5 text-slate-800 font-bold">{serviceDetails.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Breakdown Card */}
      <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Taxable</span>
          <span className="text-slate-800 font-bold">{financialBreakdown.taxable}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>IVA (22%)</span>
          <span className="text-slate-800 font-bold">{financialBreakdown.iva}</span>
        </div>
        <div className="h-px bg-slate-100 my-1" />
        <div className="flex justify-between items-center text-sm font-bold text-slate-800">
          <span>Total</span>
          <span className="text-lg font-black text-slate-900">{financialBreakdown.total}</span>
        </div>
      </div>

      {/* Two Column row: Payment Information & Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Payment Information */}
        <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col gap-5">
          <h3 className="text-base font-bold text-[#2c3a50]">Payment Information</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">IBAN</span>
              <span className="text-xs font-bold text-slate-800">{paymentInformation.iban}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">BIC</span>
              <span className="text-xs font-bold text-slate-800">{paymentInformation.bic}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Reason</span>
              <span className="text-xs font-bold text-slate-800">{paymentInformation.reason}</span>
            </div>
          </div>
        </div>

        {/* Right Card: Note */}
        <div className="bg-white rounded-3xl border border-[#eef2f6] shadow-[0_2px_4px_-1px_rgba(175,182,201,0.08)] p-8 flex flex-col gap-5">
          <h3 className="text-base font-bold text-[#2c3a50]">Note</h3>
          <div className="flex flex-col gap-3 text-xs font-medium text-slate-500 leading-relaxed">
            <p>{noteInfo.text1}</p>
            <p>{noteInfo.text2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
