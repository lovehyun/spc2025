const express = require('express')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('헬로우');
});

app.post('/', (req, res) => {
    res.send('POST 메세지 잘 받았음');
});

app.put('/', (req, res) => {
    res.send('PUT 요청 잘 받았음');
});

app.delete('/', (req, res) => {
    res.send('니가 시킨대로 잘 삭제하겠음');
});

app.get('/user', (req, res) => {
    res.send('사용자 정보조회');
});

app.post('/user', (req, res) => {
    res.send('사용자 생성');
});

app.put('/user', (req, res) => {
    res.send('사용자 정보 수정');
});

app.delete('/user', (req, res) => {
    res.send('사용자 삭제');
});

app.listen(port, () => {
    console.log(`서버 레디 on ${port}`)
});
