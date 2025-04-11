const stringNumber = "42"; // 42 가 아니고, 글자 "사이" 

console.log(stringNumber + 2);

const number = parseInt(stringNumber)

console.log(number + 2);

console.log(typeof stringNumber);
console.log(typeof number);

// 참고... --->
const number2 = Number(stringNumber);
console.log(number2)
console.log(typeof number2)

const User = {
    name: 'John',
    age: 30
}
console.log(typeof User);
// <---

// 다시 빌트인 함수...
// setTimeout(function, delay(ms));
setTimeout(() => {
    console.log('1초 후에 출력됨');
}, 1000);

console.log('끝');

const timerId = setTimeout(() => {
    console.log('3초 후에 출력됨');
}, 3000);

console.log('진짜끝');
// console.log('타이머ID:', timerId);
clearTimeout(timerId);
