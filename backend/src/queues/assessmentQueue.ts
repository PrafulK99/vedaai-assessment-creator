import { Queue } from "bullmq";
import redis from "../config/redis.js";

export interface AssessmentJobData {
  assignmentId: string;
  userId: string;
  jobId: string;
  title: string;
  schoolName: string;
  subject: string;
  classLevel: string;
  timeAllowed: string;
  instructions: string;
  totalQuestions: number;
  totalMarks: number;
  questionTypes: Array<{ type: string; count: number; marks: number }>;
}

// Create the assessment generation queue
export const assessmentQueue = new Queue<AssessmentJobData>(
  "assessment-generation",
  {
    connection: redis,
  }
);

// Queue event listeners
assessmentQueue.on("completed" as any, (job: any) => {
  console.log(`✅ Job ${job.id} completed`);
});

assessmentQueue.on("failed" as any, (job: any, err: any) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

assessmentQueue.on("active" as any, (job: any) => {
  console.log(`⚙️ Job ${job.id} started processing`);
});

export default assessmentQueue;
