import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load env vars IMMEDIATELY
dotenv.config();

import connectDB from "./config/database.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import assessmentWorker from "./workers/assessmentWorker.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.get("/", (_, res) => {
  res.json({ message: "VedaAI Backend Running", status: "ok" });
});

app.use("/api", assessmentRoutes);

// Health check
app.get("/health", (_, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// 404 handler - must come before error handler
app.use((_, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});