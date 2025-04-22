const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

// 내가 쓸 라이브러리리 함수를 내가 만든형태...
function runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

(async () => {
    await runQuery('CREATE TABLE IF NOT EXIST messages (text TEXT)');
    await runQuery("INSERT INTO messages (text) VALUES (?)', ['Hello, SQLite!']")
    console.log('여기는 동기화가 보장된 곳...')
})();
