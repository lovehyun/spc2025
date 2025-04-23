const express = require('express');
const cookieParser = require('cookie-parser'); // 쿠키 파서 불러와서
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); // 미들웨어에 넣으면, 또 알아서 해준다.

app.get('/', (req, res) => {
    res.cookie('your_number', '1234');
    res.send('은행방문 & 접수완료');
});

app.get('/readcookie', (req, res) => {
    const yourcookie = req.cookies;
    console.log('가져온쿠키는: ', yourcookie);
    res.send(`니가 가져온쿠키는: ${JSON.stringify(yourcookie)}`);
})

app.listen(port, () => {
    console.log('레디');
});
