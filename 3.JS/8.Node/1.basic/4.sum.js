function sum_to_num(number) {
    // 주어진 숫자까지의 합산을 for 문으로 구현하시오...
    let sum = 0;
    for (let count = 1; count <= number; count++) {
        sum = sum + count;
    }

    console.log(`${number} 까지의 합산은: ${sum}`);
}

sum_to_num(10);
sum_to_num(100);
sum_to_num(1_000);
sum_to_num(10_000);
sum_to_num(10_000_000);
sum_to_num(1_000_000_000);
// 미션1. 주어진 숫자까지의 합산을 구하시오
// 1부터 10까지의 합은? 55
// 1부터 100까지의 합은? 5050
// 1부터 1000까지의 합은? 500500
// 힌트: 1부터 10까지의 합산은??
// 0 + 1 = 1  
// 1 + 2 = 3  
// 3 + 3 = 6  
// 6 + 4 = 10  
// 10 + 5 = 15  
// 15 + 6 = 21  
// 21 + 7 = 28  
// 28 + 8 = 36  
// 36 + 9 = 45  
// 45 + 10 = 55
// 변수를 만들어 놓고, 그 변수에다가 (i=1...10) 까지를 순차적으로 더하는코드

// 가우스 공식을 이용한 문제 풀이
function sum_gauss_num(number) {
    return (number * (number + 1)) / 2;
}

console.log('가우스 공식을 활용한 합산:', sum_gauss_num(10));
console.log('가우스 공식을 활용한 합산:', sum_gauss_num(100));
console.log('가우스 공식을 활용한 합산:', sum_gauss_num(1_000));
console.log('가우스 공식을 활용한 합산:', sum_gauss_num(10_000));
console.log('가우스 공식을 활용한 합산:', sum_gauss_num(10_000_000));
console.log('가우스 공식을 활용한 합산:', sum_gauss_num(1_000_000_000));
