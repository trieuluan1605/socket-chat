const path = require("path");
const { createClient } = require("@libsql/client");

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Users table ==============================================================================
async function getUserAll() {
  return await db.execute("SELECT * FROM users");
}

async function getUser(id) {
  return await db.execute({
    sql: "SELECT * FROM users WHERE (:id)",
    args: { id },
  });
}

async function createUser(values) {
  return await db.execute({
    sql: "INSERT INTO users (name, username, password) VALUES (:name, :username, :password)",
    args: values,
  });
}

// Messages table ==============================================================================
async function getMessageAll() {
  return (
    await db.execute(
      `SELECT messages.*, users.name, users.username
      FROM messages
      JOIN users ON messages.userId = users.id
      ORDER BY id desc`
    )
  ).rows;
}

async function createMessage(values) {
  return await db.execute({
    sql: "INSERT INTO messages (userId, message, createTime, updateTime) VALUES (:userId, :message, :createTime, :updateTime)",
    args: { ...values, updateTime: 0 },
  });
}

module.exports = {
  db,
  getUserAll,
  getUser,
  createUser,
  getMessageAll,
  createMessage,
};
