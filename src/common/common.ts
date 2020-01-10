import { removeCookie } from '../utils';
import UserRepository from '../repositories/user';
import { NewTokenResponse } from '../models/newTokenResponse/newTokenResponse';
import { ApiResponse } from '../models/apiResponse/apiResponse';

const CommonFunction = {
    logoutAction(props: any, history: any) {
        props.dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('isAuthenticated');
        removeCookie('refresh_token');
        history.push('/');
    },

    async getNewToken() {
        try {
            const res =  await UserRepository.getNewToken();
            return res.data;
        } catch (e) {
            const errorResponse: ApiResponse<NewTokenResponse> = {error : e};
            return errorResponse;
        }
    },
};

export default CommonFunction;
