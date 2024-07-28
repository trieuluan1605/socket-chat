-- SQLite
DROP TABLE users;
CREATE TABLE
  users (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT,
    password TEXT
  );
INSERT INTO users (name, username, password) VALUES ('Admin', 'admin', 'xxx');

DROP TABLE messages;
CREATE TABLE
  messages (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    message TEXT,
    createTime INTEGER,
    updateTime INTEGER
  );
INSERT INTO messages (userId, message, createTime, updateTime) VALUES (1, 'Hello World', 1700000000000, 0);
