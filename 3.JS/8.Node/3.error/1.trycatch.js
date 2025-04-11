// const result = someVariableName * 2;
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error

try {
    const result = someVariableName * 2;
} catch (error) { // 발생하는 모든 오류를 퉁~ 쳐서 잡은것...
    console.error('오류가 발생했음: ', error.message);
}

console.log('계속 진행중...');

// 참조 오류 예시
try {
    const result = someVariableName * 2;
} catch (error) {
    if (error instanceof ReferenceError) {
        console.log('참조 오류 발생: ', error.message);
    } else {
        console.log('그 외 다른 오류 발생', error.message);
    }
}

// 문법 오류 예시
try {
    eval("alert('Hello)"); // 따옴표 하나 의도적으로 빠졌음
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log('문법 오류 발생: ', error.message);
    } else {
        console.log('그 외 다른 오류 발생', error.message);
    }
}

// 범위 에러 예시
try {
    let arr = new Array(-1); // 배열은 길이가 양수여야함.
} catch (error) {
    if (error instanceof RangeError) {
        console.log('범위 오류 발생: ', error.message);
    } else {
        console.log('그 외 오류', error.message);
    }
}

// 에러 만들기..
function divide(a, b) {
    // 입력한 값이 무조건 숫자인지 확인하는 예시
    if ((typeof a !== 'number') || (typeof b !== 'number')) { 
        throw new TypeError('숫자를 입력하시오');
    }

    // 입력한 숫자가 2자리까지만 입력을 원하는 예시
    if ((a.toString().length > 2) || (b.toString().length > 2)) {
        throw new RangeError('2자리 숫자만 입력하시오');
    }

    if (b === 0) {
        throw new Error('0으로 나눌수 없습니다');
    }

    return a / b;
}

try {
    result = divide(999, 9);
    console.log('나눗셈결과: ', result);
} catch (error) {
    console.log('오류발생: ', error.message);
}
