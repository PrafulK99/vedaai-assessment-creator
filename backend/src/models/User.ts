import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  school?: string;
  subject?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    school: { type: String, default: null },
    subject: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
