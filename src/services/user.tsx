import { Api } from '../api/axios';
import { CreateUser } from '../models/user/createUser';

export class UserService {

    validCreateUserInformation(user: CreateUser) {
        return user.validProperty();
    }

    validEmailType(inputEmail: string) {
        if (inputEmail.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return true;
        }
        return false;
    }

    validEmailAndPassword(email: string, password: string) {
        return email.length > 0 && password.length > 0;
    }

    logUser(email: string, password: string) {
        const valideEmailType = this.validEmailType(email);
        if (!valideEmailType) {
            throw new Error('Email is not valid');
        }
        const valideEmailAndPasswod = this.validEmailAndPassword(email, password);
        if (valideEmailAndPasswod) {
            return Api.getInstance().post('/user', { email, password });
        }
        throw new Error('Email and password is required!');
    }

    createUser(user: CreateUser) {
        const validProperty = user.validProperty();
        if (!validProperty) {
            throw new Error('Tous les champs sont obligatoires!');
        }
        const valideEmailType = this.validEmailType(user.email);
        if (!valideEmailType) {
            throw new Error('Email is not valid');
        }
        return Api.getInstance().post('/user', user);
    }
}
