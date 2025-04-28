const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '2.example.html'));
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('입력값: ', email, password);

    await sleep(2000); // 괜히 2초 기다림..

    res.json({ message: '로그인에 성공하였습니다.'});
})

const port = 3000;
app.listen(port, () => {
    console.log('서버레디');
});
