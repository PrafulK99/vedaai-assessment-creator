import React from "react";
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
  return (
    <div className="bg-gray-bg flex h-screen overflow-hidden text-text-main p-4 gap-4">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 gap-4" data-purpose="main-container">
        {/* Header */}
        <Header
          title={headerTitle}
          showBackButton={showBackButton}
          onBackClick={onBackClick}
        />

        {/* Content Area */}
        <main className="flex-1 bg-sidebar-bg rounded-[32px] p-8 overflow-y-auto shadow-sm relative flex flex-col" data-purpose="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
