import { IAccount } from '../account/account.i';

export interface IOperation {
    id: number;
    accountId: number;
    type: string;
    amount: number;
    date: Date;
    account: IAccount;
}
