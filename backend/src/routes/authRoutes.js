import express from "express";

import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/authController.js";

import { protect,authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  protect,
  authorize("Administrator"),
  register
);

router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/logout", protect, logout);

export default router;