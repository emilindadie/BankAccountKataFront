import { AuthState, AuthAction } from '../../reducers/auth';

export interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}
