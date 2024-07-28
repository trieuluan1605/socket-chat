require("dotenv-flow").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const routerConfig = require("./services/router");
const { setupSockets } = require("./services/socket");

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

routerConfig(app);
setupSockets(io);

// Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
