import Person = require('./Person');

class Student {
    person;

    constructor(firsName: string, lastName: string) {
        this.person = new Person(firsName, lastName);
    }

    public getFullName() {
        return `${this.person.firstName} ${this.person.lastName}`;
    }
}

export = Student;