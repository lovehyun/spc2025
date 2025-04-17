const express = require('express');
const path = require('path');
const morgan = require('morgan');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

// 미들웨어를 통해서, 사용자의 입력값의 특정 데이터를 잘~ 파싱해서, req.body 에 담아준다.
app.use(express.json());
app.use(express.urlencoded()); 
app.use(express.text());

// 미션1. 클라이언트가 원하는 자원을 만든다
app.post('/submit-json', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);
    // res.send("응"); // 기본 응답값은 200
    // res.status(201).send(); // 응답값의 헤더에 201로 셋팅해서, 바디의 내용을 아무것도 안보냄. (Content-Length: 0)
    // res.status(201).send("응"); // 응답값의 헤더에 201로 셋팅해서, 바디의 내용을 아무것도 안보냄. (Content-Length: 0)
    // res.status(201).end(); // 응답값의 헤더에 201로 셋팅해서, 바디 자체가 없음.

    const reply = {
        result: "success",
        message: "잘 받았음"
    }

    // res.status(200).json(reply);
    res.json(reply);
});

app.post('/submit-form', (req, res) => {
    // const jsonData = req.body; // json 이 아니었어서.. 제대로 파싱이 안됨..
    const formData = req.body; // json 이 아니었어서.. 제대로 파싱이 안됨..
    console.log(formData);

    res.send(formData);
})

app.post('/submit-text', (req, res) => {
    const textData = req.body; // json 이 아니었어서.. 제대로 파싱이 안됨..
    console.log(textData);

    res.send(textData);
})


app.listen(port, () => {
    console.log('서버 레디');
});
