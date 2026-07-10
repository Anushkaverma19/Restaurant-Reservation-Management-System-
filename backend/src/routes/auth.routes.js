import express from "express";

import {
  register,
  login,
  profile,
  registerAdmin,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, profile);
router.post(
 "/register-admin",
 registerAdmin
);
export default router;