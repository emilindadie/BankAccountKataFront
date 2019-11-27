export class UserService {
    valideEmailType(inputEmail: string) {
        if (inputEmail.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return true;
        }
        return false;
    }

    valideEmailAndPassword(email: string, password: string) {
        return email.length > 0 && password.length > 0;
    }
}
