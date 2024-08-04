import client from "../utils/db";

class User {
  id: string;
  name: string;
  username: string;
  password: string;

  constructor(id: string, name: string, username: string, password: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  static async create(username: string, password: string): Promise<User> {
    const result: any = await client.execute({
      sql: "INSERT INTO users (name, username, password) VALUES (?, ?, ?) RETURNING id, username, name",
      args: [username, username, password],
    });
    const user = result.rows[0];
    return new User(user.id, user.name, user.username, user.password);
  }

  static async findByUsername(username: string): Promise<User | null> {
    const result: any = await client.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });
    const user = result.rows[0];
    return user
      ? new User(user.id, user.name, user.username, user.password)
      : null;
  }

  static async findById(id: string): Promise<User | null> {
    const result: any = await client.execute({
      sql: "SELECT * FROM users WHERE id = ?",
      args: [id],
    });
    const user = result.rows[0];
    return user
      ? new User(user.id, user.name, user.username, user.password)
      : null;
  }

  async save(): Promise<User> {
    const result: any = await client.execute({
      sql: "UPDATE users SET username = ?, password = ? WHERE id = ? RETURNING *",
      args: [this.username, this.password, this.id],
    });
    const user = result.rows[0];
    return new User(user.id, user.name, user.username, user.password);
  }

  async delete(): Promise<void> {
    await client.execute({
      sql: "DELETE FROM users WHERE id = ?",
      args: [this.id],
    });
  }
}

export default User;
