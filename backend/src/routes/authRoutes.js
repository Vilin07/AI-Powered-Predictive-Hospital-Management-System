import express from "express";

import {
  register,
  login,
} from "../controllers/authController.js";

const router = express.Router();

// Staff Registration
router.post("/register", register);

// Staff Login
router.post("/login", login);

export default router;