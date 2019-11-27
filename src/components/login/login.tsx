import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useAuth from '../../contexts/auth';

export function Login() {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    const [email, setEmail] = useState('');

    return (
        <form>
            <div>
                <TextField
                    id='email'
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    name='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </div>
        </form>
    );
}

export default Login;
