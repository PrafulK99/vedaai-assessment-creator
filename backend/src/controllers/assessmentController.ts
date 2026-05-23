import type { Request, Response, NextFunction } from "express";
import { Assignment } from "../models/Assignment.js";
import { GenerationJob } from "../models/GenerationJob.js";
import { GeneratedAssessment } from "../models/GeneratedAssessment.js";
import { User } from "../models/User.js";
import { asyncHandler, validationErrorHandler } from "../utils/errorHandler.js";
import { assessmentQueue } from "../queues/assessmentQueue.js";
import { v4 as uuidv4 } from "uuid";

// Get or create user (for now, simplified)
const getOrCreateUser = async (userId?: string) => {
  if (userId) {
    const user = await User.findById(userId);
    if (user) return user;
  }

  // Create a default user if none exists
  const defaultUser = new User({
    name: "Default Teacher",
    email: `teacher_${Date.now()}@vedaai.local`,
  });

  return await defaultUser.save();
};

// Create a new assignment
export const createAssignment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { title, schoolName, subject, classLevel, timeAllowed, dueDate, instructions, questions, fileName } = req.body;

    const generatedTitle = title?.trim() || (subject ? `${subject} - Class ${classLevel}` : "Untitled Assignment");

    // Validation
    const errors: Record<string, string> = {};
    if (!dueDate) errors.dueDate = "Due date is required";
    if (!questions || questions.length === 0)
      errors.questions = "At least one question type is required";

    if (Object.keys(errors).length > 0) {
      throw validationErrorHandler(errors);
    }

    const user = await getOrCreateUser();

    const totalQuestions = questions.reduce(
      (sum: number, q: any) => sum + q.count,
      0
    );
    const totalMarks = questions.reduce(
      (sum: number, q: any) => sum + q.count * q.marks,
      0
    );

    const assignment = new Assignment({
      userId: user._id,
      title: generatedTitle,
      schoolName: schoolName || "",
      subject: subject || "",
      classLevel: classLevel || "",
      timeAllowed: timeAllowed || "",
      dueDate: new Date(dueDate),
      instructions: instructions || "",
      questions,
      fileName: fileName || null,
      totalQuestions,
      totalMarks,
    });

    const savedAssignment = await assignment.save();

    res.status(201).json({
      success: true,
      data: {
        id: savedAssignment._id,
        title: savedAssignment.title,
        dueDate: savedAssignment.dueDate,
        totalQuestions: savedAssignment.totalQuestions,
        totalMarks: savedAssignment.totalMarks,
        createdAt: savedAssignment.createdAt,
      },
    });
  }
);

// Get assignment by ID
export const getAssignment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      const error: any = new Error("Assignment not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  }
);

// Trigger assessment generation
export const generateAssessment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      const error: any = new Error("Assignment not found");
      error.status = 404;
      throw error;
    }

    const jobId = uuidv4();
    
    // Create job record in database
    const generationJob = new GenerationJob({
      jobId,
      assignmentId: assignment._id,
      userId: assignment.userId,
      status: "pending",
    });

    await generationJob.save();

    // Queue the job in BullMQ for processing (don't await - let it process in background)
    assessmentQueue.add(
      "generate-assessment",
      {
        assignmentId: assignment._id.toString(),
        userId: assignment.userId.toString(),
        jobId,
        title: assignment.title,
        schoolName: assignment.schoolName,
        subject: assignment.subject,
        classLevel: assignment.classLevel,
        timeAllowed: assignment.timeAllowed,
        instructions: assignment.instructions,
        totalQuestions: assignment.totalQuestions,
        totalMarks: assignment.totalMarks,
        questionTypes: assignment.questions,
      },
      {
        jobId: jobId,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      }
    ).catch((err) => {
      console.error(`❌ Failed to queue job ${jobId}:`, err);
    });

    res.status(202).json({
      success: true,
      data: {
        jobId,
        assignmentId: assignment._id,
        status: "pending",
        message: "Generation job queued",
      },
    });
  }
);

// Get job status
export const getJobStatus = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { jobId } = req.params;

    const job = await GenerationJob.findOne({ jobId } as any);
    if (!job) {
      const error: any = new Error("Job not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: {
        jobId: job.jobId,
        status: job.status,
        progress: job.progress,
        message: job.currentMessage,
        error: job.error,
      },
    });
  }
);

// Get generated assessment
export const getAssessment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { assessmentId } = req.params;

    const assessment = await GeneratedAssessment.findById(assessmentId);
    if (!assessment) {
      const error: any = new Error("Assessment not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: assessment,
    });
  }
);

// Get all generated assessments
export const getAllAssessments = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const assessments = await GeneratedAssessment.find({}, { sections: 0 }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: assessments,
    });
  }
);

// Delete generated assessment
export const deleteAssessment = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { assessmentId } = req.params;

    const assessment = await GeneratedAssessment.findByIdAndDelete(assessmentId);
    if (!assessment) {
      const error: any = new Error("Assessment not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Assessment deleted successfully",
    });
  }
);
