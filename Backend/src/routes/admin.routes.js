import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getAdminProfile,
} from "../controllers/admin.controller.js";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin Authentication
router.post("/register", registerAdmin);      // POST /api/admin/register
router.post("/login", loginAdmin);           // POST /api/admin/login
router.post("/logout", verifyAdminJWT, logoutAdmin); // POST /api/admin/logout
router.post("/refresh-token", refreshAccessToken);  // POST /api/admin/refresh-token
router.get("/profile", verifyAdminJWT, getAdminProfile); // GET /api/admin/profile

export default router;
