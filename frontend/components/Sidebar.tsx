import React from "react";
import { Grid3x3, Users, FileText, Zap, Clock, Settings } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-xl text-gray-900">VedaAI</span>
        </div>
      </div>

      {/* Create Assignment Button */}
      <div className="px-4 py-4 border-b border-gray-100">
        <button className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Assignment
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Grid3x3 className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          {/* My Groups */}
          <Link
            href="/groups"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">My Groups</span>
          </Link>

          {/* Assignments - Active */}
          <Link
            href="/assignments"
            className="flex items-center gap-3 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Assignments</span>
          </Link>

          {/* AI Teacher's Toolkit */}
          <Link
            href="/toolkit"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">AI Teacher's Toolkit</span>
          </Link>

          {/* My Library */}
          <Link
            href="/library"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">My Library</span>
          </Link>
        </div>
      </nav>

      {/* Settings and School Info */}
      <div className="border-t border-gray-100 p-3 space-y-3">
        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        {/* School Info */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-10 h-10 bg-linear-to-br from-orange-300 to-orange-400 rounded-full shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">Delhi Public School</p>
            <p className="text-xs text-gray-500 truncate">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </div>
  );
}
