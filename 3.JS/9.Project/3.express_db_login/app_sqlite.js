const express = require('express');
const sqlite = require('sqlite3');

const app = express();
const db = new sqlite.Database('users.db');

app.use(express.static('public'));
app.use(express.urlencoded());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
        if (row) {
            res.send('로그인성공');
        } else {
            res.send('로그인실패');
        }
    });
});

app.listen(3000, () => {
    console.log('서버레디');
});
