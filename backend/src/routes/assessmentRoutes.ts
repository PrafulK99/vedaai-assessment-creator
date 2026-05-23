import { Router } from "express";
import {
  createAssignment,
  getAssignment,
  generateAssessment,
  getJobStatus,
  getAssessment,
} from "../controllers/assessmentController.js";

const router = Router();

// Assignment routes
router.post("/assignments", createAssignment);
router.get("/assignments/:id", getAssignment);

// Generation routes
router.post("/assignments/:id/generate", generateAssessment);
router.get("/jobs/:jobId", getJobStatus);
router.get("/assessments/:assessmentId", getAssessment);

export default router;
