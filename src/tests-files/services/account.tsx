import { CreateAccount } from '../../models/account/createAccount';
import { IAccount } from '../../models/account/account.i';

export const account: IAccount = {
    id: 1,
    name: 'Compte A',
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
