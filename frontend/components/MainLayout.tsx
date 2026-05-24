import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function MainLayout({
  children,
  headerTitle = "Assignment",
  showBackButton = true,
  onBackClick,
}: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-bg flex h-screen overflow-hidden text-text-main p-2 sm:p-4 gap-2 sm:gap-4 relative">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 gap-2 sm:gap-4 h-full" data-purpose="main-container">
        {/* Header */}
        <Header
          title={headerTitle}
          showBackButton={showBackButton}
          onBackClick={onBackClick}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 bg-sidebar-bg rounded-[32px] p-8 overflow-y-auto shadow-sm relative flex flex-col" data-purpose="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
