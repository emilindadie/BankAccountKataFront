import { IUser } from '../user/user.i';

export interface LoginResponse {
    token: string;
    user: IUser;
}
