// npm i express ejs
const express = require('express');
// const nunjucks = reuiqre('nunjucks');
const app = express();
const path = require('path');
const port = 3000;

// 템플릿 엔진 설정.. ejs라는걸 사용할 예정.. (express가 기본지원)
app.set('view engine', 'ejs'); // views라는 폴더안의 *.ejs 파일을 찾는다.

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'));

    // index를 찾아서 (즉 index.ejs를 찾아서), 아래 변수들로 치환(replace)한다.
    res.render('index', { title: '나의타이틀', message: 'EJS 학습중입니다.'})
});

app.listen(port, () => {
    console.log('서버 레디');
});
