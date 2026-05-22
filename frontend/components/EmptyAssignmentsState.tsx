import React from "react";
import { Search } from "lucide-react";

export function EmptyAssignmentsState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      {/* Illustration */}
      <div className="mb-8 w-64 h-64 flex items-center justify-center">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circles - decorative */}
          <circle cx="150" cy="150" r="120" fill="none" stroke="#ECFDF5" strokeWidth="2" />
          <circle cx="150" cy="150" r="100" fill="none" stroke="#E0E7FF" strokeWidth="1.5" strokeDasharray="4,4" />

          {/* Document - left side */}
          <g transform="translate(40, 60)">
            <rect x="0" y="0" width="70" height="100" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="2" />
            <line x1="12" y1="18" x2="58" y2="18" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="38" x2="58" y2="38" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="58" x2="48" y2="58" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="78" x2="48" y2="78" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Chat bubble - top right */}
          <g transform="translate(180, 40)">
            <rect x="0" y="0" width="60" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
            <path d="M 15 40 L 22 50 L 25 40" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
            <line x1="8" y1="12" x2="28" y2="12" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="25" x2="52" y2="25" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Magnifying glass - center */}
          <g transform="translate(110, 120)">
            <circle cx="30" cy="30" r="35" fill="none" stroke="#D8B4FE" strokeWidth="3" />
            <line x1="60" y1="60" x2="85" y2="85" stroke="#D8B4FE" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* X mark inside magnifying glass */}
          <g transform="translate(130, 140)">
            <line x1="0" y1="0" x2="24" y2="24" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <line x1="24" y1="0" x2="0" y2="24" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Decorative elements */}
          <circle cx="220" cy="90" r="4" fill="#60A5FA" />
          <circle cx="80" cy="200" r="3" fill="#34D399" />
          
          {/* Curved line - decorative */}
          <path d="M 60 80 Q 70 60 90 75" fill="none" stroke="#F3E8FF" strokeWidth="2" strokeLinecap="round" />
          
          {/* Small dots */}
          <circle cx="150" cy="90" r="2" fill="#FCA5A5" />
          <circle cx="200" cy="200" r="2" fill="#BFDBFE" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">No assignments yet</h1>

      {/* Description */}
      <p className="text-gray-500 text-center max-w-xl mb-10 leading-relaxed text-base">
        Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>

      {/* CTA Button */}
      <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create Your First Assignment
      </button>
    </div>
  );
}
