class Circle {
    // let _radius = 0;

    constructor(radius) {
        this._radius = radius;
    }

    // 객체 안의 변수에는 직접 접근이 안되니깐, 그래서.. setter/getter를 통해서 내부 변수를 접근한다.
    get diameter() {
        return this._radius * 2;
    }

    set diameter(diameter) {
        this._radius = diameter /2;
    }
}

const myCircle = new Circle(5); // 초기에 반지릅 5짜리 원을 만들었음..
console.log(myCircle.diameter); // 결과: 10

myCircle.diameter = 14; // 이후에 값을 변경함
console.log(myCircle._radius); // 내부 변수에 직접 접근해서 radius가 diameter로부터 잘 저장되었는지 확인. 
                               // 단!! 이렇게 내부 변수에 직접 접근하는 방식은 좋은 방식이 아님.
                               // 그래서,, 이걸 막고자.. ES2022부터는, 내부 변수 접근을 막기 위해서 # 이라는 키워드가 생김.
console.log(myCircle.diameter);
