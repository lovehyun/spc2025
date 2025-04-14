const express = require('express');

const app = express();
const port = 3000;

// 라우트를 만드는 과정
// 사용자는 나의 앱에 루트 디렉토리(/) 에 GET 으로 요청을 할 수 있다.
app.get('/', (req, res) => {
    // 이걸 통해서 기본 header와 body가 잘~ 만들어짐..
    res.send('Hello, Express!');
});

app.get('/user', (req, res) => {
    // 이걸 통해서 기본 header와 body가 잘~ 만들어짐..
    res.send('Hello, User!');
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 준비됨. ${port} 포트에서...`);
});
