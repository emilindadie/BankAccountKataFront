import { removeCookie, replaceCookie, getLocalStorageValue, replaceLocalStorage } from '../utils';
import UserRepository from '../repositories/user';

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
            replaceCookie('access_token', getLocalStorageValue('refresh_token'));
            const res = await UserRepository.getNewToken();
            replaceCookie('access_token', res.data.data.access_token);
            replaceLocalStorage('refresh_token', res.data.data.refresh_token);
        } catch (e) {
           return e;
        }
    },
};

export default CommonFunction;
