import { CreateAccount } from '../models/account/createAccount';
import { Api } from '../api/axios';
import { AxiosResponse } from 'axios';
import { IAccount } from '../models/account/account.i';
import { ApiResponse } from '../models/apiResponse/apiResponse';

const AccountService = {
    validCreateAccountInformation(account: CreateAccount) {
        return account.validProperty();
    },
    validEmailType(inputEmail: string) {
        if (inputEmail.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return true;
        }
        return false;
    },
    async createAccount(account: CreateAccount): Promise<AxiosResponse<ApiResponse<IAccount>>> {
        const validProperty = account.validProperty();
        if (!validProperty) {
            throw new Error('Tous les champs sont obligatoires!');
        }
        const valideEmailType = this.validEmailType(account.user.email);
        if (valideEmailType) {
            return await Api.getInstance().post('/account', account);
        }
        throw new Error('Email is not valid');
    },

    async getAccountByuserId(userId: number): Promise<AxiosResponse<ApiResponse<IAccount[]>>> {
        return await Api.getInstance().get('/account', { params: { userId } });
    },
};

export default AccountService;
