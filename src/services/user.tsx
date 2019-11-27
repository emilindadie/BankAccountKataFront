export class UserService {
    valideEmailType(inputEmail: string) {
        return '';
    }

    valideEmailAndPassword(email: string, password: string) {
        return email.length > 0 && password.length > 0;
    }
}
