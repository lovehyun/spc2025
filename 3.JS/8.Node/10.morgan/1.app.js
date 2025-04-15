const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// 로깅을 해주는 외부 라이브러리 = morgan
// 로그의 다양한 포멧들... 
//  - 개발할때 편한 로그: 'dev'
//  - 운영할땐.. 웹서버같은 로그: 'combined'
//  - 커스텀하게 설정도 가능: ':method :url :status :response-time'
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('헬로우');
});

app.get('/user', (req, res) => {
    res.send('헬로우 사용자 정보');
});

app.delete('/user', (req, res) => {
    res.send('헬로우 사용자 삭제');
});

app.listen(port, () => {
    console.log('서버 레디');
});
