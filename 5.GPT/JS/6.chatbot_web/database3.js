const Database = require('better-sqlite3');

// SQLite DB 설정
// const db = new Database(':memory:'); // 파일에 저장하지 않고, 메모리에 임시 저장하는 DB
const db = new Database('history2.db'); // 파일에 저장하기

db.exec(`
    CREATE TABLE IF NOT EXISTS session (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS conversation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER,
        role TEXT,
        content TEXT)
`);

function getRecentConversation() {
    const stmt = db.prepare('SELECT * FROM conversation ORDER BY id DESC LIMIT 10'); // 최근 10개의 대화를 가져옴
    const rows = stmt.all();
    return rows.reverse(); // 최근 10개 가져와서, 오래된 질문을 먼저 넣기 위해서 순서 바꿈...
}

function newSession() {
    const result = db.prepare("INSERT INTO session DEFAULT VALUES").run();
    return result;
}

function getAllSessions() {
    const sessions = db.prepare("SELECT id, start_time FROM session ORDER BY start_time DESC").all();
    return sessions;
}

function getCurrentSession() {
    const session = db.prepare("SELECT id, start_time FROM session ORDER BY start_time DESC LIMIT 1").get();
    if (!session) {
        // 최근 대화가 없으면?? 새로 만들기...
        const insert = db.prepare("INSERT INTO session DEFAULT VALUES").run();
        return db.prepare("SELECT id, start_time FROM session WHERE id=?").get(insert.lastInsertRowid);
    }
    return session;
}

function getConversationBySession(sessionId) {
    return db.prepare("SELECT * FROM conversation WHERE session_id=? ORDER BY id").all(sessionId);
}

function saveMessage(role, userInput, sessionId) {
    db.prepare('INSERT INTO conversation (role, content, sessino_id) VALUES (?,?,?)').run(role, userInput, sessionId);
}

module.exports = {
    getRecentConversation,
    newSession,
    getAllSessions,
    getCurrentSession,
    getConversationBySession,
    saveMessage,
}
