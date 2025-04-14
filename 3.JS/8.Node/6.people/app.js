const Person = require('./Person');
const Student = require('./Student');

const john = new Person('John');
john.greet();

const smith = new Person('Smith');
smith.greet();

const jane = new Student('Jane', 'art');
jane.greet();

const june = new Student('June', 'law');
june.greet();
