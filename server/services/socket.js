const turso = require("./turso");
const { Server } = require("socket.io");

/**
 *
 * @param {Server} io
 */
const setupSockets = (io) => {
  io.on("connection", async (socket) => {
    // console.log("[User connected]");

    socket.emit("chat history", await turso.getMessageAll());

    socket.on("chat message", async ({ user, message }) => {
      const createTime = Date.now();
      io.emit("chat message", { user, message, createTime, updateTime: 0 });
      await turso.createMessage({ userId: user.id, message, createTime });
    });

    socket.on("disconnect", () => {
      // console.log("User disconnected");
    });
  });
};

module.exports = { setupSockets };
