import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createPatient,
    getPatients
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/",protect, createPatient);
router.get("/",protect, getPatients);

export default router;