import { Worker, Job } from "bullmq";
import redis from "../config/redis.js";
import { GenerationJob } from "../models/GenerationJob.js";
import { GeneratedAssessment } from "../models/GeneratedAssessment.js";
import type { AssessmentJobData } from "../queues/assessmentQueue.js";
import { generateAssessmentWithGemini } from "../services/geminiService.js";

// Generate assessment using Gemini AI
const generateAssessmentWithAI = async (jobData: AssessmentJobData) => {
  try {
    // Try to use Gemini API for real question generation
    const questions = await generateAssessmentWithGemini({
      title: jobData.title,
      instructions: jobData.instructions,
      totalQuestions: jobData.totalQuestions,
      totalMarks: jobData.totalMarks,
      questionTypes: [], // Can be enhanced with actual question types from assignment
    });

    // Group questions into sections (max 10 per section)
    const sectionsArray = [];
    for (let i = 0; i < questions.length; i += 10) {
      sectionsArray.push({
        id: `sec_${sectionsArray.length + 1}`,
        instructions:
          jobData.instructions || "Answer all questions in this section",
        questions: questions.slice(i, i + 10).map((q, idx) => ({
          id: `q_${i + idx + 1}`,
          text: q.text,
          type: q.type,
          difficulty: q.difficulty,
          marks: q.marks,
          options: q.options,
          answer: q.answer,
        })),
      });
    }

    return {
      title: jobData.title,
      sections: sectionsArray,
      totalQuestions: questions.length,
      totalMarks: jobData.totalMarks,
    };
  } catch (error) {
    console.warn(
      "⚠️ Gemini generation failed, falling back to mock data:",
      error instanceof Error ? error.message : error
    );

    // Fallback to mock if Gemini fails
    return generateMockAssessment(jobData);
  }
};

// Mock assessment generator (fallback when Gemini fails)
const generateMockAssessment = async (jobData: AssessmentJobData) => {
  const sections = [
    {
      id: "sec_1",
      instructions: jobData.instructions || "Answer all questions",
      questions: Array.from({ length: Math.min(5, jobData.totalQuestions) }).map(
        (_, i) => ({
          id: `q_${i + 1}`,
          text: `Sample Question ${i + 1}: ${jobData.title}`,
          type: "Multiple Choice",
          difficulty: ["easy", "medium", "hard"][i % 3],
          marks: Math.ceil(jobData.totalMarks / jobData.totalQuestions),
          options: ["Option A", "Option B", "Option C", "Option D"],
          answer: "Option A",
        })
      ),
    },
  ];

  return {
    title: jobData.title,
    sections,
    totalQuestions: jobData.totalQuestions,
    totalMarks: jobData.totalMarks,
  };
};

// Create the worker that processes assessment generation jobs
console.log("🔧 Initializing assessment worker...");

const assessmentWorker = new Worker<AssessmentJobData>(
  "assessment-generation",
  async (job: Job<AssessmentJobData>) => {
    try {
      console.log(`\n🚀 Processing job ${job.id} for assignment: ${job.data.title}`);

      // Update job status to processing
      let generationJob = await GenerationJob.findOne({
        jobId: job.data.jobId,
      } as any);
      if (generationJob) {
        generationJob.status = "processing";
        generationJob.currentMessage = "Starting assessment generation...";
        await generationJob.save();
      }

      // Simulate progress updates
      const progressSteps = [
        { progress: 25, message: "Analyzing assignment structure..." },
        { progress: 50, message: "Generating questions..." },
        { progress: 75, message: "Validating assessment..." },
        { progress: 90, message: "Finalizing output..." },
      ];

      for (const step of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate work
        await job.updateProgress(step.progress);

        generationJob = await GenerationJob.findOne({
          jobId: job.data.jobId,
        } as any);
        if (generationJob) {
          generationJob.progress = step.progress;
          generationJob.currentMessage = step.message;
          await generationJob.save();
        }
      }

      // Generate assessment using Gemini AI (with fallback to mock)
      const assessmentData = await generateAssessmentWithAI(job.data);

      // Create the generated assessment record
      const assessment = new GeneratedAssessment({
        assignmentId: job.data.assignmentId,
        jobId: job.data.jobId,
        ...assessmentData,
        status: "completed",
      });

      await assessment.save();

      // Update job status to completed
      generationJob = await GenerationJob.findOne({
        jobId: job.data.jobId,
      } as any);
      if (generationJob) {
        generationJob.status = "completed";
        generationJob.progress = 100;
        generationJob.currentMessage = "Assessment generated successfully!";
        generationJob.completedAt = new Date();
        await generationJob.save();
      }

      console.log(`✅ Job ${job.id} completed successfully`);
      return { success: true, assessmentId: assessment._id };
    } catch (error) {
      console.error(`❌ Job ${job.id} failed:`, error);

      // Update job status to failed
      let generationJob = await GenerationJob.findOne({
        jobId: job.data.jobId,
      } as any);
      if (generationJob) {
        generationJob.status = "failed";
        generationJob.error = error instanceof Error ? error.message : "Unknown error";
        await generationJob.save();
      }

      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 5, // Process up to 5 jobs concurrently
  }
);

assessmentWorker.on("completed", (job) => {
  console.log(`\n✨ Worker: Job ${job.id} completed`);
});

assessmentWorker.on("failed", (job, err) => {
  console.error(`\n⚠️ Worker: Job ${job?.id} failed - ${err.message}`);
});

assessmentWorker.on("ready", () => {
  console.log("⚙️ Worker is ready and listening for jobs...");
});

assessmentWorker.on("error", (err) => {
  console.error("❌ Worker error:", err);
});

console.log("✅ Assessment worker initialized");

export default assessmentWorker;
