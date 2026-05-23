import React from "react";
import { Plus } from "lucide-react";

export function EmptyAssignmentsState({ onAction }: { onAction?: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-20">
      {/* Illustration */}
      <div className="mb-6 w-64 h-64 flex items-center justify-center relative">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large soft background circle */}
          <circle cx="100" cy="100" r="75" fill="#f1f5f9" />

          {/* Squiggly line - top left */}
          <path
            d="M 45 90 C 55 90, 65 75, 55 65 C 45 55, 30 75, 45 85"
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Document center */}
          <rect x="75" y="55" width="50" height="70" rx="8" fill="white" />
          
          {/* Document lines */}
          {/* Header line - black */}
          <rect x="85" y="68" width="22" height="4" rx="2" fill="#111827" />
          
          {/* Other lines - light gray */}
          <rect x="85" y="80" width="30" height="4" rx="2" fill="#e2e8f0" />
          <rect x="85" y="92" width="30" height="4" rx="2" fill="#e2e8f0" />
          <rect x="85" y="104" width="20" height="4" rx="2" fill="#e2e8f0" />
          <rect x="85" y="116" width="24" height="4" rx="2" fill="#e2e8f0" />

          {/* Small floating rect top right */}
          <rect x="135" y="45" width="25" height="15" rx="4" fill="white" />
          <circle cx="143" cy="52.5" r="2.5" fill="#cbd5e1" />
          <rect x="149" y="50.5" width="7" height="4" rx="2" fill="#cbd5e1" />

          {/* Magnifying glass */}
          <g transform="translate(90, 75)">
            {/* Handle */}
            <rect
              x="38"
              y="38"
              width="12"
              height="28"
              rx="4"
              fill="#e2dcf4"
              transform="rotate(-45 44 52)"
            />
            {/* Glass frame */}
            <circle cx="28" cy="28" r="22" fill="white" stroke="#e2dcf4" strokeWidth="6" />
            
            {/* Red X inside glass */}
            <path
              d="M 18 18 L 38 38 M 38 18 L 18 38"
              stroke="#ef4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          {/* 4-point star bottom left */}
          <path
            d="M 60 115 Q 65 115 65 110 Q 65 115 70 115 Q 65 115 65 120 Q 65 115 60 115"
            fill="#64748b"
          />

          {/* Small circle bottom right */}
          <circle cx="140" cy="100" r="3" fill="#64748b" />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-text-main mb-3 text-center">No assignments yet</h2>

      {/* Description */}
      <p className="text-text-muted text-center max-w-[420px] mb-8 leading-relaxed text-[15px]">
        Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>

      {/* CTA Button */}
      <button 
        onClick={onAction} 
        className="bg-[#1a1c23] hover:bg-black text-white font-medium py-3.5 px-7 rounded-full flex items-center justify-center gap-2 transition-transform transform hover:scale-105 active:scale-95 shadow-md"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
        Create Your First Assignment
      </button>
    </div>
  );
}
