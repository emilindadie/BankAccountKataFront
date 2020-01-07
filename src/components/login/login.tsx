import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import UserRepository from '../../repositories/user';
import { useStyles } from './style';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { setLocalStorage, setCookie } from '../../utils';
import { IUser } from '../../models/user/user.i';
import { connect } from 'react-redux';
import { AuthAction, AuthState } from '../../reducers/auth';

function Login(props: any) {
    const history = useHistory();
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: '',
    });

    const {email, password, error} = formData;
    const onChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setFormData({...formData, error: ''});
        try {
            const response = await UserRepository.logUser(email, password);
            if (response.data.data) {
                const access_token = response.data.data.access_token;
                const refresh_token = response.data.data.refresh_token;
                const user = response.data.data.user;
                updateAuthParams(user, access_token, refresh_token);
                props.dispatch({ type: 'LOAD_USER', user: response.data.data.user });
                history.push('/home');
            } else {
                setFormData({...formData, error: response.data.error.message});
            }
        } catch (error) {
            setFormData({...formData, error: error.message});
        }
    };

    function updateAuthParams(user: IUser, accessToken: string, refreshToken: string) {
        setLocalStorage('refresh_token', refreshToken);
        setCookie('access_token', accessToken);
        setLocalStorage('isAuthenticated', JSON.stringify(true));
        setLocalStorage('user', JSON.stringify(user));
    }

    function disabledButton() {
        if (email.length > 0 && password.length > 0 && email.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return false;
        }
        return true;
    }

    return (
        <form className={classes.container} noValidate autoComplete='off' onSubmit={handleSubmit}>
            <div>
                <TextField
                    id='login_email_input'
                    className={classes.textField}
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    name='email'
                    value={email}
                    onChange={event => onChange(event)}
                />
            </div>
            <div>
                <TextField
                    id='login_password_input'
                    className={classes.textField}
                    label='Password'
                    margin='normal'
                    variant='outlined'
                    type='password'
                    name='password'
                    value={password}
                    onChange={event => onChange(event)}
                />
            </div>
            <div>
                <Button disabled={disabledButton()} data-testid='login_submit_btn' variant='contained' color='primary' id='submit_login_btn'
                    className={classes.button} type='submit'>
                    SignIn
                </Button>
            </div>
            <div>
                <li className={classes.list}>
                    <Link to='/register'>You don't have account?</Link>
                </li>
            </div>
            <div className={classes.spanContainer}>
                <span className={classes.span}>
                    {error}
                </span>
            </div>
        </form>
    );
}

const mapStateToProps = (state: AuthState) => {
    return {state};
};

const mapDispatchToProps = (dispatch: React.Dispatch<AuthAction>) => {
    return {
        dispatch: (action: AuthAction) => dispatch(action),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
