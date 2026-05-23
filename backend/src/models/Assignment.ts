import mongoose, { Schema, Document } from "mongoose";

export interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

export interface IAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  schoolName: string;
  subject: string;
  classLevel: string;
  timeAllowed: string;
  dueDate: Date;
  instructions: string;
  questions: QuestionType[];
  fileUrl?: string;
  fileName?: string;
  totalQuestions: number;
  totalMarks: number;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    schoolName: { type: String, default: "" },
    subject: { type: String, default: "" },
    classLevel: { type: String, default: "" },
    timeAllowed: { type: String, default: "" },
    dueDate: { type: Date, required: true },
    instructions: { type: String, default: "" },
    questions: [
      {
        type: { type: String, required: true },
        count: { type: Number, required: true, min: 1 },
        marks: { type: Number, required: true, min: 1 },
      },
    ],
    fileUrl: { type: String, default: null },
    fileName: { type: String, default: null },
    totalQuestions: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>(
  "Assignment",
  assignmentSchema
);
