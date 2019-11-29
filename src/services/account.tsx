import { CreateAccount } from '../models/account/createAccount';

const AccountService = {
    validCreateAccountInformation(account: CreateAccount) {
        return account.validProperty();
    },
};

export default AccountService;
