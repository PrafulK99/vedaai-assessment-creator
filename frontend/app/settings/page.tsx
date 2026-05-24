"use client";

import React from "react";
import { MainLayout } from "@/components/MainLayout";
import { ComingSoonState } from "@/components/ComingSoonState";
import { Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <MainLayout headerTitle="Settings" showBackButton={false}>
      <div className="flex flex-col h-full min-h-[calc(100vh-140px)]">
        <header className="mb-8 flex items-start gap-3">
          <div className="mt-1.5 w-3 h-3 rounded-full bg-gray-400 ring-4 ring-gray-100 shrink-0"></div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Settings</h1>
            <p className="text-[#6B7280] mt-1 text-sm">Manage your account preferences and workspace configuration.</p>
          </div>
        </header>

        <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center p-6 lg:p-12 overflow-hidden relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-50/60 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <ComingSoonState 
            icon={Settings2}
            title="Workspace settings are coming soon."
            description="We are preparing advanced personalization options, notification preferences, and team configuration settings."
            actionText="Explore Dashboard"
            onAction={() => router.push("/dashboard")}
          />
        </div>
      </div>
    </MainLayout>
  );
}
