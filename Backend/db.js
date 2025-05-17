const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT UNIQUE,
    password TEXT,
    favourites TEXT
  )`);
});

module.exports = db;