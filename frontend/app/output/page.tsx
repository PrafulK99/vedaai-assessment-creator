"use client";

import React, { useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useRouter } from "next/navigation";
import { Download, RefreshCw, Share2, ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";

export default function AssessmentOutput() {
  const router = useRouter();
  const { generatedAssessment } = useAssessmentStore();

  useEffect(() => {
    // If no assessment exists (e.g. user refreshed the page directly on /output), redirect back to /create
    if (!generatedAssessment) {
      router.push("/create");
    }
  }, [generatedAssessment, router]);

  if (!generatedAssessment) {
    return null; // Will redirect shortly
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const difficultyColors = {
    easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    hard: "bg-red-100 text-red-700 border-red-200"
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <MainLayout headerTitle="Generated Assessment" showBackButton={true} onBackClick={() => router.push("/create")}>
      <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Action Header - Hidden during print */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Assessment is Ready!</h1>
            <p className="text-sm text-gray-500 mt-1">Review, print or export your generated question paper.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors hidden sm:flex"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={() => router.push("/create")}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1c1c1c] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
          </div>
        </div>

        {/* Exam Paper Container */}
        <div className="bg-white rounded-none sm:rounded-[2rem] shadow-sm sm:shadow-lg w-full min-h-264 print:shadow-none print:m-0 print:p-0 print:w-full">
          
          <div className="p-8 sm:p-14 print:p-0">
            {/* Exam Header */}
            <div className="text-center mb-8 border-b-2 border-gray-900 pb-8 print:pb-6 print:mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wider">{generatedAssessment.title}</h1>
              
              {/* Student Info Area */}
              <div className="flex justify-between items-end mt-12 text-left">
                <div className="space-y-4 flex-1 max-w-[60%]">
                  <div className="flex items-end gap-3">
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">Student Name:</span>
                    <div className="flex-1 border-b border-gray-400"></div>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">Class / Section:</span>
                    <div className="flex-1 border-b border-gray-400"></div>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1 max-w-[30%]">
                   <div className="flex items-end gap-3">
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">Date:</span>
                    <div className="flex-1 border-b border-gray-400"></div>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">Roll No:</span>
                    <div className="flex-1 border-b border-gray-400"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Content */}
            <div className="space-y-10">
              {generatedAssessment.sections.map((section, sIndex) => (
                <div key={section.id} className="section-container">
                  <div className="mb-6 bg-gray-50 p-4 border-l-4 border-gray-900 print:bg-transparent print:border-gray-500 print:pl-3 print:py-2">
                    <h3 className="font-bold text-gray-900 text-lg">Section {String.fromCharCode(65 + sIndex)}</h3>
                    {section.instructions && (
                      <p className="text-sm text-gray-600 font-medium italic mt-1">{section.instructions}</p>
                    )}
                  </div>

                  <div className="space-y-8 pl-1 sm:pl-4">
                    {section.questions.map((q, qIndex) => (
                      <div key={q.id} className="relative group">
                        <div className="flex items-start gap-4">
                          <span className="font-bold text-gray-900 min-w-6">Q{qIndex + 1}.</span>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium leading-relaxed">{q.text}</p>
                            
                            {/* MCQ Options if any */}
                            {q.options && q.options.length > 0 && (
                              <div className="mt-4 grid gap-3 pl-2 sm:grid-cols-2">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className="flex gap-3 items-start">
                                    <span className="font-medium text-gray-600">({String.fromCharCode(97 + oIdx)})</span>
                                    <span className="text-gray-800">{opt}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Blank space for generic short/long answers */}
                            {(!q.options || q.options.length === 0) && (
                              <div className="mt-4 space-y-6">
                                <div className="border-b border-gray-200 border-dashed w-full h-8"></div>
                                <div className="border-b border-gray-200 border-dashed w-full h-8"></div>
                                {q.type === "Long Questions" && (
                                  <>
                                    <div className="border-b border-gray-200 border-dashed w-full h-8"></div>
                                    <div className="border-b border-gray-200 border-dashed w-full h-8"></div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Marks & Meta - Right aligned */}
                          <div className="flex flex-col items-end gap-2 shrink-0 ml-4 print:text-gray-600">
                            <span className="text-sm font-bold text-gray-900">[{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border print:border-gray-300 print:text-gray-500 ${difficultyColors[q.difficulty]}`}>
                              {getDifficultyLabel(q.difficulty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* End of paper mark */}
            <div className="mt-16 text-center text-gray-400 font-medium tracking-widest text-sm uppercase">
               --- End of Assignment ---
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
