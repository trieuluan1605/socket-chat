import Message from "../models/Message";

const sendMessage = async (roomId: string, userId: string, content: string) => {
  return Message.create(roomId, userId, content);
};

const listMessages = async (roomId: string) => {
  return Message.findByRoom(roomId);
};

export default { sendMessage, listMessages };
