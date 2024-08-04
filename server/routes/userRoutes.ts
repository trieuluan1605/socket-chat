import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/userController";
import { authenticateJWT } from "../utils/jwt";

const router = express.Router();

// Get user profile
router.get("/profile", authenticateJWT, getUserProfile);

// Update user profile
router.put("/profile", authenticateJWT, updateUserProfile);

// Delete user account
router.delete("/profile", authenticateJWT, deleteUserAccount);

export default router;
