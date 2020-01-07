import { CreateAccount } from '../../models/account/createAccount';
import { IAccount } from '../../models/account/account.i';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../models/apiResponse/apiResponse';

export const account: IAccount = {
    id: 0,
    name: 'Compte A',
    solde: 700,
    user: {
        id: 1,
        name: 'Emilin',
        email: 'dadie.emilin@gmail.com',
        password: 'azerty',
        address: '14 rue de mulhouse',
    },
};

export const createAccount = new CreateAccount();
createAccount.name = 'Emilin';
createAccount.user = {
    id: 1,
    name: 'Emilin',
    email: 'dadie.emilin@gmail.com',
    password: 'azerty',
    address: '14 rue de mulhouse',
};

export const axiosCreateAccountResponse: AxiosResponse<ApiResponse<IAccount>> = {
    data: {
        data: {
            id: 1,
            name: 'compte A',
            solde: 700,
            user: {
                id: 1,
                name: 'Emilin',
                email: 'dadie.emilin@gmail.com',
                password: 'azerty',
                address: '14 rue de mulhouse',
            },
        },
        error: { message : 'Default error'},
    },
    headers: [],
    config: {},
    request: [],
    status: 200,
    statusText: 'OK',
};

export const axiosAccountByUserResponse: AxiosResponse<ApiResponse<IAccount[]>> = {
    data: {
        data: [
            {
                id: 1,
                name: 'compte A',
                solde: 700,
                user: {
                    id: 1,
                    name: 'Emilin',
                    email: 'dadie.emilin@gmail.com',
                    password: 'azerty',
                    address: '14 rue de mulhouse',
                },
            },
            {
                id: 2,
                name: 'compte B',
                solde: 700,
                user: {
                    id: 1,
                    name: 'Emilin',
                    email: 'dadie.emilin@gmail.com',
                    password: 'azerty',
                    address: '14 rue de mulhouse',
                },
            },
            {
                id: 3,
                name: 'compte C',
                solde: 700,
                user: {
                    id: 1,
                    name: 'Emilin',
                    email: 'dadie.emilin@gmail.com',
                    password: 'azerty',
                    address: '14 rue de mulhouse',
                },
            },
            {
                id: 4,
                name: 'compte D',
                solde: 700,
                user: {
                    id: 1,
                    name: 'Emilin',
                    email: 'dadie.emilin@gmail.com',
                    password: 'azerty',
                    address: '14 rue de mulhouse',
                },
            },
        ],
        error: { message : 'Default error'},
    },
    headers: [],
    config: {},
    request: [],
    status: 200,
    statusText: 'OK',
};

const initialState = {
    isAuthenticated: false,
    user: {
        id: 1,
        name: 'Emilin',
        email: 'dadie.emilin@gmail.com',
        password: 'azerty',
        address: '14 rue de mulhouse',
    },
};

export const AuthContextMock = {
    state: initialState,
    dispatch: () => initialState,
};
