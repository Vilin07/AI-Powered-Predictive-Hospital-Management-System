import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  updateLiveVital,
  getLiveVitals,
  getLiveVitalByPatient,
} from "../controllers/liveVitalController.js";

const router = express.Router();

// Update/Create Live Vitals
router.post("/", updateLiveVital);

// Get All Live Vitals
router.get("/",protect, getLiveVitals);

// Get Single Patient Live Vitals
router.get("/:patientId",protect, getLiveVitalByPatient);

export default router;