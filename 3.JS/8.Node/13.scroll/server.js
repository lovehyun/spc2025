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
    // 미션2-1. 그래서, 난 어떻게 이 많은걸 나눌까~~~
    // 미션2-2. 이걸 구현.
    res.json(data);
});

app.listen(port, () => {
    console.log('서버 레디');
});
