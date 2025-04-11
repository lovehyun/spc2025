const Animal = require('./Animal');
const Dog = require('./Dog');
const Cat = require('./Cat');

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
