import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController";
import { authenticateJWT } from "../utils/jwt";

const router = express.Router();

// Send a new message
router.post("/", authenticateJWT, sendMessage);

// Get messages for a specific room
router.get("/:roomId", authenticateJWT, getMessages);

export default router;
