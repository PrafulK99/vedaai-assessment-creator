"use client";

import React from "react";
import { MainLayout } from "@/components/MainLayout";
import { UploadCloud, Calendar, ChevronDown, Minus, Plus, X, Mic, ArrowLeft, ArrowRight } from "lucide-react";
import { useFormStore, QuestionType } from "@/store/useFormStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateAssignment() {
  const router = useRouter();
  const {
    title,
    dueDate,
    instructions,
    questions,
    file,
    setField,
    addQuestionType,
    updateQuestionType,
    removeQuestionType
  } = useFormStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setField('file', e.target.files[0]);
    }
  };

  const totalQuestions = questions.reduce((acc, q) => acc + q.count, 0);
  const totalMarks = questions.reduce((acc, q) => acc + q.count * q.marks, 0);

  const handleNext = () => {
    if (!title.trim()) {
      toast.error("Assignment Title is required");
      return;
    }
    if (!dueDate) {
      toast.error("Due Date is required");
      return;
    }
    if (questions.length === 0) {
      toast.error("At least one question type is required");
      return;
    }
    
    // Check if total marks is valid (greater than 0)
    if (totalMarks <= 0) {
       toast.error("Total marks must be greater than 0");
       return;
    }

    router.push('/generate');
  };

  return (
    <MainLayout headerTitle="Assignment" showBackButton={true}>
      <div className="max-w-210 mx-auto pb-12">
        {/* Header Area */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
          <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Create Assignment</h1>
        </div>
        <p className="text-[13px] text-gray-500 mb-6 pl-5.5">Set up a new assignment for your students</p>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-1 pl-6 mb-8 w-full">
          <div className="h-0.75 bg-gray-600 w-[55%] rounded-full"></div>
          <div className="h-0.75 bg-gray-300/50 flex-1 rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] p-10 shadow-sm ml-5.5">
          <div className="mb-2">
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Assignment Details</h2>
            <p className="text-[13px] text-gray-500">Basic information about your assignment</p>
          </div>

          {/* Upload Zone */}
          <div className="border border-dashed border-gray-300 rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center mt-6 relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.txt"
            />
            <UploadCloud className="w-6 h-6 text-gray-800 mb-3" />
            <p className="text-gray-900 font-semibold text-[13px] mb-1">
              {file ? file.name : "Choose a file or drag & drop it here"}
            </p>
            <p className="text-gray-400 text-[11px] mb-4">PDF, TXT, JPEG, PNG, upto 10MB</p>
            <button className="border border-gray-200 rounded-full px-5 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm pointer-events-none">
              {file ? "Change File" : "Browse Files"}
            </button>
          </div>
          <p className="text-center text-[11px] font-medium text-gray-400 mt-4 mb-8">Upload source documents or images to generate questions</p>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-[13px] font-bold text-gray-900 mb-3">Assignment Title</label>
            <input 
              type="text" 
              placeholder="e.g. Midterm Physics Assessment" 
              value={title}
              onChange={(e) => setField('title', e.target.value)}
              className="w-full border border-gray-200 rounded-2xl py-3.5 px-4 text-[13px] font-medium text-gray-900 outline-none focus:border-gray-400 transition-colors" 
            />
          </div>

          {/* Due Date */}
          <div className="mb-6">
            <label className="block text-[13px] font-bold text-gray-900 mb-3">Due Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setField('dueDate', e.target.value)}
                className="w-full border border-gray-200 rounded-2xl py-3.5 px-4 text-[13px] font-medium text-gray-900 outline-none focus:border-gray-400 transition-colors bg-transparent appearance-none" 
              />
            </div>
          </div>

          {/* Question Types */}
          <div className="mb-6">
            <div className="flex mb-3 px-1">
              <div className="flex-1 text-[13px] font-bold text-gray-900">Question Type</div>
              <div className="w-30 text-center text-[13px] font-bold text-gray-900">No. of Questions</div>
              <div className="w-30 text-center text-[13px] font-bold text-gray-900 ml-4">Marks</div>
            </div>
            
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="flex items-center gap-4">
                  {/* Select Dropdown */}
                  <div className="flex-1 relative">
                    <select 
                      value={q.type}
                      onChange={(e) => updateQuestionType(i, { ...q, type: e.target.value })}
                      className="w-full appearance-none border border-gray-200 rounded-2xl py-3.5 px-4 text-[13px] font-medium text-gray-900 bg-white outline-none focus:border-gray-400 cursor-pointer"
                    >
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="Short Questions">Short Questions</option>
                      <option value="Long Questions">Long Questions</option>
                      <option value="Diagram/Graph-Based">Diagram/Graph-Based</option>
                      <option value="Numerical Problems">Numerical Problems</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
                  </div>
                  
                  <button onClick={() => removeQuestionType(i)}>
                    <X className="w-3.5 h-3.5 text-gray-400 shrink-0 hover:text-red-500" strokeWidth={2.5} />
                  </button>
                  
                  {/* Counter: No. of Questions */}
                  <div className="w-30 flex items-center justify-between border border-gray-200 rounded-full px-4 py-2.5 bg-white">
                    <button 
                      onClick={() => updateQuestionType(i, { ...q, count: Math.max(1, q.count - 1) })}
                      className="text-gray-300 hover:text-gray-600"
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                    <span className="text-[13px] font-bold text-gray-900">{q.count}</span>
                    <button 
                      onClick={() => updateQuestionType(i, { ...q, count: q.count + 1 })}
                      className="text-gray-300 hover:text-gray-600"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </div>
                  
                  {/* Counter: Marks */}
                  <div className="w-30 flex items-center justify-between border border-gray-200 rounded-full px-4 py-2.5 bg-white">
                    <button 
                      onClick={() => updateQuestionType(i, { ...q, marks: Math.max(1, q.marks - 1) })}
                      className="text-gray-300 hover:text-gray-600"
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                    <span className="text-[13px] font-bold text-gray-900">{q.marks}</span>
                    <button 
                      onClick={() => updateQuestionType(i, { ...q, marks: q.marks + 1 })}
                      className="text-gray-300 hover:text-gray-600"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-5">
              <button 
                onClick={() => addQuestionType({ type: "Short Questions", count: 1, marks: 2 })}
                className="flex items-center gap-2.5 text-[13px] font-bold text-gray-900 hover:opacity-80 transition-opacity"
              >
                <div className="bg-black text-white rounded-full p-0.75">
                  <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                Add Question Type
              </button>
            </div>
            
            <div className="mt-8 flex flex-col items-end gap-2 text-[13px] font-bold text-gray-900 pr-2">
              <div>Total Questions : {totalQuestions}</div>
              <div>Total Marks : {totalMarks}</div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-2">
            <label className="block text-[13px] font-bold text-gray-900 mb-3">Additional Information (For better output)</label>
            <div className="relative">
              <textarea 
                placeholder="e.g Generate a question paper for 3 hour exam duration..." 
                value={instructions}
                onChange={(e) => setField('instructions', e.target.value)}
                className="w-full border border-dashed border-gray-300 rounded-[1.5rem] py-4 px-5 text-[13px] font-medium text-gray-900 outline-none resize-none h-24 focus:border-gray-400 transition-colors placeholder:text-gray-400 placeholder:font-normal"
              ></textarea>
              <button className="absolute bottom-4 right-5 text-gray-800 hover:text-black">
                <Mic className="w-4.5 h-4.5 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-7 ml-5.5">
          <button 
            onClick={() => router.back()}
            className="bg-white text-gray-900 font-semibold text-[13px] py-3.5 px-6 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
          >
             <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <button 
            onClick={handleNext}
            className="bg-[#1c1c1c] text-white font-semibold text-[13px] py-3.5 px-8 rounded-full flex items-center gap-2 hover:bg-black transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
          >
             Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}