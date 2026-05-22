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
    <div className="fixed top-0 left-80 right-0 bg-gray-100 border-b border-gray-200 px-8 py-4 flex items-center justify-between h-16 z-40">
      {/* Left Section - Back Button and Title */}
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}
        {title && (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-gray-500 text-sm font-medium">{title}</span>
          </div>
        )}
      </div>

      {/* Right Section - Notification and Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-linear-to-br from-orange-300 to-orange-400 rounded-full shrink-0" />
          <span className="text-sm font-medium text-gray-900">John Doe</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
