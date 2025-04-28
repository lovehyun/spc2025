const sqlite3 = require('sqlite3');

// db 연결
// const db = new sqlite3.Database('database.db');
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('DB연결 실패');
    } else {
        console.log('DB연결 성공');
        // SQLite 에서도 외래키(foreign_key) 기능을 활성화 한다.
        db.run('PRAGMA foreign_keys = ON');
    }
});

module.exports = {
    db,
};
