"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  trendType?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: any;
  iconBgClass: string;
  iconColor: string;
  onViewClick?: () => void;
  bgGradient?: string;
}

export default function StatCard({
  title,
  value,
  subtext,
  trendType = "neutral",
  trendValue,
  icon,
  iconBgClass,
  iconColor,
  onViewClick,
  bgGradient
}: StatCardProps) {
  return (
    <div 
      className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-md border border-slate-100/50 flex flex-col justify-between"
      style={{
        height: "224px",
        padding: "24px",
        gap: "12px",
        background: bgGradient || "#FFFFFF",
        borderRadius: "12px",
        boxSizing: "border-box"
      }}
    >
      {/* Frame 1000003732 */}
      <div className="flex flex-col justify-center items-start p-0 gap-4 w-full">
        {/* Frame 1000003729 */}
        <div className="flex flex-row items-center p-0 gap-2 w-full">
          {/* Icon */}
          {typeof icon === "string" ? (
            <img src={icon} alt="" className="w-10 h-10 object-contain shrink-0" />
          ) : (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass}`}>
              <HugeiconsIcon icon={icon} size={20} color={iconColor} />
            </div>
          )}
          
          {/* Title */}
          <span 
            className="text-left font-sans"
            style={{
              width: "124.6px",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "18px",
              color: "#29343D",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {title}
          </span>
        </div>

        {/* Frame 1000003730 */}
        <div className="flex flex-col justify-center items-start p-0 gap-2 w-full">
          {/* Value */}
          <span 
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "120%",
              color: "#29343D"
            }}
          >
            {value}
          </span>

          {/* Subtext */}
          <span 
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "16px",
              color: "#29343D"
            }}
          >
            {trendValue ? `${trendValue} ` : ""}{subtext}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onViewClick}
        className="flex flex-row justify-center items-center px-4 gap-1 bg-white hover:bg-slate-50 transition-colors"
        style={{
          width: "117px",
          height: "36px",
          boxShadow: "0px 6px 24.2px -10px rgba(41, 52, 61, 0.22)",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "20px",
            color: "#29343D"
          }}
        >
          View Analytics
        </span>
      </button>
    </div>
  );
}
