import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPatient,
  getPatients,
  updatePatientAIData,
  updatePatientStatus,
} from "../controllers/patientController.js";

  const router = express.Router();

  router.post("/",protect, createPatient);
  router.get("/",protect, getPatients);
  router.put("/:id/ai-data", protect, updatePatientAIData);
  router.put("/:id/status", protect, updatePatientStatus);
  
  export default router;