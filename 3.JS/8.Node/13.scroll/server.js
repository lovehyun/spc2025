const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

// 보내줄 데이터 정의
// function myData(_, i) {
//     return `Item ${i + 1}`
// }
// const data = Array.from({ length: 200 }, myData);
const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/get-items', (req, res) => {
    // 미션2. 원하는 갯수만큼만 보내주려면 어떻게 설계?? 
    //        입력 파라미터를 어떻게 정해야 할까??
    // query 파라미터로 GET으로, start=10, end=20 라는 변수에 담아줄거다

    // const start = req.query.start;
    // const end = req.query.end;
    const { start, end } = req.query;

    // const userItems = [];
    // for (let i = start; i < end; i++) {
    //     userItems.push(data[i])
    // }
    // console.log(userItems);
    const userItems = data.slice(start,end);

    res.json(userItems);
});

app.listen(port, () => {
    console.log('서버 레디');
});
