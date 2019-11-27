
import React, { useReducer } from 'react';
import { AuthState, AuthAction, initialState, authReducer } from '../reducers/auth';
import { getLocalStorageValue } from '../utils';
import { AuthContextProps } from '../models/auth/auth.i';

const AuthContext = React.createContext<AuthContextProps>({
    state: initialState,
    dispatch: () => initialState,
});

export function AuthProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    React.useEffect(() => {
        const isAuthenticated = getLocalStorageValue('isAuthenticated');
        if (!isAuthenticated) {
            return;
        }
        if (isAuthenticated) {
            dispatch({ type: 'LOGIN' });
        }
    }, []);

    const propsWithChildren = { ...props };
    return <AuthContext.Provider value={{ state, dispatch }}>{propsWithChildren.children}</AuthContext.Provider>;
}

export default function useAuth() {
    return React.useContext(AuthContext);
}
