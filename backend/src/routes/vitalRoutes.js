import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import{
    createVital,
    getVitals
} from "../controllers/vitalController.js";

const router = express.Router();

router.post("/",protect, createVital);
router.get("/",protect, getVitals);

export default router;