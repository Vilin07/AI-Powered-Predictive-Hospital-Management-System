import express from "express";

import {
  getAllStaff,
  changeStaffStatus,
} from "../controllers/staffController.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";


const router = express.Router();


// Get all staff
router.get(
  "/",
  protect,
  authorize("Administrator"),
  getAllStaff
);


// Activate / Deactivate staff
router.patch(
  "/:id/status",
  protect,
  authorize("Administrator"),
  changeStaffStatus
);


export default router;