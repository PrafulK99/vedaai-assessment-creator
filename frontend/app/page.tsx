"use client";

import { MainLayout } from "@/components/MainLayout";
import { EmptyAssignmentsState } from "@/components/EmptyAssignmentsState";

export default function Home() {
  return (
    <MainLayout headerTitle="Assignment" showBackButton={true}>
      <EmptyAssignmentsState />
    </MainLayout>
  );
}

