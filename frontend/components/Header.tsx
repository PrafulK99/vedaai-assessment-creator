import React from "react";
import { ArrowLeft, Bell, ChevronDown, LayoutGrid, Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onMenuClick?: () => void;
}

export function Header({ title = "Assignment", showBackButton = true, onBackClick, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-sidebar-bg rounded-3xl p-4 px-6 flex items-center justify-between shadow-sm shrink-0" data-purpose="top-header">
      {/* Left Section - Menu, Back Button and Title */}
      <div className="flex items-center gap-4 text-text-muted font-medium">
        <button
          onClick={onMenuClick}
          className="lg:hidden hover:text-text-main transition-colors mr-2"
        >
          <Menu className="w-5 h-5" />
        </button>
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="hover:text-text-main transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title && (
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm">{title}</span>
          </div>
        )}
      </div>

      {/* Right Section - Notification and Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative text-text-muted hover:text-text-main transition-colors p-2 bg-white rounded-full shadow-sm w-10 h-10 flex items-center justify-center">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-accent rounded-full border border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200/50 p-1.5 pr-3 rounded-full transition-colors bg-white shadow-sm">
          <img 
            alt="John Doe" 
            className="w-8 h-8 rounded-full" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-mpulEx_9q7SVGYfe0TQPk9CRNw2dgr-w0E7eXdv0yqPDqfSxpxffW6-D-JA-pQCY-pLnM6QTh52-4_u7W1depuUjb6yfQHWVrwfe-8rnTc6B0dGWcJa-fqPTdqMtF5Ckyh9sd8OUTPpNes8jf0s-ZclRf7G7TGP1S5v-wDpPRFF4GvXLtW-BRHHjADfRbMQkktvw-Q5R1j5seCxgdyYnXNuyoEAPvdHGgat1wJ8i72cpyRG2emu8ZfGAOOW-ELJ8ZkitZ2bzS54" 
          />
          <span className="text-sm font-semibold text-text-main">John Doe</span>
          <ChevronDown className="w-3.5 h-3.5 text-text-muted ml-1" />
        </div>
      </div>
    </header>
  );
}
