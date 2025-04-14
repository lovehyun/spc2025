function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    // 0으로 못나누게 해야 좋은거지만.. 일단 생략.
    return a / b;
}

// 모듈 내보내기
module.exports = {
    add, 
    sub, 
    mul, 
    div,
}
