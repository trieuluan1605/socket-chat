import express from "express";
import { createRoom, getRooms } from "../controllers/roomController";
import { authenticateJWT } from "../utils/jwt";

const router = express.Router();

// Create a new room
router.post("/create", authenticateJWT, createRoom);

// Get list of all rooms
router.get("/", authenticateJWT, getRooms);

export default router;
