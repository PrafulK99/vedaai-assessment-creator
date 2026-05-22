import mongoose, { Schema, Document } from "mongoose";

export interface IGenerationJob extends Document {
  jobId: string;
  assignmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  currentMessage: string;
  error?: string;
  retries: number;
  maxRetries: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const generationJobSchema = new Schema<IGenerationJob>(
  {
    jobId: { type: String, required: true, unique: true },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    currentMessage: { type: String, default: "Initializing..." },
    error: { type: String, default: null },
    retries: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const GenerationJob = mongoose.model<IGenerationJob>(
  "GenerationJob",
  generationJobSchema
);
