const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const cors = require("cors");
const { setupSockets } = require("./socket");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Sử dụng middleware CORS
app.use(cors());

// Thiết lập socket
setupSockets(io);

// Cấu hình middleware và routes
app.use(express.static(path.join(__dirname, "../client/public")));

// Khởi động server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
