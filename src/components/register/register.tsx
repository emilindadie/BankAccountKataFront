import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserRepository from '../../repositories/user';
import { CreateUser } from '../../models/user/createUser';
import { useStyles } from './style';
import { Link } from 'react-router-dom';

export function Register() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassord] = useState('');
    const [callback, setCallback] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setCallback('');
        setError('');
        const createUser = new CreateUser();
        createUser.name = name;
        createUser.email = email;
        createUser.password = password;
        createUser.address = address;
        try {
            const response = await UserRepository.createUser(createUser);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setCallback('Your account has been create with success');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    function disabledButton() {
        if (email.length > 0 && password.length > 0 && name.length > 0 && address.length > 0 && email.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return false;
        }
        return true;
    }

    return (
        <form className={classes.container} noValidate autoComplete='off'>
            <div>
                <TextField
                    id='register_name_input'
                    className={classes.textField}
                    label='Name'
                    margin='normal'
                    variant='outlined'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='register_email_input'
                    className={classes.textField}
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='register_address_input'
                    className={classes.textField}
                    label='Address'
                    margin='normal'
                    variant='outlined'
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='register_password_input'
                    className={classes.textField}
                    label='Password'
                    margin='normal'
                    variant='outlined'
                    type='password'
                    value={password}
                    onChange={event => setPassord(event.target.value)}
                />
            </div>
            <div>
                <Button disabled={disabledButton()} data-testid='register_submit_btn' variant='contained' color='primary'
                    className={classes.button} onClick={handleSubmit}>
                    SignUp
                </Button>
            </div>
            <div>
                <li className={classes.list}>
                    <Link to='/login'>You already have account?</Link>
                </li>
            </div>
            <div className={classes.spanContainer}>
                <span className={classes.spanCallBack}>
                    {callback}
                </span>
                <span className={classes.spanError}>
                    {error}
                </span>
            </div>
        </form>
    );
}

export default Register;
