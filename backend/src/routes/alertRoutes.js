import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getAlerts,
  getPatientAlerts,
  markAlertAsRead,
} from "../controllers/alertController.js";

const router = express.Router();

// Get all alerts
router.get("/",protect, getAlerts);

// Get alerts of one patient
router.get("/:patientId",protect, getPatientAlerts);

// Mark alert as read
router.put("/:id/read", protect, markAlertAsRead);

export default router;