import { IUser } from '../user/user.i';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
