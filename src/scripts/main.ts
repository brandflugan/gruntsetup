class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

export function greeter(person : Person) {
    return `<h1>Hello ${person.firstName} ${person.lastName}</h1>`;
}

let user = new Student("Jane", "M.", "User");

document.getElementById('heading').innerHTML = greeter(user);