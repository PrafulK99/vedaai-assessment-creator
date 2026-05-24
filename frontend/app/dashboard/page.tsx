"use client";

import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { EmptyAssignmentsState } from "@/components/EmptyAssignmentsState";
import { getAllAssessments, getAssessment, deleteAssessment } from "@/lib/api";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Trash2, Filter, Search, MoreVertical, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  const { setAssessment } = useAssessmentStore();

  useEffect(() => {
    fetchAssessments();

    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
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

  const handleOpenAssessment = async (id: string, status: string) => {
    if (status !== 'completed') {
      toast.error("Assessment is still processing or failed.");
      return;
    }
    
    try {
      toast.info("Loading assessment...");
      const response = await getAssessment(id);
      setAssessment(response.data);
      router.push("/output");
    } catch (error) {
      console.error("Failed to load assessment:", error);
      toast.error("Could not load the assessment details.");
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(null);
    try {
      // Optimistic update
      setAssessments((prev) => prev.filter((a) => a._id !== id));
      await deleteAssessment(id);
      toast.success("Assessment deleted");
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete assessment");
      fetchAssessments(); // Revert on failure
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredAssessments = assessments.filter(assessment => 
    assessment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isEmpty = !isLoading && assessments.length === 0;

  return (
    <MainLayout headerTitle="Assignment" showBackButton={true}>
      {isEmpty ? (
        <div className="flex-1 flex flex-col justify-center h-full">
          <EmptyAssignmentsState onAction={() => router.push("/create")} />
        </div>
      ) : (
        <div className="flex flex-col min-h-full relative">
          {/* Page Header */}
          <header className="mb-6 flex items-start gap-3">
            <div className="mt-1.5 w-3 h-3 rounded-full bg-green-400 ring-4 ring-green-100 shrink-0"></div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Assignments</h1>
              <p className="text-[#6B7280] mt-1 text-sm">Manage and create assignments for your classes.</p>
            </div>
          </header>

          {/* Action Bar */}
          <div className="bg-white rounded-full p-2 flex items-center justify-between mb-6 shadow-sm gap-4">
            <motion.button 
              whileHover={{ backgroundColor: "var(--color-gray-50)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-[#6B7280] font-medium px-4 py-2 rounded-full transition-colors shrink-0 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filter By
            </motion.button>
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 text-sm transition-shadow text-[#374151]"
                placeholder="Search Assignment"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Assignment Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-24">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 h-[180px] animate-pulse flex flex-col justify-between">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex justify-between items-end">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-24"
            >
              {filteredAssessments.length === 0 ? (
                <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
                  No assignments match your search.
                </div>
              ) : filteredAssessments.map((assessment) => (
                  <motion.article
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={assessment._id}
                    onClick={() => handleOpenAssessment(assessment._id, assessment.status)}
                    className="bg-white rounded-3xl p-6 relative shadow-sm border border-gray-100 flex flex-col h-[180px] justify-between cursor-pointer hover:shadow-lg hover:border-gray-200 transition-shadow group"
                  >
                  {/* Card Top: Title + Menu */}
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight pr-4 line-clamp-2">
                      {assessment.title}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === assessment._id ? null : assessment._id);
                      }}
                      className="text-gray-400 hover:text-[#111827] p-1 relative z-10 shrink-0"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {openMenuId === assessment._id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-12 right-6 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20"
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); handleOpenAssessment(assessment._id, assessment.status); }}
                          className="block w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-gray-50 font-medium"
                        >
                          View Assignment
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, assessment._id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium mx-auto"
                        >
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Bottom: Dates */}
                  <div className="flex justify-between items-center text-sm mt-auto font-medium">
                    <span className="text-[#6B7280]">
                      <span className="text-[#111827] font-bold">Assigned on :</span> {formatDate(assessment.createdAt)}
                    </span>
                    <span className="text-[#6B7280]">
                      <span className="text-[#111827] font-bold">Due :</span>{" "}
                      {assessment.dueDate ? formatDate(assessment.dueDate) : formatDate(assessment.createdAt)}
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Floating Create Assignment Button */}
          <div className="sticky bottom-8 flex justify-center z-20 pointer-events-none mt-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/create')}
              className="pointer-events-auto bg-[#1a1c23] hover:bg-black text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.16)] transition-shadow"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Create Assignment
            </motion.button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
