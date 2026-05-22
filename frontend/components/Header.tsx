import React from "react";
import { ChevronLeft, Bell } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function Header({ title = "Assignment", showBackButton = true, onBackClick }: HeaderProps) {
  return (
    <div className="fixed top-0 left-71 right-0 bg-[#e4e4e4] px-8 py-4 flex items-center justify-between h-18 z-40">
      {/* Left Section - Back Button and Title */}
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        )}
        {title && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-gray-400 text-sm font-medium">{title}</span>
          </div>
        )}
      </div>

      {/* Right Section - Notification and Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2.5 hover:bg-gray-200 rounded-full transition-colors bg-white shadow-sm">
          <Bell className="w-4 h-4 text-gray-900" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#ff5500] rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-2 pr-4 pl-1 py-1 hover:bg-white/80 bg-white rounded-full transition-colors shadow-sm">
          <div className="w-7 h-7 bg-[#fce0cc] rounded-full shrink-0 flex items-center justify-center overflow-hidden">
             <span className="text-[#d87040] text-sm font-bold">🧔🏻</span>
          </div>
          <span className="text-[13px] font-bold text-gray-900">John Doe</span>
          <svg className="w-3.5 h-3.5 text-gray-900 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
