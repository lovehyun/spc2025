// 별다른 말이 없으면, 우리는 commonjs 방식을 쓸것음..

const fs = require('fs');

// function myCallbackFunction(err, data) {
//     if (err) {
//         console.error('에러가 있음, 에러는:', err);
//     } else {
//         console.log('에러가 없음, 데이터는:', data);
//     }
// }

// fs.readFile('example.txt','utf8', myCallbackFunction);


// fs.readFile('example.txt','utf8', function (err, data) { // 익명함수
//     if (err) {
//         console.error('에러가 있음, 에러는:', err);
//     } else {
//         console.log('에러가 없음, 데이터는:', data);
//     }
// });

console.log('파일읽기전');

fs.readFile('example.txt','utf8', (err, data) => { // 화살표함수
    if (err) {
        console.error('에러가 있음, 에러는:', err);
    } else {
        console.log('에러가 없음, 데이터는:', data);
    }
});

console.log('파일읽은후');
