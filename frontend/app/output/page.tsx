"use client";

import React, { useEffect, useRef, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useGenerationStore } from "@/store/useGenerationStore";
import { useRouter } from "next/navigation";
import { Download, RefreshCw, Share2, Printer, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AssessmentPDF } from "@/components/AssessmentPDF";
import { generateAssessment } from "@/lib/api";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AssessmentOutput() {
  const router = useRouter();
  const { generatedAssessment } = useAssessmentStore();
  const { setJobId, setStatus, setProgress, resetGeneration } = useGenerationStore();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

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

  const handleRegenerate = async () => {
    if (!generatedAssessment.assignmentId) {
      toast.error("Cannot regenerate this assessment (missing source ID).");
      return;
    }
    
    setIsRegenerating(true);
    try {
      resetGeneration();
      const res = await generateAssessment(generatedAssessment.assignmentId);
      if (res && res.data && res.data.jobId) {
        setJobId(res.data.jobId);
      } else if (res && res.jobId) {
        setJobId(res.jobId);
      }
      setStatus("queued");
      setProgress(0, "Regenerating assessment...");
      router.push(`/generate`);
    } catch (error) {
      console.error("Failed to regenerate:", error);
      toast.error("Failed to regenerate assessment.");
      setIsRegenerating(false);
    }
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
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Assessment is Ready!</h1>
            <p className="text-sm text-gray-500 mt-1">Review, print or export your generated question paper.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 w-full md:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm hidden sm:flex"
            >
              <Share2 className="w-4 h-4" /> Share
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRegenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} 
              {isRegenerating ? "Regenerating..." : "Regenerate"}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrint}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print
            </motion.button>
            {isClient ? (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
              </motion.div>
            ) : (
              <button 
                disabled
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1c1c1c] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-md opacity-70"
              >
                <Loader2 className="w-4 h-4 animate-spin" /> Preparing PDF...
              </button>
            )}
          </motion.div>
        </div>

        {/* Exam Paper Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          id="pdf-container"
          ref={pdfRef}
          className="bg-white rounded-2xl sm:rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 w-full min-h-264 print:shadow-none print:border-none print:m-0 print:p-0 print:w-full font-sans text-black"
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
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-10"
            >
              {generatedAssessment.sections.map((section, sIndex) => (
                <motion.div variants={itemVariants} key={section.id} className="section-container">
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
                      <motion.div variants={itemVariants} key={q.id} className="flex items-start gap-2">
                        <span className="font-medium">{qIndex + 1}.</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-medium text-justify flex-1">
                              {q.text}
                            </p>
                            <div className="flex flex-col items-end gap-1 shrink-0 ml-4 print:hidden">
                              <span className="font-medium">[{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]</span>
                              <span className="text-sm font-medium text-gray-600">[{getDifficultyLabel(q.difficulty)}]</span>
                            </div>
                            <div className="hidden flex-col items-end gap-1 shrink-0 ml-4 print:flex">
                              <span className="font-medium">[{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]</span>
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
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* End of paper mark */}
            <motion.div variants={itemVariants} className="mt-8 font-bold text-[15px]">
               End of Question Paper
            </motion.div>

            {/* Answer Key Section */}
            <motion.div variants={itemVariants} className="mt-16 pt-8 break-before-page">
              <h3 className="font-bold text-lg mb-6">Answer Key:</h3>
              <div className="space-y-4 text-[15px]">
                {generatedAssessment.sections.flatMap(s => s.questions).map((q, idx) => (
                   <div key={`ans_${q.id}`} className="flex items-start gap-2">
                      <span className="font-medium shrink-0">{idx + 1}.</span>
                      <p>{q.answer || "Answer not provided."}</p>
                   </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
