// npm install readline

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, // 표준 입력 (키보드 입력)
    output: process.stdout // 표준 출력 (콘솔 출력)
});

console.log('입력전');

function userKeyboardInputHandler(input) {
    console.log('입력한 단은: ', input);

    const num = parseInt(input);

    if (!isNaN(num) && num > 0 && num < 10) {
        for (let i = 1; i <= 9; i++) {
            console.log(`${num} * ${i} = ${num * i}`);
        }
    } else {
        console.log('1부터 9까지의 숫자만 입력하시오.');
    }

    rl.close() // 입력받은 이후에 입력인터페이스 종료
}

rl.question('구구단의 단을 입력하시오: ', userKeyboardInputHandler);

// console.log('입력후');
