require("dotenv-flow").config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
import setupChatSocket from "./sockets/chat";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (e.g., cookies)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Middleware to parse JSON bodies
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

// Setup WebSocket for chat
setupChatSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
