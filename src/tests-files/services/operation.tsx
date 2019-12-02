import { CreateOperation } from '../../models/operation/createOperation';
import { IOperation } from '../../models/operation/operation.i';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../models/apiResponse/apiResponse';

export const operation: IOperation = {
    id: 1,
    accountId: 1,
    type: 'deposit',
    account: {
        id: 1,
        name: 'Compte A',
        solde: 700,
        user: {
            id: 1,
            name: 'Emilin',
            email: 'dadie.emilin@gmail.com',
            password: 'azerty',
            address: '14 rue de mulhouse',
        },
    },
    amount: 600,
    date: new Date(),
};

export const createOperation = new CreateOperation();
createOperation.accountId = 1;
createOperation.amount = 600;

export const axiosCreateOperationResponse: AxiosResponse<ApiResponse<IOperation>> = {
    data: {
        data: {
            id: 1,
            accountId: 1,
            type: 'deposit',
            account: {
                id: 1,
                name: 'Compte A',
                solde: 700,
                user: {
                    id: 1,
                    name: 'Emilin',
                    email: 'dadie.emilin@gmail.com',
                    password: 'azerty',
                    address: '14 rue de mulhouse',
                },
            },
            amount: 600,
            date: new Date(),
        },
        error: 'Default error',
    },
    headers: [],
    config: {},
    request: [],
    status: 200,
    statusText: 'OK',
};
