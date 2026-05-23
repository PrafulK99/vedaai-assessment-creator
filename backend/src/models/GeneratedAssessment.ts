import mongoose, { Schema, Document } from "mongoose";

export interface Question {
  id: string;
  text: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  options?: string[];
  answer?: string;
}

export interface Section {
  id: string;
  instructions: string;
  questions: Question[];
}

export interface IGeneratedAssessment extends Document {
  assignmentId: mongoose.Types.ObjectId;
  jobId: string;
  title: string;
  schoolName: string;
  subject: string;
  classLevel: string;
  timeAllowed: string;
  sections: Section[];
  totalQuestions: number;
  totalMarks: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  marks: { type: Number, required: true },
  options: [String],
  answer: String,
});

const sectionSchema = new Schema({
  id: { type: String, required: true },
  instructions: { type: String, default: "" },
  questions: [questionSchema],
});

const generatedAssessmentSchema = new Schema<IGeneratedAssessment>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    jobId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    schoolName: { type: String, default: "" },
    subject: { type: String, default: "" },
    classLevel: { type: String, default: "" },
    timeAllowed: { type: String, default: "" },
    sections: [sectionSchema],
    totalQuestions: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const GeneratedAssessment = mongoose.model<IGeneratedAssessment>(
  "GeneratedAssessment",
  generatedAssessmentSchema
);
