export interface Person {
    firstName: string;
    lastName: string;
}

export class Student {
    firstName: string;
    lastName: string;
    heading: HTMLElement;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;

        this.heading = document.getElementById('heading');
        this.heading.innerHTML = this.getFullName(this.firstName, this.lastName);
    }

    private getFullName(firstName: string, lastName: string) {
        return `${firstName} ${lastName}`;
    }
}