class Car {
    // let make = '';
    // let model = '';

    constructor(make, model) { // 초기화 함수
        this.make = make; // 객체의 내부 변수(속성 = property) 에 저장
        this.model = model;
    }

    drive() {
        return `${this.make} ${this.model} is Driving...`
    }

    doorOpen() {
        return `${this.make} ${this.model} 의 문이 열립니다.`
    }

    doorClose() {
        return `${this.make} ${this.model} 의 문이 닫힙니다.`
    }
}

const myCar = new Car('현대', 'K5');
console.log(myCar.drive());
console.log(myCar.doorOpen());
console.log(myCar.doorClose());
const myNewCar = new Car('테슬라', '모델S')
console.log(myNewCar.drive());
console.log(myNewCar.doorOpen());
console.log(myNewCar.doorClose());

console.log(typeof myCar); // object
console.log(myCar instanceof Error); // false
console.log(myCar instanceof Car); // true
