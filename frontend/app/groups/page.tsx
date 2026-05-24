"use client";

import React from "react";
import { MainLayout } from "@/components/MainLayout";
import { ComingSoonState } from "@/components/ComingSoonState";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GroupsPage() {
  const router = useRouter();

  return (
    <MainLayout headerTitle="My Groups" showBackButton={false}>
      <div className="flex flex-col h-full min-h-[calc(100vh-140px)]">
        <header className="mb-8 flex items-start gap-3">
          <div className="mt-1.5 w-3 h-3 rounded-full bg-indigo-400 ring-4 ring-indigo-100 shrink-0"></div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">My Groups</h1>
            <p className="text-[#6B7280] mt-1 text-sm">Manage classrooms, batches, and collaborative academic workflows.</p>
          </div>
        </header>

        <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center p-6 lg:p-12 overflow-hidden relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-50/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <ComingSoonState 
            icon={Users}
            title="Group management features are launching soon."
            description="We're building intelligent teaching workflows and collaborative tools to help you manage classrooms and student batches efficiently."
            actionText="Explore Dashboard"
            onAction={() => router.push("/dashboard")}
          />
        </div>
      </div>
    </MainLayout>
  );
}
