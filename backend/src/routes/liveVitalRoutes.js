import express from "express";

import {
  updateLiveVital,
  getLiveVitals,
  getLiveVitalByPatient,
} from "../controllers/liveVitalController.js";

const router = express.Router();

// Update/Create Live Vitals
router.post("/", updateLiveVital);

// Get All Live Vitals
router.get("/", getLiveVitals);

// Get Single Patient Live Vitals
router.get("/:patientId", getLiveVitalByPatient);

export default router;