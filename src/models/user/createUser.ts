
export class CreateUser {
    name!: string;
    email!: string;
    address!: string;
    password!: string;

    constructor(name: string, email: string, address: string, password: string) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.password = password;
    }

    validProperty(): boolean {
        if (this.name.length > 0 && this.email.length > 0 && this.password.length > 0 && this.address.length > 0) {
            return true;
        }
        return false;
    }
}
