const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

(async () => {
    await new Promise((resolve, reject) => { // pending, fulfilled, rejected
        db.run('CREATE TABLE IF NOT EXISTS messages (text TEXT)', (err) => {
            if (err) reject(err);
            else resolve();
        });
    })

    console.log('헬로우');
})();
