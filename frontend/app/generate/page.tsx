"use client";

import React, { useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { useGenerationStore } from "@/store/useGenerationStore";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { Skeleton } from "@/components/ui/skeleton";
import { io, Socket } from "socket.io-client";
import { getAssessment, getJobStatus } from "@/lib/api";

export default function GenerationStatus() {
  const router = useRouter();
  const { currentJobId, progress, message, status, setProgress, setStatus, setError } = useGenerationStore();
  const { setAssessment } = useAssessmentStore();

  useEffect(() => {
    if (!currentJobId) {
      router.push('/create');
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const socket: Socket = io(API_URL);

    const fetchInitialStatus = async () => {
      try {
        const res = await getJobStatus(currentJobId);
        if (res.data) {
          if (res.data.status !== 'pending') {
             setStatus(res.data.status);
             setProgress(res.data.progress || 0, res.data.message || '');
          }
          if (res.data.status === 'failed') {
             setError(res.data.error || 'Generation failed');
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial job status", err);
      }
    };
    
    fetchInitialStatus();

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('join-job', currentJobId);
    });

    socket.on('generation-progress', (data: { progress: number; message: string }) => {
      setStatus('processing');
      setProgress(data.progress, data.message);
    });

    socket.on('generation-completed', async (data: { assessmentId: string }) => {
      setProgress(100, "Generation Complete!");
      setStatus('completed');
      
      try {
        const res = await getAssessment(data.assessmentId);
        setAssessment(res.data);
        // Automatically redirect after a short delay
        setTimeout(() => {
          router.push('/output');
        }, 1500);
      } catch (err) {
        console.error('Failed to fetch generated assessment', err);
        setError('Failed to fetch final assessment');
      }
    });

    socket.on('generation-failed', (data: { error: string }) => {
      setError(data.error || 'Generation failed unexpectedly');
    });

    return () => {
      socket.emit('leave-job', currentJobId);
      socket.disconnect();
    };
  }, [currentJobId, router, setAssessment, setError, setProgress, setStatus]);

  return (
    <MainLayout headerTitle="Generating Assignment" showBackButton={false}>
      <div className="max-w-210 mx-auto pb-12 h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        
        <div className="bg-white rounded-[2rem] p-12 shadow-sm w-full text-center flex flex-col items-center relative overflow-hidden">
          
          {/* Status Icon */}
          <div className="mb-6">
            {(status === 'processing' || status === 'queued') && (
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
            {(status === 'processing' || status === 'queued') ? 'Generating your assessment...' : 
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
          {(status === 'processing' || status === 'queued') && (
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
