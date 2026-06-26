import express from "express";

import {
  getAlerts,
  getPatientAlerts,
  markAlertAsRead,
} from "../controllers/alertController.js";

const router = express.Router();

// Get all alerts
router.get("/", getAlerts);

// Get alerts of one patient
router.get("/:patientId", getPatientAlerts);

// Mark alert as read
router.put("/:id/read", markAlertAsRead);

export default router;