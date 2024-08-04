import client from "../utils/db";

class Room {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static async create(name: string): Promise<Room> {
    const result: any = await client.execute({
      sql: "INSERT INTO rooms (name) VALUES (?) RETURNING id, name",
      args: [name],
    });
    const room = result.rows[0] as Room;
    return new Room(room.id, room.name);
  }

  static async getAll(): Promise<Room[]> {
    const result: any = await client.execute("SELECT id, name FROM rooms");
    return result.rows.map((room: any) => new Room(room.id, room.name));
  }

  static async findById(id: string): Promise<Room | null> {
    const result = await client.execute({
      sql: "SELECT id, name FROM rooms WHERE id = ?",
      args: [id],
    });
    const firstRow: Room = result.rows[0] as any;
    return firstRow ? new Room(firstRow.id, firstRow.name) : null;
  }
}

export default Room;
