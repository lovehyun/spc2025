// 별다른 말이 없으면, 우리는 commonjs 방식을 쓸것음..

const fs = require('fs');

console.log('파일읽기전');

const data = fs.readFileSync('example.txt','utf8');
console.log('데이터는: ', data);

console.log('파일읽은후');
