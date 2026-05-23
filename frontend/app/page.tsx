"use client";

import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { EmptyAssignmentsState } from "@/components/EmptyAssignmentsState";
import { getAllAssessments, getAssessment } from "@/lib/api";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useRouter } from "next/navigation";
import { FileText, Clock, CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpeningId, setIsOpeningId] = useState<string | null>(null);
  const router = useRouter();
  const { setAssessment } = useAssessmentStore();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await getAllAssessments();
      setAssessments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
      toast.error("Could not load your dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAssessment = async (id: string) => {
    try {
      setIsOpeningId(id);
      const response = await getAssessment(id);
      setAssessment(response.data);
      router.push("/output");
    } catch (error) {
      console.error("Failed to load assessment:", error);
      toast.error("Could not load the assessment details.");
    } finally {
      setIsOpeningId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <MainLayout headerTitle="Dashboard" showBackButton={false}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Assessments</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and view your generated question papers.</p>
          </div>
          <button
            onClick={() => router.push("/create")}
            className="bg-[#1c1c1c] text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-black transition-all shadow-md shrink-0"
          >
            + New Assessment
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-48 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
              </div>
            ))}
          </div>
        ) : assessments.length === 0 ? (
          <EmptyAssignmentsState onAction={() => router.push("/create")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <div
                key={assessment._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col group relative overflow-hidden"
              >
                {/* Status Indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300">
                  {assessment.status === "completed" && <div className="h-full bg-emerald-500 w-full" />}
                  {assessment.status === "failed" && <div className="h-full bg-red-500 w-full" />}
                </div>

                <div className="flex justify-between items-start mb-4 mt-2">
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-1 flex-1 pr-4" title={assessment.title}>
                    {assessment.title}
                  </h3>
                  {assessment.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : assessment.status === "failed" ? (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>{assessment.totalQuestions} Questions • {assessment.totalMarks} Marks</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Created on {formatDate(assessment.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAssessment(assessment._id)}
                  disabled={isOpeningId === assessment._id || assessment.status !== "completed"}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl font-semibold text-sm transition-colors border border-gray-200 disabled:opacity-50 group-hover:border-gray-300 cursor-pointer"
                >
                  {isOpeningId === assessment._id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  ) : (
                    <>
                      {assessment.status === "completed" ? "View Assessment" : assessment.status === "failed" ? "Generation Failed" : "Processing..."}
                      {assessment.status === "completed" && <ArrowRight className="w-4 h-4" />}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
