class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return '아무소리나냄';
    }
}

class Dog extends Animal { // 이걸 상속(inheritance) 라고 부름
    makeSound() { // 함수의 오버라이딩(overiding);
                 // 부모함수를 그대로 쓸수도 있고, 내가 재정의할수도 있음.
        return `${this.name} 멍멍`;
    }
}

class Cat extends Animal {
    makeSound() {
        return `${this.name} 미야~~옹`;
    }
}

const aAnimal = new Animal('dolly')
const aSound = aAnimal.makeSound();
console.log(aSound);

const aDog = new Dog('charlie');
const aDogSound = aDog.makeSound();
console.log(aDogSound);

const bDog = new Dog('brown');
const bDogSound = bDog.makeSound();
console.log(bDogSound);

const aCat = new Cat('kitty');
const aCatSound = aCat.makeSound();
console.log(aCatSound);
