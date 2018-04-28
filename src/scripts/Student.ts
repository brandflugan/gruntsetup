import { Person } from './Person';

export = class Student {
    person;

    constructor(public firsName: string, public lastName: string) {
        this.person = new Person(firsName, lastName);
    }

    public getFullName() {
        return `${this.person.firstName} ${this.person.lastName}`;
    }
}
