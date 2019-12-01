import { IUser } from '../user/user.i';

export interface IAccount {
    id: number;
    name: string;
    solde: number;
    user: IUser;
}
