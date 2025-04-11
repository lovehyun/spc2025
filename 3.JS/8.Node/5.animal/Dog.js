const Animal = require('./Animal');

class Dog extends Animal { // 이걸 상속(inheritance) 라고 부름
    makeSound() { // 함수의 오버라이딩(overiding);
                 // 부모함수를 그대로 쓸수도 있고, 내가 재정의할수도 있음.
        return `${this.name} 멍멍`;
    }
}

module.exports = Dog;
