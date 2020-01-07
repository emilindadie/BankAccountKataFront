import { CreateUser } from '../models/user/createUser';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../models/apiResponse/apiResponse';
import { LoginResponse } from '../models/loginResponse/loginResponse';
import { Api } from '../api/axios';
import { NewTokenResponse } from '../models/newTokenResponse/newTokenResponse';

const UserRepository = {

    validCreateUserInformation(user: CreateUser): boolean {
        return user.validProperty();
    },

    validEmailType(inputEmail: string): boolean {
        if (inputEmail.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return true;
        }
        return false;
    },

    validEmailAndPassword(email: string, password: string): boolean {
        return email.length > 0 && password.length > 0;
    },

    async logUser(email: string, password: string): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
        const valideEmailType = this.validEmailType(email);
        if (!valideEmailType) {
            throw new Error('Email is not valid');
        }
        const valideEmailAndPasswod = this.validEmailAndPassword(email, password);
        if (valideEmailAndPasswod) {
            return await Api.getInstance().post('/user/login', { email, password });
        }
        throw new Error('Email and password is required!');
    },

    async createUser(user: CreateUser): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
        const validProperty = user.validProperty();
        if (!validProperty) {
            throw new Error('Tous les champs sont obligatoires!');
        }
        const valideEmailType = this.validEmailType(user.email);
        if (valideEmailType) {
            return await Api.getInstance().post('/user', user);
        }
        throw new Error('Email is not valid');
    },

    async getNewToken(): Promise<AxiosResponse<ApiResponse<NewTokenResponse>>> {
        return await Api.getInstance().get('/user/newToken');
    },
};

export default UserRepository;
