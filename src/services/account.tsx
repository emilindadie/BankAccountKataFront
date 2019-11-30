import { CreateAccount } from '../models/account/createAccount';
import { Api } from '../api/axios';

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
    async createAccount(account: CreateAccount) {
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
};

export default AccountService;
