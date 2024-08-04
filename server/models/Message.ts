import client from "../utils/db";

class Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  timestamp: Date;

  constructor(
    id: string,
    roomId: string,
    userId: string,
    content: string,
    timestamp: Date
  ) {
    this.id = id;
    this.roomId = roomId;
    this.userId = userId;
    this.content = content;
    this.timestamp = timestamp;
  }

  static async create(
    roomId: string,
    userId: string,
    content: string
  ): Promise<Message> {
    const result: any = await client.execute({
      sql: `INSERT INTO messages (room_id, user_id, content, timestamp) 
            VALUES (?, ?, ?, datetime('now')) RETURNING id, room_id, user_id, content, timestamp`,
      args: [roomId, userId, content],
    });
    const message = result.rows[0] as Message;
    return new Message(
      message.id,
      message.roomId,
      message.userId,
      message.content,
      new Date(message.timestamp)
    );
  }

  static async findByRoom(roomId: string): Promise<Message[]> {
    const result: any = await client.execute({
      sql: "SELECT messages.*, users.name FROM messages JOIN users ON messages.user_id = users.id WHERE messages.room_id = ? ORDER BY messages.timestamp desc",
      args: [roomId],
    });
    return result.rows;
  }
}

export default Message;
