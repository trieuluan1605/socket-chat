import { Server } from "socket.io";
import Room from "../models/Room";
import Message from "../models/Message";

const setupChatSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("create room", async (roomName) => {
      const room = await Room.create(roomName);
      socket.join(room.id);
      socket.emit("room created", room);
      console.log(`Room created ${room.name}#${room.id}`);
    });

    socket.on("join room", async (roomId) => {
      const room = await Room.findById(roomId);
      let messages: any = [];

      if (room) {
        messages = await Message.findByRoom(room.id);
        socket.join(roomId);
        console.log(`User joined room ${room.name}#${room.id}`);
      }
      socket.emit("room joined", room, messages);
    });

    socket.on("chat message", async ({ room, user, content }) => {
      const chatMessage = {
        userId: user.id,
        name: user.name,
        username: user.username,
        content,
        createTime: Date.now(),
      };
      io.to(room.id).emit("chat message", chatMessage);
      console.log(`Message sent to room ${room.name}#${room.id}: ${content}`);
      await Message.create(room.id, user.id, content);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default setupChatSocket;
