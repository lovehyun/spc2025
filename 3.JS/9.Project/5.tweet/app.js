const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();

// 미들웨어
app.use(morgan('dev'));
app.use(express.json()); // req.body 안에 프런트엔드에서 보낸 json 이 담긴다.

// 정적 파일 제공
app.use(express.static('public'));

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

// 메인 API -->
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM user WHERE email=?';
    db.get(query, [email], (err, user) => {
        if (err || !user || user.password !== password) { // 나중에는 bcrypt 로 암호화 된 걸로 비교해야함.
            return res.status(401).json({'error': '로그인에 실패하였습니다.'});
        }

        res.json({ message: '로그인 성공!' });
    })
});

app.get('/api/tweets', (req, res) => {
    const query = `
        SELECT tweet.*, user.username 
        FROM tweet 
        JOIN user ON tweet.user_id = user.id
        ORDER BY tweet.id DESC
    `;
    db.all(query, [], (err, tweets) => {
        res.json(tweets);
    })
});

app.post('/api/tweet', (req, res) => {
    const { content } = req.body;

    const query = 'INSERT INTO tweet (content, user_id) VALUES (?, ?)';
    db.run(query, [content, 1], (err) => {
        if (err) {
            return res.status(500).json({ error: '트윗 작성 실패' });
        } else {
            res.json({ message: '트윗 작성 완료' });
        }
    });
});

// 메인 API <--

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log('서버 시작');
});
