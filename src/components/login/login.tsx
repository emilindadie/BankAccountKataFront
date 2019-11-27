import React from 'react';
import TextField from '@material-ui/core/TextField';
import useAuth from '../../contexts/auth';

export function Login() {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    return (
        <form>
            <div>
                <TextField
                    id="email"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    name="email"
                    value=''
                />
            </div>
        </form>
    )
}

export default Login;

