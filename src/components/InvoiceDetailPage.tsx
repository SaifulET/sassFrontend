"use client";

import React from "react";

// Solar:alt-arrow-left-line-duotone Chevron Left Icon
const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

// Tabler:download Icon
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface InvoiceDetailPageProps {
  invoice?: any;
  salon?: any;
  record?: any;
  onBack: () => void;
}

export default function InvoiceDetailPage({ invoice, salon, record, onBack }: InvoiceDetailPageProps) {
  // Extract values with sensible fallback defaults matching the INV-2024-001 mockup
  const invoiceNumber = invoice?.id || record?.invoice || "INV-2024-001";
  const issueDate = invoice?.date || record?.billingDate || "11/30/2024";
  const expirationDate = record?.dueDate || "12/14/2024";
  const clientName = salon?.name || record?.salon || "Bella Vista Salon";
  const clientEmail = salon?.email || record?.email || "amministrazione@pec.bellavistasalon.it";
  const clientCity = salon?.city || record?.city || "Turin";

  // Financial breakdown values (matching the € 299.00 totals)
  const unitPrice = "€ 245.08";
  const vatRate = "22%";
  const taxableAmount = "€ 245.08";
  const vatAmount = "€ 53.92";
  const totalAmount = "€ 299.00";

  return (
    <div 
      className="flex flex-col gap-6 w-full text-left animate-in fade-in duration-300 font-sans pb-10" 
      style={{
        padding: "24px",
        background: "#F4F7FB",
        borderRadius: "20px",
      }}
    >
      
      {/* 1. Header Card (title) */}
      <div 
        className="flex flex-row justify-between items-center w-full print:border-none print:shadow-none"
        style={{
          padding: "16px 24px",
          background: "#FFFFFF",
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          borderRadius: "12px",
        }}
      >
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center border border-[#E0E6EB] hover:bg-slate-50 transition-all print:hidden"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
            }}
            title="Back"
          >
            <ChevronLeftIcon />
          </button>
          
          <div className="flex flex-col justify-center items-start">
            <h1 
              style={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#29343D",
              }}
            >
              Electronic Invoice - {invoiceNumber}
            </h1>
            <span 
              style={{
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "20px",
                color: "#98A4AE",
              }}
            >
              Italian Fiscal Invoice
            </span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex flex-row justify-center items-center gap-2.5 transition-all print:hidden cursor-pointer"
          style={{
            padding: "10px 16px",
            width: "152px",
            height: "44px",
            background: "#DDDBFF",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <DownloadIcon />
          <span
            style={{
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#635BFF",
            }}
          >
            Download PDF
          </span>
        </button>
      </div>

      {/* 2. Electronic Invoice Card (details) */}
      <div 
        className="flex flex-col items-start w-full"
        style={{
          padding: "30px",
          gap: "16px",
          background: "#FFFFFF",
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          borderRadius: "12px",
        }}
      >
        <h2 
          style={{
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: "22px",
            lineHeight: "26px",
            color: "#29343D",
            marginBottom: "4px",
          }}
        >
          Eletronic Invoice
        </h2>
        
        <div className="flex flex-row flex-wrap items-start w-full gap-6">
          {/* Card 1: Number */}
          <div 
            className="flex flex-col justify-center items-start flex-1 min-w-[240px]"
            style={{
              boxSizing: "border-box",
              padding: "30px",
              gap: "12px",
              height: "125px",
              background: "#FFFFFF",
              border: "1px solid #E0E6EB",
              boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
              {invoiceNumber}
            </span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#98A4AE" }}>
              Number
            </span>
          </div>

          {/* Card 2: Issue Date */}
          <div 
            className="flex flex-col justify-center items-start flex-1 min-w-[240px]"
            style={{
              boxSizing: "border-box",
              padding: "30px",
              gap: "12px",
              height: "125px",
              background: "#FFFFFF",
              border: "1px solid #E0E6EB",
              boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
              {issueDate}
            </span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#98A4AE" }}>
              Issue Date
            </span>
          </div>

          {/* Card 3: Expiration Date */}
          <div 
            className="flex flex-col justify-center items-start flex-1 min-w-[240px]"
            style={{
              boxSizing: "border-box",
              padding: "30px",
              gap: "12px",
              height: "125px",
              background: "#FFFFFF",
              border: "1px solid #E0E6EB",
              boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
              {expirationDate}
            </span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#98A4AE" }}>
              Expiration Date
            </span>
          </div>

          {/* Card 4: Tax Document (blue light bg) */}
          <div 
            className="flex flex-col justify-center items-start flex-1 min-w-[240px]"
            style={{
              padding: "30px",
              gap: "12px",
              height: "125px",
              background: "#EFF4FA",
              boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
              Art. 21 DPR 633/72
            </span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "15px", lineHeight: "20px", color: "#98A4AE" }}>
              Tax Document
            </span>
          </div>
        </div>
      </div>

      {/* 3. Provider & Client Details Cards */}
      <div className="flex flex-row flex-wrap items-start w-full gap-6">
        {/* Left: Transferor/Provider */}
        <div 
          className="flex-1 min-w-[320px] flex flex-col justify-between"
          style={{
            boxSizing: "border-box",
            padding: "30px",
            gap: "30px",
            background: "#FFFFFF",
            border: "1px solid #E0E6EB",
            borderRadius: "12px",
            minHeight: "353px",
          }}
        >
          <h2 
            style={{
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "22px",
              lineHeight: "26px",
              color: "#29343D",
            }}
          >
            Transferor/Provider
          </h2>
          
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h3 style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
                SalonFlow S.r.l.
              </h3>
              <p style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#526B7A" }}>
                Via Roma, 123 <br />
                20121 Milan (MI) - Italy
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row items-start gap-6 w-full">
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>P.IVA</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>IT12345678901</span>
                </div>
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Tax Code</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>12345678901</span>
                </div>
              </div>

              <div className="flex flex-row items-start gap-6 w-full">
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>PEC</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block", overflowWrap: "break-word" }}>amministrazione@pec.salonflow.it</span>
                </div>
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Recipient Code</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>XXXXXXX</span>
                </div>
              </div>

              <div className="flex flex-row items-start gap-6 w-full">
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Telephone</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>+39 02 1234567</span>
                </div>
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Email</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block", overflowWrap: "break-word" }}>fatturazione@salonflow.it</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Transferee/Client */}
        <div 
          className="flex-1 min-w-[320px] flex flex-col justify-between"
          style={{
            boxSizing: "border-box",
            padding: "30px",
            gap: "30px",
            background: "#FFFFFF",
            border: "1px solid #E0E6EB",
            borderRadius: "12px",
            minHeight: "353px",
          }}
        >
          <h2 
            style={{
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "22px",
              lineHeight: "26px",
              color: "#29343D",
            }}
          >
            Transferee/Client
          </h2>
          
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h3 style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
                {clientName}
              </h3>
              <p style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#526B7A" }}>
                Via Esempio, 456 <br />
                10100 {clientCity} (TO) - Italy
              </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row items-start gap-6 w-full">
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>P.IVA</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>IT98765432109</span>
                </div>
                <div className="flex-1">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Tax Code</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>98765432109</span>
                </div>
              </div>

              <div className="flex flex-row items-start gap-6 w-full">
                <div className="flex-grow">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>PEC</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block", overflowWrap: "break-word" }}>{clientEmail}</span>
                </div>
              </div>

              <div className="flex flex-row items-start gap-6 w-full">
                <div className="flex-grow">
                  <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Recipient Code</span>
                  <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "0.5px", display: "block" }}>YYYYYYY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Performance Details Table */}
      <div 
        className="flex flex-col items-start w-full"
        style={{
          padding: "30px",
          gap: "16px",
          background: "#FFFFFF",
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          borderRadius: "12px",
        }}
      >
        <h2 
          style={{
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: "22px",
            lineHeight: "26px",
            color: "#29343D",
          }}
        >
          Performance Details
        </h2>

        <div 
          className="w-full overflow-x-auto"
          style={{
            border: "1px solid #E0E6EB",
            borderRadius: "12px",
          }}
        >
          <table className="w-full border-collapse text-left" style={{ minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#F3F3FF" }}>
                <th 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#29343D",
                    width: "55%",
                  }}
                >
                  Description
                </th>
                <th 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#29343D",
                    textAlign: "center",
                  }}
                >
                  Amount
                </th>
                <th 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#29343D",
                  }}
                >
                  Plan
                </th>
                <th 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#29343D",
                  }}
                >
                  Unit price
                </th>
                <th 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#29343D",
                  }}
                >
                  VAT rate
                </th>
                <th 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#29343D",
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody style={{ background: "#FFFFFF" }}>
              <tr style={{ height: "152px" }}>
                <td 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    verticalAlign: "middle",
                  }}
                >
                  <div className="flex flex-row items-center gap-3">
                    <img 
                      src="/ball.png" 
                      alt="Avatar" 
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="flex flex-col items-start justify-center">
                      <span 
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "19px",
                          color: "#29343D",
                        }}
                      >
                        SalonFlow Membership - Premium Plan
                      </span>
                      <span 
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#999999",
                          marginTop: "2px",
                        }}
                      >
                        Salon Management Software - Period: November 30, 2024 - December 14, 2024
                      </span>
                      <span 
                        style={{
                          fontFamily: "Manrope",
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#999999",
                          marginTop: "2px",
                        }}
                      >
                        Item code: SF- PREMIUM -2025
                      </span>
                    </div>
                  </div>
                </td>
                
                <td 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#29343D",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  1
                </td>

                <td 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    verticalAlign: "middle",
                  }}
                >
                  <div 
                    className="flex flex-row justify-center items-center"
                    style={{
                      padding: "4px 8px",
                      background: "#D2F4F2",
                      borderRadius: "8px",
                      width: "fit-content",
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: "Manrope",
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#29343D",
                      }}
                    >
                      Premium
                    </span>
                  </div>
                </td>

                <td 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#29343D",
                    verticalAlign: "middle",
                  }}
                >
                  {unitPrice}
                </td>

                <td 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#29343D",
                    verticalAlign: "middle",
                  }}
                >
                  {vatRate}
                </td>

                <td 
                  style={{
                    boxSizing: "border-box",
                    padding: "14px",
                    borderBottom: "1px solid #E0E6EB",
                    borderLeft: "1px solid #E0E6EB",
                    fontFamily: "Manrope",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#29343D",
                    verticalAlign: "middle",
                  }}
                >
                  {taxableAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. VAT Summary Table & Document Totals */}
      <div className="flex flex-row flex-wrap items-start w-full gap-6">
        {/* Left: VAT Summary */}
        <div 
          className="flex-1 min-w-[320px] flex flex-col justify-between"
          style={{
            boxSizing: "border-box",
            padding: "30px",
            gap: "16px",
            background: "#FFFFFF",
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
            borderRadius: "12px",
            minHeight: "254px",
          }}
        >
          <h2 
            style={{
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "22px",
              lineHeight: "26px",
              color: "#29343D",
            }}
          >
            VAT Summary
          </h2>

          <div 
            className="w-full overflow-hidden"
            style={{
              border: "1px solid #E0E6EB",
              borderRadius: "12px",
            }}
          >
            <table className="w-full border-collapse text-left">
              <thead>
                <tr style={{ background: "#F3F3FF" }}>
                  <th 
                    style={{
                      boxSizing: "border-box",
                      padding: "14px",
                      borderBottom: "1px solid #E0E6EB",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#29343D",
                    }}
                  >
                    Rate
                  </th>
                  <th 
                    style={{
                      boxSizing: "border-box",
                      padding: "14px",
                      borderBottom: "1px solid #E0E6EB",
                      borderLeft: "1px solid #E0E6EB",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#29343D",
                    }}
                  >
                    Taxable
                  </th>
                  <th 
                    style={{
                      boxSizing: "border-box",
                      padding: "14px",
                      borderBottom: "1px solid #E0E6EB",
                      borderLeft: "1px solid #E0E6EB",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#29343D",
                    }}
                  >
                    IVA
                  </th>
                </tr>
              </thead>
              <tbody style={{ background: "#FFFFFF" }}>
                <tr style={{ height: "76px" }}>
                  <td 
                    style={{
                      boxSizing: "border-box",
                      padding: "14px",
                      fontFamily: "Manrope",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#29343D",
                      verticalAlign: "middle",
                    }}
                  >
                    {vatRate}
                  </td>
                  <td 
                    style={{
                      boxSizing: "border-box",
                      padding: "14px",
                      borderLeft: "1px solid #E0E6EB",
                      fontFamily: "Manrope",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#29343D",
                      verticalAlign: "middle",
                    }}
                  >
                    {taxableAmount}
                  </td>
                  <td 
                    style={{
                      boxSizing: "border-box",
                      padding: "14px",
                      borderLeft: "1px solid #E0E6EB",
                      fontFamily: "Manrope",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#29343D",
                      verticalAlign: "middle",
                    }}
                  >
                    {vatAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Document Totals */}
        <div 
          className="flex-1 min-w-[320px] flex flex-col justify-between"
          style={{
            boxSizing: "border-box",
            padding: "30px",
            gap: "16px",
            background: "#FFFFFF",
            boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
            borderRadius: "12px",
            minHeight: "254px",
          }}
        >
          <h2 
            style={{
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "22px",
              lineHeight: "26px",
              color: "#29343D",
            }}
          >
            Document Totals
          </h2>

          <div className="flex flex-col gap-4 w-full pt-2">
            <div className="flex justify-between items-center w-full">
              <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#526B7A" }}>
                Total Taxable Amount
              </span>
              <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "16px", lineHeight: "22px", color: "#29343D" }}>
                {taxableAmount}
              </span>
            </div>
            
            <div className="flex justify-between items-center w-full">
              <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#526B7A" }}>
                Total VAT
              </span>
              <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "16px", lineHeight: "22px", color: "#29343D" }}>
                {vatAmount}
              </span>
            </div>
            
            <div style={{ height: "1px", background: "#E0E6EB", margin: "4px 0" }} />
            
            <div className="flex justify-between items-center w-full">
              <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: "18px", lineHeight: "25px", color: "#29343D" }}>
                Document Total
              </span>
              <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: "20px", lineHeight: "28px", color: "#635BFF" }}>
                {totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Payment Methods */}
      <div 
        className="flex flex-col items-start w-full"
        style={{
          padding: "30px",
          gap: "24px",
          background: "#FFFFFF",
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          borderRadius: "12px",
        }}
      >
        <h2 
          style={{
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: "22px",
            lineHeight: "26px",
            color: "#29343D",
          }}
        >
          Payment Methods
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full pt-1">
          <div>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Mode</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "2px", display: "block" }}>Credit Card</span>
          </div>
          <div>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Payment Date</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "2px", display: "block" }}>12/02/2024</span>
          </div>
          <div>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Deadline</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "2px", display: "block" }}>12/14/2024</span>
          </div>
          <div>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Amount Paid</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: "15px", lineHeight: "20px", color: "#29343D", marginTop: "2px", display: "block" }}>{totalAmount}</span>
          </div>
          <div>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999", display: "block" }}>Status</span>
            <div className="mt-1">
              <div 
                className="flex flex-row justify-center items-center"
                style={{
                  padding: "4px 8px",
                  background: "#E6FBF2",
                  borderRadius: "8px",
                  width: "fit-content",
                }}
              >
                <span 
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#10B981",
                  }}
                >
                  Paid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Legal Notes */}
      <div 
        className="flex flex-col items-start w-full"
        style={{
          padding: "30px",
          gap: "16px",
          background: "#FFFFFF",
          boxShadow: "0px 2px 4px -1px rgba(175, 182, 201, 0.2)",
          borderRadius: "12px",
        }}
      >
        <h2 
          style={{
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: "22px",
            lineHeight: "26px",
            color: "#29343D",
          }}
        >
          Legal Notes
        </h2>
        <ul className="flex flex-col gap-2 text-[12px] font-medium text-slate-450 leading-relaxed list-none pl-0 w-full">
          <li className="flex gap-2.5 items-start">
            <span className="text-[#9aa7b8] text-sm">•</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999" }}>
              Invoice issued pursuant to art. 21 of Presidential Decree 26 October 1972, n. 633 and subsequent amendments.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-[#9aa7b8] text-sm">•</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999" }}>
              VAT paid by the purchaser pursuant to art. 17, paragraph 6, of Presidential Decree 26 October 1972, n. 633.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-[#9aa7b8] text-sm">•</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999" }}>
              Digitally signed electronic document pursuant to Legislative Decree 82/2005.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-[#9aa7b8] text-sm">•</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999" }}>
              Replacement storage of documents pursuant to the Ministerial Decree of 17 June 2014.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-[#9aa7b8] text-sm">•</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999" }}>
              Competent court: Milan. Applicable law: Italian.
            </span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="text-[#9aa7b8] text-sm">•</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#999999" }}>
              Company subject to the management and coordination of [Holding Company].
            </span>
          </li>
        </ul>
      </div>

      {/* 8. Administrative Footer */}
      <div 
        className="text-center text-[11px] font-semibold text-slate-400 mt-2 flex flex-col gap-1 leading-normal w-full"
        style={{
          color: "#98A4AE",
          fontFamily: "Manrope",
        }}
      >
        <p>SalonFlow Srl - Via Roma, 123 - 20121 Milan (MI) - VAT number: IT12345678901</p>
        <p>Share Capital: € 10,000.00 iv - REA MI-1234567 - SDI Code: XXXXXXX</p>
        <p>
          <a href="https://www.salonflow.it" target="_blank" rel="noreferrer" className="hover:text-[#635BFF] transition-colors">www.salonflow.it</a>
          {" - "}
          <a href="mailto:info@salonflow.it" className="hover:text-[#635BFF] transition-colors">info@salonflow.it</a>
          {" - Tel: +39 02 1234567"}
        </p>
      </div>

    </div>
  );
}
