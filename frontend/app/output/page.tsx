"use client";

import React, { useEffect, useRef, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useRouter } from "next/navigation";
import { Download, RefreshCw, Share2, Printer, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AssessmentPDF } from "@/components/AssessmentPDF";

export default function AssessmentOutput() {
  const router = useRouter();
  const { generatedAssessment } = useAssessmentStore();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Assessment is Ready!</h1>
            <p className="text-sm text-gray-500 mt-1">Review, print or export your generated question paper.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleShare}
              className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors hidden sm:flex"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={() => router.push("/create")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
            <button 
              onClick={handlePrint}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            {isClient ? (
              <PDFDownloadLink
                document={<AssessmentPDF assessment={generatedAssessment} />}
                fileName={`${generatedAssessment.schoolName || "Assessment"}.pdf`}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1c1c1c] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-md disabled:opacity-70"
              >
                {({ loading }) => (
                  <>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {loading ? "Preparing PDF..." : "Download PDF"}
                  </>
                )}
              </PDFDownloadLink>
            ) : (
              <button 
                disabled
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1c1c1c] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-md opacity-70"
              >
                <Loader2 className="w-4 h-4 animate-spin" /> Preparing PDF...
              </button>
            )}
          </div>
        </div>

        {/* Exam Paper Container */}
        <div 
          id="pdf-container"
          ref={pdfRef}
          className="bg-white rounded-2xl sm:rounded-[2rem] shadow-sm sm:shadow-lg w-full min-h-264 print:shadow-none print:m-0 print:p-0 print:w-full font-sans text-black"
        >
          <div className="p-4 sm:p-10 md:p-14 print:p-8">
            {/* Exam Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                {generatedAssessment.schoolName || "Delhi Public School, Sector-4, Bokaro"}
              </h1>
              <h2 className="text-lg font-bold mb-1">
                Subject: {generatedAssessment.subject || "English"}
              </h2>
              <h3 className="text-lg font-bold mb-8">
                Class: {generatedAssessment.classLevel || "5th"}
              </h3>
              
              <div className="flex justify-between items-center mb-6 font-bold text-[15px]">
                <div>Time Allowed: {generatedAssessment.timeAllowed || "45 minutes"}</div>
                <div>Maximum Marks: {generatedAssessment.totalMarks || "20"}</div>
              </div>

              <div className="text-left font-bold text-[15px] mb-6">
                All questions are compulsory unless stated otherwise.
              </div>

              {/* Student Info Area */}
              <div className="text-left space-y-3 font-bold text-[15px] mb-12">
                <div className="flex items-end gap-2">
                  <span>Name: </span>
                  <div className="w-64 border-b border-black"></div>
                </div>
                <div className="flex items-end gap-2">
                  <span>Roll Number: </span>
                  <div className="w-48 border-b border-black"></div>
                </div>
                <div className="flex items-end gap-2">
                  <span>Class: {generatedAssessment.classLevel || "5th"} Section: </span>
                  <div className="w-32 border-b border-black"></div>
                </div>
              </div>
            </div>

            {/* Assessment Content */}
            <div className="space-y-10">
              {generatedAssessment.sections.map((section, sIndex) => (
                <div key={section.id} className="section-container">
                  <div className="text-center mb-6">
                    <h3 className="font-bold text-lg mb-4">Section {String.fromCharCode(65 + sIndex)}</h3>
                    {section.instructions && (
                      <div className="text-left font-bold text-[15px]">
                        <div>{section.questions[0]?.type || "Questions"}</div>
                        <div className="italic font-normal text-sm">{section.instructions}</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 text-[15px]">
                    {section.questions.map((q, qIndex) => (
                      <div key={q.id} className="flex items-start gap-2">
                        <span className="font-medium">{qIndex + 1}.</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-medium text-justify flex-1">
                              {q.text}
                            </p>
                            <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                              <span className="font-medium">[{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]</span>
                              <span className="text-sm font-medium text-gray-600">[{getDifficultyLabel(q.difficulty)}]</span>
                            </div>
                          </div>
                          
                          {/* MCQ Options if any */}
                          {q.options && q.options.length > 0 && (
                            <div className="mt-4 grid gap-2 pl-2 sm:grid-cols-2">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx} className="flex gap-2 items-start">
                                  <span>({String.fromCharCode(97 + oIdx)})</span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Blank space for non-MCQ answers */}
                          {(!q.options || q.options.length === 0) && (
                            <div className="mt-8 mb-4 space-y-8 w-full pr-8">
                              <div className="border-b border-gray-300 border-dashed w-full h-2"></div>
                              <div className="border-b border-gray-300 border-dashed w-full h-2"></div>
                              {(q.marks > 2 || q.type?.toLowerCase().includes("long")) && (
                                <>
                                  <div className="border-b border-gray-300 border-dashed w-full h-2"></div>
                                  <div className="border-b border-gray-300 border-dashed w-full h-2"></div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* End of paper mark */}
            <div className="mt-8 font-bold text-[15px]">
               End of Question Paper
            </div>

            {/* Answer Key Section */}
            <div className="mt-16 pt-8 break-before-page">
              <h3 className="font-bold text-lg mb-6">Answer Key:</h3>
              <div className="space-y-4 text-[15px]">
                {generatedAssessment.sections.flatMap(s => s.questions).map((q, idx) => (
                   <div key={`ans_${q.id}`} className="flex items-start gap-2">
                      <span className="font-medium shrink-0">{idx + 1}.</span>
                      <p>{q.answer || "Answer not provided."}</p>
                   </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
