import express from "express";

import{
    createVital,
    getVitals
} from "../controllers/vitalController.js";

const router = express.Router();

router.post("/", createVital);
router.get("/", getVitals);

export default router;