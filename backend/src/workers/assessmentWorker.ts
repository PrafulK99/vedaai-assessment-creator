import { Worker, Job } from "bullmq";
import redis from "../config/redis.js";
import { GenerationJob } from "../models/GenerationJob.js";
import { GeneratedAssessment } from "../models/GeneratedAssessment.js";
import type { AssessmentJobData } from "../queues/assessmentQueue.js";

// Mock assessment generator (will be replaced with Gemini in Phase 3)
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

      // Generate mock assessment (Phase 3 will use Gemini API)
      const assessmentData = await generateMockAssessment(job.data);

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
