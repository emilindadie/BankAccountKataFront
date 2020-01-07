import { IUser } from '../user/user.i';

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: IUser;
}
