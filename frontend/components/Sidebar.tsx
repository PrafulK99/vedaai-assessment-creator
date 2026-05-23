import React from "react";
import { LayoutGrid, Users, FileText, Smartphone, Clock, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside
      className="w-[280px] bg-sidebar-bg rounded-[32px] p-2 shrink-0 flex"
      data-purpose="sidebar-outer"
    >
      {/* Inner white panel */}
      <div
        className="bg-white rounded-3xl w-full flex flex-col shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),4px_0_15px_rgba(0,0,0,0.05)] overflow-hidden"
        data-purpose="sidebar-inner"
      >
        {/* Top Section: Logo + CTA */}
        <div className="px-6 pt-6 pb-2 flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 cursor-pointer">
            <img 
              src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png" 
              alt="VedaAI Logo" 
              className="w-10 h-10 rounded-xl object-contain shadow-sm"
            />
            <span className="text-[22px] font-bold text-[#111827] tracking-tight">VedaAI</span>
          </div>

          {/* Create Assignment Button */}
          <Link
            href="/create"
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] text-white flex items-center justify-center gap-2 font-medium text-[15px] shadow-[0_0_0_2px_#f97316] hover:from-[#3A3A3A] hover:to-[#2A2A2A] transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Create Assignment
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors duration-150 font-medium text-[15px]"
          >
            <LayoutGrid className="w-5 h-5" />
            Home
          </Link>
          <Link
            href="/groups"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors duration-150 font-medium text-[15px]"
          >
            <Users className="w-5 h-5" />
            My Groups
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F3F4F6] text-[#111827] transition-colors duration-150"
          >
            <FileText className="w-5 h-5" />
            <span className="font-semibold text-[15px]">Assignments</span>
          </Link>
          <Link
            href="/toolkit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors duration-150 font-medium text-[15px]"
          >
            <Smartphone className="w-5 h-5" />
            AI Teacher&apos;s Toolkit
          </Link>
          <Link
            href="/library"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors duration-150 font-medium text-[15px]"
          >
            <Clock className="w-5 h-5" />
            My Library
          </Link>
        </nav>

        {/* Bottom Section: Settings + Profile */}
        <div className="p-4 flex flex-col gap-2 mt-auto">
          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors duration-150 font-medium text-[15px] mb-2"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>

          {/* School Profile Card */}
          <div className="bg-[#F3F4F6] rounded-2xl p-3 flex items-center gap-3 cursor-pointer hover:bg-[#E5E7EB] transition-colors duration-150">
            <img
              alt="Delhi Public School Avatar"
              className="w-12 h-12 rounded-full object-cover shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNTnHtzsKU40MDIvN7n4igIs35HZtO_ovK9xMwP9kMOXl_xGCsn88iUxRSsB0UsrSs8wshb24zMf-jbS0wsaJi4nkTzUpA8oocb6RmS8G64yntrUNhf2fU4HITcLdBHSza46peNSvImIokaP3ZmMiOtyTgRTapiIfSdR8ayMRqmRSypE1pkO9PbT7QO_iu9L_HI8brT0_Huilu6lfQ7rfHJ_ZzkArJtB0CyuOjZ-MhEmO-mrV6YRWWZ2XKpSiqOOkcTqJFRHuaLnw"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[#111827] font-bold text-[14px] leading-tight truncate">Delhi Public School</span>
              <span className="text-[#6B7280] text-[13px] truncate">Bokaro Steel City</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
