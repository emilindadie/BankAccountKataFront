import { CreateAccount } from '../models/account/createAccount';
import { AxiosResponse } from 'axios';
import { IAccount } from '../models/account/account.i';
import { ApiResponse } from '../models/apiResponse/apiResponse';
import { Api } from '../api/axios';

const AccountRepository = {
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
            throw new Error('All field is required!');
        }
        const valideEmailType = this.validEmailType(account.user.email);
        if (valideEmailType) {
            return await Api.getInstance().post('/accounts', account);
        }
        throw new Error('Email is not valid');
    },

    async getAccountByUserId(userId: number): Promise<AxiosResponse<ApiResponse<IAccount[]>>> {
        return await Api.getInstance().get('/accounts', { params: { userId } });
    },
};

export default AccountRepository;
