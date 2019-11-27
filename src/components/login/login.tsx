import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useAuth from '../../contexts/auth';

export function Login() {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
            <div>
                <TextField
                    id='login-email-input'
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    name='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='login-password-input'
                    label='Password'
                    margin='normal'
                    variant='outlined'
                    type='password'
                    name='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
        </form>
    );
}

export default Login;
