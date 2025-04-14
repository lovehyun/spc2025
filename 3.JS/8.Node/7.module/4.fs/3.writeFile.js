const fs = require('fs');

console.log('파일쓰기전');

const data = "내가 파일에 쓰고 싶은 내용"

fs.writeFile('example.txt', data, { encoding:'utf8', flag:'a'}, (err) => { // 화살표함수
    if (err) {
        console.error('에러가 있음, 에러는:', err);
    } else {
        console.log('에러가 없음, 쓰기 완료');
    }
});

console.log('파일쓴후'); // 위에 콜백이 비동기라서, 이게 먼저 출력됨.
