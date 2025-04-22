const sqlite = require('better-sqlite3'); 
// 이녀석(?)은 동기로 동작함.. 따로 promise등 처리 안해도 됨.

const db = sqlite('test.db');

// 1. 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
)`);

// 2. 데이터 삽입
const insert = db.prepare('INSERT INTO greetings (message) VALUES (?)');
insert.run('Hello, BetterSQLite3!');

// 3. 데이터 조회
const select = db.prepare('SELECT * FROM greetings');
const greetings = select.all();
// console.log(greetings);

greetings.forEach((row) => {
    console.log(`인사${row.id}: ${row.message}`);
});
