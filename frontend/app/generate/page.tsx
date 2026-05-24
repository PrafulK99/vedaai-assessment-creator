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
import { motion, AnimatePresence } from "framer-motion";

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

  const getStatusIcon = () => {
    if (status === 'processing' || status === 'queued') {
      return (
        <motion.div 
          key="processing"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative"
        >
           <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
             <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
           </div>
           <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
        </motion.div>
      );
    }
    if (status === 'completed') {
      return (
        <motion.div 
          key="completed"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </motion.div>
        </motion.div>
      );
    }
    if (status === 'failed') {
      return (
        <motion.div 
          key="failed"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center"
        >
          <AlertCircle className="w-8 h-8 text-red-500" />
        </motion.div>
      );
    }
  };

  return (
    <MainLayout headerTitle="Generating Assignment" showBackButton={false}>
      <div className="max-w-210 mx-auto pb-12 h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        
        <div className="bg-white rounded-[2rem] p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 w-full text-center flex flex-col items-center relative overflow-hidden">
          
          {/* Status Icon */}
          <div className="mb-6 h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {getStatusIcon()}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.h2 
              key={status}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-xl font-bold text-gray-900 tracking-tight mb-2"
            >
              {(status === 'processing' || status === 'queued') ? 'Generating your assessment...' : 
               status === 'completed' ? 'Assessment ready!' : 
               'Generation failed'}
            </motion.h2>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-gray-500 mb-8"
            >
              {message}
            </motion.p>
          </AnimatePresence>

          {/* Progress Bar Container */}
          <div className="w-full max-w-md mb-8">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute top-0 left-0 bottom-0 rounded-full ${
                   status === 'failed' ? 'bg-red-500' :
                   status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-semibold text-gray-400">
              <motion.span
                key={progress}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {Math.round(progress)}%
              </motion.span>
              <span>100%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <AnimatePresence mode="wait">
            {(status === 'processing' || status === 'queued') && (
               <motion.div 
                 key="skeleton"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="flex flex-col items-center gap-6 w-full max-w-md"
               >
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
               </motion.div>
            )}

            {status === 'completed' && (
              <motion.button 
                key="complete-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/output')}
                className="bg-[#1c1c1c] text-white font-semibold text-[13px] py-3.5 px-8 rounded-full flex items-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-shadow"
              >
                View Assessment
              </motion.button>
            )}

            {status === 'failed' && (
               <motion.button 
                  key="failed-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.back()}
                  className="bg-white border border-gray-200 text-gray-900 font-semibold text-[13px] py-3.5 px-8 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Go back and edit
               </motion.button>
            )}
          </AnimatePresence>

        </div>
      </div>
    </MainLayout>
  );
}
