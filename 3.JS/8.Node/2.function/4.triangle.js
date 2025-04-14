const ROWS = 8; // 총 출력할 줄 수

function leftTriangle() { 
    let currentRow = 1;
    while (currentRow <= ROWS) { // while 이든 for 등 상관없음.
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}

leftTriangle();

function leftTriangle2() {
    for (let r = 1; r <= ROWS; r++) {
        let stars = ""
        for (let c = 1; c <= r; c++) {
            // console.log('*');
            stars += "*";
        }
        console.log(stars);
    }
    // console.log('**');
    // console.log('***');
    // console.log('****');
    // console.log('*****');
}

console.log('---');
leftTriangle2();

function leftTriangle3(rows = 5) { // 함수의 인자를 받으면서 기본값 설정
    for (let i = 1; i <= rows; i++) {
        console.log('*'.repeat(i));
    }
}

console.log('---');
leftTriangle3();

function invertedLeftTriangle3(rows = 5) { // 함수의 인자를 받으면서 기본값 설정
    for (let i = rows; i >= 1; i--) {
        console.log('*'.repeat(i));
    }
}

console.log('---');
invertedLeftTriangle3();

function rightTriangle(rows = 5) {
    for (let i = 1; i <= rows; i++) {
        console.log(' '.repeat(rows-i) + '*'.repeat(i));
    }
}

console.log('---');
rightTriangle();
