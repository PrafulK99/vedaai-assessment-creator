import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { motion } from "framer-motion";

export interface MainLayoutProps {
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
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
        <main className="flex-1 bg-sidebar-bg rounded-[32px] overflow-y-auto shadow-sm relative flex flex-col" data-purpose="main-content">
          <motion.div 
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="p-8 flex-1 flex flex-col min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
