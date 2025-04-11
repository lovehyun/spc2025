const Animal = require('./Animal');

class Cat extends Animal {
    makeSound() {
        return `${this.name} 미야~~옹`;
    }
}

module.exports = Cat;
