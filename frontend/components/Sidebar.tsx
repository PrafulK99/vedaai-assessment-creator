import React from "react";
import { Grid3x3, Users, FileText, Zap, Clock, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-65 bg-white rounded-[24px] shadow-sm flex flex-col h-[calc(100vh-24px)] fixed left-3 top-3 z-50 overflow-hidden">
      {/* Logo Section */}
      <div className="pt-6 pb-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-linear-to-br from-orange-600 to-red-600 rounded-xl flex shrink-0 items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <span className="text-white font-bold text-lg relative z-10">V</span>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">VedaAI</span>
        </div>
      </div>

      {/* Create Assignment Button */}
      <div className="px-5 mb-4 mt-2">
        <Link href="/create" className="w-full bg-[#1c1c1c] border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:bg-black text-white text-sm font-medium py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all">
          <Sparkles className="w-4 h-4 text-white" />
          Create Assignment
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="px-4 space-y-1">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Grid3x3 className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          {/* My Groups */}
          <Link
            href="/groups"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">My Groups</span>
          </Link>

          {/* Assignments - Active */}
          <Link
            href="/assignments"
            className="flex items-center gap-3 px-4 py-3 text-gray-900 bg-gray-100 rounded-xl transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Assignments</span>
          </Link>

          {/* AI Teacher's Toolkit */}
          <Link
            href="/toolkit"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">AI Teacher's Toolkit</span>
          </Link>

          {/* My Library */}
          <Link
            href="/library"
            className="flex items-center justify-between px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">My Library</span>
            </div>
            <span className="bg-[#ff5500] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">32</span>
          </Link>
        </div>
      </nav>

      {/* Settings and School Info */}
      <div className="p-4 space-y-2 mt-auto">
        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        {/* School Info */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
          <div className="w-10 h-10 bg-[#fce0cc] rounded-full shrink-0 flex items-center justify-center overflow-hidden">
             {/* Note: In a real app this would be an image, acting as placeholder */}
             <span className="text-[#d87040] text-lg font-bold">👩‍🏫</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 leading-tight">Delhi Public School</p>
            <p className="text-[10px] text-gray-500 truncate mt-0.5">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </div>
  );
}
