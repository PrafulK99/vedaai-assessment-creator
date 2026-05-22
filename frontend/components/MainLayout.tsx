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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-80 flex flex-col flex-1">
        {/* Header */}
        <Header
          title={headerTitle}
          showBackButton={showBackButton}
          onBackClick={onBackClick}
        />

        {/* Content Area */}
        <div className="pt-16 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
