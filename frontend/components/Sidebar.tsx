import React, { useEffect } from "react";
import { LayoutGrid, Users, FileText, Smartphone, Clock, Settings, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (onClose) onClose();
  }, [pathname]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-[280px] bg-sidebar-bg rounded-none lg:rounded-[32px] p-2 shrink-0 flex flex-col h-full`}
      data-purpose="sidebar-outer"
    >
      {/* Close button for mobile */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 lg:hidden z-10 bg-white rounded-full shadow-md"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Inner white panel */}
      <div
        className="bg-white rounded-3xl w-full flex-1 flex flex-col shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06),4px_0_15px_rgba(0,0,0,0.05)] overflow-hidden"
        data-purpose="sidebar-inner"
      >
        {/* Top Section: Logo + CTA */}
        <div className="px-6 pt-6 pb-2 flex flex-col gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
            <img 
              src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png" 
              alt="VedaAI Logo" 
              className="w-10 h-10 rounded-xl object-contain shadow-sm"
            />
            <span className="text-[22px] font-bold text-[#111827] tracking-tight">VedaAI</span>
          </Link>

          {/* Create Assignment Button */}
          <MotionLink
            href="/create"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] text-white flex items-center justify-center gap-2 font-medium text-[15px] shadow-[0_0_0_2px_#f97316] hover:from-[#3A3A3A] hover:to-[#2A2A2A] transition-colors duration-200"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Create Assignment
          </MotionLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          {[
            { name: "Home", href: "/dashboard", icon: LayoutGrid },
            { name: "My Groups", href: "/groups", icon: Users },
            { name: "Assignments", href: "/dashboard", icon: FileText },
            { name: "AI Teacher's Toolkit", href: "/toolkit", icon: Smartphone },
            { name: "My Library", href: "/library", icon: Clock },
          ].map((item, index) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.name !== "Home" && item.name !== "Assignments") || (item.name === "Assignments" && (pathname === "/dashboard" || pathname === "/create" || pathname === "/output" || pathname === "/generate"));
            return (
              <MotionLink
                key={index}
                href={item.name === "Home" ? "/" : item.href}
                whileHover={{ x: 4, backgroundColor: "var(--color-gray-50)" }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[15px] ${
                  (item.name === "Home" && pathname === "/") || (item.name !== "Home" && (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))))
                    ? "bg-[#F3F4F6] text-[#111827] font-semibold shadow-sm"
                    : "text-[#6B7280] hover:text-[#111827] font-medium"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  (item.name === "Home" && pathname === "/") || (item.name !== "Home" && (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))))
                    ? "text-[#111827]"
                    : "text-[#9CA3AF] group-hover:text-[#6B7280]"
                }`} />
                <span>{item.name}</span>
              </MotionLink>
            );
          })}
        </nav>

        {/* Bottom Section: Settings + Profile */}
        <div className="p-4 flex flex-col gap-2 mt-auto">
          {/* Settings */}
          <MotionLink
            href="/settings"
            whileHover={{ x: 4, backgroundColor: "var(--color-gray-50)" }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[15px] mb-2 ${
              pathname.startsWith("/settings")
                ? "bg-[#F3F4F6] text-[#111827] font-semibold shadow-sm"
                : "text-[#6B7280] hover:text-[#111827] font-medium"
            }`}
          >
            <Settings className={`w-5 h-5 transition-colors ${
              pathname.startsWith("/settings") ? "text-[#111827]" : "text-[#9CA3AF]"
            }`} />
            Settings
          </MotionLink>

          {/* School Profile Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#F3F4F6] rounded-2xl p-3 flex items-center gap-3 cursor-pointer hover:bg-[#E5E7EB] transition-colors duration-150"
          >
            <img
              alt="Delhi Public School Avatar"
              className="w-12 h-12 rounded-full object-cover shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNTnHtzsKU40MDIvN7n4igIs35HZtO_ovK9xMwP9kMOXl_xGCsn88iUxRSsB0UsrSs8wshb24zMf-jbS0wsaJi4nkTzUpA8oocb6RmS8G64yntrUNhf2fU4HITcLdBHSza46peNSvImIokaP3ZmMiOtyTgRTapiIfSdR8ayMRqmRSypE1pkO9PbT7QO_iu9L_HI8brT0_Huilu6lfQ7rfHJ_ZzkArJtB0CyuOjZ-MhEmO-mrV6YRWWZ2XKpSiqOOkcTqJFRHuaLnw"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[#111827] font-bold text-[14px] leading-tight truncate">Delhi Public School</span>
              <span className="text-[#6B7280] text-[13px] truncate">Bokaro Steel City</span>
            </div>
          </motion.div>
        </div>
      </div>
    </aside>
  );
}
