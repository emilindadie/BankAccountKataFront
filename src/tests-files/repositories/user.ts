import { IUser } from '../../models/user/user.i';
import { CreateUser } from '../../models/user/createUser';
import {AxiosResponse } from 'axios';
import { ApiResponse } from '../../models/apiResponse/apiResponse';
import { LoginResponse } from '../../models/loginResponse/loginResponse';

export const user: IUser = {
    id: 1,
    name: 'Emilin',
    email: 'dadie.emilin@gmail.com',
    password: 'azerty',
    address: '14 rue de mulhouse',
};

export const createUser = new CreateUser('Emilin', 'dadie.emilin@gmail.com', 'azerty', '14 rue de mulhouse');

export const axiosUserResponse: AxiosResponse<ApiResponse<LoginResponse>> = {
    data: {
        data: {
            user: {
                id: 1,
                name: 'Emilin',
                email: 'dadie.emilin@gmail.com',
                password: 'azerty',
                address: '14 rue de mulhouse',
            },
            accessToken: 'azerty',
            refreshToken: 'azerty',
        },
        error: { message : 'Default error'},
    },
    headers: [],
    config: {

    },
    request: [],
    status: 200,
    statusText: 'OK',
};
