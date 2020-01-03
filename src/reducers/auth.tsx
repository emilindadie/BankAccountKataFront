import { IUser } from '../models/user/user.i';

export interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
}

export type AuthAction =
   {
        type: 'LOAD_USER';
        user: IUser;
    }
    | { type: 'LOGOUT' };

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOAD_USER': {
            return { ...state, isAuthenticated: true , user: action.user };
        }
        case 'LOGOUT': {
            return { isAuthenticated: false, user: null };
        }
        default:
            return state;
    }
}
