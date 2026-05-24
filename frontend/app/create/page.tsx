"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Upload, Calendar, ChevronDown, Minus, Plus, X, Mic, ArrowLeft, ArrowRight } from "lucide-react";
import { useFormStore, QuestionType } from "@/store/useFormStore";
import { useGenerationStore } from "@/store/useGenerationStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAssignment, generateAssessment } from "@/lib/api";
import { motion, AnimatePresence, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CreateAssignment() {
  const router = useRouter();
  const {
    title,
    schoolName,
    subject,
    classLevel,
    timeAllowed,
    dueDate,
    instructions,
    questions,
    file,
    setField,
    addQuestionType,
    updateQuestionType,
    removeQuestionType
  } = useFormStore();

  const { setJobId, setStatus, setProgress } = useGenerationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setField('file', e.target.files[0]);
    }
  };

  const totalQuestions = questions.reduce((acc, q) => acc + q.count, 0);
  const totalMarks = questions.reduce((acc, q) => acc + q.count * q.marks, 0);

  const handleNext = async () => {
    if (!dueDate) {
      toast.error("Due Date is required");
      return;
    }

    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("Due Date cannot be in the past");
      return;
    }

    if (questions.length === 0) {
      toast.error("At least one question type is required");
      return;
    }

    const typesSet = new Set(questions.map((q) => q.type));
    if (typesSet.size !== questions.length) {
      toast.error("Duplicate question types are not allowed");
      return;
    }

    if (totalQuestions > 50) {
      toast.error("Maximum 50 questions allowed per assignment");
      return;
    }
    
    if (totalMarks <= 0) {
       toast.error("Total marks must be greater than 0");
       return;
    }

    try {
      setIsSubmitting(true);
      
      const assignmentData = {
        title,
        schoolName,
        subject,
        classLevel,
        timeAllowed,
        dueDate,
        instructions,
        questions,
        fileName: file ? file.name : null,
      };

      const resAssignment = await createAssignment(assignmentData);
      const assignmentId = resAssignment.data.id;

      const resGeneration = await generateAssessment(assignmentId);
      const jobId = resGeneration.data.jobId;

      setJobId(jobId);
      setStatus('queued');
      setProgress(0, 'Job queued...');

      router.push('/generate');
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout headerTitle="Assignment" showBackButton={true}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto px-0 md:px-10 pb-24"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="max-w-[800px] mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 rounded-full bg-green-500 border-[3px] border-green-200"></span>
            <h1 className="text-2xl font-bold text-gray-900">Create Assignment</h1>
          </div>
          <p className="text-gray-500 text-sm ml-6">Set up a new assignment for your students</p>
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="max-w-[800px] mx-auto mb-8 flex gap-2">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="h-1 flex-1 bg-gray-800 rounded-full"
          ></motion.div>
          <div className="h-1 flex-1 bg-gray-300 rounded-full"></div>
        </motion.div>

        {/* Assignment Details Form Card */}
        <motion.div variants={itemVariants} className="max-w-[800px] mx-auto bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Assignment Details</h2>
            <p className="text-sm text-gray-500">Basic information about your assignment</p>
          </div>

          {/* Assignment Meta Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-900 mb-2">School Name</label>
              <input 
                type="text" 
                value={schoolName}
                onChange={(e) => setField('schoolName', e.target.value)}
                placeholder="e.g. Delhi Public School"
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-900 mb-2">Subject</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setField('subject', e.target.value)}
                placeholder="e.g. English"
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-900 mb-2">Class</label>
              <input 
                type="text" 
                value={classLevel}
                onChange={(e) => setField('classLevel', e.target.value)}
                placeholder="e.g. 5th"
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-900 mb-2">Time Allowed</label>
              <input 
                type="text" 
                value={timeAllowed}
                onChange={(e) => setField('timeAllowed', e.target.value)}
                placeholder="e.g. 45 minutes"
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </motion.div>
          </div>

          {/* File Upload Area */}
          <motion.div variants={itemVariants} className="mb-4">
            <motion.div 
              whileHover={{ scale: 1.01, backgroundColor: "#F9FAFB" }}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:border-orange-400 transition-colors cursor-pointer relative"
            >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.txt"
              />
              <Upload className="w-8 h-8 text-gray-800 mb-4" strokeWidth={1.5} />
              <p className="font-medium text-gray-900 mb-1">
                {file ? file.name : "Choose a file or drag & drop it here"}
              </p>
              <p className="text-xs text-gray-400 mb-6">JPEG, PNG, upto 10MB</p>
              <button className="bg-white border border-gray-200 text-gray-700 rounded-full px-6 py-2 text-sm font-medium shadow-sm pointer-events-none">
                {file ? "Change File" : "Browse Files"}
              </button>
            </motion.div>
            <p className="text-center text-sm text-gray-500 mt-3">Upload images of your preferred document/image</p>
          </motion.div>

          {/* Due Date */}
          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-2">Due Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setField('dueDate', e.target.value)}
                placeholder="DD-MM-YYYY"
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400 shadow-sm" 
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 bg-white mr-1 my-1 pl-2">
                <Calendar className="w-[18px] h-[18px]" />
              </div>
            </div>
          </motion.div>

          {/* Question Types List */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="grid grid-cols-[1fr_auto_120px_120px] gap-4 mb-4 px-2 hidden sm:grid">
              <div className="text-sm font-medium text-gray-900">Question Type</div>
              <div></div>
              <div className="text-sm font-medium text-gray-900 text-center">No. of Questions</div>
              <div className="text-sm font-medium text-gray-900 text-center">Marks</div>
            </div>
            
            <motion.div className="space-y-4">
              <AnimatePresence>
                {questions.map((q, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto_120px_120px] gap-4 items-center"
                  >
                    {/* Select Dropdown */}
                    <div className="relative">
                      <select 
                        value={q.type}
                        onChange={(e) => updateQuestionType(i, { ...q, type: e.target.value })}
                        className="w-full appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all pr-10 cursor-pointer shadow-sm"
                      >
                        <option value="Multiple Choice Questions">Multiple Choice Questions</option>
                        <option value="Short Questions">Short Questions</option>
                        <option value="Long Questions">Long Questions</option>
                        <option value="Diagram/Graph-Based Questions">Diagram/Graph-Based Questions</option>
                        <option value="Numerical Problems">Numerical Problems</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.1, color: "#EF4444" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeQuestionType(i)} 
                      className="text-gray-400 transition-colors p-2 hidden sm:block"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </motion.button>

                    <div className="flex sm:hidden justify-between items-center px-2">
                       <span className="text-sm font-medium text-gray-900">Remove</span>
                       <motion.button 
                        whileHover={{ scale: 1.1, color: "#EF4444" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeQuestionType(i)} 
                        className="text-gray-400 transition-colors p-2"
                      >
                        <X className="w-4 h-4" strokeWidth={2} />
                      </motion.button>
                    </div>

                    {/* Counter: No. of Questions */}
                    <div className="flex items-center justify-between border border-gray-200 rounded-full px-3 py-2 bg-gray-50/50 shadow-sm">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuestionType(i, { ...q, count: Math.max(1, q.count - 1) })}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                      </motion.button>
                      <input 
                        type="number" 
                        value={q.count} 
                        onChange={(e) => updateQuestionType(i, { ...q, count: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-8 text-center bg-transparent border-none text-sm font-medium text-gray-900 p-0 focus:ring-0" 
                      />
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuestionType(i, { ...q, count: q.count + 1 })}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                      </motion.button>
                    </div>
                    
                    {/* Counter: Marks */}
                    <div className="flex items-center justify-between border border-gray-200 rounded-full px-3 py-2 bg-gray-50/50 shadow-sm">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuestionType(i, { ...q, marks: Math.max(1, q.marks - 1) })}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                      </motion.button>
                      <input 
                        type="number" 
                        value={q.marks} 
                        onChange={(e) => updateQuestionType(i, { ...q, marks: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-8 text-center bg-transparent border-none text-sm font-medium text-gray-900 p-0 focus:ring-0" 
                      />
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuestionType(i, { ...q, marks: q.marks + 1 })}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Add Question Type Button */}
            <div className="mt-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addQuestionType({ type: "Short Questions", count: 1, marks: 2 })}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:opacity-80 transition-opacity bg-gray-50 px-4 py-2.5 rounded-full border border-gray-200 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <Plus className="w-3 h-3" strokeWidth={2} />
                </div>
                Add Question Type
              </motion.button>
            </div>
          </motion.div>

          {/* Summary Totals */}
          <motion.div variants={itemVariants} className="flex flex-col items-end gap-1 mb-8 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600">Total Questions: <span className="font-bold text-gray-900">{totalQuestions}</span></p>
            <p className="text-sm text-gray-600">Total Marks: <span className="font-bold text-gray-900">{totalMarks}</span></p>
          </motion.div>

          {/* Additional Information */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-gray-900 mb-2">Additional Information (For better output)</label>
            <div className="relative">
              <textarea 
                placeholder="e.g Generate a question paper for 3 hour exam duration..." 
                value={instructions}
                onChange={(e) => setField('instructions', e.target.value)}
                className="w-full bg-white border-2 border-dashed border-gray-200 text-gray-900 text-sm rounded-2xl px-4 py-4 outline-none focus:border-orange-400 focus:ring-0 transition-colors resize-none placeholder:text-gray-400"
                rows={3}
              ></textarea>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#E5E7EB" }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-4 right-4 text-gray-400 transition-colors p-2 bg-gray-100 rounded-full"
              >
                <Mic className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer Actions - Pinned to bottom */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md px-10 py-6 flex items-center justify-between border-t border-gray-200 z-10">
        <div className="max-w-[800px] mx-auto w-full flex items-center justify-between">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#1c1c1c] text-white rounded-full px-8 py-3 text-sm font-medium shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSubmitting ? "Submitting..." : "Next"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </footer>
    </MainLayout>
  );
}