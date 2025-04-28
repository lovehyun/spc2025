const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes'); // index.js

const app = express();

// 미들웨어
app.use(morgan('dev'));
app.use(express.json()); // req.body 안에 프런트엔드에서 보낸 json 이 담긴다.
app.use(session({
    secret: 'this-is-my-password',
    resave: false, // 변경 없어도 매번 저장할거냐?
    saveUninitialized: false // 초기화 안된것도 저장할거냐?
}));

// 정적 파일 제공
app.use(express.static('public'));

// 메인 API -->
app.use('/api', routes);
// 메인 API <--

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log('서버 시작');
});
