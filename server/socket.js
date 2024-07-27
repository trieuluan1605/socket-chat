function setupSockets(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Lắng nghe sự kiện 'chat message'
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      // Phát lại thông điệp tới tất cả các kết nối
      io.emit("chat message", msg);
    });

    // Xử lý khi người dùng ngắt kết nối
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = { setupSockets };
