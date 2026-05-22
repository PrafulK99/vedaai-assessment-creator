"use client";

import React, { useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { useGenerationStore } from "@/store/useGenerationStore";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function GenerationStatus() {
  const router = useRouter();
  const { progress, message, status, setProgress, setStatus, setError } = useGenerationStore();
  const { setAssessment } = useAssessmentStore();

  // Mocking the generation progress for now
  useEffect(() => {
    setStatus('processing');
    setProgress(10, "Analyzing Instructions...");

    const timeouts = [
      setTimeout(() => setProgress(30, "Extracting text from documents..."), 2000),
      setTimeout(() => setProgress(50, "Generating Questions..."), 4500),
      setTimeout(() => setProgress(75, "Structuring Assessment..."), 7000),
      setTimeout(() => setProgress(90, "Finalizing Output..."), 9500),
      setTimeout(() => {
        setProgress(100, "Generation Complete!");
        setStatus('completed');
        
        // Mock output saving
        setAssessment({
          title: "Mock Physics Midterm",
          sections: [
            {
              id: "sec_1",
              instructions: "Answer all questions",
              questions: [
                {
                  id: "q_1",
                  text: "What is the speed of light?",
                  type: "Multiple Choice",
                  difficulty: "easy",
                  marks: 1
                }
              ]
            }
          ]
        });
      }, 11000)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <MainLayout headerTitle="Generating Assignment" showBackButton={false}>
      <div className="max-w-210 mx-auto pb-12 h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        
        <div className="bg-white rounded-[2rem] p-12 shadow-sm w-full text-center flex flex-col items-center relative overflow-hidden">
          
          {/* Status Icon */}
          <div className="mb-6">
            {status === 'processing' && (
              <div className="relative">
                 <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                   <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                 </div>
                 <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
              </div>
            )}
            
            {status === 'completed' && (
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
            )}

            {status === 'failed' && (
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
            {status === 'processing' ? 'Generating your assessment' : 
             status === 'completed' ? 'Assessment ready!' : 
             'Generation failed'}
          </h2>
          <p className="text-sm font-medium text-gray-500 mb-8">{message}</p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-md mb-8">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                   status === 'failed' ? 'bg-red-500' :
                   status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-semibold text-gray-400">
              <span>{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Action Buttons */}
          {status === 'processing' && (
             <div className="flex flex-col items-center gap-6 w-full max-w-md">
                <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  This usually takes about 1-2 minutes
                </div>
                
                {/* Skeleton States */}
                <div className="w-full space-y-3 opacity-50">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[60%]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[70%]" />
                  </div>
                </div>
             </div>
          )}

          {status === 'completed' && (
            <button 
              onClick={() => router.push('/output')}
              className="bg-[#1c1c1c] text-white font-semibold text-[13px] py-3.5 px-8 rounded-full flex items-center gap-2 hover:bg-black transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-bottom-2"
            >
              View Assessment
            </button>
          )}

          {status === 'failed' && (
             <button 
                onClick={() => router.back()}
                className="bg-white border border-gray-200 text-gray-900 font-semibold text-[13px] py-3.5 px-8 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Go back and edit
             </button>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
