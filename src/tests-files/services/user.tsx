import { IUser } from '../../models/user/user.i';
import { CreateUser } from '../../models/user/createUser';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const user: IUser = {
    id: 1,
    name: 'Emilin',
    email: 'dadie.emilin@gmail.com',
    password: 'azerty',
    address: '14 rue de mulhouse',
};

export const createUser = new CreateUser();
createUser.name = 'Emilin';
createUser.email = 'dadie.emilin@gmail.com';
createUser.password = 'azerty';
createUser.address = '14 rue de mulhouse';

export const axiosUserResponse: AxiosResponse<IUser> = {
    data: {
        id: 1,
        name: 'Emilin',
        email: 'dadie.emilin@gmail.com',
        password: 'azerty',
        address: '14 rue de mulhouse',
    },
    headers: [],
    config: {

    },
    request: [],
    status: 200,
    statusText: 'OK',
};
