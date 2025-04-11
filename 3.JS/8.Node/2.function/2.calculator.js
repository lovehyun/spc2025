// 덧셈 함수
function add(a, b) {
    return a + b;
}

// 뺄셈 함수
function sub(a, b) {
    return a - b;
}

// 곱셈 함수
function mul(a, b) {
    return a * b;
}

// 나눗셈 함수
function div(a, b) {
    if (b === 0) return '0으로 나눌 수 없습니다'
    return a / b;
}

// 출력 함수
function printScreen(text) {
    console.log(text);
}

// 다음 문제를 푸시오 (함수를 호출해서 화면에 결과를 출력)
// 1. 2 + 3 = ?
printScreen(add(2,3));
// 2. 2 - 3 = ?
printScreen(sub(2,3));
// 3. 2 * 3 = ?
printScreen(mul(2,3));
// 4. 2 / 3 = ?
printScreen(div(2,3));
// 여기까지 하고 잠시 생각해본후 아래...
// 5. 2 * 0 = ???
printScreen(mul(2,0));
// 6. 2 / 0 = ???
printScreen(div(2,0));
// 7. 6번의 오류를 해결하시오...
