import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useAuth from '../../contexts/auth';
import { Button } from '@material-ui/core';
import UserService from '../../services/user';

export function Login() {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('');
        try {
            const response = await UserService.logUser(email, password);
            if (response.data.data) {
                dispatch({ type: 'LOAD_USER', user: response.data.data.user });
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
                <TextField
                    id='login_email_input'
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
                    id='login_password_input'
                    label='Password'
                    margin='normal'
                    variant='outlined'
                    type='password'
                    name='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
            <div>
                <Button data-testid='login_submit_btn' variant='contained' color='primary' id='submit_login_btn' type='submit'>
                    CONNEXION
                </Button>
            </div>
            <div>
                <span>
                    {error}
                </span>
            </div>
        </form>
    );
}

export default Login;
