import { CreateAccount } from '../models/account/createAccount';

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
};

export default AccountService;
