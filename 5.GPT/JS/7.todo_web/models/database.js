const Database = require('better-sqlite3');
const db = new Database('./todos.db')

const query = `
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )
`

db.prepare(query).run();

module.exports = db;
